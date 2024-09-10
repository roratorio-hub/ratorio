
//----------------------------------------------------------------
// データの要素番号
//----------------------------------------------------------------

CGlobalConstManager.DefineEnum(
	"EnumMonsterMapDataIndex",
	[
		"MONSTER_MAP_DATA_INDEX_ID",
		"MONSTER_MAP_DATA_INDEX_KIND",
		"MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY",
		"MONSTER_MAP_DATA_INDEX_DATA_ARRAY",
	],
	0,
	1
);
CGlobalConstManager.DefinePseudoEnum(
	"EnumMonsterMapDataIndex",
	[
		"MONSTER_MAP_DATA_INDEX_COUNT",
	],
	EnumMonsterMapDataIndex.Count,
	1
);



//----------------------------------------------------------------
// マップ種別ＩＤ定義
//----------------------------------------------------------------

CGlobalConstManager.DefineEnum(
	"EnumMonsterMapKind",
	[
		"MONSTER_MAP_KIND_MAP",
		"MONSTER_MAP_KIND_MEMORIAL_DUNGEON",
		"MONSTER_MAP_KIND_CATEGORY",
	],
	0,
	1
);
CGlobalConstManager.DefinePseudoEnum(
	"EnumMonsterMapKind",
	[
		"MONSTER_MAP_KIND_COUNT",
	],
	EnumMonsterMapKind.Count,
	1
);





/**
 * データ配列のソート仮名を設定する.
 * @param dataArray データ配列
 */
function SetUpSortKanaMonsterMap(dataArray) {

	var idx = 0;
	var idxName = 0;

	var nameKanaArray = null;

	for (idx = 0; idx < dataArray.length; idx++) {

		// 名称仮名配列を取得
		nameKanaArray = dataArray[idx][MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY];

		// すべての名称仮名のソート仮名を更新
		for (idxName = 0; idxName < nameKanaArray.length; idxName++) {
			nameKanaArray[idxName][NAME_KANA_DATA_INDEX_SORT] = CNameKana.GetSortCode(nameKanaArray[idxName][NAME_KANA_DATA_INDEX_KANA]);
		}
	}
}





// データ配列
g_MonsterMapDataArray = [];
g_MonsterMapCategoryDataArray = [];