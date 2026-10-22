# SVI KYC Platform - CI/CD Report Pack

This pack is based on a review of the repositories under `the local workspace` on 2026-10-19. It is written for the SVI KYC team and assumes GitLab.com is the source of truth (`gitlab.com/svi.ph/kyc-digital-verification/...`), Jira Cloud is the work tracker, and deployments land on EC2 (Payara and Docker).

## Start here

| File | Audience | Purpose |
|---|---|---|
| [01-executive-summary.md](01-executive-summary.md) | Managers, leads | One-page problem statement, recommendation, top actions, expected outcomes |
| [02-assessment-and-target-design.md](02-assessment-and-target-design.md) | Engineers, DevOps | Full repo inventory, findings, target architecture, pipeline design, tool comparison, KPIs |
| [03-payara-war-deployment-guide.md](03-payara-war-deployment-guide.md) | Java/frontend devs, release owners | JAR vs WAR, manual Payara upload, automated `asadmin` deploy, rollback, troubleshooting |
| [04-ec2-runner-and-docker-guide.md](04-ec2-runner-and-docker-guide.md) | DevOps, server owners | GitLab Runner on EC2, Docker/Compose, Nginx, secrets, auto-deploy, rollback |
| [05-jira-gitlab-standards.md](05-jira-gitlab-standards.md) | Whole team | Branch/commit/MR conventions, Jira workflow, release/versioning, Definition of Done |
| [06-implementation-roadmap.md](06-implementation-roadmap.md) | Leads, DevOps | Phased rollout, owners, acceptance criteria, risks |
| [07-template-usage.md](07-template-usage.md) | Engineers | Which template to copy into which repo, required variables, how to test |
| [MR-TEMPLATE.md](MR-TEMPLATE.md) | Whole team | Merge request template with Jira, test, deploy, and rollback sections |

## Copy-paste assets

```
templates/
  gitlab-ci-maven-war-payara.yml      Legacy Maven WAR -> Payara
  gitlab-ci-vite-war-payara.yml       React/Vite WAR -> Payara
  gitlab-ci-springboot-docker.yml     Spring Boot JAR -> Docker -> EC2
  gitlab-ci-node-docker.yml           Node/Express -> Docker -> EC2
  gitlab-ci-nextjs-vercel.yml         Next.js/Convex -> Vercel
  gitlab-ci-angular-war-payara.yml    Angular -> WAR -> Payara
  Dockerfile.springboot               Runtime image for Spring Boot JARs
  docker-compose.app.yml              Generic Compose file for EC2
scripts/
  deploy-payara.sh                    Safe deploy + health check + rollback
  deploy-compose.sh                   Pull/up + health check + rollback
  smoke-test.sh                       HTTP smoke test helper
  ec2-bootstrap-runner.sh             Amazon Linux 2023 base setup
  jira-transition.sh                  Optional Jira status transition
```

## The recommendation in one paragraph

Use **GitLab CI/CD** as the single pipeline engine because the company repos already live in GitLab. Build every app the same way (validate -> test -> package -> security scan -> publish artifact), then deploy:

- **Payara apps (WARs)** through a self-hosted GitLab Runner that copies the WAR to the Payara host and runs `asadmin deploy` with a health check and automatic rollback.
- **Spring Boot JARs** as Docker images from GitLab Container Registry, deployed to EC2 with Docker Compose.
- **Node/Docker apps** the same way.
- **Next.js/Convex apps** through Vercel (Git integration or Vercel CLI from GitLab CI).

Auto-deploy the `development` branch to dev. Require a manual approval and a Git tag for production. Link every change to a Jira key, publish immutable artifacts named with version + commit SHA, and keep the last N artifacts on the server for rollback.

## Critical warning - do this first

The review found **credential material committed in repository files**, including cloud keys and application secrets. This report deliberately does not reproduce the values. Before building any pipeline:

1. Rotate every credential that was ever committed (AWS keys, Payara/admin secrets, Keycloak/client secrets, database passwords, DigiCash keys).
2. Remove the values from the files and from Git history.
3. Replace them with GitLab CI/CD variables (masked + protected), AWS Secrets Manager/SSM, or GitLab external secrets.
4. Enable GitLab Secret Detection on every repository.

Details are in [02-assessment-and-target-design.md](02-assessment-and-target-design.md) and [04-ec2-runner-and-docker-guide.md](04-ec2-runner-and-docker-guide.md).

## How to use this pack

1. Read the executive summary and get agreement on GitLab CI + self-hosted EC2 runner.
2. Complete the security cleanup in the roadmap (Phase 0).
3. Pick one Payara app and one Spring Boot app as pilots.
4. Copy the matching template into the repo as `.gitlab-ci.yml`, set the variables, and run it on a feature branch.
5. Deploy to dev automatically, then add the production gate once dev is stable.
6. Apply the Jira/commit/MR standards from day one so reporting and release notes work later.

## Assumptions and placeholders

- Payara host, SSH user, install path, admin credentials, and admin port must be confirmed by the server owner. Templates use `PAYARA_HOST`, `PAYARA_SSH_USER`, and `PAYARA_SSH_PRIVATE_KEY`; the `asadmin` path, admin port, password file, and HTTP port live on the Payara host.
- EC2 host/user/path are represented by `EC2_HOST`, `EC2_USER`, `EC2_SSH_PRIVATE_KEY`, and `EC2_APP_DIR`.
- Dev and prod URLs are separate variables (`DEV_BASE_URL`, `PROD_BASE_URL`) so production smoke tests never hit the dev host.
- The self-hosted runner is registered with `ec2-docker` (build/test) and `ec2-deploy` (SSH deploy/verify/rollback) tags; the Vercel template is untagged for shared runners.
- GitLab tier matters: protected environments and deployment approvals are Premium features on GitLab.com. On Free, use protected branches + manual jobs.
- Jira project keys seen in the codebase: `CPS-*`, `EKYC-*`, and `KYCB-*`.
- GitHub-hosted demo repos (`cps-202`, `cps-272`, `finance-tracker`, `knowledge-center`, `svi-captivate-directory`, `svi-digicash`, `svi-pusopay-demo`, `face-id-matcher`, `openbiometrics`) are covered separately in the assessment. If any of them is production, mirror it to GitLab and use the same standards.
