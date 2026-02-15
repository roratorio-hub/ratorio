#!/bin/bash
set -euo pipefail

source ./env

npx -y "pnpm@${PNPM_VER}" build:watch
