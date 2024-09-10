// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * パーサエリアコンポーネントマネージャクラス.
 */
function CMigParserAreaComponentManager () {

}

// ソーステキストパーサ
CMigParserAreaComponentManager.sourceTextParser = new CMigSourceTextParser();


// 警告抑止フラグ
CMigParserAreaComponentManager.suppressWarning = false;


/**
 * 画面部品を再構築する.
 */
CMigParserAreaComponentManager.RebuildControls = function () {

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



	// 列数定義
	colspan = 7;



	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_PARSER_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		switchChecked = objSwitch.checked;
	}



	// 設定欄を初期化
	objRoot = document.getElementById("ID_PARSER_AREA");
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
	objTd.setAttribute("id", "OBJID_PARSER_AREA_HEADER");
	objTd.setAttribute("class", "title");
	objTd.setAttribute("colspan", colspan);
	objTr.appendChild(objTd);

	// 設定欄展開用チェックボックス
	objInput = document.createElement("input");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_PARSER_AREA_EXTRACT_CHECKBOX");
	objInput.setAttribute("onclick", "CMigParserAreaComponentManager.OnClickExtractSwitch()");
	if (switchChecked) {
		// 部品を再構築しているので、チェック状態の再設定が必要
		objInput.setAttribute("checked", "checked");
	}
	objTd.appendChild(objInput);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_PARSER_AREA_EXTRACT_CHECKBOX");
	HtmlCreateTextNode("パーサ機能", objLabel);



	// 設定欄のヘッダ部分をリフレッシュ（着色処理等）
	CMigParserAreaComponentManager.RefreshParserAreaHeader();

	// 展開表示でなければ、終了
	if (!switchChecked) {
		return;
	}



	//----------------------------------------------------------------
	// １行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// データテキスト解析
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "3");
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("データテキスト解析", objTd);


	// データテキスト解析
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "4");
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("解析済みデータ", objTd);



	//----------------------------------------------------------------
	// ２行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// パース種別ラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("パース種別", objTd);


	// パース種別選択セレクトボックス
	objTd = HtmlCreateElement("td", objTr);
	objSelect = HtmlCreateElement("select", objTd);
	objSelect.setAttribute("id", "OBJID_SELECT_PARSE_KIND");
	objSelect.setAttribute("onchange", "CMigParserAreaComponentManager.OnChangeParseKind()");

	// TODO: データ移行過渡処理
	/*
	EnumConstDataKind.For(
		function (idx, name, value) {
			HtmlCreateElementOption(value, GetConstDataKindText(value), objSelect);
		},
		[
			"CONST_DATA_KIND_NONE"
		]
	);
	*/

	[
		CONST_DATA_KIND_ITEM,
		CONST_DATA_KIND_ARROW,
		CONST_DATA_KIND_ENCHANT_LIST,
	].forEach(
		function (valueF, indexF, arrayF) {
			HtmlCreateElementOption(valueF, GetConstDataKindText(valueF), objSelect);
		}
	);


	// 解析ボタン
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("rowspan", "2");
	objTd.setAttribute("style", "text-align : center;");
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_DO_PARSE");
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "解析");
	objInput.setAttribute("onclick", "CMigParserAreaComponentManager.OnClickParse()");

	// 警告抑止チェックボックス（非表示、プログラム処理のみ）
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_DO_PARSE_SUPPRESS_WARNING");
	objInput.setAttribute("type", "checkbox");


	// 表示データラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("rowspan", "3");
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("表示データ", objTd);


	// 表示データ表示対象選択セレクトボックス
	objTd = HtmlCreateElement("td", objTr);
	objSelect = HtmlCreateElement("select", objTd);
	objSelect.setAttribute("id", "OBJID_SELECT_PARSE_DATA_DISP_TARGET");
	objSelect.setAttribute("onchange", "CMigParserAreaComponentManager.RefreshDisplayData()");


	// 表示データ表示種別選択セレクトボックス
	objTd = HtmlCreateElement("td", objTr);
	objSelect = HtmlCreateElement("select", objTd);
	objSelect.setAttribute("id", "OBJID_SELECT_PARSE_DATA_DISP_KIND");
	objSelect.setAttribute("onchange", "CMigParserAreaComponentManager.RefreshDisplayData()");
	HtmlCreateElementOption(0, "解析元テキスト", objSelect);
	HtmlCreateElementOption(1, "解析後jsコード", objSelect);
	objSelect.value = 1;


	// 出力ボタン
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("rowspan", "3");
	objTd.setAttribute("style", "text-align : center;");
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "出力");
	objInput.setAttribute("onclick", "CMigParserAreaComponentManager.OnClickOutput()");



	//----------------------------------------------------------------
	// ３行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 処理モードラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("処理モード", objTd);


	// 処理モード選択セレクトボックス
	objTd = HtmlCreateElement("td", objTr);
	objSelect = HtmlCreateElement("select", objTd);
	objSelect.setAttribute("id", "OBJID_SELECT_PARSE_PROC_MODE");
	HtmlCreateElementOption(0, "通常", objSelect);
	HtmlCreateElementOption(1, "データ移行", objSelect);

	// TODO: データ移行過渡処理
	objSelect.value = 1;
	objSelect.setAttribute("disabled", "disabled");


	// ステータス表示
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTd.setAttribute("style", "text-align : center;");
	objSpan = HtmlCreateTextSpan("ステータス：成功", objTd, "");
	objSpan.setAttribute("id", "OBJID_SPAN_PARSE_DATA_STATUS");



	//----------------------------------------------------------------
	// ４行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 設定ラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("設定", objTd);


	// 成功時クリア設定チェックボックス
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_CLEAR_WHEN_SUCCEEDED");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("checked", "checked");
	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_INPUT_CLEAR_WHEN_SUCCEEDED");
	HtmlCreateTextNode("成功時入力をクリア", objLabel);


	//
	objTd = HtmlCreateElement("td", objTr);


	//
	objTd = HtmlCreateElement("td", objTr);



	//----------------------------------------------------------------
	// ５行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 種類別テーブルエリア
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("id", "OBJID_PARSE_TABLE_ROOT");
	objTd.setAttribute("colspan", "3");
	objTd.setAttribute("style", "text-align : center;");


	// 結果出力エリア
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("rowspan", "9");
	objTd.setAttribute("colspan", "4");
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_PARSE_OUTPUT");
	objTextArea.setAttribute("cols", "75");
	objTextArea.setAttribute("rows", "33");
	objTextArea.setAttribute("readonly", "readonly");
	objTextArea.setAttribute("style", "resize : none;");





	//----------------------------------------------------------------
	// 初期表示
	//----------------------------------------------------------------

	CMigParserAreaComponentManager.OnChangeParseKind();
	CMigParserAreaComponentManager.RebuildSelectDisplayTarget(-1);

};



/**
 * 展開チェックボックス切り替えイベントハンドラ.
 */
CMigParserAreaComponentManager.OnClickExtractSwitch = function () {
	// 再構築する
	CMigParserAreaComponentManager.RebuildControls();
};



/**
 * ヘッダ部品を再設定する.
 */
CMigParserAreaComponentManager.RefreshParserAreaHeader = function () {

	var switchChecked = false;

	var objSwitch = null;
	var objHeader = null;

	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_PARSER_AREA_EXTRACT_CHECKBOX");
	switchChecked = objSwitch.checked;

	// ヘッダの CSS を調整
	objHeader = document.getElementById("OBJID_PARSER_AREA_HEADER");
	if (switchChecked) {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER_USED");
	}
	else {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER");
	}
};



/**
 * パース種別変更イベントハンドラ.
 */
CMigParserAreaComponentManager.OnChangeParseKind = function () {

	var dataKind = 0;
	var procMode = 0;

	var inputtedIdStr = "";
	var inputtedName = "";
	var inputtedKana = "";
	var inputtedOfficialId = 0;
	var inputtedText = "";

	var result = null;
	var parsedInfo = null;
	var parseResult = null;
	var outputData = "";
	var msg = "";

	var resultParseInfoText = "";
	var resultOutputText = "";
	var resultAlertText = "";

	var parsedIdValue = 0;

	var objKindRoot = null;


	// データ種別取得
	dataKind = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_PARSE_KIND", 0);

	// ルートオブジェクト取得
	objKindRoot = document.getElementById("OBJID_PARSE_TABLE_ROOT");

	// 子要素全削除
	HtmlRemoveAllChild(objKindRoot);

	// 子要素生成
	switch (dataKind) {

	case CONST_DATA_KIND_ITEM:
	case CONST_DATA_KIND_ARROW:
		CMigParserAreaComponentManager.RebuildChildParseTableItem(objKindRoot);
		break;

	case CONST_DATA_KIND_ENCHANT_LIST:
		CMigParserAreaComponentManager.RebuildChildParseTableEnchList(objKindRoot);
		break;
	}

};

/*
 * 種類別再構築関数（アイテム用）
 */
CMigParserAreaComponentManager.RebuildChildParseTableItem = function (objRoot) {

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



	// テーブル生成
	objTable = HtmlCreateElement("table", objRoot);
	objTable.setAttribute("border", 1);

	objTbody = HtmlCreateElement("tbody", objTable);


	//----------------------------------------------------------------
	// １行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 公式ID
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("公式ID", objTd);


	// 公式ID入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_PARSE_OFFICIAL_ID");
	objInput.setAttribute("type", "text");
	objInput.setAttribute("size", "43");



	//----------------------------------------------------------------
	// ２行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 名称ラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("名称", objTd);


	// 名称入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_PARSE_NAME");
	objInput.setAttribute("type", "text");
	objInput.setAttribute("size", "43");



	//----------------------------------------------------------------
	// ３行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 読み仮名ラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("読み仮名", objTd);


	// 読み仮名入力
	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_PARSE_KANA");
	objInput.setAttribute("type", "text");
	objInput.setAttribute("size", "33");


	// 検索ボタン
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("rowspan", "2");
	objTd.setAttribute("style", "text-align : center;");
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_BUTTON_PERSE_SEARCH");
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "検索");
	objInput.setAttribute("onclick", "CMigParserAreaComponentManager.OnClickOldSearch()");



	//----------------------------------------------------------------
	// ４行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// コード名ラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("コード名", objTd);


	// コード名入力
	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_PARSE_ID");
	objInput.setAttribute("type", "text");
	objInput.setAttribute("size", "33");
	objInput.setAttribute("placeholder", "スロット違いのコード変更不要 (_S1等)");



	//----------------------------------------------------------------
	// ５行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// パース対象データ入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", 3);
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_PARSE_INPUT");
	objTextArea.setAttribute("cols", "58");
	objTextArea.setAttribute("rows", "19");
	objTextArea.setAttribute("placeholder", "ここにアイテムなどの説明テキストを全文コピペします。");
	objTextArea.setAttribute("style", "resize : none;");



	//----------------------------------------------------------------
	// ６行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// ファイルから入力ラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "3");
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("データファイルから入力", objTd);



	//----------------------------------------------------------------
	// ７行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// RRTSRCラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("RRTSRC", objTd);


	// RRTSRCファイル入力
	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_PARSE_BULK_FILES");
	objInput.setAttribute("type", "file");
	objInput.setAttribute("accept", ".rrtsrc");
	objInput.setAttribute("multiple", "multiple");


	// 入力ボタン
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "入力");
	objInput.setAttribute("onclick", "CMigParserAreaComponentManager.OnClickInputFromFile()");

}

/*
 * 種類別再構築関数（エンチャントリスト用）
 */
CMigParserAreaComponentManager.RebuildChildParseTableEnchList = function (objRoot) {

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



	document.getElementById("OBJID_TEXTAREA_PARSE_OUTPUT").rows = 48;


	// テーブル生成
	objTable = HtmlCreateElement("table", objRoot);
	objTable.setAttribute("border", 1);

	objTbody = HtmlCreateElement("tbody", objTable);



	//----------------------------------------------------------------
	// １行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 名称ラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("名称/カナ", objTd);


	// 名称入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_PARSE_NAME");
	objInput.setAttribute("type", "text");
	objInput.setAttribute("size", "38");


	// 読み仮名入力
	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_PARSE_KANA");
	objInput.setAttribute("type", "text");
	objInput.setAttribute("size", "38");



	//----------------------------------------------------------------
	// ２行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 名称定数名ラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("名称定数名", objTd);


	// コード名入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_PARSE_ID");
	objInput.setAttribute("type", "text");
	objInput.setAttribute("size", "38");


	// コード名入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_NO_EXPLAINS");
	objInput.setAttribute("type", "checkbox");
	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_INPUT_NO_EXPLAINS");
	HtmlCreateTextNode("説明文なし", objLabel);



	//----------------------------------------------------------------
	// ３行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 基本情報
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("基本情報", objTd);


	// 対象リスト
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("対象リスト", objTd);


	// 補足説明
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("補足説明", objTd);



	//----------------------------------------------------------------
	// ４行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 対象リスト
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("", objTd);


	// 対象リストデータ入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_PARSE_INPUT_TARGET_LIST");
	objTextArea.setAttribute("cols", "40");
	objTextArea.setAttribute("rows", "6");
	objTextArea.setAttribute("placeholder", "対象装備欄を丸っとコピペ（スロット表記付き可）");
	objTextArea.setAttribute("style", "resize : none;");


	// 補足説明
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_PARSE_INPUT_EXPLAIN_LIST");
	objTextArea.setAttribute("cols", "40");
	objTextArea.setAttribute("rows", "6");
	objTextArea.setAttribute("placeholder", "以下の効果から選択してエンチャント可能。　などを丸っとコピペ");
	objTextArea.setAttribute("style", "resize : none;");



	//----------------------------------------------------------------
	// ５行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 位置指定
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("エンチャ", objTd);


	// 位置指定
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("位置指定", objTd);


	// 候補リスト
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("候補リスト", objTd);



	//----------------------------------------------------------------
	// ６行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 位置指定
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("1", objTd);


	// 位置指定データ入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_PARSE_INPUT_ENCH_POSITION_1");
	objTextArea.setAttribute("cols", "40");
	objTextArea.setAttribute("rows", "6");
	objTextArea.setAttribute("placeholder", "第1エンチャント　などを丸っとコピペ");
	objTextArea.setAttribute("style", "resize : none;");


	// 候補リストデータ入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_PARSE_INPUT_CANDIDATE_LIST_1");
	objTextArea.setAttribute("cols", "40");
	objTextArea.setAttribute("rows", "6");
	objTextArea.setAttribute("placeholder", "Str+5、Str+6、　などを丸っとコピペ");
	objTextArea.setAttribute("style", "resize : none;");



	//----------------------------------------------------------------
	// ７行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 位置指定
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("2", objTd);


	// 位置指定データ入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_PARSE_INPUT_ENCH_POSITION_2");
	objTextArea.setAttribute("cols", "40");
	objTextArea.setAttribute("rows", "6");
	objTextArea.setAttribute("placeholder", "第2エンチャント　などを丸っとコピペ");
	objTextArea.setAttribute("style", "resize : none;");


	// 候補リストデータ入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_PARSE_INPUT_CANDIDATE_LIST_2");
	objTextArea.setAttribute("cols", "40");
	objTextArea.setAttribute("rows", "6");
	objTextArea.setAttribute("placeholder", "Str+5、Str+6、　などを丸っとコピペ");
	objTextArea.setAttribute("style", "resize : none;");



	//----------------------------------------------------------------
	// ８行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 位置指定
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("3", objTd);


	// 位置指定データ入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_PARSE_INPUT_ENCH_POSITION_3");
	objTextArea.setAttribute("cols", "40");
	objTextArea.setAttribute("rows", "6");
	objTextArea.setAttribute("placeholder", "第3エンチャント　などを丸っとコピペ");
	objTextArea.setAttribute("style", "resize : none;");


	// 候補リストデータ入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_PARSE_INPUT_CANDIDATE_LIST_3");
	objTextArea.setAttribute("cols", "40");
	objTextArea.setAttribute("rows", "6");
	objTextArea.setAttribute("placeholder", "Str+5、Str+6、　などを丸っとコピペ");
	objTextArea.setAttribute("style", "resize : none;");



	//----------------------------------------------------------------
	// ９行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// 位置指定
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("4", objTd);


	// 位置指定データ入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_PARSE_INPUT_ENCH_POSITION_4");
	objTextArea.setAttribute("cols", "40");
	objTextArea.setAttribute("rows", "6");
	objTextArea.setAttribute("placeholder", "第4エンチャント　などを丸っとコピペ");
	objTextArea.setAttribute("style", "resize : none;");


	// 候補リストデータ入力
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "2");
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_PARSE_INPUT_CANDIDATE_LIST_4");
	objTextArea.setAttribute("cols", "40");
	objTextArea.setAttribute("rows", "6");
	objTextArea.setAttribute("placeholder", "Str+5、Str+6、　などを丸っとコピペ");
	objTextArea.setAttribute("style", "resize : none;");



	//----------------------------------------------------------------
	// １０行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// ファイルから入力ラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "3");
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("データファイルから入力", objTd);



	//----------------------------------------------------------------
	// １１行目
	//----------------------------------------------------------------

	objTr = HtmlCreateElement("tr", objTbody);


	// RRTSRCラベル
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	HtmlCreateTextNode("RRTSRC", objTd);


	// RRTSRCファイル入力
	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_INPUT_PARSE_BULK_FILES");
	objInput.setAttribute("type", "file");
	objInput.setAttribute("accept", ".rrtsrc");
	objInput.setAttribute("multiple", "multiple");


	// 入力ボタン
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "text-align : center;");
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "入力");
	objInput.setAttribute("onclick", "CMigParserAreaComponentManager.OnClickInputFromFile()");

}



/**
 * 解析ボタン押下イベントハンドラ.
 */
CMigParserAreaComponentManager.OnClickParse = function () {

	var dataKind = 0;
	var procMode = 0;
	var objCheck = null;



	// データ種別取得
	dataKind = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_PARSE_KIND", 0);

	// 処理モード取得
	procMode = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_PARSE_PROC_MODE", 0);

	// 警告抑止フラグ取得
	objCheck = document.getElementById("OBJID_INPUT_DO_PARSE_SUPPRESS_WARNING");
	if (objCheck) {
		CMigParserAreaComponentManager.suppressWarning = objCheck.checked;
	}


	// 処理振り分け
	switch (dataKind) {

	case CONST_DATA_KIND_ITEM:
	case CONST_DATA_KIND_ARROW:
		CMigParserAreaComponentManager.OnClickParseSubItem(dataKind, procMode);
		break;

	case CONST_DATA_KIND_ENCHANT_LIST:
		CMigParserAreaComponentManager.OnClickParseSubEnchList(dataKind, procMode);
		break;
	}

}

/**
 * 解析ボタン押下イベントハンドラ（サブ　アイテム用）.
 */
CMigParserAreaComponentManager.OnClickParseSubItem = function (dataKind, procMode) {

	var inputtedIdStr = "";
	var inputtedName = "";
	var inputtedKana = "";
	var inputtedOfficialId = 0;
	var inputtedText = "";

	var result = null;
	var parsedInfo = null;
	var parseResult = null;
	var outputData = "";
	var msg = "";

	var resultParseInfoText = "";
	var resultOutputText = "";
	var resultAlertText = "";

	var parsedIdValue = 0;



	// 入力データ取得
	inputtedIdStr = HtmlGetObjectValueById("OBJID_INPUT_PARSE_ID", "");
	inputtedName = HtmlGetObjectValueById("OBJID_INPUT_PARSE_NAME", "");
	inputtedKana = HtmlGetObjectValueById("OBJID_INPUT_PARSE_KANA", "");
	inputtedOfficialId = HtmlGetObjectValueByIdAsInteger("OBJID_INPUT_PARSE_OFFICIAL_ID", -1);
	inputtedText = HtmlGetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT", "");

	// 入力検査
	if (inputtedIdStr.length == 0) {
		alert("コード名を入力してください。");
		return;
	}
	if (inputtedName.length == 0) {
		alert("名称を入力してください。");
		return;
	}
	if (dataKind == CONST_DATA_KIND_ITEM) {
		if (!(/\[\d\]$/).test(inputtedName.trim())) {
			alert("名称にスロット指定（[1]等）がありません。");
			return;
		}
	}
	else {
		if ((/\[\d\]$/).test(inputtedName.trim())) {
			alert("名称にスロット指定が存在します。");
			return;
		}
	}
	if (inputtedKana.length == 0) {
		alert("読み仮名を入力してください。");
		return;
	}
	if (inputtedOfficialId < 0) {
		alert("公式IDを入力してください。");
		return;
	}
	if (inputtedText.length == 0) {
		alert("解析対象のデータテキストを入力してください。");
		return;
	}



	// データ移行処理モードの場合は、IDを補正
	if (procMode == 1) {
		inputtedIdStr = "MIG_" + inputtedIdStr;
	}



	// パース処理
	parsedIdValue = CMigParserAreaComponentManager.sourceTextParser.ParseSourceTextEquipables(inputtedText, dataKind, inputtedIdStr, inputtedName, inputtedKana, inputtedOfficialId);

	// TODO: 本当なら、戻り値のチェックが必要



	// 結果を加工
	parsedInfo = CMigParserAreaComponentManager.sourceTextParser.GetParsedInfo(parsedIdValue);

	// 結果判定
	resultParseInfoText = "";
	resultOutputText = "";
	resultAlertText = "";

	// 失敗している場合
	if (parsedInfo.status != PARSED_INFO_STATUS_SUCCEEDED) {

		resultParseInfoText = "失敗した処理があります。以下を参照してください。" + parsedInfo.statusDetailText;
		resultAlertText = "失敗した処理があります。以下を参照してください。" + parsedInfo.statusDetailText;

		// パース結果は、可能な限り出力する
		resultOutputText = parsedInfo.jsText;
	}

	// 成功している場合
	else {

		// 成功時入力をクリアが有効の場合は、クリアする
		if (HtmlGetObjectCheckedById("OBJID_INPUT_CLEAR_WHEN_SUCCEEDED", undefined)) {
			HtmlSetObjectValueById("OBJID_INPUT_PARSE_ID", "");
			HtmlSetObjectValueById("OBJID_INPUT_PARSE_NAME", "");
			HtmlSetObjectValueById("OBJID_INPUT_PARSE_KANA", "");
			HtmlSetObjectValueById("OBJID_INPUT_PARSE_OFFICIAL_ID", "");
			HtmlSetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT", "");
		}
	}


	// 表示対象選択セレクトボックスを再構築
	// （新規に追加されたデータを表示対象にする）
	CMigParserAreaComponentManager.RebuildSelectDisplayTarget(parsedIdValue);



	// アラート出力
	if (resultAlertText.length != 0) {
		if (!CMigParserAreaComponentManager.suppressWarning) {
			alert(resultAlertText);
		}
	}
};

/**
 * 解析ボタン押下イベントハンドラ（サブ　エンチャントリスト用）.
 */
CMigParserAreaComponentManager.OnClickParseSubEnchList = function (dataKind, procMode) {

	var idx = 0;

	var inputtedName = "";
	var inputtedKana = "";
	var inputtedIdStr = "";
	var checkedNoExplains = false;
	var inputtedTargetStr = "";
	var inputtedExplainStr = "";
	var inputtedSlotDataArary = null;
	var checkPosStr = "";
	var checkCandidateStr = "";

	var result = null;
	var parsedInfo = null;
	var parseResult = null;
	var outputData = "";
	var msg = "";

	var resultParseInfoText = "";
	var resultOutputText = "";
	var resultAlertText = "";

	var parsedIdValue = 0;



	// 入力データ取得
	inputtedName = HtmlGetObjectValueById("OBJID_INPUT_PARSE_NAME", "");
	inputtedKana = HtmlGetObjectValueById("OBJID_INPUT_PARSE_KANA", "");
	inputtedIdStr = HtmlGetObjectValueById("OBJID_INPUT_PARSE_ID", "");
	checkedNoExplains = HtmlGetObjectCheckedById("OBJID_INPUT_NO_EXPLAINS", false);
	inputtedTargetStr = HtmlGetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT_TARGET_LIST", "");
	inputtedExplainStr = HtmlGetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT_EXPLAIN_LIST", "");
	inputtedSlotDataArary = new Array();
	for (idx = 0; idx < 4; idx++) {
		inputtedSlotDataArary.push(
			[
				HtmlGetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT_ENCH_POSITION_" + (idx + 1), ""),
				HtmlGetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT_CANDIDATE_LIST_" + (idx + 1), ""),
			]
		);
	}

	// 入力検査
	if (inputtedName.length == 0) {
		alert("名称を入力してください。");
		return;
	}
	if (inputtedKana.length == 0) {
		alert("読み仮名を入力してください。");
		return;
	}
	if (inputtedIdStr.length == 0) {
		alert("コード名を入力してください。");
		return;
	}
	if (inputtedTargetStr.length == 0) {
		alert("対象リストを入力してください。");
		return;
	}
	if (!checkedNoExplains) {
		if (inputtedExplainStr.length == 0) {
			alert("説明リストを入力してください。");
			return;
		}
	}
	checkPosStr = "";
	checkCandidateStr = "";
	for (idx = 0; idx < inputtedSlotDataArary.length; idx++) {
		if ((inputtedSlotDataArary[idx][0].length == 0) && (inputtedSlotDataArary[idx][1].length != 0)) {
			alert((idx + 1) + "番目のデータに、位置指定を入力してください。");
			return;
		}
		if ((inputtedSlotDataArary[idx][0].length != 0) && (inputtedSlotDataArary[idx][1].length == 0)) {
			alert((idx + 1) + "番目のデータに、候補リストを入力してください。");
			return;
		}
		checkPosStr += inputtedSlotDataArary[idx][0];
		checkCandidateStr += inputtedSlotDataArary[idx][1];
	}

	if (checkPosStr.length == 0) {
		alert("位置指定を入力してください。");
		return;
	}
	if (checkCandidateStr.length == 0) {
		alert("候補リストを入力してください。");
		return;
	}



	// IDを補正
	inputtedIdStr = "ENCH_LIST_ID_" + inputtedIdStr;
	if (procMode == 1) {
		inputtedIdStr = "MIG_" + inputtedIdStr;
	}



	// パース処理
	parsedIdValue = CMigParserAreaComponentManager.sourceTextParser.ParseSourceTextEnchList("", dataKind, inputtedIdStr, inputtedName, inputtedKana, inputtedTargetStr, inputtedExplainStr, inputtedSlotDataArary);

	// TODO: 本当なら、戻り値のチェックが必要



	// 結果を加工
	parsedInfo = CMigParserAreaComponentManager.sourceTextParser.GetParsedInfo(parsedIdValue);

	// 結果判定
	resultParseInfoText = "";
	resultOutputText = "";
	resultAlertText = "";

	// 失敗している場合
	if (parsedInfo.status != PARSED_INFO_STATUS_SUCCEEDED) {

		resultParseInfoText = "失敗した処理があります。以下を参照してください。" + parsedInfo.statusDetailText;
		resultAlertText = "失敗した処理があります。以下を参照してください。" + parsedInfo.statusDetailText;

		// パース結果は、可能な限り出力する
		resultOutputText = parsedInfo.jsText;
	}

	// 成功している場合
	else {

		// 成功時入力をクリアが有効の場合は、クリアする
		if (HtmlGetObjectCheckedById("OBJID_INPUT_CLEAR_WHEN_SUCCEEDED", undefined)) {
			HtmlSetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT_TARGET_LIST", "");
			HtmlSetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT_EXPLAIN_LIST", "");
			HtmlSetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT_ENCH_POSITION_1", "");
			HtmlSetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT_CANDIDATE_LIST_1", "");
			HtmlSetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT_ENCH_POSITION_2", "");
			HtmlSetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT_CANDIDATE_LIST_2", "");
			HtmlSetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT_ENCH_POSITION_3", "");
			HtmlSetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT_CANDIDATE_LIST_3", "");
			HtmlSetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT_ENCH_POSITION_4", "");
			HtmlSetObjectValueById("OBJID_TEXTAREA_PARSE_INPUT_CANDIDATE_LIST_4", "");
		}
	}


	// 表示対象選択セレクトボックスを再構築
	// （新規に追加されたデータを表示対象にする）
	CMigParserAreaComponentManager.RebuildSelectDisplayTarget(parsedIdValue);



	// アラート出力
	if (resultAlertText.length != 0) {
		if (!CMigParserAreaComponentManager.suppressWarning) {
			alert(resultAlertText);
		}
	}
};



/**
 * 検索ボタン押下イベントハンドラ.
 */
CMigParserAreaComponentManager.OnClickOldSearch = function () {

	var idx = 0;

	var dataKind = 0;
	var defaultIdPrefix = "";

	// 名称取得
	inputtedName = HtmlGetObjectValueById("OBJID_INPUT_PARSE_NAME", "");

	if (inputtedName == "") {
		alert("名称を入力してください。");
		return;
	}

	// スロット表記の削除
	inputtedName = inputtedName.replace(/\[\d\]\s*$/, "").trim();

	// データ種別取得
	dataKind = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_PARSE_KIND", 0);

	// データ種別ごとに参照データを調整
	switch (dataKind) {

	// アイテムの場合
	case CONST_DATA_KIND_ITEM:
		defaultIdPrefix = "ITEM_ID_";

		for (idx = 0; idx < ItemObjNew.length; idx++) {

			// 名称が一致したら、値を設定する
			if (ItemObjNew[idx][ITEM_DATA_INDEX_NAME] == inputtedName) {

				// カナの仕様変更に伴い、カナは自動設定しない。ID のみ出力する
				HtmlSetObjectValueById("OBJID_INPUT_PARSE_ID", EnumItemId.GetDefinedName(ItemObjNew[idx][ITEM_DATA_INDEX_ID]));

				return;
			}
		}


	// 矢の場合
	case CONST_DATA_KIND_ARROW:
		defaultIdPrefix = "ARROW_ID_";

		for (idx = 0; idx < ArrowOBJNew.length; idx++) {

			// 名称が一致したら、値を設定する
			if (ArrowOBJNew[idx][ARROW_DATA_INDEX_NAME] == inputtedName) {

				// カナの仕様変更に伴い、カナは自動設定しない。ID のみ出力する
				HtmlSetObjectValueById("OBJID_INPUT_PARSE_ID", EnumArrowId.GetDefinedName(ArrowOBJNew[idx][ARROW_DATA_INDEX_ID]));

				return;
			}
		}
	}

	// 該当がない場合は、IDのプリフィックスだけ出力する
	HtmlSetObjectValueById("OBJID_INPUT_PARSE_ID", defaultIdPrefix);
};



/**
 * ファイルから入力ボタン押下イベントハンドラ.
 */
CMigParserAreaComponentManager.OnClickInputFromFile = function () {

	var dataKind = 0;
	var procMode = 0;
	var inputtedFileList = null;

	// データ種別取得
	dataKind = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_PARSE_KIND", 0);

	// 処理モード取得
	procMode = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_PARSE_PROC_MODE", 0);

	// ファイルリスト取得
	inputtedFileList = document.getElementById("OBJID_INPUT_PARSE_BULK_FILES").files;

	// エラーチェック
	if (!inputtedFileList) {
		alert("ファイルを選択してください。");
		return;
	}
	if (inputtedFileList.length == 0) {
		alert("ファイルを選択してください。");
		return;
	}

	// バルク入力処理開始
	CMigParserAreaComponentManager.BulkInputBegin(dataKind, procMode, inputtedFileList, CMigParserAreaComponentManager.OnInputFromFileEnd);
};

/**
 * ファイルから入力終了イベントハンドラ.
 */
CMigParserAreaComponentManager.OnInputFromFileEnd = function (ret) {

	// アラート出力
	if (ret[3].length != 0) {
		alert(ret[3]);
	}
};



/**
 * 出力ボタン押下イベントハンドラ.
 */
CMigParserAreaComponentManager.OnClickOutput = function () {

	// 解析済みデータが０件の場合は処理しない
	if (CMigParserAreaComponentManager.sourceTextParser.GetParsedInfoCount() == 0) {
		alert("解析済みデータがありません。\r\nデータテキスト解析か、データテキストファイルからの入力を行ってください。");
		return;
	}

	CMigParserAreaComponentManager.OutputParsedData();
};













//================================================================================================================================
//================================================================================================================================
//
//
// バルク入力関連
//
//
//================================================================================================================================
//================================================================================================================================

CMigParserAreaComponentManager.dataKind = 0;
CMigParserAreaComponentManager.procMode = 0;
CMigParserAreaComponentManager.bulkInputInputtedFile = null;
CMigParserAreaComponentManager.bulkInputInputtedFileArray = null;
CMigParserAreaComponentManager.bulkInputProcFileIndex = 0;
CMigParserAreaComponentManager.bulkInputProcFailedCount = 0;
CMigParserAreaComponentManager.bulkInputInputtedIdStrArray = null;
CMigParserAreaComponentManager.bulkInputInputtedIdValue = 0;
CMigParserAreaComponentManager.bulkInputInputtedText = "";
CMigParserAreaComponentManager.bulkInputFileReader = null;
CMigParserAreaComponentManager.bulkInputResultSucceeded = false;
CMigParserAreaComponentManager.bulkInputResultParseInfoText = "";
CMigParserAreaComponentManager.bulkInputResultOutputTextArray = null;
CMigParserAreaComponentManager.bulkInputResultAlertText = "";
CMigParserAreaComponentManager.bulkInputFuncAfterBulkEnd = null;

CMigParserAreaComponentManager.lastParsedIdValue = -1;

/**
 * バルク入力処理で読み込みを開始する.
 */
CMigParserAreaComponentManager.BulkInputBegin = function (dataKind, procMode, inputtedFileList, funcAfterBulkEnd) {

	var idx = 0;

	// ファイルリストをID順に整列する
	var idByFileName = 0;
	var inputtedFile = null;
	var inputtedFileArray = null;
	var inputtedFileInfoArray = null;
	var fileNameFragmentArray = null;



	inputtedFileInfoArray = [];
	for (idx = 0; idx < inputtedFileList.length; idx++) {

		inputtedFile = inputtedFileList[idx];

		// ファイル名からパラメータ切り出し
		fileNameFragmentArray = inputtedFile.name.split("##");

		// エラーチェック
		if (fileNameFragmentArray.length != 5) {

			// TODO: 旧形式からのデータ移行用
			if (fileNameFragmentArray.length == 8) {
				idByFileName = Number(fileNameFragmentArray[5]);
			}
			else {
				continue;
			}
		}

		else {
			// ID値取得
			idByFileName = Number(fileNameFragmentArray[2]);
		}

		if (!isNaN(idByFileName)) {
			inputtedFileInfoArray.push([idByFileName, inputtedFile]);
		}
		else {
			inputtedFileInfoArray.push([Number.MAX_VALUE - inputtedFileList.length + idx, inputtedFile]);
		}
	}

	inputtedFileInfoArray.sort(
		function(a, b) {
			if (a[0] < b[0]) return -1;
			if (a[0] > b[0]) return 1;
			return 0;
		}
	);

	inputtedFileArray = [];
	for (idx = 0; idx < inputtedFileInfoArray.length; idx++) {
		inputtedFileArray.push(inputtedFileInfoArray[idx][1]);
	}


	// バルク入力処理関連の変数を設定
	CMigParserAreaComponentManager.dataKind = dataKind;
	CMigParserAreaComponentManager.procMode = procMode;
	CMigParserAreaComponentManager.bulkInputInputtedFile = null;
	CMigParserAreaComponentManager.bulkInputInputtedFileArray = inputtedFileArray;
	CMigParserAreaComponentManager.bulkInputProcFileIndex = 0;
	CMigParserAreaComponentManager.bulkInputProcFailedCount = 0;
	if (!CMigParserAreaComponentManager.bulkInputInputtedIdStrArray) {
		// 追加入力に対応するため、未定義の場合のみ初期化する
		CMigParserAreaComponentManager.bulkInputInputtedIdStrArray = [];
	}
	CMigParserAreaComponentManager.bulkInputInputtedText = "";
	CMigParserAreaComponentManager.bulkInputFileReader = null;
	CMigParserAreaComponentManager.bulkInputResultSucceeded = true;
	CMigParserAreaComponentManager.bulkInputResultParseInfoText = "";
	CMigParserAreaComponentManager.bulkInputResultOutputTextArray = [];
	CMigParserAreaComponentManager.bulkInputResultAlertText = "";
	CMigParserAreaComponentManager.bulkInputFuncAfterBulkEnd = funcAfterBulkEnd;
	CMigParserAreaComponentManager.lastParsedIdValue = -1;


	// 次を読み込む
	CMigParserAreaComponentManager.BulkInputNext();
};

/**
 * バルク入力処理で次を読み込む.
 */
CMigParserAreaComponentManager.BulkInputNext = function () {

	var fileNameFragmentArray = null;



	// 処理中判定
	if (CMigParserAreaComponentManager.bulkInputInputtedIdStrArray.length != (CMigParserAreaComponentManager.bulkInputProcFileIndex - CMigParserAreaComponentManager.bulkInputProcFailedCount)) {

		// 処理が終わるのを待つ
		setTimeout(CMigParserAreaComponentManager.BulkInputNext, 1000);

		return;
	}


	// 終端判定
	if (CMigParserAreaComponentManager.bulkInputProcFileIndex >= CMigParserAreaComponentManager.bulkInputInputtedFileArray.length) {

		WriteConsoleLog("すべての処理が完了 : " + CMigParserAreaComponentManager.bulkInputProcFileIndex + " / " + CMigParserAreaComponentManager.bulkInputInputtedFileArray.length);

		CMigParserAreaComponentManager.BulkInputEnd();
		return;
	}



	// ファイル情報取得
	CMigParserAreaComponentManager.bulkInputInputtedFile = CMigParserAreaComponentManager.bulkInputInputtedFileArray[CMigParserAreaComponentManager.bulkInputProcFileIndex];



	WriteConsoleLog("処理開始 : " + (CMigParserAreaComponentManager.bulkInputProcFileIndex + 1) + " / " + CMigParserAreaComponentManager.bulkInputInputtedFileArray.length + " (" + CMigParserAreaComponentManager.bulkInputInputtedFile.name + ")");



	// ファイル拡張子をチェック
	fileNameFragmentArray = CMigParserAreaComponentManager.bulkInputInputtedFile.name.split("##");

	if (fileNameFragmentArray[fileNameFragmentArray.length - 1] != ".rrtsrc") {
		// エラーがあったことを示すメッセージを出力
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "\n";
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "【エラー】\n";
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "ファイル名の拡張子パートが不適切です。\n";
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "ファイル名：" + CMigParserAreaComponentManager.bulkInputInputtedFile.name + "\n";
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "\n";

		// 処理失敗フラグを設定
		CMigParserAreaComponentManager.bulkInputResultSucceeded = false;
		CMigParserAreaComponentManager.bulkInputProcFailedCount++;

		// 次の読み込みへ
		CMigParserAreaComponentManager.bulkInputProcFileIndex++;
		CMigParserAreaComponentManager.bulkInputFileReader = null;
		CMigParserAreaComponentManager.BulkInputNext();
	}

	// TODO: 旧形式からのデータ移行用
	if (fileNameFragmentArray.length != 5) {
	}



	// ファイルリーダ用意
	CMigParserAreaComponentManager.bulkInputFileReader = new FileReader();
	CMigParserAreaComponentManager.bulkInputFileReader.onabort = CMigParserAreaComponentManager.BulkInputFileReaderOnAbort;
	CMigParserAreaComponentManager.bulkInputFileReader.onerror = CMigParserAreaComponentManager.BulkInputFileReaderOnError;
	CMigParserAreaComponentManager.bulkInputFileReader.onload = CMigParserAreaComponentManager.BulkInputFileReaderOnLoad;

	// ファイル読み込み開始
	CMigParserAreaComponentManager.bulkInputFileReader.readAsText(CMigParserAreaComponentManager.bulkInputInputtedFile);
};

/**
 * バルク入力処理ファイルリーダ中断発生イベントハンドラ.
 */
CMigParserAreaComponentManager.BulkInputFileReaderOnAbort = function (evt) {

	// 中断されたことを示すメッセージを出力
	CMigParserAreaComponentManager.bulkInputResultParseInfoText += "\n";
	CMigParserAreaComponentManager.bulkInputResultParseInfoText += "【中断】\n";
	CMigParserAreaComponentManager.bulkInputResultParseInfoText += "ファイルの読み込みが中断されました。\n";
	CMigParserAreaComponentManager.bulkInputResultParseInfoText += "ファイル名：" + CMigParserAreaComponentManager.bulkInputInputtedFile.name + "\n";
	CMigParserAreaComponentManager.bulkInputResultParseInfoText += "\n";

	// 処理失敗フラグを設定
	CMigParserAreaComponentManager.bulkInputResultSucceeded = false;
	CMigParserAreaComponentManager.bulkInputProcFailedCount++;

	// 次の読み込みへ
	CMigParserAreaComponentManager.bulkInputProcFileIndex++;
	CMigParserAreaComponentManager.bulkInputFileReader = null;
	CMigParserAreaComponentManager.BulkInputNext();
};

/**
 * バルク入力処理ファイルリーダエラー発生イベントハンドラ.
 */
CMigParserAreaComponentManager.BulkInputFileReaderOnError = function (evt) {

	// 中断されたことを示すメッセージを出力
	CMigParserAreaComponentManager.bulkInputResultParseInfoText += "\n";
	CMigParserAreaComponentManager.bulkInputResultParseInfoText += "【エラー】\n";
	CMigParserAreaComponentManager.bulkInputResultParseInfoText += "ファイルの読み込みでエラーが発生しました。\n";
	CMigParserAreaComponentManager.bulkInputResultParseInfoText += "ファイル名：" + CMigParserAreaComponentManager.bulkInputInputtedFile.name + "\n";
	CMigParserAreaComponentManager.bulkInputResultParseInfoText += "エラー名：" + CMigParserAreaComponentManager.bulkInputFileReader.error.name + "\n";
	CMigParserAreaComponentManager.bulkInputResultParseInfoText += "エラー内容：" + CMigParserAreaComponentManager.bulkInputFileReader.error.message + "\n";
	CMigParserAreaComponentManager.bulkInputResultParseInfoText += "\n";

	// 処理失敗フラグを設定
	CMigParserAreaComponentManager.bulkInputResultSucceeded = false;
	CMigParserAreaComponentManager.bulkInputProcFailedCount++;

	// 次の読み込みへ
	CMigParserAreaComponentManager.bulkInputProcFileIndex++;
	CMigParserAreaComponentManager.bulkInputFileReader = null;
	CMigParserAreaComponentManager.BulkInputNext();
};

/**
 * バルク入力処理ファイルリーダ読み込み完了イベントハンドラ.
 */
CMigParserAreaComponentManager.BulkInputFileReaderOnLoad = function (evt) {

	var parsedIdValue = 0;
	var parsedInfo = null;



	// 読み込んだデータを取得
	CMigParserAreaComponentManager.bulkInputInputtedText = evt.target.result;

	// データ検査
	if (CMigParserAreaComponentManager.bulkInputInputtedText.length == 0) {

		// 検査不適合を示すメッセージを出力
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "\n";
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "【エラー】\n";
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "ファイルから読み込んだテキストが空です。\n";
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "ファイル名：" + CMigParserAreaComponentManager.bulkInputInputtedFile.name + "\n";
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "\n";

		// 処理失敗フラグを設定
		CMigParserAreaComponentManager.bulkInputResultSucceeded = false;
		CMigParserAreaComponentManager.bulkInputProcFailedCount++;

		// 次の読み込みへ
		CMigParserAreaComponentManager.bulkInputProcFileIndex++;
		CMigParserAreaComponentManager.bulkInputFileReader = null;
		CMigParserAreaComponentManager.BulkInputNext();

		return;
	}



	// TODO: 旧ファイル名形式からの移行
	var fileNameSplitted = CMigParserAreaComponentManager.bulkInputInputtedFile.name.split("##");
	if (fileNameSplitted.length == 8) {

		var dataKindMigFromOldFileName = 0;

		switch (fileNameSplitted[0]) {
		case "IDS":
			dataKindMigFromOldFileName = CONST_DATA_KIND_ITEM;
			break;
		case "ADS":
			dataKindMigFromOldFileName = CONST_DATA_KIND_ARROW;
			break;
		}

		// パース処理
		parsedIdValue = CMigParserAreaComponentManager.sourceTextParser.ParseSourceTextEquipables(
			CMigParserAreaComponentManager.bulkInputInputtedText,
			dataKindMigFromOldFileName,
			"MIG_" + fileNameSplitted[3],
			fileNameSplitted[2],
			fileNameSplitted[1],
			fileNameSplitted[4],
			fileNameSplitted[5],
			fileNameSplitted[6]
		);
	}

	else {

		// パース処理
		switch (fileNameSplitted[0]) {
		case "IDS":
		case "ADS":
			parsedIdValue = CMigParserAreaComponentManager.sourceTextParser.ParseSourceTextEquipables(CMigParserAreaComponentManager.bulkInputInputtedText);
			break;
		case "EDS":
			parsedIdValue = CMigParserAreaComponentManager.sourceTextParser.ParseSourceTextEnchList(CMigParserAreaComponentManager.bulkInputInputtedText);
			break;
		}

	}

	// TODO: 本当なら、戻り値のチェックが必要



	// インデックスを保持
	CMigParserAreaComponentManager.lastParsedIdValue = parsedIdValue;

	// 結果加工
	parsedInfo = CMigParserAreaComponentManager.sourceTextParser.GetParsedInfo(parsedIdValue);

	// 成功した場合
	if (parsedInfo.status == PARSED_INFO_STATUS_SUCCEEDED) {

		// 情報を出力
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "成功（" + parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_NAME) + "）\n";

		// テスト対象リスト作成用にID定義を保管しておく
		CMigParserAreaComponentManager.bulkInputInputtedIdStrArray.push(parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR));
	}

	// 失敗した場合
	else {

		// 成功フラグを落とす
		CMigParserAreaComponentManager.bulkInputResultSucceeded = false;
		CMigParserAreaComponentManager.bulkInputProcFailedCount++;

		// 処理失敗を示すメッセージを出力
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "\n";
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "【エラー】\n";
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "パース処理に失敗しました。\n";
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "ファイル名：" + CMigParserAreaComponentManager.bulkInputInputtedFile.name + "\n";
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "以下の情報を参照してください。\n";
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += "次のデータの解析に失敗しました。\n";
		CMigParserAreaComponentManager.bulkInputResultParseInfoText += parsedInfo.statusDetailText;
	}

	CMigParserAreaComponentManager.bulkInputResultOutputTextArray = CMigParserAreaComponentManager.bulkInputResultOutputTextArray.concat(parsedInfo.jsText);
	CMigParserAreaComponentManager.bulkInputResultOutputTextArray.push(("\r\n").repeat(3));



	// 次の読み込みへ
	CMigParserAreaComponentManager.bulkInputProcFileIndex++;
	CMigParserAreaComponentManager.bulkInputFileReader = null;
	CMigParserAreaComponentManager.BulkInputNext();
};

/**
 * バルク入力終了イベントハンドラ.
 */
CMigParserAreaComponentManager.BulkInputEnd = function () {

	var ret = null;



	// 表示対象選択セレクトボックスを再構築
	CMigParserAreaComponentManager.RebuildSelectDisplayTarget(CMigParserAreaComponentManager.lastParsedIdValue);



	ret = [
		CMigParserAreaComponentManager.bulkInputResultSucceeded,
		CMigParserAreaComponentManager.bulkInputResultParseInfoText,
		"",
		CMigParserAreaComponentManager.bulkInputResultSucceeded ? "" : "問題のある処理がありました。",
	];

	CMigParserAreaComponentManager.bulkInputFuncAfterBulkEnd(ret);
};



















//================================================================================================================================
//================================================================================================================================
//
//
// 解析済みデータ表示関連
//
//
//================================================================================================================================
//================================================================================================================================

/**
 * 表示データの表示対象選択セレクトボックスを再構築する.
 * @param valueToSet 設定する値
 */
CMigParserAreaComponentManager.RebuildSelectDisplayTarget = function (valueToSet) {

	var bRestorable = false;
	var bSetable = false;
	var selectedValue = 0;
	var decidedValue = 0;

	var objSelect = null;

	var funcAddOption = function (currentValueF, indexF, arrayF) {
		if (currentValueF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID) == selectedValue) {
			bRestorable = true;
		}
		if (currentValueF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID) == valueToSet) {
			bSetable = true;
		}
		HtmlCreateElementOption(currentValueF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID), currentValueF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_NAME), objSelect);
	};



	// 現在の選択値を保持
	bRestorable = false;
	selectedValue = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_PARSE_DATA_DISP_TARGET", 0);

	// セレクトボックスを取得
	objSelect = document.getElementById("OBJID_SELECT_PARSE_DATA_DISP_TARGET");

	// 選択肢をすべて削除
	HtmlRemoveOptionAll(objSelect);

	// ソーステキストパーサの全データを選択肢として追加
	CMigParserAreaComponentManager.sourceTextParser.ForEachParsedInfoSortedByIdValue(funcAddOption);

	// 選択肢がひとつもない場合はダミーを設定する
	if (objSelect.options.length == 0) {
		HtmlCreateElementOption(-1, "（データなし）", objSelect);
	}

	// そうでなければ、元の選択した選択可能ならば、選択する
	else {
		if (bSetable) {
			decidedValue = valueToSet;
		}
		else if (bRestorable) {
			decidedValue = selectedValue;
		}
		else {
			decidedValue = 0;
		}

		objSelect.value = decidedValue;
	}

	// 表示データをリフレッシュ
	CMigParserAreaComponentManager.RefreshDisplayData();
};

/**
 * 表示データをリフレッシュする.
 */
CMigParserAreaComponentManager.RefreshDisplayData = function () {

	var dispTarget = 0;
	var dispKind = 0;
	var parsedInfo = null;
	var outputText = "";

	var objSpan = null;



	// 選択状態を取得
	dispTarget = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_PARSE_DATA_DISP_TARGET", -1);
	dispKind = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_PARSE_DATA_DISP_KIND", 0);



	// データが正常に取得できていない場合は、個別処理
	if (dispTarget < 0) {

		// ステータス表示を空欄にする
		objSpan = document.getElementById("OBJID_SPAN_PARSE_DATA_STATUS");
		if (objSpan) {
			HtmlRemoveAllChild(objSpan);
		}

		// テキスト表示を空欄にする
		HtmlSetObjectValueById("OBJID_TEXTAREA_PARSE_OUTPUT", "");

		return;
	}



	// 解析情報を取得
	parsedInfo = CMigParserAreaComponentManager.sourceTextParser.GetParsedInfo(dispTarget);



	// ステータスの表示
	objSpan = document.getElementById("OBJID_SPAN_PARSE_DATA_STATUS");

	HtmlRemoveAllChild(objSpan);

	if (parsedInfo.status == PARSED_INFO_STATUS_SUCCEEDED) {
		objSpan.removeAttribute("class");
		HtmlCreateTextNode("ステータス：成功", objSpan);
	}
	else {
		objSpan.setAttribute("class", "CSSCLS_GENERAL_COLOR_RED");
		HtmlCreateTextNode("ステータス：失敗", objSpan);
	}


	// 表示するテキストを特定
	switch (dispKind) {

	// 解析元テキスト表示
	case 0:
		outputText = parsedInfo.dataTextSrc;
		break;

	// 解析後jsコード表示
	case 1:
		outputText = CMigParserAreaComponentManager.sourceTextParser.MakeJsTextSub(parsedInfo).join("\r\n\r\n");
		break;
	}

	// テキストエリアに表示
	HtmlSetObjectValueById("OBJID_TEXTAREA_PARSE_OUTPUT", outputText);
};



















//================================================================================================================================
//================================================================================================================================
//
//
// 解析済みデータ出力関連
//
//
//================================================================================================================================
//================================================================================================================================

/**
 * 解析済みデータを出力する.
 */
CMigParserAreaComponentManager.OutputParsedData = function () {

	var idx = 0;

	var jsText = "";
	var jsTextBody = "";
	var testTargetArray = null;

	var funcOutputSourceTextFileCaller = function (currentValueF, indexF, arrayF) {

		// バルク入力したIDに一致がある場合は、ソーステキストファイルは出力しない
		if (CMigParserAreaComponentManager.bulkInputInputtedIdStrArray) {
			if (CMigParserAreaComponentManager.bulkInputInputtedIdStrArray.indexOf(currentValueF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR)) >= 0) {
				return;
			}
		}

		// ソーステキストファイルを出力
		CMigParserAreaComponentManager.OutputSourceTextFile(currentValueF);
	};

	var funcAddTestTarget = function (currentValueF, indexF, arrayF) {
		testTargetArray.push(currentValueF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR));
	};



	// TODO: データ移行過渡処理
	/*
	EnumConstDataKind.For(
		function (idx, name, value) {
		},
		[
			"CONST_DATA_KIND_NONE"
		]
	);
	*/

	[
		CONST_DATA_KIND_ITEM,
		CONST_DATA_KIND_ARROW,
		CONST_DATA_KIND_ENCHANT_LIST,
	].forEach(
		function (valueF, indexF, arrayF) {

			var jsManagerInstanceCodeF = "";

			// jsコードの統合
			jsTextBody = CMigParserAreaComponentManager.sourceTextParser.MakeJsText(valueF);

			// 当該データ種別の js コードがない場合は、処理しない
			if (jsTextBody.length == 0) {
				return;
			}

			// マネージャインスタンスを示すコードの取得
			switch (valueF) {

			case CONST_DATA_KIND_ITEM:
				jsManagerInstanceCodeF = "g_constDataManager.itemDataManager";
				break;

			case CONST_DATA_KIND_ARROW:
				jsManagerInstanceCodeF = "g_constDataManager.arrowDataManager";
				break;

			case CONST_DATA_KIND_ENCHANT_LIST:
				jsManagerInstanceCodeF = "g_constDataManager.enchListDataManager";
				break;

			}

			// jsコードの加工
			jsText = "";
			jsText += "if (_DATA_CREATE_MODE) {\t\t// _DATA_CREATE_MODE" + "\r\n",
			jsText += ("\r\n").repeat(3);
			jsText += "(function () {" + "\r\n";
			jsText += "\r\n";
			jsText += "\t// データ追加対象データ配列取得" + "\r\n";
			jsText += "\tvar dataArray = " + jsManagerInstanceCodeF + ".sourceArray;" + "\r\n";

			jsText += ("\r\n").repeat(3);

			jsText += jsTextBody;

			jsText += ("\r\n").repeat(3);
			jsText += "})();" + "\r\n";
			jsText += ("\r\n").repeat(3);
			jsText += "}\t\t// _DATA_CREATE_MODE";

			// テスト対象のリストアップ
			testTargetArray = [];
			CMigParserAreaComponentManager.sourceTextParser.ForEachParsedInfoSortedByIdValue(funcAddTestTarget);



			// 解析元テキストの出力
			CMigParserAreaComponentManager.sourceTextParser.ForEachParsedInfoSortedByIdValue(funcOutputSourceTextFileCaller);

			// jsコードの出力
			// TODO: ファイル名固定
			CMigParserAreaComponentManager.OutputDataMakerScriptFile(valueF, 1, jsText);

			// テスト対象リスト出力
			// TODO: ファイル名固定
			CMigParserAreaComponentManager.OutputTestTargetListFile(valueF, 1, testTargetArray.join(",\r\n"));

		}
	);



	// 出力開始
	CFileOutputManager.BeginOutput(null, null, null);
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
 * ソーステキストをファイル出力出力する.
 * @param parsedInfo パース情報
 */
CMigParserAreaComponentManager.OutputSourceTextFile = function (parsedInfo) {

	var prefix = "";
	var dataKana = "";
	var dataIdValue = 0;
	var refIdValue = 0;
	var fileName = "";



	// プリフィックスを決定する
	switch (parseInt(parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KIND), 10)) {

	case CONST_DATA_KIND_ITEM:
		prefix = "IDS";			// ITEM DATA SOURCE
		dataKana = parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KANA);
		break;

	case CONST_DATA_KIND_ARROW:
		prefix = "ADS";			// ARROW DATA SOURCE
		dataKana = parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KANA);
		break;

	case CONST_DATA_KIND_ENCHANT_LIST:
		prefix = "EDS";			// ENCHANT DATA SOURCE
		dataKana = parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KANA_ALIAS);
		break;

	}



	// データ



	// 採用されたIDを取得する
	dataIdValue = parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID);

	// 実定義がされていなければ、自動を示す値を設定する
	if (dataIdValue === undefined) {
		dataIdValue = -1;
	}



	// 参照IDを取得
	refIdValue = parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID);

	// 実定義がされていなければ、自動を示す値を設定する
	if (refIdValue === undefined) {
		refIdValue = -1;
	}


	// ファイル名を組み立てる
	fileName = prefix + "##" + dataKana + "##" + dataIdValue + "##" + refIdValue + "##" + ".rrtsrc";



	// ファイル出力
	CMigParserAreaComponentManager.OutputFile(fileName, parsedInfo.GetRrtSrcText());
};

/**
 * データ作成クラス用スクリプトテキストをファイル出力する.
 * @param dataKind データ種別
 * @param fileLabel ファイルラベル
 * @param scriptText スクリプトテキスト
 */
CMigParserAreaComponentManager.OutputDataMakerScriptFile = function (dataKind, fileNo, scriptText) {

	var fileName = "";

	// ファイル名を決定する
	switch (dataKind) {

	case CONST_DATA_KIND_ITEM:
		fileName = "CMigItemDataMaker.part." + ("00" + fileNo).slice(-2);
		break;

	case CONST_DATA_KIND_ARROW:
		fileName = "CMigArrowDataMake.part." + ("00" + fileNo).slice(-2);
		break;

	case CONST_DATA_KIND_ENCHANT_LIST:
		fileName = "CMigEnchListDataMake.part." + ("00" + fileNo).slice(-2);
		break;

	}

	// ファイル出力
	CMigParserAreaComponentManager.OutputFile(fileName + ".js", scriptText);
};

/**
 * テスト対象リストを出力する.
 * @param dataKind データ種別
 * @param fileLabel ファイルラベル
 * @param targetListText 対象リストテキスト
 */
CMigParserAreaComponentManager.OutputTestTargetListFile = function (dataKind, fileNo, targetListText) {

	var fileName = "";
	var prefix = "";



	// プリフィックスを決定する
	switch (dataKind) {

	case CONST_DATA_KIND_ITEM:
		prefix = "IDT";			// ITEM DATA TARGET
		break;

	case CONST_DATA_KIND_ARROW:
		prefix = "ADT";			// ARROW DATA TARGET
		break;

	case CONST_DATA_KIND_ENCHANT_LIST:
		prefix = "EDT";			// ENCHANT DATA TARGET
		break;

	}

	// ファイル名を組み立てる
	fileName = prefix + "##" + ("00" + fileNo).slice(-2) + "##" + ".rrtttl";


	// ファイル出力
	CMigParserAreaComponentManager.OutputFile(fileName, targetListText);
};



/**
 * ファイル出力する.
 * @param fileName ファイル名
 * @param fileContent ファイルの内容
 */
CMigParserAreaComponentManager.OutputFile = function (fileName, fileContent) {
	CFileOutputManager.RegisterFile(fileName, fileContent);
};

















// 初期構築処理
CMigParserAreaComponentManager.RebuildControls();



