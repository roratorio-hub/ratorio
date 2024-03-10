/**
 * 時限アイテムエリアコンポーネントマネージャクラス.
 */
function CTimeItemAreaComponentManager () {

}



/**
 * 画面部品を再構築する.
 */
CTimeItemAreaComponentManager.RebuildControls = function () {

	var idx = 0;
	var idxRow = 0;

	var timeData = null;
	var timeText = "";

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



	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_TIME_ITEM_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		switchChecked = objSwitch.checked;
	}



	// 設定欄を初期化
	objRoot = document.getElementById("ID_TIME_ITEM_AREA");
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
	objTd.setAttribute("id", "OBJID_TIME_ITEM_AREA_HEADER");
	objTd.setAttribute("class", "title");
	objTr.appendChild(objTd);

	// 設定欄展開用チェックボックス
	objInput = document.createElement("input");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_TIME_ITEM_AREA_EXTRACT_CHECKBOX");
	objInput.setAttribute("onclick", "CTimeItemAreaComponentManager.OnClickExtractSwitch()");
	if (switchChecked) {
		// 部品を再構築しているので、チェック状態の再設定が必要
		objInput.setAttribute("checked", "checked");
	}
	objTd.appendChild(objInput);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_TIME_ITEM_AREA_EXTRACT_CHECKBOX");
	HtmlCreateTextNode("アイテム時限効果", objLabel);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("id", "OBJID_TIME_ITEM_AREA_HEADER_MESSAGE");
	objLabel.setAttribute("for", "OBJID_TIME_ITEM_AREA_EXTRACT_CHECKBOX");
	objLabel.setAttribute("class", "CSSCLS_CONF_USING_MESSAGE_USING");



	// 設定欄のヘッダ部分をリフレッシュ（着色処理等）
	CTimeItemAreaComponentManager.RefreshTimeItemAreaHeader();

	// 展開表示でなければ、終了
	if (!switchChecked) {
		return;
	}



	//----------------------------------------------------------------
	// データ出力行
	//----------------------------------------------------------------
	for (idxRow = 0; idxRow < g_timeItemConf.length; idxRow++) {
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objSelect = HtmlCreateElement("select", objTd);
		objSelect.setAttribute("id", "OBJID_SELECT_TIME_ITEM_" + idxRow);
		objSelect.setAttribute("onchange", "CTimeItemAreaComponentManager.OnChangeConf(" + idxRow + ", parseInt(this.value))");

		for (idx = 0; idx < ITEM_SP_TIME_OBJ_SORT.length; idx++) {
			timeData = ITEM_SP_TIME_OBJ[ITEM_SP_TIME_OBJ_SORT[idx]];
			timeText = timeData[TIME_ITEM_DATA_INDEX_NAME] + " " + "[" + timeData[TIME_ITEM_DATA_INDEX_EXPLAIN] + "]";
			HtmlCreateElementOption(timeData[TIME_ITEM_DATA_INDEX_ID], timeText, objSelect);
		}

		objSelect.value = g_timeItemConf[idxRow];
	}

	// CSS 更新
	CTimeItemAreaComponentManager.RefreshControlCSS();


	//----------------------------------------------------------------
	// 注意書き
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("style", "font-size : smaller");
	HtmlCreateTextNode("発動率と効果時間は計算に入れていません。設定すれば常時発動状態です。", objSpan);

};



/**
 * 展開チェックボックス切り替えイベントハンドラ.
 */
CTimeItemAreaComponentManager.OnClickExtractSwitch = function () {
	// 再構築する
	CTimeItemAreaComponentManager.RebuildControls();
};

/**
 * アイテム時限効果の変更を反映する
 * @param {*} idxConf 
 * @param {*} dataId 
 * @returns 
 */
CTimeItemAreaComponentManager.OnChangeConf = function (idxConf, dataId) {

	var idx = 0;

	// 設定箇所自動指定の場合
	if (idxConf < 0) {
		for (idx = 0; idx < g_timeItemConf.length; idx++) {
			if (g_timeItemConf[idx] == 0) {
				idxConf = idx;
				break;
			}
		}
	}

	if (idxConf < 0) {
		return;
	}

	// 外部呼出し用に、値を再設定
	HtmlSetObjectValueById("OBJID_SELECT_TIME_ITEM_" + idxConf, dataId);

	// 値を取得
	g_timeItemConf[idxConf] = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_TIME_ITEM_" + idxConf, dataId);

	// 設定がクリアされた場合は、クイック調整の有効フラグをリセットする
	if (g_timeItemConf[idxConf] == 0) {
		g_timeItemConfEffective[idxConf] = true;
	}

	// 再計算
	AutoCalc("CTimeItemAreaComponentManager.OnChangeConf");

	// クイック調整欄の更新
	CBattleQuickControlAreaComponentManager.RebuildControls();

	// ヘッダ更新
	CTimeItemAreaComponentManager.RefreshTimeItemAreaHeader();

	// コントロール更新
	CTimeItemAreaComponentManager.RefreshControlCSS();
};



/**
 * ヘッダ部品を再設定する.
 */
CTimeItemAreaComponentManager.RefreshTimeItemAreaHeader = function () {

	var idx = 0;

	var confChanged = false;

	var objHeader = null;
	var objMessage = null;

	for (idx = 0; idx < g_timeItemConf.length; idx++) {
		if (g_timeItemConf[idx] != 0) {
			confChanged = true;
			break;
		}
	}

	// ヘッダの CSS を調整
	objHeader = document.getElementById("OBJID_TIME_ITEM_AREA_HEADER");
	objMessage = document.getElementById("OBJID_TIME_ITEM_AREA_HEADER_MESSAGE");
	if (confChanged) {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER_USED");
		HtmlRemoveAllChild(objMessage);
		HtmlCreateTextNode("　使用中", objMessage);
	}
	else {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER");
		HtmlRemoveAllChild(objMessage);
	}
};



/**
 * コントロール部品の CSS を再設定する.
 */
CTimeItemAreaComponentManager.RefreshControlCSS = function () {

	var idx = 0;

	var confChanged = false;

	var objSelect = null;

	for (idx = 0; idx < g_timeItemConf.length; idx++) {

		objSelect = document.getElementById("OBJID_SELECT_TIME_ITEM_" + idx);

		if (objSelect) {
			if (HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_TIME_ITEM_" + idx, 0) != 0) {
				objSelect.setAttribute("class", "CSSCLS_SELECTED_CONF");
			}
			else {
				objSelect.removeAttribute("class");
			}
		}
	}
};



/**
 * 設定欄を開く.
 */
CTimeItemAreaComponentManager.OpenArea = function () {

	var objSwitch = null;

	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_TIME_ITEM_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		objSwitch.checked = "checked";
	}

	// 再構築する
	CTimeItemAreaComponentManager.RebuildControls();
};



/**
 * 設定欄を閉じる.
 */
CTimeItemAreaComponentManager.CloseArea = function () {

	var objSwitch = null;

	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_TIME_ITEM_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		objSwitch.checked = null;
	}

	// 再構築する
	CTimeItemAreaComponentManager.RebuildControls();
};



/**
 * 設定欄にフォーカスさせる.
 * @param idxConf フォーカスさせたい設定インデックス（0 未満の場合はフォーカスしない）
 * @param bForceOpen 強制展開フラグ
 */
CTimeItemAreaComponentManager.FocusArea = function (idxConf, bForceOpen) {

	var objTarget = null;

	// 強制展開フラグがある場合は開く
	if (bForceOpen) {
		CTimeItemAreaComponentManager.OpenArea();
	}

	// フォーカス対象オブジェクトを取得
	objTarget = document.getElementById("OBJID_SELECT_TIME_ITEM_" + idxConf);

	if (!objTarget) {
		objTarget = document.getElementById("OBJID_TIME_ITEM_AREA_EXTRACT_CHECKBOX");
	}

	// 対象オブジェクトを取得できなかった場合は処理しない
	if (!objTarget) {
		return;
	}

	// フォーカス設定
	objTarget.focus();
};



// 初期構築処理
CTimeItemAreaComponentManager.RebuildControls();



