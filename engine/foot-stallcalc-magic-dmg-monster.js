/**
 * StAllCalc セクション分割: 魔法攻撃で与えるダメージ＋○○％（対属性・サイズ・ボス・一般モンスター）。
 *
 * foot.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 */
import { g_objCharaConfCustomAtk } from "./global.js";
import { ApplySpecModify } from "./hmjob.js";
import { n_tok } from "./ro4-state.js";
import { CCharaConfCustomAtk } from "./CCharaConfCustomAtk.js";
import {
    CARD_ID_FUINSARETA_GOPINICH, CARD_ID_FUINSARETA_OSEN_SARETA_DARK_LORD, CARD_ID_GOPINICH,
    CARD_ID_OSEN_SARETA_DARK_LORD, CARD_ID_PRIDE_RUNAWAY_THANATOS, CARD_ID_RED_PEPPER_LAMBDA,
    CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_FUINSARETA_OSEN_SARETA_DARK_LORD
} from "./card.dat.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG } from "./chara.js";
import { EQUIP_REGION_ID_ACCESSORY_1 } from "./const/EnumEquipRegionId.js";
import {
    ITEM_SP_COST_DOWN, ITEM_SP_MAGICAL_DAMAGE_UP_BOSS, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_ALL,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_PSYCO,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND,
    ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS, ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_ALL, ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE,
    ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM, ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL
} from "./const/EnumItemSpId.js";
import { getSPCostReductionRate } from "./foot-sp-cost-reduction.js";
import { GetRndOptTotalValue } from "./hmrndopt.js";
import {
    ITEM_ID_ANEMOS_SHIELD, ITEM_ID_BOOK_OF_SOURCERERY, ITEM_ID_GAIA_SHIELD, ITEM_ID_GRACE_PSYCHIC_ROBE,
    ITEM_ID_GRACE_SCULL_ROBE, ITEM_ID_HAKKEINO_FUZYU, ITEM_ID_HONOIKAZUCHINOOOKAMI_KUTSU,
    ITEM_ID_IKUSAOTOMENO_SHIZUKU, ITEM_ID_IMPERIAL_PSYCHIC_ROBE, ITEM_ID_IMPERIAL_SCULL_ROBE, ITEM_ID_IPPEKI_TSUE,
    ITEM_ID_KAIRYUNO_YOROI, ITEM_ID_KINGS_GUARD, ITEM_ID_LORD_OF_ROYALS, ITEM_ID_METAL_PICK, ITEM_ID_MUSO_TSUE,
    ITEM_ID_PIKAPIKA_NYANNYAN_CROWN, ITEM_ID_RING_OF_JUPITER, ITEM_ID_RYORAN_TSUE, ITEM_ID_SACRED_LAPEL,
    ITEM_ID_SEISHANO_KANMURI, ITEM_ID_SEREONO_HOKAN, ITEM_ID_SHINENNO_DRESS, ITEM_ID_SHINPANNO_TENBIN,
    ITEM_ID_SHUKUSEINO_KUTSU, ITEM_ID_ZINRAI_TSUE, ITEM_ID_ZYONINNO_KOSHIOBI,
    ITEM_SET_ID_AWL_BARRONNO_MANT_EXCUTIONER_CARD, ITEM_SET_ID_AWL_BARRONNO_MANT_MISTILTINE_CARD,
    ITEM_SET_ID_AWL_BARRONNO_MANT_ORGE_TOOTH_CARD, ITEM_SET_ID_CELINENO_BROACH_CELINENO_RIBBON,
    ITEM_SET_ID_CELINENO_BROACH_MIZUMIZUSHI_BARA, ITEM_SET_ID_CHINURARETA_NINGYONO_DRESS_CELINENO_RIBBON,
    ITEM_SET_ID_FRONTIER_BOOTS_KIGENNO_SHO, ITEM_SET_ID_SABAKINO_KUTSU_HOLY_STICK,
    ITEM_SET_ID_SCARABA_HIGHHEEL_LAFINE_STUFF
} from "./item.dat.js";
import { LearnedSkillSearch } from "./learnedskill.js";
import {
    SU_DEX, SU_INT, SU_LUK, SU_STR, n_A_BODY_DEF_PLUS, n_A_HEAD_DEF_PLUS, n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS,
    n_A_SHOULDER_DEF_PLUS, n_A_Weapon_ATKplus
} from "./roro-state.js";
import {
    SKILL_ID_CLEARANCE, SKILL_ID_DEBOTION, SKILL_ID_ELEMENTAL_SHIELD, SKILL_ID_GENZYUTSU_GENWAKU,
    SKILL_ID_GENZYUTSU_KYOGAKU, SKILL_ID_GENZYUTSU_ZYUSATSU, SKILL_ID_IMPOSITIO_MANUS, SKILL_ID_LAUDAAGNUS,
    SKILL_ID_LAUDARAMUS, SKILL_ID_MELANCHOLY, SKILL_ID_MYAUMYAU, SKILL_ID_PSYCHIC_WAVE, SKILL_ID_SHIRYO_BAKUHATSU,
    SKILL_ID_STRIKING
} from "./skill.dat.js";
import { ROUNDDOWN } from "./foot-bridge.js";


export function ApplyMagicalDamageUpVsMonsterElement() {
    let vartmp = 0, confval = 0, itemCount = 0, cardCount = 0, idx = 0;

//==== 魔法攻撃時、△△属性モンスターに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		//----------------------------------------------------------------
		// 「粛清の靴」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SHUKUSEINO_KUTSU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_CLEARANCE) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_ALL] += 25;
			}
		}

		if(n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_ALL] != 0){
			for (var i = ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY; i <= ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; i++) {
				n_tok[i] += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_ALL];
			}
		}

		if(n_A_Weapon_ATKplus >= 7 && n_A_BODY_DEF_PLUS >= 7 && n_A_SHOULDER_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7){
			if(EquipNumSearch(1570)){
				n_tok[49] += 5;
				n_tok[359] += 5;
			}
			if(EquipNumSearch(1572)){
				n_tok[49] += 15;
				n_tok[359] += 15;
			}
		}
		if(n_A_HEAD_DEF_PLUS >= 5 && EquipNumSearch(1789)){
			n_tok[351] += 5 * (n_A_HEAD_DEF_PLUS - 4);
			n_tok[352] += 5 * (n_A_HEAD_DEF_PLUS - 4);
			n_tok[353] += 5 * (n_A_HEAD_DEF_PLUS - 4);
			n_tok[354] += 5 * (n_A_HEAD_DEF_PLUS - 4);
		}
		if(n_A_HEAD_DEF_PLUS >= 7 && EquipNumSearch(1977)){
			n_tok[353] += 10;
			if(n_A_HEAD_DEF_PLUS >= 9) n_tok[353] += 15;
		}
		if(n_A_HEAD_DEF_PLUS >= 5 && EquipNumSearch(2394)){
			n_tok[355] += 5 * (n_A_HEAD_DEF_PLUS - 4);
			n_tok[356] += 5 * (n_A_HEAD_DEF_PLUS - 4);
			n_tok[357] += 5 * (n_A_HEAD_DEF_PLUS - 4);
			n_tok[358] += 5 * (n_A_HEAD_DEF_PLUS - 4);
			n_tok[359] += 5 * (n_A_HEAD_DEF_PLUS - 4);
		}
		if(n_A_SHOES_DEF_PLUS >= 5 && EquipNumSearch(2503)){
			for(var i=350;i<=354;i++) n_tok[i] += 5;
			if(n_A_SHOES_DEF_PLUS >= 7){
				for(var i=350;i<=354;i++) n_tok[i] += 10;
			}
		}

		//----------------------------------------------------------------
		// 「迅雷杖」の、過剰精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_ZINRAI_TSUE)) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「無双杖」の、過剰精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_MUSO_TSUE)) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 10;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 15;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「裁きの靴　ホーリーステッキセット」の、過剰精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_SET_ID_SABAKINO_KUTSU_HOLY_STICK)) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK] += 30;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD] += 30;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK] += 20;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD] += 20;
			}
		}

		//----------------------------------------------------------------
		// 「ガイアシールド」の、精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_GAIA_SHIELD) > 0) {
			if (n_A_SHIELD_DEF_PLUS >= 6) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 10;
			}
		}

		//----------------------------------------------------------------
		// 「上忍の腰帯」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ZYONINNO_KOSHIOBI)) > 0) {
			var skllv = 0;
			skllv += LearnedSkillSearch(SKILL_ID_GENZYUTSU_KYOGAKU);
			skllv += LearnedSkillSearch(SKILL_ID_GENZYUTSU_ZYUSATSU);
			skllv += LearnedSkillSearch(SKILL_ID_GENZYUTSU_GENWAKU);
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK] += 4 * skllv * itemCount;
		}

		//----------------------------------------------------------------
		// 「一碧杖」の、過剰精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_IPPEKI_TSUE)) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「火雷大神靴」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_HONOIKAZUCHINOOOKAMI_KUTSU)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 2 * n_A_SHOES_DEF_PLUS * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_PSYCO] += 2 * n_A_SHOES_DEF_PLUS * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY] += 2 * n_A_SHOES_DEF_PLUS * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD] += 2 * n_A_SHOES_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「アネモスシールド」の、精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_ANEMOS_SHIELD) > 0) {
			if (n_A_SHIELD_DEF_PLUS >= 6) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 10;
			}
		}

		//----------------------------------------------------------------
		// 「深淵のドレス」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SHINENNO_DRESS)) > 0) {
			vartmp = 0;

			if (n_A_BODY_DEF_PLUS >= 5) vartmp += 10;
			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 15;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 15;

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK] += vartmp * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「猟乱杖」の、過剰精錬による効果
		//----------------------------------------------------------------
		if(EquipNumSearch(ITEM_ID_RYORAN_TSUE)) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 10;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 10;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 15;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 15;
			}
		}

		//----------------------------------------------------------------
		// 「キングスガード」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KINGS_GUARD)) > 0) {
			vartmp = 0;

			if (n_A_SHIELD_DEF_PLUS >= 7) vartmp += 15;
			if (n_A_SHIELD_DEF_PLUS >= 9) vartmp += 15;

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「聖者の冠」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SEISHANO_KANMURI)) > 0) {
			vartmp = 0;

			vartmp += LearnedSkillSearch(SKILL_ID_LAUDAAGNUS);
			vartmp += LearnedSkillSearch(SKILL_ID_LAUDARAMUS);

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 5 * vartmp * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_PSYCO] += 5 * vartmp * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY] += 5 * vartmp * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD] += 5 * vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「フロンティアブーツ　起源の書セット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FRONTIER_BOOTS_KIGENNO_SHO)) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE] += 3 * n_A_Weapon_ATKplus * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER] += 3 * n_A_Weapon_ATKplus * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 3 * n_A_Weapon_ATKplus * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 3 * n_A_Weapon_ATKplus * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ゴピニクカード」の、素ステータスによる強化
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_GOPINICH)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 3 * Math.floor((SU_STR + SU_INT + SU_DEX) / 10) * cardCount;
		}
		// 「傲慢な暴走したタナトス」カードの強化
		if (CardNumSearch(CARD_ID_PRIDE_RUNAWAY_THANATOS) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_PSYCO] += 3 * Math.floor((SU_STR + SU_INT + SU_DEX) / 10);
		}

		//----------------------------------------------------------------
		// 「汚染されたダークロードカード」の、素ステータスによる強化
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_OSEN_SARETA_DARK_LORD)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY] += 3 * Math.floor((SU_STR + SU_INT + SU_DEX) / 10) * cardCount;
		}

		//----------------------------------------------------------------
		// 「封印された汚染されたダークロードカード」の、素ステータスによる強化
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_FUINSARETA_OSEN_SARETA_DARK_LORD)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY] += 1 * Math.floor((SU_STR + SU_INT + SU_DEX) / 20) * cardCount;
		}

		//----------------------------------------------------------------
		// 「英雄の凱歌　封印された汚染されたダークロードカードセット」の、素ステータスによる強化
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_FUINSARETA_OSEN_SARETA_DARK_LORD)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY] += 1 * Math.floor((SU_STR + SU_INT + SU_DEX) / 20) * cardCount;
		}

		//----------------------------------------------------------------
		// 「封印されたゴピニクカード」の、素ステータスによる強化
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_FUINSARETA_GOPINICH)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND] += 1 * Math.floor((SU_STR + SU_INT + SU_DEX) / 10) * cardCount;
		}

		//----------------------------------------------------------------
		// 「レッドペッパーラムダカード」の、素ステータスによる強化
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_RED_PEPPER_LAMBDA)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH] += 3 * Math.floor((SU_STR + SU_INT + SU_DEX) / 10) * cardCount;
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM);
		if (confval != 0) {
			for (i = ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY; i <= ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; i++) {
				n_tok[i] += confval;
			}
		}

		// TODO: 四次対応
		for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD; idx++) {
			n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
		}


}

export function ApplyMagicalDamageUpVsMonsterSize() {
    let confval = 0, itemCount = 0, idx = 0;

//==== 魔法攻撃時、△△サイズのモンスターに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		if(n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_ALL] != 0){
			for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE; idx++) {
				n_tok[idx] += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_ALL];
			}
		}


		//----------------------------------------------------------------
		// 「戦乙女の雫」の、スキル習得による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_IKUSAOTOMENO_SHIZUKU)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL] += 3 * LearnedSkillSearch(SKILL_ID_IMPOSITIO_MANUS) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM] += 3 * LearnedSkillSearch(SKILL_ID_IMPOSITIO_MANUS) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE] += 3 * LearnedSkillSearch(SKILL_ID_IMPOSITIO_MANUS) * itemCount;
		}


		//----------------------------------------------------------------
		// 「八卦の封呪」の、素ＩＮＴと素ＤＥＸによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_HAKKEINO_FUZYU)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL] += 4 * ROUNDDOWN((SU_INT + SU_DEX) / 50) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM] += 4 * ROUNDDOWN((SU_INT + SU_DEX) / 50) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE] += 4 * ROUNDDOWN((SU_INT + SU_DEX) / 50) * itemCount;
		}


		//----------------------------------------------------------------
		// 「オウルバロンのマント　エクスキューショナーカード」の、過剰精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_AWL_BARRONNO_MANT_EXCUTIONER_CARD)) > 0) {
			if (n_A_SHOULDER_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE] += 25 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「オウルバロンのマント　オーガトゥースカード」の、過剰精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_AWL_BARRONNO_MANT_ORGE_TOOTH_CARD)) > 0) {
			if (n_A_SHOULDER_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM] += 25 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「オウルバロンのマント　ミスティルティンカード」の、過剰精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_AWL_BARRONNO_MANT_MISTILTINE_CARD)) > 0) {
			if (n_A_SHOULDER_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL] += 25 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「ロードオブロイヤルズ」の、素ＳＴＲと素ＩＮＴによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_LORD_OF_ROYALS)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL] += 4 * ROUNDDOWN((SU_STR + SU_INT) / 50) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM] += 4 * ROUNDDOWN((SU_STR + SU_INT) / 50) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE] += 4 * ROUNDDOWN((SU_STR + SU_INT) / 50) * itemCount;
		}


		//----------------------------------------------------------------
		// 「インペリアルサイキックローブ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_PSYCHIC_ROBE)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL] += 4 * LearnedSkillSearch(SKILL_ID_STRIKING) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM] += 4 * LearnedSkillSearch(SKILL_ID_STRIKING) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE] += 4 * LearnedSkillSearch(SKILL_ID_STRIKING) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースサイキックローブ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_PSYCHIC_ROBE)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL] += 7 * LearnedSkillSearch(SKILL_ID_STRIKING) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM] += 7 * LearnedSkillSearch(SKILL_ID_STRIKING) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE] += 7 * LearnedSkillSearch(SKILL_ID_STRIKING) * itemCount;
		}


		//----------------------------------------------------------------
		// 「インペリアルスカルローブ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_SCULL_ROBE)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL] += 4 * Math.floor(LearnedSkillSearch(SKILL_ID_SHIRYO_BAKUHATSU) / 2) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM] += 4 * Math.floor(LearnedSkillSearch(SKILL_ID_SHIRYO_BAKUHATSU) / 2) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE] += 4 * Math.floor(LearnedSkillSearch(SKILL_ID_SHIRYO_BAKUHATSU) / 2) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレーススカルローブ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_SCULL_ROBE)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL] += 7 * Math.floor(LearnedSkillSearch(SKILL_ID_SHIRYO_BAKUHATSU) / 2) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM] += 7 * Math.floor(LearnedSkillSearch(SKILL_ID_SHIRYO_BAKUHATSU) / 2) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE] += 7 * Math.floor(LearnedSkillSearch(SKILL_ID_SHIRYO_BAKUHATSU) / 2) * itemCount;
		}

		//----------------------------------------------------------------
		// 「ブックオブソーサリー」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_BOOK_OF_SOURCERERY)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL] += 3 * LearnedSkillSearch(SKILL_ID_PSYCHIC_WAVE) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM] += 3 * LearnedSkillSearch(SKILL_ID_PSYCHIC_WAVE) * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE] += 3 * LearnedSkillSearch(SKILL_ID_PSYCHIC_WAVE) * itemCount;
		}

		//----------------------------------------------------------------
		// 「セイクリッドラペル」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_SACRED_LAPEL)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_CLEARANCE) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL] += 15 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM] += 15 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE] += 15 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_SIZE);
		if (confval != 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL] += confval;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM] += confval;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE] += confval;
		}

		// TODO: 四次対応
		for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE; idx++) {
			n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
		}


}

export function ApplyMagicalDamageUpVsBoss() {
    let vartmp = 0, confval = 0, itemCount = 0, idx = 0;

//==== 魔法攻撃時、ボスモンスターに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_BOSS; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_BOSS; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}

		//----------------------------------------------------------------
		// 「海竜の鎧」の、過剰精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KAIRYUNO_YOROI)) > 0) {
			vartmp = 0;

			if (n_A_BODY_DEF_PLUS >= 7) vartmp += 10;
			if (n_A_BODY_DEF_PLUS >= 9) vartmp += 10;

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「セリーヌのブローチ　リボンセット」の、過剰精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_CELINENO_BROACH_CELINENO_RIBBON)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 20;
			if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 20;

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「セリーヌのブローチ　瑞々しいバラセット」の、過剰精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_CELINENO_BROACH_MIZUMIZUSHI_BARA)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 20;

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「スカラバハイヒール　ラフィネスタッフセット」の、精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearchMIG(ITEM_SET_ID_SCARABA_HIGHHEEL_LAFINE_STUFF) > 0) {
			if (n_A_SHOES_DEF_PLUS >= 7) {
				if (n_A_Weapon_ATKplus >= 8) n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS] += 30;
				if (n_A_Weapon_ATKplus >= 10) n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS] += 40;
			}
		}

		//----------------------------------------------------------------
		// 「精霊王の宝冠」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SEREONO_HOKAN)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_ELEMENTAL_SHIELD) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS] += 25 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「血塗られた人形のドレス　セリーヌのリボンセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_CHINURARETA_NINGYONO_DRESS_CELINENO_RIBBON)) > 0) {
			vartmp = 0;

			if (n_A_HEAD_DEF_PLUS >= 7) vartmp += 15;
			if (n_A_HEAD_DEF_PLUS >= 9) vartmp += 15;

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「リングオブジュピター」の、素ＬＵＫによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_JUPITER, EQUIP_REGION_ID_ACCESSORY_1)) > 0) {
			if (SU_LUK >= 125) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「聖者の冠」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SEISHANO_KANMURI)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_CLEARANCE) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS] += 25 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ぴかぴかニャンニャンクラウン」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_PIKAPIKA_NYANNYAN_CROWN)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_MYAUMYAU) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS] += 25 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「審判の天秤」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SHINPANNO_TENBIN)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_DEBOTION) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「メタルピック」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_METAL_PICK)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_MELANCHOLY) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS] += 10 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_BOSS_AND_NOT_BOSS);
		if (confval != 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS] += confval;
		}


}

export function ApplyMagicalDamageUpVsNormalMonster() {
    let confval = 0, itemCount = 0, idx = 0;

//==== 魔法攻撃時、一般モンスターに与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
			// n_tok[idx] += GetRndEnchValue(idx);
		}


		//----------------------------------------------------------------
		// 「メタルピック」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_METAL_PICK)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_MELANCHOLY) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS] += 10 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_BOSS_AND_NOT_BOSS);
		if (confval != 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS] += confval;
		}


		// スキル使用時の消費ＳＰ－○○％ を適用する
		n_tok[ITEM_SP_COST_DOWN] = getSPCostReductionRate();


}
