// ESModule 化済み。HTMLでは type="module" で読み込むこと。

//----------------------------------------------------------------
// データの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumRndOptListDataIndex",
	[
		"RND_OPT_LIST_DATA_INDEX_ID",
		"RND_OPT_LIST_DATA_INDEX_OPT_ID_ARRAY",
	],
	0,
	1
);

window.g_rndOptListArray = new Array();

