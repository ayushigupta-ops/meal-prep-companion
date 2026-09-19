#!/usr/bin/env bash
set -euo pipefail

project_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
dist_root="$project_root/dist"

rm -rf "$dist_root"
mkdir -p "$dist_root/server" "$dist_root/.openai/drizzle/meta"
cp "$project_root/worker/index.js" "$dist_root/server/index.js"
cp "$project_root/.openai/drizzle/0000_public_schema.sql" "$dist_root/.openai/drizzle/0000_public_schema.sql"
cp "$project_root/.openai/drizzle/meta/_journal.json" "$dist_root/.openai/drizzle/meta/_journal.json"

if [[ -f "$project_root/.openai/hosting.json" ]]; then
  cp "$project_root/.openai/hosting.json" "$dist_root/.openai/hosting.json"
else
  cp "$project_root/.openai/hosting.example.json" "$dist_root/.openai/hosting.json"
fi

node "$project_root/scripts/validate-client.mjs"
echo "Built $dist_root"
