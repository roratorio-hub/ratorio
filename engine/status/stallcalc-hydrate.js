/**
 * StAllCalc の DOM 走査プロローグ（リファクタリング計画 Phase 5・Phase 8）。
 *
 * stallcalc.js の StAllCalc は「DOM からグローバル状態へ書き込む」処理と「純粋な計算」処理が
 * 同一関数内に混在していた。本ファイルは前者（hydration）を切り出したもの。
 *
 * Phase 5（初回分割）では `HydrateFromDom()` が直接 `document.calcForm` 等を読んでいたが、
 * Phase 8 で「DOM を読む（ExtractModelFromDom）」と「モデルからグローバルへ書く
 * （HydrateFromModel）」に分離した。`HydrateFromDom()` は両者を繋ぐ薄いラッパーとして残る
 * （`calcx.html` 以外の呼び出し元・StAllCalc からの呼ばれ方は一切変えていない）。
 *
 * モデルの境界については `calc-model.js` の先頭コメントを参照。要約: hydrate.js が
 * `document.calcForm` 等を**直接**読んでいる値だけがモデルに入る。他コンポーネント
 * （攻撃手段・シャドウ装備・性能カスタマイズ合計値・職業選択）経由の値は境界の外側。
 */
// === AUTO-GENERATED IMPORTS ===
import { InitJobInfo } from "../bridge/stallcalc-bridge.js";
// === END AUTO-GENERATED IMPORTS ===
import { n_Skill4SW } from "../ui/BuffGuildAndGospel.js";
import { n_Skill7SW } from "../ui/BuffItemAndFood.js";
import { n_Skill1SW } from "../ui/BuffJobSpecificSelf.js";
import { n_Skill8SW } from "../ui/BuffOtherCategory.js";
import { n_A_PassSkill4, n_A_PassSkill7, n_A_PassSkill, n_A_PassSkill8 } from "../skill/skillstate.js";
import { CAttackMethodAreaComponentManager } from "../battle/CAttackMethodAreaComponentManager.js";
import { CShadowEquipController, g_shadowEquipController } from "../equip/CShadowEquipController.js";
import { n_B_TAISEI } from "../monster/mobconfplayer.js";
import { n_B_IJYOU } from "../monster/mobconfdebuf.js";
import { n_B_KYOUKA } from "../monster/mobconfbuf.js";
import {
    AUTO_SPELL_SETTING_COUNT, OBJID_OFFSET_AS_SKILL_ID, OBJID_OFFSET_AS_SKILL_LV, OBJID_OFFSET_AS_SKILL_PROB
} from "../skill/calcautospell.js";
import {
    g_confDataCustomAtk, g_confDataCustomDef, g_confDataCustomSkill, g_confDataCustomSpecStatus,
    g_confDataCustomStatus, g_confDataDebuff, g_confDataIchizi, g_confDataNizi, g_confDataSanzi, g_confDataYozi,
    g_constDataManager, g_objCharaConfCustomAtk, g_objCharaConfCustomDef, g_objCharaConfCustomSkill,
    g_objCharaConfCustomSpecStatus, g_objCharaConfCustomStatus, g_timeItemConf, g_timeItemConfEffective, n_Nitou,
    set_g_confDataCustomAtk, set_g_confDataCustomDef, set_g_confDataCustomSkill, set_g_confDataCustomSpecStatus,
    set_g_confDataCustomStatus, set_g_confDataDebuff, set_g_confDataIchizi, set_g_confDataNizi,
    set_g_confDataSanzi, set_g_confDataYozi, set_g_objCharaConfCustomAtk, set_g_objCharaConfCustomDef,
    set_g_objCharaConfCustomSkill, set_g_objCharaConfCustomSpecStatus, set_g_objCharaConfCustomStatus, set_n_Nitou,
} from "../runtime/global.js";
import { GetTotalSpecStatus, g_bonusStatus, g_pureStatus } from "../chara/hmjob.js";
import { CCharaConfCustomAtk } from "../chara/CCharaConfCustomAtk.js";
import { CCharaConfCustomDef } from "../chara/CCharaConfCustomDef.js";
import { CCharaConfCustomSkill } from "../chara/CCharaConfCustomSkill.js";
import { CCharaConfCustomSpecStatus } from "../chara/CCharaConfCustomSpecStatus.js";
import { CCharaConfCustomStatus } from "../chara/CCharaConfCustomStatus.js";
import {
    set_n_A_ActiveSkill, set_n_A_ActiveSkillLV, set_n_A_Arrow, set_n_A_BaseLV
} from "../runtime/ro4-state.js";
import { GetStatefullData, HtmlGetObjectValueById, HtmlGetObjectValueByIdAsInteger } from "../runtime/util.js";
import { ARROW_ID_NONE } from "../equip/arrow.dat.js";
import {
    CARD_REGION_ID_ACCESSORY_1, CARD_REGION_ID_ACCESSORY_2, CARD_REGION_ID_ARMS_LEFT_1, CARD_REGION_ID_ARMS_LEFT_2,
    CARD_REGION_ID_ARMS_LEFT_3, CARD_REGION_ID_ARMS_LEFT_4, CARD_REGION_ID_ARMS_RIGHT_1, CARD_REGION_ID_ARMS_RIGHT_2,
    CARD_REGION_ID_ARMS_RIGHT_3, CARD_REGION_ID_ARMS_RIGHT_4, CARD_REGION_ID_BODY, CARD_REGION_ID_COUNT,
    CARD_REGION_ID_ENCHANT_ACCESSORY_1_1, CARD_REGION_ID_ENCHANT_ACCESSORY_1_2, CARD_REGION_ID_ENCHANT_ACCESSORY_1_3,
    CARD_REGION_ID_ENCHANT_ACCESSORY_2_1, CARD_REGION_ID_ENCHANT_ACCESSORY_2_2, CARD_REGION_ID_ENCHANT_ACCESSORY_2_3,
    CARD_REGION_ID_ENCHANT_BODY_1, CARD_REGION_ID_ENCHANT_BODY_2, CARD_REGION_ID_ENCHANT_BODY_3,
    CARD_REGION_ID_ENCHANT_HEAD_MID_1, CARD_REGION_ID_ENCHANT_HEAD_MID_2, CARD_REGION_ID_ENCHANT_HEAD_MID_3,
    CARD_REGION_ID_ENCHANT_HEAD_TOP_1, CARD_REGION_ID_ENCHANT_HEAD_TOP_2, CARD_REGION_ID_ENCHANT_HEAD_TOP_3,
    CARD_REGION_ID_ENCHANT_HEAD_UNDER_1, CARD_REGION_ID_ENCHANT_HEAD_UNDER_2, CARD_REGION_ID_ENCHANT_HEAD_UNDER_3,
    CARD_REGION_ID_ENCHANT_SHIELD_1, CARD_REGION_ID_ENCHANT_SHIELD_2, CARD_REGION_ID_ENCHANT_SHIELD_3,
    CARD_REGION_ID_ENCHANT_SHOES_1, CARD_REGION_ID_ENCHANT_SHOES_2, CARD_REGION_ID_ENCHANT_SHOES_3,
    CARD_REGION_ID_ENCHANT_SHOULDER_1, CARD_REGION_ID_ENCHANT_SHOULDER_2, CARD_REGION_ID_ENCHANT_SHOULDER_3,
    CARD_REGION_ID_HEAD_MID, CARD_REGION_ID_HEAD_TOP, CARD_REGION_ID_HEAD_UNDER, CARD_REGION_ID_SHADOW_ARMS_RIGHT_1,
    CARD_REGION_ID_SHADOW_ARMS_RIGHT_2, CARD_REGION_ID_SHADOW_ARMS_RIGHT_3,
    CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_1, CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_2,
    CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_3, CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_1,
    CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_2, CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_3,
    CARD_REGION_ID_SHADOW_ENCHANT_BODY_1, CARD_REGION_ID_SHADOW_ENCHANT_BODY_2, CARD_REGION_ID_SHADOW_ENCHANT_BODY_3,
    CARD_REGION_ID_SHADOW_ENCHANT_SHOES_1, CARD_REGION_ID_SHADOW_ENCHANT_SHOES_2,
    CARD_REGION_ID_SHADOW_ENCHANT_SHOES_3, CARD_REGION_ID_SHADOW_SHIELD_1, CARD_REGION_ID_SHADOW_SHIELD_2,
    CARD_REGION_ID_SHADOW_SHIELD_3, CARD_REGION_ID_SHIELD, CARD_REGION_ID_SHOES, CARD_REGION_ID_SHOULDER,
    COSTUME_REGION_ID_COUNT, COSTUME_REGION_ID_HEAD_UNDER
} from "../runtime/common.js";
import { CONST_DATA_KIND_JOB } from "../const/EnumConstDataKind.js";
import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ACCESSORY_2, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT,
    EQUIP_REGION_ID_BODY, EQUIP_REGION_ID_COSTUME_HEAD_UNDER, EQUIP_REGION_ID_HEAD_MID, EQUIP_REGION_ID_HEAD_TOP,
    EQUIP_REGION_ID_HEAD_UNDER, EQUIP_REGION_ID_SHADOW_ACCESSORY_1, EQUIP_REGION_ID_SHADOW_ACCESSORY_2,
    EQUIP_REGION_ID_SHADOW_ARMS_LEFT, EQUIP_REGION_ID_SHADOW_ARMS_RIGHT, EQUIP_REGION_ID_SHADOW_BODY,
    EQUIP_REGION_ID_SHADOW_FOOT, EQUIP_REGION_ID_SHIELD, EQUIP_REGION_ID_SHOES, EQUIP_REGION_ID_SHOULDER
} from "../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_POWER, ITEM_DATA_INDEX_WPNLV } from "../const/EnumItemDataIndex.js";
import {
    EQUIP_REGION_ID_COUNT, MIG_PARAM_ID_SPL, MIG_PARAM_ID_STA, MIG_PARAM_ID_WIS, MIG_PARAM_ID_CRT
} from "../const/EnumMigItemParamId.js";
import { ItemObjNew } from "../equip/item.dat.js";
import { SetEquipRndOptTable } from "../equip/rndopttype.h.js";
import {
    g_itemIdArray, g_refinedArray, n_A_AGI, n_A_DEX, n_A_Equip, n_A_INT, n_A_JOB, n_A_LUK, n_A_PassSkill5, n_A_STR,
    n_A_VIT, n_A_Weapon2LV, n_A_Weapon2_ATKplus, n_A_WeaponLV, n_A_Weapon_ATKplus, n_A_card, n_A_costume, set_SU_AGI,
    set_SU_DEX, set_SU_INT, set_SU_LUK, set_SU_STR, set_SU_VIT, set_g_itemIdArray, set_g_refinedArray, set_n_A_AGI,
    set_n_A_BODY_DEF_PLUS, set_n_A_BODY_DEF_Transcendence, set_n_A_CRT, set_n_A_DEX, set_n_A_HEAD_DEF_PLUS,
    set_n_A_HEAD_DEF_Transcendence, set_n_A_INT, set_n_A_JOB, set_n_A_JobLV, set_n_A_LUK, set_n_A_SHIELD_DEF_PLUS,
    set_n_A_SHIELD_DEF_Transcendence, set_n_A_SHOES_DEF_PLUS, set_n_A_SHOES_DEF_Transcendence,
    set_n_A_SHOULDER_DEF_PLUS, set_n_A_SHOULDER_DEF_Transcendence, set_n_A_SPL, set_n_A_STA, set_n_A_STR,
    set_n_A_VIT, set_n_A_WIS, set_n_A_Weapon2LV, set_n_A_Weapon2LV_Maxplus, set_n_A_Weapon2LV_Minplus,
    set_n_A_Weapon2LV_seirenATK, set_n_A_Weapon2Type, set_n_A_Weapon2_ATK, set_n_A_Weapon2_ATKplus, set_n_A_Weapon2_Transcendence,
    set_n_A_WeaponLV, set_n_A_WeaponLV_Maxplus, set_n_A_WeaponLV_Minplus, set_n_A_WeaponLV_seirenATK,
    set_n_A_WeaponType, set_n_A_WeaponZokusei, set_n_A_Weapon_ATK, set_n_A_Weapon_ATKplus,
    set_n_A_Weapon_Transcendence
} from "../runtime/roro-state.js";
import { createEmptyModel } from "../runtime/calc-model.js";

// ---- eval() 撤去用シム（リファクタリング計画 Phase 3） ----
// eval("") は undefined を返すが Number("") は 0 になる等、eval と素朴な数値変換は
// 意味論が食い違う。census（全フィクスチャ116件 + 職業総当たり + 全設定欄展開 +
// 全select/input操作 + "+5"/"1,2"/"5.5"等のエッジケース値直接投入を実ブラウザで
// 走らせ、Number() では NaN になるが eval() なら評価できてしまう入力が実際に
// 出現するか調べた）の結果、該当する入力は1件も見つからなかった
// （tests/census-eval-value.mjs、2026-08-22 実施）。
// そのため eval への委譲パスは持たず、eval と同じ結果になる範囲
// （空文字列・通常の数値文字列・非文字列の恒等）のみをカバーする。
function legacyNum(raw) {
    if (typeof raw !== 'string') return raw;   // eval(非文字列) は恒等
    if (raw === '') return undefined;          // eval("") === undefined を保存
    return Number(raw);
}

/**
 * 二刀流状態を「左手武器種別」から導出する（残件台帳 B-09 Phase 2b）。
 * equip.js の `OnChangeArmsTypeLeft(itemKind)` が `itemKind != ITEM_KIND_NONE` で
 * `n_Nitou` を確定させているのと同じ判定基準（`ITEM_KIND_NONE === 0`）。
 * `n_Nitou` はこの値から常に導出可能な派生値であり、独立したモデルフィールドは持たない。
 * @param {number|string|undefined} weapon2Type model.weapon.weapon2Type（OBJID_ARMS_TYPE_LEFT）
 * @returns {boolean}
 */
function deriveNitou(weapon2Type) {
    return Number(weapon2Type ?? 0) !== 0; // 未設定（createEmptyModel()の既定値）は非二刀流扱い
}

/**
 * 設定欄配列（g_confDataIchizi等）の中身を、既存の配列があれば **中身だけ**
 * モデルの値へ差し替える（束縛を新しい配列に置き換えない）。
 * `g_objCharaConfIchizi` 等のUIコンポーネントが同じ配列オブジェクトを
 * `this.confArray` として保持しているため、束縛ごと差し替えるとUI側の参照が
 * 古い配列を指したままになり表示が狂う。呼び出し側で `set_g_confDataXxx(戻り値)`
 * すること（未初期化なら新規配列を返すので、その場合も同じ呼び方でよい）。
 * @param {any} current 現在のグローバル配列（null なら未初期化＝headless経路）
 * @param {any[]} values モデル側の値
 * @returns {any[]} 書き込み先の配列（set_g_confDataXxx へ渡す）
 */
function syncConfArray(current, values) {
    const target = current ?? [];
    target.length = 0;
    for (const v of values) target.push(v);
    return target;
}

/**
 * 性能カスタマイズ欄のUIコンポーネント（`g_objCharaConfCustomAtk`等）を返す。
 * 既存インスタンスがあればそのまま返す（`BuildUpSelectArea`でDOMと紐づいているUI
 * コンポーネントを headless 経路の都合で作り直さない）。無ければ
 * （headless の初回呼び出し等）`factory()` で新規生成する。`GetConf(id)` は
 * `this.confArray[id]` を読むだけなので、既存インスタンスの場合は
 * `syncConfArray` で中身を更新した配列を継続して参照する形で足りる。
 * @param {any} existing 既存インスタンス（null なら未生成）
 * @param {() => any} factory 新規生成する関数
 */
function ensureConfWrapper(existing, factory) {
    return existing ?? factory();
}

/**
 * document.calcForm 等の DOM から、モデル境界に含まれる値だけを読み取る（書き込みはしない）。
 * モデルに何が含まれ何が含まれないかは calc-model.js のコメントを参照。
 * @returns {object} createEmptyModel() の形をした、DOMから読み取った値で埋まったモデル
 */
export function ExtractModelFromDom() {
    const model = createEmptyModel();
    const calcForm = document.calcForm;

    //----------------------------------------------------------------
    // 基本パラメタ
    //----------------------------------------------------------------
    // 残件台帳 B-09 Phase 2b: 職業ID。従来モデルの意図的除外対象だったが
    // （changeJobSettings()経由でのみ書き込まれ、DOMイベントが発火しないheadless経路では
    // 残存値に暗黙依存していた）、他フィールドと同じ扱いへ格上げした（calc-model.js参照）。
    model.status.jobId = legacyNum(calcForm.A_JOB.value);
    model.status.baseLv = legacyNum(calcForm.A_BaseLV.value);
    model.status.jobLv = legacyNum(calcForm.A_JobLV.value);
    model.status.str = legacyNum(calcForm.A_STR.value);
    model.status.agi = legacyNum(calcForm.A_AGI.value);
    model.status.vit = legacyNum(calcForm.A_VIT.value);
    model.status.dex = legacyNum(calcForm.A_DEX.value);
    model.status.int = legacyNum(calcForm.A_INT.value);
    model.status.luk = legacyNum(calcForm.A_LUK.value);
    model.status.speedPot = legacyNum(calcForm.A_SpeedPOT.value);

    //----------------------------------------------------------------
    // 装備（本体アイテムID・矢・武器種別属性・各種精錬値）
    //----------------------------------------------------------------
    model.weapon.type = legacyNum(calcForm.A_WeaponType.value);
    model.weapon.zokusei = legacyNum(calcForm.A_Weapon_zokusei.value);
    // 残件台帳 B-09 Step 5: 二刀流の左手武器種別。従来 stallcalc-hydrate.js を経由せず
    // equip.js（Shell）が直接DOMから読んで n_A_Weapon2Type へ書き込んでいたため、
    // headless経路（calcFromModel）ではモデルに載らずグローバルの残存値に暗黙依存していた。
    model.weapon.weapon2Type = HtmlGetObjectValueById("OBJID_ARMS_TYPE_LEFT", 0);
    // 残件台帳 B-09 Phase 2b: 以前はここでグローバル n_Nitou を読んで左手欄を抽出するか
    // 判定していたが、n_Nitou 自体が「別のUIフロー（equip.js）で既に更新済み」という
    // 前提に依存する隠れ入力だった（headless経路では残存値のまま）。上で読んだ
    // weapon2Type から同じ基準で導出することで、この関数自身の抽出結果が
    // グローバルの残存値に左右されないようにする。
    const isNitou = deriveNitou(model.weapon.weapon2Type);
    model.arrow = HtmlGetObjectValueById("OBJID_SELECT_ARROW", ARROW_ID_NONE);

    model.equip = new Array(EQUIP_REGION_ID_COUNT).fill(0);
    model.equip[EQUIP_REGION_ID_ARMS] = HtmlGetObjectValueByIdAsInteger("OBJID_ARMS_RIGHT", 0);
    if (isNitou) {
        model.equip[EQUIP_REGION_ID_ARMS_LEFT] = HtmlGetObjectValueByIdAsInteger("OBJID_ARMS_LEFT", 0);
    }
    model.equip[EQUIP_REGION_ID_HEAD_TOP] = HtmlGetObjectValueByIdAsInteger("OBJID_HEAD_TOP", 0);
    model.equip[EQUIP_REGION_ID_HEAD_MID] = HtmlGetObjectValueByIdAsInteger("OBJID_HEAD_MID", 0);
    model.equip[EQUIP_REGION_ID_HEAD_UNDER] = HtmlGetObjectValueByIdAsInteger("OBJID_HEAD_UNDER", 0);
    model.equip[EQUIP_REGION_ID_SHIELD] = HtmlGetObjectValueByIdAsInteger("OBJID_SHIELD", 0);
    model.equip[EQUIP_REGION_ID_BODY] = HtmlGetObjectValueByIdAsInteger("OBJID_BODY", 0);
    model.equip[EQUIP_REGION_ID_SHOULDER] = HtmlGetObjectValueByIdAsInteger("OBJID_SHOULDER", 0);
    model.equip[EQUIP_REGION_ID_SHOES] = HtmlGetObjectValueByIdAsInteger("OBJID_SHOES", 0);
    model.equip[EQUIP_REGION_ID_ACCESSORY_1] = HtmlGetObjectValueByIdAsInteger("OBJID_ACCESSORY_1", 0);
    model.equip[EQUIP_REGION_ID_ACCESSORY_2] = HtmlGetObjectValueByIdAsInteger("OBJID_ACCESSORY_2", 0);
    model.equip[EQUIP_REGION_ID_COSTUME_HEAD_UNDER] = HtmlGetObjectValueByIdAsInteger("A_isyou3", 0);

    model.defPlus.head = legacyNum(calcForm.A_HEAD_DEF_PLUS.value);
    model.defPlus.body = legacyNum(calcForm.A_BODY_DEF_PLUS.value);
    model.defPlus.shield = legacyNum(calcForm.A_SHIELD_DEF_PLUS.value);
    model.defPlus.shoulder = legacyNum(calcForm.A_SHOULDER_DEF_PLUS.value);
    model.defPlus.shoes = legacyNum(calcForm.A_SHOES_DEF_PLUS.value);

    model.weapon.transcendence = legacyNum(calcForm.A_Weapon_Transcendence.value);
    model.weapon.weapon2Transcendence = legacyNum(calcForm.A_Weapon2_Transcendence.value);
    model.defTranscendence.head = legacyNum(calcForm.A_HEAD_DEF_Transcendence.value);
    model.defTranscendence.shield = legacyNum(calcForm.A_SHIELD_DEF_Transcendence.value);
    model.defTranscendence.body = legacyNum(calcForm.A_BODY_DEF_Transcendence.value);
    model.defTranscendence.shoulder = legacyNum(calcForm.A_SHOULDER_DEF_Transcendence.value);
    model.defTranscendence.shoes = legacyNum(calcForm.A_SHOES_DEF_Transcendence.value);

    model.weapon.atkPlus = legacyNum(calcForm.A_Weapon_ATKplus.value);
    if (isNitou) {
        model.weapon.weapon2AtkPlus = legacyNum(calcForm.A_Weapon2_ATKplus.value);
    }

    //----------------------------------------------------------------
    // 装着カード・エンチャント（CARD_REGION_ID_* で添字アクセス）
    //----------------------------------------------------------------
    model.card = new Array(CARD_REGION_ID_COUNT).fill(0);

    model.card[CARD_REGION_ID_ARMS_RIGHT_1] = GetStatefullData("DATA_OBJID_ARMS_RIGHT_CARD_1", 0);
    model.card[CARD_REGION_ID_ARMS_RIGHT_2] = GetStatefullData("DATA_OBJID_ARMS_RIGHT_CARD_2", 0);
    model.card[CARD_REGION_ID_ARMS_RIGHT_3] = GetStatefullData("DATA_OBJID_ARMS_RIGHT_CARD_3", 0);
    model.card[CARD_REGION_ID_ARMS_RIGHT_4] = GetStatefullData("DATA_OBJID_ARMS_RIGHT_CARD_4", 0);

    if (isNitou) {
        model.card[CARD_REGION_ID_ARMS_LEFT_1] = GetStatefullData("DATA_OBJID_ARMS_LEFT_CARD_1", 0);
        model.card[CARD_REGION_ID_ARMS_LEFT_2] = GetStatefullData("DATA_OBJID_ARMS_LEFT_CARD_2", 0);
        model.card[CARD_REGION_ID_ARMS_LEFT_3] = GetStatefullData("DATA_OBJID_ARMS_LEFT_CARD_3", 0);
        model.card[CARD_REGION_ID_ARMS_LEFT_4] = GetStatefullData("DATA_OBJID_ARMS_LEFT_CARD_4", 0);
    }

    model.card[CARD_REGION_ID_HEAD_TOP] = GetStatefullData("DATA_OBJID_HEAD_TOP_CARD_1", 0);
    model.card[CARD_REGION_ID_HEAD_MID] = GetStatefullData("DATA_OBJID_HEAD_MID_CARD_1", 0);
    model.card[CARD_REGION_ID_HEAD_UNDER] = GetStatefullData("DATA_OBJID_HEAD_UNDER_CARD_1", 0);
    model.card[CARD_REGION_ID_SHIELD] = GetStatefullData("DATA_OBJID_SHIELD_CARD_1", 0);
    model.card[CARD_REGION_ID_BODY] = GetStatefullData("DATA_OBJID_BODY_CARD_1", 0);
    model.card[CARD_REGION_ID_SHOULDER] = GetStatefullData("DATA_OBJID_SHOULDER_CARD_1", 0);
    model.card[CARD_REGION_ID_SHOES] = GetStatefullData("DATA_OBJID_SHOES_CARD_1", 0);
    model.card[CARD_REGION_ID_ACCESSORY_1] = GetStatefullData("DATA_OBJID_ACCESSORY_1_CARD_1", 0);
    model.card[CARD_REGION_ID_ACCESSORY_2] = GetStatefullData("DATA_OBJID_ACCESSORY_2_CARD_1", 0);

    model.card[CARD_REGION_ID_ENCHANT_HEAD_TOP_1] = GetStatefullData("DATA_OBJID_HEAD_TOP_CARD_2", 0);
    model.card[CARD_REGION_ID_ENCHANT_HEAD_TOP_2] = GetStatefullData("DATA_OBJID_HEAD_TOP_CARD_3", 0);
    model.card[CARD_REGION_ID_ENCHANT_HEAD_TOP_3] = GetStatefullData("DATA_OBJID_HEAD_TOP_CARD_4", 0);

    model.card[CARD_REGION_ID_ENCHANT_HEAD_MID_1] = GetStatefullData("DATA_OBJID_HEAD_MID_CARD_2", 0);
    model.card[CARD_REGION_ID_ENCHANT_HEAD_MID_2] = GetStatefullData("DATA_OBJID_HEAD_MID_CARD_3", 0);
    model.card[CARD_REGION_ID_ENCHANT_HEAD_MID_3] = GetStatefullData("DATA_OBJID_HEAD_MID_CARD_4", 0);

    model.card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_1] = GetStatefullData("DATA_OBJID_HEAD_UNDER_CARD_2", 0);
    model.card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_2] = GetStatefullData("DATA_OBJID_HEAD_UNDER_CARD_3", 0);
    model.card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_3] = GetStatefullData("DATA_OBJID_HEAD_UNDER_CARD_4", 0);

    model.card[CARD_REGION_ID_ENCHANT_SHIELD_1] = GetStatefullData("DATA_OBJID_SHIELD_CARD_2", 0);
    model.card[CARD_REGION_ID_ENCHANT_SHIELD_2] = GetStatefullData("DATA_OBJID_SHIELD_CARD_3", 0);
    model.card[CARD_REGION_ID_ENCHANT_SHIELD_3] = GetStatefullData("DATA_OBJID_SHIELD_CARD_4", 0);

    model.card[CARD_REGION_ID_ENCHANT_BODY_1] = GetStatefullData("DATA_OBJID_BODY_CARD_2", 0);
    model.card[CARD_REGION_ID_ENCHANT_BODY_2] = GetStatefullData("DATA_OBJID_BODY_CARD_3", 0);
    model.card[CARD_REGION_ID_ENCHANT_BODY_3] = GetStatefullData("DATA_OBJID_BODY_CARD_4", 0);

    model.card[CARD_REGION_ID_ENCHANT_SHOULDER_1] = GetStatefullData("DATA_OBJID_SHOULDER_CARD_2", 0);
    model.card[CARD_REGION_ID_ENCHANT_SHOULDER_2] = GetStatefullData("DATA_OBJID_SHOULDER_CARD_3", 0);
    model.card[CARD_REGION_ID_ENCHANT_SHOULDER_3] = GetStatefullData("DATA_OBJID_SHOULDER_CARD_4", 0);

    model.card[CARD_REGION_ID_ENCHANT_SHOES_1] = GetStatefullData("DATA_OBJID_SHOES_CARD_2", 0);
    model.card[CARD_REGION_ID_ENCHANT_SHOES_2] = GetStatefullData("DATA_OBJID_SHOES_CARD_3", 0);
    model.card[CARD_REGION_ID_ENCHANT_SHOES_3] = GetStatefullData("DATA_OBJID_SHOES_CARD_4", 0);

    model.card[CARD_REGION_ID_ENCHANT_ACCESSORY_1_1] = GetStatefullData("DATA_OBJID_ACCESSORY_1_CARD_2", 0);
    model.card[CARD_REGION_ID_ENCHANT_ACCESSORY_1_2] = GetStatefullData("DATA_OBJID_ACCESSORY_1_CARD_3", 0);
    model.card[CARD_REGION_ID_ENCHANT_ACCESSORY_1_3] = GetStatefullData("DATA_OBJID_ACCESSORY_1_CARD_4", 0);

    model.card[CARD_REGION_ID_ENCHANT_ACCESSORY_2_1] = GetStatefullData("DATA_OBJID_ACCESSORY_2_CARD_2", 0);
    model.card[CARD_REGION_ID_ENCHANT_ACCESSORY_2_2] = GetStatefullData("DATA_OBJID_ACCESSORY_2_CARD_3", 0);
    model.card[CARD_REGION_ID_ENCHANT_ACCESSORY_2_3] = GetStatefullData("DATA_OBJID_ACCESSORY_2_CARD_4", 0);

    model.card[CARD_REGION_ID_SHADOW_ARMS_RIGHT_1] = GetStatefullData("DATA_OBJID_SHADOW_ARMS_RIGHT_CARD_2", 0);
    model.card[CARD_REGION_ID_SHADOW_ARMS_RIGHT_2] = GetStatefullData("DATA_OBJID_SHADOW_ARMS_RIGHT_CARD_3", 0);
    model.card[CARD_REGION_ID_SHADOW_ARMS_RIGHT_3] = GetStatefullData("DATA_OBJID_SHADOW_ARMS_RIGHT_CARD_4", 0);
    model.card[CARD_REGION_ID_SHADOW_SHIELD_1] = GetStatefullData("DATA_OBJID_SHADOW_SHIELD_CARD_2", 0);
    model.card[CARD_REGION_ID_SHADOW_SHIELD_2] = GetStatefullData("DATA_OBJID_SHADOW_SHIELD_CARD_3", 0);
    model.card[CARD_REGION_ID_SHADOW_SHIELD_3] = GetStatefullData("DATA_OBJID_SHADOW_SHIELD_CARD_4", 0);
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_BODY_1] = GetStatefullData("DATA_OBJID_SHADOW_BODY_CARD_2", 0);
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_BODY_2] = GetStatefullData("DATA_OBJID_SHADOW_BODY_CARD_3", 0);
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_BODY_3] = GetStatefullData("DATA_OBJID_SHADOW_BODY_CARD_4", 0);
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_SHOES_1] = GetStatefullData("DATA_OBJID_SHADOW_SHOES_CARD_2", 0);
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_SHOES_2] = GetStatefullData("DATA_OBJID_SHADOW_SHOES_CARD_3", 0);
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_SHOES_3] = GetStatefullData("DATA_OBJID_SHADOW_SHOES_CARD_4", 0);
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_1] = GetStatefullData("DATA_OBJID_SHADOW_ACCESSORY-1_CARD_2", 0);
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_2] = GetStatefullData("DATA_OBJID_SHADOW_ACCESSORY-1_CARD_3", 0);
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_3] = GetStatefullData("DATA_OBJID_SHADOW_ACCESSORY-1_CARD_4", 0);
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_1] = GetStatefullData("DATA_OBJID_SHADOW_ACCESSORY-2_CARD_2", 0);
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_2] = GetStatefullData("DATA_OBJID_SHADOW_ACCESSORY-2_CARD_3", 0);
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_3] = GetStatefullData("DATA_OBJID_SHADOW_ACCESSORY-2_CARD_4", 0);

    //----------------------------------------------------------------
    // 装着衣装
    //----------------------------------------------------------------
    model.costume = new Array(COSTUME_REGION_ID_COUNT).fill(0);
    model.costume[COSTUME_REGION_ID_HEAD_UNDER] = GetStatefullData("DATA_OBJID_HEAD_UNDER_COSTUME", 0);

    //----------------------------------------------------------------
    // 職業スキル（パッシブ/持続系。A1欄）
    //----------------------------------------------------------------
    if (n_Skill1SW) {
        // 残件台帳 B-09 Phase 2b: グローバル n_A_JOB ではなくこの関数自身が読んだ
        // model.status.jobId を使う（この関数はまだ n_A_JOB を書き込んでいないため、
        // グローバルを読むとheadless経路で残存値の隠れ入力になる）。
        const passiveSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, model.status.jobId).GetPassiveSkillIdArray();
        // 要素が存在しない項目は null のままにする（legacyNum が undefined を返すケースと
        // 区別するため。「未抽出」は null、「抽出したが値が空文字」は undefined で表す）。
        model.passiveSkill = new Array(passiveSkillIdArray.length).fill(null);
        for (let i = 0; i < passiveSkillIdArray.length; i++) {
            const wOBJ = document.getElementById("A_skill" + i);
            if (wOBJ !== null) {
                model.passiveSkill[i] = legacyNum(wOBJ.value);
            }
        }
    }

    //----------------------------------------------------------------
    // ギルドスキル/ゴスペル/他（A4欄）
    //----------------------------------------------------------------
    if (n_Skill4SW) {
        model.buff4[0] = calcForm.A4_Skill0.checked;
        model.buff4[1] = legacyNum(calcForm.A4_Skill1.value);
        model.buff4[2] = legacyNum(calcForm.A4_Skill2.value);
        model.buff4[3] = legacyNum(calcForm.A4_Skill3.value);
        model.buff4[4] = legacyNum(calcForm.A4_Skill4.value);
        model.buff4[5] = calcForm.A4_Skill5.checked;
        model.buff4[6] = calcForm.A4_Skill6.checked;
        model.buff4[7] = calcForm.A4_Skill7.checked;
        model.buff4[8] = calcForm.A4_Skill8.checked;
        model.buff4[9] = calcForm.A4_Skill9.checked;
        model.buff4[10] = calcForm.A4_Skill10.checked;
        model.buff4[11] = legacyNum(calcForm.A4_Skill11.value);
        model.buff4[30] = legacyNum(calcForm.A4_Skill30.value);
        model.buff4[31] = legacyNum(calcForm.A4_Skill31.value);
        model.buff4[32] = legacyNum(calcForm.A4_Skill32.value);
        model.buff4[33] = legacyNum(calcForm.A4_Skill33.value);
        model.buff4[34] = legacyNum(calcForm.A4_Skill34.value);
        model.buff4[35] = legacyNum(calcForm.A4_Skill35.value);
    }

    //----------------------------------------------------------------
    // オートスペル設定
    //----------------------------------------------------------------
    // 要素が存在しない項目は null のままにする（legacyNum が undefined を返すケースと
    // 区別するため。「未抽出」は null、「抽出したが値が空文字」は undefined で表す）。
    model.autoSpell = [];
    for (let idx = 0; idx < AUTO_SPELL_SETTING_COUNT; idx++) {
        let objSelect = document.getElementById("OBJID_AS_SKILL_ID_" + (OBJID_OFFSET_AS_SKILL_ID + idx));
        model.autoSpell[OBJID_OFFSET_AS_SKILL_ID + idx] = null;
        if (objSelect) {
            model.autoSpell[OBJID_OFFSET_AS_SKILL_ID + idx] = legacyNum(objSelect.value);
        }

        objSelect = document.getElementById("OBJID_AS_SKILL_LV_" + (OBJID_OFFSET_AS_SKILL_LV + idx));
        model.autoSpell[OBJID_OFFSET_AS_SKILL_LV + idx] = null;
        if (objSelect) {
            model.autoSpell[OBJID_OFFSET_AS_SKILL_LV + idx] = legacyNum(objSelect.value);
        }

        objSelect = document.getElementById("OBJID_AS_SKILL_PROB_" + (OBJID_OFFSET_AS_SKILL_PROB + idx));
        model.autoSpell[OBJID_OFFSET_AS_SKILL_PROB + idx] = null;
        if (objSelect) {
            model.autoSpell[OBJID_OFFSET_AS_SKILL_PROB + idx] = legacyNum(objSelect.value);
        }
    }

    //----------------------------------------------------------------
    // アイテム(食品/他)（A7欄）
    //----------------------------------------------------------------
    if (n_Skill7SW) {
        model.buff7[0] = calcForm.A7_Skill0.checked;
        model.buff7[1] = calcForm.A7_Skill1.checked;
        model.buff7[2] = calcForm.A7_Skill2.checked;
        model.buff7[3] = legacyNum(calcForm.A7_Skill3.value);
        model.buff7[4] = legacyNum(calcForm.A7_Skill4.value);
        model.buff7[5] = legacyNum(calcForm.A7_Skill5.value);
        model.buff7[6] = legacyNum(calcForm.A7_Skill6.value);
        model.buff7[7] = legacyNum(calcForm.A7_Skill7.value);
        model.buff7[8] = legacyNum(calcForm.A7_Skill8.value);
        model.buff7[9] = calcForm.A7_Skill9.checked;
        model.buff7[10] = calcForm.A7_Skill10.checked;
        model.buff7[11] = calcForm.A7_Skill11.checked;
        model.buff7[12] = calcForm.A7_Skill12.checked;
        model.buff7[13] = calcForm.A7_Skill13.checked;
        model.buff7[14] = calcForm.A7_Skill14.checked;
        model.buff7[15] = calcForm.A7_Skill15.checked;
        model.buff7[16] = calcForm.A7_Skill16.checked;
        model.buff7[17] = calcForm.A7_Skill17.checked;
        model.buff7[18] = calcForm.A7_Skill18.checked;
        model.buff7[19] = calcForm.A7_Skill19.checked;
        model.buff7[20] = calcForm.A7_Skill20.checked;
        model.buff7[21] = calcForm.A7_Skill21.checked;
        model.buff7[22] = calcForm.A7_Skill22.checked;
        model.buff7[23] = calcForm.A7_Skill23.checked;
        model.buff7[24] = calcForm.A7_Skill24.checked;
        model.buff7[25] = calcForm.A7_Skill25.checked;
        model.buff7[26] = calcForm.A7_Skill26.checked;
        model.buff7[27] = calcForm.A7_Skill27.checked;
        model.buff7[28] = calcForm.A7_Skill28.checked;
        model.buff7[29] = calcForm.A7_Skill29.checked;
        model.buff7[30] = calcForm.A7_Skill30.checked;
        model.buff7[31] = calcForm.A7_Skill31.checked;
        model.buff7[32] = calcForm.A7_Skill32.checked;
        model.buff7[33] = calcForm.A7_Skill33.checked;
        model.buff7[34] = calcForm.A7_Skill34.checked;
        model.buff7[35] = calcForm.A7_Skill35.checked;
        model.buff7[36] = calcForm.A7_Skill36.checked;
        model.buff7[37] = calcForm.A7_Skill37.checked;
        model.buff7[38] = legacyNum(calcForm.A7_Skill38.value);
        model.buff7[39] = legacyNum(calcForm.A7_Skill39.value);
        model.buff7[40] = calcForm.A7_Skill40.checked;
        model.buff7[41] = legacyNum(calcForm.A7_Skill41.value);
        model.buff7[42] = legacyNum(calcForm.A7_Skill42.value);
        model.buff7[43] = legacyNum(calcForm.A7_Skill43.value);
        model.buff7[44] = legacyNum(calcForm.A7_Skill44.value);
        model.buff7[45] = legacyNum(calcForm.A7_Skill45.value);
        model.buff7[46] = legacyNum(calcForm.A7_Skill46.value);
        model.buff7[47] = legacyNum(calcForm.A7_Skill47.value);
        model.buff7[48] = calcForm.A7_Skill48.checked;
        model.buff7[49] = calcForm.A7_Skill49.checked;
        model.buff7[50] = legacyNum(calcForm.A7_Skill50.value);
        model.buff7[51] = calcForm.A7_Skill51.checked;
        model.buff7[52] = legacyNum(calcForm.A7_Skill52.value);
    }

    //----------------------------------------------------------------
    // その他の支援/設定（A8欄）
    //----------------------------------------------------------------
    if (n_Skill8SW) {
        model.buff8[0] = legacyNum(calcForm.A8_Skill0.value);
        model.buff8[1] = legacyNum(calcForm.A8_Skill1.value);
        model.buff8[2] = legacyNum(calcForm.A8_Skill2.value);
        model.buff8[3] = legacyNum(calcForm.A8_Skill3.value);
        model.buff8[4] = calcForm.A8_Skill4.checked;
        model.buff8[5] = legacyNum(calcForm.A8_Skill5.value);
        model.buff8[6] = legacyNum(calcForm.A8_Skill6.value);
        model.buff8[7] = legacyNum(calcForm.A8_Skill7.value);
        model.buff8[12] = legacyNum(calcForm.A8_Skill12.value);
        model.buff8[13] = calcForm.A8_Skill13.checked;
        model.buff8[15] = legacyNum(calcForm.A8_Skill15.value);
        model.buff8[16] = calcForm.A8_Skill16.checked;
        model.buff8[17] = legacyNum(calcForm.A8_Skill17.value);
        model.buff8[19] = calcForm.A8_Skill19.checked;
        model.buff8[21] = legacyNum(calcForm.A8_Skill21.value);
        model.buff8[22] = legacyNum(calcForm.A8_Skill22.value);
    }

    //----------------------------------------------------------------
    // 一次〜四次職支援・デバフ設定欄
    //----------------------------------------------------------------
    // calcForm に個別フィールドは無く、CConfBase 派生の配列（g_confDataIchizi 等）が
    // 唯一の実体（HydrateFromModel側のコメント参照）。
    model.confIchizi = Array.from(g_confDataIchizi ?? []);
    model.confNizi = Array.from(g_confDataNizi ?? []);
    model.confSanzi = Array.from(g_confDataSanzi ?? []);
    model.confYozi = Array.from(g_confDataYozi ?? []);
    model.confDebuff = Array.from(g_confDataDebuff ?? []);

    //----------------------------------------------------------------
    // 性能カスタマイズ欄・特性ステータス
    //----------------------------------------------------------------
    model.confCustomStatus = Array.from(g_confDataCustomStatus ?? []);
    model.confCustomAtk = Array.from(g_confDataCustomAtk ?? []);
    model.confCustomDef = Array.from(g_confDataCustomDef ?? []);
    model.confCustomSkill = Array.from(g_confDataCustomSkill ?? []);
    model.confCustomSpecStatus = Array.from(g_confDataCustomSpecStatus ?? []);
    model.pureStatus = Array.from(g_pureStatus ?? []);
    model.bonusStatus = Array.from(g_bonusStatus ?? []);

    //----------------------------------------------------------------
    // 時限効果欄
    //----------------------------------------------------------------
    // OBJID_SELECT_TIME_ITEM_N・クイック調整欄のON/OFF切替は、どちらも設定欄が
    // 展開（OBJID_TIME_ITEM_AREA_EXTRACT_CHECKBOX）されていないとDOM要素自体が
    // 存在しない（CTimeItemAreaComponentManager.RebuildControls参照）。
    // n_Skill{1,4,7,8}SW と同型のため、現在値をそのまま運ぶ。
    model.timeItemConf = Array.from(g_timeItemConf ?? []);
    model.timeItemConfEffective = Array.from(g_timeItemConfEffective ?? []);

    //----------------------------------------------------------------
    // モンスター設定欄（対プレイヤー特性・異常・強化）
    //----------------------------------------------------------------
    // 展開状態にDOM要素の有無が依存する同型の設定欄のため、現在値をそのまま運ぶ。
    model.mobConfTaisei = Array.from(n_B_TAISEI ?? []);
    model.mobConfIjyou = Array.from(n_B_IJYOU ?? []);
    model.mobConfKyouka = Array.from(n_B_KYOUKA ?? []);

    return model;
}

/**
 * モデルからモジュールグローバル（roro-state.js / ro4-state.js 等の export let）へ書き込む。
 * DOM は一切読まない（境界の外側の依存 — 職業選択・攻撃手段・シャドウ装備コンポーネント・
 * 性能カスタマイズ合計値 — は例外で、既存のグローバル/コンポーネントを直接読む。
 * calc-model.js 先頭のコメント参照）。
 * StAllCalcCore() 側でも必要な attackMethodConfArray のみ戻り値として返す
 * （n_A_SpeedPOT はモデル自身に model.status.speedPot として残るため、呼び出し元が
 * モデルから直接読める）。
 * @param {object} model createEmptyModel() の形をしたモデル
 * @returns {{attackMethodConfArray: object[]}}
 */
export function HydrateFromModel(model) {
    InitJobInfo();

    //----------------------------------------------------------------
    // 基本パラメタを設定する
    //----------------------------------------------------------------

    // 残件台帳 B-09 Phase 2b: 職業ID（calc-model.js参照）。
    set_n_A_JOB(model.status.jobId);
    set_n_A_BaseLV(model.status.baseLv);
    set_n_A_JobLV(model.status.jobLv);

    set_n_A_STR(model.status.str);
    set_n_A_AGI(model.status.agi);
    set_n_A_VIT(model.status.vit);
    set_n_A_DEX(model.status.dex);
    set_n_A_INT(model.status.int);
    set_n_A_LUK(model.status.luk);

    set_SU_STR(n_A_STR);
    set_SU_AGI(n_A_AGI);
    set_SU_VIT(n_A_VIT);
    set_SU_DEX(n_A_DEX);
    set_SU_INT(n_A_INT);
    set_SU_LUK(n_A_LUK);

    //----------------------------------------------------------------
    // 特性パラメタを設定する
    //----------------------------------------------------------------

    // 合計値
    set_n_A_STA(GetTotalSpecStatus(MIG_PARAM_ID_STA));
    set_n_A_WIS(GetTotalSpecStatus(MIG_PARAM_ID_WIS));
    set_n_A_SPL(GetTotalSpecStatus(MIG_PARAM_ID_SPL));
    set_n_A_CRT(GetTotalSpecStatus(MIG_PARAM_ID_CRT));

    //----------------------------------------------------------------
    // 装備を設定する
    //----------------------------------------------------------------

    set_n_A_WeaponType(model.weapon.type);
    set_n_A_WeaponZokusei(model.weapon.zokusei);
    // 残件台帳 B-09 Step 5: 二刀流でなくてもデフォルト0（素手or盾）で確定させる
    // （equip.js側の実装と同じ既定値。n_Nitouで分岐する必要はない）。
    set_n_A_Weapon2Type(model.weapon.weapon2Type ?? 0);
    // 残件台帳 B-09 Phase 2b: n_Nitou はモデルの独立フィールドではなく weapon2Type からの
    // 派生値（deriveNitou参照）。ここで書き込んでおくことで、以降このファイル内・
    // Core側の両方が「今回のモデルに基づく最新値」を読めるようにする
    // （旧実装はこの書き込みが無く、DOMイベントで前回更新されたグローバルの残存値に
    // 依存していた＝headless経路での隠れ入力だった）。
    set_n_Nitou(deriveNitou(model.weapon.weapon2Type));
    set_n_A_Arrow(parseInt(model.arrow));

    for (let idx = 0; idx < EQUIP_REGION_ID_COUNT; idx++) {
        n_A_Equip[idx] = model.equip[idx] ?? 0;
    }

    set_n_A_HEAD_DEF_PLUS(model.defPlus.head);
    set_n_A_BODY_DEF_PLUS(model.defPlus.body);
    set_n_A_SHIELD_DEF_PLUS(model.defPlus.shield);
    set_n_A_SHOULDER_DEF_PLUS(model.defPlus.shoulder);
    set_n_A_SHOES_DEF_PLUS(model.defPlus.shoes);

    // シャドウ装備データ（g_shadowEquipController 自身の内部状態。境界の外側）
    set_g_itemIdArray([]);
    set_g_refinedArray([]);
    if ((typeof g_shadowEquipController) !== "undefined") {
        g_itemIdArray[EQUIP_REGION_ID_SHADOW_ARMS_RIGHT] = g_shadowEquipController.getEquippedID(CShadowEquipController.EQPRGN_NAME_ARMS_RIGHT);
        g_itemIdArray[EQUIP_REGION_ID_SHADOW_ARMS_LEFT] = g_shadowEquipController.getEquippedID(CShadowEquipController.EQPRGN_NAME_ARMS_LEFT);
        g_itemIdArray[EQUIP_REGION_ID_SHADOW_BODY] = g_shadowEquipController.getEquippedID(CShadowEquipController.EQPRGN_NAME_BODY);
        g_itemIdArray[EQUIP_REGION_ID_SHADOW_FOOT] = g_shadowEquipController.getEquippedID(CShadowEquipController.EQPRGN_NAME_FOOT);
        g_itemIdArray[EQUIP_REGION_ID_SHADOW_ACCESSORY_1] = g_shadowEquipController.getEquippedID(CShadowEquipController.EQPRGN_NAME_ACCESSORY_1);
        g_itemIdArray[EQUIP_REGION_ID_SHADOW_ACCESSORY_2] = g_shadowEquipController.getEquippedID(CShadowEquipController.EQPRGN_NAME_ACCESSORY_2);

        g_refinedArray[EQUIP_REGION_ID_SHADOW_ARMS_RIGHT] = g_shadowEquipController.getRefined(CShadowEquipController.EQPRGN_NAME_ARMS_RIGHT);
        g_refinedArray[EQUIP_REGION_ID_SHADOW_ARMS_LEFT] = g_shadowEquipController.getRefined(CShadowEquipController.EQPRGN_NAME_ARMS_LEFT);
        g_refinedArray[EQUIP_REGION_ID_SHADOW_BODY] = g_shadowEquipController.getRefined(CShadowEquipController.EQPRGN_NAME_BODY);
        g_refinedArray[EQUIP_REGION_ID_SHADOW_FOOT] = g_shadowEquipController.getRefined(CShadowEquipController.EQPRGN_NAME_FOOT);
        g_refinedArray[EQUIP_REGION_ID_SHADOW_ACCESSORY_1] = g_shadowEquipController.getRefined(CShadowEquipController.EQPRGN_NAME_ACCESSORY_1);
        g_refinedArray[EQUIP_REGION_ID_SHADOW_ACCESSORY_2] = g_shadowEquipController.getRefined(CShadowEquipController.EQPRGN_NAME_ACCESSORY_2);

        const funcSetRndOptTable = (eqpRgnIdF, eqpRgnNameF) => {
            const rndOptInfoArrayF = g_shadowEquipController.getRndOptInfoArray(eqpRgnNameF);
            for (let idxF = 0; idxF < rndOptInfoArrayF.length; idxF++) {
                SetEquipRndOptTable(eqpRgnIdF, idxF, rndOptInfoArrayF[idxF][0], rndOptInfoArrayF[idxF][1]);
            }
        };
        funcSetRndOptTable(EQUIP_REGION_ID_SHADOW_ARMS_RIGHT, CShadowEquipController.EQPRGN_NAME_ARMS_RIGHT);
        funcSetRndOptTable(EQUIP_REGION_ID_SHADOW_ARMS_LEFT, CShadowEquipController.EQPRGN_NAME_ARMS_LEFT);
        funcSetRndOptTable(EQUIP_REGION_ID_SHADOW_BODY, CShadowEquipController.EQPRGN_NAME_BODY);
        funcSetRndOptTable(EQUIP_REGION_ID_SHADOW_FOOT, CShadowEquipController.EQPRGN_NAME_FOOT);
        funcSetRndOptTable(EQUIP_REGION_ID_SHADOW_ACCESSORY_1, CShadowEquipController.EQPRGN_NAME_ACCESSORY_1);
        funcSetRndOptTable(EQUIP_REGION_ID_SHADOW_ACCESSORY_2, CShadowEquipController.EQPRGN_NAME_ACCESSORY_2);
    }

    // 超越段階
    set_n_A_Weapon_Transcendence(model.weapon.transcendence);
    set_n_A_Weapon2_Transcendence(model.weapon.weapon2Transcendence);
    set_n_A_HEAD_DEF_Transcendence(model.defTranscendence.head);
    set_n_A_SHIELD_DEF_Transcendence(model.defTranscendence.shield);
    set_n_A_BODY_DEF_Transcendence(model.defTranscendence.body);
    set_n_A_SHOULDER_DEF_Transcendence(model.defTranscendence.shoulder);
    set_n_A_SHOES_DEF_Transcendence(model.defTranscendence.shoes);

    //----------------------------------------------------------------
    // 攻撃手段を設定する（CAttackMethodAreaComponentManager 自身の内部状態。境界の外側）
    //----------------------------------------------------------------
    const attackMethodConf = CAttackMethodAreaComponentManager.GetAttackMethodConf();

    set_n_A_ActiveSkill(attackMethodConf.GetSkillId());
    set_n_A_ActiveSkillLV(attackMethodConf.GetSkillLv());

    const attackMethodConfArray = [attackMethodConf];

    set_n_A_WeaponLV(Math.floor(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WPNLV] % 10));

    // 従来の処理
    set_n_A_Weapon_ATK(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_POWER]);

    set_n_A_Weapon_ATKplus(model.weapon.atkPlus);
    set_n_A_WeaponLV_seirenATK(0);
    set_n_A_WeaponLV_Minplus(0);
    set_n_A_WeaponLV_Maxplus(0);
    if(n_A_WeaponLV == 1){
        set_n_A_WeaponLV_seirenATK(n_A_Weapon_ATKplus * 2);
        if(n_A_Weapon_ATKplus >= 8){
            set_n_A_WeaponLV_Minplus(1);
            set_n_A_WeaponLV_Maxplus(3 * (n_A_Weapon_ATKplus - 7));
        }
    }else if(n_A_WeaponLV == 2){
        set_n_A_WeaponLV_seirenATK(n_A_Weapon_ATKplus * 3);
        if(n_A_Weapon_ATKplus >= 7){
            set_n_A_WeaponLV_Minplus(1);
            set_n_A_WeaponLV_Maxplus(5 * (n_A_Weapon_ATKplus - 6));
        }
    }else if(n_A_WeaponLV == 3){
        set_n_A_WeaponLV_seirenATK(n_A_Weapon_ATKplus * 5);
        if(n_A_Weapon_ATKplus >= 6){
            set_n_A_WeaponLV_Minplus(1);
            set_n_A_WeaponLV_Maxplus(8 * (n_A_Weapon_ATKplus - 5));
        }
    }else if(n_A_WeaponLV == 4){
        set_n_A_WeaponLV_seirenATK(n_A_Weapon_ATKplus * 7);
        if(n_A_Weapon_ATKplus >= 5){
            set_n_A_WeaponLV_Minplus(1);
            set_n_A_WeaponLV_Maxplus(14 * (n_A_Weapon_ATKplus - 4));
        }
    }

    set_n_A_Weapon2_ATKplus(0);
    if (n_Nitou) {
        set_n_A_Weapon2LV(Math.floor(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]][ITEM_DATA_INDEX_WPNLV] % 10));

        set_n_A_Weapon2_ATK(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]][ITEM_DATA_INDEX_POWER]);

        set_n_A_Weapon2_ATKplus(model.weapon.weapon2AtkPlus);
        set_n_A_Weapon2LV_seirenATK(0);
        set_n_A_Weapon2LV_Minplus(0);
        set_n_A_Weapon2LV_Maxplus(0);
        if(n_A_Weapon2LV == 1){
            set_n_A_Weapon2LV_seirenATK(n_A_Weapon2_ATKplus * 2);
            if(n_A_Weapon2_ATKplus >= 8){
                set_n_A_Weapon2LV_Minplus(1);
                set_n_A_Weapon2LV_Maxplus(3 * (n_A_Weapon2_ATKplus - 7));
            }
        }else if(n_A_Weapon2LV == 2){
            set_n_A_Weapon2LV_seirenATK(n_A_Weapon2_ATKplus * 3);
            if(n_A_Weapon2_ATKplus >= 7){
                set_n_A_Weapon2LV_Minplus(1);
                set_n_A_Weapon2LV_Maxplus(5 * (n_A_Weapon2_ATKplus - 6));
            }
        }else if(n_A_Weapon2LV == 3){
            set_n_A_Weapon2LV_seirenATK(n_A_Weapon2_ATKplus * 5);
            if(n_A_Weapon2_ATKplus >= 6){
                set_n_A_Weapon2LV_Minplus(1);
                set_n_A_Weapon2LV_Maxplus(8 * (n_A_Weapon2_ATKplus - 5));
            }
        }else if(n_A_Weapon2LV == 4){
            set_n_A_Weapon2LV_seirenATK(n_A_Weapon2_ATKplus * 7);
            if(n_A_Weapon2_ATKplus >= 5){
                set_n_A_Weapon2LV_Minplus(1);
                set_n_A_Weapon2LV_Maxplus(14 * (n_A_Weapon2_ATKplus - 4));
            }
        }
    }

    //----------------------------------------------------------------
    // 装着カードを設定する
    //----------------------------------------------------------------
    for (let cardIdx = 0; cardIdx < CARD_REGION_ID_COUNT; cardIdx++) {
        n_A_card[cardIdx] = model.card[cardIdx] ?? 0;
    }

    //----------------------------------------------------------------
    // 装着衣装を設定する
    //----------------------------------------------------------------
    for (let costumeIdx = 0; costumeIdx < COSTUME_REGION_ID_COUNT; costumeIdx++) {
        n_A_costume[costumeIdx] = model.costume[costumeIdx] ?? 0;
    }

    const passiveSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetPassiveSkillIdArray();

    if(n_Skill1SW){
        for(let i = 0; i < passiveSkillIdArray.length; i++){
            if (model.passiveSkill[i] !== null) {
                n_A_PassSkill[i] = model.passiveSkill[i];
            }
        }
    }

    if(n_Skill4SW){
        n_A_PassSkill4[0] = model.buff4[0];
        n_A_PassSkill4[1] = model.buff4[1];
        n_A_PassSkill4[2] = model.buff4[2];
        n_A_PassSkill4[3] = model.buff4[3];
        n_A_PassSkill4[4] = model.buff4[4];
        n_A_PassSkill4[5] = model.buff4[5];
        n_A_PassSkill4[6] = model.buff4[6];
        n_A_PassSkill4[7] = model.buff4[7];
        n_A_PassSkill4[8] = model.buff4[8];
        n_A_PassSkill4[9] = model.buff4[9];
        n_A_PassSkill4[10] = model.buff4[10];
        n_A_PassSkill4[11] = model.buff4[11];
        n_A_PassSkill4[30] = model.buff4[30];
        n_A_PassSkill4[31] = model.buff4[31];
        n_A_PassSkill4[32] = model.buff4[32];
        n_A_PassSkill4[33] = model.buff4[33];
        n_A_PassSkill4[34] = model.buff4[34];
        n_A_PassSkill4[35] = model.buff4[35];
    }

    // オートスペル設定の反映
    for (let idx = 0; idx < AUTO_SPELL_SETTING_COUNT; idx++) {
        if (model.autoSpell[OBJID_OFFSET_AS_SKILL_ID + idx] !== null) {
            n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_ID + idx] = model.autoSpell[OBJID_OFFSET_AS_SKILL_ID + idx];
        }
        if (model.autoSpell[OBJID_OFFSET_AS_SKILL_LV + idx] !== null) {
            n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_LV + idx] = model.autoSpell[OBJID_OFFSET_AS_SKILL_LV + idx];
        }
        if (model.autoSpell[OBJID_OFFSET_AS_SKILL_PROB + idx] !== null) {
            n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_PROB + idx] = model.autoSpell[OBJID_OFFSET_AS_SKILL_PROB + idx];
        }
    }

    // アイテム(食品/他) の反映
    if(n_Skill7SW){
        for (let i = 0; i <= 52; i++) {
            n_A_PassSkill7[i] = model.buff7[i];
        }
    }
    n_A_PassSkill8[14] = 0;
    if(n_Skill8SW){
        n_A_PassSkill8[0] = model.buff8[0];
        n_A_PassSkill8[1] = model.buff8[1];
        n_A_PassSkill8[2] = model.buff8[2];
        n_A_PassSkill8[3] = model.buff8[3];
        n_A_PassSkill8[4] = model.buff8[4];
        n_A_PassSkill8[5] = model.buff8[5];
        n_A_PassSkill8[6] = model.buff8[6];
        n_A_PassSkill8[7] = model.buff8[7];
        n_A_PassSkill8[12] = model.buff8[12];
        n_A_PassSkill8[13] = model.buff8[13];
        n_A_PassSkill8[15] = model.buff8[15];
        n_A_PassSkill8[16] = model.buff8[16];
        n_A_PassSkill8[17] = model.buff8[17];
        n_A_PassSkill8[19] = model.buff8[19];
        n_A_PassSkill8[21] = model.buff8[21];
        n_A_PassSkill8[22] = model.buff8[22];
    }

    // 一次〜四次職支援・デバフ設定欄（syncConfArrayの説明参照）
    set_g_confDataIchizi(syncConfArray(g_confDataIchizi, model.confIchizi));
    set_g_confDataNizi(syncConfArray(g_confDataNizi, model.confNizi));
    set_g_confDataSanzi(syncConfArray(g_confDataSanzi, model.confSanzi));
    set_g_confDataYozi(syncConfArray(g_confDataYozi, model.confYozi));
    set_g_confDataDebuff(syncConfArray(g_confDataDebuff, model.confDebuff));

    // 性能カスタマイズ欄。配列を同期してからUIコンポーネントを確保する順序が重要
    // （ensureConfWrapperの説明参照。新規生成時にその時点の配列を束縛するため）。
    set_g_confDataCustomStatus(syncConfArray(g_confDataCustomStatus, model.confCustomStatus));
    set_g_objCharaConfCustomStatus(ensureConfWrapper(g_objCharaConfCustomStatus, () => new CCharaConfCustomStatus(g_confDataCustomStatus)));

    set_g_confDataCustomAtk(syncConfArray(g_confDataCustomAtk, model.confCustomAtk));
    set_g_objCharaConfCustomAtk(ensureConfWrapper(g_objCharaConfCustomAtk, () => new CCharaConfCustomAtk(g_confDataCustomAtk)));

    set_g_confDataCustomDef(syncConfArray(g_confDataCustomDef, model.confCustomDef));
    set_g_objCharaConfCustomDef(ensureConfWrapper(g_objCharaConfCustomDef, () => new CCharaConfCustomDef(g_confDataCustomDef)));

    set_g_confDataCustomSkill(syncConfArray(g_confDataCustomSkill, model.confCustomSkill));
    set_g_objCharaConfCustomSkill(ensureConfWrapper(g_objCharaConfCustomSkill, () => new CCharaConfCustomSkill(g_confDataCustomSkill)));

    set_g_confDataCustomSpecStatus(syncConfArray(g_confDataCustomSpecStatus, model.confCustomSpecStatus));
    set_g_objCharaConfCustomSpecStatus(ensureConfWrapper(g_objCharaConfCustomSpecStatus, () => new CCharaConfCustomSpecStatus(g_confDataCustomSpecStatus)));

    // 特性ステータス（素点・ボーナス分）。既定値が null ではなく [] なので
    // syncConfArray は使わず配列の中身を直接書き換える（setter が無いため。
    // 束縛の再代入ではないのでESMのimport制約に抵触しない）。
    g_pureStatus.length = 0;
    for (const v of model.pureStatus) g_pureStatus.push(v);
    g_bonusStatus.length = 0;
    for (const v of model.bonusStatus) g_bonusStatus.push(v);

    // 時限効果欄。同じく setter が無いため配列の中身を直接書き換える。
    g_timeItemConf.length = 0;
    for (const v of model.timeItemConf) g_timeItemConf.push(v);
    g_timeItemConfEffective.length = 0;
    for (const v of model.timeItemConfEffective) g_timeItemConfEffective.push(v);

    // モンスター設定欄（対プレイヤー特性・異常・強化）。同じく setter が無い。
    n_B_TAISEI.length = 0;
    for (const v of model.mobConfTaisei) n_B_TAISEI.push(v);
    n_B_IJYOU.length = 0;
    for (const v of model.mobConfIjyou) n_B_IJYOU.push(v);
    n_B_KYOUKA.length = 0;
    for (const v of model.mobConfKyouka) n_B_KYOUKA.push(v);

    return { attackMethodConfArray };
}

/**
 * StAllCalc の DOM 走査プロローグ本体（後方互換ラッパー）。
 * `ExtractModelFromDom()` → `HydrateFromModel()` を素通しで呼ぶだけ。
 * `ID_A_HUYO_NAME` のラベル書き換えのみ、モデルに属さない純粋な表示側の副作用のため
 * ここに残す（HydrateFromModel はDOMを一切書かない）。
 * StAllCalcCore() 側でも必要な n_A_SpeedPOT と attackMethodConfArray のみ戻り値として返す。
 */
export function HydrateFromDom() {
    const model = ExtractModelFromDom();
    const { attackMethodConfArray } = HydrateFromModel(model);

    if(n_Skill8SW){
        if(41 <= n_A_JOB && n_A_JOB <= 43){
            if(n_A_PassSkill8[19] == 0) document.getElementById("ID_A_HUYO_NAME").textContent = "暖かい風";
            else document.getElementById("ID_A_HUYO_NAME").textContent = "武器属性付与";
        }
    }

    return { n_A_SpeedPOT: model.status.speedPot, attackMethodConfArray };
}
