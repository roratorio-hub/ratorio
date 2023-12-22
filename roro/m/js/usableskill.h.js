
//----------------------------------------------------------------
// データの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumUsableSkillDataIndex",
	[
		"USABLE_SKILL_DATA_INDEX_ID",
		"USABLE_SKILL_DATA_INDEX_ATTACKABLE",
		"USABLE_SKILL_DATA_INDEX_SKILL_ID",
		"USABLE_SKILL_DATA_INDEX_SKILL_LEVEL",
	],
	0,
	1
);



//----------------------------------------------------------------
// 攻撃可否フラグ
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumUsableSkillAttackableFlag",
	[
		"USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE",
		"USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE",
	],
	0,
	1
);



USABLE_SKILL_ID_CUSTOM_BIAS = 10000;
