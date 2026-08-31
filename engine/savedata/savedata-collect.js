/**
 * 状態から直接セーブデータユニット配列を組み立てる（残件台帳 B-11 Phase A・B-33 B2）.
 *
 * `CSaveDataManager.encodeToURL()` は現在、最新形式のセーブを作るのに旧形式の保存処理
 * （`SaveSystem()` → 旧形式文字列 → `translateFromOldFormat()`）を経由していた（B-11 Phase A5-3で撤去済み）。
 * `buildSaveDataUnitsFromState()` はその迂回を経ずに、DOM/グローバル/コンポーネントから
 * 各ユニットを直接組み立てる。
 *
 * B-33 B2で「読み取り」と「組み立て」を分離した:
 * - `extractSaveModelFromState()` — DOM/グローバル/コンポーネントを読み、`save-model.js` の
 *   形（プレーンなスナップショット）で返す。副作用ゼロ・DOM書き込みゼロ。
 * - `buildSaveDataUnits(model)` — モデルを受け取り `CSaveDataUnit*` 配列を組み立てるだけ。
 *   DOM/グローバルの読み取りを一切含まない（純粋関数）。
 * - `buildSaveDataUnitsFromState()`（従来のエントリポイント）は両者を繋ぐ薄いラッパとして残す。
 *
 * B-33 B2-2で、旧 `CSaveDataManager#collectDataEquipable()`/`#collectDataCharaConfDebuff()`/
 * `#collectDataShadowEquips()`（装備・シャドウ装備・プレイヤー状態異常）も統合した
 * （`buildEquipUnits()` 参照）。衣装（COSTUME）のみ、次世代版ソースコードの時点でセーブ・
 * ロード未対応のため固定値のまま。
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
    SAVE_DATA_UNIT_TYPE_MOB,
    SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER,
    SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER2,
    SAVE_DATA_UNIT_TYPE_MOB_CONF_INPUT,
    SAVE_DATA_UNIT_TYPE_MOB_BUFF,
    SAVE_DATA_UNIT_TYPE_MOB_DEBUFF,
    SAVE_DATA_UNIT_TYPE_ATTACK_CONF,
    SAVE_DATA_UNIT_TYPE_EQUIPABLE,
    SAVE_DATA_UNIT_TYPE_CHARA_DEBUFF,
} from "./CSaveDataUnit.js";
import { createEmptySaveModel } from "./save-model.js";
import { HtmlGetObjectCheckedById, HtmlGetObjectValueByIdAsInteger } from "../runtime/util.js";
import { GetHigherJobSeriesID, JOB_SERIES_ID_SUPERNOVICE } from "../data/mig.job.h.js";
import { CONST_DATA_KIND_JOB } from "../const/EnumConstDataKind.js";
import {
    n_A_PassSkill, n_A_PassSkill3, n_A_PassSkill4, n_A_PassSkill7, n_A_PassSkill8,
} from "../skill/skillstate.js";
import { n_A_LearnedSkill } from "../skill/learnedskill.js";
import { n_A_Arrow } from "../runtime/ro4-state.js";
import {
    n_A_PassSkill5, n_A_Equip,
    n_A_HEAD_DEF_PLUS, n_A_BODY_DEF_PLUS, n_A_SHIELD_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_SHOES_DEF_PLUS,
    n_A_Weapon_Transcendence, n_A_Weapon2_Transcendence, n_A_HEAD_DEF_Transcendence,
    n_A_SHIELD_DEF_Transcendence, n_A_BODY_DEF_Transcendence, n_A_SHOULDER_DEF_Transcendence, n_A_SHOES_DEF_Transcendence,
    n_A_Weapon_ATKplus, n_A_Weapon2_ATKplus, g_itemIdArray, g_refinedArray,
} from "../runtime/roro-state.js";
import {
    g_confDataIchizi, g_confDataNizi, g_confDataSanzi, g_confDataYozi, g_constDataManager, g_timeItemConf,
    g_confDataCustomStatus, g_confDataCustomAtk, g_confDataCustomDef, g_confDataCustomSkill, g_confDataCustomSpecStatus,
    g_charaData, g_confDataDebuff,
} from "../runtime/global.js";
import {
    MIG_EQUIP_REGION_ID_ACCESSORY_1, MIG_EQUIP_REGION_ID_ACCESSORY_2, MIG_EQUIP_REGION_ID_ARMS_LEFT, MIG_EQUIP_REGION_ID_ARMS_RIGHT,
    MIG_EQUIP_REGION_ID_BODY, MIG_EQUIP_REGION_ID_FOOT, MIG_EQUIP_REGION_ID_HEAD_MID, MIG_EQUIP_REGION_ID_HEAD_TOP,
    MIG_EQUIP_REGION_ID_HEAD_UNDER, MIG_EQUIP_REGION_ID_SHIELD, MIG_EQUIP_REGION_ID_SHOULDER,
} from "../const/EnumMigEquipRegionId.js";
import {
    EQUIP_REGION_ID_SHADOW_ACCESSORY_1, EQUIP_REGION_ID_SHADOW_ACCESSORY_2, EQUIP_REGION_ID_SHADOW_ARMS_LEFT,
    EQUIP_REGION_ID_SHADOW_ARMS_RIGHT, EQUIP_REGION_ID_SHADOW_BODY, EQUIP_REGION_ID_SHADOW_FOOT,
} from "../const/EnumEquipRegionId.js";
import { GetEquipRndOptTableKind, GetEquipRndOptTableValue } from "../equip/rndopttype.h.js";
import {
    AUTO_SPELL_SETTING_COUNT, OBJID_OFFSET_AS_SKILL_ID, OBJID_OFFSET_AS_SKILL_LV, OBJID_OFFSET_AS_SKILL_PROB,
} from "../skill/calcautospell.js";
import { CMonsterMapAreaComponentManager } from "../monster/CMonsterMapAreaComponentManager.js";
import { n_B_TAISEI } from "../monster/mobconfplayer.js";
import { n_B_KYOUKA } from "../monster/mobconfbuf.js";
import { n_B_IJYOU } from "../monster/mobconfdebuf.js";
import { GetMobConfInput } from "../monster/CMobConfInput.js";
import {
    MOB_CONF_INPUT_DATA_INDEX_LV, MOB_CONF_INPUT_DATA_INDEX_HP, MOB_CONF_INPUT_DATA_INDEX_STR,
    MOB_CONF_INPUT_DATA_INDEX_INT, MOB_CONF_INPUT_DATA_INDEX_VIT, MOB_CONF_INPUT_DATA_INDEX_DEX,
    MOB_CONF_INPUT_DATA_INDEX_AGI, MOB_CONF_INPUT_DATA_INDEX_LUK, MOB_CONF_INPUT_DATA_INDEX_ATK,
    MOB_CONF_INPUT_DATA_INDEX_MATK, MOB_CONF_INPUT_DATA_INDEX_RANGE, MOB_CONF_INPUT_DATA_INDEX_DEF,
    MOB_CONF_INPUT_DATA_INDEX_MDEF, MOB_CONF_INPUT_DATA_INDEX_BASE_EXP, MOB_CONF_INPUT_DATA_INDEX_JOB_EXP,
    MOB_CONF_INPUT_DATA_INDEX_SIZE, MOB_CONF_INPUT_DATA_INDEX_ELEMENT, MOB_CONF_INPUT_DATA_INDEX_RACE,
    MOB_CONF_INPUT_DATA_INDEX_BOSS_TYPE, MOB_CONF_INPUT_DATA_INDEX_GRASS_TYPE,
} from "../const/EnumMobConfId.js";
import { g_attackMethodBridge } from "../battle/CAttackMethodDataBridge.js";
import {
    CHARA_CONF_BASIC_MIG_MAP, CHARA_CONF_SPECIALIZE_PHYSICAL_MIG_MAP, CHARA_CONF_SPECIALIZE_MAGICAL_MIG_MAP,
    CHARA_CONF_SPECIALIZE_ATTACK_ANY_MIG_MAP, CHARA_CONF_SPECIALIZE_DEFENCE_ANY_MIG_MAP,
    CHARA_CONF_SKILL_MIG_MAP, CHARA_CONF_SPEC_BASIC_MIG_MAP, migArrayFromConf,
} from "./conf-mig-mapping.js";

// ---- 装備（アイテム11部位）関連の定数マップ ----
// 列挙順は旧 CSaveDataManager#collectDataEquipable() の eqpRgnIdArray と同じ。
const ITEM_EQUIP_REGION_ID_ARRAY = [
    MIG_EQUIP_REGION_ID_ARMS_RIGHT, MIG_EQUIP_REGION_ID_ARMS_LEFT, MIG_EQUIP_REGION_ID_HEAD_TOP,
    MIG_EQUIP_REGION_ID_HEAD_MID, MIG_EQUIP_REGION_ID_HEAD_UNDER, MIG_EQUIP_REGION_ID_SHIELD,
    MIG_EQUIP_REGION_ID_BODY, MIG_EQUIP_REGION_ID_SHOULDER, MIG_EQUIP_REGION_ID_FOOT,
    MIG_EQUIP_REGION_ID_ACCESSORY_1, MIG_EQUIP_REGION_ID_ACCESSORY_2,
];
const ITEM_CARD_OBJID_PREFIX = {
    [MIG_EQUIP_REGION_ID_ARMS_RIGHT]: "OBJID_ARMS_RIGHT",
    [MIG_EQUIP_REGION_ID_ARMS_LEFT]: "OBJID_ARMS_LEFT",
    [MIG_EQUIP_REGION_ID_HEAD_TOP]: "OBJID_HEAD_TOP",
    [MIG_EQUIP_REGION_ID_HEAD_MID]: "OBJID_HEAD_MID",
    [MIG_EQUIP_REGION_ID_HEAD_UNDER]: "OBJID_HEAD_UNDER",
    [MIG_EQUIP_REGION_ID_SHIELD]: "OBJID_SHIELD",
    [MIG_EQUIP_REGION_ID_BODY]: "OBJID_BODY",
    [MIG_EQUIP_REGION_ID_SHOULDER]: "OBJID_SHOULDER",
    [MIG_EQUIP_REGION_ID_FOOT]: "OBJID_SHOES",
    [MIG_EQUIP_REGION_ID_ACCESSORY_1]: "OBJID_ACCESSORY_1",
    [MIG_EQUIP_REGION_ID_ACCESSORY_2]: "OBJID_ACCESSORY_2",
};
/**
 * 精錬値・超越値の読み取り元（7部位のみ。頭中段/下段・アクセサリ2件は対象外。
 * 存在しない場合は呼び出し側の `| 0` によりundefinedが0になる仕様——旧#collectDataEquipable()と同じ）。
 *
 * `n_A_Weapon_ATKplus` 等は ES モジュールの生きた束縛（`export let`）だが、これをオブジェクト
 * リテラルの値として書くと**評価時点の値がコピーされるだけ**で、以後の変更を追跡しない
 * （import 識別子を直接コードで読む場合とは違い、object literal の property value は
 * 束縛ではなく単なる代入である）。モジュール読み込み直後（値がまだ0のとき）に固定された
 * マップになってしまうため、**呼び出しのたびに関数で作り直す**必要がある。
 * @returns {Record<number, number>}
 */
function buildItemRefineSourceMap() {
    return {
        [MIG_EQUIP_REGION_ID_ARMS_RIGHT]: n_A_Weapon_ATKplus,
        [MIG_EQUIP_REGION_ID_ARMS_LEFT]: n_A_Weapon2_ATKplus,
        [MIG_EQUIP_REGION_ID_HEAD_TOP]: n_A_HEAD_DEF_PLUS,
        [MIG_EQUIP_REGION_ID_BODY]: n_A_BODY_DEF_PLUS,
        [MIG_EQUIP_REGION_ID_SHIELD]: n_A_SHIELD_DEF_PLUS,
        [MIG_EQUIP_REGION_ID_SHOULDER]: n_A_SHOULDER_DEF_PLUS,
        [MIG_EQUIP_REGION_ID_FOOT]: n_A_SHOES_DEF_PLUS,
    };
}
/** @returns {Record<number, number>} 超越値版（buildItemRefineSourceMap()と同じ理由で関数化）。 */
function buildItemTranscendenceSourceMap() {
    return {
        [MIG_EQUIP_REGION_ID_ARMS_RIGHT]: n_A_Weapon_Transcendence,
        [MIG_EQUIP_REGION_ID_ARMS_LEFT]: n_A_Weapon2_Transcendence,
        [MIG_EQUIP_REGION_ID_HEAD_TOP]: n_A_HEAD_DEF_Transcendence,
        [MIG_EQUIP_REGION_ID_BODY]: n_A_BODY_DEF_Transcendence,
        [MIG_EQUIP_REGION_ID_SHIELD]: n_A_SHIELD_DEF_Transcendence,
        [MIG_EQUIP_REGION_ID_SHOULDER]: n_A_SHOULDER_DEF_Transcendence,
        [MIG_EQUIP_REGION_ID_FOOT]: n_A_SHOES_DEF_Transcendence,
    };
}
/** 装備部位ID → EQUIP_REGIONSユニットのプロパティ名（旧#collectDataEquipable()のregionMapと同じ）。 */
const ITEM_REGION_PROP_MAP = {
    [MIG_EQUIP_REGION_ID_ARMS_RIGHT]: CSaveDataConst.propNameEqpRgnArmsRight,
    [MIG_EQUIP_REGION_ID_ARMS_LEFT]: CSaveDataConst.propNameEqpRgnArmsLeft,
    [MIG_EQUIP_REGION_ID_HEAD_TOP]: CSaveDataConst.propNameEqpRgnHeadTop,
    [MIG_EQUIP_REGION_ID_HEAD_MID]: CSaveDataConst.propNameEqpRgnHeadMid,
    [MIG_EQUIP_REGION_ID_HEAD_UNDER]: CSaveDataConst.propNameEqpRgnHeadUnder,
    [MIG_EQUIP_REGION_ID_SHIELD]: CSaveDataConst.propNameEqpRgnShield,
    [MIG_EQUIP_REGION_ID_BODY]: CSaveDataConst.propNameEqpRgnBody,
    [MIG_EQUIP_REGION_ID_SHOULDER]: CSaveDataConst.propNameEqpRgnShoulder,
    [MIG_EQUIP_REGION_ID_FOOT]: CSaveDataConst.propNameEqpRgnFoot,
    [MIG_EQUIP_REGION_ID_ACCESSORY_1]: CSaveDataConst.propNameEqpRgnAccessory1,
    [MIG_EQUIP_REGION_ID_ACCESSORY_2]: CSaveDataConst.propNameEqpRgnAccessory2,
};

// ---- シャドウ装備（6部位）関連の定数マップ ----
// 列挙順は旧 CSaveDataManager#collectDataShadowEquips() の eqpRgnIdArray と同じ
// （頭防具・肩は非対応のため対象外）。
const SHADOW_EQUIP_REGION_ID_ARRAY = [
    EQUIP_REGION_ID_SHADOW_ARMS_RIGHT, EQUIP_REGION_ID_SHADOW_ARMS_LEFT, EQUIP_REGION_ID_SHADOW_BODY,
    EQUIP_REGION_ID_SHADOW_FOOT, EQUIP_REGION_ID_SHADOW_ACCESSORY_1, EQUIP_REGION_ID_SHADOW_ACCESSORY_2,
];
const SHADOW_CARD_OBJID_PREFIX = {
    [EQUIP_REGION_ID_SHADOW_ARMS_RIGHT]: "OBJID_SHADOW_ARMS_RIGHT_CARD_",
    [EQUIP_REGION_ID_SHADOW_ARMS_LEFT]: "OBJID_SHADOW_SHIELD_CARD_",
    [EQUIP_REGION_ID_SHADOW_BODY]: "OBJID_SHADOW_BODY_CARD_",
    [EQUIP_REGION_ID_SHADOW_FOOT]: "OBJID_SHADOW_SHOES_CARD_",
    [EQUIP_REGION_ID_SHADOW_ACCESSORY_1]: "OBJID_SHADOW_ACCESSORY-1_CARD_",
    [EQUIP_REGION_ID_SHADOW_ACCESSORY_2]: "OBJID_SHADOW_ACCESSORY-2_CARD_",
};
/** シャドウ装備部位ID → EQUIP_REGIONSユニットのプロパティ名（旧#collectDataShadowEquips()のswitch文と同じ）。 */
const SHADOW_REGION_PROP_MAP = {
    [EQUIP_REGION_ID_SHADOW_ARMS_RIGHT]: CSaveDataConst.propNameEqpRgnArmsRight,
    [EQUIP_REGION_ID_SHADOW_ARMS_LEFT]: CSaveDataConst.propNameEqpRgnArmsLeft,
    [EQUIP_REGION_ID_SHADOW_BODY]: CSaveDataConst.propNameEqpRgnBody,
    [EQUIP_REGION_ID_SHADOW_FOOT]: CSaveDataConst.propNameEqpRgnFoot,
    [EQUIP_REGION_ID_SHADOW_ACCESSORY_1]: CSaveDataConst.propNameEqpRgnAccessory1,
    [EQUIP_REGION_ID_SHADOW_ACCESSORY_2]: CSaveDataConst.propNameEqpRgnAccessory2,
};

/** ランダムオプション5枠を読み取る（アイテム・シャドウ共通）。 */
function readRndOpt(eqpRgnId) {
    const rndOpt = [];
    for (let slot = 0; slot < 5; slot++) {
        rndOpt.push({ kind: GetEquipRndOptTableKind(eqpRgnId, slot), value: GetEquipRndOptTableValue(eqpRgnId, slot) });
    }
    return rndOpt;
}

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
    // Phase A4
    { type: SAVE_DATA_UNIT_TYPE_MOB },
    { type: SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER },
    { type: SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER2 },
    { type: SAVE_DATA_UNIT_TYPE_MOB_CONF_INPUT },
    { type: SAVE_DATA_UNIT_TYPE_MOB_BUFF },
    { type: SAVE_DATA_UNIT_TYPE_MOB_DEBUFF },
    { type: SAVE_DATA_UNIT_TYPE_ATTACK_CONF },
    // Phase B2-2（装備・シャドウ装備・プレイヤー状態異常。旧CSaveDataManager#collectData*()を統合）
    { type: SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS, dataKind: CSaveDataConst.eqpRgnKindItem },
    { type: SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS, dataKind: CSaveDataConst.eqpRgnKindShadow },
    { type: SAVE_DATA_UNIT_TYPE_EQUIPABLE },
    { type: SAVE_DATA_UNIT_TYPE_CHARA_DEBUFF },
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
 * DOM/グローバル/コンポーネントから、セーブに必要な値をすべて読み取る（副作用ゼロ）.
 * 戻り値は `save-model.js` の形（プレーンなスナップショット）。配列はすべてコピーする
 * （ライブ配列への参照を持たせない——`buildSaveDataUnits()` 側で誤って共有・変異させないため）。
 * @returns {object} `createEmptySaveModel()` の形をした、状態で埋まったモデル
 */
export function extractSaveModelFromState() {
    const model = createEmptySaveModel();

    // 職業ID。translateFromOldFormat()時代と同じく n_A_JOB ではなく DOM を直接読む
    // （document.getElementById("OBJID_SELECT_JOB").value が一次情報という既存の設計を踏襲）。
    model.jobId = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_JOB", 0);

    // ---- キャラクターステータス ----
    model.autoAdjustBaseLv = HtmlGetObjectCheckedById("OBJID_CHECK_AUTO_BASE_LEVEL", false);
    model.baseLv = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_BASE_LEVEL", 0);
    model.jobLv = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_JOB_LEVEL", 0);
    model.statStr = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_STR", 0);
    model.statAgi = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_AGI", 0);
    model.statVit = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_VIT", 0);
    model.statInt = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_INT", 0);
    model.statDex = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_DEX", 0);
    model.statLuk = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_LUK", 0);
    model.statPow = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_POW", 0);
    model.statSta = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_STA", 0);
    model.statWis = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_WIS", 0);
    model.statSpl = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_SPL", 0);
    model.statCon = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_CON", 0);
    model.statCrt = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_STATUS_CRT", 0);
    model.armsElement = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_ARMS_ELEMENT", 0);
    model.speedPot = HtmlGetObjectValueByIdAsInteger("OBJID_SPEED_POT", 0);
    model.arrow = n_A_Arrow;

    // ---- スキル・バフ設定欄 ----
    model.learnedSkill = n_A_LearnedSkill.slice();
    model.passiveSkillSelf = n_A_PassSkill.slice();
    model.passiveSkillSelfCount = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, model.jobId).GetPassiveSkillIdArray().length;
    model.passiveSkillMusic = n_A_PassSkill3.slice();
    model.passiveSkillGuild = n_A_PassSkill4.slice();
    model.autoSpellRaw = n_A_PassSkill5.slice();
    model.passiveSkillItem = n_A_PassSkill7.slice();
    model.passiveSkillOther = n_A_PassSkill8.slice();
    model.confIchizi = g_confDataIchizi.slice();
    model.confNizi = g_confDataNizi.slice();
    model.confSanzi = g_confDataSanzi.slice();
    model.confYozi = g_confDataYozi.slice();
    model.timeItemConf = g_timeItemConf.slice();

    // ---- 性能カスタマイズ ----
    model.confCustomStatus = g_confDataCustomStatus.slice();
    model.confCustomAtk = g_confDataCustomAtk.slice();
    model.confCustomDef = g_confDataCustomDef.slice();
    model.confCustomSkill = g_confDataCustomSkill.slice();
    model.confCustomSpecStatus = g_confDataCustomSpecStatus.slice();

    // ---- モンスター ----
    model.mobCategoryId = CMonsterMapAreaComponentManager.GetCategoryId();
    model.mobMapId = CMonsterMapAreaComponentManager.GetMapId();
    model.mobMonsterId = CMonsterMapAreaComponentManager.GetMonsterId();
    model.mobConfTaisei = n_B_TAISEI.slice();
    model.mobConfInput = {
        lv: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_LV) ?? 0,
        hp: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_HP) ?? 0,
        str: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_STR) ?? 0,
        int: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_INT) ?? 0,
        vit: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_VIT) ?? 0,
        dex: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_DEX) ?? 0,
        agi: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_AGI) ?? 0,
        luk: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_LUK) ?? 0,
        atk: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_ATK) ?? 0,
        matk: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_MATK) ?? 0,
        range: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_RANGE) ?? 0,
        def: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_DEF) ?? 0,
        mdef: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_MDEF) ?? 0,
        baseExp: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_BASE_EXP) ?? 0,
        jobExp: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_JOB_EXP) ?? 0,
        size: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_SIZE) ?? 0,
        element: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_ELEMENT) ?? 0,
        race: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_RACE) ?? 0,
        bossType: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_BOSS_TYPE) ?? 0,
        grassType: GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_GRASS_TYPE) ?? 0,
    };
    model.mobConfKyouka = n_B_KYOUKA.slice();
    model.mobConfIjyou = n_B_IJYOU.slice();

    // ---- 攻撃手段 ----
    const attackMethodConf = g_attackMethodBridge.getAttackMethodConf?.();
    const attackOptionArray = [];
    const attackOptionCount = attackMethodConf ? Math.min(5, attackMethodConf.GetOptionValueCount()) : 0;
    for (let idx = 0; idx < 5; idx++) {
        attackOptionArray.push(idx < attackOptionCount ? (attackMethodConf.GetOptionValue(idx) ?? 0) : 0);
    }
    model.attackMethodSkillId = attackMethodConf ? attackMethodConf.GetSkillId() : 0;
    model.attackMethodSourceType = attackMethodConf ? attackMethodConf.GetSourceType() : 0;
    model.attackMethodSkillLv = attackMethodConf ? attackMethodConf.GetSkillLv() : 0;
    model.attackMethodOptions = attackOptionArray;

    // ---- 装備（アイテム11部位・衣装を除く） ----
    const itemRefineSourceMap = buildItemRefineSourceMap();
    const itemTranscendenceSourceMap = buildItemTranscendenceSourceMap();
    model.equip.itemRegions = ITEM_EQUIP_REGION_ID_ARRAY.map((eqpRgnId) => {
        const cardPrefix = ITEM_CARD_OBJID_PREFIX[eqpRgnId];
        const cardCategoryArray = g_charaData.cardCategoryMap.get(cardPrefix);
        return {
            eqpRgnId,
            itemId: n_A_Equip[eqpRgnId],
            refine: itemRefineSourceMap[eqpRgnId] | 0,
            transcendence: itemTranscendenceSourceMap[eqpRgnId] | 0,
            rndOpt: readRndOpt(eqpRgnId),
            cardCategoryIds: cardCategoryArray ? cardCategoryArray.slice(0, 4) : null,
            cardIds: [1, 2, 3, 4].map((slot) => HtmlGetObjectValueByIdAsInteger(`${cardPrefix}_CARD_${slot}`, 0)),
        };
    });

    // ---- シャドウ装備（6部位） ----
    model.equip.shadowRegions = SHADOW_EQUIP_REGION_ID_ARRAY.map((eqpRgnId) => {
        const cardPrefix = SHADOW_CARD_OBJID_PREFIX[eqpRgnId];
        return {
            eqpRgnId,
            itemId: g_itemIdArray[eqpRgnId],
            refine: g_refinedArray[eqpRgnId],
            rndOpt: readRndOpt(eqpRgnId),
            // シャドウ装備はSlot1にカードを挿せないのでID2からスタート
            cardIds: [2, 3, 4].map((slot) => HtmlGetObjectValueByIdAsInteger(`${cardPrefix}${slot}`, 0)),
        };
    });

    // ---- プレイヤー状態異常設定欄 ----
    model.equip.debuff = g_confDataDebuff.slice();

    return model;
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
 * @param {object} model `extractSaveModelFromState()` の戻り値
 */
function buildCharaUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA))();
    unit.SetUpAsDefault();

    // スーパーノービスの魂（SL_SUPERNOVICE、A1パッシブスキル欄index9）ON で装備制限を無視する。
    // 旧形式では saveDataArrayOld[84] が n_A_PassSkill[9] と同じ値だった（SaveSystem() [0075-0174]区画）。
    const bIgnoreEquipRestrict = (GetHigherJobSeriesID(model.jobId) === JOB_SERIES_ID_SUPERNOVICE) && (model.passiveSkillSelf[9] > 0);

    unit.setProp(CSaveDataConst.propNameSubAutoAdjustBaseLv, model.autoAdjustBaseLv ? 1 : 0);
    unit.setProp(CSaveDataConst.propNameSubIgnoreEquipRestrict, bIgnoreEquipRestrict ? 1 : 0);
    unit.setProp(CSaveDataConst.propNameJobID, model.jobId);
    unit.setProp(CSaveDataConst.propNameBaseLv, model.baseLv);
    unit.setProp(CSaveDataConst.propNameJobLv, model.jobLv);
    unit.setProp(CSaveDataConst.propNameStStr, model.statStr);
    unit.setProp(CSaveDataConst.propNameStAgi, model.statAgi);
    unit.setProp(CSaveDataConst.propNameStVit, model.statVit);
    unit.setProp(CSaveDataConst.propNameStInt, model.statInt);
    unit.setProp(CSaveDataConst.propNameStDex, model.statDex);
    unit.setProp(CSaveDataConst.propNameStLuk, model.statLuk);
    unit.setProp(CSaveDataConst.propNameStPow, model.statPow);
    unit.setProp(CSaveDataConst.propNameStSta, model.statSta);
    unit.setProp(CSaveDataConst.propNameStWis, model.statWis);
    unit.setProp(CSaveDataConst.propNameStSpl, model.statSpl);
    unit.setProp(CSaveDataConst.propNameStCon, model.statCon);
    unit.setProp(CSaveDataConst.propNameStCrt, model.statCrt);

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

/** 習得スキルユニットを組み立てる（model.learnedSkillをそのまま運ぶ）。 */
function buildLearnedSkillsUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameSkillLv, model.learnedSkill);
    unit.doCompaction();
    return unit;
}

/**
 * 矢ユニットを組み立てる.
 * 値は model.arrow+1（0は「未設定」を表すためのオフセット。読み込み側は arrowArray[0]-1 で戻す。
 * CSaveDataManager#applyDataToControls() 参照）。
 */
function buildEquipArrowUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIP_ARROW))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameSubInvalidateSettings, 0);
    unit.setProp(CSaveDataConst.propNameArrow, model.arrow + 1);
    unit.doCompaction();
    return unit;
}

/**
 * 武器属性付与＋その他の支援/設定（A8欄）ユニットを組み立てる.
 * armsElement は SaveSystem() の [0014] 区画（右手武器属性）と同じ DOM を読む。
 */
function buildCharaBuffUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_BUFF))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameArmsElement, model.armsElement);
    // n_A_PassSkill8 は70件枠のうち28件分しか実体を持たない（SaveSystem()はn_A_PassSkill8.lengthまでしか
    // 書かないため、旧形式の残り42スロットは常に0だった。同じ挙動を0埋めで再現する）。
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(model.passiveSkillOther, 70));
    unit.doCompaction();
    return unit;
}

/**
 * 職固有自己支援（A1欄・パッシブ持続系）ユニットを組み立てる.
 * SaveSystem() の [0075-0174] 区画は `passiveSkillIdArray.length`（現在の職業の
 * パッシブスキル数）までしか書かない。n_A_PassSkill 自体は全職業共通の固定長51配列
 * （直近に選んでいた別の職業の残存値を含みうる）なので、同じ範囲で切り詰めてから0埋めする。
 */
function buildSkillBuffSelfUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_SELF))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    const truncated = model.passiveSkillSelf.slice(0, model.passiveSkillSelfCount);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(truncated, 100));
    unit.doCompaction();
    return unit;
}

/** 一次職支援（基本支援）ユニットを組み立てる（model.confIchiziをそのまま運ぶ）。 */
function buildSkillBuff1stUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_1ST))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(model.confIchizi, 100));
    unit.doCompaction();
    return unit;
}

/** 二次職支援ユニットを組み立てる（model.confNiziをそのまま運ぶ）。 */
function buildSkillBuff2ndUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_2ND))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(model.confNizi, 50));
    unit.doCompaction();
    return unit;
}

/** 三次職支援ユニットを組み立てる（model.confSanziをそのまま運ぶ）。 */
function buildSkillBuff3rdUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_3RD))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(model.confSanzi, 100));
    unit.doCompaction();
    return unit;
}

/** 四次職支援ユニットを組み立てる（model.confYoziをそのまま運ぶ）。 */
function buildSkillBuff4thUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_4TH))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(model.confYozi, 30));
    unit.doCompaction();
    return unit;
}

/**
 * 演奏/踊り系スキル（支援スキル３）ユニットを組み立てる.
 * 機能削除済みのため常に空（n_A_PassSkill3 は47件枠だが、旧形式の位置互換のため
 * 60スロット分0埋めする——SaveSystem() 冒頭コメント参照）。
 */
function buildSkillBuffMusicUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_MUSIC))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(model.passiveSkillMusic, 60));
    unit.doCompaction();
    return unit;
}

/** ギルドスキル/ゴスペル/他（A4欄）ユニットを組み立てる（n_A_PassSkill4は36件枠、60スロット中）。 */
function buildSkillBuffGuildUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_GUILD))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(model.passiveSkillGuild, 60));
    unit.doCompaction();
    return unit;
}

/**
 * アイテム（食品/他。A7欄）ユニットを組み立てる.
 * subSpeedPot は SaveSystem() の [0013] 区画（速度POT）と同じ DOM を読む。
 * n_A_PassSkill7 は53件枠、70スロット中（末尾は未使用のため0埋め）。
 */
function buildItemBuffUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_ITEM_BUFF))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameSubSpeedPot, model.speedPot);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(model.passiveSkillItem, 70));
    unit.doCompaction();
    return unit;
}

/** 時限効果設定ユニットを組み立てる（model.timeItemConfをそのまま運ぶ）。 */
function buildTimeBuffUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_TIME_BUFF))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameTimeBuffID, padArray(model.timeItemConf, 20));
    unit.doCompaction();
    return unit;
}

/**
 * オートスペル設定ユニットを組み立てる.
 * model.autoSpellRaw は SkillID/Lv/Prob を OBJID_OFFSET_AS_SKILL_* オフセットで
 * 同一配列内に格納している（calcautospell.js）。SaveSystem() の [1691-1750] 区画と同じ
 * 読み取り方をする。
 */
function buildAutoSpellsUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_AUTO_SPELLS))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    const idArray = [];
    const lvArray = [];
    const probArray = [];
    for (let idx = 0; idx < AUTO_SPELL_SETTING_COUNT; idx++) {
        idArray.push(model.autoSpellRaw[OBJID_OFFSET_AS_SKILL_ID + idx] ?? 0);
        lvArray.push(model.autoSpellRaw[OBJID_OFFSET_AS_SKILL_LV + idx] ?? 0);
        probArray.push(model.autoSpellRaw[OBJID_OFFSET_AS_SKILL_PROB + idx] ?? 0);
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
 * されなかった残り」を運ぶ寄せ集めで、値は複数の model.confCustomXxx から集まる。
 * mig配列位置との対応は `conf-mig-mapping.js`（`CHARA_CONF_BASIC_MIG_MAP`）参照。
 * マップに無いスロット（[28]・[34..45]）は対応する現行UI入力元が無いため常に0
 * （ChangeArms*・StRange・特性ステータス系Plus群など）。
 */
function buildCharaConfBasicUnit(model) {
    const UnitClass = CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC);
    const unit = new UnitClass();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameSubInvalidateSettings, 0);

    const mig = migArrayFromConf(46, CHARA_CONF_BASIC_MIG_MAP, {
        confCustomStatus: model.confCustomStatus,
        confCustomAtk: model.confCustomAtk,
        confCustomDef: model.confCustomDef,
        confCustomSkill: model.confCustomSkill,
    });

    fillConfigValuesFromMigArray(unit, UnitClass, 2, mig);
    unit.doCompaction();
    return unit;
}

/**
 * 性能カスタマイズ（特化）ユニットを1件組み立てる（物理/魔法/攻撃すべて/防御すべての4種で共有）.
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
function buildCharaConfSpecializePhysicalUnit(model) {
    const mig = migArrayFromConf(54, CHARA_CONF_SPECIALIZE_PHYSICAL_MIG_MAP, { confCustomAtk: model.confCustomAtk });
    return buildCharaConfSpecializeUnit(CSaveDataConst.specKindAttackPhysical, mig);
}

/** 性能カスタマイズ（特化：攻撃｜魔法）ユニットを組み立てる。 */
function buildCharaConfSpecializeMagicalUnit(model) {
    const mig = migArrayFromConf(54, CHARA_CONF_SPECIALIZE_MAGICAL_MIG_MAP, { confCustomAtk: model.confCustomAtk });
    return buildCharaConfSpecializeUnit(CSaveDataConst.specKindAttackMagical, mig);
}

/** 性能カスタマイズ（特化：攻撃｜すべて）ユニットを組み立てる。 */
function buildCharaConfSpecializeAttackAnyUnit(model) {
    const mig = migArrayFromConf(54, CHARA_CONF_SPECIALIZE_ATTACK_ANY_MIG_MAP, { confCustomAtk: model.confCustomAtk });
    return buildCharaConfSpecializeUnit(CSaveDataConst.specKindAttackAny, mig);
}

/** 性能カスタマイズ（特化：防御｜すべて）ユニットを組み立てる。 */
function buildCharaConfSpecializeDefenceAnyUnit(model) {
    const mig = migArrayFromConf(54, CHARA_CONF_SPECIALIZE_DEFENCE_ANY_MIG_MAP, { confCustomDef: model.confCustomDef });
    return buildCharaConfSpecializeUnit(CSaveDataConst.specKindDefencekAny, mig);
}

/**
 * 性能カスタマイズ（スキル）ユニットを組み立てる.
 * skillID（pos0）は現行UIの入力元が無いため常に0
 * （translateFromOldFormat() の "TODO: すべてのスキルを表すダミーのスキルIDに変更のこと" 参照）。
 * specDamageUpConditionType(pos1)は独立入力元ではなく、conditionValue(pos2)と同じ
 * customSkill[10]から派生する（0以外なら1）ため、マッピングテーブルには含めない
 * （`conf-mig-mapping.js` の `CHARA_CONF_SKILL_MIG_MAP` 参照）。
 */
function buildCharaConfSkillUnit(model) {
    const UnitClass = CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SKILL);
    const unit = new UnitClass();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameSubInvalidateSettings, 0);
    const mig = migArrayFromConf(12, CHARA_CONF_SKILL_MIG_MAP, { confCustomSkill: model.confCustomSkill });
    mig[1] = mig[2] !== 0 ? 1 : 0; // 派生値（マップ対象外。mig[2]=confCustomSkill[10]の非0判定）
    fillConfigValuesFromMigArray(unit, UnitClass, 2, mig);
    unit.doCompaction();
    return unit;
}

/** 性能カスタマイズ（特性ステータス関連）ユニットを組み立てる（model.confCustomSpecStatus[1..12]を直接転記）。 */
function buildCharaConfSpecBasicUnit(model) {
    const UnitClass = CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPEC_BASIC);
    const unit = new UnitClass();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameSubInvalidateSettings, 0);
    const mig = migArrayFromConf(12, CHARA_CONF_SPEC_BASIC_MIG_MAP, { confCustomSpecStatus: model.confCustomSpecStatus });
    fillConfigValuesFromMigArray(unit, UnitClass, 2, mig);
    unit.doCompaction();
    return unit;
}

/** モンスター基本情報ユニットを組み立てる（model.mobCategoryId/mobMapId/mobMonsterIdをそのまま運ぶ）。 */
function buildMobUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameMonsterMapCategoryID, model.mobCategoryId);
    unit.setProp(CSaveDataConst.propNameMonsterMapID, model.mobMapId);
    unit.setProp(CSaveDataConst.propNameMonsterID, model.mobMonsterId);
    return unit;
}

/**
 * 対プレイヤー設定ユニットを組み立てる（旧形式専用・現行は常に空).
 * translateFromOldFormat() 自身がこのユニットの実装をコメントアウトし固定0を送っている
 * （このユニットのSAVE側は既に無効化されており、ロード時も直後に MOB_CONF_PLAYER2 の
 * 適用が n_B_TAISEI を丸ごと fill(0) で上書きするため実質無害）。
 */
function buildMobConfPlayerUnit() {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.doCompaction();
    return unit;
}

/**
 * 対プレイヤー設定2ユニットを組み立てる（model.mobConfTaiseiをそのまま運ぶ。現行の実質的な実体）.
 * pos41(StResPlus)・pos42(StMresPlus)は現行の translateFromOldFormat() 同様、符号を
 * 常に0として送る（符号ペアだが常に絶対値のみを渡している——CSaveDataUnitParse.js
 * 「対プレイヤー設定2」ブロックの `signValueArray[41][1]`/`[42][1]` 単独参照を参照）。
 */
function buildMobConfPlayer2Unit(model) {
    const UnitClass = CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER2);
    const unit = new UnitClass();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    const mig = padArray(model.mobConfTaisei, 49);
    mig[41] = Math.abs(mig[41] ?? 0);
    mig[42] = Math.abs(mig[42] ?? 0);
    fillConfigValuesFromMigArray(unit, UnitClass, 2, mig);
    unit.doCompaction();
    return unit;
}

/**
 * モンスター手入力欄ユニットを組み立てる.
 * 特性ステータス系12項目（Pow〜Mres）は現行UIの入力元が無いため常に0
 * （CSaveDataManager#applyDataToControlsMobConfInput() が参照する objectIDMapMap の
 * MOB_CONF_INPUT型エントリに、この12項目に対応する MOB_CONF_INPUT_DATA_INDEX_* が
 * 登録されていない。うち Res/Mres は CMobConfInput.js 自体には格納領域があるが、
 * セーブデータのマッピングテーブルには繋がっていない）。
 */
function buildMobConfInputUnit(model) {
    const UnitClass = CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_CONF_INPUT);
    const unit = new UnitClass();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    const c = model.mobConfInput;
    const mig = [
        c.lv, c.hp, c.str, c.int, c.vit, c.dex, c.agi, c.luk, c.atk, c.matk,
        c.range, c.def, c.mdef, c.baseExp, c.jobExp, c.size, c.element, c.race, c.bossType, c.grassType,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // Pow,Sta,Wis,Spl,Con,Crt,PAtk,SMatk,HPlus,CRate,Res,Mres — 入力元なし
    ];
    fillConfigValuesFromMigArray(unit, UnitClass, 2, mig);
    unit.doCompaction();
    return unit;
}

/** 敵状態強化ユニットを組み立てる（model.mobConfKyoukaをそのまま運ぶ）。 */
function buildMobBuffUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_BUFF))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(model.mobConfKyouka, 80));
    unit.doCompaction();
    return unit;
}

/** 敵状態異常ユニットを組み立てる（model.mobConfIjyouをそのまま運ぶ）。 */
function buildMobDebuffUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_DEBUFF))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameBuffLv, padArray(model.mobConfIjyou, 80));
    unit.doCompaction();
    return unit;
}

/**
 * 攻撃手段情報ユニットを組み立てる.
 * SaveSystem() の [0276-0285] 区画と同じ入力源（g_attackMethodBridge 経由の現在の
 * CAttackMethodConf）を使う。
 */
function buildAttackConfUnit(model) {
    const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_ATTACK_CONF))();
    unit.SetUpAsDefault();
    unit.setProp(CSaveDataConst.propNameOptCode, 0);
    unit.setProp(CSaveDataConst.propNameAttackSkillID, model.attackMethodSkillId);
    unit.setProp(CSaveDataConst.propNameSourceTypeID, model.attackMethodSourceType);
    unit.setProp(CSaveDataConst.propNameAttackSkillLv, model.attackMethodSkillLv);
    unit.setProp(CSaveDataConst.propNameAttackSkillOption, model.attackMethodOptions);
    unit.doCompaction();
    return unit;
}

/**
 * `usedDefIds` に含まれない、1以上64未満の最小の装備定義IDを返す
 * （旧 CSaveDataManager#getCandidateEquipItemDefID() と同じアルゴリズム）。
 * @param {number[]} usedDefIds 既に使用中の装備定義ID一覧
 * @returns {number}
 */
function getCandidateEquipItemDefId(usedDefIds) {
    for (let candidate = 1; candidate < (0x01 << 6); candidate++) {
        if (usedDefIds.indexOf(candidate) === -1) {
            return candidate;
        }
    }
    throw new Error("No candidates for EquipItemDefID");
}

/** ランダムオプション5枠をユニットへ設定する（アイテム・シャドウ共通）。 */
function setRndOptProps(unit, rndOpt) {
    unit.setProp(CSaveDataConst.propNameRndOptID1, rndOpt[0].kind);
    unit.setProp(CSaveDataConst.propNameRndOptValue1, rndOpt[0].value);
    unit.setProp(CSaveDataConst.propNameRndOptID2, rndOpt[1].kind);
    unit.setProp(CSaveDataConst.propNameRndOptValue2, rndOpt[1].value);
    unit.setProp(CSaveDataConst.propNameRndOptID3, rndOpt[2].kind);
    unit.setProp(CSaveDataConst.propNameRndOptValue3, rndOpt[2].value);
    unit.setProp(CSaveDataConst.propNameRndOptID4, rndOpt[3].kind);
    unit.setProp(CSaveDataConst.propNameRndOptValue4, rndOpt[3].value);
    unit.setProp(CSaveDataConst.propNameRndOptID5, rndOpt[4].kind);
    unit.setProp(CSaveDataConst.propNameRndOptValue5, rndOpt[4].value);
}

/**
 * 装備（アイテム11部位・シャドウ装備6部位）とプレイヤー状態異常設定のユニット群を組み立てる
 * （旧 CSaveDataManager#collectDataEquipable()/#collectDataCharaConfDebuff()/
 * #collectDataShadowEquips() の統合。B-33 B2-2）.
 *
 * 装備位置ユニット（EQUIP_REGIONS）は、対応する EQUIPABLE ユニット群を作りながら
 * 各部位のプロパティを直接書き込む（旧実装の「既存ユニットを配列内から検索して書き戻す」
 * パターン——`#setupRegionUnit()`——を、1関数内で完結する形に置き換えた）。
 *
 * シャドウ装備の装備定義ID（defID）は、アイテム側11件が常に使う defID（`eqpRgnId+1`）の
 * 続きから、未使用の最小値を順に割り当てる（旧#getCandidateEquipItemDefID()と同じ
 * アルゴリズム。空のシャドウ装備枠はdefIDを消費しない——旧実装と同じ「discardされた候補は
 * 次の枠で再利用される」挙動を再現するため、非空と判定された枠のぶんだけ usedDefIds に積む）。
 *
 * 各ユニットは生成直後に `doCompaction()` を呼ぶ（`buildSaveDataUnits()` 側の
 * 一括 `isEmptyUnit()` フィルタが正しく働くために必要。旧実装はアイテム側の11ユニットに
 * ついて個別の doCompaction() を呼んでいなかったが、最終的な出力バイト列は
 * `CSaveDataManager.doCompaction()`（本関数の外側で必ず呼ばれる）が全ユニットへ
 * 再度 doCompaction() するため同一になる）。
 * @param {object} model `extractSaveModelFromState()` の戻り値
 * @returns {{ itemEquipRegionsUnit: object, restUnits: object[] }}
 */
function buildEquipUnits(model) {
    const usedDefIds = [];

    const itemEquipRegionsUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS))();
    itemEquipRegionsUnit.SetUpAsDefault();
    itemEquipRegionsUnit.setProp(CSaveDataConst.propNameDataKind, CSaveDataConst.eqpRgnKindItem);
    itemEquipRegionsUnit.setProp(CSaveDataConst.propNameEqpRgnArrow, 11);

    const itemEquipableUnits = model.equip.itemRegions.map((region) => {
        const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIPABLE))();
        unit.SetUpAsDefault();
        const defId = region.eqpRgnId + 1;
        unit.setProp(CSaveDataConst.propNameEquipItemDefID, defId);
        unit.setProp(CSaveDataConst.propNameOptCode, 0);
        unit.setProp(CSaveDataConst.propNameItemID, region.itemId);
        unit.setProp(CSaveDataConst.propNameRefinedCount, region.refine);
        unit.setProp(CSaveDataConst.propNameTranscendenceCount, region.transcendence);
        setRndOptProps(unit, region.rndOpt);
        if (region.cardCategoryIds) {
            unit.setProp(CSaveDataConst.propNameCardCategoryID1, region.cardCategoryIds[0]);
            unit.setProp(CSaveDataConst.propNameCardCategoryID2, region.cardCategoryIds[1]);
            unit.setProp(CSaveDataConst.propNameCardCategoryID3, region.cardCategoryIds[2]);
            unit.setProp(CSaveDataConst.propNameCardCategoryID4, region.cardCategoryIds[3]);
        }
        unit.setProp(CSaveDataConst.propNameCardID1, region.cardIds[0]);
        unit.setProp(CSaveDataConst.propNameCardID2, region.cardIds[1]);
        unit.setProp(CSaveDataConst.propNameCardID3, region.cardIds[2]);
        unit.setProp(CSaveDataConst.propNameCardID4, region.cardIds[3]);

        itemEquipRegionsUnit.setProp(ITEM_REGION_PROP_MAP[region.eqpRgnId], defId);
        usedDefIds.push(defId);

        unit.doCompaction();
        return unit;
    });
    itemEquipRegionsUnit.doCompaction();

    const shadowEquipRegionsUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS))();
    shadowEquipRegionsUnit.SetUpAsDefault();
    shadowEquipRegionsUnit.setProp(CSaveDataConst.propNameDataKind, CSaveDataConst.eqpRgnKindShadow);

    const shadowEquipableUnits = [];
    for (const region of model.equip.shadowRegions) {
        const defId = getCandidateEquipItemDefId(usedDefIds);
        const unit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIPABLE))();
        unit.SetUpAsDefault();
        unit.setProp(CSaveDataConst.propNameEquipItemDefID, defId);
        unit.setProp(CSaveDataConst.propNameOptCode, 0);
        unit.setProp(CSaveDataConst.propNameItemID, region.itemId);
        unit.setProp(CSaveDataConst.propNameRefinedCount, region.refine);
        setRndOptProps(unit, region.rndOpt);
        // シャドウ装備はSlot1にカードを挿せないのでID2からスタート
        unit.setProp(CSaveDataConst.propNameCardID2, region.cardIds[0]);
        unit.setProp(CSaveDataConst.propNameCardID3, region.cardIds[1]);
        unit.setProp(CSaveDataConst.propNameCardID4, region.cardIds[2]);
        unit.doCompaction();

        if (unit.isEmptyUnit()) {
            continue;
        }

        shadowEquipRegionsUnit.setProp(SHADOW_REGION_PROP_MAP[region.eqpRgnId], defId);
        usedDefIds.push(defId);
        shadowEquipableUnits.push(unit);
    }
    shadowEquipRegionsUnit.doCompaction();

    const debuffUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_DEBUFF))();
    debuffUnit.SetUpAsDefault();
    debuffUnit.setProp(CSaveDataConst.propNameOptCode, 0);
    debuffUnit.setProp(CSaveDataConst.propNameBuffLv, model.equip.debuff);
    debuffUnit.doCompaction();

    return {
        itemEquipRegionsUnit,
        // EQUIPABLE型内の相対順序（アイテム→シャドウ）は doCompaction() の安定ソートで
        // 保持されるバイト列に影響するため、shadowEquipRegionsUnit（別type）を間に挟んでも
        // itemEquipableUnits → shadowEquipableUnits の順を保つ。
        restUnits: [...itemEquipableUnits, shadowEquipRegionsUnit, ...shadowEquipableUnits, debuffUnit],
    };
}

/**
 * セーブモデルからセーブデータユニット配列を組み立てる（純粋関数。DOM/グローバル読み取りなし）.
 * 空ユニット（`isEmptyUnit()`）は除く——`CSaveDataManager.doCompaction()` が
 * 配列レベルで行う除去と同じ扱い（例: 習得スキルが1つも無いキャラクターでは
 * LEARNED_SKILLS ユニット自体が最終出力に含まれない）。
 * @param {object} model `extractSaveModelFromState()` の戻り値
 * @returns {Array} `MIGRATED_SAVE_DATA_UNITS` に含まれるユニットの配列
 */
export function buildSaveDataUnits(model) {
    const equip = buildEquipUnits(model);
    const units = [
        buildVersionUnit(),
        buildCharaUnit(model),
        // EQUIP_REGIONS ×3（アイテム/衣装/シャドウ）は doCompaction() の安定ソートにより、
        // 同一type内では元の挿入順を保つ。encodeToURL() のバイト列は挿入順に依存するため、
        // アイテム→衣装→シャドウの順で置く（旧経路 translateFromOldFormat() と同じ順。
        // シャドウの EQUIP_REGIONS ユニットは equip.restUnits の中に含まれる——末尾で展開する）。
        equip.itemEquipRegionsUnit,
        buildEquipRegionsCostumeUnit(),
        buildLearnedSkillsUnit(model),
        buildEquipArrowUnit(model),
        buildCharaBuffUnit(model),
        buildSkillBuffSelfUnit(model),
        buildSkillBuff1stUnit(model),
        buildSkillBuff2ndUnit(model),
        buildSkillBuff3rdUnit(model),
        buildSkillBuff4thUnit(model),
        buildSkillBuffMusicUnit(model),
        buildSkillBuffGuildUnit(model),
        buildItemBuffUnit(model),
        buildTimeBuffUnit(model),
        buildAutoSpellsUnit(model),
        buildCharaConfBasicUnit(model),
        buildCharaConfSpecializePhysicalUnit(model),
        buildCharaConfSpecializeMagicalUnit(model),
        buildCharaConfSpecializeAttackAnyUnit(model),
        buildCharaConfSpecializeDefenceAnyUnit(model),
        buildCharaConfSkillUnit(model),
        buildCharaConfSpecBasicUnit(model),
        buildMobUnit(model),
        buildMobConfPlayerUnit(),
        buildMobConfPlayer2Unit(model),
        buildMobConfInputUnit(model),
        buildMobBuffUnit(model),
        buildMobDebuffUnit(model),
        buildAttackConfUnit(model),
        // 装備（アイテム11部位）→シャドウ装備EQUIP_REGIONS→シャドウ装備（≤6部位）→
        // プレイヤー状態異常設定の順（旧経路の挿入順を踏襲。EQUIPABLE型内の
        // アイテム→シャドウという相対順が保たれていれば、他typeとの位置関係は
        // 出力バイト列に影響しない——buildEquipUnits() のコメント参照）。
        ...equip.restUnits,
    ];
    return units.filter((unit) => !unit.isEmptyUnit());
}

/**
 * 状態からセーブデータユニット配列を直接組み立てる.
 * `extractSaveModelFromState()` → `buildSaveDataUnits()` の薄いラッパ（従来のエントリポイント）。
 * @returns {Array} `MIGRATED_SAVE_DATA_UNITS` に含まれるユニットの配列
 */
export function buildSaveDataUnitsFromState() {
    return buildSaveDataUnits(extractSaveModelFromState());
}
