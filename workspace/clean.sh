#!/bin/bash
rm -rf node_modules
mkdir -p ../dist/
rm -f ../dist/*
pnpm install
pnpm build
pnpm exec ts-node --project tsconfig.node.json utils/yamlMergeAndCompress.ts

# memo: 常時ファイルを監視し、ビルドする場合は、以下のコメントアウトを外す
# pnpm run watch
