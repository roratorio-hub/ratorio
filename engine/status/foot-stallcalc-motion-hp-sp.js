/**
 * StAllCalc セクション分割: モーションディレイ・HP回復力＋○○・SP回復力＋○○。
 *
 * foot.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 */
import { n_A_PassSkill7, UsedSkillSearch } from "../skill/skillstate.js";
import { GetLowerJobSeriesID, IsSameJobClass } from "../data/mig.job.h.js";
import {
    g_confDataDebuff, g_confDataSanzi, g_objCharaConfCustomStatus, set_g_VariableCastTimeRate
} from "../runtime/global.js";
import { n_A_ActiveSkill, n_Delay, n_tok } from "../runtime/ro4-state.js";
import { CCharaConfCustomStatus } from "../chara/CCharaConfCustomStatus.js";
import { CCharaConfDebuff } from "../chara/CCharaConfDebuff.js";
import { CCharaConfSanzi } from "../chara/CCharaConfSanzi.js";
import { CARD_ID_VIRGO } from "../equip/card.dat.js";
import { CardNumSearch, EquipNumSearch, TimeItemNumSearch } from "../chara/chara.js";
import { CARD_REGION_ID_HEAD_MID, CARD_REGION_ID_HEAD_TOP, CARD_REGION_ID_HEAD_TOP_ANY } from "../runtime/common.js";
import {
    CHARA_DATA_INDEX_ASPD, CHARA_DATA_INDEX_CAST_PARAM, CHARA_DATA_INDEX_COMBO_PARAM, CHARA_DATA_INDEX_FIXED_TIME,
    CHARA_DATA_INDEX_HPR, CHARA_DATA_INDEX_MAXHP, CHARA_DATA_INDEX_MAXSP, CHARA_DATA_INDEX_SPR,
    CHARA_DATA_INDEX_SPR_STOP
} from "../const/EnumCharaDataIndex.js";
import { ITEM_SP_HPR_UP, ITEM_SP_SKILL_DELAY_DOWN, ITEM_SP_SPR_UP } from "../const/EnumItemSpId.js";
import { JOB_ID_ARCBISHOP } from "../const/EnumJobId.js";
import { getFixedCastTimeReductionRate } from "./foot-avoid-flee.js";
import { getDelayTimeReductionRate, getVariableCastTimeRate } from "./foot-cast-delay.js";
import { GetRndOptTotalValue } from "../equip/hmrndopt.js";
import { ITEM_ID_DIVA_ROBE, ITEM_ID_KAWAII_KUSANO_NECKLACE, ITEM_ID_MIRRORAGE_ROBE } from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    SU_LUK, n_A_AGI, n_A_BODY_DEF_PLUS, n_A_DEX, n_A_HEAD_DEF_PLUS, n_A_INT, n_A_JOB, n_A_SHOES_DEF_PLUS, n_A_VIT,
    n_A_card
} from "../runtime/roro-state.js";
import {
    SKILL_ID_BAKURETSU_HADO, SKILL_ID_EBI_PARTY, SKILL_ID_EBI_ZANMAI, SKILL_ID_ENVENOM, SKILL_ID_GROOMING,
    SKILL_ID_MAGURO_SHIELD, SKILL_ID_MAXIMIZE_POWER, SKILL_ID_MEDITATIO, SKILL_ID_METEOR_ASSALT,
    SKILL_ID_NATURE_VIGOUR, SKILL_ID_NODOWO_NARASU, SKILL_ID_OTORO, SKILL_ID_SANDANSHO, SKILL_ID_SANDAN_DELAY_ZOKA,
    SKILL_ID_SENRYU_SHOTEN, SKILL_ID_SHINSENNA_EBI, SKILL_ID_TENKETSU_KATSU
} from "../skill/skill.dat.js";
import { TIME_ITEM_ID_RING_OF_FLAME_LORD, TIME_ITEM_ID_VNDER_CANMER_BAKURETSU_HADO } from "../equip/timeitem.dat.js";
import { ROUNDDOWN } from "../bridge/foot-bridge.js";


export function ApplyMotionDelay(charaData) {
    let sandanDelay = 0;

//==== モーションディレイ　ここから
//====
//================================================================================================================================
//================================================================================================================================

		var aspdDelay = 0;
		aspdDelay = (200 - Math.floor(charaData[CHARA_DATA_INDEX_ASPD])) / 50;
		n_Delay[1] = Math.floor(aspdDelay * 1000)/1000;
		if (n_A_ActiveSkill == SKILL_ID_ENVENOM) {
			n_Delay[1] = Math.floor(aspdDelay *75)/100;
		}
		// TODO: 要検証項目
		if (n_A_ActiveSkill == SKILL_ID_METEOR_ASSALT) {
			if (n_Delay[1] <= 0.14) {
				n_Delay[1] = 0.12;
			}
		}
		sandanDelay = 0;
		if (n_A_ActiveSkill === 0) {
			if (Math.max(LearnedSkillSearch(SKILL_ID_SANDANSHO), UsedSkillSearch(SKILL_ID_SANDANSHO)) > 0) {
				sandanDelay = (1000 - n_A_AGI *4 - n_A_DEX *2) /1000;
				if (sandanDelay < 0) {
					sandanDelay = 0;
				}
				if (sandanDelay < n_Delay[1]) {
					sandanDelay = n_Delay[1];
				}
				if (UsedSkillSearch(SKILL_ID_SANDAN_DELAY_ZOKA)) {
					sandanDelay += 0.3;
				}
			}
		}
		charaData[CHARA_DATA_INDEX_COMBO_PARAM] = Math.max(0, n_A_AGI) * 4 + Math.max(0, n_A_DEX) * 2;

		// 詠唱ステータスを計算する
		charaData[CHARA_DATA_INDEX_CAST_PARAM] = Math.max(0, n_A_DEX) + Math.max(0, n_A_INT) / 2;

		// 変動詠唱時間の割合減少効果を適用する
		set_g_VariableCastTimeRate(getVariableCastTimeRate());

		// 固定詠唱時間の軽減率をセットする
		charaData[CHARA_DATA_INDEX_FIXED_TIME] = getFixedCastTimeReductionRate();

		// スキルディレイの割合減少効果を適用する.
	    n_tok[ITEM_SP_SKILL_DELAY_DOWN] = getDelayTimeReductionRate();

//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyHpRecoveryUp(charaData) {
    let vartmp = 0, confval = 0, itemCount = 0, idx = 0;

//==== ＨＰ回復力＋○○　ここから
//====
//================================================================================================================================
//================================================================================================================================

		var hpr = 0;

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_HPR_UP; idx <= ITEM_SP_HPR_UP; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		hpr = Math.floor(n_A_VIT /5) + Math.floor(charaData[CHARA_DATA_INDEX_MAXHP] /200);
		if(hpr <1) hpr = 1;
		var w = 0;
		w += n_tok[75];
		if(SU_LUK >= 77) w += 100 * CardNumSearch(221);
		if(GetLowerJobSeriesID(n_A_JOB)==41 && EquipNumSearch(672)) w += 3;
		if(SU_LUK >= 55 && EquipNumSearch(1632)) w += 30;
		if(n_A_SHOES_DEF_PLUS <= 4 && CardNumSearch(407)) w += 5;
		if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(2122)){
			w += 25;
			if(n_A_HEAD_DEF_PLUS >= 9) w += 25;
			if(n_A_HEAD_DEF_PLUS >= 10) w += 25;
		}
		if(n_A_HEAD_DEF_PLUS >= 1 && EquipNumSearch(2165)) w += 4 * n_A_HEAD_DEF_PLUS;
		if(EquipNumSearch(2407)) w += 10 * n_A_SHOES_DEF_PLUS;
		if(n_A_BODY_DEF_PLUS >= 7 && EquipNumSearch(2412)) w -= 100;

		//----------------------------------------------------------------
		// 「ディーヴァローブ」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_DIVA_ROBE)) > 0) {
			vartmp = 0;

			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 10;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 20;

			w += vartmp * itemCount;
		}


		//----------------------------------------------------------------
		// 「三次職支援　エビパーティー」の効果
		//----------------------------------------------------------------
		if (g_confDataSanzi[CCharaConfSanzi.CONF_ID_EBI_PARTY]
			&& g_confDataSanzi[CCharaConfSanzi.CONF_ID_EBI_PARTY_TAMASHI_LEVEL]) {
			w += 30;
		}


		if(n_A_PassSkill7[25]) w += 3;
		if(n_A_PassSkill7[23]) w += 20;


		//----------------------------------------------------------------
		// 「修羅　点穴 -活-」の効果
		//----------------------------------------------------------------
		if (UsedSkillSearch(SKILL_ID_TENKETSU_KATSU)) {
			w += 50 + 30 * UsedSkillSearch(SKILL_ID_TENKETSU_KATSU);
		}

		//----------------------------------------------------------------
		// 「修羅　潜龍昇天」の効果
		//----------------------------------------------------------------
		if (UsedSkillSearch(SKILL_ID_SENRYU_SHOTEN)) {
			w -= 100;
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_HPR_UP);
		if (confval != 0) {
			w += confval;
		}


		var w2 = Math.floor(n_A_VIT /5);
		w2 = (w2 + charaData[CHARA_DATA_INDEX_MAXHP] / 200) * w / 100;
		hpr += w2;
		hpr = ROUNDDOWN(hpr);
		if(g_confDataDebuff[CCharaConfDebuff.CONF_ID_POISON]) hpr = 0;


		//----------------------------------------------------------------
		// 計算した結果をキャラクターデータに保存
		//----------------------------------------------------------------
		charaData[CHARA_DATA_INDEX_HPR] = hpr;


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplySpRecoveryUp(charaData) {
    let vartmp = 0, confval = 0, sklLv = 0, itemCount = 0, cardCount = 0, idx = 0;

//==== ＳＰ回復力＋○○　ここから
//====
//================================================================================================================================
//================================================================================================================================

		var spr = 0;

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_SPR_UP; idx <= ITEM_SP_SPR_UP; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		spr = Math.floor(n_A_INT /6) + Math.floor(charaData[CHARA_DATA_INDEX_MAXSP] /100) +1;

		var w = 0;

		w += n_tok[76];

		if(SU_LUK >= 77) w += 100 * CardNumSearch(221);
		if(GetLowerJobSeriesID(n_A_JOB)==41 && EquipNumSearch(673)) w += 3;
		if(SU_LUK >= 55 && EquipNumSearch(1632)) w += 30;
		if(n_A_HEAD_DEF_PLUS <= 4 && n_A_card[CARD_REGION_ID_HEAD_TOP]==179) w += 5;
		if(n_A_card[CARD_REGION_ID_HEAD_MID]==179) w += 5;
		if(n_A_SHOES_DEF_PLUS <= 4 && CardNumSearch(407)) w += 5;
		if(EquipNumSearch(1119) && GetLowerJobSeriesID(n_A_JOB)==5) w += 5;
		if(n_A_PassSkill7[25]) w += 3;
		if(n_A_BODY_DEF_PLUS >= 7 && EquipNumSearch(1105)) w += 10;
		if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(2122)){
			w += 25;
			if(n_A_HEAD_DEF_PLUS >= 9) w += 25;
			if(n_A_HEAD_DEF_PLUS >= 10) w += 25;
		}
		if(n_A_HEAD_DEF_PLUS >= 1 && EquipNumSearch(2165)) w += 4 * n_A_HEAD_DEF_PLUS;
		if(EquipNumSearch(2283)) w += n_A_HEAD_DEF_PLUS;

		//----------------------------------------------------------------
		// 「ミラージュローブ」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MIRRORAGE_ROBE)) > 0) {
			vartmp = 0;

			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 10;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 20;

			w += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「ヴァルゴ」の、精錬による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_VIRGO, CARD_REGION_ID_HEAD_TOP_ANY)) > 0) {
			// アークビショップ限定の効果
			if (IsSameJobClass(JOB_ID_ARCBISHOP)) {
				w += 2 * n_A_HEAD_DEF_PLUS * cardCount;
			}
		}

		//----------------------------------------------------------------
		// 「可愛い草のネックレス」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KAWAII_KUSANO_NECKLACE)) > 0) {

			sklLv = 0;

			sklLv += LearnedSkillSearch(SKILL_ID_SHINSENNA_EBI);
			sklLv += LearnedSkillSearch(SKILL_ID_EBI_ZANMAI);
			sklLv += LearnedSkillSearch(SKILL_ID_OTORO);
			sklLv += LearnedSkillSearch(SKILL_ID_MAGURO_SHIELD);
			sklLv += LearnedSkillSearch(SKILL_ID_GROOMING);
			sklLv += LearnedSkillSearch(SKILL_ID_NODOWO_NARASU);
			sklLv += LearnedSkillSearch(SKILL_ID_EBI_PARTY);

			w += 10 * ROUNDDOWN(sklLv / 5) * itemCount;
		}


		//----------------------------------------------------------------
		// 「ハイプリースト　メディタティオ」の効果
		//----------------------------------------------------------------
		w += Math.max(LearnedSkillSearch(SKILL_ID_MEDITATIO), UsedSkillSearch(SKILL_ID_MEDITATIO)) * 3;

		//----------------------------------------------------------------
		// 「パッシブ持続系　潜龍昇天」の、効果
		// 「パッシブ持続系　爆裂波動」の、効果
		// 「時限アイテム　ヴンダーカンマー（爆裂波動）」の、効果
		// 「時限アイテム　リングオブフレームロード（爆裂波動）」の、効果
		//----------------------------------------------------------------
		if (UsedSkillSearch(SKILL_ID_SENRYU_SHOTEN)) {
			w -= 100;
		}
		else if (UsedSkillSearch(SKILL_ID_BAKURETSU_HADO)){
			w -= 50;
		}
		else if (TimeItemNumSearch(TIME_ITEM_ID_VNDER_CANMER_BAKURETSU_HADO)
				|| TimeItemNumSearch(TIME_ITEM_ID_RING_OF_FLAME_LORD)) {
			w -= 50;
		}

		//----------------------------------------------------------------
		// 「三次職支援　エビパーティー」の効果
		//----------------------------------------------------------------
		switch (g_confDataSanzi[CCharaConfSanzi.CONF_ID_EBI_PARTY]) {
		case 1:
			w += 20;
			break;
		case 2:
			w += 50;
			break;
		case 3:
			w += 100;
			break;
		case 4:
			w += 200;
			break;
		case 5:
			w += 300;
			break;
		}

		/** ドルイド「ネイチャーヴィゴール」の SP自然回復量 + 効果 */
		w += 30 * LearnedSkillSearch(SKILL_ID_NATURE_VIGOUR);

		if(n_A_PassSkill7[24]) w += 20;

		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomStatus.GetConf(CCharaConfCustomStatus.CONF_ID_SPR_UP);
		if (confval != 0) {
			w += confval;
		}


		spr += ROUNDDOWN(spr * w / 100);
		if(n_A_INT>=120) spr += Math.floor((n_A_INT-120)/2) +4;
		if(g_confDataDebuff[CCharaConfDebuff.CONF_ID_POISON]) spr = 0;


		//----------------------------------------------------------------
		// 計算した結果をキャラクターデータに保存
		//----------------------------------------------------------------
		charaData[CHARA_DATA_INDEX_SPR] = spr;
		// SP自然回復停止フラグ
		if (UsedSkillSearch(SKILL_ID_MAXIMIZE_POWER) || n_A_PassSkill7[40]) {
			charaData[CHARA_DATA_INDEX_SPR_STOP] = 1;
		}
		else {
			charaData[CHARA_DATA_INDEX_SPR_STOP] = 0;
		}


}
