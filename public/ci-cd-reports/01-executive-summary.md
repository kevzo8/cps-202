# CI/CD Executive Summary

**Prepared:** 2026-10-19  
**Scope:** SVI KYC repositories on GitLab.com, Payara-hosted WARs, Spring Boot services, Node/Docker app, EC2 dev server, Jira Cloud  
**Status:** Current pipelines are mostly build-only; deployment is manual; credential material is committed in repositories

## What was reviewed

- 6 GitLab KYC repositories with `.gitlab-ci.yml`
- Legacy Java 8 WAR applications and React/Angular WAR frontends deployed to Payara
- Two Java 25 Spring Boot services packaged as executable JARs
- One Node/Express app deployed to EC2 with Docker Compose
- Next.js/Convex and static frontends hosted outside GitLab
- Branch names, tags, commit messages, tests, POM versions, build scripts, and deployment paths

## Current state in plain terms

| Area | Today | Risk |
|---|---|---|
| Build | Some repos build WARs/JARs in GitLab CI; several repos have no pipeline at all | Different build commands per person, no repeatability |
| Test | Spring Boot pipeline explicitly skips tests; Angular/React tests are not run; some repos have no tests | Regressions reach dev/prod |
| Deploy | Manual Payara Admin Console upload, manual SCP, manual `docker compose up` | No audit trail, wrong-file mistakes, no rollback |
| Artifacts | Legacy WARs uploaded to S3 only on tags; other builds kept 7 days in GitLab | Hard to reproduce or roll back |
| Environments | "prod" frontend configs still point at `kyc.dev.svi.cloud`; dev/prod context roots mixed | Unclear what was deployed where |
| Versions | POM versions, git tags, and hardcoded script versions disagree | Cannot trace a deployed artifact to a commit |
| Security | AWS keys and app secrets are committed in `.gitlab-ci.yml`, `.ini`, `.properties`, and docs | Credential leakage; must rotate now |
| Jira | Jira keys appear in commits and tickets, but GitLab is not consistently linked | No automated traceability or release notes |

## Recommendation

**Standardize on GitLab CI/CD.** It is already the source-control platform, includes merge requests, environments, the Package Registry, the Container Registry, security scanners, and a Jira integration. There is no need to add Jenkins, Codemagic, or GitHub Actions for the company repos.

**Target flow:**

```
feature branch -> MR pipeline (lint, test, build, scan)
development branch -> automatic deploy to dev + smoke test
tag vX.Y.Z -> build immutable release -> manual approval -> deploy prod -> smoke test
```

**Deployment methods:**

| App type | Artifact | Deploy to |
|---|---|---|
| Legacy Java 8 auth/API | WAR | Payara via `asadmin` over SSH |
| React/Vite/Angular frontends | WAR | Payara via `asadmin` over SSH |
| Spring Boot 4 services | Executable JAR -> Docker image | EC2 Docker Compose behind Nginx |
| Node/Express (DigiCash) | Docker image | EC2 Docker Compose |
| Next.js/Convex | Vercel build | Vercel + Convex |
| Batch crosscheck tool | Shaded JAR | EC2 systemd timer/cron |

**Infrastructure:** one small self-hosted GitLab Runner on EC2 (Docker executor, tagged `ec2-docker` and `ec2-deploy`) plus a dedicated `deploy` user on the Payara host with a sudoers rule for one deployment script. No static AWS keys in CI; use GitLab registries first, AWS OIDC/Secrets Manager only where needed.

## Why not the other tools

| Tool | Verdict | Reason |
|---|---|---|
| **GitLab CI/CD** | **Use it** | Native to the repos, built-in registry/scanners/environments, one place for code and deployment history |
| Jenkins | Do not add now | Extra server, plugins, patching, and security surface; only justified for a complex on-prem orchestration need |
| GitHub Actions | Only for personal GitHub repos | The company repos are on GitLab; migrating would add work without benefit |
| Codemagic | Not applicable | Mobile-focused; poor fit for Java/Payara/EC2 |
| Argo CD | Future option | Excellent for Kubernetes, but the platform is EC2 + Payara + Docker, not Kubernetes |
| AWS CodePipeline/CodeDeploy | Optional | Workable, but more AWS-specific moving parts than GitLab CI for this team |

## Top 10 actions

1. **Rotate exposed credentials today** and remove them from Git history. This is not optional.
2. Enable **GitLab Secret Detection** on every repo, including a historic scan.
3. Create **masked + protected CI/CD variables** for Payara, EC2, registry, Jira, Vercel, and Convex.
4. Make `development` the auto-deploy branch to dev; protect `master`/`main`.
5. Fix the Spring Boot pipeline to run the **51 existing test classes**, not `-DskipTests`.
6. Add pipelines to the repos that have none: person viewer, transaction viewer, generic KYC OWA, DigiCash, batch tool.
7. Adopt **immutable artifact naming**: `<app>-<version>-<commit-sha>.war` or Docker tag `<commit-sha>`.
8. Add **health checks and automatic rollback** to every deployment.
9. Adopt **Jira-linked branch/commit/MR conventions** and generate release notes from Jira fix versions.
10. Pilot auto-deploy on **one Payara WAR** and **one Spring Boot service**, then roll out.

## Expected outcomes

| Metric | Target after 2 sprints |
|---|---|
| Manual deployment steps | 0 for dev; 1 approval + 0 manual steps for prod |
| Time from merge to dev | Under 15 minutes |
| Time to roll back | Under 5 minutes |
| Deployments with a traceable artifact | 100% |
| Pipelines running the full test suite | 100% of repos that have tests |
| Secrets in repositories | 0 |
| Payara uploads done through the Admin Console | 0 (except emergencies) |

## Decisions needed from leadership

1. Approve GitLab CI/CD as the standard and a self-hosted EC2 runner.
2. Approve the `development -> dev` auto-deploy and a manual gate for production.
3. Approve a short security cleanup window for credential rotation and history rewrite.
4. Confirm the Payara host owner and the EC2 deploy user/SSH policy.
5. Confirm whether the GitHub demo repos are production or demos; if production, mirror them to GitLab.
