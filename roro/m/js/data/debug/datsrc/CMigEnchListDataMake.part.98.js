
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



// 並び順の補正
function MigGetModifiedEnchListIdArray () {

	var idx = 0;

	var splicedArray = null;
	var enchListIdArraySorted = null;
	var enchListIdArrayTypeExpands = null;

	// 拡張系エンチャントのIDのリスト
	var idListExpands = [
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G1_ARMS,
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G1_HEAD_TOP,
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G1_BODY,
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G1_SHIELD,
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G1_SHOULDER,
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G1_FOOT,
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G1_ACCESSORY_ON1,
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G1_ACCESSORY_ON2,
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G1_ACCESSORY,
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G2_ARMS,
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G2_BODY,
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G2_SHIELD,
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G2_FOOT,
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G2_ACCESSORY_ON1,
		MIG_ENCH_LIST_ID_SHINKIRO_ENCHANT_G2_ACCESSORY_ON2,
		MIG_ENCH_LIST_ID_PHAROS_ENCHANT_G1_ARMS,
		MIG_ENCH_LIST_ID_PHAROS_ENCHANT_G1_HEAD_TOP,
		MIG_ENCH_LIST_ID_PHAROS_ENCHANT_G1_HEAD_MID,
		MIG_ENCH_LIST_ID_PHAROS_ENCHANT_G1_HEAD_UNDER,
		MIG_ENCH_LIST_ID_PHAROS_ENCHANT_G1_BODY,
		MIG_ENCH_LIST_ID_PHAROS_ENCHANT_G1_SHOULDER,
		MIG_ENCH_LIST_ID_PHAROS_ENCHANT_G1_FOOT,
		MIG_ENCH_LIST_ID_PHAROS_ENCHANT_G1_ACCESSORY,
		MIG_ENCH_LIST_ID_PHAROS_ENCHANT_G2_ACCESSORY,
		MIG_ENCH_LIST_ID_PHAROS_ENCHANT_G3_ACCESSORY,
		MIG_ENCH_LIST_ID_PHAROS_ENCHANT_G4_ACCESSORY,
		MIG_ENCH_LIST_ID_PHAROS_ENCHANT_G5_ACCESSORY,
		MIG_ENCH_LIST_ID_DWARF_ENCHANT_G1_ARMS,
		MIG_ENCH_LIST_ID_DWARF_ENCHANT_G1_HEAD_TOP,
		MIG_ENCH_LIST_ID_DWARF_ENCHANT_G1_BODY,
		MIG_ENCH_LIST_ID_DWARF_ENCHANT_G1_FOOT,
		MIG_ENCH_LIST_ID_DWARF_ENCHANT_G1_ACCESSORY,
		MIG_ENCH_LIST_ID_DWARF_ENCHANT_G1_ACCESSORY_ON2,
		MIG_ENCH_LIST_ID_DWARF_ENCHANT_G2_ARMS,
	];

	// 非表示にするIDのリスト
	var idListNotUsed = [
		MIG_ENCH_LIST_ID_MORETSU_ENCHANT_PUFFY,
		MIG_ENCH_LIST_ID_MORETSU_ENCHANT_FISH_SUIT,
		MIG_ENCH_LIST_ID_MORETSU_ENCHANT_TOKUSHU_KANKYO,
		MIG_ENCH_LIST_ID_MORETSU_ENCHANT_GODS_SWORD,
		MIG_ENCH_LIST_ID_MORETSU_ENCHANT_GODS_HELM,
		MIG_ENCH_LIST_ID_MORETSU_ENCHANT_GODS_ARMOR,
		MIG_ENCH_LIST_ID_MORETSU_ENCHANT_GODS_SHIELD,
		MIG_ENCH_LIST_ID_MORETSU_ENCHANT_GODS_GUNTLET,
		MIG_ENCH_LIST_ID_DANSHO_ENCHANT_DEMONISH_SWORD,
		MIG_ENCH_LIST_ID_DANSHO_ENCHANT_DEMONISH_HELM,
		MIG_ENCH_LIST_ID_DANSHO_ENCHANT_DEMONISH_ARMOR,
		MIG_ENCH_LIST_ID_DANSHO_ENCHANT_DEMONISH_SHIELD,
		MIG_ENCH_LIST_ID_DANSHO_ENCHANT_DEMONISH_GUNTLET,
	];



	// ID 配列を生成
	enchListIdArraySorted = new Array();
	for (idx = 0; idx < g_constDataManager.enchListDataManager.sourceArray.length; idx++) {

		// 非表示はスキップ
		if (idListNotUsed.indexOf(idx) >= 0) {
			continue;
		}

		// ID値を追加
		enchListIdArraySorted[idx] = idx;
	}



	// 拡張系エンチャントを分離
	enchListIdArrayTypeExpands = new Array();
	for (idx = enchListIdArraySorted.length - 1; idx >= 0; idx--) {
		if (idListExpands.indexOf(enchListIdArraySorted[idx]) >= 0) {
			splicedArray = enchListIdArraySorted.splice(idx, 1);
			enchListIdArrayTypeExpands.unshift(splicedArray[0]);
		}
	}



	// 非表示エンチャントのデータをクリア（dat容量削減）
	for (idx = 0; idx < idListNotUsed.length; idx++) {
		// DatCoder の処理の関係で、undefined に設定する
		g_constDataManager.enchListDataManager.sourceArray[idListNotUsed[idx]] = undefined;
	}



	// 分離した配列を結合して返す
	return enchListIdArraySorted.concat(enchListIdArrayTypeExpands);
}
