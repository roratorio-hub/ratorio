# TypeScriptについて
m10iが開発した一部コードにはTypeScriptで作成しております  
こちらをJavaScriptコードに変換するにはNode.js + npm + pnpm が必要となっています

## 開発環境
```bash
$ node -v
v22.22.0

$ npm -v
11.5.2

$ pnpm -v
10.29.3
```

## 一括で行うためのShell script
TypeScriptコードをJavaScriptコードに変換するためのShell scriptを用意しています
```bash
$ cd workspace
$ ./clean.sh
```

## TypeScript 環境構築
~~TypeScriptコードからJavaScriptコードを生成するには下記を初回に実施~~
上記 clean.shを実行することで、TypeScriptコードからJavaScriptコードを生成するための環境構築も同時に行われます


なお、tsファイルを監視して自動コンパイルする場合は`watch`で実行
> ラップしたコマンドは`build:watch`に変更済

```bash
$ ./build_watch.sh
```

---
2026-02-15 更新
