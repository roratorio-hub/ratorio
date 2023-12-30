
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



// データ作成モードなら、本番データを上書き
if (_DATA_CREATE_MODE) {

	(function () {

		var idx = 0;
		var idxItem = 0;
		var idxCard = 0;

		var modifiedIdArray = null;
		var resolveDataArrayItem = null;
		var resolveDataArrayCard = null;
		var itemId = 0;
		var cardId = 0;
		var attrMatcher = null;
		var enchListId = 0;
		var enchListIdArray = null;
		var enchListData = null;



		// グローバル固定データマネージャの、データ配列を初期化
		g_constDataManager.enchListDataManager.reverseResolveArrayItemId = [];

		// 編集用配列として取得
		resolveDataArrayItem = g_constDataManager.enchListDataManager.reverseResolveArrayItemId;
		resolveDataArrayCard = g_constDataManager.enchListDataManager.reverseResolveArrayCardId;



		// エンチャント効果の並び順を取得
		g_constDataManager.enchListDataManager.sortedEnchantCardIdArray = MigGetSortedEnchantCardIdArray();

		// 補正処理後のエンチャントリストID配列を取得
		modifiedIdArray = MigGetModifiedEnchListIdArray();

		// アップグレード系IDの配列を取得
		g_constDataManager.enchListDataManager.upgradeTypeIdArray = MigGetUpgradeTypeIdArray();



		// TODO: 旧データから検索している
		// アイテムループ
		for (idxItem = 0; idxItem < ItemObjNew.length; idxItem++) {

			// アイテムID取得
			itemId = ItemObjNew[idxItem][ITEM_DATA_INDEX_ID];

			// アイテムID用のマッチャを生成する
			attrMatcher = new CMigEquipableSpDataAttributeMatcher([
				new CMigEquipableSpDataAttributeMatchingCore(MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_TARGET_LIST, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, [itemId]),
			]);

			// 該当データ検索
			enchListIdArray = [];
			for (idx = 0; idx < modifiedIdArray.length; idx++) {

				// エンチャントリストID取得
				enchListId = modifiedIdArray[idx];

				// エンチャントリストデータ取得
				enchListData = g_constDataManager.GetDataObject(CONST_DATA_KIND_ENCHANT_LIST, enchListId);

				if (!enchListData) {
					continue;
				}

				// エンチャントリストの対象装備に含まれるかを検査し、含まれていれば、エンチャントリストIDの配列に追加する
				enchListData.ForEachSpData(
					function (valueF, indexF, arrayF) {
						if (valueF.HasAttribute(attrMatcher, true)) {
							if (enchListIdArray.indexOf(enchListId) < 0) {
								enchListIdArray.push(enchListId);
							}
						}
					}
				);
			}

			// 該当があった場合
			if (enchListIdArray.length > 0) {
				resolveDataArrayItem[idxItem] = enchListIdArray;
			}
			else {
				resolveDataArrayItem[idxItem] = null;
			}
		}



		// TODO: 旧データから検索している
		// カードループ
		for (idxCard = 0; idxCard < CardObjNew.length; idxCard++) {

			// カードID取得
			cardId = CardObjNew[idxCard][CARD_DATA_INDEX_ID];

			// カードID用のマッチャを生成する
			attrMatcher = new CMigEquipableSpDataAttributeMatcher([
				new CMigEquipableSpDataAttributeMatchingCore(MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_EFFECT_LIST, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_CARD, [cardId]),
			]);

			// 該当データ検索
			enchListIdArray = [];
			for (idx = 0; idx < modifiedIdArray.length; idx++) {

				// エンチャントリストID取得
				enchListId = modifiedIdArray[idx];

				// エンチャントリストデータ取得
				enchListData = g_constDataManager.GetDataObject(CONST_DATA_KIND_ENCHANT_LIST, enchListId);

				if (!enchListData) {
					continue;
				}

				// エンチャントリストの対象装備に含まれるかを検査し、含まれていれば、エンチャントリストIDの配列に追加する
				enchListData.ForEachSpData(
					function (valueF, indexF, arrayF) {
						if (valueF.HasAttribute(attrMatcher, true)) {
							if (enchListIdArray.indexOf(enchListId) < 0) {
								enchListIdArray.push(enchListId);
							}
						}
					}
				);
			}

			// 該当があった場合
			if (enchListIdArray.length > 0) {
				resolveDataArrayCard[idxCard] = enchListIdArray;
			}
			else {
				resolveDataArrayCard[idxCard] = null;
			}
		}

	})();

}
