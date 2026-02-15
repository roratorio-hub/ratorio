#!/bin/bash
set -euo pipefail

# --- clean ---
rm -rf node_modules
mkdir -p ../dist/
rm -f ../dist/*

PNPM_VER="10.29.3"

echo "[1/3] Installing dependencies via pnpm (npx)..."
npx -y "pnpm@${PNPM_VER}" install --frozen-lockfile

echo "[2/3] Building..."
npx -y "pnpm@${PNPM_VER}" build

echo "[3/3] Running yamlMergeAndCompress.ts..."
npx -y "pnpm@${PNPM_VER}" dlx ts-node --project tsconfig.node.json utils/yamlMergeAndCompress.ts

# ---

## memo: 常時ファイルを監視し、ビルドする場合は、以下のコメントアウトを外す
