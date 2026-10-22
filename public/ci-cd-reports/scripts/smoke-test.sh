#!/usr/bin/env bash
# ============================================================
# Small HTTP smoke test used by CI verify jobs.
#
# Usage:
#   smoke-test.sh URL [EXPECTED_CODES] [RETRIES] [DELAY]
#
# Examples:
#   smoke-test.sh https://kyc.dev.svi.cloud/portal/
#   smoke-test.sh https://kyc.dev.svi.cloud/spring/auth-services/actuator/health "200" 20 3
# ============================================================
set -Eeuo pipefail

usage() {
  echo "Usage: $0 URL [EXPECTED_CODES] [RETRIES] [DELAY]" >&2
  exit 2
}

log() {
  printf '%s [smoke-test] %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$*"
}

[ "$#" -ge 1 ] || usage

URL="$1"
EXPECTED_CODES="${2:-200 201 204 301 302 401 403}"
RETRIES="${3:-30}"
DELAY="${4:-2}"

[[ "$URL" =~ ^https?:// ]] || { echo "URL must start with http:// or https://" >&2; exit 2; }
[[ "$RETRIES" =~ ^[0-9]+$ ]] || { echo "RETRIES must be numeric" >&2; exit 2; }
[[ "$DELAY" =~ ^[0-9]+$ ]] || { echo "DELAY must be numeric" >&2; exit 2; }

command -v curl >/dev/null 2>&1 || { echo "curl is required" >&2; exit 2; }

is_expected() {
  local code="$1" expected
  for expected in $EXPECTED_CODES; do
    [ "$code" = "$expected" ] && return 0
  done
  return 1
}

for attempt in $(seq 1 "$RETRIES"); do
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 "$URL" || true)"
  if is_expected "${code:-000}"; then
    log "PASS ${URL} (HTTP ${code}) on attempt ${attempt}"
    exit 0
  fi
  log "attempt ${attempt}/${RETRIES}: HTTP ${code:-000}"
  sleep "$DELAY"
done

log "FAIL ${URL} after ${RETRIES} attempts"
exit 1
