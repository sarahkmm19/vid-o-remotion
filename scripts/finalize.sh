#!/usr/bin/env bash
# Step 7 (Export): render a composition and promote it to outputs/<job>.final.mp4
# Usage: scripts/finalize.sh <composition-id> <job-name>
set -euo pipefail

COMPOSITION_ID="${1:?Usage: scripts/finalize.sh <composition-id> <job-name>}"
JOB_NAME="${2:?Usage: scripts/finalize.sh <composition-id> <job-name>}"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$REPO_ROOT/outputs"
mkdir -p "$OUT_DIR"

npx remotion render "$REPO_ROOT/src/index.ts" "$COMPOSITION_ID" "$OUT_DIR/$JOB_NAME.final.mp4"

echo "Promoted to outputs/$JOB_NAME.final.mp4"
