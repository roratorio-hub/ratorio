#!/bin/bash
rm -rf node_modules
rm -rf package-lock.json
mkdir -p ../dist/
rm -f ../dist/*.zst
npm install
npm run build
npx ts-node --project tsconfig.node.json utils/yamlMergeAndCompress.ts

# memo: 常時ファイルを監視し、ビルドする場合は、以下のコメントアウトを外す
# npm run watch
