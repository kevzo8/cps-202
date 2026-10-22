# Jira and GitLab Engineering Standards

**Audience:** entire KYC team  
**Goal:** make work traceable from Jira issue to branch, commit, merge request, artifact, deployment, and release

---

## 1. Why this matters

Today, Jira keys such as `CPS-164`, `CPS-441`, `EKYC-2149`, and `KYCB-787` appear in commits and reports, but the link is manual. That makes it hard to answer:

- Which commit fixed `CPS-164`?
- Which version is deployed to dev right now?
- What changed in `v3.2.0`?
- Which Jira issues are waiting for QA?
- Who approved the production deployment?

The standards below make those questions answerable automatically.

---

## 2. Branch naming

Use lowercase, hyphenated names with the Jira key first.

| Type | Pattern | Example |
|---|---|---|
| Feature | `feature/<JIRA-KEY>-short-description` | `feature/CPS-164-tenant-client-id` |
| Bug fix | `bugfix/<JIRA-KEY>-short-description` | `bugfix/EKYC-2149-empty-status-list` |
| Hotfix | `hotfix/<JIRA-KEY>-short-description` | `hotfix/CPS-999-login-outage` |
| Chore/CI | `chore/<JIRA-KEY>-short-description` or `chore/short-description` | `chore/CPS-500-pipeline-cleanup` |
| Release | `release/<version>` | `release/v3.2.0` |
| Experiment | `spike/<JIRA-KEY>-short-description` | `spike/CPS-343-sdk-evaluation` |

Rules:

- One Jira issue per branch. If a branch covers multiple issues, split it or use the primary key.
- Use lowercase `feature/`, `bugfix/`, `hotfix/`, `chore/`, `release/`, `spike/`.
- Do not use spaces, underscores, or personal names.
- Delete the branch after merge.
- Keep the existing `development` and `master` names, but standardize case. GitLab treats `Development` and `development` as different branches; pick one and protect it.

---

## 3. Commit message convention

Use Conventional Commits with the Jira key in the scope.

```
<type>(<JIRA-KEY>): <short summary>

<optional body>

<optional footer>
```

Types:

| Type | Use for |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `hotfix` | Production emergency fix |
| `refactor` | Code change without behavior change |
| `perf` | Performance improvement |
| `test` | Tests only |
| `docs` | Documentation |
| `build` | Build system or dependencies |
| `ci` | Pipeline changes |
| `chore` | Maintenance |
| `revert` | Revert a previous commit |

Examples:

```
feat(CPS-164): add /tenant/client-id endpoint for frontend bootstrap
fix(EKYC-2149): return empty list when no customer statuses exist
ci(CPS-500): add Payara dev deploy job
docs(CPS-501): document rollback procedure
hotfix(CPS-999): restore login after Keycloak timeout
```

Rules:

- Subject line under 72 characters.
- Use imperative mood: "add", not "added".
- Do not use generic messages such as "update", "fix", "merge", "latest".
- Reference the Jira key in every commit that changes behavior.
- Put breaking changes in the footer: `BREAKING CHANGE: ...`.
- Squash merge is preferred for feature branches so the main history stays readable.

---

## 4. Merge request standard

### 4.1 Title

```
<type>(<JIRA-KEY>): <summary>
```

Example:

```
feat(CPS-164): move client secret validation to the server
```

### 4.2 Description

Use [MR-TEMPLATE.md](MR-TEMPLATE.md). Minimum sections:

- Summary
- Jira link
- Changes
- How tested
- Deployment notes
- Rollback plan
- Screenshots / evidence (UI changes)
- Checklist

### 4.3 Review rules

- At least one approval for normal changes.
- Two approvals for security-sensitive changes (auth, tokens, RBAC, secrets, crypto).
- The author does not approve their own MR.
- All pipeline jobs must pass before merge.
- No direct pushes to `development` or `master`.
- Resolve all threads before merge.
- Delete the source branch after merge.

### 4.4 Merge strategy

| Target | Strategy | Why |
|---|---|---|
| `development` | Squash merge | One clean commit per Jira issue |
| `master` | Merge commit or fast-forward release MR | Preserve release boundary |
| `hotfix/*` to `master` | Merge commit + back-merge to `development` | Do not lose the fix |

---

## 5. Jira workflow mapping

Recommended statuses and triggers:

| Jira status | Trigger | Automation |
|---|---|---|
| To Do | Issue created | None |
| In Progress | Branch created / first commit | Developer moves manually or Jira Automation on branch mention |
| In Review | MR opened | GitLab Jira integration links the MR; optionally transition via REST |
| Ready for QA | Deployed to dev successfully | CI job comments/transitions |
| In QA | QA starts testing | Manual or test management integration |
| Done | Merged to `master` and released | Merge + release job |
| Blocked | Dependency or failure | Manual |

If the Jira workflow uses different names, map them in a table at the top of the project README. Do not hardcode numeric transition IDs in the pipeline; the script resolves transitions by target status name.

### 5.1 GitLab Jira integration

1. In GitLab, open the group or project.
2. Go to **Settings -> Integrations -> Atlassian Jira**.
3. Enter the Jira URL, account email, and API token.
4. Enable the integration and the Jira issues option.
5. Test the connection.
6. Mention Jira keys in commit messages and MR titles/descriptions.

The integration links commits and MRs to Jira issues. It does not replace a proper release process; use Jira fix versions and release notes as described below.

### 5.2 Optional status transition from CI

If the team wants deterministic transitions, add a CI job that calls the Jira REST API. The script is in `scripts/jira-transition.sh`. It needs `JIRA_BASE_URL`, `JIRA_EMAIL`, and `JIRA_API_TOKEN` as masked CI variables, plus `curl` and `jq` in the job image.

The script resolves the transition by target status name (case-insensitive), so store status names, not numeric transition IDs:

```bash
./scripts/jira-transition.sh CPS-164 "In Review" \
  "Deployed to dev: https://gitlab.com/.../-/jobs/123"
```

`AUTO` extracts the issue key from the MR title, commit message, branch name, or tag:

```bash
./scripts/jira-transition.sh AUTO "In Review" "MR !123 opened"
```

Use this only after the dev deploy succeeds. Do not transition on build success alone.

### 5.3 Jira Automation alternative

If the team prefers Jira-side automation:

- Trigger: incoming webhook from GitLab, or a scheduled JQL query.
- Condition: issue key matches the MR/commit and the deployment label is present.
- Action: transition status, add a comment with the pipeline URL.

Document the automation rule in Jira so it is not a hidden dependency.

---

## 6. Versioning and releases

### 6.1 Semantic versioning

Use `vMAJOR.MINOR.PATCH`:

- `MAJOR` - breaking API or data change.
- `MINOR` - backward-compatible feature.
- `PATCH` - backward-compatible fix.

Examples:

```
v3.2.0
v3.2.1
v4.0.0
```

### 6.2 Tag rules

- Tags are created on `master` only.
- Tag format is validated in CI: `^v\d+\.\d+\.\d+([-.][0-9A-Za-z.]+)?$` (pre-release suffixes such as `v3.2.0-rc.1` are allowed).
- Protected tag pattern: `v*`.
- Only maintainers can create release tags.
- A tag pipeline builds and publishes the immutable artifact; it does not rebuild from a different commit.
- The Jira `fixVersion` name matches the tag (for example `v3.2.0`).

### 6.3 POM and package versions

Current drift must be fixed:

- `svi-authentication-springboot-kyc/pom.xml` says `v2.1.0`, but tags go to `v3.2.0`.
- `svi-kyc-api-springboot-kyc/pom.xml` says `v2.0.0`, but tags go to `v4.2.0`.
- React WAR scripts hardcode `v1.0.0` or `v3.0.0`.

Options:

**Option A - align POM version to the tag before release** (simple, explicit)

```bash
mvn versions:set -DnewVersion="$VERSION"
```

**Option B - CI-friendly Maven versions** (preferred)

```xml
<version>${revision}</version>
<properties>
  <revision>0.0.0-SNAPSHOT</revision>
</properties>
```

Build with:

```bash
mvn -Drevision="$VERSION" clean package
```

**Frontend WAR scripts:** replace the hardcoded constant with an environment variable:

```js
const VERSION = process.env.APP_VERSION || 'v0.0.0-dev';
```

Then the pipeline sets:

```yaml
variables:
  APP_VERSION: "$CI_COMMIT_TAG"
```

For branch builds, use `v0.0.0-dev-<short-sha>`.

### 6.4 Release notes

Generate release notes from:

- Jira issues in the fix version.
- Merged MR titles with Jira keys.
- Deployed artifact versions.

Minimum release note fields:

```
Version:
Date:
Environment:
Artifacts:
Jira fix version:
Changes:
  - CPS-164 ...
  - EKYC-2149 ...
Rollback:
  - Previous artifact:
  - Rollback command:
Known issues:
```

Store the release note in the repo (`docs/releases/vX.Y.Z.md`) or attach it to the Jira release. Do not rely on chat history.

---

## 7. Definition of Ready

An issue is ready for development when:

- [ ] Problem and expected behavior are clear.
- [ ] Acceptance criteria are testable.
- [ ] UI/UX design or API contract is attached.
- [ ] Dependencies and impacted apps are listed.
- [ ] Security/privacy impact is assessed.
- [ ] Test approach is agreed.
- [ ] Deployment/rollback impact is understood.
- [ ] Jira issue has a fix version or sprint.

---

## 8. Definition of Done

A change is done when:

- [ ] Code is merged to `master` (or the agreed release branch).
- [ ] Unit tests pass and coverage is not reduced.
- [ ] Lint/typecheck pass.
- [ ] Security scans pass (no new critical/high findings).
- [ ] Artifact is published with version + SHA.
- [ ] Deployed to dev and smoke-tested.
- [ ] QA sign-off is recorded (if applicable).
- [ ] Production deployment is approved and completed (if in release scope).
- [ ] Jira issue is updated with the deployed version and pipeline link.
- [ ] Release notes are updated.
- [ ] Rollback path is documented and tested for high-risk changes.

---

## 9. Protected branches and tags

Recommended GitLab settings:

| Setting | Value |
|---|---|
| Protected branch `master` | Maintainers can merge; no direct push |
| Protected branch `development` | Developers can merge via MR; no direct push |
| Protected tag `v*` | Maintainers only |
| Required MR approvals | 1 normal, 2 security-sensitive |
| Pipelines must succeed | Yes |
| Force push | Disabled on protected branches |
| Code owner approval | Optional, recommended for auth/security paths |
| Merge when pipeline succeeds | Enabled for approved MRs |
| Delete source branch | Enabled by default |

On GitLab Free, some approval features are limited. Use manual deploy jobs plus protected branches as a fallback.

---

## 10. Deployment labels and environments

Use GitLab environments consistently:

```
dev
staging
production
```

Each deployment should record:

- App name
- Version
- Commit SHA
- Artifact URL
- Pipeline URL
- Operator (GitLab user)
- Timestamp
- Health check result
- Rollback artifact

If Jira is updated, add the environment and version in a comment. Example:

```
Deployed to dev
App: svi-authentication-springboot-kyc
Version: v3.2.0
Commit: 5542e56
Pipeline: https://gitlab.com/.../pipelines/123
Health: OK
```

---

## 11. Example end-to-end flow

1. Jira issue `CPS-500` is created: "Add dev auto-deploy for auth service".
2. Developer creates `feature/CPS-500-auth-auto-deploy`.
3. Commits:
   ```
   ci(CPS-500): add Spring Boot Docker pipeline
   fix(CPS-500): run tests in verify stage
   ```
4. Opens an MR titled `ci(CPS-500): add auth service auto-deploy`.
5. MR pipeline runs lint, tests, Docker build, and scans.
6. Reviewer approves; squash merge to `development`.
7. `development` pipeline builds and publishes the image, then deploys to dev.
8. Smoke test passes; CI comments on `CPS-500` with the pipeline link.
9. Developer moves the issue to Ready for QA.
10. QA verifies; issue moves to Done for the sprint.
11. At release time, `master` is merged and tagged `v3.3.0`.
12. Tag pipeline publishes the release artifact; release manager approves `deploy:prod`.
13. Deployment succeeds; Jira fix version `v3.3.0` is released; release notes are published.

---

## 12. Commit and MR checklist

Before opening an MR:

- [ ] Branch name includes the Jira key.
- [ ] Commits use Conventional Commits and include the Jira key.
- [ ] MR title includes the Jira key.
- [ ] Tests were added or updated.
- [ ] `npm test` / `mvn test` passes locally.
- [ ] No secrets, credentials, or personal data in the diff.
- [ ] No debug code, commented-out code, or temporary files.
- [ ] Deployment notes and rollback plan are filled in.
- [ ] Screenshots or recordings are attached for UI changes.

Before merging:

- [ ] Pipeline is green.
- [ ] Required approvals are present.
- [ ] All threads are resolved.
- [ ] Target branch is correct.
- [ ] Jira issue is linked.
- [ ] Release/fix version is set.

---

## 13. Anti-patterns to stop

| Anti-pattern | Why it hurts | Replace with |
|---|---|---|
| Direct push to `master`/`development` | No review, no pipeline gate | Protected branches + MR |
| `fix`, `update`, `latest` commit messages | No traceability | Conventional Commits + Jira key |
| Jira key only in the MR description | Commits lose the link | Jira key in commits and MR title |
| One branch for many unrelated tickets | Hard to review and revert | One issue per branch |
| Merging with failing tests | Regressions reach dev | Required pipeline |
| Tagging from a feature branch | Release artifact not reproducible | Tag `master` only |
| Editing the server by hand after deploy | Drift and undocumented change | Change the repo and redeploy |
| Sharing credentials in chat | No audit, no rotation | Secret manager + CI variables |
| "It works on my machine" builds | Different artifact than deployed | Build only in CI |
