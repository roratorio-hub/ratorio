# TypeScriptについて
m10iが開発した一部コードにはTypeScriptで作成しております  
こちらをJavaScriptコードに変換するにはNode.js + npmが必要となっています

## 開発環境
```bash
$ node -v
v20.12.2

$ npm -v
10.5.0
```

## 一括で行うためのShell script
TypeScriptコードをJavaScriptコードに変換するためのShell scriptを用意しています
```bash
$ cd workspace
$ ./clean.sh
```

## TypeScript 環境構築
TypeScriptコードからJavaScriptコードを生成するには下記を初回に実施
```bash
$ cd workspace
$ npm install
$ npm run build
```

なお、tsファイルを監視して自動コンパイルする場合は`watch`で実行
```bash
$ npm run watch
```
