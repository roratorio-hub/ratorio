# node_modules ディレクトリを削除
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue

# dist ディレクトリが存在しない場合は作成
if (-not (Test-Path "../dist")) {
    New-Item -Path "../dist" -ItemType Directory
}

# dist ディレクトリ内のファイルを削除
Remove-Item -Path "../dist/*" -ErrorAction SilentlyContinue

# npm ci(clean-install) を実行
npm ci

# npm run build を実行
npm run build

# YAMLファイルのマージと圧縮を実行
npx ts-node --project tsconfig.node.json utils/yamlMergeAndCompress.ts

# memo: 常時ファイルを監視し、ビルドする場合は、以下のコメントアウトを外す
# npm run watch
