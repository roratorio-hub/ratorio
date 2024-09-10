
//----------------------------------------------------------------
// データの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumArrowDataIndex",
	[
		"ARROW_DATA_INDEX_ID",
		"ARROW_DATA_INDEX_NAME",
		"ARROW_DATA_INDEX_KANA",
		"ARROW_DATA_INDEX_KIND",
		"ARROW_DATA_INDEX_DETAIL",
		"ARROW_DATA_INDEX_SPBEGIN",
	],
	0,
	1
);



//----------------------------------------------------------------
// 矢の種類
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumArrowKind",
	[
		"ARROW_KIND_NONE",
		"ARROW_KIND_ARROW",
		"ARROW_KIND_BULLET",
	],
	0,
	1
);



// 矢データ配列
ArrowOBJNew = new Array();
