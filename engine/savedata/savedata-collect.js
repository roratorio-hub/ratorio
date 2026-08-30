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
} from "./CSaveDataUnit.js";
import { HtmlGetObjectCheckedById, HtmlGetObjectValueByIdAsInteger } from "../runtime/util.js";
import { GetHigherJobSeriesID, JOB_SERIES_ID_SUPERNOVICE } from "../data/mig.job.h.js";
import { n_A_PassSkill } from "../skill/skillstate.js";
import { n_A_LearnedSkill } from "../skill/learnedskill.js";
import { n_A_Arrow } from "../runtime/ro4-state.js";

/**
 * builder が現在対応しているユニットの識別子一覧（Phase 進行に応じて増える）。
 * `EQUIP_REGIONS`/`EQUIPABLE`/`CHARA_CONF_SPECIALIZE` のように同一 type で複数の「種別」を
 * 持つ型は `dataKind`/`instanceKind` で個別に指定する（未指定なら type 全体が対象）。
 * 差分オラクル（`savedata-collect.test.ts` / `tests/integration/savedata-collect.test.ts`）が
 * 「この Phase までに移植済みのユニットだけを比較する」ために `isMigratedSaveDataUnit()` 経由で参照する。
 */
export const MIGRATED_SAVE_DATA_UNITS = Object.freeze([
    { type: SAVE_DATA_UNIT_TYPE_VERSION },
    { type: SAVE_DATA_UNIT_TYPE_CHARA },
    { type: SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS, dataKind: CSaveDataConst.eqpRgnKindCostume },
    { type: SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS },
    { type: SAVE_DATA_UNIT_TYPE_EQUIP_ARROW },
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

/** バージョン情報ユニットを組み立てる（プロパティは type/version のみ）。 */
function buildVersionUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_VERSION))();
    unit.SetUpAsDefault();
    return unit;
}

/**
 * キャラクターステータスユニットを組み立てる.
 * SaveSystem() の [0001-0009]・[1821-1826] 区画（DOM直読み）と同じ入力源を使う。
 */
function buildCharaUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA))();
    unit.SetUpAsDefault();

    const jobId = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_JOB", 0);
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
 * 状態からセーブデータユニット配列を直接組み立てる.
 * 空ユニット（`isEmptyUnit()`）は除く——`CSaveDataManager.doCompaction()` が
 * 配列レベルで行う除去と同じ扱い（例: 習得スキルが1つも無いキャラクターでは
 * LEARNED_SKILLS ユニット自体が最終出力に含まれない）。
 * @returns {Array} `MIGRATED_SAVE_DATA_UNITS` に含まれるユニットの配列
 */
export function buildSaveDataUnitsFromState() {
    const units = [
        buildVersionUnit(),
        buildCharaUnit(),
        buildEquipRegionsCostumeUnit(),
        buildLearnedSkillsUnit(),
        buildEquipArrowUnit(),
    ];
    return units.filter((unit) => !unit.isEmptyUnit());
}
