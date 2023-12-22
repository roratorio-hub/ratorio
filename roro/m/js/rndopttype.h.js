
//----------------------------------------------------------------
// データの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumRndOptTypeDataIndex",
	[
		"RND_OPT_TYPE_DATA_INDEX_ID",
		"RND_OPT_TYPE_DATA_INDEX_LIST_ID_ARRAY",
	],
	0,
	1
);



//----------------------------------------------------------------
// オプションスロットインデックス
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumRndOptTypeDataIndex",
	[
		"RND_OPT_SLOT_1",
		"RND_OPT_SLOT_2",
		"RND_OPT_SLOT_3",
		"RND_OPT_SLOT_4",
		"RND_OPT_SLOT_5",

		"RND_OPT_SLOT_COUNT",
	],
	0,
	1
);



// ランダムオプション設定状況テーブル初期化
(function () {

	var eqpRgnId = 0;
	var rndOptIndex = 0;

	g_equipRndOptTable = new Array();

	for (eqpRgnId = 0; eqpRgnId < EQUIP_REGION_ID_COUNT; eqpRgnId++) {

		g_equipRndOptTable[eqpRgnId] = new Array();

		for (rndOptIndex = 0; rndOptIndex < RND_OPT_SLOT_COUNT; rndOptIndex++) {

			g_equipRndOptTable[eqpRgnId][rndOptIndex] = [0, 0];

		}
	}
})();



g_rndOptTypeArray = new Array();



function SetEquipRndOptTable(eqpRgnId, rndOptIndex, rndOptId, rndOptValue) {

	if (rndOptId < 0) {
		g_equipRndOptTable[eqpRgnId][rndOptIndex][1] = rndOptValue;
	}

	else {
		g_equipRndOptTable[eqpRgnId][rndOptIndex] = [rndOptId, rndOptValue];
	}
}

function GetEquipRndOptTableKind(eqpRgnId, rndOptIndex) {

	// TODO: 次世代版のシャドウ装備対応　暫定措置
	try {
		return g_equipRndOptTable[eqpRgnId][rndOptIndex][0];
	}
	catch (err) {
		return 0;
	}
}

function GetEquipRndOptTableValue(eqpRgnId, rndOptIndex) {

	// TODO: 次世代版のシャドウ装備対応　暫定措置
	try {
		return g_equipRndOptTable[eqpRgnId][rndOptIndex][1];
	}
	catch (err) {
		return 0;
	}
}



