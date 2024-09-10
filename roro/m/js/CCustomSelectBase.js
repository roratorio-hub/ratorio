




/**
 * カスタムセレクトクラス（基底）.
 */
function CCustomSelectBase () {

	// インスタンスID名
	this.instanceIdName = "";

	// 展開タイトル
	this.extractTitle = "";

	// 選択中のデータID
	this.selectedDataId = 0;

	// 選択中のソートID
	this.selectedSortId = 0;

	// 入力中の検索テキスト
	this.inputtedSearchText = "";

	// 選択中の検索結果
	this.selectedSearchResult = 0;

	// 展開中フラグ
	this.bExtracted = false;

	// ヘルプ表示フラグ
	this.bDispHelp = false;

	// ルートオブジェクト
	this.objRoot = null;

	// データ選択コントロール
	this.objSelectData = null;

	// データ選択変更処理時に追加で呼び出されるイベントハンドラ配列
	this.onChangeSelectDataExtraHandllerArray = [];

	// 展開ボタンオブジェクト
	this.objExtractSwitch = null;

	// 展開先ルートオブジェクト
	this.objExtractRoot = null;

	// ヘルプボタンコントロール
	this.objHelpButton = null;

	// ヘルプ表示ルートオブジェクト
	this.objHelpRoot = null;

	// 閉じるボタンコントロール
	this.objCloseButton = null;

	// ソート選択コントロール
	this.objSelectSort = null;

	// 検索入力コントロール
	this.objInputSearch = null;

	// 検索結果コントロール
	this.objSearchResult = null;

	// 検索結果適用ボタンコントロール
	this.objApplyButton = null;



	/**
	 * イニシャライザ.
	 * @param instanceIdName インスタンスID名
	 * @param extractTitle 展開エリアタイトル
	 */
	this.Initialize = function (instanceIdName, extractTitle) {

		var objInput = null;

		// インスタンス登録
		CCustomSelectBase.RegisterInstance(instanceIdName, this);

		// メンバ変数初期化
		this.instanceIdName = instanceIdName;
		this.extractTitle = extractTitle;
		this.selectedDataId = -1;
		this.selectedSortId = -1;
		this.inputtedSearchText = "";
		this.selectedSearchResult = -1;
		this.bExtracted = false;
		this.bDispHelp = false;

		// ルートオブジェクト生成
		this.objRoot = HtmlCreateElement("span", null);

		// 展開スイッチ生成
		this.objExtractSwitch = this.CreateExtractSwitch();
		this.RebuildExtractSwitch();

		// 展開先ルートオブジェクト
		this.objExtractRoot = HtmlCreateElement("span", null);
		this.objExtractRoot.setAttribute("style", "margin-left : 8px; position : relative;");

		// ヘルプボタンコントロール生成
		this.objHelpButton = this.CreateHelpButton();
		this.RebuildHelpButton();

		// ヘルプ表示ルートオブジェクト
		this.objHelpRoot = HtmlCreateElement("span", null);
		this.objHelpRoot.setAttribute("style", "margin-left : 8px; position : relative;");

		// 閉じるボタンコントロール生成
		this.objCloseButton = this.CreateCloseButton();
		this.RebuildCloseButton();

		// ソート選択コントロール生成
		this.objSelectSort = this.CreateSelectSort();
		this.RebuildSelectSort();

		// 検索入力コントロール生成
		this.objInputSearch = this.CreateInputSearch();
		this.RebuildInputSearch();

		// 検索結果コントロール生成
		this.objSearchResult = this.CreateSearchResult();
		this.RebuildSearchResult();

		// 検索結果適用ボタンコントロール生成
		this.objApplyButton = this.CreateApplyButton();
		this.RebuildApplyButton();

		// データ選択コントロール生成
		// （他のコントロールを参照するので、最後に生成すること）
		this.objSelectData = this.CreateSelectData();
		this.RebuildSelectData();



		// オブジェクト設定
		this.objRoot.appendChild(this.objSelectData);
		this.objRoot.appendChild(this.objExtractSwitch);
		this.objRoot.appendChild(this.objExtractRoot);

	};



	/**
	 * ルートオブジェクトを取得する.
	 * @return ルートオブジェクト
	 */
	this.GetRootObject = function () {
		return this.objRoot;
	};



	/**
	 * 選択中のデータIDを取得する.
	 * @return 選択中のデータID
	 */
	this.GetSelectedDataId = function () {
		return this.selectedDataId;
	};

	/**
	 * 選択中のデータIDを変更する.
	 * @param dataId 選択したいデータID
	 * @param bResetWhenFailed 選択失敗時にリセットするかのフラグ
	 */
	this.ChangeSelectedDataId = function (dataId, bResetWhenFailed) {

		var idx = 0;

		var options = null;
		var candidateId = 0;

		// 選択候補のIDを調整
		candidateId = -1;

		// データ選択セレクトボックスの選択肢配列を取得
		options = this.objSelectData.options;

		// 全ての選択肢を検査
		for (idx = 0; idx < options.length; idx++) {

			// 選択肢の値と引数で渡された希望するIDが一致した場合
			if (options[idx].value == dataId) {

				// 選択候補のIDを更新
				candidateId = parseInt(options[idx].value, 10);

				// 処理打ち切り
				break;
			}
		}

		// 選択に失敗している場合
		if (candidateId < 0) {

			// 失敗時のリセットフラグが偽の場合
			if (!bResetWhenFailed) {

				// 現在の選択状態を返して、処理終了
				return this.selectedDataId;
			}

			// それ以外の場合は、先頭要素に処理をリセットする
			// candidateId = parseInt(options[idx].value, 10);
			candidateId = parseInt(options[0].value, 10);
		}

		// データIDを選択
		this.objSelectData.value = candidateId;

		// 変更処理呼び出し
		this.OnChangeSelectData();

		// 最終的な選択状態を返す
		return this.selectedDataId;
	};



	/**
	 * 展開状態を変更する.
	 * @param bExtract 展開フラグ
	 */
	this.ChangeExtractState = function (bExtract) {

		// 展開フラグを設定する
		this.bExtracted = bExtract;

		// 展開スイッチを再構築
		this.RebuildExtractSwitch();

		// 展開エリアを再構築
		this.RebuildExtractArea();
	};

	/**
	 * 選択状態をリセットする.
	 * @remark 継承先でオーバーライドすること
	 */
	this.ResetSelect = function () {

		// メンバ変数初期化
		this.selectedDataId = -1;
		this.selectedSortId = -1;
		this.inputtedSearchText = "";

		// コントロール再構築
		this.RebuildSelectData();
		this.RebuildSelectSort();
		this.RebuildInputSearch();

	};





	/**
	 * データ選択コントロールの変更イベントハンドラ呼び出しスクリプトを取得する.
	 * @return ハンドラ呼び出しスクリプト
	 */
	this.GetHandlerScriptOnChangeSelectData = function () {
		return "CCustomSelectBase.OnChangeSelectData(\"" + this.instanceIdName + "\")";
	};

	/**
	 * データ選択変更処理時に追加で呼び出されるイベントハンドラを追加する.
	 * @param func イベントハンドラ
	 * @param thisArg 参照するthis
	 */
	this.AddOnChangeSelectDataExtraHandller = function (func, thisArg) {
		this.onChangeSelectDataExtraHandllerArray.push([func, thisArg]);
	};

	/**
	 * データ選択コントロールを生成する.
	 * @return 構築したコントロールオブジェクト
	 */
	this.CreateSelectData = function () {

		// 処理本体呼び出し
		return this.CreateSelectDataSub();
	};

	/**
	 * データ選択コントロールを生成する（処理本体）.
	 * @return 構築したコントロールオブジェクト
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.CreateSelectDataSub = function () {

		var objSelect = null;

		// オブジェクト生成
		objSelect = HtmlCreateElement("select", null);
		objSelect.setAttribute("onchange", this.GetHandlerScriptOnChangeSelectData());
		objSelect.setAttribute("class", "OBJID_" + this.instanceIdName);

		// 構築したコントロールを返す
		return objSelect;
	};

	/**
	 * データ選択コントロールを再構築する.
	 */
	this.RebuildSelectData = function () {

		// 処理本体呼び出し
		this.RebuildSelectDataSub();
	};

	/**
	 * データ選択コントロールを再構築する（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.RebuildSelectDataSub = function () {
	};

	/**
	 * データ選択コントロールの変更イベントハンドラ.
	 */
	this.OnChangeSelectData = function () {

		var idx = 0;

		var funcData = null;

		// 処理本体呼び出し
		this.OnChangeSelectDataSub();

		// 追加イベントハンドラを呼び出し
		for (idx = 0; idx < this.onChangeSelectDataExtraHandllerArray.length; idx++) {
			funcData = this.onChangeSelectDataExtraHandllerArray[idx];
			funcData[0].call(funcData[1]);
		}
	};

	/**
	 * データ選択コントロールの変更イベントハンドラ（処理本体）.
	 * @remark 継承先でオーバーライドすること
	 */
	this.OnChangeSelectDataSub = function () {

		// 選択されたデータを更新
		this.selectedDataId = parseInt(this.objSelectData.value, 10);
	};



	/**
	 * 展開スイッチの変更イベントハンドラ呼び出しスクリプトを取得する.
	 * @return ハンドラ呼び出しスクリプト
	 */
	this.GetHandlerScriptOnChangeExtractSwitch = function () {
		return "CCustomSelectBase.OnChangeExtractSwitch(\"" + this.instanceIdName + "\")";
	};

	/**
	 * 展開スイッチを生成する.
	 * @return 構築したコントロールオブジェクト
	 */
	this.CreateExtractSwitch = function () {

		var objInput = null;

		objInput = HtmlCreateElement("input", null);
		objInput.setAttribute("type", "button");
		objInput.setAttribute("style", "margin-left : 8px;");
		objInput.setAttribute("onclick", this.GetHandlerScriptOnChangeExtractSwitch());

		return objInput;
	};

	/**
	 * 展開スイッチを再構築する.
	 */
	this.RebuildExtractSwitch = function () {

		// 展開ボタンの表示を変更
		if (this.bExtracted) {
			this.objExtractSwitch.value = "≪";
		}
		else {
			this.objExtractSwitch.value = "≫";
		}
	};

	/**
	 * 展開スイッチの変更イベントハンドラ.
	 */
	this.OnChangeExtractSwitch = function () {

		// 展開状態を変更（展開フラグはスイッチング）
		this.ChangeExtractState(this.bExtracted ^ true);
	};

	/**
	 * 展開エリアを再構築する.
	 */
	this.RebuildExtractArea = function () {

		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;

		var objTableSub = null;
		var objTbodySub = null;
		var objTrSub = null;
		var objTdSub = null;

		// 展開エリアを初期化
		HtmlRemoveAllChild(this.objExtractRoot);

		// 展開表示でなければ、処理終了
		if (!this.bExtracted) {
			return;
		}

		//----------------------------------------------------------------
		// 展開エリア再構築
		// （IE では width : max-content が未対応だが、コントロールは折り返されないので、最低限の操作性は確保できる）
		//----------------------------------------------------------------
		objTable = HtmlCreateElement("table", this.objExtractRoot);
		objTable.setAttribute("style", "background-color : #FFCC99; border : solid; display : inline-block; position : absolute; width : max-content;");
		objTbody = HtmlCreateElement("tbody", objTable);

		//--------------------------------
		// タイトル、ヘルプボタン等
		//--------------------------------
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("colspan", "2");

		objTableSub = HtmlCreateElement("table", objTd);
		objTableSub.setAttribute("style", "width : 100%;");
		objTbodySub = HtmlCreateElement("tbody", objTableSub);
		objTrSub = HtmlCreateElement("tr", objTbodySub);
		objTrSub.setAttribute("style", "width : 100%;");

		objTdSub = HtmlCreateElement("td", objTrSub);
		objTdSub.setAttribute("style", "text-align : center;");
		HtmlCreateTextNode(this.extractTitle, objTdSub);

		objTdSub = HtmlCreateElement("td", objTrSub);
		objTdSub.setAttribute("style", "text-align : right;");
		objTdSub.appendChild(this.objHelpButton);
		objTdSub.appendChild(this.objHelpRoot);
		objTdSub.appendChild(this.objCloseButton);

		//--------------------------------
		// ソート
		//--------------------------------
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("style", "text-align : center;");
		HtmlCreateTextNode("ソート", objTd);

		objTd = HtmlCreateElement("td", objTr);
		objTd.appendChild(this.objSelectSort);

		//--------------------------------
		// 検索入力
		//--------------------------------
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("style", "text-align : center;");
		HtmlCreateTextNode("検索", objTd);

		objTd = HtmlCreateElement("td", objTr);
		objTd.appendChild(this.objInputSearch);

		//--------------------------------
		// 検索結果
		//--------------------------------
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("style", "text-align : center; vertical-align : bottom;");
		HtmlCreateTextNode("結果", objTd);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("rowspan", "2");
		objTd.appendChild(this.objSearchResult);

		//--------------------------------
		// 検索結果適用ボタン
		//--------------------------------
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("style", "text-align : center; vertical-align : top;");
		objTd.appendChild(this.objApplyButton);

	};



	/**
	 * ヘルプボタンのクリックイベントハンドラ呼び出しスクリプトを取得する.
	 * @return ハンドラ呼び出しスクリプト
	 */
	this.GetHandlerScriptOnClickHelpButton = function () {
		return "CCustomSelectBase.OnClickHelpButton(\"" + this.instanceIdName + "\")";
	};

	/**
	 * ヘルプボタンを生成する.
	 * @return 構築したコントロールオブジェクト
	 */
	this.CreateHelpButton = function () {

		var objInput = null;

		objInput = HtmlCreateElement("input", null);
		objInput.setAttribute("type", "button");
		objInput.setAttribute("value", "？");
		objInput.setAttribute("onclick", this.GetHandlerScriptOnClickHelpButton());

		return objInput;
	};

	/**
	 * ヘルプボタンを再構築する.
	 * @remark 継承先でオーバーライドすること
	 */
	this.RebuildHelpButton = function () {
	};

	/**
	 * ヘルプボタンのクリックイベントハンドラ.
	 */
	this.OnClickHelpButton = function () {

		// ヘルプ表示フラグをスイッチング
		this.bDispHelp ^= true;

		// ヘルプボタンを再構築
		this.RebuildHelpButton();

		// ヘルプエリアを再構築
		this.RebuildHelpArea();

	};

	/**
	 * ヘルプエリアを再構築する.
	 */
	this.RebuildHelpArea = function () {

		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		var objInput = null;

		// ヘルプ表示を初期化
		HtmlRemoveAllChild(this.objHelpRoot);

		// ヘルプ表示でなければ、処理終了
		if (!this.bDispHelp) {
			return;
		}

		//----------------------------------------------------------------
		// ヘルプ表示エリア再構築
		// （IE では width : max-content が未対応なので、min-width を指定することで、最低限の可読性を確保する）
		//----------------------------------------------------------------
		objTable = HtmlCreateElement("table", this.objHelpRoot);
		objTable.setAttribute("style", "background-color : #FFCC99; border : solid; display : inline-block; position : absolute; width : max-content; min-width : 256px;");
		objTbody = HtmlCreateElement("tbody", objTable);

		//--------------------------------
		// タイトル
		//--------------------------------
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextNode("簡易ヘルプ", objTd);

		// 閉じるボタン
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("style", "text-align : right;");
		objInput = HtmlCreateElement("input", objTd);
		objInput.setAttribute("type", "button");
		objInput.setAttribute("value", "×");
		objInput.setAttribute("onclick", this.GetHandlerScriptOnClickHelpButton());

		//--------------------------------
		// 区切り線
		//--------------------------------
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("colspan", "2");

		HtmlCreateElement("hr", objTd);

		//--------------------------------
		// ヘルプ本体
		//--------------------------------
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("colspan", "2");

		this.RebuildHelpAreaSub(objTd);
	};

	/**
	 * ヘルプエリアを再構築する（処理本体）.
	 * @param objRoot ルートオブジェクト
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.RebuildHelpAreaSub = function (objRoot) {
	};

	/**
	 * ヘルプエリアを再構築する（処理本体　デフォルト）.
	 * @param summaryArray 概要配列
	 * @param explainArray 説明データ配列
	 * @param objRoot ルートオブジェクト
	 */
	this.RebuildHelpAreaSubDefault = function (summaryArray, explainArray, objRoot) {

		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;

		// 要素初期化
		HtmlRemoveAllChild(objRoot);

		// 表示テーブル生成
		objTable = HtmlCreateElement("table", objRoot);
		objTbody = HtmlCreateElement("tbody", objTable);

		// 概要
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		HtmlAppendTextNodeMulti(summaryArray, objTd);

		// 説明表テーブル
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		this.RebuildHelpAreaSubCreateExplainTable(explainArray, objTd);
	};

	/**
	 * ヘルプエリアを再構築する（処理本体　説明表生成）.
	 * @param explainArray 説明データ配列
	 * @param objRoot ルートオブジェクト
	 */
	this.RebuildHelpAreaSubCreateExplainTable = function (explainArray, objRoot) {

		var idx = 0;

		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;

		// 説明表テーブル
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "border : thin solid;");
		objTbody = HtmlCreateElement("tbody", objTable);

		// 要素説明
		for (idx = 0; idx < explainArray.length; idx++) {

			// テーブル行生成
			objTr = HtmlCreateElement("tr", objTbody);

			// 要素名
			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("style", "border : thin solid;");
			HtmlCreateTextNode(explainArray[idx][0], objTd);

			// 説明文
			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("style", "border : thin solid;");
			HtmlAppendTextNodeMulti(explainArray[idx][1], objTd);
		}

		return objTable;
	};



	/**
	 * 閉じるボタンのクリックイベントハンドラ呼び出しスクリプトを取得する.
	 * @return ハンドラ呼び出しスクリプト
	 */
	this.GetHandlerScriptOnClickCloseButton = function () {
		return "CCustomSelectBase.OnClickCloseButton(\"" + this.instanceIdName + "\")";
	};

	/**
	 * 閉じるボタンを生成する.
	 * @return 構築したコントロールオブジェクト
	 */
	this.CreateCloseButton = function () {

		var objInput = null;

		objInput = HtmlCreateElement("input", null);
		objInput.setAttribute("type", "button");
		objInput.setAttribute("value", "×");
		objInput.setAttribute("onclick", this.GetHandlerScriptOnClickCloseButton());

		return objInput;
	};

	/**
	 * 閉じるボタンを再構築する.
	 */
	this.RebuildCloseButton = function () {
	};

	/**
	 * 閉じるボタンのクリックイベントハンドラ.
	 */
	this.OnClickCloseButton = function () {

		// 閉じるボタンを再構築
		this.RebuildCloseButton();

		// 展開状態を閉じる
		this.ChangeExtractState(false);
	};



	/**
	 * ソート選択コントロールの変更イベントハンドラ呼び出しスクリプトを取得する.
	 * @return ハンドラ呼び出しスクリプト
	 */
	this.GetHandlerScriptOnChangeSelectSort = function () {
		return "CCustomSelectBase.OnChangeSelectSort(\"" + this.instanceIdName + "\")";
	};

	/**
	 * ソート選択コントロールを生成する.
	 * @return 構築したコントロールオブジェクト
	 */
	this.CreateSelectSort = function () {

		// 処理本体呼び出し
		return this.CreateSelectSortSub();
	};

	/**
	 * ソート選択コントロールを生成する（処理本体）.
	 * @return 構築したコントロールオブジェクト
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.CreateSelectSortSub = function () {

		var objSelect = null;

		// オブジェクト生成
		objSelect = HtmlCreateElement("select", null);
		objSelect.setAttribute("onchange", this.GetHandlerScriptOnChangeSelectSort());

		// 構築したコントロールを返す
		return objSelect;
	};

	/**
	 * ソート選択コントロールを再構築する.
	 */
	this.RebuildSelectSort = function () {

		// 処理本体呼び出し
		this.RebuildSelectSortSub();
	};

	/**
	 * ソート選択コントロールを再構築する（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.RebuildSelectSortSub = function () {
	};

	/**
	 * ソート選択コントロールの変更イベントハンドラ.
	 */
	this.OnChangeSelectSort = function () {

		// 処理本体呼び出し
		this.OnChangeSelectSortSub();
	};

	/**
	 * ソート選択コントロールの変更イベントハンドラ（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.OnChangeSelectSortSub = function () {

		// 選択されたソートを更新
		this.selectedSortId = parseInt(this.objSelectSort.value, 10);

		// データ選択コントロールを再構築
		this.RebuildSelectData();

		// 検索結果コントロールを再構築
		this.RebuildSearchResult();
	};




	/**
	 * 検索入力コントロールの変更イベントハンドラ呼び出しスクリプトを取得する.
	 * @return ハンドラ呼び出しスクリプト
	 */
	this.GetHandlerScriptOnInputInputSearch = function () {
		return "CCustomSelectBase.OnInputInputSearch(\"" + this.instanceIdName + "\")";
	};

	/**
	 * 検索入力コントロールを生成する.
	 * @return 構築したコントロールオブジェクト
	 */
	this.CreateInputSearch = function () {

		// 処理本体呼び出し
		return this.CreateInputSearchSub();
	};

	/**
	 * 検索入力コントロールを生成する（処理本体）.
	 * @return 構築したコントロールオブジェクト
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.CreateInputSearchSub = function () {

		var objInput = null;

		// オブジェクト生成
		objInput = HtmlCreateElement("input", null);
		objInput.setAttribute("type", "input");
		objInput.setAttribute("size", "16");
		objInput.setAttribute("oninput", this.GetHandlerScriptOnInputInputSearch());

		// 構築したコントロールを返す
		return objInput;
	};

	/**
	 * 検索入力コントロールを再構築する.
	 */
	this.RebuildInputSearch = function () {

		// 処理本体呼び出し
		this.RebuildInputSearchSub();
	};

	/**
	 * 検索入力コントロールを再構築する（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.RebuildInputSearchSub = function () {

		// 検索テキストを再設定
		this.objInputSearch.value = this.inputtedSearchText;
	};

	/**
	 * 検索入力コントロールの変更イベントハンドラ.
	 */
	this.OnInputInputSearch = function () {

		// 入力された検索テキストを、特定文字のエスケープを行ったうえで、更新
		this.inputtedSearchText = EscapeInputtedText(this.objInputSearch.value);

		// 検索テキストを再設定
		this.objInputSearch.value = this.inputtedSearchText;

		// 処理本体呼び出し
		this.OnInputInputSearchSub();
	};

	/**
	 * 検索入力コントロールの変更イベントハンドラ（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.OnInputInputSearchSub = function () {

		// 検索結果コントロールを再構築
		this.RebuildSearchResult();
	};




	/**
	 * 検索結果コントロールの変更イベントハンドラ呼び出しスクリプトを取得する.
	 * @return ハンドラ呼び出しスクリプト
	 */
	this.GetHandlerScriptOnChangeSearchResult = function () {
		return "CCustomSelectBase.OnChangeSearchResult(\"" + this.instanceIdName + "\")";
	};

	/**
	 * 検索結果コントロールのダブルクリックイベントハンドラ呼び出しスクリプトを取得する.
	 * @return ハンドラ呼び出しスクリプト
	 */
	this.GetHandlerScriptOnDblClickSearchResult = function () {
		return "CCustomSelectBase.OnDblClickSearchResult(\"" + this.instanceIdName + "\")";
	};

	/**
	 * 検索結果コントロールを生成する.
	 * @return 構築したコントロールオブジェクト
	 */
	this.CreateSearchResult = function () {

		// 処理本体呼び出し
		return this.CreateSearchResultSub();
	};

	/**
	 * 検索結果コントロールを生成する（処理本体）.
	 * @return 構築したコントロールオブジェクト
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.CreateSearchResultSub = function () {

		var objSelect = null;

		// オブジェクト生成
		objSelect = HtmlCreateElement("select", null);
		objSelect.setAttribute("size", "5");
		objSelect.setAttribute("onchange", this.GetHandlerScriptOnChangeSearchResult());
		objSelect.setAttribute("ondblclick", this.GetHandlerScriptOnDblClickSearchResult());

		// 構築したコントロールを返す
		return objSelect;
	};

	/**
	 * 検索結果コントロールを再構築する.
	 */
	this.RebuildSearchResult = function () {

		// 処理本体呼び出し
		this.RebuildSearchResultSub();
	};

	/**
	 * 検索結果コントロールを再構築する（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.RebuildSearchResultSub = function () {
	};

	/**
	 * 検索結果コントロールの変更イベントハンドラ.
	 */
	this.OnChangeSearchResult = function () {

		// 処理本体呼び出し
		this.OnChangeSearchResultSub();
	};

	/**
	 * 検索結果コントロールの変更イベントハンドラ（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.OnChangeSearchResultSub = function () {

		// 選択された結果を更新
		this.selectedSearchResult = parseInt(this.objSearchResult.value, 10);
	};

	/**
	 * 検索結果コントロールのダブルクリックイベントハンドラ.
	 */
	this.OnDblClickSearchResult = function () {

		// 処理本体呼び出し
		this.OnDblClickSearchResultSub();
	};

	/**
	 * 検索結果コントロールのダブルクリックイベントハンドラ（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.OnDblClickSearchResultSub = function () {

		// 選択された結果を更新
		this.selectedSearchResult = parseInt(this.objSearchResult.value, 10);

		// 選択結果を適用
		this.ApplySearchResult();
	};



	/**
	 * 検索結果適用ボタンのクリックイベントハンドラ呼び出しスクリプトを取得する.
	 * @return ハンドラ呼び出しスクリプト
	 */
	this.GetHandlerScriptOnClickApplyButton = function () {
		return "CCustomSelectBase.OnClickApplyButton(\"" + this.instanceIdName + "\")";
	};

	/**
	 * 検索結果適用ボタンを生成する.
	 * @return 構築したコントロールオブジェクト
	 */
	this.CreateApplyButton = function () {

		// 処理本体呼び出し
		return this.CreateApplyButtonSub();
	};

	/**
	 * 検索結果適用ボタンを生成する（処理本体）.
	 * @return 構築したコントロールオブジェクト
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.CreateApplyButtonSub = function () {

		var objInput = null;

		objInput = HtmlCreateElement("input", null);
		objInput.setAttribute("type", "button");
		objInput.setAttribute("value", "適用");
		objInput.setAttribute("onclick", this.GetHandlerScriptOnClickApplyButton());

		return objInput;
	};

	/**
	 * 検索結果適用ボタンを再構築する.
	 */
	this.RebuildApplyButton = function () {

		// 処理本体呼び出し
		return this.RebuildApplyButtonSub();
	};

	/**
	 * 検索結果適用ボタンを再構築する（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.RebuildApplyButtonSub = function () {
	};

	/**
	 * 検索結果適用ボタンのクリックイベントハンドラ.
	 */
	this.OnClickApplyButton = function () {

		// 処理本体呼び出し
		this.OnClickApplyButtonSub();
	};

	/**
	 * 検索結果適用ボタンのクリックイベントハンドラ（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.OnClickApplyButtonSub = function () {

		// 検索結果適用処理
		this.ApplySearchResult();
	};

	/**
	 * 検索結果適用処理.
	 */
	this.ApplySearchResult = function () {

		// 未選択の場合は処理しない
		if (this.selectedSearchResult < 0) {
			return;
		}

		// 処理本体呼び出し
		this.ApplySearchResultSub();
	};

	/**
	 * 検索結果適用処理（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.ApplySearchResultSub = function () {

		// データ選択を変更
		this.objSelectData.value = this.objSearchResult.value;

		// データ選択変更イベントハンドラ呼び出し
		this.OnChangeSelectData();
	};




}



// インスタンスマップ
CCustomSelectBase.instanceMap = new Map();

/**
 * インスタンスを登録する.
 * @param instanceIdName インスタンスID名
 * @param instanceObject インスタンスオブジェクト
 */
CCustomSelectBase.RegisterInstance = function (instanceIdName, instanceObject) {
	CCustomSelectBase.instanceMap.set(instanceIdName, instanceObject);
};

/**
 * 読み仮名検索用の正規表現オブジェクトを生成する.
 * @param inputtedSearchText 入力された検索文字列
 * @return 正規表現オブジェクト
 */
CCustomSelectBase.CreateKanaSearchRegExp = function (inputtedSearchText) {

	var kanaCode = "";

	if (inputtedSearchText == "") {
		return null;
	}

	// 仮名コードに変換
	kanaCode = CNameKana.GetKanaCode(inputtedSearchText);

	// 許容しない文字列があった場合は、処理打ち切り
	if (kanaCode.indexOf("XX") >= 0) {
		return null;
	}

	return new RegExp(kanaCode);
};

/**
 * データ選択コントロールの変更イベントハンドラ.
 * @param instanceIdName インスタンスID名
 */
CCustomSelectBase.OnChangeSelectData = function (instanceIdName) {

	var objInstance = null;

	objInstance = CCustomSelectBase.instanceMap.get(instanceIdName);

	objInstance.OnChangeSelectData();
};

/**
 * 展開スイッチの変更イベントハンドラ.
 * @param instanceIdName インスタンスID名
 */
CCustomSelectBase.OnChangeExtractSwitch = function (instanceIdName) {

	// 登録されている全てのインスタンスを処理
	CCustomSelectBase.instanceMap.forEach(
		function (valueF, keyF, mapF) {

			// 指定のインスタンスの場合は、変更イベントハンドラ呼び出し
			if (keyF == instanceIdName) {
				valueF.OnChangeExtractSwitch();
			}

			// それ以外の場合は、展開状態を閉じる
			else {
				valueF.ChangeExtractState(false);
			}
		}
	);
};

/**
 * ヘルプボタンのクリックイベントハンドラ.
 * @param instanceIdName インスタンスID名
 */
CCustomSelectBase.OnClickHelpButton = function (instanceIdName) {

	var objInstance = null;

	objInstance = CCustomSelectBase.instanceMap.get(instanceIdName);

	objInstance.OnClickHelpButton();
};

/**
 * 閉じるボタンのクリックイベントハンドラ.
 * @param instanceIdName インスタンスID名
 */
CCustomSelectBase.OnClickCloseButton = function (instanceIdName) {

	var objInstance = null;

	objInstance = CCustomSelectBase.instanceMap.get(instanceIdName);

	objInstance.OnClickCloseButton();
};

/**
 * ソート選択コントロールの変更イベントハンドラ.
 * @param instanceIdName インスタンスID名
 */
CCustomSelectBase.OnChangeSelectSort = function (instanceIdName) {

	var objInstance = null;

	objInstance = CCustomSelectBase.instanceMap.get(instanceIdName);

	objInstance.OnChangeSelectSort();
};

/**
 * 検索入力コントロールの変更イベントハンドラ.
 * @param instanceIdName インスタンスID名
 */
CCustomSelectBase.OnInputInputSearch = function (instanceIdName) {

	var objInstance = null;

	objInstance = CCustomSelectBase.instanceMap.get(instanceIdName);

	objInstance.OnInputInputSearch();
};

/**
 * 検索結果コントロールの変更イベントハンドラ.
 * @param instanceIdName インスタンスID名
 */
CCustomSelectBase.OnChangeSearchResult = function (instanceIdName) {

	var objInstance = null;

	objInstance = CCustomSelectBase.instanceMap.get(instanceIdName);

	objInstance.OnChangeSearchResult();
};

/**
 * 検索結果コントロールのダブルクリックイベントハンドラ.
 * @param instanceIdName インスタンスID名
 */
CCustomSelectBase.OnDblClickSearchResult = function (instanceIdName) {

	var objInstance = null;

	objInstance = CCustomSelectBase.instanceMap.get(instanceIdName);

	objInstance.OnDblClickSearchResult();
};

/**
 * 検索結果適用ボタンのクリックイベントハンドラ.
 * @param instanceIdName インスタンスID名
 */
CCustomSelectBase.OnClickApplyButton = function (instanceIdName) {

	var objInstance = null;

	objInstance = CCustomSelectBase.instanceMap.get(instanceIdName);
	objInstance.OnClickApplyButton();

	/* select2の見た目を更新するため追加処理 */
	select_id = objInstance.selectedDataId;
	select2_obj_class = ".OBJID_" + objInstance.instanceIdName;
	$(select2_obj_class).val(select_id).trigger('change');	
};






