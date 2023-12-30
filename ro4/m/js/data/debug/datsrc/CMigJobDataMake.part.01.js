if (_DATA_CREATE_MODE) {		// _DATA_CREATE_MODE



(function () {

	var dataObject = null;

	// データ追加対象データ配列取得
	var dataArray = g_constDataManager.jobDataManager.sourceArray;

	// ID登録用関数
	var funcRegisterId = function (idStr) {
		return g_constDataManager.jobDataManager.RegisterId(idStr);
	}



	// 職業データ定義（全て手動登録）



	//================================================================================================================================
	//
	// 基本職
	//
	//================================================================================================================================

	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_NOVICE"
		))
		.AddNameKana("ノービス", "ノービス")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_NOVICE)
		.SetWeightBonus(0)

		.AddWeaponAspd(ITEM_KIND_NONE, 152)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 141)
		.AddWeaponAspd(ITEM_KIND_SWORD, 140)
		.AddWeaponAspd(ITEM_KIND_AXE, 138)
		.AddWeaponAspd(ITEM_KIND_CLUB, 140)
		.AddWeaponAspd(ITEM_KIND_STUFF, 141)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 7)

		.SetJobBonusArray([
		])

		.SetHpArray([
			    40,    45,    50,    55,    60,    65,    70,    75,    80,    85,
			    90,    95,   100,   105,   110,   115,   120,   125,   130,   135,
			   140,   145,   150,   155,   160,   165,   170,   175,   180,   185,
			   190,   195,   200,   205,   210,   215,   220,   225,   230,   235,
			   240,   245,   250,   255,   260,   265,   270,   275,   280,   285,
			   290,   295,   300,   305,   310,   315,   320,   325,   330,   335,
			   340,   345,   350,   355,   360,   365,   370,   375,   380,   385,
			   390,   395,   400,   405,   410,   415,   420,   425,   430,   435,
			   440,   445,   450,   455,   460,   465,   470,   475,   480,   485,
			   490,   495,   500,   505,   510,   515,   520,   525,   530,
		])

		.SetSpArray([
			    11,    12,    13,    14,    15,    16,    17,    18,    19,    20,
			    21,    22,    23,    24,    25,    26,    27,    28,    29,    30,
			    31,    32,    33,    34,    35,    36,    37,    38,    39,    40,
			    41,    42,    43,    44,    45,    46,    47,    48,    49,    50,
			    51,    52,    53,    54,    55,    56,    57,    58,    59,    60,
			    61,    62,    63,    64,    65,    66,    67,    68,    69,    70,
			    71,    72,    73,    74,    75,    76,    77,    78,    79,    80,
			    81,    82,    83,    84,    85,    86,    87,    88,    89,    90,
			    91,    92,    93,    94,    95,    96,    97,    98,    99,   100,
			   101,   102,   103,   104,   105,   106,   107,   108,   109,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
		])

		.SetPassiveSkillIdArray([
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_SERIES_NOVICE,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_LOWER_OF_NOVICE,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_SWORDMAN"
		))
		.AddNameKana("ソードマン", "ソードマン")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_1ST)
		.SetWeightBonus(800)

		.AddWeaponAspd(ITEM_KIND_NONE, 162)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 153)
		.AddWeaponAspd(ITEM_KIND_SWORD, 146)
		.AddWeaponAspd(ITEM_KIND_SWORD_2HAND, 143)
		.AddWeaponAspd(ITEM_KIND_SPEAR, 141)
		.AddWeaponAspd(ITEM_KIND_SPEAR_2HAND, 140)
		.AddWeaponAspd(ITEM_KIND_AXE, 139)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 138)
		.AddWeaponAspd(ITEM_KIND_CLUB, 142)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[2, PARAM_STR],
			[6, PARAM_VIT],
			[10, PARAM_DEX],
			[14, PARAM_STR],
			[18, PARAM_VIT],
			[22, PARAM_DEX],
			[26, PARAM_LUK],
			[30, PARAM_AGI],
			[33, PARAM_STR],
			[36, PARAM_DEX],
			[38, PARAM_VIT],
			[40, PARAM_STR],
			[42, PARAM_VIT],
			[44, PARAM_LUK],
			[46, PARAM_AGI],
			[47, PARAM_STR],
			[49, PARAM_STR],
			[50, PARAM_STR],
		])

		.SetHpArray([
			    40,    46,    53,    61,    70,    79,    89,   100,   111,   123,
			   136,   149,   163,   178,   194,   210,   227,   245,   263,   282,
			   302,   322,   343,   365,   388,   411,   435,   460,   485,   511,
			   538,   565,   593,   622,   652,   682,   713,   745,   777,   810,
			   844,   878,   913,   949,   986,  1023,  1061,  1100,  1139,  1179,
			  1220,  1261,  1303,  1346,  1390,  1434,  1479,  1525,  1571,  1618,
			  1666,  1714,  1763,  1813,  1864,  1915,  1967,  2020,  2073,  2127,
			  2182,  2237,  2293,  2350,  2408,  2466,  2525,  2585,  2645,  2706,
			  2768,  2830,  2893,  2957,  3022,  3087,  3153,  3220,  3287,  3355,
			  3424,  3493,  3563,  3634,  3706,  3778,  3851,  3925,  3999,
		])

		.SetSpArray([
			    12,    14,    16,    18,    20,    22,    24,    26,    28,    30,
			    32,    34,    36,    38,    40,    42,    44,    46,    48,    50,
			    52,    54,    56,    58,    60,    62,    64,    66,    68,    70,
			    72,    74,    76,    78,    80,    82,    84,    86,    88,    90,
			    92,    94,    96,    98,   100,   102,   104,   106,   108,   110,
			   112,   114,   116,   118,   120,   122,   124,   126,   128,   130,
			   132,   134,   136,   138,   140,   142,   144,   146,   148,   150,
			   152,   154,   156,   158,   160,   162,   164,   166,   168,   170,
			   172,   174,   176,   178,   180,   182,   184,   186,   188,   190,
			   192,   194,   196,   198,   200,   202,   204,   206,   208,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN, SKILL_ID_HP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_BASH, SKILL_ID_MAGNUM_BREAK, SKILL_ID_PROVOKE,
			SKILL_ID_ENDURE, SKILL_ID_IDOZI_HP_KAIFUKU, SKILL_ID_KYUSHO_KOGEKI,
			SKILL_ID_AUTO_BERSERK,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_ENDURE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_SWORDMAN,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_MIRROR_SHIELD,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_LOWER_OF_SWORDMAN,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_THIEF"
		))
		.AddNameKana("シーフ", "シーフ")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_1ST)
		.SetWeightBonus(400)

		.AddWeaponAspd(ITEM_KIND_NONE, 163)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 152)
		.AddWeaponAspd(ITEM_KIND_SWORD, 140)
		.AddWeaponAspd(ITEM_KIND_AXE, 133)
		.AddWeaponAspd(ITEM_KIND_BOW, 135)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[2, PARAM_AGI],
			[6, PARAM_STR],
			[10, PARAM_DEX],
			[14, PARAM_VIT],
			[18, PARAM_INT],
			[22, PARAM_DEX],
			[26, PARAM_LUK],
			[30, PARAM_STR],
			[33, PARAM_AGI],
			[36, PARAM_AGI],
			[38, PARAM_STR],
			[40, PARAM_LUK],
			[42, PARAM_DEX],
			[44, PARAM_VIT],
			[46, PARAM_LUK],
			[47, PARAM_STR],
			[49, PARAM_DEX],
			[50, PARAM_AGI],
		])

		.SetHpArray([
			    40,    46,    53,    60,    68,    76,    85,    94,   104,   114,
			   125,   136,   148,   160,   173,   186,   200,   214,   229,   244,
			   260,   276,   293,   310,   328,   346,   365,   384,   404,   424,
			   445,   466,   488,   510,   533,   556,   580,   604,   629,   654,
			   680,   706,   733,   760,   788,   816,   845,   874,   904,   934,
			   965,   996,  1028,  1060,  1093,  1126,  1160,  1194,  1229,  1264,
			  1300,  1336,  1373,  1410,  1448,  1486,  1525,  1564,  1604,  1644,
			  1685,  1726,  1768,  1810,  1853,  1896,  1940,  1984,  2029,  2074,
			  2120,  2166,  2213,  2260,  2308,  2356,  2405,  2454,  2504,  2554,
			  2605,  2656,  2708,  2760,  2813,  2866,  2920,  2974,  3029,
		])

		.SetSpArray([
			    12,    14,    16,    18,    20,    22,    24,    26,    28,    30,
			    32,    34,    36,    38,    40,    42,    44,    46,    48,    50,
			    52,    54,    56,    58,    60,    62,    64,    66,    68,    70,
			    72,    74,    76,    78,    80,    82,    84,    86,    88,    90,
			    92,    94,    96,    98,   100,   102,   104,   106,   108,   110,
			   112,   114,   116,   118,   120,   122,   124,   126,   128,   130,
			   132,   134,   136,   138,   140,   142,   144,   146,   148,   150,
			   152,   154,   156,   158,   160,   162,   164,   166,   168,   170,
			   172,   174,   176,   178,   180,   182,   184,   186,   188,   190,
			   192,   194,   196,   198,   200,   202,   204,   206,   208,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_STEAL,
			SKILL_ID_HIDING, SKILL_ID_ENVENOM, SKILL_ID_GEDOKU,
			SKILL_ID_SUNAMAKI, SKILL_ID_ISHIHIROI, SKILL_ID_ISHINAGE,
			SKILL_ID_BACKSTEP,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_ENVENOM,
			SKILL_ID_SUNAMAKI,
			SKILL_ID_ISHINAGE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_THIEF_NINJA,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_TYPE_RENDO,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_LOWER_OF_THIEF,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_ACOLYTE"
		))
		.AddNameKana("アコライト", "アコライト")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_1ST)
		.SetWeightBonus(400)

		.AddWeaponAspd(ITEM_KIND_NONE, 163)
		.AddWeaponAspd(ITEM_KIND_CLUB, 142)
		.AddWeaponAspd(ITEM_KIND_STUFF, 142)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 134)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[2, PARAM_LUK],
			[6, PARAM_VIT],
			[10, PARAM_INT],
			[14, PARAM_DEX],
			[18, PARAM_LUK],
			[22, PARAM_AGI],
			[26, PARAM_STR],
			[30, PARAM_VIT],
			[33, PARAM_INT],
			[36, PARAM_DEX],
			[38, PARAM_LUK],
			[40, PARAM_AGI],
			[42, PARAM_STR],
			[44, PARAM_VIT],
			[46, PARAM_INT],
			[47, PARAM_DEX],
			[49, PARAM_STR],
			[50, PARAM_LUK],
		])

		.SetHpArray([
			    40,    46,    52,    59,    66,    73,    81,    89,    98,   107,
			   116,   126,   136,   147,   158,   169,   181,   193,   206,   219,
			   232,   246,   260,   275,   290,   305,   321,   337,   354,   371,
			   388,   406,   424,   443,   462,   481,   501,   521,   542,   563,
			   584,   606,   628,   651,   674,   697,   721,   745,   770,   795,
			   820,   846,   872,   899,   926,   953,   981,  1009,  1038,  1067,
			  1096,  1126,  1156,  1187,  1218,  1249,  1281,  1313,  1346,  1379,
			  1412,  1446,  1480,  1515,  1550,  1585,  1621,  1657,  1694,  1731,
			  1768,  1806,  1844,  1883,  1922,  1961,  2001,  2041,  2082,  2123,
			  2164,  2206,  2248,  2291,  2334,  2377,  2421,  2465,  2510,
		])

		.SetSpArray([
			    15,    20,    25,    30,    35,    40,    45,    50,    55,    60,
			    65,    70,    75,    80,    85,    90,    95,   100,   105,   110,
			   115,   120,   125,   130,   135,   140,   145,   150,   155,   160,
			   165,   170,   175,   180,   185,   190,   195,   200,   205,   210,
			   215,   220,   225,   230,   235,   240,   245,   250,   255,   260,
			   265,   270,   275,   280,   285,   290,   295,   300,   305,   310,
			   315,   320,   325,   330,   335,   340,   345,   350,   355,   360,
			   365,   370,   375,   380,   385,   390,   395,   400,   405,   410,
			   415,   420,   425,   430,   435,   440,   445,   450,   455,   460,
			   465,   470,   475,   480,   485,   490,   495,   500,   505,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE, SKILL_ID_SIGNUM_CRUCIS,
			SKILL_ID_HEAL, SKILL_ID_CURE, SKILL_ID_ANGELUS,
			SKILL_ID_BLESSING, SKILL_ID_SOKUDO_ZOKA, SKILL_ID_SOKUDO_GENSHO,
			SKILL_ID_RUWACH, SKILL_ID_TELEPORT, SKILL_ID_WARP_PORTAL,
			SKILL_ID_PNEUMA, SKILL_ID_AQUA_BENEDICTA, SKILL_ID_HOLY_LIGHT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_HEAL,
			SKILL_ID_HOLY_LIGHT,
			SKILL_ID_RUWACH,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ACOLYTE,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_LOWER_OF_ACOLYTE,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_ARCHER"
		))
		.AddNameKana("アーチャー", "アーチャー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_1ST)
		.SetWeightBonus(600)

		.AddWeaponAspd(ITEM_KIND_NONE, 169)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 147)
		.AddWeaponAspd(ITEM_KIND_BOW, 143)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[2, PARAM_DEX],
			[6, PARAM_STR],
			[10, PARAM_INT],
			[14, PARAM_DEX],
			[18, PARAM_DEX],
			[22, PARAM_LUK],
			[26, PARAM_AGI],
			[30, PARAM_DEX],
			[33, PARAM_AGI],
			[36, PARAM_DEX],
			[38, PARAM_STR],
			[40, PARAM_STR],
			[42, PARAM_DEX],
			[44, PARAM_LUK],
			[46, PARAM_VIT],
			[47, PARAM_INT],
			[49, PARAM_AGI],
			[50, PARAM_DEX],
		])

		.SetHpArray([
			    40,    46,    53,    60,    68,    76,    85,    94,   104,   114,
			   125,   136,   148,   160,   173,   186,   200,   214,   229,   244,
			   260,   276,   293,   310,   328,   346,   365,   384,   404,   424,
			   445,   466,   488,   510,   533,   556,   580,   604,   629,   654,
			   680,   706,   733,   760,   788,   816,   845,   874,   904,   934,
			   965,   996,  1028,  1060,  1093,  1126,  1160,  1194,  1229,  1264,
			  1300,  1336,  1373,  1410,  1448,  1486,  1525,  1564,  1604,  1644,
			  1685,  1726,  1768,  1810,  1853,  1896,  1940,  1984,  2029,  2074,
			  2120,  2166,  2213,  2260,  2308,  2356,  2405,  2454,  2504,  2554,
			  2605,  2656,  2708,  2760,  2813,  2866,  2920,  2974,  3029,
		])

		.SetSpArray([
			    12,    14,    16,    18,    20,    22,    24,    26,    28,    30,
			    32,    34,    36,    38,    40,    42,    44,    46,    48,    50,
			    52,    54,    56,    58,    60,    62,    64,    66,    68,    70,
			    72,    74,    76,    78,    80,    82,    84,    86,    88,    90,
			    92,    94,    96,    98,   100,   102,   104,   106,   108,   110,
			   112,   114,   116,   118,   120,   122,   124,   126,   128,   130,
			   132,   134,   136,   138,   140,   142,   144,   146,   148,   150,
			   152,   154,   156,   158,   160,   162,   164,   166,   168,   170,
			   172,   174,   176,   178,   180,   182,   184,   186,   188,   190,
			   192,   194,   196,   198,   200,   202,   204,   206,   208,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_DOUBLE_STRAFING, SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YA_SAKUSEI,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME,
			SKILL_ID_SHUCHURYOKU_KOZYO,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ARCHER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_LOWER_OF_ARCHER,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_MAGICIAN"
		))
		.AddNameKana("マジシャン", "マジシャン")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_1ST)
		.SetWeightBonus(200)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 142)
		.AddWeaponAspd(ITEM_KIND_STUFF, 139)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 127)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 7)

		.SetJobBonusArray([
			[2, PARAM_INT],
			[6, PARAM_DEX],
			[10, PARAM_DEX],
			[14, PARAM_INT],
			[18, PARAM_AGI],
			[22, PARAM_INT],
			[26, PARAM_AGI],
			[30, PARAM_LUK],
			[33, PARAM_INT],
			[36, PARAM_DEX],
			[38, PARAM_INT],
			[40, PARAM_AGI],
			[42, PARAM_LUK],
			[44, PARAM_INT],
			[46, PARAM_INT],
			[47, PARAM_AGI],
			[49, PARAM_LUK],
			[50, PARAM_INT],
		])

		.SetHpArray([
			    40,    46,    52,    58,    65,    72,    79,    86,    94,   102,
			   110,   119,   128,   137,   147,   157,   167,   177,   188,   199,
			   210,   222,   234,   246,   259,   272,   285,   298,   312,   326,
			   340,   355,   370,   385,   401,   417,   433,   449,   466,   483,
			   500,   518,   536,   554,   573,   592,   611,   630,   650,   670,
			   690,   711,   732,   753,   775,   797,   819,   841,   864,   887,
			   910,   934,   958,   982,  1007,  1032,  1057,  1082,  1108,  1134,
			  1160,  1187,  1214,  1241,  1269,  1297,  1325,  1353,  1382,  1411,
			  1440,  1470,  1500,  1530,  1561,  1592,  1623,  1654,  1686,  1718,
			  1750,  1783,  1816,  1849,  1883,  1917,  1951,  1985,  2020,
		])

		.SetSpArray([
			    16,    22,    28,    34,    40,    46,    52,    58,    64,    70,
			    76,    82,    88,    94,   100,   106,   112,   118,   124,   130,
			   136,   142,   148,   154,   160,   166,   172,   178,   184,   190,
			   196,   202,   208,   214,   220,   226,   232,   238,   244,   250,
			   256,   262,   268,   274,   280,   286,   292,   298,   304,   310,
			   316,   322,   328,   334,   340,   346,   352,   358,   364,   370,
			   376,   382,   388,   394,   400,   406,   412,   418,   424,   430,
			   436,   442,   448,   454,   460,   466,   472,   478,   484,   490,
			   496,   502,   508,   514,   520,   526,   532,   538,   544,   550,
			   556,   562,   568,   574,   580,   586,   592,   598,   604,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT, SKILL_ID_FROST_DIVER, SKILL_ID_SIGHT,
			SKILL_ID_LIGHTNING_BOLT, SKILL_ID_THUNDER_STORM, SKILL_ID_STONE_CURSE,
			SKILL_ID_NAPALM_BEAT, SKILL_ID_SOUL_STRIKE, SKILL_ID_SAFETY_WALL,
			SKILL_ID_SP_KAIFUKURYOKU_KOZYO, SKILL_ID_ENERGY_COAT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_ENERGY_COAT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_LOWER_OF_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_MARCHANT"
		))
		.AddNameKana("マーチャント", "マーチャント")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_1ST)
		.SetWeightBonus(800)

		.AddWeaponAspd(ITEM_KIND_NONE, 162)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 142)
		.AddWeaponAspd(ITEM_KIND_SWORD, 139)
		.AddWeaponAspd(ITEM_KIND_AXE, 139)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 137)
		.AddWeaponAspd(ITEM_KIND_CLUB, 139)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[2, PARAM_VIT],
			[6, PARAM_DEX],
			[10, PARAM_STR],
			[14, PARAM_DEX],
			[18, PARAM_VIT],
			[22, PARAM_STR],
			[26, PARAM_INT],
			[30, PARAM_VIT],
			[33, PARAM_AGI],
			[36, PARAM_LUK],
			[38, PARAM_DEX],
			[40, PARAM_STR],
			[42, PARAM_DEX],
			[44, PARAM_STR],
			[46, PARAM_LUK],
			[47, PARAM_VIT],
			[49, PARAM_STR],
			[50, PARAM_DEX],
		])

		.SetHpArray([
			    40,    46,    52,    59,    66,    73,    81,    89,    98,   107,
			   116,   126,   136,   147,   158,   169,   181,   193,   206,   219,
			   232,   246,   260,   275,   290,   305,   321,   337,   354,   371,
			   388,   406,   424,   443,   462,   481,   501,   521,   542,   563,
			   584,   606,   628,   651,   674,   697,   721,   745,   770,   795,
			   820,   846,   872,   899,   926,   953,   981,  1009,  1038,  1067,
			  1096,  1126,  1156,  1187,  1218,  1249,  1281,  1313,  1346,  1379,
			  1412,  1446,  1480,  1515,  1550,  1585,  1621,  1657,  1694,  1731,
			  1768,  1806,  1844,  1883,  1922,  1961,  2001,  2041,  2082,  2123,
			  2164,  2206,  2248,  2291,  2334,  2377,  2421,  2465,  2510,
		])

		.SetSpArray([
			    13,    16,    19,    22,    25,    28,    31,    34,    37,    40,
			    43,    46,    49,    52,    55,    58,    61,    64,    67,    70,
			    73,    76,    79,    82,    85,    88,    91,    94,    97,   100,
			   103,   106,   109,   112,   115,   118,   121,   124,   127,   130,
			   133,   136,   139,   142,   145,   148,   151,   154,   157,   160,
			   163,   166,   169,   172,   175,   178,   181,   184,   187,   190,
			   193,   196,   199,   202,   205,   208,   211,   214,   217,   220,
			   223,   226,   229,   232,   235,   238,   241,   244,   247,   250,
			   253,   256,   259,   262,   265,   268,   271,   274,   277,   280,
			   283,   286,   289,   292,   295,   298,   301,   304,   307,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_SHOZIGENKAIRYO_ZOKA, SKILL_ID_DISCOUNT, SKILL_ID_OVER_CHARGE,
			SKILL_ID_PUSH_CART, SKILL_ID_ITEM_KANTE, SKILL_ID_ROTEN_KAISETSU,
			SKILL_ID_MAMMONITE, SKILL_ID_LOUD_VOICE, SKILL_ID_CHANGE_CART,
			SKILL_ID_CART_REVOLUTION,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_LOUD_VOICE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_MAMMONITE,
			SKILL_ID_CART_REVOLUTION,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MARCHANT,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_LOWER_OF_MARCHANT,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();










	//================================================================================================================================
	//
	// 二次職
	//
	//================================================================================================================================

	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_KNIGHT"
		))
		.AddNameKana("ナイト", "ナイト")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND)
		.SetWeightBonus(800)

		.AddWeaponAspd(ITEM_KIND_NONE, 162)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 149)
		.AddWeaponAspd(ITEM_KIND_SWORD, 149)
		.AddWeaponAspd(ITEM_KIND_SWORD_2HAND, 144)
		.AddWeaponAspd(ITEM_KIND_SPEAR, 142)
		.AddWeaponAspd(ITEM_KIND_SPEAR_2HAND, 142)
		.AddWeaponAspd(ITEM_KIND_AXE, 139)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 139)
		.AddWeaponAspd(ITEM_KIND_CLUB, 141)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_VIT],
			[3, PARAM_VIT],
			[4, PARAM_STR],
			[5, PARAM_LUK],
			[8, PARAM_VIT],
			[10, PARAM_STR],
			[11, PARAM_DEX],
			[12, PARAM_VIT],
			[13, PARAM_AGI],
			[15, PARAM_STR],
			[17, PARAM_VIT],
			[18, PARAM_VIT],
			[19, PARAM_DEX],
			[20, PARAM_LUK],
			[21, PARAM_STR],
			[23, PARAM_VIT],
			[27, PARAM_STR],
			[28, PARAM_LUK],
			[29, PARAM_VIT],
			[31, PARAM_DEX],
			[33, PARAM_STR],
			[36, PARAM_VIT],
			[37, PARAM_LUK],
			[38, PARAM_AGI],
			[40, PARAM_DEX],
			[43, PARAM_VIT],
			[46, PARAM_STR],
			[47, PARAM_STR],
			[48, PARAM_DEX],
			[49, PARAM_DEX],
		])

		.SetHpArray([
			    40,    48,    58,    69,    82,    96,   112,   129,   148,   168,
			   190,   213,   238,   264,   292,   321,   352,   384,   418,   453,
			   490,   528,   568,   609,   652,   696,   742,   789,   838,   888,
			   940,   993,  1048,  1104,  1162,  1221,  1282,  1344,  1408,  1473,
			  1540,  1608,  1678,  1749,  1822,  1896,  1972,  2049,  2128,  2208,
			  2290,  2373,  2458,  2544,  2632,  2721,  2812,  2904,  2998,  3093,
			  3190,  3288,  3388,  3489,  3592,  3696,  3802,  3909,  4018,  4128,
			  4240,  4353,  4468,  4584,  4702,  4821,  4942,  5064,  5188,  5313,
			  5440,  5568,  5698,  5829,  5962,  6096,  6232,  6369,  6508,  6648,
			  6790,  6933,  7078,  7224,  7372,  7521,  7672,  7824,  7978,
		])

		.SetSpArray([
			    13,    16,    19,    22,    25,    28,    31,    34,    37,    40,
			    43,    46,    49,    52,    55,    58,    61,    64,    67,    70,
			    73,    76,    79,    82,    85,    88,    91,    94,    97,   100,
			   103,   106,   109,   112,   115,   118,   121,   124,   127,   130,
			   133,   136,   139,   142,   145,   148,   151,   154,   157,   160,
			   163,   166,   169,   172,   175,   178,   181,   184,   187,   190,
			   193,   196,   199,   202,   205,   208,   211,   214,   217,   220,
			   223,   226,   229,   232,   235,   238,   241,   244,   247,   250,
			   253,   256,   259,   262,   265,   268,   271,   274,   277,   280,
			   283,   286,   289,   292,   295,   298,   301,   304,   307,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN, SKILL_ID_HP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_BASH, SKILL_ID_MAGNUM_BREAK, SKILL_ID_PROVOKE,
			SKILL_ID_ENDURE, SKILL_ID_IDOZI_HP_KAIFUKU, SKILL_ID_KYUSHO_KOGEKI,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_YARI_SHUREN, SKILL_ID_PIERCE,
			SKILL_ID_SPEAR_STUB, SKILL_ID_SPEAR_BOOMERANG, SKILL_ID_BRANDISH_SPEAR,
			SKILL_ID_TWOHAND_QUICKEN, SKILL_ID_AUTO_COUNTER, SKILL_ID_BOWLING_BASH,
			SKILL_ID_RIDING, SKILL_ID_KIHE_SHUREN, SKILL_ID_CHARGE_ATTACK,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_YARI_SHUREN,
			SKILL_ID_TWOHAND_QUICKEN, SKILL_ID_KIHE_SHUREN,
			SKILL_ID_ONEHAND_QUICKEN, SKILL_ID_ENDURE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
			SKILL_ID_PIERCE,
			SKILL_ID_SPEAR_STUB,
			SKILL_ID_SPEAR_BOOMERANG,
			SKILL_ID_BRANDISH_SPEAR,
			SKILL_ID_BOWLING_BASH,
			SKILL_ID_CHARGE_ATTACK,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_SWORDMAN,
			ITEM_EQPFLG_SERIES_UPPER_OF_SWORDMAN,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_MIRROR_SHIELD,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_KNIGHT,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_ASSASIN"
		))
		.AddNameKana("アサシン", "アサシン")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND)
		.SetWeightBonus(400)

		.AddWeaponAspd(ITEM_KIND_NONE, 169)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 156)
		.AddWeaponAspd(ITEM_KIND_SWORD, 143)
		.AddWeaponAspd(ITEM_KIND_AXE, 138)
		.AddWeaponAspd(ITEM_KIND_KATAR, 156)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_AGI],
			[2, PARAM_AGI],
			[3, PARAM_AGI],
			[4, PARAM_INT],
			[6, PARAM_VIT],
			[8, PARAM_VIT],
			[9, PARAM_DEX],
			[11, PARAM_STR],
			[14, PARAM_INT],
			[15, PARAM_AGI],
			[16, PARAM_AGI],
			[17, PARAM_AGI],
			[18, PARAM_AGI],
			[19, PARAM_AGI],
			[20, PARAM_AGI],
			[21, PARAM_AGI],
			[24, PARAM_DEX],
			[25, PARAM_STR],
			[27, PARAM_STR],
			[30, PARAM_DEX],
			[31, PARAM_DEX],
			[32, PARAM_STR],
			[38, PARAM_INT],
			[40, PARAM_DEX],
			[41, PARAM_DEX],
			[42, PARAM_INT],
			[45, PARAM_STR],
			[46, PARAM_DEX],
			[48, PARAM_STR],
			[50, PARAM_DEX],
		])

		.SetHpArray([
			    40,    47,    55,    64,    75,    87,   100,   114,   129,   145,
			   162,   180,   199,   219,   241,   264,   288,   313,   339,   366,
			   394,   423,   453,   484,   517,   551,   586,   622,   659,   697,
			   736,   776,   817,   859,   903,   948,   994,  1041,  1089,  1138,
			  1188,  1239,  1291,  1344,  1399,  1455,  1512,  1570,  1629,  1689,
			  1750,  1812,  1875,  1939,  2005,  2072,  2140,  2209,  2279,  2350,
			  2422,  2495,  2569,  2644,  2721,  2799,  2878,  2958,  3039,  3121,
			  3204,  3288,  3373,  3459,  3547,  3636,  3726,  3817,  3909,  4002,
			  4096,  4191,  4287,  4384,  4483,  4583,  4684,  4786,  4889,  4993,
			  5098,  5204,  5311,  5419,  5529,  5640,  5752,  5865,  5979,
		])

		.SetSpArray([
			    14,    18,    22,    26,    30,    34,    38,    42,    46,    50,
			    54,    58,    62,    66,    70,    74,    78,    82,    86,    90,
			    94,    98,   102,   106,   110,   114,   118,   122,   126,   130,
			   134,   138,   142,   146,   150,   154,   158,   162,   166,   170,
			   174,   178,   182,   186,   190,   194,   198,   202,   206,   210,
			   214,   218,   222,   226,   230,   234,   238,   242,   246,   250,
			   254,   258,   262,   266,   270,   274,   278,   282,   286,   290,
			   294,   298,   302,   306,   310,   314,   318,   322,   326,   330,
			   334,   338,   342,   346,   350,   354,   358,   362,   366,   370,
			   374,   378,   382,   386,   390,   394,   398,   402,   406,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_STEAL,
			SKILL_ID_HIDING, SKILL_ID_ENVENOM, SKILL_ID_GEDOKU,
			SKILL_ID_SUNAMAKI, SKILL_ID_ISHIHIROI, SKILL_ID_ISHINAGE,
			SKILL_ID_BACKSTEP, SKILL_ID_MIGITE_SHUREN, SKILL_ID_HIDARITE_SHUREN,
			SKILL_ID_KATAR_SHUREN, SKILL_ID_SONIC_BLOW, SKILL_ID_GRIM_TOOTH,
			SKILL_ID_CLOAKING, SKILL_ID_ENCHANT_POISON, SKILL_ID_POISON_REACT,
			SKILL_ID_VENOM_DUST, SKILL_ID_VENOM_SPLASHER, SKILL_ID_VENOM_KNIFE,
			SKILL_ID_SONIC_ACCELERATION,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA,
			SKILL_ID_MIGITE_SHUREN, SKILL_ID_HIDARITE_SHUREN,
			SKILL_ID_KATAR_SHUREN, SKILL_ID_SONIC_ACCELERATION,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_ENVENOM,
			SKILL_ID_SUNAMAKI,
			SKILL_ID_ISHINAGE,
			SKILL_ID_SONIC_BLOW,
			SKILL_ID_GRIM_TOOTH,
			SKILL_ID_VENOM_SPLASHER,
			SKILL_ID_POISON_REACT,
			SKILL_ID_VENOM_KNIFE,
			SKILL_ID_SONIC_BLOW_TAMASHI,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_THIEF_NINJA,
			ITEM_EQPFLG_SERIES_UPPER_OF_THIEF,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_ASSASIN_PRIEST,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_ASSASIN,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_PRIEST"
		))
		.AddNameKana("プリースト", "プリースト")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND)
		.SetWeightBonus(600)

		.AddWeaponAspd(ITEM_KIND_NONE, 166)
		.AddWeaponAspd(ITEM_KIND_CLUB, 143)
		.AddWeaponAspd(ITEM_KIND_STUFF, 143)
		.AddWeaponAspd(ITEM_KIND_BOOK, 143)
		.AddWeaponAspd(ITEM_KIND_FIST, -6)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 142)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_LUK],
			[3, PARAM_LUK],
			[4, PARAM_STR],
			[6, PARAM_AGI],
			[7, PARAM_VIT],
			[8, PARAM_INT],
			[9, PARAM_INT],
			[10, PARAM_LUK],
			[11, PARAM_STR],
			[14, PARAM_VIT],
			[16, PARAM_DEX],
			[17, PARAM_STR],
			[20, PARAM_DEX],
			[21, PARAM_LUK],
			[22, PARAM_INT],
			[25, PARAM_DEX],
			[27, PARAM_STR],
			[29, PARAM_AGI],
			[31, PARAM_LUK],
			[32, PARAM_DEX],
			[34, PARAM_VIT],
			[35, PARAM_STR],
			[36, PARAM_VIT],
			[37, PARAM_AGI],
			[39, PARAM_LUK],
			[42, PARAM_INT],
			[43, PARAM_INT],
			[45, PARAM_VIT],
			[48, PARAM_AGI],
			[50, PARAM_LUK],
		])

		.SetHpArray([
			    40,    47,    54,    62,    71,    81,    91,   102,   114,   127,
			   140,   154,   169,   185,   201,   218,   236,   255,   274,   294,
			   315,   337,   359,   382,   406,   431,   456,   482,   509,   537,
			   565,   594,   624,   655,   686,   718,   751,   785,   819,   854,
			   890,   927,   964,  1002,  1041,  1081,  1121,  1162,  1204,  1247,
			  1290,  1334,  1379,  1425,  1471,  1518,  1566,  1615,  1664,  1714,
			  1765,  1817,  1869,  1922,  1976,  2031,  2086,  2142,  2199,  2257,
			  2315,  2374,  2434,  2495,  2556,  2618,  2681,  2745,  2809,  2874,
			  2940,  3007,  3074,  3142,  3211,  3281,  3351,  3422,  3494,  3567,
			  3640,  3714,  3789,  3865,  3941,  4018,  4096,  4175,  4254,
		])

		.SetSpArray([
			    18,    26,    34,    42,    50,    58,    66,    74,    82,    90,
			    98,   106,   114,   122,   130,   138,   146,   154,   162,   170,
			   178,   186,   194,   202,   210,   218,   226,   234,   242,   250,
			   258,   266,   274,   282,   290,   298,   306,   314,   322,   330,
			   338,   346,   354,   362,   370,   378,   386,   394,   402,   410,
			   418,   426,   434,   442,   450,   458,   466,   474,   482,   490,
			   498,   506,   514,   522,   530,   538,   546,   554,   562,   570,
			   578,   586,   594,   602,   610,   618,   626,   634,   642,   650,
			   658,   666,   674,   682,   690,   698,   706,   714,   722,   730,
			   738,   746,   754,   762,   770,   778,   786,   794,   802,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE, SKILL_ID_SIGNUM_CRUCIS,
			SKILL_ID_HEAL, SKILL_ID_CURE, SKILL_ID_ANGELUS,
			SKILL_ID_BLESSING, SKILL_ID_SOKUDO_ZOKA, SKILL_ID_SOKUDO_GENSHO,
			SKILL_ID_RUWACH, SKILL_ID_TELEPORT, SKILL_ID_WARP_PORTAL,
			SKILL_ID_PNEUMA, SKILL_ID_AQUA_BENEDICTA, SKILL_ID_HOLY_LIGHT,
			SKILL_ID_MAGNIFICAT, SKILL_ID_KYRIE_ELEISON, SKILL_ID_GLORIA,
			SKILL_ID_IMPOSITIO_MANUS, SKILL_ID_SUFFRAGIUM, SKILL_ID_ASPERSIO,
			SKILL_ID_RECOVERY, SKILL_ID_RESURRECTION, SKILL_ID_SANCTUARY,
			SKILL_ID_LEX_DIVINA, SKILL_ID_LEX_AETERNA, SKILL_ID_SAFETY_WALL,
			SKILL_ID_TURN_UNDEAD, SKILL_ID_MAGNUS_EXORCISMUS, SKILL_ID_SP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_MACE_SHUREN, SKILL_ID_SLOW_POISON, SKILL_ID_SEITAI_KOFUKU,
			SKILL_ID_REDEMPTIO,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE,
			SKILL_ID_MACE_SHUREN,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_HEAL,
			SKILL_ID_HOLY_LIGHT,
			SKILL_ID_RUWACH,
			SKILL_ID_TURN_UNDEAD,
			SKILL_ID_RESURRECTION,
			SKILL_ID_MAGNUS_EXORCISMUS,
			SKILL_ID_SANCTUARY,
			SKILL_ID_HOLY_LIGHT_TAMASHI,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ACOLYTE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ACOLYTE,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_ASSASIN_PRIEST,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_TYPE_BOOK,
			ITEM_EQPFLG_SERIES_PRIEST,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_HUNTER"
		))
		.AddNameKana("ハンター", "ハンター")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND)
		.SetWeightBonus(700)

		.AddWeaponAspd(ITEM_KIND_NONE, 167)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 144)
		.AddWeaponAspd(ITEM_KIND_BOW, 145)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_DEX],
			[3, PARAM_INT],
			[4, PARAM_DEX],
			[5, PARAM_STR],
			[7, PARAM_LUK],
			[8, PARAM_DEX],
			[10, PARAM_STR],
			[11, PARAM_STR],
			[12, PARAM_AGI],
			[14, PARAM_DEX],
			[15, PARAM_LUK],
			[17, PARAM_VIT],
			[19, PARAM_AGI],
			[20, PARAM_AGI],
			[21, PARAM_DEX],
			[23, PARAM_VIT],
			[27, PARAM_DEX],
			[29, PARAM_LUK],
			[31, PARAM_AGI],
			[33, PARAM_DEX],
			[34, PARAM_INT],
			[38, PARAM_DEX],
			[39, PARAM_AGI],
			[41, PARAM_INT],
			[42, PARAM_LUK],
			[43, PARAM_DEX],
			[44, PARAM_STR],
			[46, PARAM_INT],
			[47, PARAM_AGI],
			[49, PARAM_DEX],
		])

		.SetHpArray([
			    40,    47,    55,    63,    72,    82,    93,   105,   118,   132,
			   146,   161,   177,   194,   212,   231,   250,   270,   291,   313,
			   336,   360,   385,   410,   436,   463,   491,   520,   550,   581,
			   612,   644,   677,   711,   746,   782,   818,   855,   893,   932,
			   972,  1013,  1055,  1097,  1140,  1184,  1229,  1275,  1322,  1370,
			  1418,  1467,  1517,  1568,  1620,  1673,  1726,  1780,  1835,  1891,
			  1948,  2006,  2065,  2124,  2184,  2245,  2307,  2370,  2434,  2499,
			  2564,  2630,  2697,  2765,  2834,  2904,  2974,  3045,  3117,  3190,
			  3264,  3339,  3415,  3491,  3568,  3646,  3725,  3805,  3886,  3968,
			  4050,  4133,  4217,  4302,  4388,  4475,  4562,  4650,  4739,
		])

		.SetSpArray([
			    14,    18,    22,    26,    30,    34,    38,    42,    46,    50,
			    54,    58,    62,    66,    70,    74,    78,    82,    86,    90,
			    94,    98,   102,   106,   110,   114,   118,   122,   126,   130,
			   134,   138,   142,   146,   150,   154,   158,   162,   166,   170,
			   174,   178,   182,   186,   190,   194,   198,   202,   206,   210,
			   214,   218,   222,   226,   230,   234,   238,   242,   246,   250,
			   254,   258,   262,   266,   270,   274,   278,   282,   286,   290,
			   294,   298,   302,   306,   310,   314,   318,   322,   326,   330,
			   334,   338,   342,   346,   350,   354,   358,   362,   366,   370,
			   374,   378,   382,   386,   390,   394,   398,   402,   406,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_DOUBLE_STRAFING, SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YA_SAKUSEI, SKILL_ID_SKID_TRAP, SKILL_ID_ANKLESNARE,
			SKILL_ID_FREEZING_TRAP, SKILL_ID_FLASHER, SKILL_ID_SANDMAN,
			SKILL_ID_LAND_MINE, SKILL_ID_BLAST_MINE, SKILL_ID_CLAYMORE_TRAP,
			SKILL_ID_SHOCKWAVE_TRAP, SKILL_ID_REMOVE_TRAP, SKILL_ID_TALKIE_BOX,
			SKILL_ID_BEAST_BANE, SKILL_ID_FALCON_MASTERY, SKILL_ID_DETECTING,
			SKILL_ID_BLITZ_BEAT, SKILL_ID_STEEL_CROW, SKILL_ID_SPRING_TRAP,
			SKILL_ID_FANTASMIC_ARROW,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME,
			SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_BEAST_BANE,
			SKILL_ID_BLITZ_BEAT, SKILL_ID_STEEL_CROW,
			SKILL_ID_HUNTERNO_TAMASHI_KOKA,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_FANTASMIC_ARROW,
			SKILL_ID_BLITZ_BEAT,
			SKILL_ID_LAND_MINE,
			SKILL_ID_FREEZING_TRAP,
			SKILL_ID_BLAST_MINE,
			SKILL_ID_CLAYMORE_TRAP,
			SKILL_ID_BEAST_STRAIFING,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ARCHER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ARCHER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_RENDO,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_HUNTER_ROGUE,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_HUNTER,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_WIZARD"
		))
		.AddNameKana("ウィザード", "ウィザード")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND)
		.SetWeightBonus(400)

		.AddWeaponAspd(ITEM_KIND_NONE, 146)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 144)
		.AddWeaponAspd(ITEM_KIND_STUFF, 141)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 141)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 7)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[2, PARAM_DEX],
			[4, PARAM_INT],
			[5, PARAM_DEX],
			[6, PARAM_AGI],
			[9, PARAM_INT],
			[10, PARAM_AGI],
			[12, PARAM_STR],
			[13, PARAM_DEX],
			[15, PARAM_LUK],
			[18, PARAM_INT],
			[22, PARAM_INT],
			[24, PARAM_AGI],
			[26, PARAM_DEX],
			[29, PARAM_INT],
			[31, PARAM_INT],
			[32, PARAM_DEX],
			[33, PARAM_INT],
			[34, PARAM_AGI],
			[36, PARAM_LUK],
			[38, PARAM_VIT],
			[39, PARAM_DEX],
			[40, PARAM_INT],
			[41, PARAM_AGI],
			[43, PARAM_AGI],
			[45, PARAM_INT],
			[46, PARAM_AGI],
			[47, PARAM_AGI],
			[48, PARAM_INT],
			[50, PARAM_INT],
		])

		.SetHpArray([
			    40,    46,    53,    60,    68,    76,    85,    94,   104,   115,
			   126,   138,   150,   163,   176,   190,   204,   219,   234,   250,
			   267,   284,   302,   320,   339,   358,   378,   398,   419,   441,
			   463,   486,   509,   533,   557,   582,   607,   633,   659,   686,
			   714,   742,   771,   800,   830,   860,   891,   922,   954,   987,
			  1020,  1054,  1088,  1123,  1158,  1194,  1230,  1267,  1304,  1342,
			  1381,  1420,  1460,  1500,  1541,  1582,  1624,  1666,  1709,  1753,
			  1797,  1842,  1887,  1933,  1979,  2026,  2073,  2121,  2169,  2218,
			  2268,  2318,  2369,  2420,  2472,  2524,  2577,  2630,  2684,  2739,
			  2794,  2850,  2906,  2963,  3020,  3078,  3136,  3195,  3254,
		])

		.SetSpArray([
			    19,    28,    37,    46,    55,    64,    73,    82,    91,   100,
			   109,   118,   127,   136,   145,   154,   163,   172,   181,   190,
			   199,   208,   217,   226,   235,   244,   253,   262,   271,   280,
			   289,   298,   307,   316,   325,   334,   343,   352,   361,   370,
			   379,   388,   397,   406,   415,   424,   433,   442,   451,   460,
			   469,   478,   487,   496,   505,   514,   523,   532,   541,   550,
			   559,   568,   577,   586,   595,   604,   613,   622,   631,   640,
			   649,   658,   667,   676,   685,   694,   703,   712,   721,   730,
			   739,   748,   757,   766,   775,   784,   793,   802,   811,   820,
			   829,   838,   847,   856,   865,   874,   883,   892,   901,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT, SKILL_ID_FROST_DIVER, SKILL_ID_SIGHT,
			SKILL_ID_LIGHTNING_BOLT, SKILL_ID_THUNDER_STORM, SKILL_ID_STONE_CURSE,
			SKILL_ID_NAPALM_BEAT, SKILL_ID_SOUL_STRIKE, SKILL_ID_SAFETY_WALL,
			SKILL_ID_SP_KAIFUKURYOKU_KOZYO, SKILL_ID_ENERGY_COAT, SKILL_ID_MONSTER_ZYOHO,
			SKILL_ID_FIRE_PILLAR, SKILL_ID_SIGHT_RASHER, SKILL_ID_METEOR_STORM,
			SKILL_ID_FROST_NOVA, SKILL_ID_WATER_BALL, SKILL_ID_STORM_GUST,
			SKILL_ID_ICE_WALL, SKILL_ID_JUPITER_THUNDER, SKILL_ID_LORD_OF_VERMILLION,
			SKILL_ID_EARTH_SPIKE, SKILL_ID_HEAVENS_DRIVE, SKILL_ID_QUAGMIRE,
			SKILL_ID_SIGHT_BLASTER,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_ENERGY_COAT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
			SKILL_ID_FIRE_PILLAR,
			SKILL_ID_SIGHT_RASHER,
			SKILL_ID_METEOR_STORM,
			SKILL_ID_JUPITER_THUNDER,
			SKILL_ID_LORD_OF_VERMILLION,
			SKILL_ID_WATER_BALL,
			SKILL_ID_FROST_NOVA,
			SKILL_ID_STORM_GUST,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_HEAVENS_DRIVE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_WIZARD_LINKER,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_BLACKSMITH"
		))
		.AddNameKana("ブラックスミス", "ブラックスミス")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND)
		.SetWeightBonus(1000)

		.AddWeaponAspd(ITEM_KIND_NONE, 166)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 142)
		.AddWeaponAspd(ITEM_KIND_SWORD, 141)
		.AddWeaponAspd(ITEM_KIND_AXE, 141)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 141)
		.AddWeaponAspd(ITEM_KIND_CLUB, 140)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_DEX],
			[3, PARAM_STR],
			[4, PARAM_DEX],
			[5, PARAM_DEX],
			[7, PARAM_VIT],
			[8, PARAM_STR],
			[9, PARAM_DEX],
			[11, PARAM_LUK],
			[12, PARAM_DEX],
			[13, PARAM_VIT],
			[16, PARAM_STR],
			[19, PARAM_DEX],
			[20, PARAM_VIT],
			[21, PARAM_INT],
			[23, PARAM_STR],
			[26, PARAM_DEX],
			[28, PARAM_DEX],
			[29, PARAM_AGI],
			[31, PARAM_STR],
			[32, PARAM_VIT],
			[34, PARAM_INT],
			[36, PARAM_DEX],
			[37, PARAM_VIT],
			[38, PARAM_AGI],
			[39, PARAM_DEX],
			[40, PARAM_DEX],
			[44, PARAM_STR],
			[46, PARAM_LUK],
			[47, PARAM_DEX],
			[49, PARAM_VIT],
		])

		.SetHpArray([
			    40,    47,    55,    64,    74,    84,    95,   107,   120,   134,
			   149,   165,   182,   200,   219,   238,   258,   279,   301,   324,
			   348,   373,   399,   426,   454,   482,   511,   541,   572,   604,
			   637,   671,   706,   742,   779,   816,   854,   893,   933,   974,
			  1016,  1059,  1103,  1148,  1194,  1240,  1287,  1335,  1384,  1434,
			  1485,  1537,  1590,  1644,  1699,  1754,  1810,  1867,  1925,  1984,
			  2044,  2105,  2167,  2230,  2294,  2358,  2423,  2489,  2556,  2624,
			  2693,  2763,  2834,  2906,  2979,  3052,  3126,  3201,  3277,  3354,
			  3432,  3511,  3591,  3672,  3754,  3836,  3919,  4003,  4088,  4174,
			  4261,  4349,  4438,  4528,  4619,  4710,  4802,  4895,  4989,
		])

		.SetSpArray([
			    14,    18,    22,    26,    30,    34,    38,    42,    46,    50,
			    54,    58,    62,    66,    70,    74,    78,    82,    86,    90,
			    94,    98,   102,   106,   110,   114,   118,   122,   126,   130,
			   134,   138,   142,   146,   150,   154,   158,   162,   166,   170,
			   174,   178,   182,   186,   190,   194,   198,   202,   206,   210,
			   214,   218,   222,   226,   230,   234,   238,   242,   246,   250,
			   254,   258,   262,   266,   270,   274,   278,   282,   286,   290,
			   294,   298,   302,   306,   310,   314,   318,   322,   326,   330,
			   334,   338,   342,   346,   350,   354,   358,   362,   366,   370,
			   374,   378,   382,   386,   390,   394,   398,   402,   406,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_SHOZIGENKAIRYO_ZOKA, SKILL_ID_DISCOUNT, SKILL_ID_OVER_CHARGE,
			SKILL_ID_PUSH_CART, SKILL_ID_ITEM_KANTE, SKILL_ID_ROTEN_KAISETSU,
			SKILL_ID_MAMMONITE, SKILL_ID_LOUD_VOICE, SKILL_ID_CHANGE_CART,
			SKILL_ID_CART_REVOLUTION, SKILL_ID_TETSU_SEIZO, SKILL_ID_KOTETSU_SEIZO,
			SKILL_ID_ZOKUSEISEKI_SEIZO, SKILL_ID_ORIDEOCON_KENKYU, SKILL_ID_TANKEN_SEISAKU,
			SKILL_ID_KEN_SEISAKU, SKILL_ID_RYOTEKEN_SEISAKU, SKILL_ID_ONO_SEISAKU,
			SKILL_ID_MACE_SEISAKU, SKILL_ID_KNUCKLE_SEISAKU, SKILL_ID_YARI_SEISAKU,
			SKILL_ID_HILT_BINDING, SKILL_ID_SKIN_TEMPERING, SKILL_ID_KOSEKI_HAKKEN,
			SKILL_ID_BUKI_SHURI, SKILL_ID_BUKI_KENKYU, SKILL_ID_HAMMER_FALL,
			SKILL_ID_ADRENALINE_RUSH, SKILL_ID_WEAPON_PERFECTION, SKILL_ID_OVER_TRUST,
			SKILL_ID_MAXIMIZE_POWER, SKILL_ID_GREED, SKILL_ID_FAKE_ZENY,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_LOUD_VOICE, SKILL_ID_HILT_BINDING,
			SKILL_ID_BUKI_KENKYU, SKILL_ID_SKIN_TEMPERING,
			SKILL_ID_ADRENALINE_RUSH, SKILL_ID_WEAPON_PERFECTION,
			SKILL_ID_OVER_TRUST, SKILL_ID_MAXIMIZE_POWER,
			SKILL_ID_FULL_ADRENALINE_RUSH,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_MAMMONITE,
			SKILL_ID_CART_REVOLUTION,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MARCHANT,
			ITEM_EQPFLG_SERIES_UPPER_OF_MARCHANT,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_BLACKSMITH,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_CRUSADER"
		))
		.AddNameKana("クルセイダー", "クルセイダー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND)
		.SetWeightBonus(800)

		.AddWeaponAspd(ITEM_KIND_NONE, 165)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 152)
		.AddWeaponAspd(ITEM_KIND_SWORD, 152)
		.AddWeaponAspd(ITEM_KIND_SWORD_2HAND, 145)
		.AddWeaponAspd(ITEM_KIND_SPEAR, 143)
		.AddWeaponAspd(ITEM_KIND_SPEAR_2HAND, 143)
		.AddWeaponAspd(ITEM_KIND_AXE, 140)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 140)
		.AddWeaponAspd(ITEM_KIND_CLUB, 141)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 4)

		.SetJobBonusArray([
			[1, PARAM_LUK],
			[2, PARAM_LUK],
			[3, PARAM_LUK],
			[4, PARAM_LUK],
			[5, PARAM_LUK],
			[7, PARAM_STR],
			[9, PARAM_INT],
			[11, PARAM_STR],
			[12, PARAM_VIT],
			[14, PARAM_DEX],
			[15, PARAM_VIT],
			[17, PARAM_STR],
			[20, PARAM_INT],
			[21, PARAM_INT],
			[22, PARAM_VIT],
			[23, PARAM_STR],
			[25, PARAM_STR],
			[28, PARAM_DEX],
			[30, PARAM_AGI],
			[32, PARAM_STR],
			[34, PARAM_DEX],
			[35, PARAM_INT],
			[36, PARAM_AGI],
			[38, PARAM_INT],
			[40, PARAM_VIT],
			[41, PARAM_VIT],
			[44, PARAM_INT],
			[46, PARAM_VIT],
			[48, PARAM_STR],
			[50, PARAM_VIT],
		])

		.SetHpArray([
			    42,    51,    61,    72,    85,    99,   114,   130,   147,   165,
			   184,   204,   225,   247,   271,   296,   322,   349,   377,   406,
			   436,   467,   499,   532,   567,   603,   640,   678,   717,   757,
			   798,   840,   883,   927,   973,  1020,  1068,  1117,  1167,  1218,
			  1270,  1323,  1377,  1432,  1489,  1547,  1606,  1666,  1727,  1789,
			  1852,  1916,  1981,  2047,  2115,  2184,  2254,  2325,  2397,  2470,
			  2544,  2619,  2695,  2772,  2851,  2931,  3012,  3094,  3177,  3261,
			  3346,  3432,  3519,  3607,  3697,  3788,  3880,  3973,  4067,  4162,
			  4258,  4355,  4453,  4552,  4653,  4755,  4858,  4962,  5067,  5173,
			  5280,  5388,  5497,  5607,  5719,  5832,  5946,  6061,  6177,
		])

		.SetSpArray([
			    14,    19,    24,    28,    33,    38,    42,    47,    52,    57,
			    61,    66,    71,    75,    80,    85,    89,    94,    99,   104,
			   108,   113,   118,   122,   127,   132,   136,   141,   146,   151,
			   155,   160,   165,   169,   174,   179,   183,   188,   193,   198,
			   202,   207,   212,   216,   221,   226,   230,   235,   240,   245,
			   249,   254,   259,   263,   268,   273,   277,   282,   287,   292,
			   296,   301,   306,   310,   315,   320,   324,   329,   334,   339,
			   343,   348,   353,   357,   362,   367,   371,   376,   381,   386,
			   390,   395,   400,   404,   409,   414,   418,   423,   428,   433,
			   437,   442,   447,   451,   456,   461,   465,   470,   475,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN, SKILL_ID_HP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_BASH, SKILL_ID_MAGNUM_BREAK, SKILL_ID_PROVOKE,
			SKILL_ID_ENDURE, SKILL_ID_IDOZI_HP_KAIFUKU, SKILL_ID_KYUSHO_KOGEKI,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_YARI_SHUREN, SKILL_ID_SPEAR_QUICKEN,
			SKILL_ID_FAITH, SKILL_ID_HOLY_CROSS, SKILL_ID_GRAND_CROSS,
			SKILL_ID_SHIELD_CHARGE, SKILL_ID_SHIELD_BOOMERANG, SKILL_ID_REFLECT_SHIELD,
			SKILL_ID_AUTO_GUARD, SKILL_ID_DEFENDER, SKILL_ID_DEBOTION,
			SKILL_ID_RIDING, SKILL_ID_KIHE_SHUREN, SKILL_ID_HEAL,
			SKILL_ID_CURE, SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE,
			SKILL_ID_PROVIDENCE, SKILL_ID_SHRINK,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_FAITH,
			SKILL_ID_YARI_SHUREN, SKILL_ID_SPEAR_QUICKEN,
			SKILL_ID_DEMON_BANE, SKILL_ID_DIVINE_PROTECTION,
			SKILL_ID_AUTO_GUARD_OLD, SKILL_ID_KIHE_SHUREN,
			SKILL_ID_DEFENDER, SKILL_ID_ENDURE,
			SKILL_ID_REFLECT_SHIELD,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
			SKILL_ID_SHIELD_CHARGE,
			SKILL_ID_SHIELD_BOOMERANG,
			SKILL_ID_SHIELD_BOOMERANG_TAMASHI,
			SKILL_ID_HOLY_CROSS,
			SKILL_ID_GRAND_CROSS,
			SKILL_ID_HEAL,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_SWORDMAN,
			ITEM_EQPFLG_SERIES_UPPER_OF_SWORDMAN,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_MIRROR_SHIELD,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_CRUSADER,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_ROGUE"
		))
		.AddNameKana("ローグ", "ローグ")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND)
		.SetWeightBonus(400)

		.AddWeaponAspd(ITEM_KIND_NONE, 165)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 153)
		.AddWeaponAspd(ITEM_KIND_SWORD, 146)
		.AddWeaponAspd(ITEM_KIND_AXE, -6)
		.AddWeaponAspd(ITEM_KIND_BOW, 143)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_AGI],
			[2, PARAM_VIT],
			[3, PARAM_DEX],
			[5, PARAM_STR],
			[6, PARAM_VIT],
			[7, PARAM_AGI],
			[9, PARAM_VIT],
			[11, PARAM_DEX],
			[14, PARAM_VIT],
			[15, PARAM_VIT],
			[16, PARAM_AGI],
			[18, PARAM_DEX],
			[20, PARAM_DEX],
			[23, PARAM_AGI],
			[25, PARAM_STR],
			[26, PARAM_VIT],
			[27, PARAM_STR],
			[29, PARAM_AGI],
			[30, PARAM_STR],
			[33, PARAM_DEX],
			[34, PARAM_DEX],
			[36, PARAM_STR],
			[38, PARAM_INT],
			[39, PARAM_AGI],
			[42, PARAM_STR],
			[43, PARAM_INT],
			[45, PARAM_AGI],
			[47, PARAM_INT],
			[48, PARAM_INT],
			[50, PARAM_DEX],
		])

		.SetHpArray([
			    40,    47,    55,    63,    72,    82,    93,   105,   118,   132,
			   146,   161,   177,   194,   212,   231,   250,   270,   291,   313,
			   336,   360,   385,   410,   436,   463,   491,   520,   550,   581,
			   612,   644,   677,   711,   746,   782,   818,   855,   893,   932,
			   972,  1013,  1055,  1097,  1140,  1184,  1229,  1275,  1322,  1370,
			  1418,  1467,  1517,  1568,  1620,  1673,  1726,  1780,  1835,  1891,
			  1948,  2006,  2065,  2124,  2184,  2245,  2307,  2370,  2434,  2499,
			  2564,  2630,  2697,  2765,  2834,  2904,  2974,  3045,  3117,  3190,
			  3264,  3339,  3415,  3491,  3568,  3646,  3725,  3805,  3886,  3968,
			  4050,  4133,  4217,  4302,  4388,  4475,  4562,  4650,  4739,
		])

		.SetSpArray([
			    15,    20,    25,    30,    35,    40,    45,    50,    55,    60,
			    65,    70,    75,    80,    85,    90,    95,   100,   105,   110,
			   115,   120,   125,   130,   135,   140,   145,   150,   155,   160,
			   165,   170,   175,   180,   185,   190,   195,   200,   205,   210,
			   215,   220,   225,   230,   235,   240,   245,   250,   255,   260,
			   265,   270,   275,   280,   285,   290,   295,   300,   305,   310,
			   315,   320,   325,   330,   335,   340,   345,   350,   355,   360,
			   365,   370,   375,   380,   385,   390,   395,   400,   405,   410,
			   415,   420,   425,   430,   435,   440,   445,   450,   455,   460,
			   465,   470,   475,   480,   485,   490,   495,   500,   505,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_STEAL,
			SKILL_ID_HIDING, SKILL_ID_ENVENOM, SKILL_ID_GEDOKU,
			SKILL_ID_SUNAMAKI, SKILL_ID_ISHIHIROI, SKILL_ID_ISHINAGE,
			SKILL_ID_BACKSTEP, SKILL_ID_SNATCHER, SKILL_ID_STEAL_COIN,
			SKILL_ID_TUNNEL_DRIVE, SKILL_ID_BACK_STAB, SKILL_ID_SURPRISE_ATTACK,
			SKILL_ID_INTIMIDATE, SKILL_ID_CLONE_SKILL, SKILL_ID_STRIP_WEAPON,
			SKILL_ID_STRIP_SHIELD, SKILL_ID_STRIP_ARMER, SKILL_ID_STRIP_HELM,
			SKILL_ID_GRAPHITY, SKILL_ID_FLAG_GRAPHITY, SKILL_ID_CLEANER,
			SKILL_ID_GANGSTAR_PARADISE, SKILL_ID_COMPULSION_DISCOUNT, SKILL_ID_KEN_SHUREN,
			SKILL_ID_WASHINO_ME, SKILL_ID_DOUBLE_STRAFING, SKILL_ID_REMOVE_TRAP,
			SKILL_ID_CLOSE_CONFINE,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA,
			SKILL_ID_KEN_SHUREN, SKILL_ID_WASHINO_ME,
			SKILL_ID_SANDANSHO, SKILL_ID_CLOSE_CONFINE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_ENVENOM,
			SKILL_ID_SUNAMAKI,
			SKILL_ID_ISHINAGE,
			SKILL_ID_BACK_STAB,
			SKILL_ID_SURPRISE_ATTACK,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_INTIMIDATE_FOR_CLONE,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
			SKILL_ID_HEAL,
			SKILL_ID_HOLY_LIGHT,
			SKILL_ID_RUWACH,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
			SKILL_ID_MAMMONITE,
			SKILL_ID_BOWLING_BASH,
			SKILL_ID_CHARGE_ATTACK,
			SKILL_ID_VENOM_SPLASHER,
			SKILL_ID_VENOM_KNIFE,
			SKILL_ID_TURN_UNDEAD,
			SKILL_ID_RESURRECTION,
			SKILL_ID_MAGNUS_EXORCISMUS,
			SKILL_ID_SANCTUARY,
			SKILL_ID_FANTASMIC_ARROW,
			SKILL_ID_LAND_MINE,
			SKILL_ID_FREEZING_TRAP,
			SKILL_ID_BLAST_MINE,
			SKILL_ID_CLAYMORE_TRAP,
			SKILL_ID_FIRE_PILLAR,
			SKILL_ID_SIGHT_RASHER,
			SKILL_ID_METEOR_STORM,
			SKILL_ID_JUPITER_THUNDER,
			SKILL_ID_LORD_OF_VERMILLION,
			SKILL_ID_WATER_BALL_FOR_CLONE,
			SKILL_ID_FROST_NOVA,
			SKILL_ID_STORM_GUST,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_HEAVENS_DRIVE_FOR_CLONE,
			SKILL_ID_SHIELD_CHARGE,
			SKILL_ID_SHIELD_BOOMERANG,
			SKILL_ID_HOLY_CROSS,
			SKILL_ID_GRAND_CROSS,
			SKILL_ID_SHIDAN,
			SKILL_ID_HAKKEI,
			SKILL_ID_ASHURA_HAOKEN,
			SKILL_ID_ASHURA_HAOKEN_SPKOTEI,
			SKILL_ID_SUNKEI,
			SKILL_ID_ACID_TERROR,
			SKILL_ID_DEMONSTRATION,
			SKILL_ID_TEIOAPUCHAGI,
			SKILL_ID_KOUENKA,
			SKILL_ID_KAENZIN,
			SKILL_ID_RYUENZIN,
			SKILL_ID_HYOSENSO,
			SKILL_ID_TSURARAOTOSHI,
			SKILL_ID_FUZIN,
			SKILL_ID_RAIGEKISAI,
			SKILL_ID_SAKUFU,
			SKILL_ID_ZENI_NAGE,
			SKILL_ID_TATAMI_GAESHI,
			SKILL_ID_KASUMIGIRI,
			SKILL_ID_KAGEKIRI,
			SKILL_ID_TRIPLE_ACTION,
			SKILL_ID_BULLS_EYE,
			SKILL_ID_YOMIGAESHI,
			SKILL_ID_BAKURETSU_KUNAI,
			SKILL_ID_MUCHANAGE,
			SKILL_ID_TOMAHAWKNAGE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_THIEF_NINJA,
			ITEM_EQPFLG_SERIES_UPPER_OF_THIEF,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_RENDO,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_SERIES_HUNTER_ROGUE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_ROGUE,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_MONK"
		))
		.AddNameKana("モンク", "モンク")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND)
		.SetWeightBonus(600)

		.AddWeaponAspd(ITEM_KIND_NONE, 173)
		.AddWeaponAspd(ITEM_KIND_CLUB, 144)
		.AddWeaponAspd(ITEM_KIND_STUFF, 144)
		.AddWeaponAspd(ITEM_KIND_FIST, 170)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 144)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_STR],
			[2, PARAM_STR],
			[4, PARAM_DEX],
			[6, PARAM_AGI],
			[7, PARAM_VIT],
			[10, PARAM_AGI],
			[12, PARAM_STR],
			[13, PARAM_STR],
			[14, PARAM_LUK],
			[16, PARAM_INT],
			[18, PARAM_AGI],
			[20, PARAM_VIT],
			[21, PARAM_AGI],
			[22, PARAM_DEX],
			[23, PARAM_AGI],
			[25, PARAM_VIT],
			[26, PARAM_STR],
			[27, PARAM_STR],
			[30, PARAM_DEX],
			[32, PARAM_LUK],
			[33, PARAM_VIT],
			[35, PARAM_AGI],
			[38, PARAM_INT],
			[40, PARAM_LUK],
			[41, PARAM_VIT],
			[43, PARAM_DEX],
			[44, PARAM_AGI],
			[46, PARAM_VIT],
			[49, PARAM_STR],
			[50, PARAM_STR],
		])

		.SetHpArray([
			    41,    50,    59,    70,    81,    93,   105,   119,   133,   149,
			   165,   183,   201,   221,   241,   262,   283,   306,   329,   354,
			   379,   406,   433,   462,   491,   521,   551,   583,   615,   649,
			   683,   719,   755,   793,   831,   870,   909,   950,   991,  1034,
			  1077,  1122,  1167,  1214,  1261,  1309,  1357,  1407,  1457,  1509,
			  1561,  1615,  1669,  1725,  1781,  1838,  1895,  1954,  2013,  2074,
			  2135,  2198,  2261,  2326,  2391,  2457,  2523,  2591,  2659,  2729,
			  2799,  2871,  2943,  3017,  3091,  3166,  3241,  3318,  3395,  3474,
			  3553,  3634,  3715,  3798,  3881,  3965,  4049,  4135,  4221,  4309,
			  4397,  4487,  4577,  4669,  4761,  4854,  4947,  5042,  5137,
		])

		.SetSpArray([
			    14,    19,    24,    28,    33,    38,    42,    47,    52,    57,
			    61,    66,    71,    75,    80,    85,    89,    94,    99,   104,
			   108,   113,   118,   122,   127,   132,   136,   141,   146,   151,
			   155,   160,   165,   169,   174,   179,   183,   188,   193,   198,
			   202,   207,   212,   216,   221,   226,   230,   235,   240,   245,
			   249,   254,   259,   263,   268,   273,   277,   282,   287,   292,
			   296,   301,   306,   310,   315,   320,   324,   329,   334,   339,
			   343,   348,   353,   357,   362,   367,   371,   376,   381,   386,
			   390,   395,   400,   404,   409,   414,   418,   423,   428,   433,
			   437,   442,   447,   451,   456,   461,   465,   470,   475,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE, SKILL_ID_SIGNUM_CRUCIS,
			SKILL_ID_HEAL, SKILL_ID_CURE, SKILL_ID_ANGELUS,
			SKILL_ID_BLESSING, SKILL_ID_SOKUDO_ZOKA, SKILL_ID_SOKUDO_GENSHO,
			SKILL_ID_RUWACH, SKILL_ID_TELEPORT, SKILL_ID_WARP_PORTAL,
			SKILL_ID_PNEUMA, SKILL_ID_AQUA_BENEDICTA, SKILL_ID_HOLY_LIGHT,
			SKILL_ID_TEKKEN, SKILL_ID_KIKO, SKILL_ID_KIDATSU,
			SKILL_ID_SANDANSHO, SKILL_ID_RENDASHO, SKILL_ID_MORYUKEN,
			SKILL_ID_ASHURA_HAOKEN, SKILL_ID_MIKIRI, SKILL_ID_IBUKI,
			SKILL_ID_SHIDAN, SKILL_ID_HAKKEI, SKILL_ID_SHIRAHADORI,
			SKILL_ID_BAKURETSU_HADO, SKILL_ID_KONGO, SKILL_ID_ZANEI,
			SKILL_ID_SUNKEI, SKILL_ID_KIKO_TENI,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE,
			SKILL_ID_TEKKEN, SKILL_ID_KIKO,
			SKILL_ID_SANDANSHO, SKILL_ID_MIKIRI,
			SKILL_ID_BAKURETSU_HADO, SKILL_ID_KONGO,
			SKILL_ID_SANDAN_DELAY_ZOKA,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_HEAL,
			SKILL_ID_HOLY_LIGHT,
			SKILL_ID_RUWACH,
			SKILL_ID_RENDASHO,
			SKILL_ID_MORYUKEN,
			SKILL_ID_SHIDAN,
			SKILL_ID_HAKKEI,
			SKILL_ID_ASHURA_HAOKEN,
			SKILL_ID_ASHURA_HAOKEN_SPKOTEI,
			SKILL_ID_SUNKEI,
			SKILL_ID_COMBO_SANDAN_MONK,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ACOLYTE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ACOLYTE,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_MONK,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_BARD"
		))
		.AddNameKana("バード", "バード")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND)
		.SetWeightBonus(700)

		.AddWeaponAspd(ITEM_KIND_NONE, 162)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 144)
		.AddWeaponAspd(ITEM_KIND_BOW, 141)
		.AddWeaponAspd(ITEM_KIND_MUSICAL, 143)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_DEX],
			[2, PARAM_AGI],
			[3, PARAM_STR],
			[5, PARAM_INT],
			[6, PARAM_LUK],
			[7, PARAM_DEX],
			[9, PARAM_LUK],
			[10, PARAM_AGI],
			[11, PARAM_AGI],
			[13, PARAM_INT],
			[15, PARAM_DEX],
			[16, PARAM_DEX],
			[17, PARAM_VIT],
			[19, PARAM_DEX],
			[20, PARAM_LUK],
			[21, PARAM_INT],
			[24, PARAM_AGI],
			[28, PARAM_STR],
			[30, PARAM_AGI],
			[32, PARAM_DEX],
			[33, PARAM_VIT],
			[35, PARAM_AGI],
			[38, PARAM_DEX],
			[40, PARAM_INT],
			[41, PARAM_LUK],
			[43, PARAM_VIT],
			[46, PARAM_DEX],
			[47, PARAM_INT],
			[48, PARAM_AGI],
			[50, PARAM_DEX],
		])

		.SetHpArray([
			    38,    43,    48,    54,    61,    69,    77,    86,    96,   107,
			   118,   130,   143,   157,   171,   186,   202,   219,   236,   254,
			   273,   293,   313,   334,   356,   379,   402,   426,   451,   477,
			   503,   530,   558,   587,   616,   646,   677,   709,   741,   774,
			   808,   843,   878,   914,   951,   989,  1027,  1066,  1106,  1147,
			  1188,  1230,  1273,  1317,  1361,  1406,  1452,  1499,  1546,  1594,
			  1643,  1693,  1743,  1794,  1846,  1899,  1952,  2006,  2061,  2117,
			  2173,  2230,  2288,  2347,  2406,  2466,  2527,  2589,  2651,  2714,
			  2778,  2843,  2908,  2974,  3041,  3109,  3177,  3246,  3316,  3387,
			  3458,  3530,  3603,  3677,  3751,  3826,  3902,  3979,  4056,
		])

		.SetSpArray([
			    16,    22,    28,    34,    40,    46,    52,    58,    64,    70,
			    76,    82,    88,    94,   100,   106,   112,   118,   124,   130,
			   136,   142,   148,   154,   160,   166,   172,   178,   184,   190,
			   196,   202,   208,   214,   220,   226,   232,   238,   244,   250,
			   256,   262,   268,   274,   280,   286,   292,   298,   304,   310,
			   316,   322,   328,   334,   340,   346,   352,   358,   364,   370,
			   376,   382,   388,   394,   400,   406,   412,   418,   424,   430,
			   436,   442,   448,   454,   460,   466,   472,   478,   484,   490,
			   496,   502,   508,   514,   520,   526,   532,   538,   544,   550,
			   556,   562,   568,   574,   580,   586,   592,   598,   604,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_DOUBLE_STRAFING, SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YA_SAKUSEI, SKILL_ID_GAKKINO_RENSHU, SKILL_ID_MUSICAL_STRIKE,
			SKILL_ID_FUKYOWAON, SKILL_ID_SAMUI_JOKE, SKILL_ID_KUCHIBUE,
			SKILL_ID_YUHINO_ASSASINCROSS, SKILL_ID_BRAGINO_UTA, SKILL_ID_IDUNNNO_RINGO,
			SKILL_ID_ADLIB, SKILL_ID_ENCORE, SKILL_ID_KOMORIUTA,
			SKILL_ID_NJORDNO_UTAGE, SKILL_ID_EIENNO_KONTON, SKILL_ID_IKUSADAIKONO_HIBIKI,
			SKILL_ID_NIBELUGENNO_YUBIWA, SKILL_ID_LOKINO_SAKEBI, SKILL_ID_SHINENNO_NAKANI,
			SKILL_ID_FUZIMINO_SIEGFRIED,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME,
			SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_GAKKINO_RENSHU,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_MUSICAL_STRIKE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ARCHER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ARCHER,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_BARD,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_DANCER"
		))
		.AddNameKana("ダンサー", "ダンサー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND)
		.SetWeightBonus(700)

		.AddWeaponAspd(ITEM_KIND_NONE, 162)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 144)
		.AddWeaponAspd(ITEM_KIND_BOW, 141)
		.AddWeaponAspd(ITEM_KIND_WHIP, 143)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_LUK],
			[2, PARAM_AGI],
			[3, PARAM_STR],
			[5, PARAM_INT],
			[6, PARAM_DEX],
			[7, PARAM_LUK],
			[9, PARAM_DEX],
			[10, PARAM_AGI],
			[11, PARAM_AGI],
			[13, PARAM_INT],
			[15, PARAM_LUK],
			[16, PARAM_DEX],
			[17, PARAM_VIT],
			[19, PARAM_LUK],
			[20, PARAM_DEX],
			[21, PARAM_INT],
			[24, PARAM_AGI],
			[28, PARAM_STR],
			[30, PARAM_AGI],
			[32, PARAM_LUK],
			[33, PARAM_VIT],
			[35, PARAM_AGI],
			[38, PARAM_LUK],
			[40, PARAM_INT],
			[41, PARAM_DEX],
			[43, PARAM_VIT],
			[46, PARAM_LUK],
			[47, PARAM_INT],
			[48, PARAM_AGI],
			[50, PARAM_LUK],
		])

		.SetHpArray([
			    38,    43,    48,    54,    61,    69,    77,    86,    96,   107,
			   118,   130,   143,   157,   171,   186,   202,   219,   236,   254,
			   273,   293,   313,   334,   356,   379,   402,   426,   451,   477,
			   503,   530,   558,   587,   616,   646,   677,   709,   741,   774,
			   808,   843,   878,   914,   951,   989,  1027,  1066,  1106,  1147,
			  1188,  1230,  1273,  1317,  1361,  1406,  1452,  1499,  1546,  1594,
			  1643,  1693,  1743,  1794,  1846,  1899,  1952,  2006,  2061,  2117,
			  2173,  2230,  2288,  2347,  2406,  2466,  2527,  2589,  2651,  2714,
			  2778,  2843,  2908,  2974,  3041,  3109,  3177,  3246,  3316,  3387,
			  3458,  3530,  3603,  3677,  3751,  3826,  3902,  3979,  4056,
		])

		.SetSpArray([
			    16,    22,    28,    34,    40,    46,    52,    58,    64,    70,
			    76,    82,    88,    94,   100,   106,   112,   118,   124,   130,
			   136,   142,   148,   154,   160,   166,   172,   178,   184,   190,
			   196,   202,   208,   214,   220,   226,   232,   238,   244,   250,
			   256,   262,   268,   274,   280,   286,   292,   298,   304,   310,
			   316,   322,   328,   334,   340,   346,   352,   358,   364,   370,
			   376,   382,   388,   394,   400,   406,   412,   418,   424,   430,
			   436,   442,   448,   454,   460,   466,   472,   478,   484,   490,
			   496,   502,   508,   514,   520,   526,   532,   538,   544,   550,
			   556,   562,   568,   574,   580,   586,   592,   598,   604,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_DOUBLE_STRAFING, SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YA_SAKUSEI, SKILL_ID_DANCENO_RENSHU, SKILL_ID_YAUCHI,
			SKILL_ID_ZIBUNKATTENA_DANCE, SKILL_ID_SCREAM, SKILL_ID_HUMMING,
			SKILL_ID_WATASHIWO_WASURENAIDE, SKILL_ID_KOUNNO_KISS, SKILL_ID_SERVICE_FOR_YOU,
			SKILL_ID_ADLIB, SKILL_ID_ENCORE, SKILL_ID_KOMORIUTA,
			SKILL_ID_NJORDNO_UTAGE, SKILL_ID_EIENNO_KONTON, SKILL_ID_IKUSADAIKONO_HIBIKI,
			SKILL_ID_NIBELUGENNO_YUBIWA, SKILL_ID_LOKINO_SAKEBI, SKILL_ID_SHINENNO_NAKANI,
			SKILL_ID_FUZIMINO_SIEGFRIED,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME,
			SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_DANCENO_RENSHU,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YAUCHI,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ARCHER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ARCHER,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_DANCER,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_SAGE"
		))
		.AddNameKana("セージ", "セージ")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND)
		.SetWeightBonus(400)

		.AddWeaponAspd(ITEM_KIND_NONE, 160)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 149)
		.AddWeaponAspd(ITEM_KIND_STUFF, 142)
		.AddWeaponAspd(ITEM_KIND_BOOK, 145)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 142)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[3, PARAM_AGI],
			[4, PARAM_VIT],
			[6, PARAM_AGI],
			[8, PARAM_INT],
			[11, PARAM_VIT],
			[13, PARAM_AGI],
			[15, PARAM_INT],
			[17, PARAM_LUK],
			[18, PARAM_VIT],
			[20, PARAM_DEX],
			[22, PARAM_AGI],
			[24, PARAM_INT],
			[25, PARAM_DEX],
			[27, PARAM_DEX],
			[30, PARAM_INT],
			[32, PARAM_DEX],
			[33, PARAM_AGI],
			[35, PARAM_LUK],
			[37, PARAM_INT],
			[38, PARAM_INT],
			[39, PARAM_DEX],
			[40, PARAM_LUK],
			[42, PARAM_STR],
			[44, PARAM_STR],
			[45, PARAM_INT],
			[46, PARAM_STR],
			[47, PARAM_STR],
			[48, PARAM_STR],
			[50, PARAM_INT],
		])

		.SetHpArray([
			    40,    47,    54,    62,    71,    81,    91,   102,   114,   127,
			   140,   154,   169,   185,   201,   218,   236,   255,   274,   294,
			   315,   337,   359,   382,   406,   431,   456,   482,   509,   537,
			   565,   594,   624,   655,   686,   718,   751,   785,   819,   854,
			   890,   927,   964,  1002,  1041,  1081,  1121,  1162,  1204,  1247,
			  1290,  1334,  1379,  1425,  1471,  1518,  1566,  1615,  1664,  1714,
			  1765,  1817,  1869,  1922,  1976,  2031,  2086,  2142,  2199,  2257,
			  2315,  2374,  2434,  2495,  2556,  2618,  2681,  2745,  2809,  2874,
			  2940,  3007,  3074,  3142,  3211,  3281,  3351,  3422,  3494,  3567,
			  3640,  3714,  3789,  3865,  3941,  4018,  4096,  4175,  4254,
		])

		.SetSpArray([
			    17,    24,    31,    38,    45,    52,    59,    66,    73,    80,
			    87,    94,   101,   108,   115,   122,   129,   136,   143,   150,
			   157,   164,   171,   178,   185,   192,   199,   206,   213,   220,
			   227,   234,   241,   248,   255,   262,   269,   276,   283,   290,
			   297,   304,   311,   318,   325,   332,   339,   346,   353,   360,
			   367,   374,   381,   388,   395,   402,   409,   416,   423,   430,
			   437,   444,   451,   458,   465,   472,   479,   486,   493,   500,
			   507,   514,   521,   528,   535,   542,   549,   556,   563,   570,
			   577,   584,   591,   598,   605,   612,   619,   626,   633,   640,
			   647,   654,   661,   668,   675,   682,   689,   696,   703,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT, SKILL_ID_FROST_DIVER, SKILL_ID_SIGHT,
			SKILL_ID_LIGHTNING_BOLT, SKILL_ID_THUNDER_STORM, SKILL_ID_STONE_CURSE,
			SKILL_ID_NAPALM_BEAT, SKILL_ID_SOUL_STRIKE, SKILL_ID_SAFETY_WALL,
			SKILL_ID_SP_KAIFUKURYOKU_KOZYO, SKILL_ID_ENERGY_COAT, SKILL_ID_ADVANCED_BOOK,
			SKILL_ID_CAST_CANCEL, SKILL_ID_MAGIC_ROD, SKILL_ID_SPELL_BREAKER,
			SKILL_ID_DISPELL, SKILL_ID_FREE_CAST, SKILL_ID_AUTO_MAGICIAN_SPELL,
			SKILL_ID_DRAGONOLOGY, SKILL_ID_EARTH_SPIKE, SKILL_ID_HEAVENS_DRIVE,
			SKILL_ID_FLAME_LAUNCHER, SKILL_ID_FROST_WEAPON, SKILL_ID_LIGHTNING_LOADER,
			SKILL_ID_SEISMIC_WEAPON, SKILL_ID_VOLCANO, SKILL_ID_DELUGE,
			SKILL_ID_VIOLENT_GALE, SKILL_ID_LAND_PROTECTOR, SKILL_ID_ABRACADABRA,
			SKILL_ID_MONSTER_ZYOHO, SKILL_ID_CREATE_CONVERTER, SKILL_ID_FIRE_ELEMENTAL_CHANGE,
			SKILL_ID_WATER_ELEMENTAL_CHANGE, SKILL_ID_WIND_ELEMENTAL_CHANGE, SKILL_ID_EARTH_ELEMENTAL_CHANGE,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_ENERGY_COAT, SKILL_ID_ADVANCED_BOOK,
			SKILL_ID_FREE_CAST, SKILL_ID_AUTO_MAGICIAN_SPELL,
			SKILL_ID_DRAGONOLOGY, SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL,
			SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_HEAVENS_DRIVE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_TYPE_BOOK,
			ITEM_EQPFLG_SERIES_SAGE,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_ALCHEMIST"
		))
		.AddNameKana("アルケミスト", "アルケミスト")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND)
		.SetWeightBonus(1000)

		.AddWeaponAspd(ITEM_KIND_NONE, 166)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 146)
		.AddWeaponAspd(ITEM_KIND_SWORD, 144)
		.AddWeaponAspd(ITEM_KIND_AXE, 141)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 140)
		.AddWeaponAspd(ITEM_KIND_CLUB, 142)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 4)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[2, PARAM_DEX],
			[3, PARAM_DEX],
			[6, PARAM_STR],
			[8, PARAM_DEX],
			[9, PARAM_INT],
			[11, PARAM_AGI],
			[13, PARAM_DEX],
			[14, PARAM_AGI],
			[15, PARAM_STR],
			[17, PARAM_INT],
			[19, PARAM_DEX],
			[20, PARAM_VIT],
			[21, PARAM_DEX],
			[23, PARAM_INT],
			[24, PARAM_INT],
			[25, PARAM_DEX],
			[26, PARAM_STR],
			[28, PARAM_DEX],
			[29, PARAM_INT],
			[31, PARAM_VIT],
			[32, PARAM_DEX],
			[34, PARAM_STR],
			[36, PARAM_VIT],
			[38, PARAM_INT],
			[40, PARAM_AGI],
			[43, PARAM_STR],
			[45, PARAM_AGI],
			[49, PARAM_AGI],
			[50, PARAM_AGI],
		])

		.SetHpArray([
			    40,    47,    55,    64,    74,    84,    95,   107,   120,   134,
			   149,   165,   182,   200,   219,   238,   258,   279,   301,   324,
			   348,   373,   399,   426,   454,   482,   511,   541,   572,   604,
			   637,   671,   706,   742,   779,   816,   854,   893,   933,   974,
			  1016,  1059,  1103,  1148,  1194,  1240,  1287,  1335,  1384,  1434,
			  1485,  1537,  1590,  1644,  1699,  1754,  1810,  1867,  1925,  1984,
			  2044,  2105,  2167,  2230,  2294,  2358,  2423,  2489,  2556,  2624,
			  2693,  2763,  2834,  2906,  2979,  3052,  3126,  3201,  3277,  3354,
			  3432,  3511,  3591,  3672,  3754,  3836,  3919,  4003,  4088,  4174,
			  4261,  4349,  4438,  4528,  4619,  4710,  4802,  4895,  4989,
		])

		.SetSpArray([
			    14,    18,    22,    26,    30,    34,    38,    42,    46,    50,
			    54,    58,    62,    66,    70,    74,    78,    82,    86,    90,
			    94,    98,   102,   106,   110,   114,   118,   122,   126,   130,
			   134,   138,   142,   146,   150,   154,   158,   162,   166,   170,
			   174,   178,   182,   186,   190,   194,   198,   202,   206,   210,
			   214,   218,   222,   226,   230,   234,   238,   242,   246,   250,
			   254,   258,   262,   266,   270,   274,   278,   282,   286,   290,
			   294,   298,   302,   306,   310,   314,   318,   322,   326,   330,
			   334,   338,   342,   346,   350,   354,   358,   362,   366,   370,
			   374,   378,   382,   386,   390,   394,   398,   402,   406,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_SHOZIGENKAIRYO_ZOKA, SKILL_ID_DISCOUNT, SKILL_ID_OVER_CHARGE,
			SKILL_ID_PUSH_CART, SKILL_ID_ITEM_KANTE, SKILL_ID_ROTEN_KAISETSU,
			SKILL_ID_MAMMONITE, SKILL_ID_LOUD_VOICE, SKILL_ID_CHANGE_CART,
			SKILL_ID_CART_REVOLUTION, SKILL_ID_ONO_SHUREN, SKILL_ID_LEARNING_POTION,
			SKILL_ID_PHARMACY, SKILL_ID_POTION_PITCHER, SKILL_ID_ACID_TERROR,
			SKILL_ID_BIOPLANT, SKILL_ID_SPHERE_MINE, SKILL_ID_DEMONSTRATION,
			SKILL_ID_CHEMICAL_WEAPON_CHARGE, SKILL_ID_CHEMICAL_SHIELD_CHARGE, SKILL_ID_CHEMICAL_ARMER_CHARGE,
			SKILL_ID_CHEMICAL_HELM_CHARGE, SKILL_ID_SEIMEI_RINRI, SKILL_ID_ANSOKU,
			SKILL_ID_CALL_HOMUNCULUS, SKILL_ID_RESURRECTION_HOMUNCULUS,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_LOUD_VOICE, SKILL_ID_ONO_SHUREN,
			SKILL_ID_DEFENCE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_MAMMONITE,
			SKILL_ID_CART_REVOLUTION,
			SKILL_ID_ACID_TERROR,
			SKILL_ID_DEMONSTRATION,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MARCHANT,
			ITEM_EQPFLG_SERIES_UPPER_OF_MARCHANT,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_ALCHEMIST,
			ITEM_EQPFLG_TYPE_BEGINNER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_SUPERNOVICE"
		))
		.AddNameKana("スーパーノービス", "スーパーノービス")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_SUPER_NOVICE)
		.SetWeightBonus(0)

		.AddWeaponAspd(ITEM_KIND_NONE, 152)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 141)
		.AddWeaponAspd(ITEM_KIND_SWORD, 140)
		.AddWeaponAspd(ITEM_KIND_AXE, 138)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, -6)
		.AddWeaponAspd(ITEM_KIND_CLUB, 140)
		.AddWeaponAspd(ITEM_KIND_STUFF, 141)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 130)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 7)

		.SetJobBonusArray([
			[1, PARAM_STR],
			[3, PARAM_AGI],
			[5, PARAM_VIT],
			[7, PARAM_INT],
			[9, PARAM_DEX],
			[11, PARAM_LUK],
			[13, PARAM_STR],
			[15, PARAM_AGI],
			[17, PARAM_VIT],
			[19, PARAM_INT],
			[21, PARAM_DEX],
			[23, PARAM_LUK],
			[25, PARAM_STR],
			[27, PARAM_AGI],
			[29, PARAM_VIT],
			[31, PARAM_INT],
			[33, PARAM_DEX],
			[35, PARAM_LUK],
			[37, PARAM_STR],
			[39, PARAM_AGI],
			[41, PARAM_VIT],
			[43, PARAM_INT],
			[45, PARAM_DEX],
			[47, PARAM_LUK],
			[49, PARAM_STR],
			[52, PARAM_AGI],
			[56, PARAM_VIT],
			[60, PARAM_INT],
			[64, PARAM_DEX],
			[68, PARAM_LUK],
		])

		.SetHpArray([
			   260,   265,   270,   275,   280,   285,
			   290,   295,   300,   305,   310,   315,   320,   325,   330,   335,
			   340,   345,   350,   355,   360,   365,   370,   375,   380,   385,
			   390,   395,   400,   405,   410,   415,   420,   425,   430,   435,
			   440,   445,   450,   455,   460,   465,   470,   475,   480,   485,
			   490,   495,   500,   505,   510,   515,   520,   525,  2530,
		])

		.SetSpArray([
			    55,    56,    57,    58,    59,    60,
			    61,    62,    63,    64,    65,    66,    67,    68,    69,    70,
			    71,    72,    73,    74,    75,    76,    77,    78,    79,    80,
			    81,    82,    83,    84,    85,    86,    87,    88,    89,    90,
			    91,    92,    93,    94,    95,    96,    97,    98,    99,   100,
			   101,   102,   103,   104,   105,   106,   107,   108,   109,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_KEN_SHUREN, SKILL_ID_HP_KAIFUKURYOKU_KOZYO, SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK, SKILL_ID_PROVOKE, SKILL_ID_ENDURE,
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_STEAL,
			SKILL_ID_HIDING, SKILL_ID_ENVENOM, SKILL_ID_GEDOKU,
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE, SKILL_ID_SIGNUM_CRUCIS,
			SKILL_ID_HEAL, SKILL_ID_CURE, SKILL_ID_ANGELUS,
			SKILL_ID_BLESSING, SKILL_ID_SOKUDO_ZOKA, SKILL_ID_SOKUDO_GENSHO,
			SKILL_ID_RUWACH, SKILL_ID_TELEPORT, SKILL_ID_WARP_PORTAL,
			SKILL_ID_PNEUMA, SKILL_ID_AQUA_BENEDICTA, SKILL_ID_FUKURONO_ME,
			SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_SP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT, SKILL_ID_FROST_DIVER, SKILL_ID_SIGHT,
			SKILL_ID_LIGHTNING_BOLT, SKILL_ID_THUNDER_STORM, SKILL_ID_STONE_CURSE,
			SKILL_ID_NAPALM_BEAT, SKILL_ID_SOUL_STRIKE, SKILL_ID_SAFETY_WALL,
			SKILL_ID_SHOZIGENKAIRYO_ZOKA, SKILL_ID_DISCOUNT, SKILL_ID_OVER_CHARGE,
			SKILL_ID_PUSH_CART, SKILL_ID_ITEM_KANTE, SKILL_ID_ROTEN_KAISETSU,
			SKILL_ID_MAMMONITE,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_KEN_SHUREN, SKILL_ID_DOUBLE_ATTACK,
			SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_DIVINE_PROTECTION,
			SKILL_ID_DEMON_BANE, SKILL_ID_FUKURONO_ME,
			SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_BAKURETSU_HADO_SUPER_NOVICE, SKILL_ID_SUPER_NOVICENO_TAMASHI,
			SKILL_ID_ENDURE, SKILL_ID_SUPER_NOVICE_NODEAD_BONUS,
			SKILL_ID_KONGO, SKILL_ID_MARIAGE_STATUS,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
			SKILL_ID_ENVENOM,
			SKILL_ID_HEAL,
			SKILL_ID_RUWACH,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_MAMMONITE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_SERIES_NOVICE,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_SUPER_NOVICE,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();










	//================================================================================================================================
	//
	// 転生二次職
	//
	//================================================================================================================================

	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_LORDKNIGHT"
		))
		.AddNameKana("ロードナイト", "ロードナイト")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND_REINCANATED)
		.SetWeightBonus(800)

		.AddWeaponAspd(ITEM_KIND_NONE, 162)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 149)
		.AddWeaponAspd(ITEM_KIND_SWORD, 149)
		.AddWeaponAspd(ITEM_KIND_SWORD_2HAND, 144)
		.AddWeaponAspd(ITEM_KIND_SPEAR, 142)
		.AddWeaponAspd(ITEM_KIND_SPEAR_2HAND, 142)
		.AddWeaponAspd(ITEM_KIND_AXE, 139)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 139)
		.AddWeaponAspd(ITEM_KIND_CLUB, 141)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_STR],
			[2, PARAM_AGI],
			[2, PARAM_LUK],
			[4, PARAM_DEX],
			[5, PARAM_VIT],
			[6, PARAM_STR],
			[7, PARAM_STR],
			[8, PARAM_STR],
			[10, PARAM_AGI],
			[11, PARAM_DEX],
			[12, PARAM_VIT],
			[13, PARAM_INT],
			[14, PARAM_AGI],
			[16, PARAM_DEX],
			[17, PARAM_AGI],
			[19, PARAM_STR],
			[22, PARAM_VIT],
			[25, PARAM_STR],
			[27, PARAM_LUK],
			[28, PARAM_DEX],
			[29, PARAM_VIT],
			[31, PARAM_DEX],
			[33, PARAM_STR],
			[36, PARAM_DEX],
			[37, PARAM_AGI],
			[38, PARAM_LUK],
			[40, PARAM_VIT],
			[41, PARAM_STR],
			[43, PARAM_VIT],
			[44, PARAM_DEX],
			[46, PARAM_STR],
			[47, PARAM_STR],
			[49, PARAM_DEX],
			[52, PARAM_STR],
			[53, PARAM_AGI],
			[56, PARAM_STR],
			[57, PARAM_STR],
			[58, PARAM_VIT],
			[60, PARAM_AGI],
			[62, PARAM_DEX],
			[64, PARAM_STR],
			[65, PARAM_AGI],
			[67, PARAM_INT],
			[68, PARAM_VIT],
			[70, PARAM_STR],
		])

		.SetHpArray([
			    40,    48,    58,    69,    82,    96,   112,   129,   148,   168,
			   190,   213,   238,   264,   292,   321,   352,   384,   418,   453,
			   490,   528,   568,   609,   652,   696,   742,   789,   838,   888,
			   940,   993,  1048,  1104,  1162,  1221,  1282,  1344,  1408,  1473,
			  1540,  1608,  1678,  1749,  1822,  1896,  1972,  2049,  2128,  2208,
			  2290,  2373,  2458,  2544,  2632,  2721,  2812,  2904,  2998,  3093,
			  3190,  3288,  3388,  3489,  3592,  3696,  3802,  3909,  4018,  4128,
			  4240,  4353,  4468,  4584,  4702,  4821,  4942,  5064,  5188,  5313,
			  5440,  5568,  5698,  5829,  5962,  6096,  6232,  6369,  6508,  6648,
			  6790,  6933,  7078,  7224,  7372,  7521,  7672,  7824,  7978,
		])

		.SetSpArray([
			    13,    16,    19,    22,    25,    28,    31,    34,    37,    40,
			    43,    46,    49,    52,    55,    58,    61,    64,    67,    70,
			    73,    76,    79,    82,    85,    88,    91,    94,    97,   100,
			   103,   106,   109,   112,   115,   118,   121,   124,   127,   130,
			   133,   136,   139,   142,   145,   148,   151,   154,   157,   160,
			   163,   166,   169,   172,   175,   178,   181,   184,   187,   190,
			   193,   196,   199,   202,   205,   208,   211,   214,   217,   220,
			   223,   226,   229,   232,   235,   238,   241,   244,   247,   250,
			   253,   256,   259,   262,   265,   268,   271,   274,   277,   280,
			   283,   286,   289,   292,   295,   298,   301,   304,   307,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN, SKILL_ID_HP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_BASH, SKILL_ID_MAGNUM_BREAK, SKILL_ID_PROVOKE,
			SKILL_ID_ENDURE, SKILL_ID_IDOZI_HP_KAIFUKU, SKILL_ID_KYUSHO_KOGEKI,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_YARI_SHUREN, SKILL_ID_PIERCE,
			SKILL_ID_SPEAR_STUB, SKILL_ID_SPEAR_BOOMERANG, SKILL_ID_BRANDISH_SPEAR,
			SKILL_ID_TWOHAND_QUICKEN, SKILL_ID_AUTO_COUNTER, SKILL_ID_BOWLING_BASH,
			SKILL_ID_RIDING, SKILL_ID_KIHE_SHUREN, SKILL_ID_CHARGE_ATTACK,
			SKILL_ID_AURA_BLADE, SKILL_ID_PARIYING, SKILL_ID_CONCENTRATION,
			SKILL_ID_HEAD_CRUSH, SKILL_ID_JOINT_BEAT, SKILL_ID_SPIRAL_PIERCE,
			SKILL_ID_TENTION_RELAX, SKILL_ID_BERSERK,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_YARI_SHUREN,
			SKILL_ID_TWOHAND_QUICKEN, SKILL_ID_KIHE_SHUREN,
			SKILL_ID_AURA_BLADE, SKILL_ID_CONCENTRATION,
			SKILL_ID_BERSERK, SKILL_ID_PARIYING,
			SKILL_ID_ONEHAND_QUICKEN, SKILL_ID_ENDURE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
			SKILL_ID_PIERCE,
			SKILL_ID_SPEAR_STUB,
			SKILL_ID_SPEAR_BOOMERANG,
			SKILL_ID_BRANDISH_SPEAR,
			SKILL_ID_BOWLING_BASH,
			SKILL_ID_CHARGE_ATTACK,
			SKILL_ID_SPIRAL_PIERCE,
			SKILL_ID_HEAD_CRUSH,
			SKILL_ID_JOINT_BEAT,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_SWORDMAN,
			ITEM_EQPFLG_SERIES_UPPER_OF_SWORDMAN,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_MIRROR_SHIELD,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_KNIGHT,
			ITEM_EQPFLG_SERIES_LOAR_KNIGHT,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_ASSASINCROSS"
		))
		.AddNameKana("アサシンクロス", "アサシンクロス")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND_REINCANATED)
		.SetWeightBonus(400)

		.AddWeaponAspd(ITEM_KIND_NONE, 169)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 156)
		.AddWeaponAspd(ITEM_KIND_SWORD, 143)
		.AddWeaponAspd(ITEM_KIND_AXE, 138)
		.AddWeaponAspd(ITEM_KIND_KATAR, 156)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_AGI],
			[2, PARAM_STR],
			[3, PARAM_LUK],
			[4, PARAM_AGI],
			[6, PARAM_AGI],
			[7, PARAM_STR],
			[8, PARAM_LUK],
			[9, PARAM_VIT],
			[10, PARAM_DEX],
			[12, PARAM_STR],
			[15, PARAM_AGI],
			[16, PARAM_LUK],
			[18, PARAM_LUK],
			[20, PARAM_AGI],
			[21, PARAM_STR],
			[23, PARAM_DEX],
			[24, PARAM_AGI],
			[25, PARAM_AGI],
			[26, PARAM_LUK],
			[29, PARAM_STR],
			[31, PARAM_AGI],
			[32, PARAM_AGI],
			[33, PARAM_AGI],
			[34, PARAM_LUK],
			[37, PARAM_DEX],
			[38, PARAM_STR],
			[39, PARAM_DEX],
			[42, PARAM_AGI],
			[43, PARAM_DEX],
			[46, PARAM_AGI],
			[47, PARAM_VIT],
			[48, PARAM_LUK],
			[50, PARAM_STR],
			[51, PARAM_AGI],
			[53, PARAM_DEX],
			[54, PARAM_STR],
			[56, PARAM_AGI],
			[57, PARAM_DEX],
			[61, PARAM_DEX],
			[62, PARAM_AGI],
			[64, PARAM_DEX],
			[65, PARAM_LUK],
			[66, PARAM_STR],
			[69, PARAM_VIT],
			[70, PARAM_DEX],
		])

		.SetHpArray([
			    40,    47,    55,    64,    75,    87,   100,   114,   129,   145,
			   162,   180,   199,   219,   241,   264,   288,   313,   339,   366,
			   394,   423,   453,   484,   517,   551,   586,   622,   659,   697,
			   736,   776,   817,   859,   903,   948,   994,  1041,  1089,  1138,
			  1188,  1239,  1291,  1344,  1399,  1455,  1512,  1570,  1629,  1689,
			  1750,  1812,  1875,  1939,  2005,  2072,  2140,  2209,  2279,  2350,
			  2422,  2495,  2569,  2644,  2721,  2799,  2878,  2958,  3039,  3121,
			  3204,  3288,  3373,  3459,  3547,  3636,  3726,  3817,  3909,  4002,
			  4096,  4191,  4287,  4384,  4483,  4583,  4684,  4786,  4889,  4993,
			  5098,  5204,  5311,  5419,  5529,  5640,  5752,  5865,  5979,
		])

		.SetSpArray([
			    14,    18,    22,    26,    30,    34,    38,    42,    46,    50,
			    54,    58,    62,    66,    70,    74,    78,    82,    86,    90,
			    94,    98,   102,   106,   110,   114,   118,   122,   126,   130,
			   134,   138,   142,   146,   150,   154,   158,   162,   166,   170,
			   174,   178,   182,   186,   190,   194,   198,   202,   206,   210,
			   214,   218,   222,   226,   230,   234,   238,   242,   246,   250,
			   254,   258,   262,   266,   270,   274,   278,   282,   286,   290,
			   294,   298,   302,   306,   310,   314,   318,   322,   326,   330,
			   334,   338,   342,   346,   350,   354,   358,   362,   366,   370,
			   374,   378,   382,   386,   390,   394,   398,   402,   406,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_STEAL,
			SKILL_ID_HIDING, SKILL_ID_ENVENOM, SKILL_ID_GEDOKU,
			SKILL_ID_SUNAMAKI, SKILL_ID_ISHIHIROI, SKILL_ID_ISHINAGE,
			SKILL_ID_BACKSTEP, SKILL_ID_MIGITE_SHUREN, SKILL_ID_HIDARITE_SHUREN,
			SKILL_ID_KATAR_SHUREN, SKILL_ID_SONIC_BLOW, SKILL_ID_GRIM_TOOTH,
			SKILL_ID_CLOAKING, SKILL_ID_ENCHANT_POISON, SKILL_ID_POISON_REACT,
			SKILL_ID_VENOM_DUST, SKILL_ID_VENOM_SPLASHER, SKILL_ID_VENOM_KNIFE,
			SKILL_ID_SONIC_ACCELERATION, SKILL_ID_KATAR_KENKYU, SKILL_ID_SOUL_BREAKER,
			SKILL_ID_METEOR_ASSALT, SKILL_ID_CREATE_DEADLY_POISON, SKILL_ID_ENCHANT_DEADLY_POISON,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA,
			SKILL_ID_MIGITE_SHUREN, SKILL_ID_HIDARITE_SHUREN,
			SKILL_ID_KATAR_SHUREN, SKILL_ID_KATAR_KENKYU,
			SKILL_ID_ENCHANT_DEADLY_POISON, SKILL_ID_CANCEL_EDP_POISON_ATTACK,
			SKILL_ID_SONIC_ACCELERATION,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_ENVENOM,
			SKILL_ID_SUNAMAKI,
			SKILL_ID_ISHINAGE,
			SKILL_ID_SONIC_BLOW,
			SKILL_ID_GRIM_TOOTH,
			SKILL_ID_VENOM_SPLASHER,
			SKILL_ID_POISON_REACT,
			SKILL_ID_VENOM_KNIFE,
			SKILL_ID_SONIC_BLOW_TAMASHI,
			SKILL_ID_SOUL_BREAKER,
			SKILL_ID_METEOR_ASSALT,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_THIEF_NINJA,
			ITEM_EQPFLG_SERIES_UPPER_OF_THIEF,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_ASSASIN_PRIEST,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_ASSASIN,
			ITEM_EQPFLG_SERIES_ASSASIN_CROSS,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_HIGHPRIEST"
		))
		.AddNameKana("ハイプリースト", "ハイプリースト")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND_REINCANATED)
		.SetWeightBonus(600)

		.AddWeaponAspd(ITEM_KIND_NONE, 166)
		.AddWeaponAspd(ITEM_KIND_CLUB, 143)
		.AddWeaponAspd(ITEM_KIND_STUFF, 143)
		.AddWeaponAspd(ITEM_KIND_BOOK, 143)
		.AddWeaponAspd(ITEM_KIND_FIST, -6)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 142)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[3, PARAM_AGI],
			[4, PARAM_VIT],
			[5, PARAM_STR],
			[7, PARAM_INT],
			[8, PARAM_AGI],
			[11, PARAM_INT],
			[12, PARAM_STR],
			[13, PARAM_DEX],
			[16, PARAM_DEX],
			[19, PARAM_AGI],
			[20, PARAM_INT],
			[21, PARAM_STR],
			[22, PARAM_VIT],
			[23, PARAM_INT],
			[24, PARAM_INT],
			[26, PARAM_DEX],
			[28, PARAM_DEX],
			[29, PARAM_AGI],
			[30, PARAM_VIT],
			[31, PARAM_STR],
			[34, PARAM_INT],
			[37, PARAM_DEX],
			[38, PARAM_STR],
			[40, PARAM_LUK],
			[42, PARAM_AGI],
			[43, PARAM_DEX],
			[45, PARAM_STR],
			[46, PARAM_DEX],
			[47, PARAM_INT],
			[49, PARAM_LUK],
			[50, PARAM_VIT],
			[51, PARAM_VIT],
			[55, PARAM_AGI],
			[56, PARAM_DEX],
			[57, PARAM_INT],
			[58, PARAM_VIT],
			[60, PARAM_STR],
			[61, PARAM_INT],
			[62, PARAM_DEX],
			[65, PARAM_AGI],
			[66, PARAM_INT],
			[67, PARAM_VIT],
			[68, PARAM_AGI],
			[70, PARAM_INT],
		])

		.SetHpArray([
			    40,    47,    54,    62,    71,    81,    91,   102,   114,   127,
			   140,   154,   169,   185,   201,   218,   236,   255,   274,   294,
			   315,   337,   359,   382,   406,   431,   456,   482,   509,   537,
			   565,   594,   624,   655,   686,   718,   751,   785,   819,   854,
			   890,   927,   964,  1002,  1041,  1081,  1121,  1162,  1204,  1247,
			  1290,  1334,  1379,  1425,  1471,  1518,  1566,  1615,  1664,  1714,
			  1765,  1817,  1869,  1922,  1976,  2031,  2086,  2142,  2199,  2257,
			  2315,  2374,  2434,  2495,  2556,  2618,  2681,  2745,  2809,  2874,
			  2940,  3007,  3074,  3142,  3211,  3281,  3351,  3422,  3494,  3567,
			  3640,  3714,  3789,  3865,  3941,  4018,  4096,  4175,  4254,
		])

		.SetSpArray([
			    18,    26,    34,    42,    50,    58,    66,    74,    82,    90,
			    98,   106,   114,   122,   130,   138,   146,   154,   162,   170,
			   178,   186,   194,   202,   210,   218,   226,   234,   242,   250,
			   258,   266,   274,   282,   290,   298,   306,   314,   322,   330,
			   338,   346,   354,   362,   370,   378,   386,   394,   402,   410,
			   418,   426,   434,   442,   450,   458,   466,   474,   482,   490,
			   498,   506,   514,   522,   530,   538,   546,   554,   562,   570,
			   578,   586,   594,   602,   610,   618,   626,   634,   642,   650,
			   658,   666,   674,   682,   690,   698,   706,   714,   722,   730,
			   738,   746,   754,   762,   770,   778,   786,   794,   802,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE, SKILL_ID_SIGNUM_CRUCIS,
			SKILL_ID_HEAL, SKILL_ID_CURE, SKILL_ID_ANGELUS,
			SKILL_ID_BLESSING, SKILL_ID_SOKUDO_ZOKA, SKILL_ID_SOKUDO_GENSHO,
			SKILL_ID_RUWACH, SKILL_ID_TELEPORT, SKILL_ID_WARP_PORTAL,
			SKILL_ID_PNEUMA, SKILL_ID_AQUA_BENEDICTA, SKILL_ID_HOLY_LIGHT,
			SKILL_ID_MAGNIFICAT, SKILL_ID_KYRIE_ELEISON, SKILL_ID_GLORIA,
			SKILL_ID_IMPOSITIO_MANUS, SKILL_ID_SUFFRAGIUM, SKILL_ID_ASPERSIO,
			SKILL_ID_RECOVERY, SKILL_ID_RESURRECTION, SKILL_ID_SANCTUARY,
			SKILL_ID_LEX_DIVINA, SKILL_ID_LEX_AETERNA, SKILL_ID_SAFETY_WALL,
			SKILL_ID_TURN_UNDEAD, SKILL_ID_MAGNUS_EXORCISMUS, SKILL_ID_SP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_MACE_SHUREN, SKILL_ID_SLOW_POISON, SKILL_ID_SEITAI_KOFUKU,
			SKILL_ID_REDEMPTIO, SKILL_ID_MEDITATIO, SKILL_ID_MANA_RECHARGE,
			SKILL_ID_ASSUMPTIO, SKILL_ID_BASILICA,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE,
			SKILL_ID_MACE_SHUREN, SKILL_ID_MEDITATIO,
			SKILL_ID_MANA_RECHARGE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_HEAL,
			SKILL_ID_HOLY_LIGHT,
			SKILL_ID_RUWACH,
			SKILL_ID_TURN_UNDEAD,
			SKILL_ID_RESURRECTION,
			SKILL_ID_MAGNUS_EXORCISMUS,
			SKILL_ID_SANCTUARY,
			SKILL_ID_HOLY_LIGHT_TAMASHI,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ACOLYTE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ACOLYTE,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_ASSASIN_PRIEST,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_TYPE_BOOK,
			ITEM_EQPFLG_SERIES_PRIEST,
			ITEM_EQPFLG_SERIES_HIGH_PRIEST,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_SNIPER"
		))
		.AddNameKana("スナイパー", "スナイパー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND_REINCANATED)
		.SetWeightBonus(700)

		.AddWeaponAspd(ITEM_KIND_NONE, 167)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 144)
		.AddWeaponAspd(ITEM_KIND_BOW, 145)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_DEX],
			[2, PARAM_AGI],
			[3, PARAM_DEX],
			[4, PARAM_DEX],
			[5, PARAM_INT],
			[6, PARAM_AGI],
			[8, PARAM_STR],
			[10, PARAM_AGI],
			[11, PARAM_AGI],
			[12, PARAM_VIT],
			[14, PARAM_LUK],
			[16, PARAM_DEX],
			[17, PARAM_DEX],
			[20, PARAM_INT],
			[21, PARAM_AGI],
			[22, PARAM_DEX],
			[24, PARAM_STR],
			[25, PARAM_LUK],
			[26, PARAM_DEX],
			[28, PARAM_AGI],
			[30, PARAM_DEX],
			[31, PARAM_LUK],
			[32, PARAM_VIT],
			[33, PARAM_AGI],
			[35, PARAM_DEX],
			[36, PARAM_LUK],
			[38, PARAM_AGI],
			[40, PARAM_DEX],
			[42, PARAM_INT],
			[43, PARAM_AGI],
			[45, PARAM_STR],
			[46, PARAM_DEX],
			[48, PARAM_AGI],
			[50, PARAM_LUK],
			[51, PARAM_DEX],
			[54, PARAM_INT],
			[55, PARAM_VIT],
			[57, PARAM_LUK],
			[58, PARAM_AGI],
			[60, PARAM_DEX],
			[61, PARAM_STR],
			[62, PARAM_LUK],
			[65, PARAM_INT],
			[69, PARAM_DEX],
			[70, PARAM_LUK],
		])

		.SetHpArray([
			    40,    47,    55,    63,    72,    82,    93,   105,   118,   132,
			   146,   161,   177,   194,   212,   231,   250,   270,   291,   313,
			   336,   360,   385,   410,   436,   463,   491,   520,   550,   581,
			   612,   644,   677,   711,   746,   782,   818,   855,   893,   932,
			   972,  1013,  1055,  1097,  1140,  1184,  1229,  1275,  1322,  1370,
			  1418,  1467,  1517,  1568,  1620,  1673,  1726,  1780,  1835,  1891,
			  1948,  2006,  2065,  2124,  2184,  2245,  2307,  2370,  2434,  2499,
			  2564,  2630,  2697,  2765,  2834,  2904,  2974,  3045,  3117,  3190,
			  3264,  3339,  3415,  3491,  3568,  3646,  3725,  3805,  3886,  3968,
			  4050,  4133,  4217,  4302,  4388,  4475,  4562,  4650,  4739,
		])

		.SetSpArray([
			    14,    18,    22,    26,    30,    34,    38,    42,    46,    50,
			    54,    58,    62,    66,    70,    74,    78,    82,    86,    90,
			    94,    98,   102,   106,   110,   114,   118,   122,   126,   130,
			   134,   138,   142,   146,   150,   154,   158,   162,   166,   170,
			   174,   178,   182,   186,   190,   194,   198,   202,   206,   210,
			   214,   218,   222,   226,   230,   234,   238,   242,   246,   250,
			   254,   258,   262,   266,   270,   274,   278,   282,   286,   290,
			   294,   298,   302,   306,   310,   314,   318,   322,   326,   330,
			   334,   338,   342,   346,   350,   354,   358,   362,   366,   370,
			   374,   378,   382,   386,   390,   394,   398,   402,   406,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_DOUBLE_STRAFING, SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YA_SAKUSEI, SKILL_ID_SKID_TRAP, SKILL_ID_ANKLESNARE,
			SKILL_ID_FREEZING_TRAP, SKILL_ID_FLASHER, SKILL_ID_SANDMAN,
			SKILL_ID_LAND_MINE, SKILL_ID_BLAST_MINE, SKILL_ID_CLAYMORE_TRAP,
			SKILL_ID_SHOCKWAVE_TRAP, SKILL_ID_REMOVE_TRAP, SKILL_ID_TALKIE_BOX,
			SKILL_ID_BEAST_BANE, SKILL_ID_FALCON_MASTERY, SKILL_ID_DETECTING,
			SKILL_ID_BLITZ_BEAT, SKILL_ID_STEEL_CROW, SKILL_ID_SPRING_TRAP,
			SKILL_ID_FANTASMIC_ARROW, SKILL_ID_TRUE_SIGHT, SKILL_ID_WIND_WALK,
			SKILL_ID_SHARP_SHOOTING, SKILL_ID_FALCON_ASSALT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME,
			SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_BEAST_BANE,
			SKILL_ID_BLITZ_BEAT, SKILL_ID_STEEL_CROW,
			SKILL_ID_TRUE_SIGHT, SKILL_ID_WIND_WALK,
			SKILL_ID_HUNTERNO_TAMASHI_KOKA,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_FANTASMIC_ARROW,
			SKILL_ID_BLITZ_BEAT,
			SKILL_ID_LAND_MINE,
			SKILL_ID_FREEZING_TRAP,
			SKILL_ID_BLAST_MINE,
			SKILL_ID_CLAYMORE_TRAP,
			SKILL_ID_BEAST_STRAIFING,
			SKILL_ID_FALCON_ASSALT,
			SKILL_ID_SHARP_SHOOTING,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ARCHER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ARCHER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_RENDO,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_HUNTER_ROGUE,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_HUNTER,
			ITEM_EQPFLG_SERIES_SNIPER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_HIGHWIZARD"
		))
		.AddNameKana("ハイウィザード", "ハイウィザード")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND_REINCANATED)
		.SetWeightBonus(400)

		.AddWeaponAspd(ITEM_KIND_NONE, 146)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 144)
		.AddWeaponAspd(ITEM_KIND_STUFF, 141)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 141)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 7)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[2, PARAM_DEX],
			[3, PARAM_VIT],
			[5, PARAM_INT],
			[8, PARAM_AGI],
			[9, PARAM_DEX],
			[10, PARAM_INT],
			[12, PARAM_LUK],
			[14, PARAM_INT],
			[17, PARAM_DEX],
			[18, PARAM_AGI],
			[19, PARAM_INT],
			[20, PARAM_STR],
			[22, PARAM_DEX],
			[23, PARAM_DEX],
			[24, PARAM_INT],
			[26, PARAM_AGI],
			[28, PARAM_INT],
			[29, PARAM_VIT],
			[31, PARAM_DEX],
			[32, PARAM_INT],
			[34, PARAM_AGI],
			[37, PARAM_INT],
			[38, PARAM_INT],
			[39, PARAM_INT],
			[40, PARAM_STR],
			[41, PARAM_LUK],
			[43, PARAM_DEX],
			[46, PARAM_INT],
			[47, PARAM_VIT],
			[49, PARAM_INT],
			[50, PARAM_AGI],
			[53, PARAM_VIT],
			[55, PARAM_INT],
			[56, PARAM_AGI],
			[57, PARAM_LUK],
			[59, PARAM_INT],
			[60, PARAM_STR],
			[61, PARAM_DEX],
			[62, PARAM_INT],
			[65, PARAM_AGI],
			[66, PARAM_VIT],
			[67, PARAM_DEX],
			[69, PARAM_AGI],
			[70, PARAM_INT],
		])

		.SetHpArray([
			    40,    46,    53,    60,    68,    76,    85,    94,   104,   115,
			   126,   138,   150,   163,   176,   190,   204,   219,   234,   250,
			   267,   284,   302,   320,   339,   358,   378,   398,   419,   441,
			   463,   486,   509,   533,   557,   582,   607,   633,   659,   686,
			   714,   742,   771,   800,   830,   860,   891,   922,   954,   987,
			  1020,  1054,  1088,  1123,  1158,  1194,  1230,  1267,  1304,  1342,
			  1381,  1420,  1460,  1500,  1541,  1582,  1624,  1666,  1709,  1753,
			  1797,  1842,  1887,  1933,  1979,  2026,  2073,  2121,  2169,  2218,
			  2268,  2318,  2369,  2420,  2472,  2524,  2577,  2630,  2684,  2739,
			  2794,  2850,  2906,  2963,  3020,  3078,  3136,  3195,  3254,
		])

		.SetSpArray([
			    19,    28,    37,    46,    55,    64,    73,    82,    91,   100,
			   109,   118,   127,   136,   145,   154,   163,   172,   181,   190,
			   199,   208,   217,   226,   235,   244,   253,   262,   271,   280,
			   289,   298,   307,   316,   325,   334,   343,   352,   361,   370,
			   379,   388,   397,   406,   415,   424,   433,   442,   451,   460,
			   469,   478,   487,   496,   505,   514,   523,   532,   541,   550,
			   559,   568,   577,   586,   595,   604,   613,   622,   631,   640,
			   649,   658,   667,   676,   685,   694,   703,   712,   721,   730,
			   739,   748,   757,   766,   775,   784,   793,   802,   811,   820,
			   829,   838,   847,   856,   865,   874,   883,   892,   901,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT, SKILL_ID_FROST_DIVER, SKILL_ID_SIGHT,
			SKILL_ID_LIGHTNING_BOLT, SKILL_ID_THUNDER_STORM, SKILL_ID_STONE_CURSE,
			SKILL_ID_NAPALM_BEAT, SKILL_ID_SOUL_STRIKE, SKILL_ID_SAFETY_WALL,
			SKILL_ID_SP_KAIFUKURYOKU_KOZYO, SKILL_ID_ENERGY_COAT, SKILL_ID_MONSTER_ZYOHO,
			SKILL_ID_FIRE_PILLAR, SKILL_ID_SIGHT_RASHER, SKILL_ID_METEOR_STORM,
			SKILL_ID_FROST_NOVA, SKILL_ID_WATER_BALL, SKILL_ID_STORM_GUST,
			SKILL_ID_ICE_WALL, SKILL_ID_JUPITER_THUNDER, SKILL_ID_LORD_OF_VERMILLION,
			SKILL_ID_EARTH_SPIKE, SKILL_ID_HEAVENS_DRIVE, SKILL_ID_QUAGMIRE,
			SKILL_ID_SIGHT_BLASTER, SKILL_ID_MAHORYOKU_ZOFUKU, SKILL_ID_SOUL_DRAIN,
			SKILL_ID_MAGIC_CRUSHER, SKILL_ID_NAPALM_VULKAN, SKILL_ID_GRAVITATION_FIELD,
			SKILL_ID_GANBANTEIN,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_ENERGY_COAT, SKILL_ID_SOUL_DRAIN,
			SKILL_ID_MAHORYOKU_ZOFUKU,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
			SKILL_ID_FIRE_PILLAR,
			SKILL_ID_SIGHT_RASHER,
			SKILL_ID_METEOR_STORM,
			SKILL_ID_JUPITER_THUNDER,
			SKILL_ID_LORD_OF_VERMILLION,
			SKILL_ID_WATER_BALL,
			SKILL_ID_FROST_NOVA,
			SKILL_ID_STORM_GUST,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_HEAVENS_DRIVE,
			SKILL_ID_MAGIC_CRUSHER,
			SKILL_ID_NAPALM_VULKAN,
			SKILL_ID_GRAVITATION_FIELD,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_WIZARD_LINKER,
			ITEM_EQPFLG_SERIES_HIGH_WIZARD,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_WHITESMITH"
		))
		.AddNameKana("ホワイトスミス", "ホワイトスミス")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND_REINCANATED)
		.SetWeightBonus(1000)

		.AddWeaponAspd(ITEM_KIND_NONE, 166)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 142)
		.AddWeaponAspd(ITEM_KIND_SWORD, 141)
		.AddWeaponAspd(ITEM_KIND_AXE, 141)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 141)
		.AddWeaponAspd(ITEM_KIND_CLUB, 140)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_DEX],
			[2, PARAM_STR],
			[3, PARAM_STR],
			[4, PARAM_INT],
			[6, PARAM_DEX],
			[7, PARAM_AGI],
			[8, PARAM_LUK],
			[9, PARAM_VIT],
			[12, PARAM_DEX],
			[13, PARAM_VIT],
			[15, PARAM_INT],
			[16, PARAM_LUK],
			[17, PARAM_STR],
			[19, PARAM_AGI],
			[20, PARAM_AGI],
			[22, PARAM_INT],
			[23, PARAM_DEX],
			[26, PARAM_STR],
			[28, PARAM_LUK],
			[29, PARAM_VIT],
			[31, PARAM_AGI],
			[32, PARAM_DEX],
			[33, PARAM_STR],
			[34, PARAM_INT],
			[36, PARAM_AGI],
			[38, PARAM_DEX],
			[39, PARAM_LUK],
			[41, PARAM_DEX],
			[44, PARAM_LUK],
			[45, PARAM_LUK],
			[47, PARAM_DEX],
			[48, PARAM_VIT],
			[50, PARAM_INT],
			[52, PARAM_STR],
			[55, PARAM_DEX],
			[56, PARAM_DEX],
			[58, PARAM_AGI],
			[60, PARAM_VIT],
			[61, PARAM_INT],
			[62, PARAM_DEX],
			[64, PARAM_AGI],
			[65, PARAM_VIT],
			[66, PARAM_LUK],
			[67, PARAM_LUK],
			[70, PARAM_DEX],
		])

		.SetHpArray([
			    40,    47,    55,    64,    74,    84,    95,   107,   120,   134,
			   149,   165,   182,   200,   219,   238,   258,   279,   301,   324,
			   348,   373,   399,   426,   454,   482,   511,   541,   572,   604,
			   637,   671,   706,   742,   779,   816,   854,   893,   933,   974,
			  1016,  1059,  1103,  1148,  1194,  1240,  1287,  1335,  1384,  1434,
			  1485,  1537,  1590,  1644,  1699,  1754,  1810,  1867,  1925,  1984,
			  2044,  2105,  2167,  2230,  2294,  2358,  2423,  2489,  2556,  2624,
			  2693,  2763,  2834,  2906,  2979,  3052,  3126,  3201,  3277,  3354,
			  3432,  3511,  3591,  3672,  3754,  3836,  3919,  4003,  4088,  4174,
			  4261,  4349,  4438,  4528,  4619,  4710,  4802,  4895,  4989,
		])

		.SetSpArray([
			    14,    18,    22,    26,    30,    34,    38,    42,    46,    50,
			    54,    58,    62,    66,    70,    74,    78,    82,    86,    90,
			    94,    98,   102,   106,   110,   114,   118,   122,   126,   130,
			   134,   138,   142,   146,   150,   154,   158,   162,   166,   170,
			   174,   178,   182,   186,   190,   194,   198,   202,   206,   210,
			   214,   218,   222,   226,   230,   234,   238,   242,   246,   250,
			   254,   258,   262,   266,   270,   274,   278,   282,   286,   290,
			   294,   298,   302,   306,   310,   314,   318,   322,   326,   330,
			   334,   338,   342,   346,   350,   354,   358,   362,   366,   370,
			   374,   378,   382,   386,   390,   394,   398,   402,   406,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_SHOZIGENKAIRYO_ZOKA, SKILL_ID_DISCOUNT, SKILL_ID_OVER_CHARGE,
			SKILL_ID_PUSH_CART, SKILL_ID_ITEM_KANTE, SKILL_ID_ROTEN_KAISETSU,
			SKILL_ID_MAMMONITE, SKILL_ID_LOUD_VOICE, SKILL_ID_CHANGE_CART,
			SKILL_ID_CART_REVOLUTION, SKILL_ID_TETSU_SEIZO, SKILL_ID_KOTETSU_SEIZO,
			SKILL_ID_ZOKUSEISEKI_SEIZO, SKILL_ID_ORIDEOCON_KENKYU, SKILL_ID_TANKEN_SEISAKU,
			SKILL_ID_KEN_SEISAKU, SKILL_ID_RYOTEKEN_SEISAKU, SKILL_ID_ONO_SEISAKU,
			SKILL_ID_MACE_SEISAKU, SKILL_ID_KNUCKLE_SEISAKU, SKILL_ID_YARI_SEISAKU,
			SKILL_ID_HILT_BINDING, SKILL_ID_SKIN_TEMPERING, SKILL_ID_KOSEKI_HAKKEN,
			SKILL_ID_BUKI_SHURI, SKILL_ID_BUKI_KENKYU, SKILL_ID_HAMMER_FALL,
			SKILL_ID_ADRENALINE_RUSH, SKILL_ID_WEAPON_PERFECTION, SKILL_ID_OVER_TRUST,
			SKILL_ID_MAXIMIZE_POWER, SKILL_ID_GREED, SKILL_ID_FAKE_ZENY,
			SKILL_ID_OVER_TRUST_MAX, SKILL_ID_CART_BOOST_WS, SKILL_ID_CART_TERMINATION,
			SKILL_ID_MELTDOWN, SKILL_ID_BUKISEIREN,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_LOUD_VOICE, SKILL_ID_HILT_BINDING,
			SKILL_ID_BUKI_KENKYU, SKILL_ID_SKIN_TEMPERING,
			SKILL_ID_ADRENALINE_RUSH, SKILL_ID_WEAPON_PERFECTION,
			SKILL_ID_OVER_TRUST, SKILL_ID_MAXIMIZE_POWER,
			SKILL_ID_OVER_TRUST_MAX, SKILL_ID_FULL_ADRENALINE_RUSH,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_MAMMONITE,
			SKILL_ID_CART_REVOLUTION,
			SKILL_ID_CART_TERMINATION,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MARCHANT,
			ITEM_EQPFLG_SERIES_UPPER_OF_MARCHANT,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_BLACKSMITH,
			ITEM_EQPFLG_SERIES_WHITESMITH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_PALADIN"
		))
		.AddNameKana("パラディン", "パラディン")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND_REINCANATED)
		.SetWeightBonus(800)

		.AddWeaponAspd(ITEM_KIND_NONE, 165)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 152)
		.AddWeaponAspd(ITEM_KIND_SWORD, 152)
		.AddWeaponAspd(ITEM_KIND_SWORD_2HAND, 145)
		.AddWeaponAspd(ITEM_KIND_SPEAR, 143)
		.AddWeaponAspd(ITEM_KIND_SPEAR_2HAND, 143)
		.AddWeaponAspd(ITEM_KIND_AXE, 140)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 140)
		.AddWeaponAspd(ITEM_KIND_CLUB, 141)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 4)

		.SetJobBonusArray([
			[1, PARAM_VIT],
			[2, PARAM_STR],
			[3, PARAM_AGI],
			[6, PARAM_DEX],
			[7, PARAM_INT],
			[8, PARAM_AGI],
			[9, PARAM_VIT],
			[10, PARAM_STR],
			[12, PARAM_DEX],
			[14, PARAM_INT],
			[15, PARAM_VIT],
			[16, PARAM_AGI],
			[17, PARAM_DEX],
			[18, PARAM_STR],
			[21, PARAM_VIT],
			[23, PARAM_DEX],
			[24, PARAM_AGI],
			[26, PARAM_STR],
			[29, PARAM_INT],
			[30, PARAM_VIT],
			[33, PARAM_STR],
			[36, PARAM_DEX],
			[37, PARAM_AGI],
			[39, PARAM_LUK],
			[40, PARAM_STR],
			[42, PARAM_VIT],
			[43, PARAM_INT],
			[45, PARAM_DEX],
			[48, PARAM_STR],
			[49, PARAM_VIT],
			[52, PARAM_AGI],
			[53, PARAM_VIT],
			[54, PARAM_INT],
			[55, PARAM_STR],
			[57, PARAM_DEX],
			[59, PARAM_LUK],
			[60, PARAM_AGI],
			[61, PARAM_INT],
			[63, PARAM_VIT],
			[64, PARAM_STR],
			[65, PARAM_INT],
			[67, PARAM_LUK],
			[68, PARAM_DEX],
			[69, PARAM_VIT],
			[70, PARAM_AGI],
		])

		.SetHpArray([
			    42,    51,    61,    72,    85,    99,   114,   130,   147,   165,
			   184,   204,   225,   247,   271,   296,   322,   349,   377,   406,
			   436,   467,   499,   532,   567,   603,   640,   678,   717,   757,
			   798,   840,   883,   927,   973,  1020,  1068,  1117,  1167,  1218,
			  1270,  1323,  1377,  1432,  1489,  1547,  1606,  1666,  1727,  1789,
			  1852,  1916,  1981,  2047,  2115,  2184,  2254,  2325,  2397,  2470,
			  2544,  2619,  2695,  2772,  2851,  2931,  3012,  3094,  3177,  3261,
			  3346,  3432,  3519,  3607,  3697,  3788,  3880,  3973,  4067,  4162,
			  4258,  4355,  4453,  4552,  4653,  4755,  4858,  4962,  5067,  5173,
			  5280,  5388,  5497,  5607,  5719,  5832,  5946,  6061,  6177,
		])

		.SetSpArray([
			    14,    19,    24,    28,    33,    38,    42,    47,    52,    57,
			    61,    66,    71,    75,    80,    85,    89,    94,    99,   104,
			   108,   113,   118,   122,   127,   132,   136,   141,   146,   151,
			   155,   160,   165,   169,   174,   179,   183,   188,   193,   198,
			   202,   207,   212,   216,   221,   226,   230,   235,   240,   245,
			   249,   254,   259,   263,   268,   273,   277,   282,   287,   292,
			   296,   301,   306,   310,   315,   320,   324,   329,   334,   339,
			   343,   348,   353,   357,   362,   367,   371,   376,   381,   386,
			   390,   395,   400,   404,   409,   414,   418,   423,   428,   433,
			   437,   442,   447,   451,   456,   461,   465,   470,   475,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN, SKILL_ID_HP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_BASH, SKILL_ID_MAGNUM_BREAK, SKILL_ID_PROVOKE,
			SKILL_ID_ENDURE, SKILL_ID_IDOZI_HP_KAIFUKU, SKILL_ID_KYUSHO_KOGEKI,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_YARI_SHUREN, SKILL_ID_SPEAR_QUICKEN,
			SKILL_ID_FAITH, SKILL_ID_HOLY_CROSS, SKILL_ID_GRAND_CROSS,
			SKILL_ID_SHIELD_CHARGE, SKILL_ID_SHIELD_BOOMERANG, SKILL_ID_REFLECT_SHIELD,
			SKILL_ID_AUTO_GUARD, SKILL_ID_DEFENDER, SKILL_ID_DEBOTION,
			SKILL_ID_RIDING, SKILL_ID_KIHE_SHUREN, SKILL_ID_HEAL,
			SKILL_ID_CURE, SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE,
			SKILL_ID_PROVIDENCE, SKILL_ID_SHRINK, SKILL_ID_SHIELD_CHAIN,
			SKILL_ID_PRESSURE, SKILL_ID_SACRIFICE, SKILL_ID_GOSPEL,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_FAITH,
			SKILL_ID_YARI_SHUREN, SKILL_ID_SPEAR_QUICKEN,
			SKILL_ID_DEMON_BANE, SKILL_ID_DIVINE_PROTECTION,
			SKILL_ID_AUTO_GUARD_OLD, SKILL_ID_KIHE_SHUREN,
			SKILL_ID_DEFENDER, SKILL_ID_ENDURE,
			SKILL_ID_REFLECT_SHIELD,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
			SKILL_ID_SHIELD_CHARGE,
			SKILL_ID_SHIELD_BOOMERANG,
			SKILL_ID_SHIELD_BOOMERANG_TAMASHI,
			SKILL_ID_HOLY_CROSS,
			SKILL_ID_GRAND_CROSS,
			SKILL_ID_HEAL,
			SKILL_ID_PRESSURE,
			SKILL_ID_SACRIFICE,
			SKILL_ID_SHIELD_CHAIN,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_SWORDMAN,
			ITEM_EQPFLG_SERIES_UPPER_OF_SWORDMAN,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_MIRROR_SHIELD,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_CRUSADER,
			ITEM_EQPFLG_SERIES_PALADIN,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_CHASER"
		))
		.AddNameKana("チェイサー", "チェイサー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND_REINCANATED)
		.SetWeightBonus(400)

		.AddWeaponAspd(ITEM_KIND_NONE, 165)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 153)
		.AddWeaponAspd(ITEM_KIND_SWORD, 146)
		.AddWeaponAspd(ITEM_KIND_AXE, -6)
		.AddWeaponAspd(ITEM_KIND_BOW, 143)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_STR],
			[2, PARAM_AGI],
			[4, PARAM_LUK],
			[5, PARAM_INT],
			[6, PARAM_VIT],
			[9, PARAM_AGI],
			[10, PARAM_DEX],
			[11, PARAM_STR],
			[12, PARAM_AGI],
			[15, PARAM_VIT],
			[16, PARAM_DEX],
			[17, PARAM_DEX],
			[20, PARAM_LUK],
			[21, PARAM_AGI],
			[22, PARAM_STR],
			[24, PARAM_LUK],
			[26, PARAM_DEX],
			[27, PARAM_AGI],
			[29, PARAM_DEX],
			[31, PARAM_LUK],
			[32, PARAM_STR],
			[34, PARAM_AGI],
			[37, PARAM_DEX],
			[38, PARAM_DEX],
			[41, PARAM_AGI],
			[42, PARAM_VIT],
			[43, PARAM_STR],
			[44, PARAM_INT],
			[45, PARAM_AGI],
			[47, PARAM_STR],
			[49, PARAM_DEX],
			[50, PARAM_LUK],
			[52, PARAM_DEX],
			[53, PARAM_STR],
			[56, PARAM_DEX],
			[57, PARAM_INT],
			[58, PARAM_AGI],
			[59, PARAM_LUK],
			[60, PARAM_DEX],
			[62, PARAM_STR],
			[63, PARAM_VIT],
			[64, PARAM_AGI],
			[66, PARAM_DEX],
			[67, PARAM_STR],
			[70, PARAM_AGI],
		])

		.SetHpArray([
			    40,    47,    55,    63,    72,    82,    93,   105,   118,   132,
			   146,   161,   177,   194,   212,   231,   250,   270,   291,   313,
			   336,   360,   385,   410,   436,   463,   491,   520,   550,   581,
			   612,   644,   677,   711,   746,   782,   818,   855,   893,   932,
			   972,  1013,  1055,  1097,  1140,  1184,  1229,  1275,  1322,  1370,
			  1418,  1467,  1517,  1568,  1620,  1673,  1726,  1780,  1835,  1891,
			  1948,  2006,  2065,  2124,  2184,  2245,  2307,  2370,  2434,  2499,
			  2564,  2630,  2697,  2765,  2834,  2904,  2974,  3045,  3117,  3190,
			  3264,  3339,  3415,  3491,  3568,  3646,  3725,  3805,  3886,  3968,
			  4050,  4133,  4217,  4302,  4388,  4475,  4562,  4650,  4739,
		])

		.SetSpArray([
			    15,    20,    25,    30,    35,    40,    45,    50,    55,    60,
			    65,    70,    75,    80,    85,    90,    95,   100,   105,   110,
			   115,   120,   125,   130,   135,   140,   145,   150,   155,   160,
			   165,   170,   175,   180,   185,   190,   195,   200,   205,   210,
			   215,   220,   225,   230,   235,   240,   245,   250,   255,   260,
			   265,   270,   275,   280,   285,   290,   295,   300,   305,   310,
			   315,   320,   325,   330,   335,   340,   345,   350,   355,   360,
			   365,   370,   375,   380,   385,   390,   395,   400,   405,   410,
			   415,   420,   425,   430,   435,   440,   445,   450,   455,   460,
			   465,   470,   475,   480,   485,   490,   495,   500,   505,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_STEAL,
			SKILL_ID_HIDING, SKILL_ID_ENVENOM, SKILL_ID_GEDOKU,
			SKILL_ID_SUNAMAKI, SKILL_ID_ISHIHIROI, SKILL_ID_ISHINAGE,
			SKILL_ID_BACKSTEP, SKILL_ID_SNATCHER, SKILL_ID_STEAL_COIN,
			SKILL_ID_TUNNEL_DRIVE, SKILL_ID_BACK_STAB, SKILL_ID_SURPRISE_ATTACK,
			SKILL_ID_INTIMIDATE, SKILL_ID_CLONE_SKILL, SKILL_ID_STRIP_WEAPON,
			SKILL_ID_STRIP_SHIELD, SKILL_ID_STRIP_ARMER, SKILL_ID_STRIP_HELM,
			SKILL_ID_GRAPHITY, SKILL_ID_FLAG_GRAPHITY, SKILL_ID_CLEANER,
			SKILL_ID_GANGSTAR_PARADISE, SKILL_ID_COMPULSION_DISCOUNT, SKILL_ID_KEN_SHUREN,
			SKILL_ID_WASHINO_ME, SKILL_ID_DOUBLE_STRAFING, SKILL_ID_REMOVE_TRAP,
			SKILL_ID_CLOSE_CONFINE, SKILL_ID_CHASEWALK, SKILL_ID_REJECT_SWORD,
			SKILL_ID_PRESERVE, SKILL_ID_FULL_STRIP,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA,
			SKILL_ID_KEN_SHUREN, SKILL_ID_WASHINO_ME,
			SKILL_ID_CHASEWALK, SKILL_ID_REJECT_SWORD,
			SKILL_ID_SANDANSHO, SKILL_ID_CLOSE_CONFINE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_ENVENOM,
			SKILL_ID_SUNAMAKI,
			SKILL_ID_ISHINAGE,
			SKILL_ID_BACK_STAB,
			SKILL_ID_SURPRISE_ATTACK,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_INTIMIDATE_FOR_CLONE,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
			SKILL_ID_HEAL,
			SKILL_ID_HOLY_LIGHT,
			SKILL_ID_RUWACH,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
			SKILL_ID_MAMMONITE,
			SKILL_ID_BOWLING_BASH,
			SKILL_ID_CHARGE_ATTACK,
			SKILL_ID_VENOM_SPLASHER,
			SKILL_ID_VENOM_KNIFE,
			SKILL_ID_TURN_UNDEAD,
			SKILL_ID_RESURRECTION,
			SKILL_ID_MAGNUS_EXORCISMUS,
			SKILL_ID_SANCTUARY,
			SKILL_ID_FANTASMIC_ARROW,
			SKILL_ID_LAND_MINE,
			SKILL_ID_FREEZING_TRAP,
			SKILL_ID_BLAST_MINE,
			SKILL_ID_CLAYMORE_TRAP,
			SKILL_ID_FIRE_PILLAR,
			SKILL_ID_SIGHT_RASHER,
			SKILL_ID_METEOR_STORM,
			SKILL_ID_JUPITER_THUNDER,
			SKILL_ID_LORD_OF_VERMILLION,
			SKILL_ID_WATER_BALL_FOR_CLONE,
			SKILL_ID_FROST_NOVA,
			SKILL_ID_STORM_GUST,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_HEAVENS_DRIVE_FOR_CLONE,
			SKILL_ID_SHIELD_CHARGE,
			SKILL_ID_SHIELD_BOOMERANG,
			SKILL_ID_HOLY_CROSS,
			SKILL_ID_GRAND_CROSS,
			SKILL_ID_SHIDAN,
			SKILL_ID_HAKKEI,
			SKILL_ID_ASHURA_HAOKEN,
			SKILL_ID_ASHURA_HAOKEN_SPKOTEI,
			SKILL_ID_SUNKEI,
			SKILL_ID_ACID_TERROR,
			SKILL_ID_DEMONSTRATION,
			SKILL_ID_TEIOAPUCHAGI,
			SKILL_ID_KOUENKA,
			SKILL_ID_KAENZIN,
			SKILL_ID_RYUENZIN,
			SKILL_ID_HYOSENSO,
			SKILL_ID_TSURARAOTOSHI,
			SKILL_ID_FUZIN,
			SKILL_ID_RAIGEKISAI,
			SKILL_ID_SAKUFU,
			SKILL_ID_ZENI_NAGE,
			SKILL_ID_TATAMI_GAESHI,
			SKILL_ID_KASUMIGIRI,
			SKILL_ID_KAGEKIRI,
			SKILL_ID_TRIPLE_ACTION,
			SKILL_ID_BULLS_EYE,
			SKILL_ID_YOMIGAESHI,
			SKILL_ID_BAKURETSU_KUNAI,
			SKILL_ID_MUCHANAGE,
			SKILL_ID_TOMAHAWKNAGE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_THIEF_NINJA,
			ITEM_EQPFLG_SERIES_UPPER_OF_THIEF,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_RENDO,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_SERIES_HUNTER_ROGUE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_ROGUE,
			ITEM_EQPFLG_SERIES_CHASER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_CHAMPION"
		))
		.AddNameKana("チャンピオン", "チャンピオン")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND_REINCANATED)
		.SetWeightBonus(600)

		.AddWeaponAspd(ITEM_KIND_NONE, 173)
		.AddWeaponAspd(ITEM_KIND_CLUB, 144)
		.AddWeaponAspd(ITEM_KIND_STUFF, 144)
		.AddWeaponAspd(ITEM_KIND_FIST, 170)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 144)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_STR],
			[2, PARAM_INT],
			[3, PARAM_VIT],
			[4, PARAM_AGI],
			[6, PARAM_DEX],
			[9, PARAM_STR],
			[11, PARAM_INT],
			[12, PARAM_AGI],
			[13, PARAM_LUK],
			[15, PARAM_VIT],
			[16, PARAM_DEX],
			[17, PARAM_STR],
			[20, PARAM_AGI],
			[21, PARAM_AGI],
			[22, PARAM_DEX],
			[24, PARAM_VIT],
			[27, PARAM_STR],
			[29, PARAM_AGI],
			[30, PARAM_DEX],
			[33, PARAM_INT],
			[34, PARAM_LUK],
			[37, PARAM_STR],
			[38, PARAM_DEX],
			[39, PARAM_VIT],
			[42, PARAM_VIT],
			[44, PARAM_DEX],
			[45, PARAM_AGI],
			[46, PARAM_LUK],
			[47, PARAM_INT],
			[48, PARAM_STR],
			[50, PARAM_DEX],
			[52, PARAM_AGI],
			[53, PARAM_DEX],
			[56, PARAM_INT],
			[58, PARAM_VIT],
			[59, PARAM_STR],
			[60, PARAM_DEX],
			[62, PARAM_AGI],
			[64, PARAM_INT],
			[65, PARAM_STR],
			[66, PARAM_STR],
			[67, PARAM_DEX],
			[68, PARAM_VIT],
			[69, PARAM_INT],
			[70, PARAM_AGI],
		])

		.SetHpArray([
			    41,    50,    59,    70,    81,    93,   105,   119,   133,   149,
			   165,   183,   201,   221,   241,   262,   283,   306,   329,   354,
			   379,   406,   433,   462,   491,   521,   551,   583,   615,   649,
			   683,   719,   755,   793,   831,   870,   909,   950,   991,  1034,
			  1077,  1122,  1167,  1214,  1261,  1309,  1357,  1407,  1457,  1509,
			  1561,  1615,  1669,  1725,  1781,  1838,  1895,  1954,  2013,  2074,
			  2135,  2198,  2261,  2326,  2391,  2457,  2523,  2591,  2659,  2729,
			  2799,  2871,  2943,  3017,  3091,  3166,  3241,  3318,  3395,  3474,
			  3553,  3634,  3715,  3798,  3881,  3965,  4049,  4135,  4221,  4309,
			  4397,  4487,  4577,  4669,  4761,  4854,  4947,  5042,  5137,
		])

		.SetSpArray([
			    14,    19,    24,    28,    33,    38,    42,    47,    52,    57,
			    61,    66,    71,    75,    80,    85,    89,    94,    99,   104,
			   108,   113,   118,   122,   127,   132,   136,   141,   146,   151,
			   155,   160,   165,   169,   174,   179,   183,   188,   193,   198,
			   202,   207,   212,   216,   221,   226,   230,   235,   240,   245,
			   249,   254,   259,   263,   268,   273,   277,   282,   287,   292,
			   296,   301,   306,   310,   315,   320,   324,   329,   334,   339,
			   343,   348,   353,   357,   362,   367,   371,   376,   381,   386,
			   390,   395,   400,   404,   409,   414,   418,   423,   428,   433,
			   437,   442,   447,   451,   456,   461,   465,   470,   475,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE, SKILL_ID_SIGNUM_CRUCIS,
			SKILL_ID_HEAL, SKILL_ID_CURE, SKILL_ID_ANGELUS,
			SKILL_ID_BLESSING, SKILL_ID_SOKUDO_ZOKA, SKILL_ID_SOKUDO_GENSHO,
			SKILL_ID_RUWACH, SKILL_ID_TELEPORT, SKILL_ID_WARP_PORTAL,
			SKILL_ID_PNEUMA, SKILL_ID_AQUA_BENEDICTA, SKILL_ID_HOLY_LIGHT,
			SKILL_ID_TEKKEN, SKILL_ID_KIKO, SKILL_ID_KIDATSU,
			SKILL_ID_SANDANSHO, SKILL_ID_RENDASHO, SKILL_ID_MORYUKEN,
			SKILL_ID_ASHURA_HAOKEN, SKILL_ID_MIKIRI, SKILL_ID_IBUKI,
			SKILL_ID_SHIDAN, SKILL_ID_HAKKEI, SKILL_ID_SHIRAHADORI,
			SKILL_ID_BAKURETSU_HADO, SKILL_ID_KONGO, SKILL_ID_ZANEI,
			SKILL_ID_SUNKEI, SKILL_ID_KIKO_TENI, SKILL_ID_RENKIKO,
			SKILL_ID_BUKKOKEN, SKILL_ID_RENCHUHOGEKI, SKILL_ID_MOKOKOHAZAN,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE,
			SKILL_ID_TEKKEN, SKILL_ID_KIKO,
			SKILL_ID_SANDANSHO, SKILL_ID_MIKIRI,
			SKILL_ID_BAKURETSU_HADO, SKILL_ID_KONGO,
			SKILL_ID_SANDAN_DELAY_ZOKA,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_HEAL,
			SKILL_ID_HOLY_LIGHT,
			SKILL_ID_RUWACH,
			SKILL_ID_RENDASHO,
			SKILL_ID_MORYUKEN,
			SKILL_ID_SHIDAN,
			SKILL_ID_HAKKEI,
			SKILL_ID_ASHURA_HAOKEN,
			SKILL_ID_ASHURA_HAOKEN_SPKOTEI,
			SKILL_ID_SUNKEI,
			SKILL_ID_MOKOKOHAZAN,
			SKILL_ID_BUKKOKEN,
			SKILL_ID_RENCHUHOGEKI,
			SKILL_ID_COMBO_SANDAN_CHAMP,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ACOLYTE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ACOLYTE,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_MONK,
			ITEM_EQPFLG_SERIES_CHAMPION,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_CROWN"
		))
		.AddNameKana("クラウン", "クラウン")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND_REINCANATED)
		.SetWeightBonus(700)

		.AddWeaponAspd(ITEM_KIND_NONE, 162)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 144)
		.AddWeaponAspd(ITEM_KIND_BOW, 141)
		.AddWeaponAspd(ITEM_KIND_MUSICAL, 143)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_AGI],
			[2, PARAM_DEX],
			[4, PARAM_AGI],
			[5, PARAM_STR],
			[7, PARAM_DEX],
			[8, PARAM_INT],
			[9, PARAM_AGI],
			[10, PARAM_STR],
			[11, PARAM_LUK],
			[13, PARAM_AGI],
			[15, PARAM_DEX],
			[16, PARAM_VIT],
			[18, PARAM_LUK],
			[19, PARAM_STR],
			[21, PARAM_INT],
			[23, PARAM_DEX],
			[24, PARAM_AGI],
			[26, PARAM_LUK],
			[28, PARAM_INT],
			[30, PARAM_DEX],
			[32, PARAM_AGI],
			[33, PARAM_STR],
			[36, PARAM_AGI],
			[39, PARAM_DEX],
			[40, PARAM_DEX],
			[41, PARAM_INT],
			[43, PARAM_DEX],
			[45, PARAM_STR],
			[47, PARAM_LUK],
			[49, PARAM_AGI],
			[50, PARAM_DEX],
			[53, PARAM_AGI],
			[54, PARAM_STR],
			[56, PARAM_DEX],
			[57, PARAM_DEX],
			[58, PARAM_AGI],
			[59, PARAM_VIT],
			[61, PARAM_DEX],
			[62, PARAM_STR],
			[63, PARAM_DEX],
			[65, PARAM_AGI],
			[66, PARAM_DEX],
			[68, PARAM_AGI],
			[69, PARAM_INT],
			[70, PARAM_STR],
		])

		.SetHpArray([
			    38,    43,    48,    54,    61,    69,    77,    86,    96,   107,
			   118,   130,   143,   157,   171,   186,   202,   219,   236,   254,
			   273,   293,   313,   334,   356,   379,   402,   426,   451,   477,
			   503,   530,   558,   587,   616,   646,   677,   709,   741,   774,
			   808,   843,   878,   914,   951,   989,  1027,  1066,  1106,  1147,
			  1188,  1230,  1273,  1317,  1361,  1406,  1452,  1499,  1546,  1594,
			  1643,  1693,  1743,  1794,  1846,  1899,  1952,  2006,  2061,  2117,
			  2173,  2230,  2288,  2347,  2406,  2466,  2527,  2589,  2651,  2714,
			  2778,  2843,  2908,  2974,  3041,  3109,  3177,  3246,  3316,  3387,
			  3458,  3530,  3603,  3677,  3751,  3826,  3902,  3979,  4056,
		])

		.SetSpArray([
			    16,    22,    28,    34,    40,    46,    52,    58,    64,    70,
			    76,    82,    88,    94,   100,   106,   112,   118,   124,   130,
			   136,   142,   148,   154,   160,   166,   172,   178,   184,   190,
			   196,   202,   208,   214,   220,   226,   232,   238,   244,   250,
			   256,   262,   268,   274,   280,   286,   292,   298,   304,   310,
			   316,   322,   328,   334,   340,   346,   352,   358,   364,   370,
			   376,   382,   388,   394,   400,   406,   412,   418,   424,   430,
			   436,   442,   448,   454,   460,   466,   472,   478,   484,   490,
			   496,   502,   508,   514,   520,   526,   532,   538,   544,   550,
			   556,   562,   568,   574,   580,   586,   592,   598,   604,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_DOUBLE_STRAFING, SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YA_SAKUSEI, SKILL_ID_GAKKINO_RENSHU, SKILL_ID_MUSICAL_STRIKE,
			SKILL_ID_FUKYOWAON, SKILL_ID_SAMUI_JOKE, SKILL_ID_KUCHIBUE,
			SKILL_ID_YUHINO_ASSASINCROSS, SKILL_ID_BRAGINO_UTA, SKILL_ID_IDUNNNO_RINGO,
			SKILL_ID_ADLIB, SKILL_ID_ENCORE, SKILL_ID_KOMORIUTA,
			SKILL_ID_NJORDNO_UTAGE, SKILL_ID_EIENNO_KONTON, SKILL_ID_IKUSADAIKONO_HIBIKI,
			SKILL_ID_NIBELUGENNO_YUBIWA, SKILL_ID_LOKINO_SAKEBI, SKILL_ID_SHINENNO_NAKANI,
			SKILL_ID_FUZIMINO_SIEGFRIED, SKILL_ID_UNMEINO_TALOTCARD, SKILL_ID_ARRAW_VULKAN,
			SKILL_ID_WATASHIWO_SHIBARANAIDE, SKILL_ID_TSUKIAKARINO_SHITADE, SKILL_ID_HELLMODENO_TUE,
			SKILL_ID_MARIONET_CONTROL,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME,
			SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_GAKKINO_RENSHU,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_MUSICAL_STRIKE,
			SKILL_ID_ARRAW_VULKAN,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ARCHER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ARCHER,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_BARD,
			ITEM_EQPFLG_SERIES_CROWN,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_ZYPSY"
		))
		.AddNameKana("ジプシー", "ジプシー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND_REINCANATED)
		.SetWeightBonus(700)

		.AddWeaponAspd(ITEM_KIND_NONE, 162)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 144)
		.AddWeaponAspd(ITEM_KIND_BOW, 141)
		.AddWeaponAspd(ITEM_KIND_WHIP, 143)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_DEX],
			[2, PARAM_STR],
			[4, PARAM_AGI],
			[6, PARAM_STR],
			[8, PARAM_INT],
			[9, PARAM_DEX],
			[11, PARAM_AGI],
			[12, PARAM_AGI],
			[13, PARAM_AGI],
			[14, PARAM_DEX],
			[15, PARAM_DEX],
			[17, PARAM_VIT],
			[18, PARAM_DEX],
			[20, PARAM_STR],
			[22, PARAM_DEX],
			[23, PARAM_DEX],
			[25, PARAM_AGI],
			[26, PARAM_INT],
			[27, PARAM_LUK],
			[28, PARAM_DEX],
			[31, PARAM_AGI],
			[33, PARAM_DEX],
			[35, PARAM_STR],
			[38, PARAM_AGI],
			[39, PARAM_INT],
			[41, PARAM_DEX],
			[43, PARAM_DEX],
			[45, PARAM_DEX],
			[47, PARAM_AGI],
			[49, PARAM_DEX],
			[50, PARAM_STR],
			[52, PARAM_AGI],
			[53, PARAM_INT],
			[54, PARAM_VIT],
			[57, PARAM_AGI],
			[58, PARAM_DEX],
			[60, PARAM_INT],
			[61, PARAM_AGI],
			[62, PARAM_AGI],
			[63, PARAM_LUK],
			[65, PARAM_DEX],
			[66, PARAM_STR],
			[67, PARAM_AGI],
			[69, PARAM_DEX],
			[70, PARAM_AGI],
		])

		.SetHpArray([
			    38,    43,    48,    54,    61,    69,    77,    86,    96,   107,
			   118,   130,   143,   157,   171,   186,   202,   219,   236,   254,
			   273,   293,   313,   334,   356,   379,   402,   426,   451,   477,
			   503,   530,   558,   587,   616,   646,   677,   709,   741,   774,
			   808,   843,   878,   914,   951,   989,  1027,  1066,  1106,  1147,
			  1188,  1230,  1273,  1317,  1361,  1406,  1452,  1499,  1546,  1594,
			  1643,  1693,  1743,  1794,  1846,  1899,  1952,  2006,  2061,  2117,
			  2173,  2230,  2288,  2347,  2406,  2466,  2527,  2589,  2651,  2714,
			  2778,  2843,  2908,  2974,  3041,  3109,  3177,  3246,  3316,  3387,
			  3458,  3530,  3603,  3677,  3751,  3826,  3902,  3979,  4056,
		])

		.SetSpArray([
			    16,    22,    28,    34,    40,    46,    52,    58,    64,    70,
			    76,    82,    88,    94,   100,   106,   112,   118,   124,   130,
			   136,   142,   148,   154,   160,   166,   172,   178,   184,   190,
			   196,   202,   208,   214,   220,   226,   232,   238,   244,   250,
			   256,   262,   268,   274,   280,   286,   292,   298,   304,   310,
			   316,   322,   328,   334,   340,   346,   352,   358,   364,   370,
			   376,   382,   388,   394,   400,   406,   412,   418,   424,   430,
			   436,   442,   448,   454,   460,   466,   472,   478,   484,   490,
			   496,   502,   508,   514,   520,   526,   532,   538,   544,   550,
			   556,   562,   568,   574,   580,   586,   592,   598,   604,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_DOUBLE_STRAFING, SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YA_SAKUSEI, SKILL_ID_DANCENO_RENSHU, SKILL_ID_YAUCHI,
			SKILL_ID_ZIBUNKATTENA_DANCE, SKILL_ID_SCREAM, SKILL_ID_HUMMING,
			SKILL_ID_WATASHIWO_WASURENAIDE, SKILL_ID_KOUNNO_KISS, SKILL_ID_SERVICE_FOR_YOU,
			SKILL_ID_ADLIB, SKILL_ID_ENCORE, SKILL_ID_KOMORIUTA,
			SKILL_ID_NJORDNO_UTAGE, SKILL_ID_EIENNO_KONTON, SKILL_ID_IKUSADAIKONO_HIBIKI,
			SKILL_ID_NIBELUGENNO_YUBIWA, SKILL_ID_LOKINO_SAKEBI, SKILL_ID_SHINENNO_NAKANI,
			SKILL_ID_FUZIMINO_SIEGFRIED, SKILL_ID_UNMEINO_TALOTCARD, SKILL_ID_ARRAW_VULKAN,
			SKILL_ID_WATASHIWO_SHIBARANAIDE, SKILL_ID_TSUKIAKARINO_SHITADE, SKILL_ID_HELLMODENO_TUE,
			SKILL_ID_MARIONET_CONTROL,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME,
			SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_DANCENO_RENSHU,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YAUCHI,
			SKILL_ID_ARRAW_VULKAN,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ARCHER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ARCHER,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_DANCER,
			ITEM_EQPFLG_SERIES_ZYPSY,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_PROFESSOR"
		))
		.AddNameKana("プロフェッサー", "プロフェッサー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND_REINCANATED)
		.SetWeightBonus(400)

		.AddWeaponAspd(ITEM_KIND_NONE, 160)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 149)
		.AddWeaponAspd(ITEM_KIND_STUFF, 142)
		.AddWeaponAspd(ITEM_KIND_BOOK, 145)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 142)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[2, PARAM_INT],
			[3, PARAM_AGI],
			[5, PARAM_STR],
			[7, PARAM_VIT],
			[8, PARAM_DEX],
			[11, PARAM_INT],
			[12, PARAM_AGI],
			[14, PARAM_INT],
			[16, PARAM_DEX],
			[18, PARAM_STR],
			[20, PARAM_DEX],
			[21, PARAM_LUK],
			[22, PARAM_INT],
			[23, PARAM_AGI],
			[24, PARAM_VIT],
			[26, PARAM_DEX],
			[27, PARAM_STR],
			[29, PARAM_DEX],
			[30, PARAM_INT],
			[32, PARAM_AGI],
			[34, PARAM_DEX],
			[36, PARAM_STR],
			[37, PARAM_DEX],
			[38, PARAM_INT],
			[39, PARAM_VIT],
			[41, PARAM_INT],
			[43, PARAM_AGI],
			[45, PARAM_STR],
			[46, PARAM_DEX],
			[49, PARAM_INT],
			[50, PARAM_AGI],
			[52, PARAM_DEX],
			[54, PARAM_AGI],
			[55, PARAM_DEX],
			[56, PARAM_STR],
			[57, PARAM_INT],
			[60, PARAM_AGI],
			[62, PARAM_DEX],
			[63, PARAM_VIT],
			[64, PARAM_INT],
			[66, PARAM_LUK],
			[68, PARAM_INT],
			[69, PARAM_AGI],
			[70, PARAM_INT],
		])

		.SetHpArray([
			    40,    47,    54,    62,    71,    81,    91,   102,   114,   127,
			   140,   154,   169,   185,   201,   218,   236,   255,   274,   294,
			   315,   337,   359,   382,   406,   431,   456,   482,   509,   537,
			   565,   594,   624,   655,   686,   718,   751,   785,   819,   854,
			   890,   927,   964,  1002,  1041,  1081,  1121,  1162,  1204,  1247,
			  1290,  1334,  1379,  1425,  1471,  1518,  1566,  1615,  1664,  1714,
			  1765,  1817,  1869,  1922,  1976,  2031,  2086,  2142,  2199,  2257,
			  2315,  2374,  2434,  2495,  2556,  2618,  2681,  2745,  2809,  2874,
			  2940,  3007,  3074,  3142,  3211,  3281,  3351,  3422,  3494,  3567,
			  3640,  3714,  3789,  3865,  3941,  4018,  4096,  4175,  4254,
		])

		.SetSpArray([
			    17,    24,    31,    38,    45,    52,    59,    66,    73,    80,
			    87,    94,   101,   108,   115,   122,   129,   136,   143,   150,
			   157,   164,   171,   178,   185,   192,   199,   206,   213,   220,
			   227,   234,   241,   248,   255,   262,   269,   276,   283,   290,
			   297,   304,   311,   318,   325,   332,   339,   346,   353,   360,
			   367,   374,   381,   388,   395,   402,   409,   416,   423,   430,
			   437,   444,   451,   458,   465,   472,   479,   486,   493,   500,
			   507,   514,   521,   528,   535,   542,   549,   556,   563,   570,
			   577,   584,   591,   598,   605,   612,   619,   626,   633,   640,
			   647,   654,   661,   668,   675,   682,   689,   696,   703,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT, SKILL_ID_FROST_DIVER, SKILL_ID_SIGHT,
			SKILL_ID_LIGHTNING_BOLT, SKILL_ID_THUNDER_STORM, SKILL_ID_STONE_CURSE,
			SKILL_ID_NAPALM_BEAT, SKILL_ID_SOUL_STRIKE, SKILL_ID_SAFETY_WALL,
			SKILL_ID_SP_KAIFUKURYOKU_KOZYO, SKILL_ID_ENERGY_COAT, SKILL_ID_ADVANCED_BOOK,
			SKILL_ID_CAST_CANCEL, SKILL_ID_MAGIC_ROD, SKILL_ID_SPELL_BREAKER,
			SKILL_ID_DISPELL, SKILL_ID_FREE_CAST, SKILL_ID_AUTO_MAGICIAN_SPELL,
			SKILL_ID_DRAGONOLOGY, SKILL_ID_EARTH_SPIKE, SKILL_ID_HEAVENS_DRIVE,
			SKILL_ID_FLAME_LAUNCHER, SKILL_ID_FROST_WEAPON, SKILL_ID_LIGHTNING_LOADER,
			SKILL_ID_SEISMIC_WEAPON, SKILL_ID_VOLCANO, SKILL_ID_DELUGE,
			SKILL_ID_VIOLENT_GALE, SKILL_ID_LAND_PROTECTOR, SKILL_ID_ABRACADABRA,
			SKILL_ID_MONSTER_ZYOHO, SKILL_ID_CREATE_CONVERTER, SKILL_ID_FIRE_ELEMENTAL_CHANGE,
			SKILL_ID_WATER_ELEMENTAL_CHANGE, SKILL_ID_WIND_ELEMENTAL_CHANGE, SKILL_ID_EARTH_ELEMENTAL_CHANGE,
			SKILL_ID_SEIMEIRYOKU_HENKAN, SKILL_ID_SOUL_CHANGE, SKILL_ID_SOUL_BURN,
			SKILL_ID_MIND_BREAKER, SKILL_ID_SPIDER_WEB, SKILL_ID_WALL_OF_FOG,
			SKILL_ID_MEMORIZE, SKILL_ID_DOUBLE_CASTING,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_ENERGY_COAT, SKILL_ID_ADVANCED_BOOK,
			SKILL_ID_FREE_CAST, SKILL_ID_AUTO_MAGICIAN_SPELL,
			SKILL_ID_DRAGONOLOGY, SKILL_ID_MEMORIZE,
			SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL, SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL,
			SKILL_ID_DOUBLE_CASTING,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_HEAVENS_DRIVE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_TYPE_BOOK,
			ITEM_EQPFLG_SERIES_SAGE,
			ITEM_EQPFLG_SERIES_PROFESSOR,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_CREATOR"
		))
		.AddNameKana("クリエイター", "クリエイター")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND_REINCANATED)
		.SetWeightBonus(1000)

		.AddWeaponAspd(ITEM_KIND_NONE, 166)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 146)
		.AddWeaponAspd(ITEM_KIND_SWORD, 144)
		.AddWeaponAspd(ITEM_KIND_AXE, 141)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 140)
		.AddWeaponAspd(ITEM_KIND_CLUB, 142)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 4)

		.SetJobBonusArray([
			[1, PARAM_DEX],
			[2, PARAM_LUK],
			[5, PARAM_AGI],
			[6, PARAM_STR],
			[7, PARAM_INT],
			[8, PARAM_LUK],
			[9, PARAM_VIT],
			[10, PARAM_DEX],
			[13, PARAM_INT],
			[15, PARAM_DEX],
			[18, PARAM_AGI],
			[20, PARAM_LUK],
			[22, PARAM_INT],
			[23, PARAM_DEX],
			[25, PARAM_LUK],
			[27, PARAM_AGI],
			[30, PARAM_INT],
			[31, PARAM_STR],
			[33, PARAM_VIT],
			[34, PARAM_LUK],
			[35, PARAM_DEX],
			[38, PARAM_AGI],
			[41, PARAM_DEX],
			[42, PARAM_DEX],
			[43, PARAM_DEX],
			[45, PARAM_LUK],
			[46, PARAM_INT],
			[47, PARAM_DEX],
			[49, PARAM_DEX],
			[51, PARAM_LUK],
			[52, PARAM_LUK],
			[53, PARAM_STR],
			[54, PARAM_AGI],
			[56, PARAM_DEX],
			[57, PARAM_DEX],
			[59, PARAM_INT],
			[60, PARAM_LUK],
			[61, PARAM_VIT],
			[63, PARAM_DEX],
			[64, PARAM_LUK],
			[66, PARAM_STR],
			[67, PARAM_AGI],
			[68, PARAM_INT],
			[69, PARAM_LUK],
			[70, PARAM_DEX],
		])

		.SetHpArray([
			    40,    47,    55,    64,    74,    84,    95,   107,   120,   134,
			   149,   165,   182,   200,   219,   238,   258,   279,   301,   324,
			   348,   373,   399,   426,   454,   482,   511,   541,   572,   604,
			   637,   671,   706,   742,   779,   816,   854,   893,   933,   974,
			  1016,  1059,  1103,  1148,  1194,  1240,  1287,  1335,  1384,  1434,
			  1485,  1537,  1590,  1644,  1699,  1754,  1810,  1867,  1925,  1984,
			  2044,  2105,  2167,  2230,  2294,  2358,  2423,  2489,  2556,  2624,
			  2693,  2763,  2834,  2906,  2979,  3052,  3126,  3201,  3277,  3354,
			  3432,  3511,  3591,  3672,  3754,  3836,  3919,  4003,  4088,  4174,
			  4261,  4349,  4438,  4528,  4619,  4710,  4802,  4895,  4989,
		])

		.SetSpArray([
			    14,    18,    22,    26,    30,    34,    38,    42,    46,    50,
			    54,    58,    62,    66,    70,    74,    78,    82,    86,    90,
			    94,    98,   102,   106,   110,   114,   118,   122,   126,   130,
			   134,   138,   142,   146,   150,   154,   158,   162,   166,   170,
			   174,   178,   182,   186,   190,   194,   198,   202,   206,   210,
			   214,   218,   222,   226,   230,   234,   238,   242,   246,   250,
			   254,   258,   262,   266,   270,   274,   278,   282,   286,   290,
			   294,   298,   302,   306,   310,   314,   318,   322,   326,   330,
			   334,   338,   342,   346,   350,   354,   358,   362,   366,   370,
			   374,   378,   382,   386,   390,   394,   398,   402,   406,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_SHOZIGENKAIRYO_ZOKA, SKILL_ID_DISCOUNT, SKILL_ID_OVER_CHARGE,
			SKILL_ID_PUSH_CART, SKILL_ID_ITEM_KANTE, SKILL_ID_ROTEN_KAISETSU,
			SKILL_ID_MAMMONITE, SKILL_ID_LOUD_VOICE, SKILL_ID_CHANGE_CART,
			SKILL_ID_CART_REVOLUTION, SKILL_ID_ONO_SHUREN, SKILL_ID_LEARNING_POTION,
			SKILL_ID_PHARMACY, SKILL_ID_POTION_PITCHER, SKILL_ID_ACID_TERROR,
			SKILL_ID_BIOPLANT, SKILL_ID_SPHERE_MINE, SKILL_ID_DEMONSTRATION,
			SKILL_ID_CHEMICAL_WEAPON_CHARGE, SKILL_ID_CHEMICAL_SHIELD_CHARGE, SKILL_ID_CHEMICAL_ARMER_CHARGE,
			SKILL_ID_CHEMICAL_HELM_CHARGE, SKILL_ID_SEIMEI_RINRI, SKILL_ID_ANSOKU,
			SKILL_ID_CALL_HOMUNCULUS, SKILL_ID_RESURRECTION_HOMUNCULUS, SKILL_ID_SHOKUBUTSU_SAIBAI,
			SKILL_ID_SLIMPOTION_PITCHER, SKILL_ID_ACID_DEMONSTRATION, SKILL_ID_FULL_CHEMICAL_CHARGE,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_LOUD_VOICE, SKILL_ID_ONO_SHUREN,
			SKILL_ID_DEFENCE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_MAMMONITE,
			SKILL_ID_CART_REVOLUTION,
			SKILL_ID_ACID_TERROR,
			SKILL_ID_DEMONSTRATION,
			SKILL_ID_ACID_DEMONSTRATION,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MARCHANT,
			ITEM_EQPFLG_SERIES_UPPER_OF_MARCHANT,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_ALCHEMIST,
			ITEM_EQPFLG_SERIES_CREATOR,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();










	//================================================================================================================================
	//
	// 転生基本職
	//
	//================================================================================================================================

	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_HI_NOVICE"
		))
		.AddNameKana("ハイ ノービス", "ハイ　ノービス")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_NOVICE_REINCANATED)
		.SetWeightBonus(0)

		.AddWeaponAspd(ITEM_KIND_NONE, 152)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 141)
		.AddWeaponAspd(ITEM_KIND_SWORD, 140)
		.AddWeaponAspd(ITEM_KIND_AXE, 138)
		.AddWeaponAspd(ITEM_KIND_CLUB, 140)
		.AddWeaponAspd(ITEM_KIND_STUFF, 141)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 7)

		.SetJobBonusArray([
			[2, PARAM_LUK],
			[3, PARAM_DEX],
			[5, PARAM_AGI],
			[6, PARAM_VIT],
			[8, PARAM_STR],
			[9, PARAM_INT],
		])

		.SetHpArray([
			    40,    45,    50,    55,    60,    65,    70,    75,    80,    85,
			    90,    95,   100,   105,   110,   115,   120,   125,   130,   135,
			   140,   145,   150,   155,   160,   165,   170,   175,   180,   185,
			   190,   195,   200,   205,   210,   215,   220,   225,   230,   235,
			   240,   245,   250,   255,   260,   265,   270,   275,   280,   285,
			   290,   295,   300,   305,   310,   315,   320,   325,   330,   335,
			   340,   345,   350,   355,   360,   365,   370,   375,   380,   385,
			   390,   395,   400,   405,   410,   415,   420,   425,   430,   435,
			   440,   445,   450,   455,   460,   465,   470,   475,   480,   485,
			   490,   495,   500,   505,   510,   515,   520,   525,   530,
		])

		.SetSpArray([
			    11,    12,    13,    14,    15,    16,    17,    18,    19,    20,
			    21,    22,    23,    24,    25,    26,    27,    28,    29,    30,
			    31,    32,    33,    34,    35,    36,    37,    38,    39,    40,
			    41,    42,    43,    44,    45,    46,    47,    48,    49,    50,
			    51,    52,    53,    54,    55,    56,    57,    58,    59,    60,
			    61,    62,    63,    64,    65,    66,    67,    68,    69,    70,
			    71,    72,    73,    74,    75,    76,    77,    78,    79,    80,
			    81,    82,    83,    84,    85,    86,    87,    88,    89,    90,
			    91,    92,    93,    94,    95,    96,    97,    98,    99,   100,
			   101,   102,   103,   104,   105,   106,   107,   108,   109,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
		])

		.SetPassiveSkillIdArray([
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_SERIES_NOVICE,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_LOWER_OF_NOVICE,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_HI_SWORDMAN"
		))
		.AddNameKana("ハイ ソードマン", "ハイ　ソードマン")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_1ST_REINCANATED)
		.SetWeightBonus(800)

		.AddWeaponAspd(ITEM_KIND_NONE, 162)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 153)
		.AddWeaponAspd(ITEM_KIND_SWORD, 146)
		.AddWeaponAspd(ITEM_KIND_SWORD_2HAND, 143)
		.AddWeaponAspd(ITEM_KIND_SPEAR, 141)
		.AddWeaponAspd(ITEM_KIND_SPEAR_2HAND, 140)
		.AddWeaponAspd(ITEM_KIND_AXE, 139)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 138)
		.AddWeaponAspd(ITEM_KIND_CLUB, 142)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[2, PARAM_STR],
			[6, PARAM_VIT],
			[10, PARAM_DEX],
			[14, PARAM_STR],
			[18, PARAM_VIT],
			[22, PARAM_DEX],
			[26, PARAM_LUK],
			[30, PARAM_AGI],
			[33, PARAM_STR],
			[36, PARAM_DEX],
			[38, PARAM_VIT],
			[40, PARAM_STR],
			[42, PARAM_VIT],
			[44, PARAM_LUK],
			[46, PARAM_AGI],
			[47, PARAM_STR],
			[49, PARAM_STR],
			[50, PARAM_STR],
		])

		.SetHpArray([
			    40,    46,    53,    61,    70,    79,    89,   100,   111,   123,
			   136,   149,   163,   178,   194,   210,   227,   245,   263,   282,
			   302,   322,   343,   365,   388,   411,   435,   460,   485,   511,
			   538,   565,   593,   622,   652,   682,   713,   745,   777,   810,
			   844,   878,   913,   949,   986,  1023,  1061,  1100,  1139,  1179,
			  1220,  1261,  1303,  1346,  1390,  1434,  1479,  1525,  1571,  1618,
			  1666,  1714,  1763,  1813,  1864,  1915,  1967,  2020,  2073,  2127,
			  2182,  2237,  2293,  2350,  2408,  2466,  2525,  2585,  2645,  2706,
			  2768,  2830,  2893,  2957,  3022,  3087,  3153,  3220,  3287,  3355,
			  3424,  3493,  3563,  3634,  3706,  3778,  3851,  3925,  3999,
		])

		.SetSpArray([
			    12,    14,    16,    18,    20,    22,    24,    26,    28,    30,
			    32,    34,    36,    38,    40,    42,    44,    46,    48,    50,
			    52,    54,    56,    58,    60,    62,    64,    66,    68,    70,
			    72,    74,    76,    78,    80,    82,    84,    86,    88,    90,
			    92,    94,    96,    98,   100,   102,   104,   106,   108,   110,
			   112,   114,   116,   118,   120,   122,   124,   126,   128,   130,
			   132,   134,   136,   138,   140,   142,   144,   146,   148,   150,
			   152,   154,   156,   158,   160,   162,   164,   166,   168,   170,
			   172,   174,   176,   178,   180,   182,   184,   186,   188,   190,
			   192,   194,   196,   198,   200,   202,   204,   206,   208,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN, SKILL_ID_HP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_BASH, SKILL_ID_MAGNUM_BREAK, SKILL_ID_PROVOKE,
			SKILL_ID_ENDURE, SKILL_ID_IDOZI_HP_KAIFUKU, SKILL_ID_KYUSHO_KOGEKI,
			SKILL_ID_AUTO_BERSERK,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_ENDURE,
			SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_SWORDMAN,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_MIRROR_SHIELD,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_LOWER_OF_SWORDMAN,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_HI_THIEF"
		))
		.AddNameKana("ハイ シーフ", "ハイ　シーフ")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_1ST_REINCANATED)
		.SetWeightBonus(400)

		.AddWeaponAspd(ITEM_KIND_NONE, 163)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 152)
		.AddWeaponAspd(ITEM_KIND_SWORD, 140)
		.AddWeaponAspd(ITEM_KIND_AXE, 133)
		.AddWeaponAspd(ITEM_KIND_BOW, 135)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[2, PARAM_AGI],
			[6, PARAM_STR],
			[10, PARAM_DEX],
			[14, PARAM_VIT],
			[18, PARAM_INT],
			[22, PARAM_DEX],
			[26, PARAM_LUK],
			[30, PARAM_STR],
			[33, PARAM_AGI],
			[36, PARAM_AGI],
			[38, PARAM_STR],
			[40, PARAM_LUK],
			[42, PARAM_DEX],
			[44, PARAM_VIT],
			[46, PARAM_LUK],
			[47, PARAM_STR],
			[49, PARAM_DEX],
			[50, PARAM_AGI],
		])

		.SetHpArray([
			    40,    46,    53,    60,    68,    76,    85,    94,   104,   114,
			   125,   136,   148,   160,   173,   186,   200,   214,   229,   244,
			   260,   276,   293,   310,   328,   346,   365,   384,   404,   424,
			   445,   466,   488,   510,   533,   556,   580,   604,   629,   654,
			   680,   706,   733,   760,   788,   816,   845,   874,   904,   934,
			   965,   996,  1028,  1060,  1093,  1126,  1160,  1194,  1229,  1264,
			  1300,  1336,  1373,  1410,  1448,  1486,  1525,  1564,  1604,  1644,
			  1685,  1726,  1768,  1810,  1853,  1896,  1940,  1984,  2029,  2074,
			  2120,  2166,  2213,  2260,  2308,  2356,  2405,  2454,  2504,  2554,
			  2605,  2656,  2708,  2760,  2813,  2866,  2920,  2974,  3029,
		])

		.SetSpArray([
			    12,    14,    16,    18,    20,    22,    24,    26,    28,    30,
			    32,    34,    36,    38,    40,    42,    44,    46,    48,    50,
			    52,    54,    56,    58,    60,    62,    64,    66,    68,    70,
			    72,    74,    76,    78,    80,    82,    84,    86,    88,    90,
			    92,    94,    96,    98,   100,   102,   104,   106,   108,   110,
			   112,   114,   116,   118,   120,   122,   124,   126,   128,   130,
			   132,   134,   136,   138,   140,   142,   144,   146,   148,   150,
			   152,   154,   156,   158,   160,   162,   164,   166,   168,   170,
			   172,   174,   176,   178,   180,   182,   184,   186,   188,   190,
			   192,   194,   196,   198,   200,   202,   204,   206,   208,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_STEAL,
			SKILL_ID_HIDING, SKILL_ID_ENVENOM, SKILL_ID_GEDOKU,
			SKILL_ID_SUNAMAKI, SKILL_ID_ISHIHIROI, SKILL_ID_ISHINAGE,
			SKILL_ID_BACKSTEP,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA,
			SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_ENVENOM,
			SKILL_ID_SUNAMAKI,
			SKILL_ID_ISHINAGE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_THIEF_NINJA,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_TYPE_RENDO,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_LOWER_OF_THIEF,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_HI_ACOLYTE"
		))
		.AddNameKana("ハイ アコライト", "ハイ　アコライト")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_1ST_REINCANATED)
		.SetWeightBonus(400)

		.AddWeaponAspd(ITEM_KIND_NONE, 163)
		.AddWeaponAspd(ITEM_KIND_CLUB, 142)
		.AddWeaponAspd(ITEM_KIND_STUFF, 142)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 134)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[2, PARAM_LUK],
			[6, PARAM_VIT],
			[10, PARAM_INT],
			[14, PARAM_DEX],
			[18, PARAM_LUK],
			[22, PARAM_AGI],
			[26, PARAM_STR],
			[30, PARAM_VIT],
			[33, PARAM_INT],
			[36, PARAM_DEX],
			[38, PARAM_LUK],
			[40, PARAM_AGI],
			[42, PARAM_STR],
			[44, PARAM_VIT],
			[46, PARAM_INT],
			[47, PARAM_DEX],
			[49, PARAM_STR],
			[50, PARAM_LUK],
		])

		.SetHpArray([
			    40,    46,    52,    59,    66,    73,    81,    89,    98,   107,
			   116,   126,   136,   147,   158,   169,   181,   193,   206,   219,
			   232,   246,   260,   275,   290,   305,   321,   337,   354,   371,
			   388,   406,   424,   443,   462,   481,   501,   521,   542,   563,
			   584,   606,   628,   651,   674,   697,   721,   745,   770,   795,
			   820,   846,   872,   899,   926,   953,   981,  1009,  1038,  1067,
			  1096,  1126,  1156,  1187,  1218,  1249,  1281,  1313,  1346,  1379,
			  1412,  1446,  1480,  1515,  1550,  1585,  1621,  1657,  1694,  1731,
			  1768,  1806,  1844,  1883,  1922,  1961,  2001,  2041,  2082,  2123,
			  2164,  2206,  2248,  2291,  2334,  2377,  2421,  2465,  2510,
		])

		.SetSpArray([
			    15,    20,    25,    30,    35,    40,    45,    50,    55,    60,
			    65,    70,    75,    80,    85,    90,    95,   100,   105,   110,
			   115,   120,   125,   130,   135,   140,   145,   150,   155,   160,
			   165,   170,   175,   180,   185,   190,   195,   200,   205,   210,
			   215,   220,   225,   230,   235,   240,   245,   250,   255,   260,
			   265,   270,   275,   280,   285,   290,   295,   300,   305,   310,
			   315,   320,   325,   330,   335,   340,   345,   350,   355,   360,
			   365,   370,   375,   380,   385,   390,   395,   400,   405,   410,
			   415,   420,   425,   430,   435,   440,   445,   450,   455,   460,
			   465,   470,   475,   480,   485,   490,   495,   500,   505,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE, SKILL_ID_SIGNUM_CRUCIS,
			SKILL_ID_HEAL, SKILL_ID_CURE, SKILL_ID_ANGELUS,
			SKILL_ID_BLESSING, SKILL_ID_SOKUDO_ZOKA, SKILL_ID_SOKUDO_GENSHO,
			SKILL_ID_RUWACH, SKILL_ID_TELEPORT, SKILL_ID_WARP_PORTAL,
			SKILL_ID_PNEUMA, SKILL_ID_AQUA_BENEDICTA, SKILL_ID_HOLY_LIGHT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE,
			SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_HEAL,
			SKILL_ID_HOLY_LIGHT,
			SKILL_ID_RUWACH,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ACOLYTE,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_LOWER_OF_ACOLYTE,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_HI_ARCHER"
		))
		.AddNameKana("ハイ アーチャー", "ハイ　アーチャー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_1ST_REINCANATED)
		.SetWeightBonus(600)

		.AddWeaponAspd(ITEM_KIND_NONE, 169)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 147)
		.AddWeaponAspd(ITEM_KIND_BOW, 143)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[2, PARAM_DEX],
			[6, PARAM_STR],
			[10, PARAM_INT],
			[14, PARAM_DEX],
			[18, PARAM_DEX],
			[22, PARAM_LUK],
			[26, PARAM_AGI],
			[30, PARAM_DEX],
			[33, PARAM_AGI],
			[36, PARAM_DEX],
			[38, PARAM_STR],
			[40, PARAM_STR],
			[42, PARAM_DEX],
			[44, PARAM_LUK],
			[46, PARAM_VIT],
			[47, PARAM_INT],
			[49, PARAM_AGI],
			[50, PARAM_DEX],
		])

		.SetHpArray([
			    40,    46,    53,    60,    68,    76,    85,    94,   104,   114,
			   125,   136,   148,   160,   173,   186,   200,   214,   229,   244,
			   260,   276,   293,   310,   328,   346,   365,   384,   404,   424,
			   445,   466,   488,   510,   533,   556,   580,   604,   629,   654,
			   680,   706,   733,   760,   788,   816,   845,   874,   904,   934,
			   965,   996,  1028,  1060,  1093,  1126,  1160,  1194,  1229,  1264,
			  1300,  1336,  1373,  1410,  1448,  1486,  1525,  1564,  1604,  1644,
			  1685,  1726,  1768,  1810,  1853,  1896,  1940,  1984,  2029,  2074,
			  2120,  2166,  2213,  2260,  2308,  2356,  2405,  2454,  2504,  2554,
			  2605,  2656,  2708,  2760,  2813,  2866,  2920,  2974,  3029,
		])

		.SetSpArray([
			    12,    14,    16,    18,    20,    22,    24,    26,    28,    30,
			    32,    34,    36,    38,    40,    42,    44,    46,    48,    50,
			    52,    54,    56,    58,    60,    62,    64,    66,    68,    70,
			    72,    74,    76,    78,    80,    82,    84,    86,    88,    90,
			    92,    94,    96,    98,   100,   102,   104,   106,   108,   110,
			   112,   114,   116,   118,   120,   122,   124,   126,   128,   130,
			   132,   134,   136,   138,   140,   142,   144,   146,   148,   150,
			   152,   154,   156,   158,   160,   162,   164,   166,   168,   170,
			   172,   174,   176,   178,   180,   182,   184,   186,   188,   190,
			   192,   194,   196,   198,   200,   202,   204,   206,   208,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_DOUBLE_STRAFING, SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YA_SAKUSEI,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME,
			SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ARCHER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_LOWER_OF_ARCHER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_HI_MAGICIAN"
		))
		.AddNameKana("ハイ マジシャン", "ハイ　マジシャン")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_1ST_REINCANATED)
		.SetWeightBonus(200)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 142)
		.AddWeaponAspd(ITEM_KIND_STUFF, 139)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 127)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 7)

		.SetJobBonusArray([
			[2, PARAM_INT],
			[6, PARAM_DEX],
			[10, PARAM_DEX],
			[14, PARAM_INT],
			[18, PARAM_AGI],
			[22, PARAM_INT],
			[26, PARAM_AGI],
			[30, PARAM_LUK],
			[33, PARAM_INT],
			[36, PARAM_DEX],
			[38, PARAM_INT],
			[40, PARAM_AGI],
			[42, PARAM_LUK],
			[44, PARAM_INT],
			[46, PARAM_INT],
			[47, PARAM_AGI],
			[49, PARAM_LUK],
			[50, PARAM_INT],
		])

		.SetHpArray([
			    40,    46,    52,    58,    65,    72,    79,    86,    94,   102,
			   110,   119,   128,   137,   147,   157,   167,   177,   188,   199,
			   210,   222,   234,   246,   259,   272,   285,   298,   312,   326,
			   340,   355,   370,   385,   401,   417,   433,   449,   466,   483,
			   500,   518,   536,   554,   573,   592,   611,   630,   650,   670,
			   690,   711,   732,   753,   775,   797,   819,   841,   864,   887,
			   910,   934,   958,   982,  1007,  1032,  1057,  1082,  1108,  1134,
			  1160,  1187,  1214,  1241,  1269,  1297,  1325,  1353,  1382,  1411,
			  1440,  1470,  1500,  1530,  1561,  1592,  1623,  1654,  1686,  1718,
			  1750,  1783,  1816,  1849,  1883,  1917,  1951,  1985,  2020,
		])

		.SetSpArray([
			    16,    22,    28,    34,    40,    46,    52,    58,    64,    70,
			    76,    82,    88,    94,   100,   106,   112,   118,   124,   130,
			   136,   142,   148,   154,   160,   166,   172,   178,   184,   190,
			   196,   202,   208,   214,   220,   226,   232,   238,   244,   250,
			   256,   262,   268,   274,   280,   286,   292,   298,   304,   310,
			   316,   322,   328,   334,   340,   346,   352,   358,   364,   370,
			   376,   382,   388,   394,   400,   406,   412,   418,   424,   430,
			   436,   442,   448,   454,   460,   466,   472,   478,   484,   490,
			   496,   502,   508,   514,   520,   526,   532,   538,   544,   550,
			   556,   562,   568,   574,   580,   586,   592,   598,   604,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT, SKILL_ID_FROST_DIVER, SKILL_ID_SIGHT,
			SKILL_ID_LIGHTNING_BOLT, SKILL_ID_THUNDER_STORM, SKILL_ID_STONE_CURSE,
			SKILL_ID_NAPALM_BEAT, SKILL_ID_SOUL_STRIKE, SKILL_ID_SAFETY_WALL,
			SKILL_ID_SP_KAIFUKURYOKU_KOZYO, SKILL_ID_ENERGY_COAT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_ENERGY_COAT, SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_LOWER_OF_MAGICIAN_LINKER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_HI_MARCHANT"
		))
		.AddNameKana("ハイ マーチャント", "ハイ　マーチャント")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_1ST_REINCANATED)
		.SetWeightBonus(800)

		.AddWeaponAspd(ITEM_KIND_NONE, 162)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 142)
		.AddWeaponAspd(ITEM_KIND_SWORD, 139)
		.AddWeaponAspd(ITEM_KIND_AXE, 139)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 137)
		.AddWeaponAspd(ITEM_KIND_CLUB, 139)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[2, PARAM_VIT],
			[6, PARAM_DEX],
			[10, PARAM_STR],
			[14, PARAM_DEX],
			[18, PARAM_VIT],
			[22, PARAM_STR],
			[26, PARAM_INT],
			[30, PARAM_VIT],
			[33, PARAM_AGI],
			[36, PARAM_LUK],
			[38, PARAM_DEX],
			[40, PARAM_STR],
			[42, PARAM_DEX],
			[44, PARAM_STR],
			[46, PARAM_LUK],
			[47, PARAM_VIT],
			[49, PARAM_STR],
			[50, PARAM_DEX],
		])

		.SetHpArray([
			    40,    46,    52,    59,    66,    73,    81,    89,    98,   107,
			   116,   126,   136,   147,   158,   169,   181,   193,   206,   219,
			   232,   246,   260,   275,   290,   305,   321,   337,   354,   371,
			   388,   406,   424,   443,   462,   481,   501,   521,   542,   563,
			   584,   606,   628,   651,   674,   697,   721,   745,   770,   795,
			   820,   846,   872,   899,   926,   953,   981,  1009,  1038,  1067,
			  1096,  1126,  1156,  1187,  1218,  1249,  1281,  1313,  1346,  1379,
			  1412,  1446,  1480,  1515,  1550,  1585,  1621,  1657,  1694,  1731,
			  1768,  1806,  1844,  1883,  1922,  1961,  2001,  2041,  2082,  2123,
			  2164,  2206,  2248,  2291,  2334,  2377,  2421,  2465,  2510,
		])

		.SetSpArray([
			    13,    16,    19,    22,    25,    28,    31,    34,    37,    40,
			    43,    46,    49,    52,    55,    58,    61,    64,    67,    70,
			    73,    76,    79,    82,    85,    88,    91,    94,    97,   100,
			   103,   106,   109,   112,   115,   118,   121,   124,   127,   130,
			   133,   136,   139,   142,   145,   148,   151,   154,   157,   160,
			   163,   166,   169,   172,   175,   178,   181,   184,   187,   190,
			   193,   196,   199,   202,   205,   208,   211,   214,   217,   220,
			   223,   226,   229,   232,   235,   238,   241,   244,   247,   250,
			   253,   256,   259,   262,   265,   268,   271,   274,   277,   280,
			   283,   286,   289,   292,   295,   298,   301,   304,   307,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_SHOZIGENKAIRYO_ZOKA, SKILL_ID_DISCOUNT, SKILL_ID_OVER_CHARGE,
			SKILL_ID_PUSH_CART, SKILL_ID_ITEM_KANTE, SKILL_ID_ROTEN_KAISETSU,
			SKILL_ID_MAMMONITE, SKILL_ID_LOUD_VOICE, SKILL_ID_CHANGE_CART,
			SKILL_ID_CART_REVOLUTION,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_LOUD_VOICE, SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_MAMMONITE,
			SKILL_ID_CART_REVOLUTION,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MARCHANT,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_LOWER_OF_MARCHANT,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();










	//================================================================================================================================
	//
	// 拡張職
	//
	//================================================================================================================================

	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_TAEGWON"
		))
		.AddNameKana("テコンキッド", "テコンキッド")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_1ST)
		.SetWeightBonus(800)

		.AddWeaponAspd(ITEM_KIND_NONE, 160)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_STR],
			[2, PARAM_STR],
			[3, PARAM_STR],
			[4, PARAM_STR],
			[5, PARAM_STR],
			[6, PARAM_STR],
			[10, PARAM_DEX],
			[11, PARAM_DEX],
			[12, PARAM_DEX],
			[13, PARAM_DEX],
			[14, PARAM_DEX],
			[15, PARAM_DEX],
			[20, PARAM_AGI],
			[21, PARAM_AGI],
			[22, PARAM_AGI],
			[23, PARAM_AGI],
			[24, PARAM_AGI],
			[25, PARAM_AGI],
		])

		.SetHpArray([
			    40,    46,    53,    61,    70,    79,    89,   100,   111,   123,
			   136,   149,   163,   178,   194,   210,   227,   245,   263,   282,
			   302,   322,   343,   365,   388,   411,   435,   460,   485,   511,
			   538,   565,   593,   622,   652,   682,   713,   745,   777,   810,
			   844,   878,   913,   949,   986,  1023,  1061,  1100,  1139,  1179,
			  1220,  1261,  1303,  1346,  1390,  1434,  1479,  1525,  1571,  1618,
			  1666,  1714,  1763,  1813,  1864,  1915,  1967,  2020,  2073,  2127,
			  2137,  2147,  2157,  2167,  2177,  2187,  2197,  2200,  2210,  2230,
			  2250,  2300,  2350,  2400,  2450,  2500,  2550,  2600,  2650,  2700,
			  2750,  2800,  2850,  2900,  2950,  3000,  3050,  3100,  3200,
		])

		.SetSpArray([
			    12,    14,    16,    18,    20,    22,    24,    26,    28,    30,
			    32,    34,    36,    38,    40,    42,    44,    46,    48,    50,
			    52,    54,    56,    58,    60,    62,    64,    66,    68,    70,
			    72,    74,    76,    78,    80,    82,    84,    86,    88,    90,
			    92,    94,    96,    98,   100,   102,   104,   106,   108,   110,
			   112,   114,   116,   118,   120,   122,   124,   126,   128,   130,
			   132,   134,   136,   138,   140,   142,   144,   146,   148,   150,
			   151,   152,   153,   154,   155,   156,   157,   158,   159,   170,
			   171,   172,   173,   174,   175,   176,   177,   178,   188,   190,
			   190,   190,   190,   190,   190,   190,   190,   190,   200,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_TAIRIGI, SKILL_ID_NOPITIGI, SKILL_ID_FEORICHAGINO_KAMAE,
			SKILL_ID_NERYOCHAGINO_KAMAE, SKILL_ID_TORURYOCHAGINO_KAMAE, SKILL_ID_APUCHAORURIGINO_KAMAE,
			SKILL_ID_FEORICHAGI, SKILL_ID_NERYOCHAGI, SKILL_ID_TORURYOCHAGI,
			SKILL_ID_APUCHAORURIGI, SKILL_ID_TEIOAPUCHAGI, SKILL_ID_FIGHT,
			SKILL_ID_ODAYAKANA_KYUSOKU, SKILL_ID_TANOSHI_KYUSOKU, SKILL_ID_ATATAKAI_KAZE,
			SKILL_ID_RAKHO, SKILL_ID_TAEGWON_MISSION,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_TAIRIGI, SKILL_ID_SPURT_ZYOTAI,
			SKILL_ID_RAKHO, SKILL_ID_FIGHT,
			SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT, SKILL_ID_TAEGWON_RANKER,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_FEORICHAGI,
			SKILL_ID_NERYOCHAGI,
			SKILL_ID_TORURYOCHAGI,
			SKILL_ID_APUCHAORURIGI,
			SKILL_ID_TEIOAPUCHAGI,
			SKILL_ID_TEIOAPUCHAGI_IN_DASH,
			SKILL_ID_EARTH_SPIKE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TAEGWON,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_STARGRADIATOR"
		))
		.AddNameKana("拳聖", "ケンセイ")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_STAR_GRADIATOR)
		.SetWeightBonus(800)

		.AddWeaponAspd(ITEM_KIND_NONE, 162)
		.AddWeaponAspd(ITEM_KIND_BOOK, 149)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_STR],
			[2, PARAM_STR],
			[3, PARAM_STR],
			[4, PARAM_STR],
			[5, PARAM_STR],
			[6, PARAM_STR],
			[7, PARAM_STR],
			[8, PARAM_STR],
			[9, PARAM_STR],
			[10, PARAM_STR],
			[11, PARAM_STR],
			[12, PARAM_STR],
			[20, PARAM_DEX],
			[21, PARAM_DEX],
			[22, PARAM_DEX],
			[23, PARAM_DEX],
			[24, PARAM_DEX],
			[25, PARAM_DEX],
			[39, PARAM_AGI],
			[40, PARAM_AGI],
			[41, PARAM_AGI],
			[42, PARAM_AGI],
			[43, PARAM_AGI],
			[44, PARAM_AGI],
			[45, PARAM_AGI],
			[46, PARAM_AGI],
			[47, PARAM_AGI],
			[48, PARAM_AGI],
			[49, PARAM_AGI],
			[50, PARAM_AGI],
		])

		.SetHpArray([
			    41,    50,    59,    70,    81,    93,   105,   119,   133,   149,
			   165,   183,   201,   221,   241,   262,   283,   306,   329,   354,
			   379,   406,   433,   462,   491,   521,   551,   583,   615,   649,
			   683,   719,   755,   793,   831,   870,   909,   950,   991,  1034,
			  1077,  1122,  1167,  1214,  1261,  1309,  1357,  1407,  1457,  1509,
			  1561,  1615,  1669,  1725,  1781,  1838,  1895,  1954,  2013,  2074,
			  2135,  2198,  2261,  2326,  2391,  2457,  2523,  2591,  2659,  2670,
			  2680,  2690,  2700,  2710,  2720,  2730,  2740,  2750,  2760,  3000,
			  3020,  3040,  3060,  3080,  3100,  3120,  3140,  3160,  3180,  3455,
			  3524,  3593,  3663,  3734,  3806,  3878,  3951,  4025,  4500,
		])

		.SetSpArray([
			    14,    19,    24,    28,    33,    38,    42,    47,    52,    57,
			    61,    66,    71,    75,    80,    85,    89,    94,    99,   104,
			   108,   113,   118,   122,   127,   132,   136,   141,   146,   151,
			   155,   160,   165,   169,   174,   179,   183,   188,   193,   198,
			   202,   207,   212,   216,   221,   226,   230,   235,   240,   245,
			   249,   254,   259,   263,   268,   273,   277,   282,   287,   292,
			   296,   301,   306,   310,   315,   320,   324,   329,   334,   339,
			   341,   343,   345,   347,   349,   351,   353,   355,   357,   386,
			   388,   390,   392,   394,   396,   398,   400,   402,   404,   430,
			   433,   436,   439,   442,   445,   448,   451,   454,   500,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_TAIRIGI, SKILL_ID_NOPITIGI, SKILL_ID_FEORICHAGINO_KAMAE,
			SKILL_ID_NERYOCHAGINO_KAMAE, SKILL_ID_TORURYOCHAGINO_KAMAE, SKILL_ID_APUCHAORURIGINO_KAMAE,
			SKILL_ID_FEORICHAGI, SKILL_ID_NERYOCHAGI, SKILL_ID_TORURYOCHAGI,
			SKILL_ID_APUCHAORURIGI, SKILL_ID_TEIOAPUCHAGI, SKILL_ID_FIGHT,
			SKILL_ID_ODAYAKANA_KYUSOKU, SKILL_ID_TANOSHI_KYUSOKU, SKILL_ID_ATATAKAI_KAZE,
			SKILL_ID_RAKHO, SKILL_ID_TAEGWON_MISSION, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KANZYO,
			SKILL_ID_TAIYONO_NUKUMORI, SKILL_ID_TSUKINO_NUKUMORI, SKILL_ID_HOSHINO_NUKUMORI,
			SKILL_ID_TAIYONO_IKARI, SKILL_ID_TSUKINO_IKARI, SKILL_ID_HOSHINO_IKARI,
			SKILL_ID_TAIYONO_ANRAKU, SKILL_ID_TSUKINO_ANRAKU, SKILL_ID_HOSHINO_ANRAKU,
			SKILL_ID_TAIYONO_SHUKUFUKU, SKILL_ID_TSUKUNO_SHUKUFUKU, SKILL_ID_HOSHINO_SHUKUFUKU,
			SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_NIKUSHIMI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TOMO,
			SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_CHISHIKI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_TAIRIGI, SKILL_ID_SPURT_ZYOTAI,
			SKILL_ID_FIGHT, SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT,
			SKILL_ID_RAKHO, SKILL_ID_TAIYONO_IKARI,
			SKILL_ID_TSUKINO_IKARI, SKILL_ID_HOSHINO_IKARI,
			SKILL_ID_TAIYONO_ANRAKU, SKILL_ID_TSUKINO_ANRAKU,
			SKILL_ID_HOSHINO_ANRAKU, SKILL_ID_TAIYONO_SHUKUFUKU,
			SKILL_ID_TSUKUNO_SHUKUFUKU, SKILL_ID_HOSHINO_SHUKUFUKU,
			SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO,
			SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KISEKI,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_FEORICHAGI,
			SKILL_ID_NERYOCHAGI,
			SKILL_ID_TORURYOCHAGI,
			SKILL_ID_APUCHAORURIGI,
			SKILL_ID_TEIOAPUCHAGI,
			SKILL_ID_TEIOAPUCHAGI_IN_DASH,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_NUKUMORI,
			SKILL_ID_NUKUMORI_KABE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_MIRROR_SHIELD,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_BOOK,
			ITEM_EQPFLG_SERIES_KENSEI,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_SOULLINKER"
		))
		.AddNameKana("ソウルリンカー", "ソウルリンカー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_2ND)
		.SetWeightBonus(400)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 144)
		.AddWeaponAspd(ITEM_KIND_STUFF, 142)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 142)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[2, PARAM_INT],
			[3, PARAM_INT],
			[4, PARAM_INT],
			[5, PARAM_INT],
			[6, PARAM_INT],
			[7, PARAM_INT],
			[8, PARAM_INT],
			[9, PARAM_INT],
			[10, PARAM_INT],
			[11, PARAM_INT],
			[12, PARAM_INT],
			[20, PARAM_VIT],
			[21, PARAM_VIT],
			[22, PARAM_VIT],
			[23, PARAM_VIT],
			[24, PARAM_VIT],
			[25, PARAM_VIT],
			[39, PARAM_DEX],
			[40, PARAM_DEX],
			[41, PARAM_DEX],
			[42, PARAM_DEX],
			[43, PARAM_DEX],
			[44, PARAM_DEX],
			[45, PARAM_DEX],
			[46, PARAM_DEX],
			[47, PARAM_DEX],
			[48, PARAM_DEX],
			[49, PARAM_DEX],
			[50, PARAM_DEX],
		])

		.SetHpArray([
			    40,    47,    54,    62,    71,    81,    91,   102,   114,   127,
			   140,   154,   169,   185,   201,   218,   236,   255,   274,   294,
			   315,   337,   359,   382,   406,   431,   456,   482,   509,   537,
			   565,   594,   624,   655,   686,   718,   751,   785,   819,   854,
			   890,   927,   964,  1002,  1041,  1081,  1121,  1162,  1204,  1247,
			  1290,  1334,  1379,  1425,  1471,  1518,  1566,  1615,  1664,  1714,
			  1765,  1817,  1869,  1922,  1976,  2031,  2086,  2142,  2199,  2257,
			  2275,  2294,  2314,  2335,  2356,  2378,  2401,  2425,  2449,  2874,
			  2890,  2907,  2924,  2942,  2971,  2991,  3011,  3032,  3054,  3567,
			  3590,  3614,  3649,  3675,  3701,  3728,  3756,  3800,  4250,
		])

		.SetSpArray([
			    19,    28,    37,    46,    55,    64,    73,    82,    91,   100,
			   109,   118,   127,   136,   145,   154,   163,   172,   181,   190,
			   199,   208,   217,   226,   235,   244,   253,   262,   271,   280,
			   289,   298,   307,   316,   325,   334,   343,   352,   361,   370,
			   379,   388,   397,   406,   415,   424,   433,   442,   451,   460,
			   469,   478,   487,   496,   505,   514,   523,   532,   541,   550,
			   559,   568,   577,   586,   595,   604,   613,   622,   631,   635,
			   640,   645,   650,   655,   660,   665,   670,   675,   680,   730,
			   735,   740,   745,   750,   755,   760,   765,   770,   775,   820,
			   825,   830,   845,   850,   855,   860,   865,   870,   900,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_TAIRIGI, SKILL_ID_NOPITIGI, SKILL_ID_FEORICHAGINO_KAMAE,
			SKILL_ID_NERYOCHAGINO_KAMAE, SKILL_ID_TORURYOCHAGINO_KAMAE, SKILL_ID_APUCHAORURIGINO_KAMAE,
			SKILL_ID_FEORICHAGI, SKILL_ID_NERYOCHAGI, SKILL_ID_TORURYOCHAGI,
			SKILL_ID_APUCHAORURIGI, SKILL_ID_TEIOAPUCHAGI, SKILL_ID_FIGHT,
			SKILL_ID_ODAYAKANA_KYUSOKU, SKILL_ID_TANOSHI_KYUSOKU, SKILL_ID_ATATAKAI_KAZE,
			SKILL_ID_RAKHO, SKILL_ID_TAEGWON_MISSION, SKILL_ID_KAISEL,
			SKILL_ID_KAAHI, SKILL_ID_KAUPU, SKILL_ID_KAITO,
			SKILL_ID_KAINA, SKILL_ID_ESTIN, SKILL_ID_ESTON,
			SKILL_ID_ESMA, SKILL_ID_ESU, SKILL_ID_ESKA,
			SKILL_ID_ESKU, SKILL_ID_KNIGHTNO_TAMASHI, SKILL_ID_ASSASINNO_TAMASHI,
			SKILL_ID_PRIESTNO_TAMASHI, SKILL_ID_HUNTERNO_TAMASHI, SKILL_ID_WIZARDNO_TAMASHI,
			SKILL_ID_BLACKSMITHNO_TAMASHI, SKILL_ID_CRUSADERNO_TAMASHI, SKILL_ID_ROGUENO_TAMASHI,
			SKILL_ID_MONKNO_TAMASHI, SKILL_ID_BARDTO_DANCERNO_TAMASHI, SKILL_ID_SAGENO_TAMASHI,
			SKILL_ID_ALCHEMISTNO_TAMASHI, SKILL_ID_KENSENO_TAMASHI, SKILL_ID_SOULLINKERNO_TAMASHI,
			SKILL_ID_SUPER_NOVICENO_TAMASHI, SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_TAIRIGI, SKILL_ID_SPURT_ZYOTAI,
			SKILL_ID_FIGHT, SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT,
			SKILL_ID_RAKHO, SKILL_ID_KAINA,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_ESTIN,
			SKILL_ID_ESTON,
			SKILL_ID_ESMA,
			SKILL_ID_EARTH_SPIKE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_WIZARD_LINKER,
			ITEM_EQPFLG_SERIES_SOUL_LINKER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_NINJA"
		))
		.AddNameKana("忍者", "ニンジャ")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_EXTRA_1ST)
		.SetWeightBonus(600)

		.AddWeaponAspd(ITEM_KIND_NONE, 166)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 153)
		.AddWeaponAspd(ITEM_KIND_FUMA, 162)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_AGI],
			[2, PARAM_AGI],
			[10, PARAM_DEX],
			[11, PARAM_AGI],
			[20, PARAM_INT],
			[21, PARAM_AGI],
			[22, PARAM_DEX],
			[29, PARAM_INT],
			[30, PARAM_LUK],
			[31, PARAM_AGI],
			[32, PARAM_DEX],
			[40, PARAM_LUK],
			[41, PARAM_AGI],
			[42, PARAM_INT],
			[43, PARAM_DEX],
			[50, PARAM_INT],
			[51, PARAM_AGI],
			[52, PARAM_LUK],
			[53, PARAM_DEX],
			[59, PARAM_STR],
			[60, PARAM_VIT],
			[61, PARAM_AGI],
			[62, PARAM_INT],
			[63, PARAM_DEX],
			[64, PARAM_LUK],
		])

		.SetHpArray([
			    40,    47,    54,    62,    71,    81,    91,   102,   114,   127,
			   140,   154,   169,   185,   201,   218,   236,   255,   274,   294,
			   315,   337,   359,   382,   406,   431,   456,   482,   509,   537,
			   565,   594,   624,   655,   686,   718,   751,   785,   819,   854,
			   890,   927,   964,  1002,  1041,  1081,  1121,  1162,  1204,  1247,
			  1290,  1334,  1379,  1425,  1471,  1518,  1566,  1615,  1664,  1714,
			  1765,  1817,  1869,  1922,  1976,  2031,  2086,  2142,  2199,  2257,
			  2315,  2374,  2434,  2495,  2556,  2618,  2681,  2745,  2809,  2874,
			  2940,  3007,  3074,  3142,  3211,  3281,  3351,  3422,  3494,  3567,
			  3640,  3714,  3789,  3865,  3941,  4018,  4096,  4175,  4254,
		])

		.SetSpArray([
			    14,    17,    20,    23,    26,    29,    32,    35,    38,    41,
			    44,    47,    50,    53,    56,    59,    62,    65,    68,    71,
			    75,    79,    83,    87,    91,    95,    99,   103,   107,   111,
			   115,   119,   123,   127,   131,   135,   139,   143,   147,   151,
			   156,   161,   166,   171,   176,   181,   186,   191,   196,   201,
			   206,   211,   216,   221,   226,   231,   236,   241,   246,   251,
			   257,   263,   269,   275,   281,   287,   293,   299,   305,   311,
			   317,   323,   329,   335,   341,   347,   353,   359,   365,   370,
			   378,   386,   394,   402,   410,   418,   426,   434,   442,   450,
			   458,   466,   474,   482,   490,   498,   506,   514,   522,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_TOKAKU_SHUREN, SKILL_ID_SHURIKEN_NAGE, SKILL_ID_KUNAI_NAGE,
			SKILL_ID_FUMASHURIKEN_NAGE, SKILL_ID_ZENI_NAGE, SKILL_ID_TATAMI_GAESHI,
			SKILL_ID_KAGETOBI, SKILL_ID_KASUMIGIRI, SKILL_ID_KAGEKIRI,
			SKILL_ID_NEN, SKILL_ID_ISSEN, SKILL_ID_NINPO_SHUREN,
			SKILL_ID_KOUENKA, SKILL_ID_KAENZIN, SKILL_ID_RYUENZIN,
			SKILL_ID_HYOSENSO, SKILL_ID_SUITON, SKILL_ID_TSURARAOTOSHI,
			SKILL_ID_FUZIN, SKILL_ID_RAIGEKISAI, SKILL_ID_SAKUFU,
			SKILL_ID_UTSUSEMI, SKILL_ID_KAGEBUNSHIN,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_TOKAKU_SHUREN, SKILL_ID_NEN,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_KOUENKA,
			SKILL_ID_KAENZIN,
			SKILL_ID_RYUENZIN,
			SKILL_ID_HYOSENSO,
			SKILL_ID_TSURARAOTOSHI,
			SKILL_ID_FUZIN,
			SKILL_ID_RAIGEKISAI,
			SKILL_ID_SAKUFU,
			SKILL_ID_SHURIKEN_NAGE,
			SKILL_ID_KUNAI_NAGE,
			SKILL_ID_FUMASHURIKEN_NAGE,
			SKILL_ID_ZENI_NAGE,
			SKILL_ID_TATAMI_GAESHI,
			SKILL_ID_KASUMIGIRI,
			SKILL_ID_KAGEKIRI,
			SKILL_ID_ISSEN,
			SKILL_ID_ISSEN_MAX,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_THIEF_NINJA,
			ITEM_EQPFLG_SERIES_NINJA,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_GUNSLINGER"
		))
		.AddNameKana("ガンスリンガー", "ガンスリンガー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_NORMAL)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_EXTRA_1ST)
		.SetWeightBonus(800)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_HANDGUN, 139)
		.AddWeaponAspd(ITEM_KIND_RIFLE, 138)
		.AddWeaponAspd(ITEM_KIND_SHOTGUN, 123)
		.AddWeaponAspd(ITEM_KIND_GATLINGGUN, 139)
		.AddWeaponAspd(ITEM_KIND_GRENADEGUN, 126)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_DEX],
			[2, PARAM_LUK],
			[4, PARAM_LUK],
			[6, PARAM_DEX],
			[11, PARAM_DEX],
			[12, PARAM_LUK],
			[17, PARAM_DEX],
			[21, PARAM_LUK],
			[25, PARAM_DEX],
			[31, PARAM_LUK],
			[32, PARAM_STR],
			[35, PARAM_DEX],
			[41, PARAM_STR],
			[45, PARAM_DEX],
			[50, PARAM_STR],
			[51, PARAM_LUK],
			[52, PARAM_INT],
			[55, PARAM_DEX],
			[59, PARAM_AGI],
			[60, PARAM_VIT],
			[61, PARAM_INT],
			[62, PARAM_DEX],
			[63, PARAM_LUK],
			[64, PARAM_STR],
		])

		.SetHpArray([
			    41,    50,    59,    70,    81,    93,   105,   119,   133,   149,
			   165,   183,   201,   221,   241,   262,   283,   306,   329,   354,
			   379,   406,   433,   462,   491,   521,   551,   583,   615,   649,
			   683,   719,   755,   793,   831,   870,   909,   950,   991,  1034,
			  1077,  1122,  1167,  1214,  1261,  1309,  1357,  1407,  1457,  1509,
			  1561,  1615,  1669,  1725,  1781,  1838,  1895,  1954,  2013,  2074,
			  2135,  2198,  2261,  2326,  2391,  2457,  2523,  2591,  2659,  2670,
			  2680,  2690,  2700,  2710,  2720,  2730,  2740,  2750,  2760,  3000,
			  3020,  3040,  3060,  3080,  3100,  3120,  3140,  3160,  3180,  3455,
			  3524,  3593,  3663,  3734,  3806,  3878,  3951,  4025,  4500,
		])

		.SetSpArray([
			    13,    16,    19,    22,    25,    28,    31,    34,    37,    40,
			    43,    46,    49,    52,    55,    58,    61,    64,    67,    70,
			    73,    76,    79,    82,    85,    89,    93,    97,   101,   105,
			   109,   113,   117,   121,   125,   129,   132,   135,   138,   141,
			   145,   149,   153,   157,   161,   165,   169,   173,   177,   181,
			   186,   191,   196,   201,   206,   211,   216,   221,   226,   231,
			   236,   241,   246,   251,   256,   261,   266,   271,   276,   281,
			   286,   291,   296,   301,   306,   312,   318,   324,   336,   342,
			   348,   354,   360,   366,   372,   378,   384,   390,   396,   402,
			   408,   414,   420,   426,   432,   438,   444,   450,   456,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FLIP_THE_COIN, SKILL_ID_FLYING, SKILL_ID_TRIPLE_ACTION,
			SKILL_ID_MAGICAL_BARRET, SKILL_ID_CRACKER, SKILL_ID_BULLS_EYE,
			SKILL_ID_INCREASING_ACCURACY, SKILL_ID_MADNESSS_CANCELER, SKILL_ID_ADJUSTMENT,
			SKILL_ID_SNAKE_EYE, SKILL_ID_SINGLE_ACTION, SKILL_ID_CHAIN_ACTION,
			SKILL_ID_RAPID_SHOWER, SKILL_ID_DEATHPERAD, SKILL_ID_GATLING_FEVER,
			SKILL_ID_TRACKING, SKILL_ID_PIERCING_SHOT, SKILL_ID_DISARM,
			SKILL_ID_DUST, SKILL_ID_FULL_BASTER, SKILL_ID_SPREAD_ATTACK,
			SKILL_ID_GROUND_DRIFT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_SINGLE_ACTION, SKILL_ID_SNAKE_EYE,
			SKILL_ID_CHAIN_ACTION, SKILL_ID_COUNT_OF_COIN,
			SKILL_ID_MADNESSS_CANCELER, SKILL_ID_ADJUSTMENT,
			SKILL_ID_INCREASING_ACCURACY, SKILL_ID_GATLING_FEVER,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_TRIPLE_ACTION,
			SKILL_ID_BULLS_EYE,
			SKILL_ID_RAPID_SHOWER,
			SKILL_ID_DEATHPERAD,
			SKILL_ID_TRACKING,
			SKILL_ID_DISARM,
			SKILL_ID_PIERCING_SHOT,
			SKILL_ID_DUST,
			SKILL_ID_FULL_BASTER,
			SKILL_ID_SPREAD_ATTACK,
			SKILL_ID_GROUND_DRIFT,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_GUNSLINGER,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_BULLET,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();










	//================================================================================================================================
	//
	// 三次職
	//
	//================================================================================================================================

	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_RUNEKNIGHT"
		))
		.AddNameKana("ルーンナイト", "ルーンナイト")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(1500)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 148)
		.AddWeaponAspd(ITEM_KIND_SWORD, 148)
		.AddWeaponAspd(ITEM_KIND_SWORD_2HAND, 143)
		.AddWeaponAspd(ITEM_KIND_SPEAR, 141)
		.AddWeaponAspd(ITEM_KIND_SPEAR_2HAND, 141)
		.AddWeaponAspd(ITEM_KIND_AXE, 141)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 138)
		.AddWeaponAspd(ITEM_KIND_CLUB, 142)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 4)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[2, PARAM_INT],
			[3, PARAM_DEX],
			[4, PARAM_VIT],
			[5, PARAM_INT],
			[10, PARAM_STR],
			[11, PARAM_STR],
			[12, PARAM_INT],
			[13, PARAM_INT],
			[14, PARAM_VIT],
			[15, PARAM_DEX],
			[19, PARAM_DEX],
			[20, PARAM_AGI],
			[21, PARAM_AGI],
			[22, PARAM_INT],
			[23, PARAM_VIT],
			[24, PARAM_DEX],
			[30, PARAM_INT],
			[31, PARAM_DEX],
			[32, PARAM_VIT],
			[33, PARAM_STR],
			[39, PARAM_INT],
			[40, PARAM_DEX],
			[41, PARAM_AGI],
			[44, PARAM_DEX],
			[45, PARAM_VIT],
			[46, PARAM_INT],
			[47, PARAM_LUK],
			[48, PARAM_LUK],
			[49, PARAM_LUK],
			[50, PARAM_INT],
			[51, PARAM_STR],
			[53, PARAM_AGI],
			[55, PARAM_DEX],
			[57, PARAM_LUK],
			[59, PARAM_VIT],
			[60, PARAM_STR],
			[61, PARAM_VIT],
			[63, PARAM_AGI],
			[65, PARAM_LUK],
			[66, PARAM_DEX],
			[68, PARAM_AGI],
			[70, PARAM_STR],
		])

		.SetHpArray([
			  6717,
			  6863,  7009,  7155,  7301,  7447,  7593,  7739,  7885,  8100,  8133,
			  8242,  8352,  8464,  8576,  8690,  8804,  8920,  9036,  9154,  9273,
			  9393,  9514,  9636,  9759,  9883, 10008, 10134, 10261, 10389, 10518,
			 10648, 10779, 10912, 11045, 11180, 11315, 11452, 11589, 11728, 11868,
			 12009, 12151, 12294, 12438, 12583, 12729, 12876, 13024, 13173, 13323,
			 13474, 13626, 13780, 13934, 14090, 14246, 14404, 14562, 14722, 14883,
			 15042, 15100, 15260, 15321, 15481, 15541, 15600, 15760, 15820, 15980,
			 16141, 16303, 16466, 16630, 16795, 16961, 17128, 17296, 17465, 17635,
			 17806, 17978, 18151, 18325, 18500, 18759, 19059, 19269, 19558, 19851,
			 20228, 20491, 20676, 20862, 21070, 21176, 21282, 21388, 21494, 21600,
			 21706, 21812, 21918, 22024, 22130, 22236, 22342, 22448, 22554, 22660,
		])

		.SetSpArray([
			   272,
			   275,   279,   283,   286,   290,   293,   297,   301,   300,   310,
			   313,   316,   319,   322,   325,   328,   331,   334,   337,   340,
			   343,   346,   349,   352,   355,   358,   361,   364,   367,   370,
			   373,   376,   379,   382,   385,   388,   391,   394,   397,   400,
			   403,   406,   409,   412,   415,   418,   421,   424,   427,   430,
			   433,   436,   439,   442,   445,   448,   451,   454,   457,   460,
			   500,   566,   629,   672,   710,   748,   781,   824,   847,   890,
			   894,   898,   902,   906,   910,   915,   920,   925,   930,   935,
			   941,   947,   953,   959,   965,   972,   980,   987,   995,  1003,
			  1010,  1018,  1026,  1034,  1042,  1048,  1054,  1060,  1066,  1072,
			  1078,  1084,  1090,  1096,  1102,  1108,  1114,  1120,  1126,  1132,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN, SKILL_ID_HP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_BASH, SKILL_ID_MAGNUM_BREAK, SKILL_ID_PROVOKE,
			SKILL_ID_ENDURE, SKILL_ID_IDOZI_HP_KAIFUKU, SKILL_ID_KYUSHO_KOGEKI,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_YARI_SHUREN, SKILL_ID_PIERCE,
			SKILL_ID_SPEAR_STUB, SKILL_ID_SPEAR_BOOMERANG, SKILL_ID_BRANDISH_SPEAR,
			SKILL_ID_TWOHAND_QUICKEN, SKILL_ID_AUTO_COUNTER, SKILL_ID_BOWLING_BASH,
			SKILL_ID_RIDING, SKILL_ID_KIHE_SHUREN, SKILL_ID_CHARGE_ATTACK,
			SKILL_ID_AURA_BLADE, SKILL_ID_PARIYING, SKILL_ID_CONCENTRATION,
			SKILL_ID_HEAD_CRUSH, SKILL_ID_JOINT_BEAT, SKILL_ID_SPIRAL_PIERCE,
			SKILL_ID_TENTION_RELAX, SKILL_ID_BERSERK, SKILL_ID_RUNE_MASTERY,
			SKILL_ID_SONIC_WAVE, SKILL_ID_DEATH_BOUND, SKILL_ID_HANDRED_SPEAR,
			SKILL_ID_WIND_CUTTER, SKILL_ID_PHANTOM_SLAST, SKILL_ID_IGNITION_BREAK,
			SKILL_ID_ENCHANT_BLADE, SKILL_ID_DRAGON_TRAINING, SKILL_ID_DRAGON_HOWLING,
			SKILL_ID_FIRE_DRAGON_BREATH, SKILL_ID_WATER_DRAGON_BREATH, SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_YARI_SHUREN,
			SKILL_ID_TWOHAND_QUICKEN, SKILL_ID_DRAGON_TRAINING,
			SKILL_ID_AURA_BLADE, SKILL_ID_CONCENTRATION,
			SKILL_ID_BERSERK, SKILL_ID_PARIYING,
			SKILL_ID_ONEHAND_QUICKEN, SKILL_ID_ENDURE,
			SKILL_ID_ENCHANT_BLADE, SKILL_ID_RUNE_MASTERY,
			SKILL_ID_GIANT_GROWTH, SKILL_ID_FIGHTING_SPIRIT,
			SKILL_ID_STONE_HARD_SKIN, SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
			SKILL_ID_PIERCE,
			SKILL_ID_SPEAR_STUB,
			SKILL_ID_SPEAR_BOOMERANG,
			SKILL_ID_BRANDISH_SPEAR,
			SKILL_ID_BOWLING_BASH,
			SKILL_ID_CHARGE_ATTACK,
			SKILL_ID_SPIRAL_PIERCE,
			SKILL_ID_HEAD_CRUSH,
			SKILL_ID_JOINT_BEAT,
			SKILL_ID_IGNITION_BREAK,
			SKILL_ID_FIRE_DRAGON_BREATH,
			SKILL_ID_WATER_DRAGON_BREATH,
			SKILL_ID_WIND_CUTTER,
			SKILL_ID_SONIC_WAVE,
			SKILL_ID_HANDRED_SPEAR,
			SKILL_ID_PHANTOM_SLAST,
			SKILL_ID_STORM_BLAST,
			SKILL_ID_CRUSH_STRIKE,
			SKILL_ID_DEATH_BOUND,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_SWORDMAN,
			ITEM_EQPFLG_SERIES_UPPER_OF_SWORDMAN,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_MIRROR_SHIELD,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_SERIES_KNIGHT,
			ITEM_EQPFLG_SERIES_LOAR_KNIGHT,
			ITEM_EQPFLG_RUNEKNIGHT,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_GILOTINCROSS"
		))
		.AddNameKana("ギロチンクロス", "ギロチンクロス")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(1200)

		.AddWeaponAspd(ITEM_KIND_NONE, 153)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 156)
		.AddWeaponAspd(ITEM_KIND_SWORD, 143)
		.AddWeaponAspd(ITEM_KIND_AXE, 140)
		.AddWeaponAspd(ITEM_KIND_KATAR, 157)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_AGI],
			[2, PARAM_DEX],
			[4, PARAM_STR],
			[5, PARAM_STR],
			[9, PARAM_STR],
			[10, PARAM_AGI],
			[11, PARAM_DEX],
			[14, PARAM_VIT],
			[15, PARAM_VIT],
			[16, PARAM_STR],
			[19, PARAM_VIT],
			[20, PARAM_STR],
			[23, PARAM_AGI],
			[24, PARAM_AGI],
			[25, PARAM_DEX],
			[28, PARAM_INT],
			[29, PARAM_INT],
			[30, PARAM_STR],
			[31, PARAM_VIT],
			[35, PARAM_AGI],
			[36, PARAM_DEX],
			[37, PARAM_DEX],
			[41, PARAM_INT],
			[42, PARAM_VIT],
			[43, PARAM_AGI],
			[44, PARAM_AGI],
			[48, PARAM_INT],
			[49, PARAM_DEX],
			[50, PARAM_DEX],
			[51, PARAM_LUK],
			[52, PARAM_STR],
			[53, PARAM_AGI],
			[54, PARAM_VIT],
			[56, PARAM_INT],
			[58, PARAM_STR],
			[59, PARAM_LUK],
			[60, PARAM_AGI],
			[62, PARAM_DEX],
			[64, PARAM_LUK],
			[65, PARAM_AGI],
			[67, PARAM_DEX],
			[69, PARAM_LUK],
			[70, PARAM_AGI],
		])

		.SetHpArray([
			  5029,
			  5138,  5247,  5356,  5465,  5574,  5683,  5792,  5901,  6050,  6093,
			  6208,  6324,  6441,  6559,  6678,  6798,  6920,  7043,  7167,  7292,
			  7418,  7545,  7673,  7802,  7932,  8063,  8196,  8330,  8465,  8601,
			  8738,  8876,  9015,  9155,  9296,  9438,  9582,  9727,  9873, 10020,
			 10168, 10317, 10467, 10618, 10770, 10923, 11078, 11234, 11391, 11549,
			 11708, 11868, 12029, 12191, 12354, 12518, 12684, 12851, 13019, 13188,
			 13351, 13518, 13684, 13850, 14016, 14182, 14349, 14515, 14681, 14830,
			 14966, 15103, 15241, 15380, 15520, 15661, 15803, 15946, 16090, 16235,
			 16381, 16528, 16676, 16825, 16975, 17196, 17368, 17628, 17857, 18072,
			 18361, 18563, 18897, 19237, 19449, 19449, 19449, 19449, 19449, 20249,
			 20249, 20569, 20569, 20889, 20889, 20889, 20889, 20889, 21689, 21849,
		])

		.SetSpArray([
			   363,
			   368,   372,   377,   381,   386,   390,   395,   399,   400,   410,
			   414,   418,   422,   426,   430,   434,   438,   442,   446,   450,
			   454,   458,   462,   466,   470,   474,   478,   482,   486,   490,
			   494,   498,   502,   506,   510,   514,   518,   522,   526,   530,
			   534,   538,   542,   546,   550,   554,   558,   562,   566,   570,
			   574,   578,   582,   586,   590,   594,   598,   602,   606,   610,
			   670,   695,   700,   715,   730,   745,   760,   785,   790,   805,
			   810,   815,   820,   825,   830,   836,   842,   848,   854,   860,
			   867,   874,   881,   888,   895,   900,   905,   910,   916,   921,
			   926,   931,   937,   942,   947,   947,   947,   947,   947,   977,
			   977,   989,   989,  1001,  1001,  1001,  1001,  1001,  1031,  1037,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_STEAL,
			SKILL_ID_HIDING, SKILL_ID_ENVENOM, SKILL_ID_GEDOKU,
			SKILL_ID_SUNAMAKI, SKILL_ID_ISHIHIROI, SKILL_ID_ISHINAGE,
			SKILL_ID_BACKSTEP, SKILL_ID_MIGITE_SHUREN, SKILL_ID_HIDARITE_SHUREN,
			SKILL_ID_KATAR_SHUREN, SKILL_ID_SONIC_BLOW, SKILL_ID_GRIM_TOOTH,
			SKILL_ID_CLOAKING, SKILL_ID_ENCHANT_POISON, SKILL_ID_POISON_REACT,
			SKILL_ID_VENOM_DUST, SKILL_ID_VENOM_SPLASHER, SKILL_ID_VENOM_KNIFE,
			SKILL_ID_SONIC_ACCELERATION, SKILL_ID_KATAR_KENKYU, SKILL_ID_SOUL_BREAKER,
			SKILL_ID_METEOR_ASSALT, SKILL_ID_CREATE_DEADLY_POISON, SKILL_ID_ENCHANT_DEADLY_POISON,
			SKILL_ID_VENOM_IMPRESS, SKILL_ID_CROSS_IMPACT, SKILL_ID_DARK_ILLUSION,
			SKILL_ID_SHINDOKU_KENKYU, SKILL_ID_SHINDOKU_SEIZO, SKILL_ID_ANTIDOTE,
			SKILL_ID_POISONING_WEAPON, SKILL_ID_VENOM_PRESSURE, SKILL_ID_POISON_SMOKE,
			SKILL_ID_WEAPON_BLOCKING, SKILL_ID_COUNTER_SLASH, SKILL_ID_WEAPON_CRUSH,
			SKILL_ID_CLOAKING_EXCEED, SKILL_ID_PHANTOM_MENUS, SKILL_ID_HALLUCINATION_WALK,
			SKILL_ID_ROLLING_CUTTER, SKILL_ID_CROSS_RIPPER_SLASHER, SKILL_ID_DARK_CRAW,
			SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA,
			SKILL_ID_MIGITE_SHUREN, SKILL_ID_HIDARITE_SHUREN,
			SKILL_ID_KATAR_SHUREN, SKILL_ID_KATAR_KENKYU,
			SKILL_ID_ENCHANT_DEADLY_POISON, SKILL_ID_SONIC_ACCELERATION,
			SKILL_ID_HALLUCINATION_WALK, SKILL_ID_HALLUCINATION_WALKGONO_ASPD_GENSHO,
			SKILL_ID_CANCEL_EDP_POISON_ATTACK, SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_ENVENOM,
			SKILL_ID_SUNAMAKI,
			SKILL_ID_ISHINAGE,
			SKILL_ID_SONIC_BLOW,
			SKILL_ID_GRIM_TOOTH,
			SKILL_ID_VENOM_SPLASHER,
			SKILL_ID_POISON_REACT,
			SKILL_ID_VENOM_KNIFE,
			SKILL_ID_SONIC_BLOW_TAMASHI,
			SKILL_ID_SOUL_BREAKER,
			SKILL_ID_METEOR_ASSALT,
			SKILL_ID_CROSS_IMPACT,
			SKILL_ID_ROLLING_CUTTER,
			SKILL_ID_CROSS_RIPPER_SLASHER,
			SKILL_ID_COUNTER_SLASH,
			SKILL_ID_DARK_ILLUSION,
			SKILL_ID_VENOM_PRESSURE,
			SKILL_ID_PHANTOM_MENUS,
			SKILL_ID_DARK_CRAW,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_THIEF_NINJA,
			ITEM_EQPFLG_SERIES_UPPER_OF_THIEF,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_ASSASIN_PRIEST,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_ASSASIN,
			ITEM_EQPFLG_SERIES_ASSASIN_CROSS,
			ITEM_EQPFLG_GLTCROSS,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_ARCBISHOP"
		))
		.AddNameKana("アークビショップ", "アークビショップ")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(1000)

		.AddWeaponAspd(ITEM_KIND_NONE, 173)
		.AddWeaponAspd(ITEM_KIND_CLUB, 144)
		.AddWeaponAspd(ITEM_KIND_STUFF, 145)
		.AddWeaponAspd(ITEM_KIND_BOOK, 152)
		.AddWeaponAspd(ITEM_KIND_FIST, 170)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 139)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 4)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[3, PARAM_VIT],
			[5, PARAM_DEX],
			[7, PARAM_INT],
			[8, PARAM_INT],
			[10, PARAM_VIT],
			[11, PARAM_VIT],
			[14, PARAM_DEX],
			[15, PARAM_DEX],
			[18, PARAM_STR],
			[19, PARAM_STR],
			[22, PARAM_INT],
			[24, PARAM_STR],
			[26, PARAM_AGI],
			[27, PARAM_AGI],
			[28, PARAM_STR],
			[32, PARAM_INT],
			[34, PARAM_VIT],
			[36, PARAM_DEX],
			[38, PARAM_AGI],
			[39, PARAM_AGI],
			[40, PARAM_INT],
			[41, PARAM_INT],
			[44, PARAM_DEX],
			[45, PARAM_VIT],
			[46, PARAM_STR],
			[49, PARAM_INT],
			[50, PARAM_DEX],
			[51, PARAM_LUK],
			[52, PARAM_AGI],
			[53, PARAM_VIT],
			[54, PARAM_STR],
			[55, PARAM_INT],
			[57, PARAM_VIT],
			[58, PARAM_LUK],
			[59, PARAM_DEX],
			[60, PARAM_INT],
			[61, PARAM_INT],
			[63, PARAM_LUK],
			[65, PARAM_AGI],
			[66, PARAM_INT],
			[68, PARAM_LUK],
			[70, PARAM_AGI],
		])

		.SetHpArray([
			  3609,
			  3683,  3757,  3831,  3905,  3979,  4053,  4127,  4201,  4300,  4333,
			  4412,  4491,  4570,  4649,  4728,  4807,  4886,  4965,  5044,  5123,
			  5202,  5281,  5360,  5439,  5518,  5597,  5676,  5755,  5834,  5913,
			  5992,  6071,  6150,  6229,  6308,  6387,  6466,  6545,  6624,  6703,
			  6782,  6861,  6940,  7019,  7098,  7177,  7256,  7335,  7414,  7493,
			  7572,  7651,  7730,  7809,  7888,  7967,  8046,  8125,  8204,  8283,
			  8362,  8441,  8520,  8599,  8678,  8757,  8836,  8915,  8994,  9115,
			  9276,  9438,  9601,  9765,  9930, 10096, 10263, 10431, 10600, 10770,
			 10941, 11113, 11286, 11460, 11635, 11949, 12272, 12628, 13006, 13345,
			 13718, 14034, 14427, 14831, 15246, 15512, 15778, 16044, 16310, 16576,
			 16842, 17108, 17374, 17640, 17906, 18172, 18438, 18704, 18970, 19236,
		])

		.SetSpArray([
			   728,
			   736,   744,   752,   760,   769,   777,   785,   793,   800,   810,
			   818,   826,   834,   842,   850,   858,   866,   874,   882,   890,
			   898,   906,   914,   922,   930,   938,   946,   954,   962,   970,
			   978,   986,   994,  1002,  1010,  1018,  1026,  1034,  1042,  1050,
			  1058,  1066,  1074,  1082,  1090,  1098,  1106,  1114,  1122,  1130,
			  1138,  1146,  1154,  1162,  1170,  1178,  1186,  1194,  1202,  1210,
			  1258,  1286,  1334,  1372,  1410,  1458,  1466,  1474,  1482,  1490,
			  1499,  1508,  1517,  1526,  1535,  1545,  1555,  1565,  1575,  1585,
			  1596,  1607,  1618,  1629,  1640,  1651,  1663,  1674,  1686,  1697,
			  1709,  1721,  1733,  1745,  1757,  1762,  1767,  1772,  1777,  1782,
			  1787,  1792,  1797,  1802,  1807,  1812,  1817,  1822,  1827,  1832,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE, SKILL_ID_SIGNUM_CRUCIS,
			SKILL_ID_HEAL, SKILL_ID_CURE, SKILL_ID_ANGELUS,
			SKILL_ID_BLESSING, SKILL_ID_SOKUDO_ZOKA, SKILL_ID_SOKUDO_GENSHO,
			SKILL_ID_RUWACH, SKILL_ID_TELEPORT, SKILL_ID_WARP_PORTAL,
			SKILL_ID_PNEUMA, SKILL_ID_AQUA_BENEDICTA, SKILL_ID_HOLY_LIGHT,
			SKILL_ID_MAGNIFICAT, SKILL_ID_KYRIE_ELEISON, SKILL_ID_GLORIA,
			SKILL_ID_IMPOSITIO_MANUS, SKILL_ID_SUFFRAGIUM, SKILL_ID_ASPERSIO,
			SKILL_ID_RECOVERY, SKILL_ID_RESURRECTION, SKILL_ID_SANCTUARY,
			SKILL_ID_LEX_DIVINA, SKILL_ID_LEX_AETERNA, SKILL_ID_SAFETY_WALL,
			SKILL_ID_TURN_UNDEAD, SKILL_ID_MAGNUS_EXORCISMUS, SKILL_ID_SP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_MACE_SHUREN, SKILL_ID_SLOW_POISON, SKILL_ID_SEITAI_KOFUKU,
			SKILL_ID_REDEMPTIO, SKILL_ID_MEDITATIO, SKILL_ID_MANA_RECHARGE,
			SKILL_ID_ASSUMPTIO, SKILL_ID_BASILICA, SKILL_ID_ANCILLA,
			SKILL_ID_HIGHNESS_HEAL, SKILL_ID_COLUCEO_HEAL, SKILL_ID_EPICLESIS,
			SKILL_ID_CLEMENTIA, SKILL_ID_CANTOCANDIDUS, SKILL_ID_PRAEFATIO,
			SKILL_ID_LAUDAAGNUS, SKILL_ID_LAUDARAMUS, SKILL_ID_CLEARANCE,
			SKILL_ID_RENOVATIO, SKILL_ID_SECRAMENT, SKILL_ID_EXPIATIO,
			SKILL_ID_ORATIO, SKILL_ID_JUDEX, SKILL_ID_ADORAMUS,
			SKILL_ID_SILENTIUM, SKILL_ID_DUPLELIGHT, SKILL_ID_EUCHARISTICA,
			SKILL_ID_OFFERTORIUM, SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE,
			SKILL_ID_MACE_SHUREN, SKILL_ID_MEDITATIO,
			SKILL_ID_EUCHARISTICA, SKILL_ID_DUPLELIGHT,
			SKILL_ID_EXPIATIO, SKILL_ID_MANA_RECHARGE,
			SKILL_ID_OFFERTORIUM, SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_HEAL,
			SKILL_ID_HOLY_LIGHT,
			SKILL_ID_RUWACH,
			SKILL_ID_TURN_UNDEAD,
			SKILL_ID_RESURRECTION,
			SKILL_ID_MAGNUS_EXORCISMUS,
			SKILL_ID_SANCTUARY,
			SKILL_ID_HOLY_LIGHT_TAMASHI,
			SKILL_ID_JUDEX,
			SKILL_ID_ADORAMUS,
			SKILL_ID_HIGHNESS_HEAL,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ACOLYTE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ACOLYTE,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_ASSASIN_PRIEST,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_TYPE_BOOK,
			ITEM_EQPFLG_SERIES_PRIEST,
			ITEM_EQPFLG_SERIES_HIGH_PRIEST,
			ITEM_EQPFLG_ARCBISHOP,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_RANGER"
		))
		.AddNameKana("レンジャー", "レンジャー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(1200)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 144)
		.AddWeaponAspd(ITEM_KIND_BOW, 154)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_DEX],
			[2, PARAM_INT],
			[3, PARAM_INT],
			[4, PARAM_AGI],
			[7, PARAM_AGI],
			[8, PARAM_DEX],
			[9, PARAM_INT],
			[12, PARAM_VIT],
			[13, PARAM_VIT],
			[14, PARAM_VIT],
			[17, PARAM_DEX],
			[18, PARAM_AGI],
			[21, PARAM_INT],
			[22, PARAM_VIT],
			[23, PARAM_DEX],
			[26, PARAM_STR],
			[27, PARAM_STR],
			[30, PARAM_DEX],
			[31, PARAM_AGI],
			[32, PARAM_VIT],
			[36, PARAM_INT],
			[37, PARAM_INT],
			[38, PARAM_INT],
			[39, PARAM_AGI],
			[43, PARAM_AGI],
			[44, PARAM_DEX],
			[45, PARAM_AGI],
			[49, PARAM_INT],
			[50, PARAM_AGI],
			[51, PARAM_LUK],
			[52, PARAM_DEX],
			[54, PARAM_INT],
			[55, PARAM_AGI],
			[57, PARAM_VIT],
			[58, PARAM_LUK],
			[59, PARAM_DEX],
			[60, PARAM_AGI],
			[61, PARAM_AGI],
			[63, PARAM_VIT],
			[65, PARAM_LUK],
			[66, PARAM_AGI],
			[68, PARAM_VIT],
			[70, PARAM_LUK],
		])

		.SetHpArray([
			  4000,
			  4085,  4170,  4255,  4340,  4425,  4510,  4595,  4680,  4800,  4828,
			  4918,  5009,  5101,  5194,  5288,  5382,  5477,  5573,  5670,  5768,
			  5867,  5967,  6068,  6170,  6273,  6377,  6482,  6588,  6694,  6801,
			  6909,  7018,  7128,  7239,  7351,  7464,  7578,  7693,  7809,  7926,
			  8044,  8162,  8281,  8401,  8522,  8644,  8767,  8891,  9016,  9142,
			  9269,  9397,  9526,  9656,  9786,  9917, 10049, 10182, 10316, 10451,
			 10585, 10719, 10853, 10987, 11121, 11255, 11389, 11523, 11657, 11790,
			 11926, 12063, 12201, 12340, 12480, 12621, 12763, 12906, 13050, 13195,
			 13341, 13488, 13636, 13785, 13935, 14088, 14384, 14657, 14965, 15280,
			 15493, 15757, 16040, 16281, 16607, 16607, 16607, 16925, 16925, 16925,
			 16925, 16925, 16925, 16925, 16925, 16925, 16925, 17985, 18091, 18197,
		])

		.SetSpArray([
			   363,
			   368,   372,   377,   381,   386,   390,   395,   399,   400,   410,
			   414,   418,   422,   426,   430,   434,   438,   442,   446,   450,
			   454,   458,   462,   466,   470,   474,   478,   482,   486,   490,
			   494,   498,   502,   506,   510,   514,   518,   522,   526,   530,
			   534,   538,   542,   546,   550,   554,   558,   562,   566,   570,
			   574,   578,   582,   586,   590,   594,   598,   602,   606,   610,
			   650,   675,   680,   695,   710,   725,   740,   765,   770,   785,
			   790,   795,   800,   805,   810,   816,   822,   828,   834,   840,
			   847,   854,   861,   868,   875,   881,   887,   893,   899,   906,
			   912,   918,   924,   931,   937,   937,   937,   955,   955,   955,
			   955,   955,   955,   955,   955,   955,   955,  1015,  1021,  1027,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_DOUBLE_STRAFING, SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YA_SAKUSEI, SKILL_ID_SKID_TRAP, SKILL_ID_ANKLESNARE,
			SKILL_ID_FREEZING_TRAP, SKILL_ID_FLASHER, SKILL_ID_SANDMAN,
			SKILL_ID_LAND_MINE, SKILL_ID_BLAST_MINE, SKILL_ID_CLAYMORE_TRAP,
			SKILL_ID_SHOCKWAVE_TRAP, SKILL_ID_REMOVE_TRAP, SKILL_ID_TALKIE_BOX,
			SKILL_ID_BEAST_BANE, SKILL_ID_FALCON_MASTERY, SKILL_ID_DETECTING,
			SKILL_ID_BLITZ_BEAT, SKILL_ID_STEEL_CROW, SKILL_ID_SPRING_TRAP,
			SKILL_ID_FANTASMIC_ARROW, SKILL_ID_TRUE_SIGHT, SKILL_ID_WIND_WALK,
			SKILL_ID_SHARP_SHOOTING, SKILL_ID_FALCON_ASSALT, SKILL_ID_RANGER_MAIN,
			SKILL_ID_CAMOUFLAGE, SKILL_ID_TRAP_KENKYU, SKILL_ID_MAGENTA_TRAP,
			SKILL_ID_COBALT_TRAP, SKILL_ID_VERDURE_TRAP, SKILL_ID_MAZE_TRAP,
			SKILL_ID_CLUSTER_BOMB, SKILL_ID_DETONATOR, SKILL_ID_ELECTRIC_SHOCKER,
			SKILL_ID_FIRING_TRAP, SKILL_ID_ICEBOUND_TRAP, SKILL_ID_FEAR_BLEATH,
			SKILL_ID_AIMED_BOLT, SKILL_ID_ARROW_STORM, SKILL_ID_WUG_MASTERY,
			SKILL_ID_TOOTH_OF_WUG, SKILL_ID_WUG_STRIKE, SKILL_ID_WUG_RIDER,
			SKILL_ID_EIBINNA_KYUKAKU, SKILL_ID_WUG_BITE, SKILL_ID_WUG_DASH,
			SKILL_ID_UNLIMIT, SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME,
			SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_BEAST_BANE,
			SKILL_ID_BLITZ_BEAT, SKILL_ID_STEEL_CROW,
			SKILL_ID_TRUE_SIGHT, SKILL_ID_WIND_WALK,
			SKILL_ID_HUNTERNO_TAMASHI_KOKA, SKILL_ID_RANGER_MAIN,
			SKILL_ID_TRAP_KENKYU, SKILL_ID_TOOTH_OF_WUG,
			SKILL_ID_AUTO_WUG, SKILL_ID_FEAR_BLEATH,
			SKILL_ID_CAMOUFLAGE, SKILL_ID_UNLIMIT,
			SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_FANTASMIC_ARROW,
			SKILL_ID_BLITZ_BEAT,
			SKILL_ID_LAND_MINE,
			SKILL_ID_FREEZING_TRAP,
			SKILL_ID_BLAST_MINE,
			SKILL_ID_CLAYMORE_TRAP,
			SKILL_ID_BEAST_STRAIFING,
			SKILL_ID_FALCON_ASSALT,
			SKILL_ID_SHARP_SHOOTING,
			SKILL_ID_AIMED_BOLT,
			SKILL_ID_ARROW_STORM,
			SKILL_ID_CLUSTER_BOMB,
			SKILL_ID_FIRING_TRAP,
			SKILL_ID_ICEBOUND_TRAP,
			SKILL_ID_WUG_STRIKE,
			SKILL_ID_WUG_BITE,
			SKILL_ID_EIBINNA_KYUKAKU,
			SKILL_ID_WUG_DASH,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ARCHER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ARCHER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_RENDO,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_HUNTER_ROGUE,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_HUNTER,
			ITEM_EQPFLG_SERIES_SNIPER,
			ITEM_EQPFLG_RANGER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_WARLOCK"
		))
		.AddNameKana("ウォーロック", "ウォーロック")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(1000)

		.AddWeaponAspd(ITEM_KIND_NONE, 149)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 143)
		.AddWeaponAspd(ITEM_KIND_STUFF, 145)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 140)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[2, PARAM_INT],
			[3, PARAM_DEX],
			[6, PARAM_DEX],
			[7, PARAM_INT],
			[8, PARAM_AGI],
			[12, PARAM_INT],
			[13, PARAM_DEX],
			[15, PARAM_VIT],
			[18, PARAM_VIT],
			[19, PARAM_DEX],
			[20, PARAM_AGI],
			[23, PARAM_INT],
			[24, PARAM_VIT],
			[25, PARAM_VIT],
			[28, PARAM_DEX],
			[29, PARAM_AGI],
			[31, PARAM_LUK],
			[34, PARAM_STR],
			[35, PARAM_INT],
			[36, PARAM_INT],
			[39, PARAM_DEX],
			[40, PARAM_AGI],
			[41, PARAM_INT],
			[44, PARAM_INT],
			[45, PARAM_INT],
			[47, PARAM_AGI],
			[50, PARAM_INT],
			[51, PARAM_DEX],
			[52, PARAM_VIT],
			[53, PARAM_LUK],
			[54, PARAM_AGI],
			[55, PARAM_INT],
			[57, PARAM_VIT],
			[58, PARAM_AGI],
			[59, PARAM_DEX],
			[60, PARAM_INT],
			[62, PARAM_INT],
			[63, PARAM_LUK],
			[65, PARAM_VIT],
			[67, PARAM_INT],
			[68, PARAM_LUK],
			[70, PARAM_VIT],
		])

		.SetHpArray([
			  2632,
			  2699,  2765,  2831,  2897,  2963,  3029,  3095,  3161,  3200,  3313,
			  3383,  3455,  3528,  3601,  3675,  3749,  3824,  3899,  3975,  4051,
			  4129,  4208,  4287,  4367,  4447,  4528,  4609,  4691,  4773,  4857,
			  4941,  5026,  5112,  5198,  5285,  5372,  5460,  5548,  5638,  5728,
			  5819,  5911,  6003,  6096,  6189,  6283,  6377,  6473,  6569,  6666,
			  6763,  6861,  6960,  7059,  7159,  7259,  7361,  7463,  7566,  7669,
			  7771,  7874,  7976,  8079,  8181,  8284,  8386,  8489,  8591,  8730,
			  8891,  9053,  9216,  9380,  9545,  9711,  9878, 10046, 10215, 10385,
			 10556, 10728, 10901, 11075, 11250, 11610, 11900, 12222, 12564, 12865,
			 13251, 13556, 13990, 14382, 14755, 14915, 15075, 15235, 15395, 15555,
			 15715, 15875, 16034, 16195, 16355, 16515, 16675, 16835, 16995, 17155,
		])

		.SetSpArray([
			   819,
			   828,   837,   846,   855,   864,   873,   882,   892,   900,  1500,
			   919,   928,   937,   946,   955,   964,   973,   982,   991,  1000,
			  1009,  1018,  1027,  1036,  1045,  1054,  1063,  1072,  1081,  1090,
			  1099,  1108,  1117,  1126,  1135,  1144,  1153,  1162,  1171,  1180,
			  1189,  1198,  1207,  1216,  1225,  1234,  1243,  1252,  1261,  1270,
			  1279,  1288,  1297,  1306,  1315,  1324,  1333,  1342,  1351,  1360,
			  1369,  1378,  1387,  1396,  1405,  1414,  1423,  1432,  1441,  1450,
			  1460,  1470,  1480,  1490,  1500,  1511,  1522,  1533,  1544,  1555,
			  1567,  1579,  1591,  1603,  1615,  1627,  1640,  1653,  1665,  1678,
			  1691,  1704,  1717,  1730,  1744,  1749,  1754,  1759,  1764,  1769,
			  1774,  1779,  1784,  1789,  1794,  1799,  1804,  1809,  1814,  1819,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT, SKILL_ID_FROST_DIVER, SKILL_ID_SIGHT,
			SKILL_ID_LIGHTNING_BOLT, SKILL_ID_THUNDER_STORM, SKILL_ID_STONE_CURSE,
			SKILL_ID_NAPALM_BEAT, SKILL_ID_SOUL_STRIKE, SKILL_ID_SAFETY_WALL,
			SKILL_ID_SP_KAIFUKURYOKU_KOZYO, SKILL_ID_ENERGY_COAT, SKILL_ID_MONSTER_ZYOHO,
			SKILL_ID_FIRE_PILLAR, SKILL_ID_SIGHT_RASHER, SKILL_ID_METEOR_STORM,
			SKILL_ID_FROST_NOVA, SKILL_ID_WATER_BALL, SKILL_ID_STORM_GUST,
			SKILL_ID_ICE_WALL, SKILL_ID_JUPITER_THUNDER, SKILL_ID_LORD_OF_VERMILLION,
			SKILL_ID_EARTH_SPIKE, SKILL_ID_HEAVENS_DRIVE, SKILL_ID_QUAGMIRE,
			SKILL_ID_SIGHT_BLASTER, SKILL_ID_MAHORYOKU_ZOFUKU, SKILL_ID_SOUL_DRAIN,
			SKILL_ID_MAGIC_CRUSHER, SKILL_ID_NAPALM_VULKAN, SKILL_ID_GRAVITATION_FIELD,
			SKILL_ID_GANBANTEIN, SKILL_ID_RADIUS, SKILL_ID_RECOGNIZED_SPELL,
			SKILL_ID_CRYMSON_ROCK, SKILL_ID_HELL_INFERNO, SKILL_ID_COMMET,
			SKILL_ID_FROST_MISTY, SKILL_ID_JACK_FROST, SKILL_ID_CHAIN_LIGHTNING,
			SKILL_ID_SIENNA_EXEXRATE, SKILL_ID_EARTH_STRAIN, SKILL_ID_MARSH_OF_ABYSS,
			SKILL_ID_WHITE_IN_PRISON, SKILL_ID_SOUL_EXPANSION, SKILL_ID_DRAIN_LIFE,
			SKILL_ID_STASIS, SKILL_ID_TETRA_BOLTEX, SKILL_ID_SUMMON_FIRE_BALL,
			SKILL_ID_SUMMON_WATER_BALL, SKILL_ID_SUMMON_LIGHTNING_BALL, SKILL_ID_SUMMON_STONE,
			SKILL_ID_RELEASE, SKILL_ID_FREEZING_SPELL, SKILL_ID_READING_SPELLBOOK,
			SKILL_ID_TELECHINESIS_INSTENCE, SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_ENERGY_COAT, SKILL_ID_SOUL_DRAIN,
			SKILL_ID_MAHORYOKU_ZOFUKU, SKILL_ID_RADIUS,
			SKILL_ID_RECOGNIZED_SPELL, SKILL_ID_TELECHINESIS_INSTENCE,
			SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
			SKILL_ID_FIRE_PILLAR,
			SKILL_ID_SIGHT_RASHER,
			SKILL_ID_METEOR_STORM,
			SKILL_ID_JUPITER_THUNDER,
			SKILL_ID_LORD_OF_VERMILLION,
			SKILL_ID_WATER_BALL,
			SKILL_ID_FROST_NOVA,
			SKILL_ID_STORM_GUST,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_HEAVENS_DRIVE,
			SKILL_ID_MAGIC_CRUSHER,
			SKILL_ID_NAPALM_VULKAN,
			SKILL_ID_GRAVITATION_FIELD,
			SKILL_ID_SOUL_EXPANSION,
			SKILL_ID_FROST_MISTY,
			SKILL_ID_JACK_FROST,
			SKILL_ID_DRAIN_LIFE,
			SKILL_ID_CRYMSON_ROCK,
			SKILL_ID_HELL_INFERNO,
			SKILL_ID_COMMET,
			SKILL_ID_CHAIN_LIGHTNING,
			SKILL_ID_EARTH_STRAIN,
			SKILL_ID_TETRA_BOLTEX,
			SKILL_ID_SUMMON_FIRE_BALL,
			SKILL_ID_SUMMON_WATER_BALL,
			SKILL_ID_SUMMON_LIGHTNING_BALL,
			SKILL_ID_SUMMON_STONE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_WIZARD_LINKER,
			ITEM_EQPFLG_SERIES_HIGH_WIZARD,
			ITEM_EQPFLG_WARLOCK,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_MECHANIC"
		))
		.AddNameKana("メカニック", "メカニック")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(1800)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 147)
		.AddWeaponAspd(ITEM_KIND_SWORD, 146)
		.AddWeaponAspd(ITEM_KIND_AXE, 145)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 142)
		.AddWeaponAspd(ITEM_KIND_CLUB, 146)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 4)

		.SetJobBonusArray([
			[1, PARAM_LUK],
			[2, PARAM_STR],
			[5, PARAM_STR],
			[7, PARAM_LUK],
			[8, PARAM_AGI],
			[9, PARAM_DEX],
			[10, PARAM_INT],
			[13, PARAM_INT],
			[14, PARAM_LUK],
			[17, PARAM_AGI],
			[19, PARAM_VIT],
			[20, PARAM_VIT],
			[21, PARAM_INT],
			[22, PARAM_DEX],
			[25, PARAM_VIT],
			[26, PARAM_LUK],
			[29, PARAM_VIT],
			[31, PARAM_STR],
			[32, PARAM_STR],
			[33, PARAM_VIT],
			[34, PARAM_LUK],
			[37, PARAM_INT],
			[38, PARAM_INT],
			[42, PARAM_VIT],
			[43, PARAM_VIT],
			[44, PARAM_STR],
			[45, PARAM_STR],
			[48, PARAM_DEX],
			[49, PARAM_AGI],
			[51, PARAM_LUK],
			[52, PARAM_STR],
			[53, PARAM_DEX],
			[55, PARAM_INT],
			[56, PARAM_VIT],
			[57, PARAM_AGI],
			[59, PARAM_DEX],
			[60, PARAM_STR],
			[61, PARAM_STR],
			[64, PARAM_VIT],
			[65, PARAM_AGI],
			[66, PARAM_STR],
			[69, PARAM_VIT],
			[70, PARAM_AGI],
		])

		.SetHpArray([
			  4214,
			  4303,  4392,  4481,  4570,  4659,  4748,  4837,  4926,  5807,  5844,
			  5952,  6061,  6172,  6283,  6396,  6510,  6625,  6741,  6857,  6974,
			  7093,  7212,  7333,  7455,  7578,  7702,  7828,  7954,  8081,  8208,
			  8337,  8467,  8598,  8730,  8864,  8998,  9134,  9271,  9408,  9546,
			  9685,  9825,  9967, 10109, 10253, 10398, 10544, 10691, 10838, 10987,
			 11136, 11287, 11439, 11592, 11746, 11901, 12057, 12215, 12372, 12531,
			 12688, 12845, 13003, 13160, 13318, 13475, 13633, 13790, 13948, 14105,
			 14266, 14428, 14591, 14755, 14920, 15086, 15253, 15421, 15590, 15760,
			 15931, 16103, 16276, 16450, 16625, 16941, 17195, 17401, 17645, 17927,
			 18160, 18360, 18654, 18971, 19256, 19362, 19468, 19574, 19680, 19786,
			 19892, 19998, 20104, 20210, 20316, 20422, 20528, 20634, 20740, 20846,
		])

		.SetSpArray([
			   363,
			   368,   372,   377,   381,   386,   390,   395,   399,   400,   410,
			   414,   418,   422,   426,   430,   434,   438,   442,   446,   450,
			   454,   458,   462,   466,   470,   474,   478,   482,   486,   490,
			   494,   498,   502,   506,   510,   514,   518,   522,   526,   530,
			   534,   538,   542,   546,   550,   554,   558,   562,   566,   570,
			   574,   578,   582,   586,   590,   594,   598,   602,   606,   610,
			   700,   760,   820,   880,   930,   965,  1020,  1132,  1160,  1230,
			  1235,  1240,  1245,  1250,  1255,  1261,  1267,  1273,  1279,  1285,
			  1292,  1299,  1306,  1313,  1320,  1330,  1339,  1349,  1358,  1368,
			  1378,  1388,  1398,  1408,  1418,  1422,  1426,  1430,  1434,  1438,
			  1442,  1446,  1450,  1454,  1458,  1462,  1466,  1470,  1474,  1478,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_SHOZIGENKAIRYO_ZOKA, SKILL_ID_DISCOUNT, SKILL_ID_OVER_CHARGE,
			SKILL_ID_PUSH_CART, SKILL_ID_ITEM_KANTE, SKILL_ID_ROTEN_KAISETSU,
			SKILL_ID_MAMMONITE, SKILL_ID_LOUD_VOICE, SKILL_ID_CHANGE_CART,
			SKILL_ID_CART_REVOLUTION, SKILL_ID_TETSU_SEIZO, SKILL_ID_KOTETSU_SEIZO,
			SKILL_ID_ZOKUSEISEKI_SEIZO, SKILL_ID_ORIDEOCON_KENKYU, SKILL_ID_TANKEN_SEISAKU,
			SKILL_ID_KEN_SEISAKU, SKILL_ID_RYOTEKEN_SEISAKU, SKILL_ID_ONO_SEISAKU,
			SKILL_ID_MACE_SEISAKU, SKILL_ID_KNUCKLE_SEISAKU, SKILL_ID_YARI_SEISAKU,
			SKILL_ID_HILT_BINDING, SKILL_ID_SKIN_TEMPERING, SKILL_ID_KOSEKI_HAKKEN,
			SKILL_ID_BUKI_SHURI, SKILL_ID_BUKI_KENKYU, SKILL_ID_HAMMER_FALL,
			SKILL_ID_ADRENALINE_RUSH, SKILL_ID_WEAPON_PERFECTION, SKILL_ID_OVER_TRUST,
			SKILL_ID_MAXIMIZE_POWER, SKILL_ID_GREED, SKILL_ID_FAKE_ZENY,
			SKILL_ID_OVER_TRUST_MAX, SKILL_ID_CART_BOOST_WS, SKILL_ID_CART_TERMINATION,
			SKILL_ID_MELTDOWN, SKILL_ID_BUKISEIREN, SKILL_ID_ONO_SHUREN_MECHANIC,
			SKILL_ID_AXE_TORNADE, SKILL_ID_AXE_BOOMERANG, SKILL_ID_POWER_SWING,
			SKILL_ID_FAW_SILVER_SNIPER, SKILL_ID_FAW_MAGIC_DECOY, SKILL_ID_FAW_KAIZYO,
			SKILL_ID_HITO_DAICHINO_KENKYU, SKILL_ID_MADOGEAR_LICENSE, SKILL_ID_BOOST_KNUCKLE,
			SKILL_ID_PILE_BUNKER, SKILL_ID_VULCAN_ARM, SKILL_ID_ARMS_CANNON,
			SKILL_ID_FLAME_THROWER, SKILL_ID_COLD_THROWER, SKILL_ID_ACCELARATION,
			SKILL_ID_HOVERING, SKILL_ID_FRONTSIDE_SLIDE, SKILL_ID_REARSIDE_SLIDE,
			SKILL_ID_MAINFRAME_KAIZO, SKILL_ID_SHAPE_SHIFT, SKILL_ID_INFRARED_SCAN,
			SKILL_ID_ANALYZE, SKILL_ID_SELF_DESTRUCTION, SKILL_ID_EMERGENCY_COOL,
			SKILL_ID_MAGNETIC_FIELD, SKILL_ID_NUTRAL_BARRIER, SKILL_ID_STEALTH_FIELD,
			SKILL_ID_REPEAR, SKILL_ID_MAGMA_ILLUPTION, SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_LOUD_VOICE, SKILL_ID_HILT_BINDING,
			SKILL_ID_BUKI_KENKYU, SKILL_ID_SKIN_TEMPERING,
			SKILL_ID_ADRENALINE_RUSH, SKILL_ID_WEAPON_PERFECTION,
			SKILL_ID_OVER_TRUST, SKILL_ID_MAXIMIZE_POWER,
			SKILL_ID_OVER_TRUST_MAX, SKILL_ID_FULL_ADRENALINE_RUSH,
			SKILL_ID_ONO_SHUREN_MECHANIC, SKILL_ID_HITO_DAICHINO_KENKYU,
			SKILL_ID_MADOGEAR, SKILL_ID_MADOGEAR_LICENSE,
			SKILL_ID_MAINFRAME_KAIZO, SKILL_ID_SHAPE_SHIFT,
			SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_MAMMONITE,
			SKILL_ID_CART_REVOLUTION,
			SKILL_ID_CART_TERMINATION,
			SKILL_ID_AXE_BOOMERANG,
			SKILL_ID_AXE_TORNADE,
			SKILL_ID_POWER_SWING,
			SKILL_ID_MAGMA_ILLUPTION,
			SKILL_ID_SELF_DESTRUCTION,
			SKILL_ID_SELF_DESTRUCTION_MAX,
			SKILL_ID_BOOST_KNUCKLE,
			SKILL_ID_VULCAN_ARM,
			SKILL_ID_FLAME_THROWER,
			SKILL_ID_COLD_THROWER,
			SKILL_ID_ARMS_CANNON,
			SKILL_ID_PILE_BUNKER,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MARCHANT,
			ITEM_EQPFLG_SERIES_UPPER_OF_MARCHANT,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_SERIES_BLACKSMITH,
			ITEM_EQPFLG_SERIES_WHITESMITH,
			ITEM_EQPFLG_MECHANIC,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_ROYALGUARD"
		))
		.AddNameKana("ロイヤルガード", "ロイヤルガード")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(1500)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 151)
		.AddWeaponAspd(ITEM_KIND_SWORD, 151)
		.AddWeaponAspd(ITEM_KIND_SWORD_2HAND, 144)
		.AddWeaponAspd(ITEM_KIND_SPEAR, 142)
		.AddWeaponAspd(ITEM_KIND_SPEAR_2HAND, 142)
		.AddWeaponAspd(ITEM_KIND_AXE, 141)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 139)
		.AddWeaponAspd(ITEM_KIND_CLUB, 140)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[2, PARAM_VIT],
			[3, PARAM_INT],
			[4, PARAM_STR],
			[5, PARAM_INT],
			[6, PARAM_DEX],
			[9, PARAM_VIT],
			[11, PARAM_INT],
			[13, PARAM_STR],
			[14, PARAM_DEX],
			[16, PARAM_LUK],
			[19, PARAM_INT],
			[20, PARAM_DEX],
			[23, PARAM_AGI],
			[24, PARAM_INT],
			[26, PARAM_INT],
			[27, PARAM_VIT],
			[30, PARAM_STR],
			[31, PARAM_DEX],
			[33, PARAM_LUK],
			[34, PARAM_AGI],
			[37, PARAM_INT],
			[38, PARAM_INT],
			[40, PARAM_STR],
			[41, PARAM_VIT],
			[42, PARAM_VIT],
			[44, PARAM_DEX],
			[45, PARAM_STR],
			[46, PARAM_INT],
			[48, PARAM_STR],
			[49, PARAM_DEX],
			[51, PARAM_AGI],
			[53, PARAM_VIT],
			[54, PARAM_LUK],
			[56, PARAM_DEX],
			[58, PARAM_STR],
			[59, PARAM_VIT],
			[60, PARAM_INT],
			[62, PARAM_DEX],
			[64, PARAM_VIT],
			[65, PARAM_STR],
			[67, PARAM_DEX],
			[69, PARAM_VIT],
			[70, PARAM_STR],
		])

		.SetHpArray([
			  5029,
			  5138,  5247,  5356,  5465,  5574,  5683,  5792,  5901,  6050,  6093,
			  6208,  6324,  6441,  6559,  6678,  6798,  6920,  7043,  7167,  7292,
			  7418,  7545,  7673,  7802,  7932,  8063,  8196,  8330,  8465,  8601,
			  8738,  8876,  9015,  9155,  9296,  9438,  9582,  9727,  9873, 10020,
			 10168, 10317, 10467, 10618, 10770, 10923, 11078, 11234, 11391, 11549,
			 11708, 11868, 12029, 12191, 12354, 12518, 12684, 12851, 13019, 13188,
			 13355, 13522, 13690, 13857, 14025, 14192, 14360, 14527, 14695, 14860,
			 15021, 15183, 15346, 15510, 15675, 15841, 16008, 16176, 16345, 16515,
			 16686, 16858, 17031, 17205, 17380, 17693, 17870, 18031, 18301, 18594,
			 18891, 19175, 19405, 19657, 20011, 20171, 20331, 20491, 20651, 20811,
			 20971, 21131, 21291, 21451, 21611, 21771, 21931, 22091, 22251, 22411,
		])

		.SetSpArray([
			   363,
			   368,   372,   377,   381,   386,   390,   395,   399,   400,   410,
			   414,   418,   422,   426,   430,   434,   438,   442,   446,   450,
			   454,   458,   462,   466,   470,   474,   478,   482,   486,   490,
			   494,   498,   502,   506,   510,   514,   518,   522,   526,   530,
			   534,   538,   542,   546,   550,   554,   558,   562,   566,   570,
			   574,   578,   582,   586,   590,   594,   598,   602,   606,   610,
			   700,   760,   820,   880,   930,   965,  1020,  1132,  1160,  1230,
			  1235,  1240,  1245,  1250,  1255,  1261,  1267,  1273,  1279,  1285,
			  1292,  1299,  1306,  1313,  1320,  1326,  1333,  1339,  1346,  1352,
			  1358,  1365,  1372,  1378,  1385,  1389,  1393,  1397,  1401,  1405,
			  1409,  1413,  1417,  1421,  1425,  1429,  1433,  1437,  1441,  1445,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN, SKILL_ID_HP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_BASH, SKILL_ID_MAGNUM_BREAK, SKILL_ID_PROVOKE,
			SKILL_ID_ENDURE, SKILL_ID_IDOZI_HP_KAIFUKU, SKILL_ID_KYUSHO_KOGEKI,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_YARI_SHUREN, SKILL_ID_SPEAR_QUICKEN,
			SKILL_ID_FAITH, SKILL_ID_HOLY_CROSS, SKILL_ID_GRAND_CROSS,
			SKILL_ID_SHIELD_CHARGE, SKILL_ID_SHIELD_BOOMERANG, SKILL_ID_REFLECT_SHIELD,
			SKILL_ID_AUTO_GUARD, SKILL_ID_DEFENDER, SKILL_ID_DEBOTION,
			SKILL_ID_RIDING, SKILL_ID_KIHE_SHUREN, SKILL_ID_HEAL,
			SKILL_ID_CURE, SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE,
			SKILL_ID_PROVIDENCE, SKILL_ID_SHRINK, SKILL_ID_SHIELD_CHAIN,
			SKILL_ID_PRESSURE, SKILL_ID_SACRIFICE, SKILL_ID_GOSPEL,
			SKILL_ID_MOON_SLUSHER, SKILL_ID_BANISHING_POINT, SKILL_ID_EXCEED_BREAK,
			SKILL_ID_PINGPOINT_ATTACK, SKILL_ID_CANNON_SPEAR, SKILL_ID_OVER_BLAND,
			SKILL_ID_SHIELD_PRESS, SKILL_ID_SHIELD_SPELL, SKILL_ID_REFLECT_DAMAGE,
			SKILL_ID_EARTH_DRIVE, SKILL_ID_RAY_OF_GENESIS, SKILL_ID_PIETY,
			SKILL_ID_INSPIRATION, SKILL_ID_TRUMPLE, SKILL_ID_PRESTAGE,
			SKILL_ID_FORCE_OF_BANGUARD, SKILL_ID_RAGE_BURST_ATTACK, SKILL_ID_BANDING,
			SKILL_ID_HESPERUS_SLIT, SKILL_ID_KINGS_GRACE, SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_FAITH,
			SKILL_ID_YARI_SHUREN, SKILL_ID_SPEAR_QUICKEN,
			SKILL_ID_DEMON_BANE, SKILL_ID_DIVINE_PROTECTION,
			SKILL_ID_AUTO_GUARD_OLD, SKILL_ID_KIHE_SHUREN,
			SKILL_ID_DEFENDER, SKILL_ID_ENDURE,
			SKILL_ID_REFLECT_SHIELD, SKILL_ID_SHIELD_SPELL_REFLECT,
			SKILL_ID_SHIELD_SPELL_ATK_PLUS, SKILL_ID_SHIELD_SPELL_DEF_PLUS,
			SKILL_ID_INSPIRATION, SKILL_ID_FORCE_OF_BANGUARD,
			SKILL_ID_PRESTAGE, SKILL_ID_SKILL_LV_DEFENDER_FOR_PRESTAGE,
			SKILL_ID_BANDING, SKILL_ID_COUNT_OF_RG_FOR_BANDING,
			SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
			SKILL_ID_SHIELD_CHARGE,
			SKILL_ID_SHIELD_BOOMERANG,
			SKILL_ID_SHIELD_BOOMERANG_TAMASHI,
			SKILL_ID_HOLY_CROSS,
			SKILL_ID_GRAND_CROSS,
			SKILL_ID_HEAL,
			SKILL_ID_PRESSURE,
			SKILL_ID_SACRIFICE,
			SKILL_ID_SHIELD_CHAIN,
			SKILL_ID_CANNON_SPEAR,
			SKILL_ID_BANISHING_POINT,
			SKILL_ID_SHIELD_PRESS,
			SKILL_ID_PINGPOINT_ATTACK,
			SKILL_ID_RAGE_BURST_ATTACK,
			SKILL_ID_EXCEED_BREAK,
			SKILL_ID_OVER_BLAND,
			SKILL_ID_MOON_SLUSHER,
			SKILL_ID_RAY_OF_GENESIS,
			SKILL_ID_EARTH_DRIVE,
			SKILL_ID_HESPERUS_SLIT,
			SKILL_ID_SHIELD_SPELL_LV_1,
			SKILL_ID_SHIELD_SPELL_LV_2,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_SWORDMAN,
			ITEM_EQPFLG_SERIES_UPPER_OF_SWORDMAN,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_MIRROR_SHIELD,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_SERIES_CRUSADER,
			ITEM_EQPFLG_SERIES_PALADIN,
			ITEM_EQPFLG_ROYALGUARD,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_SHADOWCHASER"
		))
		.AddNameKana("シャドウチェイサー", "シャドウチェイサー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(800)

		.AddWeaponAspd(ITEM_KIND_NONE, 153)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 152)
		.AddWeaponAspd(ITEM_KIND_SWORD, 144)
		.AddWeaponAspd(ITEM_KIND_AXE, -6)
		.AddWeaponAspd(ITEM_KIND_BOW, 148)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 4)

		.SetJobBonusArray([
			[1, PARAM_LUK],
			[2, PARAM_STR],
			[5, PARAM_STR],
			[7, PARAM_LUK],
			[8, PARAM_AGI],
			[9, PARAM_DEX],
			[10, PARAM_INT],
			[13, PARAM_INT],
			[14, PARAM_LUK],
			[17, PARAM_AGI],
			[19, PARAM_VIT],
			[20, PARAM_VIT],
			[21, PARAM_INT],
			[22, PARAM_DEX],
			[25, PARAM_VIT],
			[26, PARAM_LUK],
			[29, PARAM_VIT],
			[31, PARAM_STR],
			[32, PARAM_STR],
			[33, PARAM_VIT],
			[34, PARAM_LUK],
			[37, PARAM_INT],
			[38, PARAM_INT],
			[42, PARAM_VIT],
			[43, PARAM_VIT],
			[44, PARAM_STR],
			[45, PARAM_STR],
			[48, PARAM_DEX],
			[49, PARAM_AGI],
			[51, PARAM_INT],
			[52, PARAM_VIT],
			[53, PARAM_STR],
			[54, PARAM_AGI],
			[56, PARAM_LUK],
			[57, PARAM_DEX],
			[59, PARAM_STR],
			[60, PARAM_AGI],
			[62, PARAM_DEX],
			[63, PARAM_AGI],
			[65, PARAM_AGI],
			[67, PARAM_DEX],
			[68, PARAM_AGI],
			[70, PARAM_AGI],
		])

		.SetHpArray([
			  5029,
			  5138,  5247,  5356,  5465,  5574,  5683,  5792,  5901,  6050,  6093,
			  6208,  6324,  6441,  6559,  6678,  6798,  6920,  7043,  7167,  7292,
			  7418,  7545,  7673,  7802,  7932,  8063,  8196,  8330,  8465,  8601,
			  8738,  8876,  9015,  9155,  9296,  9438,  9582,  9727,  9873, 10020,
			 10168, 10317, 10467, 10618, 10770, 10923, 11078, 11234, 11391, 11549,
			 11708, 11868, 12029, 12191, 12354, 12518, 12684, 12851, 13019, 13188,
			 13300, 13420, 13500, 13600, 13700, 13800, 13900, 14000, 14100, 14200,
			 14301, 14403, 14506, 14610, 14715, 14821, 14928, 15036, 15145, 15255,
			 15366, 15478, 15591, 15705, 15820, 16152, 16475, 16772, 17124, 17415,
			 17816, 18047, 18282, 18684, 18964, 19092, 19220, 19348, 19476, 19604,
			 19732, 19860, 19988, 20116, 20244, 20372, 20500, 20628, 20756, 20884,
		])

		.SetSpArray([
			   363,
			   368,   372,   377,   381,   386,   390,   395,   399,   400,   410,
			   414,   418,   422,   426,   430,   434,   438,   442,   446,   450,
			   454,   458,   462,   466,   470,   474,   478,   482,   486,   490,
			   494,   498,   502,   506,   510,   514,   518,   522,   526,   530,
			   534,   538,   542,   546,   550,   554,   558,   562,   566,   570,
			   574,   578,   582,   586,   590,   594,   598,   602,   606,   610,
			   614,   618,   622,   626,   630,   634,   638,   642,   646,   650,
			   655,   660,   665,   670,   675,   681,   687,   693,   699,   705,
			   712,   719,   726,   733,   740,   753,   766,   780,   793,   807,
			   822,   836,   851,   866,   881,   889,   897,   905,   913,   921,
			   929,   937,   945,   953,   961,   969,   977,   985,   993,  1001,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_STEAL,
			SKILL_ID_HIDING, SKILL_ID_ENVENOM, SKILL_ID_GEDOKU,
			SKILL_ID_SUNAMAKI, SKILL_ID_ISHIHIROI, SKILL_ID_ISHINAGE,
			SKILL_ID_BACKSTEP, SKILL_ID_SNATCHER, SKILL_ID_STEAL_COIN,
			SKILL_ID_TUNNEL_DRIVE, SKILL_ID_BACK_STAB, SKILL_ID_SURPRISE_ATTACK,
			SKILL_ID_INTIMIDATE, SKILL_ID_CLONE_SKILL, SKILL_ID_STRIP_WEAPON,
			SKILL_ID_STRIP_SHIELD, SKILL_ID_STRIP_ARMER, SKILL_ID_STRIP_HELM,
			SKILL_ID_GRAPHITY, SKILL_ID_FLAG_GRAPHITY, SKILL_ID_CLEANER,
			SKILL_ID_GANGSTAR_PARADISE, SKILL_ID_COMPULSION_DISCOUNT, SKILL_ID_KEN_SHUREN,
			SKILL_ID_WASHINO_ME, SKILL_ID_DOUBLE_STRAFING, SKILL_ID_REMOVE_TRAP,
			SKILL_ID_CLOSE_CONFINE, SKILL_ID_CHASEWALK, SKILL_ID_REJECT_SWORD,
			SKILL_ID_PRESERVE, SKILL_ID_FULL_STRIP, SKILL_ID_BODY_PAINTING,
			SKILL_ID_MASKARADE_INOVATION, SKILL_ID_MASKARADE_GLOOMY, SKILL_ID_MASKARADE_IGNORANCE,
			SKILL_ID_MASKARADE_RAGENESS, SKILL_ID_MASKARADE_WEEKNESS, SKILL_ID_MASKARADE_UNLUCKY,
			SKILL_ID_SHADOW_FORM, SKILL_ID_DEADLY_INEFFECT, SKILL_ID_MANHOLE,
			SKILL_ID_DEMENSION_DOOR, SKILL_ID_BLOODY_LAST, SKILL_ID_CHAOS_PANIC,
			SKILL_ID_MAELSTORM, SKILL_ID_FAINT_BOMB, SKILL_ID_FATAL_MENUS,
			SKILL_ID_REPORDUCE, SKILL_ID_AUTO_SHADOW_SPELL, SKILL_ID_INVISIBILITY,
			SKILL_ID_STRIP_ACCESSARY, SKILL_ID_TRIANGLE_SHOT, SKILL_ID_ESCAPE,
			SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA,
			SKILL_ID_KEN_SHUREN, SKILL_ID_WASHINO_ME,
			SKILL_ID_CHASEWALK, SKILL_ID_REJECT_SWORD,
			SKILL_ID_SANDANSHO, SKILL_ID_CLOSE_CONFINE,
			SKILL_ID_INVISIBILITY, SKILL_ID_DUPLELIGHT,
			SKILL_ID_SHIELD_SPELL_ATK_PLUS, SKILL_ID_SHIELD_SPELL_DEF_PLUS,
			SKILL_ID_AUTO_SHADOW_SPELL, SKILL_ID_MAGIC_SETTING_FOR_AUTO_SHADOW_SPELL,
			SKILL_ID_SHIELD_SPELL_REFLECT, SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_ENVENOM,
			SKILL_ID_SUNAMAKI,
			SKILL_ID_ISHINAGE,
			SKILL_ID_BACK_STAB,
			SKILL_ID_SURPRISE_ATTACK,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_INTIMIDATE_FOR_CLONE,
			SKILL_ID_TRIANGLE_SHOT,
			SKILL_ID_FAINT_BOMB,
			SKILL_ID_FATAL_MENUS,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
			SKILL_ID_HEAL,
			SKILL_ID_HOLY_LIGHT,
			SKILL_ID_RUWACH,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
			SKILL_ID_MAMMONITE,
			SKILL_ID_BOWLING_BASH,
			SKILL_ID_CHARGE_ATTACK,
			SKILL_ID_VENOM_SPLASHER,
			SKILL_ID_VENOM_KNIFE,
			SKILL_ID_TURN_UNDEAD,
			SKILL_ID_RESURRECTION,
			SKILL_ID_MAGNUS_EXORCISMUS,
			SKILL_ID_SANCTUARY,
			SKILL_ID_FANTASMIC_ARROW,
			SKILL_ID_LAND_MINE,
			SKILL_ID_FREEZING_TRAP,
			SKILL_ID_BLAST_MINE,
			SKILL_ID_CLAYMORE_TRAP,
			SKILL_ID_FIRE_PILLAR,
			SKILL_ID_SIGHT_RASHER,
			SKILL_ID_METEOR_STORM,
			SKILL_ID_JUPITER_THUNDER,
			SKILL_ID_LORD_OF_VERMILLION,
			SKILL_ID_WATER_BALL_FOR_CLONE,
			SKILL_ID_FROST_NOVA,
			SKILL_ID_STORM_GUST,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_HEAVENS_DRIVE_FOR_CLONE,
			SKILL_ID_SHIELD_CHARGE,
			SKILL_ID_SHIELD_BOOMERANG,
			SKILL_ID_HOLY_CROSS,
			SKILL_ID_GRAND_CROSS,
			SKILL_ID_SHIDAN,
			SKILL_ID_HAKKEI,
			SKILL_ID_ASHURA_HAOKEN,
			SKILL_ID_ASHURA_HAOKEN_SPKOTEI,
			SKILL_ID_SUNKEI,
			SKILL_ID_ACID_TERROR,
			SKILL_ID_DEMONSTRATION,
			SKILL_ID_TEIOAPUCHAGI,
			SKILL_ID_KOUENKA,
			SKILL_ID_KAENZIN,
			SKILL_ID_RYUENZIN,
			SKILL_ID_HYOSENSO,
			SKILL_ID_TSURARAOTOSHI,
			SKILL_ID_FUZIN,
			SKILL_ID_RAIGEKISAI,
			SKILL_ID_SAKUFU,
			SKILL_ID_ZENI_NAGE,
			SKILL_ID_TATAMI_GAESHI,
			SKILL_ID_KASUMIGIRI,
			SKILL_ID_KAGEKIRI,
			SKILL_ID_TRIPLE_ACTION,
			SKILL_ID_BULLS_EYE,
			SKILL_ID_YOMIGAESHI,
			SKILL_ID_BAKURETSU_KUNAI,
			SKILL_ID_MUCHANAGE,
			SKILL_ID_TOMAHAWKNAGE,
			SKILL_ID_IGNITION_BREAK,
			SKILL_ID_WIND_CUTTER,
			SKILL_ID_SONIC_WAVE,
			SKILL_ID_CROSS_IMPACT,
			SKILL_ID_DARK_CRAW,
			SKILL_ID_JUDEX,
			SKILL_ID_ADORAMUS,
			SKILL_ID_HIGHNESS_HEAL,
			SKILL_ID_AIMED_BOLT,
			SKILL_ID_ARROW_STORM,
			SKILL_ID_CLUSTER_BOMB,
			SKILL_ID_FIRING_TRAP,
			SKILL_ID_ICEBOUND_TRAP,
			SKILL_ID_SOUL_EXPANSION,
			SKILL_ID_FROST_MISTY,
			SKILL_ID_JACK_FROST,
			SKILL_ID_DRAIN_LIFE,
			SKILL_ID_CRYMSON_ROCK,
			SKILL_ID_HELL_INFERNO,
			SKILL_ID_COMMET,
			SKILL_ID_CHAIN_LIGHTNING,
			SKILL_ID_EARTH_STRAIN,
			SKILL_ID_AXE_BOOMERANG,
			SKILL_ID_AXE_TORNADE,
			SKILL_ID_POWER_SWING,
			SKILL_ID_MAGMA_ILLUPTION,
			SKILL_ID_SHIELD_PRESS,
			SKILL_ID_RAY_OF_GENESIS,
			SKILL_ID_EARTH_DRIVE,
			SKILL_ID_SHIELD_SPELL_LV_1,
			SKILL_ID_SHIELD_SPELL_LV_2,
			SKILL_ID_SORYUKYAKU,
			SKILL_ID_SHURASHINDAN,
			SKILL_ID_RAIKODAN,
			SKILL_ID_BAKKISANDAN,
			SKILL_ID_TENRACHIMO,
			SKILL_ID_SISIKO,
			SKILL_ID_ZIRAISHIN,
			SKILL_ID_SENPUTAI,
			SKILL_ID_TENKETSU_MOKU,
			SKILL_ID_GOHO,
			SKILL_ID_RASETSU_HAOGEKI_MAX,
			SKILL_ID_RASETSU_HAOGEKI,
			SKILL_ID_HASAICHU,
			SKILL_ID_SEVERE_RAINSTORM,
			SKILL_ID_SEVERE_RAINSTORM_EX,
			SKILL_ID_SHINDOZANKYO,
			SKILL_ID_METALIC_SOUND,
			SKILL_ID_PSYCHIC_WAVE,
			SKILL_ID_CLOUD_KILL,
			SKILL_ID_POISON_BUSTER,
			SKILL_ID_EARTH_GRAVE,
			SKILL_ID_DIAMOND_DUST,
			SKILL_ID_VERATURE_SPEAR,
			SKILL_ID_FIRE_WALK,
			SKILL_ID_ELECTRIC_WALK,
			SKILL_ID_HELLS_PLANT,
			SKILL_ID_CRAZY_WEED,
			SKILL_ID_THORN_TRAP,
			SKILL_ID_BLOOD_SUCKER,
			SKILL_ID_SPORE_EXPLOSION,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_THIEF_NINJA,
			ITEM_EQPFLG_SERIES_UPPER_OF_THIEF,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_RENDO,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_SERIES_HUNTER_ROGUE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_ROGUE,
			ITEM_EQPFLG_SERIES_CHASER,
			ITEM_EQPFLG_SHADOWCHASER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_SHURA"
		))
		.AddNameKana("修羅", "シュラ")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(1000)

		.AddWeaponAspd(ITEM_KIND_NONE, 180)
		.AddWeaponAspd(ITEM_KIND_CLUB, 145)
		.AddWeaponAspd(ITEM_KIND_STUFF, 143)
		.AddWeaponAspd(ITEM_KIND_FIST, 178)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 143)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_AGI],
			[2, PARAM_DEX],
			[4, PARAM_STR],
			[5, PARAM_STR],
			[9, PARAM_STR],
			[10, PARAM_AGI],
			[11, PARAM_DEX],
			[14, PARAM_VIT],
			[15, PARAM_VIT],
			[16, PARAM_STR],
			[19, PARAM_VIT],
			[20, PARAM_STR],
			[23, PARAM_AGI],
			[24, PARAM_AGI],
			[25, PARAM_DEX],
			[28, PARAM_INT],
			[29, PARAM_INT],
			[30, PARAM_STR],
			[31, PARAM_VIT],
			[35, PARAM_AGI],
			[36, PARAM_DEX],
			[37, PARAM_DEX],
			[41, PARAM_INT],
			[42, PARAM_VIT],
			[43, PARAM_AGI],
			[44, PARAM_AGI],
			[48, PARAM_INT],
			[49, PARAM_DEX],
			[50, PARAM_DEX],
			[51, PARAM_STR],
			[53, PARAM_AGI],
			[54, PARAM_INT],
			[55, PARAM_LUK],
			[56, PARAM_VIT],
			[58, PARAM_DEX],
			[59, PARAM_STR],
			[60, PARAM_INT],
			[61, PARAM_STR],
			[63, PARAM_INT],
			[65, PARAM_AGI],
			[66, PARAM_STR],
			[68, PARAM_INT],
			[70, PARAM_AGI],
		])

		.SetHpArray([
			  4214,
			  4303,  4392,  4481,  4570,  4659,  4748,  4837,  4926,  5050,  5082,
			  5176,  5271,  5367,  5464,  5562,  5661,  5761,  5862,  5963,  6065,
			  6168,  6272,  6377,  6483,  6590,  6698,  6807,  6917,  7027,  7138,
			  7250,  7363,  7477,  7592,  7708,  7825,  7943,  8062,  8181,  8301,
			  8422,  8544,  8667,  8791,  8916,  9042,  9169,  9297,  9425,  9554,
			  9684,  9815,  9947, 10080, 10214, 10349, 10485, 10622, 10759, 10897,
			 11033, 11170, 11307, 11444, 11581, 11718, 11855, 11992, 12129, 12265,
			 12406, 12548, 12691, 12835, 12980, 13126, 13273, 13421, 13570, 13720,
			 13871, 14023, 14176, 14330, 14485, 14789, 15174, 15538, 15880, 16213,
			 16619, 16951, 17256, 17618, 17918, 18120, 18322, 18524, 18726, 18928,
			 19130, 19332, 19534, 19736, 19938, 20140, 20342, 20544, 20746, 20948,
		])

		.SetSpArray([
			   363,
			   368,   372,   377,   381,   386,   390,   395,   399,   400,   410,
			   414,   418,   422,   426,   430,   434,   438,   442,   446,   450,
			   454,   458,   462,   466,   470,   474,   478,   482,   486,   490,
			   494,   498,   502,   506,   510,   514,   518,   522,   526,   530,
			   534,   538,   542,   546,   550,   554,   558,   562,   566,   570,
			   574,   578,   582,   586,   590,   594,   598,   602,   606,   610,
			   614,   618,   622,   626,   630,   634,   638,   642,   646,   650,
			   655,   660,   665,   670,   675,   681,   687,   693,   699,   705,
			   712,   719,   726,   733,   740,   753,   765,   778,   792,   805,
			   819,   833,   847,   861,   880,   888,   896,   904,   912,   920,
			   928,   936,   944,   952,   960,   968,   976,   984,   992,  1000,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE, SKILL_ID_SIGNUM_CRUCIS,
			SKILL_ID_HEAL, SKILL_ID_CURE, SKILL_ID_ANGELUS,
			SKILL_ID_BLESSING, SKILL_ID_SOKUDO_ZOKA, SKILL_ID_SOKUDO_GENSHO,
			SKILL_ID_RUWACH, SKILL_ID_TELEPORT, SKILL_ID_WARP_PORTAL,
			SKILL_ID_PNEUMA, SKILL_ID_AQUA_BENEDICTA, SKILL_ID_HOLY_LIGHT,
			SKILL_ID_TEKKEN, SKILL_ID_KIKO, SKILL_ID_KIDATSU,
			SKILL_ID_SANDANSHO, SKILL_ID_RENDASHO, SKILL_ID_MORYUKEN,
			SKILL_ID_ASHURA_HAOKEN, SKILL_ID_MIKIRI, SKILL_ID_IBUKI,
			SKILL_ID_SHIDAN, SKILL_ID_HAKKEI, SKILL_ID_SHIRAHADORI,
			SKILL_ID_BAKURETSU_HADO, SKILL_ID_KONGO, SKILL_ID_ZANEI,
			SKILL_ID_SUNKEI, SKILL_ID_KIKO_TENI, SKILL_ID_RENKIKO,
			SKILL_ID_BUKKOKEN, SKILL_ID_RENCHUHOGEKI, SKILL_ID_MOKOKOHAZAN,
			SKILL_ID_SORYUKYAKU, SKILL_ID_TENRACHIMO, SKILL_ID_HASAICHU,
			SKILL_ID_DAITENHOSUI, SKILL_ID_GOHO, SKILL_ID_RASETSU_HAOGEKI,
			SKILL_ID_ZYUBAKUZIN, SKILL_ID_SENPUTAI, SKILL_ID_SENDENPO,
			SKILL_ID_ZIRAISHIN, SKILL_ID_BAKKISANDAN, SKILL_ID_SHURASHINDAN,
			SKILL_ID_RAIKODAN, SKILL_ID_SISIKO, SKILL_ID_SENRYU_SHOTEN,
			SKILL_ID_ZENKI_CHUNYU, SKILL_ID_KYUKIKO, SKILL_ID_TENKETSU_MOKU,
			SKILL_ID_TENKETSU_KAI, SKILL_ID_TENKETSU_HAN, SKILL_ID_TENKETSU_KATSU,
			SKILL_ID_TENKETSU_KYU, SKILL_ID_SENKO_RENGEKI, SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE,
			SKILL_ID_TEKKEN, SKILL_ID_KIKO,
			SKILL_ID_SANDANSHO, SKILL_ID_MIKIRI,
			SKILL_ID_BAKURETSU_HADO, SKILL_ID_KONGO,
			SKILL_ID_SANDAN_DELAY_ZOKA, SKILL_ID_TENKETSU_HAN,
			SKILL_ID_SENRYU_SHOTEN, SKILL_ID_TENKETSU_KATSU,
			SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI, SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_HEAL,
			SKILL_ID_HOLY_LIGHT,
			SKILL_ID_RUWACH,
			SKILL_ID_RENDASHO,
			SKILL_ID_MORYUKEN,
			SKILL_ID_SHIDAN,
			SKILL_ID_HAKKEI,
			SKILL_ID_ASHURA_HAOKEN,
			SKILL_ID_ASHURA_HAOKEN_SPKOTEI,
			SKILL_ID_SUNKEI,
			SKILL_ID_MOKOKOHAZAN,
			SKILL_ID_BUKKOKEN,
			SKILL_ID_RENCHUHOGEKI,
			SKILL_ID_SORYUKYAKU,
			SKILL_ID_SHURASHINDAN,
			SKILL_ID_RAIKODAN,
			SKILL_ID_BAKKISANDAN,
			SKILL_ID_DAITENHOSUI,
			SKILL_ID_TENRACHIMO,
			SKILL_ID_SISIKO,
			SKILL_ID_ZIRAISHIN,
			SKILL_ID_SENPUTAI,
			SKILL_ID_TENKETSU_MOKU,
			SKILL_ID_GOHO,
			SKILL_ID_RASETSU_HAOGEKI_MAX,
			SKILL_ID_RASETSU_HAOGEKI,
			SKILL_ID_HASAICHU,
			SKILL_ID_SENKO_RENGEKI,
			SKILL_ID_COMBO_SANDAN_CHAMP,
			SKILL_ID_COMBO_SORYUKYAKU,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ACOLYTE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ACOLYTE,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_MONK,
			ITEM_EQPFLG_SERIES_CHAMPION,
			ITEM_EQPFLG_SHURA,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_MINSTREL"
		))
		.AddNameKana("ミンストレル", "ミンストレル")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(1200)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 145)
		.AddWeaponAspd(ITEM_KIND_BOW, 148)
		.AddWeaponAspd(ITEM_KIND_MUSICAL, 149)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[3, PARAM_VIT],
			[5, PARAM_DEX],
			[7, PARAM_INT],
			[8, PARAM_INT],
			[10, PARAM_VIT],
			[11, PARAM_VIT],
			[14, PARAM_DEX],
			[15, PARAM_DEX],
			[18, PARAM_STR],
			[19, PARAM_STR],
			[22, PARAM_INT],
			[24, PARAM_STR],
			[26, PARAM_AGI],
			[27, PARAM_AGI],
			[28, PARAM_STR],
			[32, PARAM_INT],
			[34, PARAM_VIT],
			[36, PARAM_DEX],
			[38, PARAM_AGI],
			[39, PARAM_AGI],
			[40, PARAM_INT],
			[41, PARAM_INT],
			[44, PARAM_DEX],
			[45, PARAM_VIT],
			[46, PARAM_STR],
			[49, PARAM_INT],
			[50, PARAM_DEX],
			[51, PARAM_AGI],
			[52, PARAM_VIT],
			[53, PARAM_STR],
			[54, PARAM_LUK],
			[56, PARAM_DEX],
			[57, PARAM_VIT],
			[58, PARAM_STR],
			[59, PARAM_INT],
			[60, PARAM_DEX],
			[61, PARAM_AGI],
			[63, PARAM_DEX],
			[65, PARAM_LUK],
			[66, PARAM_AGI],
			[68, PARAM_DEX],
			[70, PARAM_LUK],
		])

		.SetHpArray([
			  4000,
			  4085,  4170,  4255,  4340,  4425,  4510,  4595,  4680,  4800,  4828,
			  4918,  5009,  5101,  5194,  5288,  5382,  5477,  5573,  5670,  5768,
			  5867,  5967,  6068,  6170,  6273,  6377,  6482,  6588,  6694,  6801,
			  6909,  7018,  7128,  7239,  7351,  7464,  7578,  7693,  7809,  7926,
			  8044,  8162,  8281,  8401,  8522,  8644,  8767,  8891,  9016,  9142,
			  9269,  9397,  9526,  9656,  9786,  9917, 10049, 10182, 10316, 10451,
			 10584, 10717, 10851, 10984, 11118, 11251, 11385, 11518, 11652, 11785,
			 11921, 12058, 12196, 12335, 12475, 12616, 12758, 12901, 13045, 13190,
			 13336, 13483, 13631, 13780, 13930, 14209, 14493, 14725, 14946, 15289,
			 15564, 15907, 16161, 16420, 16716, 16822, 16928, 17034, 17140, 17246,
			 17352, 17458, 17564, 17670, 17776, 17882, 17988, 18094, 18200, 18306,
		])

		.SetSpArray([
			   363,
			   368,   372,   377,   381,   386,   390,   395,   399,   400,   410,
			   414,   418,   422,   426,   430,   434,   438,   442,   446,   450,
			   454,   458,   462,   466,   470,   474,   478,   482,   486,   490,
			   494,   498,   502,   506,   510,   514,   518,   522,   526,   530,
			   534,   538,   542,   546,   550,   554,   558,   562,   566,   570,
			   574,   578,   582,   586,   590,   594,   598,   602,   606,   610,
			   614,   648,   702,   726,   750,   774,   808,   822,   846,   850,
			   855,   860,   865,   870,   875,   881,   887,   893,   899,   905,
			   912,   919,   926,   933,   940,   952,   964,   976,   988,  1001,
			  1013,  1026,  1039,  1052,  1065,  1072,  1079,  1086,  1093,  1100,
			  1107,  1114,  1121,  1128,  1135,  1142,  1149,  1156,  1163,  1170,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_DOUBLE_STRAFING, SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YA_SAKUSEI, SKILL_ID_GAKKINO_RENSHU, SKILL_ID_MUSICAL_STRIKE,
			SKILL_ID_FUKYOWAON, SKILL_ID_SAMUI_JOKE, SKILL_ID_KUCHIBUE,
			SKILL_ID_YUHINO_ASSASINCROSS, SKILL_ID_BRAGINO_UTA, SKILL_ID_IDUNNNO_RINGO,
			SKILL_ID_ADLIB, SKILL_ID_ENCORE, SKILL_ID_KOMORIUTA,
			SKILL_ID_NJORDNO_UTAGE, SKILL_ID_EIENNO_KONTON, SKILL_ID_IKUSADAIKONO_HIBIKI,
			SKILL_ID_NIBELUGENNO_YUBIWA, SKILL_ID_LOKINO_SAKEBI, SKILL_ID_SHINENNO_NAKANI,
			SKILL_ID_FUZIMINO_SIEGFRIED, SKILL_ID_UNMEINO_TALOTCARD, SKILL_ID_ARRAW_VULKAN,
			SKILL_ID_WATASHIWO_SHIBARANAIDE, SKILL_ID_TSUKIAKARINO_SHITADE, SKILL_ID_HELLMODENO_TUE,
			SKILL_ID_MARIONET_CONTROL, SKILL_ID_LESSON, SKILL_ID_ZIGOKUNO_UTA,
			SKILL_ID_FUKAKUTEYOSONO_GENGO, SKILL_ID_MELANCHOLY, SKILL_ID_SIRENNO_KOE,
			SKILL_ID_ZYUNKANSURU_SIZENNO_OTO, SKILL_ID_SEISHINO_SAKAIDE, SKILL_ID_SEVERE_RAINSTORM,
			SKILL_ID_SHINDOZANKYO, SKILL_ID_DOMINION_IMPULSE, SKILL_ID_METALIC_SOUND,
			SKILL_ID_YASURAGINO_KOMORIUTA, SKILL_ID_FUSHANIMUKATTE_TOTSUGEKI, SKILL_ID_ECHONO_UTA,
			SKILL_ID_HARMONIZE, SKILL_ID_LERAORNO_TSUYU, SKILL_ID_BEYOND_OF_WARCRY,
			SKILL_ID_MANANO_UTA, SKILL_ID_MELODY_OF_THINK, SKILL_ID_DANCE_WITH_WUG,
			SKILL_ID_FRIDAY_NIGHT_FEVER, SKILL_ID_SOUND_OF_DESTRUCTION, SKILL_ID_ENDLESS_HUMMING_VOICE,
			SKILL_ID_GREAT_ECHO, SKILL_ID_FRIGNO_UTA, SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME,
			SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_GAKKINO_RENSHU,
			SKILL_ID_LESSON, SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_MUSICAL_STRIKE,
			SKILL_ID_ARRAW_VULKAN,
			SKILL_ID_SEVERE_RAINSTORM,
			SKILL_ID_SEVERE_RAINSTORM_EX,
			SKILL_ID_SHINDOZANKYO,
			SKILL_ID_METALIC_SOUND,
			SKILL_ID_GREAT_ECHO,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ARCHER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ARCHER,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_BARD,
			ITEM_EQPFLG_SERIES_CROWN,
			ITEM_EQPFLG_MINSTREL,
			ITEM_EQPFLG_MINSTREL_WANDERER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_WANDERER"
		))
		.AddNameKana("ワンダラー", "ワンダラー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(1200)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 145)
		.AddWeaponAspd(ITEM_KIND_BOW, 148)
		.AddWeaponAspd(ITEM_KIND_WHIP, 149)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_DEX],
			[2, PARAM_INT],
			[3, PARAM_INT],
			[4, PARAM_AGI],
			[7, PARAM_AGI],
			[8, PARAM_DEX],
			[9, PARAM_INT],
			[12, PARAM_VIT],
			[13, PARAM_VIT],
			[14, PARAM_VIT],
			[17, PARAM_DEX],
			[18, PARAM_AGI],
			[21, PARAM_INT],
			[22, PARAM_VIT],
			[23, PARAM_DEX],
			[26, PARAM_STR],
			[27, PARAM_STR],
			[30, PARAM_DEX],
			[31, PARAM_AGI],
			[32, PARAM_VIT],
			[36, PARAM_INT],
			[37, PARAM_INT],
			[38, PARAM_INT],
			[39, PARAM_AGI],
			[43, PARAM_AGI],
			[44, PARAM_DEX],
			[45, PARAM_AGI],
			[49, PARAM_INT],
			[50, PARAM_AGI],
			[51, PARAM_STR],
			[52, PARAM_VIT],
			[53, PARAM_DEX],
			[55, PARAM_LUK],
			[56, PARAM_INT],
			[58, PARAM_VIT],
			[59, PARAM_AGI],
			[60, PARAM_DEX],
			[62, PARAM_STR],
			[64, PARAM_LUK],
			[65, PARAM_STR],
			[67, PARAM_STR],
			[69, PARAM_LUK],
			[70, PARAM_STR],
		])

		.SetHpArray([
			  4000,
			  4085,  4170,  4255,  4340,  4425,  4510,  4595,  4680,  4800,  4828,
			  4918,  5009,  5101,  5194,  5288,  5382,  5477,  5573,  5670,  5768,
			  5867,  5967,  6068,  6170,  6273,  6377,  6482,  6588,  6694,  6801,
			  6909,  7018,  7128,  7239,  7351,  7464,  7578,  7693,  7809,  7926,
			  8044,  8162,  8281,  8401,  8522,  8644,  8767,  8891,  9016,  9142,
			  9269,  9397,  9526,  9656,  9786,  9917, 10049, 10182, 10316, 10451,
			 10584, 10717, 10851, 10984, 11118, 11251, 11385, 11518, 11652, 11785,
			 11921, 12058, 12196, 12335, 12475, 12616, 12758, 12901, 13045, 13190,
			 13336, 13483, 13631, 13780, 13930, 14209, 14493, 14725, 14946, 15289,
			 15564, 15907, 16161, 16420, 16716, 16822, 16928, 17034, 17140, 17246,
			 17352, 17458, 17564, 17670, 17776, 17882, 17988, 18094, 18200, 18306,
		])

		.SetSpArray([
			   363,
			   368,   372,   377,   381,   386,   390,   395,   399,   400,   410,
			   414,   418,   422,   426,   430,   434,   438,   442,   446,   450,
			   454,   458,   462,   466,   470,   474,   478,   482,   486,   490,
			   494,   498,   502,   506,   510,   514,   518,   522,   526,   530,
			   534,   538,   542,   546,   550,   554,   558,   562,   566,   570,
			   574,   578,   582,   586,   590,   594,   598,   602,   606,   610,
			   614,   648,   702,   726,   750,   774,   808,   822,   846,   850,
			   855,   860,   865,   870,   875,   881,   887,   893,   899,   905,
			   912,   919,   926,   933,   940,   952,   964,   976,   988,  1001,
			  1013,  1026,  1039,  1052,  1065,  1072,  1079,  1086,  1093,  1100,
			  1107,  1114,  1121,  1128,  1135,  1142,  1149,  1156,  1163,  1170,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_DOUBLE_STRAFING, SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YA_SAKUSEI, SKILL_ID_DANCENO_RENSHU, SKILL_ID_YAUCHI,
			SKILL_ID_ZIBUNKATTENA_DANCE, SKILL_ID_SCREAM, SKILL_ID_HUMMING,
			SKILL_ID_WATASHIWO_WASURENAIDE, SKILL_ID_KOUNNO_KISS, SKILL_ID_SERVICE_FOR_YOU,
			SKILL_ID_ADLIB, SKILL_ID_ENCORE, SKILL_ID_KOMORIUTA,
			SKILL_ID_NJORDNO_UTAGE, SKILL_ID_EIENNO_KONTON, SKILL_ID_IKUSADAIKONO_HIBIKI,
			SKILL_ID_NIBELUGENNO_YUBIWA, SKILL_ID_LOKINO_SAKEBI, SKILL_ID_SHINENNO_NAKANI,
			SKILL_ID_FUZIMINO_SIEGFRIED, SKILL_ID_UNMEINO_TALOTCARD, SKILL_ID_ARRAW_VULKAN,
			SKILL_ID_WATASHIWO_SHIBARANAIDE, SKILL_ID_TSUKIAKARINO_SHITADE, SKILL_ID_HELLMODENO_TUE,
			SKILL_ID_MARIONET_CONTROL, SKILL_ID_LESSON, SKILL_ID_ZIGOKUNO_UTA,
			SKILL_ID_FUKAKUTEYOSONO_GENGO, SKILL_ID_MELANCHOLY, SKILL_ID_SIRENNO_KOE,
			SKILL_ID_ZYUNKANSURU_SIZENNO_OTO, SKILL_ID_SEISHINO_SAKAIDE, SKILL_ID_SEVERE_RAINSTORM,
			SKILL_ID_SHINDOZANKYO, SKILL_ID_DOMINION_IMPULSE, SKILL_ID_METALIC_SOUND,
			SKILL_ID_YASURAGINO_KOMORIUTA, SKILL_ID_TSUKIAKARINO_SERENADE, SKILL_ID_KOIBITOTACHINO_TAMENO_SYMPHONY,
			SKILL_ID_SWING_DANCE, SKILL_ID_LERAORNO_TSUYU, SKILL_ID_BEYOND_OF_WARCRY,
			SKILL_ID_MANANO_UTA, SKILL_ID_MELODY_OF_THINK, SKILL_ID_DANCE_WITH_WUG,
			SKILL_ID_FRIDAY_NIGHT_FEVER, SKILL_ID_SOUND_OF_DESTRUCTION, SKILL_ID_ENDLESS_HUMMING_VOICE,
			SKILL_ID_GREAT_ECHO, SKILL_ID_FRIGNO_UTA, SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME,
			SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_DANCENO_RENSHU,
			SKILL_ID_LESSON, SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YAUCHI,
			SKILL_ID_ARRAW_VULKAN,
			SKILL_ID_SEVERE_RAINSTORM,
			SKILL_ID_SEVERE_RAINSTORM_EX,
			SKILL_ID_SHINDOZANKYO,
			SKILL_ID_METALIC_SOUND,
			SKILL_ID_GREAT_ECHO,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ARCHER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ARCHER,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_DANCER,
			ITEM_EQPFLG_SERIES_ZYPSY,
			ITEM_EQPFLG_WANDERER,
			ITEM_EQPFLG_MINSTREL_WANDERER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_SORCERER"
		))
		.AddNameKana("ソーサラー", "ソーサラー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(1000)

		.AddWeaponAspd(ITEM_KIND_NONE, 154)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 148)
		.AddWeaponAspd(ITEM_KIND_STUFF, 146)
		.AddWeaponAspd(ITEM_KIND_BOOK, 152)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 141)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[2, PARAM_INT],
			[3, PARAM_DEX],
			[4, PARAM_VIT],
			[5, PARAM_INT],
			[10, PARAM_STR],
			[11, PARAM_STR],
			[12, PARAM_INT],
			[13, PARAM_INT],
			[14, PARAM_VIT],
			[15, PARAM_DEX],
			[19, PARAM_DEX],
			[20, PARAM_AGI],
			[21, PARAM_AGI],
			[22, PARAM_INT],
			[23, PARAM_VIT],
			[24, PARAM_DEX],
			[30, PARAM_INT],
			[31, PARAM_DEX],
			[32, PARAM_VIT],
			[33, PARAM_STR],
			[39, PARAM_INT],
			[40, PARAM_DEX],
			[41, PARAM_AGI],
			[44, PARAM_DEX],
			[45, PARAM_VIT],
			[46, PARAM_INT],
			[47, PARAM_LUK],
			[48, PARAM_LUK],
			[49, PARAM_LUK],
			[50, PARAM_INT],
			[51, PARAM_DEX],
			[53, PARAM_STR],
			[55, PARAM_AGI],
			[57, PARAM_VIT],
			[59, PARAM_DEX],
			[60, PARAM_INT],
			[61, PARAM_INT],
			[63, PARAM_LUK],
			[65, PARAM_VIT],
			[66, PARAM_INT],
			[68, PARAM_LUK],
			[70, PARAM_VIT],
		])

		.SetHpArray([
			  3930,
			  3946,  3962,  3978,  3995,  4012,  4029,  4046,  4063,  4080,  4103,
			  4180,  4257,  4335,  4414,  4494,  4574,  4655,  4737,  4819,  4902,
			  4986,  5071,  5157,  5244,  5332,  5420,  5509,  5599,  5689,  5780,
			  5872,  5965,  6058,  6153,  6248,  6344,  6441,  6539,  6637,  6737,
			  6837,  6937,  7038,  7140,  7243,  7347,  7451,  7557,  7663,  7770,
			  7878,  7987,  8097,  8207,  8318,  8429,  8541,  8654,  8768,  8883,
			  8994,  9107,  9220,  9280,  9340,  9450,  9570,  9680,  9798,  9915,
			 10036, 10158, 10281, 10405, 10530, 10656, 10783, 10911, 11040, 11170,
			 11301, 11433, 11566, 11700, 11835, 12072, 12398, 12770, 13140, 13455,
			 13724, 14095, 14490, 14895, 15312, 15472, 15632, 15792, 15952, 16112,
			 16272, 16432, 16592, 16752, 16912, 17072, 17232, 17392, 17552, 17712,
		])

		.SetSpArray([
			   819,
			   828,   837,   846,   855,   864,   873,   882,   892,   900,  1500,
			   919,   928,   937,   946,   955,   964,   973,   982,   991,  1000,
			  1009,  1018,  1027,  1036,  1045,  1054,  1063,  1072,  1081,  1090,
			  1099,  1108,  1117,  1126,  1135,  1144,  1153,  1162,  1171,  1180,
			  1189,  1198,  1207,  1216,  1225,  1234,  1243,  1252,  1261,  1270,
			  1279,  1288,  1297,  1306,  1315,  1324,  1333,  1342,  1351,  1360,
			  1369,  1378,  1387,  1396,  1405,  1414,  1423,  1432,  1441,  1450,
			  1460,  1470,  1480,  1490,  1500,  1511,  1522,  1533,  1544,  1555,
			  1567,  1579,  1591,  1603,  1615,  1622,  1629,  1636,  1644,  1651,
			  1658,  1665,  1673,  1680,  1687,  1692,  1697,  1702,  1707,  1712,
			  1717,  1722,  1727,  1732,  1737,  1742,  1747,  1752,  1757,  1762,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT, SKILL_ID_FROST_DIVER, SKILL_ID_SIGHT,
			SKILL_ID_LIGHTNING_BOLT, SKILL_ID_THUNDER_STORM, SKILL_ID_STONE_CURSE,
			SKILL_ID_NAPALM_BEAT, SKILL_ID_SOUL_STRIKE, SKILL_ID_SAFETY_WALL,
			SKILL_ID_SP_KAIFUKURYOKU_KOZYO, SKILL_ID_ENERGY_COAT, SKILL_ID_ADVANCED_BOOK,
			SKILL_ID_CAST_CANCEL, SKILL_ID_MAGIC_ROD, SKILL_ID_SPELL_BREAKER,
			SKILL_ID_DISPELL, SKILL_ID_FREE_CAST, SKILL_ID_AUTO_MAGICIAN_SPELL,
			SKILL_ID_DRAGONOLOGY, SKILL_ID_EARTH_SPIKE, SKILL_ID_HEAVENS_DRIVE,
			SKILL_ID_FLAME_LAUNCHER, SKILL_ID_FROST_WEAPON, SKILL_ID_LIGHTNING_LOADER,
			SKILL_ID_SEISMIC_WEAPON, SKILL_ID_VOLCANO, SKILL_ID_DELUGE,
			SKILL_ID_VIOLENT_GALE, SKILL_ID_LAND_PROTECTOR, SKILL_ID_ABRACADABRA,
			SKILL_ID_MONSTER_ZYOHO, SKILL_ID_CREATE_CONVERTER, SKILL_ID_FIRE_ELEMENTAL_CHANGE,
			SKILL_ID_WATER_ELEMENTAL_CHANGE, SKILL_ID_WIND_ELEMENTAL_CHANGE, SKILL_ID_EARTH_ELEMENTAL_CHANGE,
			SKILL_ID_SEIMEIRYOKU_HENKAN, SKILL_ID_SOUL_CHANGE, SKILL_ID_SOUL_BURN,
			SKILL_ID_MIND_BREAKER, SKILL_ID_SPIDER_WEB, SKILL_ID_WALL_OF_FOG,
			SKILL_ID_MEMORIZE, SKILL_ID_DOUBLE_CASTING, SKILL_ID_SPELL_FIST,
			SKILL_ID_FIRE_WALK, SKILL_ID_ELECTRIC_WALK, SKILL_ID_VACUUM_EXTREME,
			SKILL_ID_PSYCHIC_WAVE, SKILL_ID_DIAMOND_DUST, SKILL_ID_VERATURE_SPEAR,
			SKILL_ID_EARTH_GRAVE, SKILL_ID_CLOUD_KILL, SKILL_ID_POISON_BUSTER,
			SKILL_ID_WARMER, SKILL_ID_STRIKING, SKILL_ID_ARRULLO,
			SKILL_ID_SUMMON_AGNI, SKILL_ID_SUMMON_AQUA, SKILL_ID_SUMMON_VENTOS,
			SKILL_ID_SUMMON_TERA, SKILL_ID_ELEMENTAL_CONTROL, SKILL_ID_ELEMENTAL_ACTION,
			SKILL_ID_ELEMENTAL_ANALYSIS, SKILL_ID_ELEMENTAL_SYMPASY, SKILL_ID_ELEMENTAL_CURE,
			SKILL_ID_ELEMENTAL_SHIELD, SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_ENERGY_COAT, SKILL_ID_ADVANCED_BOOK,
			SKILL_ID_FREE_CAST, SKILL_ID_AUTO_MAGICIAN_SPELL,
			SKILL_ID_DRAGONOLOGY, SKILL_ID_MEMORIZE,
			SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL, SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL,
			SKILL_ID_DOUBLE_CASTING, SKILL_ID_SERE,
			SKILL_ID_SERE_MODE, SKILL_ID_SERE_SUPPORT_SKILL,
			SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_HEAVENS_DRIVE,
			SKILL_ID_SPELL_FIST,
			SKILL_ID_PSYCHIC_WAVE,
			SKILL_ID_CLOUD_KILL,
			SKILL_ID_POISON_BUSTER,
			SKILL_ID_EARTH_GRAVE,
			SKILL_ID_DIAMOND_DUST,
			SKILL_ID_VERATURE_SPEAR,
			SKILL_ID_FIRE_WALK,
			SKILL_ID_ELECTRIC_WALK,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_TYPE_BOOK,
			ITEM_EQPFLG_SERIES_SAGE,
			ITEM_EQPFLG_SERIES_PROFESSOR,
			ITEM_EQPFLG_SOURCERER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_GENETIC"
		))
		.AddNameKana("ジェネティック", "ジェネティック")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(1200)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 147)
		.AddWeaponAspd(ITEM_KIND_SWORD, 146)
		.AddWeaponAspd(ITEM_KIND_AXE, 146)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 143)
		.AddWeaponAspd(ITEM_KIND_CLUB, 150)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 4)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[2, PARAM_INT],
			[3, PARAM_DEX],
			[6, PARAM_DEX],
			[7, PARAM_INT],
			[8, PARAM_AGI],
			[12, PARAM_INT],
			[13, PARAM_DEX],
			[15, PARAM_VIT],
			[18, PARAM_VIT],
			[19, PARAM_DEX],
			[20, PARAM_AGI],
			[23, PARAM_INT],
			[24, PARAM_VIT],
			[25, PARAM_VIT],
			[28, PARAM_DEX],
			[29, PARAM_AGI],
			[31, PARAM_LUK],
			[34, PARAM_STR],
			[35, PARAM_INT],
			[36, PARAM_INT],
			[39, PARAM_DEX],
			[40, PARAM_AGI],
			[41, PARAM_INT],
			[44, PARAM_INT],
			[45, PARAM_INT],
			[47, PARAM_AGI],
			[50, PARAM_INT],
			[51, PARAM_STR],
			[52, PARAM_VIT],
			[53, PARAM_DEX],
			[55, PARAM_AGI],
			[56, PARAM_STR],
			[57, PARAM_VIT],
			[58, PARAM_LUK],
			[59, PARAM_DEX],
			[60, PARAM_INT],
			[61, PARAM_LUK],
			[62, PARAM_STR],
			[64, PARAM_VIT],
			[66, PARAM_LUK],
			[67, PARAM_STR],
			[69, PARAM_VIT],
		])

		.SetHpArray([
			  3609,
			  3683,  3757,  3831,  3905,  3979,  4053,  4127,  4201,  4730,  4766,
			  4853,  4940,  5027,  5113,  5200,  5287,  5374,  5461,  5548,  5635,
			  5722,  5809,  5896,  5982,  6069,  6156,  6243,  6330,  6417,  6504,
			  6591,  6678,  6765,  6851,  6938,  7025,  7112,  7199,  7286,  7373,
			  7460,  7547,  7634,  7720,  7807,  7894,  7981,  8068,  8155,  8242,
			  8329,  8416,  8503,  8589,  8676,  8763,  8850,  8937,  9024,  9111,
			  9198,  9285,  9372,  9459,  9546,  9633,  9720,  9807,  9894,  9980,
			 10141, 10303, 10466, 10630, 10795, 10961, 11128, 11296, 11465, 11635,
			 11806, 11978, 12151, 12325, 12500, 12800, 13133, 13461, 13757, 13991,
			 14271, 14642, 15008, 15353, 15752, 16125, 16498, 16871, 17244, 17617,
			 17990, 18363, 18736, 19109, 19482, 19855, 20228, 20601, 20974, 21347,
		])

		.SetSpArray([
			   819,
			   828,   837,   846,   855,   864,   873,   882,   892,   900,  1500,
			   919,   928,   937,   946,   955,   964,   973,   982,   991,  1000,
			  1009,  1018,  1027,  1036,  1045,  1054,  1063,  1072,  1081,  1090,
			  1099,  1108,  1117,  1126,  1135,  1144,  1153,  1162,  1171,  1180,
			  1189,  1198,  1207,  1216,  1225,  1234,  1243,  1252,  1261,  1270,
			  1279,  1288,  1297,  1306,  1315,  1324,  1333,  1342,  1351,  1360,
			  1369,  1378,  1387,  1396,  1405,  1414,  1423,  1432,  1441,  1450,
			  1460,  1470,  1480,  1490,  1500,  1511,  1522,  1533,  1544,  1555,
			  1567,  1579,  1591,  1603,  1615,  1625,  1636,  1646,  1657,  1667,
			  1678,  1689,  1700,  1710,  1721,  1726,  1731,  1736,  1741,  1746,
			  1751,  1756,  1761,  1766,  1771,  1776,  1781,  1786,  1791,  1796,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_SHOZIGENKAIRYO_ZOKA, SKILL_ID_DISCOUNT, SKILL_ID_OVER_CHARGE,
			SKILL_ID_PUSH_CART, SKILL_ID_ITEM_KANTE, SKILL_ID_ROTEN_KAISETSU,
			SKILL_ID_MAMMONITE, SKILL_ID_LOUD_VOICE, SKILL_ID_CHANGE_CART,
			SKILL_ID_CART_REVOLUTION, SKILL_ID_ONO_SHUREN, SKILL_ID_LEARNING_POTION,
			SKILL_ID_PHARMACY, SKILL_ID_POTION_PITCHER, SKILL_ID_ACID_TERROR,
			SKILL_ID_BIOPLANT, SKILL_ID_SPHERE_MINE, SKILL_ID_DEMONSTRATION,
			SKILL_ID_CHEMICAL_WEAPON_CHARGE, SKILL_ID_CHEMICAL_SHIELD_CHARGE, SKILL_ID_CHEMICAL_ARMER_CHARGE,
			SKILL_ID_CHEMICAL_HELM_CHARGE, SKILL_ID_SEIMEI_RINRI, SKILL_ID_ANSOKU,
			SKILL_ID_CALL_HOMUNCULUS, SKILL_ID_RESURRECTION_HOMUNCULUS, SKILL_ID_SHOKUBUTSU_SAIBAI,
			SKILL_ID_SLIMPOTION_PITCHER, SKILL_ID_ACID_DEMONSTRATION, SKILL_ID_FULL_CHEMICAL_CHARGE,
			SKILL_ID_KEN_SHUREN_GENETIC, SKILL_ID_CART_KAIZO, SKILL_ID_CART_TORNADO,
			SKILL_ID_CART_CANNON, SKILL_ID_CART_BOOST_GENETIC, SKILL_ID_CHANGE_MATERIAL,
			SKILL_ID_SPECIAL_PHARMACY, SKILL_ID_MIX_COOKING, SKILL_ID_BAKUDAN_SEIZO,
			SKILL_ID_SLING_ITEM, SKILL_ID_THORN_TRAP, SKILL_ID_THORN_WALL,
			SKILL_ID_CRAZY_WEED, SKILL_ID_BLOOD_SUCKER, SKILL_ID_HELLS_PLANT,
			SKILL_ID_HOWLING_OF_MANDRAGORA, SKILL_ID_SPORE_EXPLOSION, SKILL_ID_DEMONIC_FIRE,
			SKILL_ID_FIRE_EXPANSION, SKILL_ID_ILLUSION_DOOPING, SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_LOUD_VOICE, SKILL_ID_ONO_SHUREN,
			SKILL_ID_KEN_SHUREN_GENETIC, SKILL_ID_CART_KAIZO,
			SKILL_ID_CART_BOOST_GENETIC, SKILL_ID_HOMLV_FOR_PYROCLASTIC,
			SKILL_ID_PYROCLASTIC, SKILL_ID_OVERED_BOOST,
			SKILL_ID_DEFENCE, SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_MAMMONITE,
			SKILL_ID_CART_REVOLUTION,
			SKILL_ID_ACID_TERROR,
			SKILL_ID_DEMONSTRATION,
			SKILL_ID_ACID_DEMONSTRATION,
			SKILL_ID_CART_TORNADO,
			SKILL_ID_CART_CANNON,
			SKILL_ID_HELLS_PLANT,
			SKILL_ID_CRAZY_WEED,
			SKILL_ID_THORN_TRAP,
			SKILL_ID_BLOOD_SUCKER,
			SKILL_ID_SPORE_EXPLOSION,
			SKILL_ID_DEMONIC_FIRE,
			SKILL_ID_FIRE_EXPANSION,
			SKILL_ID_SLING_ITEM,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MARCHANT,
			ITEM_EQPFLG_SERIES_UPPER_OF_MARCHANT,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_SERIES_ALCHEMIST,
			ITEM_EQPFLG_SERIES_CREATOR,
			ITEM_EQPFLG_GENETIC,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();










	//================================================================================================================================
	//
	// 上位拡張職／ドラム
	//
	//================================================================================================================================

	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_KAGERO"
		))
		.AddNameKana("影狼", "カゲロウ")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(600)

		.AddWeaponAspd(ITEM_KIND_NONE, 153)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 155)
		.AddWeaponAspd(ITEM_KIND_FUMA, 167)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 3)

		.SetJobBonusArray([
			[1, PARAM_DEX],
			[3, PARAM_INT],
			[5, PARAM_AGI],
			[6, PARAM_VIT],
			[8, PARAM_STR],
			[9, PARAM_LUK],
			[11, PARAM_DEX],
			[12, PARAM_STR],
			[13, PARAM_AGI],
			[15, PARAM_INT],
			[16, PARAM_LUK],
			[17, PARAM_VIT],
			[21, PARAM_AGI],
			[22, PARAM_DEX],
			[23, PARAM_STR],
			[23, PARAM_LUK],
			[24, PARAM_VIT],
			[25, PARAM_INT],
			[27, PARAM_DEX],
			[29, PARAM_AGI],
			[31, PARAM_STR],
			[32, PARAM_INT],
			[34, PARAM_DEX],
			[35, PARAM_INT],
			[37, PARAM_VIT],
			[38, PARAM_DEX],
			[39, PARAM_STR],
			[41, PARAM_AGI],
			[42, PARAM_INT],
			[43, PARAM_STR],
			[45, PARAM_DEX],
			[46, PARAM_LUK],
			[47, PARAM_AGI],
			[48, PARAM_STR],
			[50, PARAM_DEX],
			[55, PARAM_AGI],
			[60, PARAM_AGI],
			[61, PARAM_AGI],
			[63, PARAM_VIT],
			[65, PARAM_LUK],
			[66, PARAM_DEX],
			[68, PARAM_AGI],
			[70, PARAM_VIT],
		])

		.SetHpArray([
			  4300,  4426,
			  4554,  4684,  4814,  4945,  5078,  5213,  5348,  5484,  5622,  5762,
			  5902,  6043,  6186,  6331,  6476,  6622,  6770,  6920,  7070,  7221,
			  7374,  7529,  7684,  7840,  7998,  8158,  8318,  8479,  8642,  8807,
			  8972,  9138,  9306,  9476,  9646,  9817,  9990, 10165, 10340, 10516,
			 10694, 10874, 11054, 11235, 11418, 11603, 11788, 11974, 12162, 12352,
			 12542, 12733, 12926, 13121, 13316, 13512, 13710, 13910, 14110, 14311,
			 14514, 14719, 14924, 15130, 15338, 15548, 15758, 15969, 16182, 16397,
			 16612, 16828, 17046, 17266, 17486, 17667, 18223, 18434, 18804, 19198,
			 19411, 19616, 19616, 19616, 20838, 20838, 20838, 20838, 20838, 20838,
			 20838, 20838, 22438, 22638, 22838, 23038, 23238, 23238, 23238, 23838,
		])

		.SetSpArray([
			   522,   530,
			   538,   546,   554,   562,   570,   578,   586,   594,   602,   610,
			   618,   626,   634,   642,   650,   658,   666,   674,   682,   690,
			   698,   706,   714,   722,   730,   738,   746,   754,   762,   770,
			   778,   786,   794,   802,   810,   818,   826,   834,   842,   850,
			   858,   866,   874,   882,   890,   898,   906,   914,   922,   930,
			   958,   976,   994,  1002,  1014,  1028,  1046,  1060,  1082,  1100,
			  1108,  1116,  1124,  1132,  1140,  1148,  1156,  1164,  1172,  1180,
			  1188,  1196,  1204,  1212,  1220,  1224,  1228,  1232,  1237,  1241,
			  1249,  1261,  1265,  1269,  1287,  1287,  1287,  1287,  1287,  1287,
			  1287,  1287,  1351,  1359,  1367,  1375,  1383,  1383,  1383,  1407,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_TOKAKU_SHUREN, SKILL_ID_SHURIKEN_NAGE, SKILL_ID_KUNAI_NAGE,
			SKILL_ID_FUMASHURIKEN_NAGE, SKILL_ID_ZENI_NAGE, SKILL_ID_TATAMI_GAESHI,
			SKILL_ID_KAGETOBI, SKILL_ID_KASUMIGIRI, SKILL_ID_KAGEKIRI,
			SKILL_ID_NEN, SKILL_ID_ISSEN, SKILL_ID_NINPO_SHUREN,
			SKILL_ID_KOUENKA, SKILL_ID_KAENZIN, SKILL_ID_RYUENZIN,
			SKILL_ID_HYOSENSO, SKILL_ID_SUITON, SKILL_ID_TSURARAOTOSHI,
			SKILL_ID_FUZIN, SKILL_ID_RAIGEKISAI, SKILL_ID_SAKUFU,
			SKILL_ID_UTSUSEMI, SKILL_ID_KAGEBUNSHIN, SKILL_ID_YAMIKUMO,
			SKILL_ID_MIGITE_TANREN, SKILL_ID_HIDARITE_TANREN, SKILL_ID_ZYUMONZIGIRI,
			SKILL_ID_YOMIGAESHI, SKILL_ID_BAKURETSU_KUNAI, SKILL_ID_HAPPO_KUNAI,
			SKILL_ID_FUMASHURIKEN_RANKA, SKILL_ID_MAKIBISHI, SKILL_ID_MUCHANAGE,
			SKILL_ID_MEIKYO_SHISUI, SKILL_ID_IZAYOI, SKILL_ID_GENZYUTSU_KAGEMUSHA,
			SKILL_ID_GENZYUTSU_KYOGAKU, SKILL_ID_GENZYUTSU_ZYUSATSU, SKILL_ID_GENZYUTSU_GENWAKU,
			SKILL_ID_HIFU_ENTEN, SKILL_ID_HYOFU_FUBUKI, SKILL_ID_FUFU_SEIRAN,
			SKILL_ID_DOFU_GOKAI, SKILL_ID_ZYUTSUSHIKI_KAIHO, SKILL_ID_ZYUTSUSHIKI_TENKAI,
			SKILL_ID_GENZYUTSU_KAGEFUMI, SKILL_ID_GENZYUTSU_KYOMUNOKAGE, SKILL_ID_GENZYUTSU_BUNSHIN,
			SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_TOKAKU_SHUREN, SKILL_ID_NEN,
			SKILL_ID_MIGITE_TANREN, SKILL_ID_HIDARITE_TANREN,
			SKILL_ID_FU_ELEMENT_OF_FU, SKILL_ID_FU_COUNT_OF_FU,
			SKILL_ID_IZAYOI, SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_KOUENKA,
			SKILL_ID_KAENZIN,
			SKILL_ID_RYUENZIN,
			SKILL_ID_HYOSENSO,
			SKILL_ID_TSURARAOTOSHI,
			SKILL_ID_FUZIN,
			SKILL_ID_RAIGEKISAI,
			SKILL_ID_SAKUFU,
			SKILL_ID_SHURIKEN_NAGE,
			SKILL_ID_KUNAI_NAGE,
			SKILL_ID_FUMASHURIKEN_NAGE,
			SKILL_ID_ZENI_NAGE,
			SKILL_ID_TATAMI_GAESHI,
			SKILL_ID_KASUMIGIRI,
			SKILL_ID_KAGEKIRI,
			SKILL_ID_ISSEN,
			SKILL_ID_ISSEN_MAX,
			SKILL_ID_ZYUMONZIGIRI,
			SKILL_ID_YOMIGAESHI,
			SKILL_ID_BAKURETSU_KUNAI,
			SKILL_ID_HAPPO_KUNAI,
			SKILL_ID_FUMASHURIKEN_RANKA,
			SKILL_ID_MUCHANAGE,
			SKILL_ID_ZYUTSUSHIKI_KAIHO,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_THIEF_NINJA,
			ITEM_EQPFLG_SERIES_NINJA,
			ITEM_EQPFLG_SERIES_UPPER_OF_NINJA,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_OBORO"
		))
		.AddNameKana("朧", "オボロ")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(600)

		.AddWeaponAspd(ITEM_KIND_NONE, 153)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 155)
		.AddWeaponAspd(ITEM_KIND_FUMA, 167)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 3)

		.SetJobBonusArray([
			[1, PARAM_DEX],
			[3, PARAM_INT],
			[5, PARAM_AGI],
			[6, PARAM_VIT],
			[8, PARAM_STR],
			[9, PARAM_LUK],
			[11, PARAM_DEX],
			[12, PARAM_STR],
			[13, PARAM_AGI],
			[15, PARAM_INT],
			[16, PARAM_LUK],
			[17, PARAM_VIT],
			[21, PARAM_AGI],
			[22, PARAM_DEX],
			[23, PARAM_STR],
			[23, PARAM_LUK],
			[24, PARAM_VIT],
			[25, PARAM_INT],
			[27, PARAM_DEX],
			[29, PARAM_AGI],
			[31, PARAM_STR],
			[32, PARAM_INT],
			[34, PARAM_DEX],
			[35, PARAM_INT],
			[37, PARAM_VIT],
			[38, PARAM_DEX],
			[39, PARAM_STR],
			[41, PARAM_AGI],
			[42, PARAM_INT],
			[43, PARAM_STR],
			[45, PARAM_DEX],
			[46, PARAM_LUK],
			[47, PARAM_AGI],
			[48, PARAM_STR],
			[50, PARAM_DEX],
			[55, PARAM_AGI],
			[60, PARAM_AGI],
			[61, PARAM_AGI],
			[63, PARAM_VIT],
			[65, PARAM_LUK],
			[66, PARAM_AGI],
			[68, PARAM_VIT],
			[70, PARAM_LUK],
		])

		.SetHpArray([
			  4300,  4426,
			  4554,  4684,  4814,  4945,  5078,  5213,  5348,  5484,  5622,  5762,
			  5902,  6043,  6186,  6331,  6476,  6622,  6770,  6920,  7070,  7221,
			  7374,  7529,  7684,  7840,  7998,  8158,  8318,  8479,  8642,  8807,
			  8972,  9138,  9306,  9476,  9646,  9817,  9990, 10165, 10340, 10516,
			 10694, 10874, 11054, 11235, 11418, 11603, 11788, 11974, 12162, 12352,
			 12542, 12733, 12926, 13121, 13316, 13512, 13710, 13910, 14110, 14311,
			 14514, 14719, 14924, 15130, 15338, 15548, 15758, 15969, 16182, 16397,
			 16612, 16828, 17046, 17266, 17486, 17667, 18223, 18434, 18804, 19198,
			 19411, 19616, 19616, 19616, 20838, 20838, 20838, 20838, 20838, 20838,
			 20838, 20838, 22438, 22638, 22838, 23038, 23238, 23238, 23238, 23838,
		])

		.SetSpArray([
			   522,   530,
			   538,   546,   554,   562,   570,   578,   586,   594,   602,   610,
			   618,   626,   634,   642,   650,   658,   666,   674,   682,   690,
			   698,   706,   714,   722,   730,   738,   746,   754,   762,   770,
			   778,   786,   794,   802,   810,   818,   826,   834,   842,   850,
			   858,   866,   874,   882,   890,   898,   906,   914,   922,   930,
			   958,   976,   994,  1002,  1014,  1028,  1046,  1060,  1082,  1100,
			  1108,  1116,  1124,  1132,  1140,  1148,  1156,  1164,  1172,  1180,
			  1188,  1196,  1204,  1212,  1220,  1224,  1228,  1232,  1237,  1241,
			  1249,  1261,  1265,  1269,  1287,  1287,  1287,  1287,  1287,  1287,
			  1287,  1287,  1351,  1359,  1367,  1375,  1383,  1383,  1383,  1407,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_TOKAKU_SHUREN, SKILL_ID_SHURIKEN_NAGE, SKILL_ID_KUNAI_NAGE,
			SKILL_ID_FUMASHURIKEN_NAGE, SKILL_ID_ZENI_NAGE, SKILL_ID_TATAMI_GAESHI,
			SKILL_ID_KAGETOBI, SKILL_ID_KASUMIGIRI, SKILL_ID_KAGEKIRI,
			SKILL_ID_NEN, SKILL_ID_ISSEN, SKILL_ID_NINPO_SHUREN,
			SKILL_ID_KOUENKA, SKILL_ID_KAENZIN, SKILL_ID_RYUENZIN,
			SKILL_ID_HYOSENSO, SKILL_ID_SUITON, SKILL_ID_TSURARAOTOSHI,
			SKILL_ID_FUZIN, SKILL_ID_RAIGEKISAI, SKILL_ID_SAKUFU,
			SKILL_ID_UTSUSEMI, SKILL_ID_KAGEBUNSHIN, SKILL_ID_YAMIKUMO,
			SKILL_ID_MIGITE_TANREN, SKILL_ID_HIDARITE_TANREN, SKILL_ID_ZYUMONZIGIRI,
			SKILL_ID_YOMIGAESHI, SKILL_ID_BAKURETSU_KUNAI, SKILL_ID_HAPPO_KUNAI,
			SKILL_ID_FUMASHURIKEN_RANKA, SKILL_ID_MAKIBISHI, SKILL_ID_MUCHANAGE,
			SKILL_ID_MEIKYO_SHISUI, SKILL_ID_IZAYOI, SKILL_ID_GENZYUTSU_KAGEMUSHA,
			SKILL_ID_GENZYUTSU_KYOGAKU, SKILL_ID_GENZYUTSU_ZYUSATSU, SKILL_ID_GENZYUTSU_GENWAKU,
			SKILL_ID_HIFU_ENTEN, SKILL_ID_HYOFU_FUBUKI, SKILL_ID_FUFU_SEIRAN,
			SKILL_ID_DOFU_GOKAI, SKILL_ID_ZYUTSUSHIKI_KAIHO, SKILL_ID_ZYUTSUSHIKI_TENKAI,
			SKILL_ID_GENZYUTSU_ZANGETSU, SKILL_ID_GENZYUTSU_KOUGETSU, SKILL_ID_GENZYUTSU_OBOROGENSO,
			SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_TOKAKU_SHUREN, SKILL_ID_NEN,
			SKILL_ID_MIGITE_TANREN, SKILL_ID_HIDARITE_TANREN,
			SKILL_ID_FU_ELEMENT_OF_FU, SKILL_ID_FU_COUNT_OF_FU,
			SKILL_ID_GENZYUTSU_ZANGETSU, SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU,
			SKILL_ID_IZAYOI, SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_KOUENKA,
			SKILL_ID_KAENZIN,
			SKILL_ID_RYUENZIN,
			SKILL_ID_HYOSENSO,
			SKILL_ID_TSURARAOTOSHI,
			SKILL_ID_FUZIN,
			SKILL_ID_RAIGEKISAI,
			SKILL_ID_SAKUFU,
			SKILL_ID_SHURIKEN_NAGE,
			SKILL_ID_KUNAI_NAGE,
			SKILL_ID_FUMASHURIKEN_NAGE,
			SKILL_ID_ZENI_NAGE,
			SKILL_ID_TATAMI_GAESHI,
			SKILL_ID_KASUMIGIRI,
			SKILL_ID_KAGEKIRI,
			SKILL_ID_ISSEN,
			SKILL_ID_ISSEN_MAX,
			SKILL_ID_ZYUMONZIGIRI,
			SKILL_ID_YOMIGAESHI,
			SKILL_ID_BAKURETSU_KUNAI,
			SKILL_ID_HAPPO_KUNAI,
			SKILL_ID_FUMASHURIKEN_RANKA,
			SKILL_ID_MUCHANAGE,
			SKILL_ID_ZYUTSUSHIKI_KAIHO,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_THIEF_NINJA,
			ITEM_EQPFLG_SERIES_NINJA,
			ITEM_EQPFLG_SERIES_UPPER_OF_NINJA,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_SUPERNOVICE_PLUS"
		))
		.AddNameKana("スーパーノービス＋", "スーパーノービスプラス")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(0)

		.AddWeaponAspd(ITEM_KIND_NONE, 152)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 141)
		.AddWeaponAspd(ITEM_KIND_SWORD, 140)
		.AddWeaponAspd(ITEM_KIND_AXE, 138)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, -6)
		.AddWeaponAspd(ITEM_KIND_CLUB, 140)
		.AddWeaponAspd(ITEM_KIND_STUFF, 141)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 130)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 7)

		.SetJobBonusArray([
			[1, PARAM_STR],
			[2, PARAM_AGI],
			[4, PARAM_VIT],
			[6, PARAM_INT],
			[7, PARAM_DEX],
			[9, PARAM_LUK],
			[11, PARAM_STR],
			[12, PARAM_AGI],
			[14, PARAM_VIT],
			[16, PARAM_INT],
			[17, PARAM_DEX],
			[19, PARAM_LUK],
			[21, PARAM_STR],
			[22, PARAM_AGI],
			[24, PARAM_VIT],
			[26, PARAM_INT],
			[27, PARAM_DEX],
			[29, PARAM_LUK],
			[31, PARAM_STR],
			[32, PARAM_AGI],
			[34, PARAM_VIT],
			[36, PARAM_INT],
			[37, PARAM_DEX],
			[39, PARAM_LUK],
			[41, PARAM_STR],
			[42, PARAM_AGI],
			[44, PARAM_VIT],
			[46, PARAM_INT],
			[47, PARAM_DEX],
			[49, PARAM_LUK],
			[51, PARAM_STR],
			[52, PARAM_AGI],
			[54, PARAM_VIT],
			[56, PARAM_INT],
			[57, PARAM_DEX],
			[59, PARAM_LUK],
			[61, PARAM_STR],
			[62, PARAM_AGI],
			[63, PARAM_INT],
			[64, PARAM_DEX],
			[66, PARAM_STR],
			[67, PARAM_AGI],
			[68, PARAM_INT],
			[70, PARAM_DEX],
		])

		.SetHpArray([
			  2530,  2580,
			  2630,  2680,  2730,  2780,  2830,  2880,  2930,  2980,  3030,  3080,
			  3130,  3180,  3230,  3280,  3330,  3380,  3430,  3480,  3530,  3580,
			  3630,  3680,  3730,  3780,  3830,  3880,  3930,  3980,  4030,  4080,
			  4130,  4180,  4230,  4280,  4330,  4380,  4430,  4480,  4530,  4580,
			  4630,  4680,  4730,  4780,  4830,  4880,  4930,  4980,  5030,  5080,
			  5130,  5180,  5230,  5280,  5330,  5380,  5430,  5480,  5530,  5580,
			  5630,  5680,  5730,  5780,  5830,  5880,  5930,  5980,  6030,  6080,
			  6130,  6180,  6230,  6280,  6330,  6380,  6430,  6480,  6530,  6580,
			  6630,  6680,  6730,  6780,  6830,  6880,  6930,  6980,  7030,  7080,
			  7130,  7180,  7230,  7280,  7330,  7380,  7430,  7480,  7530,  7580,
		])

		.SetSpArray([
			   109,   114,
			   119,   124,   129,   134,   139,   144,   149,   154,   159,   164,
			   169,   174,   179,   184,   189,   194,   199,   204,   209,   214,
			   219,   224,   229,   234,   239,   244,   249,   254,   259,   264,
			   269,   274,   279,   284,   289,   294,   299,   304,   309,   314,
			   319,   324,   329,   334,   339,   344,   349,   354,   359,   364,
			   369,   374,   379,   384,   389,   394,   399,   404,   409,   414,
			   419,   424,   429,   434,   439,   444,   449,   454,   459,   464,
			   469,   474,   479,   484,   489,   494,   499,   504,   509,   514,
			   519,   524,   529,   534,   539,   544,   549,   554,   559,   564,
			   569,   574,   579,   584,   589,   594,   599,   604,   609,   614,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_KEN_SHUREN, SKILL_ID_HP_KAIFUKURYOKU_KOZYO, SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK, SKILL_ID_PROVOKE, SKILL_ID_ENDURE,
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_STEAL,
			SKILL_ID_HIDING, SKILL_ID_ENVENOM, SKILL_ID_GEDOKU,
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE, SKILL_ID_SIGNUM_CRUCIS,
			SKILL_ID_HEAL, SKILL_ID_CURE, SKILL_ID_ANGELUS,
			SKILL_ID_BLESSING, SKILL_ID_SOKUDO_ZOKA, SKILL_ID_SOKUDO_GENSHO,
			SKILL_ID_RUWACH, SKILL_ID_TELEPORT, SKILL_ID_WARP_PORTAL,
			SKILL_ID_PNEUMA, SKILL_ID_AQUA_BENEDICTA, SKILL_ID_FUKURONO_ME,
			SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_SP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT, SKILL_ID_FROST_DIVER, SKILL_ID_SIGHT,
			SKILL_ID_LIGHTNING_BOLT, SKILL_ID_THUNDER_STORM, SKILL_ID_STONE_CURSE,
			SKILL_ID_NAPALM_BEAT, SKILL_ID_SOUL_STRIKE, SKILL_ID_SAFETY_WALL,
			SKILL_ID_SHOZIGENKAIRYO_ZOKA, SKILL_ID_DISCOUNT, SKILL_ID_OVER_CHARGE,
			SKILL_ID_PUSH_CART, SKILL_ID_ITEM_KANTE, SKILL_ID_ROTEN_KAISETSU,
			SKILL_ID_MAMMONITE, SKILL_ID_FAITH, SKILL_ID_HOLY_CROSS,
			SKILL_ID_SHIELD_CHARGE, SKILL_ID_SHIELD_BOOMERANG, SKILL_ID_AUTO_GUARD,
			SKILL_ID_ENCHANT_POISON, SKILL_ID_POISON_REACT, SKILL_ID_VENOM_DUST,
			SKILL_ID_VENOM_SPLASHER, SKILL_ID_SNATCHER, SKILL_ID_STEAL_COIN,
			SKILL_ID_BACK_STAB, SKILL_ID_SURPRISE_ATTACK, SKILL_ID_TUNNEL_DRIVE,
			SKILL_ID_MAGNIFICAT, SKILL_ID_IMPOSITIO_MANUS, SKILL_ID_GLORIA,
			SKILL_ID_ASPERSIO, SKILL_ID_RECOVERY, SKILL_ID_SANCTUARY,
			SKILL_ID_TEKKEN, SKILL_ID_KIKO, SKILL_ID_KIDATSU,
			SKILL_ID_BAKURETSU_HADO, SKILL_ID_RENKIKO, SKILL_ID_SKID_TRAP,
			SKILL_ID_LAND_MINE, SKILL_ID_BEAST_BANE, SKILL_ID_MONSTER_ZYOHO,
			SKILL_ID_METEOR_STORM, SKILL_ID_STORM_GUST, SKILL_ID_LORD_OF_VERMILLION,
			SKILL_ID_MAGIC_CRUSHER, SKILL_ID_FIRE_PILLAR, SKILL_ID_SIGHT_RASHER,
			SKILL_ID_JUPITER_THUNDER, SKILL_ID_WATER_BALL, SKILL_ID_FROST_NOVA,
			SKILL_ID_ICE_WALL, SKILL_ID_EARTH_SPIKE, SKILL_ID_HEAVENS_DRIVE,
			SKILL_ID_QUAGMIRE, SKILL_ID_HILT_BINDING, SKILL_ID_BUKI_KENKYU,
			SKILL_ID_BUKI_SHURI, SKILL_ID_ONO_SHUREN, SKILL_ID_BREAK_THROUGH,
			SKILL_ID_TRANSCENDENCE, SKILL_ID_TENSHISAMA_TASUKETE, SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_KEN_SHUREN, SKILL_ID_DOUBLE_ATTACK,
			SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_DIVINE_PROTECTION,
			SKILL_ID_DEMON_BANE, SKILL_ID_FUKURONO_ME,
			SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_BAKURETSU_HADO_SUPER_NOVICE, SKILL_ID_BAKURETSU_HADO,
			SKILL_ID_SUPER_NOVICENO_TAMASHI, SKILL_ID_ENDURE,
			SKILL_ID_SUPER_NOVICE_NODEAD_BONUS, SKILL_ID_KONGO,
			SKILL_ID_MARIAGE_STATUS, SKILL_ID_FAITH,
			SKILL_ID_HILT_BINDING, SKILL_ID_BUKI_KENKYU,
			SKILL_ID_ONO_SHUREN, SKILL_ID_TEKKEN,
			SKILL_ID_BREAK_THROUGH, SKILL_ID_TRANSCENDENCE,
			SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
			SKILL_ID_ENVENOM,
			SKILL_ID_HEAL,
			SKILL_ID_RUWACH,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_MAMMONITE,
			SKILL_ID_VENOM_SPLASHER,
			SKILL_ID_POISON_REACT,
			SKILL_ID_LAND_MINE,
			SKILL_ID_FIRE_PILLAR,
			SKILL_ID_SIGHT_RASHER,
			SKILL_ID_METEOR_STORM,
			SKILL_ID_JUPITER_THUNDER,
			SKILL_ID_LORD_OF_VERMILLION,
			SKILL_ID_WATER_BALL,
			SKILL_ID_FROST_NOVA,
			SKILL_ID_STORM_GUST,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_HEAVENS_DRIVE,
			SKILL_ID_SHIELD_CHARGE,
			SKILL_ID_SHIELD_BOOMERANG,
			SKILL_ID_HOLY_CROSS,
			SKILL_ID_BACK_STAB,
			SKILL_ID_SURPRISE_ATTACK,
			SKILL_ID_MAGIC_CRUSHER,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_SERIES_NOVICE,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_SUPER_NOVICE,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_REBELLION"
		))
		.AddNameKana("リベリオン", "リベリオン")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(800)

		.AddWeaponAspd(ITEM_KIND_NONE, 149)
		.AddWeaponAspd(ITEM_KIND_HANDGUN, 144)
		.AddWeaponAspd(ITEM_KIND_RIFLE, 139)
		.AddWeaponAspd(ITEM_KIND_SHOTGUN, 128)
		.AddWeaponAspd(ITEM_KIND_GATLINGGUN, 146)
		.AddWeaponAspd(ITEM_KIND_GRENADEGUN, 130)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 7)

		.SetJobBonusArray([
			[2, PARAM_DEX],
			[4, PARAM_INT],
			[6, PARAM_VIT],
			[7, PARAM_DEX],
			[8, PARAM_INT],
			[9, PARAM_AGI],
			[10, PARAM_LUK],
			[13, PARAM_VIT],
			[14, PARAM_INT],
			[16, PARAM_AGI],
			[17, PARAM_DEX],
			[18, PARAM_INT],
			[19, PARAM_VIT],
			[20, PARAM_LUK],
			[23, PARAM_VIT],
			[24, PARAM_DEX],
			[25, PARAM_STR],
			[26, PARAM_INT],
			[27, PARAM_AGI],
			[30, PARAM_LUK],
			[31, PARAM_VIT],
			[33, PARAM_DEX],
			[34, PARAM_INT],
			[35, PARAM_STR],
			[38, PARAM_DEX],
			[40, PARAM_AGI],
			[41, PARAM_LUK],
			[43, PARAM_DEX],
			[44, PARAM_VIT],
			[45, PARAM_INT],
			[50, PARAM_STR],
			[51, PARAM_AGI],
			[52, PARAM_LUK],
			[54, PARAM_INT],
			[55, PARAM_DEX],
			[57, PARAM_AGI],
			[60, PARAM_DEX],
			[62, PARAM_DEX],
			[64, PARAM_LUK],
			[65, PARAM_AGI],
			[66, PARAM_DEX],
			[69, PARAM_AGI],
			[70, PARAM_LUK],
		])

		.SetHpArray([
			  5180,  5319,
			  5458,  5599,  5740,  5883,  6026,  6171,  6316,  6463,  6610,  6758,
			  6906,  7056,  7206,  7358,  7510,  7664,  7818,  7974,  8130,  8287,
			  8444,  8603,  8762,  8923,  9084,  9247,  9410,  9575,  9740,  9906,
			 10072, 10240, 10408, 10578, 10748, 10920, 11092, 11266, 11440, 11615,
			 11790, 11967, 12144, 12323, 12502, 12683, 12864, 13047, 13230, 13414,
			 13598, 13784, 13970, 14158, 14346, 14536, 14726, 14918, 15110, 15303,
			 15496, 15691, 15886, 16083, 16280, 16479, 16678, 16879, 17080, 17282,
			 17484, 17688, 17892, 18098, 18304, 18428, 18555, 18679, 18807, 19060,
			 19315, 19704, 19969, 20103, 20375, 20755, 21224, 21515, 21895, 22275,
			 22655, 23035, 23415, 23795, 24175, 24555, 24935, 25315, 25695, 26075,
		])

		.SetSpArray([
			   456,   462,
			   468,   474,   480,   486,   492,   498,   504,   510,   516,   522,
			   528,   534,   540,   546,   552,   558,   564,   570,   576,   582,
			   588,   594,   600,   606,   612,   618,   624,   630,   636,   642,
			   648,   654,   660,   666,   672,   678,   684,   690,   696,   702,
			   708,   714,   720,   726,   732,   738,   744,   750,   756,   762,
			   774,   786,   798,   810,   822,   836,   850,   864,   878,   892,
			   908,   924,   940,   956,   972,   990,  1008,  1026,  1044,  1062,
			  1080,  1098,  1116,  1134,  1152,  1156,  1168,  1180,  1184,  1188,
			  1192,  1204,  1213,  1221,  1230,  1238,  1246,  1254,  1262,  1270,
			  1278,  1286,  1294,  1302,  1310,  1318,  1326,  1334,  1342,  1350,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FLIP_THE_COIN, SKILL_ID_FLYING, SKILL_ID_TRIPLE_ACTION,
			SKILL_ID_MAGICAL_BARRET, SKILL_ID_CRACKER, SKILL_ID_BULLS_EYE,
			SKILL_ID_INCREASING_ACCURACY, SKILL_ID_MADNESSS_CANCELER, SKILL_ID_ADJUSTMENT,
			SKILL_ID_SNAKE_EYE, SKILL_ID_SINGLE_ACTION, SKILL_ID_CHAIN_ACTION,
			SKILL_ID_RAPID_SHOWER, SKILL_ID_DEATHPERAD, SKILL_ID_GATLING_FEVER,
			SKILL_ID_TRACKING, SKILL_ID_PIERCING_SHOT, SKILL_ID_DISARM,
			SKILL_ID_DUST, SKILL_ID_FULL_BASTER, SKILL_ID_SPREAD_ATTACK,
			SKILL_ID_GROUND_DRIFT, SKILL_ID_ETERNAL_CHAIN, SKILL_ID_QUICKDRAW_SHOT,
			SKILL_ID_RICHS_COIN, SKILL_ID_PLATINUM_ALTER, SKILL_ID_HEAT_BARREL,
			SKILL_ID_FRICKER, SKILL_ID_BIND_TRAP, SKILL_ID_CRYMSON_MARKER,
			SKILL_ID_FIRE_DANCE, SKILL_ID_FIRE_RAIN, SKILL_ID_ROUND_TRIP,
			SKILL_ID_MASS_SPIRAL, SKILL_ID_UNTIMATERIAL_BLAST, SKILL_ID_HAMMER_OF_GOD,
			SKILL_ID_SHUTTER_STORM, SKILL_ID_BUNISHING_BASTER, SKILL_ID_SLUG_SHOT,
			SKILL_ID_HOWLING_MINE, SKILL_ID_DRAGON_TAIL, SKILL_ID_FALLIN_ANGEL,
			SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_SINGLE_ACTION, SKILL_ID_SNAKE_EYE,
			SKILL_ID_CHAIN_ACTION, SKILL_ID_COUNT_OF_COIN,
			SKILL_ID_ETERNAL_CHAIN, SKILL_ID_MAGICAL_BARRET,
			SKILL_ID_MADNESSS_CANCELER, SKILL_ID_ADJUSTMENT,
			SKILL_ID_INCREASING_ACCURACY, SKILL_ID_GATLING_FEVER,
			SKILL_ID_HEAT_BARREL, SKILL_ID_HEAT_BARREL_COIN_COUNT,
			SKILL_ID_PLATINUM_ALTER, SKILL_ID_PLATINUM_ALTER_COIN_COUNT,
			SKILL_ID_AS_QUICKDRAW, SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_TRIPLE_ACTION,
			SKILL_ID_BULLS_EYE,
			SKILL_ID_RAPID_SHOWER,
			SKILL_ID_DEATHPERAD,
			SKILL_ID_TRACKING,
			SKILL_ID_DISARM,
			SKILL_ID_PIERCING_SHOT,
			SKILL_ID_DUST,
			SKILL_ID_FULL_BASTER,
			SKILL_ID_SPREAD_ATTACK,
			SKILL_ID_GROUND_DRIFT,
			SKILL_ID_FIRE_DANCE,
			SKILL_ID_MASS_SPIRAL,
			SKILL_ID_UNTIMATERIAL_BLAST,
			SKILL_ID_HAMMER_OF_GOD,
			SKILL_ID_SHUTTER_STORM,
			SKILL_ID_BUNISHING_BASTER,
			SKILL_ID_SLUG_SHOT,
			SKILL_ID_FIRE_RAIN,
			SKILL_ID_ROUND_TRIP,
			SKILL_ID_HOWLING_MINE,
			SKILL_ID_HOWLING_MINE_APPEND,
			SKILL_ID_DRAGON_TAIL,
			SKILL_ID_QUICKDRAW_SHOT,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_GUNSLINGER,
			ITEM_EQPFLG_SERIES_UPPER_OF_GUNSLINGER,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_BULLET,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_SUMMONER"
		))
		.AddNameKana("サモナー", "サモナー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_SUMMONER)
		.SetWeightBonus(0)

		.AddWeaponAspd(ITEM_KIND_NONE, 154)
		.AddWeaponAspd(ITEM_KIND_STUFF, 134)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[2, PARAM_DEX],
			[3, PARAM_VIT],
			[5, PARAM_DEX],
			[6, PARAM_VIT],
			[8, PARAM_AGI],
			[9, PARAM_INT],
			[11, PARAM_AGI],
			[12, PARAM_INT],
			[13, PARAM_DEX],
			[15, PARAM_AGI],
			[16, PARAM_INT],
			[17, PARAM_DEX],
			[19, PARAM_AGI],
			[20, PARAM_INT],
			[21, PARAM_DEX],
			[23, PARAM_LUK],
			[24, PARAM_VIT],
			[25, PARAM_DEX],
			[27, PARAM_AGI],
			[29, PARAM_LUK],
			[31, PARAM_INT],
			[32, PARAM_DEX],
			[34, PARAM_LUK],
			[36, PARAM_INT],
			[37, PARAM_LUK],
			[39, PARAM_AGI],
			[41, PARAM_DEX],
			[42, PARAM_INT],
			[43, PARAM_VIT],
			[45, PARAM_DEX],
			[46, PARAM_LUK],
			[47, PARAM_VIT],
			[48, PARAM_AGI],
			[50, PARAM_DEX],
			[53, PARAM_INT],
			[55, PARAM_DEX],
			[58, PARAM_INT],
			[60, PARAM_DEX],
		])

		.SetHpArray([
			    40,    69,    80,    92,   105,   119,   134,   150,   167,   185,
			   204,   224,   245,   267,   291,   315,   341,   368,   395,   423,
			   453,   483,   515,   548,   581,   616,   653,   690,   728,   767,
			   807,   848,   890,   933,   978,  1023,  1070,  1118,  1166,  1215,
			  1266,  1317,  1370,  1424,  1479,  1535,  1592,  1650,  1709,  1769,
			  1830,  1892,  1955,  2019,  2085,  2151,  2219,  2288,  2357,  2427,
			  2499,  2571,  2645,  2720,  2796,  2873,  2951,  3030,  3110,  3191,
			  3273,  3356,  3440,  3525,  3612,  3699,  3788,  3878,  3968,  4059,
			  4152,  4245,  4340,  4436,  4533,  4631,  4730,  4830,  4931,  5033,
			  5136,  5240,  5345,  5451,  5559,  5667,  5777,  5888,  5999,  6120,
			  6240,  6360,  6480,  6600,  6735,  6870,  7005,  7140,  7275,  7425,
			  7575,  7725,  7875,  8025,  8190,  8355,  8520,  8685,  8850,  9030,
			  9210,  9390,  9570,  9750,  9945, 10140, 10335, 10530, 10725, 10935,
			 11145, 11355, 11565, 11775, 12000, 12225, 12450, 12675, 12900, 13140,
			 13380, 13620, 13860, 14100, 14355, 14610, 14865, 15120, 15375, 15645,
			 15915, 16185, 16455, 16725, 17010, 17295, 17580, 17865, 18150, 18450,
			 18750, 19050, 19350, 19650, 19965, 20280, 20595, 20910, 21225, 21555,
			 21885, 22215, 22545, 22875, 23220, 23298, 23376, 23456, 23692, 23930,
			 24010, 24170, 24331, 24576, 24740, 24871, 25002, 25133, 25264, 25264,
			 25264, 25264, 25264, 25919, 25919, 25919, 25919, 25919, 25919, 25919,
		])

		.SetSpArray([
			     8,    10,    13,    15,    18,    20,    23,    25,    28,    30,
			    33,    35,    38,    40,    43,    45,    48,    50,    53,    55,
			    58,    60,    63,    65,    68,    70,    73,    75,    78,    80,
			    83,    85,    88,    90,    93,    95,    98,   100,   103,   105,
			   108,   110,   113,   115,   118,   120,   123,   125,   128,   130,
			   133,   135,   138,   140,   143,   145,   148,   150,   153,   155,
			   158,   160,   163,   165,   168,   170,   173,   175,   178,   180,
			   183,   185,   188,   190,   193,   195,   198,   200,   203,   205,
			   208,   210,   213,   215,   218,   220,   223,   225,   228,   230,
			   233,   235,   238,   240,   243,   245,   248,   250,   253,   257,
			   261,   265,   269,   273,   278,   283,   288,   293,   298,   304,
			   310,   316,   322,   328,   335,   342,   349,   356,   363,   371,
			   379,   387,   395,   403,   412,   421,   430,   439,   448,   458,
			   468,   478,   488,   498,   509,   520,   531,   542,   553,   565,
			   577,   589,   601,   613,   626,   639,   642,   655,   668,   682,
			   696,   710,   724,   738,   753,   768,   783,   798,   813,   829,
			   835,   851,   867,   883,   899,   916,   933,   950,   967,   984,
			  1002,  1020,  1038,  1056,  1074,  1076,  1081,  1087,  1089,  1091,
			  1097,  1101,  1106,  1108,  1110,  1121,  1132,  1143,  1154,  1154,
			  1154,  1154,  1154,  1209,  1209,  1209,  1209,  1209,  1264,  1275,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_DORAM_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_KAMITSUKU,
			SKILL_ID_KAKURERU, SKILL_ID_HIKKAKU, SKILL_ID_UZUKUMARU,
			SKILL_ID_NYAN_JAMP, SKILL_ID_NYAN_TAMASHI, SKILL_ID_SOUL_ATTACK,
			SKILL_ID_SHINSENNA_EBI, SKILL_ID_MATATABI_LANCE, SKILL_ID_PIKKI_TSUKI,
			SKILL_ID_EBI_ZANMAI, SKILL_ID_MATATABINO_NEKKO, SKILL_ID_ARCLOUSE_DASH,
			SKILL_ID_OTORO, SKILL_ID_INUHAKKA_METEOR, SKILL_ID_TAROUNO_KIZU,
			SKILL_ID_MAGURO_SHIELD, SKILL_ID_INUHAKKA_SHOWER, SKILL_ID_CARROT_BEAT,
			SKILL_ID_UMINO_CHIKARA, SKILL_ID_DAICHINO_CHIKARA, SKILL_ID_SEIMEINO_CHIKARA,
			SKILL_ID_GROOMING, SKILL_ID_CHATTERING, SKILL_ID_KEIKAI,
			SKILL_ID_NODOWO_NARASU, SKILL_ID_MYAUMYAU, SKILL_ID_MURENO_CHIKARA,
			SKILL_ID_EBI_PARTY, SKILL_ID_NYAN_GRASS, SKILL_ID_SAVAGENO_TAMASHI,
			SKILL_ID_UMINO_TAMASHI, SKILL_ID_DAICHINO_TAMASHI, SKILL_ID_SEIMEINO_TAMASHI,
			SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_NYAN_TAMASHI, SKILL_ID_SOUL_ATTACK,
			SKILL_ID_UMINO_CHIKARA, SKILL_ID_SEAFOOD_KEI_SHUTOKU_LEVEL_GOKEI,
			SKILL_ID_DAICHINO_CHIKARA, SKILL_ID_PLANT_KEI_SHUTOKU_LEVEL_GOKEI,
			SKILL_ID_SEIMEINO_CHIKARA, SKILL_ID_ANIMAL_KEI_SHUTOKU_LEVEL_GOKEI,
			SKILL_ID_UMINO_TAMASHI, SKILL_ID_DAICHINO_TAMASHI,
			SKILL_ID_SEIMEINO_TAMASHI, SKILL_ID_UZUKUMARU,
			SKILL_ID_DAICHINO_TAMASHI_KOKA_MATATABINO_NEKKO, SKILL_ID_DAICHINO_TAMASHI_KOKA_INUHAKKA_SHOWER,
			SKILL_ID_DAICHINO_TAMASHI_KOKA_NYAN_GRASS, SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP,
			SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_KAMITSUKU,
			SKILL_ID_HIKKAKU,
			SKILL_ID_MATATABI_LANCE,
			SKILL_ID_INUHAKKA_METEOR,
			SKILL_ID_PIKKI_TSUKI,
			SKILL_ID_TAROUNO_KIZU,
			SKILL_ID_CARROT_BEAT,
			SKILL_ID_SAVAGENO_TAMASHI,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_SUMMONER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_STAR_EMPEROR"
		))
		.AddNameKana("星帝", "セイテイ")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(0)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_BOOK, 146)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_STR],
			[2, PARAM_DEX],
			[5, PARAM_AGI],
			[7, PARAM_INT],
			[8, PARAM_STR],
			[9, PARAM_LUK],
			[11, PARAM_DEX],
			[12, PARAM_STR],
			[13, PARAM_AGI],
			[15, PARAM_INT],
			[16, PARAM_LUK],
			[17, PARAM_VIT],
			[19, PARAM_STR],
			[20, PARAM_DEX],
			[21, PARAM_AGI],
			[23, PARAM_STR],
			[24, PARAM_VIT],
			[25, PARAM_INT],
			[27, PARAM_DEX],
			[29, PARAM_AGI],
			[30, PARAM_DEX],
			[31, PARAM_STR],
			[34, PARAM_DEX],
			[35, PARAM_AGI],
			[36, PARAM_LUK],
			[37, PARAM_VIT],
			[38, PARAM_DEX],
			[39, PARAM_STR],
			[41, PARAM_AGI],
			[42, PARAM_VIT],
			[43, PARAM_STR],
			[45, PARAM_DEX],
			[47, PARAM_AGI],
			[48, PARAM_STR],
			[50, PARAM_DEX],
			[56, PARAM_STR],
			[59, PARAM_AGI],
			[61, PARAM_STR],
			[64, PARAM_VIT],
			[65, PARAM_AGI],
			[66, PARAM_VIT],
			[69, PARAM_STR],
			[70, PARAM_AGI],
		])

		.SetHpArray([
			  4945,  5089,
			  5237,  5386,  5536,  5686,  5839,  5994,  6150,  6306,  6465,  6626,
			  6787,  6949,  7113,  7280,  7447,  7615,  7785,  7958,  8130,  8304,
			  8480,  8658,  8836,  9016,  9197,  9381,  9565,  9750,  9938, 10128,
			 10317, 10508, 10701, 10897, 11092, 11289, 11488, 11689, 11891, 12093,
			 12298, 12505, 12712, 12920, 13130, 13343, 13556, 13556, 13986, 14204,
			 14423, 14423, 14864, 15089, 15313, 15538, 15766, 15996, 16226, 16457,
			 16691, 16926, 17162, 17399, 17638, 17880, 18121, 18364, 18609, 18856,
			 19102, 19351, 19602, 19855, 20108, 20325, 20528, 20737, 21161, 21394,
			 21621, 22295, 22533, 23240, 23969, 24122, 24122, 24122, 24581, 24581,
			 24887, 24887, 24887, 24887, 24887, 24887, 24887, 24887, 24887, 26264,
		])

		.SetSpArray([
			   652,   662,
			   672,   682,   692,   702,   712,   722,   732,   742,   752,   762,
			   772,   782,   792,   802,   812,   822,   832,   842,   852,   862,
			   872,   882,   892,   902,   912,   922,   932,   942,   952,   962,
			   972,   982,   992,  1002,  1012,  1022,  1032,  1042,  1052,  1062,
			  1072,  1082,  1092,  1102,  1112,  1122,  1132,  1142,  1152,  1162,
			  1197,  1207,  1242,  1252,  1267,  1285,  1307,  1325,  1352,  1375,
			  1385,  1395,  1405,  1415,  1425,  1435,  1445,  1455,  1465,  1475,
			  1484,  1494,  1505,  1515,  1525,  1530,  1545,  1561,  1567,  1572,
			  1578,  1583,  1601,  1607,  1618,  1623,  1623,  1623,  1638,  1638,
			  1648,  1648,  1648,  1648,  1648,  1648,  1648,  1648,  1648,  1693,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_TAIRIGI, SKILL_ID_NOPITIGI, SKILL_ID_FEORICHAGINO_KAMAE,
			SKILL_ID_NERYOCHAGINO_KAMAE, SKILL_ID_TORURYOCHAGINO_KAMAE, SKILL_ID_APUCHAORURIGINO_KAMAE,
			SKILL_ID_FEORICHAGI, SKILL_ID_NERYOCHAGI, SKILL_ID_TORURYOCHAGI,
			SKILL_ID_APUCHAORURIGI, SKILL_ID_TEIOAPUCHAGI, SKILL_ID_FIGHT,
			SKILL_ID_ODAYAKANA_KYUSOKU, SKILL_ID_TANOSHI_KYUSOKU, SKILL_ID_ATATAKAI_KAZE,
			SKILL_ID_RAKHO, SKILL_ID_TAEGWON_MISSION, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KANZYO,
			SKILL_ID_TAIYONO_NUKUMORI, SKILL_ID_TSUKINO_NUKUMORI, SKILL_ID_HOSHINO_NUKUMORI,
			SKILL_ID_TAIYONO_IKARI, SKILL_ID_TSUKINO_IKARI, SKILL_ID_HOSHINO_IKARI,
			SKILL_ID_TAIYONO_ANRAKU, SKILL_ID_TSUKINO_ANRAKU, SKILL_ID_HOSHINO_ANRAKU,
			SKILL_ID_TAIYONO_SHUKUFUKU, SKILL_ID_TSUKUNO_SHUKUFUKU, SKILL_ID_HOSHINO_SHUKUFUKU,
			SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_NIKUSHIMI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TOMO,
			SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_CHISHIKI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KIROKU,
			SKILL_ID_TAIYONO_KAMAE, SKILL_ID_TSUKINO_KAMAE, SKILL_ID_HOSHINO_KAMAE,
			SKILL_ID_KOEN_KYAKU, SKILL_ID_SAKUGETSU_KYAKU, SKILL_ID_SENKO_KYAKU,
			SKILL_ID_TAIYO_BAKUHATSU, SKILL_ID_MANGETSU_KYAKU, SKILL_ID_RYUSE_RAKKA,
			SKILL_ID_TAIYONO_HIKARI, SKILL_ID_TSUKINO_HIKARI, SKILL_ID_HOSHINO_HIKARI,
			SKILL_ID_UCHUNO_KAMAE, SKILL_ID_ZYURYOKU_CHOSE, SKILL_ID_SHINSE_BAKUHATSU,
			SKILL_ID_SEITE_KORIN, SKILL_ID_SOSENO_SHO, SKILL_ID_ZIGENNO_SHO,
			SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_ZYOKA, SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_TAIRIGI, SKILL_ID_SPURT_ZYOTAI,
			SKILL_ID_FIGHT, SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT,
			SKILL_ID_RAKHO, SKILL_ID_TAIYONO_IKARI,
			SKILL_ID_TSUKINO_IKARI, SKILL_ID_HOSHINO_IKARI,
			SKILL_ID_TAIYONO_ANRAKU, SKILL_ID_TSUKINO_ANRAKU,
			SKILL_ID_HOSHINO_ANRAKU, SKILL_ID_TAIYONO_SHUKUFUKU,
			SKILL_ID_TSUKUNO_SHUKUFUKU, SKILL_ID_HOSHINO_SHUKUFUKU,
			SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO,
			SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KISEKI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_ZYOKA,
			SKILL_ID_TAIYONO_KAMAE, SKILL_ID_TAIYONO_HIKARI,
			SKILL_ID_TSUKINO_KAMAE, SKILL_ID_TSUKINO_HIKARI,
			SKILL_ID_HOSHINO_KAMAE, SKILL_ID_HOSHINO_HIKARI,
			SKILL_ID_RYUSE_RAKKA, SKILL_ID_RYUSE_RAKKA_MODE,
			SKILL_ID_UCHUNO_KAMAE, SKILL_ID_ZIGENNO_SHO,
			SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_FEORICHAGI,
			SKILL_ID_NERYOCHAGI,
			SKILL_ID_TORURYOCHAGI,
			SKILL_ID_APUCHAORURIGI,
			SKILL_ID_TEIOAPUCHAGI,
			SKILL_ID_TEIOAPUCHAGI_IN_DASH,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_NUKUMORI,
			SKILL_ID_NUKUMORI_KABE,
			SKILL_ID_KOEN_KYAKU,
			SKILL_ID_TAIYO_BAKUHATSU,
			SKILL_ID_SAKUGETSU_KYAKU,
			SKILL_ID_MANGETSU_KYAKU,
			SKILL_ID_SENKO_KYAKU,
			SKILL_ID_RYUSE_RAKKA,
			SKILL_ID_ZYURYOKU_CHOSE,
			SKILL_ID_SHINSE_BAKUHATSU,
			SKILL_ID_SEITE_KORIN,
			SKILL_ID_SOSENO_SHO,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_MIRROR_SHIELD,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_BOOK,
			ITEM_EQPFLG_SERIES_KENSEI,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_SOUL_REAPER"
		))
		.AddNameKana("ソウルリーパー", "ソウルリーパー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_3RD)
		.SetWeightBonus(0)

		.AddWeaponAspd(ITEM_KIND_NONE, 149)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 146)
		.AddWeaponAspd(ITEM_KIND_STUFF, 144)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 143)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[2, PARAM_DEX],
			[5, PARAM_INT],
			[6, PARAM_VIT],
			[7, PARAM_DEX],
			[11, PARAM_DEX],
			[12, PARAM_INT],
			[13, PARAM_AGI],
			[15, PARAM_DEX],
			[16, PARAM_INT],
			[17, PARAM_VIT],
			[19, PARAM_STR],
			[20, PARAM_DEX],
			[21, PARAM_AGI],
			[24, PARAM_VIT],
			[25, PARAM_INT],
			[26, PARAM_DEX],
			[28, PARAM_STR],
			[29, PARAM_AGI],
			[30, PARAM_DEX],
			[31, PARAM_INT],
			[34, PARAM_DEX],
			[35, PARAM_AGI],
			[37, PARAM_VIT],
			[38, PARAM_DEX],
			[39, PARAM_INT],
			[41, PARAM_AGI],
			[42, PARAM_VIT],
			[43, PARAM_STR],
			[44, PARAM_INT],
			[45, PARAM_DEX],
			[47, PARAM_AGI],
			[49, PARAM_INT],
			[50, PARAM_DEX],
			[52, PARAM_AGI],
			[54, PARAM_INT],
			[59, PARAM_INT],
			[62, PARAM_DEX],
			[64, PARAM_VIT],
			[65, PARAM_LUK],
			[67, PARAM_DEX],
			[69, PARAM_VIT],
			[70, PARAM_LUK],
		])

		.SetHpArray([
			  5375,  5416,
			  5515,  5613,  5712,  5811,  5910,  6008,  6107,  6206,  6305,  6403,
			  6502,  6601,  6700,  6798,  6897,  6996,  7095,  7193,  7292,  7391,
			  7490,  7588,  7687,  7786,  7885,  7983,  8082,  8181,  8280,  8378,
			  8477,  8576,  8675,  8773,  8872,  8971,  9070,  9168,  9267,  9366,
			  9465,  9563,  9662,  9761,  9860,  9958, 10057, 10156, 10255, 10353,
			 10452, 10551, 10650, 10748, 10847, 10946, 11045, 11143, 11242, 11393,
			 11595, 11797, 12001, 12206, 12412, 12620, 12828, 13038, 13250, 13462,
			 13676, 13891, 14107, 14325, 14543, 15002, 15456, 15772, 16096, 16591,
			 16932, 17456, 18002, 18551, 18947, 19147, 19347, 19547, 19747, 19947,
			 20147, 20347, 20547, 20747, 20947, 20947, 21347, 21347, 21747, 21947,
		])

		.SetSpArray([
			  1125,  1137,
			  1148,  1160,  1171,  1182,  1193,  1205,  1216,  1227,  1238,  1250,
			  1261,  1272,  1283,  1295,  1306,  1317,  1328,  1340,  1351,  1362,
			  1373,  1385,  1396,  1407,  1418,  1430,  1441,  1452,  1463,  1475,
			  1486,  1497,  1508,  1520,  1531,  1542,  1553,  1565,  1576,  1587,
			  1598,  1610,  1621,  1632,  1643,  1655,  1666,  1677,  1688,  1700,
			  1711,  1722,  1733,  1745,  1756,  1767,  1778,  1790,  1801,  1812,
			  1825,  1837,  1850,  1862,  1875,  1888,  1902,  1916,  1930,  1943,
			  1958,  1973,  1988,  2003,  2018,  2027,  2045,  2063,  2081,  2090,
			  2107,  2116,  2125,  2135,  2161,  2168,  2175,  2182,  2189,  2196,
			  2203,  2210,  2217,  2224,  2231,  2231,  2245,  2245,  2259,  2266,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_TAIRIGI, SKILL_ID_NOPITIGI, SKILL_ID_FEORICHAGINO_KAMAE,
			SKILL_ID_NERYOCHAGINO_KAMAE, SKILL_ID_TORURYOCHAGINO_KAMAE, SKILL_ID_APUCHAORURIGINO_KAMAE,
			SKILL_ID_FEORICHAGI, SKILL_ID_NERYOCHAGI, SKILL_ID_TORURYOCHAGI,
			SKILL_ID_APUCHAORURIGI, SKILL_ID_TEIOAPUCHAGI, SKILL_ID_FIGHT,
			SKILL_ID_ODAYAKANA_KYUSOKU, SKILL_ID_TANOSHI_KYUSOKU, SKILL_ID_ATATAKAI_KAZE,
			SKILL_ID_RAKHO, SKILL_ID_TAEGWON_MISSION, SKILL_ID_KAISEL,
			SKILL_ID_KAAHI, SKILL_ID_KAUPU, SKILL_ID_KAITO,
			SKILL_ID_KAINA, SKILL_ID_ESTIN, SKILL_ID_ESTON,
			SKILL_ID_ESMA, SKILL_ID_ESU, SKILL_ID_ESKA,
			SKILL_ID_ESKU, SKILL_ID_KNIGHTNO_TAMASHI, SKILL_ID_ASSASINNO_TAMASHI,
			SKILL_ID_PRIESTNO_TAMASHI, SKILL_ID_HUNTERNO_TAMASHI, SKILL_ID_WIZARDNO_TAMASHI,
			SKILL_ID_BLACKSMITHNO_TAMASHI, SKILL_ID_CRUSADERNO_TAMASHI, SKILL_ID_ROGUENO_TAMASHI,
			SKILL_ID_MONKNO_TAMASHI, SKILL_ID_BARDTO_DANCERNO_TAMASHI, SKILL_ID_SAGENO_TAMASHI,
			SKILL_ID_ALCHEMISTNO_TAMASHI, SKILL_ID_KENSENO_TAMASHI, SKILL_ID_SOULLINKERNO_TAMASHI,
			SKILL_ID_SUPER_NOVICENO_TAMASHI, SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI, SKILL_ID_TAMASHINO_CHIKUSEKI,
			SKILL_ID_TAMASHINO_SHUKAKU, SKILL_ID_TAMASHINO_ZYUNKAN, SKILL_ID_TAMASHINO_RENKETSU,
			SKILL_ID_SOUL_ENERGY_KENKYU, SKILL_ID_SHIRYO_HYOI, SKILL_ID_SHIRYO_BAKUHATSU,
			SKILL_ID_TAKANO_TAMASHI, SKILL_ID_YOSENO_TAMASHI, SKILL_ID_KAGENO_TAMASHI,
			SKILL_ID_GOLEMNO_TAMASHI, SKILL_ID_TAMASHINO_BUNRETSU, SKILL_ID_TAMASHINO_HOKAI,
			SKILL_ID_ESHA, SKILL_ID_ESPA, SKILL_ID_ESFU,
			SKILL_ID_KAUTO, SKILL_ID_FULLSLOT,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_TAIRIGI, SKILL_ID_SPURT_ZYOTAI,
			SKILL_ID_FIGHT, SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT,
			SKILL_ID_RAKHO, SKILL_ID_KAINA,
			SKILL_ID_COUNT_OF_SOUL_ENERGY, SKILL_ID_FULLSLOT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_ESTIN,
			SKILL_ID_ESTON,
			SKILL_ID_ESMA,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_ESHA,
			SKILL_ID_ESPA,
			SKILL_ID_ESFU,
			SKILL_ID_SHIRYO_BAKUHATSU,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_WIZARD_LINKER,
			ITEM_EQPFLG_SERIES_SOUL_LINKER,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();










	//================================================================================================================================
	//
	// 四次職
	//
	//================================================================================================================================

	// TODO: 四次アプデ未対応箇所
	// ・各職ASPD（三次職のまま）

	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_DRAGON_KNIGHT"
		))
		.AddNameKana("ドラゴンナイト", "ドラゴンナイト")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(1500)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 148)
		.AddWeaponAspd(ITEM_KIND_SWORD, 148)
		.AddWeaponAspd(ITEM_KIND_SWORD_2HAND, 143)
		.AddWeaponAspd(ITEM_KIND_SPEAR, 141)
		.AddWeaponAspd(ITEM_KIND_SPEAR_2HAND, 141)
		.AddWeaponAspd(ITEM_KIND_AXE, 141)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 138)
		.AddWeaponAspd(ITEM_KIND_CLUB, 142)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 4)

		.SetJobBonusArray([
			[1, PARAM_STR],
			[1, MIG_PARAM_ID_POW],
			[2, PARAM_DEX],
			[2, MIG_PARAM_ID_SPL],
			[3, PARAM_AGI],
			[3, MIG_PARAM_ID_CRT],
			[4, PARAM_DEX],
			[5, PARAM_AGI],
			[5, PARAM_VIT],
			[5, MIG_PARAM_ID_CON],
			[7, PARAM_LUK],
			[7, MIG_PARAM_ID_SPL],
			[8, PARAM_INT],
			[8, MIG_PARAM_ID_STA],
			[9, PARAM_STR],
			[9, MIG_PARAM_ID_CRT],
			[10, PARAM_DEX],
			[11, PARAM_INT],
			[11, MIG_PARAM_ID_CON],
			[12, PARAM_AGI],
			[14, PARAM_VIT],
			[14, PARAM_LUK],
			[16, PARAM_STR],
			[16, MIG_PARAM_ID_POW],
			[17, PARAM_DEX],
			[18, PARAM_INT],
			[18, MIG_PARAM_ID_CON],
			[19, PARAM_AGI],
			[19, PARAM_VIT],
			[20, MIG_PARAM_ID_SPL],
			[21, PARAM_LUK],
			[22, MIG_PARAM_ID_STA],
			[23, PARAM_AGI],
			[23, PARAM_DEX],
			[24, PARAM_STR],
			[24, MIG_PARAM_ID_SPL],
			[25, PARAM_VIT],
			[25, MIG_PARAM_ID_CRT],
			[26, PARAM_INT],
			[26, MIG_PARAM_ID_POW],
			[27, PARAM_DEX],
			[28, PARAM_LUK],
			[29, MIG_PARAM_ID_POW],
			[29, MIG_PARAM_ID_CON],
			[30, PARAM_STR],
			[31, PARAM_INT],
			[31, PARAM_LUK],
			[32, PARAM_VIT],
			[32, MIG_PARAM_ID_WIS],
			[33, PARAM_AGI],
			[34, MIG_PARAM_ID_CRT],
			[35, PARAM_DEX],
			[35, MIG_PARAM_ID_CON],
			[36, PARAM_STR],
			[36, MIG_PARAM_ID_POW],
			[37, PARAM_INT],
			[37, MIG_PARAM_ID_STA],
			[38, PARAM_AGI],
			[39, MIG_PARAM_ID_SPL],
			[40, PARAM_LUK],
			[40, MIG_PARAM_ID_STA],
			[42, PARAM_VIT],
			[42, MIG_PARAM_ID_CRT],
			[43, PARAM_INT],
			[43, MIG_PARAM_ID_POW],
			[44, PARAM_DEX],
			[44, MIG_PARAM_ID_WIS],
			[45, MIG_PARAM_ID_STA],
			[46, MIG_PARAM_ID_POW],
			[46, MIG_PARAM_ID_CON],
			[47, PARAM_INT],
			[47, MIG_PARAM_ID_WIS],
			[49, PARAM_AGI],
			[49, MIG_PARAM_ID_CRT],
			[50, PARAM_VIT],
			[50, MIG_PARAM_ID_POW],
		])

		.SetHpArray([
			22660,
			22840, 23020, 23200, 23380, 23560, 23740, 23920, 24100, 24280, 24460,
			24640, 24820, 25000, 25180, 25360, 25540, 25720, 25900, 26080, 26260,
			26440, 26620, 26800, 26980, 27160, 27340, 27520, 27700, 27880, 28060,
			28240, 28420, 28600, 28780, 28960, 29140, 29320, 29500, 29680, 29860,
			30040, 30220, 30400, 30580, 30760, 30940, 31120, 31300, 31480, 31660,
		])

		.SetSpArray([
			 1132,
			 1136,  1140,  1144,  1148,  1152,  1156,  1160,  1164,  1168,  1172,
			 1176,  1180,  1184,  1188,  1192,  1196,  1200,  1204,  1208,  1212,
			 1216,  1220,  1224,  1228,  1232,  1236,  1240,  1244,  1248,  1252,
			 1256,  1260,  1264,  1268,  1272,  1276,  1280,  1284,  1288,  1292,
			 1296,  1300,  1304,  1308,  1312,  1316,  1320,  1324,  1328,  1332,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN, SKILL_ID_HP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_BASH, SKILL_ID_MAGNUM_BREAK, SKILL_ID_PROVOKE,
			SKILL_ID_ENDURE, SKILL_ID_IDOZI_HP_KAIFUKU, SKILL_ID_KYUSHO_KOGEKI,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_YARI_SHUREN, SKILL_ID_PIERCE,
			SKILL_ID_SPEAR_STUB, SKILL_ID_SPEAR_BOOMERANG, SKILL_ID_BRANDISH_SPEAR,
			SKILL_ID_TWOHAND_QUICKEN, SKILL_ID_AUTO_COUNTER, SKILL_ID_BOWLING_BASH,
			SKILL_ID_RIDING, SKILL_ID_KIHE_SHUREN, SKILL_ID_CHARGE_ATTACK,
			SKILL_ID_AURA_BLADE, SKILL_ID_PARIYING, SKILL_ID_CONCENTRATION,
			SKILL_ID_HEAD_CRUSH, SKILL_ID_JOINT_BEAT, SKILL_ID_SPIRAL_PIERCE,
			SKILL_ID_TENTION_RELAX, SKILL_ID_BERSERK, SKILL_ID_RUNE_MASTERY,
			SKILL_ID_SONIC_WAVE, SKILL_ID_DEATH_BOUND, SKILL_ID_HANDRED_SPEAR,
			SKILL_ID_WIND_CUTTER, SKILL_ID_PHANTOM_SLAST, SKILL_ID_IGNITION_BREAK,
			SKILL_ID_ENCHANT_BLADE, SKILL_ID_DRAGON_TRAINING, SKILL_ID_DRAGON_HOWLING,
			SKILL_ID_FIRE_DRAGON_BREATH, SKILL_ID_WATER_DRAGON_BREATH, SKILL_ID_FULLSLOT,
			SKILL_ID_SERVANT_WEAPON, SKILL_ID_SERVANT_WEAPON_SIGN, SKILL_ID_SERVANT_WEAPON_PHANTOM,
			SKILL_ID_SERVANT_WEAPON_DEMOLISION, SKILL_ID_CHARGING_PIERCE, SKILL_ID_TWOHAND_DEFENDING,
			SKILL_ID_HACK_AND_SLASHER, SKILL_ID_DRAGONIC_AURA, SKILL_ID_MADNESS_CRUSHER,
			SKILL_ID_VIGOR, SKILL_ID_STORM_SLASH,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_YARI_SHUREN,
			SKILL_ID_TWOHAND_QUICKEN, SKILL_ID_DRAGON_TRAINING,
			SKILL_ID_AURA_BLADE, SKILL_ID_CONCENTRATION,
			SKILL_ID_BERSERK, SKILL_ID_PARIYING,
			SKILL_ID_ONEHAND_QUICKEN, SKILL_ID_ENDURE,
			SKILL_ID_ENCHANT_BLADE, SKILL_ID_RUNE_MASTERY,
			SKILL_ID_GIANT_GROWTH, SKILL_ID_FIGHTING_SPIRIT,
			SKILL_ID_STONE_HARD_SKIN, SKILL_ID_FULLSLOT,
			SKILL_ID_SERVANT_WEAPON, SKILL_ID_TWOHAND_DEFENDING,
			SKILL_ID_VIGOR, SKILL_ID_DRAGONIC_AURA_STATE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
			SKILL_ID_PIERCE,
			SKILL_ID_SPEAR_STUB,
			SKILL_ID_SPEAR_BOOMERANG,
			SKILL_ID_BRANDISH_SPEAR,
			SKILL_ID_BOWLING_BASH,
			SKILL_ID_CHARGE_ATTACK,
			SKILL_ID_SPIRAL_PIERCE,
			SKILL_ID_HEAD_CRUSH,
			SKILL_ID_JOINT_BEAT,
			SKILL_ID_IGNITION_BREAK,
			SKILL_ID_FIRE_DRAGON_BREATH,
			SKILL_ID_WATER_DRAGON_BREATH,
			SKILL_ID_WIND_CUTTER,
			SKILL_ID_SONIC_WAVE,
			SKILL_ID_HANDRED_SPEAR,
			SKILL_ID_PHANTOM_SLAST,
			SKILL_ID_STORM_BLAST,
			SKILL_ID_CRUSH_STRIKE,
			SKILL_ID_DEATH_BOUND,
			SKILL_ID_SERVANT_WEAPON_PHANTOM,
			SKILL_ID_SERVANT_WEAPON_DEMOLISION,
			SKILL_ID_HACK_AND_SLASHER,
			SKILL_ID_MADNESS_CRUSHER,
			SKILL_ID_STORM_SLASH,
			SKILL_ID_DRAGONIC_AURA,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_SWORDMAN,
			ITEM_EQPFLG_SERIES_UPPER_OF_SWORDMAN,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_MIRROR_SHIELD,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_SERIES_KNIGHT,
			ITEM_EQPFLG_SERIES_LOAR_KNIGHT,
			ITEM_EQPFLG_RUNEKNIGHT,
			ITEM_EQPFLG_DRAGON_KNIGHT,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_SHADOW_CROSS"
		))
		.AddNameKana("シャドウクロス", "シャドウクロス")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(1200)

		.AddWeaponAspd(ITEM_KIND_NONE, 153)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 156)
		.AddWeaponAspd(ITEM_KIND_SWORD, 143)
		.AddWeaponAspd(ITEM_KIND_AXE, 140)
		.AddWeaponAspd(ITEM_KIND_KATAR, 157)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_STR],
			[1, PARAM_AGI],
			[2, PARAM_STR],
			[2, PARAM_AGI],
			[3, PARAM_AGI],
			[3, PARAM_DEX],
			[4, PARAM_STR],
			[4, PARAM_LUK],
			[5, MIG_PARAM_ID_POW],
			[6, PARAM_AGI],
			[6, PARAM_INT],
			[7, PARAM_STR],
			[7, PARAM_VIT],
			[8, PARAM_DEX],
			[8, MIG_PARAM_ID_POW],
			[9, PARAM_INT],
			[9, PARAM_LUK],
			[10, MIG_PARAM_ID_STA],
			[11, PARAM_AGI],
			[11, PARAM_DEX],
			[12, MIG_PARAM_ID_POW],
			[13, PARAM_AGI],
			[13, PARAM_VIT],
			[14, PARAM_VIT],
			[15, PARAM_STR],
			[15, PARAM_AGI],
			[16, MIG_PARAM_ID_POW],
			[17, PARAM_STR],
			[17, PARAM_INT],
			[18, MIG_PARAM_ID_POW],
			[19, PARAM_AGI],
			[20, PARAM_DEX],
			[20, MIG_PARAM_ID_STA],
			[21, PARAM_VIT],
			[21, PARAM_DEX],
			[22, PARAM_INT],
			[23, PARAM_VIT],
			[23, PARAM_DEX],
			[24, PARAM_DEX],
			[24, MIG_PARAM_ID_CON],
			[25, PARAM_STR],
			[25, PARAM_DEX],
			[26, PARAM_DEX],
			[27, PARAM_STR],
			[27, PARAM_AGI],
			[28, PARAM_LUK],
			[29, PARAM_AGI],
			[30, PARAM_INT],
			[30, PARAM_LUK],
			[31, MIG_PARAM_ID_POW],
			[32, MIG_PARAM_ID_CON],
			[33, MIG_PARAM_ID_POW],
			[34, MIG_PARAM_ID_STA],
			[35, MIG_PARAM_ID_CON],
			[35, MIG_PARAM_ID_CRT],
			[36, PARAM_AGI],
			[37, MIG_PARAM_ID_POW],
			[37, MIG_PARAM_ID_CON],
			[38, MIG_PARAM_ID_CRT],
			[39, MIG_PARAM_ID_STA],
			[39, MIG_PARAM_ID_WIS],
			[40, MIG_PARAM_ID_POW],
			[40, MIG_PARAM_ID_STA],
			[41, MIG_PARAM_ID_WIS],
			[42, MIG_PARAM_ID_POW],
			[43, PARAM_VIT],
			[44, MIG_PARAM_ID_STA],
			[45, MIG_PARAM_ID_STA],
			[45, MIG_PARAM_ID_WIS],
			[46, MIG_PARAM_ID_CRT],
			[47, MIG_PARAM_ID_CON],
			[48, MIG_PARAM_ID_CRT],
			[49, MIG_PARAM_ID_WIS],
			[49, MIG_PARAM_ID_CON],
			[50, MIG_PARAM_ID_POW],
			[50, MIG_PARAM_ID_CRT],
		])

		.SetHpArray([
			 21849,
			 22023, 22197, 22371, 22545, 22719, 22893, 23067, 23241, 23415, 23589,
			 23763, 23937, 24111, 24285, 24459, 24633, 24807, 24981, 25155, 25329,
			 25503, 25677, 25851, 26025, 26199, 26373, 26547, 26721, 26895, 27069,
			 27243, 27417, 27591, 27765, 27939, 28113, 28287, 28461, 28635, 28809,
			 28983, 29157, 29331, 29505, 29679, 29853, 30027, 30201, 30375, 30549,
		])

		.SetSpArray([
			  1037,
			  1041,  1045,  1049,  1053,  1057,  1061,  1065,  1069,  1073,  1077,
			  1081,  1085,  1089,  1093,  1097,  1101,  1105,  1109,  1113,  1117,
			  1121,  1125,  1129,  1133,  1137,  1141,  1145,  1149,  1153,  1157,
			  1161,  1165,  1169,  1173,  1177,  1181,  1185,  1189,  1193,  1197,
			  1201,  1205,  1209,  1213,  1217,  1221,  1225,  1229,  1233,  1237,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_STEAL,
			SKILL_ID_HIDING, SKILL_ID_ENVENOM, SKILL_ID_GEDOKU,
			SKILL_ID_SUNAMAKI, SKILL_ID_ISHIHIROI, SKILL_ID_ISHINAGE,
			SKILL_ID_BACKSTEP, SKILL_ID_MIGITE_SHUREN, SKILL_ID_HIDARITE_SHUREN,
			SKILL_ID_KATAR_SHUREN, SKILL_ID_SONIC_BLOW, SKILL_ID_GRIM_TOOTH,
			SKILL_ID_CLOAKING, SKILL_ID_ENCHANT_POISON, SKILL_ID_POISON_REACT,
			SKILL_ID_VENOM_DUST, SKILL_ID_VENOM_SPLASHER, SKILL_ID_VENOM_KNIFE,
			SKILL_ID_SONIC_ACCELERATION, SKILL_ID_KATAR_KENKYU, SKILL_ID_SOUL_BREAKER,
			SKILL_ID_METEOR_ASSALT, SKILL_ID_CREATE_DEADLY_POISON, SKILL_ID_ENCHANT_DEADLY_POISON,
			SKILL_ID_VENOM_IMPRESS, SKILL_ID_CROSS_IMPACT, SKILL_ID_DARK_ILLUSION,
			SKILL_ID_SHINDOKU_KENKYU, SKILL_ID_SHINDOKU_SEIZO, SKILL_ID_ANTIDOTE,
			SKILL_ID_POISONING_WEAPON, SKILL_ID_VENOM_PRESSURE, SKILL_ID_POISON_SMOKE,
			SKILL_ID_WEAPON_BLOCKING, SKILL_ID_COUNTER_SLASH, SKILL_ID_WEAPON_CRUSH,
			SKILL_ID_CLOAKING_EXCEED, SKILL_ID_PHANTOM_MENUS, SKILL_ID_HALLUCINATION_WALK,
			SKILL_ID_ROLLING_CUTTER, SKILL_ID_CROSS_RIPPER_SLASHER, SKILL_ID_DARK_CRAW,
			SKILL_ID_FULLSLOT, SKILL_ID_SHADOW_SENSE, SKILL_ID_DANCING_KNIFE,
			SKILL_ID_ETERNAL_SLASH, SKILL_ID_SHADOW_STAB, SKILL_ID_SAVAGE_IMPACT,
			SKILL_ID_IMPACT_CRATER, SKILL_ID_FATAL_SHADOW_CRAW, SKILL_ID_ENCHANTING_SHADOW,
			SKILL_ID_POTENT_VENOM, SKILL_ID_SHADOW_EXCEED,

		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA,
			SKILL_ID_MIGITE_SHUREN, SKILL_ID_HIDARITE_SHUREN,
			SKILL_ID_KATAR_SHUREN, SKILL_ID_KATAR_KENKYU,
			SKILL_ID_ENCHANT_DEADLY_POISON, SKILL_ID_SONIC_ACCELERATION,
			SKILL_ID_HALLUCINATION_WALK, SKILL_ID_HALLUCINATION_WALKGONO_ASPD_GENSHO,
			SKILL_ID_CANCEL_EDP_POISON_ATTACK, SKILL_ID_FULLSLOT,
			SKILL_ID_SHADOW_SENSE, SKILL_ID_POTENT_VENOM,
			SKILL_ID_SHADOW_EXCEED,

		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_ENVENOM,
			SKILL_ID_SUNAMAKI,
			SKILL_ID_ISHINAGE,
			SKILL_ID_SONIC_BLOW,
			SKILL_ID_GRIM_TOOTH,
			SKILL_ID_VENOM_SPLASHER,
			SKILL_ID_POISON_REACT,
			SKILL_ID_VENOM_KNIFE,
			SKILL_ID_SONIC_BLOW_TAMASHI,
			SKILL_ID_SOUL_BREAKER,
			SKILL_ID_METEOR_ASSALT,
			SKILL_ID_CROSS_IMPACT,
			SKILL_ID_ROLLING_CUTTER,
			SKILL_ID_CROSS_RIPPER_SLASHER,
			SKILL_ID_COUNTER_SLASH,
			SKILL_ID_DARK_ILLUSION,
			SKILL_ID_VENOM_PRESSURE,
			SKILL_ID_PHANTOM_MENUS,
			SKILL_ID_DARK_CRAW,
			SKILL_ID_DANCING_KNIFE,
			SKILL_ID_ETERNAL_SLASH,
			SKILL_ID_SHADOW_STAB,
			SKILL_ID_SAVAGE_IMPACT,
			SKILL_ID_IMPACT_CRATER,
			SKILL_ID_FATAL_SHADOW_CRAW,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_THIEF_NINJA,
			ITEM_EQPFLG_SERIES_UPPER_OF_THIEF,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_ASSASIN_PRIEST,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_ASSASIN,
			ITEM_EQPFLG_SERIES_ASSASIN_CROSS,
			ITEM_EQPFLG_GLTCROSS,
			ITEM_EQPFLG_SHADOW_CROSS,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_CARDINAL"
		))
		.AddNameKana("カーディナル", "カーディナル")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(1000)

		.AddWeaponAspd(ITEM_KIND_NONE, 173)
		.AddWeaponAspd(ITEM_KIND_CLUB, 144)
		.AddWeaponAspd(ITEM_KIND_STUFF, 145)
		.AddWeaponAspd(ITEM_KIND_BOOK, 152)
		.AddWeaponAspd(ITEM_KIND_FIST, 170)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 139)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 4)

		.SetJobBonusArray([
			[1, PARAM_STR],
			[1, PARAM_INT],
			[2, MIG_PARAM_ID_SPL],
			[3, PARAM_INT],
			[3, MIG_PARAM_ID_STA],
			[4, PARAM_DEX],
			[4, MIG_PARAM_ID_SPL],
			[5, PARAM_AGI],
			[6, PARAM_AGI],
			[6, MIG_PARAM_ID_STA],
			[7, PARAM_LUK],
			[8, PARAM_INT],
			[8, MIG_PARAM_ID_SPL],
			[9, PARAM_VIT],
			[10, PARAM_VIT],
			[11, PARAM_INT],
			[11, MIG_PARAM_ID_POW],
			[12, PARAM_INT],
			[13, PARAM_DEX],
			[14, PARAM_DEX],
			[14, MIG_PARAM_ID_POW],
			[15, PARAM_STR],
			[16, PARAM_AGI],
			[16, PARAM_DEX],
			[17, PARAM_VIT],
			[17, PARAM_LUK],
			[18, PARAM_STR],
			[18, PARAM_INT],
			[19, PARAM_AGI],
			[19, PARAM_DEX],
			[20, PARAM_VIT],
			[20, PARAM_INT],
			[21, PARAM_STR],
			[22, PARAM_INT],
			[23, PARAM_DEX],
			[24, PARAM_STR],
			[24, MIG_PARAM_ID_POW],
			[25, MIG_PARAM_ID_STA],
			[26, PARAM_AGI],
			[26, MIG_PARAM_ID_WIS],
			[27, PARAM_DEX],
			[27, MIG_PARAM_ID_WIS],
			[28, PARAM_INT],
			[29, PARAM_VIT],
			[30, PARAM_INT],
			[30, MIG_PARAM_ID_CRT],
			[31, PARAM_AGI],
			[32, PARAM_AGI],
			[32, MIG_PARAM_ID_CRT],
			[33, PARAM_INT],
			[34, PARAM_VIT],
			[34, PARAM_LUK],
			[35, MIG_PARAM_ID_SPL],
			[36, PARAM_INT],
			[36, MIG_PARAM_ID_CON],
			[37, PARAM_VIT],
			[38, MIG_PARAM_ID_CON],
			[39, PARAM_STR],
			[39, MIG_PARAM_ID_SPL],
			[40, MIG_PARAM_ID_CON],
			[41, PARAM_LUK],
			[42, MIG_PARAM_ID_POW],
			[43, MIG_PARAM_ID_POW],
			[43, MIG_PARAM_ID_SPL],
			[44, MIG_PARAM_ID_WIS],
			[45, MIG_PARAM_ID_CON],
			[45, MIG_PARAM_ID_CRT],
			[46, MIG_PARAM_ID_POW],
			[46, MIG_PARAM_ID_CRT],
			[47, MIG_PARAM_ID_WIS],
			[47, MIG_PARAM_ID_SPL],
			[48, MIG_PARAM_ID_STA],
			[49, MIG_PARAM_ID_POW],
			[49, MIG_PARAM_ID_CRT],
			[50, MIG_PARAM_ID_SPL],
			[50, MIG_PARAM_ID_CRT],
		])

		.SetHpArray([
			 19236,
			 19389, 19542, 19695, 19848, 20001, 20154, 20307, 20460, 20613, 20766,
			 20919, 21072, 21225, 21378, 21531, 21684, 21837, 21990, 22143, 22296,
			 22449, 22602, 22755, 22908, 23061, 23214, 23367, 23520, 23673, 23826,
			 23979, 24132, 24285, 24438, 24591, 24744, 24897, 25050, 25203, 25356,
			 25509, 25662, 25815, 25968, 26121, 26274, 26427, 26580, 26733, 26886,
		])

		.SetSpArray([
			  1832,
			  1839,  1846,  1853,  1860,  1867,  1874,  1881,  1888,  1895,  1902,
			  1909,  1916,  1923,  1930,  1937,  1944,  1951,  1958,  1965,  1972,
			  1979,  1986,  1993,  2000,  2007,  2014,  2021,  2028,  2035,  2042,
			  2049,  2056,  2063,  2070,  2077,  2084,  2091,  2098,  2105,  2112,
			  2119,  2126,  2133,  2140,  2147,  2154,  2161,  2168,  2175,  2182,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE, SKILL_ID_SIGNUM_CRUCIS,
			SKILL_ID_HEAL, SKILL_ID_CURE, SKILL_ID_ANGELUS,
			SKILL_ID_BLESSING, SKILL_ID_SOKUDO_ZOKA, SKILL_ID_SOKUDO_GENSHO,
			SKILL_ID_RUWACH, SKILL_ID_TELEPORT, SKILL_ID_WARP_PORTAL,
			SKILL_ID_PNEUMA, SKILL_ID_AQUA_BENEDICTA, SKILL_ID_HOLY_LIGHT,
			SKILL_ID_MAGNIFICAT, SKILL_ID_KYRIE_ELEISON, SKILL_ID_GLORIA,
			SKILL_ID_IMPOSITIO_MANUS, SKILL_ID_SUFFRAGIUM, SKILL_ID_ASPERSIO,
			SKILL_ID_RECOVERY, SKILL_ID_RESURRECTION, SKILL_ID_SANCTUARY,
			SKILL_ID_LEX_DIVINA, SKILL_ID_LEX_AETERNA, SKILL_ID_SAFETY_WALL,
			SKILL_ID_TURN_UNDEAD, SKILL_ID_MAGNUS_EXORCISMUS, SKILL_ID_SP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_MACE_SHUREN, SKILL_ID_SLOW_POISON, SKILL_ID_SEITAI_KOFUKU,
			SKILL_ID_REDEMPTIO, SKILL_ID_MEDITATIO, SKILL_ID_MANA_RECHARGE,
			SKILL_ID_ASSUMPTIO, SKILL_ID_BASILICA, SKILL_ID_ANCILLA,
			SKILL_ID_HIGHNESS_HEAL, SKILL_ID_COLUCEO_HEAL, SKILL_ID_EPICLESIS,
			SKILL_ID_CLEMENTIA, SKILL_ID_CANTOCANDIDUS, SKILL_ID_PRAEFATIO,
			SKILL_ID_LAUDAAGNUS, SKILL_ID_LAUDARAMUS, SKILL_ID_CLEARANCE,
			SKILL_ID_RENOVATIO, SKILL_ID_SECRAMENT, SKILL_ID_EXPIATIO,
			SKILL_ID_ORATIO, SKILL_ID_JUDEX, SKILL_ID_ADORAMUS,
			SKILL_ID_SILENTIUM, SKILL_ID_DUPLELIGHT, SKILL_ID_EUCHARISTICA,
			SKILL_ID_OFFERTORIUM, SKILL_ID_FULLSLOT, SKILL_ID_DIRECTIO_HEAL,
			SKILL_ID_MEDIA_REBOTUM, SKILL_ID_REPARATIO, SKILL_ID_PRESENSE_AKYACE,
			SKILL_ID_ARUGUTUS_TERUM, SKILL_ID_ARUGUTUS_VITA, SKILL_ID_CONPETENTIA,
			SKILL_ID_BENEDICTUM, SKILL_ID_RERIGIO, SKILL_ID_FIDOS_ANIMUS,
			SKILL_ID_PHREMEN, SKILL_ID_ARBITRIUM, SKILL_ID_NUMATIC_PROCERA,
			SKILL_ID_DONKI_HON_SHUREN, SKILL_ID_PETITIO, SKILL_ID_EFIRIGO,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE,
			SKILL_ID_MACE_SHUREN, SKILL_ID_MEDITATIO,
			SKILL_ID_EUCHARISTICA, SKILL_ID_DUPLELIGHT,
			SKILL_ID_EXPIATIO, SKILL_ID_MANA_RECHARGE,
			SKILL_ID_OFFERTORIUM, SKILL_ID_FULLSLOT,
			SKILL_ID_FIDOS_ANIMUS, SKILL_ID_DONKI_HON_SHUREN,
			SKILL_ID_PETITIO_LEARNED,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_HEAL,
			SKILL_ID_HOLY_LIGHT,
			SKILL_ID_RUWACH,
			SKILL_ID_TURN_UNDEAD,
			SKILL_ID_RESURRECTION,
			SKILL_ID_MAGNUS_EXORCISMUS,
			SKILL_ID_SANCTUARY,
			SKILL_ID_HOLY_LIGHT_TAMASHI,
			SKILL_ID_JUDEX,
			SKILL_ID_ADORAMUS,
			SKILL_ID_HIGHNESS_HEAL,
			SKILL_ID_PHREMEN,
			SKILL_ID_ARBITRIUM,
			SKILL_ID_NUMATIC_PROCERA,
			SKILL_ID_PETITIO,
			SKILL_ID_EFIRIGO,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ACOLYTE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ACOLYTE,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_ASSASIN_PRIEST,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_TYPE_BOOK,
			ITEM_EQPFLG_SERIES_PRIEST,
			ITEM_EQPFLG_SERIES_HIGH_PRIEST,
			ITEM_EQPFLG_ARCBISHOP,
			ITEM_EQPFLG_CARDINAL,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_WIND_HAWK"
		))
		.AddNameKana("ウィンドホーク", "ウィンドホーク")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(1200)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 144)
		.AddWeaponAspd(ITEM_KIND_BOW, 154)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_DEX],
			[2, PARAM_VIT],
			[3, PARAM_AGI],
			[3, MIG_PARAM_ID_CON],
			[4, PARAM_INT],
			[5, PARAM_AGI],
			[5, MIG_PARAM_ID_POW],
			[6, PARAM_VIT],
			[7, MIG_PARAM_ID_CON],
			[8, PARAM_DEX],
			[8, MIG_PARAM_ID_SPL],
			[9, PARAM_VIT],
			[9, MIG_PARAM_ID_WIS],
			[10, PARAM_AGI],
			[11, PARAM_VIT],
			[11, MIG_PARAM_ID_CON],
			[12, PARAM_AGI],
			[13, PARAM_AGI],
			[13, MIG_PARAM_ID_POW],
			[14, PARAM_LUK],
			[14, MIG_PARAM_ID_CON],
			[15, PARAM_DEX],
			[15, MIG_PARAM_ID_SPL],
			[16, PARAM_INT],
			[16, MIG_PARAM_ID_STA],
			[17, MIG_PARAM_ID_CRT],
			[18, PARAM_LUK],
			[18, MIG_PARAM_ID_CON],
			[19, PARAM_AGI],
			[20, PARAM_VIT],
			[21, PARAM_INT],
			[21, MIG_PARAM_ID_WIS],
			[22, PARAM_DEX],
			[23, PARAM_STR],
			[23, MIG_PARAM_ID_STA],
			[24, MIG_PARAM_ID_POW],
			[25, PARAM_VIT],
			[26, PARAM_AGI],
			[26, PARAM_INT],
			[27, PARAM_LUK],
			[28, MIG_PARAM_ID_CON],
			[29, PARAM_DEX],
			[29, MIG_PARAM_ID_CON],
			[30, MIG_PARAM_ID_STA],
			[31, PARAM_LUK],
			[31, MIG_PARAM_ID_CRT],
			[32, MIG_PARAM_ID_SPL],
			[33, PARAM_AGI],
			[33, MIG_PARAM_ID_WIS],
			[34, PARAM_INT],
			[34, MIG_PARAM_ID_POW],
			[35, PARAM_VIT],
			[36, PARAM_DEX],
			[36, MIG_PARAM_ID_WIS],
			[37, PARAM_INT],
			[38, PARAM_AGI],
			[38, PARAM_INT],
			[39, PARAM_AGI],
			[40, MIG_PARAM_ID_POW],
			[40, MIG_PARAM_ID_CRT],
			[41, PARAM_AGI],
			[41, MIG_PARAM_ID_SPL],
			[42, MIG_PARAM_ID_POW],
			[42, MIG_PARAM_ID_STA],
			[43, PARAM_DEX],
			[44, MIG_PARAM_ID_WIS],
			[44, MIG_PARAM_ID_CON],
			[45, PARAM_STR],
			[45, PARAM_INT],
			[46, MIG_PARAM_ID_CRT],
			[47, PARAM_AGI],
			[47, MIG_PARAM_ID_POW],
			[48, PARAM_INT],
			[49, PARAM_VIT],
			[50, PARAM_DEX],
			[50, MIG_PARAM_ID_CON],
		])

		.SetHpArray([
			 18197,
			 18342, 18487, 18632, 18777, 18922, 19067, 19212, 19357, 19502, 19647,
			 19792, 19937, 20082, 20227, 20372, 20517, 20662, 20807, 20952, 21097,
			 21242, 21387, 21532, 21677, 21822, 21967, 22112, 22257, 22402, 22547,
			 22692, 22837, 22982, 23127, 23272, 23417, 23562, 23707, 23852, 23997,
			 24142, 24287, 24432, 24577, 24722, 24867, 25012, 25157, 25302, 25447,
		])

		.SetSpArray([
			  1027,
			  1031,  1035,  1039,  1043,  1047,  1051,  1055,  1059,  1063,  1067,
			  1071,  1075,  1079,  1083,  1087,  1091,  1095,  1099,  1103,  1107,
			  1111,  1115,  1119,  1123,  1127,  1131,  1135,  1139,  1143,  1147,
			  1151,  1155,  1159,  1163,  1167,  1171,  1175,  1179,  1183,  1187,
			  1191,  1195,  1199,  1203,  1207,  1211,  1215,  1219,  1223,  1227,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_DOUBLE_STRAFING, SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YA_SAKUSEI, SKILL_ID_SKID_TRAP, SKILL_ID_ANKLESNARE,
			SKILL_ID_FREEZING_TRAP, SKILL_ID_FLASHER, SKILL_ID_SANDMAN,
			SKILL_ID_LAND_MINE, SKILL_ID_BLAST_MINE, SKILL_ID_CLAYMORE_TRAP,
			SKILL_ID_SHOCKWAVE_TRAP, SKILL_ID_REMOVE_TRAP, SKILL_ID_TALKIE_BOX,
			SKILL_ID_BEAST_BANE, SKILL_ID_FALCON_MASTERY, SKILL_ID_DETECTING,
			SKILL_ID_BLITZ_BEAT, SKILL_ID_STEEL_CROW, SKILL_ID_SPRING_TRAP,
			SKILL_ID_FANTASMIC_ARROW, SKILL_ID_TRUE_SIGHT, SKILL_ID_WIND_WALK,
			SKILL_ID_SHARP_SHOOTING, SKILL_ID_FALCON_ASSALT, SKILL_ID_RANGER_MAIN,
			SKILL_ID_CAMOUFLAGE, SKILL_ID_TRAP_KENKYU, SKILL_ID_MAGENTA_TRAP,
			SKILL_ID_COBALT_TRAP, SKILL_ID_VERDURE_TRAP, SKILL_ID_MAZE_TRAP,
			SKILL_ID_CLUSTER_BOMB, SKILL_ID_DETONATOR, SKILL_ID_ELECTRIC_SHOCKER,
			SKILL_ID_FIRING_TRAP, SKILL_ID_ICEBOUND_TRAP, SKILL_ID_FEAR_BLEATH,
			SKILL_ID_AIMED_BOLT, SKILL_ID_ARROW_STORM, SKILL_ID_WUG_MASTERY,
			SKILL_ID_TOOTH_OF_WUG, SKILL_ID_WUG_STRIKE, SKILL_ID_WUG_RIDER,
			SKILL_ID_EIBINNA_KYUKAKU, SKILL_ID_WUG_BITE, SKILL_ID_WUG_DASH,
			SKILL_ID_UNLIMIT, SKILL_ID_FULLSLOT, SKILL_ID_CRESSIVE_VOLT,
			SKILL_ID_GALE_STORM, SKILL_ID_SHIZEN_SHINWA, SKILL_ID_WIND_SIGN,
			SKILL_ID_CALAMITY_GALE, SKILL_ID_ADVANCED_TRAP, SKILL_ID_SOLID_TRAP,
			SKILL_ID_FLAME_TRAP, SKILL_ID_DEEP_BLIND_TRAP, SKILL_ID_SWIFT_TRAP,
			SKILL_ID_HAWK_MASTERY, SKILL_ID_HAWK_RUSH, SKILL_ID_HAWK_BOOMERANG,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME,
			SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_BEAST_BANE,
			SKILL_ID_BLITZ_BEAT, SKILL_ID_STEEL_CROW,
			SKILL_ID_TRUE_SIGHT, SKILL_ID_WIND_WALK,
			SKILL_ID_HUNTERNO_TAMASHI_KOKA, SKILL_ID_RANGER_MAIN,
			SKILL_ID_TRAP_KENKYU, SKILL_ID_TOOTH_OF_WUG,
			SKILL_ID_AUTO_WUG, SKILL_ID_FEAR_BLEATH,
			SKILL_ID_CAMOUFLAGE, SKILL_ID_UNLIMIT,
			SKILL_ID_FULLSLOT, SKILL_ID_ADVANCED_TRAP,
			SKILL_ID_SHIZEN_SHINWA, SKILL_ID_HAWK_RUSH,
			SKILL_ID_CALAMITY_GALE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_FANTASMIC_ARROW,
			SKILL_ID_BLITZ_BEAT,
			SKILL_ID_LAND_MINE,
			SKILL_ID_FREEZING_TRAP,
			SKILL_ID_BLAST_MINE,
			SKILL_ID_CLAYMORE_TRAP,
			SKILL_ID_BEAST_STRAIFING,
			SKILL_ID_FALCON_ASSALT,
			SKILL_ID_SHARP_SHOOTING,
			SKILL_ID_AIMED_BOLT,
			SKILL_ID_ARROW_STORM,
			SKILL_ID_CLUSTER_BOMB,
			SKILL_ID_FIRING_TRAP,
			SKILL_ID_ICEBOUND_TRAP,
			SKILL_ID_WUG_STRIKE,
			SKILL_ID_WUG_BITE,
			SKILL_ID_EIBINNA_KYUKAKU,
			SKILL_ID_WUG_DASH,
			SKILL_ID_CRESSIVE_VOLT,
			SKILL_ID_GALE_STORM,
			SKILL_ID_SOLID_TRAP,
			SKILL_ID_FLAME_TRAP,
			SKILL_ID_DEEP_BLIND_TRAP,
			SKILL_ID_SWIFT_TRAP,
			SKILL_ID_HAWK_RUSH,
			SKILL_ID_HAWK_BOOMERANG,

		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ARCHER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ARCHER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_RENDO,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_HUNTER_ROGUE,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_HUNTER,
			ITEM_EQPFLG_SERIES_SNIPER,
			ITEM_EQPFLG_RANGER,
			ITEM_EQPFLG_WIND_HAWK,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_ARCH_MAGE"
		))
		.AddNameKana("アークメイジ", "アークメイジ")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(1000)

		.AddWeaponAspd(ITEM_KIND_NONE, 149)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 143)
		.AddWeaponAspd(ITEM_KIND_STUFF, 145)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 140)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[1, MIG_PARAM_ID_SPL],
			[2, PARAM_DEX],
			[3, MIG_PARAM_ID_WIS],
			[4, PARAM_VIT],
			[4, MIG_PARAM_ID_SPL],
			[5, PARAM_VIT],
			[5, PARAM_INT],
			[6, PARAM_LUK],
			[7, MIG_PARAM_ID_WIS],
			[7, MIG_PARAM_ID_CON],
			[8, PARAM_AGI],
			[9, PARAM_STR],
			[9, PARAM_AGI],
			[10, MIG_PARAM_ID_WIS],
			[11, PARAM_INT],
			[12, PARAM_VIT],
			[12, PARAM_INT],
			[13, PARAM_DEX],
			[13, MIG_PARAM_ID_SPL],
			[14, MIG_PARAM_ID_STA],
			[14, MIG_PARAM_ID_CON],
			[15, PARAM_LUK],
			[16, PARAM_AGI],
			[16, PARAM_INT],
			[17, MIG_PARAM_ID_STA],
			[18, PARAM_INT],
			[18, PARAM_DEX],
			[19, PARAM_INT],
			[20, PARAM_VIT],
			[20, PARAM_INT],
			[21, PARAM_LUK],
			[21, MIG_PARAM_ID_SPL],
			[22, MIG_PARAM_ID_CON],
			[23, PARAM_AGI],
			[23, MIG_PARAM_ID_STA],
			[24, PARAM_DEX],
			[25, PARAM_INT],
			[25, PARAM_DEX],
			[26, PARAM_INT],
			[26, MIG_PARAM_ID_SPL],
			[27, MIG_PARAM_ID_CON],
			[28, PARAM_AGI],
			[29, PARAM_LUK],
			[29, MIG_PARAM_ID_SPL],
			[30, MIG_PARAM_ID_CRT],
			[31, PARAM_AGI],
			[31, PARAM_DEX],
			[32, PARAM_DEX],
			[33, MIG_PARAM_ID_CON],
			[34, PARAM_INT],
			[34, MIG_PARAM_ID_CON],
			[35, PARAM_INT],
			[36, MIG_PARAM_ID_SPL],
			[37, PARAM_VIT],
			[37, MIG_PARAM_ID_SPL],
			[38, PARAM_AGI],
			[38, PARAM_INT],
			[39, PARAM_DEX],
			[40, PARAM_VIT],
			[41, PARAM_VIT],
			[41, MIG_PARAM_ID_STA],
			[42, MIG_PARAM_ID_CON],
			[43, PARAM_VIT],
			[43, MIG_PARAM_ID_SPL],
			[44, PARAM_INT],
			[44, MIG_PARAM_ID_STA],
			[45, MIG_PARAM_ID_WIS],
			[46, PARAM_INT],
			[46, MIG_PARAM_ID_SPL],
			[47, MIG_PARAM_ID_SPL],
			[48, MIG_PARAM_ID_STA],
			[48, MIG_PARAM_ID_WIS],
			[49, MIG_PARAM_ID_CON],
			[50, MIG_PARAM_ID_STA],
			[50, MIG_PARAM_ID_WIS],
		])

		.SetHpArray([
			 17155,
			 17292, 17429, 17566, 17703, 17840, 17977, 18114, 18251, 18388, 18525,
			 18662, 18799, 18936, 19073, 19210, 19347, 19484, 19621, 19758, 19895,
			 20032, 20169, 20306, 20443, 20580, 20717, 20854, 20991, 21128, 21265,
			 21402, 21539, 21676, 21813, 21950, 22087, 22224, 22361, 22498, 22635,
			 22772, 22909, 23046, 23183, 23320, 23457, 23594, 23731, 23868, 24005,
		])

		.SetSpArray([
			  1819,
			  1826,  1833,  1840,  1847,  1854,  1861,  1868,  1875,  1882,  1889,
			  1896,  1903,  1910,  1917,  1924,  1931,  1938,  1945,  1952,  1959,
			  1966,  1973,  1980,  1987,  1994,  2001,  2008,  2015,  2022,  2029,
			  2036,  2043,  2050,  2057,  2064,  2071,  2078,  2085,  2092,  2099,
			  2106,  2113,  2120,  2127,  2134,  2141,  2148,  2155,  2162,  2169,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT, SKILL_ID_FROST_DIVER, SKILL_ID_SIGHT,
			SKILL_ID_LIGHTNING_BOLT, SKILL_ID_THUNDER_STORM, SKILL_ID_STONE_CURSE,
			SKILL_ID_NAPALM_BEAT, SKILL_ID_SOUL_STRIKE, SKILL_ID_SAFETY_WALL,
			SKILL_ID_SP_KAIFUKURYOKU_KOZYO, SKILL_ID_ENERGY_COAT, SKILL_ID_MONSTER_ZYOHO,
			SKILL_ID_FIRE_PILLAR, SKILL_ID_SIGHT_RASHER, SKILL_ID_METEOR_STORM,
			SKILL_ID_FROST_NOVA, SKILL_ID_WATER_BALL, SKILL_ID_STORM_GUST,
			SKILL_ID_ICE_WALL, SKILL_ID_JUPITER_THUNDER, SKILL_ID_LORD_OF_VERMILLION,
			SKILL_ID_EARTH_SPIKE, SKILL_ID_HEAVENS_DRIVE, SKILL_ID_QUAGMIRE,
			SKILL_ID_SIGHT_BLASTER, SKILL_ID_MAHORYOKU_ZOFUKU, SKILL_ID_SOUL_DRAIN,
			SKILL_ID_MAGIC_CRUSHER, SKILL_ID_NAPALM_VULKAN, SKILL_ID_GRAVITATION_FIELD,
			SKILL_ID_GANBANTEIN, SKILL_ID_RADIUS, SKILL_ID_RECOGNIZED_SPELL,
			SKILL_ID_CRYMSON_ROCK, SKILL_ID_HELL_INFERNO, SKILL_ID_COMMET,
			SKILL_ID_FROST_MISTY, SKILL_ID_JACK_FROST, SKILL_ID_CHAIN_LIGHTNING,
			SKILL_ID_SIENNA_EXEXRATE, SKILL_ID_EARTH_STRAIN, SKILL_ID_MARSH_OF_ABYSS,
			SKILL_ID_WHITE_IN_PRISON, SKILL_ID_SOUL_EXPANSION, SKILL_ID_DRAIN_LIFE,
			SKILL_ID_STASIS, SKILL_ID_TETRA_BOLTEX, SKILL_ID_SUMMON_FIRE_BALL,
			SKILL_ID_SUMMON_WATER_BALL, SKILL_ID_SUMMON_LIGHTNING_BALL, SKILL_ID_SUMMON_STONE,
			SKILL_ID_RELEASE, SKILL_ID_FREEZING_SPELL, SKILL_ID_READING_SPELLBOOK,
			SKILL_ID_TELECHINESIS_INSTENCE, SKILL_ID_FULLSLOT, SKILL_ID_RYOTETUSE_SHUREN,
			SKILL_ID_SOUL_VULKUN_STRIKE, SKILL_ID_MYSTERY_ILLUSION, SKILL_ID_DEADLY_PROJECTION,
			SKILL_ID_FLORAL_FLARE_ROAD, SKILL_ID_CRYMSON_ARROW, SKILL_ID_ALL_BLOOM,
			SKILL_ID_RAIN_OF_CRYSTAL, SKILL_ID_FROZEN_SLASH, SKILL_ID_CRYSTAL_IMPACT,
			SKILL_ID_TORNADE_STORM, SKILL_ID_STORM_CANNON, SKILL_ID_DESTRACTIVE_HURRICANE,
			SKILL_ID_STRATUM_TREAMER, SKILL_ID_ROCK_DOWN, SKILL_ID_VIOLENT_QUAKE,
			SKILL_ID_ASTRAL_STRIKE, SKILL_ID_CLIMAX,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_ENERGY_COAT, SKILL_ID_SOUL_DRAIN,
			SKILL_ID_MAHORYOKU_ZOFUKU, SKILL_ID_RADIUS,
			SKILL_ID_RECOGNIZED_SPELL, SKILL_ID_TELECHINESIS_INSTENCE,
			SKILL_ID_FULLSLOT, SKILL_ID_RYOTETUSE_SHUREN,
			SKILL_ID_CLIMAX, SKILL_ID_CLIMAX_HURRICANE_STATE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
			SKILL_ID_FIRE_PILLAR,
			SKILL_ID_SIGHT_RASHER,
			SKILL_ID_METEOR_STORM,
			SKILL_ID_JUPITER_THUNDER,
			SKILL_ID_LORD_OF_VERMILLION,
			SKILL_ID_WATER_BALL,
			SKILL_ID_FROST_NOVA,
			SKILL_ID_STORM_GUST,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_HEAVENS_DRIVE,
			SKILL_ID_MAGIC_CRUSHER,
			SKILL_ID_NAPALM_VULKAN,
			SKILL_ID_GRAVITATION_FIELD,
			SKILL_ID_SOUL_EXPANSION,
			SKILL_ID_FROST_MISTY,
			SKILL_ID_JACK_FROST,
			SKILL_ID_DRAIN_LIFE,
			SKILL_ID_CRYMSON_ROCK,
			SKILL_ID_HELL_INFERNO,
			SKILL_ID_COMMET,
			SKILL_ID_CHAIN_LIGHTNING,
			SKILL_ID_EARTH_STRAIN,
			SKILL_ID_TETRA_BOLTEX,
			SKILL_ID_SUMMON_FIRE_BALL,
			SKILL_ID_SUMMON_WATER_BALL,
			SKILL_ID_SUMMON_LIGHTNING_BALL,
			SKILL_ID_SUMMON_STONE,

			SKILL_ID_SOUL_VULKUN_STRIKE,
			SKILL_ID_MYSTERY_ILLUSION,
			SKILL_ID_DEADLY_PROJECTION,
			SKILL_ID_ASTRAL_STRIKE,
			SKILL_ID_FLORAL_FLARE_ROAD,
			SKILL_ID_CRYMSON_ARROW,
			SKILL_ID_ALL_BLOOM,
			SKILL_ID_RAIN_OF_CRYSTAL,
			SKILL_ID_FROZEN_SLASH,
			SKILL_ID_CRYSTAL_IMPACT,
			SKILL_ID_TORNADE_STORM,
			SKILL_ID_STORM_CANNON,
			SKILL_ID_DESTRACTIVE_HURRICANE,
			SKILL_ID_STRATUM_TREAMER,
			SKILL_ID_ROCK_DOWN,
			SKILL_ID_VIOLENT_QUAKE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_WIZARD_LINKER,
			ITEM_EQPFLG_SERIES_HIGH_WIZARD,
			ITEM_EQPFLG_WARLOCK,
			ITEM_EQPFLG_ARCH_MAGE,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_MEISTER"
		))
		.AddNameKana("マイスター", "マイスター")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(1800)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 147)
		.AddWeaponAspd(ITEM_KIND_SWORD, 146)
		.AddWeaponAspd(ITEM_KIND_AXE, 145)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 142)
		.AddWeaponAspd(ITEM_KIND_CLUB, 146)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 4)

		.SetJobBonusArray([
			[1, PARAM_STR],
			[2, PARAM_STR],
			[2, PARAM_DEX],
			[3, PARAM_STR],
			[3, PARAM_VIT],
			[4, PARAM_VIT],
			[4, PARAM_INT],
			[5, PARAM_INT],
			[5, PARAM_LUK],
			[6, PARAM_STR],
			[6, MIG_PARAM_ID_POW],
			[7, PARAM_STR],
			[8, PARAM_VIT],
			[9, PARAM_STR],
			[9, PARAM_LUK],
			[10, PARAM_STR],
			[10, MIG_PARAM_ID_STA],
			[11, PARAM_VIT],
			[12, PARAM_STR],
			[12, MIG_PARAM_ID_POW],
			[13, PARAM_INT],
			[14, PARAM_AGI],
			[15, PARAM_AGI],
			[15, PARAM_LUK],
			[16, PARAM_STR],
			[17, PARAM_AGI],
			[17, PARAM_VIT],
			[18, PARAM_VIT],
			[19, PARAM_VIT],
			[19, PARAM_INT],
			[20, PARAM_STR],
			[21, PARAM_INT],
			[21, PARAM_DEX],
			[22, PARAM_VIT],
			[23, PARAM_INT],
			[24, PARAM_AGI],
			[24, PARAM_DEX],
			[25, PARAM_AGI],
			[26, PARAM_DEX],
			[26, MIG_PARAM_ID_STA],
			[27, PARAM_DEX],
			[28, PARAM_AGI],
			[28, PARAM_LUK],
			[29, PARAM_LUK],
			[29, MIG_PARAM_ID_CRT],
			[30, MIG_PARAM_ID_POW],
			[31, MIG_PARAM_ID_WIS],
			[31, MIG_PARAM_ID_CRT],
			[32, MIG_PARAM_ID_CRT],
			[33, MIG_PARAM_ID_STA],
			[33, MIG_PARAM_ID_CON],
			[34, MIG_PARAM_ID_POW],
			[34, MIG_PARAM_ID_CRT],
			[35, MIG_PARAM_ID_STA],
			[36, PARAM_LUK],
			[36, MIG_PARAM_ID_CRT],
			[37, MIG_PARAM_ID_WIS],
			[38, MIG_PARAM_ID_POW],
			[38, MIG_PARAM_ID_WIS],
			[39, MIG_PARAM_ID_STA],
			[40, MIG_PARAM_ID_CON],
			[41, MIG_PARAM_ID_STA],
			[42, MIG_PARAM_ID_CON],
			[43, PARAM_VIT],
			[43, MIG_PARAM_ID_STA],
			[44, PARAM_VIT],
			[44, MIG_PARAM_ID_CRT],
			[45, MIG_PARAM_ID_CON],
			[46, MIG_PARAM_ID_CON],
			[47, MIG_PARAM_ID_POW],
			[47, MIG_PARAM_ID_CRT],
			[48, MIG_PARAM_ID_STA],
			[48, MIG_PARAM_ID_CON],
			[49, MIG_PARAM_ID_STA],
			[50, MIG_PARAM_ID_POW],
			[50, MIG_PARAM_ID_WIS],
		])

		.SetHpArray([
			 20846,
			 21012, 21178, 21344, 21510, 21676, 21842, 22008, 22174, 22340, 22506,
			 22672, 22838, 23004, 23170, 23336, 23502, 23668, 23834, 24000, 24166,
			 24332, 24498, 24664, 24830, 24996, 25162, 25328, 25494, 25660, 25826,
			 25992, 26158, 26324, 26490, 26656, 26822, 26988, 27154, 27320, 27486,
			 27652, 27818, 27984, 28150, 28316, 28482, 28648, 28814, 28980, 29146,
		])

		.SetSpArray([
			  1478,
			  1484,  1490,  1496,  1502,  1508,  1514,  1520,  1526,  1532,  1538,
			  1544,  1550,  1556,  1562,  1568,  1574,  1580,  1586,  1592,  1598,
			  1604,  1610,  1616,  1622,  1628,  1634,  1640,  1646,  1652,  1658,
			  1664,  1670,  1676,  1682,  1688,  1694,  1700,  1706,  1712,  1718,
			  1724,  1730,  1736,  1742,  1748,  1754,  1760,  1766,  1772,  1778,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_SHOZIGENKAIRYO_ZOKA, SKILL_ID_DISCOUNT, SKILL_ID_OVER_CHARGE,
			SKILL_ID_PUSH_CART, SKILL_ID_ITEM_KANTE, SKILL_ID_ROTEN_KAISETSU,
			SKILL_ID_MAMMONITE, SKILL_ID_LOUD_VOICE, SKILL_ID_CHANGE_CART,
			SKILL_ID_CART_REVOLUTION, SKILL_ID_TETSU_SEIZO, SKILL_ID_KOTETSU_SEIZO,
			SKILL_ID_ZOKUSEISEKI_SEIZO, SKILL_ID_ORIDEOCON_KENKYU, SKILL_ID_TANKEN_SEISAKU,
			SKILL_ID_KEN_SEISAKU, SKILL_ID_RYOTEKEN_SEISAKU, SKILL_ID_ONO_SEISAKU,
			SKILL_ID_MACE_SEISAKU, SKILL_ID_KNUCKLE_SEISAKU, SKILL_ID_YARI_SEISAKU,
			SKILL_ID_HILT_BINDING, SKILL_ID_SKIN_TEMPERING, SKILL_ID_KOSEKI_HAKKEN,
			SKILL_ID_BUKI_SHURI, SKILL_ID_BUKI_KENKYU, SKILL_ID_HAMMER_FALL,
			SKILL_ID_ADRENALINE_RUSH, SKILL_ID_WEAPON_PERFECTION, SKILL_ID_OVER_TRUST,
			SKILL_ID_MAXIMIZE_POWER, SKILL_ID_GREED, SKILL_ID_FAKE_ZENY,
			SKILL_ID_OVER_TRUST_MAX, SKILL_ID_CART_BOOST_WS, SKILL_ID_CART_TERMINATION,
			SKILL_ID_MELTDOWN, SKILL_ID_BUKISEIREN, SKILL_ID_ONO_SHUREN_MECHANIC,
			SKILL_ID_AXE_TORNADE, SKILL_ID_AXE_BOOMERANG, SKILL_ID_POWER_SWING,
			SKILL_ID_FAW_SILVER_SNIPER, SKILL_ID_FAW_MAGIC_DECOY, SKILL_ID_FAW_KAIZYO,
			SKILL_ID_HITO_DAICHINO_KENKYU, SKILL_ID_MADOGEAR_LICENSE, SKILL_ID_BOOST_KNUCKLE,
			SKILL_ID_PILE_BUNKER, SKILL_ID_VULCAN_ARM, SKILL_ID_ARMS_CANNON,
			SKILL_ID_FLAME_THROWER, SKILL_ID_COLD_THROWER, SKILL_ID_ACCELARATION,
			SKILL_ID_HOVERING, SKILL_ID_FRONTSIDE_SLIDE, SKILL_ID_REARSIDE_SLIDE,
			SKILL_ID_MAINFRAME_KAIZO, SKILL_ID_SHAPE_SHIFT, SKILL_ID_INFRARED_SCAN,
			SKILL_ID_ANALYZE, SKILL_ID_SELF_DESTRUCTION, SKILL_ID_EMERGENCY_COOL,
			SKILL_ID_MAGNETIC_FIELD, SKILL_ID_NUTRAL_BARRIER, SKILL_ID_STEALTH_FIELD,
			SKILL_ID_REPEAR, SKILL_ID_MAGMA_ILLUPTION, SKILL_ID_FULLSLOT,
			SKILL_ID_TWO_AXE_DEFENDING, SKILL_ID_AXE_STOMP, SKILL_ID_RUSH_QUAKE,
			SKILL_ID_SOCHI_SEIZO, SKILL_ID_KOGEKI_SOCHI_YUKOKA, SKILL_ID_BOGYO_SOCHI_YUKOKA,
			SKILL_ID_ABR_MASTERY, SKILL_ID_ABR_BATTLE_WARRIER, SKILL_ID_ABR_DUAL_CANNON,
			SKILL_ID_ABR_MOTHER_NET, SKILL_ID_ABR_INFINITY,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_LOUD_VOICE, SKILL_ID_HILT_BINDING,
			SKILL_ID_BUKI_KENKYU, SKILL_ID_SKIN_TEMPERING,
			SKILL_ID_ADRENALINE_RUSH, SKILL_ID_WEAPON_PERFECTION,
			SKILL_ID_OVER_TRUST, SKILL_ID_MAXIMIZE_POWER,
			SKILL_ID_OVER_TRUST_MAX, SKILL_ID_FULL_ADRENALINE_RUSH,
			SKILL_ID_ONO_SHUREN_MECHANIC, SKILL_ID_HITO_DAICHINO_KENKYU,
			SKILL_ID_MADOGEAR, SKILL_ID_MADOGEAR_LICENSE,
			SKILL_ID_MAINFRAME_KAIZO, SKILL_ID_SHAPE_SHIFT,
			SKILL_ID_FULLSLOT, SKILL_ID_TWO_AXE_DEFENDING,
			SKILL_ID_ABR_MASTERY, SKILL_ID_RUSH_STATE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_MAMMONITE,
			SKILL_ID_CART_REVOLUTION,
			SKILL_ID_CART_TERMINATION,
			SKILL_ID_AXE_BOOMERANG,
			SKILL_ID_AXE_TORNADE,
			SKILL_ID_POWER_SWING,
			SKILL_ID_MAGMA_ILLUPTION,
			SKILL_ID_SELF_DESTRUCTION,
			SKILL_ID_SELF_DESTRUCTION_MAX,
			SKILL_ID_BOOST_KNUCKLE,
			SKILL_ID_VULCAN_ARM,
			SKILL_ID_FLAME_THROWER,
			SKILL_ID_COLD_THROWER,
			SKILL_ID_ARMS_CANNON,
			SKILL_ID_PILE_BUNKER,
			SKILL_ID_AXE_STOMP,
			SKILL_ID_RUSH_QUAKE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MARCHANT,
			ITEM_EQPFLG_SERIES_UPPER_OF_MARCHANT,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_SERIES_BLACKSMITH,
			ITEM_EQPFLG_SERIES_WHITESMITH,
			ITEM_EQPFLG_MECHANIC,
			ITEM_EQPFLG_MEISTER,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_IMPERIAL_GUARD"
		))
		.AddNameKana("インペリアルガード", "インペリアルガード")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(1500)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 151)
		.AddWeaponAspd(ITEM_KIND_SWORD, 151)
		.AddWeaponAspd(ITEM_KIND_SWORD_2HAND, 144)
		.AddWeaponAspd(ITEM_KIND_SPEAR, 142)
		.AddWeaponAspd(ITEM_KIND_SPEAR_2HAND, 142)
		.AddWeaponAspd(ITEM_KIND_AXE, 141)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 139)
		.AddWeaponAspd(ITEM_KIND_CLUB, 140)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, MIG_PARAM_ID_POW],
			[2, PARAM_STR],
			[2, PARAM_INT],
			[3, PARAM_VIT],
			[3, PARAM_DEX],
			[4, PARAM_DEX],
			[4, MIG_PARAM_ID_SPL],
			[5, PARAM_STR],
			[5, PARAM_VIT],
			[6, PARAM_VIT],
			[6, PARAM_DEX],
			[7, PARAM_STR],
			[7, MIG_PARAM_ID_SPL],
			[8, PARAM_DEX],
			[9, PARAM_STR],
			[9, MIG_PARAM_ID_SPL],
			[10, PARAM_INT],
			[10, MIG_PARAM_ID_CON],
			[11, PARAM_LUK],
			[12, PARAM_AGI],
			[13, PARAM_LUK],
			[13, MIG_PARAM_ID_POW],
			[14, PARAM_AGI],
			[14, PARAM_INT],
			[15, PARAM_INT],
			[16, PARAM_VIT],
			[16, MIG_PARAM_ID_POW],
			[17, PARAM_STR],
			[17, PARAM_INT],
			[18, PARAM_VIT],
			[19, PARAM_STR],
			[19, PARAM_INT],
			[20, PARAM_INT],
			[20, PARAM_DEX],
			[21, PARAM_INT],
			[22, PARAM_STR],
			[22, PARAM_VIT],
			[23, MIG_PARAM_ID_STA],
			[24, PARAM_VIT],
			[25, PARAM_INT],
			[26, PARAM_STR],
			[26, PARAM_INT],
			[27, MIG_PARAM_ID_POW],
			[28, PARAM_DEX],
			[29, PARAM_VIT],
			[30, MIG_PARAM_ID_POW],
			[31, PARAM_STR],
			[31, PARAM_LUK],
			[32, PARAM_DEX],
			[32, MIG_PARAM_ID_SPL],
			[33, PARAM_DEX],
			[33, MIG_PARAM_ID_SPL],
			[34, MIG_PARAM_ID_STA],
			[35, PARAM_VIT],
			[35, MIG_PARAM_ID_STA],
			[36, MIG_PARAM_ID_SPL],
			[37, PARAM_DEX],
			[37, MIG_PARAM_ID_WIS],
			[38, PARAM_AGI],
			[38, MIG_PARAM_ID_WIS],
			[39, MIG_PARAM_ID_STA],
			[40, MIG_PARAM_ID_WIS],
			[41, MIG_PARAM_ID_STA],
			[41, MIG_PARAM_ID_CRT],
			[42, MIG_PARAM_ID_WIS],
			[42, MIG_PARAM_ID_CON],
			[43, MIG_PARAM_ID_CRT],
			[44, MIG_PARAM_ID_STA],
			[45, MIG_PARAM_ID_SPL],
			[46, MIG_PARAM_ID_WIS],
			[47, MIG_PARAM_ID_CRT],
			[48, MIG_PARAM_ID_STA],
			[48, MIG_PARAM_ID_CON],
			[49, MIG_PARAM_ID_STA],
			[50, MIG_PARAM_ID_POW],
			[50, MIG_PARAM_ID_STA],
		])

		.SetHpArray([
			 22411,
			 22590, 22769, 22948, 23127, 23306, 23485, 23664, 23843, 24022, 24201,
			 24380, 24559, 24738, 24917, 25096, 25275, 25454, 25633, 25812, 25991,
			 26170, 26349, 26528, 26707, 26886, 27065, 27244, 27423, 27602, 27781,
			 27960, 28139, 28318, 28497, 28676, 28855, 29034, 29213, 29392, 29571,
			 29750, 29929, 30108, 30287, 30466, 30645, 30824, 31003, 31182, 31361,
		])

		.SetSpArray([
			  1445,
			  1450,  1455,  1460,  1465,  1470,  1475,  1480,  1485,  1490,  1495,
			  1500,  1505,  1510,  1515,  1520,  1525,  1530,  1535,  1540,  1545,
			  1550,  1555,  1560,  1565,  1570,  1575,  1580,  1585,  1590,  1595,
			  1600,  1605,  1610,  1615,  1620,  1625,  1630,  1635,  1640,  1645,
			  1650,  1655,  1660,  1665,  1670,  1675,  1680,  1685,  1690,  1695,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN, SKILL_ID_HP_KAIFUKURYOKU_KOZYO,
			SKILL_ID_BASH, SKILL_ID_MAGNUM_BREAK, SKILL_ID_PROVOKE,
			SKILL_ID_ENDURE, SKILL_ID_IDOZI_HP_KAIFUKU, SKILL_ID_KYUSHO_KOGEKI,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_YARI_SHUREN, SKILL_ID_SPEAR_QUICKEN,
			SKILL_ID_FAITH, SKILL_ID_HOLY_CROSS, SKILL_ID_GRAND_CROSS,
			SKILL_ID_SHIELD_CHARGE, SKILL_ID_SHIELD_BOOMERANG, SKILL_ID_REFLECT_SHIELD,
			SKILL_ID_AUTO_GUARD, SKILL_ID_DEFENDER, SKILL_ID_DEBOTION,
			SKILL_ID_RIDING, SKILL_ID_KIHE_SHUREN, SKILL_ID_HEAL,
			SKILL_ID_CURE, SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE,
			SKILL_ID_PROVIDENCE, SKILL_ID_SHRINK, SKILL_ID_SHIELD_CHAIN,
			SKILL_ID_PRESSURE, SKILL_ID_SACRIFICE, SKILL_ID_GOSPEL,
			SKILL_ID_MOON_SLUSHER, SKILL_ID_BANISHING_POINT, SKILL_ID_EXCEED_BREAK,
			SKILL_ID_PINGPOINT_ATTACK, SKILL_ID_CANNON_SPEAR, SKILL_ID_OVER_BLAND,
			SKILL_ID_SHIELD_PRESS, SKILL_ID_SHIELD_SPELL, SKILL_ID_REFLECT_DAMAGE,
			SKILL_ID_EARTH_DRIVE, SKILL_ID_RAY_OF_GENESIS, SKILL_ID_PIETY,
			SKILL_ID_INSPIRATION, SKILL_ID_TRUMPLE, SKILL_ID_PRESTAGE,
			SKILL_ID_FORCE_OF_BANGUARD, SKILL_ID_RAGE_BURST_ATTACK, SKILL_ID_BANDING,
			SKILL_ID_HESPERUS_SLIT, SKILL_ID_KINGS_GRACE, SKILL_ID_FULLSLOT,
			SKILL_ID_YARI_KATATE_KEN_SHUREN, SKILL_ID_ATTACK_STANCE, SKILL_ID_OVER_SLASH,
			SKILL_ID_GRAND_JUDGEMENT, SKILL_ID_SHIELD_SHOOTING, SKILL_ID_REBOUND_SHIELD,
			SKILL_ID_TATE_SHUREN, SKILL_ID_GUARD_STANCE, SKILL_ID_GUARDIAN_SHIELD,
			SKILL_ID_ULTIMATE_SACRIFICE, SKILL_ID_CROSS_RAIN, SKILL_ID_HOLY_SHIELD,
			SKILL_ID_JUDGEMENT_CROSS,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_KEN_SHUREN, SKILL_ID_RYOUTKEN_SHUREN,
			SKILL_ID_AUTO_BERSERK, SKILL_ID_FAITH,
			SKILL_ID_YARI_SHUREN, SKILL_ID_SPEAR_QUICKEN,
			SKILL_ID_DEMON_BANE, SKILL_ID_DIVINE_PROTECTION,
			SKILL_ID_AUTO_GUARD_OLD, SKILL_ID_KIHE_SHUREN,
			SKILL_ID_DEFENDER, SKILL_ID_ENDURE,
			SKILL_ID_REFLECT_SHIELD, SKILL_ID_SHIELD_SPELL_REFLECT,
			SKILL_ID_SHIELD_SPELL_ATK_PLUS, SKILL_ID_SHIELD_SPELL_DEF_PLUS,
			SKILL_ID_INSPIRATION, SKILL_ID_FORCE_OF_BANGUARD,
			SKILL_ID_PRESTAGE, SKILL_ID_SKILL_LV_DEFENDER_FOR_PRESTAGE,
			SKILL_ID_BANDING, SKILL_ID_COUNT_OF_RG_FOR_BANDING,
			SKILL_ID_FULLSLOT, SKILL_ID_HOLY_SHIELD,
			SKILL_ID_TATE_SHUREN, SKILL_ID_YARI_KATATE_KEN_SHUREN,
			SKILL_ID_GUARD_STANCE, SKILL_ID_ATTACK_STANCE,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
			SKILL_ID_SHIELD_CHARGE,
			SKILL_ID_SHIELD_BOOMERANG,
			SKILL_ID_SHIELD_BOOMERANG_TAMASHI,
			SKILL_ID_HOLY_CROSS,
			SKILL_ID_GRAND_CROSS,
			SKILL_ID_HEAL,
			SKILL_ID_PRESSURE,
			SKILL_ID_SACRIFICE,
			SKILL_ID_SHIELD_CHAIN,
			SKILL_ID_CANNON_SPEAR,
			SKILL_ID_BANISHING_POINT,
			SKILL_ID_SHIELD_PRESS,
			SKILL_ID_PINGPOINT_ATTACK,
			SKILL_ID_RAGE_BURST_ATTACK,
			SKILL_ID_EXCEED_BREAK,
			SKILL_ID_OVER_BLAND,
			SKILL_ID_MOON_SLUSHER,
			SKILL_ID_RAY_OF_GENESIS,
			SKILL_ID_EARTH_DRIVE,
			SKILL_ID_HESPERUS_SLIT,
			SKILL_ID_SHIELD_SPELL_LV_1,
			SKILL_ID_SHIELD_SPELL_LV_2,
			SKILL_ID_OVER_SLASH,
			SKILL_ID_GRAND_JUDGEMENT,
			SKILL_ID_SHIELD_SHOOTING,
			SKILL_ID_CROSS_RAIN,
			SKILL_ID_JUDGEMENT_CROSS,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_SWORDMAN,
			ITEM_EQPFLG_SERIES_UPPER_OF_SWORDMAN,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_MIRROR_SHIELD,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_SERIES_CRUSADER,
			ITEM_EQPFLG_SERIES_PALADIN,
			ITEM_EQPFLG_ROYALGUARD,
			ITEM_EQPFLG_IMPERIAL_GUARD,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_ABYSS_CHASER"
		))
		.AddNameKana("アビスチェイサー", "アビスチェイサー")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(800)

		.AddWeaponAspd(ITEM_KIND_NONE, 153)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 152)
		.AddWeaponAspd(ITEM_KIND_SWORD, 144)
		.AddWeaponAspd(ITEM_KIND_AXE, -6)
		.AddWeaponAspd(ITEM_KIND_BOW, 148)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 4)

		.SetJobBonusArray([
			[1, PARAM_LUK],
			[1, MIG_PARAM_ID_POW],
			[2, PARAM_STR],
			[2, MIG_PARAM_ID_SPL],
			[3, PARAM_DEX],
			[4, PARAM_LUK],
			[5, PARAM_STR],
			[5, PARAM_INT],
			[6, PARAM_INT],
			[7, PARAM_LUK],
			[7, MIG_PARAM_ID_POW],
			[8, PARAM_AGI],
			[8, MIG_PARAM_ID_STA],
			[9, PARAM_DEX],
			[9, MIG_PARAM_ID_CON],
			[10, PARAM_VIT],
			[10, PARAM_INT],
			[11, PARAM_VIT],
			[11, MIG_PARAM_ID_CON],
			[12, PARAM_STR],
			[13, PARAM_STR],
			[13, PARAM_INT],
			[14, PARAM_LUK],
			[15, MIG_PARAM_ID_SPL],
			[16, PARAM_DEX],
			[16, MIG_PARAM_ID_CRT],
			[17, PARAM_AGI],
			[17, MIG_PARAM_ID_WIS],
			[18, PARAM_VIT],
			[19, PARAM_INT],
			[19, MIG_PARAM_ID_WIS],
			[20, PARAM_VIT],
			[20, MIG_PARAM_ID_STA],
			[21, PARAM_STR],
			[21, PARAM_INT],
			[22, PARAM_VIT],
			[22, PARAM_DEX],
			[23, PARAM_AGI],
			[23, MIG_PARAM_ID_STA],
			[24, PARAM_LUK],
			[25, PARAM_AGI],
			[25, PARAM_VIT],
			[26, PARAM_LUK],
			[27, PARAM_STR],
			[27, PARAM_AGI],
			[28, PARAM_AGI],
			[29, PARAM_AGI],
			[29, PARAM_VIT],
			[30, PARAM_DEX],
			[31, PARAM_STR],
			[31, PARAM_AGI],
			[32, PARAM_STR],
			[33, PARAM_VIT],
			[34, MIG_PARAM_ID_POW],
			[34, MIG_PARAM_ID_WIS],
			[35, MIG_PARAM_ID_SPL],
			[36, MIG_PARAM_ID_POW],
			[37, MIG_PARAM_ID_STA],
			[37, MIG_PARAM_ID_CON],
			[38, PARAM_DEX],
			[39, MIG_PARAM_ID_CRT],
			[40, MIG_PARAM_ID_CRT],
			[41, PARAM_AGI],
			[41, MIG_PARAM_ID_STA],
			[42, MIG_PARAM_ID_POW],
			[43, MIG_PARAM_ID_CRT],
			[44, MIG_PARAM_ID_POW],
			[45, MIG_PARAM_ID_SPL],
			[45, MIG_PARAM_ID_CRT],
			[46, MIG_PARAM_ID_SPL],
			[47, MIG_PARAM_ID_WIS],
			[48, MIG_PARAM_ID_SPL],
			[48, MIG_PARAM_ID_CON],
			[49, MIG_PARAM_ID_STA],
			[50, MIG_PARAM_ID_POW],
			[50, MIG_PARAM_ID_SPL],
		])

		.SetHpArray([
			 20884,
			 21050, 21216, 21382, 21548, 21714, 21880, 22046, 22212, 22378, 22544,
			 22710, 22876, 23042, 23208, 23374, 23540, 23706, 23872, 24038, 24204,
			 24370, 24536, 24702, 24868, 25034, 25200, 25366, 25532, 25698, 25864,
			 26030, 26196, 26362, 26528, 26694, 26860, 27026, 27192, 27358, 27524,
			 27690, 27856, 28022, 28188, 28354, 28520, 28686, 28852, 29018, 29184,
		])

		.SetSpArray([
			  1001,
			  1005,  1009,  1013,  1017,  1021,  1025,  1029,  1033,  1037,  1041,
			  1045,  1049,  1053,  1057,  1061,  1065,  1069,  1073,  1077,  1081,
			  1085,  1089,  1093,  1097,  1101,  1105,  1109,  1113,  1117,  1121,
			  1125,  1129,  1133,  1137,  1141,  1145,  1149,  1153,  1157,  1161,
			  1165,  1169,  1173,  1177,  1181,  1185,  1189,  1193,  1197,  1201,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA, SKILL_ID_STEAL,
			SKILL_ID_HIDING, SKILL_ID_ENVENOM, SKILL_ID_GEDOKU,
			SKILL_ID_SUNAMAKI, SKILL_ID_ISHIHIROI, SKILL_ID_ISHINAGE,
			SKILL_ID_BACKSTEP, SKILL_ID_SNATCHER, SKILL_ID_STEAL_COIN,
			SKILL_ID_TUNNEL_DRIVE, SKILL_ID_BACK_STAB, SKILL_ID_SURPRISE_ATTACK,
			SKILL_ID_INTIMIDATE, SKILL_ID_CLONE_SKILL, SKILL_ID_STRIP_WEAPON,
			SKILL_ID_STRIP_SHIELD, SKILL_ID_STRIP_ARMER, SKILL_ID_STRIP_HELM,
			SKILL_ID_GRAPHITY, SKILL_ID_FLAG_GRAPHITY, SKILL_ID_CLEANER,
			SKILL_ID_GANGSTAR_PARADISE, SKILL_ID_COMPULSION_DISCOUNT, SKILL_ID_KEN_SHUREN,
			SKILL_ID_WASHINO_ME, SKILL_ID_DOUBLE_STRAFING, SKILL_ID_REMOVE_TRAP,
			SKILL_ID_CLOSE_CONFINE, SKILL_ID_CHASEWALK, SKILL_ID_REJECT_SWORD,
			SKILL_ID_PRESERVE, SKILL_ID_FULL_STRIP, SKILL_ID_BODY_PAINTING,
			SKILL_ID_MASKARADE_INOVATION, SKILL_ID_MASKARADE_GLOOMY, SKILL_ID_MASKARADE_IGNORANCE,
			SKILL_ID_MASKARADE_RAGENESS, SKILL_ID_MASKARADE_WEEKNESS, SKILL_ID_MASKARADE_UNLUCKY,
			SKILL_ID_SHADOW_FORM, SKILL_ID_DEADLY_INEFFECT, SKILL_ID_MANHOLE,
			SKILL_ID_DEMENSION_DOOR, SKILL_ID_BLOODY_LAST, SKILL_ID_CHAOS_PANIC,
			SKILL_ID_MAELSTORM, SKILL_ID_FAINT_BOMB, SKILL_ID_FATAL_MENUS,
			SKILL_ID_REPORDUCE, SKILL_ID_AUTO_SHADOW_SPELL, SKILL_ID_INVISIBILITY,
			SKILL_ID_STRIP_ACCESSARY, SKILL_ID_TRIANGLE_SHOT, SKILL_ID_ESCAPE,
			SKILL_ID_FULLSLOT, SKILL_ID_TANKEN_YUMI_SHUREN, SKILL_ID_MAHOKEN_SHUREN,
			SKILL_ID_STRIP_SHADOW, SKILL_ID_ABYSS_DAGGER, SKILL_ID_UNLUCKY_RUSH,
			SKILL_ID_DEFT_STAB, SKILL_ID_ABYSS_SLAYER, SKILL_ID_CHAIN_REACTION_SHOT,
			SKILL_ID_FLANGE_SHOT, SKILL_ID_FROM_THE_ABYSS, SKILL_ID_ABYSS_SQUARE,
			SKILL_ID_OMEGA_ABYSS_STRIKE,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DOUBLE_ATTACK, SKILL_ID_KAIHIRITSU_ZOKA,
			SKILL_ID_KEN_SHUREN, SKILL_ID_WASHINO_ME,
			SKILL_ID_CHASEWALK, SKILL_ID_REJECT_SWORD,
			SKILL_ID_SANDANSHO, SKILL_ID_CLOSE_CONFINE,
			SKILL_ID_INVISIBILITY, SKILL_ID_DUPLELIGHT,
			SKILL_ID_SHIELD_SPELL_ATK_PLUS, SKILL_ID_SHIELD_SPELL_DEF_PLUS,
			SKILL_ID_AUTO_SHADOW_SPELL, SKILL_ID_MAGIC_SETTING_FOR_AUTO_SHADOW_SPELL,
			SKILL_ID_SHIELD_SPELL_REFLECT, SKILL_ID_FULLSLOT,
			SKILL_ID_TANKEN_YUMI_SHUREN, SKILL_ID_MAHOKEN_SHUREN,
			SKILL_ID_ABYSS_SLAYER, SKILL_ID_FROM_THE_ABYSS,
			SKILL_ID_ABYSS_SQUARE_LEARNED_LEVEL,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_ENVENOM,
			SKILL_ID_SUNAMAKI,
			SKILL_ID_ISHINAGE,
			SKILL_ID_BACK_STAB,
			SKILL_ID_SURPRISE_ATTACK,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_INTIMIDATE_FOR_CLONE,
			SKILL_ID_TRIANGLE_SHOT,
			SKILL_ID_FAINT_BOMB,
			SKILL_ID_FATAL_MENUS,
			SKILL_ID_BASH,
			SKILL_ID_MAGNUM_BREAK,
			SKILL_ID_HEAL,
			SKILL_ID_HOLY_LIGHT,
			SKILL_ID_RUWACH,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
			SKILL_ID_MAMMONITE,
			SKILL_ID_BOWLING_BASH,
			SKILL_ID_CHARGE_ATTACK,
			SKILL_ID_VENOM_SPLASHER,
			SKILL_ID_VENOM_KNIFE,
			SKILL_ID_TURN_UNDEAD,
			SKILL_ID_RESURRECTION,
			SKILL_ID_MAGNUS_EXORCISMUS,
			SKILL_ID_SANCTUARY,
			SKILL_ID_FANTASMIC_ARROW,
			SKILL_ID_LAND_MINE,
			SKILL_ID_FREEZING_TRAP,
			SKILL_ID_BLAST_MINE,
			SKILL_ID_CLAYMORE_TRAP,
			SKILL_ID_FIRE_PILLAR,
			SKILL_ID_SIGHT_RASHER,
			SKILL_ID_METEOR_STORM,
			SKILL_ID_JUPITER_THUNDER,
			SKILL_ID_LORD_OF_VERMILLION,
			SKILL_ID_WATER_BALL_FOR_CLONE,
			SKILL_ID_FROST_NOVA,
			SKILL_ID_STORM_GUST,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_HEAVENS_DRIVE_FOR_CLONE,
			SKILL_ID_SHIELD_CHARGE,
			SKILL_ID_SHIELD_BOOMERANG,
			SKILL_ID_HOLY_CROSS,
			SKILL_ID_GRAND_CROSS,
			SKILL_ID_SHIDAN,
			SKILL_ID_HAKKEI,
			SKILL_ID_ASHURA_HAOKEN,
			SKILL_ID_ASHURA_HAOKEN_SPKOTEI,
			SKILL_ID_SUNKEI,
			SKILL_ID_ACID_TERROR,
			SKILL_ID_DEMONSTRATION,
			SKILL_ID_TEIOAPUCHAGI,
			SKILL_ID_KOUENKA,
			SKILL_ID_KAENZIN,
			SKILL_ID_RYUENZIN,
			SKILL_ID_HYOSENSO,
			SKILL_ID_TSURARAOTOSHI,
			SKILL_ID_FUZIN,
			SKILL_ID_RAIGEKISAI,
			SKILL_ID_SAKUFU,
			SKILL_ID_ZENI_NAGE,
			SKILL_ID_TATAMI_GAESHI,
			SKILL_ID_KASUMIGIRI,
			SKILL_ID_KAGEKIRI,
			SKILL_ID_TRIPLE_ACTION,
			SKILL_ID_BULLS_EYE,
			SKILL_ID_YOMIGAESHI,
			SKILL_ID_BAKURETSU_KUNAI,
			SKILL_ID_MUCHANAGE,
			SKILL_ID_TOMAHAWKNAGE,
			SKILL_ID_IGNITION_BREAK,
			SKILL_ID_WIND_CUTTER,
			SKILL_ID_SONIC_WAVE,
			SKILL_ID_CROSS_IMPACT,
			SKILL_ID_DARK_CRAW,
			SKILL_ID_JUDEX,
			SKILL_ID_ADORAMUS,
			SKILL_ID_HIGHNESS_HEAL,
			SKILL_ID_AIMED_BOLT,
			SKILL_ID_ARROW_STORM,
			SKILL_ID_CLUSTER_BOMB,
			SKILL_ID_FIRING_TRAP,
			SKILL_ID_ICEBOUND_TRAP,
			SKILL_ID_SOUL_EXPANSION,
			SKILL_ID_FROST_MISTY,
			SKILL_ID_JACK_FROST,
			SKILL_ID_DRAIN_LIFE,
			SKILL_ID_CRYMSON_ROCK,
			SKILL_ID_HELL_INFERNO,
			SKILL_ID_COMMET,
			SKILL_ID_CHAIN_LIGHTNING,
			SKILL_ID_EARTH_STRAIN,
			SKILL_ID_AXE_BOOMERANG,
			SKILL_ID_AXE_TORNADE,
			SKILL_ID_POWER_SWING,
			SKILL_ID_MAGMA_ILLUPTION,
			SKILL_ID_SHIELD_PRESS,
			SKILL_ID_RAY_OF_GENESIS,
			SKILL_ID_EARTH_DRIVE,
			SKILL_ID_SHIELD_SPELL_LV_1,
			SKILL_ID_SHIELD_SPELL_LV_2,
			SKILL_ID_SORYUKYAKU,
			SKILL_ID_SHURASHINDAN,
			SKILL_ID_RAIKODAN,
			SKILL_ID_BAKKISANDAN,
			SKILL_ID_TENRACHIMO,
			SKILL_ID_SISIKO,
			SKILL_ID_ZIRAISHIN,
			SKILL_ID_SENPUTAI,
			SKILL_ID_TENKETSU_MOKU,
			SKILL_ID_GOHO,
			SKILL_ID_RASETSU_HAOGEKI_MAX,
			SKILL_ID_RASETSU_HAOGEKI,
			SKILL_ID_HASAICHU,
			SKILL_ID_SEVERE_RAINSTORM,
			SKILL_ID_SEVERE_RAINSTORM_EX,
			SKILL_ID_SHINDOZANKYO,
			SKILL_ID_METALIC_SOUND,
			SKILL_ID_PSYCHIC_WAVE,
			SKILL_ID_CLOUD_KILL,
			SKILL_ID_POISON_BUSTER,
			SKILL_ID_EARTH_GRAVE,
			SKILL_ID_DIAMOND_DUST,
			SKILL_ID_VERATURE_SPEAR,
			SKILL_ID_FIRE_WALK,
			SKILL_ID_ELECTRIC_WALK,
			SKILL_ID_HELLS_PLANT,
			SKILL_ID_CRAZY_WEED,
			SKILL_ID_THORN_TRAP,
			SKILL_ID_BLOOD_SUCKER,
			SKILL_ID_SPORE_EXPLOSION,
			SKILL_ID_ABYSS_DAGGER,
			SKILL_ID_UNLUCKY_RUSH,
			SKILL_ID_DEFT_STAB,
			SKILL_ID_CHAIN_REACTION_SHOT,
			SKILL_ID_FLANGE_SHOT,
			SKILL_ID_ABYSS_SQUARE,
			SKILL_ID_OMEGA_ABYSS_STRIKE,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_THIEF_NINJA,
			ITEM_EQPFLG_SERIES_UPPER_OF_THIEF,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_RENDO,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_SERIES_HUNTER_ROGUE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_ROGUE,
			ITEM_EQPFLG_SERIES_CHASER,
			ITEM_EQPFLG_SHADOWCHASER,
			ITEM_EQPFLG_ABYSS_CHASER,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_INQUISITOR"
		))
		.AddNameKana("インクイジター", "インクイジター")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(1000)

		.AddWeaponAspd(ITEM_KIND_NONE, 180)
		.AddWeaponAspd(ITEM_KIND_CLUB, 145)
		.AddWeaponAspd(ITEM_KIND_STUFF, 143)
		.AddWeaponAspd(ITEM_KIND_FIST, 178)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 143)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		// 1レベルで2上昇あり、注意
		.SetJobBonusArray([
			[1, PARAM_AGI],
			[1, PARAM_DEX],
			[2, PARAM_STR],
			[2, PARAM_DEX],
			[3, PARAM_INT],
			[3, MIG_PARAM_ID_POW],
			[4, PARAM_STR],
			[4, PARAM_STR],
			[5, PARAM_STR],
			[5, MIG_PARAM_ID_POW],
			[6, PARAM_STR],
			[7, PARAM_DEX],
			[7, MIG_PARAM_ID_POW],
			[8, PARAM_AGI],
			[8, PARAM_INT],
			[9, PARAM_STR],
			[9, PARAM_DEX],
			[10, PARAM_AGI],
			[11, PARAM_DEX],
			[11, MIG_PARAM_ID_STA],
			[12, PARAM_AGI],
			[12, PARAM_VIT],
			[13, MIG_PARAM_ID_WIS],
			[14, PARAM_AGI],
			[14, PARAM_VIT],
			[15, PARAM_INT],
			[15, PARAM_LUK],
			[16, PARAM_STR],
			[16, MIG_PARAM_ID_STA],
			[17, PARAM_VIT],
			[17, PARAM_INT],
			[18, PARAM_STR],
			[18, PARAM_INT],
			[19, PARAM_VIT],
			[19, PARAM_DEX],
			[20, PARAM_VIT],
			[20, PARAM_DEX],
			[21, PARAM_AGI],
			[22, PARAM_STR],
			[22, PARAM_AGI],
			[23, PARAM_AGI],
			[24, PARAM_DEX],
			[25, PARAM_AGI],
			[26, PARAM_STR],
			[27, MIG_PARAM_ID_CRT],
			[28, MIG_PARAM_ID_CON],
			[29, MIG_PARAM_ID_CRT],
			[30, PARAM_INT],
			[30, MIG_PARAM_ID_POW],
			[31, MIG_PARAM_ID_POW],
			[32, MIG_PARAM_ID_WIS],
			[32, MIG_PARAM_ID_CRT],
			[33, MIG_PARAM_ID_SPL],
			[34, MIG_PARAM_ID_SPL],
			[35, MIG_PARAM_ID_POW],
			[36, MIG_PARAM_ID_STA],
			[37, MIG_PARAM_ID_CON],
			[38, MIG_PARAM_ID_CON],
			[39, MIG_PARAM_ID_CRT],
			[40, MIG_PARAM_ID_CON],
			[41, MIG_PARAM_ID_SPL],
			[42, PARAM_INT],
			[42, MIG_PARAM_ID_CRT],
			[43, PARAM_AGI],
			[43, MIG_PARAM_ID_POW],
			[44, MIG_PARAM_ID_CON],
			[45, PARAM_INT],
			[45, MIG_PARAM_ID_STA],
			[46, MIG_PARAM_ID_STA],
			[47, PARAM_VIT],
			[47, MIG_PARAM_ID_WIS],
			[48, MIG_PARAM_ID_CRT],
			[49, MIG_PARAM_ID_POW],
			[49, MIG_PARAM_ID_STA],
			[50, MIG_PARAM_ID_POW],
			[50, MIG_PARAM_ID_WIS],
		])

		.SetHpArray([
			 20948,
			 21115, 21282, 21449, 21616, 21783, 21950, 22117, 22284, 22451, 22618,
			 22785, 22952, 23119, 23286, 23453, 23620, 23787, 23954, 24121, 24288,
			 24455, 24622, 24789, 24956, 25123, 25290, 25457, 25624, 25791, 25958,
			 26125, 26292, 26459, 26626, 26793, 26960, 27127, 27294, 27461, 27628,
			 27795, 27962, 28129, 28296, 28463, 28630, 28797, 28964, 29131, 29298,
		])

		.SetSpArray([
			  1000,
			  1004,  1008,  1012,  1016,  1020,  1024,  1028,  1032,  1036,  1040,
			  1044,  1048,  1052,  1056,  1060,  1064,  1068,  1072,  1076,  1080,
			  1084,  1088,  1092,  1096,  1100,  1104,  1108,  1112,  1116,  1120,
			  1124,  1128,  1132,  1136,  1140,  1144,  1148,  1152,  1156,  1160,
			  1164,  1168,  1172,  1176,  1180,  1184,  1188,  1192,  1196,  1200,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE, SKILL_ID_SIGNUM_CRUCIS,
			SKILL_ID_HEAL, SKILL_ID_CURE, SKILL_ID_ANGELUS,
			SKILL_ID_BLESSING, SKILL_ID_SOKUDO_ZOKA, SKILL_ID_SOKUDO_GENSHO,
			SKILL_ID_RUWACH, SKILL_ID_TELEPORT, SKILL_ID_WARP_PORTAL,
			SKILL_ID_PNEUMA, SKILL_ID_AQUA_BENEDICTA, SKILL_ID_HOLY_LIGHT,
			SKILL_ID_TEKKEN, SKILL_ID_KIKO, SKILL_ID_KIDATSU,
			SKILL_ID_SANDANSHO, SKILL_ID_RENDASHO, SKILL_ID_MORYUKEN,
			SKILL_ID_ASHURA_HAOKEN, SKILL_ID_MIKIRI, SKILL_ID_IBUKI,
			SKILL_ID_SHIDAN, SKILL_ID_HAKKEI, SKILL_ID_SHIRAHADORI,
			SKILL_ID_BAKURETSU_HADO, SKILL_ID_KONGO, SKILL_ID_ZANEI,
			SKILL_ID_SUNKEI, SKILL_ID_KIKO_TENI, SKILL_ID_RENKIKO,
			SKILL_ID_BUKKOKEN, SKILL_ID_RENCHUHOGEKI, SKILL_ID_MOKOKOHAZAN,
			SKILL_ID_SORYUKYAKU, SKILL_ID_TENRACHIMO, SKILL_ID_HASAICHU,
			SKILL_ID_DAITENHOSUI, SKILL_ID_GOHO, SKILL_ID_RASETSU_HAOGEKI,
			SKILL_ID_ZYUBAKUZIN, SKILL_ID_SENPUTAI, SKILL_ID_SENDENPO,
			SKILL_ID_ZIRAISHIN, SKILL_ID_BAKKISANDAN, SKILL_ID_SHURASHINDAN,
			SKILL_ID_RAIKODAN, SKILL_ID_SISIKO, SKILL_ID_SENRYU_SHOTEN,
			SKILL_ID_ZENKI_CHUNYU, SKILL_ID_KYUKIKO, SKILL_ID_TENKETSU_MOKU,
			SKILL_ID_TENKETSU_KAI, SKILL_ID_TENKETSU_HAN, SKILL_ID_TENKETSU_KATSU,
			SKILL_ID_TENKETSU_KYU, SKILL_ID_SENKO_RENGEKI, SKILL_ID_FULLSLOT,
			SKILL_ID_SHINKONO_ISHI, SKILL_ID_CHUZITSUNA_SHINNEN, SKILL_ID_KENKONA_SHINNEN,
			SKILL_ID_KYOZINNA_SHINNEN, SKILL_ID_DAIICHIGEKI_RAKUIN, SKILL_ID_DAIISSHO_SHINNENNO_CHIKARA,
			SKILL_ID_DAINIGEKI_SHINNEN, SKILL_ID_DAISANGEKI_DANZAI, SKILL_ID_DAINISHO_SHIPANSHA,
			SKILL_ID_DAINIGEKI_SHINPAN, SKILL_ID_DAISANGEKI_ZYOKA, SKILL_ID_SAISHUSHO_METSUMANO_HONO,
			SKILL_ID_DAINIGEKI_METSUMANO_HI, SKILL_ID_DAISANGEKI_MEKKAGEKI, SKILL_ID_SEYU_SENRE,
			SKILL_ID_BAKKA_SHINDAN, SKILL_ID_ENKA_METSUMA_SHINDAN,

		])

		.SetPassiveSkillIdArray([
			SKILL_ID_DIVINE_PROTECTION, SKILL_ID_DEMON_BANE,
			SKILL_ID_TEKKEN, SKILL_ID_KIKO,
			SKILL_ID_SANDANSHO, SKILL_ID_MIKIRI,
			SKILL_ID_BAKURETSU_HADO, SKILL_ID_KONGO,
			SKILL_ID_SANDAN_DELAY_ZOKA, SKILL_ID_TENKETSU_HAN,
			SKILL_ID_SENRYU_SHOTEN, SKILL_ID_TENKETSU_KATSU,
			SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI, SKILL_ID_FULLSLOT,
			SKILL_ID_SHINKONO_ISHI, SKILL_ID_CHUZITSUNA_SHINNEN,
			SKILL_ID_KENKONA_SHINNEN, SKILL_ID_KYOZINNA_SHINNEN,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_HEAL,
			SKILL_ID_HOLY_LIGHT,
			SKILL_ID_RUWACH,
			SKILL_ID_RENDASHO,
			SKILL_ID_MORYUKEN,
			SKILL_ID_SHIDAN,
			SKILL_ID_HAKKEI,
			SKILL_ID_ASHURA_HAOKEN,
			SKILL_ID_ASHURA_HAOKEN_SPKOTEI,
			SKILL_ID_SUNKEI,
			SKILL_ID_MOKOKOHAZAN,
			SKILL_ID_BUKKOKEN,
			SKILL_ID_RENCHUHOGEKI,
			SKILL_ID_SORYUKYAKU,
			SKILL_ID_SHURASHINDAN,
			SKILL_ID_RAIKODAN,
			SKILL_ID_BAKKISANDAN,
			SKILL_ID_DAITENHOSUI,
			SKILL_ID_TENRACHIMO,
			SKILL_ID_SISIKO,
			SKILL_ID_ZIRAISHIN,
			SKILL_ID_SENPUTAI,
			SKILL_ID_TENKETSU_MOKU,
			SKILL_ID_GOHO,
			SKILL_ID_RASETSU_HAOGEKI_MAX,
			SKILL_ID_RASETSU_HAOGEKI,
			SKILL_ID_HASAICHU,
			SKILL_ID_SENKO_RENGEKI,
			SKILL_ID_COMBO_SANDAN_CHAMP,
			SKILL_ID_COMBO_SORYUKYAKU,
			SKILL_ID_DAIICHIGEKI_RAKUIN,
			SKILL_ID_DAINIGEKI_SHINNEN,
			SKILL_ID_DAISANGEKI_DANZAI,
			SKILL_ID_DAINIGEKI_SHINPAN,
			SKILL_ID_DAISANGEKI_ZYOKA,
			SKILL_ID_DAINIGEKI_METSUMANO_HI,
			SKILL_ID_DAISANGEKI_MEKKAGEKI,
			SKILL_ID_SEYU_SENRE,
			SKILL_ID_BAKKA_SHINDAN,
			SKILL_ID_ENKA_METSUMA_SHINDAN,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ACOLYTE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ACOLYTE,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_MONK,
			ITEM_EQPFLG_SERIES_CHAMPION,
			ITEM_EQPFLG_SHURA,
			ITEM_EQPFLG_INQUISITOR,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_TROUBADOUR"
		))
		.AddNameKana("トルバドゥール", "トルバドゥール")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(1200)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 145)
		.AddWeaponAspd(ITEM_KIND_BOW, 148)
		.AddWeaponAspd(ITEM_KIND_MUSICAL, 149)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		// 1レベルで2上昇あり、注意
		.SetJobBonusArray([
			[1, PARAM_INT],
			[2, PARAM_STR],
			[2, MIG_PARAM_ID_STA],
			[3, PARAM_VIT],
			[3, PARAM_INT],
			[4, PARAM_DEX],
			[4, MIG_PARAM_ID_CON],
			[5, PARAM_AGI],
			[5, PARAM_DEX],
			[6, MIG_PARAM_ID_SPL],
			[7, PARAM_INT],
			[7, MIG_PARAM_ID_POW],
			[8, PARAM_INT],
			[8, MIG_PARAM_ID_CON],
			[9, MIG_PARAM_ID_WIS],
			[10, PARAM_AGI],
			[10, PARAM_VIT],
			[11, PARAM_VIT],
			[11, PARAM_VIT],
			[12, PARAM_LUK],
			[12, MIG_PARAM_ID_STA],
			[13, MIG_PARAM_ID_CON],
			[14, PARAM_DEX],
			[14, MIG_PARAM_ID_CRT],
			[15, PARAM_DEX],
			[16, MIG_PARAM_ID_SPL],
			[17, MIG_PARAM_ID_STA],
			[18, PARAM_STR],
			[19, PARAM_STR],
			[19, MIG_PARAM_ID_CON],
			[20, MIG_PARAM_ID_CON],
			[21, MIG_PARAM_ID_POW],
			[22, PARAM_INT],
			[23, MIG_PARAM_ID_WIS],
			[24, PARAM_STR],
			[24, MIG_PARAM_ID_POW],
			[25, MIG_PARAM_ID_SPL],
			[26, PARAM_AGI],
			[27, PARAM_AGI],
			[27, MIG_PARAM_ID_STA],
			[28, PARAM_STR],
			[28, MIG_PARAM_ID_WIS],
			[29, MIG_PARAM_ID_STA],
			[30, PARAM_LUK],
			[30, MIG_PARAM_ID_CRT],
			[31, PARAM_AGI],
			[32, PARAM_INT],
			[33, PARAM_DEX],
			[33, MIG_PARAM_ID_CON],
			[34, PARAM_VIT],
			[35, MIG_PARAM_ID_POW],
			[36, PARAM_DEX],
			[36, MIG_PARAM_ID_CRT],
			[37, MIG_PARAM_ID_WIS],
			[37, MIG_PARAM_ID_CON],
			[38, PARAM_AGI],
			[38, MIG_PARAM_ID_CRT],
			[39, PARAM_AGI],
			[40, PARAM_INT],
			[40, PARAM_DEX],
			[41, PARAM_VIT],
			[41, PARAM_INT],
			[42, MIG_PARAM_ID_SPL],
			[43, MIG_PARAM_ID_POW],
			[43, MIG_PARAM_ID_CON],
			[44, PARAM_STR],
			[44, PARAM_DEX],
			[45, PARAM_VIT],
			[45, PARAM_LUK],
			[46, PARAM_STR],
			[47, PARAM_DEX],
			[47, MIG_PARAM_ID_STA],
			[48, MIG_PARAM_ID_SPL],
			[49, PARAM_INT],
			[49, MIG_PARAM_ID_CON],
			[50, PARAM_DEX],
		])

		.SetHpArray([
			 18306,
			 18452, 18598, 18744, 18890, 19036, 19182, 19328, 19474, 19620, 19766,
			 19912, 20058, 20204, 20350, 20496, 20642, 20788, 20934, 21080, 21226,
			 21372, 21518, 21664, 21810, 21956, 22102, 22248, 22394, 22540, 22686,
			 22832, 22978, 23124, 23270, 23416, 23562, 23708, 23854, 24000, 24146,
			 24292, 24438, 24584, 24730, 24876, 25022, 25168, 25314, 25460, 25606,
		])

		.SetSpArray([
			  1170,
			  1174,  1178,  1182,  1186,  1190,  1194,  1198,  1202,  1206,  1210,
			  1214,  1218,  1222,  1226,  1230,  1234,  1238,  1242,  1246,  1250,
			  1254,  1258,  1262,  1266,  1270,  1274,  1278,  1282,  1286,  1290,
			  1294,  1298,  1302,  1306,  1310,  1314,  1318,  1322,  1326,  1330,
			  1334,  1338,  1342,  1346,  1350,  1354,  1358,  1362,  1366,  1370,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_DOUBLE_STRAFING, SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YA_SAKUSEI, SKILL_ID_GAKKINO_RENSHU, SKILL_ID_MUSICAL_STRIKE,
			SKILL_ID_FUKYOWAON, SKILL_ID_SAMUI_JOKE, SKILL_ID_KUCHIBUE,
			SKILL_ID_YUHINO_ASSASINCROSS, SKILL_ID_BRAGINO_UTA, SKILL_ID_IDUNNNO_RINGO,
			SKILL_ID_ADLIB, SKILL_ID_ENCORE, SKILL_ID_KOMORIUTA,
			SKILL_ID_NJORDNO_UTAGE, SKILL_ID_EIENNO_KONTON, SKILL_ID_IKUSADAIKONO_HIBIKI,
			SKILL_ID_NIBELUGENNO_YUBIWA, SKILL_ID_LOKINO_SAKEBI, SKILL_ID_SHINENNO_NAKANI,
			SKILL_ID_FUZIMINO_SIEGFRIED, SKILL_ID_UNMEINO_TALOTCARD, SKILL_ID_ARRAW_VULKAN,
			SKILL_ID_WATASHIWO_SHIBARANAIDE, SKILL_ID_TSUKIAKARINO_SHITADE, SKILL_ID_HELLMODENO_TUE,
			SKILL_ID_MARIONET_CONTROL, SKILL_ID_LESSON, SKILL_ID_ZIGOKUNO_UTA,
			SKILL_ID_FUKAKUTEYOSONO_GENGO, SKILL_ID_MELANCHOLY, SKILL_ID_SIRENNO_KOE,
			SKILL_ID_ZYUNKANSURU_SIZENNO_OTO, SKILL_ID_SEISHINO_SAKAIDE, SKILL_ID_SEVERE_RAINSTORM,
			SKILL_ID_SHINDOZANKYO, SKILL_ID_DOMINION_IMPULSE, SKILL_ID_METALIC_SOUND,
			SKILL_ID_YASURAGINO_KOMORIUTA, SKILL_ID_FUSHANIMUKATTE_TOTSUGEKI, SKILL_ID_ECHONO_UTA,
			SKILL_ID_HARMONIZE, SKILL_ID_LERAORNO_TSUYU, SKILL_ID_BEYOND_OF_WARCRY,
			SKILL_ID_MANANO_UTA, SKILL_ID_MELODY_OF_THINK, SKILL_ID_DANCE_WITH_WUG,
			SKILL_ID_FRIDAY_NIGHT_FEVER, SKILL_ID_SOUND_OF_DESTRUCTION, SKILL_ID_ENDLESS_HUMMING_VOICE,
			SKILL_ID_GREAT_ECHO, SKILL_ID_FRIGNO_UTA, SKILL_ID_FULLSLOT,
			SKILL_ID_SOUND_BLEND, SKILL_ID_METALIC_FURY, SKILL_ID_RHYTHM_SHOOTING,
			SKILL_ID_ROSE_BLOSSOM, SKILL_ID_MYSTIC_SYMPHONY, SKILL_ID_STAGE_MANNER,
			SKILL_ID_KAISO, SKILL_ID_GEFFENIA_NOCTURNE, SKILL_ID_YUYAKENO_SERENADE,
			SKILL_ID_LOKINO_KIMAGURE, SKILL_ID_KOINNO_RHAPSODY, SKILL_ID_MUSICAL_INTERLUDE,
			SKILL_ID_PRONTERA_MARCH, SKILL_ID_SHISHATACHIHENO_REQUIEM, SKILL_ID_SONATA_OF_KUVASIL,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME,
			SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_GAKKINO_RENSHU,
			SKILL_ID_LESSON, SKILL_ID_FULLSLOT,
			SKILL_ID_STAGE_MANNER, SKILL_ID_MYSTIC_SYMPHONY,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_MUSICAL_STRIKE,
			SKILL_ID_ARRAW_VULKAN,
			SKILL_ID_SEVERE_RAINSTORM,
			SKILL_ID_SEVERE_RAINSTORM_EX,
			SKILL_ID_SHINDOZANKYO,
			SKILL_ID_METALIC_SOUND,
			SKILL_ID_GREAT_ECHO,
			SKILL_ID_SOUND_BLEND,
			SKILL_ID_METALIC_FURY,
			SKILL_ID_RHYTHM_SHOOTING,
			SKILL_ID_ROSE_BLOSSOM,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ARCHER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ARCHER,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_BARD,
			ITEM_EQPFLG_SERIES_CROWN,
			ITEM_EQPFLG_MINSTREL,
			ITEM_EQPFLG_MINSTREL_WANDERER,
			ITEM_EQPFLG_TROUBADOUR,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_TROUVERE"
		))
		.AddNameKana("トルヴェール", "トルヴェール")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(1200)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 145)
		.AddWeaponAspd(ITEM_KIND_BOW, 148)
		.AddWeaponAspd(ITEM_KIND_WHIP, 149)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 6)

		.SetJobBonusArray([
			[1, PARAM_DEX],
			[2, PARAM_INT],
			[2, MIG_PARAM_ID_STA],
			[3, PARAM_INT],
			[4, PARAM_AGI],
			[4, MIG_PARAM_ID_CON],
			[5, PARAM_STR],
			[5, PARAM_VIT],
			[6, MIG_PARAM_ID_SPL],
			[7, PARAM_AGI],
			[7, MIG_PARAM_ID_POW],
			[8, PARAM_DEX],
			[8, MIG_PARAM_ID_CON],
			[9, PARAM_INT],
			[9, MIG_PARAM_ID_WIS],
			[10, PARAM_STR],
			[10, PARAM_AGI],
			[11, PARAM_VIT],
			[11, PARAM_DEX],
			[12, MIG_PARAM_ID_STA],
			[13, PARAM_VIT],
			[13, MIG_PARAM_ID_CON],
			[14, PARAM_VIT],
			[14, MIG_PARAM_ID_CRT],
			[15, PARAM_STR],
			[16, MIG_PARAM_ID_SPL],
			[17, PARAM_DEX],
			[17, MIG_PARAM_ID_STA],
			[18, PARAM_AGI],
			[18, PARAM_VIT],
			[19, MIG_PARAM_ID_CON],
			[20, MIG_PARAM_ID_CON],
			[21, PARAM_INT],
			[21, MIG_PARAM_ID_POW],
			[22, PARAM_VIT],
			[23, PARAM_DEX],
			[23, MIG_PARAM_ID_WIS],
			[24, MIG_PARAM_ID_POW],
			[25, PARAM_STR],
			[25, MIG_PARAM_ID_SPL],
			[26, PARAM_STR],
			[26, PARAM_LUK],
			[27, PARAM_STR],
			[27, MIG_PARAM_ID_STA],
			[28, MIG_PARAM_ID_WIS],
			[29, MIG_PARAM_ID_STA],
			[30, PARAM_DEX],
			[30, MIG_PARAM_ID_CRT],
			[31, PARAM_AGI],
			[32, PARAM_VIT],
			[33, PARAM_LUK],
			[33, MIG_PARAM_ID_CON],
			[34, PARAM_INT],
			[35, MIG_PARAM_ID_POW],
			[36, PARAM_INT],
			[36, MIG_PARAM_ID_CRT],
			[37, MIG_PARAM_ID_WIS],
			[37, MIG_PARAM_ID_CON],
			[38, PARAM_INT],
			[38, MIG_PARAM_ID_CRT],
			[39, PARAM_INT],
			[39, PARAM_LUK],
			[40, PARAM_STR],
			[40, PARAM_AGI],
			[41, PARAM_DEX],
			[42, MIG_PARAM_ID_SPL],
			[43, MIG_PARAM_ID_POW],
			[43, MIG_PARAM_ID_CON],
			[44, PARAM_DEX],
			[45, PARAM_AGI],
			[46, PARAM_AGI],
			[47, MIG_PARAM_ID_STA],
			[48, MIG_PARAM_ID_SPL],
			[49, PARAM_INT],
			[49, MIG_PARAM_ID_CON],
			[50, PARAM_AGI],
		])

		.SetHpArray([
			18306,
			18452, 18598, 18744, 18890, 19036, 19182, 19328, 19474, 19620, 19766,
			19912, 20058, 20204, 20350, 20496, 20642, 20788, 20934, 21080, 21226,
			21372, 21518, 21664, 21810, 21956, 22102, 22248, 22394, 22540, 22686,
			22832, 22978, 23124, 23270, 23416, 23562, 23708, 23854, 24000, 24146,
			24292, 24438, 24584, 24730, 24876, 25022, 25168, 25314, 25460, 25606,
	   ])

	   .SetSpArray([
			 1170,
			 1174,  1178,  1182,  1186,  1190,  1194,  1198,  1202,  1206,  1210,
			 1214,  1218,  1222,  1226,  1230,  1234,  1238,  1242,  1246,  1250,
			 1254,  1258,  1262,  1266,  1270,  1274,  1278,  1282,  1286,  1290,
			 1294,  1298,  1302,  1306,  1310,  1314,  1318,  1322,  1326,  1330,
			 1334,  1338,  1342,  1346,  1350,  1354,  1358,  1362,  1366,  1370,
	   ])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME, SKILL_ID_SHUCHURYOKU_KOZYO,
			SKILL_ID_DOUBLE_STRAFING, SKILL_ID_ARROW_SHOWER, SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YA_SAKUSEI, SKILL_ID_DANCENO_RENSHU, SKILL_ID_YAUCHI,
			SKILL_ID_ZIBUNKATTENA_DANCE, SKILL_ID_SCREAM, SKILL_ID_HUMMING,
			SKILL_ID_WATASHIWO_WASURENAIDE, SKILL_ID_KOUNNO_KISS, SKILL_ID_SERVICE_FOR_YOU,
			SKILL_ID_ADLIB, SKILL_ID_ENCORE, SKILL_ID_KOMORIUTA,
			SKILL_ID_NJORDNO_UTAGE, SKILL_ID_EIENNO_KONTON, SKILL_ID_IKUSADAIKONO_HIBIKI,
			SKILL_ID_NIBELUGENNO_YUBIWA, SKILL_ID_LOKINO_SAKEBI, SKILL_ID_SHINENNO_NAKANI,
			SKILL_ID_FUZIMINO_SIEGFRIED, SKILL_ID_UNMEINO_TALOTCARD, SKILL_ID_ARRAW_VULKAN,
			SKILL_ID_WATASHIWO_SHIBARANAIDE, SKILL_ID_TSUKIAKARINO_SHITADE, SKILL_ID_HELLMODENO_TUE,
			SKILL_ID_MARIONET_CONTROL, SKILL_ID_LESSON, SKILL_ID_ZIGOKUNO_UTA,
			SKILL_ID_FUKAKUTEYOSONO_GENGO, SKILL_ID_MELANCHOLY, SKILL_ID_SIRENNO_KOE,
			SKILL_ID_ZYUNKANSURU_SIZENNO_OTO, SKILL_ID_SEISHINO_SAKAIDE, SKILL_ID_SEVERE_RAINSTORM,
			SKILL_ID_SHINDOZANKYO, SKILL_ID_DOMINION_IMPULSE, SKILL_ID_METALIC_SOUND,
			SKILL_ID_YASURAGINO_KOMORIUTA, SKILL_ID_TSUKIAKARINO_SERENADE, SKILL_ID_KOIBITOTACHINO_TAMENO_SYMPHONY,
			SKILL_ID_SWING_DANCE, SKILL_ID_LERAORNO_TSUYU, SKILL_ID_BEYOND_OF_WARCRY,
			SKILL_ID_MANANO_UTA, SKILL_ID_MELODY_OF_THINK, SKILL_ID_DANCE_WITH_WUG,
			SKILL_ID_FRIDAY_NIGHT_FEVER, SKILL_ID_SOUND_OF_DESTRUCTION, SKILL_ID_ENDLESS_HUMMING_VOICE,
			SKILL_ID_GREAT_ECHO, SKILL_ID_FRIGNO_UTA, SKILL_ID_FULLSLOT,
			SKILL_ID_SOUND_BLEND, SKILL_ID_METALIC_FURY, SKILL_ID_RHYTHM_SHOOTING,
			SKILL_ID_ROSE_BLOSSOM, SKILL_ID_MYSTIC_SYMPHONY, SKILL_ID_STAGE_MANNER,
			SKILL_ID_KAISO, SKILL_ID_GEFFENIA_NOCTURNE, SKILL_ID_YUYAKENO_SERENADE,
			SKILL_ID_LOKINO_KIMAGURE, SKILL_ID_KOINNO_RHAPSODY, SKILL_ID_MUSICAL_INTERLUDE,
			SKILL_ID_PRONTERA_MARCH, SKILL_ID_SHISHATACHIHENO_REQUIEM, SKILL_ID_SONATA_OF_KUVASIL,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_FUKURONO_ME, SKILL_ID_WASHINO_ME,
			SKILL_ID_SHUCHURYOKU_KOZYO, SKILL_ID_DANCENO_RENSHU,
			SKILL_ID_LESSON, SKILL_ID_FULLSLOT,
			SKILL_ID_STAGE_MANNER, SKILL_ID_MYSTIC_SYMPHONY,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_DOUBLE_STRAFING,
			SKILL_ID_ARROW_SHOWER,
			SKILL_ID_CHARGE_ARROW,
			SKILL_ID_YAUCHI,
			SKILL_ID_ARRAW_VULKAN,
			SKILL_ID_SEVERE_RAINSTORM,
			SKILL_ID_SEVERE_RAINSTORM_EX,
			SKILL_ID_SHINDOZANKYO,
			SKILL_ID_METALIC_SOUND,
			SKILL_ID_GREAT_ECHO,
			SKILL_ID_SOUND_BLEND,
			SKILL_ID_METALIC_FURY,
			SKILL_ID_RHYTHM_SHOOTING,
			SKILL_ID_ROSE_BLOSSOM,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_ARCHER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ARCHER,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_SERIES_ARCHER_ROGUE,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_ARROW,
			ITEM_EQPFLG_SERIES_DANCER,
			ITEM_EQPFLG_SERIES_ZYPSY,
			ITEM_EQPFLG_WANDERER,
			ITEM_EQPFLG_MINSTREL_WANDERER,
			ITEM_EQPFLG_TROUVERE,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_ELEMENTAL_MASTER"
		))
		.AddNameKana("エレメンタルマスター", "エレメンタルマスター")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(1000)

		.AddWeaponAspd(ITEM_KIND_NONE, 154)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 148)
		.AddWeaponAspd(ITEM_KIND_STUFF, 146)
		.AddWeaponAspd(ITEM_KIND_BOOK, 152)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 141)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[1, MIG_PARAM_ID_SPL],
			[2, PARAM_INT],
			[2, PARAM_DEX],
			[3, PARAM_VIT],
			[3, PARAM_DEX],
			[4, PARAM_STR],
			[4, PARAM_VIT],
			[5, PARAM_INT],
			[5, MIG_PARAM_ID_SPL],
			[6, PARAM_INT],
			[6, MIG_PARAM_ID_POW],
			[7, PARAM_AGI],
			[7, MIG_PARAM_ID_SPL],
			[8, PARAM_INT],
			[9, PARAM_STR],
			[9, MIG_PARAM_ID_CON],
			[10, PARAM_DEX],
			[10, MIG_PARAM_ID_CRT],
			[11, PARAM_INT],
			[12, PARAM_VIT],
			[13, PARAM_DEX],
			[14, PARAM_VIT],
			[14, PARAM_INT],
			[15, PARAM_INT],
			[15, MIG_PARAM_ID_POW],
			[16, PARAM_VIT],
			[17, PARAM_LUK],
			[18, PARAM_INT],
			[18, MIG_PARAM_ID_POW],
			[19, PARAM_DEX],
			[19, PARAM_LUK],
			[20, PARAM_AGI],
			[20, PARAM_LUK],
			[21, PARAM_AGI],
			[21, PARAM_INT],
			[22, PARAM_DEX],
			[22, MIG_PARAM_ID_WIS],
			[23, PARAM_VIT],
			[24, PARAM_STR],
			[24, PARAM_DEX],
			[25, PARAM_LUK],
			[25, MIG_PARAM_ID_STA],
			[26, MIG_PARAM_ID_CON],
			[27, PARAM_VIT],
			[27, MIG_PARAM_ID_STA],
			[28, PARAM_INT],
			[29, PARAM_VIT],
			[30, PARAM_DEX],
			[30, PARAM_LUK],
			[31, PARAM_AGI],
			[31, PARAM_INT],
			[32, MIG_PARAM_ID_SPL],
			[33, PARAM_INT],
			[34, PARAM_DEX],
			[35, PARAM_STR],
			[36, MIG_PARAM_ID_SPL],
			[37, MIG_PARAM_ID_CON],
			[38, MIG_PARAM_ID_CRT],
			[39, MIG_PARAM_ID_CON],
			[39, MIG_PARAM_ID_CRT],
			[40, MIG_PARAM_ID_CON],
			[41, MIG_PARAM_ID_WIS],
			[41, MIG_PARAM_ID_SPL],
			[42, MIG_PARAM_ID_SPL],
			[43, MIG_PARAM_ID_WIS],
			[44, MIG_PARAM_ID_STA],
			[45, MIG_PARAM_ID_STA],
			[45, MIG_PARAM_ID_WIS],
			[46, MIG_PARAM_ID_WIS],
			[47, MIG_PARAM_ID_STA],
			[47, MIG_PARAM_ID_SPL],
			[48, MIG_PARAM_ID_SPL],
			[49, MIG_PARAM_ID_STA],
			[50, MIG_PARAM_ID_WIS],
			[50, MIG_PARAM_ID_SPL],
		])

		.SetHpArray([
			 17712,
			 17853, 17994, 18135, 18276, 18417, 18558, 18699, 18840, 18981, 19122,
			 19263, 19404, 19545, 19686, 19827, 19968, 20109, 20250, 20391, 20532,
			 20673, 20814, 20955, 21096, 21237, 21378, 21519, 21660, 21801, 21942,
			 22083, 22224, 22365, 22506, 22647, 22788, 22929, 23070, 23211, 23352,
			 23493, 23634, 23775, 23916, 24057, 24198, 24339, 24480, 24621, 24762,
		])

		.SetSpArray([
			  1762,
			  1769,  1776,  1783,  1790,  1797,  1804,  1811,  1818,  1825,  1832,
			  1839,  1846,  1853,  1860,  1867,  1874,  1881,  1888,  1895,  1902,
			  1909,  1916,  1923,  1930,  1937,  1944,  1951,  1958,  1965,  1972,
			  1979,  1986,  1993,  2000,  2007,  2014,  2021,  2028,  2035,  2042,
			  2049,  2056,  2063,  2070,  2077,  2084,  2091,  2098,  2105,  2112,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_FIRE_BOLT, SKILL_ID_FIRE_BALL, SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT, SKILL_ID_FROST_DIVER, SKILL_ID_SIGHT,
			SKILL_ID_LIGHTNING_BOLT, SKILL_ID_THUNDER_STORM, SKILL_ID_STONE_CURSE,
			SKILL_ID_NAPALM_BEAT, SKILL_ID_SOUL_STRIKE, SKILL_ID_SAFETY_WALL,
			SKILL_ID_SP_KAIFUKURYOKU_KOZYO, SKILL_ID_ENERGY_COAT, SKILL_ID_ADVANCED_BOOK,
			SKILL_ID_CAST_CANCEL, SKILL_ID_MAGIC_ROD, SKILL_ID_SPELL_BREAKER,
			SKILL_ID_DISPELL, SKILL_ID_FREE_CAST, SKILL_ID_AUTO_MAGICIAN_SPELL,
			SKILL_ID_DRAGONOLOGY, SKILL_ID_EARTH_SPIKE, SKILL_ID_HEAVENS_DRIVE,
			SKILL_ID_FLAME_LAUNCHER, SKILL_ID_FROST_WEAPON, SKILL_ID_LIGHTNING_LOADER,
			SKILL_ID_SEISMIC_WEAPON, SKILL_ID_VOLCANO, SKILL_ID_DELUGE,
			SKILL_ID_VIOLENT_GALE, SKILL_ID_LAND_PROTECTOR, SKILL_ID_ABRACADABRA,
			SKILL_ID_MONSTER_ZYOHO, SKILL_ID_CREATE_CONVERTER, SKILL_ID_FIRE_ELEMENTAL_CHANGE,
			SKILL_ID_WATER_ELEMENTAL_CHANGE, SKILL_ID_WIND_ELEMENTAL_CHANGE, SKILL_ID_EARTH_ELEMENTAL_CHANGE,
			SKILL_ID_SEIMEIRYOKU_HENKAN, SKILL_ID_SOUL_CHANGE, SKILL_ID_SOUL_BURN,
			SKILL_ID_MIND_BREAKER, SKILL_ID_SPIDER_WEB, SKILL_ID_WALL_OF_FOG,
			SKILL_ID_MEMORIZE, SKILL_ID_DOUBLE_CASTING, SKILL_ID_SPELL_FIST,
			SKILL_ID_FIRE_WALK, SKILL_ID_ELECTRIC_WALK, SKILL_ID_VACUUM_EXTREME,
			SKILL_ID_PSYCHIC_WAVE, SKILL_ID_DIAMOND_DUST, SKILL_ID_VERATURE_SPEAR,
			SKILL_ID_EARTH_GRAVE, SKILL_ID_CLOUD_KILL, SKILL_ID_POISON_BUSTER,
			SKILL_ID_WARMER, SKILL_ID_STRIKING, SKILL_ID_ARRULLO,
			SKILL_ID_SUMMON_AGNI, SKILL_ID_SUMMON_AQUA, SKILL_ID_SUMMON_VENTOS,
			SKILL_ID_SUMMON_TERA, SKILL_ID_ELEMENTAL_CONTROL, SKILL_ID_ELEMENTAL_ACTION,
			SKILL_ID_ELEMENTAL_ANALYSIS, SKILL_ID_ELEMENTAL_SYMPASY, SKILL_ID_ELEMENTAL_CURE,
			SKILL_ID_ELEMENTAL_SHIELD, SKILL_ID_FULLSLOT, SKILL_ID_MAHO_HON_SHUREN,
			SKILL_ID_DIAMOND_STORM, SKILL_ID_CONFLAGRATION, SKILL_ID_TERA_DRIVE,
			SKILL_ID_LIGHTNING_LAND, SKILL_ID_VENOM_SWAMP, SKILL_ID_SPELL_ENCHANTING,
			SKILL_ID_ACTIVITY_BURN, SKILL_ID_INCREASING_ACTIVITY, SKILL_ID_ELEMENTAL_SPIRIT_MASTERY,
			SKILL_ID_ELEMENTAL_VEIL, SKILL_ID_SUMMON_DILBIO, SKILL_ID_SUMMON_ALDOR,
			SKILL_ID_SUMMON_SERPENSE, SKILL_ID_SUMMON_PROCERA, SKILL_ID_SUMMON_TELEMOTUS,
			SKILL_ID_ELEMENTAL_BASTER,

		])

		.SetPassiveSkillIdArray([
			SKILL_ID_ENERGY_COAT, SKILL_ID_ADVANCED_BOOK,
			SKILL_ID_FREE_CAST, SKILL_ID_AUTO_MAGICIAN_SPELL,
			SKILL_ID_DRAGONOLOGY, SKILL_ID_MEMORIZE,
			SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL, SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL,
			SKILL_ID_DOUBLE_CASTING, SKILL_ID_SERE,
			SKILL_ID_SERE_MODE, SKILL_ID_SERE_SUPPORT_SKILL,
			SKILL_ID_FULLSLOT, SKILL_ID_MAHO_HON_SHUREN,
			SKILL_ID_ELEMENTAL_SPIRIT_MASTERY,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_FIRE_BOLT,
			SKILL_ID_FIRE_BALL,
			SKILL_ID_FIRE_WALL,
			SKILL_ID_COLD_BOLT,
			SKILL_ID_FROST_DIVER,
			SKILL_ID_LIGHTNING_BOLT,
			SKILL_ID_THUNDER_STORM,
			SKILL_ID_NAPALM_BEAT,
			SKILL_ID_SOUL_STRIKE,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_HEAVENS_DRIVE,
			SKILL_ID_SPELL_FIST,
			SKILL_ID_PSYCHIC_WAVE,
			SKILL_ID_CLOUD_KILL,
			SKILL_ID_POISON_BUSTER,
			SKILL_ID_EARTH_GRAVE,
			SKILL_ID_DIAMOND_DUST,
			SKILL_ID_VERATURE_SPEAR,
			SKILL_ID_FIRE_WALK,
			SKILL_ID_ELECTRIC_WALK,
			SKILL_ID_DIAMOND_STORM,
			SKILL_ID_CONFLAGRATION,
			SKILL_ID_TERA_DRIVE,
			SKILL_ID_LIGHTNING_LAND,
			SKILL_ID_VENOM_SWAMP,
			SKILL_ID_ELEMENTAL_BASTER,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_TYPE_BOOK,
			ITEM_EQPFLG_SERIES_SAGE,
			ITEM_EQPFLG_SERIES_PROFESSOR,
			ITEM_EQPFLG_SOURCERER,
			ITEM_EQPFLG_ELEMENTAL_MASTER,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_BIOLO"
		))
		.AddNameKana("バイオロ", "バイオロ")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(1200)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 147)
		.AddWeaponAspd(ITEM_KIND_SWORD, 146)
		.AddWeaponAspd(ITEM_KIND_AXE, 146)
		.AddWeaponAspd(ITEM_KIND_AXE_2HAND, 143)
		.AddWeaponAspd(ITEM_KIND_CLUB, 150)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 4)

		.SetJobBonusArray([
			[1, PARAM_INT],
			[2, PARAM_INT],
			[2, MIG_PARAM_ID_CRT],
			[3, PARAM_DEX],
			[4, MIG_PARAM_ID_STA],
			[4, MIG_PARAM_ID_SPL],
			[5, PARAM_VIT],
			[6, MIG_PARAM_ID_SPL],
			[6, MIG_PARAM_ID_CON],
			[7, PARAM_DEX],
			[8, PARAM_VIT],
			[8, PARAM_INT],
			[9, PARAM_AGI],
			[10, MIG_PARAM_ID_WIS],
			[11, PARAM_VIT],
			[11, MIG_PARAM_ID_CON],
			[12, MIG_PARAM_ID_CRT],
			[13, PARAM_INT],
			[14, PARAM_DEX],
			[15, MIG_PARAM_ID_SPL],
			[15, MIG_PARAM_ID_CRT],
			[16, PARAM_VIT],
			[17, PARAM_LUK],
			[18, PARAM_STR],
			[18, MIG_PARAM_ID_POW],
			[19, PARAM_VIT],
			[19, MIG_PARAM_ID_CON],
			[20, PARAM_DEX],
			[21, PARAM_AGI],
			[21, MIG_PARAM_ID_POW],
			[22, MIG_PARAM_ID_CON],
			[23, MIG_PARAM_ID_STA],
			[24, PARAM_INT],
			[24, MIG_PARAM_ID_CRT],
			[25, PARAM_VIT],
			[25, MIG_PARAM_ID_POW],
			[26, PARAM_VIT],
			[27, MIG_PARAM_ID_POW],
			[27, MIG_PARAM_ID_WIS],
			[28, MIG_PARAM_ID_CRT],
			[29, PARAM_DEX],
			[29, MIG_PARAM_ID_CRT],
			[30, PARAM_AGI],
			[31, MIG_PARAM_ID_CON],
			[32, PARAM_LUK],
			[32, MIG_PARAM_ID_CRT],
			[33, MIG_PARAM_ID_POW],
			[34, MIG_PARAM_ID_SPL],
			[35, PARAM_STR],
			[35, PARAM_INT],
			[36, PARAM_STR],
			[36, PARAM_INT],
			[37, PARAM_INT],
			[37, PARAM_DEX],
			[38, MIG_PARAM_ID_POW],
			[39, MIG_PARAM_ID_WIS],
			[39, MIG_PARAM_ID_CRT],
			[40, PARAM_AGI],
			[40, PARAM_DEX],
			[41, PARAM_STR],
			[41, PARAM_AGI],
			[42, PARAM_VIT],
			[42, PARAM_INT],
			[43, PARAM_LUK],
			[43, MIG_PARAM_ID_WIS],
			[44, PARAM_DEX],
			[44, MIG_PARAM_ID_CRT],
			[45, PARAM_INT],
			[46, PARAM_INT],
			[47, MIG_PARAM_ID_CON],
			[48, PARAM_AGI],
			[48, PARAM_INT],
			[49, PARAM_LUK],
			[49, MIG_PARAM_ID_STA],
			[50, PARAM_STR],
			[50, MIG_PARAM_ID_CRT],
		])

		.SetHpArray([
			 21347,
			 21517, 21687, 21857, 22027, 22197, 22367, 22537, 22707, 22877, 23047,
			 23217, 23387, 23557, 23727, 23897, 24067, 24237, 24407, 24577, 24747,
			 24917, 25087, 25257, 25427, 25597, 25767, 25937, 26107, 26277, 26447,
			 26617, 26787, 26957, 27127, 27297, 27467, 27637, 27807, 27977, 28147,
			 28317, 28487, 28657, 28827, 28997, 29167, 29337, 29507, 29677, 29847,
		])

		.SetSpArray([
			  1796,
			  1803,  1810,  1817,  1824,  1831,  1838,  1845,  1852,  1859,  1866,
			  1873,  1880,  1887,  1894,  1901,  1908,  1915,  1922,  1929,  1936,
			  1943,  1950,  1957,  1964,  1971,  1978,  1985,  1992,  1999,  2006,
			  2013,  2020,  2027,  2034,  2041,  2048,  2055,  2062,  2069,  2076,
			  2083,  2090,  2097,  2104,  2111,  2118,  2125,  2132,  2139,  2146,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_SHOZIGENKAIRYO_ZOKA, SKILL_ID_DISCOUNT, SKILL_ID_OVER_CHARGE,
			SKILL_ID_PUSH_CART, SKILL_ID_ITEM_KANTE, SKILL_ID_ROTEN_KAISETSU,
			SKILL_ID_MAMMONITE, SKILL_ID_LOUD_VOICE, SKILL_ID_CHANGE_CART,
			SKILL_ID_CART_REVOLUTION, SKILL_ID_ONO_SHUREN, SKILL_ID_LEARNING_POTION,
			SKILL_ID_PHARMACY, SKILL_ID_POTION_PITCHER, SKILL_ID_ACID_TERROR,
			SKILL_ID_BIOPLANT, SKILL_ID_SPHERE_MINE, SKILL_ID_DEMONSTRATION,
			SKILL_ID_CHEMICAL_WEAPON_CHARGE, SKILL_ID_CHEMICAL_SHIELD_CHARGE, SKILL_ID_CHEMICAL_ARMER_CHARGE,
			SKILL_ID_CHEMICAL_HELM_CHARGE, SKILL_ID_SEIMEI_RINRI, SKILL_ID_ANSOKU,
			SKILL_ID_CALL_HOMUNCULUS, SKILL_ID_RESURRECTION_HOMUNCULUS, SKILL_ID_SHOKUBUTSU_SAIBAI,
			SKILL_ID_SLIMPOTION_PITCHER, SKILL_ID_ACID_DEMONSTRATION, SKILL_ID_FULL_CHEMICAL_CHARGE,
			SKILL_ID_KEN_SHUREN_GENETIC, SKILL_ID_CART_KAIZO, SKILL_ID_CART_TORNADO,
			SKILL_ID_CART_CANNON, SKILL_ID_CART_BOOST_GENETIC, SKILL_ID_CHANGE_MATERIAL,
			SKILL_ID_SPECIAL_PHARMACY, SKILL_ID_MIX_COOKING, SKILL_ID_BAKUDAN_SEIZO,
			SKILL_ID_SLING_ITEM, SKILL_ID_THORN_TRAP, SKILL_ID_THORN_WALL,
			SKILL_ID_CRAZY_WEED, SKILL_ID_BLOOD_SUCKER, SKILL_ID_HELLS_PLANT,
			SKILL_ID_HOWLING_OF_MANDRAGORA, SKILL_ID_SPORE_EXPLOSION, SKILL_ID_DEMONIC_FIRE,
			SKILL_ID_FIRE_EXPANSION, SKILL_ID_ILLUSION_DOOPING, SKILL_ID_FULLSLOT,
			SKILL_ID_BIONIC_PHARMACY, SKILL_ID_HALL_FULL_CHEMICAL_CHARGE, SKILL_ID_FULL_SHADOW_CHARGE,
			SKILL_ID_BIONICS_MASTERY, SKILL_ID_ACIDIFIED_ZONE_CHI, SKILL_ID_ACIDIFIED_ZONE_HI,
			SKILL_ID_ACIDIFIED_ZONE_KAZE, SKILL_ID_ACIDIFIED_ZONE_MIZU, SKILL_ID_RESEARCH_REPORT,
			SKILL_ID_CREATE_CREAPER, SKILL_ID_CREATE_WOODEN_WARRIER, SKILL_ID_CREATE_WOODEN_FAIRY,
			SKILL_ID_CREATE_HELL_TREE,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_LOUD_VOICE, SKILL_ID_ONO_SHUREN,
			SKILL_ID_KEN_SHUREN_GENETIC, SKILL_ID_CART_KAIZO,
			SKILL_ID_CART_BOOST_GENETIC, SKILL_ID_HOMLV_FOR_PYROCLASTIC,
			SKILL_ID_PYROCLASTIC, SKILL_ID_OVERED_BOOST,
			SKILL_ID_DEFENCE, SKILL_ID_FULLSLOT,
			SKILL_ID_BIONICS_MASTERY, SKILL_ID_RESEARCH_REPORT,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_MAMMONITE,
			SKILL_ID_CART_REVOLUTION,
			SKILL_ID_ACID_TERROR,
			SKILL_ID_DEMONSTRATION,
			SKILL_ID_ACID_DEMONSTRATION,
			SKILL_ID_CART_TORNADO,
			SKILL_ID_CART_CANNON,
			SKILL_ID_HELLS_PLANT,
			SKILL_ID_CRAZY_WEED,
			SKILL_ID_THORN_TRAP,
			SKILL_ID_BLOOD_SUCKER,
			SKILL_ID_SPORE_EXPLOSION,
			SKILL_ID_DEMONIC_FIRE,
			SKILL_ID_FIRE_EXPANSION,
			SKILL_ID_SLING_ITEM,
			SKILL_ID_ACIDIFIED_ZONE_CHI,
			SKILL_ID_ACIDIFIED_ZONE_HI,
			SKILL_ID_ACIDIFIED_ZONE_KAZE,
			SKILL_ID_ACIDIFIED_ZONE_MIZU,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MARCHANT,
			ITEM_EQPFLG_SERIES_UPPER_OF_MARCHANT,
			ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
			ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT,
			ITEM_EQPFLG_TYPE_BACKLER,
			ITEM_EQPFLG_TYPE_GOOGLE,
			ITEM_EQPFLG_TYPE_KOZAN_HELMET,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_ONEHAND_AXE,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_DOFRENO_ONO,
			ITEM_EQPFLG_SERIES_3RD_EX2ND,
			ITEM_EQPFLG_SERIES_ALCHEMIST,
			ITEM_EQPFLG_SERIES_CREATOR,
			ITEM_EQPFLG_GENETIC,
			ITEM_EQPFLG_BIOLO,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_SKY_EMPEROR"
		))
		.AddNameKana("天帝", "テンテイ")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(0)

		.AddWeaponAspd(ITEM_KIND_NONE, 151)
		.AddWeaponAspd(ITEM_KIND_BOOK, 146)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_STR],
			[1, PARAM_DEX],
			[2, PARAM_STR],
			[2, MIG_PARAM_ID_POW],
			[3, PARAM_AGI],
			[3, PARAM_INT],
			[4, PARAM_STR],
			[4, PARAM_AGI],
			[4, PARAM_DEX],
			[5, PARAM_STR],
			[5, PARAM_INT],
			[5, MIG_PARAM_ID_POW],
			[6, PARAM_STR],
			[7, PARAM_STR],
			[7, PARAM_DEX],
			[8, PARAM_DEX],
			[8, MIG_PARAM_ID_CRT],
			[9, PARAM_AGI],
			[9, PARAM_VIT],
			[10, PARAM_DEX],
			[11, PARAM_VIT],
			[11, PARAM_INT],
			[12, PARAM_STR],
			[12, PARAM_LUK],
			[13, PARAM_STR],
			[13, PARAM_VIT],
			[14, MIG_PARAM_ID_CRT],
			[15, MIG_PARAM_ID_WIS],
			[16, PARAM_STR],
			[17, PARAM_STR],
			[17, PARAM_AGI],
			[18, MIG_PARAM_ID_STA],
			[19, MIG_PARAM_ID_POW],
			[20, PARAM_STR],
			[21, PARAM_DEX],
			[22, PARAM_AGI],
			[23, PARAM_AGI],
			[24, PARAM_STR],
			[24, PARAM_DEX],
			[25, PARAM_AGI],
			[26, PARAM_DEX],
			[26, PARAM_LUK],
			[27, MIG_PARAM_ID_CON],
			[28, PARAM_AGI],
			[28, MIG_PARAM_ID_POW],
			[29, PARAM_VIT],
			[29, PARAM_DEX],
			[30, PARAM_LUK],
			[30, MIG_PARAM_ID_CON],
			[31, PARAM_AGI],
			[31, PARAM_VIT],
			[32, PARAM_AGI],
			[33, PARAM_VIT],
			[33, MIG_PARAM_ID_STA],
			[34, MIG_PARAM_ID_POW],
			[35, MIG_PARAM_ID_STA],
			[35, MIG_PARAM_ID_CON],
			[36, MIG_PARAM_ID_POW],
			[37, MIG_PARAM_ID_CON],
			[38, MIG_PARAM_ID_CRT],
			[39, MIG_PARAM_ID_STA],
			[40, MIG_PARAM_ID_POW],
			[41, MIG_PARAM_ID_POW],
			[42, MIG_PARAM_ID_STA],
			[42, MIG_PARAM_ID_CRT],
			[43, MIG_PARAM_ID_STA],
			[44, MIG_PARAM_ID_POW],
			[45, MIG_PARAM_ID_STA],
			[45, MIG_PARAM_ID_CRT],
			[46, MIG_PARAM_ID_CRT],
			[47, MIG_PARAM_ID_POW],
			[47, MIG_PARAM_ID_WIS],
			[48, MIG_PARAM_ID_STA],
			[49, MIG_PARAM_ID_CON],
			[50, MIG_PARAM_ID_POW],
			[50, MIG_PARAM_ID_CRT],
		])

		.SetHpArray([
			 26264,
			 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264,
			 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264,
			 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264,
			 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264,
			 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264, 26264,
		])

		.SetSpArray([
			  1693,
			  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,
			  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,
			  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,
			  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,
			  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,  1693,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_TAIRIGI, SKILL_ID_NOPITIGI, SKILL_ID_FEORICHAGINO_KAMAE,
			SKILL_ID_NERYOCHAGINO_KAMAE, SKILL_ID_TORURYOCHAGINO_KAMAE, SKILL_ID_APUCHAORURIGINO_KAMAE,
			SKILL_ID_FEORICHAGI, SKILL_ID_NERYOCHAGI, SKILL_ID_TORURYOCHAGI,
			SKILL_ID_APUCHAORURIGI, SKILL_ID_TEIOAPUCHAGI, SKILL_ID_FIGHT,
			SKILL_ID_ODAYAKANA_KYUSOKU, SKILL_ID_TANOSHI_KYUSOKU, SKILL_ID_ATATAKAI_KAZE,
			SKILL_ID_RAKHO, SKILL_ID_TAEGWON_MISSION, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KANZYO,
			SKILL_ID_TAIYONO_NUKUMORI, SKILL_ID_TSUKINO_NUKUMORI, SKILL_ID_HOSHINO_NUKUMORI,
			SKILL_ID_TAIYONO_IKARI, SKILL_ID_TSUKINO_IKARI, SKILL_ID_HOSHINO_IKARI,
			SKILL_ID_TAIYONO_ANRAKU, SKILL_ID_TSUKINO_ANRAKU, SKILL_ID_HOSHINO_ANRAKU,
			SKILL_ID_TAIYONO_SHUKUFUKU, SKILL_ID_TSUKUNO_SHUKUFUKU, SKILL_ID_HOSHINO_SHUKUFUKU,
			SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_NIKUSHIMI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TOMO,
			SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_CHISHIKI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KIROKU,
			SKILL_ID_TAIYONO_KAMAE, SKILL_ID_TSUKINO_KAMAE, SKILL_ID_HOSHINO_KAMAE,
			SKILL_ID_KOEN_KYAKU, SKILL_ID_SAKUGETSU_KYAKU, SKILL_ID_SENKO_KYAKU,
			SKILL_ID_TAIYO_BAKUHATSU, SKILL_ID_MANGETSU_KYAKU, SKILL_ID_RYUSE_RAKKA,
			SKILL_ID_TAIYONO_HIKARI, SKILL_ID_TSUKINO_HIKARI, SKILL_ID_HOSHINO_HIKARI,
			SKILL_ID_UCHUNO_KAMAE, SKILL_ID_ZYURYOKU_CHOSE, SKILL_ID_SHINSE_BAKUHATSU,
			SKILL_ID_SEITE_KORIN, SKILL_ID_SOSENO_SHO, SKILL_ID_ZIGENNO_SHO,
			SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_ZYOKA, SKILL_ID_FULLSLOT, SKILL_ID_TENKINO_MI,
			SKILL_ID_TENKI_SHUREN, SKILL_ID_HYOHO_SHUREN, SKILL_ID_TENRA_BANSHO,
			SKILL_ID_TENCHI_ICHIYO, SKILL_ID_TAITEN_ICHIYO, SKILL_ID_TENYO,
			SKILL_ID_TENCHI_ICHIGETSU, SKILL_ID_TAITEN_ICHIGETSU, SKILL_ID_TENGETSU,
			SKILL_ID_TENCHI_BANSE, SKILL_ID_TENME_RAKUSE, SKILL_ID_TENSE,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_TAIRIGI, SKILL_ID_SPURT_ZYOTAI,
			SKILL_ID_FIGHT, SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT,
			SKILL_ID_RAKHO, SKILL_ID_TAIYONO_IKARI,
			SKILL_ID_TSUKINO_IKARI, SKILL_ID_HOSHINO_IKARI,
			SKILL_ID_TAIYONO_ANRAKU, SKILL_ID_TSUKINO_ANRAKU,
			SKILL_ID_HOSHINO_ANRAKU, SKILL_ID_TAIYONO_SHUKUFUKU,
			SKILL_ID_TSUKUNO_SHUKUFUKU, SKILL_ID_HOSHINO_SHUKUFUKU,
			SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO,
			SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KISEKI, SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_ZYOKA,
			SKILL_ID_TAIYONO_KAMAE, SKILL_ID_TAIYONO_HIKARI,
			SKILL_ID_TSUKINO_KAMAE, SKILL_ID_TSUKINO_HIKARI,
			SKILL_ID_HOSHINO_KAMAE, SKILL_ID_HOSHINO_HIKARI,
			SKILL_ID_RYUSE_RAKKA, SKILL_ID_RYUSE_RAKKA_MODE,
			SKILL_ID_UCHUNO_KAMAE, SKILL_ID_ZIGENNO_SHO,
			SKILL_ID_FULLSLOT, SKILL_ID_TENKINO_MI,
			SKILL_ID_TENKI_SHUREN, SKILL_ID_HYOHO_SHUREN,
			SKILL_ID_UNKONO_ZYOTAI,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_FEORICHAGI,
			SKILL_ID_NERYOCHAGI,
			SKILL_ID_TORURYOCHAGI,
			SKILL_ID_APUCHAORURIGI,
			SKILL_ID_TEIOAPUCHAGI,
			SKILL_ID_TEIOAPUCHAGI_IN_DASH,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_NUKUMORI,
			SKILL_ID_NUKUMORI_KABE,
			SKILL_ID_KOEN_KYAKU,
			SKILL_ID_TAIYO_BAKUHATSU,
			SKILL_ID_SAKUGETSU_KYAKU,
			SKILL_ID_MANGETSU_KYAKU,
			SKILL_ID_SENKO_KYAKU,
			SKILL_ID_RYUSE_RAKKA,
			SKILL_ID_ZYURYOKU_CHOSE,
			SKILL_ID_SHINSE_BAKUHATSU,
			SKILL_ID_SEITE_KORIN,
			SKILL_ID_SOSENO_SHO,
			SKILL_ID_TENCHI_ICHIYO,
			SKILL_ID_TAITEN_ICHIYO,
			SKILL_ID_TENYO,
			SKILL_ID_TENCHI_ICHIGETSU,
			SKILL_ID_TAITEN_ICHIGETSU,
			SKILL_ID_TENGETSU,
			SKILL_ID_TENCHI_BANSE,
			SKILL_ID_TENME_RAKUSE,
			SKILL_ID_TENSE,
			SKILL_ID_TENRA_BANSHO,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_TYPE_BOOTS,
			ITEM_EQPFLG_TYPE_MANT,
			ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR,
			ITEM_EQPFLG_TYPE_MAJESTIC_GOAT,
			ITEM_EQPFLG_TYPE_MIRROR_SHIELD,
			ITEM_EQPFLG_TYPE_SENTO_GREEVE,
			ITEM_EQPFLG_TYPE_BOOK,
			ITEM_EQPFLG_SERIES_KENSEI,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();



	dataObject = new CMigJobDataMakeInfo()

		.SetId(funcRegisterId(
			"MIG_JOB_ID_SOUL_ASCETIC"
		))
		.AddNameKana("ソウルアセティック", "ソウルアセティック")

		.SetBaseExpTableId(BASE_EXP_TABLE_ID_REINCANATED)
		.SetJobExpTableId(JOB_EXP_TABLE_ID_4TH)
		.SetWeightBonus(0)

		.AddWeaponAspd(ITEM_KIND_NONE, 149)
		.AddWeaponAspd(ITEM_KIND_KNIFE, 146)
		.AddWeaponAspd(ITEM_KIND_STUFF, 144)
		.AddWeaponAspd(ITEM_KIND_STUFF2HAND, 143)
		.AddWeaponAspd(ITEM_KIND_SHIELD, 5)

		.SetJobBonusArray([
			[1, PARAM_VIT],
			[1, PARAM_INT],
			[2, PARAM_INT],
			[2, PARAM_DEX],
			[3, PARAM_AGI],
			[3, MIG_PARAM_ID_SPL],
			[4, PARAM_INT],
			[4, PARAM_DEX],
			[5, PARAM_INT],
			[5, PARAM_DEX],
			[6, PARAM_DEX],
			[6, MIG_PARAM_ID_SPL],
			[7, PARAM_INT],
			[7, PARAM_DEX],
			[8, PARAM_VIT],
			[8, PARAM_DEX],
			[9, PARAM_INT],
			[9, MIG_PARAM_ID_SPL],
			[10, PARAM_VIT],
			[10, PARAM_DEX],
			[11, PARAM_AGI],
			[11, PARAM_INT],
			[12, PARAM_INT],
			[12, PARAM_DEX],
			[13, MIG_PARAM_ID_WIS],
			[13, MIG_PARAM_ID_CON],
			[14, PARAM_INT],
			[14, PARAM_LUK],
			[15, PARAM_VIT],
			[15, PARAM_INT],
			[16, PARAM_VIT],
			[16, MIG_PARAM_ID_CRT],
			[17, PARAM_DEX],
			[18, MIG_PARAM_ID_CON],
			[19, MIG_PARAM_ID_WIS],
			[20, MIG_PARAM_ID_STA],
			[21, PARAM_DEX],
			[22, PARAM_DEX],
			[22, MIG_PARAM_ID_SPL],
			[23, PARAM_INT],
			[23, PARAM_LUK],
			[24, MIG_PARAM_ID_STA],
			[25, PARAM_AGI],
			[26, MIG_PARAM_ID_SPL],
			[27, PARAM_STR],
			[28, PARAM_AGI],
			[28, PARAM_VIT],
			[29, PARAM_STR],
			[29, PARAM_AGI],
			[30, MIG_PARAM_ID_SPL],
			[31, MIG_PARAM_ID_WIS],
			[32, PARAM_AGI],
			[32, PARAM_DEX],
			[33, MIG_PARAM_ID_CON],
			[34, PARAM_AGI],
			[35, PARAM_VIT],
			[35, PARAM_DEX],
			[36, PARAM_STR],
			[37, MIG_PARAM_ID_SPL],
			[38, MIG_PARAM_ID_STA],
			[39, MIG_PARAM_ID_STA],
			[40, MIG_PARAM_ID_CRT],
			[41, MIG_PARAM_ID_STA],
			[42, MIG_PARAM_ID_STA],
			[43, MIG_PARAM_ID_WIS],
			[43, MIG_PARAM_ID_CON],
			[44, MIG_PARAM_ID_WIS],
			[44, MIG_PARAM_ID_SPL],
			[45, MIG_PARAM_ID_SPL],
			[46, MIG_PARAM_ID_CON],
			[47, MIG_PARAM_ID_SPL],
			[48, MIG_PARAM_ID_CRT],
			[49, MIG_PARAM_ID_STA],
			[49, MIG_PARAM_ID_CON],
			[50, MIG_PARAM_ID_WIS],
			[50, MIG_PARAM_ID_SPL],
		])

		.SetHpArray([
			 21947,
			 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947,
			 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947,
			 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947,
			 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947,
			 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947, 21947,
		])

		.SetSpArray([
			  2266,
			  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,
			  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,
			  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,
			  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,
			  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,  2266,
		])

		.SetLearnSkillIdArray([
			SKILL_ID_KIHON_SKILL, SKILL_ID_OKYU_TEATE, SKILL_ID_SHINDAFURI,
			SKILL_ID_TAIRIGI, SKILL_ID_NOPITIGI, SKILL_ID_FEORICHAGINO_KAMAE,
			SKILL_ID_NERYOCHAGINO_KAMAE, SKILL_ID_TORURYOCHAGINO_KAMAE, SKILL_ID_APUCHAORURIGINO_KAMAE,
			SKILL_ID_FEORICHAGI, SKILL_ID_NERYOCHAGI, SKILL_ID_TORURYOCHAGI,
			SKILL_ID_APUCHAORURIGI, SKILL_ID_TEIOAPUCHAGI, SKILL_ID_FIGHT,
			SKILL_ID_ODAYAKANA_KYUSOKU, SKILL_ID_TANOSHI_KYUSOKU, SKILL_ID_ATATAKAI_KAZE,
			SKILL_ID_RAKHO, SKILL_ID_TAEGWON_MISSION, SKILL_ID_KAISEL,
			SKILL_ID_KAAHI, SKILL_ID_KAUPU, SKILL_ID_KAITO,
			SKILL_ID_KAINA, SKILL_ID_ESTIN, SKILL_ID_ESTON,
			SKILL_ID_ESMA, SKILL_ID_ESU, SKILL_ID_ESKA,
			SKILL_ID_ESKU, SKILL_ID_KNIGHTNO_TAMASHI, SKILL_ID_ASSASINNO_TAMASHI,
			SKILL_ID_PRIESTNO_TAMASHI, SKILL_ID_HUNTERNO_TAMASHI, SKILL_ID_WIZARDNO_TAMASHI,
			SKILL_ID_BLACKSMITHNO_TAMASHI, SKILL_ID_CRUSADERNO_TAMASHI, SKILL_ID_ROGUENO_TAMASHI,
			SKILL_ID_MONKNO_TAMASHI, SKILL_ID_BARDTO_DANCERNO_TAMASHI, SKILL_ID_SAGENO_TAMASHI,
			SKILL_ID_ALCHEMISTNO_TAMASHI, SKILL_ID_KENSENO_TAMASHI, SKILL_ID_SOULLINKERNO_TAMASHI,
			SKILL_ID_SUPER_NOVICENO_TAMASHI, SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI, SKILL_ID_TAMASHINO_CHIKUSEKI,
			SKILL_ID_TAMASHINO_SHUKAKU, SKILL_ID_TAMASHINO_ZYUNKAN, SKILL_ID_TAMASHINO_RENKETSU,
			SKILL_ID_SOUL_ENERGY_KENKYU, SKILL_ID_SHIRYO_HYOI, SKILL_ID_SHIRYO_BAKUHATSU,
			SKILL_ID_TAKANO_TAMASHI, SKILL_ID_YOSENO_TAMASHI, SKILL_ID_KAGENO_TAMASHI,
			SKILL_ID_GOLEMNO_TAMASHI, SKILL_ID_TAMASHINO_BUNRETSU, SKILL_ID_TAMASHINO_HOKAI,
			SKILL_ID_ESHA, SKILL_ID_ESPA, SKILL_ID_ESFU,
			SKILL_ID_KAUTO, SKILL_ID_FULLSLOT, SKILL_ID_GOFU_SHUREN,
			SKILL_ID_REIDOZYUTSU_SHUREN, SKILL_ID_GOKON_ISSHIN, SKILL_ID_SHIRYO_ZYOKA,
			SKILL_ID_ZYOKODO, SKILL_ID_GOGYO_FU, SKILL_ID_REIDO_FU,
			SKILL_ID_SEIRYU_FU, SKILL_ID_BYAKKO_FU, SKILL_ID_SUZAKU_FU,
			SKILL_ID_GENBU_FU, SKILL_ID_SHIHOZIN_FU, SKILL_ID_SHIHO_GOGYO_ZIN,
			SKILL_ID_SHUGO_FU, SKILL_ID_BUSHI_FU, SKILL_ID_HOSHI_FU,
			SKILL_ID_TENCHI_SHINRE,
		])

		.SetPassiveSkillIdArray([
			SKILL_ID_TAIRIGI, SKILL_ID_SPURT_ZYOTAI,
			SKILL_ID_FIGHT, SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT,
			SKILL_ID_RAKHO, SKILL_ID_KAINA,
			SKILL_ID_COUNT_OF_SOUL_ENERGY, SKILL_ID_FULLSLOT,
			SKILL_ID_GOFU_SHUREN, SKILL_ID_REIDOZYUTSU_SHUREN,
			SKILL_ID_SHIHO_FU_ZYOTAI,
		])

		.SetAttackSkillIdArray([
			SKILL_ID_TUZYO_KOGEKI,
			SKILL_ID_ESTIN,
			SKILL_ID_ESTON,
			SKILL_ID_ESMA,
			SKILL_ID_EARTH_SPIKE,
			SKILL_ID_ESHA,
			SKILL_ID_ESPA,
			SKILL_ID_ESFU,
			SKILL_ID_SHIRYO_BAKUHATSU,
			SKILL_ID_SHIRYO_ZYOKA,
			SKILL_ID_REIDO_FU,
			SKILL_ID_SEIRYU_FU,
			SKILL_ID_BYAKKO_FU,
			SKILL_ID_SUZAKU_FU,
			SKILL_ID_GENBU_FU,
			SKILL_ID_SHIHOZIN_FU,
			SKILL_ID_SHIHO_GOGYO_ZIN,
		])

		.SetEquipableEquipFlagArray([
			ITEM_EQPFLG_NONE,
			ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
			ITEM_EQPFLG_SERIES_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_SILKROBE,
			ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER,
			ITEM_EQPFLG_SERIES_UPPER_OF_ANY,
			ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER,
			ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC,
			ITEM_EQPFLG_SERIES_WIZARD_LINKER,
			ITEM_EQPFLG_SERIES_SOUL_LINKER,
			ITEM_EQPFLG_4TH,
			ITEM_EQPFLG_END,
		])
	;
	dataArray[dataObject.GetId()] = dataObject.ToArrayData();






})();



}		// _DATA_CREATE_MODE