
//----------------------------------------------------------------
// データの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumTimeItemDataIndex",
	[
		"TIME_ITEM_DATA_INDEX_ID",
		"TIME_ITEM_DATA_INDEX_NAME",
		"TIME_ITEM_DATA_INDEX_EXPLAIN",
		"TIME_ITEM_DATA_INDEX_SRC_DATA_ARRAY",
		"TIME_ITEM_DATA_INDEX_SPBEGIN",
	],
	0,
	1
);

CGlobalConstManager.DefineEnum(
	"EnumTimeItemDataIndexSrcIndex",
	[
		"TIME_ITEM_DATA_INDEX_SRC_INDEX_KIND",
		"TIME_ITEM_DATA_INDEX_SRC_INDEX_ID",
	],
	0,
	1
);



// 時限アイテム定義配列
ITEM_SP_TIME_OBJ = new Array();

// 時限アイテム整列データ配列
ITEM_SP_TIME_OBJ_SORT = new Array();
