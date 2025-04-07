function OnLoadItemList() {
	SetUpSelects();
	BuildUpItemList();
}

function SetUpSelects() {
	var kind = 0;
	var objSelect = null;
	//----------------------------------------------------------------
	// 装備種別選択セレクトボックスの初期化
	//----------------------------------------------------------------
	// 一度、全選択肢を削除
	objSelect = document.getElementById("OBJID_SELECT_ITEM_KIND");
	HtmlRemoveOptionAll(objSelect);
	// 武器項目の追加
	for (kind = ITEM_KIND_KNIFE; kind <= ITEM_KIND_GRENADEGUN; kind++) {
		HtmlCreateElementOption(kind, GetItemKindNameText(kind), objSelect);
	}
	// 頭防具項目の追加
	for (kind = ITEM_KIND_HEAD_TOP; kind <= ITEM_KIND_HEAD_UNDER; kind++) {
		HtmlCreateElementOption(kind, GetItemKindNameText(kind), objSelect);
	}
	// その他防具項目の追加
	for (kind = ITEM_KIND_BODY; kind <= ITEM_KIND_ACCESSARY_ON2; kind++) {
		HtmlCreateElementOption(kind, GetItemKindNameText(kind), objSelect);
	}
	// 武器すべて、防具すべての追加
	HtmlCreateElementOption(-999, "すべての武器", objSelect);
	HtmlCreateElementOption(-9999, "すべての防具", objSelect);
	// シャドウの追加
	const kind_list = [
		ITEM_KIND_SHADOW_ARMS_RIGHT,
		ITEM_KIND_SHADOW_ARMS_LEFT,
		ITEM_KIND_SHADOW_BODY,
		ITEM_KIND_SHADOW_FOOT,
		ITEM_KIND_SHADOW_ACCESSARY_ON1,
		ITEM_KIND_SHADOW_ACCESSARY_ON2,
		];
	for (const kind of kind_list) {
		HtmlCreateElementOption(kind, GetItemKindNameText(kind), objSelect);
	}
	//----------------------------------------------------------------
	// 職業選択セレクトボックスの初期化
	//----------------------------------------------------------------
	// 一度、全選択肢を削除
	objSelect = document.getElementById("OBJID_SELECT_JOB_RESTRICT");
	HtmlRemoveOptionAll(objSelect);
	// 「全て表示」の追加
	HtmlCreateElementOption(-1, "全て表示", objSelect);
	// 職業の追加
	for (kind = JOB_ID_NOVICE; kind < EnumJobId.Count; kind++) {
		HtmlCreateElementOption(kind, GetJobName(kind), objSelect);
	}
}

function BuildUpItemList() {

	var idx = 0;
	var idxList = 0;
	var idxSlot = 0;
	var idxEnchList = 0;
	var idxInfo = 0;

	var objRoot = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objText = null;
	var objSelect = null;
	var objInput = null;
	var objSpan = null;

	var condKind = 0;
	var condJob = 0;
	var condSlot = 0;
	var condSort = 0;
	var condDesc = 0;

	var showKind = false;
	var showSP = false;
	var showEnchant = false;

	var itemId = 0;
	var itemData = null;
	var itemObjLoc = null;

	var enchListId = 0;
	var enchListDataManager = g_constDataManager.GetDataManger(CONST_DATA_KIND_ENCHANT_LIST);
	var enchListIdArray = null;

	var enchInfoArray = null;
	var enchInfoArrayAllSlots = null;
	var enchInfoArrayAllSlotsResult = null;
	var enchInfoText = "";
	var enchInfo = null;
	var enchListIdLast = 0;

	var colspanSP = 0;
	var rowspanName = 0;
	var rowCountEnchInfo = 0;



	//----------------------------------------------------------------
	// 抽出条件の取得
	//----------------------------------------------------------------
	objSelect = document.getElementById("OBJID_SELECT_ITEM_KIND");
	condKind = parseInt(objSelect.value);

	showKind = ((condKind == -999) || (condKind == -9999));

	objSelect = document.getElementById("OBJID_SELECT_JOB_RESTRICT");
	condJob = parseInt(objSelect.value);

	objInput = document.getElementById("OBJID_INPUT_SLOT_RESTRICT");
	condSlot = objInput.checked ? true : false;



	//----------------------------------------------------------------
	// 対象となるアイテムの抽出
	//----------------------------------------------------------------
	itemObjLoc = new Array();

	for (itemId = 0; itemId < ItemObjNew.length; itemId++) {

		itemData = ItemObjNew[itemId];

		// アイテム種別を検査
		// すべての武器
		if (condKind == -999) {
			if (itemData[ITEM_DATA_INDEX_KIND] < ITEM_KIND_KNIFE) {
				continue;
			}
			if (itemData[ITEM_DATA_INDEX_KIND] > ITEM_KIND_GRENADEGUN) {
				continue;
			}
		}

		// すべての防具
		else if (condKind == -9999) {
			if (itemData[ITEM_DATA_INDEX_KIND] < ITEM_KIND_HEAD_TOP) {
				continue;
			}
			if (itemData[ITEM_DATA_INDEX_KIND] > ITEM_KIND_ACCESSARY_ON2) {
				continue;
			}
		}

		// 特定の種類
		else {
			if (itemData[ITEM_DATA_INDEX_KIND] != condKind) {
				continue;
			}
		}

		// 職業制限を検査
		if (condJob != -1) {
			if (!IsMatchJobRestrict(itemId, condJob)) {
				continue;
			}
		}

		// スロット条件を検査
		if (condSlot) {
			if (itemData[ITEM_DATA_INDEX_SLOT] == 0) {
				continue;
			}
		}


		// ここまでくれば表示対象
		itemObjLoc.push(itemData);
	}



	//----------------------------------------------------------------
	// 対象アイテムリストのソート
	//----------------------------------------------------------------

	// ソート条件の取得
	objSelect = document.getElementById("OBJID_SELECT_SORT_ATTR");
	condSort = parseInt(objSelect.value);

	// 降順表示フラグの取得
	objInput = document.getElementById("OBJID_INPUT_SORT_DESC");
	condDesc = objInput.checked ? -1 : 1;

	// 武器レベルの場合
	if (condSort == ITEM_DATA_INDEX_WPNLV) {
		itemObjLoc.sort(
			function(a, b) {
				if (Math.floor(a[condSort]) % 10 < Math.floor(b[condSort]) % 10) return -1 * condDesc;
				if (Math.floor(a[condSort]) % 10 > Math.floor(b[condSort]) % 10) return 1 * condDesc;
				return 0;
			}
		);
	}

	// その他の一般項目の場合
	else {
		itemObjLoc.sort(
			function(a, b) {
				if (a[condSort] < b[condSort]) return -1 * condDesc;
				if (a[condSort] > b[condSort]) return 1 * condDesc;
				return 0;
			}
		);
	}


	//----------------------------------------------------------------
	// アイテム一覧テーブルの再構築
	//----------------------------------------------------------------

	objRoot = document.getElementById("OBJID_DIV_ITEM_LIST");

	// 一度、テーブルを削除
	HtmlRemoveAllChild(objRoot);

	// テーブル再構築
	objTable = document.createElement("table");
	objTable.setAttribute("border", "1");
	objTable.setAttribute("style", "font-size : small");
	objRoot.appendChild(objTable);

	objTbody = document.createElement("tbody");
	objTable.appendChild(objTbody);

	// 特殊効果表示フラグの取得
	objInput = document.getElementById("OBJID_INPUT_SHOW_SP");
	showSP = objInput.checked ? true : false;

	// エンチャント情報表示フラグの取得
	objInput = document.getElementById("OBJID_INPUT_SHOW_ENCHANT_INFO");
	showEnchant = objInput.checked ? true : false;

	// 連結行、列数計算
	rowspanName = 1;

	// 特殊効果カラム数計算
	if (showSP) {

		rowspanName++;

		if (condKind <= ITEM_KIND_GRENADEGUN) {
			colspanSP = 8;
		}
		else {
			colspanSP = 5;
		}
	}

	for (itemId = 0; itemId < itemObjLoc.length; itemId++) {

		// 30 行ごとにヘッダを入れる
		if ((itemId % 30) == 0) {

			objTr = document.createElement("tr");
			objTr.setAttribute("style", "background-color : #aaaaff");
			objTbody.appendChild(objTr);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("名称");
			objTd.appendChild(objText);

			if (showKind) {
				objTd = document.createElement("td");
				objTr.appendChild(objTd);
				objText = document.createTextNode("種類");
				objTd.appendChild(objText);
			}

			// 武器の場合の表示項目
			if (condKind <= ITEM_KIND_GRENADEGUN) {

				objTd = document.createElement("td");
				objTr.appendChild(objTd);
				objText = document.createTextNode("属性");
				objTd.appendChild(objText);

				objTd = document.createElement("td");
				objTr.appendChild(objTd);
				objText = document.createTextNode("武器Lv");
				objTd.appendChild(objText);

				objTd = document.createElement("td");
				objTr.appendChild(objTd);
				objText = document.createTextNode("ATK");
				objTd.appendChild(objText);

				objTd = document.createElement("td");
				objTr.appendChild(objTd);
				switch (condKind) {
					case ITEM_KIND_BOW:
					case ITEM_KIND_MUSICAL:
					case ITEM_KIND_WHIP:
					case ITEM_KIND_HANDGUN:
					case ITEM_KIND_RIFLE:
					case ITEM_KIND_SHOTGUN:
					case ITEM_KIND_GATLINGGUN:
					case ITEM_KIND_GRENADEGUN:
						objText = document.createTextNode("ペナ解消DEX");
						break;
					default:
						objText = document.createTextNode("ペナ解消STR");
						break;
				}
				objTd.appendChild(objText);

			}

			// 防具の場合の表示項目
			else {

				objTd = document.createElement("td");
				objTr.appendChild(objTd);
				objText = document.createTextNode("DEF");
				objTd.appendChild(objText);

			}

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("スロット");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("重量");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("装備Lv");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("装備可能職業");
			objTd.appendChild(objText);
		}


		// アイテムデータ取得
		itemData = itemObjLoc[itemId];

		// エンチャント情報行数計算
		rowCountEnchInfo = 0;
		if (showEnchant) {

			enchListIdArray = enchListDataManager.GetEnchListIdArrayByItemId(itemData[ITEM_DATA_INDEX_ID]);

			// エンチャント情報の収集
			enchInfoArrayAllSlotsResult = [];
			for (idxSlot = 0; idxSlot < 4; idxSlot++) {
				enchInfoArrayAllSlotsResult[idxSlot] = [];
			}

			// 対象の全エンチャントリストをループ処理
			for (idxEnchList = 0; idxEnchList < enchListIdArray.length; idxEnchList++) {

				// エンチャントリストIDを取得
				enchListId = enchListIdArray[idxEnchList];

				// サブ関数をコールしてデータ配列を収集
				enchInfoArrayAllSlots = RebuildCardSelectSubCollectEnchListData(enchListId, enchInfoArrayAllSlotsResult);

				// 最終結果に追記
				for (idxSlot = 0; idxSlot < enchInfoArrayAllSlots.length; idxSlot++) {
					enchInfoArrayAllSlotsResult[idxSlot] = enchInfoArrayAllSlotsResult[idxSlot].concat(enchInfoArrayAllSlots[idxSlot]);
				}
			}


			// 必要行数をカウント
			for (idxSlot = 0; idxSlot < enchInfoArrayAllSlotsResult.length; idxSlot++) {

				// エンチャント無しは行自体なし
				if (enchInfoArrayAllSlotsResult[idxSlot].length == 0) {
					continue;
				}

				rowCountEnchInfo++;
			}
		}

		// テーブル構築
		objTr = document.createElement("tr");
		if ((itemId % 2) == 0) {
			objTr.setAttribute("style", "background-color : #ddddff");
		}
		objTbody.appendChild(objTr);

		// 名称
		objTd = document.createElement("td");
		objTd.setAttribute("rowspan", rowspanName + rowCountEnchInfo);
		objTr.appendChild(objTd);
		objText = document.createTextNode(itemData[ITEM_DATA_INDEX_NAME]);
		objTd.appendChild(objText);

		// 種類
		if (showKind) {
			objTd = document.createElement("td");
			objTd.setAttribute("rowspan", rowspanName + rowCountEnchInfo);
			objTr.appendChild(objTd);
			objText = document.createTextNode(GetItemKindNameText(itemData[ITEM_DATA_INDEX_KIND]));
			objTd.appendChild(objText);
		}

		// 武器の場合の表示項目
		if (condKind <= ITEM_KIND_GRENADEGUN) {
			// 属性
			objTd = document.createElement("td");
			objTd.setAttribute("style", "text-align : center");
			objTr.appendChild(objTd);
			objText = document.createTextNode(GetElmTextForItemList(itemData));
			objTd.appendChild(objText);

			// 武器Lv
			objTd = document.createElement("td");
			objTd.setAttribute("style", "text-align : right");
			objTr.appendChild(objTd);
			objText = document.createTextNode(Math.floor(itemData[ITEM_DATA_INDEX_WPNLV]) % 10);
			objTd.appendChild(objText);

			// ATK
			objTd = document.createElement("td");
			objTd.setAttribute("style", "text-align : right");
			objTr.appendChild(objTd);
			objText = document.createTextNode(itemData[ITEM_DATA_INDEX_POWER]);
			objTd.appendChild(objText);

			// ペナ解消STR
			objTd = document.createElement("td");
			objTd.setAttribute("style", "text-align : right");
			objTr.appendChild(objTd);
			objText = document.createTextNode(GetStrPenaltyAvoidStr(itemData[ITEM_DATA_INDEX_POWER], itemData[ITEM_DATA_INDEX_WPNLV]));
			objTd.appendChild(objText);
		}

		// 防具の場合の表示項目
		else {

			// DEF
			objTd = document.createElement("td");
			objTd.setAttribute("style", "text-align : right");
			objTr.appendChild(objTd);
			objText = document.createTextNode(itemData[ITEM_DATA_INDEX_POWER]);
			objTd.appendChild(objText);

		}

		// スロット
		objTd = document.createElement("td");
		objTd.setAttribute("style", "text-align : right");
		objTr.appendChild(objTd);
		objText = document.createTextNode(GetSlotText(itemData[ITEM_DATA_INDEX_SLOT]));
		objTd.appendChild(objText);

		// 重量
		objTd = document.createElement("td");
		objTd.setAttribute("style", "text-align : right");
		objTr.appendChild(objTd);
		objText = document.createTextNode(itemData[ITEM_DATA_INDEX_WEIGHT]);
		objTd.appendChild(objText);

		// 装備Lv
		objTd = document.createElement("td");
		objTd.setAttribute("style", "text-align : right");
		objTr.appendChild(objTd);
		objText = document.createTextNode(itemData[ITEM_DATA_INDEX_EQPLV]);
		objTd.appendChild(objText);

		// 装備可能職業
		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(GetJobRestrictText(itemData[ITEM_DATA_INDEX_EQPFLG]));
		objTd.appendChild(objText);

		// エンチャント情報
		if (showEnchant) {

			for (idxSlot = 0; idxSlot < enchInfoArrayAllSlotsResult.length; idxSlot++) {

				// エンチャント無しは行自体なし
				if (enchInfoArrayAllSlotsResult[idxSlot].length == 0) {
					continue;
				}

				objTr = document.createElement("tr");
				if ((itemId % 2) == 0) {
					objTr.setAttribute("style", "background-color : #ddddff");
				}
				objTbody.appendChild(objTr);

				objTd = document.createElement("td");
				objTd.setAttribute("colspan", "4");
				objTr.appendChild(objTd);

				objText = document.createTextNode("第" + (idxSlot + 1) + "エンチャント");
				objTd.appendChild(objText);

				objTd = document.createElement("td");
				objTd.setAttribute("colspan", Math.max(4, colspanSP - 4));
				objTr.appendChild(objTd);

				// エンチャント情報配列取得
				enchInfoArray = enchInfoArrayAllSlotsResult[idxSlot];

				// エンチャント情報配列を走査し、エンチャント情報文字列生成
				enchInfoText = "";
				enchListIdLast = -1;
				for (idxInfo = 0; idxInfo < enchInfoArray.length; idxInfo++) {

					// エンチャント情報を取得
					enchInfo = enchInfoArray[idxInfo];

					// エンチャントの種類が変わっている場合は、一度出力、その後、エンチャントリスト名を出力
					if (enchListIdLast != enchInfo[0]) {

						if (enchInfoText.length > 0) {
							objText = document.createTextNode(enchInfoText.substring(0, enchInfoText.length - 1));
							objTd.appendChild(objText);
							objTd.appendChild(document.createElement("br"));

							enchInfoText = "";
						}

						objText = document.createTextNode(enchListDataManager.GetName(enchInfo[0]));
						objSpan = document.createElement("span");
						objSpan.setAttribute("style", "font-weight: bolder;");
						objSpan.appendChild(objText);
						objTd.appendChild(objSpan);
						objTd.appendChild(document.createElement("br"));

						enchListIdLast = enchInfo[0];
					}

					// エンチャントID（カードID）を取得
					enchId = enchInfo[1];

					// エンチャントデータ取得
					enchData = CardObjNew[enchId];

					// テキスト追記
					enchInfoText += enchData[CARD_DATA_INDEX_NAME];

					// 精錬条件を追記
					if (enchInfo[2].refinedBorderBase) {
						if (enchInfo[2].refinedBorderFlag) {
							if (!((enchInfo[2].refinedBorderBase == 0) && (enchInfo[2].refinedBorderFlag == MIG_BORDER_FLAG_ID_OVER))) {
								enchInfoText += " (+" + enchInfo[2].refinedBorderBase + MigGetBorderFlagText(enchInfo[2].refinedBorderFlag, true) + ")";
							}
						}
					}

					enchInfoText += "、";
				}

				// エンチャント情報文字列を追記
				objText = document.createTextNode(enchInfoText.substring(0, enchInfoText.length - 1));
				objTd.appendChild(objText);
			}
		}

		// 特殊効果行
		if (showSP) {

			objTr = document.createElement("tr");
			if ((itemId % 2) == 0) {
				objTr.setAttribute("style", "background-color : #ddddff");
			}
			objTbody.appendChild(objTr);

			// 特殊効果
			objTd = document.createElement("td");
			objTd.setAttribute("colspan", colspanSP);
			objTr.appendChild(objTd);

			CItemInfoManager.RebuildInfoTableSubItemDetail(objTd, itemData[ITEM_DATA_INDEX_ID], false);
		}
	}

}



function GetElmTextForItemList(itemData) {

	var idx = 0;

	for (idx = 0; itemData[ITEM_DATA_INDEX_SPBEGIN + idx] != ITEM_SP_END; idx += 2) {
		if (itemData[ITEM_DATA_INDEX_SPBEGIN + idx] == ITEM_SP_ELEMENTAL) {
			return GetElementText(itemData[ITEM_DATA_INDEX_SPBEGIN + idx + 1]);
		}
	}

	return "";
}





function OnChangeKindRestrict() {
	// 一覧テーブルを再構築
	BuildUpItemList();
}

function OnChangeJobRestrict() {
	// 一覧テーブルを再構築
	BuildUpItemList();
}

function OnChnageShowSP() {
	// 一覧テーブルを再構築
	BuildUpItemList();
}

function OnChangeSortCondition() {
	// 一覧テーブルを再構築
	BuildUpItemList();
}

function OnChangeSlotRestrict() {
	// 一覧テーブルを再構築
	BuildUpItemList();
}

function OnChangeShowEnchantInfo() {
	// 一覧テーブルを再構築
	BuildUpItemList();
}
