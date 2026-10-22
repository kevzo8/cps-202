# Payara WAR Deployment Guide

**Audience:** developers and release owners who currently upload files through the Payara Admin Console  
**Goal:** explain what Payara accepts, how to deploy manually, and how to automate it safely from GitLab CI

---

## 1. The short version

Payara is a Java EE / Jakarta EE application server. It runs **web applications packaged as WAR files** (and enterprise applications packaged as EAR files). It does **not** run a Spring Boot executable JAR the same way you run it with `java -jar`.

So when someone says "upload the jar to Payara", they usually mean one of these:

| What you have | What it is | Where it goes |
|---|---|---|
| `SVI_Authentication_Java_KYC-v1.0.0.war` | Legacy Java web app | Payara (WAR) |
| `SVI_SSOPortal_React_KYC-v3.0.0-prod.war` | React app packaged as a WAR | Payara (WAR) |
| `LGU_RecordsViewer_UI-v1.0.0-prod.war` | React app packaged as a WAR | Payara (WAR) |
| `SVI_Authentication_SpringBoot_KYC-v2.1.0.jar` | Spring Boot executable JAR | `java -jar` or Docker, **not** Payara |
| `SVI_KYCAPI_Java_KYC-v2.0.0.jar` | Spring Boot executable JAR | `java -jar` or Docker, **not** Payara |
| Payara Micro uber-JAR | A WAR bundled with Payara Micro | `java -jar`, because it contains the server |

Rule of thumb:

- If the file has a `WEB-INF/web.xml` inside, it is a WAR and Payara can deploy it.
- If the file has `BOOT-INF/` and a `Main-Class` manifest, it is a Spring Boot JAR and Payara cannot deploy it directly.
- If you can run it with `java -jar app.jar` and it starts an HTTP server, it is a standalone app, not a Payara app.

---

## 2. What the KYC repositories produce

| Repository | Output | Runtime | Context root |
|---|---|---|---|
| `svi-authentication-java-kyc` | WAR | Payara | `/auth-services` |
| `kyc-api` | WAR | Payara | `/gen-kyc-api` |
| `svi-authenticationportal-react-kyc` | WAR | Payara | `/portal` |
| `svi-sso-admin-panel-javascript-kyc` | WAR | Payara | `/sso_admin` |
| `svi-personviewer-react-kyc` | WAR | Payara | `/viewer` (prod), `/dev/viewer` (dev) |
| `svi-transactionviewer-react-kyc` | WAR | Payara | `/lgu-records-viewer-ui` (prod), `/dev/lgu-records-viewer-ui` (dev) |
| `generic-kyc-owa` | WAR | Payara | `/dev/owa` or `/owa` (confirm) |
| `svi-authentication-springboot-kyc` | Executable JAR | `java -jar` / Docker | `/spring/auth-services` |
| `svi-kyc-api-springboot-kyc` | Executable JAR | `java -jar` / Docker | `/gen-kyc-api-sb` |

The React apps are WARs because the `scripts/build-war.mjs` script runs the Vite build, copies `WEB-INF` and `META-INF`, sets the Payara context root in `glassfish-web.xml`, and calls `jar -cvf` to package the result. That is why the frontend pipeline needs a JDK even though the app is JavaScript.

---

## 3. Manual deployment through the Payara Admin Console

Use this only for emergencies or first-time setup. The target state is automated deployment from CI.

### 3.1 Before you start

You need:

- The Payara host name or IP.
- The admin console URL, usually `http://<payara-host>:4848` or `https://<payara-host>:4848`.
- An admin username and password.
- The WAR file you want to deploy.
- The context root (for example `/portal`).
- A maintenance window if the app is live.

### 3.2 Open the console

1. Open `http://<payara-host>:4848` in a browser.
2. Log in with the Payara admin account.
3. If the page does not load, check the security group / firewall for port `4848` and confirm the domain is running.

### 3.3 Deploy a WAR

1. In the left tree, open **Applications**.
2. Click **Deploy**.
3. Under **Packaged File to Be Uploaded to the Server**, click **Choose File** and select the WAR.
4. Set **Application Name** to a stable name, for example `svi-portal`. Do not include spaces.
5. Set **Context Root** to the URL path, for example `/portal`.
6. Leave **Enabled** checked.
7. Click **OK**.
8. Wait for the deployment to finish. The console shows a success message and the application appears in the list.
9. Open `http://<payara-host>:8080/portal/` and verify the app loads.

### 3.4 Update an existing application

You have two options:

- Re-run **Deploy** with the same **Application Name** and **Context Root**. Payara may ask to overwrite or force re-deploy.
- Or select the application in the list and use **Redeploy** / **Undeploy** then **Deploy**.

Prefer the CLI (`asadmin deploy --force=true`) for automation because it gives a clear exit code and can be scripted.

### 3.5 Common manual mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| Uploading a Spring Boot JAR | Deployment fails or the app does not start | Use `java -jar` or Docker, not Payara |
| Wrong context root | 404 at the expected URL | Check the context root in the console and `glassfish-web.xml` |
| Same app name but different context root | Old URL still serves old app | Undeploy first, then deploy with the new context root |
| Missing external config | App starts but throws DB/Keycloak errors | Check `WEB-INF/configurations` or the external config path |
| Wrong Java version | `UnsupportedClassVersionError` | Use the JDK version the WAR was compiled for |
| Out of memory | `OutOfMemoryError` in `server.log` | Increase Payara JVM heap, check for leaks |

---

## 4. Automated deployment with `asadmin`

### 4.1 How it works

`asadmin` is the Payara command-line administration tool. It can deploy a WAR from the local filesystem or upload it to a remote domain.

The safest pattern for CI:

```
GitLab CI job
  -> SSH to the Payara host as a deploy user
  -> copy the WAR to /tmp
  -> run a small deploy script as the Payara user
  -> asadmin deploy --force=true ...
  -> HTTP health check
  -> rollback automatically if the health check fails
```

Why SSH first instead of connecting to port `4848` from the internet:

- The Payara admin port should not be exposed publicly.
- The admin password stays on the server.
- The deploy user can be restricted with sudoers to one command.
- The WAR is copied over an encrypted channel.

### 4.2 One-time server setup

Run these steps once on the Payara host as a sudo-capable user.

**Create a deploy user**

```bash
sudo useradd --create-home --shell /bin/bash deploy
sudo mkdir -p /opt/payara/deploy-backups /opt/payara/deployments
sudo chown -R payara:payara /opt/payara/deploy-backups /opt/payara/deployments
```

**Create a Payara password file**

```bash
sudo mkdir -p /etc/payara
sudo sh -c 'printf "AS_ADMIN_PASSWORD=%s\n" "REPLACE_WITH_PAYARA_ADMIN_PASSWORD" > /etc/payara/passwordfile'
sudo chown payara:payara /etc/payara/passwordfile
sudo chmod 600 /etc/payara/passwordfile
```

Replace `payara:payara` with the actual Payara OS group/user. The password file must not be world-readable.

**Install the deploy script**

Copy `scripts/deploy-payara.sh` from this pack to `/usr/local/bin/payara-deploy` on the Payara host:

```bash
sudo install -o root -g root -m 755 deploy-payara.sh /usr/local/bin/payara-deploy
```

**Allow the deploy user to run only that script as the Payara user**

```bash
sudo visudo -f /etc/sudoers.d/payara-deploy
```

Add:

```
deploy ALL=(payara) NOPASSWD: /usr/local/bin/payara-deploy
```

Adjust `payara` to the OS user that owns the Payara installation. If your Payara install is owned by `root` but should run as `payara`, use the correct service user. Do not grant a full passwordless shell.

**Confirm paths**

Edit `/usr/local/bin/payara-deploy` or set these in the server environment:

```bash
PAYARA_ASADMIN=/opt/payara/bin/asadmin
PAYARA_PASSWORD_FILE=/etc/payara/passwordfile
PAYARA_ADMIN_USER=admin
PAYARA_HTTP_PORT=8080
PAYARA_BACKUP_DIR=/opt/payara/deploy-backups
PAYARA_DEPLOY_LOG=/opt/payara/deployments/deployments.log
```

The actual `asadmin` path depends on the installation. Common paths are:

```
/opt/payara/bin/asadmin
/opt/payara/payara6/bin/asadmin
/opt/payara/payara5/bin/asadmin
/usr/local/payara6/bin/asadmin
```

Use `command -v asadmin` or `find /opt -name asadmin -type f` to locate it.

### 4.3 Test the deploy script manually

From your workstation:

```bash
scp target/my-app.war deploy@<payara-host>:/tmp/my-app.war
ssh deploy@<payara-host> "sudo -u payara /usr/local/bin/payara-deploy my-app /tmp/my-app.war /my-context"
```

The script should:

1. Validate the WAR.
2. Back up the current WAR.
3. Run `asadmin deploy`.
4. Poll the health URL.
5. Roll back if the health check fails.

Check the deploy log:

```bash
tail -n 50 /opt/payara/deployments/deployments.log
```

### 4.4 `asadmin` command reference

```bash
# List applications
asadmin list-applications

# Deploy a new application
asadmin --user admin --passwordfile /etc/payara/passwordfile \
  deploy --name svi-portal --contextroot /portal /tmp/svi-portal.war

# Force re-deploy an existing application
asadmin --user admin --passwordfile /etc/payara/passwordfile \
  deploy --force=true --name svi-portal --contextroot /portal /tmp/svi-portal.war

# Redeploy an existing application
asadmin --user admin --passwordfile /etc/payara/passwordfile \
  redeploy --name svi-portal /tmp/svi-portal.war

# Undeploy
asadmin --user admin --passwordfile /etc/payara/passwordfile \
  undeploy svi-portal

# Enable / disable
asadmin enable svi-portal
asadmin disable svi-portal

# Backup and restore the domain
asadmin backup-domain --backupDir /opt/payara/backups
asadmin restore-domain --backupFile <backup-file> --filename <restore-name>

# JVM memory
asadmin create-jvm-options --target server -Xmx2g
asadmin delete-jvm-options --target server -Xmx2g

# Restart the domain
asadmin restart-domain
```

### 4.5 Remote `asadmin` vs local `asadmin`

You can run `asadmin` from anywhere if the admin port is reachable and secure:

```bash
asadmin --host payara.example.com --port 4848 --user admin \
  --passwordfile /secure/passwordfile \
  deploy --force=true --name svi-portal --contextroot /portal app.war
```

Only do this if:

- Port `4848` is restricted to the runner's IP or a VPN.
- Secure admin is enabled:
  ```bash
  asadmin enable-secure-admin
  asadmin restart-domain
  ```
- The password file is protected.
- You use TLS or a private network.

For most teams, SSH + local `asadmin` is simpler and safer.

---

## 5. Health checks and rollback

### 5.1 Health check logic

Payara apps may return different codes depending on auth:

- `200` - page or API is up.
- `302` - redirect to login, which is normal.
- `401` / `403` - auth required, which still means the app is running.
- `404` - wrong context root or app not deployed.
- `500` / `503` - app is broken or starting.

A practical health check accepts `200`, `201`, `204`, `301`, `302`, `401`, and `403`, and retries for 60 seconds.

For APIs, prefer a real health endpoint. The legacy apps may not have one; use the context root. The Spring Boot services should add Actuator and expose `/actuator/health`.

### 5.2 Automatic rollback

The `scripts/deploy-payara.sh` script keeps the previous WAR and re-deploys it if the health check fails. This is a best-effort rollback, not a full transaction. Test it in dev.

For production:

- Keep at least five previous WARs.
- Record the version and commit SHA of each deployment.
- If the rollback also fails, restore the Payara domain backup and escalate.

### 5.3 Zero-downtime notes

A single Payara instance will briefly stop or reload an application during `deploy --force` / `redeploy`. Options:

| Option | Effort | Downtime |
|---|---|---|
| Deploy in a low-traffic window | Low | Seconds |
| Two Payara instances behind a load balancer, deploy one at a time | High | None |
| Payara cluster with session replication | High | Near zero |
| Blue-green with separate context roots and a proxy switch | Medium | Near zero |

Start with a low-traffic window for dev and staging. For production, consider a second Payara node if the business requires zero downtime.

---

## 6. Deploy order for a coordinated release

When a release includes backend and frontend changes:

1. Run database migrations (backward-compatible, expand/contract).
2. Deploy the Spring Boot auth service and KYC API (new APIs first).
3. Deploy the Payara backend WARs (legacy auth/API) if changed.
4. Deploy frontend WARs (Portal, Admin, Viewers, OWA).
5. Run smoke tests for each app.
6. Verify login, token issuance, and one end-to-end KYC flow.
7. Update Jira and the release notes.

Why backend first: new frontends may call new endpoints; old frontends should continue to work with the new backend during the rollout. Avoid breaking API changes; version endpoints if needed.

---

## 7. Deployment checklist

### Before deploy

- [ ] Pipeline is green (build, test, scan).
- [ ] Artifact name includes version and commit SHA.
- [ ] Context root is correct for the environment.
- [ ] Environment-specific config is present (DB, Keycloak, API URLs).
- [ ] Database migration is backward-compatible.
- [ ] Rollback artifact is available.
- [ ] Change is linked to a Jira issue.
- [ ] Deployment window approved (prod).

### During deploy

- [ ] Deploy backend before frontend.
- [ ] Watch the CI job log.
- [ ] Watch `server.log` for exceptions.
- [ ] Confirm `asadmin list-applications` shows the app as enabled.
- [ ] Confirm the HTTP health check passes.

### After deploy

- [ ] Smoke test the context root.
- [ ] Log in and exercise the critical flow.
- [ ] Check error logs and metrics for 10-15 minutes.
- [ ] Update Jira to the deployed status.
- [ ] Record the deployment in the release notes.
- [ ] If something is wrong, roll back immediately and open an incident.

---

## 8. Troubleshooting

| Symptom | Likely cause | What to check |
|---|---|---|
| `mvn: not found` in CI | Job image is not a Maven image | Use `maven:3.9-eclipse-temurin-8` or install Maven |
| `jar: not found` in frontend build | Node image has no JDK | Install `default-jdk-headless` or use a JDK+Node image |
| `UnsupportedClassVersionError` | WAR compiled for a newer Java than Payara runs | Check `java -version` and the POM source/target |
| `ClassNotFoundException` | Missing dependency inside the WAR | Check the WAR `WEB-INF/lib`, POM scope |
| `404` after deploy | Wrong context root or app not started | Check `asadmin list-applications`, console, `server.log` |
| `503` after deploy | App failed to start | Check `server.log` for stack traces |
| DB connection errors | External config missing or wrong | Check config files and environment variables |
| Keycloak errors | Wrong realm/client/secret | Check Keycloak config and client secret |
| Deployment succeeds but old code runs | Wrong HTTP port/context or cached assets | Check the URL, browser cache, and app version |
| `OutOfMemoryError` | Heap too small or leak | Increase JVM heap, inspect heap dump |
| Admin console unreachable | Firewall, domain down, secure admin | Check security group, `asadmin list-domains`, `server.log` |
| S3 upload denied | Rotated/incorrect AWS keys | Use GitLab Package Registry or OIDC; do not hardcode keys |

### Where the logs are

```
$PAYARA_HOME/glassfish/domains/domain1/logs/server.log
$PAYARA_HOME/glassfish/domains/domain1/logs/server.log.*
```

Tail the log during a deploy:

```bash
tail -f /opt/payara/glassfish/domains/domain1/logs/server.log
```

### How to confirm what is deployed

```bash
asadmin list-applications
asadmin list-components
```

Also check the deployment log written by the script:

```bash
tail -n 20 /opt/payara/deployments/deployments.log
```

It should contain the app name, context root, WAR file, commit SHA, pipeline URL, and timestamp.

---

## 9. Optional: containerize Payara

If the team wants fully reproducible deployments, Payara can run in Docker. This is optional and should be a separate phase because it affects domain configuration, JVM settings, and persistent data.

Typical pattern:

```dockerfile
FROM payara/server-full:6
COPY target/my-app.war $DEPLOY_DIR
```

Then run the container with a persistent volume for `glassfish/domains/domain1` and a reverse proxy in front. Benefits: identical environments, easy rollback by image tag. Costs: domain configuration, TLS, logging, and clustering must be handled in the container setup.

Do not containerize Payara and the Spring Boot services in the same Compose project unless the networking and config paths are designed together. Prefer one Compose project per app with a shared external Docker network.

---

## 10. What to automate first

1. `svi-authentication-springboot-kyc` - it already has 51 tests and a clean JAR. Use it as the Docker pilot.
2. `svi-authenticationportal-react-kyc` - it already has a WAR build pipeline. Add tests, publish, and deploy to dev.
3. `svi-authentication-java-kyc` or `kyc-api` - legacy WAR, no tests. Add the Payara deploy job but keep the build simple.
4. The remaining React/Angular WARs - after the first two are stable.

Do not start with the largest legacy app. Start with a small, well-understood app and prove the deploy/rollback loop.
