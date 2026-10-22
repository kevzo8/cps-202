#!/usr/bin/env bash
# ============================================================
# Move a Jira issue to a target status from GitLab CI.
#
# Required CI/CD variables (masked):
#   JIRA_BASE_URL   e.g. https://your-company.atlassian.net
#   JIRA_EMAIL      API user email
#   JIRA_API_TOKEN  Atlassian API token
#
# Usage:
#   jira-transition.sh ISSUE_KEY TARGET_STATUS [COMMENT]
#   jira-transition.sh AUTO "In Review" "MR !123 opened"
#
# AUTO extracts the first key matching ABC-123 from
# CI_MERGE_REQUEST_TITLE, CI_COMMIT_MESSAGE, CI_COMMIT_BRANCH or CI_COMMIT_TAG.
# ============================================================
set -Eeuo pipefail

usage() {
  echo "Usage: $0 ISSUE_KEY TARGET_STATUS [COMMENT]" >&2
  exit 2
}

log() {
  printf '%s [jira] %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$*"
}

die() {
  log "ERROR: $*"
  exit 1
}

[ "$#" -ge 2 ] || usage

ISSUE_KEY="$1"
TARGET_STATUS="$2"
COMMENT="${3:-}"

: "${JIRA_BASE_URL:?Set JIRA_BASE_URL}"
: "${JIRA_EMAIL:?Set JIRA_EMAIL}"
: "${JIRA_API_TOKEN:?Set JIRA_API_TOKEN}"

JIRA_API_VERSION="${JIRA_API_VERSION:-3}"
JIRA_BASE_URL="${JIRA_BASE_URL%/}"

command -v curl >/dev/null 2>&1 || die "curl is required"
command -v jq >/dev/null 2>&1 || die "jq is required"

extract_key() {
  local text="$1"
  printf '%s' "$text" | grep -Eo '[A-Z][A-Z0-9]+-[0-9]+' | head -n1 || true
}

if [ "$ISSUE_KEY" = "AUTO" ]; then
  ISSUE_KEY=""
  for candidate in \
    "${CI_MERGE_REQUEST_TITLE:-}" \
    "${CI_COMMIT_MESSAGE:-}" \
    "${CI_COMMIT_BRANCH:-}" \
    "${CI_COMMIT_TAG:-}"
  do
    ISSUE_KEY="$(extract_key "$candidate")"
    [ -n "$ISSUE_KEY" ] && break
  done
  [ -n "$ISSUE_KEY" ] || die "Could not find a Jira issue key in the CI context"
fi

[[ "$ISSUE_KEY" =~ ^[A-Z][A-Z0-9]+-[0-9]+$ ]] || die "Invalid Jira issue key: $ISSUE_KEY"

auth_header="Authorization: Basic $(printf '%s:%s' "$JIRA_EMAIL" "$JIRA_API_TOKEN" | base64 | tr -d '\n')"
api="${JIRA_BASE_URL}/rest/api/${JIRA_API_VERSION}"
tmp_body="$(mktemp)"
trap 'rm -f "$tmp_body"' EXIT

log "Reading transitions for ${ISSUE_KEY}"
http_code="$(curl -sS -o "$tmp_body" -w '%{http_code}' \
  -H "$auth_header" \
  -H 'Accept: application/json' \
  "${api}/issue/${ISSUE_KEY}/transitions" || true)"
[ "$http_code" = "200" ] || { cat "$tmp_body" >&2; die "Failed to read transitions (HTTP ${http_code})"; }

transition_id="$(jq -r --arg target "$TARGET_STATUS" '
  .transitions[]
  | select((.to.name | ascii_downcase) == ($target | ascii_downcase)
           or (.name | ascii_downcase) == ($target | ascii_downcase))
  | .id
' "$tmp_body" | head -n1)"

if [ -z "$transition_id" ]; then
  log "Available transitions:"
  jq -r '.transitions[] | "  \(.id): \(.name) -> \(.to.name)"' "$tmp_body" >&2
  die "No transition to '${TARGET_STATUS}' for ${ISSUE_KEY}"
fi

log "Transitioning ${ISSUE_KEY} to '${TARGET_STATUS}' (transition ${transition_id})"
http_code="$(curl -sS -o "$tmp_body" -w '%{http_code}' \
  -X POST \
  -H "$auth_header" \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  --data "{\"transition\":{\"id\":\"${transition_id}\"}}" \
  "${api}/issue/${ISSUE_KEY}/transitions" || true)"
[ "$http_code" = "204" ] || { cat "$tmp_body" >&2; die "Transition failed (HTTP ${http_code})"; }

if [ -n "$COMMENT" ]; then
  log "Adding comment to ${ISSUE_KEY}"
  if [ "$JIRA_API_VERSION" = "3" ]; then
    payload="$(jq -n --arg text "$COMMENT" '{
      body: {
        type: "doc",
        version: 1,
        content: [{ type: "paragraph", content: [{ type: "text", text: $text }] }]
      }
    }')"
  else
    payload="$(jq -n --arg text "$COMMENT" '{ body: $text }')"
  fi
  http_code="$(curl -sS -o "$tmp_body" -w '%{http_code}' \
    -X POST \
    -H "$auth_header" \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    --data "$payload" \
    "${api}/issue/${ISSUE_KEY}/comment" || true)"
  [ "$http_code" = "201" ] || { cat "$tmp_body" >&2; die "Comment failed (HTTP ${http_code})"; }
fi

log "Done: ${ISSUE_KEY} -> ${TARGET_STATUS}"
