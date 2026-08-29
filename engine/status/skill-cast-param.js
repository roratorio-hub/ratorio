/**
 * 特定スキルの詠唱時間短縮効果を取得する（変動・固定・強制詠唱の各スケーリング/固定値）。
 *
 * stallcalc.js から分割（.claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」）。
 * 関数本文は stallcalc.js から移動のみで変更していない（バイト単位で同一）。
 */
import { UsedSkillSearch } from "../skill/skillstate.js";
import { GetHigherJobSeriesID, IsSameJobClass, JOB_SERIES_ID_BLACKSMITH } from "../data/mig.job.h.js";
import { g_confDataDebuff, g_objCharaConfCustomSkill } from "../runtime/global.js";
import { n_A_BaseLV } from "../runtime/ro4-state.js";
import { CCharaConfCustomSkill } from "../chara/CCharaConfCustomSkill.js";
import { CCharaConfDebuff } from "../chara/CCharaConfDebuff.js";
import {
    CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_GENETIC_3, CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_RING
} from "../equip/card.dat.js";
import { CardNumSearch, EquipNumSearch, EquipNumSearchMIG } from "../chara/chara.js";
import {
    EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_BODY, EQUIP_REGION_ID_HEAD_TOP, EQUIP_REGION_ID_SHOES,
    EQUIP_REGION_ID_SHOULDER
} from "../const/EnumEquipRegionId.js";
import {
    ITEM_SP_SKILL_CAST_MINUS_OFFSET, ITEM_SP_SKILL_CAST_TIME_OFFSET, ITEM_SP_SKILL_FIXED_MINUS_OFFSET,
    ITEM_SP_SKILL_FIXED_TIME_OFFSET
} from "../const/EnumItemSpId.js";
import { JOB_ID_MECHANIC, JOB_ID_SUMMONER } from "../const/EnumJobId.js";
import { EQUIP_REGION_ID_ANY } from "../const/EnumMigItemParamId.js";
import { GetEquippedTotalSPCardAndElse, GetEquippedTotalSPEquip } from "./equipped-sp.js";
import {
    ITEM_ID_AEON_STUFF, ITEM_ID_AKUMANO_TE, ITEM_ID_ANULUS_IRA, ITEM_ID_ASMODEUSNO_TSUBASA, ITEM_ID_ASSAULT_SUIT,
    ITEM_ID_BOOK_OF_SOURCERERY, ITEM_ID_ELEMENTAL_BOOTS, ITEM_ID_EMERALDEARRING, ITEM_ID_FAFNIR_HELM,
    ITEM_ID_FIFTH_ELEMENT, ITEM_ID_FOUR_OF_A_KIND, ITEM_ID_FUSHICHONO_KANMURI, ITEM_ID_GEFFENIA_KORINO_MADOGU,
    ITEM_ID_GENZYUNO_MIMI, ITEM_ID_GLORIOUS_FIST, ITEM_ID_GLORIOUS_RIFLE, ITEM_ID_GRACE_ANIMAL_ROBE,
    ITEM_ID_GRACE_HOLY_ROBE, ITEM_ID_GRACE_MAGMA_SUIT, ITEM_ID_GRACE_PUNISHMENT_ROBE, ITEM_ID_GUNSE, ITEM_ID_HORAGAI,
    ITEM_ID_IMPERIAL_ANIMAL_ROBE, ITEM_ID_IMPERIAL_MAGMA_SUIT, ITEM_ID_JAGUAR_NOTE, ITEM_ID_KAGAKUSHANO_MANT,
    ITEM_ID_KERAUNOS, ITEM_ID_KYOZYUNO_MINIGLASS, ITEM_ID_LACRYMA_STICK, ITEM_ID_MIKAWASHINO_CAPE,
    ITEM_ID_MOFUMOFU_LOVELY_FOX, ITEM_ID_MOKOFUWA_SHARK_PAJAMA, ITEM_ID_MOKOMOKO_OSAKANA_SHOES,
    ITEM_ID_NIRONO_RIBBON, ITEM_ID_ONRYO_KAIINO_MIMI, ITEM_ID_PIKAPIKA_NYANNYAN_CROWN, ITEM_ID_POWERED_CHIP,
    ITEM_ID_POWERED_INCOME, ITEM_ID_PRETTY_URIBO_SHOES, ITEM_ID_RASEN_FUMANO_HOZYU, ITEM_ID_RINRIN_NYAN_KABERU,
    ITEM_ID_SAPPHIRE_LIST, ITEM_ID_SEIREINO_ROBE, ITEM_ID_SEISHANO_KANMURI, ITEM_ID_SHIELD_RING,
    ITEM_ID_SHIKKOUSHANO_SHOES, ITEM_ID_SHINPANNO_TENBIN, ITEM_ID_SNIPING_VEIL, ITEM_ID_SUHAINO_YUBIWA,
    ITEM_ID_TENGUNO_GETA, ITEM_ID_TOKUSEN_HANO_OMAMORI, ITEM_ID_TOKUSEN_USAGINO_OMAMORI, ITEM_ID_TRAVELER_SHOES,
    ITEM_ID_WORK_CAP, ITEM_ID_YOCHIYOCHI_URIBO_SUTAI, ITEM_SET_ID_AOI_HONONO_TSUE_ABYSS_GHOST_CARD,
    ITEM_SET_ID_ENCHANT_ZODIAC_HIKARUEDANO_OMAMORI, ITEM_SET_ID_ENCHANT_ZODIAC_KAWAII_KUSANO_NECKLACE,
    ITEM_SET_ID_ENCHANT_ZODIAC_MARYOKUNO_KUSANO_NECKLACE, ITEM_SET_ID_ENCHANT_ZODIAC_POCCHARI_MIMIZUNO_OMAMORI,
    ITEM_SET_ID_ENCHANT_ZODIAC_SHINSENNA_KUSANO_NECKLACE, ITEM_SET_ID_ENCHANT_ZODIAC_SHINSENNA_MAGURONO_OMAMORI,
    ITEM_SET_ID_FALCON_BRITZ_LITTLE_FEATHER_HAT, ITEM_SET_ID_GEFENIA_MIZUNO_KOSHO_LACRYMA_STICK,
    ITEM_SET_ID_GOFUSEKI_GERADRIA, ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_CULTIVATION_COAT,
    ITEM_SET_ID_SABAKINO_KUTSU_HOLY_STICK, ITEM_SET_ID_ULTIMATE_MODE_CHANGER_NABUNO_CLOTH,
    ITEM_SET_ID_ULTIMATE_MODE_CHANGER_PEORTH_GREEVE
} from "../equip/item.dat.js";
import { LearnedSkillSearch } from "../skill/learnedskill.js";
import {
    n_A_BODY_DEF_PLUS, n_A_JOB, n_A_SHIELD_DEF_PLUS, n_A_SHOES_DEF_PLUS, n_A_SHOULDER_DEF_PLUS, n_A_Weapon_ATKplus
} from "../runtime/roro-state.js";
import {
    SKILL_ID_ACID_DEMONSTRATION, SKILL_ID_ADORAMUS, SKILL_ID_AIMED_BOLT, SKILL_ID_ARCLOUSE_DASH,
    SKILL_ID_ARMS_CANNON, SKILL_ID_ASHURA_HAOKEN, SKILL_ID_ASHURA_HAOKEN_SPKOTEI, SKILL_ID_BUNISHING_BASTER,
    SKILL_ID_CAMOUFLAGE, SKILL_ID_CARROT_BEAT, SKILL_ID_CHATTERING, SKILL_ID_COLD_BOLT, SKILL_ID_COLD_THROWER,
    SKILL_ID_COMMET, SKILL_ID_COUNTER_SLASH, SKILL_ID_CRYMSON_ROCK, SKILL_ID_DAICHINO_TAMASHI, SKILL_ID_EARTH_DRIVE,
    SKILL_ID_EARTH_GRAVE, SKILL_ID_EARTH_SPIKE, SKILL_ID_EBI_PARTY, SKILL_ID_EBI_ZANMAI, SKILL_ID_ESFU,
    SKILL_ID_ESPA, SKILL_ID_FAW_SILVER_SNIPER, SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_DRAGON_BREATH,
    SKILL_ID_FLAME_THROWER, SKILL_ID_FREEZING_SPELL, SKILL_ID_FROST_MISTY, SKILL_ID_FUMASHURIKEN_RANKA,
    SKILL_ID_GREED, SKILL_ID_GROOMING, SKILL_ID_HELLS_PLANT, SKILL_ID_HITO_DAICHINO_KENKYU,
    SKILL_ID_HOWLING_OF_MANDRAGORA, SKILL_ID_IGNITION_BREAK, SKILL_ID_INSPIRATION, SKILL_ID_INUHAKKA_METEOR,
    SKILL_ID_INUHAKKA_SHOWER, SKILL_ID_JACK_FROST, SKILL_ID_JUDEX, SKILL_ID_KEIKAI, SKILL_ID_KIKO,
    SKILL_ID_KINGS_GRACE, SKILL_ID_KONGO, SKILL_ID_LIGHTNING_BOLT, SKILL_ID_MAGURO_SHIELD, SKILL_ID_MAHORYOKU_ZOFUKU,
    SKILL_ID_MASS_SPIRAL, SKILL_ID_MATATABINO_NEKKO, SKILL_ID_MATATABI_LANCE, SKILL_ID_MELANCHOLY,
    SKILL_ID_METALIC_SOUND, SKILL_ID_METEOR_ASSALT, SKILL_ID_MOON_SLUSHER, SKILL_ID_MURENO_CHIKARA,
    SKILL_ID_MYAUMYAU, SKILL_ID_NODOWO_NARASU, SKILL_ID_NUTRAL_BARRIER, SKILL_ID_NYAN_GRASS, SKILL_ID_NYAN_JAMP,
    SKILL_ID_ORATIO, SKILL_ID_OTORO, SKILL_ID_OVER_BLAND, SKILL_ID_PIKKI_TSUKI, SKILL_ID_PINGPOINT_ATTACK,
    SKILL_ID_POISON_SMOKE, SKILL_ID_PRAEFATIO, SKILL_ID_PSYCHIC_WAVE, SKILL_ID_RAIKODAN, SKILL_ID_RASETSU_HAOGEKI,
    SKILL_ID_RASETSU_HAOGEKI_MAX, SKILL_ID_RAY_OF_GENESIS, SKILL_ID_READING_SPELLBOOK, SKILL_ID_REFRESH,
    SKILL_ID_RELEASE, SKILL_ID_RENKIKO, SKILL_ID_RENOVATIO, SKILL_ID_SAVAGENO_TAMASHI, SKILL_ID_SEIMEINO_TAMASHI,
    SKILL_ID_SENRYU_SHOTEN, SKILL_ID_SERE, SKILL_ID_SERE_MODE, SKILL_ID_SHARP_SHOOTING, SKILL_ID_SHINDOZANKYO,
    SKILL_ID_SHINSENNA_EBI, SKILL_ID_SISIKO, SKILL_ID_SPORE_EXPLOSION, SKILL_ID_STORM_GUST,
    SKILL_ID_SUMMON_FIRE_BALL, SKILL_ID_SUMMON_LIGHTNING_BALL, SKILL_ID_SUMMON_STONE, SKILL_ID_SUMMON_WATER_BALL,
    SKILL_ID_TAROUNO_KIZU, SKILL_ID_TELECHINESIS_INSTENCE, SKILL_ID_TENKETSU_KYU, SKILL_ID_TETRA_BOLTEX,
    SKILL_ID_TRACKING, SKILL_ID_UMINO_TAMASHI, SKILL_ID_UZUKUMARU, SKILL_ID_VACUUM_EXTREME, SKILL_ID_VERATURE_SPEAR,
    SKILL_ID_WATER_DRAGON_BREATH, SKILL_ID_WEAPON_BLOCKING, SKILL_ID_WEAPON_CRUSH, SKILL_ID_WIND_CUTTER,
    SKILL_ID_YOMIGAESHI, SKILL_ID_ZIRAISHIN
} from "../skill/skill.dat.js";
import { ROUNDDOWN } from "../bridge/stallcalc-bridge.js";

/**
 * 特定スキルの変動詠唱時間を％で取得する。短縮効果が付与されていない場合は100が返される。
 * @param {*} skillId 
 * @returns 
 */
export function GetCastScalingOfSkillForCastTimeVary(skillId) {
	var itemCount = 0;
	var eqpnum = 0;
	var sklLv = 0, confval = 0;
	var scaling = 100;

	// 装備品の短縮効果
	if (GetEquippedTotalSPEquip(ITEM_SP_SKILL_CAST_TIME_OFFSET + skillId) != 0) {
		scaling -= GetEquippedTotalSPEquip(ITEM_SP_SKILL_CAST_TIME_OFFSET + skillId);
	}

	if (GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_CAST_TIME_OFFSET + skillId) != 0) {
		scaling -= GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_CAST_TIME_OFFSET + skillId);
	}

	//----------------------------------------------------------------
	// 「グロリアスフィスト」の「阿修羅覇凰拳」短縮
	//----------------------------------------------------------------
	if ( (skillId == SKILL_ID_ASHURA_HAOKEN) || (skillId == SKILL_ID_ASHURA_HAOKEN_SPKOTEI) ) {
		if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(ITEM_ID_GLORIOUS_FIST)) {
			scaling -= 100;
		}
	}

	//----------------------------------------------------------------
	// 「グロリアスライフル」の「トラッキング」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_TRACKING) {
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(ITEM_ID_GLORIOUS_RIFLE)) {
			scaling -= 25;
		}
	}

	//----------------------------------------------------------------
	// 「ラクリマスティック」の「ストームガスト」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_STORM_GUST) {
		if(n_A_Weapon_ATKplus >= 10 && EquipNumSearch(ITEM_ID_LACRYMA_STICK)) {
			scaling -= 8;
		}
	}

	//----------------------------------------------------------------
	// 「ファルケンブリッツ　リトルフェザーハットセット」の「シャープシューティング」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SHARP_SHOOTING) {
		if(n_A_Weapon_ATKplus >= 10 && EquipNumSearch(ITEM_SET_ID_FALCON_BRITZ_LITTLE_FEATHER_HAT)) {
			scaling -= 50;
		}
	}

	//----------------------------------------------------------------
	// 「ゲフェニア水の古書　ラクリマスティックセット」の「ストームガスト」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_STORM_GUST) {
		if(EquipNumSearch(ITEM_SET_ID_GEFENIA_MIZUNO_KOSHO_LACRYMA_STICK)) {
			scaling -= 4 * n_A_SHIELD_DEF_PLUS;
		}
	}

	//----------------------------------------------------------------
	// 「ゲフェニア水の古書　ラクリマスティックセット」の「フロストミスティ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_FROST_MISTY) {
		if(EquipNumSearch(ITEM_SET_ID_GEFENIA_MIZUNO_KOSHO_LACRYMA_STICK)) {
			scaling -= 4 * n_A_SHIELD_DEF_PLUS;
		}
	}

	//----------------------------------------------------------------
	// 「ゲフェニア水の古書　ラクリマスティックセット」の「ジャックフロスト」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_JACK_FROST) {
		if(EquipNumSearch(ITEM_SET_ID_GEFENIA_MIZUNO_KOSHO_LACRYMA_STICK)) {
			scaling -= 4 * n_A_SHIELD_DEF_PLUS;
		}
	}

	//----------------------------------------------------------------
	// 「エレメンタルブーツ」の「ファイアーボルト」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_FIRE_BOLT) {
		if(n_A_SHOES_DEF_PLUS >= 6 && EquipNumSearch(ITEM_ID_ELEMENTAL_BOOTS)) {
			scaling -= n_A_SHOES_DEF_PLUS - 5;
		}
	}

	//----------------------------------------------------------------
	// 「エレメンタルブーツ」の「コールドボルト」短縮
	//----------------------------------------------------------------
	if (skillId==SKILL_ID_COLD_BOLT) {
		if(n_A_SHOES_DEF_PLUS >= 6 && EquipNumSearch(ITEM_ID_ELEMENTAL_BOOTS)) {
			scaling -= n_A_SHOES_DEF_PLUS - 5;
		}
	}

	//----------------------------------------------------------------
	// 「エレメンタルブーツ」の「ライトニングボルト」短縮
	//----------------------------------------------------------------
	if (skillId==SKILL_ID_LIGHTNING_BOLT) {
		if(n_A_SHOES_DEF_PLUS >= 6 && EquipNumSearch(ITEM_ID_ELEMENTAL_BOOTS)) {
			scaling -= n_A_SHOES_DEF_PLUS - 5;
		}
	}

	//----------------------------------------------------------------
	// 「エレメンタルブーツ」の「アーススパイク」短縮
	//----------------------------------------------------------------
	if (skillId==SKILL_ID_EARTH_SPIKE) {
		if(n_A_SHOES_DEF_PLUS >= 6 && EquipNumSearch(ITEM_ID_ELEMENTAL_BOOTS)) {
			scaling -= n_A_SHOES_DEF_PLUS - 5;
		}
	}

	//----------------------------------------------------------------
	// 「法螺貝」の「振動残響」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SHINDOZANKYO) {
		if (EquipNumSearch(ITEM_ID_HORAGAI) > 0) {
			if(n_A_Weapon_ATKplus >= 5) scaling -= 10;
			if(n_A_Weapon_ATKplus >= 7) scaling -= 20;
			if(n_A_Weapon_ATKplus >= 9) scaling -= 40;
		}
	}

	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　ペオースグリーブセット」の「ウィンドカッター」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_WIND_CUTTER) {
		if (EquipNumSearch(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_PEORTH_GREEVE) > 0) {
			scaling -= 50;

			if(n_A_SHOES_DEF_PLUS >= 7) {
				scaling -= 50;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ケラウノス」の「雷光弾」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_RAIKODAN) {
		if ((itemCount = EquipNumSearch(ITEM_ID_KERAUNOS)) > 0) {
			scaling -= 5 * ROUNDDOWN(n_A_BaseLV / 15) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ケラウノス」の「羅刹覇王撃」短縮
	//----------------------------------------------------------------
	if ( (skillId == SKILL_ID_RASETSU_HAOGEKI_MAX)
		|| (skillId == SKILL_ID_RASETSU_HAOGEKI)) {
		if ((itemCount = EquipNumSearch(ITEM_ID_KERAUNOS)) > 0) {
			scaling -= 3 * ROUNDDOWN(n_A_BaseLV / 20) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「業風石　ゲラドリア　セット」の「ウィンドカッター」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_WIND_CUTTER) {
		if ((itemCount = EquipNumSearch(ITEM_SET_ID_GOFUSEKI_GERADRIA)) > 0) {
			if (n_A_Weapon_ATKplus >= 10) {
				scaling -= 50;
			}
		}
	}

	//----------------------------------------------------------------
	// 「パワードチップ」の「アームズキャノン」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ARMS_CANNON) {
		if ((itemCount = EquipNumSearch(ITEM_ID_POWERED_CHIP)) > 0) {
			if ((sklLv = LearnedSkillSearch(SKILL_ID_NUTRAL_BARRIER)) >= 3) {
				scaling -= 50 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「パワードチップ」の「コールドスロワー」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_COLD_THROWER) {
		if ((itemCount = EquipNumSearch(ITEM_ID_POWERED_CHIP)) > 0) {
			if ((sklLv = LearnedSkillSearch(SKILL_ID_NUTRAL_BARRIER)) >= 3) {
				scaling -= 50 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「パワードチップ」の「フレイムスロワー」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_FLAME_THROWER) {
		if ((itemCount = EquipNumSearch(ITEM_ID_POWERED_CHIP)) > 0) {
			if ((sklLv = LearnedSkillSearch(SKILL_ID_NUTRAL_BARRIER)) >= 3) {
				scaling -= 50 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「特選葉のお守り」の「イヌハッカメテオ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_INUHAKKA_METEOR) {
		if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_HANO_OMAMORI)) > 0) {
			scaling -=  3 * ROUNDDOWN(n_A_BaseLV / 10) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「執行者のシューズ」の「メテオアサルト」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_METEOR_ASSALT) {
		eqpnum = EquipNumSearch(ITEM_ID_SHIKKOUSHANO_SHOES, EQUIP_REGION_ID_SHOES);
		if (eqpnum > 0) {
			scaling -= 7 * LearnedSkillSearch(SKILL_ID_WEAPON_BLOCKING) * eqpnum;
			scaling -= 7 * LearnedSkillSearch(SKILL_ID_WEAPON_CRUSH) * eqpnum;
			scaling -= 7 * LearnedSkillSearch(SKILL_ID_COUNTER_SLASH) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「サファイアリスト」の「アシッドデモンストレーション」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ACID_DEMONSTRATION) {
		eqpnum = EquipNumSearch(ITEM_ID_SAPPHIRE_LIST, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			scaling -= Math.floor(n_A_BaseLV / 4) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「裁きの靴　ホーリーステッキセット」の「ジュデックス」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_JUDEX) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_SABAKINO_KUTSU_HOLY_STICK, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			scaling -= 5 * LearnedSkillSearch(SKILL_ID_ORATIO) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「裁きの靴　ホーリーステッキセット」の「アドラムス」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ADORAMUS) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_SABAKINO_KUTSU_HOLY_STICK, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			scaling -= 5 * LearnedSkillSearch(SKILL_ID_ORATIO) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「悪魔の手」の「気功」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_KIKO) {
		eqpnum = EquipNumSearch(ITEM_ID_AKUMANO_TE, EQUIP_REGION_ID_HEAD_TOP);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_RAIKODAN) >= 5) {
				scaling -= 50 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「悪魔の手」の「金剛」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_KONGO) {
		eqpnum = EquipNumSearch(ITEM_ID_AKUMANO_TE, EQUIP_REGION_ID_HEAD_TOP);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_RAIKODAN) >= 5) {
				scaling -= 50 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「悪魔の手」の「獅子吼」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SISIKO) {
		eqpnum = EquipNumSearch(ITEM_ID_AKUMANO_TE, EQUIP_REGION_ID_HEAD_TOP);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_RAIKODAN) >= 5) {
				scaling -= 50 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「悪魔の手」の「練気功」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_RENKIKO) {
		eqpnum = EquipNumSearch(ITEM_ID_AKUMANO_TE, EQUIP_REGION_ID_HEAD_TOP);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_RAIKODAN) >= 5) {
				scaling -= 50 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「特選ウサギのお守り」の「キャロットビート」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_CARROT_BEAT) {
		if ((itemCount = EquipNumSearch(ITEM_ID_TOKUSEN_USAGINO_OMAMORI)) > 0) {
			scaling -= 3 * ROUNDDOWN(n_A_BaseLV / 10) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「エメラルドイヤリング」の「メタリックサウンド」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_METALIC_SOUND) {
		if ((itemCount = EquipNumSearch(ITEM_ID_EMERALDEARRING)) > 0) {
			scaling -= 1 * ROUNDDOWN(n_A_BaseLV / 5) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「天狗の下駄」の「気功」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_KIKO) {
		if ((itemCount = EquipNumSearch(ITEM_ID_TENGUNO_GETA)) > 0) {
			scaling -= 10 * LearnedSkillSearch(SKILL_ID_TENKETSU_KYU) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「天狗の下駄」の「金剛」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_KONGO) {
		if ((itemCount = EquipNumSearch(ITEM_ID_TENGUNO_GETA)) > 0) {
			scaling -= 10 * LearnedSkillSearch(SKILL_ID_TENKETSU_KYU) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「天狗の下駄」の「練気功」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_RENKIKO) {
		if ((itemCount = EquipNumSearch(ITEM_ID_TENGUNO_GETA)) > 0) {
			scaling -= 10 * LearnedSkillSearch(SKILL_ID_TENKETSU_KYU) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「トラベラーシューズ」の、「メタリックサウンド」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_METALIC_SOUND) {
		if ((itemCount = EquipNumSearch(ITEM_ID_TRAVELER_SHOES)) > 0) {
			scaling -= 10 * LearnedSkillSearch(SKILL_ID_MELANCHOLY) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「もこもこお魚シューズ」の、「シーフード系スキル」短縮
	//----------------------------------------------------------------
	if ( (skillId == SKILL_ID_SHINSENNA_EBI)
		|| (skillId == SKILL_ID_EBI_ZANMAI)
		|| (skillId == SKILL_ID_OTORO)
		|| (skillId == SKILL_ID_MAGURO_SHIELD)
		|| (skillId == SKILL_ID_GROOMING)
		|| (skillId == SKILL_ID_NODOWO_NARASU)
		|| (skillId == SKILL_ID_EBI_PARTY)
	) {
		if ((itemCount = EquipNumSearch(ITEM_ID_MOKOMOKO_OSAKANA_SHOES)) > 0) {
			scaling -= 10 * LearnedSkillSearch(SKILL_ID_EBI_PARTY) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「螺旋風魔の宝珠」の、「風魔手裏剣-乱華-」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_FUMASHURIKEN_RANKA) {
		eqpnum = EquipNumSearch(ITEM_ID_RASEN_FUMANO_HOZYU);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_YOMIGAESHI) >= 5) {
				scaling -= 50  * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「聖者の冠」の、「アドラムス」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ADORAMUS) {
		eqpnum = EquipNumSearch(ITEM_ID_SEISHANO_KANMURI);
		if (eqpnum > 0) {
			scaling -= 5 * LearnedSkillSearch(SKILL_ID_ORATIO)  * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「聖者の冠」の、「ジュデックス」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_JUDEX) {
		eqpnum = EquipNumSearch(ITEM_ID_SEISHANO_KANMURI);
		if (eqpnum > 0) {
			scaling -= 5 * LearnedSkillSearch(SKILL_ID_ORATIO)  * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「ぷりちーウリボウシューズ」の、「アニマル系スキル」短縮
	//----------------------------------------------------------------
	if ( (skillId == SKILL_ID_PIKKI_TSUKI)
			|| (skillId == SKILL_ID_ARCLOUSE_DASH)
			|| (skillId == SKILL_ID_TAROUNO_KIZU)
			|| (skillId == SKILL_ID_CARROT_BEAT)
			|| (skillId == SKILL_ID_KEIKAI)
			|| (skillId == SKILL_ID_MURENO_CHIKARA)
			|| (skillId == SKILL_ID_SAVAGENO_TAMASHI)
	) {
		if ((itemCount = EquipNumSearch(ITEM_ID_PRETTY_URIBO_SHOES)) > 0) {
			scaling -= 10 * LearnedSkillSearch(SKILL_ID_SAVAGENO_TAMASHI) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ぴかぴかニャンニャンクラウン」の、「イヌハッカメテオ」、「マタタビランス」短縮
	//----------------------------------------------------------------
	if ( (skillId == SKILL_ID_INUHAKKA_METEOR)
			|| (skillId == SKILL_ID_MATATABI_LANCE)
	) {
		if ((itemCount = EquipNumSearch(ITEM_ID_PIKAPIKA_NYANNYAN_CROWN)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_DAICHINO_TAMASHI) >= 1) {
				scaling -= 4 * LearnedSkillSearch(SKILL_ID_INUHAKKA_SHOWER) * itemCount;
				scaling -= 4 * LearnedSkillSearch(SKILL_ID_INUHAKKA_METEOR) * itemCount;
				scaling -= 4 * LearnedSkillSearch(SKILL_ID_NYAN_GRASS) * itemCount;
				scaling -= 4 * LearnedSkillSearch(SKILL_ID_MATATABI_LANCE) * itemCount;
				scaling -= 4 * LearnedSkillSearch(SKILL_ID_MATATABINO_NEKKO) * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「よちよちウリボウスタイ」の、「アニマル系スキル」短縮
	//----------------------------------------------------------------
	if ( (skillId == SKILL_ID_PIKKI_TSUKI)
			|| (skillId == SKILL_ID_ARCLOUSE_DASH)
			|| (skillId == SKILL_ID_TAROUNO_KIZU)
			|| (skillId == SKILL_ID_CARROT_BEAT)
			|| (skillId == SKILL_ID_KEIKAI)
			|| (skillId == SKILL_ID_MURENO_CHIKARA)
			|| (skillId == SKILL_ID_SAVAGENO_TAMASHI)
	) {
		if ((itemCount = EquipNumSearch(ITEM_ID_YOCHIYOCHI_URIBO_SUTAI)) > 0) {
			scaling -= 10 * itemCount;
			if (n_A_SHOULDER_DEF_PLUS >= 5) {
				scaling -= 20 * itemCount;
			}
			if (n_A_SHOULDER_DEF_PLUS >= 7) {
				scaling -= 20 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「審判の天秤」の、「レイオブジェネシス」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_RAY_OF_GENESIS) {
		eqpnum = EquipNumSearch(ITEM_ID_SHINPANNO_TENBIN);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_INSPIRATION) >= 5) {
				scaling -= 50 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「科学者のマント」の、「スポアエクスプロージョン」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SPORE_EXPLOSION) {
		eqpnum = EquipNumSearch(ITEM_ID_KAGAKUSHANO_MANT);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_HELLS_PLANT) >= 5) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アーヌルス イラ」の、「練気功」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_RENKIKO) {
		eqpnum = EquipNumSearchMIG(ITEM_ID_ANULUS_IRA);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_SENRYU_SHOTEN) >= 10) {
				scaling -= 50 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アーヌルス イラ」の、「雷光弾」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_RAIKODAN) {
		eqpnum = EquipNumSearchMIG(ITEM_ID_ANULUS_IRA);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_SENRYU_SHOTEN) >= 10) {
				scaling -= 50 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「グレースホーリーローブ」の、「金剛」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_KONGO) {
		eqpnum = EquipNumSearchMIG(ITEM_ID_GRACE_HOLY_ROBE);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_PRAEFATIO) >= 10) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「パワードインカム」の、「アームズキャノン」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ARMS_CANNON) {
		eqpnum = EquipNumSearch(ITEM_ID_POWERED_INCOME);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_HITO_DAICHINO_KENKYU) >= 5) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「もふもふラブリーフォックス」の、「うずくまる」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_UZUKUMARU) {
		eqpnum = EquipNumSearch(ITEM_ID_MOFUMOFU_LOVELY_FOX);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI) >= 1) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「もふもふラブリーフォックス」の、「ニャンジャンプ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_NYAN_JAMP) {
		eqpnum = EquipNumSearch(ITEM_ID_MOFUMOFU_LOVELY_FOX);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_SEIMEINO_TAMASHI) >= 1) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「もこふわシャークパジャマ」の、「シーフード系スキル」短縮
	//----------------------------------------------------------------
	if ( (skillId == SKILL_ID_SHINSENNA_EBI)
		|| (skillId == SKILL_ID_EBI_ZANMAI)
		|| (skillId == SKILL_ID_OTORO)
		|| (skillId == SKILL_ID_MAGURO_SHIELD)
		|| (skillId == SKILL_ID_GROOMING)
		|| (skillId == SKILL_ID_NODOWO_NARASU)
		|| (skillId == SKILL_ID_EBI_PARTY)
	) {
		if ((itemCount = EquipNumSearch(ITEM_ID_MOKOFUWA_SHARK_PAJAMA)) > 0) {
			scaling -= 10 * LearnedSkillSearch(SKILL_ID_EBI_PARTY) * itemCount;
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック＋α」の、「シーフード系スキル」短縮
	//----------------------------------------------------------------
	if ( (skillId == SKILL_ID_SHINSENNA_EBI)
		|| (skillId == SKILL_ID_EBI_ZANMAI)
		|| (skillId == SKILL_ID_OTORO)
		|| (skillId == SKILL_ID_MAGURO_SHIELD)
		|| (skillId == SKILL_ID_GROOMING)
		|| (skillId == SKILL_ID_NODOWO_NARASU)
		|| (skillId == SKILL_ID_EBI_PARTY)
	) {
		if (IsSameJobClass(JOB_ID_SUMMONER)) {
			if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_KAWAII_KUSANO_NECKLACE)) > 0) {
				scaling -= 50 * itemCount;
			}
			if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_SHINSENNA_MAGURONO_OMAMORI)) > 0) {
				scaling -= 50 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック＋α」の、「プラント系スキル」短縮
	//----------------------------------------------------------------
	if ( (skillId == SKILL_ID_MATATABI_LANCE)
		|| (skillId == SKILL_ID_MATATABINO_NEKKO)
		|| (skillId == SKILL_ID_INUHAKKA_METEOR)
		|| (skillId == SKILL_ID_INUHAKKA_SHOWER)
		|| (skillId == SKILL_ID_CHATTERING)
		|| (skillId == SKILL_ID_MYAUMYAU)
		|| (skillId == SKILL_ID_NYAN_GRASS)
	) {
		if (IsSameJobClass(JOB_ID_SUMMONER)) {
			if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_MARYOKUNO_KUSANO_NECKLACE)) > 0) {
				scaling -= 50 * itemCount;
			}
			if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_HIKARUEDANO_OMAMORI)) > 0) {
				scaling -= 50 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ゾディアック＋α」の、「アニマル系スキル」短縮
	//----------------------------------------------------------------
	if ( (skillId == SKILL_ID_PIKKI_TSUKI)
			|| (skillId == SKILL_ID_ARCLOUSE_DASH)
			|| (skillId == SKILL_ID_TAROUNO_KIZU)
			|| (skillId == SKILL_ID_CARROT_BEAT)
			|| (skillId == SKILL_ID_KEIKAI)
			|| (skillId == SKILL_ID_MURENO_CHIKARA)
			|| (skillId == SKILL_ID_SAVAGENO_TAMASHI)
	) {
		if (IsSameJobClass(JOB_ID_SUMMONER)) {
			if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_SHINSENNA_KUSANO_NECKLACE)) > 0) {
				scaling -= 50 * itemCount;
			}
			if ((itemCount = EquipNumSearch(ITEM_SET_ID_ENCHANT_ZODIAC_POCCHARI_MIMIZUNO_OMAMORI)) > 0) {
				scaling -= 50 * itemCount;
			}
		}
	}

	//----------------------------------------------------------------
	// 「性能カスタマイズ」の、効果
	//----------------------------------------------------------------
	confval = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_CAST_DOWN);
	if (confval != 0) {
		scaling -= confval;
	}

	/**
	 * プレイヤー状態異常「スローキャスト」の効果
	 */
	scaling += 20 * g_confDataDebuff[CCharaConfDebuff.CONF_ID_SLOW_CAST];


	return scaling;
}

/**
 * 特定スキルの変動詠唱が短縮される時間をミリ秒で取得する。短縮効果が付与されていない場合は0が返される。
 * @param {*} skillId 
 * @returns 
 */
export function GetCastFixOfSkillForCastTimeVary(skillId) {
	var castfix = 0, eqpnum = 0, confval = 0;

	// 装備品の短縮効果
	if (GetEquippedTotalSPEquip(ITEM_SP_SKILL_CAST_MINUS_OFFSET + skillId) != 0) {
		castfix -= GetEquippedTotalSPEquip(ITEM_SP_SKILL_CAST_MINUS_OFFSET + skillId);
	}

	if (GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_CAST_MINUS_OFFSET + skillId) != 0) {
		castfix -= GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_CAST_MINUS_OFFSET + skillId);
	}

	//----------------------------------------------------------------
	// 「アイオーンスタッフ」の「リーディングスペルブック」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_READING_SPELLBOOK) {
		eqpnum = EquipNumSearch(ITEM_ID_AEON_STUFF, EQUIP_REGION_ID_ARMS);
		if (eqpnum > 0) {
			castfix -= 1000 * LearnedSkillSearch(SKILL_ID_FREEZING_SPELL) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「アイオーンスタッフ」の「サモンファイアーボール」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SUMMON_FIRE_BALL) {
		eqpnum = EquipNumSearch(ITEM_ID_AEON_STUFF, EQUIP_REGION_ID_ARMS);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_RELEASE) >= 2) {
				castfix -= 1000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アイオーンスタッフ」の「サモンウォーターボール」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SUMMON_WATER_BALL) {
		eqpnum = EquipNumSearch(ITEM_ID_AEON_STUFF, EQUIP_REGION_ID_ARMS);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_RELEASE) >= 2) {
				castfix -= 1000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アイオーンスタッフ」の「サモンボールライトニング」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SUMMON_LIGHTNING_BALL) {
		eqpnum = EquipNumSearch(ITEM_ID_AEON_STUFF, EQUIP_REGION_ID_ARMS);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_RELEASE) >= 2) {
				castfix -= 1000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アイオーンスタッフ」の「サモンストーン」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SUMMON_STONE) {
		eqpnum = EquipNumSearch(ITEM_ID_AEON_STUFF, EQUIP_REGION_ID_ARMS);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_RELEASE) >= 2) {
				castfix -= 1000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「不死鳥の冠」の「インスピレーション」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_INSPIRATION) {
		eqpnum = EquipNumSearch(ITEM_ID_FUSHICHONO_KANMURI, EQUIP_REGION_ID_HEAD_TOP);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_KINGS_GRACE) >= 5) {
				castfix -= 2000;
			}
		}
	}

	//----------------------------------------------------------------
	// 「不死鳥の冠」の「オーバーブランド」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_OVER_BLAND) {
		eqpnum = EquipNumSearch(ITEM_ID_FUSHICHONO_KANMURI, EQUIP_REGION_ID_HEAD_TOP);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_MOON_SLUSHER) >= 5) {
				castfix -= 1000;
			}
		}
	}

	//----------------------------------------------------------------
	// 「精霊のローブ」の「サイキックウェーブ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_PSYCHIC_WAVE) {
		eqpnum = EquipNumSearch(ITEM_ID_SEIREINO_ROBE, EQUIP_REGION_ID_BODY);
		if (eqpnum > 0) {
			castfix -= 2000 * eqpnum;

			// さらに精錬による効果
			if (n_A_BODY_DEF_PLUS >= 7) {
				castfix -= 2000 * eqpnum;
			}
			if (n_A_BODY_DEF_PLUS >= 9) {
				castfix -= 2000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「スナイピングベール」の「マススパイラル」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_MASS_SPIRAL) {
		eqpnum = EquipNumSearch(ITEM_ID_SNIPING_VEIL, EQUIP_REGION_ID_SHOULDER);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_MASS_SPIRAL) >= 5) {
				castfix -= 2000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アルティメットモードチェンジャー　ナブのクロースセット」の「ポイズンスモーク」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_POISON_SMOKE) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_NABUNO_CLOTH, EQUIP_REGION_ID_ANY);
		if (eqpnum > 0) {
			if (n_A_BODY_DEF_PLUS >= 7) {
				castfix -= 1000 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「シールドリング」の「アースドライブ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_EARTH_DRIVE) {
		eqpnum = EquipNumSearch(ITEM_ID_SHIELD_RING);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_PINGPOINT_ATTACK) >= 5) {
				castfix -= 500 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「性能カスタマイズ」の、効果
	//----------------------------------------------------------------
	confval = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_CAST_MINUS);
	if (confval != 0) {
		castfix -= 100 * confval;
	}


	return castfix;
}

/**
 * 特定スキルの固定詠唱時間を％で取得する。短縮効果が付与されていない場合は100が返される。
 * @param {Number} skillId 
 * @returns {Number} 装備品や性能カスタマイズ効果を考慮した後の固定詠唱時間％
 */
export function GetCastScalingOfSkillForCastTimeFixed(skillId) {
	let itemCount = 0;
	let eqpnum = 0;
	let confval = 0;
	/** 最終的な固定詠唱時間％ */
	let scaling = 100;

	// 装備品の短縮効果
	if (GetEquippedTotalSPEquip(ITEM_SP_SKILL_FIXED_TIME_OFFSET + skillId) != 0) {
		scaling -= GetEquippedTotalSPEquip(ITEM_SP_SKILL_FIXED_TIME_OFFSET + skillId);
	}

	if (GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_FIXED_TIME_OFFSET + skillId) != 0) {
		scaling -= GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_FIXED_TIME_OFFSET + skillId);
	}

	//----------------------------------------------------------------
	// 「ゲフェニア氷の魔道具」の、「ジャックフロスト」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_JACK_FROST) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_GEFFENIA_KORINO_MADOGU)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_COMMET) >= 5) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ジャガーノート」の、「バニシングバスター」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_BUNISHING_BASTER) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_JAGUAR_NOTE)) > 0) {
			scaling -= 20 * LearnedSkillSearch(SKILL_ID_BUNISHING_BASTER) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「身かわしのケープ」の、「レノヴァティオ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_RENOVATIO) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_MIKAWASHINO_CAPE)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_PRAEFATIO) >= 10) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「インペリアルアニマルローブ」の、「タロウの傷」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_TAROUNO_KIZU) {
		if ((eqpnum = EquipNumSearchMIG(ITEM_ID_IMPERIAL_ANIMAL_ROBE)) > 0) {
			scaling -= 20 * LearnedSkillSearch(SKILL_ID_KEIKAI) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「グレースアニマルローブ」の、「タロウの傷」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_TAROUNO_KIZU) {
		if ((eqpnum = EquipNumSearchMIG(ITEM_ID_GRACE_ANIMAL_ROBE)) > 0) {
			scaling -= 20 * LearnedSkillSearch(SKILL_ID_KEIKAI) * eqpnum;
		}
	}

	//----------------------------------------------------------------
	// 「崇拝の指輪」の、「オラティオ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ORATIO) {
		if ((eqpnum = EquipNumSearchMIG(ITEM_ID_SUHAINO_YUBIWA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_ORATIO) >= 10) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「教授のミニグラス」の、「サイキックウェーブ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_PSYCHIC_WAVE) {
		if ((eqpnum = EquipNumSearchMIG(ITEM_ID_KYOZYUNO_MINIGLASS)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_PSYCHIC_WAVE) >= 5) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「グレースパニッシュメントローブ」の、「クリムゾンロック」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_CRYMSON_ROCK) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_GRACE_PUNISHMENT_ROBE)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_COMMET) >= 5) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「丹色のリボン」の、「エスパ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ESPA) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_NIRONO_RIBBON)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_ESFU) >= 10) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「丹色のリボン」の、「エスフ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_ESFU) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_NIRONO_RIBBON)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_ESFU) >= 10) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「怨霊怪異の耳」の、「獅子吼」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_SISIKO) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_ONRYO_KAIINO_MIMI)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_ZIRAISHIN) >= 5) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「幻獣の耳」の、「ジャックフロスト」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_JACK_FROST) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_GENZYUNO_MIMI)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_TELECHINESIS_INSTENCE) >= 5) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アスモデウスの翼」の、「リフレッシュ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_REFRESH) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_ASMODEUSNO_TSUBASA)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_IGNITION_BREAK) >= 5) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「フォー・オブ・ア・カインド」の、「テトラボルテックス」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_TETRA_BOLTEX) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_FOUR_OF_A_KIND)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_COMMET) >= 5) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「フォー・オブ・ア・カインド」の、「ジャックフロスト」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_JACK_FROST) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_FOUR_OF_A_KIND)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_COMMET) >= 5) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「アサルトスーツ」の、「エイムドボルト」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_AIMED_BOLT) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_ASSAULT_SUIT)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_CAMOUFLAGE) >= 5) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ブックオブソーサリー」の、「アースグレイヴ」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_EARTH_GRAVE) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_BOOK_OF_SOURCERERY)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_VACUUM_EXTREME) >= 5) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「フィフスエレメント」の、「ヴェラチュールスピアー」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_VERATURE_SPEAR) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_FIFTH_ELEMENT)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_VERATURE_SPEAR) >= 10) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「性能カスタマイズ」の、効果
	//----------------------------------------------------------------
	confval = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_CAST_DOWN_FIXED);
	if (confval != 0) {
		scaling -= confval;
	}


	return scaling;
}

/**
 * 特定スキルの固定詠唱が短縮される時間をミリ秒で取得する。短縮効果が付与されていない場合は0が返される。
 * @param {Number} skillId 
 * @returns {Number} 装備品や性能カスタマイズ効果により短縮される時間（ミリ秒）
 */
export function GetCastFixOfSkillForCastTimeFixed(skillId) {
	var eqpnum = 0, confval = 0;
	/** 短縮された固定詠唱時間（ミリ秒） */
	let castfix = 0;

	// 装備品の短縮効果
	if (GetEquippedTotalSPEquip(ITEM_SP_SKILL_FIXED_MINUS_OFFSET + skillId) != 0) {
		castfix -= GetEquippedTotalSPEquip(ITEM_SP_SKILL_FIXED_MINUS_OFFSET + skillId);
	}

	if (GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_FIXED_MINUS_OFFSET + skillId) != 0) {
		castfix -= GetEquippedTotalSPCardAndElse(ITEM_SP_SKILL_FIXED_MINUS_OFFSET + skillId);
	}

	//----------------------------------------------------------------
	// 「潜在解放ジェネティックIII」の「ハウリングオブマンドラゴラ」固定詠唱 0.5 秒短縮の打ち消し
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_HOWLING_OF_MANDRAGORA) {
		if (CardNumSearch(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_GENETIC_3) > 0) {
			if (EquipNumSearch(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_CULTIVATION_COAT) > 0) {
				castfix += 500;
			}
		}
	}

	//----------------------------------------------------------------
	// 「ファフニールヘルム」の、「ウォータードラゴンブレス」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_WATER_DRAGON_BREATH) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_FAFNIR_HELM)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) >= 10) {
				if (LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH) >= 10) {
					castfix -= 200 * eqpnum;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「ファフニールヘルム」の、「ファイアードラゴンブレス」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_FIRE_DRAGON_BREATH) {
		if ((eqpnum = EquipNumSearch(ITEM_ID_FAFNIR_HELM)) > 0) {
			if (LearnedSkillSearch(SKILL_ID_WATER_DRAGON_BREATH) >= 10) {
				if (LearnedSkillSearch(SKILL_ID_FIRE_DRAGON_BREATH) >= 10) {
					castfix -= 200 * eqpnum;
				}
			}
		}
	}

	//----------------------------------------------------------------
	// 「りんりんにゃんカーベル」の、「マグロシールド」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_MAGURO_SHIELD) {								// マグロシールドを評価するとき
		if ((eqpnum = EquipNumSearch(ITEM_ID_RINRIN_NYAN_KABERU)) > 0) {	// りんりんニャンカーベル装備中で
			if (LearnedSkillSearch(SKILL_ID_UMINO_TAMASHI) >= 1) {			// 海の魂Lv1習得していれば
				castfix -= 1000 * eqpnum;									// 固定詠唱 1000 ms 短縮
			}
		}
	}

	//----------------------------------------------------------------
	// 精霊スキルによる短縮
	//----------------------------------------------------------------
	if (UsedSkillSearch(SKILL_ID_SERE_MODE) == 1) {
		switch (UsedSkillSearch(SKILL_ID_SERE)) {
		case 7:
		case 8:
		case 9:
			castfix -= 1000;
		}
	}

	//----------------------------------------------------------------
	// 「性能カスタマイズ」の、効果
	//----------------------------------------------------------------
	confval = g_objCharaConfCustomSkill.GetConf(CCharaConfCustomSkill.CONF_ID_SKILL_CAST_MINUS_FIXED);
	if (confval != 0) {
		castfix -= 100 * confval;
	}


	return castfix;
}

/**
 * 公式サイトで「固定詠唱時間 + ◯秒」と表記される詠唱時間の増加値を取得する
 * GetCastFixOfSkillForCastTimeFixed とは違い全てのスキルに追加詠唱時間を付加する
 * @returns {Number} 
 */
export function GetAdditionalFixedCastTime() {
	let additional_time = 0;
	/**
	 * プレイヤー状態異常「メランコリー」の効果
	 */
	additional_time += 500 * g_confDataDebuff[CCharaConfDebuff.CONF_ID_GLOOMYDAY];
	/**
	 * プレイヤー状態異常「精神衝撃」の効果
	 */
	additional_time += 500 * g_confDataDebuff[CCharaConfDebuff.CONF_ID_MANDRAGORA];
	return additional_time;
}

//================================================================================================================================
//================================================================================================================================
//====
//==== 特定スキルの　強制詠唱時間－○○％　ここから
//====
//================================================================================================================================
//================================================================================================================================

export function GetCastScalingOfSkillForCastTimeForce(skillId) {

	var eqpnum = 0;

	var scaling = 100;


	//----------------------------------------------------------------
	// 「ワークキャップ」の「グリード」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_GREED) {
		eqpnum = EquipNumSearch(ITEM_ID_WORK_CAP);
		if (eqpnum > 0) {
			scaling -= 100 * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「群星」の「グリード」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_GREED) {
		eqpnum = EquipNumSearch(ITEM_ID_GUNSE);
		if (eqpnum > 0) {
			if (GetHigherJobSeriesID(n_A_JOB) == JOB_SERIES_ID_BLACKSMITH) {
				scaling -= 100 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「青い炎の杖　アビスゴーストセット」の「魔法力増幅」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_MAHORYOKU_ZOFUKU) {
		eqpnum = EquipNumSearch(ITEM_SET_ID_AOI_HONONO_TSUE_ABYSS_GHOST_CARD);
		if (eqpnum > 0) {
			scaling -= 50 * eqpnum;
		}
	}


	//----------------------------------------------------------------
	// 「インペリアルマグマスーツ」の「グリード」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_GREED) {
		eqpnum = EquipNumSearchMIG(ITEM_ID_IMPERIAL_MAGMA_SUIT);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_FAW_SILVER_SNIPER) >= 5) {
				scaling -= 100 * eqpnum;
			}
		}
	}

	//----------------------------------------------------------------
	// 「グレースマグマスーツ」の「グリード」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_GREED) {
		eqpnum = EquipNumSearchMIG(ITEM_ID_GRACE_MAGMA_SUIT);
		if (eqpnum > 0) {
			if (LearnedSkillSearch(SKILL_ID_FAW_SILVER_SNIPER) >= 5) {
				scaling -= 100 * eqpnum;
			}
		}
	}


	//----------------------------------------------------------------
	// 「ゾディアック　巨蟹宮のマント」セットの「グリード」短縮
	//----------------------------------------------------------------
	if (skillId == SKILL_ID_GREED) {
		eqpnum = CardNumSearch(CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_RING);
		if (eqpnum > 0) {
			if (IsSameJobClass(JOB_ID_MECHANIC)) {
				scaling -= 100 * eqpnum;
			}
		}
	}


	return scaling;
}

//================================================================================================================================
//================================================================================================================================
//====
//==== 特定スキルの　強制詠唱時間－○○秒　ここから
//====
//================================================================================================================================
//================================================================================================================================

export function GetCastFixOfSkillForCastTimeForce(skillId) {

	var castfix = 0;


	return castfix;
}

