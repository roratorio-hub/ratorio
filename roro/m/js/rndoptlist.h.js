
import { CGlobalConstManager } from './CGlobalConstManager.js';

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

export const g_rndOptListArray = new Array();

if (typeof window !== 'undefined') {
	window.g_rndOptListArray = g_rndOptListArray;
}

