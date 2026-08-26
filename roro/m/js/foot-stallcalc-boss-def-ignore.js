/**
 * StAllCalc セクション分割: ボス/一般モンスター被ダメージ軽減・状態異常耐性・DEF無視。
 *
 * foot.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 */
import { UsedSkillSearch } from '../../../ro4/m/js/skillstate.js';
import { GetLowerJobSeriesID, IsSameJobClass, JOB_SERIES_ID_MERCHANT } from '../../../ro4/m/js/data/mig.job.h.js';
import { g_objCharaConfCustomAtk, g_objCharaConfCustomDef } from '../../../ro4/m/js/global.js';
import { n_A_BaseLV, n_tok } from '../../../ro4/m/js/ro4-state.js';
import { CCharaConfCustomAtk } from './CCharaConfCustomAtk.js';
import { CCharaConfCustomDef } from './CCharaConfCustomDef.js';
import {
    CARD_SET_ID_ENCHANT_ZODIAC_TENKATSUKYUNO_CROWN, CARD_SET_ID_ENCHANT_ZODIAC_ZINBAKYUNO_CROWN
} from './card.dat.js';
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG } from './chara.js';
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT } from './const/EnumEquipRegionId.js';
import {
    ITEM_SP_IGNORE_DEF_ALL, ITEM_SP_IGNORE_DEF_BOSS, ITEM_SP_IGNORE_DEF_RACE_ALL, ITEM_SP_IGNORE_DEF_RACE_ANIMAL,
    ITEM_SP_IGNORE_DEF_RACE_DEMON, ITEM_SP_IGNORE_DEF_RACE_DRAGON, ITEM_SP_IGNORE_DEF_RACE_HUMAN,
    ITEM_SP_IGNORE_DEF_RACE_PLANT, ITEM_SP_IGNORE_DEF_RACE_SOLID, ITEM_SP_IGNORE_DEF_RACE_UNDEAD,
    ITEM_SP_RESIST_BOSS, ITEM_SP_RESIST_NOTBOSS
} from './const/EnumItemSpId.js';
import { JOB_ID_GILOTINCROSS, JOB_ID_RANGER, JOB_ID_SUMMONER } from './const/EnumJobId.js';
import { ApplyHealRecoveryUp, ApplyResistBadStatus } from './foot-resist-heal.js';
import { GetRndOptTotalValue } from './hmrndopt.js';
import {
    ITEM_ID_AKUMANO_TE, ITEM_ID_AMANOZYAKUNO_KIMEN, ITEM_ID_BLUTO_CLEAVER, ITEM_ID_BLUTO_DUMASCUS,
    ITEM_ID_BLUTO_FUMASHURIKEN, ITEM_ID_BLUTO_GATLINGGUN, ITEM_ID_BLUTO_GRENADEGUN, ITEM_ID_BLUTO_GUITAR,
    ITEM_ID_BLUTO_HANDGUN, ITEM_ID_BLUTO_HUNTER_BOW, ITEM_ID_BLUTO_KATAR, ITEM_ID_BLUTO_MORNINGSTAR,
    ITEM_ID_BLUTO_RARIET, ITEM_ID_BLUTO_RIFLE, ITEM_ID_BLUTO_SHOTGUN, ITEM_ID_BLUTO_SPEAR, ITEM_ID_END_OF_THE_WORLD,
    ITEM_ID_FAFNIR_HELM, ITEM_ID_FIFTH_ELEMENT, ITEM_ID_FUSHICHONO_KANMURI, ITEM_ID_GRACE_CULTIVATION_COAT,
    ITEM_ID_GRACE_HOLY_ROBE, ITEM_ID_ILLUSION_HUNTER_BOW, ITEM_ID_ILLUSION_MILITARY_BOOTS,
    ITEM_ID_ILLUSION_SOSHOKUYO_HANA, ITEM_ID_IMPERIAL_BOOTS, ITEM_ID_IMPERIAL_CULTIVATION_COAT,
    ITEM_ID_IMPERIAL_HOLY_ROBE, ITEM_ID_JAGUAR_NOTE, ITEM_ID_KISHINNO_MEIYU, ITEM_ID_KORYUNO_TENYOKU,
    ITEM_ID_KUROITOODOSHI_DOMARU, ITEM_ID_MOKOFUWA_SHARK_PAJAMA, ITEM_ID_NORTHERN_CROSS, ITEM_ID_POWERED_WING,
    ITEM_ID_RISUMIMI_HOODBO, ITEM_ID_SHIKENKAN_BOOTS, ITEM_ID_SHIKKOUSHANO_SHOES, ITEM_ID_TSUIGEKISHANO_SHOES,
    ITEM_ID_TURTLE_FOX_TAIL, ITEM_ID_WOLF_OFFICER_HAT, ITEM_ID_YOMANO_SASAYAKI, ITEM_ID_ZIRKFREEDNO_KABUTO,
    ITEM_ID_ZYASPER_CIRCLET, ITEM_SET_ID_ENCHANT_ZODIAC_DAKITSUKI_SYAMNEKO,
    ITEM_SET_ID_FRONTIER_BOOTS_DAISHIZENNO_GUITAR, ITEM_SET_ID_FRONTIER_BOOTS_DAISHIZENNO_ROPE,
    ITEM_SET_ID_FRONTIER_BOOTS_FUMASHURIKEN_HANAFUBUKI, ITEM_SET_ID_FRONTIER_BOOTS_KOINNO_TSURUHASHI,
    ITEM_SET_ID_FROZVITNIRNO_KUSARI_VANARGANDNO_KABUTO, ITEM_SET_ID_FUSHIGINA_HATO_WALHALLA_IDOL,
    ITEM_SET_ID_GIGANT_BOOTS_GIGANT_LANCE, ITEM_SET_ID_GIGANT_BOOTS_GIGANT_SHIELD,
    ITEM_SET_ID_ILLUSION_NEKKETSU_HACHIMAKI_ILLUSION_RENGEKINO_TSUME, ITEM_SET_ID_KUGUTSUNO_UDEWA_DARK_HAND,
    ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_TSUCHI, ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_TSUCHI_S2
} from './item.dat.js';
import { LearnedSkillSearch } from './learnedskill.js';
import {
    SU_LUK, n_A_BODY_DEF_PLUS, n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_JOB, n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS,
    n_A_Weapon2_ATKplus, n_A_Weapon_ATKplus
} from './roro-state.js';
import {
    SKILL_ID_AIMED_BOLT, SKILL_ID_COUNTER_SLASH, SKILL_ID_DEATH_BOUND, SKILL_ID_DRAGON_HOWLING, SKILL_ID_ESCAPE,
    SKILL_ID_HALLUCINATION_WALK, SKILL_ID_ILLUSION_DOOPING, SKILL_ID_MACE_SHUREN, SKILL_ID_MAGMA_ILLUPTION,
    SKILL_ID_NODOWO_NARASU, SKILL_ID_NUTRAL_BARRIER, SKILL_ID_NYANTOMO_KAMESETSU, SKILL_ID_PINGPOINT_ATTACK,
    SKILL_ID_PSYCHIC_WAVE, SKILL_ID_RECOGNIZED_SPELL, SKILL_ID_SANREI_ITTAI, SKILL_ID_SECRAMENT,
    SKILL_ID_SENRYU_SHOTEN, SKILL_ID_SPECIAL_PHARMACY, SKILL_ID_UNTIMATERIAL_BLAST
} from './skill.dat.js';
import { ROUNDDOWN } from './foot-bridge.js';


export function ApplyBossDamageDownPercent() {
    let vartmp = 0, confval = 0, itemCount = 0, idx = 0, i = 0;

//==== ボスモンスターから受けるダメージ－○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_RESIST_BOSS; idx <= ITEM_SP_RESIST_BOSS; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		if(EquipNumSearch(1030)){
			n_tok[77] -= (5 * EquipNumSearch(1030));
			n_tok[79] -= (5 * EquipNumSearch(1030));
		}
		if(n_A_HEAD_DEF_PLUS >= 6 && EquipNumSearch(1650)) n_tok[79] += n_A_HEAD_DEF_PLUS - 5;
		if(EquipNumSearch(1627)){
			if(n_A_Weapon_ATKplus >= 5) n_tok[79] -= 5;
			if(n_A_Weapon_ATKplus >= 7) n_tok[79] -= 5;
		}
		if(EquipNumSearch(1748) || EquipNumSearch(1749)) n_tok[77] += Math.floor(n_A_SHIELD_DEF_PLUS / 3);
		if(EquipNumSearch(1754) || EquipNumSearch(1755)) n_tok[77] += Math.floor(n_A_BODY_DEF_PLUS / 2);

		//----------------------------------------------------------------
		// 「ギガントブーツ　ランスセット」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_LANCE)) {
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_RESIST_BOSS] += 20;
			if (n_A_Weapon_ATKplus >= 9) n_tok[ITEM_SP_RESIST_BOSS] += 30;
		}

		//----------------------------------------------------------------
		// 「ギガントブーツ　シールドセット」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_SHIELD)) {
			if (n_A_SHIELD_DEF_PLUS >= 7) n_tok[ITEM_SP_RESIST_BOSS] += 2;
			if (n_A_SHIELD_DEF_PLUS >= 9) n_tok[ITEM_SP_RESIST_BOSS] += 3;
		}

		//----------------------------------------------------------------
		// 「皇竜の天翼」の、職業による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_KORYUNO_TENYOKU)) {
			if (GetLowerJobSeriesID(n_A_JOB) == JOB_SERIES_ID_MERCHANT) {
				n_tok[ITEM_SP_RESIST_NOTBOSS] += 3;
				n_tok[ITEM_SP_RESIST_BOSS] += 5;
			}
		}

		//----------------------------------------------------------------
		// 「ジークフリードの兜」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ZIRKFREEDNO_KABUTO)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 6) vartmp += 5;
			if (n_A_HEAD_DEF_PLUS >= 8) vartmp += 10;

			n_tok[ITEM_SP_RESIST_BOSS] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「フロンティアブーツ　鉱員のつるはしセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_KOINNO_TSURUHASHI)) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 7) {
					n_tok[ITEM_SP_RESIST_BOSS] += 30 * itemCount;
				}
				if (n_A_Weapon_ATKplus >= 9) {
					n_tok[ITEM_SP_RESIST_BOSS] += 20 * itemCount;
				}
			}
		}

		//----------------------------------------------------------------
		// 「フロンティアブーツ　風魔手裏剣・花吹雪セット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_FUMASHURIKEN_HANAFUBUKI)) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 7) {
					n_tok[ITEM_SP_RESIST_BOSS] += 30 * itemCount;
				}
				if (n_A_Weapon_ATKplus >= 9) {
					n_tok[ITEM_SP_RESIST_BOSS] += 20 * itemCount;
				}
			}
		}

		//----------------------------------------------------------------
		// 「パワードウィング」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_POWERED_WING)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NUTRAL_BARRIER) >= 3) {
				n_tok[ITEM_SP_RESIST_BOSS] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「インペリアルホーリーローブ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_HOLY_ROBE)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SECRAMENT) >= 5) {
				n_tok[ITEM_SP_RESIST_BOSS] += 2 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「グレースホーリーローブ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_HOLY_ROBE)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SECRAMENT) >= 5) {
				n_tok[ITEM_SP_RESIST_BOSS] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ノーザンクロス」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_NORTHERN_CROSS)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_RECOGNIZED_SPELL) >= 5) {
				n_tok[ITEM_SP_RESIST_BOSS] += 20 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ファフニールヘルム」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_FAFNIR_HELM)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_DRAGON_HOWLING) >= 5) {
				n_tok[ITEM_SP_RESIST_BOSS] += 20 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ウルフオフィサーハット」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_WOLF_OFFICER_HAT)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_AIMED_BOLT) >= 10) {
				n_tok[ITEM_SP_RESIST_BOSS] += 20 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「もこふわシャークパジャマ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MOKOFUWA_SHARK_PAJAMA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NODOWO_NARASU) >= 5) {
				n_tok[ITEM_SP_RESIST_BOSS] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　人馬宮のクラウン」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_ZINBAKYUNO_CROWN)) {
			if (IsSameJobClass(JOB_ID_RANGER)) {
				n_tok[ITEM_SP_RESIST_BOSS] += 2 * n_A_HEAD_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　天蝎宮のクラウン」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_TENKATSUKYUNO_CROWN)) {
			if (IsSameJobClass(JOB_ID_GILOTINCROSS)) {
				n_tok[ITEM_SP_RESIST_BOSS] += 2 * n_A_HEAD_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「鬼神の盟友」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KISHINNO_MEIYU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SENRYU_SHOTEN) >= 10) {
				n_tok[ITEM_SP_RESIST_BOSS] += 20 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「エンドオブザワールド」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_END_OF_THE_WORLD)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_HALLUCINATION_WALK) >= 5) {
				n_tok[ITEM_SP_RESIST_BOSS] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「フィフスエレメント」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_FIFTH_ELEMENT)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_PSYCHIC_WAVE) >= 5) {
				n_tok[ITEM_SP_RESIST_BOSS] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「妖魔のささやき」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_YOMANO_SASAYAKI)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_HALLUCINATION_WALK) >= 5) {
				n_tok[ITEM_SP_RESIST_BOSS] += 20 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「抱きつきシャムネコ＋ゾディアックセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_DAKITSUKI_SYAMNEKO)) > 0) {
			if (IsSameJobClass(JOB_ID_SUMMONER)) {
				n_tok[ITEM_SP_RESIST_BOSS] += 2 * n_A_HEAD_DEF_PLUS * itemCount;
			}
		}

		// [タートルフォックステイル] の [にゃん友 -亀設-] 習得による効果
		itemCount = EquipNumSearch(ITEM_ID_TURTLE_FOX_TAIL);
		if (UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0 || LearnedSkillSearch(SKILL_ID_NYANTOMO_KAMESETSU) > 0) {
			n_tok[ITEM_SP_RESIST_BOSS] += 10 * itemCount;
		}

		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomDef.GetConf(CCharaConfCustomDef.CONF_ID_RESIST_BOSS);
		if (confval != 0) {
			for (i = ITEM_SP_RESIST_BOSS; i <= ITEM_SP_RESIST_BOSS; i++) {
				n_tok[i] += confval;
			}
		}


//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyNormalMonsterDamageDownPercent() {
    let confval = 0, itemCount = 0, idx = 0, i = 0;

//==== 一般モンスターから受けるダメージ－○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_RESIST_NOTBOSS; idx <= ITEM_SP_RESIST_NOTBOSS; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


		//----------------------------------------------------------------
		// 「フロンティアブーツ　大自然のギターセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_DAISHIZENNO_GUITAR)) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 9) {
					n_tok[ITEM_SP_RESIST_NOTBOSS] += 10 * itemCount;
				}
			}
		}

		//----------------------------------------------------------------
		// 「フロンティアブーツ　大自然のロープセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_DAISHIZENNO_ROPE)) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 9) {
					n_tok[ITEM_SP_RESIST_NOTBOSS] += 10 * itemCount;
				}
			}
		}

		//----------------------------------------------------------------
		// 「インペリアルカルティベイションコート」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_CULTIVATION_COAT)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_ILLUSION_DOOPING) >= 5) {
				n_tok[ITEM_SP_RESIST_NOTBOSS] += 2 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「グレースカルティベイションコート」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_GRACE_CULTIVATION_COAT)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_ILLUSION_DOOPING) >= 5) {
				n_tok[ITEM_SP_RESIST_NOTBOSS] += 7 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ファフニールヘルム」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_FAFNIR_HELM)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_DRAGON_HOWLING) >= 5) {
				n_tok[ITEM_SP_RESIST_NOTBOSS] += 20 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「エンドオブザワールド」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_END_OF_THE_WORLD)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_HALLUCINATION_WALK) >= 5) {
				n_tok[ITEM_SP_RESIST_NOTBOSS] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「フィフスエレメント」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_FIFTH_ELEMENT)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_PSYCHIC_WAVE) >= 5) {
				n_tok[ITEM_SP_RESIST_NOTBOSS] += 5 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「妖魔のささやき」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_YOMANO_SASAYAKI)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_HALLUCINATION_WALK) >= 5) {
				n_tok[ITEM_SP_RESIST_NOTBOSS] += 20 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomDef.GetConf(CCharaConfCustomDef.CONF_ID_RESIST_BOSS);
		if (confval != 0) {
			for (i = ITEM_SP_RESIST_NOTBOSS; i <= ITEM_SP_RESIST_NOTBOSS; i++) {
				n_tok[i] += confval;
			}
		}

		/**
		 * ヒール系スキルを受けた時のHP回復量増加 と ヒール系スキル使用時のHP回復量増加 を適用する
		 */
		ApplyHealRecoveryUp();

//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyBadStatusResistIgnore() {
//==== 状態異常耐性　ここから
//====
//================================================================================================================================
//================================================================================================================================
		ApplyResistBadStatus();

//================================================================================================================================
//================================================================================================================================
//====
}

export function ApplyDefIgnore() {
    let vartmp = 0, confval = 0, itemCount = 0, itemCountRight = 0, itemCountLeft = 0, idx = 0;

//==== ＤＥＦ無視　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_IGNORE_DEF_ALL; idx <= ITEM_SP_IGNORE_DEF_RACE_ALL; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}
		for (idx = ITEM_SP_IGNORE_DEF_RACE_SOLID; idx <= ITEM_SP_IGNORE_DEF_RACE_DRAGON; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		switch (n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) {
		case 1076:
		case 1077:
			if(n_A_Weapon2_ATKplus >= 5) n_tok[307] += 10;
			if(n_A_Weapon2_ATKplus >= 7) n_tok[307] += 15;
		}

		switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
		case 1076:
		case 1077:
		case 1080:
		case 1081:
		case 1086:
		case 1088:
		case 1089:
		case 1090:
		case 1092:
		case 1093:
		case 1097:
		case 1098:
		case 1099:
		case 1100:
		case 1101:
		case 1102:
		case 1103:
			if(n_A_Weapon_ATKplus >= 5) n_tok[307] += 10;
			if(n_A_Weapon_ATKplus >= 7) n_tok[307] += 15;
		}

		switch (n_A_Equip[EQUIP_REGION_ID_ARMS]) {
		case 1082:
		case 1087:
		case 1094:
		case 1096:
			if(n_A_Weapon_ATKplus >= 5) n_tok[307] += 10;
			if(n_A_Weapon_ATKplus >= 7) n_tok[307] += 20;
		}

		//----------------------------------------------------------------
		// 「リス耳フード帽」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_RISUMIMI_HOODBO)) {
			if (n_A_HEAD_DEF_PLUS >= 5) n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 20;
			if (n_A_HEAD_DEF_PLUS >= 7) n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 30;
			if (n_A_HEAD_DEF_PLUS >= 9) n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 40;
		}

		//----------------------------------------------------------------
		// 「勇者の靴　達人の槌　セット」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_TSUCHI)) > 0) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_UNDEAD] += 10 * LearnedSkillSearch(SKILL_ID_MACE_SHUREN) * itemCount;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_DEMON] += 10 * LearnedSkillSearch(SKILL_ID_MACE_SHUREN) * itemCount;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_HUMAN] += 10 * LearnedSkillSearch(SKILL_ID_MACE_SHUREN) * itemCount;
		}
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_TSUCHI_S2)) > 0) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_UNDEAD] += 10 * LearnedSkillSearch(SKILL_ID_MACE_SHUREN) * itemCount;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_DEMON] += 10 * LearnedSkillSearch(SKILL_ID_MACE_SHUREN) * itemCount;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_HUMAN] += 10 * LearnedSkillSearch(SKILL_ID_MACE_SHUREN) * itemCount;
		}

		//----------------------------------------------------------------
		// 「執行者のシューズ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SHIKKOUSHANO_SHOES)) > 0) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 20 * LearnedSkillSearch(SKILL_ID_COUNTER_SLASH) * itemCount;
		}

		//----------------------------------------------------------------
		// 「天邪鬼の鬼面」の、素ＬＵＫよる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_AMANOZYAKUNO_KIMEN)) > 0) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 15 * ROUNDDOWN(SU_LUK / 18) * itemCount;
		}

		//----------------------------------------------------------------
		// 「悪魔の手」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AKUMANO_TE)) {
			if (n_A_HEAD_DEF_PLUS >= 10) {
				n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 100;
			}
		}

		//----------------------------------------------------------------
		// 「黒糸威胴丸」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KUROITOODOSHI_DOMARU)) > 0) {

			vartmp = 0;

			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 20;
			if (n_A_BODY_DEF_PLUS >= 8) vartmp += 20;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 20;

			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「不死鳥の冠」の、精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_FUSHICHONO_KANMURI)) {
			if (n_A_HEAD_DEF_PLUS >= 10) {
				n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 100;
			}
		}

		//----------------------------------------------------------------
		// 「ブルートダマスカス」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_DUMASCUS, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_DUMASCUS, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートスピア」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_SPEAR, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_SPEAR, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートクリーヴァ」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_CLEAVER, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_CLEAVER, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートモーニングスター」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_MORNINGSTAR, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_MORNINGSTAR, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートハンドガン」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_HANDGUN, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_HANDGUN, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートライフル」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_RIFLE, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_RIFLE, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートガトリングガン」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_GATLINGGUN, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_GATLINGGUN, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートショットガン」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_SHOTGUN, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_SHOTGUN, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートグレネードガン」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_GRENADEGUN, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_GRENADEGUN, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートハンターボウ」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_HUNTER_BOW, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_HUNTER_BOW, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートギター」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_GUITAR, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_GUITAR, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートラリエット」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_RARIET, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_RARIET, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルート風魔手裏剣」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_FUMASHURIKEN, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_FUMASHURIKEN, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「ブルートカタール」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_BLUTO_KATAR, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_BLUTO_KATAR, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
		}

		//----------------------------------------------------------------
		// 「フローズヴィトニルの鎖　ヴァナルガンドの兜セット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FROZVITNIRNO_KUSARI_VANARGANDNO_KABUTO)) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 6) {
				n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 25 * itemCount;
			}
			if (n_A_HEAD_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 25 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョン装飾用花」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_SOSHOKUYO_HANA)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_IGNORE_DEF_RACE_PLANT] += 50 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「インペリアルブーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_BOOTS)) > 0) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 20 * LearnedSkillSearch(SKILL_ID_PINGPOINT_ATTACK) * itemCount;
		}

		//----------------------------------------------------------------
		// 「不思議なハト　ヴァルハラアイドルセット」の、素ＬＵＫによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHIGINA_HATO_WALHALLA_IDOL)) > 0) {
			n_tok[ITEM_SP_IGNORE_DEF_ALL] += 5 * ROUNDDOWN(SU_LUK / 18) * itemCount;
		}

		//----------------------------------------------------------------
		// 「イリュージョン熱血連撃セット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ILLUSION_NEKKETSU_HACHIMAKI_ILLUSION_RENGEKINO_TSUME)) > 0) {
			// ボス限定
			n_tok[ITEM_SP_IGNORE_DEF_BOSS] += 10 * n_A_HEAD_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「イリュージョンハンターボウ」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_HUNTER_BOW)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_IGNORE_DEF_RACE_ANIMAL] += 50 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「傀儡の腕輪　ダークハンドセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KUGUTSUNO_UDEWA_DARK_HAND)) > 0) {

			if (n_A_HEAD_DEF_PLUS >= 6) {
				n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 25 * itemCount;
			}

			if (n_A_HEAD_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 25 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ジャガーノート」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_JAGUAR_NOTE)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_UNTIMATERIAL_BLAST) >= 5) {
				n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 100 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョンミリタリーブーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_MILITARY_BOOTS)) > 0) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 20 * LearnedSkillSearch(SKILL_ID_MAGMA_ILLUPTION) * itemCount;
		}

		//----------------------------------------------------------------
		// 「ジャスパーサークレット」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ZYASPER_CIRCLET)) > 0) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 10 * LearnedSkillSearch(SKILL_ID_DEATH_BOUND) * itemCount;
		}

		//----------------------------------------------------------------
		// 「追撃者のシューズ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_TSUIGEKISHANO_SHOES)) > 0) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 20 * LearnedSkillSearch(SKILL_ID_ESCAPE) * itemCount;
		}

		//----------------------------------------------------------------
		// 「試験管ブーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SHIKENKAN_BOOTS)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SPECIAL_PHARMACY) >= 10) {
				n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += 100 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_IGNORE_DEF_RACE_ALL);
		if (confval != 0) {
			n_tok[ITEM_SP_IGNORE_DEF_RACE_ALL] += confval;
		}


}
