// === AUTO-GENERATED IMPORTS ===
import '../../m/js/monster.h.js';
import { MonsterObjNew } from '../../m/js/monster.dat.js';
import '../../m/js/monstermap.h.js';
import { g_MonsterMapDataArray, MONSTER_MAP_ID_MAP_ALL, MONSTER_MAP_ID_MVP_MONSTER } from '../../m/js/monstermap.dat.js';
import { HtmlRemoveAllChild } from '../../common/js/util.js';
import { MelonFes2026MonsterDropList } from './melonfes2026monsterdrop.dat.js';
// === END AUTO-GENERATED IMPORTS ===

document.addEventListener('DOMContentLoaded', OnLoadMelonFes2026MonsterDrop);
document.getElementById('OBJID_INPUT_ITEM_SEARCH')?.addEventListener('input', RefreshMelonFes2026MonsterDropList);
document.getElementById('OBJID_INPUT_MAP_SEARCH')?.addEventListener('input', RefreshMelonFes2026MonsterDropList);
document.getElementById('OBJID_INPUT_SORT_DESC')?.addEventListener('change', RefreshMelonFes2026MonsterDropList);

// 検索対象データ（モンスター名 + ドロップ品 + エンジン側Lv/生息マップを結合したもの）
var g_MelonFes2026MonsterDropEntries = [];

/**
 * モンスターID → 生息マップ名一覧 の逆引きインデックスを構築する.
 * MONSTER_MAP_ID_MAP_ALL／MONSTER_MAP_ID_MVP_MONSTER は実在の地域ではないため除外する.
 * @param monsterMapDataArray g_MonsterMapDataArray 相当のデータ
 */
export function BuildMonsterIdToMapNames(monsterMapDataArray) {

	var monsterIdToMapNames = new Map();

	for (var mapIdx = 0; mapIdx < monsterMapDataArray.length; mapIdx++) {
		var mapData = monsterMapDataArray[mapIdx];
		var mapId = mapData[MONSTER_MAP_DATA_INDEX_ID];
		if (mapId === MONSTER_MAP_ID_MAP_ALL || mapId === MONSTER_MAP_ID_MVP_MONSTER) {
			continue;
		}

		var mapName = mapData[MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY][0][NAME_KANA_DATA_INDEX_NAME];
		var monsterIdArray = mapData[MONSTER_MAP_DATA_INDEX_DATA_ARRAY];
		for (var monsterIdx = 0; monsterIdx < monsterIdArray.length; monsterIdx++) {
			var monsterId = monsterIdArray[monsterIdx];
			if (!monsterIdToMapNames.has(monsterId)) {
				monsterIdToMapNames.set(monsterId, []);
			}
			monsterIdToMapNames.get(monsterId).push(mapName);
		}
	}

	return monsterIdToMapNames;
}

/**
 * イベントのドロップリストに、エンジン側のLv・生息マップ情報を突き合わせる.
 * 名前が一致しないモンスターは level: null, mapNames: [] として返す.
 * @param dropList MelonFes2026MonsterDropList 相当のデータ（{ name, items }[]）
 * @param monsterObjNew MonsterObjNew 相当のデータ
 * @param monsterMapDataArray g_MonsterMapDataArray 相当のデータ
 */
export function BuildMelonFes2026MonsterDropEntries(dropList, monsterObjNew, monsterMapDataArray) {

	var nameToMonsterData = new Map();
	for (var idx = 0; idx < monsterObjNew.length; idx++) {
		nameToMonsterData.set(monsterObjNew[idx][MONSTER_DATA_INDEX_NAME], monsterObjNew[idx]);
	}

	var monsterIdToMapNames = BuildMonsterIdToMapNames(monsterMapDataArray);

	return dropList.map(function (dropEntry) {

		var monsterData = nameToMonsterData.get(dropEntry.name);
		if (!monsterData) {
			return { name: dropEntry.name, items: dropEntry.items, level: null, mapNames: [] };
		}

		var monsterId = monsterData[MONSTER_DATA_INDEX_ID];
		return {
			name: dropEntry.name,
			items: dropEntry.items,
			level: monsterData[MONSTER_DATA_INDEX_LEVEL],
			mapNames: monsterIdToMapNames.get(monsterId) || [],
		};
	});
}

/**
 * ドロップアイテム名・生息マップ名の部分一致でエントリを絞り込む.
 * itemSearchText・mapSearchText のいずれも指定された場合は AND 条件になる.
 * @param entries BuildMelonFes2026MonsterDropEntries の戻り値
 * @param itemSearchText アイテム名の検索文字列
 * @param mapSearchText 生息マップ名の検索文字列
 */
export function FilterMelonFes2026MonsterDropEntries(entries, itemSearchText, mapSearchText) {

	return entries.filter(function (entry) {

		if (itemSearchText && !entry.items.some(function (itemName) { return itemName.includes(itemSearchText); })) {
			return false;
		}

		if (mapSearchText && !entry.mapNames.some(function (mapName) { return mapName.includes(mapSearchText); })) {
			return false;
		}

		return true;
	});
}

/**
 * エントリを Lv の昇順／降順で並べ替える.
 * Lv が不明なエントリ（level: null）は、並べ替え方向に関わらず常に末尾になる.
 * @param entries BuildMelonFes2026MonsterDropEntries の戻り値（または絞り込み後の配列）
 * @param bDesc 降順フラグ
 */
export function SortMelonFes2026MonsterDropEntriesByLevel(entries, bDesc) {

	var sortedEntries = entries.slice();
	sortedEntries.sort(function (entryA, entryB) {

		if ((entryA.level === null) !== (entryB.level === null)) {
			return entryA.level === null ? 1 : -1;
		}
		if (entryA.level === null && entryB.level === null) {
			return 0;
		}

		if (entryA.level < entryB.level) {
			return bDesc ? 1 : -1;
		}
		if (entryA.level > entryB.level) {
			return bDesc ? -1 : 1;
		}
		return 0;
	});

	return sortedEntries;
}

/**
 * 初期化処理.
 */
function OnLoadMelonFes2026MonsterDrop() {

	g_MelonFes2026MonsterDropEntries = BuildMelonFes2026MonsterDropEntries(MelonFes2026MonsterDropList, MonsterObjNew, g_MonsterMapDataArray);

	var unmatchedNames = g_MelonFes2026MonsterDropEntries
		.filter(function (entry) { return entry.level === null; })
		.map(function (entry) { return entry.name; });
	if (unmatchedNames.length > 0) {
		console.warn('[melonfes2026monsterdrop] エンジン側データと一致しないモンスター名: ' + unmatchedNames.join(', '));
	}

	RefreshMelonFes2026MonsterDropList();
}

/**
 * 検索結果テーブルの再構築.
 */
function RefreshMelonFes2026MonsterDropList() {

	var objItemSearch = document.getElementById('OBJID_INPUT_ITEM_SEARCH');
	var itemSearchText = objItemSearch ? objItemSearch.value.trim() : '';

	var objMapSearch = document.getElementById('OBJID_INPUT_MAP_SEARCH');
	var mapSearchText = objMapSearch ? objMapSearch.value.trim() : '';

	var objInputDesc = document.getElementById('OBJID_INPUT_SORT_DESC');
	var bDesc = objInputDesc ? objInputDesc.checked : false;

	var filteredEntries = FilterMelonFes2026MonsterDropEntries(g_MelonFes2026MonsterDropEntries, itemSearchText, mapSearchText);
	var sortedEntries = SortMelonFes2026MonsterDropEntriesByLevel(filteredEntries, bDesc);

	var objTableResult = document.getElementById('OBJID_TABLE_RESULT');
	HtmlRemoveAllChild(objTableResult);

	var objTbody = document.createElement('tbody');
	objTableResult.appendChild(objTbody);

	var objTr = document.createElement('tr');
	objTr.setAttribute('bgcolor', '#aaaaff');
	objTbody.appendChild(objTr);
	['モンスター名', 'Lv', '生息マップ', 'ドロップアイテム'].forEach(function (headerText) {
		var objTd = document.createElement('td');
		objTd.appendChild(document.createTextNode(headerText));
		objTr.appendChild(objTd);
	});

	sortedEntries.forEach(function (entry, idx) {

		var objRowTr = document.createElement('tr');
		if ((idx % 2) === 0) {
			objRowTr.setAttribute('bgcolor', '#ddddff');
		}
		objTbody.appendChild(objRowTr);

		var objNameTd = document.createElement('td');
		objNameTd.appendChild(document.createTextNode(entry.name));
		objRowTr.appendChild(objNameTd);

		var objLevelTd = document.createElement('td');
		objLevelTd.appendChild(document.createTextNode(entry.level !== null ? entry.level : ''));
		objRowTr.appendChild(objLevelTd);

		var objMapTd = document.createElement('td');
		objMapTd.appendChild(document.createTextNode(entry.mapNames.join(', ')));
		objRowTr.appendChild(objMapTd);

		var objItemsTd = document.createElement('td');
		objItemsTd.appendChild(document.createTextNode(entry.items.join(', ')));
		objRowTr.appendChild(objItemsTd);
	});
}

export { RefreshMelonFes2026MonsterDropList, OnLoadMelonFes2026MonsterDrop };
