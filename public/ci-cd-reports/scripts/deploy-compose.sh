#!/usr/bin/env bash
# ============================================================
# Pull and deploy one service with Docker Compose, then wait for
# its health check. Rolls back to the previous image on failure.
#
# Install on the EC2 host as /usr/local/bin/deploy-compose.
# The deploy user must be in the docker group.
#
# Usage:
#   APP_IMAGE=registry.example/app:sha \
#   APP_NAME=my-app APP_PORT=8081 APP_ENV_FILE=/opt/svi/my-app/app.env \
#   HEALTH_PATH=/actuator/health \
#   deploy-compose /opt/svi/my-app
#
# Optional environment:
#   COMPOSE_FILE    default $APP_DIR/docker-compose.yml
#   HEALTH_RETRIES  default 40
#   HEALTH_DELAY    default 3
# ============================================================
set -Eeuo pipefail

usage() {
  echo "Usage: $0 APP_DIR" >&2
  exit 2
}

log() {
  printf '%s [deploy-compose] %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$*"
}

die() {
  log "ERROR: $*"
  exit 1
}

[ "$#" -eq 1 ] || usage
APP_DIR="$1"

APP_IMAGE="${APP_IMAGE:-}"
APP_NAME="${APP_NAME:-}"
APP_PORT="${APP_PORT:-}"
APP_ENV_FILE="${APP_ENV_FILE:-${APP_DIR}/app.env}"
HEALTH_PATH="${HEALTH_PATH:-/}"
COMPOSE_FILE="${COMPOSE_FILE:-${APP_DIR}/docker-compose.yml}"
HEALTH_RETRIES="${HEALTH_RETRIES:-40}"
HEALTH_DELAY="${HEALTH_DELAY:-3}"

[ -n "$APP_IMAGE" ] || die "APP_IMAGE is required"
[ -n "$APP_NAME" ] || die "APP_NAME is required"
[[ "$APP_PORT" =~ ^[0-9]+$ ]] || die "APP_PORT must be numeric (got: $APP_PORT)"
[[ "$APP_NAME" =~ ^[A-Za-z0-9._-]+$ ]] || die "Invalid APP_NAME: $APP_NAME"
[[ "$HEALTH_PATH" == /* ]] || die "HEALTH_PATH must start with / (got: $HEALTH_PATH)"
[ -d "$APP_DIR" ] || die "APP_DIR does not exist: $APP_DIR"
[ -f "$APP_ENV_FILE" ] || die "Environment file not found: $APP_ENV_FILE"
[ -f "$COMPOSE_FILE" ] || die "Compose file not found: $COMPOSE_FILE"

command -v docker >/dev/null 2>&1 || die "docker is not installed"
docker compose version >/dev/null 2>&1 || die "docker compose v2 is required"
command -v curl >/dev/null 2>&1 || die "curl is required"

cd "$APP_DIR"

export APP_IMAGE APP_NAME APP_PORT APP_ENV_FILE HEALTH_PATH

container_id="$(docker compose -f "$COMPOSE_FILE" ps -q app 2>/dev/null || true)"
previous_image=""
if [ -n "$container_id" ]; then
  previous_image="$(docker inspect --format '{{.Config.Image}}' "$container_id" 2>/dev/null || true)"
  log "Current image: ${previous_image:-unknown}"
fi

log "Pulling ${APP_IMAGE}"
if ! docker compose -f "$COMPOSE_FILE" pull app; then
  die "Image pull failed. Confirm the host is logged in to the GitLab registry."
fi

log "Recreating ${APP_NAME}"
docker compose -f "$COMPOSE_FILE" up -d --remove-orphans

wait_for_health() {
  local attempt cid status code
  for attempt in $(seq 1 "$HEALTH_RETRIES"); do
    cid="$(docker compose -f "$COMPOSE_FILE" ps -q app 2>/dev/null || true)"
    if [ -n "$cid" ]; then
      status="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$cid" 2>/dev/null || true)"
      if [ "$status" = "healthy" ]; then
        log "Container health: healthy"
        return 0
      fi
      if [ "$status" = "unhealthy" ] || [ "$status" = "exited" ] || [ "$status" = "dead" ]; then
        log "Container health: ${status}"
        return 1
      fi
    fi

    code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 "http://127.0.0.1:${APP_PORT}${HEALTH_PATH}" || true)"
    case "$code" in
      200|201|204|301|302|401|403)
        log "HTTP health check passed (HTTP ${code})"
        return 0
        ;;
    esac

    log "Health attempt ${attempt}/${HEALTH_RETRIES}: container=${status:-none}, http=${code:-000}"
    sleep "$HEALTH_DELAY"
  done
  return 1
}

if ! wait_for_health; then
  log "Deployment health check failed"
  docker compose -f "$COMPOSE_FILE" logs --tail=120 app || true
  if [ -n "$previous_image" ] && [ "$previous_image" != "$APP_IMAGE" ]; then
    log "Rolling back to ${previous_image}"
    export APP_IMAGE="$previous_image"
    if docker compose -f "$COMPOSE_FILE" up -d --remove-orphans; then
      log "Rollback container started; verify manually"
    else
      log "ERROR: rollback failed"
    fi
  else
    log "No previous image available for automatic rollback"
  fi
  exit 1
fi

printf '%s\n' "$APP_IMAGE" > "${APP_DIR}/.deployed-image"
date -u '+%Y-%m-%dT%H:%M:%SZ' > "${APP_DIR}/.deployed-at"
log "Deployed ${APP_NAME} with ${APP_IMAGE}"
