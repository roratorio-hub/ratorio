// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();





/**
 * テストエリアコンポーネントマネージャクラス.
 */
function CMigTesterAreaComponentManager () {

}



/**
 * 画面部品を再構築する.
 */
CMigTesterAreaComponentManager.RebuildControls = function () {

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
	colspan = 5;



	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_TESTER_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		switchChecked = objSwitch.checked;
	}



	// 設定欄を初期化
	objRoot = document.getElementById("ID_TESTER_AREA");
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
	objTd.setAttribute("id", "OBJID_TESTER_AREA_HEADER");
	objTd.setAttribute("class", "title");
	objTd.setAttribute("colspan", colspan);
	objTr.appendChild(objTd);

	// 設定欄展開用チェックボックス
	objInput = document.createElement("input");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_TESTER_AREA_EXTRACT_CHECKBOX");
	objInput.setAttribute("onclick", "CMigTesterAreaComponentManager.OnClickExtractSwitch()");
	if (switchChecked) {
		// 部品を再構築しているので、チェック状態の再設定が必要
		objInput.setAttribute("checked", "checked");
	}
	objTd.appendChild(objInput);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_TESTER_AREA_EXTRACT_CHECKBOX");
	HtmlCreateTextNode("テスト機能", objLabel);



	// 設定欄のヘッダ部分をリフレッシュ（着色処理等）
	CMigTesterAreaComponentManager.RefreshTesterAreaHeader();

	// 展開表示でなければ、終了
	if (!switchChecked) {
		return;
	}



	//----------------------------------------------------------------
	// テストケース作成ブロック
	//----------------------------------------------------------------

	//----------------
	// １段目
	//----------------
	objTr = HtmlCreateElement("tr", objTbody);

	// ブロックラベル表示
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", 3);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("テストケース作成", objTd);

	// 結果出力エリア（共用）
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("rowspan", "11");
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_TESTER_OUTPUT");
	objTextArea.setAttribute("cols", "108");
	objTextArea.setAttribute("rows", "40");
	objTextArea.setAttribute("readonly", "readonly");
	objTextArea.setAttribute("style", "resize : none;");


	//----------------
	// ２段目
	//----------------
	objTr = HtmlCreateElement("tr", objTbody);

	// 種別ラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("テスト種別", objTd);

	// 種別選択セレクトボックス
	objTd = HtmlCreateElement("td", objTr);
	objSelect = HtmlCreateElement("select", objTd);
	objSelect.setAttribute("id", "OBJID_SELECT_CREATE_TEST_KIND");
	EnumConstDataKind.For(
		function (idx, name, value) {
			HtmlCreateElementOption(value, GetConstDataKindText(value), objSelect);
		},
		[
			"CONST_DATA_KIND_NONE"
		]
	);
	objSelect.setAttribute("disabled", "disabled");

	// 作成ボタン
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("rowspan", 3);
	objTd.setAttribute("style", "text-align : center;");
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "作成");
	objInput.setAttribute("onclick", "CMigTesterAreaComponentManager.OnClickCreateTest()");


	//----------------
	// ３段目
	//----------------
	objTr = HtmlCreateElement("tr", objTbody);

	// 処理モードラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("処理モード", objTd);

	// 処理モード選択セレクトボックス
	objTd = HtmlCreateElement("td", objTr);
	objSelect = HtmlCreateElement("select", objTd);
	objSelect.setAttribute("id", "OBJID_SELECT_CREATE_TEST_PROC_MODE");
	HtmlCreateElementOption(0, "通常", objSelect);
	HtmlCreateElementOption(1, "データ移行", objSelect);
	// TODO: データ移行過渡処理
	if (IsEnableMigrationBlockTransit()) {
		objSelect.value = 1;
	}
	objSelect.setAttribute("disabled", "disabled");

	// スペーサ
	HtmlCreateTextNode("　", objTd);

	// 入力モード選択セレクトボックス
	objSelect = HtmlCreateElement("select", objTd);
	objSelect.setAttribute("id", "OBJID_SELECT_CREATE_TEST_INPUT_MODE");
	objSelect.setAttribute("onchange", "CMigTesterAreaComponentManager.OnChangeCreateTestInputMode()");
	HtmlCreateElementOption(0, "直接入力", objSelect);
	HtmlCreateElementOption(1, "ファイル入力", objSelect);
	objSelect.value = 1;


	//----------------
	// ４段目
	//----------------
	objTr = HtmlCreateElement("tr", objTbody);

	// RRTTTLファイル入力ラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("RRTTTL", objTd);

	// RRTTTLファイル選択
	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_CREATE_TEST_BULK_FILES");
	objInput.setAttribute("type", "file");
	objInput.setAttribute("accept", ".rrtttl");
	objInput.setAttribute("disabled", "disabled");
	objInput.setAttribute("multiple", "multiple");


	//----------------
	// ５段目
	//----------------
	objTr = HtmlCreateElement("tr", objTbody);

	// テスト作成用データの入力キストエリア
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", 3);
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_CREATE_TEST_INPUT");
	objTextArea.setAttribute("cols", "58");
	objTextArea.setAttribute("rows", "9");
	objTextArea.setAttribute("style", "resize : none;");



	//----------------------------------------------------------------
	// テストケース実行用コントロールブロック
	//----------------------------------------------------------------

	//----------------
	// １段目
	//----------------
	objTr = HtmlCreateElement("tr", objTbody);

	// ブロックラベル表示
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", 3);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("テストケース実行", objTd);


	//----------------
	// ２段目
	//----------------
	objTr = HtmlCreateElement("tr", objTbody);

	// 処理モードラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("処理モード", objTd);

	// 処理モード選択セレクトボックス
	objTd = HtmlCreateElement("td", objTr);
	objSelect = HtmlCreateElement("select", objTd);
	objSelect.setAttribute("id", "OBJID_SELECT_EXEC_TEST_PROC_MODE");
	HtmlCreateElementOption(0, "通常", objSelect);
	HtmlCreateElementOption(1, "データ移行", objSelect);
	// TODO: データ移行過渡処理
	if (IsEnableMigrationBlockTransit()) {
		objSelect.value = 1;
	}
	objSelect.setAttribute("disabled", "disabled");

	// スペーサ
	HtmlCreateTextNode("　", objTd);

	// 入力モード選択セレクトボックス
	objSelect = HtmlCreateElement("select", objTd);
	objSelect.setAttribute("id", "OBJID_SELECT_EXEC_TEST_INPUT_MODE");
	objSelect.setAttribute("onchange", "CMigTesterAreaComponentManager.OnChangeExecTestInputMode()");
	HtmlCreateElementOption(0, "個別入力", objSelect);
	HtmlCreateElementOption(1, "ファイル入力", objSelect);
	objSelect.value = 1;

	// 実行ボタン
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("rowspan", 2);
	objTd.setAttribute("style", "text-align : center;");
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "実行");
	objInput.setAttribute("onclick", "CMigTesterAreaComponentManager.OnClickExecTest()");


	//----------------
	// ３段目
	//----------------
	objTr = HtmlCreateElement("tr", objTbody);

	// RRTTSTファイル入力ラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("RRTTST", objTd);

	// RRTTSTファイル選択
	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_EXEC_TEST_BULK_FILES");
	objInput.setAttribute("type", "file");
	objInput.setAttribute("accept", ".rrttst");
	objInput.setAttribute("disabled", "disabled");
	objInput.setAttribute("multiple", "multiple");


	//----------------
	// ４段目
	//----------------
	objTr = HtmlCreateElement("tr", objTbody);

	// テスト実行用データの入力キストエリア
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", 3);
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_EXEC_TEST_INPUT");
	objTextArea.setAttribute("cols", "58");
	objTextArea.setAttribute("rows", "9");
	objTextArea.setAttribute("style", "resize : none;");



	//----------------------------------------------------------------
	// カバレッジ用コントロールブロック
	//----------------------------------------------------------------

	//----------------
	// １段目
	//----------------
	objTr = HtmlCreateElement("tr", objTbody);

	// ブロックラベル表示
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", 3);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("カバレッジ", objTd);


	//----------------
	// ２段目
	//----------------
	objTr = HtmlCreateElement("tr", objTbody);

	// 実行ボタン
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", 3);
	objTd.setAttribute("style", "text-align : center;");
	objA = HtmlCreateElement("a", objTd);
	objA.setAttribute("href", "migcov.html");
	objA.setAttribute("target", "_blank");
	HtmlCreateTextNode("ページ表示", objA);



	//----------------------------------------------------------------
	// 情報表示用コントロールブロック
	//----------------------------------------------------------------

	//----------------
	// １段目
	//----------------
	objTr = HtmlCreateElement("tr", objTbody);

	// 情報欄
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", 4);
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_TESTER_INFO");
	objTextArea.setAttribute("cols", "170");
	objTextArea.setAttribute("rows", "10");
	objTextArea.setAttribute("style", "resize : none;");





	//----------------------------------------------------------------
	// 初期表示
	//----------------------------------------------------------------
	CMigTesterAreaComponentManager.OnChangeCreateTestInputMode();
	CMigTesterAreaComponentManager.OnChangeExecTestInputMode();

};



/**
 * 展開チェックボックス切り替えイベントハンドラ.
 */
CMigTesterAreaComponentManager.OnClickExtractSwitch = function () {
	// 再構築する
	CMigTesterAreaComponentManager.RebuildControls();
};



/**
 * ヘッダ部品を再設定する.
 */
CMigTesterAreaComponentManager.RefreshTesterAreaHeader = function () {

	var switchChecked = false;

	var objSwitch = null;
	var objHeader = null;

	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_TESTER_AREA_EXTRACT_CHECKBOX");
	switchChecked = objSwitch.checked;

	// ヘッダの CSS を調整
	objHeader = document.getElementById("OBJID_TESTER_AREA_HEADER");
	if (switchChecked) {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER_USED");
	}
	else {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER");
	}
};



/**
 * 入力モード変更イベントハンドラ.
 */
CMigTesterAreaComponentManager.OnChangeCreateTestInputMode = function () {

	var inputMode = 0;

	// 入力モード取得
	inputMode = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_CREATE_TEST_INPUT_MODE", 0);

	switch (inputMode) {

	case 0:
		document.getElementById("OBJID_INPUT_CREATE_TEST_BULK_FILES").setAttribute("disabled", "disabled");
		document.getElementById("OBJID_TEXTAREA_CREATE_TEST_INPUT").removeAttribute("disabled");
		break;

	case 1:
		document.getElementById("OBJID_INPUT_CREATE_TEST_BULK_FILES").removeAttribute("disabled");
		document.getElementById("OBJID_TEXTAREA_CREATE_TEST_INPUT").setAttribute("disabled", "disabled");
		break;
	}
};

/**
 * テストケース実行用入力モード変更イベントハンドラ.
 */
CMigTesterAreaComponentManager.OnChangeExecTestInputMode = function () {

	var inputMode = 0;

	// 入力モード取得
	inputMode = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXEC_TEST_INPUT_MODE", 0);

	switch (inputMode) {

	case 0:
		document.getElementById("OBJID_INPUT_EXEC_TEST_BULK_FILES").setAttribute("disabled", "disabled");
		document.getElementById("OBJID_TEXTAREA_EXEC_TEST_INPUT").removeAttribute("disabled");
		break;

	case 1:
		document.getElementById("OBJID_INPUT_EXEC_TEST_BULK_FILES").removeAttribute("disabled");
		document.getElementById("OBJID_TEXTAREA_EXEC_TEST_INPUT").setAttribute("disabled", "disabled");
		break;
	}
};



/**
 * 作成ボタン押下イベントハンドラ.
 */
CMigTesterAreaComponentManager.OnClickCreateTest = function () {

	var ret = null;

	var dataKind = 0;
	var procMode = 0;
	var inputMode = 0;



	// 確認メッセージ
	if (!confirm("テストケース作成を開始します。\nこの処理には非常に時間がかかる場合があります。\n\n進行状況は、ブラウザのコンソールで確認してください。\n\n処理を開始してもよろしいですか？")) {
		return;
	}



	// データ種別取得
	dataKind = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_CREATE_TEST_KIND", 0);

	// 処理モード取得
	procMode = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_CREATE_TEST_PROC_MODE", 0);

	// 入力モード取得
	inputMode = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_CREATE_TEST_INPUT_MODE", 0);



	// 処理振り分け
	switch (inputMode) {

	case 0:
		ret = CMigTesterAreaComponentManager.CreateTestDriverSingleInput(dataKind, procMode);

		// 同期処理なので、すぐに終了時処理を呼び出す
		CMigTesterAreaComponentManager.OnCreateTestEnd(ret);
		break;

	case 1:
		ret = CMigTesterAreaComponentManager.CreateTestDriverBulkInput(dataKind, procMode);

		// 非同期処理なので、すぐには終了時処理を呼び出さない
		break;
	}
};



/**
 * 実行ボタン押下イベントハンドラ.
 */
CMigTesterAreaComponentManager.OnClickExecTest = function () {

	var ret = null;

	var procMode = 0;
	var inputMode = 0;



	// 確認メッセージ
	if (!confirm("テストケース実行を開始します。\nこの処理には非常に時間がかかる場合があります。\n\n進行状況は、ブラウザのコンソールで確認してください。\n\n処理を開始してもよろしいですか？")) {
		return;
	}



	// 処理モード取得
	procMode = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXEC_TEST_PROC_MODE", 0);

	// 入力モード取得
	inputMode = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXEC_TEST_INPUT_MODE", 0);



	// 処理振り分け
	switch (inputMode) {

	case 0:
		CMigTesterAreaComponentManager.ExecTestDriverSingleInput(procMode);
		break;

	case 1:
		CMigTesterAreaComponentManager.ExecTestDriverBulkInput(procMode);
		break;
	}
};















//================================================================================================================================
//
//
// テストケース作成関連
//
//
//================================================================================================================================

/**
 * テストケース作成処理ドライバ（個別入力）.
 * @param dataKind データ種別
 * @param procMode 処理モード
 */
CMigTesterAreaComponentManager.CreateTestDriverSingleInput = function (dataKind, procMode) {

	var idx = 0;
	var ret = null;

	var inputtedText = "";
	var inputtedArray = null;
	var dataIdText = "";
	var dataId = 0;
	var dataIdArray = null;

	var retSucceeded = false;
	var retInfoText = "";
	var retOutputText = "";
	var retAlertText = "";



	// 入力データ取得
	inputtedText = HtmlGetObjectValueById("OBJID_TEXTAREA_CREATE_TEST_INPUT", "");

	// エラーチェック
	if (inputtedText.length == 0) {
		return [false, "テスト対象テキスト未入力", "", "テスト対象テキスト未入力"];
	}



	// 入力データを元に、IDへ変換する
	dataIdArray = CMigTesterAreaComponentManager.GetTestTargetIdArray(inputtedText);

	if (!dataIdArray) {
		return [false, "テストケース生成データ入力で解析不能（" + dataIdText + "）", "", "テストケース生成データ入力で解析不能"];
	}



	// すべてのIDについて、テストケースを作成
	retSucceeded = true;
	retInfoText = "";
	retOutputText = "";
	retAlertText = "";
	for (idx = 0; idx < dataIdArray.length; idx++) {

		dataId = dataIdArray[idx];

		ret = CMigTesterAreaComponentManager.CreateTestCase(idx, dataIdArray.length, dataKind, dataId);

		retSucceeded &= ret[0];
		retInfoText += (ret[1] != "") ? (ret[1] + "\n") : "";
		retOutputText += (ret[2] != "") ? (ret[2] + ("\n").repeat(3)) : "";
		retAlertText += (ret[3] != "") ? (ret[3] + "\n") : "";
	}



	// 終了処理
	return [retSucceeded, retInfoText, retOutputText, retAlertText];
};

/**
 * テスト対象リストテキストをパースしてデータIDの配列にする.
 * @param testTargetListText テスト対象リストテキスト
 * @return データIDの配列（失敗時は null）
 */
CMigTesterAreaComponentManager.GetTestTargetIdArray = function (testTargetListText) {

	var idx = 0;

	var inputtedArray = null;
	var dataId = 0;
	var dataIdText = "";
	var dataIdArray = null;

	// カンマで分割
	inputtedArray = testTargetListText.split(/(?:(?:,)|(?:(?:\r)?\n))/);

	// ひとつずつ処理
	dataIdArray = [];
	for (idx = 0; idx < inputtedArray.length; idx++) {

		// カンマ分割されたデータID指定テキストを取得
		dataIdText = inputtedArray[idx];
		dataIdText = dataIdText.trim();

		// 空要素は無視
		if (dataIdText == "") {
			continue;
		}

		// 数値変換可能の場合、そのまま数値変換して追加する
		if (!isNaN(dataIdText)) {

			dataId = Number(dataIdText);

			if (Math.floor(dataId) == dataIdText) {
				dataIdArray.push(dataId);
				continue;
			}
		}

		// 数値変換不能の場合、定数として検索する
		dataId = GetVarValue(dataIdText);

		if (dataId !== undefined) {
			dataIdArray.push(dataId);
			continue;
		}

		// ここに来るならば、いずれの方法でも解釈不可能
		return null;
	}

	return dataIdArray;
};



/**
 * テストケース作成処理ドライバ（バルク入力）.
 * @param dataKind データ種別
 * @param procMode 処理モード
 */
CMigTesterAreaComponentManager.CreateTestDriverBulkInput = function (dataKind, procMode) {

	var inputtedFileList = null;

	// ファイルリスト取得
	inputtedFileList = document.getElementById("OBJID_INPUT_CREATE_TEST_BULK_FILES").files;

	// エラーチェック
	if (!inputtedFileList) {
		return [false, "ファイルリスト取得失敗", "", "ファイルリスト取得失敗"];
	}
	if (inputtedFileList.length == 0) {
		return [false, "ファイルリストが空", "", "ファイルリストが空"];
	}

	// バルク入力処理開始
	CMigTesterAreaComponentManager.CreateTestBulkInputBegin(dataKind, procMode, inputtedFileList, CMigTesterAreaComponentManager.OnCreateTestEnd);
};



/**
 * テストケース作成処理終了イベントハンドラ.
 */
CMigTesterAreaComponentManager.OnCreateTestEnd = function (ret) {

	// 結果出力
	HtmlSetObjectValueById("OBJID_TEXTAREA_TESTER_INFO", ret[1]);
	HtmlSetObjectValueById("OBJID_TEXTAREA_TESTER_OUTPUT", ret[2]);

	// アラート出力
	if (ret[3].length != 0) {
		alert(ret[3]);
	}
};



/**
 * 個別入力でテストケースを作成する.
 * @param procIndex これから処理するインデックス
 * @param procCount 処理する全体数
 * @param dataKind データ種別
 * @param dataId データID
 */
CMigTesterAreaComponentManager.CreateTestCase = function (procIndex, procCount, dataKind, dataId) {

	var idx = 0;

	var testCaseArray = null;
	var outputData = "";



	// テストケース生成
	testCaseArray = CMigTesterAreaComponentManager.CreateTestCaseSub(procIndex, procCount, dataKind, dataId);

	// 結果判定
	if (!testCaseArray) {
		return [true, "テストケース作成失敗", "", "テストケース作成失敗"];
	}



	// テストケースファイルの出力内容を組み立てる
	outputData = "";
	for (idx = 0; idx < testCaseArray.length; idx++) {
		outputData += "\"" + testCaseArray[idx].labelObject.GetLabel() + "\"" + "," + "\"" + testCaseArray[idx].dataURL + "\"\n";
	}

	// ファイル出力
	CMigTesterAreaComponentManager.OutputTestCaseDataFile(dataKind, dataId, outputData);

	return [true, "成功", outputData, ""];
};



/**
 * テストケースの配列を作成する.
 * @param procIndex これから処理するインデックス
 * @param procCount 処理する全体数
 * @param dataKind データ種別
 * @param dataId データID
 */
CMigTesterAreaComponentManager.CreateTestCaseSub = function (procIndex, procCount, dataKind, dataId) {

	// テスト処理呼び出し
	switch (dataKind) {

	case CONST_DATA_KIND_ITEM:
		return CMigItemDataTest.CreateTestCaseArrayItemDataMigration(procIndex, procCount, dataId);

	}

	return null;
};



//--------------------------------------------------------------------------------------------------------------------------------
//
// バルク入力関連　ここから
//
//--------------------------------------------------------------------------------------------------------------------------------

CMigTesterAreaComponentManager.dataKind = 0;
CMigTesterAreaComponentManager.procMode = 0;
CMigTesterAreaComponentManager.bulkInputRunningLabel = "";
CMigTesterAreaComponentManager.bulkInputInputtedFile = null;
CMigTesterAreaComponentManager.bulkInputInputtedFileArray = null;
CMigTesterAreaComponentManager.bulkInputProcFileIndex = 0;
CMigTesterAreaComponentManager.bulkInputInputtedIdStr = "";
CMigTesterAreaComponentManager.bulkInputInputtedName = "";
CMigTesterAreaComponentManager.bulkInputInputtedKana = "";
CMigTesterAreaComponentManager.bulkInputInputtedText = "";
CMigTesterAreaComponentManager.bulkInputFileReader = null;
CMigTesterAreaComponentManager.bulkInputResultSucceeded = false;
CMigTesterAreaComponentManager.bulkInputResultTestInfoText = "";
CMigTesterAreaComponentManager.bulkInputResultOutputTextArray = null;
CMigTesterAreaComponentManager.bulkInputResultAlertText = "";
CMigTesterAreaComponentManager.bulkInputFuncAfterBulkEnd = null;

/**
 * バルク入力処理で読み込みを開始する.
 */
CMigTesterAreaComponentManager.CreateTestBulkInputBegin = function (dataKind, procMode, inputtedFileList, funcAfterBulkEnd) {

	// バルク入力処理関連の変数を設定
	CMigTesterAreaComponentManager.dataKind = dataKind;
	CMigTesterAreaComponentManager.procMode = procMode;
	CMigTesterAreaComponentManager.bulkInputRunningLabel = "";
	CMigTesterAreaComponentManager.bulkInputInputtedFile = null;
	CMigTesterAreaComponentManager.bulkInputInputtedFileArray = inputtedFileList;
	CMigTesterAreaComponentManager.bulkInputProcFileIndex = 0;
	CMigTesterAreaComponentManager.bulkInputInputtedIdStr = "";
	CMigTesterAreaComponentManager.bulkInputInputtedName = "";
	CMigTesterAreaComponentManager.bulkInputInputtedKana = "";
	CMigTesterAreaComponentManager.bulkInputInputtedText = "";
	CMigTesterAreaComponentManager.bulkInputFileReader = null;
	CMigTesterAreaComponentManager.bulkInputResultSucceeded = true;
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText = "";
	CMigTesterAreaComponentManager.bulkInputResultOutputTextArray = [];
	CMigTesterAreaComponentManager.bulkInputResultAlertText = "";
	CMigTesterAreaComponentManager.bulkInputFuncAfterBulkEnd = funcAfterBulkEnd;

	// 次を読み込む
	CMigTesterAreaComponentManager.CreateTestBulkInputNext();
};

/**
 * バルク入力処理で次を読み込む.
 */
CMigTesterAreaComponentManager.CreateTestBulkInputNext = function () {

	var fileNameFragmentArray = null;



	// 終端判定
	if (CMigTesterAreaComponentManager.bulkInputProcFileIndex >= CMigTesterAreaComponentManager.bulkInputInputtedFileArray.length) {
		CMigTesterAreaComponentManager.CreateTestBulkInputEnd();
		return;
	}



	// ファイル情報取得
	CMigTesterAreaComponentManager.bulkInputInputtedFile = CMigTesterAreaComponentManager.bulkInputInputtedFileArray[CMigTesterAreaComponentManager.bulkInputProcFileIndex];



	// ファイルリーダ用意
	CMigTesterAreaComponentManager.bulkInputFileReader = new FileReader();
	CMigTesterAreaComponentManager.bulkInputFileReader.onabort = CMigTesterAreaComponentManager.CreateTestBulkInputFileReaderOnAbort;
	CMigTesterAreaComponentManager.bulkInputFileReader.onerror = CMigTesterAreaComponentManager.CreateTestBulkInputFileReaderOnError;
	CMigTesterAreaComponentManager.bulkInputFileReader.onload = CMigTesterAreaComponentManager.CreateTestBulkInputFileReaderOnLoad;

	// ファイル読み込み開始
	CMigTesterAreaComponentManager.bulkInputFileReader.readAsText(CMigTesterAreaComponentManager.bulkInputInputtedFile);
};

/**
 * バルク入力処理ファイルリーダ中断発生イベントハンドラ.
 */
CMigTesterAreaComponentManager.CreateTestBulkInputFileReaderOnAbort = function (evt) {

	// 中断されたことを示すメッセージを出力
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "【中断】\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイルの読み込みが中断されました。\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイル名：" + CMigTesterAreaComponentManager.bulkInputInputtedFile.name + "\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";

	// 処理失敗フラグを設定
	CMigTesterAreaComponentManager.bulkInputResultSucceeded = false;

	// 次の読み込みへ
	CMigTesterAreaComponentManager.bulkInputProcFileIndex++;
	CMigTesterAreaComponentManager.CreateTestBulkInputNext();
};

/**
 * バルク入力処理ファイルリーダエラー発生イベントハンドラ.
 */
CMigTesterAreaComponentManager.CreateTestBulkInputFileReaderOnError = function (evt) {

	// 中断されたことを示すメッセージを出力
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "【エラー】\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイルの読み込みでエラーが発生しました。\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイル名：" + CMigTesterAreaComponentManager.bulkInputInputtedFile.name + "\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "エラー名：" + CMigTesterAreaComponentManager.bulkInputFileReader.error.name + "\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "エラー内容：" + CMigTesterAreaComponentManager.bulkInputFileReader.error.message + "\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";

	// 処理失敗フラグを設定
	CMigTesterAreaComponentManager.bulkInputResultSucceeded = false;

	// 次の読み込みへ
	CMigTesterAreaComponentManager.bulkInputProcFileIndex++;
	CMigTesterAreaComponentManager.CreateTestBulkInputNext();
};

/**
 * バルク入力処理ファイルリーダ読み込み完了イベントハンドラ.
 */
CMigTesterAreaComponentManager.CreateTestBulkInputFileReaderOnLoad = function (evt) {

	var idx = 0;
	var ret = null;

	var inputtedArray = null;
	var dataIdArray = null;



	// 読み込んだデータを取得
	CMigTesterAreaComponentManager.bulkInputInputtedText = evt.target.result;

	// データ検査
	if (CMigTesterAreaComponentManager.bulkInputInputtedText.length == 0) {

		// 検査不適合を示すメッセージを出力
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "【エラー】\n";
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイルから読み込んだテキストが空です。\n";
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイル名：" + CMigTesterAreaComponentManager.bulkInputInputtedFile.name + "\n";
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";

		// 次の読み込みへ
		CMigTesterAreaComponentManager.bulkInputProcFileIndex++;
		CMigTesterAreaComponentManager.CreateTestBulkInputNext();

		return;
	}



	// 読み込んだデータを元に、IDへ変換する
	dataIdArray = CMigTesterAreaComponentManager.GetTestTargetIdArray(CMigTesterAreaComponentManager.bulkInputInputtedText);

	if (!dataIdArray) {

		// 検査不適合を示すメッセージを出力
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "【エラー】\n";
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイルから読み込んだテキストの、データＩＤ指定が解析不能です。\n";
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイル名：" + CMigTesterAreaComponentManager.bulkInputInputtedFile.name + "\n";
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "データＩＤ：" + dataIdText + "\n";
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";

		// 次の読み込みへ
		CMigTesterAreaComponentManager.bulkInputProcFileIndex++;
		CMigTesterAreaComponentManager.CreateTestBulkInputNext();

		return;
	}



	// すべてのIDについて、テストケースを作成
	for (idx = 0; idx < dataIdArray.length; idx++) {

		dataId = dataIdArray[idx];

		ret = CMigTesterAreaComponentManager.CreateTestCase(idx, dataIdArray.length, CMigTesterAreaComponentManager.dataKind, dataId);

		// 結果判定
		if (!ret) {

			// 成功フラグを落とす
			CMigTesterAreaComponentManager.bulkInputResultSucceeded = false;

			// 検査不適合を示すメッセージを出力
			CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";
			CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "【エラー】\n";
			CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "テストケース作成処理が異常終了しました。\n";
			CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイル名：" + CMigTesterAreaComponentManager.bulkInputInputtedFile.name + "\n";
			CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "データＩＤ：" + dataId + "\n";
			CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";

			// 次の読み込みへ
			CMigTesterAreaComponentManager.bulkInputProcFileIndex++;
			CMigTesterAreaComponentManager.CreateTestBulkInputNext();

			return;
		}

		// 結果を格納
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "成功（" + CMigTesterAreaComponentManager.bulkInputInputtedName + "）\n";
		CMigTesterAreaComponentManager.bulkInputResultOutputTextArray.push(ret[2]);
		CMigTesterAreaComponentManager.bulkInputResultOutputTextArray.push(("\r\n").repeat(3));
	}



	// 次の読み込みインデックスを設定
	CMigTesterAreaComponentManager.bulkInputProcFileIndex++;
	CMigTesterAreaComponentManager.CreateTestBulkInputNext();
};

/**
 * バルク入力終了イベントハンドラ.
 */
CMigTesterAreaComponentManager.CreateTestBulkInputEnd = function () {

	var idx = 0;
	var ret = null;

	var outputText = "";



	// 処理に成功している場合のみ、ファイル出力
	if (CMigTesterAreaComponentManager.bulkInputResultSucceeded) {

		// テスト結果組み立て
		for (idx = 0; idx < CMigTesterAreaComponentManager.bulkInputResultOutputTextArray.length; idx++) {
			outputText += CMigTesterAreaComponentManager.bulkInputResultOutputTextArray[idx] + "\n";
		}

		// ファイル出力
		// CMigTesterAreaComponentManager.OutputTestCaseDataFile(CMigTesterAreaComponentManager.dataKind, -1, outputText);
	}



	ret = [
		CMigTesterAreaComponentManager.bulkInputResultSucceeded,
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText,
		outputText,
		CMigTesterAreaComponentManager.bulkInputResultSucceeded ? "" : "問題のある処理がありました。",
	];



	CMigTesterAreaComponentManager.bulkInputFuncAfterBulkEnd(ret);
};















//================================================================================================================================
//
//
// テストケース実行関連
//
//
//================================================================================================================================

/**
 * テストケース実行処理ドライバ（個別入力）.
 * @param procMode 処理モード
 */
CMigTesterAreaComponentManager.ExecTestDriverSingleInput = function (procMode) {

	var idx = 0;
	var ret = null;

	var inputtedText = "";
	var execInfoArray = null;
	var testLabel = "";
	var dataURL = "";

	var retSucceeded = false;
	var retInfoText = "";
	var retOutputText = "";
	var retAlertText = "";



	// 入力データ取得
	inputtedText = HtmlGetObjectValueById("OBJID_TEXTAREA_EXEC_TEST_INPUT", "");

	// エラーチェック
	if (inputtedText.length == 0) {
		return [false, "テスト対象テキスト未入力", "", "テスト対象テキスト未入力"];
	}



	// 入力データを元に、テストケース情報へ変換する
	execInfoArray = CMigTesterAreaComponentManager.GetExecInfoArray(inputtedText);



	// すべてのテストケースを実行
	retSucceeded = true;
	retInfoText = "";
	retOutputText = "";
	retAlertText = "";

	for (idx = 0; idx < execInfoArray.length; idx++) {

		testLabel = execInfoArray[idx][0];
		dataURL = execInfoArray[idx][1];

		ret = CMigTesterAreaComponentManager.ExecTestCase("", "", "", idx + 1, execInfoArray.length, 1, 1, testLabel, dataURL);

		retSucceeded &= ret[0];
		retInfoText += (ret[1] != "") ? (ret[1] + "\n") : "";
		retOutputText += (ret[2] != "") ? (ret[2] + ("\n").repeat(3)) : "";
		retAlertText += (ret[3] != "") ? (ret[3] + "\n") : "";
	}



	// 終了処理
	CMigTesterAreaComponentManager.OnExecTestEnd([retSucceeded, retInfoText, retOutputText, retAlertText]);
};

/**
 * テストケースリストテキストをパースしてテストケース情報の配列にする.
 * @param testCaseListText テストケースリストテキスト
 * @return テストケース情報の配列（失敗時は null）
 */
CMigTesterAreaComponentManager.GetExecInfoArray = function (testCaseListText) {

	var idxLine = 0;
	var idxBlock = 0;

	var inputtedLineArray = null;
	var blockTextArray = null;
	var blockText = "";

	var testLabel = "";
	var execInfoArray = null;



	// 改行で分割
	inputtedLineArray = testCaseListText.split(/(?:(?:\r)?\n)/);

	// 分割したテキスト配列をループ処理
	execInfoArray = [];
	testLabel = "";

	for (idxLine = 0; idxLine < inputtedLineArray.length; idxLine++) {

		// 空行は無視
		if (inputtedLineArray[idxLine] == "") {
			continue;
		}

		// カンマで分割
		blockTextArray = inputtedLineArray[idxLine].split(",");

		for (idxBlock = 0; idxBlock < blockTextArray.length; idxBlock++) {

			blockText = blockTextArray[idxBlock];

			// 両端のダブルクオテーションを除去
			blockText = blockText.replace(/^"?/, "").replace(/"?$/, "");

			// データURLとして適当でない場合は、後続のデータURLに対するラベルとして扱う
			if (!IsValidDataUrl(blockText)) {
				testLabel += blockText;
			}

			// データURLとして適当である場合は、テストケース実行情報配列に追加する
			else {
				// 配列に追加
				execInfoArray.push([testLabel, blockText]);

				// ラベルはクリアする
				testLabel = "";
			}
		}
	}

	return execInfoArray;
};



/**
 * テストケース実行処理ドライバ（バルク入力）.
 * @param procMode 処理モード
 */
CMigTesterAreaComponentManager.ExecTestDriverBulkInput = function (procMode) {

	var inputtedFileList = null;

	// ファイルリスト取得
	inputtedFileList = document.getElementById("OBJID_INPUT_EXEC_TEST_BULK_FILES").files;

	// エラーチェック
	if (!inputtedFileList) {
		return [false, "ファイルリスト取得失敗", "", "ファイルリスト取得失敗"];
	}
	if (inputtedFileList.length == 0) {
		return [false, "ファイルリストが空", "", "ファイルリストが空"];
	}

	// バルク入力処理開始
	CMigTesterAreaComponentManager.ExecTestBulkInputBegin(procMode, inputtedFileList, CMigTesterAreaComponentManager.OnExecTestEnd);
};



/**
 * テストケース実行処理終了イベントハンドラ.
 */
CMigTesterAreaComponentManager.OnExecTestEnd = function (ret) {

	// 結果出力
	HtmlSetObjectValueById("OBJID_TEXTAREA_TESTER_INFO", ret[1]);
	HtmlSetObjectValueById("OBJID_TEXTAREA_TESTER_OUTPUT", ret[2]);

	// アラート出力
	if (ret[3].length != 0) {
		alert(ret[3]);
	}
};



/**
 * 個別入力でテストケースを実行する.
 * @param dataId データID
 */
CMigTesterAreaComponentManager.ExecTestCase = function (testPrefix, mainTargetId, mainTargetName, testCaseNo, testCaseCount, fileNo, fileCount, testLabel, dataURL) {

	var testCaseResult = null;
	var coverageData = null;
	var outputData = "";



	// テストケース実行
	testCaseResult = CMigItemDataTest.ExecMigrationTest(testLabel, dataURL);

	// 結果判定
	if (!testCaseResult) {
		return [true, "テストケース実行失敗", "", "テストケース実行失敗"];
	}



	// 実行結果の出力内容を組み立てる
	// TODO: 出力内容検討中



	// テスト結果ファイルの出力
	CMigTesterAreaComponentManager.OutputTestResultDataFile(testPrefix, mainTargetId, mainTargetName, "MIG_OLD", testCaseNo, testCaseResult[0]);
	CMigTesterAreaComponentManager.OutputTestResultDataFile(testPrefix, mainTargetId, mainTargetName, "MIG_NEW", testCaseNo, testCaseResult[1]);

	// カバレッジデータの生成
	if (CMigTesterAreaComponentManager.bulkInputCoverageData) {
		coverageData = new CMigTestCaseCoverageData();
		coverageData.SetTargetId(mainTargetId);
		coverageData.SetCaseNo(testCaseNo);
		coverageData.SetTestLabel(testLabel);
		coverageData.SetDataUrl(dataURL);
		coverageData.SetSpPatternCoverageTree(testCaseResult[2]);

		CMigTesterAreaComponentManager.bulkInputCoverageData.SetTestCaseCoverageData(testCaseNo, coverageData);
	}

	// 状況ログ出力
	WriteConsoleLog("テストケース実行成功（" + "case : " + testCaseNo + " / " + testCaseCount + " (file : " + fileNo + " / " + fileCount + ") ）");



	return [true, "成功", outputData, ""];
};



//--------------------------------------------------------------------------------------------------------------------------------
//
// バルク入力関連　ここから
//
//--------------------------------------------------------------------------------------------------------------------------------

/*
CMigTesterAreaComponentManager.dataKind = 0;
CMigTesterAreaComponentManager.procMode = 0;
CMigTesterAreaComponentManager.bulkInputRunningLabel = "";
CMigTesterAreaComponentManager.bulkInputInputtedFile = null;
CMigTesterAreaComponentManager.bulkInputInputtedFileArray = null;
CMigTesterAreaComponentManager.bulkInputProcFileIndex = 0;
CMigTesterAreaComponentManager.bulkInputInputtedIdStr = "";
CMigTesterAreaComponentManager.bulkInputInputtedName = "";
CMigTesterAreaComponentManager.bulkInputInputtedKana = "";
CMigTesterAreaComponentManager.bulkInputInputtedText = "";
CMigTesterAreaComponentManager.bulkInputCoverageData = null;
CMigTesterAreaComponentManager.bulkInputFileReader = null;
CMigTesterAreaComponentManager.bulkInputResultSucceeded = false;
CMigTesterAreaComponentManager.bulkInputResultTestInfoText = "";
CMigTesterAreaComponentManager.bulkInputResultOutputTextArray = null;
CMigTesterAreaComponentManager.bulkInputResultAlertText = "";
CMigTesterAreaComponentManager.bulkInputFuncAfterBulkEnd = null;
*/

/**
 * バルク入力処理で読み込みを開始する.
 */
CMigTesterAreaComponentManager.ExecTestBulkInputBegin = function (procMode, inputtedFileList, funcAfterBulkEnd) {

	// バルク入力処理関連の変数を設定
	CMigTesterAreaComponentManager.dataKind = 0;
	CMigTesterAreaComponentManager.procMode = procMode;
	CMigTesterAreaComponentManager.bulkInputRunningLabel = "";
	CMigTesterAreaComponentManager.bulkInputInputtedFile = null;
	CMigTesterAreaComponentManager.bulkInputInputtedFileArray = inputtedFileList;
	CMigTesterAreaComponentManager.bulkInputProcFileIndex = 0;
	CMigTesterAreaComponentManager.bulkInputInputtedIdStr = "";
	CMigTesterAreaComponentManager.bulkInputInputtedName = "";
	CMigTesterAreaComponentManager.bulkInputInputtedKana = "";
	CMigTesterAreaComponentManager.bulkInputInputtedText = "";
	CMigTesterAreaComponentManager.bulkInputCoverageData = null;
	CMigTesterAreaComponentManager.bulkInputFileReader = null;
	CMigTesterAreaComponentManager.bulkInputResultSucceeded = true;
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText = "";
	CMigTesterAreaComponentManager.bulkInputResultOutputTextArray = [];
	CMigTesterAreaComponentManager.bulkInputResultAlertText = "";
	CMigTesterAreaComponentManager.bulkInputFuncAfterBulkEnd = funcAfterBulkEnd;

	// 次を読み込む
	CMigTesterAreaComponentManager.ExecTestBulkInputNext();
};

/**
 * バルク入力処理で次を読み込む.
 */
CMigTesterAreaComponentManager.ExecTestBulkInputNext = function () {

	var fileNameFragmentArray = null;



	// 終端判定
	if (CMigTesterAreaComponentManager.bulkInputProcFileIndex >= CMigTesterAreaComponentManager.bulkInputInputtedFileArray.length) {
		CMigTesterAreaComponentManager.ExecTestBulkInputEnd();
		return;
	}



	// ファイル情報取得
	CMigTesterAreaComponentManager.bulkInputInputtedFile = CMigTesterAreaComponentManager.bulkInputInputtedFileArray[CMigTesterAreaComponentManager.bulkInputProcFileIndex];



	// ファイルリーダ用意
	CMigTesterAreaComponentManager.bulkInputFileReader = new FileReader();
	CMigTesterAreaComponentManager.bulkInputFileReader.onabort = CMigTesterAreaComponentManager.ExecTestBulkInputFileReaderOnAbort;
	CMigTesterAreaComponentManager.bulkInputFileReader.onerror = CMigTesterAreaComponentManager.ExecTestBulkInputFileReaderOnError;
	CMigTesterAreaComponentManager.bulkInputFileReader.onload = CMigTesterAreaComponentManager.ExecTestBulkInputFileReaderOnLoad;

	// ファイル読み込み開始
	CMigTesterAreaComponentManager.bulkInputFileReader.readAsText(CMigTesterAreaComponentManager.bulkInputInputtedFile);
};

/**
 * バルク入力処理ファイルリーダ中断発生イベントハンドラ.
 */
CMigTesterAreaComponentManager.ExecTestBulkInputFileReaderOnAbort = function (evt) {

	// 中断されたことを示すメッセージを出力
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "【中断】\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイルの読み込みが中断されました。\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイル名：" + CMigTesterAreaComponentManager.bulkInputInputtedFile.name + "\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";

	// 処理失敗フラグを設定
	CMigTesterAreaComponentManager.bulkInputResultSucceeded = false;

	// 次の読み込みへ
	CMigTesterAreaComponentManager.bulkInputProcFileIndex++;
	CMigTesterAreaComponentManager.ExecTestBulkInputNext();
};

/**
 * バルク入力処理ファイルリーダエラー発生イベントハンドラ.
 */
CMigTesterAreaComponentManager.ExecTestBulkInputFileReaderOnError = function (evt) {

	// 中断されたことを示すメッセージを出力
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "【エラー】\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイルの読み込みでエラーが発生しました。\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイル名：" + CMigTesterAreaComponentManager.bulkInputInputtedFile.name + "\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "エラー名：" + CMigTesterAreaComponentManager.bulkInputFileReader.error.name + "\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "エラー内容：" + CMigTesterAreaComponentManager.bulkInputFileReader.error.message + "\n";
	CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";

	// 処理失敗フラグを設定
	CMigTesterAreaComponentManager.bulkInputResultSucceeded = false;

	// 次の読み込みへ
	CMigTesterAreaComponentManager.bulkInputProcFileIndex++;
	CMigTesterAreaComponentManager.ExecTestBulkInputNext();
};

/**
 * バルク入力処理ファイルリーダ読み込み完了イベントハンドラ.
 */
CMigTesterAreaComponentManager.ExecTestBulkInputFileReaderOnLoad = function (evt) {

	var idx = 0;
	var ret = null;

	var fileNameSplittedArray = null;
	var testPrefix = "";
	var mainTargetId = "";
	var mainTargetName = "";
	var coverageData = null;
	var coverageDataText = "";



	// 読み込んだデータを取得
	CMigTesterAreaComponentManager.bulkInputInputtedText = evt.target.result;

	// データ検査
	if (CMigTesterAreaComponentManager.bulkInputInputtedText.length == 0) {

		// 検査不適合を示すメッセージを出力
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "【エラー】\n";
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイルから読み込んだテキストが空です。\n";
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイル名：" + CMigTesterAreaComponentManager.bulkInputInputtedFile.name + "\n";
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";

		// 次の読み込みへ
		CMigTesterAreaComponentManager.bulkInputProcFileIndex++;
		CMigTesterAreaComponentManager.ExecTestBulkInputNext();

		return;
	}



	// ファイル名からパラメータを取得する
	fileNameSplittedArray = CMigTesterAreaComponentManager.bulkInputInputtedFile.name.split("##");

	if (fileNameSplittedArray.length > 3) {
		testPrefix = fileNameSplittedArray[0] + "_R";
		mainTargetId = fileNameSplittedArray[1];
		mainTargetName = fileNameSplittedArray[2];
	}



	// 読み込んだデータを元に、テストケース情報へ変換する
	execInfoArray = CMigTesterAreaComponentManager.GetExecInfoArray(CMigTesterAreaComponentManager.bulkInputInputtedText);



	// カバレッジデータ用意
	CMigTesterAreaComponentManager.bulkInputCoverageData = new CMigCoverageData();
	CMigTesterAreaComponentManager.bulkInputCoverageData.SetTargetId(mainTargetId);

	// すべてのテストケースを実行
	for (idx = 0; idx < execInfoArray.length; idx++) {

		testLabel = execInfoArray[idx][0];
		dataURL = execInfoArray[idx][1];

		// 実行
		ret = CMigTesterAreaComponentManager.ExecTestCase(
			testPrefix, mainTargetId, mainTargetName,
			idx + 1, execInfoArray.length,
			CMigTesterAreaComponentManager.bulkInputProcFileIndex + 1, CMigTesterAreaComponentManager.bulkInputInputtedFileArray.length,
			testLabel, dataURL
		);

		// 結果判定
		if (!ret[0]) {
			// 成功フラグを落とす
			CMigTesterAreaComponentManager.bulkInputResultSucceeded = false;

			// 検査不適合を示すメッセージを出力
			CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";
			CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "【エラー】\n";
			CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "テストケース実行処理が異常終了しました。\n";
			CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "ファイル名：" + CMigTesterAreaComponentManager.bulkInputInputtedFile.name + "\n";
			CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "データＩＤ：" + dataId + "\n";
			CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "\n";

			// 次の読み込みへ
			CMigTesterAreaComponentManager.bulkInputProcFileIndex++;
			CMigTesterAreaComponentManager.ExecTestBulkInputNext();

			return;
		}

		// 結果を格納
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText += "成功（" + CMigTesterAreaComponentManager.bulkInputInputtedFile.name + "）\n";
		CMigTesterAreaComponentManager.bulkInputResultOutputTextArray.push(ret[2]);
		CMigTesterAreaComponentManager.bulkInputResultOutputTextArray.push(("\r\n").repeat(3));
	}

	// カバレッジデータの出力
	coverageDataText = "[\n" + ExtractDataArray(CMigTesterAreaComponentManager.bulkInputCoverageData.ToArrayData(), 1) + "\n]";
	CMigTesterAreaComponentManager.OutputTestCoverageDataFile(testPrefix, mainTargetId, mainTargetName, "MIG_COV", coverageDataText);



	// 次の読み込みインデックスを設定
	CMigTesterAreaComponentManager.bulkInputProcFileIndex++;
	CMigTesterAreaComponentManager.ExecTestBulkInputNext();
};

/**
 * バルク入力終了イベントハンドラ.
 */
CMigTesterAreaComponentManager.ExecTestBulkInputEnd = function () {

	var idx = 0;
	var ret = null;

	var outputText = "";



	// 処理に成功している場合のみ、ファイル出力
	if (CMigTesterAreaComponentManager.bulkInputResultSucceeded) {

		// テスト結果組み立て
		for (idx = 0; idx < CMigTesterAreaComponentManager.bulkInputResultOutputTextArray.length; idx++) {
			outputText += CMigTesterAreaComponentManager.bulkInputResultOutputTextArray[idx] + "\n";
		}

		// ファイル出力
		// TODO: ファイル出力は検討中
	}



	ret = [
		CMigTesterAreaComponentManager.bulkInputResultSucceeded,
		CMigTesterAreaComponentManager.bulkInputResultTestInfoText,
		outputText,
		CMigTesterAreaComponentManager.bulkInputResultSucceeded ? "" : "問題のある処理がありました。",
	];



	CMigTesterAreaComponentManager.bulkInputFuncAfterBulkEnd(ret);
};


















//================================================================================================================================
//================================================================================================================================
//
//
// ファイル出力関連
//
//
//================================================================================================================================
//================================================================================================================================

/**
 * テストケースデータを出力する.
 */
CMigTesterAreaComponentManager.OutputTestCaseDataFile = function (dataKind, dataId, outputText) {

	var fileName = "";
	var prefix = "";
	var dataObject = null;
	var dataName = "";



	// プリフィックスを決定する
	switch (dataKind) {

	case CONST_DATA_KIND_ITEM:

		prefix = "IDT";

		// 名称の検索
		if (dataId < 0) {
			dataName = "BULK";
		}
		else {

			dataName = g_constDataManager.GetFullyName(dataKind, dataId);

			if (!dataName) {
				dataName = ItemObjNew[dataId][ITEM_DATA_INDEX_NAME];
			}
		}
		break;

	}

	// ファイル名を組み立てる
	fileName = prefix + "##" + dataId + "##" + dataName + "##" + ".rrttst";



	// ファイル出力
	CMigTesterAreaComponentManager.OutputFile(fileName, outputText);
};



/**
 * テスト結果データを出力する.
 */
CMigTesterAreaComponentManager.OutputTestResultDataFile = function (prefix, mainTargetId, mainTargetName, resultType, testCaseNo, outputText) {

	var fileName = "";



	// ファイル名用のパラメータを調整する
	if (prefix === "") {
		prefix = "XXX_R";
	}
	if (mainTargetId === "") {
		mainTargetId = "XXXX";
	}
	if (mainTargetName === "") {
		mainTargetName = "XXXX";
	}
	testCaseNo = ("0000" + testCaseNo).slice(-4);

	// ファイル名を組み立てる
	fileName = prefix + "##" + mainTargetId + "##" + mainTargetName + "##" + resultType + "##" + testCaseNo + "##" + ".rrtrslt";



	// ファイル出力
	CMigTesterAreaComponentManager.OutputFile(fileName, outputText);
};



/**
 * テストカバレッジデータを出力する.
 */
CMigTesterAreaComponentManager.OutputTestCoverageDataFile = function (prefix, mainTargetId, mainTargetName, resultType, outputText) {

	var fileName = "";



	// ファイル名用のパラメータを調整する
	if (prefix === "") {
		prefix = "XXX_R";
	}
	if (mainTargetId === "") {
		mainTargetId = "XXXX";
	}
	if (mainTargetName === "") {
		mainTargetName = "XXXX";
	}

	// ファイル名を組み立てる
	fileName = prefix + "##" + mainTargetId + "##" + mainTargetName + "##" + resultType + "##" + ".rrtcov";



	// ファイル出力
	CMigTesterAreaComponentManager.OutputFile(fileName, outputText);
};



/**
 * ファイル出力する.
 * @param fileName ファイル名
 * @param fileContent ファイルの内容
 */
CMigTesterAreaComponentManager.OutputFile = function (fileName, fileContent) {

	var fileData = null;
	var url = null;

	var objA = null;



	// Blobデータ生成
	fileData = new Blob([fileContent], {type: "text/plain"});


	// ダウンロードリンクを生成
	objA = document.createElement("a");

	// アクセスＵＲＬを生成
	url = URL.createObjectURL(fileData);

	// ダウンロードリンクを設定
	objA.setAttribute("href", url);
	objA.setAttribute("target", "_blank");
	objA.setAttribute("download", fileName);

	// ダウンロード
	objA.click();

	// アクセスＵＲＬを解放
	URL.revokeObjectURL(url)
};







// 初期構築処理
CMigTesterAreaComponentManager.RebuildControls();



