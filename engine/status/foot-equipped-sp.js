/**
 * 装備・カード等のアイテムSP集計、および装備制限（SpDef）判定。
 *
 * foot.js から分割（.claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」）。
 * 関数本文は foot.js から移動のみで変更していない（バイト単位で同一）。
 * StAllCalc/StPlusCalc（foot.js に残存）から呼ばれる内部ヘルパーと、
 * foot-bridge.js 経由で他ファイルから呼ばれる公開関数が混在する。
 */
import { n_A_PassSkill8 } from "../skill/skillstate.js";
import { IsSameJobClass } from "../data/mig.job.h.js";
import { g_timeItemConf, g_timeItemConfEffective } from "../runtime/global.js";
import { g_pureStatus } from "../chara/hmjob.js";
import { n_A_Arrow, n_A_BaseLV } from "../runtime/ro4-state.js";
import { toSafeBigInt } from "../runtime/util.js";
import { ARROW_ID_ZOKUSE_ZIDO_YA_ATK30, ArrowOBJNew } from "../arrow.dat.js";
import { CardObjNew } from "../card.dat.js";
import {
    CARD_REGION_ID_ACCESSORY_1, CARD_REGION_ID_ACCESSORY_2, CARD_REGION_ID_ARMS_LEFT_1, CARD_REGION_ID_ARMS_LEFT_2,
    CARD_REGION_ID_ARMS_LEFT_3, CARD_REGION_ID_ARMS_LEFT_4, CARD_REGION_ID_ARMS_RIGHT_1, CARD_REGION_ID_ARMS_RIGHT_2,
    CARD_REGION_ID_ARMS_RIGHT_3, CARD_REGION_ID_ARMS_RIGHT_4, CARD_REGION_ID_BODY,
    CARD_REGION_ID_ENCHANT_ACCESSORY_1_1, CARD_REGION_ID_ENCHANT_ACCESSORY_1_2, CARD_REGION_ID_ENCHANT_ACCESSORY_1_3,
    CARD_REGION_ID_ENCHANT_ACCESSORY_2_1, CARD_REGION_ID_ENCHANT_ACCESSORY_2_2, CARD_REGION_ID_ENCHANT_ACCESSORY_2_3,
    CARD_REGION_ID_ENCHANT_BODY_1, CARD_REGION_ID_ENCHANT_BODY_2, CARD_REGION_ID_ENCHANT_BODY_3,
    CARD_REGION_ID_ENCHANT_HEAD_TOP_1, CARD_REGION_ID_ENCHANT_HEAD_TOP_2, CARD_REGION_ID_ENCHANT_HEAD_TOP_3,
    CARD_REGION_ID_ENCHANT_SHIELD_1, CARD_REGION_ID_ENCHANT_SHIELD_2, CARD_REGION_ID_ENCHANT_SHIELD_3,
    CARD_REGION_ID_ENCHANT_SHOES_1, CARD_REGION_ID_ENCHANT_SHOES_2, CARD_REGION_ID_ENCHANT_SHOES_3,
    CARD_REGION_ID_ENCHANT_SHOULDER_1, CARD_REGION_ID_ENCHANT_SHOULDER_2, CARD_REGION_ID_ENCHANT_SHOULDER_3,
    CARD_REGION_ID_HEAD_MID, CARD_REGION_ID_HEAD_TOP, CARD_REGION_ID_SHADOW_ARMS_RIGHT_1,
    CARD_REGION_ID_SHADOW_ARMS_RIGHT_2, CARD_REGION_ID_SHADOW_ARMS_RIGHT_3,
    CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_1, CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_2,
    CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_3, CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_1,
    CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_2, CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_3,
    CARD_REGION_ID_SHADOW_ENCHANT_BODY_1, CARD_REGION_ID_SHADOW_ENCHANT_BODY_2, CARD_REGION_ID_SHADOW_ENCHANT_BODY_3,
    CARD_REGION_ID_SHADOW_ENCHANT_SHOES_1, CARD_REGION_ID_SHADOW_ENCHANT_SHOES_2,
    CARD_REGION_ID_SHADOW_ENCHANT_SHOES_3, CARD_REGION_ID_SHADOW_SHIELD_1, CARD_REGION_ID_SHADOW_SHIELD_2,
    CARD_REGION_ID_SHADOW_SHIELD_3, CARD_REGION_ID_SHIELD, CARD_REGION_ID_SHOES, CARD_REGION_ID_SHOULDER,
    COSTUME_REGION_ID_ACCESSORY_2
} from "../runtime/common.js";
import { ARROW_DATA_INDEX_SPBEGIN } from "../const/EnumArrowDataIndex.js";
import { CARD_DATA_INDEX_SPBEGIN } from "../const/EnumCardDataIndex.js";
import { COSTUME_DATA_INDEX_SPBEGIN } from "../const/EnumCostumeDataIndex.js";
import {
    ELM_ID_DARK, ELM_ID_EARTH, ELM_ID_FIRE, ELM_ID_HOLY, ELM_ID_PSYCO, ELM_ID_VANITY, ELM_ID_WATER, ELM_ID_WIND
} from "../const/EnumElmId.js";
import {
    EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_BODY, EQUIP_REGION_ID_HEAD_TOP,
    EQUIP_REGION_ID_SHADOW_ACCESSORY_1, EQUIP_REGION_ID_SHADOW_ACCESSORY_2, EQUIP_REGION_ID_SHADOW_ARMS_LEFT,
    EQUIP_REGION_ID_SHADOW_ARMS_RIGHT, EQUIP_REGION_ID_SHADOW_BODY, EQUIP_REGION_ID_SHADOW_FOOT,
    EQUIP_REGION_ID_SHIELD, EQUIP_REGION_ID_SHOES, EQUIP_REGION_ID_SHOULDER
} from "../const/EnumEquipRegionId.js";
import { ITEM_DATA_INDEX_SPBEGIN } from "../const/EnumItemDataIndex.js";
import {
    ITEM_SP_ARMS_ELEMENT, ITEM_SP_BASE_LV_BY_1_OFFSET, ITEM_SP_BASE_LV_OVER_170_OFFSET, ITEM_SP_BODY_ELEMENT,
    ITEM_SP_ELEMENTAL, ITEM_SP_END, ITEM_SP_EQUIPMENT_LOCATION_BODY, ITEM_SP_INVALIDATE_CARD_SP,
    ITEM_SP_INVALIDATE_ITEM_SP, ITEM_SP_JOB_RESTRICT_NOVICE_OFFSET, ITEM_SP_PET_FRIENDLY_OVER_HIGH,
    ITEM_SP_PET_FRIENDLY_OVER_HIGHEST, ITEM_SP_PURE_STR_90_OFFSET, ITEM_SP_PURE_STR_BY_10_OFFSET,
    ITEM_SP_PURE_STR_BY_30_OFFSET, ITEM_SP_REFINE_BY_1_OFFSET, ITEM_SP_REFINE_OVER_1_OFFSET, ITEM_SP_TRANSCENDENCE_1
} from "../const/EnumItemSpId.js";
import { MONSTER_DATA_INDEX_ELEMENT } from "../const/EnumMonsterDataIndex.js";
import { PARAM_DEX, PARAM_VIT } from "../const/EnumParamId.js";
import { PET_DATA_INDEX_SPBEGIN } from "../const/EnumPetDataIndex.js";
import { TIME_ITEM_DATA_INDEX_SPBEGIN } from "../const/EnumTimeItemDataIndex.js";
import { CostumeOBJ } from "../costume.dat.js";
import { ItemObjNew } from "../item.dat.js";
import { PET_OBJ } from "../pet.dat.js";
import {
    SU_AGI, SU_DEX, SU_INT, SU_LUK, SU_STR, SU_VIT, g_itemIdArray, g_refinedArray, n_A_BODY_DEF_PLUS,
    n_A_BODY_DEF_Transcendence, n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_HEAD_DEF_Transcendence, n_A_SHIELD_DEF_PLUS,
    n_A_SHIELD_DEF_Transcendence, n_A_SHOES_DEF_PLUS, n_A_SHOES_DEF_Transcendence, n_A_SHOULDER_DEF_PLUS,
    n_A_SHOULDER_DEF_Transcendence, n_A_Weapon2_ATKplus, n_A_Weapon2_Transcendence, n_A_Weapon_ATKplus,
    n_A_Weapon_Transcendence, n_A_card, n_A_costume
} from "../runtime/roro-state.js";
import { ITEM_SP_TIME_OBJ } from "../timeitem.dat.js";

/**
 * 装備中のＳＰの合計値を取得する（装備のみ）.
 * @param spid ＳＰのＩＤ
 * @return 当該ＳＰのパラメタ合計値
 */
export function GetEquippedTotalSPEquip(spid) {

	// この関数だけ、シャドウ装備の効果を加算する
	let value = 0;

	value += GetEquippedTotalSPEquipSub(spid, false, false);
	value += GetEquippedTotalSPShadowSub(spid, false, false);

	return value;
}

/**
 * 装備中のＳＰの合計値を取得する（装備のみ、無条件効果のみ）.
 * @param spid ＳＰのＩＤ
 * @return 当該ＳＰのパラメタ合計値
 */
export function GetEquippedTotalSPEquipExact(spid) {
	return GetEquippedTotalSPEquipSub(spid, false, true);
}

/**
 * 装備中のＳＰのリストを取得する（装備のみ）.
 * @param spid ＳＰのＩＤ
 * @return 当該ＳＰのパラメタ合計値
 */
export function GetEquippedSPListEquip(spid) {
	return GetEquippedTotalSPEquipSub(spid, true, false);
}

/**
 * 装備中のＳＰの合計値を取得する（装備のみ）.
 * @param spid ＳＰのＩＤ
 * @return 当該ＳＰのパラメタ合計値
 */
export function GetEquippedTotalSPEquipSub(spid, bListUp, bExact) {

	var invalidItemIdArray = null;

	// 効果が打ち消されるアイテムＩＤの配列を取得
	invalidItemIdArray = new Array()
		.concat(GetEquippedSPValueArrayEquip(ITEM_SP_INVALIDATE_ITEM_SP))
		.concat(GetEquippedSPValueArrayCardAndElse(ITEM_SP_INVALIDATE_ITEM_SP));


	if (invalidItemIdArray.length == 0) {
		invalidItemIdArray = null;
	}


	return GetEquippedSPSubEquip(spid, invalidItemIdArray, bListUp, bExact);
}

/**
 * 装備中のＳＰ値のリストを取得する（装備のみ）.
 * @param spid ＳＰのＩＤ
 * @return 当該ＳＰのパラメタ合計値
 */
export function GetEquippedSPValueArrayEquip(spid) {
	return GetEquippedSPSubEquip(spid, null, true, false);
}

/**
 * 装備中のＳＰを取得する（装備のみ）.
 * @param spid ＳＰのＩＤ
 * @param invalidItemIdArray 効果無効のアイテムＩＤ配列
 * @param bListUp リストアップするかのフラグ
 * @return 当該ＳＰのパラメタ合計値
 */
export function GetEquippedSPSubEquip(spid, invalidItemIdArray, bListUp, bExact) {

	var eqpRegionId = 0;
	var spDefIdx = 0;
	var spDefValue = 0;

	let eqpTranscendence = 0;
	var eqpRefined = 0;

	var spDefIdMod = 0;			// 特殊条件を取り除いたＳＰのＩＤ
	var spDefRemain = 0;		// 計算途中のＳＰＩＤ値
	var spDefBaseLvOver = 0;	// BaseLv以上条件
	var spDefBaseLvBy = 0;		// BaseLvが上がる度に条件
	var spDefJobRestrict = 0;	// 職業制限
	var spDefPureStatus = 0;	// 純粋なステータス条件
	var spDefRefineOver = 0;	// 精錬値以上条件
	var spDefRefineBy = 0;		// 精錬値が上がる度に条件

	var pureStatusValue = [SU_STR, SU_AGI, SU_VIT, SU_INT, SU_DEX, SU_LUK];

	var spVal = 0;
	var itemId = 0;
	var itemData = 0;

	var spValToCorrect = 0;
	var listUpArray = new Array();


	// 全ての装備箇所をループ
	for(eqpRegionId = 0; eqpRegionId < n_A_Equip.length; eqpRegionId++) {

		// 装備データからアイテムデータを取得
		itemId = n_A_Equip[eqpRegionId];
		itemData = ItemObjNew[itemId];

		// 効果が無効の装備でないかを検査
		if (invalidItemIdArray) {
			if (invalidItemIdArray.indexOf(itemId) >= 0) {
				continue;
			}
		}

		// 装備箇所ごとに、精錬値を特定する
		switch (eqpRegionId) {

		case EQUIP_REGION_ID_ARMS:
			eqpTranscendence = typeof n_A_Weapon_Transcendence != "undefined" ? n_A_Weapon_Transcendence: 0;			
			eqpRefined = n_A_Weapon_ATKplus;
			break;

		case EQUIP_REGION_ID_ARMS_LEFT:
			eqpTranscendence = typeof n_A_Weapon2_Transcendence != "undefined" ? n_A_Weapon2_Transcendence: 0;
			eqpRefined = n_A_Weapon2_ATKplus;
			break;

		case EQUIP_REGION_ID_HEAD_TOP:
			eqpTranscendence = typeof n_A_HEAD_DEF_Transcendence != "undefined" ? n_A_HEAD_DEF_Transcendence: 0;
			eqpRefined = n_A_HEAD_DEF_PLUS;
			break;

		case EQUIP_REGION_ID_SHIELD:
			eqpTranscendence = typeof n_A_SHIELD_DEF_Transcendence != "undefined" ? n_A_SHIELD_DEF_Transcendence: 0;
			eqpRefined = n_A_SHIELD_DEF_PLUS;
			break;

		case EQUIP_REGION_ID_BODY:
			eqpTranscendence = typeof n_A_BODY_DEF_Transcendence != "undefined" ? n_A_BODY_DEF_Transcendence: 0;
			eqpRefined = n_A_BODY_DEF_PLUS;
			break;

		case EQUIP_REGION_ID_SHOULDER:
			eqpTranscendence = typeof n_A_SHOULDER_DEF_Transcendence != "undefined" ? n_A_SHOULDER_DEF_Transcendence: 0;
			eqpRefined = n_A_SHOULDER_DEF_PLUS;
			break;

		case EQUIP_REGION_ID_SHOES:
			eqpTranscendence = typeof n_A_SHOES_DEF_Transcendence != "undefined" ? n_A_SHOES_DEF_Transcendence: 0;
			eqpRefined = n_A_SHOES_DEF_PLUS;
			break;

		default:
			eqpTranscendence = 0;
			eqpRefined = 0;

		}

		// アイテムのＳＰ定義をループ検索
		for (spDefIdx = 0; itemData[ ITEM_DATA_INDEX_SPBEGIN + spDefIdx ] != ITEM_SP_END; spDefIdx += 2) {
			var spDefPureStatusBy = 0;	// 純粋なステータスが上がる度に条件
			var spValPureStatus = 0;	// 純粋なステータスによる上昇量

			// ＳＰの定義を取得
			// spDefRemain は int の場合と BigInt の場合がある
			spDefRemain = itemData[ ITEM_DATA_INDEX_SPBEGIN + spDefIdx ];
			spDefValue = itemData[ ITEM_DATA_INDEX_SPBEGIN + spDefIdx + 1 ];

			// 純粋なステータスが30上がる度に条件を取得
			let base_flag = toSafeBigInt(ITEM_SP_PURE_STR_BY_30_OFFSET);
			if (spDefRemain > base_flag) {
				spDefPureStatusBy = parseInt(spDefRemain / base_flag);
				if (1 <= spDefPureStatusBy && spDefPureStatusBy <= 6) {
					spValPureStatus = Math.floor(pureStatusValue[spDefPureStatusBy - 1] / 30);
				}
				spDefRemain = parseInt(spDefRemain % base_flag);
			}

			// 超越段階を満たさない場合は、次へ
			spDefRemain = CheckSpDefTransendenceOver(spDefRemain, eqpTranscendence);
			if (spDefRemain < 0) {
				continue;
			}			
			// --- ここから下の spDefRemain は必ず Int 型 ---

			// 完全一致条件が指定されている場合
			if (bExact) {
				if (spDefRemain != spid) {
					continue;
				}
			}

			// ＳＰ定義ＩＤが一致しない場合は、次へ
			if (!IsMatchSpDefId(spDefRemain, spid)) {
				continue;
			}

			// 親密度条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefFriendlyOver(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// BaseLv以上条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefBaseLvOver(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// BaseLvが上がる度に条件を取得
			spDefBaseLvBy = Math.floor(spDefRemain / ITEM_SP_BASE_LV_BY_1_OFFSET);
			spDefRemain = spDefRemain % ITEM_SP_BASE_LV_BY_1_OFFSET;

			// 職業条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefJobRestrict(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// 純粋なステータス条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefPureStatus(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// 純粋なステータスが上がる度に条件を取得
			if (spDefPureStatusBy == 0) {
				spDefPureStatusBy = Math.floor(spDefRemain / ITEM_SP_PURE_STR_BY_10_OFFSET);
				if (1 <= spDefPureStatusBy && spDefPureStatusBy <= 6) {
					spValPureStatus = Math.floor(pureStatusValue[spDefPureStatusBy - 1] / 10);
				}
				else if (7 == spDefPureStatusBy) {
					spValPureStatus = pureStatusValue[PARAM_DEX];
				}
				else if (8 == spDefPureStatusBy) {
					spValPureStatus = pureStatusValue[PARAM_VIT];
				}
				spDefRemain = spDefRemain % ITEM_SP_PURE_STR_BY_10_OFFSET;
			}

			// 精錬値以上条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefRefineOver(spDefRemain, eqpRefined);
			if (spDefRemain < 0) {
				continue;
			}

			// 精錬値が上がる度に条件を取得
			spDefRefineBy = Math.floor(spDefRemain / ITEM_SP_REFINE_BY_1_OFFSET);
			spDefRemain = spDefRemain % ITEM_SP_REFINE_BY_1_OFFSET;

			// 追加すべきＳＰ定義値を計算

			spValToCorrect = itemData[ ITEM_DATA_INDEX_SPBEGIN + spDefIdx + 1 ];

			// 精錬値が上がる度に条件が設定されている場合
			if (spDefRefineBy > 0) {
				spValToCorrect *= Math.floor(eqpRefined / spDefRefineBy);
			}

			// 純粋なステータスが上がる度に条件が設定されている場合
			if (spDefPureStatusBy > 0) {
				spValToCorrect *= spValPureStatus;
			}

			// BaseLvが上がる度に条件が設定されている場合
			if (spDefBaseLvBy > 0) {
				spValToCorrect *= Math.floor(n_A_BaseLV / spDefBaseLvBy);
			}

			// 集計

			// リストアップの場合
			if (bListUp) {
				listUpArray.push(spValToCorrect);
			}

			// 合計値の場合
			else {
				spVal += spValToCorrect;
			}
		}
	}

	// 結果を戻す
	if (bListUp) {
		return listUpArray
	}

	else {
		return spVal;
	}
}

/**
 * 装備中のＳＰの合計値を取得する（装備のみ）.
 * @param spid ＳＰのＩＤ
 * @return 当該ＳＰのパラメタ合計値
 */
export function GetEquippedTotalSPShadowSub(spid, bListUp, bExact) {

	var invalidItemIdArray = null;

	// 効果が打ち消されるアイテムＩＤの配列を取得
	invalidItemIdArray = new Array()
		.concat(GetEquippedSPValueArrayEquip(ITEM_SP_INVALIDATE_ITEM_SP))
		.concat(GetEquippedSPValueArrayCardAndElse(ITEM_SP_INVALIDATE_ITEM_SP));


	if (invalidItemIdArray.length == 0) {
		invalidItemIdArray = null;
	}


	return GetEquippedSPSubShadow(spid, invalidItemIdArray, bListUp, bExact);
}

/**
 * 装備中のＳＰを取得する（シャドウ装備のみ）.
 * @param spid ＳＰのＩＤ
 * @param invalidItemIdArray 効果無効のアイテムＩＤ配列
 * @param bListUp リストアップするかのフラグ
 * @return 当該ＳＰのパラメタ合計値
 */
export function GetEquippedSPSubShadow(spid, invalidItemIdArray, bListUp, bExact) {

	var eqpRegionId = 0;
	var spDefIdx = 0;
	var spDefValue = 0;

	var spDefIdMod = 0;			// 特殊条件を取り除いたＳＰのＩＤ
	var spDefRemain = 0;		// 計算途中のＳＰＩＤ値
	var spDefBaseLvOver = 0;	// BaseLv以上条件
	var spDefBaseLvBy = 0;		// BaseLvが上がる度に条件
	var spDefJobRestrict = 0;	// 職業制限
	var spDefPureStatus = 0;	// 純粋なステータス条件
	var spDefRefineOver = 0;	// 精錬値以上条件
	var spDefRefineBy = 0;		// 精錬値が上がる度に条件

	var pureStatusValue = [SU_STR, SU_AGI, SU_VIT, SU_INT, SU_DEX, SU_LUK];
	var spVal = 0;

	var spValToCorrect = 0;
	var listUpArray = new Array();


	// 全ての装備箇所をループ
	const eqprgnIDs = [
		EQUIP_REGION_ID_SHADOW_ARMS_RIGHT,
		EQUIP_REGION_ID_SHADOW_ARMS_LEFT,
		EQUIP_REGION_ID_SHADOW_BODY,
		EQUIP_REGION_ID_SHADOW_FOOT,
		EQUIP_REGION_ID_SHADOW_ACCESSORY_1,
		EQUIP_REGION_ID_SHADOW_ACCESSORY_2,
	]

	for (let idx = 0; idx < eqprgnIDs.length; idx++) {

		const eqpRegionId = eqprgnIDs[idx];

		// 装備IDを取得
		const itemId = g_itemIdArray[eqpRegionId];
		if (!itemId) {
			continue;
		}

		// 効果が無効の装備でないかを検査
		if (invalidItemIdArray) {
			if (invalidItemIdArray.indexOf(itemId) >= 0) {
				continue;
			}
		}

		// 装備IDからアイテムデータを取得
		const itemData = ItemObjNew[itemId];

		// 装備箇所ごとに、精錬値を特定する
		let eqpRefined = g_refinedArray[eqpRegionId];
		if (!eqpRefined) {
			eqpRefined = 0;
		}

		// アイテムのＳＰ定義をループ検索
		for (spDefIdx = 0; itemData[ ITEM_DATA_INDEX_SPBEGIN + spDefIdx ] != ITEM_SP_END; spDefIdx += 2) {
			var spDefPureStatusBy = 0;	// 純粋なステータスが上がる度に条件
			var spValPureStatus = 0;	// 純粋なステータスによる上昇量

			// ＳＰの定義を取得
			spDefRemain = itemData[ ITEM_DATA_INDEX_SPBEGIN + spDefIdx ];
			spDefValue = itemData[ ITEM_DATA_INDEX_SPBEGIN + spDefIdx + 1 ];

			// 純粋なステータスが30上がる度に条件を取得
			let base_flag = toSafeBigInt(ITEM_SP_PURE_STR_BY_30_OFFSET);
			if (spDefRemain > base_flag) {
				spDefPureStatusBy = parseInt(spDefRemain / base_flag);
				if (1 <= spDefPureStatusBy && spDefPureStatusBy <= 6) {
					spValPureStatus = Math.floor(pureStatusValue[spDefPureStatusBy - 1] / 30);
				}
				spDefRemain = parseInt(spDefRemain % base_flag);
			}

			// --- ここから下の spDefRemain は必ず Int 型 ---

			// 完全一致条件が指定されている場合
			if (bExact) {
				if (spDefRemain != spid) {
					continue;
				}
			}

			// ＳＰ定義ＩＤが一致しない場合は、次へ
			if (!IsMatchSpDefId(spDefRemain, spid)) {
				continue;
			}

			// 親密度条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefFriendlyOver(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// BaseLv以上条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefBaseLvOver(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// BaseLvが上がる度に条件を取得
			spDefBaseLvBy = Math.floor(spDefRemain / ITEM_SP_BASE_LV_BY_1_OFFSET);
			spDefRemain = spDefRemain % ITEM_SP_BASE_LV_BY_1_OFFSET;

			// 職業条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefJobRestrict(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// 純粋なステータス条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefPureStatus(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// 純粋なステータスが上がる度に条件を取得
			if (spDefPureStatusBy == 0) {
				spDefPureStatusBy = Math.floor(spDefRemain / ITEM_SP_PURE_STR_BY_10_OFFSET);
				if (1 <= spDefPureStatusBy && spDefPureStatusBy <= 6) {
					spValPureStatus = Math.floor(pureStatusValue[spDefPureStatusBy - 1] / 10);
				}
				else if (7 == spDefPureStatusBy) {
					spValPureStatus = pureStatusValue[PARAM_DEX];
				}
				else if (8 == spDefPureStatusBy) {
					spValPureStatus = pureStatusValue[PARAM_VIT];
				}
				spDefRemain = spDefRemain % ITEM_SP_PURE_STR_BY_10_OFFSET;
			}

			// 精錬値以上条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefRefineOver(spDefRemain, eqpRefined);
			if (spDefRemain < 0) {
				continue;
			}

			// 精錬値が上がる度に条件を取得
			spDefRefineBy = Math.floor(spDefRemain / ITEM_SP_REFINE_BY_1_OFFSET);
			spDefRemain = spDefRemain % ITEM_SP_REFINE_BY_1_OFFSET;

			// 追加すべきＳＰ定義値を計算

			spValToCorrect = itemData[ ITEM_DATA_INDEX_SPBEGIN + spDefIdx + 1 ];

			// 精錬値が上がる度に条件が設定されている場合
			if (spDefRefineBy > 0) {
				spValToCorrect *= Math.floor(eqpRefined / spDefRefineBy);
			}

			// 純粋なステータスが上がる度に条件が設定されている場合
			if (spDefPureStatusBy > 0) {
				spValToCorrect *= spValPureStatus;
			}

			// BaseLvが上がる度に条件が設定されている場合
			if (spDefBaseLvBy > 0) {
				spValToCorrect *= Math.floor(n_A_BaseLV / spDefBaseLvBy);
			}

			// 集計

			// リストアップの場合
			if (bListUp) {
				listUpArray.push(spValToCorrect);
			}

			// 合計値の場合
			else {
				spVal += spValToCorrect;
			}
		}
	}

	// 結果を戻す
	if (bListUp) {
		return listUpArray
	}

	else {
		return spVal;
	}
}

/**
 * カード・ペット・時限効果のＳＰ値のリストを取得する.
 * @param spid ＳＰのＩＤ
 * @return 当該ＳＰのパラメタ合計値
 */
export function GetEquippedTotalSPCardAndElse(spid) {

	var list = null;
	var invalidCardIdArray = null;

	// 効果が打ち消されるアイテムＩＤの配列を取得
	invalidCardIdArray = new Array()
		.concat(GetEquippedSPValueArrayEquip(ITEM_SP_INVALIDATE_CARD_SP))
		.concat(GetEquippedSPValueArrayCardAndElse(ITEM_SP_INVALIDATE_CARD_SP));

	if (invalidCardIdArray.length == 0) {
		invalidCardIdArray = null;
	}

	if ((spid == ITEM_SP_ARMS_ELEMENT) || (spid == ITEM_SP_BODY_ELEMENT)) {
		list = GetEquippedSPSubSPCardAndElse(spid, invalidCardIdArray, true);
		return (list.length > 0) ? list[0] : 0;
	}
	else {
		return GetEquippedSPSubSPCardAndElse(spid, invalidCardIdArray, false);
	}
}

/**
 * カード・ペット・時限効果のＳＰ値のリストを取得する.
 * @param spid ＳＰのＩＤ
 * @return 当該ＳＰのパラメタ合計値
 */
export function GetEquippedSPListCardAndElse(spid) {

	var list = null;
	var invalidCardIdArray = null;

	// 効果が打ち消されるアイテムＩＤの配列を取得
	invalidCardIdArray = new Array()
		.concat(GetEquippedSPValueArrayEquip(ITEM_SP_INVALIDATE_CARD_SP))
		.concat(GetEquippedSPValueArrayCardAndElse(ITEM_SP_INVALIDATE_CARD_SP));

	if (invalidCardIdArray.length == 0) {
		invalidCardIdArray = null;
	}

	if ((spid == ITEM_SP_ARMS_ELEMENT) || (spid == ITEM_SP_BODY_ELEMENT)) {
		list = GetEquippedSPSubSPCardAndElse(spid, invalidCardIdArray, true);
		return (list.length > 0) ? list[0] : 0;
	}
	else {
		return GetEquippedSPSubSPCardAndElse(spid, invalidCardIdArray, true);
	}
}

/**
 * カード・ペット・時限効果のＳＰ値のリストを取得する.
 * @param spid ＳＰのＩＤ
 * @return 当該ＳＰのパラメタ合計値
 */
export function GetEquippedSPValueArrayCardAndElse(spid) {
	return GetEquippedSPSubSPCardAndElse(spid, null, true);
}

/**
 * カード・ペット・時限効果のＳＰの合計値を取得する.
 * @param spid ＳＰのＩＤ
 * @param invalidCardIdArray 効果無効のアイテムＩＤ配列
 * @param bListUp リストアップするかのフラグ
 * @return 当該ＳＰのパラメタ合計値
 */
export function GetEquippedSPSubSPCardAndElse(spid, invalidCardIdArray, bListUp) {
	var i = 0;
	var idx = 0;
	var j = 0;
	var spVal = 0;
	var spDefValue = 0;
	var cardRegionId = 0;
	var cardId = 0;
	var cardData = 0;
	var spDefIdx = 0;
	let eqpTranscendence = 0;
	var eqpRefined = 0;
	var spDefIdMod = 0;			// 特殊条件を取り除いたＳＰのＩＤ
	var spDefRemain = 0;		// 計算途中のＳＰＩＤ値
	var spDefBaseLvOver = 0;	// BaseLv以上条件
	var spDefBaseLvBy = 0;		// BaseLvが上がる度に条件
	var spDefJobRestrict = 0;	// 職業制限
	var spDefPureStatus = 0;	// 純粋なステータス条件
	var spDefRefineOver = 0;	// 精錬値以上条件
	var spDefRefineBy = 0;		// 精錬値が上がる度に条件
	var pureStatusValue = [SU_STR, SU_AGI, SU_VIT, SU_INT, SU_DEX, SU_LUK];
	var spValToCorrect = 0;
	var listUpArray = new Array();
	var petFuncReturn = null;

	// 装備中のカードのＳＰの合計値を取得
	for(cardRegionId = 0; cardRegionId < n_A_card.length; cardRegionId++) {
		// 装備中のカードデータから、カードデータを取得
		cardId = n_A_card[cardRegionId];
		cardData = CardObjNew[cardId];
		// 別ブランチ等で追加されたカードIDが現在のデータに存在しない場合はスキップ
		if (!cardData) continue;

		// 効果が無効の装備でないかを検査
		if (invalidCardIdArray) {
			if (invalidCardIdArray.indexOf(cardId) >= 0) {
				continue;
			}
		}
		// カード装備箇所ごとに、精錬値を特定する
		switch (cardRegionId) {
			case CARD_REGION_ID_ARMS_RIGHT_1:
			case CARD_REGION_ID_ARMS_RIGHT_2:
			case CARD_REGION_ID_ARMS_RIGHT_3:
			case CARD_REGION_ID_ARMS_RIGHT_4:
				eqpRefined = n_A_Weapon_ATKplus;
				eqpTranscendence = typeof n_A_Weapon_Transcendence != "undefined" ? n_A_Weapon_Transcendence: 0;
				break;

			case CARD_REGION_ID_ARMS_LEFT_1:
			case CARD_REGION_ID_ARMS_LEFT_2:
			case CARD_REGION_ID_ARMS_LEFT_3:
			case CARD_REGION_ID_ARMS_LEFT_4:
				eqpRefined = n_A_Weapon2_ATKplus;
				eqpTranscendence = typeof n_A_Weapon2_Transcendence != "undefined" ? n_A_Weapon2_Transcendence: 0;
				break;

			case CARD_REGION_ID_HEAD_TOP:
			case CARD_REGION_ID_ENCHANT_HEAD_TOP_1:
			case CARD_REGION_ID_ENCHANT_HEAD_TOP_2:
			case CARD_REGION_ID_ENCHANT_HEAD_TOP_3:
				eqpRefined = n_A_HEAD_DEF_PLUS;
				eqpTranscendence = typeof n_A_HEAD_DEF_Transcendence != "undefined" ? n_A_HEAD_DEF_Transcendence: 0;
				break;

			case CARD_REGION_ID_SHIELD:
			case CARD_REGION_ID_ENCHANT_SHIELD_1:
			case CARD_REGION_ID_ENCHANT_SHIELD_2:
			case CARD_REGION_ID_ENCHANT_SHIELD_3:
				eqpRefined = n_A_SHIELD_DEF_PLUS;
				eqpTranscendence = typeof n_A_SHIELD_DEF_Transcendence != "undefined" ? n_A_SHIELD_DEF_Transcendence: 0;
				break;

			case CARD_REGION_ID_BODY:
			case CARD_REGION_ID_ENCHANT_BODY_1:
			case CARD_REGION_ID_ENCHANT_BODY_2:
			case CARD_REGION_ID_ENCHANT_BODY_3:
				eqpRefined = n_A_BODY_DEF_PLUS;
				eqpTranscendence = typeof n_A_BODY_DEF_Transcendence != "undefined" ? n_A_BODY_DEF_Transcendence: 0;
				break;

			case CARD_REGION_ID_SHOULDER:
			case CARD_REGION_ID_ENCHANT_SHOULDER_1:
			case CARD_REGION_ID_ENCHANT_SHOULDER_2:
			case CARD_REGION_ID_ENCHANT_SHOULDER_3:
				eqpRefined = n_A_SHOULDER_DEF_PLUS;
				eqpTranscendence = typeof n_A_SHOULDER_DEF_Transcendence != "undefined" ? n_A_SHOULDER_DEF_Transcendence: 0;
				break;

			case CARD_REGION_ID_SHOES:
			case CARD_REGION_ID_ENCHANT_SHOES_1:
			case CARD_REGION_ID_ENCHANT_SHOES_2:
			case CARD_REGION_ID_ENCHANT_SHOES_3:
				eqpRefined = n_A_SHOES_DEF_PLUS;
				eqpTranscendence = typeof n_A_SHOES_DEF_Transcendence != "undefined" ? n_A_SHOES_DEF_Transcendence: 0;
				break;

			case CARD_REGION_ID_SHADOW_ARMS_RIGHT_1:
			case CARD_REGION_ID_SHADOW_ARMS_RIGHT_2:
			case CARD_REGION_ID_SHADOW_ARMS_RIGHT_3:
				eqpRefined = typeof g_refinedArray != "undefined" ? g_refinedArray[EQUIP_REGION_ID_SHADOW_ARMS_RIGHT]: 0;
				break;

			case CARD_REGION_ID_SHADOW_SHIELD_1:
			case CARD_REGION_ID_SHADOW_SHIELD_2:
			case CARD_REGION_ID_SHADOW_SHIELD_3:
				eqpRefined = typeof g_refinedArray != "undefined" ? g_refinedArray[EQUIP_REGION_ID_SHADOW_ARMS_LEFT]: 0;
				break;
			
			case CARD_REGION_ID_SHADOW_ENCHANT_BODY_1:
			case CARD_REGION_ID_SHADOW_ENCHANT_BODY_2:
			case CARD_REGION_ID_SHADOW_ENCHANT_BODY_3:
				eqpRefined = typeof g_refinedArray != "undefined" ? g_refinedArray[EQUIP_REGION_ID_SHADOW_BODY]: 0;
				break;
			
			case CARD_REGION_ID_SHADOW_ENCHANT_SHOES_1:
			case CARD_REGION_ID_SHADOW_ENCHANT_SHOES_2:
			case CARD_REGION_ID_SHADOW_ENCHANT_SHOES_3:
				eqpRefined = typeof g_refinedArray != "undefined" ? g_refinedArray[EQUIP_REGION_ID_SHADOW_FOOT]: 0;
				break;
			
			case CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_1:
			case CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_2:
			case CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_3:
				eqpRefined = typeof g_refinedArray != "undefined" ? g_refinedArray[EQUIP_REGION_ID_SHADOW_ACCESSORY_1]: 0;
				break;
			
			case CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_1:
			case CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_2:
			case CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_3:
				eqpRefined = typeof g_refinedArray != "undefined" ? g_refinedArray[EQUIP_REGION_ID_SHADOW_ACCESSORY_2]: 0;
				break;
				
			default:
				eqpRefined = 0;
				eqpTranscendence = 0;
		}

		// カードのＳＰ定義をループ検索
		for(spDefIdx = 0; cardData[CARD_DATA_INDEX_SPBEGIN + spDefIdx] != 0; spDefIdx += 2) {
			var spDefPureStatusBy = 0;	// 純粋なステータスが上がる度に条件
			var spValPureStatus = 0;	// 純粋なステータスによる上昇量

			// ＳＰの定義を取得
			// spDefRemain は int の場合と BigInt の場合がある
			spDefRemain = cardData[ CARD_DATA_INDEX_SPBEGIN + spDefIdx ];
			spDefValue = cardData[ CARD_DATA_INDEX_SPBEGIN + spDefIdx + 1 ];

			// 純粋なステータスが30上がる度に条件を取得
			let base_flag = toSafeBigInt(ITEM_SP_PURE_STR_BY_30_OFFSET);
			if (spDefRemain > base_flag) {
				spDefPureStatusBy = parseInt(spDefRemain / base_flag);
				if (1 <= spDefPureStatusBy && spDefPureStatusBy <= 6) {
					spValPureStatus = Math.floor(pureStatusValue[spDefPureStatusBy - 1] / 30);
				}
				spDefRemain = parseInt(spDefRemain % base_flag);
			}

			// 装備部位を満たさない場合は、次へ
			spDefRemain = CheckSpDefEquipmentLocation(spDefRemain, cardRegionId);
			if (spDefRemain < 0) {
				continue;
			}

			// 超越段階を満たさない場合は、次へ
			spDefRemain = CheckSpDefTransendenceOver(spDefRemain, eqpTranscendence);
			if (spDefRemain < 0) {
				continue;
			}
			// --- ここから下の spDefRemain は必ず Int 型 ---

			// ＳＰ定義ＩＤが一致しない場合は、次へ
			if (!IsMatchSpDefId(spDefRemain, spid)) {
				continue;
			}

			// 親密度条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefFriendlyOver(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// BaseLv以上条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefBaseLvOver(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// BaseLvが上がる度に条件を取得
			spDefBaseLvBy = Math.floor(spDefRemain / ITEM_SP_BASE_LV_BY_1_OFFSET);
			spDefRemain = spDefRemain % ITEM_SP_BASE_LV_BY_1_OFFSET;

			// 職業条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefJobRestrict(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// 純粋なステータス条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefPureStatus(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// 純粋なステータスが上がる度に条件を取得
			if (spDefPureStatusBy == 0) {
				spDefPureStatusBy = Math.floor(spDefRemain / ITEM_SP_PURE_STR_BY_10_OFFSET);
				if (1 <= spDefPureStatusBy && spDefPureStatusBy <= 6) {
					spValPureStatus = Math.floor(pureStatusValue[spDefPureStatusBy - 1] / 10);
				}
				else if (7 == spDefPureStatusBy) {
					spValPureStatus = pureStatusValue[PARAM_DEX];
				}
				else if (8 == spDefPureStatusBy) {
					spValPureStatus = pureStatusValue[PARAM_VIT];
				}
				spDefRemain = spDefRemain % ITEM_SP_PURE_STR_BY_10_OFFSET;
			}

			// 精錬値以上条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefRefineOver(spDefRemain, eqpRefined);
			if (spDefRemain < 0) {
				continue;
			}

			// 精錬値が上がる度に条件を取得
			spDefRefineBy = Math.floor(spDefRemain / ITEM_SP_REFINE_BY_1_OFFSET);
			spDefRemain = spDefRemain % ITEM_SP_REFINE_BY_1_OFFSET;

			// 追加すべきＳＰ定義値を計算

			spValToCorrect = cardData[ CARD_DATA_INDEX_SPBEGIN + spDefIdx + 1 ];

			// 精錬値が上がる度に条件が設定されている場合
			if (spDefRefineBy > 0) {
				spValToCorrect *= Math.floor(eqpRefined / spDefRefineBy);
			}

			// 純粋なステータスが上がる度に条件が設定されている場合
			if (spDefPureStatusBy > 0) {
				spValToCorrect *= spValPureStatus;
			}

			// BaseLvが上がる度に条件が設定されている場合
			if (spDefBaseLvBy > 0) {
				spValToCorrect *= Math.floor(n_A_BaseLV / spDefBaseLvBy);
			}

			// 集計

			// リストアップの場合
			if (bListUp) {
				listUpArray.push(spValToCorrect);
			}

			// 合計値の場合
			else {
				spVal += spValToCorrect;
			}
		}
	}

	// ペット効果
	// TODO: 無効ペットＩＤは未対応
	petFuncReturn = GetEquippedSPSubSPPet(spid, null, bListUp);

	// リストアップの場合
	if (bListUp) {
		listUpArray = listUpArray.concat(petFuncReturn);
	}

	// 合計値の場合
	else {
		spVal += petFuncReturn;
	}

	// 追加発動効果の合計値を加算する
	var timeObj = 0;
	var w_num = new Array();
	// 追加発動効果の指定状況を取得
	for (idx = 0; idx < g_timeItemConf.length; idx++) {
		if (g_timeItemConfEffective[idx]) {
			w_num[idx] = g_timeItemConf[idx];
		}
		else {
			w_num[idx] = 0;
		}
	}
	// 追加発動効果の重複をチェック
	for(i = 0; i < w_num.length; i++) {
		for(j = i + 1; j < w_num.length; j++) {
			if(w_num[i] == w_num[j]) w_num[j] = 0;
		}
	}
	// 発動中の時限効果を検索して加算
	for(i = 0; i < w_num.length; i++) {

		timeObj = ITEM_SP_TIME_OBJ[w_num[i]];

		// ＳＰ定義をループ検索（とりあえず、カードの部分からコピー）
		for(spDefIdx = 0; timeObj[TIME_ITEM_DATA_INDEX_SPBEGIN + spDefIdx] != 0; spDefIdx += 2) {
			var spDefPureStatusBy = 0;	// 純粋なステータスが上がる度に条件
			var spValPureStatus = 0;	// 純粋なステータスによる上昇量

			// ＳＰの定義を取得
			// spDefRemain は int の場合と BigInt の場合がある
			spDefRemain = timeObj[ TIME_ITEM_DATA_INDEX_SPBEGIN + spDefIdx ];
			spDefValue = timeObj[ TIME_ITEM_DATA_INDEX_SPBEGIN + spDefIdx + 1 ];

			// 純粋なステータスが30上がる度に条件を取得
			let base_flag = toSafeBigInt(ITEM_SP_PURE_STR_BY_30_OFFSET);
			if (spDefRemain > base_flag) {
				spDefPureStatusBy = parseInt(spDefRemain / base_flag);
				if (1 <= spDefPureStatusBy && spDefPureStatusBy <= 6) {
					spValPureStatus = Math.floor(pureStatusValue[spDefPureStatusBy - 1] / 30);
				}
				spDefRemain = parseInt(spDefRemain % base_flag);
			}

			// 超越段階を満たさない場合は、次へ
			spDefRemain = CheckSpDefTransendenceOver(spDefRemain, eqpTranscendence);
			if (spDefRemain < 0) {
				continue;
			}
			// --- ここから下の spDefRemain は必ず Int 型 ---

			// ＳＰ定義ＩＤが一致しない場合は、次へ
			if (!IsMatchSpDefId(spDefRemain, spid)) {
				continue;
			}

			// 親密度条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefFriendlyOver(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// BaseLv以上条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefBaseLvOver(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// BaseLvが上がる度に条件を取得
			spDefBaseLvBy = Math.floor(spDefRemain / ITEM_SP_BASE_LV_BY_1_OFFSET);
			spDefRemain = spDefRemain % ITEM_SP_BASE_LV_BY_1_OFFSET;

			// 職業条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefJobRestrict(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// 純粋なステータス条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefPureStatus(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// 純粋なステータスが上がる度に条件を取得
			if (spDefPureStatusBy == 0) {
				spDefPureStatusBy = Math.floor(spDefRemain / ITEM_SP_PURE_STR_BY_10_OFFSET);
				if (1 <= spDefPureStatusBy && spDefPureStatusBy <= 6) {
					spValPureStatus = Math.floor(pureStatusValue[spDefPureStatusBy - 1] / 10);
				}
				else if (7 == spDefPureStatusBy) {
					spValPureStatus = pureStatusValue[PARAM_DEX];
				}
				else if (8 == spDefPureStatusBy) {
					spValPureStatus = pureStatusValue[PARAM_VIT];
				}
				spDefRemain = spDefRemain % ITEM_SP_PURE_STR_BY_10_OFFSET;
			}

			// 精錬値以上条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefRefineOver(spDefRemain, eqpRefined);
			if (spDefRemain < 0) {
				continue;
			}

			// 精錬値が上がる度に条件を取得
			spDefRefineBy = Math.floor(spDefRemain / ITEM_SP_REFINE_BY_1_OFFSET);
			spDefRemain = spDefRemain % ITEM_SP_REFINE_BY_1_OFFSET;

			// 追加すべきＳＰ定義値を計算

			spValToCorrect = timeObj[ TIME_ITEM_DATA_INDEX_SPBEGIN + spDefIdx + 1 ];

			// 精錬値が上がる度に条件が設定されている場合
			if (spDefRefineBy > 0) {
				spValToCorrect *= Math.floor(eqpRefined / spDefRefineBy);
			}

			// 純粋なステータスが上がる度に条件が設定されている場合
			if (spDefPureStatusBy > 0) {
				spValToCorrect *= spValPureStatus;
			}

			// BaseLvが上がる度に条件が設定されている場合
			if (spDefBaseLvBy > 0) {
				spValToCorrect *= Math.floor(n_A_BaseLV / spDefBaseLvBy);
			}

			// 集計

			// リストアップの場合
			if (bListUp) {
				listUpArray.push(spValToCorrect);
			}

			// 合計値の場合
			else {
				spVal += spValToCorrect;
			}
		}
	}


	// 結果を戻す
	if (bListUp) {
		return listUpArray
	}

	else {
		return spVal;
	}
}

/**
 * 装備中のＳＰの合計値を取得する（ペットのみ）.
 * @param spid ＳＰのＩＤ
 * @param invalidPetIdArray 効果無効のペットＩＤ配列
 * @param bListUp リストアップするかのフラグ
 * @return 当該ＳＰのパラメタ合計値
 */
export function GetEquippedSPSubSPPet(spid, invalidPetIdArray, bListUp) {

	var spVal = 0;
	var spDefValue = 0;

	var petId = 0;
	var petData = 0;
	var friendlity = 0;

	var spDefIdx = 0;

	var eqpRefined = 0;

	var spDefIdMod = 0;			// 特殊条件を取り除いたＳＰのＩＤ
	var spDefRemain = 0;		// 計算途中のＳＰＩＤ値
	var spDefFriendly = 0;		// 親密度条件
	var spDefBaseLvOver = 0;	// BaseLv以上条件
	var spDefBaseLvBy = 0;		// BaseLvが上がる度に条件
	var spDefJobRestrict = 0;	// 職業制限
	var spDefPureStatus = 0;	// 純粋なステータス条件
	var spDefRefineOver = 0;	// 精錬値以上条件
	var spDefRefineBy = 0;		// 精錬値が上がる度に条件
	var pureStatusValue = [SU_STR, SU_AGI, SU_VIT, SU_INT, SU_DEX, SU_LUK];
	var spValToCorrect = 0;
	var listUpArray = new Array();


	// 装備中のペットデータから、ペットデータを取得
	petId = n_A_PassSkill8[0];
	petData = PET_OBJ[petId];

	// 効果が無効のペットでないかを検査
	if (invalidPetIdArray) {
		if (invalidPetIdArray.indexOf(petId) >= 0) {

			// 結果を戻す
			if (bListUp) {
				return listUpArray
			}

			else {
				return spVal;
			}
		}
	}


	// 精錬値は０
	eqpRefined = 0;

	// ペットのＳＰ定義をループ検索
	for (spDefIdx = 0; petData[PET_DATA_INDEX_SPBEGIN + spDefIdx] != 0; spDefIdx += 2) {
		var spDefPureStatusBy = 0;	// 純粋なステータスが上がる度に条件
		var spValPureStatus = 0;

		// ＳＰの定義を取得
		spDefRemain = petData[ PET_DATA_INDEX_SPBEGIN + spDefIdx ];
		spDefValue = petData[ PET_DATA_INDEX_SPBEGIN + spDefIdx + 1 ];

		// 純粋なステータスが30上がる度に条件を取得
		let base_flag = toSafeBigInt(ITEM_SP_PURE_STR_BY_30_OFFSET);
		if (spDefRemain > base_flag) {
			spDefPureStatusBy = parseInt(spDefRemain / base_flag);
			if (1 <= spDefPureStatusBy && spDefPureStatusBy <= 6) {
				spValPureStatus = Math.floor(pureStatusValue[spDefPureStatusBy - 1] / 30);
			}
			spDefRemain = parseInt(spDefRemain % base_flag);
		}

		// --- ここから下の spDefRemain は必ず Int 型 ---

		// ＳＰ定義ＩＤが一致しない場合は、次へ
		if (!IsMatchSpDefId(spDefRemain, spid)) {
			continue;
		}

		// 親密度条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefFriendlyOver(spDefRemain);
		if (spDefRemain < 0) {
			continue;
		}

		// BaseLv以上条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefBaseLvOver(spDefRemain);
		if (spDefRemain < 0) {
			continue;
		}

		// BaseLvが上がる度に条件を取得
		spDefBaseLvBy = Math.floor(spDefRemain / ITEM_SP_BASE_LV_BY_1_OFFSET);
		spDefRemain = spDefRemain % ITEM_SP_BASE_LV_BY_1_OFFSET;

		// 職業条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefJobRestrict(spDefRemain);
		if (spDefRemain < 0) {
			continue;
		}

		// 純粋なステータス条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefPureStatus(spDefRemain);
		if (spDefRemain < 0) {
			continue;
		}

		// 純粋なステータスが上がる度に条件を取得
		if (spDefPureStatusBy == 0) {
			spDefPureStatusBy = Math.floor(spDefRemain / ITEM_SP_PURE_STR_BY_10_OFFSET);
			if (1 <= spDefPureStatusBy && spDefPureStatusBy <= 6) {
				spValPureStatus = Math.floor(pureStatusValue[spDefPureStatusBy - 1] / 10);
			}
			else if (7 == spDefPureStatusBy) {
				spValPureStatus = pureStatusValue[PARAM_DEX];
			}
			else if (8 == spDefPureStatusBy) {
				spValPureStatus = pureStatusValue[PARAM_VIT];
			}
			spDefRemain = spDefRemain % ITEM_SP_PURE_STR_BY_10_OFFSET;
		}

		// 精錬値以上条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefRefineOver(spDefRemain, eqpRefined);
		if (spDefRemain < 0) {
			continue;
		}

		// 精錬値が上がる度に条件を取得
		spDefRefineBy = Math.floor(spDefRemain / ITEM_SP_REFINE_BY_1_OFFSET);
		spDefRemain = spDefRemain % ITEM_SP_REFINE_BY_1_OFFSET;

		// 追加すべきＳＰ定義値を計算

		spValToCorrect = petData[ PET_DATA_INDEX_SPBEGIN + spDefIdx + 1 ];

		// 精錬値が上がる度に条件が設定されている場合
		if (spDefRefineBy > 0) {
			spValToCorrect *= Math.floor(eqpRefined / spDefRefineBy);
		}

		// 純粋なステータスが上がる度に条件が設定されている場合
		if (spDefPureStatusBy > 0) {
			spValToCorrect *= spValPureStatus;
		}

		// BaseLvが上がる度に条件が設定されている場合
		if (spDefBaseLvBy > 0) {
			spValToCorrect *= Math.floor(n_A_BaseLV / spDefBaseLvBy);
		}

		// 集計

		// リストアップの場合
		if (bListUp) {
			listUpArray.push(spValToCorrect);
		}

		// 合計値の場合
		else {
			spVal += spValToCorrect;
		}
	}


	// 結果を戻す
	if (bListUp) {
		return listUpArray
	}

	else {
		return spVal;
	}
}

/**
 * 装備中のＳＰの合計値を取得する（衣装のみ）.
 * @param spid ＳＰのＩＤ
 * @return 当該ＳＰのパラメタ合計値
 */
export function GetEquippedTotalSPCostume(spid) {

	var eqpRegionId = 0;
	var spDefIdx = 0;
	var spDefValue = 0;

	var eqpRefined = 0;

	var spDefIdMod = 0;			// 特殊条件を取り除いたＳＰのＩＤ
	var spDefRemain = 0;		// 計算途中のＳＰＩＤ値
	var spDefBaseLvOver = 0;	// BaseLv以上条件
	var spDefBaseLvBy = 0;		// BaseLvが上がる度に条件
	var spDefJobRestrict = 0;	// 職業制限
	var spDefPureStatus = 0;	// 純粋なステータス条件
	var spDefRefineOver = 0;	// 精錬値以上条件
	var spDefRefineBy = 0;		// 精錬値が上がる度に条件

	var pureStatusValue = [SU_STR, SU_AGI, SU_VIT, SU_INT, SU_DEX, SU_LUK];
	var spVal = 0;
	var costumeData = 0;


	// 全ての装備箇所をループ
	for(eqpRegionId = 0; eqpRegionId <= COSTUME_REGION_ID_ACCESSORY_2; eqpRegionId++) {

		// 装備データからアイテムデータを取得
		costumeData = CostumeOBJ[n_A_costume[eqpRegionId]];

		// 装備箇所ごとに、精錬値を特定する
		switch (eqpRegionId) {

		default:
			eqpRefined = 0;

		}

		// アイテムのＳＰ定義をループ検索
		for (spDefIdx = 0; costumeData[ COSTUME_DATA_INDEX_SPBEGIN + spDefIdx ] != ITEM_SP_END; spDefIdx += 2) {

			// ＳＰの定義を取得
			spDefRemain = costumeData[ COSTUME_DATA_INDEX_SPBEGIN + spDefIdx ];
			spDefValue = costumeData[ COSTUME_DATA_INDEX_SPBEGIN + spDefIdx + 1 ];

			// ＳＰ定義ＩＤが一致しない場合は、次へ
			if (!IsMatchSpDefId(spDefRemain, spid)) {
				continue;
			}

			// 親密度条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefFriendlyOver(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// BaseLv以上条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefBaseLvOver(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// BaseLvが上がる度に条件を取得
			spDefBaseLvBy = Math.floor(spDefRemain / ITEM_SP_BASE_LV_BY_1_OFFSET);
			spDefRemain = spDefRemain % ITEM_SP_BASE_LV_BY_1_OFFSET;

			// 職業条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefJobRestrict(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// 純粋なステータス条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefPureStatus(spDefRemain);
			if (spDefRemain < 0) {
				continue;
			}

			// 精錬値以上条件を満たさない場合は、次へ
			spDefRemain = CheckSpDefRefineOver(spDefRemain, eqpRefined);
			if (spDefRemain < 0) {
				continue;
			}

			// 精錬値が上がる度に条件を取得
			spDefRefineBy = Math.floor(spDefRemain / ITEM_SP_REFINE_BY_1_OFFSET);
			spDefRemain = spDefRemain % ITEM_SP_REFINE_BY_1_OFFSET;

			// ＳＰ定義値を追加する

			// 精錬値が上がる度に条件が設定されている場合
			if (spDefRefineBy > 0) {
				// BaseLvが上がる度に条件が設定されている場合
				if (spDefBaseLvBy > 0) {
					spVal += costumeData[ COSTUME_DATA_INDEX_SPBEGIN + spDefIdx + 1 ] * Math.floor(eqpRefined / spDefRefineBy) * Math.floor(n_A_BaseLV / spDefBaseLvBy);
				}
				else {
					spVal += costumeData[ COSTUME_DATA_INDEX_SPBEGIN + spDefIdx + 1 ] * Math.floor(eqpRefined / spDefRefineBy);
				}
			}

			// 精錬値によらず一定の場合
			else {
				// BaseLvが上がる度に条件が設定されている場合
				if (spDefBaseLvBy > 0) {
					spVal += costumeData[ COSTUME_DATA_INDEX_SPBEGIN + spDefIdx + 1 ] * Math.floor(n_A_BaseLV / spDefBaseLvBy);
				}
				else {
					spVal += costumeData[ COSTUME_DATA_INDEX_SPBEGIN + spDefIdx + 1 ];
				}
			}
		}

	}

	return spVal;
}

/**
 * arrow.dat.js で定義されている矢のアイテムデータを参照して
 * キャラクタに攻撃力や攻撃属性を加算する
 * @param {Number} spid {ITEM_SP_ELEMENTAL | ITEM_SP_ATK_PLUS}
 * @param {Array} mobdata (optional) 属性自動矢の判定に利用する
 * @returns アイテムSPの値
 */
export function GetEquippedTotalSPArrow(spid, mobData) {
	let spDefIdx = 0;
	let eqpRefined = 0;
	let spDefRemain = 0;		// 計算途中のＳＰＩＤ値
	let spDefValue = 0;			// 設定されているＳＰの値
	let spDefBaseLvBy = 0;		// BaseLvが上がる度に条件
	let spDefRefineBy = 0;		// 精錬値が上がる度に条件
	let spVal = 0;
	let arrowData = 0;
	/** 属性配列 */
	const mostEffectiveElmIdArray = [
		ELM_ID_VANITY,
		ELM_ID_WIND,
		ELM_ID_FIRE,
		ELM_ID_WATER,
		ELM_ID_EARTH,
		ELM_ID_HOLY,
		ELM_ID_DARK,
		ELM_ID_HOLY,
		ELM_ID_PSYCO,
		ELM_ID_HOLY,
	];
	// 矢データを取得
	arrowData = ArrowOBJNew[n_A_Arrow];

	// 属性自動矢の場合
	if (spid === ITEM_SP_ELEMENTAL && mobData !== undefined) {
		if (arrowData[0] === ARROW_ID_ZOKUSE_ZIDO_YA_ATK30) {
			return mostEffectiveElmIdArray[ Math.floor(mobData[MONSTER_DATA_INDEX_ELEMENT] / 10) ];
		}
	}

	// アイテムのＳＰ定義をループ検索
	for (spDefIdx = 0; arrowData[ ARROW_DATA_INDEX_SPBEGIN + spDefIdx ] != ITEM_SP_END; spDefIdx += 2) {
		// ＳＰの定義を取得
		spDefRemain = arrowData[ ARROW_DATA_INDEX_SPBEGIN + spDefIdx ];
		spDefValue = arrowData[ ARROW_DATA_INDEX_SPBEGIN + spDefIdx + 1 ];
		// ＳＰ定義ＩＤが一致しない場合は、次へ
		if (!IsMatchSpDefId(spDefRemain, spid)) {
			continue;
		}
		// 親密度条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefFriendlyOver(spDefRemain);
		if (spDefRemain < 0) {
			continue;
		}
		// BaseLv以上条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefBaseLvOver(spDefRemain);
		if (spDefRemain < 0) {
			continue;
		}
		// BaseLvが上がる度に条件を取得
		spDefBaseLvBy = Math.floor(spDefRemain / ITEM_SP_BASE_LV_BY_1_OFFSET);
		spDefRemain = spDefRemain % ITEM_SP_BASE_LV_BY_1_OFFSET;
		// 職業条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefJobRestrict(spDefRemain);
		if (spDefRemain < 0) {
			continue;
		}
		// 純粋なステータス条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefPureStatus(spDefRemain);
		if (spDefRemain < 0) {
			continue;
		}
		// 精錬値以上条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefRefineOver(spDefRemain, eqpRefined);
		if (spDefRemain < 0) {
			continue;
		}
		// 精錬値が上がる度に条件を取得
		spDefRefineBy = Math.floor(spDefRemain / ITEM_SP_REFINE_BY_1_OFFSET);
		spDefRemain = spDefRemain % ITEM_SP_REFINE_BY_1_OFFSET;
		// ＳＰ定義値を追加する
		// 精錬値が上がる度に条件が設定されている場合
		if (spDefRefineBy > 0) {
			// BaseLvが上がる度に条件が設定されている場合
			if (spDefBaseLvBy > 0) {
				spVal += spDefValue * Math.floor(eqpRefined / spDefRefineBy) * Math.floor(n_A_BaseLV / spDefBaseLvBy);
			}
			else {
				spVal += spDefValue * Math.floor(eqpRefined / spDefRefineBy);
			}
		}
		// 精錬値によらず一定の場合
		else {
			// BaseLvが上がる度に条件が設定されている場合
			if (spDefBaseLvBy > 0) {
				spVal += spDefValue * Math.floor(n_A_BaseLV / spDefBaseLvBy);
			}
			else {
				spVal += spDefValue;
			}
		}
	}
	return spVal;
}

/**
 * アイテムに設定されたフラグ付きＳＰ定義ＩＤが、指定のＳＰＩＤに適合するかを検査する.
 */
export function IsMatchSpDefId(itemSpId, targetSpId) {

	var spDefIdMod = 0;

	spDefIdMod = itemSpId;
	spDefIdMod = spDefIdMod % ITEM_SP_REFINE_BY_1_OFFSET;

	return (spDefIdMod == targetSpId);
}

/**
 * アイテムに設定されたフラグ付きＳＰ定義ＩＤが、親密度条件に適合するかを検査する.
 * @param {*} spDefRemain 
 * @returns 残りのItemSP(適合する場合), -1(適合しない場合)
 */
export function CheckSpDefFriendlyOver(spDefRemain) {

	var friendlity = n_A_PassSkill8[17];	// 0=未設定(親しい), 1=逃亡寸前, 2=疎疎しい, 3=気まずい, 4=普通, 5=親しい, 6=きわめて親しい

	if (friendlity == 0) {
		// 「未設定」の場合は「親しい」で上書き
		friendlity = 5;
	}
	if (Math.floor(spDefRemain / ITEM_SP_PET_FRIENDLY_OVER_HIGHEST) > 0) {
		// Item SP が「きわめて親しい以上」
		if (friendlity < 6) {
			// 親密度が「きわめて親しい」より低い
			return -1;
		}
		return spDefRemain % ITEM_SP_PET_FRIENDLY_OVER_HIGHEST;
	}
	else if (Math.floor(spDefRemain / ITEM_SP_PET_FRIENDLY_OVER_HIGH) > 0) {
		// Item SP が「親しい以上」
		if (friendlity < 5) {
			// 親密度が「親しい」より低い
			return -1;
		}
		return spDefRemain % ITEM_SP_PET_FRIENDLY_OVER_HIGH;
	}

	// 親密度条件が設定されていない場合はそのまま返す
	return spDefRemain;
}

/**
 * アイテムに設定されたフラグ付きＳＰ定義ＩＤが、BaseLv以上条件に適合するかを検査する.
 */
export function CheckSpDefBaseLvOver(spDefRemain) {

	var spDefCondition = 0;
	var spDefBase = ITEM_SP_BASE_LV_OVER_170_OFFSET;

	// 条件を取得
	spDefCondition = Math.floor(spDefRemain / spDefBase);

	// 条件を検査し、満たさない場合は -1 を返す
	switch (spDefCondition) {
	case 1:
		if (n_A_BaseLV < 170) {
			return -1;
		}
		break;
	case 2:
		if (n_A_BaseLV < 100) {
			return -1;
		}
		break;
	case 3:
		if (n_A_BaseLV > 99) {
			return -1;
		}
		break;
	case 4:
		if (n_A_BaseLV < 175) {
			return -1;
		}
		break;
	case 5:
		if (n_A_BaseLV < 250) {
			return -1;
		}
		break;
	case 6:
		if (n_A_BaseLV < 260) {
			return -1;
		}
		break;
	case 7:
		if (n_A_BaseLV < 165) {
			return -1;
		}
		break;
	}

	// 条件を満たす場合は、残りのＳＰ定義値を返す
	return (spDefRemain % spDefBase);
}

/**
 * アイテムに設定されたフラグ付きＳＰ定義ＩＤが、職業条件に適合するかを検査する.
 */
export function CheckSpDefJobRestrict(spDefRemain) {

	var spDefCondition = 0;
	var spDefBase = ITEM_SP_JOB_RESTRICT_NOVICE_OFFSET;

	// 条件を取得
	spDefCondition = Math.floor(spDefRemain / spDefBase) - 1;

	// 条件を検査し、満たさない場合は -1 を返す
	if (spDefCondition >= 0) {
		if (!IsSameJobClass(spDefCondition)) {
			return -1;
		}
	}

	// 条件を満たす場合は、残りのＳＰ定義値を返す
	return (spDefRemain % spDefBase);
}

/**
 * アイテムに設定されたフラグ付きＳＰ定義ＩＤが、純粋なステータス条件に適合するかを検査する.
 */
export function CheckSpDefPureStatus(spDefRemain) {
	const spDefBase = ITEM_SP_PURE_STR_90_OFFSET;
	// アイテムSP条件取得
	let spDefCondition = Math.floor(spDefRemain / spDefBase);
	if (spDefCondition === 0) {
		// 条件が設定されていない場合はそのまま返す
		return spDefRemain;
	}
	// 純粋なステータスを取得
	const pureStatusValue = [SU_STR, SU_AGI, SU_VIT, SU_INT, SU_DEX, SU_LUK];	// 基本ステータス [SU_STR, SU_AGI, SU_VIT, SU_INT, SU_DEX, SU_LUK]
	const pureSpStatusValue = g_pureStatus.slice(6, 12);						// 特性ステータス [SU_POW, SU_STA, SU_WIS, SU_SPL, SU_CON, SU_CRT]
	const idxStatus = (spDefCondition - 1) % 6;									// ステータス識別用の添字 0 ～ 5 を得る
	// 条件を満たす場合 true
	let boolResult = false;
	if (spDefCondition >= 61) {
		// 純粋な特性ステータスが110以上の場合 (1 - 6)
		boolResult = pureSpStatusValue[idxStatus] >= 110;
	} else if (spDefCondition >= 55) {
		// 純粋な特性ステータスが50以上の場合 (55 - 60)
		boolResult = pureSpStatusValue[idxStatus] >= 50;
	} else if (spDefCondition >= 49) {
		// 純粋なステータスが100以上の場合 (49 - 54)
		boolResult = pureStatusValue[idxStatus] >= 100;
	} else if (spDefCondition >= 43) {
		// 純粋な特性ステータスが100以上の場合 (43 - 48)
		boolResult = pureSpStatusValue[idxStatus] >= 100;
	} else if (spDefCondition >= 37) {
		// 純粋なステータスが130以上の場合 (37 - 42)
		boolResult = pureStatusValue[idxStatus] >= 130;
	} else if (spDefCondition >= 31) {
		// 純粋なステータスが80以上の場合 (31 - 36)
		boolResult = pureStatusValue[idxStatus] >= 80;		
	} else if (spDefCondition >= 25) {
		// 純粋なステータスが110以上の場合 (25 - 30)
		boolResult = pureStatusValue[idxStatus] >= 110;
	} else if (spDefCondition >= 19) {
		// 純粋なステータスが125以上の場合 (19 - 24)
		boolResult = pureStatusValue[idxStatus] >= 125;
	} else if (spDefCondition >= 13) {
		// 純粋なステータスが120以上の場合 (13 - 18)
		boolResult = pureStatusValue[idxStatus] >= 120;
	} else if (spDefCondition >= 7) {
		// 純粋なステータスが108以上の場合 (7 - 12)
		boolResult = pureStatusValue[idxStatus] >= 108;
	} else if (spDefCondition >= 1) {
		// 純粋なステータスが90以上の場合 (1 - 6)
		boolResult = pureStatusValue[idxStatus] >= 90;
	}
	// 判定結果
	if (boolResult) {
		// 指定ステータスが条件を満たす場合は残りの値を返す
		return (spDefRemain % spDefBase);
	} else {
		// 条件を満たさない場合
		return -1;
	}
}

/**
 * アイテムに設定されたフラグ付きＳＰ定義ＩＤが、精錬値以上条件に適合するかを検査する.
 */
export function CheckSpDefRefineOver(spDefRemain, eqpRefined) {

	var spDefCondition = 0;
	var spDefBase = ITEM_SP_REFINE_OVER_1_OFFSET;

	// 条件を取得
	spDefCondition = Math.floor(spDefRemain / spDefBase);

	// 条件を検査し、満たさない場合は -1 を返す
	if (eqpRefined < spDefCondition) {
		return -1;
	}

	// 条件を満たす場合は、残りのＳＰ定義値を返す
	return (spDefRemain % spDefBase);
}

/**
 * アイテムの超越段階が「超越段階が◯以上のとき」を満たしているか検査する
 * @param {*} spDefRemain フラグ付きアイテムSP（BitInt の場合と Int の場合がある）
 * @param {0, 1, 2, 3, 4} eqpTranscendence 超越段階
 * @returns 
 */
export function CheckSpDefTransendenceOver(spDefRemain, eqpTranscendence) {
	var baseFlag, requireTranscendence;
	// 超越条件が指定されている場合
	baseFlag = toSafeBigInt(ITEM_SP_TRANSCENDENCE_1);
	if (spDefRemain >= baseFlag) {
		// BigInt の場合、小数点以下が自動的に切り捨てられる
		requireTranscendence = parseInt(spDefRemain / baseFlag);
		// 超越条件を満たす場合
		if (eqpTranscendence >= requireTranscendence) {
			return parseInt(spDefRemain % baseFlag);
		}
		// 超越条件を満たさない場合
		return -1;
	}
	// 超越条件が指定されていない場合
	return spDefRemain;	
}

/**
 * アイテムの装備部位が「◯◯に装備しているとき」を満たしているか検査する.
 * 現状ではカードだけチェックしている.
 * 拡張したければ超越段階を参考にして呼び出し元を増やしてください.
 * @param {Number} spDefRemain フラグ付きアイテムSP（BitInt の場合と Int の場合がある）
 * @param {*} location 実際に装備している部位
 * @returns 
 */
export function CheckSpDefEquipmentLocation(spDefRemain, location) {
	var baseFlag, requireEquipLocation;
	// アイテムSPで装備部位が指定されている場合
	baseFlag = toSafeBigInt(ITEM_SP_EQUIPMENT_LOCATION_BODY);
	if (spDefRemain >= baseFlag) {
		// BigInt の場合、小数点以下が自動的に切り捨てられる
		requireEquipLocation = parseInt(spDefRemain / baseFlag);
		switch(requireEquipLocation) {
			case 1:	// 鎧
				switch(location) {
					case CARD_REGION_ID_BODY:
					case CARD_REGION_ID_ENCHANT_BODY_1:
					case CARD_REGION_ID_ENCHANT_BODY_2:
					case CARD_REGION_ID_ENCHANT_BODY_3:
						return parseInt(spDefRemain % baseFlag);
				}
				break;
			case 2:	// 肩にかける物
				switch(location) {
					case CARD_REGION_ID_SHOULDER:
					case CARD_REGION_ID_ENCHANT_SHOULDER_1:
					case CARD_REGION_ID_ENCHANT_SHOULDER_2:
					case CARD_REGION_ID_ENCHANT_SHOULDER_3:
						return parseInt(spDefRemain % baseFlag);
				}
				break;
			case 3:	// 靴
				switch(location) {
					case CARD_REGION_ID_SHOES:
					case CARD_REGION_ID_ENCHANT_SHOES_1:
					case CARD_REGION_ID_ENCHANT_SHOES_2:
					case CARD_REGION_ID_ENCHANT_SHOES_3:
						return parseInt(spDefRemain % baseFlag);
				}
				break;
			case 4:	// アクセサリー
				switch(location) {
					case CARD_REGION_ID_ACCESSORY_1:
					case CARD_REGION_ID_ENCHANT_ACCESSORY_1_1:
					case CARD_REGION_ID_ENCHANT_ACCESSORY_1_2:
					case CARD_REGION_ID_ENCHANT_ACCESSORY_1_3:
					case CARD_REGION_ID_ACCESSORY_2:
					case CARD_REGION_ID_ENCHANT_ACCESSORY_2_1:
					case CARD_REGION_ID_ENCHANT_ACCESSORY_2_2:
					case CARD_REGION_ID_ENCHANT_ACCESSORY_2_3:
						return parseInt(spDefRemain % baseFlag);
				}
				break;
			case 5:	// 兜中段
				switch(location) {
					case CARD_REGION_ID_HEAD_MID:
						return parseInt(spDefRemain % baseFlag);
				}
				break;
		}
		// 実際の装備部位が条件を満たさない場合
		return -1;
	}
	// アイテムSPで装備部位が指定されていない場合
	return spDefRemain;	
}

