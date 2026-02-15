#!/bin/bash
set -euo pipefail

source ./env

# --- clean ---
rm -rf node_modules
mkdir -p ../dist/
rm -f ../dist/*

echo "[1/3] Installing dependencies via pnpm (npx)..."
npx -y "pnpm@${PNPM_VER}" install --frozen-lockfile

echo "[2/3] Building..."
npx -y "pnpm@${PNPM_VER}" build

echo "[3/3] Running yamlMergeAndCompress.ts..."
npx -y "pnpm@${PNPM_VER}" dlx ts-node --project tsconfig.node.json utils/yamlMergeAndCompress.ts
