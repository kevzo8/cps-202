# Merge Request

> Title format: `type(SCOPE-123): short summary`
> Example: `feat(CPS-164): add liveness retry`

## Jira

- Issue: [SCOPE-123](https://your-company.atlassian.net/browse/SCOPE-123)
- Related issues:

## What changed

<!-- One or two sentences. What can a reviewer see or do after this MR? -->

## Why

<!-- Business or technical reason. Link the Jira acceptance criteria. -->

## How to test

1.
2.
3.

## Evidence

- [ ] Unit tests added or updated
- [ ] Pipeline is green (link: )
- [ ] Manually verified on dev (URL: )
- [ ] Screenshots or recordings attached (UI changes)

## Deployment notes

- Target environment: `dev` / `production`
- Build artifact: WAR / JAR / Docker image / Vercel
- Context root (WAR only):
- New or changed environment variables (names only, never values):
- Database migration required: yes / no
- External whitelisting or callback changes: yes / no

## Risk and rollback

- Risk level: low / medium / high
- Failure mode:
- Rollback steps:
  - WAR: redeploy the previous backup with `payara-deploy` (see deployment guide).
  - Docker: set `ROLLBACK_IMAGE` in the rollback job.
  - Vercel: promote the previous deployment in the Vercel dashboard.

## Checklist

- [ ] No secrets, tokens, passwords, or private keys in the diff
- [ ] No debug logs or commented-out code left behind
- [ ] Backward-compatible API/config changes, or a migration plan exists
- [ ] Tests actually run (not skipped)
- [ ] Jira status updated
- [ ] Reviewer approved
