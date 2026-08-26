/**
 * StAllCalc「ＡＴＫの算出」セクションの分割（Phase 2b）。
 *
 * Phase 2（.claude/context/remaining-work.md「残作業 1」）で `//==== ○○＋△△％　ここから`
 * バナーの約50セクションを切り出した際、`ここから` を使わない別書式のバナー
 * （基礎値算出パート）が調査対象から漏れていた。本ファイルはその1つ。
 * 本文はバイト単位で不変（スクラッチ変数のみローカル再宣言）。
 */
import { n_A_PassSkill4, UsedSkillSearch, n_A_PassSkill8 } from '../../../ro4/m/js/skillstate.js';
import { GetLowerJobSeriesID } from '../../../ro4/m/js/data/mig.job.h.js';
import { g_confDataSanzi, n_Nitou } from '../../../ro4/m/js/global.js';
import { ApplyElementRatio } from '../../../ro4/m/js/head.js';
import { n_A_ActiveSkill, n_A_ActiveSkillLV, n_tok } from '../../../ro4/m/js/ro4-state.js';
import { CCharaConfSanzi } from './CCharaConfSanzi.js';
import { CExtraInfoAreaComponentManager } from './CExtraInfoAreaComponentManager.js';
import { GetStatusModifyAtkPlus } from './chara.js';
import {
    CHARA_DATA_INDEX_LEFT_ATK, CHARA_DATA_INDEX_REFINE_ATK, CHARA_DATA_INDEX_STATUS_ATK,
    CHARA_DATA_INDEX_STATUS_ATK_GX, CHARA_DATA_INDEX_WEAPON_ATK
} from './const/EnumCharaDataIndex.js';
import {
    ITEM_KIND_BOW, ITEM_KIND_GATLINGGUN, ITEM_KIND_GRENADEGUN, ITEM_KIND_HANDGUN, ITEM_KIND_MUSICAL, ITEM_KIND_RIFLE,
    ITEM_KIND_SHOTGUN, ITEM_KIND_WHIP
} from './const/EnumItemKind.js';
import { ITEM_SP_ATK_PLUS } from './const/EnumItemSpId.js';
import { JOB_ID_TAEGWON } from './const/EnumJobId.js';
import { zokusei } from './etc.js';
import {
    n_A_BodyZokusei, n_A_DEX, n_A_JOB, n_A_LUK, n_A_STR, n_A_Weapon2LV_seirenATK, n_A_Weapon2_ATK, n_A_WeaponLV,
    n_A_WeaponLV_seirenATK, n_A_WeaponType, n_A_Weapon_ATK, n_A_WeaponZokusei,
} from './roro-state.js';
import { SKILL_ID_ENVENOM, SKILL_ID_POISON_REACT, SKILL_ID_TENKETSU_HAN } from './skill.dat.js';
import { ROUNDDOWN } from './foot-bridge.js';

export function ApplyPlayerAtkBase(charaData, mobData) {
	let sklLv = 0;
//================================================================================================
// ＡＴＫの算出
//================================================================================================

	//----------------------------------------------------------------
	// ステータスＡＴＫの算出
	//----------------------------------------------------------------
	var statusAtk = 0;
	var statusAtkGX = 0;

	switch (n_A_WeaponType) {

	// ＤＥＸ依存武器
	case ITEM_KIND_BOW:
	case ITEM_KIND_MUSICAL:
	case ITEM_KIND_WHIP:
	case ITEM_KIND_HANDGUN:
	case ITEM_KIND_RIFLE:
	case ITEM_KIND_SHOTGUN:
	case ITEM_KIND_GATLINGGUN:
	case ITEM_KIND_GRENADEGUN:
		statusAtk = n_A_DEX + n_A_STR / 5 + n_A_LUK / 3;
		break;

	// ＳＴＲ依存武器
	default:
		statusAtk = n_A_STR + n_A_DEX / 5 + n_A_LUK / 3;
		break;
	}

	statusAtk = Math.floor(statusAtk);

	// ＧＸ反動ダメージ用ＡＴＫ
	statusAtkGX = statusAtk;
	statusAtkGX += ROUNDDOWN(statusAtkGX * zokusei[n_A_BodyZokusei * 10 +1][0] / 100);

	// 計算した結果をキャラクターデータに保存
	charaData[CHARA_DATA_INDEX_STATUS_ATK] = statusAtk;
	charaData[CHARA_DATA_INDEX_STATUS_ATK_GX] = statusAtkGX;

	//----------------------------------------------------------------
	// 精錬ＡＴＫの算出
	//----------------------------------------------------------------
	var refineAtk = 0;

	// 精錬による効果
	refineAtk += n_A_WeaponLV_seirenATK;

	// 「三次職支援　ストライキング」による、効果
	if (sklLv = g_confDataSanzi[CCharaConfSanzi.CONF_ID_STRIKING]) {
		refineAtk += (8 + 2 * sklLv) * n_A_WeaponLV + 5 * g_confDataSanzi[CCharaConfSanzi.CONF_ID_STRIKINGYO_FUYOSKILL_LEVEL_GOKEI];
	}

	// 「修羅　点穴 -反-」による、効果
	var valStr = 0;
	var valDex = 0;
	if (sklLv = UsedSkillSearch(SKILL_ID_TENKETSU_HAN)) {

		// 持ち替え支援の場合、支援欄のステータスを使用
		if(n_A_PassSkill4[11] == 2) {
			valStr = n_A_PassSkill4[30];
			valDex = n_A_PassSkill4[34];
		}

		// 持ち替えなし場合、本人のステータスを使用
		else {
			valStr = n_A_STR;
			valDex = n_A_DEX;
		}

		refineAtk += Math.floor((Math.floor(valStr / 2) + Math.floor(valDex / 4)) * sklLv / 5);
	}

	// 計算した結果をキャラクターデータに保存
	charaData[CHARA_DATA_INDEX_REFINE_ATK] = refineAtk;

	//----------------------------------------------------------------
	// 装備ＡＴＫの算出
	//----------------------------------------------------------------

	// アイテム特性
	n_tok[ITEM_SP_ATK_PLUS] += n_tok[244];

	// 装備追加効果、支援効果
	n_tok[ITEM_SP_ATK_PLUS] += GetStatusModifyAtkPlus();

	// 計算した結果をキャラクターデータに保存
	charaData[CHARA_DATA_INDEX_WEAPON_ATK] = n_A_Weapon_ATK;

	// 拡張表示用にデータを保存
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_ATK_PLUS, n_tok[ITEM_SP_ATK_PLUS]);

	//----------------------------------------------------------------
	// 左手ＡＴＫの算出
	//----------------------------------------------------------------

	var leftAtk = 0;
	if (n_Nitou) {
		leftAtk = n_A_Weapon2_ATK + n_A_Weapon2LV_seirenATK;
	}

	// 計算した結果をキャラクターデータに保存
	charaData[CHARA_DATA_INDEX_LEFT_ATK] = leftAtk;

	//----------------------------------------------------------------
	// ステータス欄に表示されない効果の適用
	//----------------------------------------------------------------

	// 暖かい風
	if (n_A_PassSkill8[19] == 0) {
		if (GetLowerJobSeriesID(n_A_JOB) == JOB_ID_TAEGWON) {
			statusAtk = ApplyElementRatio(mobData, statusAtk, n_A_WeaponZokusei);
		}
		else {
			statusAtk = ApplyElementRatio(mobData, statusAtk, 0);
		}
	}
	else {
		if (GetLowerJobSeriesID(n_A_JOB) != JOB_ID_TAEGWON) {
			statusAtk = ApplyElementRatio(mobData, statusAtk, n_A_WeaponZokusei);
		}
		else {
			statusAtk = ApplyElementRatio(mobData, statusAtk, 0);
		}
	}

	// インベナム使用時のＡＴＫ補正
	if (n_A_ActiveSkill == SKILL_ID_ENVENOM) {
		n_tok[ITEM_SP_ATK_PLUS] += 15 * n_A_ActiveSkillLV;
	}

	// ポイズンリアクト（反撃）使用時のＡＴＫ補正
	if ((n_A_ActiveSkill == SKILL_ID_POISON_REACT)) {
		if ((51 <= mobData[18]) && (mobData[18] < 60)) {
			n_tok[ITEM_SP_ATK_PLUS] += 75;
		}
	}

}
