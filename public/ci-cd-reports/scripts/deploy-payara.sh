#!/usr/bin/env bash
# ============================================================
# Deploy or roll back a WAR on Payara Server.
#
# Install on the Payara host as /usr/local/bin/payara-deploy
# and make it executable. The CI user must be allowed to run:
#   sudo -u payara /usr/local/bin/payara-deploy ...
#
# Usage:
#   payara-deploy APP_NAME WAR_PATH CONTEXT_ROOT [HEALTH_PATH]
#
# Environment overrides:
#   PAYARA_HOME          default /opt/payara
#   PAYARA_ASADMIN       default $PAYARA_HOME/bin/asadmin
#   PAYARA_DOMAIN        default production
#   PAYARA_ADMIN_USER    default admin
#   PAYARA_PASSWORD_FILE default /etc/payara/passwordfile
#   PAYARA_ADMIN_PORT    default 4848
#   PAYARA_HTTP_PORT     default 8080
#   PAYARA_BACKUP_DIR    default /opt/payara/deploy-backups
#   HEALTH_RETRIES       default 30
#   HEALTH_DELAY         default 2
#   AUTO_ROLLBACK        default true
# ============================================================
set -Eeuo pipefail

usage() {
  echo "Usage: $0 APP_NAME WAR_PATH CONTEXT_ROOT [HEALTH_PATH]" >&2
  exit 2
}

log() {
  printf '%s [payara-deploy] %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$*"
}

die() {
  log "ERROR: $*"
  exit 1
}

[ "$#" -ge 3 ] || usage

APP_NAME="$1"
WAR_PATH="$2"
CONTEXT_ROOT="$3"
HEALTH_PATH="${4:-/}"

PAYARA_HOME="${PAYARA_HOME:-/opt/payara}"
ASADMIN="${PAYARA_ASADMIN:-${PAYARA_HOME}/bin/asadmin}"
DOMAIN="${PAYARA_DOMAIN:-production}"
ADMIN_USER="${PAYARA_ADMIN_USER:-admin}"
PASSWORD_FILE="${PAYARA_PASSWORD_FILE:-/etc/payara/passwordfile}"
ADMIN_PORT="${PAYARA_ADMIN_PORT:-4848}"
HTTP_PORT="${PAYARA_HTTP_PORT:-8080}"
BACKUP_DIR="${PAYARA_BACKUP_DIR:-/opt/payara/deploy-backups}"
HEALTH_RETRIES="${HEALTH_RETRIES:-30}"
HEALTH_DELAY="${HEALTH_DELAY:-2}"
AUTO_ROLLBACK="${AUTO_ROLLBACK:-true}"

[[ "$APP_NAME" =~ ^[A-Za-z0-9._-]+$ ]] || die "Invalid APP_NAME: $APP_NAME"
[[ "$CONTEXT_ROOT" == /* ]] || die "CONTEXT_ROOT must start with / (got: $CONTEXT_ROOT)"
[[ "$HEALTH_PATH" == /* ]] || die "HEALTH_PATH must start with / (got: $HEALTH_PATH)"

command -v curl >/dev/null 2>&1 || die "curl is required on the Payara host"
[ -x "$ASADMIN" ] || die "asadmin not found or not executable: $ASADMIN"
[ -r "$PASSWORD_FILE" ] || die "Password file not readable: $PASSWORD_FILE"

if [[ ! -f "$WAR_PATH" ]]; then
  die "WAR not found: $WAR_PATH"
fi
[ -s "$WAR_PATH" ] || die "WAR is empty: $WAR_PATH"

MAGIC="$(head -c 2 "$WAR_PATH" || true)"
[ "$MAGIC" = "PK" ] || die "File does not look like a WAR/ZIP: $WAR_PATH"

mkdir -p "$BACKUP_DIR"
umask 027

asadmin_cmd() {
  "$ASADMIN" \
    --user "$ADMIN_USER" \
    --passwordfile "$PASSWORD_FILE" \
    --host 127.0.0.1 \
    --port "$ADMIN_PORT" \
    "$@"
}

timestamp="$(date -u '+%Y%m%dT%H%M%SZ')"
backup_war="${BACKUP_DIR}/${APP_NAME}-${timestamp}.war"
cp "$WAR_PATH" "$backup_war"
log "Backed up incoming WAR to $backup_war"

PREVIOUS_WAR=""
if [[ -d "$BACKUP_DIR" ]]; then
  PREVIOUS_WAR="$(find "$BACKUP_DIR" -maxdepth 1 -type f -name "${APP_NAME}-*.war" ! -path "$backup_war" -printf '%T@ %p\n' 2>/dev/null | sort -nr | head -n1 | cut -d' ' -f2- || true)"
fi

health_url="http://127.0.0.1:${HTTP_PORT}${CONTEXT_ROOT}${HEALTH_PATH}"

check_health() {
  local attempt code
  for attempt in $(seq 1 "$HEALTH_RETRIES"); do
    code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 "$health_url" || true)"
    case "$code" in
      200|201|204|301|302|401|403)
        log "Health check passed (HTTP $code) on attempt $attempt"
        return 0
        ;;
    esac
    log "Health attempt ${attempt}/${HEALTH_RETRIES}: HTTP ${code:-000}"
    sleep "$HEALTH_DELAY"
  done
  return 1
}

rollback() {
  if [[ "$AUTO_ROLLBACK" != "true" ]]; then
    return 0
  fi
  if [[ -n "$PREVIOUS_WAR" && -f "$PREVIOUS_WAR" ]]; then
    log "Rolling back to $PREVIOUS_WAR"
    if asadmin_cmd deploy --force=true --name "$APP_NAME" --contextroot "$CONTEXT_ROOT" "$PREVIOUS_WAR"; then
      check_health || log "Rollback deployed but health check still fails"
    else
      log "ERROR: rollback deployment failed"
    fi
  else
    log "No previous WAR found; undeploying $APP_NAME"
    asadmin_cmd undeploy "$APP_NAME" || true
  fi
}

log "Deploying ${WAR_PATH} as ${APP_NAME} at ${CONTEXT_ROOT}"
if ! asadmin_cmd deploy --force=true --name "$APP_NAME" --contextroot "$CONTEXT_ROOT" "$WAR_PATH"; then
  log "Deployment command failed"
  rollback
  exit 1
fi

if ! check_health; then
  log "Health check failed: $health_url"
  rollback
  exit 1
fi

log "Deployment succeeded: ${APP_NAME} -> ${CONTEXT_ROOT}"

# Retain the 10 newest backups per application.
mapfile -t old_backups < <(find "$BACKUP_DIR" -maxdepth 1 -type f -name "${APP_NAME}-*.war" -printf '%T@ %p\n' 2>/dev/null | sort -nr | tail -n +11 | cut -d' ' -f2-)
if [[ "${#old_backups[@]}" -gt 0 ]]; then
  rm -f -- "${old_backups[@]}"
  log "Removed ${#old_backups[@]} old backup(s)"
fi
