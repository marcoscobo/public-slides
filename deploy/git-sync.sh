#!/bin/sh
set -e
REPO_URL="${REPO_URL:-https://github.com/marcoscobo/public-slides.git}"
BRANCH="${BRANCH:-main}"
POLL_INTERVAL="${POLL_INTERVAL:-60}"
REPO_DIR="/repo"
echo "[git-sync] Starting — repo: $REPO_URL, branch: $BRANCH, poll: ${POLL_INTERVAL}s"
if [ ! -d "$REPO_DIR/.git" ]; then
  echo "[git-sync] Cloning repo..."
  find "$REPO_DIR" -mindepth 1 -delete
  git clone --branch "$BRANCH" --depth 1 "$REPO_URL" "$REPO_DIR"
  echo "[git-sync] Clone complete."
fi
while true; do
  git -C "$REPO_DIR" fetch --depth 1 origin "$BRANCH" 2>&1

  LOCAL=$(git -C "$REPO_DIR" rev-parse HEAD)
  REMOTE=$(git -C "$REPO_DIR" rev-parse "origin/$BRANCH")

  if [ "$LOCAL" != "$REMOTE" ]; then
    echo "[git-sync] $(date -u '+%Y-%m-%dT%H:%M:%SZ') — Changes detected ($LOCAL → $REMOTE), pulling..."
    git -C "$REPO_DIR" reset --hard "origin/$BRANCH"
    echo "[git-sync] Pull complete."
  else
    echo "[git-sync] $(date -u '+%Y-%m-%dT%H:%M:%SZ') — Up to date ($LOCAL)."
  fi

  sleep "$POLL_INTERVAL"
done
