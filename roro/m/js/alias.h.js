// ESModule 化済み。HTMLでは type="module" で読み込むこと。

//----------------------------------------------------------------
// データの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumAliasDataIndex",
	[
		"ALIAS_DATA_INDEX_ALIAS",
		"ALIAS_DATA_INDEX_ORIGIN",
	],
	0,
	1
);
CGlobalConstManager.DefinePseudoEnum(
	"EnumAliasDataIndex",
	[
		"ALIAS_DATA_INDEX_COUNT",
	],
	EnumAliasDataIndex.Count,
	1
);



// エイリアスデータ配列
window.g_AliasDataArray = new Array();



/**
 * エイリアスを変換する.
 * @param alias エイリアス
 * @return 変換後の文字列（該当なしの場合は、空文字列）
 */
function TranslateAlias (alias) {

	var idx = 0;

	for (idx = 0; idx < g_AliasDataArray.length; idx++) {
		if (g_AliasDataArray[idx][ALIAS_DATA_INDEX_ALIAS] == alias) {
			return g_AliasDataArray[idx][ALIAS_DATA_INDEX_ORIGIN];
		}
	}

	return "";
}

// ============================================================
// 未移行ファイルとのグローバル互換ブロック
// 他のJSファイルの ESModule 移行が完了したら削除する
// ============================================================
window.TranslateAlias = TranslateAlias;