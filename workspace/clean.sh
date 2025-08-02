#!/bin/bash
rm -rf node_modules
rm -rf package-lock.json
find ../ro4/m/json/ -name '*.zst' -type f -exec rm -f {} +
find ../ro4/m/json/ -name '*.json' -type f -exec zstd -f {} +
npm install
npm run build

# memo: 常時ファイルを監視し、ビルドする場合は、以下のコメントアウトを外す
# npm run watch
