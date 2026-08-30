/**
 * 状態から直接セーブデータユニット配列を組み立てる（残件台帳 B-11 Phase A）。
 *
 * `CSaveDataManager.encodeToURL()` は現在、最新形式のセーブを作るのに旧形式の保存処理
 * （`SaveSystem()` → 旧形式文字列 → `translateFromOldFormat()`）を経由している。
 * `buildSaveDataUnitsFromState()` はその迂回を経ずに、DOM/グローバルから各ユニットを
 * 直接組み立てる。移植はユニット型ごとに段階的に進める（Phase A1〜A4）。
 *
 * 既存の `CSaveDataManager#collectDataEquipable()` 等（装備・シャドウ装備・プレイヤー状態異常）
 * と同型のパターンを、翻訳経由だった残りの型へ広げたもの。装備（アイテム/シャドウ）の
 * EQUIP_REGIONS は上記3メソッドが引き続き担当するため、ここでは扱わない
 * （衣装のみ、下記の通り固定値でこの関数が担当する）。
 */
import { CSaveDataUnitTypeManager } from "./CSaveDataUnitTypeManager.js";
import { CSaveDataConst } from "./CSaveDataConst.js";
import {
    SAVE_DATA_UNIT_TYPE_VERSION,
    SAVE_DATA_UNIT_TYPE_CHARA,
    SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS,
    SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS,
    SAVE_DATA_UNIT_TYPE_EQUIP_ARROW,
    SAVE_DATA_UNIT_TYPE_CHARA_BUFF,
    SAVE_DATA_UNIT_TYPE_SKILL_BUFF_SELF,
    SAVE_DATA_UNIT_TYPE_SKILL_BUFF_1ST,
    SAVE_DATA_UNIT_TYPE_SKILL_BUFF_2ND,
    SAVE_DATA_UNIT_TYPE_SKILL_BUFF_3RD,
    SAVE_DATA_UNIT_TYPE_SKILL_BUFF_4TH,
    SAVE_DATA_UNIT_TYPE_SKILL_BUFF_MUSIC,
    SAVE_DATA_UNIT_TYPE_SKILL_BUFF_GUILD,
    SAVE_DATA_UNIT_TYPE_ITEM_BUFF,
    SAVE_DATA_UNIT_TYPE_TIME_BUFF,
    SAVE_DATA_UNIT_TYPE_AUTO_SPELLS,
    SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC,
    SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE,
    SAVE_DATA_UNIT_TYPE_CHARA_CONF_SKILL,
    SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPEC_BASIC,
} from "./CSaveDataUnit.js";
import { HtmlGetObjectCheckedById, HtmlGetObjectValueByIdAsInteger } from "../runtime/util.js";
import { GetHigherJobSeriesID, JOB_SERIES_ID_SUPERNOVICE } from "../data/mig.job.h.js";
import { CONST_DATA_KIND_JOB } from "../const/EnumConstDataKind.js";
import {
    n_A_PassSkill, n_A_PassSkill3, n_A_PassSkill4, n_A_PassSkill7, n_A_PassSkill8,
} from "../skill/skillstate.js";
import { n_A_LearnedSkill } from "../skill/learnedskill.js";
import { n_A_Arrow } from "../runtime/ro4-state.js";
import { n_A_PassSkill5 } from "../runtime/roro-state.js";
import {
    g_confDataIchizi, g_confDataNizi, g_confDataSanzi, g_confDataYozi, g_constDataManager, g_timeItemConf,
    g_confDataCustomStatus, g_confDataCustomAtk, g_confDataCustomDef, g_confDataCustomSkill, g_confDataCustomSpecStatus,
} from "../runtime/global.js";
import {
    AUTO_SPELL_SETTING_COUNT, OBJID_OFFSET_AS_SKILL_ID, OBJID_OFFSET_AS_SKILL_LV, OBJID_OFFSET_AS_SKILL_PROB,
} from "../skill/calcautospell.js";

/** 配列を長さ len に揃える（不足分は0埋め、超過分は切り捨て）。 */
function padArray(arr, len) {
    const out = arr.slice(0, len);
    while (out.length < len) out.push(0);
    return out;
}

/**
 * 「性能カスタマイズ」系ユニット（"Sign"接尾辞プロパティ＋直後の値プロパティのペア、または
 * 単独の値プロパティが混在する可変長プロパティを持つ）共通の組み立て処理.
 * `CSaveDataManager#applyDataToControlsConfig()`/`#applyDataToControlsConfigSpec()` の
 * 読み取りロジック（ctrlFlagを1ビットずつ消費しながらpropNamesを歩き、Signプロパティは
 * 符号を記録するだけで値を積まず、直後の値プロパティにその符号を適用する）を反転したもの。
 * @param {object} unit `SetUpAsDefault()` 済みのユニット
 * @param {Function} UnitClass ユニットのクラス（`static propNames` を持つ）
 * @param {number} prefixCount type/versionを除いた自身のプロパティのうち、値走査の対象外な
 *   先頭プロパティ数（例: instanceKind+subInvalidateSettings+ctrlFlagなら3、
 *   subInvalidateSettings+ctrlFlagのみなら2）
 * @param {number[]} migArray 符号付き整数の平坦配列（値スロット1個につき1要素。
 *   `#applyDataToControlsConfig` 系が最終的に組み立てる g_confDataXxxMIG と同じレイアウト）
 */
function fillConfigValuesFromMigArray(unit, UnitClass, prefixCount, migArray) {
    const propNamesSelf = UnitClass.propNames.slice(2 + prefixCount);
    let migIdx = 0;
    let pendingSignPropName = null;
    for (const propName of propNamesSelf) {
        if (propName.slice(-4) === "Sign") {
            pendingSignPropName = propName;
            continue;
        }
        const rawValue = migArray[migIdx] ?? 0;
        migIdx++;
        if (pendingSignPropName !== null) {
            unit.setProp(pendingSignPropName, rawValue < 0 ? 1 : 0);
            unit.setProp(propName, Math.abs(rawValue));
            pendingSignPropName = null;
        } else {
            unit.setProp(propName, rawValue);
        }
    }
}

/**
 * builder が現在対応しているユニットの識別子一覧（Phase 進行に応じて増える）。
 * `EQUIP_REGIONS`/`EQUIPABLE`/`CHARA_CONF_SPECIALIZE` のように同一 type で複数の「種別」を
 * 持つ型は `dataKind`/`instanceKind` で個別に指定する（未指定なら type 全体が対象）。
 * 差分オラクル（`savedata-collect.test.ts` / `tests/integration/savedata-collect.test.ts`）が
 * 「この Phase までに移植済みのユニットだけを比較する」ために `isMigratedSaveDataUnit()` 経由で参照する。
 */
export const MIGRATED_SAVE_DATA_UNITS = Object.freeze([
    // Phase A1
    { type: SAVE_DATA_UNIT_TYPE_VERSION },
    { type: SAVE_DATA_UNIT_TYPE_CHARA },
    { type: SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS, dataKind: CSaveDataConst.eqpRgnKindCostume },
    { type: SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS },
    { type: SAVE_DATA_UNIT_TYPE_EQUIP_ARROW },
    // Phase A2
    { type: SAVE_DATA_UNIT_TYPE_CHARA_BUFF },
    { type: SAVE_DATA_UNIT_TYPE_SKILL_BUFF_SELF },
    { type: SAVE_DATA_UNIT_TYPE_SKILL_BUFF_1ST },
    { type: SAVE_DATA_UNIT_TYPE_SKILL_BUFF_2ND },
    { type: SAVE_DATA_UNIT_TYPE_SKILL_BUFF_3RD },
    { type: SAVE_DATA_UNIT_TYPE_SKILL_BUFF_4TH },
    { type: SAVE_DATA_UNIT_TYPE_SKILL_BUFF_MUSIC },
    { type: SAVE_DATA_UNIT_TYPE_SKILL_BUFF_GUILD },
    { type: SAVE_DATA_UNIT_TYPE_ITEM_BUFF },
    { type: SAVE_DATA_UNIT_TYPE_TIME_BUFF },
    { type: SAVE_DATA_UNIT_TYPE_AUTO_SPELLS },
    // Phase A3
    { type: SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC },
    { type: SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE, instanceKind: CSaveDataConst.specKindAttackPhysical },
    { type: SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE, instanceKind: CSaveDataConst.specKindAttackMagical },
    { type: SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE, instanceKind: CSaveDataConst.specKindAttackAny },
    { type: SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE, instanceKind: CSaveDataConst.specKindDefencekAny },
    { type: SAVE_DATA_UNIT_TYPE_CHARA_CONF_SKILL },
    { type: SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPEC_BASIC },
]);

/**
 * JSON化済みユニット1件分の parsedMap が `MIGRATED_SAVE_DATA_UNITS` のいずれかに一致するかを判定する。
 * @param {{type: string|number, dataKind?: string|number, instanceKind?: string|number}} parsedMap
 * @returns {boolean}
 */
export function isMigratedSaveDataUnit(parsedMap) {
    const type = Number(parsedMap.type);
    return MIGRATED_SAVE_DATA_UNITS.some((entry) => {
        if (entry.type !== type) return false;
        if (entry.dataKind !== undefined && Number(parsedMap.dataKind) !== entry.dataKind) return false;
        if (entry.instanceKind !== undefined && Number(parsedMap.instanceKind) !== entry.instanceKind) return false;
        return true;
    });
}

/**
 * 現在の職業ID（MigID）を取得する.
 * SaveSystem() と同じく `n_A_JOB` ではなく DOM を直接読む
 * （`document.getElementById("OBJID_SELECT_JOB").value` が一次情報という既存の設計を踏襲）。
 */
function getCurrentJobId() {
    return HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_JOB", 0);
}

/** バージョン情報ユニットを組み立てる（プロパティは type/version のみ）。 */
function buildVersionUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_VERSION))();
    unit.SetUpAsDefault();
    return unit;
}

/**
 * キャラクターステータスユニットを組み立てる.
 * SaveSystem() の [0001-0009]・[1821-1826] 区画（DOM直読み）と同じ入力源を使う。
 * @param {number} jobId `getCurrentJobId()` の戻り値
 */
function buildCharaUnit(jobId) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA))();
    unit.SetUpAsDefault();

    // スーパーノービスの魂（SL_SUPERNOVICE、A1パッシブスキル欄index9）ON で装備制限を無視する。
    // 旧形式では saveDataArrayOld[84] が n_A_PassSkill[9] と同じ値だった（SaveSystem() [0075-0174]区画）。
    const bIgnoreEquipRestrict = (GetHigherJobSeriesID(jobId) === JOB_SERIES_ID_SUPERNOVICE) && (n_A_PassSkill[9] > 0);

    unit.setProp(CSaveDataConst.propNameSubAutoAdjustBaseLv, HtmlGetObjectCheckedById("OBJID_CHECK_AUTO_BASE_LEVEL", false) ? 1 : 0);
    unit.setProp(CSaveDataConst.propNameSubIgnoreEquipRestrict, bIgnoreEquipRestrict ? 1 : 0);
    unit.setProp(CSaveDataConst.propNameJobID, jobId);
    unit.setProp(CSaveDataConst.propNameBaseLv, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_BASE_LEVEL", 0));
    unit.setProp(CSaveDataConst.propNameJobLv, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_JOB_LEVEL", 0));
    unit.setProp(CSaveDataConst.propNameStStr, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_STR", 0));
    unit.setProp(CSaveDataConst.propNameStAgi, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_AGI", 0));
    unit.setProp(CSaveDataConst.propNameStVit, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_VIT", 0));
    unit.setProp(CSaveDataConst.propNameStInt, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_INT", 0));
    unit.setProp(CSaveDataConst.propNameStDex, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_DEX", 0));
    unit.setProp(CSaveDataConst.propNameStLuk, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_LUK", 0));
    unit.setProp(CSaveDataConst.propNameStPow, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_POW", 0));
    unit.setProp(CSaveDataConst.propNameStSta, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_STA", 0));
    unit.setProp(CSaveDataConst.propNameStWis, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_WIS", 0));
    unit.setProp(CSaveDataConst.propNameStSpl, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_SPL", 0));
    unit.setProp(CSaveDataConst.propNameStCon, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_CON", 0));
    unit.setProp(CSaveDataConst.propNameStCrt, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_CRT", 0));

    return unit;
}

/**
 * 装備位置（衣装）ユニットを組み立てる.
 * 次世代版ソースコードの時点で衣装のセーブ・ロードには未対応のため、既存の
 * translateFromOldFormat() と同じ固定値（下段=defID12固定、他部位は常に0）を使う
 * （`CSaveDataManager#collectDataEquipable()` 冒頭コメント参照）。
 */
function buildEquipRegionsCostumeUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameDataKind, CSaveDataConst.eqpRgnKindCostume);
    // 12部位すべてに明示的に値を入れる（未セットのままだと getProp() が undefined を返し、
    // 実パース経由のユニット——常に全プロパティへ0を埋める——と食い違う）。
    unit.setProp(CSaveDataConst.propNameEqpRgnArmsRight, 0);
    unit.setProp(CSaveDataConst.propNameEqpRgnArmsLeft, 0);
    unit.setProp(CSaveDataConst.propNameEqpRgnShield, 0);
    unit.setProp(CSaveDataConst.propNameEqpRgnHeadTop, 0);
    unit.setProp(CSaveDataConst.propNameEqpRgnHeadMid, 0);
    unit.setProp(CSaveDataConst.propNameEqpRgnHeadUnder, 12);
    unit.setProp(CSaveDataConst.propNameEqpRgnBody, 0);
    unit.setProp(CSaveDataConst.propNameEqpRgnShoulder, 0);
    unit.setProp(CSaveDataConst.propNameEqpRgnFoot, 0);
    unit.setProp(CSaveDataConst.propNameEqpRgnAccessory1, 0);
    unit.setProp(CSaveDataConst.propNameEqpRgnAccessory2, 0);
    unit.setProp(CSaveDataConst.propNameEqpRgnArrow, 0);
    unit.doCompaction();
    return unit;
}

/** 習得スキルユニットを組み立てる（n_A_LearnedSkill をそのまま運ぶ）。 */
function buildLearnedSkillsUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameSkillLv, n_A_LearnedSkill);
    unit.doCompaction();
    return unit;
}

/**
 * 矢ユニットを組み立てる.
 * 値は n_A_Arrow+1（0は「未設定」を表すためのオフセット。読み込み側は arrowArray[0]-1 で戻す。
 * CSaveDataManager#applyDataToControls() 参照）。
 */
function buildEquipArrowUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIP_ARROW))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameSubInvalidateSettings, 0);
    unit.setProp(CSaveDataConst.propNameArrow, n_A_Arrow + 1);
    unit.doCompaction();
    return unit;
}

/**
 * 武器属性付与＋その他の支援/設定（A8欄）ユニットを組み立てる.
 * armsElement は SaveSystem() の [0014] 区画（右手武器属性）と同じ DOM を読む。
 */
function buildCharaBuffUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_BUFF))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameArmsElement, HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_ARMS_ELEMENT", 0));
    // n_A_PassSkill8 は70件枠のうち28件分しか実体を持たない（SaveSystem()はn_A_PassSkill8.lengthまでしか
    // 書かないため、旧形式の残り42スロットは常に0だった。同じ挙動を0埋めで再現する）。
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(n_A_PassSkill8, 70));
    unit.doCompaction();
    return unit;
}

/**
 * 職固有自己支援（A1欄・パッシブ持続系）ユニットを組み立てる.
 * SaveSystem() の [0075-0174] 区画は `passiveSkillIdArray.length`（現在の職業の
 * パッシブスキル数）までしか書かない。n_A_PassSkill 自体は全職業共通の固定長51配列
 * （直近に選んでいた別の職業の残存値を含みうる）なので、同じ範囲で切り詰めてから0埋めする。
 * @param {number} jobId `getCurrentJobId()` の戻り値
 */
function buildSkillBuffSelfUnit(jobId) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_SELF))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    const passiveSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, jobId).GetPassiveSkillIdArray();
    const truncated = n_A_PassSkill.slice(0, passiveSkillIdArray.length);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(truncated, 100));
    unit.doCompaction();
    return unit;
}

/** 一次職支援（基本支援）ユニットを組み立てる（g_confDataIchiziをそのまま運ぶ）。 */
function buildSkillBuff1stUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_1ST))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(g_confDataIchizi, 100));
    unit.doCompaction();
    return unit;
}

/** 二次職支援ユニットを組み立てる（g_confDataNiziをそのまま運ぶ）。 */
function buildSkillBuff2ndUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_2ND))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(g_confDataNizi, 50));
    unit.doCompaction();
    return unit;
}

/** 三次職支援ユニットを組み立てる（g_confDataSanziをそのまま運ぶ）。 */
function buildSkillBuff3rdUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_3RD))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(g_confDataSanzi, 100));
    unit.doCompaction();
    return unit;
}

/** 四次職支援ユニットを組み立てる（g_confDataYoziをそのまま運ぶ）。 */
function buildSkillBuff4thUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_4TH))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(g_confDataYozi, 30));
    unit.doCompaction();
    return unit;
}

/**
 * 演奏/踊り系スキル（支援スキル３）ユニットを組み立てる.
 * 機能削除済みのため常に空（n_A_PassSkill3 は47件枠だが、旧形式の位置互換のため
 * 60スロット分0埋めする——SaveSystem() 冒頭コメント参照）。
 */
function buildSkillBuffMusicUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_MUSIC))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(n_A_PassSkill3, 60));
    unit.doCompaction();
    return unit;
}

/** ギルドスキル/ゴスペル/他（A4欄）ユニットを組み立てる（n_A_PassSkill4は36件枠、60スロット中）。 */
function buildSkillBuffGuildUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_GUILD))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(n_A_PassSkill4, 60));
    unit.doCompaction();
    return unit;
}

/**
 * アイテム（食品/他。A7欄）ユニットを組み立てる.
 * subSpeedPot は SaveSystem() の [0013] 区画（速度POT）と同じ DOM を読む。
 * n_A_PassSkill7 は53件枠、70スロット中（末尾は未使用のため0埋め）。
 */
function buildItemBuffUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_ITEM_BUFF))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameSubSpeedPot, HtmlGetObjectValueByIdAsInteger("OBJID_SPEED_POT", 0));
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(n_A_PassSkill7, 70));
    unit.doCompaction();
    return unit;
}

/** 時限効果設定ユニットを組み立てる（g_timeItemConfをそのまま運ぶ）。 */
function buildTimeBuffUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_TIME_BUFF))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameTimeBuffID, padArray(g_timeItemConf, 20));
    unit.doCompaction();
    return unit;
}

/**
 * オートスペル設定ユニットを組み立てる.
 * n_A_PassSkill5 は SkillID/Lv/Prob を OBJID_OFFSET_AS_SKILL_* オフセットで
 * 同一配列内に格納している（calcautospell.js）。SaveSystem() の [1691-1750] 区画と同じ
 * 読み取り方をする。
 */
function buildAutoSpellsUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_AUTO_SPELLS))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    const idArray = [];
    const lvArray = [];
    const probArray = [];
    for (let idx = 0; idx < AUTO_SPELL_SETTING_COUNT; idx++) {
        idArray.push(n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_ID + idx] ?? 0);
        lvArray.push(n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_LV + idx] ?? 0);
        probArray.push(n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_PROB + idx] ?? 0);
    }
    unit.setProp(CSaveDataConst.propNameAutoSpellID, idArray);
    unit.setProp(CSaveDataConst.propNameAutoSpellLv, lvArray);
    unit.setProp(CSaveDataConst.propNameAutoSpellProb, probArray);
    unit.doCompaction();
    return unit;
}

/**
 * 性能カスタマイズ（基本）ユニットを組み立てる.
 *
 * このユニットは名前に反して「ステータス・攻撃・防御・スキル関連の中で個別ユニット化
 * されなかった残り」を運ぶ寄せ集めで、値は複数の g_confDataCustomXxx グローバルから
 * 集まる。マッピングは `CSaveDataManager#applyDataToControls()` 末尾の
 * `g_confDataCustomAtk.splice(...)` 等（"TODO: 構造変更後、撤去予定"というコメント付きの
 * ブロック）を実際に実行して機械的に抽出したもの（手動転記の誤りを避けるため）。
 * mig配列の [28]・[34..45] は上記ブロックのどこからも参照されておらず、対応する
 * 現行UI入力元が無いため常に0（ChangeArms*・StRange・特性ステータス系Plus群など）。
 */
function buildCharaConfBasicUnit() {
    const UnitClass = CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC);
    const unit = new UnitClass();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameSubInvalidateSettings, 0);

    const mig = new Array(46).fill(0);
    for (let i = 0; i < 22; i++) mig[i] = g_confDataCustomStatus[1 + i] ?? 0;
    mig[22] = g_confDataCustomAtk[1] ?? 0;
    mig[23] = g_confDataCustomAtk[2] ?? 0;
    mig[24] = g_confDataCustomAtk[3] ?? 0;
    mig[25] = g_confDataCustomAtk[4] ?? 0;
    mig[26] = g_confDataCustomAtk[11] ?? 0;
    mig[27] = g_confDataCustomAtk[24] ?? 0;
    mig[29] = g_confDataCustomAtk[13] ?? 0;
    mig[30] = g_confDataCustomDef[1] ?? 0;
    mig[31] = g_confDataCustomDef[2] ?? 0;
    mig[32] = g_confDataCustomSkill[2] ?? 0;
    mig[33] = g_confDataCustomSkill[3] ?? 0;

    fillConfigValuesFromMigArray(unit, UnitClass, 2, mig);
    unit.doCompaction();
    return unit;
}

/**
 * 性能カスタマイズ（特化）ユニットを1件組み立てる（物理/魔法/攻撃すべて/防御すべての4種で共有）.
 * マッピングは buildCharaConfBasicUnit() と同じ抽出方法による
 * （`g_confDataSpecMIG[x][y][N]` ← `g_confDataCustomAtk`/`Def`[M]、位置は
 * `#applyDataToControlsConfigSpec()` の読み取り順で決まる）。
 * @param {number} instanceKind CSaveDataConst.specKindAttackPhysical 等
 * @param {number[]} mig 54要素の符号付き整数配列
 */
function buildCharaConfSpecializeUnit(instanceKind, mig) {
    const UnitClass = CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE);
    const unit = new UnitClass();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.instanceKind, instanceKind);
    unit.setProp(CSaveDataConst.propNameSubInvalidateSettings, 0);
    fillConfigValuesFromMigArray(unit, UnitClass, 3, mig);
    unit.doCompaction();
    return unit;
}

/** 性能カスタマイズ（特化：攻撃｜物理）ユニットを組み立てる。 */
function buildCharaConfSpecializePhysicalUnit() {
    const mig = new Array(54).fill(0);
    mig[0] = g_confDataCustomAtk[5] ?? 0;
    mig[14] = g_confDataCustomAtk[6] ?? 0;
    mig[26] = g_confDataCustomAtk[25] ?? 0;
    mig[37] = g_confDataCustomAtk[7] ?? 0;
    mig[41] = g_confDataCustomAtk[8] ?? 0;
    mig[44] = g_confDataCustomAtk[22] ?? 0;
    mig[47] = g_confDataCustomAtk[9] ?? 0;
    mig[51] = g_confDataCustomAtk[12] ?? 0;
    mig[53] = g_confDataCustomAtk[27] ?? 0;
    return buildCharaConfSpecializeUnit(CSaveDataConst.specKindAttackPhysical, mig);
}

/** 性能カスタマイズ（特化：攻撃｜魔法）ユニットを組み立てる。 */
function buildCharaConfSpecializeMagicalUnit() {
    const mig = new Array(54).fill(0);
    mig[0] = g_confDataCustomAtk[14] ?? 0;
    mig[14] = g_confDataCustomAtk[15] ?? 0;
    mig[26] = g_confDataCustomAtk[18] ?? 0;
    mig[37] = g_confDataCustomAtk[16] ?? 0;
    mig[41] = g_confDataCustomAtk[17] ?? 0;
    mig[44] = g_confDataCustomAtk[23] ?? 0;
    mig[51] = g_confDataCustomAtk[19] ?? 0;
    return buildCharaConfSpecializeUnit(CSaveDataConst.specKindAttackMagical, mig);
}

/** 性能カスタマイズ（特化：攻撃｜すべて）ユニットを組み立てる。 */
function buildCharaConfSpecializeAttackAnyUnit() {
    const mig = new Array(54).fill(0);
    mig[1] = g_confDataCustomAtk[10] ?? 0;
    mig[2] = g_confDataCustomAtk[21] ?? 0;
    mig[50] = g_confDataCustomAtk[20] ?? 0;
    return buildCharaConfSpecializeUnit(CSaveDataConst.specKindAttackAny, mig);
}

/** 性能カスタマイズ（特化：防御｜すべて）ユニットを組み立てる。 */
function buildCharaConfSpecializeDefenceAnyUnit() {
    const mig = new Array(54).fill(0);
    mig[2] = g_confDataCustomDef[9] ?? 0;
    mig[14] = g_confDataCustomDef[3] ?? 0;
    mig[26] = g_confDataCustomDef[5] ?? 0;
    mig[37] = g_confDataCustomDef[4] ?? 0;
    mig[41] = g_confDataCustomDef[6] ?? 0;
    mig[44] = g_confDataCustomDef[10] ?? 0;
    mig[46] = g_confDataCustomDef[7] ?? 0; // 全射程ではなく遠距離なので注意（CSaveDataManager.js の元コード同様）
    mig[50] = g_confDataCustomDef[8] ?? 0;
    return buildCharaConfSpecializeUnit(CSaveDataConst.specKindDefencekAny, mig);
}

/**
 * 性能カスタマイズ（スキル）ユニットを組み立てる.
 * skillID・特定条件系（pos0,1）は現行UIの入力元が無いため常に0
 * （translateFromOldFormat() の "TODO: すべてのスキルを表すダミーのスキルIDに変更のこと" 参照）。
 */
function buildCharaConfSkillUnit() {
    const UnitClass = CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SKILL);
    const unit = new UnitClass();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameSubInvalidateSettings, 0);
    // specDamageUpConditionType(pos1)は独立入力元ではなく、conditionValue(pos2)と同じ
    // customSkill[10]から派生する（0以外なら1）。現行でも translateFromOldFormat() が
    // `(convertedArraySkill[10][1] > 0) ? 1 : 0` として同じ値から計算している
    // （CSaveDataUnitParse.js「性能カスタマイズ（スキル）」ブロック参照）。
    const skillCond = g_confDataCustomSkill[10] ?? 0;
    const mig = [
        0, skillCond !== 0 ? 1 : 0,
        skillCond,
        g_confDataCustomSkill[1] ?? 0,
        g_confDataCustomSkill[11] ?? 0,
        g_confDataCustomSkill[12] ?? 0,
        g_confDataCustomSkill[5] ?? 0,
        g_confDataCustomSkill[4] ?? 0,
        g_confDataCustomSkill[7] ?? 0,
        g_confDataCustomSkill[6] ?? 0,
        g_confDataCustomSkill[9] ?? 0,
        g_confDataCustomSkill[8] ?? 0,
    ];
    fillConfigValuesFromMigArray(unit, UnitClass, 2, mig);
    unit.doCompaction();
    return unit;
}

/** 性能カスタマイズ（特性ステータス関連）ユニットを組み立てる（g_confDataCustomSpecStatus[1..12]を直接転記）。 */
function buildCharaConfSpecBasicUnit() {
    const UnitClass = CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPEC_BASIC);
    const unit = new UnitClass();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameSubInvalidateSettings, 0);
    const mig = [];
    for (let i = 0; i < 12; i++) mig.push(g_confDataCustomSpecStatus[1 + i] ?? 0);
    fillConfigValuesFromMigArray(unit, UnitClass, 2, mig);
    unit.doCompaction();
    return unit;
}

/**
 * 状態からセーブデータユニット配列を直接組み立てる.
 * 空ユニット（`isEmptyUnit()`）は除く——`CSaveDataManager.doCompaction()` が
 * 配列レベルで行う除去と同じ扱い（例: 習得スキルが1つも無いキャラクターでは
 * LEARNED_SKILLS ユニット自体が最終出力に含まれない）。
 * @returns {Array} `MIGRATED_SAVE_DATA_UNITS` に含まれるユニットの配列
 */
export function buildSaveDataUnitsFromState() {
    const jobId = getCurrentJobId();
    const units = [
        buildVersionUnit(),
        buildCharaUnit(jobId),
        buildEquipRegionsCostumeUnit(),
        buildLearnedSkillsUnit(),
        buildEquipArrowUnit(),
        buildCharaBuffUnit(),
        buildSkillBuffSelfUnit(jobId),
        buildSkillBuff1stUnit(),
        buildSkillBuff2ndUnit(),
        buildSkillBuff3rdUnit(),
        buildSkillBuff4thUnit(),
        buildSkillBuffMusicUnit(),
        buildSkillBuffGuildUnit(),
        buildItemBuffUnit(),
        buildTimeBuffUnit(),
        buildAutoSpellsUnit(),
        buildCharaConfBasicUnit(),
        buildCharaConfSpecializePhysicalUnit(),
        buildCharaConfSpecializeMagicalUnit(),
        buildCharaConfSpecializeAttackAnyUnit(),
        buildCharaConfSpecializeDefenceAnyUnit(),
        buildCharaConfSkillUnit(),
        buildCharaConfSpecBasicUnit(),
    ];
    return units.filter((unit) => !unit.isEmptyUnit());
}
