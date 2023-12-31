
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



// エンチャント効果の並び順の定義
function MigGetSortedEnchantCardIdArray () {

	return [
		CARD_ID_ENCHANT_STR_1,
		CARD_ID_ENCHANT_STR_2,
		CARD_ID_ENCHANT_STR_3,
		CARD_ID_ENCHANT_STR_4,
		CARD_ID_ENCHANT_STR_5,
		CARD_ID_ENCHANT_STR_6,
		CARD_ID_ENCHANT_STR_7,
		CARD_ID_ENCHANT_STR_8,
		CARD_ID_ENCHANT_STR_9,
		CARD_ID_ENCHANT_STR_10,
		CARD_ID_ENCHANT_AGI_1,
		CARD_ID_ENCHANT_AGI_2,
		CARD_ID_ENCHANT_AGI_3,
		CARD_ID_ENCHANT_AGI_4,
		CARD_ID_ENCHANT_AGI_5,
		CARD_ID_ENCHANT_AGI_6,
		CARD_ID_ENCHANT_AGI_7,
		CARD_ID_ENCHANT_AGI_8,
		CARD_ID_ENCHANT_AGI_9,
		CARD_ID_ENCHANT_AGI_10,
		CARD_ID_ENCHANT_VIT_1,
		CARD_ID_ENCHANT_VIT_2,
		CARD_ID_ENCHANT_VIT_3,
		CARD_ID_ENCHANT_VIT_4,
		CARD_ID_ENCHANT_VIT_5,
		CARD_ID_ENCHANT_VIT_6,
		CARD_ID_ENCHANT_VIT_7,
		CARD_ID_ENCHANT_VIT_8,
		CARD_ID_ENCHANT_VIT_9,
		CARD_ID_ENCHANT_VIT_10,
		CARD_ID_ENCHANT_INT_1,
		CARD_ID_ENCHANT_INT_2,
		CARD_ID_ENCHANT_INT_3,
		CARD_ID_ENCHANT_INT_4,
		CARD_ID_ENCHANT_INT_5,
		CARD_ID_ENCHANT_INT_6,
		CARD_ID_ENCHANT_INT_7,
		CARD_ID_ENCHANT_INT_8,
		CARD_ID_ENCHANT_INT_9,
		CARD_ID_ENCHANT_INT_10,
		CARD_ID_ENCHANT_DEX_1,
		CARD_ID_ENCHANT_DEX_2,
		CARD_ID_ENCHANT_DEX_3,
		CARD_ID_ENCHANT_DEX_4,
		CARD_ID_ENCHANT_DEX_5,
		CARD_ID_ENCHANT_DEX_6,
		CARD_ID_ENCHANT_DEX_7,
		CARD_ID_ENCHANT_DEX_8,
		CARD_ID_ENCHANT_DEX_9,
		CARD_ID_ENCHANT_DEX_10,
		CARD_ID_ENCHANT_LUK_1,
		CARD_ID_ENCHANT_LUK_2,
		CARD_ID_ENCHANT_LUK_3,
		CARD_ID_ENCHANT_LUK_4,
		CARD_ID_ENCHANT_LUK_5,
		CARD_ID_ENCHANT_LUK_6,
		CARD_ID_ENCHANT_LUK_7,
		CARD_ID_ENCHANT_LUK_8,
		CARD_ID_ENCHANT_LUK_9,
		CARD_ID_ENCHANT_LUK_10,

		CARD_ID_ENCHANT_WOLF_ORB_STR_7,
		CARD_ID_ENCHANT_WOLF_ORB_AGI_7,
		CARD_ID_ENCHANT_WOLF_ORB_VIT_7,
		CARD_ID_ENCHANT_WOLF_ORB_INT_7,
		CARD_ID_ENCHANT_WOLF_ORB_DEX_7,
		CARD_ID_ENCHANT_WOLF_ORB_LUK_7,

		CARD_ID_ENCHANT_POW_3,
		CARD_ID_ENCHANT_STA_3,
		CARD_ID_ENCHANT_WIS_3,
		CARD_ID_ENCHANT_SPL_3,
		CARD_ID_ENCHANT_CON_3,
		CARD_ID_ENCHANT_CRT_3,

		CARD_ID_ENCHANT_WOLF_ORB_POW_3,
		CARD_ID_ENCHANT_WOLF_ORB_STA_3,
		CARD_ID_ENCHANT_WOLF_ORB_WIS_3,
		CARD_ID_ENCHANT_WOLF_ORB_SPL_3,
		CARD_ID_ENCHANT_WOLF_ORB_CON_3,
		CARD_ID_ENCHANT_WOLF_ORB_CRT_3,

		CARD_ID_ENCHANT_MAXHP_100,
		CARD_ID_ENCHANT_MAXHP_200,
		CARD_ID_ENCHANT_MAXHP_300,
		CARD_ID_ENCHANT_MAXHP_400,
		CARD_ID_ENCHANT_MAXHP_500,
		CARD_ID_ENCHANT_MAXHP_1P,
		CARD_ID_ENCHANT_MAXHP_2P,
		CARD_ID_ENCHANT_MAXHP_3P,
		CARD_ID_ENCHANT_MAXHP_4P,
		CARD_ID_ENCHANT_MAXHP_5P,
		CARD_ID_ENCHANT_MAXHP_15P,
		CARD_ID_ENCHANT_MAXSP_25,
		CARD_ID_ENCHANT_MAXSP_50,
		CARD_ID_ENCHANT_MAXSP_75,
		CARD_ID_ENCHANT_MAXSP_100,
		CARD_ID_ENCHANT_MAXSP_150,
		CARD_ID_ENCHANT_ATK_1,
		CARD_ID_ENCHANT_ATK_2,
		CARD_ID_ENCHANT_ATK_3,
		CARD_ID_ENCHANT_ATK_4,
		CARD_ID_ENCHANT_ATK_5,
		CARD_ID_ENCHANT_MATK_1,
		CARD_ID_ENCHANT_MATK_2,
		CARD_ID_ENCHANT_MATK_3,
		CARD_ID_ENCHANT_MATK_4,
		CARD_ID_ENCHANT_MATK_5,
		CARD_ID_ENCHANT_MATK_1_CAST_FIXED_1,
		CARD_ID_ENCHANT_MATK_2_CAST_FIXED_1,
		CARD_ID_ENCHANT_MATK_2_CAST_FIXED_1_BUG,
		CARD_ID_ENCHANT_MATK_3_CAST_FIXED_1,
		CARD_ID_ENCHANT_DEF_3,
		CARD_ID_ENCHANT_DEF_6,
		CARD_ID_ENCHANT_DEF_9,
		CARD_ID_ENCHANT_DEF_12,
		CARD_ID_ENCHANT_DEF_15,
		CARD_ID_ENCHANT_DEF_18,
		CARD_ID_ENCHANT_DEF_21,
		CARD_ID_ENCHANT_DEF_50,
		CARD_ID_ENCHANT_DEF_300,
		CARD_ID_ENCHANT_WOLF_ORB_DEF_300,
		CARD_ID_ENCHANT_MDEF_1,
		CARD_ID_ENCHANT_MDEF_2,
		CARD_ID_ENCHANT_MDEF_3,
		CARD_ID_ENCHANT_MDEF_4,
		CARD_ID_ENCHANT_MDEF_5,
		CARD_ID_ENCHANT_MDEF_6,
		CARD_ID_ENCHANT_MDEF_7,
		CARD_ID_ENCHANT_MDEF_8,
		CARD_ID_ENCHANT_MDEF_10,
		CARD_ID_ENCHANT_MDEF_30,
		CARD_ID_ENCHANT_WOLF_ORB_MDEF_30,
		CARD_ID_ENCHANT_HIT_1,
		CARD_ID_ENCHANT_HIT_2,
		CARD_ID_ENCHANT_HIT_3,
		CARD_ID_ENCHANT_HIT_4,
		CARD_ID_ENCHANT_HIT_5,
		CARD_ID_ENCHANT_HIT_6,
		CARD_ID_ENCHANT_HIT_7,
		CARD_ID_ENCHANT_HIT_8,
		CARD_ID_ENCHANT_HIT_9,
		CARD_ID_ENCHANT_HIT_10,
		CARD_ID_ENCHANT_HIT_100,
		CARD_ID_ENCHANT_FLEE_1,
		CARD_ID_ENCHANT_FLEE_3,
		CARD_ID_ENCHANT_FLEE_5,
		CARD_ID_ENCHANT_FLEE_6,
		CARD_ID_ENCHANT_FLEE_10,
		CARD_ID_ENCHANT_FLEE_12,
		CARD_ID_ENCHANT_CRI_5,
		CARD_ID_ENCHANT_CRI_7,
		CARD_ID_ENCHANT_CRI_10,
		CARD_ID_ENCHANT_LUCKY_1,
		CARD_ID_ENCHANT_LUCKY_2,
		CARD_ID_ENCHANT_LUCKY_3,
		CARD_ID_ENCHANT_LUCKY_4,
		CARD_ID_ENCHANT_LUCKY_5,
		CARD_ID_ENCHANT_LUCKY_25,
		CARD_ID_ENCHANT_WOLF_ORB_LUCKY_25,
		CARD_ID_ENCHANT_ASPD_10P,
		CARD_ID_ENCHANT_WOLF_ORB_ASPD_10P,
		CARD_ID_ENCHANT_ASPD_1,
		CARD_ID_ENCHANT_WOLF_ORB_CAST_TIME_15,
		CARD_ID_ENCHANT_COST_DOWN_2,
		CARD_ID_ENCHANT_COST_DOWN_4,
		CARD_ID_ENCHANT_COST_DOWN_6,
		CARD_ID_ENCHANT_COST_DOWN_8,
		CARD_ID_ENCHANT_COST_DOWN_10,
		CARD_ID_ENCHANT_COST_DOWN_15,
		CARD_ID_ENCHANT_DELAY_DOWN_2,
		CARD_ID_ENCHANT_DELAY_DOWN_4,
		CARD_ID_ENCHANT_DELAY_DOWN_6,
		CARD_ID_ENCHANT_DELAY_DOWN_8,
		CARD_ID_ENCHANT_DELAY_DOWN_10,
		CARD_ID_ENCHANT_DELAY_DOWN_15,
		CARD_ID_ENCHANT_WOLF_ORB_SKILL_DELAY_15,

		CARD_ID_ENCHANT_MUZOKUSEI_TAISEI_1,
		CARD_ID_ENCHANT_MUZOKUSEI_TAISEI_2,
		CARD_ID_ENCHANT_MUZOKUSEI_TAISEI_3,
		CARD_ID_ENCHANT_MUZOKUSEI_TAISEI_4,
		CARD_ID_ENCHANT_MUZOKUSEI_TAISEI_5,
		CARD_ID_ENCHANT_MIZU_ZOKUSEI_TAISEI_5,
		CARD_ID_ENCHANT_CHI_ZOKUSEI_TAISEI_5,
		CARD_ID_ENCHANT_HI_ZOKUSEI_TAISEI_5,
		CARD_ID_ENCHANT_KAZE_ZOKUSEI_TAISEI_5,
		CARD_ID_ENCHANT_DOKU_ZOKUSEI_TAISEI_5,
		CARD_ID_ENCHANT_SEIZOKUSEI_TAISEI_5,
		CARD_ID_ENCHANT_YAMI_ZOKUSEI_TAISEI_5,
		CARD_ID_ENCHANT_NENZOKUSEI_TAISEI_5,
		CARD_ID_ENCHANT_FUSHI_ZOKUSEI_TAISEI_5,
		CARD_ID_ENCHANT_ENKYORI_BUTSURI_TAISEI_5,
		CARD_ID_ENCHANT_ENKYORI_BUTSURI_TAISEI_10,

		CARD_ID_ENCHANT_TOSHI_1,
		CARD_ID_ENCHANT_TOSHI_2,
		CARD_ID_ENCHANT_TOSHI_3,
		CARD_ID_ENCHANT_TOSHI_4,
		CARD_ID_ENCHANT_TOSHI_5,
		CARD_ID_ENCHANT_TOSHI_6,
		CARD_ID_ENCHANT_TOSHI_7,
		CARD_ID_ENCHANT_TOSHI_8,
		CARD_ID_ENCHANT_TOSHI_9,
		CARD_ID_ENCHANT_TOSHI_10,
		CARD_ID_ENCHANT_MARYOKU_1,
		CARD_ID_ENCHANT_MARYOKU_2,
		CARD_ID_ENCHANT_MARYOKU_3,
		CARD_ID_ENCHANT_MARYOKU_4,
		CARD_ID_ENCHANT_MARYOKU_5,
		CARD_ID_ENCHANT_MARYOKU_6,
		CARD_ID_ENCHANT_MARYOKU_7,
		CARD_ID_ENCHANT_MARYOKU_8,
		CARD_ID_ENCHANT_MARYOKU_9,
		CARD_ID_ENCHANT_MEIKYU_1,
		CARD_ID_ENCHANT_MEIKYU_2,
		CARD_ID_ENCHANT_MEIKYU_3,
		CARD_ID_ENCHANT_MEIKYU_4,
		CARD_ID_ENCHANT_SENEI_1,
		CARD_ID_ENCHANT_SENEI_2,
		CARD_ID_ENCHANT_SENEI_3,
		CARD_ID_ENCHANT_SENEI_4,
		CARD_ID_ENCHANT_SENEI_5,
		CARD_ID_ENCHANT_EIRI_1,
		CARD_ID_ENCHANT_EIRI_2,
		CARD_ID_ENCHANT_EIRI_3,
		CARD_ID_ENCHANT_EIRI_4,
		CARD_ID_ENCHANT_EIRI_5,
		CARD_ID_ENCHANT_KOGEKISOKUDO_1,
		CARD_ID_ENCHANT_KOGEKISOKUDO_2,
		CARD_ID_ENCHANT_KOGEKISOKUDO_3,
		CARD_ID_ENCHANT_KOGEKISOKUDO_4,
		CARD_ID_ENCHANT_DAISHIKYO_1,
		CARD_ID_ENCHANT_DAISHIKYO_2,
		CARD_ID_ENCHANT_CHIYU_1,
		CARD_ID_ENCHANT_DAISEIDO_1,

		CARD_ID_ENCHANT_RESIST_PLAYER_1,
		CARD_ID_ENCHANT_RESIST_PLAYER_2,
		CARD_ID_ENCHANT_RESIST_PLAYER_3,
		CARD_ID_ENCHANT_RESIST_PLAYER_4,
		CARD_ID_ENCHANT_RESIST_PLAYER_5,
		CARD_ID_ENCHANT_RESIST_PLAYER_6,
		CARD_ID_ENCHANT_RESIST_PLAYER_7,
		CARD_ID_ENCHANT_RESIST_PLAYER_8,
		CARD_ID_ENCHANT_RESIST_PLAYER_9,
		CARD_ID_ENCHANT_RESIST_PLAYER_10,
		CARD_ID_ENCHANT_RESIST_PLAYER_11,
		CARD_ID_ENCHANT_RESIST_PLAYER_12,
		CARD_ID_ENCHANT_RESIST_PLAYER_13,
		CARD_ID_ENCHANT_RESIST_PLAYER_14,
		CARD_ID_ENCHANT_RESIST_PLAYER_15,
		CARD_ID_ENCHANT_RESIST_PLAYER_16,
		CARD_ID_ENCHANT_RESIST_PLAYER_17,
		CARD_ID_ENCHANT_RESIST_PLAYER_18,
		CARD_ID_ENCHANT_RESIST_PLAYER_19,
		CARD_ID_ENCHANT_RESIST_PLAYER_20,

		CARD_ID_ENCHANT_SPECIAL_STR,
		CARD_ID_ENCHANT_SPECIAL_AGI,
		CARD_ID_ENCHANT_SPECIAL_VIT,
		CARD_ID_ENCHANT_SPECIAL_INT,
		CARD_ID_ENCHANT_SPECIAL_DEX,
		CARD_ID_ENCHANT_SPECIAL_LUK,
		CARD_ID_ENCHANT_EXTRA_STR,
		CARD_ID_ENCHANT_EXTRA_AGI,
		CARD_ID_ENCHANT_EXTRA_VIT,
		CARD_ID_ENCHANT_EXTRA_INT,
		CARD_ID_ENCHANT_EXTRA_DEX,
		CARD_ID_ENCHANT_EXTRA_LUK,

		CARD_ID_ENCHANT_KYOGEKI_1,
		CARD_ID_ENCHANT_KYOGEKI_2,
		CARD_ID_ENCHANT_KYOGEKI_3,
		CARD_ID_ENCHANT_KYOGEKI_4,
		CARD_ID_ENCHANT_KYOGEKI_5,
		CARD_ID_ENCHANT_ZOFUKU_1,
		CARD_ID_ENCHANT_ZOFUKU_2,
		CARD_ID_ENCHANT_ZOFUKU_3,
		CARD_ID_ENCHANT_ZOFUKU_4,
		CARD_ID_ENCHANT_ZOFUKU_5,

		CARD_ID_ENCHANT_WOLF_ORB_PHYSICAL_DAMAGE_20,
		CARD_ID_ENCHANT_WOLF_ORB_MAGICAL_DAMAGE_20,

		CARD_ID_ENCHANT_KUMANO_CHIKARA,
		CARD_ID_ENCHANT_KOSOKU,
		CARD_ID_ENCHANT_KOGAI,
		CARD_ID_ENCHANT_BOSOSHITA_MARYOKU,
		CARD_ID_ENCHANT_OWASHINO_GANKO,
		CARD_ID_ENCHANT_KOUUNNA_HI,
		CARD_ID_ENCHANT_HAO,
		CARD_ID_ENCHANT_SHINO_YOKUDO,
		CARD_ID_ENCHANT_SHINRINO_KAIHO,
		CARD_ID_ENCHANT_GOKETSU,
		CARD_ID_ENCHANT_TENCHI_HOKAI,
		CARD_ID_ENCHANT_YUENNARU_TENZYONO_MIYAKO,

		CARD_ID_ENCHANT_KYOGO,
		CARD_ID_ENCHANT_SENKO,
		CARD_ID_ENCHANT_GOTAI,
		CARD_ID_ENCHANT_SHINREKI,
		CARD_ID_ENCHANT_TENKYU,
		CARD_ID_ENCHANT_HAKUUN,

		CARD_ID_ENCHANT_ARMS_ELEMENT_WATER,
		CARD_ID_ENCHANT_ARMS_ELEMENT_EARTH,
		CARD_ID_ENCHANT_ARMS_ELEMENT_FIRE,
		CARD_ID_ENCHANT_ARMS_ELEMENT_WIND,
		CARD_ID_ENCHANT_ARMS_ELEMENT_POISON,
		CARD_ID_ENCHANT_ARMS_ELEMENT_HOLY,
		CARD_ID_ENCHANT_ARMS_ELEMENT_DARK,
		CARD_ID_ENCHANT_ARMS_ELEMENT_PSYCO,
		CARD_ID_ENCHANT_ARMS_ELEMENT_UNDEAD,
		CARD_ID_ENCHANT_BODY_ELEMENT_WATER,
		CARD_ID_ENCHANT_BODY_ELEMENT_EARTH,
		CARD_ID_ENCHANT_BODY_ELEMENT_FIRE,
		CARD_ID_ENCHANT_BODY_ELEMENT_WIND,
		CARD_ID_ENCHANT_BODY_ELEMENT_POISON,
		CARD_ID_ENCHANT_BODY_ELEMENT_HOLY,
		CARD_ID_ENCHANT_BODY_ELEMENT_DARK,
		CARD_ID_ENCHANT_BODY_ELEMENT_PSYCO,
		CARD_ID_ENCHANT_BODY_ELEMENT_UNDEAD,

		CARD_ID_GOKU,
		CARD_ID_ENCHANT_UNBREAKABLE,
		CARD_ID_ENCHANT_UNBREAKABLE_ARMOR,
		CARD_ID_ENCHANT_UNINTERRUPTABLE,
		CARD_ID_ENCHANT_WOLF_ORB_UNINTERRUPTABLE,
		CARD_ID_ENCHANT_RESIST_KNOCKBACK,
		CARD_ID_ENCHANT_ASPD_15,
		CARD_ID_ENCHANT_CAST_TIME_15,
		CARD_ID_ENCHANT_KOTEIEISHO_50,
		CARD_ID_ENCHANT_WOLF_ORB_CAST_FIXED_50,
		CARD_ID_ENCHANT_KOTEIEISHO_70,
		CARD_ID_ENCHANT_PERFECT_ATTACK_UP_25,
		CARD_ID_ENCHANT_SUIMIN_TAISE,
		CARD_ID_ENCHANT_SHUKKETSU_TAISE,
		CARD_ID_ENCHANT_DOKU_TAISE,
		CARD_ID_ENCHANT_ANKOKU_TAISE,
		CARD_ID_ENCHANT_CHINMOKU_TAISE,
		CARD_ID_ENCHANT_NOROI_TAISE,
		CARD_ID_ENCHANT_KONRAN_TAISE,
		CARD_ID_ENCHANT_TOKETSU_TAISE,
		CARD_ID_ENCHANT_SEKIKA_TAISE,
		CARD_ID_ENCHANT_HAKKA_TAISE,
		CARD_ID_ENCHANT_KYOFU_TAISE,
		CARD_ID_ENCHANT_IGNORE_DEF_50,
		CARD_ID_ENCHANT_WOLF_ORB_IGNORE_DEF_50,
		CARD_ID_ENCHANT_IGNORE_MDEF_50,
		CARD_ID_ENCHANT_WOLF_ORB_IGNORE_MDEF_50,
		CARD_ID_ENCHANT_IDOSOKUDO_ZOKA,

		CARD_ID_ENCHANT_HILEVEL,
		CARD_ID_ENCHANT_OVERCLOCK,
		CARD_ID_ENCHANT_CHOETSUSHA,
		CARD_ID_ENCHANT_EXTREME,
		CARD_ID_ENCHANT_EXAM,
		CARD_ID_ENCHANT_GOWAN,
		CARD_ID_ENCHANT_ZYURYOKU,
		CARD_ID_ENCHANT_RYURIN,
		CARD_ID_ENCHANT_KYOZIN,
		CARD_ID_ENCHANT_CHODOKYU,
		CARD_ID_ENCHANT_HANGYAKUSHA,
		CARD_ID_ENCHANT_HONOIKAZUCHINOOKAMI,
		CARD_ID_ENCHANT_TOUSHI,
		CARD_ID_ENCHANT_ZINKU,
		CARD_ID_ENCHANT_ALLES,
		CARD_ID_ENCHANT_ONO_KAMUI,
		CARD_ID_ENCHANT_SAITAN,
		CARD_ID_ENCHANT_FUKUTSU,
		CARD_ID_ENCHANT_REFLECT_PHYSICAL_SHORT_5P,
		CARD_ID_ENCHANT_HASAI,
		CARD_ID_ENCHANT_MAZIN,
		CARD_ID_ENCHANT_KANZYUKU,
		CARD_ID_ENCHANT_DANGEKI,
		CARD_ID_ENCHANT_ZANMA,

		CARD_ID_ENCHANT_GREED_EISHO_100,
		CARD_ID_ENCHANT_MAGNIFICAT_LV5,
		CARD_ID_ENCHANT_SIGHT_LV1,
		CARD_ID_ENCHANT_KIDATSU_LV1,
		CARD_ID_ENCHANT_KIKO_LV2,
		CARD_ID_ENCHANT_MAGNUM_BREAK_LV5,
		CARD_ID_ENCHANT_ENERGY_COAT_LV1,
		CARD_ID_ENCHANT_ODINO_CHIKARA_LV2,
		CARD_ID_ENCHANT_SKILL_ISHI_SOKUDO_ZOKA_LV10,

		CARD_ID_ENCHANT_ARCANA,
		CARD_ID_ENCHANT_SHINSONO_O,
		CARD_ID_ENCHANT_SATSUINO_ONNEN,
		CARD_ID_ENCHANT_SHINRA_BANSHO,
		CARD_ID_ENCHANT_KIGENNO_O,
		CARD_ID_ENCHANT_EIYUNO_GAIKA,
		CARD_ID_ENCHANT_HOZYONO_MEGAMI,
		CARD_ID_ENCHANT_YAKUSAINO_MASHO,
		CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI,
		CARD_ID_ENCHANT_KYOKUGENNO_MARYOKU,
		CARD_ID_ENCHANT_CHOETSU,
		CARD_ID_ENCHANT_ZODIAC,
		CARD_ID_ENCHANT_OKENO_EIKO,
		CARD_ID_ENCHANT_KOKUYOKUNO_SHITO,
		CARD_ID_ENCHANT_IKYONO_TOKATSUSHA,
		CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA,

		CARD_ID_ENCHANT_A_REFLECT,
		CARD_ID_ENCHANT_A_SP_COST,
		CARD_ID_ENCHANT_B_STR,
		CARD_ID_ENCHANT_B_AGI,
		CARD_ID_ENCHANT_B_VIT,
		CARD_ID_ENCHANT_B_INT,
		CARD_ID_ENCHANT_B_DEX,
		CARD_ID_ENCHANT_B_LUK,
		CARD_ID_ENCHANT_E_POISON,
		CARD_ID_ENCHANT_E_SAINT,
		CARD_ID_ENCHANT_E_DARKNESS,
		CARD_ID_ENCHANT_E_UNDEAD,
		CARD_ID_ENCHANT_G_CRI,
		CARD_ID_ENCHANT_G_GUIDED,
		CARD_ID_ENCHANT_L_ABSORB_SPIRITS_1,
		CARD_ID_ENCHANT_L_ANGELUS_1,
		CARD_ID_ENCHANT_L_AUTO_GUARD_3,
		CARD_ID_ENCHANT_L_BASH_3,
		CARD_ID_ENCHANT_L_CALL_SPIRITS_2,
		CARD_ID_ENCHANT_L_CAST_CANCEL_1,
		CARD_ID_ENCHANT_L_CLOAKING_1,
		CARD_ID_ENCHANT_L_CLOSE_CONFINE_1,
		CARD_ID_ENCHANT_L_COLD_BOLT_3,
		CARD_ID_ENCHANT_L_CURE_1,
		CARD_ID_ENCHANT_L_DEC_AGI_1,
		CARD_ID_ENCHANT_L_DETOXIFY_1,
		CARD_ID_ENCHANT_L_EARTH_SPIKE_3,
		CARD_ID_ENCHANT_L_ESTIMATION_1,
		CARD_ID_ENCHANT_L_FIRE_BALL_3,
		CARD_ID_ENCHANT_L_FIRE_BOLT_3,
		CARD_ID_ENCHANT_L_FROST_DIVE_3,
		CARD_ID_ENCHANT_L_FROST_NOVA_2,
		CARD_ID_ENCHANT_L_GLORIA_1,
		CARD_ID_ENCHANT_L_HEAL_1,
		CARD_ID_ENCHANT_L_HIDING_1,
		CARD_ID_ENCHANT_L_IDENTIFY_1,
		CARD_ID_ENCHANT_L_LIGHTNING_BOLT_3,
		CARD_ID_ENCHANT_L_LOUD_1,
		CARD_ID_ENCHANT_L_MAGIC_POWER_5,
		CARD_ID_ENCHANT_L_MAGNUM_3,
		CARD_ID_ENCHANT_L_METEOR_3,
		CARD_ID_ENCHANT_L_PEONY_MAMY_1,
		CARD_ID_ENCHANT_L_POISON_3,
		CARD_ID_ENCHANT_L_POTION_PITCHER_3,
		CARD_ID_ENCHANT_L_SADAGUI_1,
		CARD_ID_ENCHANT_L_SEUOIA_DUST_1,
		CARD_ID_ENCHANT_L_SIGHT_1,
		CARD_ID_ENCHANT_L_SNOW_FLIP_1,
		CARD_ID_ENCHANT_L_SOUL_STRIKE_3,
		CARD_ID_ENCHANT_L_SPELL_BREAKER_1,
		CARD_ID_ENCHANT_L_STEAL_1,
		CARD_ID_ENCHANT_L_STONE_CURSE_3,
		CARD_ID_ENCHANT_L_TELEPORT_1,
		CARD_ID_ENCHANT_L_THROW_STONE_1,
		CARD_ID_ENCHANT_P_CONFUSE,
		CARD_ID_ENCHANT_P_CURSE,
		CARD_ID_ENCHANT_P_FEAR,
		CARD_ID_ENCHANT_P_IGNITION,
		CARD_ID_ENCHANT_P_PETRIFACTION,
		CARD_ID_ENCHANT_P_SILENCE,
		CARD_ID_ENCHANT_P_SLEEP,
		CARD_ID_ENCHANT_Q_BOSS,
		CARD_ID_ENCHANT_Q_NORMAL,
		CARD_ID_ENCHANT_Q_RANGE,
		CARD_ID_ENCHANT_R_SAINT,
		CARD_ID_ENCHANT_R_DARKNESS,
		CARD_ID_ENCHANT_R_TELEKINESIS,
		CARD_ID_ENCHANT_R_UNDEAD,
		CARD_ID_ENCHANT_S_OVER_POWER,
		CARD_ID_ENCHANT_S_FATAL_FLASH,
		CARD_ID_ENCHANT_S_UNLIMIT_VITAL,
		CARD_ID_ENCHANT_S_SPELL_BUSTER,
		CARD_ID_ENCHANT_S_FIRING_SHOT,
		CARD_ID_ENCHANT_S_LUCKY_STRIKE,
		CARD_ID_ENCHANT_U_POWER_SHIELD,
		CARD_ID_ENCHANT_U_POWER_ARMOR,
		CARD_ID_ENCHANT_U_POWER_WING,
		CARD_ID_ENCHANT_U_POWER_LEG,

		CARD_ID_ENCHANT_B_ATK,
		CARD_ID_ENCHANT_B_DEF,
		CARD_ID_ENCHANT_B_MDEF,
		CARD_ID_ENCHANT_B_MATK,
		CARD_ID_ENCHANT_B_MAXHP,
		CARD_ID_ENCHANT_B_MAXSP,
		CARD_ID_ENCHANT_B_HPR,
		CARD_ID_ENCHANT_B_SPR,
		CARD_ID_ENCHANT_G_DRAINHP,
		CARD_ID_ENCHANT_G_DRAINSP,
		CARD_ID_ENCHANT_G_LIFE,
		CARD_ID_ENCHANT_G_SOUL,
		CARD_ID_ENCHANT_Q_ATTRIBUTE,
		CARD_ID_ENCHANT_Q_CAST_FIXED,
		CARD_ID_ENCHANT_Q_CAST_STAT,
		CARD_ID_ENCHANT_Q_DELAY,
		CARD_ID_ENCHANT_Q_FATAL,
		CARD_ID_ENCHANT_Q_HEAL,
		CARD_ID_ENCHANT_Q_PLAYER,
		CARD_ID_ENCHANT_Q_SHOOTER,
		CARD_ID_ENCHANT_Q_SPEED,
		CARD_ID_ENCHANT_X_OVER_POWER,
		CARD_ID_ENCHANT_X_FATAL_FLASH,
		CARD_ID_ENCHANT_X_UNLIMIT_VITAL,
		CARD_ID_ENCHANT_X_SPELL_BUSTER,
		CARD_ID_ENCHANT_X_FIRING_SHOT,
		CARD_ID_ENCHANT_X_LUCKY_STRIKE,
		CARD_ID_ENCHANT_T_POWER_BOOST,
		CARD_ID_ENCHANT_T_MAGIC_BOOST,
		CARD_ID_ENCHANT_T_ASSAULT,
		CARD_ID_ENCHANT_T_ELECTRICITY,

		CARD_ID_ENCHANT_A_STR,
		CARD_ID_ENCHANT_A_INT,
		CARD_ID_ENCHANT_A_MAXHP,
		CARD_ID_ENCHANT_A_MAXSP,
		CARD_ID_ENCHANT_A_ATK,
		CARD_ID_ENCHANT_A_MATK,
		CARD_ID_ENCHANT_A_DEF,
		CARD_ID_ENCHANT_A_MDEF,
		CARD_ID_ENCHANT_A_HIT,
		CARD_ID_ENCHANT_A_FLEE,
		CARD_ID_ENCHANT_A_AVOID,
		CARD_ID_ENCHANT_A_ASPD,
		CARD_ID_ENCHANT_A_FROZEN,
		CARD_ID_ENCHANT_A_TOLERANCE,
		CARD_ID_ENCHANT_C_LIFE,
		CARD_ID_ENCHANT_C_SOUL,
		CARD_ID_ENCHANT_C_HPR,
		CARD_ID_ENCHANT_C_SPR,
		CARD_ID_ENCHANT_E_WATER,
		CARD_ID_ENCHANT_E_GROUND,
		CARD_ID_ENCHANT_E_FIRE,
		CARD_ID_ENCHANT_E_WIND,
		CARD_ID_ENCHANT_R_WATER,
		CARD_ID_ENCHANT_R_GROUND,
		CARD_ID_ENCHANT_R_FIRE,
		CARD_ID_ENCHANT_R_WIND,
		CARD_ID_ENCHANT_S_ATK,
		CARD_ID_ENCHANT_S_MATK,
		CARD_ID_ENCHANT_S_MAXHP,
		CARD_ID_ENCHANT_S_CRI,
		CARD_ID_ENCHANT_S_AVOID,
		CARD_ID_ENCHANT_S_QUICK,
		CARD_ID_ENCHANT_Z_CASTFIXED,
		CARD_ID_ENCHANT_Z_CLAIRVOYANCE,
		CARD_ID_ENCHANT_Z_IMMORTAL,
		CARD_ID_ENCHANT_Z_KILLGAIN,
		CARD_ID_ENCHANT_Z_KNOCKBACK,
		CARD_ID_ENCHANT_Z_NODISPELL,
		CARD_ID_ENCHANT_Z_REINCARNATION,

		CARD_ID_ENCHANT_ANSOKUNO_NIEVE_TAIRYOKU,
		CARD_ID_ENCHANT_ANSOKUNO_NIEVE_SEISHIN,
		CARD_ID_ENCHANT_ANSOKUNO_NIEVE_SEIMEI,
		CARD_ID_ENCHANT_ANSOKUNO_NIEVE_CHIRYOKU,
		CARD_ID_ENCHANT_EIGONO_NIEVE_MIZU,
		CARD_ID_ENCHANT_EIGONO_NIEVE_CHI,
		CARD_ID_ENCHANT_EIGONO_NIEVE_HI,
		CARD_ID_ENCHANT_EIGONO_NIEVE_KAZE,
		CARD_ID_ENCHANT_EIGONO_NIEVE_YAMI,
		CARD_ID_ENCHANT_EIGONO_NIEVE_NEN,
		CARD_ID_ENCHANT_EIGONO_NIEVE_DOKU,
		CARD_ID_ENCHANT_KIZUNO_NIEVE_MUKEI,
		CARD_ID_ENCHANT_KIZUNO_NIEVE_FUSHIKEI,
		CARD_ID_ENCHANT_KIZUNO_NIEVE_DOBUTSUKEI,
		CARD_ID_ENCHANT_KIZUNO_NIEVE_SHOKUBUTSUKEI,
		CARD_ID_ENCHANT_KIZUNO_NIEVE_KONCHUKEI,
		CARD_ID_ENCHANT_KIZUNO_NIEVE_GYOKAIKEI,
		CARD_ID_ENCHANT_KIZUNO_NIEVE_AKUMAKEI,
		CARD_ID_ENCHANT_KIZUNO_NIEVE_NINGENKEI,
		CARD_ID_ENCHANT_KIZUNO_NIEVE_TENSHIKEI,
		CARD_ID_ENCHANT_KIZUNO_NIEVE_RYUKEI,
		CARD_ID_ENCHANT_KIZUNO_NIEVE_PLAYER,
		CARD_ID_ENCHANT_CHINO_NIEVE_WANRYOKU,
		CARD_ID_ENCHANT_CHINO_NIEVE_ZINSOKU,
		CARD_ID_ENCHANT_CHINO_NIEVE_TAIRYOKU,
		CARD_ID_ENCHANT_CHINO_NIEVE_CHIRYOKU,
		CARD_ID_ENCHANT_CHINO_NIEVE_SHUCHU,
		CARD_ID_ENCHANT_CHINO_NIEVE_KOUN,
		CARD_ID_ENCHANT_MEIYONO_NIEVE_ZINSOKU,
		CARD_ID_ENCHANT_MEIYONO_NIEVE_SHUCHU,
		CARD_ID_ENCHANT_MEIYONO_NIEVE_ZYUKUREN,
		CARD_ID_ENCHANT_MEIYONO_NIEVE_MEICHU,
		CARD_ID_ENCHANT_MEIYONO_NIEVE_KAIHI,
		CARD_ID_ENCHANT_MEIYONO_NIEVE_KOUN,
		CARD_ID_ENCHANT_SHINO_NIEVE_WANRYOKU,
		CARD_ID_ENCHANT_SHINO_NIEVE_CHIRYOKU,
		CARD_ID_ENCHANT_SHINO_NIEVE_TAIRYOKU,
		CARD_ID_ENCHANT_SHINO_NIEVE_MABO,
		CARD_ID_ENCHANT_SHINO_NIEVE_GIKO,
		CARD_ID_ENCHANT_SHINO_NIEVE_KOUN,

		CARD_ID_ENCHANT_SUITEN,
		CARD_ID_ENCHANT_TENCHI,
		CARD_ID_ENCHANT_HYAKKA,
		CARD_ID_ENCHANT_SHIPPU,

		CARD_ID_ENCHANT_NICHTS,
		CARD_ID_ENCHANT_FLOOD,
		CARD_ID_ENCHANT_CRAY,
		CARD_ID_ENCHANT_BURN,
		CARD_ID_ENCHANT_GAIL,
		CARD_ID_ENCHANT_VENOM,
		CARD_ID_ENCHANT_SACRED,
		CARD_ID_ENCHANT_DEATHPERIA,
		CARD_ID_ENCHANT_GRADGE,
		CARD_ID_ENCHANT_UHA,
		CARD_ID_ENCHANT_RESIST_WATER,
		CARD_ID_ENCHANT_RESIST_EARTH,
		CARD_ID_ENCHANT_RESIST_FIRE,
		CARD_ID_ENCHANT_RESIST_WIND,
		CARD_ID_ENCHANT_RESIST_POISON,
		CARD_ID_ENCHANT_RESIST_SAINT,
		CARD_ID_ENCHANT_RESIST_DARKNESS,
		CARD_ID_ENCHANT_RESIST_TELEKINESIS,
		CARD_ID_ENCHANT_RESIST_UNDEAD,
		CARD_ID_ENCHANT_IMMUNE_WATER,
		CARD_ID_ENCHANT_IMMUNE_EARTH,
		CARD_ID_ENCHANT_IMMUNE_FIRE,
		CARD_ID_ENCHANT_IMMUNE_WIND,

		CARD_ID_ENCHANT_TAIYO,
		CARD_ID_ENCHANT_TSUKI,
		CARD_ID_ENCHANT_HOSHI,
		CARD_ID_ENCHANT_ES,
		CARD_ID_ENCHANT_SHIRYO,
		CARD_ID_ENCHANT_TAMASHI,

		CARD_ID_ENCHANT_SENZAI_KAIHO_RUNE_KNIGHT,
		CARD_ID_ENCHANT_SENZAI_KAIHO_GUILLOTINE_CROSS,
		CARD_ID_ENCHANT_SENZAI_KAIHO_ARCBISHOP,
		CARD_ID_ENCHANT_SENZAI_KAIHO_RANGER,
		CARD_ID_ENCHANT_SENZAI_KAIHO_WARLOCK,
		CARD_ID_ENCHANT_SENZAI_KAIHO_MECHANIC,
		CARD_ID_ENCHANT_SENZAI_KAIHO_ROYALGUARD,
		CARD_ID_ENCHANT_SENZAI_KAIHO_SHADOWCHASER,
		CARD_ID_ENCHANT_SENZAI_KAIHO_SHURA,
		CARD_ID_ENCHANT_SENZAI_KAIHO_MINSTREL,
		CARD_ID_ENCHANT_SENZAI_KAIHO_WANDERER,
		CARD_ID_ENCHANT_SENZAI_KAIHO_SORCERER,
		CARD_ID_ENCHANT_SENZAI_KAIHO_GENETIC,
		CARD_ID_ENCHANT_SENZAI_KAIHO_KAGERO,
		CARD_ID_ENCHANT_SENZAI_KAIHO_OBORO,
		CARD_ID_ENCHANT_SENZAI_KAIHO_REBELLION,
		CARD_ID_ENCHANT_SENZAI_KAIHO_SUMMONER,
		CARD_ID_ENCHANT_SENZAI_KAIHO_STAR_EMPEROR,
		CARD_ID_ENCHANT_SENZAI_KAIHO_SOUL_REAPER,

		CARD_ID_ENCHANT_SENZAI_KAIHO_DRAGON_KNIGHT_1,
		CARD_ID_ENCHANT_SENZAI_KAIHO_SHADOW_CROSS_1,
		CARD_ID_ENCHANT_SENZAI_KAIHO_CARDINAL_1,
		CARD_ID_ENCHANT_SENZAI_KAIHO_CARDINAL_2,
		CARD_ID_ENCHANT_SENZAI_KAIHO_CARDINAL_3,
		CARD_ID_ENCHANT_SENZAI_KAIHO_WIND_HAWK_1,
		CARD_ID_ENCHANT_SENZAI_KAIHO_ARCH_MAGE_1,
		CARD_ID_ENCHANT_SENZAI_KAIHO_ARCH_MAGE_2,
		CARD_ID_ENCHANT_SENZAI_KAIHO_MEISTER_1,
		CARD_ID_ENCHANT_SENZAI_KAIHO_IMPERIAL_GUARD_1,
		CARD_ID_ENCHANT_SENZAI_KAIHO_ABYSS_CHASER_1,
		CARD_ID_ENCHANT_SENZAI_KAIHO_INQUISITOR_1,
		CARD_ID_ENCHANT_SENZAI_KAIHO_TROUBADOUR_1,
		CARD_ID_ENCHANT_SENZAI_KAIHO_TROUVERE_1,
		CARD_ID_ENCHANT_SENZAI_KAIHO_ELEMENTAL_MASTER_1,
		CARD_ID_ENCHANT_SENZAI_KAIHO_ELEMENTAL_MASTER_2,
		CARD_ID_ENCHANT_SENZAI_KAIHO_BIOLO_1,

		CARD_ID_ENCHANT_SENZAI_KAKUSE_IGNITION_BREAK,
		CARD_ID_ENCHANT_SENZAI_KAKUSE_JUDEX,
		CARD_ID_ENCHANT_SENZAI_KAKUSE_ARROW_STORM,
		CARD_ID_ENCHANT_SENZAI_KAKUSE_JACK_FROST,
		CARD_ID_ENCHANT_SENZAI_KAKUSE_ARMS_CANNON,
		CARD_ID_ENCHANT_SENZAI_KAKUSE_SISIKO,
		CARD_ID_ENCHANT_SENZAI_KAKUSE_SEVERE_RAINSTORM,
		CARD_ID_ENCHANT_SENZAI_KAKUSE_SUMMON_VENTOS,
		CARD_ID_ENCHANT_SENZAI_KAKUSE_CRAZY_WEED,
		CARD_ID_ENCHANT_SENZAI_KAKUSE_OTORO,
		CARD_ID_ENCHANT_SENZAI_KAKUSE_SAVAGENO_TAMASHI,
		CARD_ID_ENCHANT_SENZAI_KAKUSE_MANGETSU_KYAKU,
		CARD_ID_ENCHANT_SENZAI_KAKUSE_ESHA,
		CARD_ID_ENCHANT_SENZAI_KAKUSE_BUNISHING_BASTER,

		CARD_ID_ENCHANT_ENERGY_SHUGORYU,
		CARD_ID_ENCHANT_ENERGY_IKUSAOTOME,
		CARD_ID_ENCHANT_ENERGY_REPPU,
		CARD_ID_ENCHANT_ENERGY_RYUGARI,
		CARD_ID_ENCHANT_ENERGY_GANKYO,
		CARD_ID_ENCHANT_ENERGY_MADO,
		CARD_ID_ENCHANT_ENERGY_CHIMEINO_ICHIGEKI,

		CARD_ID_ARCANA_FOOL,
		CARD_ID_ARCANA_HIGH_PRIESTESS,
		CARD_ID_ARCANA_EMPEROR,
		CARD_ID_ARCANA_HOUO,
		CARD_ID_ARCANA_LOVERS,
		CARD_ID_ARCANA_CHARIOT,
		CARD_ID_ARCANA_POWER,
		CARD_ID_ARCANA_HARMIT,
		CARD_ID_ARCANA_WHEEL_OF_FORTUNE,
		CARD_ID_ARCANA_JUSTICE,
		CARD_ID_ARCANA_HANGED_MAN,
		CARD_ID_ARCANA_DEATH,
		CARD_ID_ARCANA_SESSEI,
		CARD_ID_ARCANA_DEVIL,
		CARD_ID_ARCANA_TOWER,
		CARD_ID_ARCANA_STAR,
		CARD_ID_ARCANA_MOON,
		CARD_ID_ARCANA_WORLD,
		CARD_ID_ARCANA_FOOL_REVERSE,
		CARD_ID_ARCANA_HIGH_PRIESTESS_REVERSE,
		CARD_ID_ARCANA_EMPEROR_REVERSE,
		CARD_ID_ARCANA_HOUO_REVERSE,
		CARD_ID_ARCANA_LOVERS_REVERSE,
		CARD_ID_ARCANA_CHARIOT_REVERSE,
		CARD_ID_ARCANA_POWER_REVERSE,
		CARD_ID_ARCANA_HARMIT_REVERSE,
		CARD_ID_ARCANA_WHEEL_OF_FORTUNE_REVERSE,
		CARD_ID_ARCANA_JUSTICE_REVERSE,
		CARD_ID_ARCANA_HANGED_MAN_REVERSE,
		CARD_ID_ARCANA_DEATH_REVERSE,
		CARD_ID_ARCANA_SESSEI_REVERSE,
		CARD_ID_ARCANA_DEVIL_REVERSE,
		CARD_ID_ARCANA_TOWER_REVERSE,
		CARD_ID_ARCANA_STAR_REVERSE,
		CARD_ID_ARCANA_MOON_REVERSE,
		CARD_ID_ARCANA_WORLD_REVERSE,

		CARD_ID_ENCHANT_MIZU_DROP_1,
		CARD_ID_ENCHANT_MIZU_DROP_2,
		CARD_ID_ENCHANT_MIZU_DROP_3,
		CARD_ID_ENCHANT_MIZU_DROP_4,
		CARD_ID_ENCHANT_KI_DROP_1,
		CARD_ID_ENCHANT_KI_DROP_2,
		CARD_ID_ENCHANT_KI_DROP_3,
		CARD_ID_ENCHANT_KI_DROP_4,
		CARD_ID_ENCHANT_HI_DROP_1,
		CARD_ID_ENCHANT_HI_DROP_2,
		CARD_ID_ENCHANT_HI_DROP_3,
		CARD_ID_ENCHANT_HI_DROP_4,
		CARD_ID_ENCHANT_HIKARI_DROP_1,
		CARD_ID_ENCHANT_HIKARI_DROP_2,
		CARD_ID_ENCHANT_HIKARI_DROP_3,
		CARD_ID_ENCHANT_HIKARI_DROP_4,
		CARD_ID_ENCHANT_YAMI_DROP_1,
		CARD_ID_ENCHANT_YAMI_DROP_2,
		CARD_ID_ENCHANT_YAMI_DROP_3,
		CARD_ID_ENCHANT_YAMI_DROP_4,
		CARD_ID_ENCHANT_KAIFUKU_DROP_1,
		CARD_ID_ENCHANT_KAIFUKU_DROP_2,
		CARD_ID_ENCHANT_KAIFUKU_DROP_3,
		CARD_ID_ENCHANT_KAIFUKU_DROP_4,

		CARD_ID_ENCHANT_SHINCHU,
		CARD_ID_ENCHANT_TASOGARE,
		CARD_ID_ENCHANT_GUREN,
		CARD_ID_ENCHANT_HAKUGIN,
		CARD_ID_ENCHANT_SHOKO,
		CARD_ID_ENCHANT_KONTON,
		CARD_ID_ENCHANT_KAIFUKU,

		CARD_ID_ENCHANT_HAKUYOKYU,
		CARD_ID_ENCHANT_KINGYUKYU,
		CARD_ID_ENCHANT_SOUZIKYU,
		CARD_ID_ENCHANT_KYOKAIKYU,
		CARD_ID_ENCHANT_SHISHIKYU,
		CARD_ID_ENCHANT_SHOZYOKYU,
		CARD_ID_ENCHANT_TENBINKYU,
		CARD_ID_ENCHANT_TENKAIKYU,
		CARD_ID_ENCHANT_ZINBAKYU,
		CARD_ID_ENCHANT_MAKATSUKYU,
		CARD_ID_ENCHANT_HOUHEIKYU,
		CARD_ID_ENCHANT_SOUGYOKYU,

		CARD_ID_ENCHANT_RYUBIRYUNO_GENZYU,
		CARD_ID_ENCHANT_MANPASHIKUZYOKUNO_GENZYU,
		CARD_ID_ENCHANT_UCHUKONGEN_GENZYU,

		CARD_ID_ENCHANT_FAMITSUNO_CHIKARA,

		CARD_ID_889,
		CARD_ID_890,

		CARD_ID_ENCHANT_YUSHANO_IKARI,
		CARD_ID_ENCHANT_MAHITSUZINO_HOKO,
	];
}




