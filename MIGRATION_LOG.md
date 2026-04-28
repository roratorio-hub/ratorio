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
| 43 | `roro/m/js/rndench.js` | 2026-04-26 | `export function IsEnableRandomEnchant`。window互換ブロック追加 |
| 44 | `roro/m/js/hmrndopt.js` | 2026-04-26 | 19関数を export。`spDefValue` 宣言漏れを `var` で修正。window互換ブロック追加 |
| 45 | `roro/m/js/hmcostume.js` | 2026-04-26 | 6関数を export。window互換ブロック追加 |
| 46 | `roro/m/js/castsim.js` | 2026-04-26 | 10関数を export。トップレベル `g_castsimProgressIntervalArray` 等 2変数を `window.*` 化。window互換ブロック追加 |
| 47 | `ro4/m/js/calchistory.js` | 2026-04-26 | 副作用モジュール（jQuery ready のみ）。JS変更なし、HTMLタグのみ変更 |
| 48 | `ro4/m/js/saveimage.js` | 2026-04-26 | 副作用モジュール（jQuery ready のみ）。JS変更なし、HTMLタグのみ変更 |
| 49 | `roro/m/js/etc.js` | 2026-04-26 | `export const zokusei`, `export const weaponsize`。`weaponsize` は head.js も参照。window互換ブロック追加 |
| 50 | `roro/m/js/quickcontrol.js` | 2026-04-26 | 11関数を export。`g_QuickControlSW` はモジュール内のみ（compat不要）。window互換ブロック追加 |
| 51 | `roro/m/js/learnedskill.js` | 2026-04-26 | 5関数を export。`LEARNED_SKILL_MAX_COUNT`, `n_A_LearnedSkill` を `window.*` 化（equip.js が全体再代入）。window互換ブロック追加 |
| 52 | `roro/m/js/mobconfdebuf.js` | 2026-04-26 | 13関数を export。`MOB_CONF_DEBUF_LIMIT`, `n_B_IJYOU`, `MobConfDebufOBJ` を `window.*` 化。`InitMobConfDebufData` 内の全 `MOB_CONF_DEBUF_*` 定数代入（113箇所）を `window.*` 化。`CConfBase.js` の DefineEnum に依存（テスト時も先にロード要）。window互換ブロック追加 |
| 53 | `roro/m/js/hmchara.js` | 2026-04-27 | 3関数（IsUnconfirmedHP, IsUnconfirmedSP, UpdateCharaDataHtml）を export。window互換ブロック追加 |
| 54 | `roro/m/js/hmmob.js` | 2026-04-27 | 1関数（UpdateMobDataHtml）を export。window互換ブロック追加 |
| 55 | `roro/m/js/browsermigration.js` | 2026-04-27 | 8関数を export。`objRoot` 宣言漏れを `var` で修正。HTMLの `<!--...-->` コメントを解除して `type="module"` に変更。window互換ブロック追加 |
| 56 | `ro4/m/js/CEnchSearch.js` | 2026-04-27 | `export class enchSearch`。window互換ブロック追加 |
| 57 | `roro/m/js/mobconfbuf.js` | 2026-04-27 | 13関数を export。`MOB_CONF_BUF_LIMIT`, `n_B_KYOUKA`（foot.js が全体再代入）, `MobConfBufOBJ` を `window.*` 化。`InitMobConfBufData` 内の全 `MOB_CONF_BUF_*` 定数代入（21箇所）を `window.*` 化。window互換ブロック追加 |
| 58 | `roro/m/js/mobconfplayer.js` | 2026-04-27 | 13関数を export。`MOB_CONF_PLAYER_LIMIT`, `n_B_TAISEI`（foot.js が全体再代入）, `MobConfPlayerOBJ` を `window.*` 化。`InitMobConfPlayerData` 内の全 `MOB_CONF_PLAYER_*` 定数代入（60箇所）を `window.*` 化。window互換ブロック追加 |
| 59 | `ro4/m/js/hmjob.js` | 2026-04-27 | 30関数を export。14個のトップレベル未宣言グローバル（g_pureStatus, g_STR 等）を `window.*` 化。`with(document.calcForm)` 3ブロックを `var _f = document.calcForm;` + 明示参照に変換。`GetTStatusPoint` 内の `stPoint` 宣言漏れを `var` で修正。window互換ブロック追加 |
| 60 | `ro4/m/js/calcautospell.js` | 2026-04-27 | 6関数を export。9個のトップレベル未宣言グローバルを `window.*` 化。`AS_Calc` 内の undeclared vars（skillLvWug, skillLvBlitz, skillLvQuickDraw, skillLvChainAction, skillLvDoubleCasting, skillLvEffectOfSagenoTamashi, skillLvEternalChain, sereKind, sereMode, Lv, itemCount）を `var` 宣言追加。window互換ブロック追加 |
| 61 | `roro/m/js/hmcard.js` | 2026-04-27 | 13関数を export。`CardShortObj` を `window.*` 化（モジュール評価時に CARD_ID_* 定数を参照するため動的 import テストパターン採用）。`funcPushNotExist` 内の `idxF` 宣言漏れを `var` で修正（2箇所）。window互換ブロック追加 |
| 62 | `ro4/m/js/CMonsterMapAreaComponentManager.js` | 2026-04-27 | `export function CMonsterMapAreaComponentManager`。`RebuildControls` 内の `objInput`, `objLabel` 宣言漏れを `var` で修正。window互換ブロック追加 |
| 63 | `roro/m/js/spmode.js` | 2026-04-27 | 2関数（calcSP, OnClickSPMode）を export。7定数 `SPMODE_MONSTER_RESULT_INDEX_*` と 6変数（g_SPMODE_* 等）を `window.*` 化。window互換ブロック追加 |
| 64 | `roro/m/js/mob.js` | 2026-04-27 | 2関数（GetMobDataBasicAttribute, GetMobDataParameters）を export。`B_Original_DEF`, `B_Total_DEF`, `B_Total_MDEF` 代入を `window.*` 化。`head.js` の `let B_Total_DEF`, `let B_Total_MDEF` を `var` に変更（`let` は lexical global で `window.*` を隠蔽する）。window互換ブロック追加 |
| 65 | `roro/m/js/CCalcDataTextCreator.js` | 2026-04-27 | `export function CCalcDataTextCreator`。window互換ブロック追加 |
| 66 | `roro/m/js/CTimeItemAreaComponentManager.js` | 2026-04-27 | `export function CTimeItemAreaComponentManager`。`RebuildControls` に `if (!objRoot) return;` ガード追加（モジュール評価時DOM呼び出しを安全化）。window互換ブロック追加 |
| 67 | `roro/m/js/CBattleQuickControlAreaComponentManager.js` | 2026-04-27 | `export function CBattleQuickControlAreaComponentManager`。`RebuildControls` に `if (!objRoot) return;` ガード追加。window互換ブロック追加 |
| 68 | `ro4/m/js/CBattleCalcResult.js` | 2026-04-27 | `export function CBattleCalcResult`（981行、コンストラクタのみ）。window互換ブロック追加 |
| 69 | `ro4/m/js/CBattleCalcResultAll.js` | 2026-04-27 | `export const instobject`, `export function CBattleCalcResultAll`。`getTotalCount` 内の宣言漏れ `i` を `var i = 0;` で修正。`CBattleCalcResult.js` に `import { instobject }` 追加（クロスファイル依存）。window互換ブロック（instobject含む）追加 |
| 70 | `ro4/m/js/CShadowEquipController.js` | 2026-04-27 | `export class CShadowEquipController`。`g_shadowEquipController = new ...` を `window.g_shadowEquipController = new ...` に変更。`initializeHTML` に `if (!objRoot) return;` ガード追加。window互換ブロック追加 |
| 71 | `roro/m/js/CFloatingInfoAreaComponentManager.js` | 2026-04-27 | 3シンボル（GetFloatingInfoText, CFloatingInfoAreaInfoUnit, CFloatingInfoAreaComponentManager）を export。`RebuildControls` に `if (!objRoot) return;` ガード追加。`CExtraInfoAreaComponentManager` はテスト時 `window` モックで対応。window互換ブロック追加 |
| 72 | `ro4/m/js/CAttackMethodAreaComponentManager.js` | 2026-04-27 | `export function CAttackMethodAreaComponentManager`。`GetEffectiveAttackMethodDataArray` 内の未宣言変数 `bufLv` を `var bufLv = 0;` で修正。window互換ブロック追加 |
| 73 | `roro/m/js/CCustomSelectBase.js` | 2026-04-27 | `export function CCustomSelectBase`。`OnClickApplyButton` 内の `select_id`/`select2_obj_class` 宣言漏れを `var` 修正。window互換ブロック追加 |
| 74 | `roro/m/js/CCustomSelectMapBase.js` | 2026-04-27 | `export function CCustomSelectMapBase`。`import { CCustomSelectBase }` 追加。prototype チェーン維持。window互換ブロック追加 |
| 75 | `roro/m/js/CCustomSelectMapCategory.js` | 2026-04-27 | `export function CCustomSelectMapCategory`。`import { CCustomSelectMapBase }` 追加。window互換ブロック追加 |
| 76 | `roro/m/js/CCustomSelectMapMap.js` | 2026-04-27 | `export function CCustomSelectMapMap`。`import { CCustomSelectMapBase }` 追加。window互換ブロック追加 |
| 77 | `roro/m/js/CCustomSelectMapMonster.js` | 2026-04-27 | `export function CCustomSelectMapMonster`。`import { CCustomSelectBase }` 追加（prototype は `new CCustomSelectBase()`）。`RebuildSelectDataSub` 内の `sortKeyIndex`/`funcGetLabel` 宣言漏れを `var` 修正。window互換ブロック追加 |
| 78 | `roro/m/js/common.js` | 2026-04-27 | サイドエフェクトモジュール。91箇所のトップレベル UPPER_CASE 代入を `window.*` 化。8関数（GetConstDataKindText等）window互換ブロック追加。`import { CGlobalConstManager }` 追加 |
| 79 | `roro/m/js/slotpager.js` | 2026-04-27 | サイドエフェクトモジュール。9箇所のトップレベル定数（SLOTPAGER_MODE_*等）を `window.*` 化。37関数 window互換ブロック追加 |
| 80 | `roro/m/js/CExtraInfoAreaComponentManager.js` | 2026-04-27 | `export function GetExtraInfoText`, `export function CExtraInfoAreaComponentManager`。14変数の宣言漏れ（i, ptmCount, valueTextArraySP, paramArray, loopInfoCheck, selectedTargetId, idxBase, remainPlus, remainMinus, confval, itemCount）を `var` 修正。window互換ブロック追加 |
| 81 | `roro/m/js/saveload.js` | 2026-04-27 | サイドエフェクトモジュール（5600行超の大型ファイル）。`with(document.calcForm)` 4ブロックを `var calcForm = document.calcForm;` + 明示参照に変換（ESM strict mode で `with` は SyntaxError）。`n_NtoS2`/`eqpRgn`/`SaveData`/`wStr`/`wLCF`/`i` 宣言漏れを `var` 修正。`SaveDataAll`/`SaveNameAll` を `window.*` 化（cross-function 共有）。`URLOUT` はコメント内で未定義のため compat から除外。22関数 window互換ブロック追加。`ro4/m/calcx.html` は `<base href="../../roro/m/">` タグにより `src="js/saveload.js"` が `roro/m/js/saveload.js` を指す |
| 82 | `roro/m/js/data/CMigEquipableSpTag.js` | 2026-04-28 | `export function CMigEquipableSpTag`。window互換ブロック追加 |
| 83 | `roro/m/js/data/CMigEquipableStaticData.js` | 2026-04-28 | `export function CMigEquipableStaticData`。window互換ブロック追加 |
| 84 | `roro/m/js/data/CMigEquipableSpData.js` | 2026-04-28 | 3シンボル（CMigEquipableSpDataAttributeMatchingCore, CMigEquipableSpDataAttributeMatcher, CMigEquipableSpData）を export。window互換ブロック追加 |
| 85 | `roro/m/js/data/CMigJobData.js` | 2026-04-28 | `export function CMigJobData`。`import { CGlobalConstManager }` 追加（DefineEnum をトップレベルで呼び出すため）。window互換ブロック追加 |
| 86 | `roro/m/js/data/CMigStateData.js` | 2026-04-28 | `export function CMigStateData`。`import { CGlobalConstManager }` 追加。window互換ブロック追加 |
| 87 | `roro/m/js/data/CMigEquipableData.js` | 2026-04-28 | `export function CMigEquipableData`。`import { CGlobalConstManager }` 追加。window互換ブロック追加 |
| 88 | `roro/m/js/data/CMigConstDataManagerSubBase.js` | 2026-04-28 | `export function CMigConstDataManagerSubBase`。window互換ブロック追加 |
| 89 | `roro/m/js/data/CMigConstDataManagerSubJob.js` | 2026-04-28 | `export function CMigConstDataManagerSubJob`。`import { CMigConstDataManagerSubBase }` 追加。`CMigConstDataManagerSubJob.prototype = new CMigConstDataManagerSubBase()` でプロトタイプチェーン確立。window互換ブロック追加 |
| 90 | `roro/m/js/data/CMigConstDataManagerSubState.js` | 2026-04-28 | 同上パターン（CMigStateData を dataObjectClass に使用） |
| 91 | `roro/m/js/data/CMigConstDataManagerSubBuff.js` | 2026-04-28 | 同上パターン（CMigEquipableData を dataObjectClass に使用） |
| 92 | `roro/m/js/data/CMigConstDataManagerSubMonster.js` | 2026-04-28 | 同上パターン |
| 93 | `roro/m/js/data/CMigConstDataManagerSubArrow.js` | 2026-04-28 | 同上パターン |
| 94 | `roro/m/js/data/CMigConstDataManagerSubItem.js` | 2026-04-28 | 同上パターン |
| 95 | `roro/m/js/data/CMigConstDataManagerSubCard.js` | 2026-04-28 | 同上パターン |
| 96 | `roro/m/js/data/CMigConstDataManagerSubEnchList.js` | 2026-04-28 | 同上パターン |
| 97 | `roro/m/js/data/CMigConstDataManagerSubRndOpt.js` | 2026-04-28 | 同上パターン |
| 98 | `roro/m/js/data/CMigConstDataManager.js` | 2026-04-28 | `export function CMigConstDataManager`。window互換ブロック追加 |
| 99 | `ro4/m/js/saveload.js` | 2026-04-28 | 10関数を export（OnClickSaveSaveData 等）。`ConvertDataTextMIG` 内 `saveDataMappingArrayCurrent` 宣言漏れを `let` で修正。window互換ブロック追加 |
| 100 | `ro4/m/js/global.js` | 2026-04-28 | トップレベル `let`/`const` 24変数を `window.*` 化（ESM `let` はモジュールスコープ限定のため）。`ResetConfDataAllMIG`, `__DIG3` を export。`g_skillManager`, `g_constDataManager` 等を `window.*` 化。window互換ブロック追加 |
| 101 | `ro4/m/js/savedata/CSaveDataUnitBase.js` | 2026-04-28 | `export class CSaveDataUnitBase`。window互換ブロック追加 |
| 102–131 | `ro4/m/js/savedata/CSaveDataUnit{AttackConf,AutoSpells,Chara,CharaBuff,CharaConfBasic,CharaConfSkill,CharaConfSpecBasic,CharaConfSpecialize,CharaDebuff,EquipArrow,EquipRegions,Equipable,ItemBuff,LearnedSkills,Mob,MobBuff,MobConfInput,MobConfPlayer,MobConfPlayer2,MobDebuff,Settings,SkillBuff1st,SkillBuff2nd,SkillBuff3rd,SkillBuff4th,SkillBuffGuild,SkillBuffMusic,SkillBuffSelf,TimeBuff,Version}.js` | 2026-04-28 | 30ファイルをバッチESM化。各ファイルに `import { CSaveDataUnitBase } from './CSaveDataUnitBase.js'` 追加・`export class` 化・window互換ブロック追加 |
| 132 | `ro4/m/js/savedata/CSaveDataUnit.js` | 2026-04-28 | 30個の `const SAVE_DATA_UNIT_TYPE_*` を `window.*` 化（`CSaveDataManager.js`（ESM）等がグローバル参照するため）。export 宣言・window互換ブロックは不要（window.* 代入のみ） |
| 133 | `ro4/m/js/savedata/CSaveDataUnitParse.js` | 2026-04-28 | `import { CSaveDataUnitBase }` 追加・`export class CSaveDataUnitParse extends CSaveDataUnitBase`。private class fields（`#parsedUnitArray`, `#typeValueMin`）はそのまま維持。window互換ブロック追加 |
| 134 | `roro/frame.js` | 2026-04-29 | `export function SwitchBGColor`。トップレベル `g_BGColorSwitch` を `window.g_BGColorSwitch` に変更。window互換ブロック追加 |
| 135 | `roro/m/js/CConfBase.js` | 2026-04-29 | `export function CTargetData`, `export function CConfBase`。window互換ブロック追加 |
| 136 | `roro/m/js/CConfBase2.js` | 2026-04-29 | 5シンボル（CConfBaseSelectData, CConfBaseConfData, CConfBaseRegisterParam, CConfBaseManagementParam, CConfBase2）を export。window互換ブロック追加 |
| 137–146 | `roro/m/js/CCharaConf{Ichizi,Nizi,Sanzi,Yozi,Debuff,CustomStatus,CustomAtk,CustomDef,CustomSkill,CustomSpecStatus}.js` | 2026-04-29 | 10ファイルをバッチ ESM 化。各ファイルに `import { CConfBase } from './CConfBase.js'` 追加・`export function/class` 化・`var objSelect/objOption` 宣言追加（6ファイル）・window互換ブロック追加。`CCharaConfDebuff.js` は `class extends CConfBase` パターン |
| 147 | `roro/m/js/CMobConfInput.js` | 2026-04-29 | `import { CGlobalConstManager }`, `import { CConfBase2, ... }` 追加。5シンボルを export。トップレベル `g_dataManagerMobConfInput` を `window.*` 化。`EncodeData` 内 `value` / `InputModifyProtect` 内 `idx` 宣言漏れを `var` 修正。window互換ブロック追加。テストはソーステキスト検証（IIFE が SIZE_ID_SMALL 等に依存するため直接 import 不可） |
| 148 | `roro/m/js/alias.dat.js` | 2026-04-29 | Pattern A（`window.g_AliasDataArray` は alias.h.js 済み）。コード変更なし。HTMLタグのみ変更 |
| 149 | `roro/m/js/chara.dat.js` | 2026-04-29 | Pattern B。`g_hpBaseTable`/`g_spBaseTable` を `window.*` 化（2変数）。HTMLタグ変更 |
| 150 | `roro/m/js/rndopt.dat.js` | 2026-04-29 | Pattern A（`window.g_rndOptArray` は rndopt.h.js 済み）。コード変更なし。HTMLタグのみ変更 |
| 151 | `roro/m/js/monster.toughness.dat.js` | 2026-04-29 | クラスファイル（IIFE なし）。`window.MonsterToughness = MonsterToughness` compat ブロック追加。HTMLタグ変更 |
| 152 | `roro/m/js/autospell.dat.js` | 2026-04-29 | Pattern B。`AS_ID_*` 237定数＋`AutoSpellSkill` データ配列を `window.*` 化。HTMLタグ変更 |
| 153 | `roro/m/js/monstermap.dat.js` | 2026-04-29 | Pattern A/B 混合。`MONSTER_MAP_ID_*` 6定数を `window.*` 化（Pattern B）、`g_MonsterMapDataArray`/`g_MonsterMapCategoryDataArray` は Pattern A（h.js 済み）。HTMLタグ変更 |
| 154 | `roro/m/js/arrow.dat.js` | 2026-04-29 | Pattern B。`ARROW_ID_*` 41定数を `window.*` 化。`ArrowOBJNew` は Pattern A（h.js 済み）。HTMLタグ変更 |
| 155 | `roro/m/js/pet.dat.js` | 2026-04-29 | Pattern B。`PET_ID_*` 97定数＋`PET_OBJ` データ配列を `window.*` 化。HTMLタグ変更 |
| 156 | `roro/m/js/usableskill.dat.js` | 2026-04-29 | Pattern B。`USABEL_SKILL_ID_*` 193定数＋`InsertSkill` データ配列を `window.*` 化。HTMLタグ変更 |
| 157 | `roro/m/js/timeitem.dat.js` | 2026-04-29 | Pattern A/B 混合。`TIME_ITEM_ID_*` 281定数を `window.*` 化（Pattern B）、`ITEM_SP_TIME_OBJ`/`ITEM_SP_TIME_OBJ_SORT` は Pattern A（h.js 済み）。HTMLタグ変更 |
| 158 | `ro4/m/js/data/mig.job.dat.js` | 2026-04-29 | Pattern B。`MIG_JOB_ID_*` 89定数を `window.*` 化。HTMLタグ変更 |
| 159 | `roro/m/js/data/mig.enchlist.dat.js` | 2026-04-29 | Pattern B。`MIG_ENCH_LIST_ID_SHINENNO_KAIRO_UPGRADE`/`MIG_ENCH_LIST_ID_SHINENTAIBUKI_UPGRADE` 2定数を `window.*` 化。残りは g_constDataManager プロパティチェーン代入（安全）。HTMLタグ変更 |
| 160 | `ro4/m/js/data/mig.job.h.js` | 2026-04-29 | `JOB_ID_ANY`・`JOB_SERIES_ID_*`（25定数）・`g_unconfirmedHPSPArray` を `window.*` 化（計27）。23関数の window 互換ブロック追加（GetJobName, GetLowerJobSeriesID 等）。HTMLタグ変更 |
| 161 | `roro/m/js/data/mig.itemsp.h.js` | 2026-04-29 | `MIG_SKILL_ID_ANY`/`MIG_ITEM_ID_ANY`/`MIG_CARD_ID_ANY`/`MIG_ARROW_ID_ANY`/`MIG_COSTUME_ID_ANY` を `window.*` 化（計5）。15関数の window 互換ブロック追加（MigGetItemSpTagArrayByOldSpID 等）。HTMLタグ変更 |

## バグ修正ログ

| 日付 | ファイル | 問題 | 修正 |
|------|---------|------|------|
| 2026-04-27 | `roro/m/js/CItemInfoManager.js` | `AppendEfficiencyInfoSub` 内 `sourceText` 未宣言 → `ReferenceError` | `var sourceText = "";` を関数先頭の変数宣言ブロックに追加。回帰テスト: `tests/roro/CItemInfoManager.test.js` |
| 2026-04-27 | `roro/m/js/equip.js` | `copyAccs()` がランダムオプションモード時に完全に無効化されていた（アクセサリ SELECT まで影響）| 早期 `return` ガードを削除し、アクセサリ SELECT コピーは常に実行、カードスロットコピーのみカードモード時に限定するよう再構成。回帰テスト: `tests/roro/equip.test.js`（`fetch` + ソース文字列検証） |
| 2026-04-27 | `roro/m/js/hmcard.js` | `ApplyCardShort` 内 `objSelect1` 未宣言 → `ReferenceError` | `var objSelect1 = null;` を変数宣言ブロックに追加。回帰テスト: `tests/roro/hmcard.test.js` |
| 2026-04-27 | `ro4/m/js/calchistory.js`, `ro4/m/js/CSaveController.js` | `g_Chart` がモジュールスコープ `var` のままで他モジュールから参照不可 → `ReferenceError` | `calchistory.js` の `var g_Chart;` を `window.g_Chart = null;` に変更し、全代入を `window.g_Chart = ...` へ。`CSaveController.js` の全 `g_Chart` 参照を `window.g_Chart` へ。回帰テスト: `tests/ro4/calchistory.test.js` |
| 2026-04-27 | `roro/m/js/CItemInfoManager.js` | `RebuildOfficialTradeInformationAnchor` 内 `url` 未宣言 → `ReferenceError` | `var url = "";` を関数宣言ブロックに追加。回帰テスト: `tests/roro/CItemInfoManager.test.js` |
| 2026-04-28 | `roro/m/js/saveload.js` | `SaveSystem` 内 `SaveData` 未宣言 → `ReferenceError`（`OnClickUrlOutMIG` → `CSaveController.encodeToURL` → `SaveSystem` 経路で発生） | `SaveData = new Array()` → `var SaveData = new Array()` に変更。回帰テスト: `tests/roro/saveload.test.js` |
| 2026-04-28 | `ro4/m/js/saveimage.js` | `generateImage` 内 10変数（`regist_elm_vanity`/`elm_ratio`/`regist_ratio`/`idx`/`tpl`/`div`/`dd` およびネストされた arrow 関数内 `count`/`i`/`enchants`/`text`/`options`）未宣言 → `ReferenceError`（画像保存ボタンクリック時） | 関数先頭に `var` 宣言を追加、arrow 関数内を `let` 宣言に変換。`window.generateImage` compat ブロック追加。回帰テスト: `tests/ro4/saveimage.test.js` |
| 2026-04-28 | `roro/m/js/CExtraInfoAreaComponentManager.js` | `RebuildDispAreaCapacity` 内 `objSelect` 未宣言 → `ReferenceError`（情報エリアのマップ/モンスター切替時） | `var objSelect = null;` を関数先頭の変数宣言ブロックに追加。回帰テスト: `tests/roro/CExtraInfoAreaComponentManager.test.js` |
| 2026-04-28 | `roro/m/js/CExtraInfoAreaComponentManager.js` | `RebuildDispAreaEffectiveSp` / `RebuildDispAreaRecovery` / `RebuildDispAreaExp` / `RebuildDispAreaStatusSum` 内 `objSelect` 未宣言 → `ReferenceError`（同上） | 上記4関数に `var objSelect = null;` を追加（計7箇所に宣言が揃った）。既存回帰テストでカバー済み |
| 2026-04-28 | `roro/m/js/CExtraInfoAreaComponentManager.js` | `RefreshDispAreaEffectiveSp` 内 `objSpan` 未宣言 → `ReferenceError`（`RebuildDispAreaEffectiveSp` の `objSelect` 修正後に顕在化。元々の既存バグ） | `var objSpan = null;` を DOM 変数宣言ブロックに追加。回帰テスト: `tests/roro/CExtraInfoAreaComponentManager.test.js` |
| 2026-04-28 | `roro/m/js/CExtraInfoAreaComponentManager.js` | `RefreshDispAreaCastAndDelay` 内 `spanClassName` 未宣言 → `ReferenceError` / `RefreshDispAreaEffectiveSp` 内 `value` 未宣言 → `ReferenceError` | 全 Rebuild/Refresh 関数を一括スキャンし `var spanClassName = "";` / `var value = 0;` を追加。回帰テスト追加 |
| 2026-04-28 | `roro/m/js/castsim.js` | `RefreshCastSimSimulateArea` 内 `lv` / `objOption` 未宣言 → `ReferenceError`（スキル選択変更時） | `var lv = 0;` / `var objOption = null;` を関数先頭に追加。回帰テスト: `tests/roro/castsim.test.js` |
| 2026-04-28 | `ro4/m/js/saveload.js` | `ConvertDataTextMIG` 内 `saveDataMappingArrayCurrent` 未宣言 → ESM strict mode で `ReferenceError`（旧形式セーブデータ変換時） | `let saveDataMappingArrayCurrent = null;` を関数先頭の変数宣言ブロックに追加。回帰テスト: `tests/ro4/saveload.test.js` |
| 2026-04-28 | `ro4/m/js/calchistory.js` | `reload_history_table` 内 `body` / `i` 未宣言 → `ReferenceError`（Listボタンクリック時。ESM移行#47 時点から潜在していたバグ） | `let body = ""` / `for (let i = 0; ...)` に変更。回帰テスト: `tests/ro4/calchistory.test.js` |
| 2026-04-28 | `ro4/m/js/calchistory.js` | `history_clip` クリックハンドラ内 `memo` 未宣言 → `ReferenceError`（clip_with_memoチェック時） | `memo = prompt(...)` → `const memo = prompt(...)` に変更。回帰テスト追加 |

## HTML 対応済み

- `ro4/m/calcx.html`
  - `util.js` → `type="module"`（前セッション）
  - `CInstanceManager.js` → `type="module"`（前セッション）
  - `CModalWindow.js` → `type="module"`（前セッション）
  - `CGlobalConstManager.js` → `type="module"`（前セッション）
  - `CBattleCalcInfo.js` → `type="module"`（前セッション）
  - `savedata/SKeyMap.js` 他5ファイル → `type="module"`（前セッション）
  - 上記20ファイル（#13〜#32）→ `type="module"`（前セッション）
  - #33〜#42 の10ファイル → `type="module"`（前セッション）
  - #43〜#52 の10ファイル → `type="module"`（前セッション）
  - #53〜#62 の10ファイル → `type="module"`（前セッション）。`browsermigration.js` はコメントアウトを解除して追加
  - #63〜#72 の10ファイル → `type="module"`（2026-04-27）
  - #73〜#81 の9ファイル → `type="module"`（2026-04-27）
  - #82〜#99 の18ファイル（CMig* 17ファイル + ro4/m/js/saveload.js）→ `type="module"`（2026-04-28）
  - #100 `global.js` → `type="module"`（2026-04-28）
  - #101 `CSaveDataUnitBase.js` + #102–#131 CSaveDataUnit 30サブクラス + #132 `CSaveDataUnit.js` + #133 `CSaveDataUnitParse.js`（計33ファイル）→ `type="module"`（2026-04-28）
  - #134 `frame.js` → `type="module"`（2026-04-29、`ro4/m/calcx.html` line 2113）
  - #135 `CConfBase.js` + #136 `CConfBase2.js` + #137–#146 CCharaConf* 10ファイル + #147 `CMobConfInput.js`（計13ファイル）→ `type="module"`（2026-04-29）
  - #148–#157 の10ファイル（alias.dat.js, chara.dat.js, rndopt.dat.js, monster.toughness.dat.js, autospell.dat.js, monstermap.dat.js, arrow.dat.js, pet.dat.js, usableskill.dat.js, timeitem.dat.js）→ `type="module"`（2026-04-29）
  - #158–#161 の4ファイル（mig.job.dat.js, mig.enchlist.dat.js, mig.job.h.js, mig.itemsp.h.js）→ `type="module"`（2026-04-29）
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
6. **【必須】未宣言変数を事前に検出してから `export` を付与する**
   - クラシックスクリプトでは `x = 5` が `window.x = 5` として暗黙にグローバル登録されるが、ESM の strict mode では `ReferenceError: x is not defined` になる
   - 移行前に対象ファイル内の関数を目視または `grep` で確認し、`var`/`let`/`const` なしで代入されている変数を `var` 宣言で修正する
   - 典型的パターン: `for (i = 0; i < n; i++)` / `idxSlot = 0;` / `bufLv = someExpr;` など
   - インテグレーションテスト（calcx.html 起動確認）が失敗した場合の第一確認事項もこの宣言漏れ
   - 詳細・テスト手法は `test-driven.md` 「Known pitfalls」参照

## 棚卸し（2026-04-29 更新）

### 残り移行対象ファイル一覧

| グループ | ファイル | 行数 | ステータス |
|---------|---------|------|-----------|
| 小型 IIFE dat | `chara.dat.js`, `pet.dat.js`, `rndopt.dat.js`, `monster.toughness.dat.js`, `usableskill.dat.js`, `autospell.dat.js`, `monstermap.dat.js`, `timeitem.dat.js`, `alias.dat.js`, `arrow.dat.js` | 140〜714行 | **完了（#148–#157, 2026-04-29）** |
| 中型 IIFE dat | `mig.job.dat.js`, `mig.enchlist.dat.js` | 1268〜1624行 | **完了（#158–#159, 2026-04-29）** |
| 中型 h.js | `mig.job.h.js`, `mig.itemsp.h.js` | 2934〜3601行 | **完了（#160–#161, 2026-04-29）** |
| 中型 APP | `equip.js`, `chara.js` | 1905, 11894行 | **BLOCKED（後述）** |
| **巨大ファイル** | **`ro4/m/js/head.js`**, **`roro/m/js/foot.js`** | **22445, 30765行** | 要戦略（後述） |
| 廃止/未使用 | `hmautospell.js`, `hmequip.js`, `hmlearnedskill.js`, `CItemSPSearch.js` | — | ファイルが存在しない（`_draft` にのみ存在）。HTML のコメントアウトをそのまま維持 |

---

### `.dat.js` IIFE ファイルの移行方針（確定）

**パターン A: 列挙定数の上書き（ほぼ全ての `.dat.js`）**

```javascript
// classic (sloppy) での動作
(function () {
    PET_ID_ALICE = 1;  // → window.PET_ID_ALICE が存在していれば書き込み成功
})();
```

対応する `.h.js`（例: `pet.h.js` #19）が `DefineEnum` で `window.PET_ID_ALICE = 0` を設定済みなので、ESM strict mode でも同じ裸名代入が **そのまま動く**。

→ **対応不要。HTML タグを `type="module"` に変えるだけ。**

**パターン B: 初回代入（`chara.dat.js` 等）**

```javascript
(function () {
    g_hpBaseTable = [...];  // window にも local にも未宣言 → strict mode で ReferenceError
})();
```

→ **`window.g_hpBaseTable = [...]` に変更する必要あり**

---

### `equip.js` の移行ブロッカー（2026-04-29 確認）

`equip.js` には `with(document.calcForm)` ブロックが 2 箇所あり（line 245, 1457）、ESM strict mode では `with` は **SyntaxError** のため直接移行不可。

**必要な事前作業:**
1. `with(document.calcForm)` ブロックを `const calcForm = document.calcForm;` + 明示プロパティ参照に変換（`hmjob.js` #59 と同じパターン）
2. `g_bSuperNoviceFullWeapon`（foot.js の関数内 bare assignment で作られる）を `window.*` 初期化
3. `IsLearnedEffectEquipable` 内の `setIndexArray` / `setIndex` / `setDataId` 宣言漏れを `var` 修正
4. 上記完了後に通常の ESM 化手順

---

### `head.js` / `foot.js` の移行戦略（2026-04-29 策定）

#### なぜ難しいか

| 問題 | 内容 |
|------|------|
| `head.js` のトップレベル `let` 宣言 84 個 | classic script では global declarative env に入り他ファイルから参照可能。ESM 化するとモジュールスコープに落ちて **他ファイルから見えなくなる** |
| 30765行 / 22445行 という巨大ファイル | 関数本体内の未宣言変数スキャンに時間がかかる |
| `foot.js` の役割 | `DOMContentLoaded` トリガーの初期化コード群。Init/Calc/Refresh 等が密結合 |

#### なぜ分割しないのか

- 63〜82 の関数が互いに直接呼び合っており、分割境界が不明確
- 分割によって生じる `import` ループや循環依存のリスクが高い
- 分割自体がバグ導入につながる恐れがある

#### 推奨する移行手順（`head.js`）

1. **事前スキャン**: 全 84 個のトップレベル `let` 宣言を列挙し、他ファイルから参照されているものを特定する
2. **`let` → `window.*` 変換**: 他ファイルから参照されるものを `window.X = value` に変更。内部専用のものは `let` のまま（モジュールスコープで完結）
3. **関数内未宣言変数スキャン**: `esm-global-scope-audit.md` の手順で実施
4. **ESM 化**: `export` は不要（side-effect module として `type="module"` に変更するのみ）

#### 推奨する移行手順（`foot.js`）

1. トップレベルに `let/var` 宣言は 0 個なので `let` 変換は不要
2. 関数内未宣言変数スキャン（30765行 × undeclared scan）
3. **ESM 化**: 同上

#### 優先順位

```
先: 残り小〜中型ファイルを全部消化（本セッション〜次2セッション程度）
後: head.js → foot.js の順
理由: head.js の変数が foot.js の関数から参照されているため、head.js を先に片付けた方が foot.js のスキャンが楽になる
```

---

### BLOCKED ファイル群（最新）

| 理由 | ファイル |
|------|---------|
| ~~**継承チェーン（CConfBase）** 12ファイル~~ | → **2026-04-29 解決済み**（#135〜#146） |
| ~~**継承チェーン（CSaveDataUnitBase）** 30ファイル~~ | → **2026-04-28 解決済み**（#101〜#133） |
| ~~**CMobConfInput.js**~~ | → **2026-04-29 解決済み**（#147） |
| **`head.js` / `foot.js`** | トップレベル `let` 84 個の `window.*` 変換 + 全関数スキャンが必要。別途戦略に従い対処 |

## 次回やること

### ステップ3: 次の変換候補

- 上記「即着手可能」の10ファイルを順次変換する
- ~~`ro4/m/js/savedata/CSaveDataUnitBase.js` — BLOCKED~~ → **2026-04-28 解決済み**（#101〜#133）
- `roro/m/js/CConfBase.js`、`CConfBase2.js` — BLOCKED: `CCharaConfIchizi.js` が `CCharaConfIchizi.prototype = new CConfBase()` をトップレベルで実行するため
- `.dat.js` ファイル群（`alias.dat.js`, `item.dat.js`, `card.dat.js` 等）— CAUTION: foot.js より前に実行される defer スクリプトがトップレベルでグローバルを参照するため、変換後は module が defer より後に実行される問題あり

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
