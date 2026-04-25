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
| 13 | `roro/m/js/alias.h.js` | 2026-04-25 | サイドエフェクトモジュール。`window.g_AliasDataArray`、`window.TranslateAlias` |
| 14 | `roro/m/js/arrow.h.js` | 2026-04-25 | サイドエフェクトモジュール。`window.ArrowOBJNew` |
| 15 | `roro/m/js/costume.h.js` | 2026-04-25 | サイドエフェクトモジュール。DefineEnumのみ |
| 16 | `roro/m/js/rndopttype.h.js` | 2026-04-25 | サイドエフェクトモジュール。`window.g_equipRndOptTable`（IIFE内）、`window.g_rndOptTypeArray`、関数3つ |
| 17 | `roro/m/js/rndoptlist.h.js` | 2026-04-25 | サイドエフェクトモジュール。`window.g_rndOptListArray` |
| 18 | `roro/m/js/monstermap.h.js` | 2026-04-25 | サイドエフェクトモジュール。`window.g_MonsterMapDataArray`等、`window.SetUpSortKanaMonsterMap` |
| 19 | `roro/m/js/pet.h.js` | 2026-04-25 | サイドエフェクトモジュール。DefineEnumのみ |
| 20 | `roro/m/js/itempack.h.js` | 2026-04-25 | サイドエフェクトモジュール。DefineEnumのみ |
| 21 | `roro/m/js/usableskill.h.js` | 2026-04-25 | サイドエフェクトモジュール。`window.USABLE_SKILL_ID_CUSTOM_BIAS` |
| 22 | `roro/m/js/timeitem.h.js` | 2026-04-25 | サイドエフェクトモジュール。`window.ITEM_SP_TIME_OBJ`、`window.ITEM_SP_TIME_OBJ_SORT` |
| 23 | `roro/m/js/autospell.h.js` | 2026-04-25 | サイドエフェクトモジュール。`window.AUTO_SPELL_ID_CUSTOM_BIAS`、`window.GetAutoSpellTriggerText` |
| 24 | `roro/m/js/CAttackMethodConf.js` | 2026-04-25 | `export function CAttackMethodConf`。window互換ブロック追加 |
| 25 | `roro/m/js/card.h.js` | 2026-04-25 | サイドエフェクトモジュール。DefineEnumのみ |
| 26 | `roro/m/js/skill.h.js` | 2026-04-25 | サイドエフェクトモジュール。`window.SKILL_LEVEL_VALUE_*` 5定数 |
| 27 | `roro/m/js/monster.h.js` | 2026-04-25 | サイドエフェクトモジュール。関数3つ（GetMonseterElmBasicType等） |
| 28 | `roro/m/js/rndopt.h.js` | 2026-04-25 | サイドエフェクトモジュール。`window.g_rndOptArray`、`window.GetRndOptDispName` |
| 29 | `roro/m/js/itemset.h.js` | 2026-04-25 | サイドエフェクトモジュール。`window.w_SE`等5変数、関数2つ |
| 30 | `roro/m/js/CSaveDataConverter.js` | 2026-04-25 | `export function CSaveDataConverter`。window互換ブロック追加。`toSafeBigInt`/`floorBigInt32`はグローバル参照 |
| 31 | `roro/m/js/CNameKana.js` | 2026-04-25 | `export function CNameKana`。window互換ブロック追加 |
| 32 | `roro/m/js/item.h.js` | 2026-04-25 | サイドエフェクトモジュール。関数12個のwindow互換ブロック追加 |
| 33 | `ro4/m/js/BuffMusicAndDance.js` | 2026-04-26 | `window.n_Skill3SW`, `window.n_A_PassSkill3` に変更。window互換ブロック追加（BUFF_CONF_MUSICAL_LIMIT, Click_Skill3SW, Skill3SW_2, Click_A3） |
| 34 | `ro4/m/js/BuffJobSpecificSelf.js` | 2026-04-26 | `window.n_Skill1SW`, `window.n_A_PassSkill` に変更。window互換ブロック追加（BUFF_CONF_SELF_LIMIT, Click_PassSkillSW, Click_A1, UsedSkillSearch, UsedSkillSearchSubUsedOnly） |
| 35 | `ro4/m/js/BuffGuildAndGospel.js` | 2026-04-26 | `window.n_Skill4SW`, `window.n_A_PassSkill4` に変更。window互換ブロック追加（BUFF_CONF_GUILD_LIMIT, Click_Skill4SW, Click_A4） |
| 36 | `ro4/m/js/BuffItemAndFood.js` | 2026-04-26 | `window.n_Skill7SW`, `window.n_A_PassSkill7` に変更。window互換ブロック追加（BUFF_CONF_FOOD_LIMIT, ID_BUFF_*定数26個, Click_Skill7SW, Click_A7, Click_Food_Off, setAllStatusBuff, toggleAllStatus20） |
| 37 | `ro4/m/js/BuffOtherCategory.js` | 2026-04-26 | `window.n_Skill8SW`, `window.n_A_PassSkill8` に変更。window互換ブロック追加（BUFF_CONF_OTHER_LIMIT, Click_Skill8SW, Click_A8, OnChangePetSelect, RefreshPetExplain） |
| 38 | `roro/m/js/CSaveDataMappingManager.js` | 2026-04-26 | `function CSaveDataMappingManager`（静的クラス）。window互換ブロック追加 |
| 39 | `roro/m/js/CItemInfoManager.js` | 2026-04-26 | `function CItemInfoManager`（静的クラス）。window互換ブロック追加 |
| 40 | `ro4/m/js/CSaveDataManager.js` | 2026-04-26 | `class CSaveDataManager`。window互換ブロック追加 |
| 41 | `ro4/m/js/CSaveController.js` | 2026-04-26 | `class CSaveController`。window互換ブロック追加 |
| 42 | `roro/m/js/CSkillManager.js` | 2026-04-26 | `function CSkillData`, `function CSkillManager`。window互換ブロック追加 |

## HTML 対応済み

- `ro4/m/calcx.html`
  - `util.js` → `type="module"`（前セッション）
  - `CInstanceManager.js` → `type="module"`（前セッション）
  - `CModalWindow.js` → `type="module"`（前セッション）
  - `CGlobalConstManager.js` → `type="module"`（前セッション）
  - `CBattleCalcInfo.js` → `type="module"`（前セッション）
  - `savedata/SKeyMap.js` 他5ファイル → `type="module"`（前セッション）
  - 上記20ファイル（#13〜#32）→ `type="module"`（前セッション）
  - #33〜#42 の10ファイル → `type="module"`（今セッション）
  - その他 ~50 の `<script>` タグ → `defer` 属性追加（前セッション）
- `roro/other/itemlist.html`, `cardlist.html`, `monsterlist.html`, `petlist.html`, `exp.html`, `jobb.html`
- `util/sortedEnchantCardIdArray.html`
  - 上記8ファイル: #33〜#42 のうち CSkillManager.js・CItemInfoManager.js も `type="module"` に変更（今セッション）

## 移行方針（確定）

1. 対象ファイルに `export` を付与する（クラス・関数の主要シンボルがある場合）
2. サイドエフェクトモジュール（`.h.js` 等）は `export` 不要。strict mode 対策として未宣言変数代入を `window.xxx = ...` に変換
3. ファイル末尾に `window.XXX = XXX` 互換ブロックを追加（未移行ファイルがグローバル参照するため）
4. 対応 HTML の `<script src="...">` を `type="module"` に変更（`defer` は不要、module は暗黙 defer）
5. ファイル名に `debug` / `migration` を含むファイルは優先度低・除外

## 次回やること

### ステップ3: 次の変換候補

- `ro4/m/js/savedata/CSaveDataUnitBase.js` — BLOCKED: 全 CSaveDataUnit*.js が `class Foo extends CSaveDataUnitBase` をトップレベルで実行するため、先に全 Unit を移行しないと変換不可
- `roro/m/js/CConfBase.js`、`CConfBase2.js` — BLOCKED: `CCharaConfIchizi.js` が `CCharaConfIchizi.prototype = new CConfBase()` をトップレベルで実行するため
- `.dat.js` ファイル群（`alias.dat.js`, `item.dat.js`, `card.dat.js` 等）— CAUTION: foot.js より前に実行される defer スクリプトがトップレベルでグローバルを参照するため、変換後は module が defer より後に実行される問題あり
- `roro/m/js/CSkillManager.js`, `roro/m/js/CItemInfoManager.js`, `roro/m/js/CSaveDataMappingManager.js` — 今セッションで移行済み

### ステップ4: window互換ブロックの削除タイミング

全ファイルの移行が完了したら、各ファイルの互換ブロックを削除して純粋なESModuleにする。

### toSafeBigInt / floorBigInt32 の所在

`CSaveDataConverter.js` で使用。`util.js` に定義されている可能性が高い（移行済み）。
CSaveDataUnitBase.js 移行の前に確認すること。

## 参考

- チェックリスト: `解析メモ/esmodule-migration-checklist.md`
- `type="module"` は暗黙 `defer` のため、他スクリプトに `defer` を付けることで実行順を保証
- `ro4/m/calcx.html` には `<base href="../../roro/m/">` があるため `src="js/Xxx.js"` は `roro/m/js/Xxx.js` に解決される
- `.h.js` サイドエフェクトモジュールでは `CGlobalConstManager.DefineEnum()` が内部で `Function(name + " = " + value + ";")()` を使うためEnumグローバルは自動的に `window` に登録される（strict mode でも動作する）
