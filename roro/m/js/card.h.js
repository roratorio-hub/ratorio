
//----------------------------------------------------------------
// データの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumCardDataIndex",
	[
		"CARD_DATA_INDEX_ID",
		"CARD_DATA_INDEX_KIND",
		"CARD_DATA_INDEX_NAME",
		"CARD_DATA_INDEX_DETAIL",
		"CARD_DATA_INDEX_SPBEGIN",
	],
	0,
	1
);



//----------------------------------------------------------------
// カードの種類（装着位置）
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumCardKind",
	[
		"CARD_KIND_NONE",
		"CARD_KIND_ARMS",
		"CARD_KIND_HEAD",
		"CARD_KIND_SHIELD",
		"CARD_KIND_BODY",
		"CARD_KIND_SHOULDER",
		"CARD_KIND_FOOT",
		"CARD_KIND_ACCESSARY",
	],
	0,
	1
);

CGlobalConstManager.DefineEnum(
	"EnumCardKind",
	[
		"CARD_KIND_LEARNING",
	],
	91,
	1
);

CGlobalConstManager.DefineEnum(
	"EnumCardKind",
	[
		"CARD_KIND_ENCHANT",
	],
	99,
	1
);

CGlobalConstManager.DefineEnum(
	"EnumCardKind",
	[
		"CARD_KIND_SET",
	],
	100,
	1
);

CGlobalConstManager.DefineEnum(
	"EnumCardKind",
	[
		"CARD_KIND_ANY",
	],
	200,
	1
);
