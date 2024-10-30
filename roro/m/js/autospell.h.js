
//----------------------------------------------------------------
// データの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumAutoSpellDataIndex",
	[
		"AUTO_SPELL_DATA_INDEX_ID",
		"AUTO_SPELL_DATA_INDEX_ATTACKABLE",
		"AUTO_SPELL_DATA_INDEX_SKILL_ID",
		"AUTO_SPELL_DATA_INDEX_SKILL_LEVEL",
		"AUTO_SPELL_DATA_INDEX_PROBABLY",
		"AUTO_SPELL_DATA_INDEX_TRIGGER",
		"AUTO_SPELL_DATA_INDEX_SORT_NAME",
	],
	0,
	1
);



//----------------------------------------------------------------
// 発動率定数
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumAutoSpellProb",
	[
		"AUTO_SPELL_PROB_ESP",		// 一定確率で発動
	],
	0,
	1
);



//----------------------------------------------------------------
// 発動率定数
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumAutoSpellTrigger",
	[
		"AUTO_SPELL_TRIGGER_UNKNOWN",
		"AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK",		// 1 物理攻撃時
		"AUTO_SPELL_TRIGGER_SHORTRANGE_ATTACK",		// 2 近接攻撃時
		"AUTO_SPELL_TRIGGER_LONGRANGE_ATTACK",		// 3 遠距離攻撃時
		"AUTO_SPELL_TRIGGER_ANY_ATTACK",			// 4 物理・魔法攻撃時
		"AUTO_SPELL_TRIGGER_MAGICAL_ATTACK",		// 5 魔法攻撃時
		"AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED",		// 6 物理攻撃を受けた時
		"AUTO_SPELL_TRIGGER_SHORTRANGE_DAMAGED",	// 7 近距離物理攻撃を受けた時
		"AUTO_SPELL_TRIGGER_LONGRANGE_DAMAGED",		// 8 遠距離物理攻撃を受けた時
		"AUTO_SPELL_TRIGGER_MAGICAL_DAMAGED",		// 9 魔法攻撃を受けた時
		"AUTO_SPELL_TRIGGER_ANY_DAMAGED",			// 10 物理または魔法攻撃を受けた時
	],
	0,
	1
);



AUTO_SPELL_ID_CUSTOM_BIAS = 20000;





/**
 * オートスペル発動トリガのテキストを取得する.
 * @param triggerId 発動トリガＩＤ
 */
function GetAutoSpellTriggerText(triggerId) {
	switch (triggerId) {
	case AUTO_SPELL_TRIGGER_UNKNOWN:
		return "特定条件の時";

	case AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK:
		return "物理攻撃時";

	case AUTO_SPELL_TRIGGER_SHORTRANGE_ATTACK:
		return "近接攻撃時";

	case AUTO_SPELL_TRIGGER_LONGRANGE_ATTACK:
		return "遠距離攻撃時";

	case AUTO_SPELL_TRIGGER_ANY_ATTACK:
		return "物理・魔法攻撃時";

	case AUTO_SPELL_TRIGGER_MAGICAL_ATTACK:
		return "魔法攻撃時";

	case AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED:
		return "物理攻撃を受けた時";

	case AUTO_SPELL_TRIGGER_SHORTRANGE_DAMAGED:
		return "近距離物理攻撃を受けた時";

	case AUTO_SPELL_TRIGGER_LONGRANGE_DAMAGED:
		return "遠距離物理攻撃を受けた時";

	case AUTO_SPELL_TRIGGER_MAGICAL_DAMAGED:
		return "魔法攻撃を受けた時";

	case AUTO_SPELL_TRIGGER_ANY_DAMAGED:
		return "物理または魔法攻撃を受けた時";

	}

	return "不明";
}

