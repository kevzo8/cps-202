# Template Usage Guide

This guide maps each repository to a template and lists the variables and one-time setup required.

---

## 1. Mapping

| Repository | Template | Artifact | Deploy target |
|---|---|---|---|
| `svi-authentication-java-kyc` | `templates/gitlab-ci-maven-war-payara.yml` | WAR | Payara `/auth-services` |
| `kyc-api` | `templates/gitlab-ci-maven-war-payara.yml` | WAR | Payara `/gen-kyc-api` |
| `svi-authenticationportal-react-kyc` | `templates/gitlab-ci-vite-war-payara.yml` | WAR | Payara `/portal` |
| `svi-sso-admin-panel-javascript-kyc` | `templates/gitlab-ci-vite-war-payara.yml` | WAR | Payara `/sso_admin` |
| `svi-personviewer-react-kyc` | `templates/gitlab-ci-vite-war-payara.yml` | WAR | Payara `/dev/viewer` -> `/viewer` |
| `svi-transactionviewer-react-kyc` | `templates/gitlab-ci-vite-war-payara.yml` | WAR | Payara `/dev/lgu-records-viewer-ui` -> `/lgu-records-viewer-ui` |
| `generic-kyc-owa` | `templates/gitlab-ci-angular-war-payara.yml` | WAR | Payara `/dev/owa` -> `/owa` |
| `svi-authentication-springboot-kyc` | `templates/gitlab-ci-springboot-docker.yml` | Docker image | EC2 Compose |
| `svi-kyc-api-springboot-kyc` | `templates/gitlab-ci-springboot-docker.yml` | Docker image | EC2 Compose |
| `svi-digicash` | `templates/gitlab-ci-node-docker.yml` | Docker image | EC2 Compose |
| `finance-tracker`, `knowledge-center` | `templates/gitlab-ci-nextjs-vercel.yml` | Vercel build | Vercel + Convex |
| `cps-202` | `templates/gitlab-ci-nextjs-vercel.yml` or Vercel Git integration | Vercel build | Vercel |
| `1bataan-crosscheck-tool` | Maven JAR + systemd timer (adapt the Spring Boot template) | Shaded JAR | EC2 batch |

---

## 2. Common prerequisites

### 2.1 GitLab CI/CD variables

Create at the group or project level. Mark production values **protected**.

| Variable | Used by | Example | Secret |
|---|---|---|---|
| `PAYARA_HOST` | Payara templates | `payara-dev.internal` | No |
| `PAYARA_SSH_USER` | Payara templates | `deploy` | No |
| `PAYARA_SSH_PRIVATE_KEY` | Payara templates | file contents | Yes |
| `PAYARA_ADMIN_PORT` | Deploy script on the Payara host | `4848` | No |
| `PAYARA_HTTP_PORT` | Deploy script on the Payara host | `8080` | No |
| `DEV_BASE_URL` | All deploy templates | `https://kyc.dev.svi.cloud` | No |
| `PROD_BASE_URL` | All deploy templates | `https://kyc.svi.cloud` | No |
| `DEV_CONTEXT_ROOT` | Payara templates | `/dev/viewer` | No |
| `PROD_CONTEXT_ROOT` | Payara templates | `/viewer` | No |
| `APP_NAME` | All | `svi-portal` | No |
| `CONTEXT_PATH` | Spring Boot template | `/spring/auth-services` | No |
| `HEALTH_PATH` | All | `/portal/` or `/spring/auth-services/actuator/health` | No |
| `APP_PORT` | Docker templates | `8081` | No |
| `EC2_HOST` | Docker templates | `app-dev.internal` | No |
| `EC2_USER` | Docker templates | `deploy` | No |
| `EC2_SSH_PRIVATE_KEY` | Docker templates | file contents | Yes |
| `EC2_APP_DIR` | Docker templates | `/opt/svi/auth-service` | No |
| `ROLLBACK_WAR` | Payara rollback job | server path from the log | No |
| `ROLLBACK_IMAGE` | Docker rollback job | previous image ref | No |
| `VERCEL_TOKEN` | Vercel template | token | Yes |
| `VERCEL_ORG_ID` | Vercel template | org id | No |
| `VERCEL_PROJECT_ID` | Vercel template | project id | No |
| `PRE_DEPLOY_COMMAND` | Vercel template | `npx convex deploy` | No |
| `CONVEX_DEPLOY_KEY` | Convex-backed repos | deploy key | Yes |
| `JIRA_BASE_URL` | Jira script | `https://svi-jira.atlassian.net` | No |
| `JIRA_EMAIL` | Jira script | service account email | No |
| `JIRA_API_TOKEN` | Jira script | API token | Yes |
| `ENFORCE_JIRA_KEY` | All templates | `true` after adoption | No |

The Docker templates build and push with the built-in `CI_REGISTRY_*` and `CI_JOB_TOKEN`; you do not need to create registry variables in GitLab. The EC2 host needs its own read-only deploy token for `docker login` (see the bootstrap script).

### 2.2 Runner tags

The company templates use:

```yaml
default:
  tags:
    - ec2-docker
```

Deploy, verify, and rollback jobs override the tag:

```yaml
tags:
  - ec2-deploy
```

The runner registration in `04-ec2-runner-and-docker-guide.md` includes both tags. If you use different tags, update the templates. The Vercel template is intentionally untagged so it can run on GitLab shared runners.

### 2.3 Protected branches and environments

At minimum:

- Protect `development` and `master`.
- Protect tags `v*`.
- Create `dev`, `staging` (optional), and `production` environments.
- Require approval on `production` if your GitLab tier supports it.

### 2.4 Server scripts

Copy from `scripts/` to the target hosts:

```bash
sudo install -o root -g root -m 755 scripts/deploy-payara.sh /usr/local/bin/payara-deploy
sudo install -o root -g root -m 755 scripts/deploy-compose.sh /usr/local/bin/deploy-compose
```

The scripts assume:

- `curl` is installed.
- `docker compose` v2 is installed (for Compose deployments).
- The deploy user can run the script as the Payara user or as a user in the `docker` group.

---

## 3. Maven WAR -> Payara

Copy:

```bash
cp templates/gitlab-ci-maven-war-payara.yml .gitlab-ci.yml
```

Set in `.gitlab-ci.yml`:

```yaml
variables:
  APP_NAME: "auth-services"
  DEV_CONTEXT_ROOT: "/auth-services"
  PROD_CONTEXT_ROOT: "/auth-services"
  MAVEN_IMAGE: "maven:3.9-eclipse-temurin-8"
```

Adjust:

- `MAVEN_IMAGE` to match the Java version.
- The test command if the project uses integration tests.
- The artifact path if the WAR name differs.

One-time:

- Install `payara-deploy` on the Payara host.
- Create the `deploy` user and SSH key.
- Add `PAYARA_*` variables.
- Confirm the `asadmin` path.

---

## 4. Vite/React WAR -> Payara

Copy:

```bash
cp templates/gitlab-ci-vite-war-payara.yml .gitlab-ci.yml
```

Set:

```yaml
variables:
  APP_NAME: "svi-portal"
  DEV_CONTEXT_ROOT: "/portal"
  PROD_CONTEXT_ROOT: "/portal"
  NPM_TEST_SCRIPT: "test"
  BUILD_DEV_SCRIPT: "build-dev"
  BUILD_PROD_SCRIPT: "build-prod"
```

Repository-specific notes:

| Repo | `APP_NAME` | Dev context | Prod context | Test script |
|---|---|---|---|---|
| `svi-authenticationportal-react-kyc` | `svi-portal` | `/portal` | `/portal` | `test` |
| `svi-sso-admin-panel-javascript-kyc` | `svi-sso-admin` | `/sso_admin` | `/sso_admin` | `test:run` |
| `svi-personviewer-react-kyc` | `svi-person-viewer` | `/dev/viewer` | `/viewer` | `test` |
| `svi-transactionviewer-react-kyc` | `svi-transaction-viewer` | `/dev/lgu-records-viewer-ui` | `/lgu-records-viewer-ui` | `typecheck` |

If a repo has no test script, set `NPM_TEST_SCRIPT: ""` and the template falls back to `npm run test --if-present`, which is a no-op if the script is absent. Prefer adding a real test instead.

The template installs `default-jdk-headless` because the WAR packager calls `jar`.

Version injection: the build scripts currently hardcode `VERSION`. Before the first tag release, change them to:

```js
const VERSION = process.env.APP_VERSION || 'v0.0.0-dev';
```

The template exports `APP_VERSION` from `CI_COMMIT_TAG` or a dev fallback.

---

## 5. Angular -> Payara

Copy:

```bash
cp templates/gitlab-ci-angular-war-payara.yml .gitlab-ci.yml
```

Set:

```yaml
variables:
  APP_NAME: "svi-owa"
  DEV_CONTEXT_ROOT: "/dev/owa"
  PROD_CONTEXT_ROOT: "/owa"
```

Notes:

- The template runs `ng build --base-href <context>/` and then patches the `<context-root>` element in `dist/TPI-WebApp/WEB-INF/glassfish-web.xml` before packaging.
- Confirm the production context root with the app owner. The current descriptor uses `${ENV=EKYC_OWA_CONTEXT_ROOT}`.
- Karma needs Chrome. The template installs Debian `chromium` and wraps it with `--no-sandbox` for containers. If the image is too heavy, run Karma in a dedicated job and skip it for non-MR builds.

---

## 6. Spring Boot -> Docker -> EC2

Copy:

```bash
cp templates/gitlab-ci-springboot-docker.yml .gitlab-ci.yml
cp templates/Dockerfile.springboot Dockerfile.springboot

# On the EC2 host, once per app:
sudo install -o deploy -g deploy -m 644 templates/docker-compose.app.yml \
  /opt/svi/auth-service/docker-compose.yml
```

Set:

```yaml
variables:
  APP_NAME: "auth-service"
  APP_PORT: "8081"
  CONTEXT_PATH: "/spring/auth-services"
  # Full public path, including the context path:
  HEALTH_PATH: "/spring/auth-services/actuator/health"
  EC2_APP_DIR: "/opt/svi/auth-service"
```

Repository-specific:

| Repo | `APP_NAME` | `APP_PORT` | `CONTEXT_PATH` | `HEALTH_PATH` | `EC2_APP_DIR` |
|---|---|---|---|---|---|
| `svi-authentication-springboot-kyc` | `auth-service` | `8081` | `/spring/auth-services` | `/spring/auth-services/actuator/health` | `/opt/svi/auth-service` |
| `svi-kyc-api-springboot-kyc` | `kyc-api-sb` | `8082` | `/gen-kyc-api-sb` | `/gen-kyc-api-sb/actuator/health` | `/opt/svi/kyc-api-sb` |

Important:

- Set `server.port=8082` in `svi-kyc-api-springboot-kyc` or map it in Compose. The default `8080` conflicts with Payara.
- Add `spring-boot-starter-actuator` for health checks.
- Mount config under `/opt/svi/<app>/config` and set the `*_CONFIG_FILE` environment variables.
- Build the image in CI, not on the server.
- Use a read-only registry token on the server.

The Dockerfile expects the JAR at `target/app.jar`. The CI build job copies the selected executable JAR to that name.

---

## 7. Node/Express -> Docker -> EC2

Copy:

```bash
cp templates/gitlab-ci-node-docker.yml .gitlab-ci.yml

# On the EC2 host, once per app:
sudo install -o deploy -g deploy -m 644 templates/docker-compose.app.yml \
  /opt/svi/svi-digicash/docker-compose.yml
```

Set:

```yaml
variables:
  APP_NAME: "svi-digicash"
  APP_PORT: "3000"
  CONTEXT_PATH: ""
  HEALTH_PATH: "/api/health"
  EC2_APP_DIR: "/opt/svi/svi-digicash"
```

For DigiCash:

- Keep the existing Dockerfile and Nginx config; replace the Compose file with `templates/docker-compose.app.yml`.
- Change Compose to use the registry image instead of `build`.
- Keep `config.env` out of git (already untracked) and render it to `app.env` from SSM/variables.
- The health endpoint `/api/health` already exists.

---

## 8. Next.js / Convex -> Vercel

Copy:

```bash
cp templates/gitlab-ci-nextjs-vercel.yml .gitlab-ci.yml
```

Set:

```yaml
variables:
  VERCEL_ROOT: "."
  PROD_BRANCH: "main"
  PRE_DEPLOY_COMMAND: ""   # set to "npx convex deploy" for finance-tracker and knowledge-center
```

Add masked variables:

```text
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
CONVEX_DEPLOY_KEY   # only for Convex-backed apps
```

Notes:

- If Vercel's Git integration is already connected, the template is optional. The integration is simpler and gives preview URLs automatically.
- Use the template when the team wants one audit trail in GitLab or needs to run tests before deploying.
- Convex deploy keys are project-specific. Do not reuse them across projects.
- Preview deployments run on merge requests and every non-production branch; production deployments are manual on `PROD_BRANCH` or a `v*` tag.
- For monorepos (for example `face-id-matcher/web`), set `VERCEL_ROOT` to the subdirectory.

---

## 9. Batch JAR (1Bataan crosscheck)

There is no dedicated template because the pattern is simple:

```yaml
stages: [build, package, publish, deploy]

build:
  image: maven:3.9-eclipse-temurin-25
  script:
    - mvn --batch-mode --no-transfer-progress clean package
  artifacts:
    paths:
      - target/*.jar

deploy:dev:
  stage: deploy
  image: alpine:3.20
  before_script:
    - apk add --no-cache openssh-client
    - eval "$(ssh-agent -s)"
    - echo "$EC2_SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
    - ssh-keyscan -H "$EC2_HOST" >> ~/.ssh/known_hosts
  script:
    - scp target/*.jar "$EC2_USER@$EC2_HOST:/tmp/crosscheck.jar"
    - ssh "$EC2_USER@$EC2_HOST" "sudo /usr/local/bin/deploy-batch crosscheck /tmp/crosscheck.jar"
  rules:
    - if: '$CI_COMMIT_BRANCH == "development"'
```

The `deploy-batch` script is not part of this pack yet. Write it on the EC2 host following the steps below (the WAR script `deploy-payara.sh` is a good starting point for structure):

1. Create `/opt/batch/crosscheck/releases/<timestamp>/`.
2. Copy the JAR.
3. Update the `current` symlink atomically.
4. Run a dry-run/smoke test.
5. Keep the previous release for rollback.

Run it with a systemd timer or cron, not a long-running web server.

---

## 10. How to test a template safely

1. Create a feature branch.
2. Add `.gitlab-ci.yml`.
3. Set `DRY_RUN: "true"` if your adapted template supports it (add this guard to deploy jobs during the pilot).
4. Run the pipeline.
5. Check the `validate`, `build`, `test`, `package`, and `security` jobs.
6. Run the deploy job manually on the feature branch only if it is scoped to a non-production environment.
7. Check the deploy log on the server.
8. Verify the health URL.
9. Merge to `development` only after the manual test passes.

Add this to deploy jobs during the pilot:

```yaml
rules:
  - if: '$DRY_RUN == "true"'
    when: never
  - if: '$CI_COMMIT_BRANCH == "development"'
```

---

## 11. Common template errors

| Error | Cause | Fix |
|---|---|---|
| `mvn: not found` | Wrong job image | Use the Maven image in the template |
| `jar: not found` | Node image has no JDK | Install `default-jdk-headless` |
| `Permission denied (publickey)` | SSH key or user mismatch | Check variable, public key, and `PAYARA_SSH_USER` |
| `Host key verification failed` | Missing `known_hosts` | Add `ssh-keyscan` or pin the host key |
| `asadmin: command not found` | Wrong `PAYARA_ASADMIN` | Set the correct path on the server |
| `401 Unauthorized` from registry | Missing/expired deploy token | Recreate the read-only token |
| `docker: command not found` | Runner or host missing Docker | Install Docker/Compose |
| `Cannot connect to the Docker daemon` | Runner user not in `docker` group or DinD not privileged | Fix permissions; use a privileged dedicated runner |
| Health check fails but app is up | Wrong path or auth code | Adjust `HEALTH_PATH`; accept 401/403 |
| `EKYC_OWA_CONTEXT_ROOT` appears in URL | Placeholder not replaced | Patch descriptor or pass `--contextroot` |
| Deploy job runs twice | Branch + MR pipeline duplication | Use the `workflow` block from the template |
| Prod deploy triggered by a branch | Missing `rules` | Deploy prod only on `v*` tags with `when: manual` |
| Job stuck with `This job is stuck because you don't have any active runners` | Runner tags do not match | Register the runner with `ec2-docker,ec2-deploy` or update the job tags |
| Smoke test hits the dev host during production | Shared `PUBLIC_BASE_URL` | Use `DEV_BASE_URL` and `PROD_BASE_URL` (already in the templates) |
| Double slash in the health URL | `CONTEXT_PATH` is `/` | Set `CONTEXT_PATH: ""` for apps mounted at the root |
