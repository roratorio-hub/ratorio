// 定数定義
CARD_KIND_DMY_FOR_ALL = -1;

// 初期処理の実行
function OnLoadCardList () {
	SetUpSelectCardType();
	RefreshCardListTable();
}

/**
 * カード種別選択セレクトボックスを構築する.
 */
function SetUpSelectCardType(){
	var idx = 0;
	var objSelect = null;
	// 選択欄のオブジェクトを取得
	objSelect = document.getElementById("OBJID_SELECT_CARD_KIND");
	// 一度、全ての選択肢を削除
	HtmlRemoveOptionAll(objSelect);
	// 選択肢を追加
	HtmlCreateElementOption(CARD_KIND_DMY_FOR_ALL, "全てのカード", objSelect);
	HtmlCreateElementOption(CARD_KIND_ARMS, "武器カード", objSelect);
	HtmlCreateElementOption(CARD_KIND_HEAD, "兜カード", objSelect);
	HtmlCreateElementOption(CARD_KIND_SHIELD, "盾カード", objSelect);
	HtmlCreateElementOption(CARD_KIND_BODY, "鎧カード", objSelect);
	HtmlCreateElementOption(CARD_KIND_SHOULDER, "肩カード", objSelect);
	HtmlCreateElementOption(CARD_KIND_FOOT, "靴カード", objSelect);
	HtmlCreateElementOption(CARD_KIND_ACCESSARY, "アクセサリカード", objSelect);
	HtmlCreateElementOption(CARD_KIND_ANY, "全部位カード", objSelect);
	HtmlCreateElementOption(CARD_KIND_ENCHANT, "エンチャント効果", objSelect);
	objSelect.value = CARD_KIND_ARMS;
}

/**
 * カード一覧テーブルを更新する.
 */
function RefreshCardListTable(){
	var objSelect = null;
	var selectedCardKind = 0;
	var cardDataArray = null;
	// 選択された抽出条件を取得
	objSelect = document.getElementById("OBJID_SELECT_CARD_KIND");
	selectedCardKind = Number(objSelect.value);
	// データを抽出する
	cardDataArray = PivotData(selectedCardKind);
	// データをソート
	cardDataArray.sort(
		function (a, b) {
			if (a[CARD_DATA_INDEX_NAME] < b[CARD_DATA_INDEX_NAME]) {
				return -1;
			}
			else if (a[CARD_DATA_INDEX_NAME] > b[CARD_DATA_INDEX_NAME]) {
				return 1;
			}
			return 0;
		}
	);
	// データを表示する
	DispData(selectedCardKind, cardDataArray);
}

/**
 * データを抽出する.
 * @param selectedCardKind 抽出条件（選択されたカード種別）
 * @return 抽出された CardData の配列
 */
function PivotData(selectedCardKind) {
	var idx = 0;
	var cardDataArray = null;
	let CARD_KIND = 0;
	cardDataArray = new Array();

	//--------------------------------
	// 抽出条件判定とデータ抽出
	//--------------------------------
	for (idx = 0; idx < CardObjNew.length; idx++) {
		CARD_KIND = CardObjNew[idx][CARD_DATA_INDEX_KIND];
		// 全てのカードの場合
		if (selectedCardKind == CARD_KIND_DMY_FOR_ALL) {
			// 下記の種別に該当する場合のみ表示する
			switch (CARD_KIND) {
				case CARD_KIND_ARMS:
				case CARD_KIND_HEAD:
				case CARD_KIND_TOP:
				case CARD_KIND_MID:
				case CARD_KIND_UNDER:
				case CARD_KIND_SHIELD:
				case CARD_KIND_BODY:
				case CARD_KIND_SHOULDER:
				case CARD_KIND_FOOT:
				case CARD_KIND_ACCESSARY:
				case CARD_KIND_ACCESSARY_ON1:
				case CARD_KIND_ACCESSARY_ON2:
				case CARD_KIND_ENCHANT:
				case CARD_KIND_ANY:
					break;
				default:
					// 条件に合致しない場合は次へ
					continue;
			}
		}
		// 特定の種別の場合は一致するカードのみ選択する
		else {
			if ([CARD_KIND_HEAD, CARD_KIND_TOP, CARD_KIND_MID].includes(CARD_KIND)) {
			// 兜の場合
				if (CardObjNew[idx][CARD_DATA_INDEX_NAME] === "憤怒のアークビショップマーガレッタ") {
					console.log(".")
				}
				if (selectedCardKind !== CARD_KIND_HEAD) {
					continue;
				}
			} else if ([CARD_KIND_ACCESSARY, CARD_KIND_ACCESSARY_ON1, CARD_KIND_ACCESSARY_ON2].includes(CARD_KIND)) {
			// アクセサリーの場合
				if (selectedCardKind !== CARD_KIND_ACCESSARY) {
					continue;
				}
			} else if (CARD_KIND != selectedCardKind) {
			// その他
				continue;
			}
		}
		// 特定のカードをスキップする
		switch (CardObjNew[idx][CARD_DATA_INDEX_ID]) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 106:
			case 154:
			case 156:
			case 108:
				continue;
		}
		// ここに来るならば条件を満たす
		cardDataArray[cardDataArray.length] = CardObjNew[idx];
	}
	return cardDataArray;
}

function GetItemToEnchInfoMapAllEnchList() {
	var idxItem = 0;
	var idxEnchList = 0;
	var idxSlot = 0;
	var enchListIdArray = null;
	var enchInfoArrayAllSlots = null;
	var dataMap = null;
	var itemToSlotInfoMap = null;
	// 結果用配列を用意
	dataMap = [];
	// ループ回数を考慮し、アイテムID基準でループする
	for (idxItem = 0; idxItem < g_constDataManager.enchListDataManager.reverseResolveArrayItemId.length; idxItem++) {
		// 該当アイテムのエンチャントリストID配列を取得
		enchListIdArray = g_constDataManager.enchListDataManager.reverseResolveArrayItemId[idxItem];
		if (!Array.isArray(enchListIdArray)) {
			continue;
		}
		for (idxEnchList = 0; idxEnchList < enchListIdArray.length; idxEnchList++) {
			// データ収集用配列用意
			enchInfoArrayAllSlots = [];
			for (idxSlot = 0; idxSlot < 4; idxSlot++) {
				enchInfoArrayAllSlots[idxSlot] = [];
			}
			// サブ関数を呼び出してデータ取得
			enchInfoArrayAllSlots = RebuildCardSelectSubCollectEnchListData(enchListIdArray[idxEnchList], enchInfoArrayAllSlots);
			// 結果チェック
			for (idxSlot = 0; idxSlot < enchInfoArrayAllSlots.length; idxSlot++) {
				if (enchInfoArrayAllSlots[idxSlot].length > 0) {
					break;
				}
			}
			if (idxSlot >= enchInfoArrayAllSlots.length) {
				continue;
			}
			// 結果配列のエンチャントリストIDにある、アイテムID -> スロット情報マップを用意
			if (!dataMap[enchListIdArray[idxEnchList]]) {
				dataMap[enchListIdArray[idxEnchList]] = new Map();
			}
			// 取得したデータを追加
			dataMap[enchListIdArray[idxEnchList]].set(idxItem, enchInfoArrayAllSlots);
		}
	}
	return dataMap;
}

/**
 * 抽出されたデータを表示する（リストテーブル生成）
 * @param selectedCardKind 抽出条件（選択されたカード種別）
 * @param cardDataArray 抽出された CardData の配列
 */
function DispData(selectedCardKind, cardDataArray) {
	let idx = 0;
	let idxKind = 0;
	let idxEnchList = 0;
	let partName = "";
	let objRoot = null;
	let objTable = null;
	let objTbody = null;
	let objTr = null;
	let objTd = null;
	let objText = null;
	let objInput = null;
	let showEnchant = false;
	let rowCountEnchant = 0;
	let colspanEffect = 1;
	let itemIdArrayByItemKind = null;
	let cardId = 0;
	let cardData = null;
	let enchListIdArray = null;
	let enchListId = null;
	let enchListArrayTo_ItemToEnchInfoMap = null;
	let itemToEnchInfoMap = null;
	// ルートオブジェクト取得
	objRoot = document.getElementById("OBJID_SPAN_ROOT_OF_CARD_LIST");
	// テーブル生成
	HtmlRemoveAllChild(objRoot);
	objTable = document.createElement("table");
	objTable.setAttribute("border", 1);
	objRoot.appendChild(objTable);
	objTbody = document.createElement("tbody");
	objTable.appendChild(objTbody);
	// エンチャント情報表示フラグの取得
	objInput = document.getElementById("OBJID_INPUT_SHOW_ENCHANT_INFO");
	showEnchant = objInput.checked ? true : false;
	// エンチャントID（カードID）から、アイテムIDを逆引きするマップを用意する
	if (selectedCardKind == CARD_KIND_ENCHANT) {
		if (showEnchant) {
			// エンチャントリストからアイテムIDへのマップを取得する
			enchListArrayTo_ItemToEnchInfoMap = GetItemToEnchInfoMapAllEnchList();
			// colspan は、逆引き結果によらず 2 固定
			colspanEffect = 2;
			// データ収集用
			enchIdToItemIdMapByItemKind = [];
			// 抽出されたカードデータ配列を全走査
			for (idx = 0; idx < cardDataArray.length; idx++) {
				// エンチャントリストIDの配列を取得
				cardId = cardDataArray[idx][CARD_DATA_INDEX_ID];
				enchListIdArray = g_constDataManager.enchListDataManager.reverseResolveArrayCardId[cardId];
				if (!Array.isArray(enchListIdArray)) {
					continue;
				}
				// 対象の全エンチャントリストをループして、対象のアイテムIDを収集する
				enchIdToItemIdMapByItemKind[cardId] = [];
				for (idxEnchList = 0; idxEnchList < enchListIdArray.length; idxEnchList++) {
					// エンチャントリストIDを取得
					enchListId = enchListIdArray[idxEnchList];
					// 当該エンチャントリストIDに対応する、アイテムID -> スロット情報マップを取得
					itemToEnchInfoMap = enchListArrayTo_ItemToEnchInfoMap[enchListId];
					// アップグレード定義などの場合に、存在しないケースは起こる
					if (!itemToEnchInfoMap) {
						continue;
					}
					// 装備箇所ごとのデータに振り分ける
					itemToEnchInfoMap.forEach(
						function (valueF, keyF, mapF) {
							var itemKindF = ItemObjNew[keyF][ITEM_DATA_INDEX_KIND];
							if (!enchIdToItemIdMapByItemKind[cardId][itemKindF]) {
								enchIdToItemIdMapByItemKind[cardId][itemKindF] = new Map();
							}
							enchIdToItemIdMapByItemKind[cardId][itemKindF].set(keyF, valueF);
						}
					);
				}
			}
		}
	}
	card_prefix = new CardPrefix();
	const condition = document.getElementById("F_CONDITION").value;
	let rownum = 0;
	// 表示欄生成
	for (idx = 0; idx < cardDataArray.length; idx++) {
		cardData = cardDataArray[idx];
		cardId = cardData[CARD_DATA_INDEX_ID];
		prefix_index = card_prefix.get_index_by_name(cardDataArray[idx][CARD_DATA_INDEX_NAME]);
		prefix = "";
		suffix = "";
		if (prefix_index >= 0) {
			prefix = card_prefix.get_prefix(prefix_index);
			suffix = card_prefix.get_suffix(prefix_index);
		}
		if (condition) {
			hit = cardDataArray[idx][CARD_DATA_INDEX_NAME].includes(condition);
			hit = hit || prefix.includes(condition) || suffix.includes(condition);
			tmp = document.createElement("span");
			CItemInfoManager.RebuildInfoTableSubCardDetail(tmp, cardId, false);
			hit = hit || tmp.textContent.includes(condition);
			if(!hit) continue;
		}
		// 30行ごとにヘッダを追加
		if (rownum++ % 30 == 0) {
			objTr = document.createElement("tr");
			objTr.setAttribute("bgcolor", "#aaaaff");
			objTbody.appendChild(objTr);
			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("名前");
			objTd.appendChild(objText);
			if (selectedCardKind == CARD_KIND_DMY_FOR_ALL) {
				objTd = document.createElement("td");
				objTr.appendChild(objTd);
				objText = document.createTextNode("部位");
				objTd.appendChild(objText);
			}
			objTd = document.createElement("td");
			objTd.setAttribute("colspan", colspanEffect);
			objTr.appendChild(objTd);
			objText = document.createTextNode("効果");
			objTd.appendChild(objText);
		}
		// エンチャント情報行数を定義
		rowCountEnchant = 0;
		if (selectedCardKind == CARD_KIND_ENCHANT) {
			if (showEnchant) {
				if (enchIdToItemIdMapByItemKind[cardId]) {
					for (idxKind = 0; idxKind < enchIdToItemIdMapByItemKind[cardId].length; idxKind++) {
						if (enchIdToItemIdMapByItemKind[cardId][idxKind]) {
							rowCountEnchant = Math.max(1, rowCountEnchant) + 1;
						}
					}
				}
			}
		}
		// データ表示部を追加
		objTr = document.createElement("tr");
		objTbody.appendChild(objTr);
		objTd = document.createElement("td");
		objTd.setAttribute("rowspan", 1 + rowCountEnchant);
		objTr.appendChild(objTd);
		objText = document.createTextNode(cardDataArray[idx][CARD_DATA_INDEX_NAME]);
		objTd.appendChild(objText);
		if (prefix||suffix) {
			objTd.appendChild(document.createElement("br"));
			objText = document.createTextNode(`(${prefix||suffix})`)
			objTd.appendChild(objText);
		}
		if (selectedCardKind == CARD_KIND_DMY_FOR_ALL) {
			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			switch (cardDataArray[idx][CARD_DATA_INDEX_KIND]) {
				case CARD_KIND_ARMS:
					partName = "武器";
					break;
				case CARD_KIND_HEAD:
					partName = "兜";
					break;
				case CARD_KIND_TOP:
					partName = "兜(上段)";
					break;
				case CARD_KIND_MID:
					partName = "兜(中段)";
					break;
				case CARD_KIND_SHIELD:
					partName = "盾";
					break;
				case CARD_KIND_BODY:
					partName = "鎧";
					break;
				case CARD_KIND_SHOULDER:
					partName = "肩にかける物";
					break;
				case CARD_KIND_FOOT:
					partName = "靴";
					break;
				case CARD_KIND_ACCESSARY:
					partName = "アクセサリー";
					break;
				case CARD_KIND_ACCESSARY_ON1:
					partName = "アクセサリー(1)";
					break;
				case CARD_KIND_ACCESSARY_ON2:
					partName = "アクセサリー(2)";
					break;
				case CARD_KIND_ENCHANT:
					partName = "エンチャント";
					break;
				case CARD_KIND_ANY:
					partName = "全部位";
					break;
				default:
					partName = "不明";
					break;
			}
			objText = document.createTextNode(partName);
			objTd.appendChild(objText);
		}
		// 効果
		objTd = document.createElement("td");
		objTd.setAttribute("colspan", colspanEffect);
		objTr.appendChild(objTd);
		CItemInfoManager.RebuildInfoTableSubCardDetail(objTd, cardId, false);
		// エンチャント情報
		if (selectedCardKind == CARD_KIND_ENCHANT) {
			if (showEnchant) {
				// 指定のエンチャントID（カードID）に対応する、アイテムIDの配列を取得
				itemIdArrayByItemKind = enchIdToItemIdMapByItemKind[cardId];
				// 未定義の場合は処理しない
				if (!itemIdArrayByItemKind) {
					continue;
				}
				objTr = document.createElement("tr");
				objTbody.appendChild(objTr);
				objTd = document.createElement("td");
				objTd.setAttribute("colspan", colspanEffect);
				objTr.appendChild(objTd);
				objText = document.createTextNode("エンチャント対象");
				objTd.appendChild(objText);
				itemIdArrayByItemKind.forEach(
					function (itemToSlotInfoMapF, indexF, arrayF) {
						var idxItemF = 0;
						var enchInfoTextArrayF = [];
						// 表示欄生成
						objTr = document.createElement("tr");
						objTbody.appendChild(objTr);
						objTd = document.createElement("td");
						objTr.appendChild(objTd);
						objText = document.createTextNode(GetItemKindNameText(indexF));
						objTd.appendChild(objText);
						// 一覧
						objTd = document.createElement("td");
						objTr.appendChild(objTd);
						// 取得したアイテムID->スロット情報のマップをループし、エンチャント情報テキストを生成
						idxItem = 0;
						itemToSlotInfoMapF.forEach(
							function (valueFF, keyFF, mapFF) {
								var itemDataFF = ItemObjNew[keyFF];
								var slotInfoArrayFF = valueFF;
								enchInfoTextArrayF.push(itemDataFF[ITEM_DATA_INDEX_NAME]);
							}
						);
						for (idxItemF = 0; idxItemF < enchInfoTextArrayF.length; idxItemF++) {
							if ((idxItemF + 1) % 5 == 0) {
								objTd.appendChild(document.createElement("br"));
							}
							objTd.appendChild(document.createTextNode(enchInfoTextArrayF[idxItemF]));
							if ((idxItemF + 1) != enchInfoTextArrayF.length) {
								objTd.appendChild(document.createTextNode("、"));
							}
						}
					}
				);
			}
		}
	}
}

function OnChangeKindRestrict() {
	// 一覧テーブルを再構築
	RefreshCardListTable();
}

function OnChangeShowEnchantInfo() {
	// 一覧テーブルを再構築
	RefreshCardListTable();
}

























/*
	以下、slotpager.js からコピペ。
*/

SLOTPAGER_MODE_CARD = 0;
SLOTPAGER_MODE_RNDENCH = 1;
SLOTPAGER_MODE_RNDOPT = 1;		// 1 のエイリアス

SLOT_INDEX_CARD_MIN = 1;
SLOT_INDEX_CARD_MAX = 4;

SLOT_INDEX_COSTUME_MIN = 1;
SLOT_INDEX_COSTUME_MAX = 1;

SLOT_INDEX_RNDENCH_MIN = 1;
SLOT_INDEX_RNDENCH_MAX = 5;


/*
	以下、hmcard.js からコピペ。
*/



/*
 * エンチャントリストデータを収集する.
 * @param enchListId 収集対象のエンチャントリストID
 * @param enchInfoArrayBefore これまでに、収集されたデータの配列（アップグレードの判定に使用）
 */
function RebuildCardSelectSubCollectEnchListData(enchListId, enchInfoArrayAllSlotsBefore) {

	var idx = 0;
	var idxSlot = 0;
	var idxEnchList = 0;

	var enchListData = null;
	var enchListDataManager = g_constDataManager.GetDataManger(CONST_DATA_KIND_ENCHANT_LIST);

	var enchInfoArray = null;
	var enchInfoArrayAllSlots = null;



	var funcTargetIdCollector = function (enchListIdF, slotF, spDataF, paramsF) {

		var idxF = 0;
		var slotArrayF = null;
		var childrenF = null;
		var cardIdArrayF = null;
		var resultF = null;


		resultF = [];


		switch (spDataF.GetSpId()) {
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_ENCHANT:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SELECT:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_STAGE:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_STAGE_V2:

			// 対象スロットの配列を取得
			slotArrayF = spDataF.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SLOT);

			if (!Array.isArray(slotArrayF)) {
				return resultF;
			}

			// 指定のスロットが含まれなければ、処理打ち切り
			if (slotArrayF.indexOf(5 - slotF) < 0) {
				return resultF;
			}

			break;

		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SLOT:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SLOT_V2:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SLOT_V3:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_POSITION_NTH_SLOT_V4:

			// 対象スロットの配列を取得
			slotArrayF = spDataF.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SLOT);

			if (!Array.isArray(slotArrayF)) {
				return resultF;
			}

			// 指定のスロットが含まれなければ、処理打ち切り
			if (slotArrayF.indexOf(slotF) < 0) {
				return resultF;
			}

			break;

		case MIG_EQUIPABLE_SP_LIST_DATA_ID_REFINE_CONDITION:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_REFINE_CONDITION_V2:
		case MIG_EQUIPABLE_SP_LIST_DATA_ID_REFINE_CONDITION_V3:
			paramsF = Object.assign({}, paramsF);
			paramsF.refinedBorderBase = spDataF.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
			paramsF.refinedBorderFlag = spDataF.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);
			break;

		case MIG_EQUIPABLE_SP_LIST_DATA_ID_ENCHANT_EFFECT_LIST:

			// 深淵の回廊アップグレード
			if (enchListIdF == MIG_ENCH_LIST_ID_SHINENNO_KAIRO_UPGRADE) {
				RebuildCardSelectSubCollectEnchListDataSubUpgradeShinennoKairo(enchInfoArrayAllSlotsBefore[slotF - 1], resultF, enchListIdF, paramsF);
			}

			// 思念体武器アップグレード
			else if (enchListIdF == MIG_ENCH_LIST_ID_SHINENTAIBUKI_UPGRADE) {
				RebuildCardSelectSubCollectEnchListDataSubUpgradeShinentaiBuki(enchInfoArrayAllSlotsBefore[slotF - 1], resultF, enchListIdF, paramsF);
			}

			// その他、一般エンチャントの場合
			else {

				// 対象エンチャントの配列を取得して、すべてを追加
				cardIdArrayF = spDataF.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_CARD);

				for (idxF = 0; idxF < cardIdArrayF.length; idxF++) {
					resultF.push([enchListIdF, cardIdArrayF[idxF], paramsF]);
				}
			}
			break;

		}


		// Collect child data
		childrenF = spDataF.GetChildren();

		if (childrenF) {
			for (idxF = 0; idxF < childrenF.length; idxF++) {
				resultF = resultF.concat(funcTargetIdCollector(enchListIdF, slotF, childrenF[idxF], paramsF));
			}
		}


		return resultF;
	};




	// データ収集用配列用意
	enchInfoArrayAllSlots = [];
	for (idxSlot = 0; idxSlot < (SLOT_INDEX_CARD_MAX - SLOT_INDEX_CARD_MIN + 1); idxSlot++) {
		enchInfoArrayAllSlots[idxSlot] = [];
	}

	// エンチャントリストデータ取得
	enchListData = enchListDataManager.GetDataObject(enchListId);

	// 全SPデータをループ処理
	enchListData.ForEachSpData(
		function (valueF, indexF, arrayF) {

			var idxSlotF = 0;

			// 全スロットをループ処理
			for (idxSlotF = 0; idxSlotF < enchInfoArrayAllSlots.length; idxSlotF++) {
				enchInfoArrayAllSlots[idxSlotF] = enchInfoArrayAllSlots[idxSlotF].concat(funcTargetIdCollector(enchListId, 1 + idxSlotF, valueF, {}));
			}
		}
	);

	// この時点で、当該エンチャントリストのデータは収集が完了している
	// エンチャントの並び順定義に従って、エンチャント効果の順番をソートする
	RebuildCardSelectSubSortCollectedEnchListData(enchInfoArrayAllSlots);



	// 収集したデータを返す
	return enchInfoArrayAllSlots;
}

function RebuildCardSelectSubCollectEnchListDataSubUpgradeShinennoKairo(enchInfoArrayBefore, resultArray, enchListId, paramsObject) {

	var idx = 0;

	var funcPushNotExist = function (cardIdF) {

		for (idxF = 0; idxF < resultArray.length; idxF++) {
			if (resultArray[idxF][1] == cardIdF) {
				return;
			}
		}

		resultArray.push([enchListId, cardIdF, paramsObject]);
	}

	// 処理開始前時点でのエンチャントデータを元に、アップグレード可能なものを特定して追加する
	for (idx = 0; idx < enchInfoArrayBefore.length; idx++) {

		switch (enchInfoArrayBefore[idx][1]) {

		case CARD_ID_ENCHANT_KYOGEKI_4:
			funcPushNotExist(CARD_ID_ENCHANT_KYOGEKI_5);
			break;

		case CARD_ID_ENCHANT_ZOFUKU_4:
			funcPushNotExist(CARD_ID_ENCHANT_ZOFUKU_5);
			break;

		case CARD_ID_ENCHANT_SPECIAL_STR:
			funcPushNotExist(CARD_ID_ENCHANT_TOSHI_10);
			break;

		case CARD_ID_ENCHANT_SPECIAL_AGI:
			funcPushNotExist(CARD_ID_ENCHANT_KOGEKISOKUDO_4);
			break;

		case CARD_ID_ENCHANT_SPECIAL_VIT:
			funcPushNotExist(CARD_ID_ENCHANT_MDEF_10);
			break;

		case CARD_ID_ENCHANT_SPECIAL_INT:
			funcPushNotExist(CARD_ID_ENCHANT_MARYOKU_4);
			break;

		case CARD_ID_ENCHANT_SPECIAL_DEX:
			funcPushNotExist(CARD_ID_ENCHANT_MEIKYU_4);
			break;

		case CARD_ID_ENCHANT_SPECIAL_LUK:
			funcPushNotExist(CARD_ID_ENCHANT_DELAY_DOWN_15);
			break;

		case CARD_ID_ENCHANT_KUMANO_CHIKARA:
			funcPushNotExist(CARD_ID_ENCHANT_HAO);
			break;

		case CARD_ID_ENCHANT_BOSOSHITA_MARYOKU:
			funcPushNotExist(CARD_ID_ENCHANT_SHINRINO_KAIHO);
			break;

		case CARD_ID_ENCHANT_KOSOKU:
			funcPushNotExist(CARD_ID_ENCHANT_SHINO_YOKUDO);
			break;

		case CARD_ID_ENCHANT_OWASHINO_GANKO:
			funcPushNotExist(CARD_ID_ENCHANT_GOKETSU);
			break;

		}
	}
}

function RebuildCardSelectSubCollectEnchListDataSubUpgradeShinentaiBuki(enchInfoArrayBefore, resultArray, enchListId, paramsObject) {

	var idx = 0;

	var funcPushNotExist = function (cardIdF) {

		for (idxF = 0; idxF < resultArray.length; idxF++) {
			if (resultArray[idxF][1] == cardIdF) {
				return;
			}
		}

		resultArray.push([enchListId, cardIdF, paramsObject]);
	}

	// 処理開始前時点でのエンチャントデータを元に、アップグレード可能なものを特定して追加する
	for (idx = 0; idx < enchInfoArrayBefore.length; idx++) {

		switch (enchInfoArrayBefore[idx][1]) {

		case CARD_ID_ENCHANT_ARMS_ELEMENT_FIRE:
		case CARD_ID_ENCHANT_ARMS_ELEMENT_WATER:
		case CARD_ID_ENCHANT_ARMS_ELEMENT_WIND:
		case CARD_ID_ENCHANT_ARMS_ELEMENT_EARTH:
		case CARD_ID_ENCHANT_ARMS_ELEMENT_HOLY:
		case CARD_ID_ENCHANT_ARMS_ELEMENT_DARK:
		case CARD_ID_ENCHANT_ARMS_ELEMENT_PSYCO:
		case CARD_ID_ENCHANT_ARMS_ELEMENT_POISON:
			funcPushNotExist(CARD_ID_ENCHANT_SATSUINO_ONNEN);
			break;

		case CARD_ID_ENCHANT_OWASHINO_GANKO:
			funcPushNotExist(CARD_ID_ENCHANT_GOKETSU);
			break;

		case CARD_ID_ENCHANT_KUMANO_CHIKARA:
			funcPushNotExist(CARD_ID_ENCHANT_HAO);
			break;

		case CARD_ID_ENCHANT_BOSOSHITA_MARYOKU:
			funcPushNotExist(CARD_ID_ENCHANT_SHINRINO_KAIHO);
			break;

		}
	}
}


function RebuildCardSelectSubSortCollectedEnchListData(enchInfoArrayAllSlots) {

	var idx = 0;
	var idxSlot = 0;

	var enchInfoArray = null;


	// 全スロットをループ処理
	for (idxSlot = 0; idxSlot < enchInfoArrayAllSlots.length; idxSlot++) {

		// 当該スロットのエンチャント情報配列を取得
		enchInfoArray = enchInfoArrayAllSlots[idxSlot];

		// エンチャント情報配列を全処理
		for (idx = 0; idx < enchInfoArray.length; idx++) {

			// カードIDを元に、順序を特定
			enchInfoArray[idx][3] = g_constDataManager.enchListDataManager.sortedEnchantCardIdArray.indexOf(enchInfoArray[idx][1]);

			// 該当がない場合は、後ろに設定する
			if (enchInfoArray[idx][3] < 0) {

				// デバッグ時はログ出力
				if (_DEBUG) {
					WriteConsoleLog("エンチャント並び順未定義" + " : " + "cardId == " + EnumCardId.GetDefinedName(enchInfoArray[idx][1]));
				}

				enchInfoArray[idx][3] = g_constDataManager.enchListDataManager.sortedEnchantCardIdArray.length + idx;
			}
		}

		// 特定した並び順でソート
		enchInfoArray.sort(
			function(a, b) {
				if (a[3] < b[3]) return -1;
				if (a[3] > b[3]) return 1;
				return 0;
			}
		);
	}
}
