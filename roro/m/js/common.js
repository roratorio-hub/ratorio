//================================================================================================
//================================================================================================
//====
//==== パラメタ定義
//====
//================================================================================================
//================================================================================================

// 定義済みデータ種別定義
CGlobalConstManager.DefineEnum(
	"EnumConstDataKind",
	[
		"CONST_DATA_KIND_NONE",
		"CONST_DATA_KIND_ITEM",					// 時限アイテムで、固定値 1 採用しているので注意
		"CONST_DATA_KIND_CARD",					// 時限アイテムで、固定値 2 採用しているので注意
		"CONST_DATA_KIND_COSTUME",
		"CONST_DATA_KIND_ITEM_SET",
		"CONST_DATA_KIND_ENCHANT_TYPE",
		"CONST_DATA_KIND_ENCHANT_LIST",
		"CONST_DATA_KIND_TIME_ITEM",
		"CONST_DATA_KIND_ITEM_PACK",
		"CONST_DATA_KIND_SKILL",
		"CONST_DATA_KIND_USABLE_SKILL",
		"CONST_DATA_KIND_AUTO_SPELL",
		"CONST_DATA_KIND_ARROW",
		"CONST_DATA_KIND_MONSTER",
		"CONST_DATA_KIND_MONSTER_GROUP",
		"CONST_DATA_KIND_MONSTER_MAP",
		"CONST_DATA_KIND_CARD_SORT_DATA",		// 将来的に削除予定
		"CONST_DATA_KIND_TIME_ITEM_SORT_DATA",	// 将来的に削除予定
		"CONST_DATA_KIND_JOB_SKILL_PASSIVE",	// 将来的に削除予定
		"CONST_DATA_KIND_JOB_SKILL_ACTIVE",		// 将来的に削除予定
		"CONST_DATA_KIND_JOB_SKILL_LEARNED",	// 将来的に削除予定
		"CONST_DATA_KIND_PET",
		"CONST_DATA_KIND_RND_OPT_TYPE",
		"CONST_DATA_KIND_RND_OPT_LIST",
		"CONST_DATA_KIND_RND_OPT",
		"CONST_DATA_KIND_CHANGE_LOG",
		"CONST_DATA_KIND_ALIAS",
		"CONST_DATA_KIND_STATE",
		"CONST_DATA_KIND_BUFF",
		"CONST_DATA_KIND_HPSPBASE",				// 将来的に削除予定（移行用）
		"CONST_DATA_KIND_CHARA",
		"CONST_DATA_KIND_JOB",
	],
	0,
	1
);

// パラメータID定義
CGlobalConstManager.DefineEnum(
	"EnumParamId",
	[
		"PARAM_STR",
		"PARAM_AGI",
		"PARAM_VIT",
		"PARAM_INT",
		"PARAM_DEX",
		"PARAM_LUK",

		"PARAM_COUNT",
	],
	0,
	1
);

// 種族ID定義
CGlobalConstManager.DefineEnum(
	"EnumRaceId",
	[
		"RACE_ID_SOLID",
		"RACE_ID_UNDEAD",
		"RACE_ID_ANIMAL",
		"RACE_ID_PLANT",
		"RACE_ID_INSECT",
		"RACE_ID_FISH",
		"RACE_ID_DEMON",
		"RACE_ID_HUMAN",
		"RACE_ID_ANGEL",
		"RACE_ID_DRAGON",
	],
	0,
	1
);
CGlobalConstManager.DefinePseudoEnum(
	"EnumRaceId",
	[
		"RACE_ID_COUNT",
		"RACE_ID_ANY",
	],
	EnumRaceId.Count,
	1
);

// 属性ID定義
CGlobalConstManager.DefineEnum(
	"EnumElmId",
	[
		"ELM_ID_VANITY",
		"ELM_ID_WATER",
		"ELM_ID_EARTH",
		"ELM_ID_FIRE",
		"ELM_ID_WIND",
		"ELM_ID_POISON",
		"ELM_ID_HOLY",
		"ELM_ID_DARK",
		"ELM_ID_PSYCO",
		"ELM_ID_UNDEAD",
	],
	0,
	1
);
CGlobalConstManager.DefinePseudoEnum(
	"EnumElmId",
	[
		"ELM_ID_COUNT",
		"ELM_ID_ANY",
	],
	EnumElmId.Count,
	1
);

// サイズID定義
CGlobalConstManager.DefineEnum(
	"EnumSizeId",
	[
		"SIZE_ID_SMALL",
		"SIZE_ID_MEDIUM",
		"SIZE_ID_LARGE",
	],
	0,
	1
);
CGlobalConstManager.DefinePseudoEnum(
	"EnumSizeId",
	[
		"SIZE_ID_COUNT",
		"SIZE_ID_ANY",
	],
	EnumSizeId.Count,
	1
);

// 状態異常ID定義
CGlobalConstManager.DefineEnum(
	"EnumStateId",
	[
		"STATE_ID_POISON",
		"STATE_ID_STUN",
		"STATE_ID_FROZEN",
		"STATE_ID_CURSED",
		"STATE_ID_BLIND",
		"STATE_ID_SLEEP",
		"STATE_ID_SILENCE",
		"STATE_ID_CONFUSE",
		"STATE_ID_BLEEDING",
		"STATE_ID_STONE",
		"STATE_ID_BREAK_WEAPON",
		"STATE_ID_BREAK_HEAD",
		"STATE_ID_BREAK_BODY",
		"STATE_ID_BREAK_SHIELD",
		"STATE_ID_BREAK_SHOULDER",
		"STATE_ID_BREAK_FOOT",
		"STATE_ID_BREAK_ACCESSARY",

		"STATE_ID_COUNT",
	],
	0,
	1
);

// 親密度ID定義
CGlobalConstManager.DefineEnum(
	"EnumFriendlityId",
	[
		"FRIENDLITY_ID_AUTO",
		"FRIENDLITY_ID_RUNAWAY",
		"FRIENDLITY_ID_LOWEST",
		"FRIENDLITY_ID_LOW",
		"FRIENDLITY_ID_NORMAL",
		"FRIENDLITY_ID_HIGH",
		"FRIENDLITY_ID_HIGHEST",

		"FRIENDLITY_ID_COUNT",
	],
	0,
	1
);









/**
 * 定義済みデータ種別のテキストを取得する.
 * @param kindId 定義済みデータ種別ID
 */
function GetConstDataKindText(kindId) {

	switch (kindId) {

	case CONST_DATA_KIND_ITEM:
		return "アイテム";

	case CONST_DATA_KIND_ARROW:
		return "矢";

	case CONST_DATA_KIND_CARD:
		return "カード";

	case CONST_DATA_KIND_COSTUME:
		return "衣装";

	case CONST_DATA_KIND_ITEM_SET:
		return "アイテムセット";

	case CONST_DATA_KIND_ENCHANT_TYPE:
		return "エンチャントタイプ";

	case CONST_DATA_KIND_ENCHANT_LIST:
		return "エンチャントリスト";

	case CONST_DATA_KIND_TIME_ITEM:
		return "時限アイテム";

	case CONST_DATA_KIND_ITEM_PACK:
		return "アイテムパック";

	case CONST_DATA_KIND_SKILL:
		return "スキル";

	case CONST_DATA_KIND_USABLE_SKILL:
		return "使用可能スキル";

	case CONST_DATA_KIND_AUTO_SPELL:
		return "オートスペル";

	case CONST_DATA_KIND_MONSTER:
		return "モンスター";

	case CONST_DATA_KIND_MONSTER_GROUP:
		return "モンスターグループ";

	case CONST_DATA_KIND_MONSTER_MAP:
		return "モンスターマップ";

	case CONST_DATA_KIND_CARD_SORT_DATA:
		return "カード整列データ";

	case CONST_DATA_KIND_TIME_ITEM_SORT_DATA:
		return "時限アイテム整列データ";

	case CONST_DATA_KIND_JOB_SKILL_PASSIVE:
		return "職業スキル定義（パッシブ）";

	case CONST_DATA_KIND_JOB_SKILL_ACTIVE:
		return "職業スキル定義（アクティブ）";

	case CONST_DATA_KIND_JOB_SKILL_LEARNED:
		return "職業スキル定義（習得スキル）";

	case CONST_DATA_KIND_PET:
		return "ペット";

	case CONST_DATA_KIND_RND_OPT_TYPE:
		return "ランダムオプションタイプ";

	case CONST_DATA_KIND_RND_OPT_LIST:
		return "ランダムオプションリスト";

	case CONST_DATA_KIND_RND_OPT:
		return "ランダムオプション";

	case CONST_DATA_KIND_CHANGE_LOG:
		return "更新履歴";

	case CONST_DATA_KIND_ALIAS:
		return "エイリアス";

	case CONST_DATA_KIND_STATE:
		return "状態異常";

	case CONST_DATA_KIND_BUFF:
		return "バフ";

	case CONST_DATA_KIND_HPSPBASE:
		return "HPSP基礎値";

	case CONST_DATA_KIND_CHARA:
		return "キャラ基本データ";

	case CONST_DATA_KIND_JOB:
		return "職業データ";

	}

	return "不明";
}



/**
 * パラメータ名のテキストを取得する.
 * @param paramId パラメータID
 */
function GetParamText(paramId) {

	switch (paramId) {
	case PARAM_STR:
		return "STR";

	case PARAM_AGI:
		return "AGI";

	case PARAM_VIT:
		return "VIT";

	case PARAM_INT:
		return "INT";

	case PARAM_DEX:
		return "DEX";

	case PARAM_LUK:
		return "LUK";

	}

	return "エラー";
}



/**
 * 種族名のテキストを取得する.
 * @param raceId 種族ID
 */
function GetRaceText(raceId) {

	switch (raceId) {
	case RACE_ID_SOLID:
		return "無形";

	case RACE_ID_UNDEAD:
		return "不死";

	case RACE_ID_ANIMAL:
		return "動物";

	case RACE_ID_PLANT:
		return "植物";

	case RACE_ID_INSECT:
		return "昆虫";

	case RACE_ID_FISH:
		return "魚類";

	case RACE_ID_DEMON:
		return "悪魔";

	case RACE_ID_HUMAN:
		return "人間";

	case RACE_ID_ANGEL:
		return "天使";

	case RACE_ID_DRAGON:
		return "竜族";
	}

	return "エラー";
}



/**
 * 属性名のテキストを取得する.
 * @param elmId 属性ID
 */
function GetElementText(elmId) {

	switch (elmId) {
	case ELM_ID_VANITY:
		return "無";

	case ELM_ID_WATER:
		return "水";

	case ELM_ID_EARTH:
		return "地";

	case ELM_ID_FIRE:
		return "火";

	case ELM_ID_WIND:
		return "風";

	case ELM_ID_POISON:
		return "毒";

	case ELM_ID_HOLY:
		return "聖";

	case ELM_ID_DARK:
		return "闇";

	case ELM_ID_PSYCO:
		return "念";

	case ELM_ID_UNDEAD:
		return "不死";
	}

	return "エラー";
}

/**
 * モンスター属性のテキストを取得する.
 * @param モンスター属性ＩＤ
 */
function GetMonsterElementText(monsterElmId) {

	var elmId = Math.floor(monsterElmId / 10);
	var elmLv = monsterElmId % 10;

	return GetElementText(elmId) + elmLv;
}



/**
 * サイズ名のテキストを取得する.
 * @param sizeId サイズID
 */
function GetSizeText(sizeId) {

	switch (sizeId) {
	case SIZE_ID_SMALL:
		return "小型";

	case SIZE_ID_MEDIUM:
		return "中型";

	case SIZE_ID_LARGE:
		return "大型";

	}

	return "エラー";
}



/**
 * 状態異常名のテキストを取得する.
 * @param stateId 状態異常ID
 */
function GetStateText(stateId) {

	switch (stateId) {
	case STATE_ID_POISON:
		return "毒";

	case STATE_ID_STUN:
		return "スタン";

	case STATE_ID_FROZEN:
		return "凍結";

	case STATE_ID_CURSED:
		return "呪い";

	case STATE_ID_BLIND:
		return "暗黒";

	case STATE_ID_SLEEP:
		return "睡眠";

	case STATE_ID_SILENCE:
		return "沈黙";

	case STATE_ID_CONFUSE:
		return "混乱";

	case STATE_ID_BLEEDING:
		return "出血";

	case STATE_ID_STONE:
		return "石化";

	case STATE_ID_BREAK_WEAPON:
		return "武器破壊";

	case STATE_ID_BREAK_HEAD:
		return "兜破壊";

	case STATE_ID_BREAK_BODY:
		return "鎧破壊";

	case STATE_ID_BREAK_SHIELD:
		return "盾破壊";

	case STATE_ID_BREAK_SHOULDER:
		return "肩破壊";

	case STATE_ID_BREAK_FOOT:
		return "靴破壊";

	case STATE_ID_BREAK_ACCESSARY:
		return "アクセ破壊";

	}

	return "エラー";
}



/**
 * 親密度のテキストを取得する.
 * @param friendlityId 親密度ID
 */
function GetFriendlityText(friendlityId) {

	switch (friendlityId) {
	case FRIENDLITY_ID_AUTO:
		return "未設定(親しい扱い)";

	case FRIENDLITY_ID_RUNAWAY:
		return "逃亡寸前";

	case FRIENDLITY_ID_LOWEST:
		return "疎々しい";

	case FRIENDLITY_ID_LOW:
		return "気まずい";

	case FRIENDLITY_ID_NORMAL:
		return "普通";

	case FRIENDLITY_ID_HIGH:
		return "親しい";

	case FRIENDLITY_ID_HIGHEST:
		return "きわめて親しい";

	}

	return "エラー";
}

















//================================================================================================
//================================================================================================
//====
//==== インデックス定義
//====
//================================================================================================
//================================================================================================

var const_identifier = 0;

// 装備部位のインデックス
const_identifier = 0;

CGlobalConstManager.DefineEnum(
	"EnumEquipRegionId",
	[
		"EQUIP_REGION_ID_ARMS",
		"EQUIP_REGION_ID_ARMS_LEFT",
		"EQUIP_REGION_ID_HEAD_TOP",
		"EQUIP_REGION_ID_HEAD_MID",
		"EQUIP_REGION_ID_HEAD_UNDER",
		"EQUIP_REGION_ID_SHIELD",
		"EQUIP_REGION_ID_BODY",
		"EQUIP_REGION_ID_SHOULDER",
		"EQUIP_REGION_ID_SHOES",
		"EQUIP_REGION_ID_ACCESSARY_1",
		"EQUIP_REGION_ID_ACCESSARY_2",
		"EQUIP_REGION_ID_COSTUME_HEAD_TOP",
		"EQUIP_REGION_ID_COSTUME_HEAD_MID",
		"EQUIP_REGION_ID_COSTUME_HEAD_UNDER",

		"EQUIP_REGION_ID_SHADOW_ARMS_RIGHT",
		"EQUIP_REGION_ID_SHADOW_ARMS_LEFT",
		"EQUIP_REGION_ID_SHADOW_HEAD_TOP",
		"EQUIP_REGION_ID_SHADOW_HEAD_MID",
		"EQUIP_REGION_ID_SHADOW_HEAD_UNDER",
		"EQUIP_REGION_ID_SHADOW_BODY",
		"EQUIP_REGION_ID_SHADOW_SHOULDER",
		"EQUIP_REGION_ID_SHADOW_FOOT",
		"EQUIP_REGION_ID_SHADOW_ACCESSARY_1",
		"EQUIP_REGION_ID_SHADOW_ACCESSARY_2",
	],
	0,
	1
);
CGlobalConstManager.DefinePseudoEnum(
	"EnumMigItemParamId",
	[
		"EQUIP_REGION_ID_COUNT",
	],
	EnumEquipRegionId.Count,
	0
);
CGlobalConstManager.DefinePseudoEnum(
	"EnumMigItemParamId",
	[
		"EQUIP_REGION_ID_ANY",
	],
	-1,
	0
);






// カード部位のインデックス
const_identifier = 0;

CARD_REGION_ID_ARMS_RIGHT_1	 = const_identifier++;	// 0
CARD_REGION_ID_ARMS_RIGHT_2	 = const_identifier++;
CARD_REGION_ID_ARMS_RIGHT_3	 = const_identifier++;
CARD_REGION_ID_ARMS_RIGHT_4	 = const_identifier++;
CARD_REGION_ID_ARMS_LEFT_1	 = const_identifier++;
CARD_REGION_ID_ARMS_LEFT_2	 = const_identifier++;
CARD_REGION_ID_ARMS_LEFT_3	 = const_identifier++;
CARD_REGION_ID_ARMS_LEFT_4	 = const_identifier++;
CARD_REGION_ID_HEAD_TOP		 = const_identifier++;
CARD_REGION_ID_HEAD_MID		 = const_identifier++;
CARD_REGION_ID_SHIELD		 = const_identifier++;	// 10
CARD_REGION_ID_BODY			 = const_identifier++;
CARD_REGION_ID_SHOULDER		 = const_identifier++;
CARD_REGION_ID_SHOES		 = const_identifier++;
CARD_REGION_ID_ACCESSARY_1	 = const_identifier++;
CARD_REGION_ID_ACCESSARY_2	 = const_identifier++;	// 15
CARD_REGION_ID_HEAD_UNDER	 = const_identifier++;

const_identifier = 26;

CARD_REGION_ID_ENCHANT_HEAD_TOP_1		 = const_identifier++;
CARD_REGION_ID_ENCHANT_HEAD_TOP_2		 = const_identifier++;
CARD_REGION_ID_ENCHANT_HEAD_TOP_3		 = const_identifier++;
CARD_REGION_ID_ENCHANT_HEAD_MID_1		 = const_identifier++;
CARD_REGION_ID_ENCHANT_HEAD_MID_2		 = const_identifier++;
CARD_REGION_ID_ENCHANT_HEAD_MID_3		 = const_identifier++;

const_identifier = 33;

CARD_REGION_ID_ENCHANT_HEAD_UNDER_1		 = const_identifier++;
CARD_REGION_ID_ENCHANT_HEAD_UNDER_2		 = const_identifier++;
CARD_REGION_ID_ENCHANT_HEAD_UNDER_3		 = const_identifier++;
CARD_REGION_ID_ENCHANT_SHIELD_1			 = const_identifier++;
CARD_REGION_ID_ENCHANT_SHIELD_2			 = const_identifier++;
CARD_REGION_ID_ENCHANT_SHIELD_3			 = const_identifier++;
CARD_REGION_ID_ENCHANT_BODY_1			 = const_identifier++;
CARD_REGION_ID_ENCHANT_BODY_2			 = const_identifier++;
CARD_REGION_ID_ENCHANT_BODY_3			 = const_identifier++;
CARD_REGION_ID_ENCHANT_SHOULDER_1		 = const_identifier++;
CARD_REGION_ID_ENCHANT_SHOULDER_2		 = const_identifier++;
CARD_REGION_ID_ENCHANT_SHOULDER_3		 = const_identifier++;
CARD_REGION_ID_ENCHANT_SHOES_1			 = const_identifier++;
CARD_REGION_ID_ENCHANT_SHOES_2			 = const_identifier++;
CARD_REGION_ID_ENCHANT_SHOES_3			 = const_identifier++;
CARD_REGION_ID_ENCHANT_ACCESSARY_1_1	 = const_identifier++;
CARD_REGION_ID_ENCHANT_ACCESSARY_1_2	 = const_identifier++;
CARD_REGION_ID_ENCHANT_ACCESSARY_1_3	 = const_identifier++;
CARD_REGION_ID_ENCHANT_ACCESSARY_2_1	 = const_identifier++;
CARD_REGION_ID_ENCHANT_ACCESSARY_2_2	 = const_identifier++;
CARD_REGION_ID_ENCHANT_ACCESSARY_2_3	 = const_identifier++;

CARD_REGION_ID_COUNT		 = const_identifier;

// [CARD_REGION_ID_COUNT] ～ [99] まで、セット効果定義で使用
// CheckAndApplyItemSetEquipping() 関数を参照のこと

const_identifier = -1;

CARD_REGION_ID_ANY						 = const_identifier--;
CARD_REGION_ID_ARMS_RIGHT_ANY			 = const_identifier--;
CARD_REGION_ID_ARMS_LEFT_ANY			 = const_identifier--;
CARD_REGION_ID_HEAD_TOP_ANY				 = const_identifier--;
CARD_REGION_ID_HEAD_MID_ANY				 = const_identifier--;
CARD_REGION_ID_HEAD_UNDER_ANY			 = const_identifier--;
CARD_REGION_ID_SHIELD_ANY				 = const_identifier--;
CARD_REGION_ID_BODY_ANY					 = const_identifier--;
CARD_REGION_ID_SHOULDER_ANY				 = const_identifier--;
CARD_REGION_ID_SHOES_ANY				 = const_identifier--;
CARD_REGION_ID_ACCESSARY_ANY			 = const_identifier--;
CARD_REGION_ID_ACCESSARY_1_ANY			 = const_identifier--;
CARD_REGION_ID_ACCESSARY_2_ANY			 = const_identifier--;





//衣装部位のインデックス
const_identifier = -1;

COSTUME_REGION_ID_ANY			 = const_identifier--;
COSTUME_REGION_ID_ARMS_RIGHT	 = const_identifier++;
COSTUME_REGION_ID_ARMS_LEFT		 = const_identifier++;
COSTUME_REGION_ID_HEAD_TOP		 = const_identifier++;
COSTUME_REGION_ID_HEAD_MID		 = const_identifier++;
COSTUME_REGION_ID_HEAD_UNDER	 = const_identifier++;
COSTUME_REGION_ID_SHIELD		 = const_identifier++;
COSTUME_REGION_ID_BODY			 = const_identifier++;
COSTUME_REGION_ID_SHOULDER		 = const_identifier++;
COSTUME_REGION_ID_SHOES			 = const_identifier++;
COSTUME_REGION_ID_ACCESSARY_1	 = const_identifier++;
COSTUME_REGION_ID_ACCESSARY_2	 = const_identifier++;

COSTUME_REGION_ID_COUNT		 = const_identifier;









COLOR_CODE_TABLE_HEADER_IS_SET = "#ff7777";
COLOR_CODE_TABLE_HEADER_IS_NOT_SET = "#ddddff";
