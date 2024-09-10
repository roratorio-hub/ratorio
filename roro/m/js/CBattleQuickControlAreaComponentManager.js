/**
 * 時限アイテムエリアコンポーネントマネージャクラス.
 */
function CBattleQuickControlAreaComponentManager () {

}



/**
 * 画面部品を再構築する.
 */
CBattleQuickControlAreaComponentManager.RebuildControls = function () {

	var idx = 0;
	var idxRow = 0;

	var colspan = 0;

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



	colspan = 2;



	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_BATTLE_QUICK_CONTROL_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		switchChecked = objSwitch.checked;
	}



	// 設定欄を初期化
	objRoot = document.getElementById("ID_BATTLE_QUICK_CONTROL_AREA");
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
	objTd.setAttribute("id", "OBJID_BATTLE_QUICK_CONTROL_AREA_HEADER");
	objTd.setAttribute("colspan", colspan);
	objTr.appendChild(objTd);

	// 設定欄展開用チェックボックス
	objInput = document.createElement("input");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_BATTLE_QUICK_CONTROL_AREA_EXTRACT_CHECKBOX");
	objInput.setAttribute("onclick", "CBattleQuickControlAreaComponentManager.OnClickExtractSwitch()");
	if (switchChecked) {
		// 部品を再構築しているので、チェック状態の再設定が必要
		objInput.setAttribute("checked", "checked");
	}
	objTd.appendChild(objInput);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_BATTLE_QUICK_CONTROL_AREA_EXTRACT_CHECKBOX");
	HtmlCreateTextNode("クイック調整", objLabel);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("id", "OBJID_BATTLE_QUICK_CONTROL_AREA_HEADER_MESSAGE");
	objLabel.setAttribute("for", "OBJID_BATTLE_QUICK_CONTROL_AREA_EXTRACT_CHECKBOX");
	objLabel.setAttribute("class", "CSSCLS_CONF_USING_MESSAGE_USING");



	// 設定欄のヘッダ部分をリフレッシュ（着色処理等）
	CBattleQuickControlAreaComponentManager.RefreshBattleQuickControlAreaHeader();

	// 展開表示でなければ、終了
	if (!switchChecked) {
		return;
	}



	//----------------------------------------------------------------
	// アイテム時限効果調整
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("アイテム時限効果調整", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "設定欄を表示");
	objInput.setAttribute("onclick", "CBattleQuickControlAreaComponentManager.OnClickFocusTimeItemArea()");

	for (idxRow = 0; idxRow < g_timeItemConf.length; idxRow++) {

		// 設定されていない欄は表示しない
		if (g_timeItemConf[idxRow] == 0) {
			continue;
		}

		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_BATTLE_QUICK_CONTROL_TIME_ITEM_" + idxRow);
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("style", "font-size : smaller");
		timeData = ITEM_SP_TIME_OBJ[g_timeItemConf[idxRow]];
		timeText = timeData[TIME_ITEM_DATA_INDEX_NAME] + " " + "[" + timeData[TIME_ITEM_DATA_INDEX_EXPLAIN] + "]";
		HtmlCreateTextNode(timeText, objSpan);

		objTd = HtmlCreateElement("td", objTr);
		objSelect = HtmlCreateElement("select", objTd);
		objSelect.setAttribute("id", "OBJID_SELECT_BATTLE_QUICK_CONTROL_TIME_ITEM_" + idxRow);
		objSelect.setAttribute("onchange", "CBattleQuickControlAreaComponentManager.OnChangeTimeItemEffective(" + idxRow + ", parseInt(this.value))");

		HtmlCreateElementOption(1, "ON", objSelect);
		HtmlCreateElementOption(0, "OFF", objSelect);

		if (g_timeItemConfEffective[idxRow]) {
			objSelect.value = 1;
		}
		else {
			objSelect.value = 0;
		}
	}

	// CSS 更新
	CBattleQuickControlAreaComponentManager.RefreshControlCSS();


	//----------------------------------------------------------------
	// 注意書き
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", colspan);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("style", "font-size : smaller");
	HtmlCreateTextNode("セーブ未対応です。", objSpan);

};



/**
 * 展開チェックボックス切り替えイベントハンドラ.
 */
CBattleQuickControlAreaComponentManager.OnClickExtractSwitch = function () {
	// 再構築する
	CBattleQuickControlAreaComponentManager.RebuildControls();
};



/**
 * 時限効果エリア表示イベントハンドラ.
 */
CBattleQuickControlAreaComponentManager.OnClickFocusTimeItemArea = function () {
	CTimeItemAreaComponentManager.FocusArea(0, true);
};



/**
 * 設定変更イベントハンドラ（時限効果）.
 */
CBattleQuickControlAreaComponentManager.OnChangeTimeItemEffective = function (idxConf, dataId) {

	var idx = 0;
	var effectiity = 0;

	// 外部呼出し用に、値を再設定
	HtmlSetObjectValueById("OBJID_SELECT_BATTLE_QUICK_CONTROL_TIME_ITEM_" + idxConf, dataId);

	// 値を取得
	effectiity = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_BATTLE_QUICK_CONTROL_TIME_ITEM_" + idxConf, dataId);
	if (effectiity == 1) {
		g_timeItemConfEffective[idxConf] = true;
	}
	else {
		g_timeItemConfEffective[idxConf] = false;
	}

	// 再計算
	calc();

	// ヘッダ更新
	CBattleQuickControlAreaComponentManager.RefreshBattleQuickControlAreaHeader();

	// コントロール更新
	CBattleQuickControlAreaComponentManager.RefreshControlCSS();
};



/**
 * ヘッダ部品を再設定する.
 */
CBattleQuickControlAreaComponentManager.RefreshBattleQuickControlAreaHeader = function () {

	var idx = 0;

	var confChanged = false;

	var objHeader = null;
	var objMessage = null;

	// 設定変更検査
	for (idx = 0; idx < g_timeItemConfEffective.length; idx++) {
		if (!g_timeItemConfEffective[idx]) {
			confChanged = true;
			break;
		}
	}

	// ヘッダの CSS を調整
	objHeader = document.getElementById("OBJID_BATTLE_QUICK_CONTROL_AREA_HEADER");
	objMessage = document.getElementById("OBJID_BATTLE_QUICK_CONTROL_AREA_HEADER_MESSAGE");

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
CBattleQuickControlAreaComponentManager.RefreshControlCSS = function () {

	var idx = 0;

	var confChanged = false;

	var objSelect = null;

	for (idx = 0; idx < g_timeItemConf.length; idx++) {

		objSelect = document.getElementById("OBJID_SELECT_BATTLE_QUICK_CONTROL_TIME_ITEM_" + idx);

		if (objSelect) {
			if (HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_BATTLE_QUICK_CONTROL_TIME_ITEM_" + idx, 1) != 1) {
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
CBattleQuickControlAreaComponentManager.OpenArea = function () {

	var objSwitch = null;

	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_BATTLE_QUICK_CONTROL_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		objSwitch.checked = "checked";
	}

	// 再構築する
	CBattleQuickControlAreaComponentManager.RebuildControls();
};



/**
 * 設定欄を閉じる.
 */
CBattleQuickControlAreaComponentManager.CloseArea = function () {

	var objSwitch = null;

	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_BATTLE_QUICK_CONTROL_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		objSwitch.checked = null;
	}

	// 再構築する
	CBattleQuickControlAreaComponentManager.RebuildControls();
};



// 初期構築処理
CBattleQuickControlAreaComponentManager.RebuildControls();



