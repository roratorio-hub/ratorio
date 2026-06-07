
import { CGlobalConstManager } from './CGlobalConstManager.js';
import { g_AliasDataArray } from './alias.dat.js';

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


/**
 * エイリアスを変換する.
 * @param alias エイリアス
 * @return 変換後の文字列（該当なしの場合は、空文字列）
 */
export function TranslateAlias (alias) {

	var idx = 0;

	for (idx = 0; idx < g_AliasDataArray.length; idx++) {
		if (g_AliasDataArray[idx][ALIAS_DATA_INDEX_ALIAS] == alias) {
			return g_AliasDataArray[idx][ALIAS_DATA_INDEX_ORIGIN];
		}
	}

	return "";
}


