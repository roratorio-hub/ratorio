/**
 * StAllCalc セクション分割: 属性魔法で与えるダメージ＋○○％。
 *
 * stallcalc.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 */
import { n_A_PassSkill7, UsedSkillSearch } from "../skill/skillstate.js";
import { g_confDataSanzi, g_confDataYozi, g_objCharaConfCustomAtk } from "../runtime/global.js";
import { ApplySpecModify } from "../chara/hmjob.js";
import { n_A_BaseLV, n_tok } from "../runtime/ro4-state.js";
import { CCharaConfCustomAtk } from "../chara/CCharaConfCustomAtk.js";
import { CCharaConfSanzi } from "../chara/CCharaConfSanzi.js";
import { CCharaConfYozi } from "../chara/CCharaConfYozi.js";
import { CARD_ID_FUMETSUNO_WINDGHOST } from "../equip/card.dat.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG, TimeItemNumSearch } from "../chara/chara.js";
import {
    EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_SHOULDER
} from "../const/EnumEquipRegionId.js";
import {
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_ALL, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_POISON,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PSYCO, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_UNDEAD, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND, ITEM_SP_RESIST_ELM_EARTH,
    ITEM_SP_RESIST_ELM_FIRE, ITEM_SP_RESIST_ELM_WATER, ITEM_SP_RESIST_ELM_WIND
} from "../const/EnumItemSpId.js";
import {
    ITEM_ID_AKAI_NEKOMIMI_MAZYO_BOSHI, ITEM_ID_AKUMASUHAISHANO_KUTSU, ITEM_ID_CHIKAKU_ZOFUKU_RING,
    ITEM_ID_CHOETSUSHANO_ROBE, ITEM_ID_DATENSHISAINO_ANKOUGAITO, ITEM_ID_DIA_DE_MUERTOS, ITEM_ID_ENRAIMAZYONO_OTSUE,
    ITEM_ID_HIMAWARI_SHONEN, ITEM_ID_KIGENNO_SHO, ITEM_ID_KIRAKIRA_NYANNYAN_CHOKER, ITEM_ID_MASSHOSHANO_ROBE,
    ITEM_ID_MAZYONO_SAISHIBO, ITEM_ID_METAL_PICK, ITEM_ID_POROROCA_SHOES, ITEM_ID_RING_OF_PAZUZU,
    ITEM_ID_RYUGOROSHINO_CHOKEN, ITEM_ID_SABAKINO_KUTSU, ITEM_ID_SAITANNO_HOKAN, ITEM_ID_SCALL_RING,
    ITEM_ID_SEIREINO_ROBE, ITEM_ID_SEISHIN_KAKUCHO_RING, ITEM_ID_SUHAINO_YUBIWA, ITEM_ID_SURVIVAL_SHOES,
    ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO,
    ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO_KODAIZYUNO_TSUE,
    ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_BOITATA_CARD, ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_FUINSARETA_BOITATA,
    ITEM_SET_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_DARKLORD_CARD,
    ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_FUINSARETA_STORM_KNIGHT, ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_STORM_KNIGHT_CARD,
    ITEM_SET_ID_POROROCA_SHOES_LACRYMA_STICK, ITEM_SET_ID_RUNAWAY_ACCELERATOR_T_ELECTRICITY,
    ITEM_SET_ID_RYUGOROSHINO_CHOKEN_RANDGRIS_CARD, ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_CIRCLET,
    ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_DEX_S1, ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_INT_S1
} from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    SU_DEX, SU_INT, n_A_BODY_DEF_PLUS, n_A_Equip, n_A_HEAD_DEF_PLUS, n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS,
    n_A_Weapon2_ATKplus, n_A_Weapon_ATKplus
} from "../runtime/roro-state.js";
import {
    SKILL_ID_CLEARANCE, SKILL_ID_ELECTRIC_WALK, SKILL_ID_FIRE_PILLAR, SKILL_ID_FIRE_WALK,
    SKILL_ID_FUKAKUTEYOSONO_GENGO, SKILL_ID_GRAVITATION_FIELD, SKILL_ID_MYAUMYAU, SKILL_ID_NATURE_HARMONY,
    SKILL_ID_NYAN_TAMASHI, SKILL_ID_RADIUS, SKILL_ID_SERE, SKILL_ID_SHIRYO_HYOI, SKILL_ID_SIGHT_RASHER,
    SKILL_ID_STASIS, SKILL_ID_STRIKING, SKILL_ID_TAMASHINO_SHUKAKU, SKILL_ID_TRUTH_OF_EARTH, SKILL_ID_TRUTH_OF_ICE,
    SKILL_ID_TRUTH_OF_WIND
} from "../skill/skill.dat.js";
import {
    TIME_ITEM_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_FUINSARETA_DARKLORD_CARD,
    TIME_ITEM_ID_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_FUINSARETA_DARKLORD_CARD
} from "../equip/timeitem.dat.js";
import { ROUNDDOWN } from "../bridge/stallcalc-bridge.js";


export function ApplyElementalMagicalDamageUpPercent() {
    let vartmp = 0, confval = 0, itemCount = 0, itemCountRight = 0, itemCountLeft = 0, cardCount = 0, idx = 0;

//==== 属性魔法で与えるダメージ＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================
	{
		/** アイテム数・スキルLvを保存する一次変数 */
		let prefetch = 0;

		if(n_A_Weapon_ATKplus >= 7 && n_A_BODY_DEF_PLUS >= 7 && n_A_SHOES_DEF_PLUS >= 7){
			if(EquipNumSearch(1535)){
				n_tok[344] += 10;
				n_tok[342] += -15;
				n_tok[ITEM_SP_RESIST_ELM_EARTH] += -25;
			}
			if(EquipNumSearch(1537)){
				n_tok[344] += 10;
				n_tok[342] += -20;
				n_tok[ITEM_SP_RESIST_ELM_EARTH] += -20;
			}
			if(EquipNumSearch(1542)){
				n_tok[341] += 10;
				n_tok[344] += -15;
				n_tok[ITEM_SP_RESIST_ELM_WIND] += -25;
			}
			if(EquipNumSearch(1544)){
				n_tok[341] += 10;
				n_tok[344] += -20;
				n_tok[ITEM_SP_RESIST_ELM_WIND] += -20;
			}
			if(EquipNumSearch(1549)){
				n_tok[343] += 10;
				n_tok[341] += -15;
				n_tok[ITEM_SP_RESIST_ELM_WATER] += -25;
			}
			if(EquipNumSearch(1551)){
				n_tok[343] += 10;
				n_tok[341] += -20;
				n_tok[ITEM_SP_RESIST_ELM_WATER] += -20;
			}
			if(EquipNumSearch(1556)){
				n_tok[342] += 10;
				n_tok[343] += -15;
				n_tok[ITEM_SP_RESIST_ELM_FIRE] += -25;
			}
			if(EquipNumSearch(1558)){
				n_tok[342] += 10;
				n_tok[343] += -20;
				n_tok[ITEM_SP_RESIST_ELM_FIRE] += -20;
			}
		}
		if(n_A_SHOULDER_DEF_PLUS >= 7 && 1902 <= n_A_Equip[EQUIP_REGION_ID_SHOULDER] && n_A_Equip[EQUIP_REGION_ID_SHOULDER] <= 1905){
			n_tok[341 + n_A_Equip[EQUIP_REGION_ID_SHOULDER] - 1902] += 3;
		}		
		if(CardNumSearch(784)) n_tok[342] += 3 * n_A_SHOULDER_DEF_PLUS;
		if(CardNumSearch(883)) n_tok[343] += 3 * n_A_SHOULDER_DEF_PLUS;
		if(EquipNumSearch(2528)) n_tok[347] += 2 * n_A_BODY_DEF_PLUS;

		//----------------------------------------------------------------
		// 「ポロロッカシューズ」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_POROROCA_SHOES)) {
			if (n_A_SHOES_DEF_PLUS >= 5) n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER] += 3;
			if (n_A_SHOES_DEF_PLUS >= 7) n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER] += 5;
		}

		//----------------------------------------------------------------
		// 「ポロロッカシューズ　ラクリマセット」の、精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_POROROCA_SHOES_LACRYMA_STICK)) {
			// ラクリマスティックの精錬による強化
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER] += 4 * n_A_Weapon_ATKplus;
		}

		//----------------------------------------------------------------
		// 「堕天司祭の闇光外套」の、過剰精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_DATENSHISAINO_ANKOUGAITO)) {
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += 10;
			}
		}

		//----------------------------------------------------------------
		// 「裁きの靴」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_SABAKINO_KUTSU)) {
			if (n_A_SHOES_DEF_PLUS >= 5) n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY] += 3;
			if (n_A_SHOES_DEF_PLUS >= 7) n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY] += 5;
		}

		//----------------------------------------------------------------
		// 「魔女の祭祀帽」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MAZYONO_SAISHIBO)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK] += 3 * ROUNDDOWN(n_A_HEAD_DEF_PLUS / 2) * itemCount;
		}

		//----------------------------------------------------------------
		// 「不滅のウィンドゴーストカード」の、精錬による効果
		//----------------------------------------------------------------
		if ((cardCount = CardNumSearch(CARD_ID_FUMETSUNO_WINDGHOST)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 3 * n_A_SHOULDER_DEF_PLUS * cardCount;
		}

		//----------------------------------------------------------------
		// 「超越者のローブ」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_CHOETSUSHANO_ROBE)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PSYCO] += 2 * n_A_BODY_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「ひまわり少年」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_HIMAWARI_SHONEN)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SIGHT_RASHER) >= 10) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 20;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 3 * n_A_Weapon_ATKplus;
			}
		}

		//----------------------------------------------------------------
		// 「悪魔崇拝者の靴」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_AKUMASUHAISHANO_KUTSU)) {
			vartmp = 0;

			if (n_A_SHOES_DEF_PLUS >= 5) vartmp += 3;
			if (n_A_SHOES_DEF_PLUS >= 7) vartmp += 5;

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += vartmp;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += vartmp;
		}

		//----------------------------------------------------------------
		// 「悪魔崇拝者の靴　堕天司祭の闇光外套　セット」の、過剰精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO)) {
			vartmp = 0;

			if (n_A_SHOULDER_DEF_PLUS >= 7) vartmp += 10;
			if (n_A_SHOULDER_DEF_PLUS >= 9) vartmp += 10;

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += vartmp;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK] += vartmp;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += vartmp;
		}

		//----------------------------------------------------------------
		// 「悪魔崇拝者の靴　堕天司祭の闇光外套　古代樹の杖　セット」の、スキル習得による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO_KODAIZYUNO_TSUE)) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 4 * LearnedSkillSearch(SKILL_ID_FIRE_PILLAR);
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += 6 * LearnedSkillSearch(SKILL_ID_GRAVITATION_FIELD);
		}

		//----------------------------------------------------------------
		// 「炎雷魔女の大杖」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ENRAIMAZYONO_OTSUE)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 10 * LearnedSkillSearch(SKILL_ID_FIRE_WALK);
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 5 * n_A_Weapon_ATKplus;

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 10 * LearnedSkillSearch(SKILL_ID_ELECTRIC_WALK);
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 5 * n_A_Weapon_ATKplus;

		}

		//----------------------------------------------------------------
		// 「抹消者のローブ」の、精錬による強化
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MASSHOSHANO_ROBE)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 2 * n_A_BODY_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「サバイバルシューズ」の、精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_SURVIVAL_SHOES)) {
			if (n_A_SHOES_DEF_PLUS >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 3;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH] += 3;
			}
			if (n_A_SHOES_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 5;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH] += 5;
			}
		}

		//----------------------------------------------------------------
		// 「サバイバルシューズ　サバイバルロッドセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_DEX_S1)) > 0) {
			if (n_A_Weapon_ATKplus >= 10) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += 80 * itemCount;
			}
		}
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_INT_S1)) > 0) {
			if (n_A_Weapon_ATKplus >= 10) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += 80 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「サバイバルシューズ　サバイバルサークレットセット」の、精錬による強化
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_CIRCLET)) {
			if (n_A_HEAD_DEF_PLUS >= 7) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 10;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH] += 10;
			}
			if (n_A_HEAD_DEF_PLUS >= 9) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 10;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH] += 10;
			}
		}

		//----------------------------------------------------------------
		// 「起源の書」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KIGENNO_SHO)) > 0) {
			vartmp = 0;

			if (n_A_Weapon_ATKplus >= 7) {
				vartmp += 15;
			}
			if (n_A_Weapon_ATKplus >= 9) {
				vartmp += 20;
			}

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += vartmp * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER] += vartmp * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += vartmp * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH] += vartmp * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「精霊のローブ」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SEIREINO_ROBE)) > 0) {
			vartmp = 0;

			if (n_A_BODY_DEF_PLUS >= 7) {
				vartmp += 5;
			}
			if (n_A_BODY_DEF_PLUS >= 9) {
				vartmp += 5;
			}

			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += vartmp * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER] += vartmp * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += vartmp * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH] += vartmp * itemCount;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += vartmp * itemCount;
		}

		//----------------------------------------------------------------
		// 「特殊環境活動用ブーツ　ダークロードカードセット」の、時限効果
		//----------------------------------------------------------------
		if (TimeItemNumSearch(154)) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 5 * n_A_SHOES_DEF_PLUS;
			}
			else {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 10 * n_A_SHOES_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「虹色のねこじゃらし　ストームナイトカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_STORM_KNIGHT_CARD)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NYAN_TAMASHI) >= 1) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER] += 5 * n_A_Weapon_ATKplus * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「知覚増幅リング」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_CHIKAKU_ZOFUKU_RING)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_STRIKING) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「竜殺しの長剣」の、精錬による効果
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_RYUGOROSHINO_CHOKEN, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_RYUGOROSHINO_CHOKEN, EQUIP_REGION_ID_ARMS_LEFT);
		if (itemCountRight > 0) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY] += 2 * n_A_Weapon_ATKplus * itemCountRight;
			}
			else {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY] += 5 * n_A_Weapon_ATKplus * itemCountRight;
			}
		}
		if (itemCountLeft > 0) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY] += 2 * n_A_Weapon2_ATKplus * itemCountLeft;
			}
			else {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY] += 5 * n_A_Weapon2_ATKplus * itemCountLeft;
			}
		}

		//----------------------------------------------------------------
		// 「竜殺しの長剣　ランドグリスカードセット」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_RYUGOROSHINO_CHOKEN_RANDGRIS_CARD)) > 0) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY] += 15 * itemCount;
			}
			else {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY] += 50 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ランナウェー・アクセラレータ　T-Electricity」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_RUNAWAY_ACCELERATOR_T_ELECTRICITY)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 3 * n_A_HEAD_DEF_PLUS * itemCount;
		}

		//----------------------------------------------------------------
		// 「精神拡張リング」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SEISHIN_KAKUCHO_RING)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_STASIS) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PSYCO] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「リングオブパズズ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_RING_OF_PAZUZU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_RADIUS) >= 3) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「不死鳥のねこじゃらし　ボイタタカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_BOITATA_CARD)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NYAN_TAMASHI) >= 1) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 5 * n_A_Weapon_ATKplus * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「覚醒特殊環境活動用ブーツ　ダークロードカードセット」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_DARKLORD_CARD)) > 0) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 3 * n_A_SHOES_DEF_PLUS * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK] += 3 * n_A_SHOES_DEF_PLUS * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += 3 * n_A_SHOES_DEF_PLUS * itemCount;
			}
			else {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 8 * n_A_SHOES_DEF_PLUS * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK] += 8 * n_A_SHOES_DEF_PLUS * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += 8 * n_A_SHOES_DEF_PLUS * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「覚醒特殊環境活動用ブーツ　封印されたダークロードカードセット」の、時限効果
		//----------------------------------------------------------------
		if (TimeItemNumSearch(TIME_ITEM_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_FUINSARETA_DARKLORD_CARD)) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 5 * n_A_SHOES_DEF_PLUS;
			}
			else {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 10 * n_A_SHOES_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「特殊環境活動用ブーツ　封印されたダークロードカードセット」の、時限効果
		//----------------------------------------------------------------
		if (TimeItemNumSearch(TIME_ITEM_ID_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_FUINSARETA_DARKLORD_CARD)) {
			if (n_A_BaseLV <= 99) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 2 * n_A_SHOES_DEF_PLUS;
			}
			else {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 5 * n_A_SHOES_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「スカルリング」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SCALL_RING)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_TAMASHINO_SHUKAKU) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PSYCO] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「崇拝の指輪」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_SUHAINO_YUBIWA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_CLEARANCE) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「メタルピック」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_METAL_PICK)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_FUKAKUTEYOSONO_GENGO) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「再誕の宝冠」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_SAITANNO_HOKAN)) > 0) {
			if (n_A_HEAD_DEF_PLUS >= 10) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += 1 * Math.floor((SU_INT + SU_DEX) / 10) * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「きらきらニャンニャンチョーカー」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KIRAKIRA_NYANNYAN_CHOKER)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_MYAUMYAU) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH] += 10 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PSYCO] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「赤い猫耳魔女帽子」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_AKAI_NEKOMIMI_MAZYO_BOSHI)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_STRIKING) >= 5) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 25 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER] += 25 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 25 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH] += 25 * itemCount;
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += 25 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「虹色のねこじゃらし　封印されたストームナイトカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_FUINSARETA_STORM_KNIGHT)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NYAN_TAMASHI) >= 1) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER] += 1 * n_A_Weapon_ATKplus * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「不死鳥のねこじゃらし　封印されたボイタタカードセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_FUINSARETA_BOITATA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_NYAN_TAMASHI) >= 1) {
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 2 * n_A_Weapon_ATKplus * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ディア・デ・ムエルトス」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_DIA_DE_MUERTOS)) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK] += 5 * LearnedSkillSearch(SKILL_ID_SHIRYO_HYOI) * itemCount;
		}

		//----------------------------------------------------------------
		// 「エレメンタルマスター」の四次精霊の召喚中による効果
		//----------------------------------------------------------------
		switch (UsedSkillSearch(SKILL_ID_SERE)) {
			case 13:	// 火 アルドール
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE] += 10;
				break;
			case 14:	// 水 ディルビオ
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER] += 10;
				break;
			case 15:	// 風 プロセラ
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 10;
				break;
			case 16:	// 地 テレモトゥス
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH] += 10;
				break;
			case 17:	// 毒 サーペンス
				n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_POISON] += 10;
				break;
		}

		/**
		 * 幻想叢書カード ヴェルナー による 無属性魔法攻撃 + 5%
		 */
		if (n_A_PassSkill7[52] === 2) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY] += 5;
		}

		/**
		 * 幻想叢書カード グラリン による 聖属性魔法攻撃 + 5%
		 */
		if (n_A_PassSkill7[52] === 5) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY] += 5;
		}

		/** 三次職支援設定「エンドレスハミングボイス」の全ての属性魔法攻撃で与えるダメージ + 効果 */
		if (g_confDataSanzi[CCharaConfSanzi.CONF_ID_UNLIMITED_HUMMING_VOICE] > 0) {
			let effect = 4 * g_confDataSanzi[CCharaConfSanzi.CONF_ID_UNLIMITED_HUMMING_VOICE];
			effect += Math.floor(g_confDataSanzi[CCharaConfSanzi.CONF_ID_LESSON] / 2);
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_ALL] += effect;
		}

		/** 四次職支援 アリテア「ゼファーリンク」の効果  */
		if (g_confDataYozi[CCharaConfYozi.CONF_ID_ZEPHYR_LINK]) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_ALL] += 15;
		}

		/** 四次職支援 アリテア「ネイチャーハーモニー」の効果  */
		prefetch = UsedSkillSearch(SKILL_ID_NATURE_HARMONY);
		if (prefetch > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER] += 25 + 5 * prefetch;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 25 + 5 * prefetch;
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH] += 25 + 5 * prefetch;
		}
		
		/** ドルイド「トゥルースオブアイス」「トゥルースオブウィンド」「トゥルースオブアース」の効果 */
		if (UsedSkillSearch(SKILL_ID_TRUTH_OF_ICE) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER] += 10;
		}
		if (UsedSkillSearch(SKILL_ID_TRUTH_OF_WIND) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND] += 10;
		}
		if (UsedSkillSearch(SKILL_ID_TRUTH_OF_EARTH) > 0) {
			n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH] += 10;
		}

		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_ELM);
		if (confval != 0) {
			for (i = ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY; i <= ITEM_SP_MAGICAL_DAMAGE_UP_ELM_UNDEAD; i++) {
				n_tok[i] += confval;
			}
		}

		// TODO: 四次対応
		for (idx = ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY; idx <= ITEM_SP_MAGICAL_DAMAGE_UP_ELM_UNDEAD; idx++) {
			n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
		}

		//----------------------------------------------------------------
		// 全属性の設定適用
		//----------------------------------------------------------------
		if(n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_ALL] != 0){
			for (var i = ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY; i <= ITEM_SP_MAGICAL_DAMAGE_UP_ELM_UNDEAD; i++) {
				n_tok[i] += n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_ALL];
			}
		}
	}


}
