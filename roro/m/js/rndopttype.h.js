// === AUTO-GENERATED IMPORTS ===
import './common.js';
import { EQUIP_REGION_ID_COUNT } from './const/EnumMigItemParamId.js';
import { RND_OPT_SLOT_COUNT } from './const/EnumRndOptTypeDataIndex.js';
// === END AUTO-GENERATED IMPORTS ===

// ランダムオプション設定状況テーブル初期化
export let g_equipRndOptTable = new Array();

for (let eqpRgnId = 0; eqpRgnId < EQUIP_REGION_ID_COUNT; eqpRgnId++) {

	g_equipRndOptTable[eqpRgnId] = new Array();

	for (let rndOptIndex = 0; rndOptIndex < RND_OPT_SLOT_COUNT; rndOptIndex++) {

		g_equipRndOptTable[eqpRgnId][rndOptIndex] = [0, 0];

	}
}


export function SetEquipRndOptTable(eqpRgnId, rndOptIndex, rndOptId, rndOptValue) {

	if (rndOptId < 0) {
		g_equipRndOptTable[eqpRgnId][rndOptIndex][1] = rndOptValue;
	}

	else {
		g_equipRndOptTable[eqpRgnId][rndOptIndex] = [rndOptId, rndOptValue];
	}
}

export function GetEquipRndOptTableKind(eqpRgnId, rndOptIndex) {

	// TODO: 次世代版のシャドウ装備対応　暫定措置
	try {
		return g_equipRndOptTable[eqpRgnId][rndOptIndex][0];
	}
	catch (err) {
		return 0;
	}
}

export function GetEquipRndOptTableValue(eqpRgnId, rndOptIndex) {

	// TODO: 次世代版のシャドウ装備対応　暫定措置
	try {
		return g_equipRndOptTable[eqpRgnId][rndOptIndex][1];
	}
	catch (err) {
		return 0;
	}
}


