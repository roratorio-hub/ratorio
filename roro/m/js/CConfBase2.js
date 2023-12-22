
/**
 * 選択肢データクラス.
 */
function CConfBaseSelectData() {

	/** 値. */
	this.value = 0;

	/** テキスト. */
	this.text = "";



	/**
	 * 値を設定する.
	 * @param value 値
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetValue = function (value) {
		this.value = value;
		return this;
	};

	/**
	 * テキストを設定する.
	 * @param text テキスト
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetText = function (text) {
		this.text = text;
		return this;
	};
}

/**
 * 設定データクラス.
 */
function CConfBaseConfData() {

	/** ＩＤ. */
	this.id = 0;

	/** 対応する設定データのインデックス. */
	this.mappedIndex = -1;

	/** テキスト. */
	this.text = 0;

	/** テキストボタンリスナ関数（設定するとボタン化する）. */
	this.funcTextButton = null;

	/** コントロールタイプ. */
	this.controlType = 0;

	/** 選択肢データ配列（select用）. */
	this.selectDataArray = new Array();

	/** デフォルト値. */
	this.defaultValue = 0;

	/** 最小値. */
	this.minValue = 0;

	/** 最大値. */
	this.maxValue = 0;

	/** 入力時補正関数. */
	this.funcInputModify = null;

	/** 注意書き. */
	this.notice = "";

	/** OnChange リスナ関数. */
	this.funcOnChange = null;



	/**
	 * ＩＤを設定する.
	 * @param id 設定ＩＤ
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetId = function (id) {
		this.id = id;
		return this;
	};

	/**
	 * 対応する設定データのインデックスを設定する.
	 * @param mappedIndex 対応する設定データのインデックス
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetMappedIndex = function (mappedIndex) {
		this.mappedIndex = mappedIndex;
		return this;
	};

	/**
	 * テキストを設定する.
	 * @param text テキスト
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetText = function (text) {
		this.text = text;
		return this;
	};

	/**
	 * テキストボタンリスナ関数（設定するとボタン化する）を設定する.
	 * @param funcTextButton テキストボタンリスナ関数（設定するとボタン化する）
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetFuncTextButton = function (funcTextButton) {
		this.funcTextButton = funcTextButton;
		return this;
	};

	/**
	 * コントロールタイプを設定する.
	 * @param controlType コントロールタイプ
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetControlType = function (controlType) {
		this.controlType = controlType;
		return this;
	};

	/**
	 * 選択肢データ配列（select用）を設定する.
	 * @param selectDataArray 選択肢データ配列（select用）
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetSelectDataArray = function (selectDataArray) {
		this.selectDataArray = selectDataArray;
		return this;
	};

	/**
	 * デフォルト値を設定する.
	 * @param defaultValue デフォルト値
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetDefaultValue = function (defaultValue) {
		this.defaultValue = defaultValue;
		return this;
	};

	/**
	 * 最小値を設定する.
	 * @param minValue 最小値
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetMinValue = function (minValue) {
		this.minValue = minValue;
		return this;
	};

	/**
	 * 最大値を設定する.
	 * @param maxValue 最大値
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetMaxValue = function (maxValue) {
		this.maxValue = maxValue;
		return this;
	};

	/**
	 * 入力時補正関数を設定する.
	 * @param funcInputModify 入力時補正関数（引数１：コントロールのオブジェクト）
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetFuncInputModify = function (funcInputModify) {
		this.funcInputModify = funcInputModify;
		return this;
	};

	/**
	 * 注意書きを設定する.
	 * @param notice 注意書き
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetNotice = function (notice) {
		this.notice = notice;
		return this;
	};

	/**
	 * OnChange リスナ関数を設定する.
	 * @param funcOnChange OnChange リスナ関数
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetFuncOnChange = function (funcOnChange) {
		this.funcOnChange = funcOnChange;
		return this;
	};
}



/**
 * データ登録パラメータクラス.
 */
function CConfBaseRegisterParam() {

	/** 列挙定数名. */
	this.enumName = "";

	/** データ（CConfBaseConfData型）. */
	this.data = "";



	/**
	 * 列挙定数名を設定する.
	 * @param enumName 列挙定数名
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetEnumName = function (enumName) {
		this.enumName = enumName;
		return this;
	};

	/**
	 * データを設定する.
	 * @param data データ（CConfBaseConfData型）
	 * @return インスタンス自身
	 * @remark 利便性向上のため、インスタンス自身を返す
	 */
	this.SetData = function (data) {
		this.data = data;
		return this;
	};
}



/**
 * 設定管理パラメータクラス.
 */
function CConfBaseManagementParam () {

	/** アクティブな設定の配列インデックス. */
	this.activeIndex = 0;

	/** 設定値を保持するオブジェクト（や配列）の配列 */
	this.confDataArray = new Array();



	/**
	 * アクティブな設定データを取得する.
	 */
	this.GetActiveConfData = function () {
		return this.confDataArray[this.activeIndex];
	};

	/**
	 * アクティブな設定データに設定する.
	 */
	this.SetActiveConfData = function (confData) {
		this.confDataArray[this.activeIndex] = confData;
	};

	/**
	 * 指定の設定データを取得する.
	 */
	this.GetConfData = function (index) {
		return this.confDataArray[index];
	};

	/**
	 * 指定の設定データに設定する.
	 */
	this.SetConfData = function (index, confData) {
		this.confDataArray[index] = confData;
	};

	/**
	 * 設定データ数を取得する.
	 */
	this.GetDataCount = function () {
		return this.confDataArray.length;
	};

	/**
	 * すべての設定データ値をリセットする.
	 */
	this.ResetDataAll = function () {
		var idx = 0;

		// TODO: 暫定対応
		for (idx = 0; idx < this.confDataArray.length; idx++) {
			this.confDataArray[idx].Init();
		}
	};
}



/**
 * 設定欄クラス.
 * （モンスター手入力以降の新規）
 */
function CConfBase2(confMngParam) {



	// 設定の限界値
	// この数を超える場合は、セーブデータの拡張が必要
	this.confCountLimit = 0;



	// 設定欄の横方向項目数
	this.itemInRow = 1;





	// インスタンス番号
	this.instanceNo = -1;

	// 設定欄のラベル
	this.confLabel = "不明な設定";

	// ターゲットオブジェクト情報の配列
//	CConfBase2.targetArray = new Array();

	// 設定管理パラメータ
	this.confMngParam = confMngParam;

	// 設定データの配列
	this.confDataObj = new Array();





	/**
	 * 設定データを初期化（セットアップ）する.
	 * （継承先でオーバーライドすること）
	 */
	this.InitData = function () {

		// ターゲットオブジェクト情報の配列を用意する
		if (CConfBase2.targetArray == undefined) {
			CConfBase2.targetArray = new Array();

		}

		return;
	}





	/**
	 * ヘッダ部品のＩＤを取得する.
	 */
	this.GetHeaderIdString = function (instanceNo) {
		return "OBJID_CONTROL_CONF2_" + instanceNo + "_HEADER";
	}

	/**
	 * スイッチ部品のＩＤを取得する.
	 */
	this.GetSwitchIdString = function (instanceNo) {
		return "OBJID_CONTROL_CONF2_" + instanceNo + "_SWITCH";
	}

	/**
	 * コントロール部品のＩＤを取得する.
	 */
	this.GetControlIdString = function (instanceNo, confId) {
		return "OBJID_CONTROL_CONF2_" + instanceNo + "_ID_" + confId;
	}





	/**
	 * 指定の設定ＩＤを持つ設定インデックスを取得する.
	 * @param confId 設定ＩＤ
	 * @return インデックス（存在しない場合は -1）
	 */
	this.GetSortedConfIndex = function (confId) {

		var idx = 0;

		for (idx = 0; idx < this.confDataObj.length; idx++) {
			if (this.confDataObj[idx].id == confId) {
				return idx;
			}
		}

		return -1;
	};



	/**
	 * 設定欄テーブルを構築する.
	 * @param objRoot テーブルの親オブジェクト
	 * @param bAsExpand 展開表示フラグ（true : 展開表示、false : ヘッダのみ）
	 */
	this.BuildUpSelectArea = function (objRoot, bAsExpand) {

		var instanceNo = 0;
		var instanceData = null;

		var idx = 0;
		var idxOption = 0;
		var idxButton = 0;

		var confData = null;
		var confId = 0;
		var confText = "";
		var selectData = null;
		var textUnit = "";
		var textArray = null;

		var controlId = "";
		var controlType = 0;
		var controlValue = 0;
		var controlValueMin = 0;
		var controlValueMax = 0;

		var buttonData = null;

		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		var objText = null;
		var objInput = null;
		var objSelect = null;
		var objOption = null;
		var objLabel = null;
		var objTableSub = null;
		var objTbodySub = null;
		var objTrSub = null;
		var objTdSub = null;



		// 既に同一のクラスインスタンスがあるかを検索し、インスタンス番号を決定する
		instanceNo = CConfBase2.targetArray.length;
		for (idx = 0; idx < CConfBase2.targetArray.length; idx++) {
			if (CConfBase2.targetArray[idx].objRoot == objRoot) {
				instanceNo = CConfBase2.targetArray[idx].instanceNo;
				break;
			}
		}



		// 引数のルートオブジェクト配下を一度全削除
		HtmlRemoveAllChild(objRoot);


		// 設定欄のテーブルを生成
		objTable = document.createElement("table");
		objTable.setAttribute("border", 1);
		objRoot.appendChild(objTable);

		objTbody = document.createElement("tbody");
		objTable.appendChild(objTbody);



		// 設定欄テーブルのヘッダ部分を生成
		objTr = document.createElement("tr");
		objTbody.appendChild(objTr);

		objTd = document.createElement("td");
		objTd.setAttribute("id", this.GetHeaderIdString(instanceNo));
		objTd.setAttribute("colspan", 6);
		objTd.setAttribute("bgcolor", COLOR_CODE_TABLE_HEADER_IS_NOT_SET);
		objTr.appendChild(objTd);

		objInput = document.createElement("input");
		objInput.setAttribute("id", this.GetSwitchIdString(instanceNo));
		objInput.setAttribute("type", "checkbox");
		objInput.setAttribute("onClick", "CConfBase2.OnClickSwitchHandler("+ instanceNo + ")");
		if (bAsExpand) {
			objInput.checked = "checked";
		}
		objTd.appendChild(objInput);

		objLabel = HtmlCreateElement("label", objTd);
		objLabel.setAttribute("for", this.GetSwitchIdString(instanceNo));
		HtmlCreateTextNode(this.confLabel, objLabel);



		// インスタンスを登録
		instanceData = new CTargetData(instanceNo, this, objRoot, objInput, objTd);
		CConfBase2.targetArray[instanceNo] = instanceData;
		this.instanceNo = instanceNo;



		// 展開表示でなければ、ヘッダだけ更新して終了
		if (!bAsExpand) {
			// ヘッダ更新
			this.RefreshSelectAreaHeader();

			return;
		}



		// ヘッダ構築
		this.BuildUpSelectAreaSubHeader(objTbody);



		// 設定定義をループして、設定欄を構築する
		for (idx = 0; idx < this.confDataObj.length; idx++) {

			// データ取得
			confData = this.confDataObj[idx];

			// 所定の項目数ごとに行を変える
			if (idx % this.itemInRow == 0) {
				// 設定欄用のテーブル行を生成
				objTr = document.createElement("tr");
				objTbody.appendChild(objTr);
			}



			// 設定ＩＤを取得
			confId = this.confDataObj[idx].id;

			// コントロールＩＤを決定
			controlId = this.GetControlIdString(instanceNo, confId);
			controlType = this.confDataObj[idx].controlType;


			// 表示名の欄を生成
			objTd = document.createElement("td");
			objTr.appendChild(objTd);

			// ボタン化
			if (confData.funcTextButton) {
				objInput = HtmlCreateElement("input", objTd);
				objInput.setAttribute("id", controlId + "_TEXT");
				objInput.setAttribute("type", "button");
				objInput.setAttribute("value", confData.text);
				objInput.setAttribute("onclick", "CConfBase2.OnClickTextButtonHandler(" + instanceNo + ", " + idx + ")");
			}
			else {
				confText = confData.text;
				HtmlCreateTextNode(confText, objTd);
			}



			// 設定値の欄を生成
			objTd = document.createElement("td");
			objTr.appendChild(objTd);



			switch (controlType) {

			// ダミーの場合
			case CONTROL_TYPE_DUMMY:

				// ダミーテキストを生成
				objText = document.createTextNode("-");
				objTd.appendChild(objText);

				break;



			// ブランクの場合
			case CONTROL_TYPE_DUMMY:
				break;



			// 設定方法が数値選択方式の場合
			case CONTROL_TYPE_SELECTBOX_NUMBER:
			case CONTROL_TYPE_SELECTBOX_PERCENT:

				if (controlType == CONTROL_TYPE_SELECTBOX_PERCENT) {
					textUnit = "%";
				}
				else {
					textUnit = "";
				}

				// 選択セレクトボックスを生成
				objSelect = document.createElement("select");
				objSelect.setAttribute("id", controlId);
				objSelect.setAttribute("onChange", "CConfBase2.OnChangeValueHandler(" + instanceNo + ", " + idx + ", true)");
				objTd.appendChild(objSelect);

				// 範囲定義に従い、セレクトオプションを生成
				controlValueMin = this.confDataObj[idx].minValue;
				controlValueMax = this.confDataObj[idx].maxValue;
				for (controlValue = controlValueMin; controlValue <= controlValueMax; controlValue++) {
					objOption = HtmlCreateElementOption(controlValue, controlValue + textUnit, objSelect);
				}

				// 初期値設定
				objSelect.setAttribute("value", this.confDataObj[idx].defaultValue);

				break;



			// 設定方法が選択方式の場合
			case CONTROL_TYPE_SELECT:

				// 選択セレクトボックスを生成
				objSelect = HtmlCreateElement("select", objTd);
				objSelect.setAttribute("id", controlId);
				objSelect.setAttribute("onchange", "CConfBase2.OnChangeValueHandler(" + instanceNo + ", " + idx + ", true)");

				// 選択肢定義に従い、セレクトオプションを生成
				for (idxOption = 0; idxOption < confData.selectDataArray.length; idxOption++) {
					selectData = confData.selectDataArray[idxOption];
					HtmlCreateElementOption(selectData.value, selectData.text, objSelect);
				}

				// 初期値設定
				objSelect.setAttribute("value", confData.defaultValue);

				break;



			// 設定方法がチェック方式の場合
			case CONTROL_TYPE_CHECKBOX:

				// チェックボックスを生成
				objInput = document.createElement("input");
				objInput.setAttribute("id", controlId);
				objInput.setAttribute("type", "checkbox");
				objInput.setAttribute("onChange", "CConfBase2.OnChangeValueHandler(" + instanceNo + ", " + idx + ", true)");
				objTd.appendChild(objInput);

				// 初期値設定
				if (this.confDataObj[idx].defaultValue == 1) {
					objInput.checked = "checked";
				}

				break;



			// 設定方法が数値入力方式の場合
			case CONTROL_TYPE_TEXTBOX_NUMBER:

				// 予備(未使用)入力テキストボックスを生成
				objInput = document.createElement("input");
				objInput.setAttribute("type", "text");
				objInput.setAttribute("id", controlId);
				objInput.setAttribute("size", "6");
				objInput.setAttribute("onChange", "CConfBase2.OnChangeValueHandler(" + instanceNo + ", " + idx + ", true)");
				objTd.appendChild(objInput);

				// 初期値設定
				objInput.setAttribute("value", this.confDataObj[idx].defaultValue);

				break;



			// 設定方法がテキスト方式の場合
			case CONTROL_TYPE_TEXT:

				// 入力テキストボックスを生成
				objInput = HtmlCreateElement("input", objTd);
				objInput.setAttribute("type", "text");
				objInput.setAttribute("id", controlId);
				objInput.setAttribute("size", "32");
				objInput.setAttribute("onChange", "CConfBase2.OnChangeValueHandler(" + instanceNo + ", " + idx + ", true)");

				// 初期値設定
				objInput.setAttribute("value", confData.defaultValue);

				break;



			// 設定方法が数値入力方式の場合
			case CONTROL_TYPE_NUMBER:

				// 入力ボックスを生成
				objInput = HtmlCreateElement("input", objTd);
				objInput.setAttribute("type", "number");
				objInput.setAttribute("id", controlId);
				objInput.setAttribute("size", "18");
				objInput.setAttribute("onchange", "CConfBase2.OnChangeValueHandler(" + instanceNo + ", " + idx + ", true)");

				// 値の範囲設定
				objInput.setAttribute("min", confData.minValue);
				objInput.setAttribute("max", confData.maxValue);

				// 初期値設定
				objInput.setAttribute("value", confData.defaultValue);

				break;



			// 設定方法が特殊方式の場合
			case CONTROL_TYPE_SELECTBOX_SPECIAL:
			case CONTROL_TYPE_CHECKBOX_SPECIAL:
			case CONTROL_TYPE_TEXTBOX_SPECIAL:
			case CONTROL_TYPE_SPECIAL:

				// 個別に実装する
				this.BuildUpSelectAreaSubForSpecial(objTd, this.confDataObj[idx]);
			}



			// 注意書きを追加
			if (confData.notice.length > 0) {
				HtmlCreateElement("br", objTd);
				HtmlCreateTextNode(confData.notice, objTd)
			}
		}



		// フッタ構築
		this.BuildUpSelectAreaSubFooter(objTbody);



		// 変数の値をもとに、設定欄の各コントロールを同期
		this.SyncronizeSettingsVarToCtrl();

		// ヘッダ更新
		this.RefreshSelectAreaHeader();
	}

	/**
	 * 設定欄テーブルを構築する（サブ　ヘッダ部分構築用）.
	 * （継承先でオーバーライドすること）
	 */
	this.BuildUpSelectAreaSubHeader = function (objTbody) {
	};

	/**
	 * 設定欄テーブルを構築する（サブ　特殊欄構築用）.
	 * （継承先でオーバーライドすること）
	 */
	this.BuildUpSelectAreaSubForSpecial = function (objTd, confData) {

		var confId = confData.id;
		var controlId = this.GetControlIdString(this.instanceNo, confId);
		var controlType = confData.controlType;

		// 個別に実装する
		switch (confId) {

		}
	};

	/**
	 * 設定欄テーブルを構築する（サブ　フッタ部分構築用）.
	 * （継承先でオーバーライドすること）
	 */
	this.BuildUpSelectAreaSubFooter = function (objTbody) {
	};





	/**
	 * 設定欄の状態を同期させる（変数の値をコントロール部品へ反映）.
	 */
	this.SyncronizeSettingsVarToCtrl = function () {

		var idx = 0;

		var confId = 0;

		var mappedIndex = 0;
		var activeConfData = null;
		var value = 0;

		var controlId = "";
		var controlType = 0;

		var objSelect = null;
		var objInput = null;



		// 設定定義をループして、設定欄の状態を同期
		for (idx = 0; idx < this.confDataObj.length; idx++) {

			// 設定ＩＤを取得
			confId = this.confDataObj[idx].id;

			// マッピングされたインデックスを取得して、変数の値を取得
			mappedIndex = this.confDataObj[idx].mappedIndex;
			if (mappedIndex < 0) {
				continue;
			}
			activeConfData = this.confMngParam.GetActiveConfData();
			value = activeConfData.GetData(mappedIndex);

			// 設定先のコントロール部品を特定
			controlId = this.GetControlIdString(this.instanceNo, confId);
			controlType = this.confDataObj[idx].controlType;

			switch (controlType) {

			// 設定方法が数値選択方式の場合
			case CONTROL_TYPE_SELECTBOX_NUMBER:
			case CONTROL_TYPE_SELECTBOX_PERCENT:
			case CONTROL_TYPE_SELECTBOX_SPECIAL:
			case CONTROL_TYPE_SELECT:

				objSelect = document.getElementById(controlId);
				objSelect.value = value;

				break;



			// 設定方法がチェック方式の場合
			case CONTROL_TYPE_CHECKBOX:
			case CONTROL_TYPE_CHECKBOX_SPECIAL:

				objInput = document.getElementById(controlId);

				if (value) {
					objInput.checked = "checked";
				}
				else {
					objInput.checked = "";
				}

				break;



			// 設定方法が数値入力方式の場合
			case CONTROL_TYPE_TEXTBOX_NUMBER:
			case CONTROL_TYPE_TEXTBOX_SPECIAL:
			case CONTROL_TYPE_TEXT:
			case CONTROL_TYPE_NUMBER:

				objInput = document.getElementById(controlId);
				objInput.value = value;

				break;



			// 設定方法が特殊方式の場合
			case CONTROL_TYPE_SPECIAL:

				// 個別に実装する
				switch (confId) {

				}
			}
		}
	}





	/**
	 * 値を範囲内に補正する.
	 * @param value 値
	 * @param valueMin 最小値
	 * @param valueMax 最大値
	 * @return 補正された値
	 */
	CConfBase2.ValueRangeModify = function (value, valueMin, valueMax) {
		return Math.min(valueMax, Math.max(valueMin, value));
	}

	/**
	 * 入力補正関数（テキスト用共通）.
	 * @param objInput 入力オブジェクト
	 */
	CConfBase2.InputModifyTextCommon = function (objInput) {

		// 変換される文字のリスト
		var charArrayNG = [

			// セキュリティ上の理由
			["\"", "”"],

			// encodeURI() で変換されないもの
			[";", "；"],
			[",", "，"],
			["/", "／"],
			["?", "？"],
			[":", "："],
			["@", "＠"],
			["&", "＆"],
			["=", "＝"],
			["+", "＋"],
			["$", "＄"],
			["-", "－"],
			["_", "＿"],
			[".", "．"],
			["!", "！"],
			["~", "￣"],
			["*", "＊"],
			["'", "’"],
			["(", "（"],
			[")", "）"],
			["#", "＃"],
		];

		var charLengthMax = 16;

		var idx = 0;

		var text = 0;
		var pattern = "";

		// 入力文字列を取得
		text = objInput.value;

		// 使用禁止文字の変換
		for (idx = 0; idx < charArrayNG.length; idx++) {
			text = text.replace(new RegExp("\\" + charArrayNG[idx][0], "g"), charArrayNG[idx][1]);
		}

		// 文字数の制限
		if (text.length > charLengthMax) {
			text = text.substring(0, charLengthMax);
		}

		// 再設定
		objInput.value = text;
	};

	/**
	 * 入力補正関数（範囲指定数値用共通）.
	 * @param objInput 入力オブジェクト
	 */
	CConfBase2.InputModifyNumberCommon = function (objInput, valueMin, valueMax) {

		var value = 0;

		value = parseInt(objInput.value);

		// 範囲外補正
		value = ValueRangeModify(value, valueMin, valueMax);

		// 再設定
		objInput.value = value;
	};

	/**
	 * 設定欄の状態を同期させる（コントロール部品の状態を変数へ反映）.
	 */
	this.SyncronizeSettingsCtrlToVar = function () {

		var idx = 0;
		var confId = 0;

		var controlId = "";
		var controlType = 0;
		var controlValue = 0;
		var controlValueMin = 0;
		var controlValueMax = 0;
		var funcInputModify = null;

		var activeConfData = null;

		var objSelect = null;
		var objInput = null;
		var objCtrl = null;



		// 設定定義をループして、設定欄の状態をもとに変数を同期
		for (idx = 0; idx < this.confDataObj.length; idx++) {

			confId = this.confDataObj[idx].id;

			controlId = this.GetControlIdString(this.instanceNo, confId);
			controlType = this.confDataObj[idx].controlType;
			controlValueMin = this.confDataObj[idx].minValue;
			controlValueMax = this.confDataObj[idx].maxValue;
			funcInputModify = this.confDataObj[idx].funcInputModify;

			// 補正関数が指定されている場合は、実行
			objCtrl = document.getElementById(controlId);
			if (funcInputModify) {
				funcInputModify(this, objCtrl);
			}

			// マッピングされたインデックスを取得
			mappedIndex = this.confDataObj[idx].mappedIndex;
			if (mappedIndex < 0) {
				continue;
			}

			// 変数へ値を設定
			switch (controlType) {

			// 設定方法が数値選択方式の場合
			case CONTROL_TYPE_SELECTBOX_NUMBER:
			case CONTROL_TYPE_SELECTBOX_PERCENT:
			case CONTROL_TYPE_SELECTBOX_SPECIAL:
			case CONTROL_TYPE_SELECT:

				activeConfData = this.confMngParam.GetActiveConfData();
				activeConfData.SetData(mappedIndex, parseInt(objCtrl.value));

				break;



			// 設定方法がチェック方式の場合
			case CONTROL_TYPE_CHECKBOX:
			case CONTROL_TYPE_CHECKBOX_SPECIAL:

				activeConfData = this.confMngParam.GetActiveConfData();
				activeConfData.SetData(mappedIndex, HtmlGetObjectCheckedById(controlId, false));

				break;



			// 設定方法がテキスト方式の場合
			case CONTROL_TYPE_TEXT:

				// 補正関数が指定されていない場合は、デフォルトの補正関数を実行
				if (!funcInputModify) {
					CConfBase2.InputModifyTextCommon(objCtrl);
				}

				activeConfData = this.confMngParam.GetActiveConfData();
				activeConfData.SetData(mappedIndex, objCtrl.value);

				break;



			// 設定方法が数値入力方式の場合
			case CONTROL_TYPE_TEXTBOX_NUMBER:
			case CONTROL_TYPE_TEXTBOX_SPECIAL:
			case CONTROL_TYPE_NUMBER:

				// 補正関数が指定されていない場合は、デフォルトの補正関数を実行
				if (!funcInputModify) {
					CConfBase2.InputModifyNumberCommon(objCtrl, controlValueMin, controlValueMax);
				}

				activeConfData = this.confMngParam.GetActiveConfData();
				activeConfData.SetData(mappedIndex, parseInt(objCtrl.value));

				break;



			// 設定方法が特殊方式の場合
			case CONTROL_TYPE_SPECIAL:

				// 個別に実装する
				switch (confId) {

				}
			}
		}
	}





	/**
	 * 設定欄の展開スイッチクリックイベントハンドラ.
	 */
	CConfBase2.OnClickSwitchHandler = function (instanceNo) {

		var idx = 0;

		for (idx = 0; idx < CConfBase2.targetArray.length; idx++) {
			if (CConfBase2.targetArray[idx].instanceNo == instanceNo) {
				CConfBase2.targetArray[idx].objThis.OnClickSwitch(CConfBase2.targetArray[idx]);
				break;
			}
		}
	}

	/**
	 * 設定欄の展開スイッチクリックイベントハンドラ本体.
	 */
	this.OnClickSwitch = function (instanceData) {

		var bExpand = false;

		// 展開スイッチの状態を取得
		bExpand = instanceData.objSwitch.checked;

		// 構築関数呼び出し
		this.BuildUpSelectArea(instanceData.objRoot, bExpand);

		// コントロールのCSSを更新する
		if (bExpand) {
			this.RefreshControlCSS(instanceData.instanceNo);
		}
	}





	/**
	 * 設定欄のテキストボタンクリックイベントハンドラ.
	 */
	CConfBase2.OnClickTextButtonHandler = function (instanceNo, dataNo) {

		var idx = 0;

		for (idx = 0; idx < CConfBase2.targetArray.length; idx++) {
			if (CConfBase2.targetArray[idx].instanceNo == instanceNo) {
				CConfBase2.targetArray[idx].objThis.OnClickTextButton(dataNo);
				break;
			}
		}
	}

	/**
	 * 設定欄のテキストボタンクリックイベントハンドラ本体.
	 * @param dataNo データ番号
	 */
	this.OnClickTextButton = function (dataNo) {
		// 登録されている関数をコール
		this.confDataObj[dataNo].funcTextButton(this);
	}

	/**
	 * 設定欄の設定値変更イベントハンドラ.
	 */
	CConfBase2.OnChangeValueHandler = function (instanceNo, dataNo, bCalc) {

		var idx = 0;

		for (idx = 0; idx < CConfBase2.targetArray.length; idx++) {
			if (CConfBase2.targetArray[idx].instanceNo == instanceNo) {
				CConfBase2.targetArray[idx].objThis.OnChangeValue(dataNo, bCalc);
				break;
			}
		}
	}

	/**
	 * 設定欄の設定値変更イベントハンドラ本体.
	 * @param bCalc 再計算フラグ（true : 再計算する、false : 再計算しない）
	 */
	this.OnChangeValue = function (dataNo, bCalc) {

		// 登録されている関数があれば、コール
		if (this.confDataObj[dataNo].funcOnChange) {
			this.confDataObj[dataNo].funcOnChange(this);
		}

		// 変更を適用させる
		this.ApplyValueChanged(bCalc);
	}

	/**
	 * 設定欄の設定値変更イベントハンドラ本体.
	 * @param bCalc 再計算フラグ（true : 再計算する、false : 再計算しない）
	 */
	this.ApplyValueChanged = function (bCalc) {

		// 設定の変更を変数に同期させる
		this.SyncronizeSettingsCtrlToVar();

		// ヘッダの表示を更新する
		this.RefreshSelectAreaHeader();

		// コントロールのCSSを更新する
		this.RefreshControlCSS();

		// 再計算フラグが立っている場合は、再計算を実行
		if (bCalc) {
			calc();
		}
	}





	/**
	 * 設定欄テーブルのヘッダをリフレッシュする.
	 */
	this.RefreshSelectAreaHeader = function () {

		var bSet = false;
		var bChecked = false;

		var idx = 0;

		var confId = 0;
		var mappedIndex = 0;
		var activeConfData = null;

		var objSelect = null;
		var objTd = null;



		activeConfData = this.confMngParam.GetActiveConfData();

		if (!activeConfData.IsDefaultValues()) {
			bSet = true;
		}

		// 設定状況に応じて、ヘッダ部分の表示を更新
		objTd = document.getElementById(this.GetHeaderIdString(this.instanceNo));
		if (bSet) {
			objTd.setAttribute("bgcolor", COLOR_CODE_TABLE_HEADER_IS_SET);
		}
		else {
			objTd.setAttribute("bgcolor", COLOR_CODE_TABLE_HEADER_IS_NOT_SET);
		}
	}





	/**
	 * 設定欄の選択状態により、コントロールのCSSを変更する.
	 */
	this.RefreshControlCSS = function () {

		var idx = 0;
		var confId = 0;

		var controlId = "";
		var controlType = 0;
		var defaultValue = 0;

		var objSelect = null;
		var objInput = null;



		// 設定定義をループして、設定欄の状態をもとに変数を同期
		for (idx = 0; idx < this.confDataObj.length; idx++) {

			confId = this.confDataObj[idx].id;

			controlId = this.GetControlIdString(this.instanceNo, confId);
			controlType = this.confDataObj[idx].controlType;
			defaultValue = this.confDataObj[idx].defaultValue;


			switch (controlType) {

			// 設定方法が数値選択方式の場合
			case CONTROL_TYPE_SELECTBOX_NUMBER:
			case CONTROL_TYPE_SELECTBOX_PERCENT:
			case CONTROL_TYPE_SELECTBOX_SPECIAL:
			case CONTROL_TYPE_SELECT:

				objSelect = document.getElementById(controlId);
				if (!objSelect) {
					continue;
				}

				if (objSelect.value != defaultValue) {
					objSelect.setAttribute("class", "CSSCLS_SELECTED_CONF");
				}
				else {
					objSelect.setAttribute("class", "");
				}

				break;



			// 設定方法がチェック方式の場合
			case CONTROL_TYPE_CHECKBOX:
			case CONTROL_TYPE_CHECKBOX_SPECIAL:

				objInput = document.getElementById(controlId);
				if (!objInput) {
					continue;
				}

				if ((objInput.checked) && (defaultValue != 1)) {
					objInput.setAttribute("class", "CSSCLS_CHECKED_CONF");
				}
				if ((!objInput.checked) && (defaultValue != 0)) {
					objInput.setAttribute("class", "CSSCLS_CHECKED_CONF");
				}
				else {
					objInput.setAttribute("class", "");
				}

				break;



			// 設定方法が数値入力方式の場合
			case CONTROL_TYPE_TEXTBOX_NUMBER:
			case CONTROL_TYPE_TEXTBOX_SPECIAL:
			case CONTROL_TYPE_TEXT:
			case CONTROL_TYPE_NUMBER:

				objInput = document.getElementById(controlId);
				if (!objInput) {
					continue;
				}

				if (objInput.value != defaultValue) {
					objInput.setAttribute("class", "CSSCLS_INPUTTED_CONF");
				}
				else {
					objInput.setAttribute("class", "");
				}

				break;



			// 設定方法が特殊方式の場合
			case CONTROL_TYPE_SPECIAL:

				// 個別に実装する
				switch (confId) {

				}
			}
		}
	}
}