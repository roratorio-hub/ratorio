/**
 * StAllCalc の DOM 走査プロローグ（リファクタリング計画 Phase 5）。
 *
 * foot.js の StAllCalc は「DOM からグローバル状態へ書き込む」処理と「純粋な計算」処理が
 * 同一関数内に混在していた。本ファイルは前者（hydration）を HydrateFromDom() として
 * 切り出したもの（UpdateEquipItemDataByHtml 等の DOM 読み取りヘルパー3関数も、
 * hydration の一部であり StAllCalc 以外からは呼ばれていないため同時に移動した）。
 *
 * 本文はバイト単位で不変（関数シグネチャ・新規のローカル変数宣言・末尾の return のみ新規）。
 * ただし分割にあたり、書き込まれるが一度も読まれないことを機械的に確認済みの
 * デッドコード（SU_POW/SU_STA/SU_WIS/SU_SPL/SU_CON/SU_CRT・n_A_POW・n_A_CON への代入、
 * および sandanDelay/vartmp/valary/sklLv/bufLv・itemCount系5個・cardCount系12個の
 * 未使用ローカル変数宣言）は分割を機に削除した（ユーザー承認済み）。
 * n_A_SpeedPOT と attackMethodConfArray は StAllCalcCore() 側でも読まれるため、
 * 戻り値として返す。
 */
// === AUTO-GENERATED IMPORTS ===
import { InitJobInfo } from './foot-bridge.js';
// === END AUTO-GENERATED IMPORTS ===
import { n_A_PassSkill4, n_Skill4SW } from '../../../ro4/m/js/BuffGuildAndGospel.js';
import { n_A_PassSkill7, n_Skill7SW } from '../../../ro4/m/js/BuffItemAndFood.js';
import { n_A_PassSkill, n_Skill1SW } from '../../../ro4/m/js/BuffJobSpecificSelf.js';
import { n_A_PassSkill8, n_Skill8SW } from '../../../ro4/m/js/BuffOtherCategory.js';
import { CAttackMethodAreaComponentManager } from '../../../ro4/m/js/CAttackMethodAreaComponentManager.js';
import { CShadowEquipController, g_shadowEquipController } from '../../../ro4/m/js/CShadowEquipController.js';
import {
    AUTO_SPELL_SETTING_COUNT, OBJID_OFFSET_AS_SKILL_ID, OBJID_OFFSET_AS_SKILL_LV, OBJID_OFFSET_AS_SKILL_PROB
} from '../../../ro4/m/js/calcautospell.js';
import { g_constDataManager, n_Nitou } from '../../../ro4/m/js/global.js';
import { GetTotalSpecStatus } from '../../../ro4/m/js/hmjob.js';
import {
    set_n_A_ActiveSkill, set_n_A_ActiveSkillLV, set_n_A_Arrow, set_n_A_BaseLV
} from '../../../ro4/m/js/ro4-state.js';
import { GetStatefullData, HtmlGetObjectValueById, HtmlGetObjectValueByIdAsInteger } from '../../common/js/util.js';
import { ARROW_ID_NONE } from './arrow.dat.js';
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
} from './common.js';
import { CONST_DATA_KIND_JOB } from './const/EnumConstDataKind.js';
import {
    EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ACCESSORY_2, EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT,
    EQUIP_REGION_ID_BODY, EQUIP_REGION_ID_COSTUME_HEAD_UNDER, EQUIP_REGION_ID_HEAD_MID, EQUIP_REGION_ID_HEAD_TOP,
    EQUIP_REGION_ID_HEAD_UNDER, EQUIP_REGION_ID_SHADOW_ACCESSORY_1, EQUIP_REGION_ID_SHADOW_ACCESSORY_2,
    EQUIP_REGION_ID_SHADOW_ARMS_LEFT, EQUIP_REGION_ID_SHADOW_ARMS_RIGHT, EQUIP_REGION_ID_SHADOW_BODY,
    EQUIP_REGION_ID_SHADOW_FOOT, EQUIP_REGION_ID_SHIELD, EQUIP_REGION_ID_SHOES, EQUIP_REGION_ID_SHOULDER
} from './const/EnumEquipRegionId.js';
import { ITEM_DATA_INDEX_POWER, ITEM_DATA_INDEX_WPNLV } from './const/EnumItemDataIndex.js';
import {
    EQUIP_REGION_ID_COUNT, MIG_PARAM_ID_SPL, MIG_PARAM_ID_STA, MIG_PARAM_ID_WIS, MIG_PARAM_ID_CRT
} from './const/EnumMigItemParamId.js';
import { ItemObjNew } from './item.dat.js';
import { SetEquipRndOptTable } from './rndopttype.h.js';
import {
    g_itemIdArray, g_refinedArray, n_A_AGI, n_A_DEX, n_A_Equip, n_A_INT, n_A_JOB, n_A_LUK, n_A_PassSkill5, n_A_STR,
    n_A_VIT, n_A_Weapon2LV, n_A_Weapon2_ATKplus, n_A_WeaponLV, n_A_Weapon_ATKplus, n_A_card, n_A_costume, set_SU_AGI,
    set_SU_DEX, set_SU_INT, set_SU_LUK, set_SU_STR, set_SU_VIT, set_g_itemIdArray, set_g_refinedArray, set_n_A_AGI,
    set_n_A_BODY_DEF_PLUS, set_n_A_BODY_DEF_Transcendence, set_n_A_CRT, set_n_A_DEX, set_n_A_HEAD_DEF_PLUS,
    set_n_A_HEAD_DEF_Transcendence, set_n_A_INT, set_n_A_JobLV, set_n_A_LUK, set_n_A_SHIELD_DEF_PLUS,
    set_n_A_SHIELD_DEF_Transcendence, set_n_A_SHOES_DEF_PLUS, set_n_A_SHOES_DEF_Transcendence,
    set_n_A_SHOULDER_DEF_PLUS, set_n_A_SHOULDER_DEF_Transcendence, set_n_A_SPL, set_n_A_STA, set_n_A_STR,
    set_n_A_VIT, set_n_A_WIS, set_n_A_Weapon2LV, set_n_A_Weapon2LV_Maxplus, set_n_A_Weapon2LV_Minplus,
    set_n_A_Weapon2LV_seirenATK, set_n_A_Weapon2_ATK, set_n_A_Weapon2_ATKplus, set_n_A_Weapon2_Transcendence,
    set_n_A_WeaponLV, set_n_A_WeaponLV_Maxplus, set_n_A_WeaponLV_Minplus, set_n_A_WeaponLV_seirenATK,
    set_n_A_WeaponType, set_n_A_WeaponZokusei, set_n_A_Weapon_ATK, set_n_A_Weapon_ATKplus,
    set_n_A_Weapon_Transcendence
} from './roro-state.js';

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
 * HTMLから装備アイテムの状態を読み取ってグローバル変数を更新する
 */
export function UpdateEquipItemDataByHtml() {

	var charaDataManager = null;

	// ＨＴＭＬの入力値を元に、変数を更新する
	var calcForm = document.calcForm;

	set_n_A_WeaponType(legacyNum(calcForm.A_WeaponType.value));
	set_n_A_WeaponZokusei(legacyNum(calcForm.A_Weapon_zokusei.value));
	set_n_A_Arrow(parseInt(HtmlGetObjectValueById("OBJID_SELECT_ARROW", ARROW_ID_NONE)));

	// 装備部位配列初期化
	for (var idx = 0; idx < EQUIP_REGION_ID_COUNT; idx++) {
		n_A_Equip[idx] = 0;
	}

	n_A_Equip[EQUIP_REGION_ID_ARMS] = HtmlGetObjectValueByIdAsInteger("OBJID_ARMS_RIGHT", 0);
	if (n_Nitou) {
		n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT] = HtmlGetObjectValueByIdAsInteger("OBJID_ARMS_LEFT", 0);
	}

	n_A_Equip[EQUIP_REGION_ID_HEAD_TOP]		 = HtmlGetObjectValueByIdAsInteger("OBJID_HEAD_TOP", 0);
	n_A_Equip[EQUIP_REGION_ID_HEAD_MID]		 = HtmlGetObjectValueByIdAsInteger("OBJID_HEAD_MID", 0);
	n_A_Equip[EQUIP_REGION_ID_HEAD_UNDER]	 = HtmlGetObjectValueByIdAsInteger("OBJID_HEAD_UNDER", 0);
	n_A_Equip[EQUIP_REGION_ID_SHIELD]		 = HtmlGetObjectValueByIdAsInteger("OBJID_SHIELD", 0);
	n_A_Equip[EQUIP_REGION_ID_BODY]			 = HtmlGetObjectValueByIdAsInteger("OBJID_BODY", 0);
	n_A_Equip[EQUIP_REGION_ID_SHOULDER]		 = HtmlGetObjectValueByIdAsInteger("OBJID_SHOULDER", 0);
	n_A_Equip[EQUIP_REGION_ID_SHOES]		 = HtmlGetObjectValueByIdAsInteger("OBJID_SHOES", 0);
	n_A_Equip[EQUIP_REGION_ID_ACCESSORY_1]	 = HtmlGetObjectValueByIdAsInteger("OBJID_ACCESSORY_1", 0);
	n_A_Equip[EQUIP_REGION_ID_ACCESSORY_2]	 = HtmlGetObjectValueByIdAsInteger("OBJID_ACCESSORY_2", 0);
	n_A_Equip[EQUIP_REGION_ID_COSTUME_HEAD_UNDER] = HtmlGetObjectValueByIdAsInteger("A_isyou3", 0);

	// 各種精錬値
	set_n_A_HEAD_DEF_PLUS(legacyNum(calcForm.A_HEAD_DEF_PLUS.value));
	set_n_A_BODY_DEF_PLUS(legacyNum(calcForm.A_BODY_DEF_PLUS.value));
	set_n_A_SHIELD_DEF_PLUS(legacyNum(calcForm.A_SHIELD_DEF_PLUS.value));
	set_n_A_SHOULDER_DEF_PLUS(legacyNum(calcForm.A_SHOULDER_DEF_PLUS.value));
	set_n_A_SHOES_DEF_PLUS(legacyNum(calcForm.A_SHOES_DEF_PLUS.value));


	// シャドウ装備データ
	set_g_itemIdArray([]);
	set_g_refinedArray([]);
	// ルート要素の取得
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


}

/**
 * 装備しているカード・エンチャントの情報をグローバル変数に格納する.
 */
export function UpdateEquipCardDataByHtml() {
	var idxSlot = 0;
	var itemId = 0;
	var wpnLv = 0;

	// 装着カード配列の初期化
	for (var cardIdx = 0; cardIdx < CARD_REGION_ID_COUNT; cardIdx++) {
		n_A_card[cardIdx] = 0;
	}

	// 右手武器
	n_A_card[CARD_REGION_ID_ARMS_RIGHT_1] = GetStatefullData("DATA_OBJID_ARMS_RIGHT_CARD_1", 0);
	n_A_card[CARD_REGION_ID_ARMS_RIGHT_2] = GetStatefullData("DATA_OBJID_ARMS_RIGHT_CARD_2", 0);
	n_A_card[CARD_REGION_ID_ARMS_RIGHT_3] = GetStatefullData("DATA_OBJID_ARMS_RIGHT_CARD_3", 0);
	n_A_card[CARD_REGION_ID_ARMS_RIGHT_4] = GetStatefullData("DATA_OBJID_ARMS_RIGHT_CARD_4", 0);

	// 左手武器
	if (n_Nitou) {
		n_A_card[CARD_REGION_ID_ARMS_LEFT_1] = GetStatefullData("DATA_OBJID_ARMS_LEFT_CARD_1", 0);
		n_A_card[CARD_REGION_ID_ARMS_LEFT_2] = GetStatefullData("DATA_OBJID_ARMS_LEFT_CARD_2", 0);
		n_A_card[CARD_REGION_ID_ARMS_LEFT_3] = GetStatefullData("DATA_OBJID_ARMS_LEFT_CARD_3", 0);
		n_A_card[CARD_REGION_ID_ARMS_LEFT_4] = GetStatefullData("DATA_OBJID_ARMS_LEFT_CARD_4", 0);
	}

	// 各装着部位
	n_A_card[CARD_REGION_ID_HEAD_TOP]	 = GetStatefullData("DATA_OBJID_HEAD_TOP_CARD_1", 0);
	n_A_card[CARD_REGION_ID_HEAD_MID]	 = GetStatefullData("DATA_OBJID_HEAD_MID_CARD_1", 0);
	n_A_card[CARD_REGION_ID_HEAD_UNDER]	 = GetStatefullData("DATA_OBJID_HEAD_UNDER_CARD_1", 0);
	n_A_card[CARD_REGION_ID_SHIELD]		 = GetStatefullData("DATA_OBJID_SHIELD_CARD_1", 0);
	n_A_card[CARD_REGION_ID_BODY]		 = GetStatefullData("DATA_OBJID_BODY_CARD_1", 0);
	n_A_card[CARD_REGION_ID_SHOULDER]	 = GetStatefullData("DATA_OBJID_SHOULDER_CARD_1", 0);
	n_A_card[CARD_REGION_ID_SHOES]		 = GetStatefullData("DATA_OBJID_SHOES_CARD_1", 0);
	n_A_card[CARD_REGION_ID_ACCESSORY_1] = GetStatefullData("DATA_OBJID_ACCESSORY_1_CARD_1", 0);
	n_A_card[CARD_REGION_ID_ACCESSORY_2] = GetStatefullData("DATA_OBJID_ACCESSORY_2_CARD_1", 0);

	// 頭上段エンチャント
	n_A_card[CARD_REGION_ID_ENCHANT_HEAD_TOP_1] = GetStatefullData("DATA_OBJID_HEAD_TOP_CARD_2", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_HEAD_TOP_2] = GetStatefullData("DATA_OBJID_HEAD_TOP_CARD_3", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_HEAD_TOP_3] = GetStatefullData("DATA_OBJID_HEAD_TOP_CARD_4", 0);

	// 頭中段エンチャント
	n_A_card[CARD_REGION_ID_ENCHANT_HEAD_MID_1] = GetStatefullData("DATA_OBJID_HEAD_MID_CARD_2", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_HEAD_MID_2] = GetStatefullData("DATA_OBJID_HEAD_MID_CARD_3", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_HEAD_MID_3] = GetStatefullData("DATA_OBJID_HEAD_MID_CARD_4", 0);

	// 頭下段エンチャント
	n_A_card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_1] = GetStatefullData("DATA_OBJID_HEAD_UNDER_CARD_2", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_2] = GetStatefullData("DATA_OBJID_HEAD_UNDER_CARD_3", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_3] = GetStatefullData("DATA_OBJID_HEAD_UNDER_CARD_4", 0);

	// 盾エンチャント
	n_A_card[CARD_REGION_ID_ENCHANT_SHIELD_1] = GetStatefullData("DATA_OBJID_SHIELD_CARD_2", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_SHIELD_2] = GetStatefullData("DATA_OBJID_SHIELD_CARD_3", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_SHIELD_3] = GetStatefullData("DATA_OBJID_SHIELD_CARD_4", 0);

	// 鎧エンチャント
	n_A_card[CARD_REGION_ID_ENCHANT_BODY_1] = GetStatefullData("DATA_OBJID_BODY_CARD_2", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_BODY_2] = GetStatefullData("DATA_OBJID_BODY_CARD_3", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_BODY_3] = GetStatefullData("DATA_OBJID_BODY_CARD_4", 0);

	// 肩エンチャント
	n_A_card[CARD_REGION_ID_ENCHANT_SHOULDER_1] = GetStatefullData("DATA_OBJID_SHOULDER_CARD_2", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_SHOULDER_2] = GetStatefullData("DATA_OBJID_SHOULDER_CARD_3", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_SHOULDER_3] = GetStatefullData("DATA_OBJID_SHOULDER_CARD_4", 0);

	// 靴エンチャント
	n_A_card[CARD_REGION_ID_ENCHANT_SHOES_1] = GetStatefullData("DATA_OBJID_SHOES_CARD_2", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_SHOES_2] = GetStatefullData("DATA_OBJID_SHOES_CARD_3", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_SHOES_3] = GetStatefullData("DATA_OBJID_SHOES_CARD_4", 0);

	// アクセ１エンチャント
	n_A_card[CARD_REGION_ID_ENCHANT_ACCESSORY_1_1] = GetStatefullData("DATA_OBJID_ACCESSORY_1_CARD_2", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_ACCESSORY_1_2] = GetStatefullData("DATA_OBJID_ACCESSORY_1_CARD_3", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_ACCESSORY_1_3] = GetStatefullData("DATA_OBJID_ACCESSORY_1_CARD_4", 0);

	// アクセ２エンチャント
	n_A_card[CARD_REGION_ID_ENCHANT_ACCESSORY_2_1] = GetStatefullData("DATA_OBJID_ACCESSORY_2_CARD_2", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_ACCESSORY_2_2] = GetStatefullData("DATA_OBJID_ACCESSORY_2_CARD_3", 0);
	n_A_card[CARD_REGION_ID_ENCHANT_ACCESSORY_2_3] = GetStatefullData("DATA_OBJID_ACCESSORY_2_CARD_4", 0);

	// シャドウ装備エンチャント
	n_A_card[CARD_REGION_ID_SHADOW_ARMS_RIGHT_1] = GetStatefullData("DATA_OBJID_SHADOW_ARMS_RIGHT_CARD_2", 0);
	n_A_card[CARD_REGION_ID_SHADOW_ARMS_RIGHT_2] = GetStatefullData("DATA_OBJID_SHADOW_ARMS_RIGHT_CARD_3", 0);
	n_A_card[CARD_REGION_ID_SHADOW_ARMS_RIGHT_3] = GetStatefullData("DATA_OBJID_SHADOW_ARMS_RIGHT_CARD_4", 0);
	n_A_card[CARD_REGION_ID_SHADOW_SHIELD_1] = GetStatefullData("DATA_OBJID_SHADOW_SHIELD_CARD_2", 0);
	n_A_card[CARD_REGION_ID_SHADOW_SHIELD_2] = GetStatefullData("DATA_OBJID_SHADOW_SHIELD_CARD_3", 0);
	n_A_card[CARD_REGION_ID_SHADOW_SHIELD_3] = GetStatefullData("DATA_OBJID_SHADOW_SHIELD_CARD_4", 0);
	n_A_card[CARD_REGION_ID_SHADOW_ENCHANT_BODY_1] = GetStatefullData("DATA_OBJID_SHADOW_BODY_CARD_2", 0);
	n_A_card[CARD_REGION_ID_SHADOW_ENCHANT_BODY_2] = GetStatefullData("DATA_OBJID_SHADOW_BODY_CARD_3", 0);
	n_A_card[CARD_REGION_ID_SHADOW_ENCHANT_BODY_3] = GetStatefullData("DATA_OBJID_SHADOW_BODY_CARD_4", 0);
	n_A_card[CARD_REGION_ID_SHADOW_ENCHANT_SHOES_1] = GetStatefullData("DATA_OBJID_SHADOW_SHOES_CARD_2", 0);
	n_A_card[CARD_REGION_ID_SHADOW_ENCHANT_SHOES_2] = GetStatefullData("DATA_OBJID_SHADOW_SHOES_CARD_3", 0);
	n_A_card[CARD_REGION_ID_SHADOW_ENCHANT_SHOES_3] = GetStatefullData("DATA_OBJID_SHADOW_SHOES_CARD_4", 0);
	n_A_card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_1] = GetStatefullData("DATA_OBJID_SHADOW_ACCESSORY-1_CARD_2", 0);
	n_A_card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_2] = GetStatefullData("DATA_OBJID_SHADOW_ACCESSORY-1_CARD_3", 0);
	n_A_card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_3] = GetStatefullData("DATA_OBJID_SHADOW_ACCESSORY-1_CARD_4", 0);
	n_A_card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_1] = GetStatefullData("DATA_OBJID_SHADOW_ACCESSORY-2_CARD_2", 0);
	n_A_card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_2] = GetStatefullData("DATA_OBJID_SHADOW_ACCESSORY-2_CARD_3", 0);
	n_A_card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_3] = GetStatefullData("DATA_OBJID_SHADOW_ACCESSORY-2_CARD_4", 0);

}

export function UpdateEquipCostumeDataByHtml() {

	var itemId = 0;
	var wpnLv = 0;


	// 装着カード配列の初期化
	for (var costumeIdx = 0; costumeIdx < COSTUME_REGION_ID_COUNT; costumeIdx++) {
		n_A_costume[costumeIdx] = 0;
	}

	// 各装着部位
	n_A_costume[COSTUME_REGION_ID_HEAD_UNDER]	 = GetStatefullData("DATA_OBJID_HEAD_UNDER_COSTUME", 0);
}

/**
 * StAllCalc の DOM 走査プロローグ本体。DOM（document.calcForm・GetStatefullData 経由の
 * 隠しdiv等）を読み、その結果をモジュールグローバル（roro-state.js / ro4-state.js 等の
 * export let）へ書き込む。StAllCalcCore() 側でも必要な n_A_SpeedPOT と
 * attackMethodConfArray のみ戻り値として返す。
 */
export function HydrateFromDom() {
    let attackMethodConf = null;
    let attackMethodConfArray = null;
    let n_A_SpeedPOT = 0;

    const calcForm = document.calcForm;

		InitJobInfo();

		//----------------------------------------------------------------
		// 基本パラメタを取得する
		//----------------------------------------------------------------

		set_n_A_BaseLV(legacyNum(calcForm.A_BaseLV.value));
		set_n_A_JobLV(legacyNum(calcForm.A_JobLV.value));

		set_n_A_STR(legacyNum(calcForm.A_STR.value));
		set_n_A_AGI(legacyNum(calcForm.A_AGI.value));
		set_n_A_VIT(legacyNum(calcForm.A_VIT.value));
		set_n_A_DEX(legacyNum(calcForm.A_DEX.value));
		set_n_A_INT(legacyNum(calcForm.A_INT.value));
		set_n_A_LUK(legacyNum(calcForm.A_LUK.value));

		set_SU_STR(n_A_STR);
		set_SU_AGI(n_A_AGI);
		set_SU_VIT(n_A_VIT);
		set_SU_DEX(n_A_DEX);
		set_SU_INT(n_A_INT);
		set_SU_LUK(n_A_LUK);


		n_A_SpeedPOT = legacyNum(calcForm.A_SpeedPOT.value);


		//----------------------------------------------------------------
		// 特性パラメタを取得する
		//----------------------------------------------------------------

		// 合計値
		set_n_A_STA(GetTotalSpecStatus(MIG_PARAM_ID_STA));
		set_n_A_WIS(GetTotalSpecStatus(MIG_PARAM_ID_WIS));
		set_n_A_SPL(GetTotalSpecStatus(MIG_PARAM_ID_SPL));
		set_n_A_CRT(GetTotalSpecStatus(MIG_PARAM_ID_CRT));

		//----------------------------------------------------------------
		// 装備を取得する
		//----------------------------------------------------------------

		UpdateEquipItemDataByHtml();

		// 超越段階
		set_n_A_Weapon_Transcendence(legacyNum(calcForm.A_Weapon_Transcendence.value));
		set_n_A_Weapon2_Transcendence(legacyNum(calcForm.A_Weapon2_Transcendence.value));
		set_n_A_HEAD_DEF_Transcendence(legacyNum(calcForm.A_HEAD_DEF_Transcendence.value));
		set_n_A_SHIELD_DEF_Transcendence(legacyNum(calcForm.A_SHIELD_DEF_Transcendence.value));
		set_n_A_BODY_DEF_Transcendence(legacyNum(calcForm.A_BODY_DEF_Transcendence.value));
		set_n_A_SHOULDER_DEF_Transcendence(legacyNum(calcForm.A_SHOULDER_DEF_Transcendence.value));
		set_n_A_SHOES_DEF_Transcendence(legacyNum(calcForm.A_SHOES_DEF_Transcendence.value));

		//----------------------------------------------------------------
		// 攻撃手段を取得する
		//----------------------------------------------------------------
		attackMethodConf = CAttackMethodAreaComponentManager.GetAttackMethodConf();

		set_n_A_ActiveSkill(attackMethodConf.GetSkillId());
		set_n_A_ActiveSkillLV(attackMethodConf.GetSkillLv());

		attackMethodConfArray = [attackMethodConf];

		set_n_A_WeaponLV(Math.floor(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_WPNLV] % 10));

		// 従来の処理
		set_n_A_Weapon_ATK(ItemObjNew[n_A_Equip[EQUIP_REGION_ID_ARMS]][ITEM_DATA_INDEX_POWER]);
		
		set_n_A_Weapon_ATKplus(legacyNum(calcForm.A_Weapon_ATKplus.value));
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

			set_n_A_Weapon2_ATKplus(legacyNum(document.calcForm.A_Weapon2_ATKplus.value));
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
		// 装着カードを取得する
		//----------------------------------------------------------------

		UpdateEquipCardDataByHtml();


		//----------------------------------------------------------------
		// 装着衣装を取得する
		//----------------------------------------------------------------

		UpdateEquipCostumeDataByHtml();


		var passiveSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetPassiveSkillIdArray();

		if(n_Skill1SW){
			for(let i = 0; i < passiveSkillIdArray.length; i++){
				let wOBJ = document.getElementById("A_skill"+i);
				if (wOBJ !== null) {
					n_A_PassSkill[i] = legacyNum(wOBJ.value);
				}
			}
		}

		if(n_Skill4SW){
			n_A_PassSkill4[0] = calcForm.A4_Skill0.checked;
			n_A_PassSkill4[1] = legacyNum(calcForm.A4_Skill1.value);
			n_A_PassSkill4[2] = legacyNum(calcForm.A4_Skill2.value);
			n_A_PassSkill4[3] = legacyNum(calcForm.A4_Skill3.value);
			n_A_PassSkill4[4] = legacyNum(calcForm.A4_Skill4.value);
			n_A_PassSkill4[5] = calcForm.A4_Skill5.checked;
			n_A_PassSkill4[6] = calcForm.A4_Skill6.checked;
			n_A_PassSkill4[7] = calcForm.A4_Skill7.checked;
			n_A_PassSkill4[8] = calcForm.A4_Skill8.checked;
			n_A_PassSkill4[9] = calcForm.A4_Skill9.checked;
			n_A_PassSkill4[10] = calcForm.A4_Skill10.checked;
			n_A_PassSkill4[11] = legacyNum(calcForm.A4_Skill11.value);
			n_A_PassSkill4[30] = legacyNum(calcForm.A4_Skill30.value);
			n_A_PassSkill4[31] = legacyNum(calcForm.A4_Skill31.value);
			n_A_PassSkill4[32] = legacyNum(calcForm.A4_Skill32.value);
			n_A_PassSkill4[33] = legacyNum(calcForm.A4_Skill33.value);
			n_A_PassSkill4[34] = legacyNum(calcForm.A4_Skill34.value);
			n_A_PassSkill4[35] = legacyNum(calcForm.A4_Skill35.value);
		}

		// オートスペル設定の取得
		var objSelect = null;
		for (var idx = 0; idx < AUTO_SPELL_SETTING_COUNT; idx++) {
			objSelect = document.getElementById("OBJID_AS_SKILL_ID_" + (OBJID_OFFSET_AS_SKILL_ID + idx));
			if (objSelect) {
				n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_ID + idx] = legacyNum(objSelect.value);
			}

			objSelect = document.getElementById("OBJID_AS_SKILL_LV_" + (OBJID_OFFSET_AS_SKILL_LV + idx));
			if (objSelect) {
				n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_LV + idx] = legacyNum(objSelect.value);
			}

			objSelect = document.getElementById("OBJID_AS_SKILL_PROB_" + (OBJID_OFFSET_AS_SKILL_PROB + idx));
			if (objSelect) {
				n_A_PassSkill5[OBJID_OFFSET_AS_SKILL_PROB + idx] = legacyNum(objSelect.value);
			}
		}

		// アイテム(食品/他) の取得
		if(n_Skill7SW){
			n_A_PassSkill7[0] = calcForm.A7_Skill0.checked;
			n_A_PassSkill7[1] = calcForm.A7_Skill1.checked;
			n_A_PassSkill7[2] = calcForm.A7_Skill2.checked;
			n_A_PassSkill7[3] = legacyNum(calcForm.A7_Skill3.value);
			n_A_PassSkill7[4] = legacyNum(calcForm.A7_Skill4.value);
			n_A_PassSkill7[5] = legacyNum(calcForm.A7_Skill5.value);
			n_A_PassSkill7[6] = legacyNum(calcForm.A7_Skill6.value);
			n_A_PassSkill7[7] = legacyNum(calcForm.A7_Skill7.value);
			n_A_PassSkill7[8] = legacyNum(calcForm.A7_Skill8.value);
			n_A_PassSkill7[9] = calcForm.A7_Skill9.checked;
			n_A_PassSkill7[10] = calcForm.A7_Skill10.checked;
			n_A_PassSkill7[11] = calcForm.A7_Skill11.checked;
			n_A_PassSkill7[12] = calcForm.A7_Skill12.checked;
			n_A_PassSkill7[13] = calcForm.A7_Skill13.checked;
			n_A_PassSkill7[14] = calcForm.A7_Skill14.checked;
			n_A_PassSkill7[15] = calcForm.A7_Skill15.checked;
			n_A_PassSkill7[16] = calcForm.A7_Skill16.checked;
			n_A_PassSkill7[17] = calcForm.A7_Skill17.checked;
			n_A_PassSkill7[18] = calcForm.A7_Skill18.checked;
			n_A_PassSkill7[19] = calcForm.A7_Skill19.checked;
			n_A_PassSkill7[20] = calcForm.A7_Skill20.checked;
			n_A_PassSkill7[21] = calcForm.A7_Skill21.checked;
			n_A_PassSkill7[22] = calcForm.A7_Skill22.checked;
			n_A_PassSkill7[23] = calcForm.A7_Skill23.checked;
			n_A_PassSkill7[24] = calcForm.A7_Skill24.checked;
			n_A_PassSkill7[25] = calcForm.A7_Skill25.checked;
			n_A_PassSkill7[26] = calcForm.A7_Skill26.checked;
			n_A_PassSkill7[27] = calcForm.A7_Skill27.checked;
			n_A_PassSkill7[28] = calcForm.A7_Skill28.checked;
			n_A_PassSkill7[29] = calcForm.A7_Skill29.checked;
			n_A_PassSkill7[30] = calcForm.A7_Skill30.checked;
			n_A_PassSkill7[31] = calcForm.A7_Skill31.checked;
			n_A_PassSkill7[32] = calcForm.A7_Skill32.checked;
			n_A_PassSkill7[33] = calcForm.A7_Skill33.checked;
			n_A_PassSkill7[34] = calcForm.A7_Skill34.checked;
			n_A_PassSkill7[35] = calcForm.A7_Skill35.checked;
			n_A_PassSkill7[36] = calcForm.A7_Skill36.checked;
			n_A_PassSkill7[37] = calcForm.A7_Skill37.checked;
			n_A_PassSkill7[38] = legacyNum(calcForm.A7_Skill38.value);
			n_A_PassSkill7[39] = legacyNum(calcForm.A7_Skill39.value);
			n_A_PassSkill7[40] = calcForm.A7_Skill40.checked;
			n_A_PassSkill7[41] = legacyNum(calcForm.A7_Skill41.value);
			n_A_PassSkill7[42] = legacyNum(calcForm.A7_Skill42.value);
			n_A_PassSkill7[43] = legacyNum(calcForm.A7_Skill43.value);
			n_A_PassSkill7[44] = legacyNum(calcForm.A7_Skill44.value);
			n_A_PassSkill7[45] = legacyNum(calcForm.A7_Skill45.value);
			n_A_PassSkill7[46] = legacyNum(calcForm.A7_Skill46.value);
			n_A_PassSkill7[47] = legacyNum(calcForm.A7_Skill47.value);
			n_A_PassSkill7[48] = calcForm.A7_Skill48.checked;
			n_A_PassSkill7[49] = calcForm.A7_Skill49.checked;
			n_A_PassSkill7[50] = legacyNum(calcForm.A7_Skill50.value);
			n_A_PassSkill7[51] = calcForm.A7_Skill51.checked;
			n_A_PassSkill7[52] = legacyNum(calcForm.A7_Skill52.value);
		}
		n_A_PassSkill8[14] = 0;
		if(n_Skill8SW){
			n_A_PassSkill8[0] = legacyNum(calcForm.A8_Skill0.value);
			n_A_PassSkill8[1] = legacyNum(calcForm.A8_Skill1.value);
			n_A_PassSkill8[2] = legacyNum(calcForm.A8_Skill2.value);
			n_A_PassSkill8[3] = legacyNum(calcForm.A8_Skill3.value);
			n_A_PassSkill8[4] = calcForm.A8_Skill4.checked;
			n_A_PassSkill8[5] = legacyNum(calcForm.A8_Skill5.value);
			n_A_PassSkill8[6] = legacyNum(calcForm.A8_Skill6.value);
			n_A_PassSkill8[7] = legacyNum(calcForm.A8_Skill7.value);
			n_A_PassSkill8[12] = legacyNum(calcForm.A8_Skill12.value);
			n_A_PassSkill8[13] = calcForm.A8_Skill13.checked;
			n_A_PassSkill8[15] = legacyNum(calcForm.A8_Skill15.value);
			n_A_PassSkill8[16] = calcForm.A8_Skill16.checked;
			n_A_PassSkill8[17] = legacyNum(calcForm.A8_Skill17.value);
			n_A_PassSkill8[19] = calcForm.A8_Skill19.checked;
			n_A_PassSkill8[21] = legacyNum(calcForm.A8_Skill21.value);
			n_A_PassSkill8[22] = legacyNum(calcForm.A8_Skill22.value);
			if(41 <= n_A_JOB && n_A_JOB <= 43){
				if(n_A_PassSkill8[19] == 0) document.getElementById("ID_A_HUYO_NAME").textContent = "暖かい風";
				else document.getElementById("ID_A_HUYO_NAME").textContent = "武器属性付与";
			}
		}

    return { n_A_SpeedPOT, attackMethodConfArray };
}
