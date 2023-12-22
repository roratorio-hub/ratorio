/**
 * お知らせエリアコンポーネントマネージャクラス.
 */
function CNewsAreaComponentManager () {

}



/**
 * 画面部品を再構築する.
 */
CNewsAreaComponentManager.RebuildControls = function () {

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
	var objStrong = null;
	var objText = null;
	var objSelect = null;
	var objOption = null;
	var objInput = null;
	var objProgress = null;
	var objTextArea = null;
	var objFont = null;
	var objLabel = null;
	var objAnchor = null;
	var objUl = null;
	var objLi = null;

	var objTableSub = null;
	var objTbodySub = null;
	var objTrSub = null;
	var objTdSub = null;
	var objUlSub = null;
	var objLiSub = null;



	colspan = 2;



	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_NEWS_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		switchChecked = objSwitch.checked;
	}



	// 設定欄を初期化
	objRoot = document.getElementById("ID_NEWS_AREA");
	HtmlRemoveAllChild(objRoot);

	// 設定欄テーブルを再構築
	objTable = document.createElement("table");
	objTable.setAttribute("style", "border: solid 1px black; ");
	objRoot.appendChild(objTable);

	objTbody = document.createElement("tbody");
	objTable.appendChild(objTbody);



	// ヘッダ部分を構築
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTd.setAttribute("id", "OBJID_NEWS_AREA_HEADER");
	objTd.setAttribute("colspan", colspan);
	objTd.setAttribute("style", "border: solid 1px black; ");
	objTr.appendChild(objTd);

	// 設定欄展開用チェックボックス
	objInput = document.createElement("input");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_NEWS_AREA_EXTRACT_CHECKBOX");
	objInput.setAttribute("onclick", "CNewsAreaComponentManager.OnClickExtractSwitch()");
	if (switchChecked) {
		// 部品を再構築しているので、チェック状態の再設定が必要
		objInput.setAttribute("checked", "checked");
	}
	objTd.appendChild(objInput);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_NEWS_AREA_EXTRACT_CHECKBOX");
	HtmlCreateTextNode("お知らせ", objLabel);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("id", "OBJID_NEWS_AREA_HEADER_MESSAGE");
	objLabel.setAttribute("for", "OBJID_NEWS_AREA_EXTRACT_CHECKBOX");
//	objLabel.setAttribute("class", "CSSCLS_CONF_USING_MESSAGE_USING");



	// 設定欄のヘッダ部分をリフレッシュ（着色処理等）
	CNewsAreaComponentManager.RefreshBattleQuickControlAreaHeader();

	// 展開表示でなければ、終了
	if (!switchChecked) {
		return;
	}





	//================================================================================================================================
	//
	// 重要なお知らせ
	//
	//================================================================================================================================

	// ヘッダ行
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "border: solid 1px black; ");
	objStrong = HtmlCreateElement("strong", objTd);
	objStrong.setAttribute("style", "margin-left: 1em; color: red;");
	HtmlCreateTextNode("重要なお知らせ", objStrong);

	// 内容行
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "border: solid 1px black;");

	// 内部テーブル
	objTableSub = HtmlCreateElement("table", objTd);
	objTbodySub = HtmlCreateElement("tbody", objTableSub);
	objTrSub = HtmlCreateElement("tr", objTbodySub);
	objTdSub = HtmlCreateElement("td", objTrSub);
	objTdSub.setAttribute("style", "color: red;");
	objUlSub = HtmlCreateElement("ul", objTdSub);

	//----------------------------------------------------------------
	// サーバーメンテナンスのお知らせ
	//----------------------------------------------------------------
/*
	objLiSub = HtmlCreateElement("li", objUlSub);
	HtmlCreateTextNode("2023/03/08（水） 23:00～翌06:00の間、サーバーメンテナンスが行われます。", objLiSub);
	HtmlCreateElement("br", objLiSub);
	HtmlCreateTextNode("該当時間帯には、当サイトへアクセスできない場合がありますので、ご了承ください。", objLiSub);
	HtmlCreateElement("br", objLiSub);
	HtmlCreateTextNode("（普段より長時間のメンテナンスとなるようです。ご注意ください）", objLiSub);
*/
	//----------------------------------------------------------------
	// 四次職業対応／募集中の情報について
	//----------------------------------------------------------------
	objLiSub = HtmlCreateElement("li", objUlSub);
	HtmlCreateTextNode("四次職業対応／募集中の情報は、", objLiSub);
	objAnchor = HtmlCreateElement("a", objLiSub);
	objAnchor.setAttribute("href", "../kousin/patch20231128.html");
	objAnchor.setAttribute("target", "_blank");
	HtmlCreateTextNode("こちら", objAnchor);





	//================================================================================================================================
	//
	// お知らせ
	//
	//================================================================================================================================

	// ヘッダ行
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "border: solid 1px black; ");
	objStrong = HtmlCreateElement("strong", objTd);
	objStrong.setAttribute("style", "margin-left: 1em;");
	HtmlCreateTextNode("対応状況など", objStrong);

	// 内容行
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "border: solid 1px black; ");

	// 内部テーブル
	objTableSub = HtmlCreateElement("table", objTd);
	objTbodySub = HtmlCreateElement("tbody", objTableSub);
	objTrSub = HtmlCreateElement("tr", objTbodySub);
	objTdSub = HtmlCreateElement("td", objTrSub);
	objUlSub = HtmlCreateElement("ul", objTdSub);


	//----------------------------------------------------------------
	// 対応検討中の項目について
	//----------------------------------------------------------------
	objLiSub = HtmlCreateElement("li", objUlSub);
	HtmlCreateTextNode("対応検討中の項目については、", objLiSub);
	objAnchor = HtmlCreateElement("a", objLiSub);
	objAnchor.setAttribute("href", "../kousin/consideration.html");
	objAnchor.setAttribute("target", "_blank");
	HtmlCreateTextNode("こちら", objAnchor);


	//----------------------------------------------------------------
	// 計算機の大幅改造予定について
	//----------------------------------------------------------------
	objLiSub = HtmlCreateElement("li", objUlSub);
	HtmlCreateTextNode("計算機の大幅改造予定については、", objLiSub);
	objAnchor = HtmlCreateElement("a", objLiSub);
	objAnchor.setAttribute("href", "../kousin/working20210202.html");
	objAnchor.setAttribute("target", "_blank");
	HtmlCreateTextNode("こちら", objAnchor);
};



/**
 * 展開チェックボックス切り替えイベントハンドラ.
 */
CNewsAreaComponentManager.OnClickExtractSwitch = function () {
	// 再構築する
	CNewsAreaComponentManager.RebuildControls();
};



/**
 * ヘッダ部品を再設定する.
 */
CNewsAreaComponentManager.RefreshBattleQuickControlAreaHeader = function () {

	var idx = 0;

	var confChanged = false;

	var objHeader = null;
	var objMessage = null;
	var objSpan = null;

	// 設定変更検査
	confChanged = false;

	// ヘッダの CSS を調整
	objHeader = document.getElementById("OBJID_NEWS_AREA_HEADER");
	objMessage = document.getElementById("OBJID_NEWS_AREA_HEADER_MESSAGE");

	if (confChanged) {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER");
		HtmlRemoveAllChild(objMessage);
		objSpan = HtmlCreateElement("span", objMessage);
		objSpan.setAttribute("style", "color: red;");
		HtmlCreateTextNode("　New!!　(2022/11/30)　", objSpan);
	}
	else {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER");
		HtmlRemoveAllChild(objMessage);
	}
};



/**
 * 設定欄を開く.
 */
CNewsAreaComponentManager.OpenArea = function () {

	var objSwitch = null;

	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_NEWS_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		objSwitch.checked = "checked";
	}

	// 再構築する
	CNewsAreaComponentManager.RebuildControls();
};



/**
 * 設定欄を閉じる.
 */
CNewsAreaComponentManager.CloseArea = function () {

	var objSwitch = null;

	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_NEWS_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		objSwitch.checked = null;
	}

	// 再構築する
	CNewsAreaComponentManager.RebuildControls();
};



// 初期構築処理
CNewsAreaComponentManager.RebuildControls();



