#!/usr/bin/env bash
# ============================================================
# Bootstrap an Amazon Linux 2023 EC2 instance as:
#   - Docker host for application containers
#   - GitLab Runner (Docker executor, Docker socket mounted)
#   - SSH target for Payara/Compose deployments
#
# Run as root on a dedicated EC2 instance:
#   sudo RUNNER_TOKEN=glrt-... ./ec2-bootstrap-runner.sh
#
# Required:
#   RUNNER_TOKEN  GitLab runner authentication/registration token
# Optional:
#   GITLAB_URL          default https://gitlab.com
#   RUNNER_DESCRIPTION  default hostname
#   RUNNER_TAGS         default ec2-docker,ec2-deploy
#   DEPLOY_PUBLIC_KEY   public key added to the deploy user
#   COMPOSE_VERSION     default v2.29.7
# ============================================================
set -Eeuo pipefail

log() {
  printf '%s [bootstrap] %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$*"
}

die() {
  log "ERROR: $*"
  exit 1
}

[ "$(id -u)" -eq 0 ] || die "Run as root (sudo)"
[ -n "${RUNNER_TOKEN:-}" ] || die "RUNNER_TOKEN is required"

GITLAB_URL="${GITLAB_URL:-https://gitlab.com}"
RUNNER_DESCRIPTION="${RUNNER_DESCRIPTION:-$(hostname -f 2>/dev/null || hostname)}"
RUNNER_TAGS="${RUNNER_TAGS:-ec2-docker,ec2-deploy}"
COMPOSE_VERSION="${COMPOSE_VERSION:-v2.29.7}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

log "Installing base packages"
dnf update -y
dnf install -y docker git curl jq unzip tar

log "Configuring Docker log rotation"
mkdir -p /etc/docker
cat > /etc/docker/daemon.json <<'JSON'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
JSON
systemctl enable --now docker
systemctl restart docker

log "Installing Docker Compose ${COMPOSE_VERSION}"
case "$(uname -m)" in
  x86_64) COMPOSE_ARCH="x86_64" ;;
  aarch64|arm64) COMPOSE_ARCH="aarch64" ;;
  *) die "Unsupported architecture: $(uname -m)" ;;
esac
mkdir -p /usr/local/lib/docker/cli-plugins
curl -fsSL \
  "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-linux-${COMPOSE_ARCH}" \
  -o /usr/local/lib/docker/cli-plugins/docker-compose
chmod 755 /usr/local/lib/docker/cli-plugins/docker-compose
docker compose version >/dev/null

log "Creating deploy user"
if ! id deploy >/dev/null 2>&1; then
  useradd -m -s /bin/bash deploy
fi
usermod -aG docker deploy

if [ -n "${DEPLOY_PUBLIC_KEY:-}" ]; then
  log "Adding deploy public key"
  install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
  printf '%s\n' "$DEPLOY_PUBLIC_KEY" >> /home/deploy/.ssh/authorized_keys
  chmod 600 /home/deploy/.ssh/authorized_keys
  chown deploy:deploy /home/deploy/.ssh/authorized_keys
fi

log "Installing deployment scripts"
if [ -f "${SCRIPT_DIR}/deploy-payara.sh" ]; then
  install -m 755 "${SCRIPT_DIR}/deploy-payara.sh" /usr/local/bin/payara-deploy
else
  log "WARNING: ${SCRIPT_DIR}/deploy-payara.sh not found; install it manually"
fi
if [ -f "${SCRIPT_DIR}/deploy-compose.sh" ]; then
  install -m 755 "${SCRIPT_DIR}/deploy-compose.sh" /usr/local/bin/deploy-compose
else
  log "WARNING: ${SCRIPT_DIR}/deploy-compose.sh not found; install it manually"
fi

mkdir -p /opt/svi
chown -R deploy:deploy /opt/svi
if id payara >/dev/null 2>&1; then
  mkdir -p /opt/payara/deploy-backups
  chown -R payara:payara /opt/payara/deploy-backups
fi

log "Installing GitLab Runner"
curl -fsSL "https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh" | bash
dnf install -y gitlab-runner
usermod -aG docker gitlab-runner

log "Registering runner"
gitlab-runner register \
  --non-interactive \
  --url "$GITLAB_URL" \
  --token "$RUNNER_TOKEN" \
  --executor docker \
  --docker-image alpine:3.20 \
  --docker-volumes "/var/run/docker.sock:/var/run/docker.sock" \
  --docker-volumes "/cache" \
  --docker-pull-policy if-not-present \
  --description "$RUNNER_DESCRIPTION" \
  --tag-list "$RUNNER_TAGS"

log "Setting runner concurrency"
if grep -q '^concurrent =' /etc/gitlab-runner/config.toml; then
  sed -i 's/^concurrent =.*/concurrent = 2/' /etc/gitlab-runner/config.toml
else
  sed -i '1i concurrent = 2' /etc/gitlab-runner/config.toml
fi

systemctl enable --now gitlab-runner
systemctl restart gitlab-runner
gitlab-runner verify

log "Bootstrap complete"
cat <<'EOF'

Next steps:
1. Add the deploy SSH private keys as GitLab CI/CD variables
   (EC2_SSH_PRIVATE_KEY for Docker hosts, PAYARA_SSH_PRIVATE_KEY for Payara hosts;
   masked and protected, never committed).
2. Log the host in to the GitLab Container Registry as the deploy user:
     sudo -u deploy docker login registry.gitlab.com
3. Create /opt/svi/<app>/app.env with the runtime secrets (chmod 600).
4. Copy templates/docker-compose.app.yml to /opt/svi/<app>/docker-compose.yml.
5. Open only 22/80/443 in the EC2 security group; do not expose app ports publicly.

WARNING: mounting /var/run/docker.sock gives CI jobs root-equivalent access.
Use this runner only for trusted projects, and protect production variables.
EOF
