
//----------------------------------------------------------------
// データの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumMonsterDataIndex",
	[
		"MONSTER_DATA_INDEX_ID",			// 0
		"MONSTER_DATA_INDEX_NAME",
		"MONSTER_DATA_INDEX_LEVEL",
		"MONSTER_DATA_INDEX_HP",
		"MONSTER_DATA_INDEX_STR",
		"MONSTER_DATA_INDEX_INT",			// 5 INT
		"MONSTER_DATA_INDEX_VIT",			// 6 VIT
		"MONSTER_DATA_INDEX_DEX",
		"MONSTER_DATA_INDEX_AGI",
		"MONSTER_DATA_INDEX_LUK",
		"MONSTER_DATA_INDEX_ATK",			// 10
		"MONSTER_DATA_INDEX_MATK",
		"MONSTER_DATA_INDEX_RANGE",
		"MONSTER_DATA_INDEX_DEF_DIV",		// 13 除算DEF
		"MONSTER_DATA_INDEX_MDEF_DIV",		// 14 除算MDEF
		"MONSTER_DATA_INDEX_BASE_EXP",		// 15
		"MONSTER_DATA_INDEX_JOB_EXP",
		"MONSTER_DATA_INDEX_SIZE",			// 17 サイズ
		"MONSTER_DATA_INDEX_ELEMENT",		// 18 属性
		"MONSTER_DATA_INDEX_RACE",			// 19 種族
		"MONSTER_DATA_INDEX_BOSS_TYPE",		// 20 ボスタイプ
		"MONSTER_DATA_INDEX_GRASS_TYPE",
		"MONSTER_DATA_INDEX_QUALIFIED",
		"MONSTER_DATA_INDEX_KANA",

		// 特性ステータス対応
		"MONSTER_DATA_INDEX_RES",
		"MONSTER_DATA_INDEX_MRES",

		// TODO: 本来は定義したくないが、容易に外せない参照箇所があったため定義
		"MONSTER_DATA_INDEX_COUNT",			// 26
	],
	0,
	1
);

CGlobalConstManager.DefineEnum(
	"EnumMonsterDataIndex",
	[
		"MONSTER_DATA_EXTRA_INDEX_HIT",
		"MONSTER_DATA_EXTRA_INDEX_FLEE",
	],
	26,
	1
);

CGlobalConstManager.DefineEnum(
	"EnumMonsterDataIndex",
	[
		"MONSTER_DATA_EXTRA_INDEX_ATK_MIN",				// 30
		"MONSTER_DATA_EXTRA_INDEX_ATK_MAX",
		"MONSTER_DATA_EXTRA_INDEX_100HIT",
		"MONSTER_DATA_EXTRA_INDEX_95FLEE",
		"MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN",
		"MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MAX",		// 35
		"MONSTER_DATA_EXTRA_INDEX_MDEF_MINUS",
		"MONSTER_DATA_EXTRA_INDEX_MATK_MIN",
		"MONSTER_DATA_EXTRA_INDEX_MATK_MAX",
		"MONSTER_DATA_INDEX_DEF_DIV_IGNORE_BUFF",
		"MONSTER_DATA_INDEX_MDEF_DIV_IGNORE_BUFF",		// 40
		// 2025/02 リクエスト対応
		"MONSTER_DATA_EXTRA_INDEX_100CRI",
	],
	30,
	1
);



//----------------------------------------------------------------
// モンスター属性
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumMonsterElement",
	[
		"MONSTER_ELM_VANITY_1",
		"MONSTER_ELM_VANITY_2",
		"MONSTER_ELM_VANITY_3",
		"MONSTER_ELM_VANITY_4",
	],
	(ELM_ID_VANITY * 10 + 1),
	1
);

CGlobalConstManager.DefineEnum(
	"EnumMonsterElement",
	[
		"MONSTER_ELM_WATER_1",
		"MONSTER_ELM_WATER_2",
		"MONSTER_ELM_WATER_3",
		"MONSTER_ELM_WATER_4",
	],
	(ELM_ID_WATER * 10 + 1),
	1
);

CGlobalConstManager.DefineEnum(
	"EnumMonsterElement",
	[
		"MONSTER_ELM_EARTH_1",
		"MONSTER_ELM_EARTH_2",
		"MONSTER_ELM_EARTH_3",
		"MONSTER_ELM_EARTH_4",
	],
	(ELM_ID_EARTH * 10 + 1),
	1
);

CGlobalConstManager.DefineEnum(
	"EnumMonsterElement",
	[
		"MONSTER_ELM_FIRE_1",
		"MONSTER_ELM_FIRE_2",
		"MONSTER_ELM_FIRE_3",
		"MONSTER_ELM_FIRE_4",
	],
	(ELM_ID_FIRE * 10 + 1),
	1
);

CGlobalConstManager.DefineEnum(
	"EnumMonsterElement",
	[
		"MONSTER_ELM_WIND_1",
		"MONSTER_ELM_WIND_2",
		"MONSTER_ELM_WIND_3",
		"MONSTER_ELM_WIND_4",
	],
	(ELM_ID_WIND * 10 + 1),
	1
);

CGlobalConstManager.DefineEnum(
	"EnumMonsterElement",
	[
		"MONSTER_ELM_POISON_1",
		"MONSTER_ELM_POISON_2",
		"MONSTER_ELM_POISON_3",
		"MONSTER_ELM_POISON_4",
	],
	(ELM_ID_POISON * 10 + 1),
	1
);

CGlobalConstManager.DefineEnum(
	"EnumMonsterElement",
	[
		"MONSTER_ELM_HOLY_1",
		"MONSTER_ELM_HOLY_2",
		"MONSTER_ELM_HOLY_3",
		"MONSTER_ELM_HOLY_4",
	],
	(ELM_ID_HOLY * 10 + 1),
	1
);

CGlobalConstManager.DefineEnum(
	"EnumMonsterElement",
	[
		"MONSTER_ELM_DARK_1",
		"MONSTER_ELM_DARK_2",
		"MONSTER_ELM_DARK_3",
		"MONSTER_ELM_DARK_4",
	],
	(ELM_ID_DARK * 10 + 1),
	1
);

CGlobalConstManager.DefineEnum(
	"EnumMonsterElement",
	[
		"MONSTER_ELM_PSYCO_1",
		"MONSTER_ELM_PSYCO_2",
		"MONSTER_ELM_PSYCO_3",
		"MONSTER_ELM_PSYCO_4",
	],
	(ELM_ID_PSYCO * 10 + 1),
	1
);

CGlobalConstManager.DefineEnum(
	"EnumMonsterElement",
	[
		"MONSTER_ELM_UNDEAD_1",
		"MONSTER_ELM_UNDEAD_2",
		"MONSTER_ELM_UNDEAD_3",
		"MONSTER_ELM_UNDEAD_4",
	],
	(ELM_ID_UNDEAD * 10 + 1),
	1
);



//----------------------------------------------------------------
// モンスターBOSS属性
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumMonsterBossType",
	[
		"MONSTER_BOSSTYPE_NONE",
		"MONSTER_BOSSTYPE_BOSS",
	],
	0,
	1
);



//----------------------------------------------------------------
// モンスター草属性
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumMonsterGrassType",
	[
		"MONSTER_GRASSTYPE_NONE",
	],
	0,
	1
);

CGlobalConstManager.DefineEnum(
	"EnumMonsterGrassType",
	[
		"MONSTER_GRASSTYPE_GLASS",
		"MONSTER_GRASSTYPE_EMPERIUM",
		"MONSTER_GRASSTYPE_GLASS_NEW",
	],
	5,
	1
);





/**
 * モンスター属性のベース属性（水地火風など）を取得する.
 * @param monsterElm モンスター属性
 * @return ベース属性（common.js で定義している属性ＩＤと一致）
 */
function GetMonseterElmBasicType(monsterElm) {

	return Math.floor(monsterElm / 10);
}



/**
 * BOSS属性のテキストを取得する.
 * @param bossTypeId BOSS属性ID
 * @return BOSS属性のテキスト
 */
function GetBossTypeText(bossTypeId) {

	switch (bossTypeId) {
	case MONSTER_BOSSTYPE_NONE:
		return "一般";

	case MONSTER_BOSSTYPE_BOSS:
		return "BOSS";

	}

	return "エラー";
}



/**
 * 草属性のテキストを取得する.
 * @param grassTypeId 草属性ID
 * @return 草属性のテキスト
 */
function GetGrassTypeText(grassTypeId) {

	switch (grassTypeId) {
	case MONSTER_GRASSTYPE_NONE:
		return "なし";

	case MONSTER_GRASSTYPE_GLASS:
		return "旧草";

	case MONSTER_GRASSTYPE_EMPERIUM:
		return "エンペ";

	case MONSTER_GRASSTYPE_GLASS_NEW:
		return "新草";

	}

	return "エラー";
}