#!/bin/bash
rm -rf node_modules
mkdir -p ../dist/
rm -f ../dist/*
npm install
npm run build
npx ts-node --project tsconfig.node.json utils/yamlMergeAndCompress.ts

# memo: 常時ファイルを監視し、ビルドする場合は、以下のコメントアウトを外す
# npm run watch
