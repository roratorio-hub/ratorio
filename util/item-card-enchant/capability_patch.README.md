# capability_patch  

これは**登録済み**の装備品・カード・エンチャントに、後から追加された能力を足すためのツールです  
（新規登録は [item_craft.py](./item_craft.README.md) / [card_craft.py](./card_craft.README.md) を使います）  

例えば公式のアップデートで「この装備は新しいスキルでもダメージが増える」と効果が追加されたとき  
レコードを手で書き換える代わりに、追加したい能力を `能力追加.yaml` に書いて実行します  

- レコード全体は作り直しません  
    各レコードの末尾（`0]` の直前）に、**足りない能力だけ**を挿入します  
- すでに入っている能力は何もしません（何度実行しても結果は同じです）  
- 同じ能力で値が違っていた場合は、書き換えずに報告だけします  
- 1件でもエラーがあれば、何も書き込みません  

## 1. 準備  

[python](https://www.python.org/downloads/) と PyYAML が必要です（`item_craft.py` と同じです）  

## 2. いまのレコードを見る  

```
python3 capability_patch.py inspect ハルピュイア
python3 capability_patch.py inspect 潜在解放(アリテアI)
python3 capability_patch.py inspect 4225 --kind card
```

レコードの能力を、`item.yaml` と同じ書式で表示します  
セットレコード（「〇〇と共に装備時」の効果）と、時限効果もあわせて表示します  
`⚠` が出たら、そのアイテム・カードの効果が `engine/` のコードでも実装されています（二重に効かないか確認してください）  

## 3. 追加したい能力を書く  

`能力追加.yaml` に、公式サイトの説明どおりの**あるべき姿**を書きます  
すでに登録済みのスキルを含めて、**説明に並んでいるスキルを全部**書いてください（足りないものだけがツールで足されます）  

```yaml
patch_list:
  - item_name: ハルピュイア                # または card_name / item_id / card_id
    capabilities:
      - name: スキルダメージ増加
        skills: ["クレッシブボルト", "ゲイルストーム", "ホークブーメラン"]   # 同じ条件・同じ値ならまとめて書ける
        value: 1
        per_lv: 10
  - card_name: 潜在解放(アリテアI)
    set_with:                              # 「〇〇と共に装備時」の効果はセットレコード側に入っている
      - card_name: 真理の解放
    capabilities:
      - name: スキル固定詠唱ミリ秒減少
        skill: ネイチャーレイジ
        value: 500                         # 時間はミリ秒
  - card_name: 潜在解放(インペリアルガードXVII)
    set_with:
      - card_name: 豪傑
    desc: "[オーバースラッシュ][シールドスラム]使用時、一定確率でAP回復量 + 10"   # 説明文は丸ごと差し替え
```

- 能力の書き方（`name` / `value` / `per_lv` / `at_refine` など）は [item_craft.py](./item_craft.README.md) と同じです  
- スキルを対象にとる能力は `スキルダメージ増加` `スキル変動詠唱割合減少` `スキル変動詠唱ミリ秒減少`  
    `スキル固定詠唱割合減少` `スキル固定詠唱ミリ秒減少` `再使用待機時間減少` `スキル消費SP割合増加` `スキル消費SP固定値減少` に対応しています  
- AP回復量のように能力コードが無い効果は、`desc` に説明文を書きます  
    `desc` は説明文を**丸ごと**差し替えるので、`inspect` で見た今の説明文に足して書いてください  
- 条件の違う行（例: 精錬値7以上と9以上）は、別々の能力として書きます  
- 「一定確率でN秒間、…」の効果は永続能力ではなく**時限効果**（`timeitem.dat.js`）です  
    `time_effect: <時限効果の名前>` を付けると、`capabilities` を時限効果のレコードへ追記します  
    時限効果の説明文は `time_explain` で、セットレコードの説明文は `desc` で、それぞれ丸ごと差し替えます  
    時限効果は `inspect` の出力の末尾に表示されます  

```yaml
  - card_name: 潜在解放(天帝VI)
    set_with: [{card_name: 豪傑}]
    time_effect: 潜在解放(天帝VI)          # 対象に紐づく時限効果の名前
    capabilities:
      - {name: スキル消費SP固定値減少, skill: 七星天脚, value: 229}
    desc: "追加で物理攻撃命中時、一定確率で20秒間、…（セットレコードの説明文）"
```

## 4. 実行する  

```
python3 capability_patch.py apply --dry-run     # 何が足されるかだけ見る（書き込まない）
python3 capability_patch.py apply               # 書き込む
python3 capability_patch.py verify              # 全部入っているか確認する
```

`apply --dry-run` の見方です  

| 記号 | 意味 |
|---|---|
| `+` | 足される能力 |
| `= 登録済み N件` | すでに入っているので何もしない（`-v` で1件ずつ表示） |
| `!` | 同じ能力で値が違う。書き換えないので、直すかどうか人間が決める |
| `*` | 同じ条件の同種の能力がまだ無い、新しい行。公式の説明と合っているか確認する |
| `~` | 説明文の差し替え |
| `?` | レコードにあるのに YAML に書かれていない同種の能力。公式の記載から消えた古い行か、YAML の書き漏らし。書き換えないので確認する |
| `⚠` | `engine/` のコードでもそのアイテム・カードを参照している |

書き込むのは `item.dat.js` と `card.dat.js`、`time_effect` を指定したときの `timeitem.dat.js` だけです  
スキル名は `skill.dat.js` に登録されている名前（`(×)` などの接頭辞を除いたもの）で指定します  
同じ名前のスキルが複数ある場合や、存在しないスキル名はエラーになります  

## 5. テスト  

```
python3 -m unittest test_capability_patch -v
```
