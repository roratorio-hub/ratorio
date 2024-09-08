# TypeScriptについて
m10iが開発した一部コードにはTypeScriptで作成しております  
こちらをJavaScriptコードに変換するにはNode.js + npmが必要となっています

## 開発環境
```bash
$ node -v
v20.12.2

$ npm -v
10.5.0

$ npx -v
10.5.0

$ npx tsc --version
Version 5.5.4
```

## TypeScript 環境構築
TypeScriptコードからJavaScriptコードを生成するには下記を初回に実施
```bash
$ npm install
$ npx tsc
```

なお、tsファイルを監視して自動コンパイルする場合は`--watch`をつける
```bash
$ npx tsc --watch
```
