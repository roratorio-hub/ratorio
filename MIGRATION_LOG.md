# ESModule 移行ログ

## 移行済みファイル

| # | ファイル | 完了日 | 備考 |
|---|---------|--------|------|
| 1 | `roro/common/js/util.js` | 2026-04-25 | 定数4・変数2・関数42をexport。window互換ブロック46シンボル追加 |
| 2 | `roro/m/js/CInstanceManager.js` | 2026-04-25 | `export function CInstanceManager`。window互換ブロック追加 |
| 3 | `ro4/m/js/savedata/SKeyMap.js` | 2026-04-25 | `export class SKeyMap`。window互換ブロック追加 |
| 4 | `ro4/m/js/savedata/CSaveDataConst.js` | 2026-04-25 | `export class CSaveDataConst`。window互換ブロック追加 |
| 5 | `ro4/m/js/savedata/CSaveDataPropInfo.js` | 2026-04-25 | `export class CSaveDataPropInfo`。window互換ブロック追加 |
| 6 | `ro4/m/js/CModalWindow.js` | 2026-04-25 | `export class ModalWindow`。window互換ブロック追加 |
| 7 | `roro/m/js/CGlobalConstManager.js` | 2026-04-25 | `export function` 3シンボル（CConstVarManagementUnit, CGlobalEnumManager, CGlobalConstManager）。window互換ブロック追加 |
| 8 | `ro4/m/js/savedata/CSingletonMapper.js` | 2026-04-25 | `export class CSingletonMapper`。window互換ブロック追加 |
| 9 | `ro4/m/js/savedata/CMultiValueMapper.js` | 2026-04-25 | `export class CMultiValueMapper`。window互換ブロック追加 |
| 10 | `ro4/m/js/savedata/CSaveDataUnitTypeManager.js` | 2026-04-25 | `export class CSaveDataUnitTypeManager`。window互換ブロック追加 |
| 11 | `ro4/m/js/CBattleCalcInfo.js` | 2026-04-25 | `export function CBattleCalcInfo`。window互換ブロック追加 |
| 12 | `roro/m/js/CNewsAreaComponentManager.js` | 2026-04-25 | `export function CNewsAreaComponentManager`。window互換ブロック追加 |

## HTML 対応済み

- `ro4/m/calcx.html`
  - `util.js` → `type="module"`
  - `CInstanceManager.js` → `type="module"`
  - `CModalWindow.js` → `type="module"`
  - `CGlobalConstManager.js` → `type="module"`
  - `CBattleCalcInfo.js` → `type="module"`
  - `savedata/SKeyMap.js` → `type="module"`
  - `savedata/CSingletonMapper.js` → `type="module"`
  - `savedata/CMultiValueMapper.js` → `type="module"`
  - `savedata/CSaveDataConst.js` → `type="module"`
  - `savedata/CSaveDataUnitTypeManager.js` → `type="module"`
  - `savedata/CSaveDataPropInfo.js` → `type="module"`
  - その他 ~50 の `<script>` タグ → `defer` 属性追加
- `roro/other/itemlist.html`, `cardlist.html`, `monsterlist.html`, `petlist.html`, `element.html`, `exp.html`, `jobb.html`
- `util/sortedEnchantCardIdArray.html`
  - 上記8ファイル: `util.js` → `type="module"`、その他スクリプト → `defer` 追加
  - 上記8ファイル（`element.html` 除く）: `CGlobalConstManager.js` → `type="module"`

## 移行方針（確定）

1. 対象ファイルに `export` を付与する
2. ファイル末尾に `window.XXX = XXX` 互換ブロックを追加（未移行ファイルがグローバル参照するため）
3. 対応 HTML の `<script src="...">` を `type="module"` に変更（`defer` は不要、module は暗黙 defer）
4. ファイル名に `debug` / `migration` を含むファイルは優先度低・除外

## 次回やること

### ステップ1: 完了済み（10ファイル変換）

2026-04-25 に12ファイル（#3〜#12）を変換済み。

### ステップ2: 次の変換候補

CGlobalConstManager が移行済みになったので、以下の `.h.js` ファイル群（依存: CGlobalConstManager のみ）が次の有力候補:

- `roro/m/js/alias.h.js`
- `roro/m/js/arrow.h.js`
- `roro/m/js/costume.h.js`
- `roro/m/js/rndopttype.h.js`
- `roro/m/js/rndoptlist.h.js`
- `roro/m/js/monstermap.h.js`
- `roro/m/js/pet.h.js`
- `roro/m/js/itempack.h.js`
- `roro/m/js/usableskill.h.js`
- `roro/m/js/timeitem.h.js`
- `roro/m/js/autospell.h.js`
- `roro/m/js/CAttackMethodConf.js`

また `CSaveDataUnitBase.js` も候補（依存: CSaveDataConst, CSingletonMapper, CMultiValueMapper, CSaveDataPropInfo, CSaveDataConverter, toSafeBigInt, floorBigInt32）。`CSaveDataConverter` と `toSafeBigInt` の所在を先に確認すること。

### ステップ2: window互換ブロックの削除タイミング

全ファイルの移行が完了したら、各ファイルの互換ブロックを削除して純粋なESModuleにする。

## 参考

- チェックリスト: `esmodule-migration-checklist.md`（プロジェクトルート）
- `type="module"` は暗黙 `defer` のため、他スクリプトに `defer` を付けることで実行順を保証
- `ro4/m/calcx.html` には `<base href="../../roro/m/">` があるため `src="js/Xxx.js"` は `roro/m/js/Xxx.js` に解決される
