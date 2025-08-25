
/**
 * アイテム情報マネージャクラス.
 */
function CItemInfoManager () {

}



/**
 * ダミーの選択項目ID（読み取り専用プロパティ）.
 */
Object.defineProperty(CItemInfoManager, "OptionIdDummy", { get : function () { return "dmy"; } });



/**
 * 展開表示されているかのフラグ.
 */
CItemInfoManager.Extracted = false;



/**
 * 最後に表示していた選択項目ID.
 */
CItemInfoManager.OptionIdLast = CItemInfoManager.OptionIdDummy;



/**
 * 最後に変更イベントハンドラが呼ばれた選択項目ID.
 */
CItemInfoManager.OptionIdLastHandling = CItemInfoManager.OptionIdDummy;



/**
 * ワールド選択項目ID.
 */
CItemInfoManager.tradeWorld = 13;



/**
 * 自動表示フラグ.
 */
CItemInfoManager.AutoFlag = false;



/**
 * 時限効果設定時画面フォーカスフラグ.
 */
CItemInfoManager.ApplyAutoFocusFlag = true;



/**
 * 選択項目IDを生成する.
 * @param kindId データ種別ID
 * @param dataId データID（アイテムIDやカードIDなど）
 * @return 選択項目ID
 */
CItemInfoManager.CreateOptionId = function (kindId, dataId) {
	return kindId + "_" + dataId;
};



/**
 * 選択項目IDを分割する.
 * @param optionId 選択項目ID
 * @return [データ種別ID, データID] という配列
 */
CItemInfoManager.SplitOptionId = function (optionId) {
	return optionId.split("_");
};



/**
 * 画面部品を再構築する.
 */
CItemInfoManager.RebuildControls = function () {

	var idx = 0;

	var colspan = 0;
	var switchChecked = false;

	var objSwitch = null;

	var objRoot = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objSpan = null;
	var objText = null;
	var objSelect = null;
	var objOption = null;
	var objInput = null;
	var objProgress = null;
	var objTextArea = null;
	var objFont = null;
	var objLabel = null;
	var objA = null;



	// 列数定義
	colspan = 3;



	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_ITEM_INFO_EXTRACT_CHECKBOX");
	if (objSwitch) {
		switchChecked = objSwitch.checked;
	}



	// 設定欄を初期化
	objRoot = document.getElementById("ID_ITEM_INFO");
	HtmlRemoveAllChild(objRoot);

	// 設定欄テーブルを再構築
	objTable = document.createElement("table");
	objTable.setAttribute("border", 1);
	objRoot.appendChild(objTable);

	objTbody = document.createElement("tbody");
	objTable.appendChild(objTbody);



	// ヘッダ部分を構築
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTd.setAttribute("id", "OBJID_ITEM_INFO_HEADER");
	objTd.setAttribute("class", "title");
	objTd.setAttribute("colspan", colspan);
	objTr.appendChild(objTd);

	// 設定欄展開用チェックボックス
	objInput = document.createElement("input");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_ITEM_INFO_EXTRACT_CHECKBOX");
	objInput.setAttribute("onclick", "CItemInfoManager.OnClickExtractSwitch()");
	if (switchChecked) {
		// 部品を再構築しているので、チェック状態の再設定が必要
		objInput.setAttribute("checked", "checked");
	}
	objTd.appendChild(objInput);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_ITEM_INFO_EXTRACT_CHECKBOX");
	HtmlCreateTextNode("アイテム情報", objLabel);



	// 展開表示状態を保持
	CItemInfoManager.Extracted = switchChecked;

	// 設定欄のヘッダ部分をリフレッシュ（着色処理等）
	CItemInfoManager.RefreshItemInfoHeader();

	// 展開表示でなければ、終了
	if (!switchChecked) {
		return;
	}



	//----------------------------------------------------------------
	// アイテム名行
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	// TODO: データ移行過渡処理
	if (IsEnableMigrationBlockNewProcess()) {
		objTd.setAttribute("rowspan", 3);
	}
	else {
		objTd.setAttribute("rowspan", 2);
	}
	objSelect = HtmlCreateElement("select", objTd);
	objSelect.setAttribute("id", "OBJID_SELECT_ITEM_INFO_ITEM");
	objSelect.setAttribute("onchange", "CItemInfoManager.OnChangeSelectItem()");

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", 2);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_CHECK_ITEM_INFO_AUTO_FLAG");
	objInput.setAttribute("type", "checkbox");
	if (CItemInfoManager.AutoFlag) {
		objInput.setAttribute("checked", "checked");
	}
	objInput.setAttribute("onchange", "CItemInfoManager.OnChangeCheckAutoFlag()");

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_CHECK_ITEM_INFO_AUTO_FLAG");
	HtmlCreateTextNode("装備変更時に自動表示", objLabel);



	//----------------------------------------------------------------
	// オプション行
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", 2);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_CHECK_ITEM_INFO_APPLY_AUTO_FOCUS_FLAG");
	objInput.setAttribute("type", "checkbox");
	if (CItemInfoManager.ApplyAutoFocusFlag) {
		objInput.setAttribute("checked", "checked");
	}
	objInput.setAttribute("onchange", "CItemInfoManager.OnChangeCheckApplyAutoFocusFlag()");

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_CHECK_ITEM_INFO_APPLY_AUTO_FOCUS_FLAG");
	HtmlCreateTextNode("時限効果設定時に設定欄を表示する", objLabel);



	//----------------------------------------------------------------
	// 公式ツール検索（将来対応）
	//----------------------------------------------------------------
	// TODO: データ移行過渡処理
	if (IsEnableMigrationBlockNewProcess()) {
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objSelect = HtmlCreateElement("select", objTd);
		objSelect.setAttribute("id", "OBJID_SELECT_ITEM_INFO_TRADE_WORLD");
		objSelect.setAttribute("onchange", "CItemInfoManager.OnChangeWorldSelect()");
		HtmlCreateElementOption(13, "Breidablik", objSelect);
		HtmlCreateElementOption(15, "Noatun", objSelect);
		HtmlSetObjectValueById("OBJID_SELECT_ITEM_INFO_TRADE_WORLD", CItemInfoManager.tradeWorld);


		objTd = HtmlCreateElement("td", objTr);
		objA = HtmlCreateElement("a", objTd);
		objA.setAttribute("id", "OBJID_A_ITEM_INFO_OPEN_OFFICIAL_TRADE_INFOMATION");
		objA.setAttribute("target", "_blank");
	}



	//----------------------------------------------------------------
	// 情報表示行
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("id", "OBJID_TD_ITEM_INFO_INFO_TABLE");
	objTd.setAttribute("colspan", colspan);



	// アイテム選択欄を更新
	CItemInfoManager.RefreshItemSelectBox(CItemInfoManager.OptionIdLast);
};



/**
 * 展開チェックボックス切り替えイベントハンドラ.
 */
CItemInfoManager.OnClickExtractSwitch = function () {
	// セーブデータ更新
	const status = document.getElementById("OBJID_ITEM_INFO_EXTRACT_CHECKBOX").checked ? 1 : 0;
	CSaveController.setSettingProp(CSaveDataConst.propNameItemInfoSwitch, status);
	// 再構築する
	CItemInfoManager.RebuildControls();
	if (status === 1) {
		CItemInfoManager.LoadFromLocalStorage();
	}
};



/**
 * 自動表示チェックボックス変更イベントハンドラ.
 */
CItemInfoManager.OnChangeCheckAutoFlag = function () {
	var objInput = null;
	objInput = document.getElementById("OBJID_CHECK_ITEM_INFO_AUTO_FLAG");
	CItemInfoManager.AutoFlag = objInput.checked;
	// セーブデータ更新
	const status = objInput.checked?1:0;
	CSaveController.setSettingProp(CSaveDataConst.propNameItemInfoAutoSwitch, status);
};



/**
 * 時限効果設定時画面フォーカスチェックボックス変更イベントハンドラ.
 */
CItemInfoManager.OnChangeCheckApplyAutoFocusFlag = function () {
	var objInput = null;
	objInput = document.getElementById("OBJID_CHECK_ITEM_INFO_APPLY_AUTO_FOCUS_FLAG");
	CItemInfoManager.ApplyAutoFocusFlag = objInput.checked;
	// セーブデータ更新
	const status = objInput.checked?1:0;
	CSaveController.setSettingProp(CSaveDataConst.propNameItemInfoTimeEffectSwitch, status);
};



/**
 * ヘッダ部品を再設定する.
 */
CItemInfoManager.RefreshItemInfoHeader = function () {

	var switchChecked = false;

	var objSwitch = null;
	var objHeader = null;

	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_ITEM_INFO_EXTRACT_CHECKBOX");
	switchChecked = objSwitch.checked;

	// ヘッダの CSS を調整
	objHeader = document.getElementById("OBJID_ITEM_INFO_HEADER");
	if (switchChecked) {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER_USED");
	}
	else {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER");
	}
};



/**
 * 装備の変更イベントハンドラ.
 * @param kindId データ種別ID
 * @param dataId データID（アイテムIDやカードIDなど）
 */
CItemInfoManager.OnChangeEquip = function (kindId, dataId) {

	var optionId = "";

	// 選択項目IDを生成
	optionId = CItemInfoManager.CreateOptionId(kindId, dataId);

	// 最後にイベントハンドラが呼ばれた選択項目IDを更新する
	CItemInfoManager.OptionIdLastHandling = optionId;

	// 自動設定が on の場合は、最後に選択した選択項目IDを更新する
	if (CItemInfoManager.AutoFlag) {
		CItemInfoManager.OptionIdLast = optionId;
	}

	// 展開表示状態の場合は、アイテム選択欄を更新する
	if (CItemInfoManager.Extracted) {
		CItemInfoManager.RefreshItemSelectBox(optionId);
	}
};



/**
 * 状態をリセットする.
 */
CItemInfoManager.ResetState = function () {

	// 最後にイベントハンドラが呼ばれた選択項目IDを更新する
	CItemInfoManager.OptionIdLastHandling = CItemInfoManager.OptionIdDummy;

	// 自動設定が on の場合は、最後に選択した選択項目IDを更新する
	if (CItemInfoManager.AutoFlag) {
		CItemInfoManager.OptionIdLast = CItemInfoManager.OptionIdDummy;
	}

	// 展開表示状態の場合は、アイテム選択欄を更新する
	if (CItemInfoManager.Extracted) {
		CItemInfoManager.RefreshItemSelectBox(CItemInfoManager.OptionIdDummy);
	}
};



/**
 * アイテム選択欄を更新する.
 * @param optionIdNew 新たに選択する選択項目ID
 */
CItemInfoManager.RefreshItemSelectBox = function (optionIdNew) {
	var idx = 0;
	var selectedValue = "";
	var itemId = 0;
	var itemData = null;
	var cardId = 0;
	var cardData = null;
	var costumeId = 0;
	var costumeData = null;
	var optionId = "";
	var optionIdArray = null;
	var objSelect = null;
	// select オブジェクト取得
	objSelect = document.getElementById("OBJID_SELECT_ITEM_INFO_ITEM");
	// 選択状態を取得
	selectedValue = HtmlGetObjectValueById("OBJID_SELECT_ITEM_INFO_ITEM", CItemInfoManager.OptionIdLast);
	// 自動設定が on の場合は、引数のパラメータを採用
	if (CItemInfoManager.AutoFlag) {
		selectedValue = optionIdNew;
	}
	// 選択項目全削除
	HtmlRemoveOptionAll(objSelect);
	// 選択項目のID配列を生成（重複検査用）
	optionIdArray = new Array();
	// アイテム項目の追加
	for (idx = 0; idx < n_A_Equip.length; idx++) {
		// 該当箇所のアイテムIDを取得
		itemId = n_A_Equip[idx];
		// アイテムデータ取得
		itemData = ItemObjNew[itemId];
		// 表示対象外の種別はスキップ
		switch (itemData[ITEM_DATA_INDEX_KIND]) {
			case ITEM_KIND_KNIFE:
			case ITEM_KIND_SWORD:
			case ITEM_KIND_SWORD_2HAND:
			case ITEM_KIND_SPEAR:
			case ITEM_KIND_SPEAR_2HAND:
			case ITEM_KIND_AXE:
			case ITEM_KIND_AXE_2HAND:
			case ITEM_KIND_CLUB:
			case ITEM_KIND_STUFF:
			case ITEM_KIND_BOW:
			case ITEM_KIND_KATAR:
			case ITEM_KIND_BOOK:
			case ITEM_KIND_FIST:
			case ITEM_KIND_MUSICAL:
			case ITEM_KIND_WHIP:
			case ITEM_KIND_FUMA:
			case ITEM_KIND_HANDGUN:
			case ITEM_KIND_RIFLE:
			case ITEM_KIND_SHOTGUN:
			case ITEM_KIND_GATLINGGUN:
			case ITEM_KIND_GRENADEGUN:
			case ITEM_KIND_STUFF2HAND:
			case ITEM_KIND_HEAD_TOP:
			case ITEM_KIND_HEAD_MID:
			case ITEM_KIND_HEAD_UNDER:
			case ITEM_KIND_BODY:
			case ITEM_KIND_SHIELD:
			case ITEM_KIND_SHOULDER:
			case ITEM_KIND_FOOT:
			case ITEM_KIND_ACCESSARY:
			case ITEM_KIND_ACCESSARY_ON1:
			case ITEM_KIND_ACCESSARY_ON2:
				break;
			default:
				continue;
		}
		// 表示対象外のアイテムIDはスキップ
		switch (itemId) {
			case ITEM_ID_SUDE:
			case ITEM_ID_NOEQUIP_HEAD_TOP:
			case ITEM_ID_NOEQUIP_HEAD_MID:
			case ITEM_ID_NOEQUIP_HEAD_UNDER:
			case ITEM_ID_NOEQUIP_BODY:
			case ITEM_ID_NOEQUIP_SHIELD:
			case ITEM_ID_NOEQUIP_SHOULDER:
			case ITEM_ID_NOEQUIP_SHOES:
			case ITEM_ID_NOEQUIP_ACCESSARY:
			case ITEM_ID_NOEQUIP_SET:
				continue;
		}
		// 選択項目のIDを生成
		optionId = CItemInfoManager.CreateOptionId(CONST_DATA_KIND_ITEM, itemId);
		// 同一項目は複数追加しない
		if (optionIdArray.indexOf(optionId) >= 0) {
			continue;
		}
		// 選択項目のIDを記録
		optionIdArray.push(optionId);
		// 選択項目追加
		HtmlCreateElementOption(optionId, GetFlagAppendedItemName(itemId), objSelect);
	}
	// カード項目の追加
	for (idx = 0; idx < n_A_card.length; idx++) {
		// 該当箇所のカードIDを取得
		cardId = n_A_card[idx];
		// カードデータ取得
		cardData = CardObjNew[cardId];
		// 表示対象外の種別はスキップ
		switch (cardData[CARD_DATA_INDEX_KIND]) {
			case CARD_KIND_ARMS:
			case CARD_KIND_HEAD:
			case CARD_KIND_SHIELD:
			case CARD_KIND_BODY:
			case CARD_KIND_SHOULDER:
			case CARD_KIND_FOOT:
			case CARD_KIND_ACCESSARY:
			case CARD_KIND_ENCHANT:
			case CARD_KIND_ANY:
				break;
			default:
				continue;
		}
		// 選択項目のIDを生成
		optionId = CItemInfoManager.CreateOptionId(CONST_DATA_KIND_CARD, cardId);
		// 同一項目は複数追加しない
		if (optionIdArray.indexOf(optionId) >= 0) {
			continue;
		}
		// 選択項目のIDを記録
		optionIdArray.push(optionId);
		// 選択項目追加
		HtmlCreateElementOption(optionId, GetFlagAppendedCardName(cardId), objSelect);
	}
	// シャドウ装備の追加
	const eqprgnIDs = [
		EQUIP_REGION_ID_SHADOW_ARMS_RIGHT,
		EQUIP_REGION_ID_SHADOW_ARMS_LEFT,
		EQUIP_REGION_ID_SHADOW_BODY,
		EQUIP_REGION_ID_SHADOW_FOOT,
		EQUIP_REGION_ID_SHADOW_ACCESSARY_1,
		EQUIP_REGION_ID_SHADOW_ACCESSARY_2,
	]
	for (let idx = 0; idx < eqprgnIDs.length; idx++) {
		const eqpRegionId = eqprgnIDs[idx];
		// 装備IDを取得
		const itemId = g_itemIdArray[eqpRegionId];
		if (!itemId) {
			continue;
		}
		// 選択項目のIDを生成
		optionId = CItemInfoManager.CreateOptionId(CONST_DATA_KIND_ITEM, itemId);
		// 同一項目は複数追加しない
		if (optionIdArray.indexOf(optionId) >= 0) {
			continue;
		}
		// 選択項目のIDを記録
		optionIdArray.push(optionId);
		// 選択項目追加
		HtmlCreateElementOption(optionId, GetFlagAppendedItemName(itemId), objSelect);
	}
	// 衣装項目の追加
	for (idx = 0; idx < n_A_costume.length; idx++) {
		// 該当箇所の衣装IDを取得
		costumeId = n_A_costume[idx];
		// 衣装データ取得
		costumeData = CostumeOBJ[costumeId];
		// 表示対象外の種別はスキップ
		switch (costumeData[COSTUME_DATA_INDEX_KIND]) {
			case COSTUME_KIND_ARMS:
			case COSTUME_KIND_HEAD_TOP:
			case COSTUME_KIND_HEAD_MID:
			case COSTUME_KIND_HEAD_UNDER:
			case COSTUME_KIND_SHIELD:
			case COSTUME_KIND_BODY:
			case COSTUME_KIND_SHOULDER:
			case COSTUME_KIND_FOOT:
			case COSTUME_KIND_ACCESSARY:
				break;
			default:
				continue;
		}
		// 表示対象外の衣装IDはスキップ
		switch (costumeId) {
			case COSTUME_ID_HEAD_UNDER_NONE:
				continue;
		}
		// 選択項目のIDを生成
		optionId = CItemInfoManager.CreateOptionId(CONST_DATA_KIND_COSTUME, costumeId);
		// 同一項目は複数追加しない
		if (optionIdArray.indexOf(optionId) >= 0) {
			continue;
		}
		// 選択項目のIDを記録
		optionIdArray.push(optionId);
		// 選択項目追加
		HtmlCreateElementOption(optionId, costumeData[COSTUME_DATA_INDEX_NAME], objSelect);
	}
	// 選択値の復元
	if (optionIdArray.indexOf(selectedValue) >= 0) {
		HtmlSetObjectValueById("OBJID_SELECT_ITEM_INFO_ITEM", selectedValue);
		objSelect.removeAttribute("disabled");
		CItemInfoManager.OnChangeSelectItem();
	}
	// 復元できない場合は、新規に選択した選択値
	else if (optionIdArray.indexOf(optionIdNew) >= 0) {
		HtmlSetObjectValueById("OBJID_SELECT_ITEM_INFO_ITEM", optionIdNew);
		objSelect.removeAttribute("disabled");
		CItemInfoManager.OnChangeSelectItem();
	}
	// 新規に選択した選択値も復元できない場合は、最後にイベントハンドラが呼ばれた選択値
	else if (optionIdArray.indexOf(CItemInfoManager.OptionIdLastHandling) >= 0) {
		HtmlSetObjectValueById("OBJID_SELECT_ITEM_INFO_ITEM", CItemInfoManager.OptionIdLastHandling);
		objSelect.removeAttribute("disabled");
		CItemInfoManager.OnChangeSelectItem();
	}
	// 最後にイベントハンドラが呼ばれた選択値も復元できない場合は、先頭要素
	else if (optionIdArray.length > 0) {
		HtmlSetObjectValueById("OBJID_SELECT_ITEM_INFO_ITEM", optionIdArray[0]);
		objSelect.removeAttribute("disabled");
		CItemInfoManager.OnChangeSelectItem();
	}
	// そもそも、選択項目がない場合は、ダミー要素を追加して、使用不可にする
	else {
		HtmlCreateElementOption(CItemInfoManager.OptionIdDummy, "なし", objSelect);
		HtmlSetObjectValueById("OBJID_SELECT_ITEM_INFO_ITEM", CItemInfoManager.OptionIdDummy);
		objSelect.setAttribute("disabled", "disabled");
		CItemInfoManager.OnChangeSelectItem();
	}
};


/**
 * アイテム選択欄変更イベントハンドラ.
 */
CItemInfoManager.OnChangeSelectItem = function () {

	var splittedOptionId = null;

	var kindId = 0;
	var dataId = 0;

	CItemInfoManager.OptionIdLast = HtmlGetObjectValueById("OBJID_SELECT_ITEM_INFO_ITEM", CItemInfoManager.OptionIdDummy);

	splittedOptionId = CItemInfoManager.SplitOptionId(CItemInfoManager.OptionIdLast);

	if (splittedOptionId.length == 2) {
		kindId = Number(splittedOptionId[0]);
		dataId = Number(splittedOptionId[1]);
	}

	// 公式ツール検索アンカーを再構築
	CItemInfoManager.RebuildOfficialTradeInformationAnchor(kindId, dataId);

	// 情報表示欄を再構築
	CItemInfoManager.RebuildInfoTable(kindId, dataId);
};



/**
 * ワールド選択欄変更イベントハンドラ.
 */
CItemInfoManager.OnChangeWorldSelect = function () {
	CItemInfoManager.OnChangeSelectItem();
}



/**
 * 公式ツール検索アンカーを再構築する.
 * @param kindId データ種別ID
 * @param dataId データID（アイテムIDやカードIDなど）
 */
CItemInfoManager.RebuildOfficialTradeInformationAnchor = function (kindId, dataId) {

	var dataObject = null;
	var dataOfficialId = 0;
	var dataName = "";
	var dataSlot = 0;

	var objA = null;

	// TODO: データ移行過渡処理
	if (!IsEnableMigrationBlockNewProcess()) {
		return;
	}

	// 指定なしの場合は、アンカーの URL をクリアする
	if (dataId == 0) {
		objA = document.getElementById("OBJID_A_ITEM_INFO_OPEN_OFFICIAL_TRADE_INFOMATION");
		objA.removeAttribute("href");
		HtmlRemoveAllChild(objA);
		HtmlCreateTextNode("（未対応のアイテムです）", objA);
		return;
	}



	// 必要なデータを取得する
	dataObject = g_constDataManager.GetDataObject(kindId, dataId);

	// データオブジェクトの取得に失敗した場合は、アンカーの URL をクリアする
	if (!dataObject) {
		objA = document.getElementById("OBJID_A_ITEM_INFO_OPEN_OFFICIAL_TRADE_INFOMATION");
		objA.removeAttribute("href");
		HtmlRemoveAllChild(objA);
		HtmlCreateTextNode("（未対応のアイテムです）", objA);
		return;
	}

	dataOfficialId = dataObject.GetOfficialId();
	dataName = dataObject.GetName();
	dataSlot = dataObject.GetSlot();

	// ワールド選択を取得する
	CItemInfoManager.tradeWorld = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_ITEM_INFO_TRADE_WORLD", 0);

	// URLを組み立てる
	url = "https://rotool.gungho.jp/torihiki/index.php?"
		+ "item=" + dataOfficialId
		+ "&make_flag=0"
		+ "&world="+ CItemInfoManager.tradeWorld
		+ "&item_name=" + dataName + "[" + (dataSlot % 10) + "]"
		+ "&card=-1"
		+ "&attribute=-1"
		+ "&star=-1"
		+ "&enchant=-1";



	// アンカーの URL に設定
	objA = document.getElementById("OBJID_A_ITEM_INFO_OPEN_OFFICIAL_TRADE_INFOMATION");
	objA.setAttribute("href", encodeURI(url));

	// テキストの設定
	HtmlRemoveAllChild(objA);
	HtmlCreateTextNode("公式露店取引情報ページを開く", objA);
};



/**
 * 情報表示欄を再構築する.
 * @param kindId データ種別ID
 * @param dataId データID（アイテムIDやカードIDなど）
 */
CItemInfoManager.RebuildInfoTable = function (kindId, dataId) {

	var objRoot = null;
	var objTable = null;
	var objTbody = null;

	// 表示欄を初期化
	objRoot = document.getElementById("OBJID_TD_ITEM_INFO_INFO_TABLE");
	HtmlRemoveAllChild(objRoot);

	// 表示欄テーブルを再構築
	objTable = document.createElement("table");
	objTable.setAttribute("border", 1);
	objTable.setAttribute("width", "100%");
	objRoot.appendChild(objTable);

	objTbody = document.createElement("tbody");
	objTable.appendChild(objTbody);

	// データ種別ごとのサブ関数をコール
	switch (kindId) {

	case CONST_DATA_KIND_ITEM:
		CItemInfoManager.RebuildInfoTableSubItem(objTbody, dataId);
		break;

	case CONST_DATA_KIND_CARD:
		CItemInfoManager.RebuildInfoTableSubCard(objTbody, dataId);
		break;

	case CONST_DATA_KIND_COSTUME:
		CItemInfoManager.RebuildInfoTableSubCostume(objTbody, dataId);
		break;
	}
};



/**
 * 情報表示欄を再構築する（アイテム用サブ関数）.
 * @param objTbody 表示欄の tbody オブジェクト
 * @param dataId データID（アイテムIDやカードIDなど）
 */
CItemInfoManager.RebuildInfoTableSubItem = function (objTbody, dataId) {

	var idx = 0;

	var itemData = null;
	var penaltyBorder = 0;
	var penaltyInfo = "";

	var buildInfo = null;
	var buildInfoArray = null;
	var detailTextSplitted = null;

	var objTr = null;
	var objTd = null;
	var objSpan = null;



	// アイテムデータ取得
	itemData = ItemObjNew[dataId];

	// テーブル構築用データを整理する
	switch (itemData[ITEM_DATA_INDEX_KIND]) {
	case ITEM_KIND_KNIFE:
	case ITEM_KIND_SWORD:
	case ITEM_KIND_SWORD_2HAND:
	case ITEM_KIND_SPEAR:
	case ITEM_KIND_SPEAR_2HAND:
	case ITEM_KIND_AXE:
	case ITEM_KIND_AXE_2HAND:
	case ITEM_KIND_CLUB:
	case ITEM_KIND_STUFF:
	case ITEM_KIND_BOW:
	case ITEM_KIND_KATAR:
	case ITEM_KIND_BOOK:
	case ITEM_KIND_FIST:
	case ITEM_KIND_MUSICAL:
	case ITEM_KIND_WHIP:
	case ITEM_KIND_FUMA:
	case ITEM_KIND_HANDGUN:
	case ITEM_KIND_RIFLE:
	case ITEM_KIND_SHOTGUN:
	case ITEM_KIND_GATLINGGUN:
	case ITEM_KIND_GRENADEGUN:
	case ITEM_KIND_STUFF2HAND:
		buildInfoArray = [
			["ATK", itemData[ITEM_DATA_INDEX_POWER]],
			["スロット", GetSlotText(itemData[ITEM_DATA_INDEX_SLOT])],
			["武器Lv", Math.floor(itemData[ITEM_DATA_INDEX_WPNLV] % 10)],
			["必要Lv", itemData[ITEM_DATA_INDEX_EQPLV]],
			["重量", itemData[ITEM_DATA_INDEX_WEIGHT]],
		];
		break;

	case ITEM_KIND_HEAD_TOP:
	case ITEM_KIND_HEAD_MID:
	case ITEM_KIND_HEAD_UNDER:
	case ITEM_KIND_BODY:
	case ITEM_KIND_SHIELD:
	case ITEM_KIND_SHOULDER:
	case ITEM_KIND_FOOT:
	case ITEM_KIND_ACCESSARY:
	case ITEM_KIND_ACCESSARY_ON1:
	case ITEM_KIND_ACCESSARY_ON2:
		buildInfoArray = [
			["DEF", itemData[ITEM_DATA_INDEX_POWER]],
			["スロット", GetSlotText(itemData[ITEM_DATA_INDEX_SLOT])],
			["必要Lv", itemData[ITEM_DATA_INDEX_EQPLV]],
			["重量", itemData[ITEM_DATA_INDEX_WEIGHT]],
		];
		break;

	default:
		buildInfoArray = [];
		break;

	}



	// 基本情報行
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	// 構築情報に従って生成
	for (idx = 0; idx < buildInfoArray.length; idx++) {

		buildInfo = buildInfoArray[idx];

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
		HtmlCreateTextNode(buildInfo[0], objTd);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextNode(buildInfo[1], objTd);
	}



	// 詳細情報行
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	// 詳細テキスト
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", buildInfoArray.length * 2);

	// 詳細テキストを生成
	CItemInfoManager.RebuildInfoTableSubItemDetail(objTd, dataId, true);



	// STR ペナルティ情報
	switch (itemData[ITEM_DATA_INDEX_KIND]) {
	case ITEM_KIND_KNIFE:
	case ITEM_KIND_SWORD:
	case ITEM_KIND_SWORD_2HAND:
	case ITEM_KIND_SPEAR:
	case ITEM_KIND_SPEAR_2HAND:
	case ITEM_KIND_AXE:
	case ITEM_KIND_AXE_2HAND:
	case ITEM_KIND_CLUB:
	case ITEM_KIND_STUFF:
	case ITEM_KIND_KATAR:
	case ITEM_KIND_BOOK:
	case ITEM_KIND_FIST:
	case ITEM_KIND_FUMA:
	case ITEM_KIND_STUFF2HAND:
		penaltyBorder = GetStrPenaltyAvoidStr(itemData[ITEM_DATA_INDEX_POWER], itemData[ITEM_DATA_INDEX_WPNLV]);
		penaltyInfo = "STR" + "ペナルティ解除" + "STR" + "：" + penaltyBorder;
		break;

	case ITEM_KIND_BOW:
	case ITEM_KIND_MUSICAL:
	case ITEM_KIND_WHIP:
	case ITEM_KIND_HANDGUN:
	case ITEM_KIND_RIFLE:
	case ITEM_KIND_SHOTGUN:
	case ITEM_KIND_GATLINGGUN:
	case ITEM_KIND_GRENADEGUN:
		penaltyBorder = GetStrPenaltyAvoidStr(itemData[ITEM_DATA_INDEX_POWER], itemData[ITEM_DATA_INDEX_WPNLV]);
		penaltyInfo = "DEX" + "ペナルティ解除" + "DEX" + "：" + penaltyBorder;
		break;

	default:
		penaltyInfo = "";
		break;
	}

	if (penaltyInfo.length > 0) {
		HtmlCreateElement("br", objTd);

		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", "CSSCLS_ITEM_INFO_PENALTY_INFO");

		HtmlCreateTextNode(penaltyInfo, objSpan);
	}
};



/**
 * 情報表示欄を再構築する（アイテム用サブ関数　詳細部用）.
 * @param objRoot 表示欄のルートオブジェクト
 * @param dataId データID（アイテムIDやカードIDなど）
 * @param bEnableTimeItemButton 時限効果適用ボタン設置フラグ
 */
CItemInfoManager.RebuildInfoTableSubItemDetail = function (objRoot, dataId, bEnableTimeItemButton) {

	var itemData = null;

	// アイテムデータ取得
	itemData = ItemObjNew[dataId];

	// 装備専有箇所表示
	switch (itemData[ITEM_DATA_INDEX_KIND]) {
	case ITEM_KIND_HEAD_TOP:
	case ITEM_KIND_HEAD_MID:
		switch (Math.floor(itemData[ITEM_DATA_INDEX_WPNLV]) % 10) {
		case 1:
			HtmlCreateTextNode("上中段使用", objRoot);
			HtmlCreateElement("br", objRoot);
			break;
		case 2:
			HtmlCreateTextNode("上下段使用", objRoot);
			HtmlCreateElement("br", objRoot);
			break;
		case 3:
			HtmlCreateTextNode("上中下段使用", objRoot);
			HtmlCreateElement("br", objRoot);
			break;
		case 4:
			HtmlCreateTextNode("中下段使用", objRoot);
			HtmlCreateElement("br", objRoot);
			break;
		}
	}

	// アイテム情報
	CItemInfoManager.AppendEfficiencyInfoItem(objRoot, dataId, bEnableTimeItemButton);

	// セット情報
	CItemInfoManager.AppendSetInfo(objRoot, ItemIdToSetIdMap[dataId], bEnableTimeItemButton);
};



/**
 * 情報表示欄を再構築する（カード用サブ関数）.
 * @param objTbody 表示欄の tbody オブジェクト
 * @param dataId データID（アイテムIDやカードIDなど）
 */
CItemInfoManager.RebuildInfoTableSubCard = function (objTbody, dataId) {

	var cardData = null;

	var objTr = null;
	var objTd = null;



	// カードデータ取得
	cardData = CardObjNew[dataId];



	// 詳細情報行
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	// 詳細テキスト
	objTd = HtmlCreateElement("td", objTr);

	// 詳細テキスト生成
	CItemInfoManager.RebuildInfoTableSubCardDetail(objTd, dataId, true);

};



/**
 * 情報表示欄を再構築する（カード用サブ関数　詳細部用）.
 * @param objRoot 表示欄のルートオブジェクト
 * @param dataId データID（アイテムIDやカードIDなど）
 * @param bEnableTimeItemButton 時限効果適用ボタン設置フラグ
 */
CItemInfoManager.RebuildInfoTableSubCardDetail = function (objRoot, dataId, bEnableTimeItemButton) {

	var cardData = null;

	// カードデータ取得
	cardData = CardObjNew[dataId];

	// カード情報
	CItemInfoManager.AppendEfficiencyInfoCard(objRoot, dataId, bEnableTimeItemButton);

	// セット情報
	CItemInfoManager.AppendSetInfo(objRoot, CardIdToSetIdMap[dataId], bEnableTimeItemButton);
};




/**
 * 情報表示欄を再構築する（衣装用サブ関数）.
 * @param objTbody 表示欄の tbody オブジェクト
 * @param dataId データID（アイテムIDやカードIDなど）
 * @param bEnableTimeItemButton 時限効果適用ボタン設置フラグ
 */
CItemInfoManager.RebuildInfoTableSubCostume = function (objTbody, dataId, bEnableTimeItemButton) {

	var costumeData = null;

	var objTr = null;
	var objTd = null;



	// 衣装データ取得
	costumeData = CostumeOBJ[dataId];



	// 詳細情報行
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	// 詳細テキスト
	objTd = HtmlCreateElement("td", objTr);

	// カード情報
	CItemInfoManager.AppendEfficiencyInfoCostume(objTd, dataId, bEnableTimeItemButton);

	// セット情報（未対応）
};



/**
 * 性能情報を追記する（アイテム用）.
 * @param objRoot 追記の親オブジェクト
 * @param dataId データID
 * @param bEnableTimeItemButton 時限効果適用ボタン設置フラグ
 */
CItemInfoManager.AppendEfficiencyInfoItem = function (objRoot, dataId, bEnableTimeItemButton) {
	// 共通処理関数をコール
	CItemInfoManager.AppendEfficiencyInfoSub(objRoot, CONST_DATA_KIND_ITEM, dataId, bEnableTimeItemButton);
};



/**
 * 性能情報を追記する（カード用）.
 * @param objRoot 追記の親オブジェクト
 * @param dataId データID
 * @param bEnableTimeItemButton 時限効果適用ボタン設置フラグ
 */
CItemInfoManager.AppendEfficiencyInfoCard = function (objRoot, dataId, bEnableTimeItemButton) {
	// 共通処理関数をコール
	CItemInfoManager.AppendEfficiencyInfoSub(objRoot, CONST_DATA_KIND_CARD, dataId, bEnableTimeItemButton);
};



/**
 * 性能情報を追記する（衣装用）.
 * @param objRoot 追記の親オブジェクト
 * @param dataId データID
 * @param bEnableTimeItemButton 時限効果適用ボタン設置フラグ
 */
CItemInfoManager.AppendEfficiencyInfoCostume = function (objRoot, dataId, bEnableTimeItemButton) {
	// 共通処理関数をコール
	CItemInfoManager.AppendEfficiencyInfoSub(objRoot, CONST_DATA_KIND_COSTUME, dataId, bEnableTimeItemButton);
};



/**
 * 性能情報を追記する（処理本体）.
 * @param objRoot 追記の親オブジェクト
 * @param dataKind データ種別
 * @param dataId データID
 * @param bEnableTimeItemButton 時限効果適用ボタン設置フラグ
 */
CItemInfoManager.AppendEfficiencyInfoSub = function (objRoot, dataKind, dataId, bEnableTimeItemButton) {

	var colorNameArray = [
		"red",
	];

	var idx = 0;
	var idxText = 0;
	var idxSplitted = 0;
	var idxSrc = 0;

	var spDataArray = null;
	var detailText = "";

	var textInfo = null;
	var textInfoArray = null;
	var splittedText = "";
	var splittedTextArray = null;
	var timeItemData = null;
	var srcDataArray = null;
	var colorNameMatcher = null;
	var anchorNameMatcher = null;

	var objTarget = null;
	var objFont = null;
	var objSpan = null;
	var objA = null;
	var objInput = null;



	// 性能情報取得
	switch (dataKind) {

	case CONST_DATA_KIND_ITEM:
		spDataArray = ItemObjNew[dataId].slice(ITEM_DATA_INDEX_SPBEGIN);
		detailText = ItemObjNew[dataId][ITEM_DATA_INDEX_DETAIL];
		break;

	case CONST_DATA_KIND_CARD:
		spDataArray = CardObjNew[dataId].slice(CARD_DATA_INDEX_SPBEGIN);
		detailText = CardObjNew[dataId][CARD_DATA_INDEX_DETAIL];
		break;

	case CONST_DATA_KIND_COSTUME:
		spDataArray = CostumeOBJ[dataId].slice(COSTUME_DATA_INDEX_SPBEGIN);
		detailText = CostumeOBJ[dataId][COSTUME_DATA_INDEX_DETAIL];
		break;

	case CONST_DATA_KIND_PET:
		spDataArray = PET_OBJ[dataId].slice(PET_DATA_INDEX_SPBEGIN);
		detailText = PET_OBJ[dataId][PET_DATA_INDEX_DETAIL];
		break;

	default:
		spDataArray = new Array();
		detailText = "";
		break;
	}

	// SP 情報
	for (idx = 0; (idx + 1) < spDataArray.length; idx += 2) {

		textInfoArray = GetItemExplainText(spDataArray[idx], spDataArray[idx + 1]);

		if (textInfoArray.length == 0) {
			continue;
		}

		for (idxText = 1; idxText < textInfoArray.length; idxText++) {

			textInfo = textInfoArray[idxText];

			// 着色
			if (textInfo[0] != "") {
				objFont = HtmlCreateElement("font", objRoot);
				objFont.setAttribute("color", textInfo[0]);
				objTarget = objFont;
			}
			else {
				objTarget = objRoot;
			}

			// テキスト出力
			HtmlCreateTextNode(textInfoArray[0][1] + textInfoArray[idxText][1], objTarget);

			// 改行
			HtmlCreateElement("br", objRoot);
		}
	}

	// detail 情報
	if (detailText.length > 0) {

		sourceText = "" + detailText;

		if (sourceText != "0") {

			splittedTextArray = sourceText.replace(/<br>$/i, "").split(/<br>/i);

			for (idxSplitted = 0; idxSplitted < splittedTextArray.length; idxSplitted++) {

				objTarget = objRoot;
				splittedText = splittedTextArray[idxSplitted];

				// 着色検査
				// TODO: 将来的には、定義から削除
				colorNameMatcher = splittedText.match(/<red>(.*)<\/red>/i);

				if (colorNameMatcher) {
					objFont = HtmlCreateElement("font", objTarget);
					objFont.setAttribute("color", "red");
					objTarget = objFont;
					splittedText = colorNameMatcher[1];
				}

				// リンク検査
				// TODO: 将来的には、定義から削除
				anchorNameMatcher = splittedText.match(/<href="([^"]+)">(.*)<\/href>/i);

				if (anchorNameMatcher) {
					objA = HtmlCreateElement("a", objTarget);
					objA.setAttribute("href", anchorNameMatcher[1]);
					objA.setAttribute("target", "_blank");
					objTarget = objA;
					splittedText = anchorNameMatcher[2];
				}

				HtmlCreateTextNode(splittedText, objTarget);
				HtmlCreateElement("br", objTarget);
			}
		}
	}

	// 時限アイテム情報
	if (bEnableTimeItemButton) {
		for (idx = 0; idx < ITEM_SP_TIME_OBJ.length; idx++) {

			timeItemData = ITEM_SP_TIME_OBJ[idx];

			// 元データ情報配列を取得
			srcDataArray = timeItemData[TIME_ITEM_DATA_INDEX_SRC_DATA_ARRAY];

			for (idxSrc = 0; idxSrc < srcDataArray.length; idxSrc++) {

				// 元データ種別が違う場合は、次へ
				if (srcDataArray[idxSrc][TIME_ITEM_DATA_INDEX_SRC_INDEX_KIND] != dataKind) {
					continue;
				}

				// 元データ ID が違う場合は、次へ
				if (srcDataArray[idxSrc][TIME_ITEM_DATA_INDEX_SRC_INDEX_ID] != dataId) {
					continue;
				}

				break;
			}

			// 該当していなかった場合は次へ
			if (idxSrc >= srcDataArray.length) {
				continue;
			}

			// フォント用span生成
			objSpan = HtmlCreateElement("span", objRoot);
			objSpan.setAttribute("class", "CSSCLS_ITEM_INFO_TIME_ITEM_INFO");

			// テキスト出力
			HtmlCreateTextNode("(特殊効果発動状態で計算する機能は、ページ下の「アイテム時限効果」にあります)　", objSpan);

			// 設定ボタン
			objInput = HtmlCreateElement("input", objRoot);
			objInput.setAttribute("type", "button");
			objInput.setAttribute("value", timeItemData[1] + " を設定する");
			objInput.setAttribute("onclick", "CItemInfoManager.ApplyTimeItem(" + idx + ")");

			HtmlCreateElement("br", objRoot);
		}
	}
};



/**
 * アイテム時限効果を設定する.
 * @param timeItemId アイテム時限効果ＩＤ
 */
CItemInfoManager.ApplyTimeItem = function (timeItemId) {

	if (g_timeItemConf.indexOf(timeItemId) < 0) {
		CTimeItemAreaComponentManager.OnChangeConf(-1, timeItemId);
	}

	if (CItemInfoManager.ApplyAutoFocusFlag) {
		CTimeItemAreaComponentManager.FocusArea(g_timeItemConf.indexOf(timeItemId), true);
	}
};

/**
 * ローカルストレージに保存された状態を復元する
 */
CItemInfoManager.LoadFromLocalStorage = function () {
	// 自動表示の状態を設定する
	let status = (CSaveController.getSettingProp(CSaveDataConst.propNameItemInfoAutoSwitch) === 1n);
	document.getElementById("OBJID_CHECK_ITEM_INFO_AUTO_FLAG").checked = status;
	// 時限効果フォーカスの状態を設定する
	status = (CSaveController.getSettingProp(CSaveDataConst.propNameItemInfoTimeEffectSwitch) === 1n);
	document.getElementById("OBJID_CHECK_ITEM_INFO_APPLY_AUTO_FOCUS_FLAG").checked = status;
}

/**
 * セット情報を追記する.
 * @param objRoot 追記の親オブジェクト
 * @param dataIdToSetIdMap IDマップ
 * @param bEnableTimeItemButton 時限効果適用ボタン設置フラグ
 */
CItemInfoManager.AppendSetInfo = function (objRoot, dataIdToSetIdMap, bEnableTimeItemButton) {

	var idx = 0;
	var idxSameSet = 0;

	var dataIdToSourceIdMap = null;
	var itemSetId = 0;
	var itemSetIdArray = null;
	var itemSetData = null;
	var itemSetSourceId = 0;

	var objSpan = null;

	// 未定義の場合は処理なし
	if (!dataIdToSetIdMap) {
		return;
	}

	// マップをデータソースIDへのマップに変換
	dataIdToSourceIdMap = new Map();
	for (idx = 0; idx < dataIdToSetIdMap.length; idx++) {

		itemSetId = dataIdToSetIdMap[idx];

		itemSetData = w_SE[itemSetId];

		itemSetSourceId = itemSetData[0];

		if (!dataIdToSourceIdMap.has("" + itemSetSourceId)) {
			dataIdToSourceIdMap.set("" + itemSetSourceId, new Array());
		}

		dataIdToSourceIdMap.get("" + itemSetSourceId).push(itemSetId);
	}

	// セット情報
	dataIdToSourceIdMap.forEach(
		function (value, key, map) {

			var itemSetIdArray = null;

			// データソースID取得
			itemSetSourceId = Number(key);

			// アイテムセットID配列を取得
			itemSetIdArray = value;

			// 行開け
			HtmlCreateElement("br", objRoot);

			// フォント用span生成
			objSpan = HtmlCreateElement("span", objRoot);
			objSpan.setAttribute("class", "CSSCLS_ITEM_INFO_SET_INFO");

			// 構成アイテム情報追記
			HtmlCreateTextNode(GetItemSetMemberText(itemSetIdArray[0]), objSpan);

			// 同一セット情報を追記
			for (idx = 1; idx < itemSetIdArray.length; idx++) {
				HtmlCreateTextNode("または", objSpan);
				HtmlCreateElement("br", objSpan);
				HtmlCreateTextNode(GetItemSetMemberText(itemSetIdArray[idx]), objSpan);
			}

			HtmlCreateTextNode("を同時に装備した時", objSpan);
			HtmlCreateElement("br", objSpan);

			// セットの性能情報
			if (itemSetSourceId > 0) {
				CItemInfoManager.AppendEfficiencyInfoItem(objSpan, Math.abs(itemSetSourceId), bEnableTimeItemButton);
			}
			else {
				CItemInfoManager.AppendEfficiencyInfoCard(objSpan, Math.abs(itemSetSourceId), bEnableTimeItemButton);
			}

		}
	);
};


