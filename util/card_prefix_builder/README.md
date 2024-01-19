# カード修飾語データ生成
カードの修飾語データを生成します。

### 概要
カード修飾語データを生成します。
2024/1/19 現状は、カードデータ一覧でのみ使用します。

### 必要なもの
* Python
  * requirements.txt
* パッチデータ
  * cardprefixnametable.txt
  * idnum2itemdisplaynametable.txt
  ```data/``` に配備

### 使い方
パッチファイルから 必要なもの にあげたtxtファイルを入手し、```data/```に配備してから下記コマンドを実行してください。

```python card_prefix_builder.py```

__* roro/m/js/card.prefix.dat.js を直接編集します__

