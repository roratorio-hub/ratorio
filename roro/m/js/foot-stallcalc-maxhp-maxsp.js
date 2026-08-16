/**
 * StAllCalc「ＭａｘＨＰ算出」「ＭａｘＳＰ算出」セクションの分割（Phase 2b）。
 * 経緯は foot-stallcalc-atk-base.js の JSDoc を参照。本文はバイト単位で不変。
 */
import { UsedSkillSearch } from '../../../ro4/m/js/BuffJobSpecificSelf.js';
import { n_A_PassSkill8 } from '../../../ro4/m/js/BuffOtherCategory.js';
import { GetHPBase, GetSPBase } from '../../../ro4/m/js/data/mig.job.h.js';
import { n_A_BaseLV, n_tok } from '../../../ro4/m/js/ro4-state.js';
import { CExtraInfoAreaComponentManager } from './CExtraInfoAreaComponentManager.js';
import {
    GetStatusModifyMaxHpPlus, GetStatusModifyMaxHpUp, GetStatusModifyMaxSpPlus, GetStatusModifyMaxSpUp,
    TimeItemNumSearch
} from './chara.js';
import { CHARA_DATA_INDEX_MAXHP, CHARA_DATA_INDEX_MAXSP } from './const/EnumCharaDataIndex.js';
import {
    ITEM_SP_ALLSTATUS_PLUS, ITEM_SP_INT_PLUS, ITEM_SP_MAXHP_PLUS, ITEM_SP_MAXHP_PLUS_GVGTE, ITEM_SP_MAXHP_UP,
    ITEM_SP_MAXSP_PLUS, ITEM_SP_MAXSP_PLUS_GVGTE, ITEM_SP_MAXSP_UP, ITEM_SP_VIT_PLUS
} from './const/EnumItemSpId.js';
import { JOB_ID_TAEGWON } from './const/EnumJobId.js';
import { GetEquippedTotalSPEquip } from './foot-equipped-sp.js';
import { n_A_INT, n_A_JOB, n_A_JobLV, n_A_VIT } from './roro-state.js';
import { SKILL_ID_BERSERK, SKILL_ID_INSPIRATION, SKILL_ID_TAEGWON_RANKER } from './skill.dat.js';
import {
    TIME_ITEM_ID_DEMI_FREYA, TIME_ITEM_ID_MAKENSHI_SAKRAY_CARD, TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD
} from './timeitem.dat.js';
import { ROUNDDOWN } from './foot-bridge.js';

export function ApplyPlayerMaxHpMaxSp(charaData) {
	let vartmp = 0;
//================================================================================================
// ＭａｘＨＰ算出
//================================================================================================

	//----------------------------------------------------------------
	// ＨＰの基礎値を取得
	//----------------------------------------------------------------
	var maxHp = 0;
	maxHp = GetHPBase(n_A_JOB, n_A_BaseLV, n_A_PassSkill8[13]);

	// テコンランカーの３倍補正（拳聖以上は効果なし）
	if ((n_A_JOB == JOB_ID_TAEGWON) && (n_A_BaseLV >= 90)) {
		if (UsedSkillSearch(SKILL_ID_TAEGWON_RANKER)) {
			maxHp = maxHp * 3;
		}
	}

	// インスピレーション計算用のバックアップを作成しておく
	var RG_HP_BackUP = 0;
	RG_HP_BackUP = maxHp;

	//----------------------------------------------------------------
	// ＶＩＴによる補正
	//----------------------------------------------------------------

	// インスピレーションのＶＩＴ補正は、基礎ＨＰ増加量に影響を与えない
	var vitForCalc = n_A_VIT;
	if (UsedSkillSearch(SKILL_ID_INSPIRATION)
		|| TimeItemNumSearch(TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD)
		|| TimeItemNumSearch(TIME_ITEM_ID_DEMI_FREYA)
		|| TimeItemNumSearch(TIME_ITEM_ID_MAKENSHI_SAKRAY_CARD)
		) {
		vitForCalc -= ROUNDDOWN(n_A_BaseLV / 10 + n_A_JobLV / 5);
	}
	maxHp += ROUNDDOWN(maxHp * vitForCalc / 100);

	
	//----------------------------------------------------------------
	// 装備、支援等による補正（＋○○）
	//----------------------------------------------------------------
	var maxHpPlus = 0;

	// アイテム特性
	maxHpPlus += n_tok[ITEM_SP_MAXHP_PLUS];
	maxHpPlus += n_tok[ITEM_SP_MAXHP_PLUS_GVGTE];

	// 装備によるＶＩＴ上昇分は、ＨＰも同量増加させる
	maxHpPlus += GetEquippedTotalSPEquip(ITEM_SP_VIT_PLUS);
	maxHpPlus += GetEquippedTotalSPEquip(ITEM_SP_ALLSTATUS_PLUS);


	// 装備追加効果、支援効果
	maxHpPlus += GetStatusModifyMaxHpPlus();

	// 拡張表示用にデータを保存
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_MAXHP_PLUS, maxHpPlus);

	// 最終的な効果を適用
	maxHp += maxHpPlus;
	if (maxHp < 1) maxHp = 1;


	//----------------------------------------------------------------
	// 装備、支援等による補正（＋％）
	//----------------------------------------------------------------
	var maxHpPerUp = 0;

	// アイテム特性
	maxHpPerUp += n_tok[ITEM_SP_MAXHP_UP];

	// 装備追加効果、支援効果
	maxHpPerUp += GetStatusModifyMaxHpUp();

	// 拡張表示用にデータを保存
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_MAXHP_UP, maxHpPerUp);

	// 最終的な効果を適用
	maxHp += maxHp * maxHpPerUp / 100;


	//----------------------------------------------------------------
	// ロイヤルガード　インスピレーション使用時の特殊計算
	//----------------------------------------------------------------
	if (UsedSkillSearch(SKILL_ID_INSPIRATION)) {

		// インスピレーションの効果が無い状態で、インスピレーションによる上昇量を算出
		// ここの計算で maxHp の値を使うので、一度に計算できない
		vartmp = ROUNDDOWN(UsedSkillSearch(SKILL_ID_INSPIRATION) * (600 + maxHp / 20));

		// バックアップしておいたＨＰを元に、インスピレーションの効果込みでＨＰを再計算
		maxHp = RG_HP_BackUP;
		maxHp += ROUNDDOWN(maxHp * n_A_VIT / 100);
		maxHp += maxHpPlus + vartmp;		// ここで、インスピレーションのＨＰ上昇を適用
		maxHp += ROUNDDOWN(maxHp * maxHpPerUp / 100);
	}
	else if (
		TimeItemNumSearch(TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD)
		|| TimeItemNumSearch(TIME_ITEM_ID_DEMI_FREYA)
		|| TimeItemNumSearch(TIME_ITEM_ID_MAKENSHI_SAKRAY_CARD)
		) {

		// インスピレーションの効果が無い状態で、インスピレーションによる上昇量を算出
		// ここの計算で maxHp の値を使うので、一度に計算できない
		vartmp = ROUNDDOWN(1 * (600 + maxHp / 20));

		// バックアップしておいたＨＰを元に、インスピレーションの効果込みでＨＰを再計算
		maxHp = RG_HP_BackUP;
		maxHp += ROUNDDOWN(maxHp * n_A_VIT / 100);
		maxHp += maxHpPlus + vartmp;		// ここで、インスピレーションのＨＰ上昇を適用
		maxHp += ROUNDDOWN(maxHp * maxHpPerUp / 100);
	}


	//----------------------------------------------------------------
	// 特殊補正
	//----------------------------------------------------------------

	// バーサーク
	if (UsedSkillSearch(SKILL_ID_BERSERK)) maxHp *= 3;


	//----------------------------------------------------------------
	// 小数点以下切り落とし
	//----------------------------------------------------------------
	maxHp = Math.floor(maxHp);


	//----------------------------------------------------------------
	// 計算した結果をキャラクターデータに保存
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_MAXHP] = maxHp;

//================================================================================================
// ＭａｘＳＰ算出
//================================================================================================

	//----------------------------------------------------------------
	// ＳＰの基礎値を取得
	//----------------------------------------------------------------
	var maxSp = 0;

	maxSp = GetSPBase(n_A_JOB, n_A_BaseLV, n_A_PassSkill8[13]);

	// テコンランカーの３倍補正（拳聖以上は効果なし）
	if ((n_A_JOB == JOB_ID_TAEGWON) && (n_A_BaseLV >= 90)) {
		if (UsedSkillSearch(SKILL_ID_TAEGWON_RANKER)) {
			maxSp = maxSp * 3;
		}
	}

	//----------------------------------------------------------------
	// ＩＮＴによる補正
	//----------------------------------------------------------------
	maxSp += ROUNDDOWN(maxSp * n_A_INT / 100);

	//----------------------------------------------------------------
	// 装備、支援等による補正（＋○○）
	//----------------------------------------------------------------
	var maxSpPlus = 0;

	// アイテム特性
	maxSpPlus += n_tok[ITEM_SP_MAXSP_PLUS];
	maxSpPlus += n_tok[ITEM_SP_MAXSP_PLUS_GVGTE];

	// 装備によるＩＮＴ上昇分は、ＳＰも同量増加させる
	maxSpPlus += GetEquippedTotalSPEquip(ITEM_SP_INT_PLUS);
	maxSpPlus += GetEquippedTotalSPEquip(ITEM_SP_ALLSTATUS_PLUS);


	// 装備追加効果、支援効果
	maxSpPlus += GetStatusModifyMaxSpPlus();

	// 拡張表示用にデータを保存
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_MAXSP_PLUS, maxSpPlus);

	// 最終的な効果を適用
	maxSp += maxSpPlus;
	if(maxSp <0) maxSp = 0;

	//----------------------------------------------------------------
	// 装備、支援等による補正（＋％）
	//----------------------------------------------------------------
	var maxSpPerUp = 0;

	// アイテム特性
	maxSpPerUp += n_tok[ITEM_SP_MAXSP_UP];

	// 装備追加効果、支援効果
	maxSpPerUp += GetStatusModifyMaxSpUp();

	// 拡張表示用にデータを保存
	CExtraInfoAreaComponentManager.dispDataMap.set(ITEM_SP_MAXSP_UP, maxSpPerUp);

	// 最終的な効果を適用
	maxSp += Math.floor(maxSp * maxSpPerUp / 100);

	//----------------------------------------------------------------
	// 計算した結果をキャラクターデータに保存
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_MAXSP] = maxSp;

//================================================================================================
}
