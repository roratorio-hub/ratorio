/**
 * StAllCalc セクション分割: 必中攻撃＋○○％。
 *
 * foot.js の StAllCalc から分割（.claude/context/remaining-work.md「残作業 1」Phase 2）。
 * 本文はバイト単位で不変（ラップした関数シグネチャ・ローカル変数宣言のみ新規）。
 */
import { n_A_PassSkill7, UsedSkillSearch } from "./skillstate.js";
import {
    GetLowerJobSeriesID, IsSameJobClass, JOB_SERIES_ID_ACOLYTE, JOB_SERIES_ID_ARCHER, JOB_SERIES_ID_GUNSLINGER,
    JOB_SERIES_ID_MERCHANT, JOB_SERIES_ID_NOVICE, JOB_SERIES_ID_SUMMONER, JOB_SERIES_ID_SWORDMAN,
    JOB_SERIES_ID_TAEGKUON
} from "./data/mig.job.h.js";
import { g_confDataYozi, g_objCharaConfCustomAtk } from "./global.js";
import { ApplySpecModify, GetTotalPureBasicStatus } from "./hmjob.js";
import { n_A_BaseLV, n_tok } from "./ro4-state.js";
import { CCharaConfCustomAtk } from "./CCharaConfCustomAtk.js";
import { CCharaConfYozi } from "./CCharaConfYozi.js";
import {
    CARD_ID_ECO_BURIKING_RX1_ARMA, CARD_ID_HENBONO_SHIROKISHI, CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_DIADEM,
    CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_SHOES, CARD_SET_ID_ENCHANT_ZODIAC_POLLUX_CROWN,
    CARD_SET_ID_ENCHANT_ZODIAC_POLLUX_SHOES, CARD_SET_ID_ENCHANT_ZODIAC_SHISHIKYUNO_CROWN,
    CARD_SET_ID_ENCHANT_ZODIAC_SHISHIKYUNO_MANT, CARD_SET_ID_ENCHANT_ZODIAC_SHISHIKYUNO_SHOES,
    CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_DIADEM, CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_SHOES,
    CARD_SET_ID_ENCHANT_ZODIAC_TENKATSUKYUNO_MANT, CARD_SET_ID_ENCHANT_ZODIAC_ZINBAKYUNO_SHOES
} from "./card.dat.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG } from "./chara.js";
import { CARD_REGION_ID_ARMS_LEFT_ANY, CARD_REGION_ID_ARMS_RIGHT_ANY } from "./common.js";
import { EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT } from "./const/EnumEquipRegionId.js";
import { ITEM_SP_PERFECT_ATTACK_UP, ITEM_SP_SHORTRANGE_DAMAGE_UP } from "./const/EnumItemSpId.js";
import {
    JOB_ID_GILOTINCROSS, JOB_ID_MINSTREL, JOB_ID_RANGER, JOB_ID_SHADOWCHASER, JOB_ID_SHURA, JOB_ID_STAR_EMPEROR,
    JOB_ID_WANDERER
} from "./const/EnumJobId.js";
import { GetRndOptTotalValue } from "./hmrndopt.js";
import {
    ITEM_ID_AKKI_RASETSUNO_YUBIWA, ITEM_ID_ANULUS_IRA, ITEM_ID_ASMODEUSNO_TSUBASA, ITEM_ID_BOINO_MUFFLER,
    ITEM_ID_ERYMANTHNO_KAWA, ITEM_ID_FUTAGONO_TWIN_RIBBON, ITEM_ID_GLOTONERIA, ITEM_ID_GRACE_ANIMAL_ROBE,
    ITEM_ID_GRACE_ARTIS_SUIT, ITEM_ID_GRACE_CONFIDENCIAL_MAIL, ITEM_ID_GRACE_CRUCIFORM_SUIT,
    ITEM_ID_GRACE_CULTIVATION_COAT, ITEM_ID_GRACE_GATLING_SUIT, ITEM_ID_GRACE_MAGMA_SUIT, ITEM_ID_GRACE_MENUS_SUIT,
    ITEM_ID_GRACE_RAINSTORM_SUIT, ITEM_ID_GRACE_TENCHI_SUIT, ITEM_ID_ILLUSION_DEATH_KNIFE,
    ITEM_ID_ILLUSION_RENGEKINO_TSUME, ITEM_ID_IMPERIAL_ANIMAL_ROBE, ITEM_ID_IMPERIAL_ARTIS_SUIT,
    ITEM_ID_IMPERIAL_CONFIDENCIAL_MAIL, ITEM_ID_IMPERIAL_CRUCIFORM_SUIT, ITEM_ID_IMPERIAL_CULTIVATION_COAT,
    ITEM_ID_IMPERIAL_GATLING_SUIT, ITEM_ID_IMPERIAL_MAGMA_SUIT, ITEM_ID_IMPERIAL_MENUS_SUIT,
    ITEM_ID_IMPERIAL_RAINSTORM_SUIT, ITEM_ID_IMPERIAL_TENCHI_SUIT, ITEM_ID_KAGAKUSHANO_MANT,
    ITEM_ID_MIRRORAGE_FOXTAIL, ITEM_ID_MIRRORAGE_GATLINGGUN, ITEM_ID_MIRRORAGE_GRENADEGUN, ITEM_ID_MIRRORAGE_HANDGUN,
    ITEM_ID_MIRRORAGE_RIFLE, ITEM_ID_MIRRORAGE_SHOTGUN, ITEM_ID_MIRRORAGE_WING, ITEM_ID_MYSTERY_WING,
    ITEM_ID_PILEBUNKER_T, ITEM_ID_PRETTY_URIBO_SHOES, ITEM_ID_RAINBOW_STAR, ITEM_ID_REIZOKUNO_KUBIWA,
    ITEM_ID_RING_OF_CERYNEIA, ITEM_ID_SANGAKU_HELMET, ITEM_ID_TENMA_GEDONO_GAITO, ITEM_ID_TRAVELER_RING,
    ITEM_ID_YOCHIYOCHI_URIBO_SUTAI, ITEM_ID_YOGANNO_MANT, ITEM_ID_ZYASPER_RING,
    ITEM_SET_ID_CRYSTAL_BLADE_NECKLACE_KYOGEKI, ITEM_SET_ID_ILLUSION_NEKKETSU_HACHIMAKI_ILLUSION_RENGEKINO_TSUME,
    ITEM_SET_ID_KUGUTSUNO_UDEWA_DARK_HAND
} from "./item.dat.js";
import { LearnedSkillSearch } from "./learnedskill.js";
import {
    SU_LUK, SU_STR, n_A_HEAD_DEF_PLUS, n_A_JOB, n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon2_ATKplus,
    n_A_Weapon_ATKplus
} from "./roro-state.js";
import {
    SKILL_ID_AIMED_BOLT, SKILL_ID_AUTO_SHADOW_SPELL, SKILL_ID_BUKI_KENKYU, SKILL_ID_DAITENHOSUI,
    SKILL_ID_DEATH_BOUND, SKILL_ID_ENDLESS_HUMMING_VOICE, SKILL_ID_ENRAGE_WOLF, SKILL_ID_FAW_MAGIC_DECOY,
    SKILL_ID_FAW_SILVER_SNIPER, SKILL_ID_FIRE_EXPANSION, SKILL_ID_FRIGNO_UTA, SKILL_ID_GOHO, SKILL_ID_HAPPO_KUNAI,
    SKILL_ID_HOWLING_OF_MANDRAGORA, SKILL_ID_KEN_SHUREN, SKILL_ID_MAGMA_ILLUPTION, SKILL_ID_MELANCHOLY,
    SKILL_ID_MURENO_CHIKARA, SKILL_ID_PLATINUM_ALTER, SKILL_ID_RAIKODAN, SKILL_ID_RANGER_MAIN, SKILL_ID_SENDENPO,
    SKILL_ID_SHURASHINDAN, SKILL_ID_SNAKE_EYE, SKILL_ID_SONIC_WAVE, SKILL_ID_SORYUKYAKU, SKILL_ID_SOUL_ATTACK,
    SKILL_ID_TENRACHIMO, SKILL_ID_TRAP_KENKYU, SKILL_ID_WASHINO_ME, SKILL_ID_WIND_CUTTER
} from "./skill.dat.js";
import { ROUNDDOWN } from "./foot-bridge.js";


export function ApplyGuaranteedHitUpPercent() {
    let confval = 0, sklLv = 0, itemCount = 0, itemCountRight = 0, itemCountLeft = 0, cardCountRight = 0, cardCountLeft = 0, idx = 0, skllv = 0;

//==== 必中攻撃＋○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

// TODO : ここでいいのか？

		//----------------------------------------------------------------
		// ランダムエンチャント効果
		//----------------------------------------------------------------
		for (idx = ITEM_SP_PERFECT_ATTACK_UP; idx <= ITEM_SP_PERFECT_ATTACK_UP; idx++) {
			n_tok[idx] += GetRndOptTotalValue(idx, null, false);
		}


		//----------------------------------------------------------------
		// 「[ECO] ブリキングRX1・アルマカード」の、精錬による効果
		//----------------------------------------------------------------
		cardCountRight = CardNumSearch(CARD_ID_ECO_BURIKING_RX1_ARMA, CARD_REGION_ID_ARMS_RIGHT_ANY);
		cardCountLeft = CardNumSearch(CARD_ID_ECO_BURIKING_RX1_ARMA, CARD_REGION_ID_ARMS_LEFT_ANY);
		if ((cardCountRight > 0) || (cardCountLeft > 0)) {
			if (n_A_Weapon_ATKplus >= 7) n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 5 * cardCountRight;
			if (n_A_Weapon2_ATKplus >= 7) n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 5 * cardCountLeft;
		}

		//----------------------------------------------------------------
		// 「パイルバンカーT」の、精錬による効果
		//----------------------------------------------------------------
		if (EquipNumSearch(ITEM_ID_PILEBUNKER_T)) {
			if (n_A_Weapon_ATKplus >= 7) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 30;
			}
		}

		//----------------------------------------------------------------
		// 「ミラージュウィング」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MIRRORAGE_WING)) > 0) {
			if ((skllv = LearnedSkillSearch(SKILL_ID_WASHINO_ME)) > 0) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * skllv * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ミラージュハンドガン」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MIRRORAGE_HANDGUN)) > 0) {
			if ((skllv = LearnedSkillSearch(SKILL_ID_SNAKE_EYE)) > 0) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * skllv * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ミラージュライフル」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MIRRORAGE_RIFLE)) > 0) {
			if ((skllv = LearnedSkillSearch(SKILL_ID_SNAKE_EYE)) > 0) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * skllv * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ミラージュガトリングガン」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MIRRORAGE_GATLINGGUN)) > 0) {
			if ((skllv = LearnedSkillSearch(SKILL_ID_SNAKE_EYE)) > 0) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * skllv * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ミラージュショットガン」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MIRRORAGE_SHOTGUN)) > 0) {
			if ((skllv = LearnedSkillSearch(SKILL_ID_SNAKE_EYE)) > 0) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * skllv * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ミラージュグレネードガン」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MIRRORAGE_GRENADEGUN)) > 0) {
			if ((skllv = LearnedSkillSearch(SKILL_ID_SNAKE_EYE)) > 0) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * skllv * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ミラージュフォックステイル」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_MIRRORAGE_FOXTAIL)) > 0) {
			if ((skllv = LearnedSkillSearch(SKILL_ID_SOUL_ATTACK)) > 0) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 20;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョン連撃の爪」の、スキル習得による強化
		//----------------------------------------------------------------
		itemCountRight = EquipNumSearch(ITEM_ID_ILLUSION_RENGEKINO_TSUME, EQUIP_REGION_ID_ARMS);
		itemCountLeft = EquipNumSearch(ITEM_ID_ILLUSION_RENGEKINO_TSUME, EQUIP_REGION_ID_ARMS_LEFT);
		if ((itemCountRight > 0) || (itemCountLeft > 0)) {

			if (LearnedSkillSearch(SKILL_ID_GOHO) >= 10) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 10 * (itemCountRight + itemCountLeft);
			}

			if (LearnedSkillSearch(SKILL_ID_SORYUKYAKU) >= 10) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 10 * (itemCountRight + itemCountLeft);
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョンデスナイフ」の、ベースレベルによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ILLUSION_DEATH_KNIFE)) > 0) {
			if (n_A_BaseLV >= 170) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 10 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「イリュージョン熱血連撃セット」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_ILLUSION_NEKKETSU_HACHIMAKI_ILLUSION_RENGEKINO_TSUME)) > 0) {

			sklLv = 0;

			sklLv += LearnedSkillSearch(SKILL_ID_GOHO);
			sklLv += LearnedSkillSearch(SKILL_ID_SORYUKYAKU);
			sklLv += LearnedSkillSearch(SKILL_ID_DAITENHOSUI);
			sklLv += LearnedSkillSearch(SKILL_ID_TENRACHIMO);

			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 5 * ROUNDDOWN(sklLv / 6) * itemCount;
		}

		//----------------------------------------------------------------
		// 「傀儡の腕輪　ダークハンドセット」の、精錬による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_KUGUTSUNO_UDEWA_DARK_HAND)) > 0) {

			if (n_A_HEAD_DEF_PLUS >= 6) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 15 * itemCount;
			}

			if (n_A_HEAD_DEF_PLUS >= 8) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「悪鬼羅刹の指輪」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_AKKI_RASETSUNO_YUBIWA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_RAIKODAN) >= 5) {
				 n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ぷりちーウリボウシューズ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_PRETTY_URIBO_SHOES)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA) >= 5) {
				 n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 50 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「暴威のマフラー」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_BOINO_MUFFLER)) > 0) {
			if ((skllv = LearnedSkillSearch(SKILL_ID_ENDLESS_HUMMING_VOICE)) >= 5) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 20 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「よちよちウリボウスタイ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_YOCHIYOCHI_URIBO_SUTAI)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 4 * LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA) * itemCount;
		}

		//----------------------------------------------------------------
		// 「レインボースター」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_RAINBOW_STAR)) > 0) {
			if ((skllv = LearnedSkillSearch(SKILL_ID_TRAP_KENKYU)) >= 10) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 30 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「溶岩のマント」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_YOGANNO_MANT)) > 0) {
			if ((skllv = LearnedSkillSearch(SKILL_ID_FAW_MAGIC_DECOY)) >= 5) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 50 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「隷属の首輪」の、素ＳＴＲと素ＬＵＫによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_REIZOKUNO_KUBIWA)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 5 * ROUNDDOWN((SU_STR + SU_LUK) / 50) * itemCount;
		}

		//----------------------------------------------------------------
		// 「天魔外道の外套」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_TENMA_GEDONO_GAITO)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 4 * LearnedSkillSearch(SKILL_ID_RAIKODAN) * itemCount;
		}

		//----------------------------------------------------------------
		// 「双子のツインリボン」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_FUTAGONO_TWIN_RIBBON)) > 0) {
			if ((skllv = LearnedSkillSearch(SKILL_ID_ENDLESS_HUMMING_VOICE)) >= 5) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 30 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「科学者のマント」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_KAGAKUSHANO_MANT)) > 0) {
			if ((skllv = LearnedSkillSearch(SKILL_ID_HOWLING_OF_MANDRAGORA)) >= 5) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 50 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「クリスタルブレイドネックレス　エンチャント強撃セット」の、職業による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_CRYSTAL_BLADE_NECKLACE_KYOGEKI)) > 0) {
			switch (GetLowerJobSeriesID(n_A_JOB)) {
			case JOB_SERIES_ID_NOVICE:
			case JOB_SERIES_ID_SWORDMAN:
			case JOB_SERIES_ID_ARCHER:
			case JOB_SERIES_ID_ACOLYTE:
			case JOB_SERIES_ID_MERCHANT:
			case JOB_SERIES_ID_TAEGKUON:
			case JOB_SERIES_ID_GUNSLINGER:
			case JOB_SERIES_ID_SUMMONER:
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 30 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「エリュマントスの皮」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_ERYMANTHNO_KAWA)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * LearnedSkillSearch(SKILL_ID_AIMED_BOLT) * itemCount;
		}

		//----------------------------------------------------------------
		// 「アーヌルス イラ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_ANULUS_IRA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SENDENPO) >= 5) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 30 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「インペリアルアニマルローブ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_ANIMAL_ROBE)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 3 * LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースアニマルローブ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_ANIMAL_ROBE)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 5 * LearnedSkillSearch(SKILL_ID_MURENO_CHIKARA) * itemCount;
		}

		//----------------------------------------------------------------
		// 「インペリアルガトリングスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_GATLING_SUIT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 3 * LearnedSkillSearch(SKILL_ID_PLATINUM_ALTER) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースガトリングスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_GATLING_SUIT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 5 * LearnedSkillSearch(SKILL_ID_PLATINUM_ALTER) * itemCount;
		}

		//----------------------------------------------------------------
		// 「インペリアルクルシフォームスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_CRUCIFORM_SUIT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 3 * LearnedSkillSearch(SKILL_ID_HAPPO_KUNAI) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースクルシフォームスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_CRUCIFORM_SUIT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 5 * LearnedSkillSearch(SKILL_ID_HAPPO_KUNAI) * itemCount;
		}

		//----------------------------------------------------------------
		// 「ジャスパーリング」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_ZYASPER_RING)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_DEATH_BOUND) >= 10) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「グロトネリーア」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GLOTONERIA)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * LearnedSkillSearch(SKILL_ID_AUTO_SHADOW_SPELL) * itemCount;
		}

		//----------------------------------------------------------------
		// 「山岳ヘルメット」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_SANGAKU_HELMET)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_FAW_SILVER_SNIPER) >= 5) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 50 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「インペリアルマグマスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_MAGMA_SUIT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 3 * LearnedSkillSearch(SKILL_ID_MAGMA_ILLUPTION) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースマグマスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_MAGMA_SUIT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 5 * LearnedSkillSearch(SKILL_ID_MAGMA_ILLUPTION) * itemCount;
		}

		//----------------------------------------------------------------
		// 「インペリアル天地スーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_TENCHI_SUIT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 3 * Math.floor(LearnedSkillSearch(SKILL_ID_SHURASHINDAN) / 2) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレース天地スーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_TENCHI_SUIT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 5 * Math.floor(LearnedSkillSearch(SKILL_ID_SHURASHINDAN) / 2) * itemCount;
		}

		//----------------------------------------------------------------
		// 「インペリアルアーティススーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_ARTIS_SUIT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 1 * LearnedSkillSearch(SKILL_ID_BUKI_KENKYU) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースアーティススーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_ARTIS_SUIT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * LearnedSkillSearch(SKILL_ID_BUKI_KENKYU) * itemCount;
		}

		//----------------------------------------------------------------
		// 「インペリアルメナススーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_MENUS_SUIT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 3 * Math.floor(LearnedSkillSearch(SKILL_ID_KEN_SHUREN) / 2) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースメナススーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_MENUS_SUIT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 5 * Math.floor(LearnedSkillSearch(SKILL_ID_KEN_SHUREN) / 2) * itemCount;
		}

		//----------------------------------------------------------------
		// 「インペリアルレインストームスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_IMPERIAL_RAINSTORM_SUIT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 3 * LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースレインストームスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_GRACE_RAINSTORM_SUIT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 5 * LearnedSkillSearch(SKILL_ID_FRIGNO_UTA) * itemCount;
		}

		//----------------------------------------------------------------
		// 「リングオブケリュネイア」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_RING_OF_CERYNEIA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_RANGER_MAIN) >= 10) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「インペリアルコンフィデンシャルメイル」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_CONFIDENCIAL_MAIL)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 3 * LearnedSkillSearch(SKILL_ID_WIND_CUTTER) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースコンフィデンシャルメイル」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_GRACE_CONFIDENCIAL_MAIL)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 5 * LearnedSkillSearch(SKILL_ID_WIND_CUTTER) * itemCount;
		}

		//----------------------------------------------------------------
		// 「インペリアルカルティベイションコート」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_IMPERIAL_CULTIVATION_COAT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 3 * LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) * itemCount;
		}

		//----------------------------------------------------------------
		// 「グレースカルティベイションコート」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_GRACE_CULTIVATION_COAT)) > 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 5 * LearnedSkillSearch(SKILL_ID_FIRE_EXPANSION) * itemCount;
		}

		//----------------------------------------------------------------
		// 「トラベラーリング」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_TRAVELER_RING)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_MELANCHOLY) >= 5) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 15 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「アスモデウスの翼」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearch(ITEM_ID_ASMODEUSNO_TSUBASA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_SONIC_WAVE) >= 10) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 25 * itemCount;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　獅子宮のクラウン」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SHISHIKYUNO_CROWN)) {
			if (IsSameJobClass(JOB_ID_SHURA)) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * n_A_HEAD_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　獅子宮のクラウン」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SHISHIKYUNO_MANT)) {
			if (IsSameJobClass(JOB_ID_SHURA)) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * n_A_SHOULDER_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　獅子宮のシューズ」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SHISHIKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_SHURA)) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 3 * n_A_SHOES_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　人馬宮のシューズ」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_ZINBAKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_RANGER)) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 3 * n_A_SHOES_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　双児宮のダイアデム」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_DIADEM)) {
			if (IsSameJobClass(JOB_ID_MINSTREL) || IsSameJobClass(JOB_ID_WANDERER)) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * n_A_HEAD_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　双児宮のシューズ」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_MINSTREL) || IsSameJobClass(JOB_ID_WANDERER)) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 3 * n_A_SHOES_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　天蝎宮のマント」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_TENKATSUKYUNO_MANT)) {
			if (IsSameJobClass(JOB_ID_GILOTINCROSS)) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * n_A_SHOULDER_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　ポルックスクラウン」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_POLLUX_CROWN)) {
			if (IsSameJobClass(JOB_ID_STAR_EMPEROR)) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * n_A_HEAD_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　ポルックスシューズ」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_POLLUX_SHOES)) {
			if (IsSameJobClass(JOB_ID_STAR_EMPEROR)) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * n_A_SHOES_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　磨羯宮のダイアデム」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_DIADEM)) {
			if (IsSameJobClass(JOB_ID_SHADOWCHASER)) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 2 * n_A_HEAD_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ゾディアック　磨羯宮のシューズ」セットの、職業による効果
		//----------------------------------------------------------------
		if (CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_SHOES)) {
			if (IsSameJobClass(JOB_ID_SHADOWCHASER)) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 3 * n_A_SHOES_DEF_PLUS;
			}
		}

		//----------------------------------------------------------------
		// 「ミステリーウィング」の、素ステータスによる効果
		//----------------------------------------------------------------
		if ((itemCount = EquipNumSearchMIG(ITEM_ID_MYSTERY_WING)) > 0) {
			if (GetTotalPureBasicStatus() >= 500) {
				n_tok[ITEM_SP_PERFECT_ATTACK_UP] += 25 * itemCount;
			}
		}


		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果
		//----------------------------------------------------------------
		confval = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_PERFECT_ATTACK);
		if (confval != 0) {
			n_tok[ITEM_SP_PERFECT_ATTACK_UP] += confval;
		}


		// TODO: 四次対応
		for (idx = ITEM_SP_PERFECT_ATTACK_UP; idx <= ITEM_SP_PERFECT_ATTACK_UP; idx++) {
			n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
		}

	/**
	 * 公式サイトで
	 * 近接物理攻撃で与えるダメージ ＋ ○○％
	 * と表記されるダメージ増加効果
	 */
	{
		let prefetch = 0;

		//----------------------------------------------------------------
		// ★★★暫定措置　コピペ禁止★★★
		// 「変貌の白騎士」の、効果
		//----------------------------------------------------------------
		if ((prefetch = CardNumSearch(CARD_ID_HENBONO_SHIROKISHI)) > 0) {
			n_tok[ITEM_SP_SHORTRANGE_DAMAGE_UP] += 5 * prefetch;
			n_tok[ITEM_SP_SHORTRANGE_DAMAGE_UP] += 1 * Math.floor(n_A_BaseLV / 20) * prefetch;
		}

		//----------------------------------------------------------------
		// 「インペリアルマグマスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((prefetch = EquipNumSearchMIG(ITEM_ID_IMPERIAL_MAGMA_SUIT)) > 0) {
			n_tok[ITEM_SP_SHORTRANGE_DAMAGE_UP] += 3 * LearnedSkillSearch(SKILL_ID_MAGMA_ILLUPTION) * prefetch;
		}

		//----------------------------------------------------------------
		// 「グレースマグマスーツ」の、スキル習得による効果
		//----------------------------------------------------------------
		if ((prefetch = EquipNumSearchMIG(ITEM_ID_GRACE_MAGMA_SUIT)) > 0) {
			n_tok[ITEM_SP_SHORTRANGE_DAMAGE_UP] += 6 * LearnedSkillSearch(SKILL_ID_MAGMA_ILLUPTION) * prefetch;
		}

		/** 四次職支援 アリテア「ゼファーリンク」の効果  */
		if (g_confDataYozi[CCharaConfYozi.CONF_ID_ZEPHYR_LINK]) {
			n_tok[ITEM_SP_SHORTRANGE_DAMAGE_UP] += 15;
		}

		/** ドルイド「エンレイジウルフ」の効果 */
		n_tok[ITEM_SP_SHORTRANGE_DAMAGE_UP] += 2 * UsedSkillSearch(SKILL_ID_ENRAGE_WOLF);

		/**
		 * 幻想叢書カード セイレン
		 */
		if (n_A_PassSkill7[52] === 4) {
			n_tok[ITEM_SP_SHORTRANGE_DAMAGE_UP] += 5;
		}

		//----------------------------------------------------------------
		// 「性能カスタマイズ」の、効果（遠距離と共用）
		//----------------------------------------------------------------
		prefetch = g_objCharaConfCustomAtk.GetConf(CCharaConfCustomAtk.CONF_ID_LONGRANGE_DAMAGE_UP);
		if (prefetch != 0) {
			n_tok[ITEM_SP_SHORTRANGE_DAMAGE_UP] += prefetch;
		}

		// TODO: 四次対応
		for (let idx = ITEM_SP_SHORTRANGE_DAMAGE_UP; idx <= ITEM_SP_SHORTRANGE_DAMAGE_UP; idx++) {
			n_tok[idx] = ApplySpecModify(idx, n_tok[idx]);
		}
	}

}
