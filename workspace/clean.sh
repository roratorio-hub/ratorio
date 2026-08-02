#!/bin/bash
set -euo pipefail

source ./env

# --- clean ---
rm -rf node_modules
mkdir -p ../dist/
rm -f ../dist/*

echo "[1/2] Installing dependencies via pnpm (npx)..."
npx -y "pnpm@${PNPM_VER}" install --frozen-lockfile

echo "[2/2] Building..."
npx -y "pnpm@${PNPM_VER}" run build
