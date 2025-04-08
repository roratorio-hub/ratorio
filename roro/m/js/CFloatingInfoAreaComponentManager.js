



//----------------------------------------------------------------
// フローティング情報の種類
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumFloatingInfoIndex",
	[
		"FLOATING_INFO_ID_NONE",

		"FLOATING_INFO_ID_STATUS",
		"FLOATING_INFO_ID_EXTRA_INFO",

		"FLOATING_INFO_ID_NOTICE",
	],
	0,
	1
);



/**
 * フローティング情報の種類のテキストを取得する.
 * @param infoId フローティング情報ID
 */
function GetFloatingInfoText(infoId) {

	switch (infoId) {

	case FLOATING_INFO_ID_NONE:
		return "なし";

	case FLOATING_INFO_ID_STATUS:
		return "ステータス";

	case FLOATING_INFO_ID_EXTRA_INFO:
		return "拡張情報";

	case FLOATING_INFO_ID_NOTICE:
		return "注意事項";
	}

	return "エラー";
}





/**
 * フローティング情報エリア情報ユニット.
 */
function CFloatingInfoAreaInfoUnit () {

	// 選択中の情報ＩＤ
	this.selectedInfoId = FLOATING_INFO_ID_NONE;

	// 拡張情報エリアコンポーネントマネージャ
	this.extraInfoAreaComponentManager = new CExtraInfoAreaComponentManager();
}





/**
 * フローティング情報エリアコンポーネントマネージャクラス.
 */
function CFloatingInfoAreaComponentManager () {

}



/**
 * フローティング情報表示欄数.
 */
CFloatingInfoAreaComponentManager.areaCount = 1;

/**
 * フォントサイズクラス名.
 */
CFloatingInfoAreaComponentManager.fontSizeClassName = "";



/**
 * 情報ユニット配列.
 */
CFloatingInfoAreaComponentManager.infoUnitArray = [
	new CFloatingInfoAreaInfoUnit(),
	new CFloatingInfoAreaInfoUnit(),
	new CFloatingInfoAreaInfoUnit(),
	new CFloatingInfoAreaInfoUnit(),
	new CFloatingInfoAreaInfoUnit(),
];



/**
 * フローティング情報表示欄数（最大値）
 */
CFloatingInfoAreaComponentManager.areaCountMax = CFloatingInfoAreaComponentManager.infoUnitArray.length;



/**
 * 参照するキャラデータ.
 */
CFloatingInfoAreaComponentManager.charaData = null;

/**
 * 参照する特性データ.
 */
CFloatingInfoAreaComponentManager.specData = null;

/**
 * 参照する敵データ.
 */
CFloatingInfoAreaComponentManager.mobData = null;



/**
 * 参照するデータを設定する.
 */
CFloatingInfoAreaComponentManager.setReferData = function (charaData, specData, mobData) {

	var idx = 0;

	CFloatingInfoAreaComponentManager.charaData = charaData;
	CFloatingInfoAreaComponentManager.specData = specData;
	CFloatingInfoAreaComponentManager.mobData = mobData;

	// 関連マネージャにも設定する
	CExtraInfoAreaComponentManager.setReferData(charaData, specData, mobData);
};



/**
 * 画面部品を再構築する.
 */
CFloatingInfoAreaComponentManager.RebuildControls = function () {

	var idx = 0;
	var idxArea = 0;

	var switchChecked = false;

	var objSwitch = null;

	var objRoot = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objDiv = null;
	var objSpan = null;
	var objText = null;
	var objSelect = null;
	var objOption = null;
	var objInput = null;
	var objProgress = null;
	var objTextArea = null;
	var objFont = null;
	var objLabel = null;

	var objTableChild = null;
	var objTbodyChild = null;
	var objTrChild = null;
	var objTdChild = null;

	var optArray = [
		FLOATING_INFO_ID_NONE,
		FLOATING_INFO_ID_STATUS,
		FLOATING_INFO_ID_EXTRA_INFO,
		FLOATING_INFO_ID_NOTICE,
	];



	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		switchChecked = objSwitch.checked;
	}



	// 設定欄を初期化
	objRoot = document.getElementById("ID_FLOATING_INFO_AREA");
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
	objTd.setAttribute("id", "OBJID_FLOATING_INFO_AREA_HEADER");
	objTd.setAttribute("class", "title");
	objTd.setAttribute("colspan", CFloatingInfoAreaComponentManager.areaCount);
	objTr.appendChild(objTd);

	objDiv = HtmlCreateElement("div", objTd);
	objDiv.setAttribute("style", "width: 100%; display: flex; justify-content: space-between; align-items: center;");

	// 設定欄展開用チェックボックス
	objInput = HtmlCreateElement("input", objDiv);
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX");
	objInput.setAttribute("onclick", "CFloatingInfoAreaComponentManager.OnClickExtractSwitch()");
	objInput.setAttribute("style", "flex: 0 1 auto");
	if (switchChecked) {
		// 部品を再構築しているので、チェック状態の再設定が必要
		objInput.setAttribute("checked", "checked");
	}

	objLabel = HtmlCreateElement("label", objDiv);
	objLabel.setAttribute("for", "OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX");
	objLabel.setAttribute("style", "flex: 0 1 auto");
	HtmlCreateTextSpan("カスタム表示", objLabel, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objLabel = HtmlCreateElement("label", objDiv);
	objLabel.setAttribute("id", "OBJID_FLOATING_INFO_AREA_HEADER_MESSAGE");
	objLabel.setAttribute("for", "OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX");
	objLabel.setAttribute("class", "CSSCLS_CONF_USING_MESSAGE_USING");
	objLabel.setAttribute("style", "flex: 1 1 auto");

	// 埋め込み疑似ボタン
	objLabel = HtmlCreateElement("label", objDiv);
	objLabel.setAttribute("id", "OBJID_FLOATING_INFO_AREA_INTO_BODY");
	objLabel.setAttribute("for", "OBJID_CHK_DISABLE_FLOATING");
	objLabel.setAttribute("class", "CSSCLS_FLOATING_INFO_AREA_INTO_BODY");
	objSpan = HtmlCreateTextSpan("", objLabel, CFloatingInfoAreaComponentManager.fontSizeClassName);
	HtmlCreateTextSpan("ページへ埋込", objSpan, "CSSCLS_FLOATING_INFO_AREA_DISP_BUTTON_TEXT");

	// 埋め込み疑似ボタン
	objLabel = HtmlCreateElement("label", objDiv);
	objLabel.setAttribute("id", "OBJID_FLOATING_INFO_AREA_GOTO_FLOAT");
	objLabel.setAttribute("for", "OBJID_CHK_DISABLE_FLOATING");
	objLabel.setAttribute("class", "CSSCLS_FLOATING_INFO_AREA_GOTO_FLOAT");
	objSpan = HtmlCreateTextSpan("", objLabel, CFloatingInfoAreaComponentManager.fontSizeClassName);
	HtmlCreateTextSpan("ページから分離", objSpan, "CSSCLS_FLOATING_INFO_AREA_DISP_BUTTON_TEXT");



	// 設定欄のヘッダ部分をリフレッシュ（着色処理等）
	CFloatingInfoAreaComponentManager.RefreshFloatingInfoAreaHeader();

	// 展開表示でなければ、終了
	if (!switchChecked) {
		return;
	}



	//----------------------------------------------------------------
	// 簡易表示列数セレクトボックス行
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", CFloatingInfoAreaComponentManager.areaCount);

	objTableChild = HtmlCreateElement("table", objTd);
	objTbodyChild = HtmlCreateElement("tbody", objTableChild);

	objTrChild = HtmlCreateElement("tr", objTbodyChild);

	objTdChild = HtmlCreateElement("td", objTrChild);
	HtmlCreateTextSpan("表示欄の数", objTdChild, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTdChild = HtmlCreateElement("td", objTrChild);
	objSelect = HtmlCreateElement("select", objTdChild);
	objSelect.setAttribute("id", "OBJID_SELECT_FLOATING_INFO_AREA_COUNT");
	objSelect.setAttribute("onchange", "CFloatingInfoAreaComponentManager.OnChangeAreaCount()");

	for (idx = 1; idx <= CFloatingInfoAreaComponentManager.areaCountMax; idx++) {
		HtmlCreateElementOption(idx, idx, objSelect);
	}

	objSelect.value = CFloatingInfoAreaComponentManager.areaCount;

	objTdChild = HtmlCreateElement("td", objTrChild);
	HtmlCreateTextSpan("　", objTdChild, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTdChild = HtmlCreateElement("td", objTrChild);
	HtmlCreateTextSpan("文字サイズ", objTdChild, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTdChild = HtmlCreateElement("td", objTrChild);
	objSelect = HtmlCreateElement("select", objTdChild);
	objSelect.setAttribute("id", "OBJID_SELECT_FLOATING_INFO_AREA_FONT_SIZE");
	objSelect.setAttribute("onchange", "CFloatingInfoAreaComponentManager.OnChangeFontSize()");

	HtmlCreateElementOption("CSSCLS_FLOATING_MENU_FONT_SIZE_SMALL_SMALL", "小小", objSelect);
	HtmlCreateElementOption("CSSCLS_FLOATING_MENU_FONT_SIZE_SMALL", "小", objSelect);
	HtmlCreateElementOption("", "普通", objSelect);
	HtmlCreateElementOption("CSSCLS_FLOATING_MENU_FONT_SIZE_LARGE", "大", objSelect);
	HtmlCreateElementOption("CSSCLS_FLOATING_MENU_FONT_SIZE_LARGE_LARGE", "大大", objSelect);

	objSelect.value = CFloatingInfoAreaComponentManager.fontSizeClassName;



	//----------------------------------------------------------------
	// セレクトボックス行
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	for (idxArea = 0; idxArea < CFloatingInfoAreaComponentManager.areaCount; idxArea++) {

		objTd = HtmlCreateElement("td", objTr);

		objTableChild = HtmlCreateElement("table", objTd);
		objTbodyChild = HtmlCreateElement("tbody", objTableChild);

		objTrChild = HtmlCreateElement("tr", objTbodyChild);
		objTdChild = HtmlCreateElement("td", objTrChild);

		objSelect = HtmlCreateElement("select", objTdChild);
		objSelect.setAttribute("id", "OBJID_SELECT_FLOATING_INFO_" + idxArea);
		objSelect.setAttribute("onchange", "CFloatingInfoAreaComponentManager.OnChangeInfo(" + idxArea + ")");

		for (idx = 0; idx < optArray.length; idx++) {
			HtmlCreateElementOption(optArray[idx], GetFloatingInfoText(optArray[idx]), objSelect);
		}

		objSelect.value = CFloatingInfoAreaComponentManager.infoUnitArray[idxArea].selectedInfoId;
	}



	//----------------------------------------------------------------
	// 表示行
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	for (idxArea = 0; idxArea < CFloatingInfoAreaComponentManager.areaCount; idxArea++) {

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_FLOATING_INFO_" + idxArea);
		objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_DISP_TABLE");
	}



	// 初期表示
	CFloatingInfoAreaComponentManager.RebuildDispAreaAll();



	// CSS 更新
	CFloatingInfoAreaComponentManager.RefreshControlCSS();
};



/**
 * 展開チェックボックス切り替えイベントハンドラ.
 */
CFloatingInfoAreaComponentManager.OnClickExtractSwitch = function () {
	// セーブデータ更新
	const status = $("#OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX").prop("checked")?1:0;
	CSaveController.setSettingProp(CSaveDataConst.propNameFloatingInfoAreaSwitch, status);
	// 再構築する
	CFloatingInfoAreaComponentManager.RebuildControls();
	CFloatingInfoAreaComponentManager.LoadFromLocalStorage();
};



/**
 * フローティング情報欄の数変更イベントハンドラ.
 */
CFloatingInfoAreaComponentManager.OnChangeAreaCount = function () {
	// セーブデータ更新
	const count = $("#OBJID_SELECT_FLOATING_INFO_AREA_COUNT").val();
	CSaveController.setSettingProp(CSaveDataConst.propNameFloatingInfoAreaCount, count);
	// 情報欄の数を更新
	CFloatingInfoAreaComponentManager.areaCount = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_FLOATING_INFO_AREA_COUNT", 1);
	// 全部品再構築処理呼び出し
	CFloatingInfoAreaComponentManager.RebuildControls();
};



/**
 * フローティング情報ＩＤ変更イベントハンドラ.
 */
CFloatingInfoAreaComponentManager.OnChangeInfo = function (idxArea) {
	var infoId = 0;
	// フローティング情報ＩＤを取得
	infoId = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_FLOATING_INFO_" + idxArea, 0);
	// 選択中のＩＤを更新
	CFloatingInfoAreaComponentManager.infoUnitArray[idxArea].selectedInfoId = infoId;
	// セーブデータ更新
	CSaveController.setSettingProp(`floatingInfo${idxArea + 1}CategoryName`, infoId);
	// 再構築処理呼び出し
	CFloatingInfoAreaComponentManager.RebuildDispArea(idxArea);
};



/**
 * すべての表示エリアを再構築する.
 */
CFloatingInfoAreaComponentManager.RebuildDispAreaAll = function () {

	var idx = 0;

	// 展開表示されていなければ、処理しない
	if (!HtmlGetObjectCheckedById("OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX", false)) {
		return;
	}

	for (idx = 0; idx < CFloatingInfoAreaComponentManager.areaCount; idx++) {
		CFloatingInfoAreaComponentManager.RebuildDispArea(idx);
	}
}

/**
 * 表示エリアを再構築する.
 * @param infoId フローティング情報ＩＤ
 */
CFloatingInfoAreaComponentManager.RebuildDispArea = function (idxArea) {
	// 指定の種類に応じて再構築
	switch (CFloatingInfoAreaComponentManager.infoUnitArray[idxArea].selectedInfoId) {
		case FLOATING_INFO_ID_STATUS:
			CFloatingInfoAreaComponentManager.RebuildDispAreaStatus(idxArea);
			break;
		case FLOATING_INFO_ID_EXTRA_INFO:
			CFloatingInfoAreaComponentManager.RebuildDispAreaExtraInfo(idxArea);
			break;
		case FLOATING_INFO_ID_NOTICE:
			CFloatingInfoAreaComponentManager.RebuildDispAreaNotice(idxArea);
			break;
		default:
			CFloatingInfoAreaComponentManager.RebuildDispAreaNone(idxArea);
	}
	// 初期表示
	CFloatingInfoAreaComponentManager.RefreshDispArea(idxArea);
	// ヘッダ更新
	CFloatingInfoAreaComponentManager.RefreshFloatingInfoAreaHeader();
	// コントロール更新
	CFloatingInfoAreaComponentManager.RefreshControlCSS();
};



/**
 * すべての表示エリアを再表示する.
 */
CFloatingInfoAreaComponentManager.RefreshDispAreaAll = function () {

	var idx = 0;

	// 展開表示されていなければ、処理しない
	if (!HtmlGetObjectCheckedById("OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX", false)) {
		return;
	}

	for (idx = 0; idx < CFloatingInfoAreaComponentManager.areaCount; idx++) {
		CFloatingInfoAreaComponentManager.RefreshDispArea(idx);
	}
}

/**
 * 表示エリアを再表示する.
 */
CFloatingInfoAreaComponentManager.RefreshDispArea = function (idxArea) {

	// 指定の種類に応じて再構築
	switch (CFloatingInfoAreaComponentManager.infoUnitArray[idxArea].selectedInfoId) {

	case FLOATING_INFO_ID_STATUS:
		CFloatingInfoAreaComponentManager.RefreshDispAreaStatus(idxArea);
		break;

	case FLOATING_INFO_ID_EXTRA_INFO:
		CFloatingInfoAreaComponentManager.RefreshDispAreaExtraInfo(idxArea);
		break;

	case FLOATING_INFO_ID_NOTICE:
		CFloatingInfoAreaComponentManager.RefreshDispAreaNotice(idxArea);
		break;

	default:
		CFloatingInfoAreaComponentManager.RefreshDispAreaNone(idxArea);
	}



	// ヘッダ更新
	CFloatingInfoAreaComponentManager.RefreshFloatingInfoAreaHeader();

	// コントロール更新
	CFloatingInfoAreaComponentManager.RefreshControlCSS();
};



/**
 * ヘッダ部品を再設定する.
 */
CFloatingInfoAreaComponentManager.RefreshFloatingInfoAreaHeader = function () {

	var idx = 0;

	var confChanged = false;

	var objHeader = null;
	var objMessage = null;

	confChanged = false;

	// ヘッダの CSS を調整
	objHeader = document.getElementById("OBJID_FLOATING_INFO_AREA_HEADER");
	objMessage = document.getElementById("OBJID_FLOATING_INFO_AREA_HEADER_MESSAGE");
	if (confChanged) {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER_USED");
		HtmlRemoveAllChild(objMessage);
		HtmlCreateTextSpan("　使用中", objMessage, CFloatingInfoAreaComponentManager.fontSizeClassName);
	}
	else {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER");
		HtmlRemoveAllChild(objMessage);
	}
};



/**
 * コントロール部品の CSS を再設定する.
 */
CFloatingInfoAreaComponentManager.RefreshControlCSS = function () {

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
CFloatingInfoAreaComponentManager.OpenArea = function () {

	var objSwitch = null;

	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		objSwitch.checked = "checked";
	}

	// 再構築する
	CFloatingInfoAreaComponentManager.RebuildControls();
};



/**
 * 設定欄を閉じる.
 */
CFloatingInfoAreaComponentManager.CloseArea = function () {

	var objSwitch = null;

	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		objSwitch.checked = null;
	}

	// 再構築する
	CFloatingInfoAreaComponentManager.RebuildControls();
};



/**
 * 文字サイズ変更イベントハンドラ.
 */
CFloatingInfoAreaComponentManager.OnChangeFontSize = function () {
	// TODO: 文字サイズを相対指定出来るように仕様変更してから有効化する
	// セーブデータ更新
	// const percentage = $("#OBJID_SELECT_FLOATING_INFO_AREA_FONT_SIZE").val();
	// CSaveController.setSettingProp(CSaveDataConst.propNameFloatingInfoAreaFontSize, percentage);

	var className = "";

	// サイズ指定を取得
	className = HtmlGetObjectValueById("OBJID_SELECT_FLOATING_INFO_AREA_FONT_SIZE", "");

	// フォントサイズクラス名更新
	CFloatingInfoAreaComponentManager.fontSizeClassName = className;
	CExtraInfoAreaComponentManager.fontSizeClassName = className;

	// 再構築する
	CFloatingInfoAreaComponentManager.RebuildControls();
};




//--------------------------------------------------------------------------------
// 各フローティング情報ごとの表示欄構築関数ここから
//--------------------------------------------------------------------------------

/**
 * フローティング情報の表示欄を構築する（なし）.
 */
CFloatingInfoAreaComponentManager.RebuildDispAreaNone = function (idxArea) {

	var objRoot = null;

	// 指定の領域をクリア
	objRoot = document.getElementById("OBJID_TD_FLOATING_INFO_" + idxArea);
	HtmlRemoveAllChild(objRoot);
};

/**
 * フローティング情報の表示欄を更新する（なし）.
 */
CFloatingInfoAreaComponentManager.RefreshDispAreaNone = function (idxArea) {

};




/**
 * フローティング情報の表示欄を構築する（ステータス）.
 */
CFloatingInfoAreaComponentManager.RebuildDispAreaStatus = function (idxArea) {

	var objRoot = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;

	// 指定の領域をクリア
	objRoot = document.getElementById("OBJID_TD_FLOATING_INFO_" + idxArea);
	HtmlRemoveAllChild(objRoot);

	// 設定欄テーブルを再構築
	objTable = HtmlCreateElement("table", objRoot);
	objTable.setAttribute("style", "width : 100%;");
	objTbody = HtmlCreateElement("tbody", objTable);

	// 表示欄
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("id", "ID_STATUS_SUMMARY_AREA_" + idxArea);
};

/**
 * フローティング情報の表示欄を更新する（ステータス）.
 */
CFloatingInfoAreaComponentManager.RefreshDispAreaStatus = function (idxArea) {

	var valueWork = 0;
	var textWork = "";

	var objRoot = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;

	// 指定の領域をクリア
	objRoot = document.getElementById("ID_STATUS_SUMMARY_AREA_" + idxArea);
	HtmlRemoveAllChild(objRoot);

	// 設定欄テーブルを再構築
	objTable = HtmlCreateElement("table", objRoot);
	objTable.setAttribute("style", "width : 100%;");
	objTbody = HtmlCreateElement("tbody", objTable);



	// 表示欄


	// 職業
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	objTd.setAttribute("colspan", "4");
	HtmlCreateTextSpan(GetJobName(n_A_JOB), objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// ――――
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "4");
	HtmlCreateElement("hr", objTd);


	// LV
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("LV", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(n_A_BaseLV, objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan("/", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(n_A_JobLV, objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// HP
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("HP", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	objTd.setAttribute("colspan", "3");
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_MAXHP], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// SP
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("SP", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	objTd.setAttribute("colspan", "3");
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_MAXSP], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// ――――
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "4");
	HtmlCreateElement("hr", objTd);


	// STR
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("STR", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(SU_STR, objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan("+", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan((n_A_STR - SU_STR), objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// AGI
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("AGI", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(SU_AGI, objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan("+", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan((n_A_AGI - SU_AGI), objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// VIT
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("VIT", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(SU_VIT, objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan("+", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan((n_A_VIT - SU_VIT), objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// INT
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("INT", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(SU_INT, objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan("+", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan((n_A_INT - SU_INT), objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// DEX
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("DEX", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(SU_DEX, objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan("+", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan((n_A_DEX - SU_DEX), objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// LUK
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("LUK", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(SU_LUK, objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan("+", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan((n_A_LUK - SU_LUK), objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// ――――
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "4");
	HtmlCreateElement("hr", objTd);


	// ATK
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("ATK", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_ATK_LEFT], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan("+", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_ATK_RIGHT], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// MATK
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("MATK", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_MATK_LEFT], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan("+", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_MATK_RIGHT], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// DEF
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("DEF", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_DEF_LEFT], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan("+", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_DEF_RIGHT], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// MDEF
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("MDEF", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_MDEF_LEFT], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan("+", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_MDEF_RIGHT], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// ――――
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "4");
	HtmlCreateElement("hr", objTd);


	// HIT / FLEE
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("HIT / FLEE", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_HIT], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan("/", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_FLEE], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// CRI / LUCKY
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("CRI / LUCKY", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_CRI], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan("/", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_LUCKY], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

if (_APPLY_UPDATE_LV200) {
	if (g_lucky_over > 0) {

		objTr = HtmlCreateElement("tr", objTbody);
		objTr.setAttribute("style", "color: red;");
		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("　　[超過]", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
		HtmlCreateTextSpan("[0]", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
		HtmlCreateTextSpan("/", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

		valueWork = Math.round(g_lucky_over * 10);
		textWork = "" + Math.floor(valueWork / 10);
		if ((valueWork % 10) != 0) {
			textWork += "." + (valueWork % 10);
		}

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
		HtmlCreateTextSpan("[" + textWork + "]", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);
	}
}



	// ASPD
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("ASPD", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	objTd.setAttribute("colspan", "3");
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_ASPD], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);


	// HPR / SPR
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextSpan("HPR / SPR", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_HPR], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan("/", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_FLOATING_INFO_ALIGN_CENTER")
	HtmlCreateTextSpan(CFloatingInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_DISP_SPR], objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);

};



/**
 * フローティング情報の表示欄を構築する（拡張情報）.
 */
CFloatingInfoAreaComponentManager.RebuildDispAreaExtraInfo = function (idxArea) {

	var objRoot = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;

	// 指定の領域をクリア
	objRoot = document.getElementById("OBJID_TD_FLOATING_INFO_" + idxArea);
	HtmlRemoveAllChild(objRoot);

	// 設定欄テーブルを再構築
	objTable = HtmlCreateElement("table", objRoot);
	objTable.setAttribute("style", "width : 100%;");
	objTbody = HtmlCreateElement("tbody", objTable);

	// 表示欄
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("id", "ID_EXTRA_INFO_AREA_" + CFloatingInfoAreaComponentManager.infoUnitArray[idxArea].extraInfoAreaComponentManager.managerInstanceId);
};

/**
 * フローティング情報の表示欄を更新する（拡張情報）.
 */
CFloatingInfoAreaComponentManager.RefreshDispAreaExtraInfo = function (idxArea) {

	// 専用クラスの処理を呼び出す
	CFloatingInfoAreaComponentManager.infoUnitArray[idxArea].extraInfoAreaComponentManager.RebuildControls();
};



/**
 * フローティング情報の表示欄を構築する（注意事項）.
 */
CFloatingInfoAreaComponentManager.RebuildDispAreaNotice = function (idxArea) {

	var idx = 0;

	var objRoot = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;



	// 指定の領域をクリア
	objRoot = document.getElementById("OBJID_TD_FLOATING_INFO_" + idxArea);
	HtmlRemoveAllChild(objRoot);

	// 設定欄テーブルを再構築
	objTable = HtmlCreateElement("table", objRoot);
	objTable.setAttribute("style", "width : 100%;");
	objTbody = HtmlCreateElement("tbody", objTable);

	// 表示欄
	objTr = HtmlCreateElement("tr", objTbody);
	objTd = HtmlCreateElement("td", objTr);

	HtmlCreateTextSpan("※この機能の注意事項", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);
	HtmlCreateElement("br", objTd);

	HtmlCreateTextSpan("・まだテスト段階なので、バグがある可能性があります。", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);
	HtmlCreateElement("br", objTd);
	HtmlCreateTextSpan("　（お気づきの点があれば、連絡フォームからお知らせください）", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);
	HtmlCreateElement("br", objTd);

	HtmlCreateTextSpan("・大量に表示させると、処理が重くなる可能性があります。", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);
	HtmlCreateElement("br", objTd);

	HtmlCreateTextSpan("・セーブ機能／ＵＲＬ出力機能には未対応です。", objTd, CFloatingInfoAreaComponentManager.fontSizeClassName);
	HtmlCreateElement("br", objTd);
};

/**
 * フローティング情報の表示欄を更新する（注意事項）.
 */
CFloatingInfoAreaComponentManager.RefreshDispAreaNotice = function (idxArea) {

};

/**
 * ローカルストレージに保存された状態を復元する
 */
CFloatingInfoAreaComponentManager.LoadFromLocalStorage = function () {
	// 表示欄の数を設定する
	const floating_info_area_count = Number(CSaveController.getSettingProp(CSaveDataConst.propNameFloatingInfoAreaCount));
    $("#OBJID_SELECT_FLOATING_INFO_AREA_COUNT").val(floating_info_area_count);
    $("#OBJID_SELECT_FLOATING_INFO_AREA_COUNT").trigger("change");
	// 文字サイズを設定する
	//      TODO: 文字サイズを相対指定出来るようになってから実装する
	for (let i=0; floating_info_area_count > i; i++) {
		// カスタム表示本体を設定する
		const category_id = Number(CSaveController.getSettingProp(`floatingInfo${i + 1}CategoryName`));
		const info_id = Number(CSaveController.getSettingProp(`floatingInfo${i + 1}InfoName`));
    	$(`#OBJID_SELECT_FLOATING_INFO_${i}`).val(category_id);
    	$(`#OBJID_SELECT_FLOATING_INFO_${i}`).trigger("change");
    	$(`#OBJID_SELECT_EXTRA_INFO_${i + 1}`).val(info_id);
    	$(`#OBJID_SELECT_EXTRA_INFO_${i + 1}`).trigger("change");
	}	
}






//--------------------------------------------------------------------------------
// 各フローティング情報ごとの表示欄構築関数ここまで
//--------------------------------------------------------------------------------



// 初期構築処理
CFloatingInfoAreaComponentManager.RebuildControls();



