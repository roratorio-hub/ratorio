import { CNameKana } from "./chara/CNameKana.js";
import { g_MonsterMapDataArray, g_MonsterMapCategoryDataArray } from "./monstermap.dat.js";
// === AUTO-GENERATED IMPORTS ===
import "./chara/CNameKana.js";
import { MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY } from "./const/EnumMonsterMapDataIndex.js";
import { NAME_KANA_DATA_INDEX_KANA, NAME_KANA_DATA_INDEX_SORT } from "./const/EnumNameKanaDataIndex.js";
// === END AUTO-GENERATED IMPORTS ===
export { g_MonsterMapDataArray, g_MonsterMapCategoryDataArray } from "./monstermap.dat.js";

/**
 * データ配列のソート仮名を設定する.
 * @param dataArray データ配列
 */
export function SetUpSortKanaMonsterMap(dataArray) {

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


SetUpSortKanaMonsterMap(g_MonsterMapDataArray);
SetUpSortKanaMonsterMap(g_MonsterMapCategoryDataArray);

