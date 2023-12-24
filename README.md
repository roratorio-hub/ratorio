# ratorio

これは [ROラトリオ避難所](https://roratorio-hinanjo.net/) のソースを勝手に解析しようとしているリポジトリです

## アイテム追加の手順

### 1. アイテムデータをyamlに落とし込む

追加したいアイテムの情報を `/util/equipment.yaml` に書き込んでください。
各アイテムごとに基本情報、精錬値やレベルに応じて発動する追加効果、付与出来るエンチャントを指定出来ます。

### 2. アイテムデータをパースする

`/util/equipment_craft.py` を実行してください。
yaml の内容に応じて `item.dat.js`、`itemset.dat.js`、`mig.enchlist.dat.js` に追加するデータが出力されます。
指示されたファイルにデータを追加してください。
