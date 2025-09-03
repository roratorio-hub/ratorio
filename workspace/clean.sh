#!/bin/bash
rm -rf node_modules
rm -rf package-lock.json
find ./data/ -name '*.zst' -type f -exec rm -f {} +
find ./data/ -name '*.yaml' -type f -exec zstd -f {} +
mkdir -p ../dist/
find ./data/ -name '*.yaml.zst' -type f -exec mv -t ../dist/ {} +
npm install
npm run build
npx ts-node --project tsconfig.node.json utils/yamlMergeAndCompress.ts

# memo: 常時ファイルを監視し、ビルドする場合は、以下のコメントアウトを外す
# npm run watch
