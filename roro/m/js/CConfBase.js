
// コントロール種別定義
CGlobalConstManager.DefineEnum(
	"EnumControlType",
	[
		"CONTROL_TYPE_DUMMY",
		"CONTROL_TYPE_BLANK",
		"CONTROL_TYPE_TEXT_NODE",			// 固定テキスト表示
		"CONTROL_TYPE_SELECTBOX_NUMBER",
		"CONTROL_TYPE_SELECTBOX_PERCENT",
		"CONTROL_TYPE_SELECTBOX_SPECIAL",
		"CONTROL_TYPE_CHECKBOX",
		"CONTROL_TYPE_CHECKBOX_SPECIAL",
		"CONTROL_TYPE_TEXTBOX_NUMBER",
		"CONTROL_TYPE_TEXTBOX_SPECIAL",
		"CONTROL_TYPE_SELECT",				// select	// ConfBase2 系のみ実装
		"CONTROL_TYPE_TEXT",				// input type=text		// ConfBase2 系のみ実装
		"CONTROL_TYPE_NUMBER",				// input type=number	// ConfBase2 系のみ実装
		"CONTROL_TYPE_SPECIAL",
	],
	0,
	1
);





/**
 * データ管理用クラス.
 */
function CTargetData(instanceNo, objThis, objRoot, objSwitch, objHeader) {
	this.instanceNo = instanceNo;
	this.objThis = objThis;
	this.objRoot = objRoot;
	this.objSwitch = objSwitch;
	this.objHeader = objHeader;
}



/**
 * 設定欄クラス.
 */
function CConfBase(confArray) {



	// 設定の限界値
	// この数を超える場合は、セーブデータの拡張が必要
	this.confCountLimit = 0;



	// 設定欄の横方向項目数
	this.itemInRow = 2;



	//----------------------------------------------------------------
	// データインデックス定義
	//----------------------------------------------------------------
	CConfBase.CONF_DATA_INDEX_ID			= 0;
	CConfBase.CONF_DATA_INDEX_TEXT			= 1;
	CConfBase.CONF_DATA_INDEX_CONTROL_TYPE	= 2;
	CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE	= 3;
	CConfBase.CONF_DATA_INDEX_MIN_VALUE		= 4;
	CConfBase.CONF_DATA_INDEX_MAX_VALUE		= 5;





	// インスタンス番号
	this.instanceNo = -1;

	// 設定欄のラベル
	this.confLabel = "不明な設定";

	// ターゲットオブジェクト情報の配列
//	CConfBase.targetArray = new Array();

	// 設定値を保持する配列
	this.confArray = confArray;

	// 設定データの配列
	this.confDataObj = new Array();





	//================================================================
	// データ定義用ダミー関数
	// （可読性を高める目的で使用する）
	//================================================================
	CConfBase.ConfText = function (value) { return value; };
	CConfBase.ConfControlType = function (value) { return value; };
	CConfBase.ConfDefaultValue = function (value) { return value; };
	CConfBase.ConfMinValue = function (value) { return value; };
	CConfBase.ConfMaxValue = function (value) { return value; };





	/**
	 * 設定データを初期化（セットアップ）する.
	 * （継承先でオーバーライドすること）
	 */
	this.InitData = function () {

		// ターゲットオブジェクト情報の配列を用意する
		if (CConfBase.targetArray == undefined) {
			CConfBase.targetArray = new Array();

		}

		return;
	}





	/**
	 * ヘッダ部品のＩＤを取得する.
	 */
	this.GetHeaderIdString = function (instanceNo) {
		return "OBJID_CONTROL_CONF_" + instanceNo + "_HEADER";
	}

	/**
	 * スイッチ部品のＩＤを取得する.
	 */
	this.GetSwitchIdString = function (instanceNo) {
		return "OBJID_CONTROL_CONF_" + instanceNo + "_SWITCH";
	}

	/**
	 * コントロール部品のＩＤを取得する.
	 */
	this.GetControlIdString = function (instanceNo, confId) {
		return "OBJID_CONTROL_CONF_" + instanceNo + "_ID_" + confId;
	}





	/**
	 * 設定欄テーブルを構築する.
	 * @param objRoot テーブルの親オブジェクト
	 * @param bAsExpand 展開表示フラグ（true : 展開表示、false : ヘッダのみ）
	 */
	this.BuildUpSelectArea = function (objRoot, bAsExpand) {

		var instanceNo = 0;
		var instanceData = null;

		var idx = 0;
		var confId = 0;
		var confText = "";
		var textUnit = "";
		var textArray = null;

		var controlId = "";
		var controlType = 0;
		var controlValue = 0;
		var controlValueMin = 0;
		var controlValueMax = 0;

		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		var objText = null;
		var objInput = null;
		var objSelect = null;
		var objOption = null;
		var objLabel = null;
		var objA = null;



		if (!objRoot) {
			return;
		}



		// 既に同一のクラスインスタンスがあるかを検索し、インスタンス番号を決定する
		instanceNo = CConfBase.targetArray.length;
		for (idx = 0; idx < CConfBase.targetArray.length; idx++) {
			if (CConfBase.targetArray[idx].objRoot == objRoot) {
				instanceNo = CConfBase.targetArray[idx].instanceNo;
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
		objInput.setAttribute("onClick", "CConfBase.OnClickSwitchHandler("+ instanceNo + ")");
		if (bAsExpand) {
			objInput.setAttribute("checked", "checked");
		}
		objTd.appendChild(objInput);

		objLabel = HtmlCreateElement("label", objTd);
		objLabel.setAttribute("for", this.GetSwitchIdString(instanceNo));
		HtmlCreateTextNode(this.confLabel, objLabel);



		// インスタンスを登録
		instanceData = new CTargetData(instanceNo, this, objRoot, objInput, objTd);
		CConfBase.targetArray[instanceNo] = instanceData;
		this.instanceNo = instanceNo;



		// 展開表示でなければ、ヘッダだけ更新して終了
		if (!bAsExpand) {
			// ヘッダ更新
			this.RefreshSelectAreaHeader();

			return;
		}



		// 設定定義をループして、設定欄を構築する
		for (idx = 0; idx < this.confDataObj.length; idx++) {

			// 所定の項目数ごとに行を変える
			if (idx % this.itemInRow == 0) {
				// 設定欄用のテーブル行を生成
				objTr = document.createElement("tr");
				objTbody.appendChild(objTr);
			}



			// 設定ＩＤを取得
			confId = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_ID];



			// 表示名の欄を生成
			objTd = document.createElement("td");
			objTr.appendChild(objTd);

			confText = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_TEXT];
			objText = document.createTextNode(confText);
			objTd.appendChild(objText);

			// TODO: 集中力向上の注意喚起
			if (confText.indexOf("集中力向上") >= 0) {
				objText = document.createTextNode("　");
				objTd.appendChild(objText);

				objA = document.createElement("a");
				objTd.appendChild(objA);
				objText = document.createTextNode("(★注意情報★)");
				objA.setAttribute("href", "../kousin/note20210606.html");
				objA.setAttribute("target", "_blank");
				objA.appendChild(objText);
			}



			// 設定値の欄を生成
			objTd = document.createElement("td");
			objTr.appendChild(objTd);

			controlId = this.GetControlIdString(instanceNo, confId);
			controlType = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_CONTROL_TYPE];



			switch (controlType) {

			// ダミーの場合
			case CONTROL_TYPE_DUMMY:

				// ダミーテキストを生成
				objText = document.createTextNode("-");
				objTd.appendChild(objText);

				break;

			// ブランクの場合
			case CONTROL_TYPE_BLANK:
				break;

			// 固定テキストの場合
			case CONTROL_TYPE_TEXT_NODE:
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
				objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + instanceNo + ", true)");
				objTd.appendChild(objSelect);

				// 範囲定義に従い、セレクトオプションを生成
				controlValueMin = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_MIN_VALUE];
				controlValueMax = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_MAX_VALUE];
				for (controlValue = controlValueMin; controlValue <= controlValueMax; controlValue++) {
					objOption = HtmlCreateElementOption(controlValue, controlValue + textUnit, objSelect);
				}

				// 初期値設定
				objSelect.setAttribute("value", this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);

				break;



			// 設定方法がチェック方式の場合
			case CONTROL_TYPE_CHECKBOX:

				// チェックボックスを生成
				objInput = document.createElement("input");
				objInput.setAttribute("id", controlId);
				objInput.setAttribute("type", "checkbox");
				objInput.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + instanceNo + ", true)");
				objTd.appendChild(objInput);

				// 初期値設定
				if (this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE] == 1) {
					objInput.setAttribute("checked", "checked");
				}

				break;



			// 設定方法が数値入力方式の場合
			case CONTROL_TYPE_TEXTBOX_NUMBER:

				// 予備(未使用)入力テキストボックスを生成
				objInput = document.createElement("input");
				objInput.setAttribute("type", "text");
				objInput.setAttribute("id", controlId);
				objInput.setAttribute("size", "6");
				objInput.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + instanceNo + ", true)");
				objTd.appendChild(objInput);

				// 初期値設定
				objInput.setAttribute("value", this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);

				break;



			// 設定方法が特殊方式の場合
			case CONTROL_TYPE_SELECTBOX_SPECIAL:
			case CONTROL_TYPE_CHECKBOX_SPECIAL:
			case CONTROL_TYPE_TEXTBOX_SPECIAL:
			case CONTROL_TYPE_SPECIAL:

				// 個別に実装する
				this.BuildUpSelectAreaSubForSpecial(objTd, this.confDataObj[idx]);
			}

		}



		// 変数の値をもとに、設定欄の各コントロールを同期
		this.SyncronizeSettingsVarToCtrl();

		// ヘッダ更新
		this.RefreshSelectAreaHeader();
	}

	/**
	 * 設定欄テーブルを構築する（サブ　特殊欄構築用）.
	 * （継承先でオーバーライドすること）
	 */
	this.BuildUpSelectAreaSubForSpecial = function (objTd, confData) {

		var confId = confData[CConfBase.CONF_DATA_INDEX_ID];
		var controlId = this.GetControlIdString(this.instanceNo, confId);
		var controlType = confData[CConfBase.CONF_DATA_INDEX_CONTROL_TYPE];

		// 個別に実装する
		switch (confId) {

		}
	};





	/**
	 * 設定欄の状態を同期させる（変数の値をコントロール部品へ反映）.
	 */
	this.SyncronizeSettingsVarToCtrl = function () {

		var idx = 0;
		var confId = 0;

		var controlId = "";
		var controlType = 0;

		var objSelect = null;
		var objInput = null;



		// 設定定義をループして、設定欄の状態を同期
		for (idx = 0; idx < this.confDataObj.length; idx++) {

			confId = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_ID];

			controlId = this.GetControlIdString(this.instanceNo, confId);
			controlType = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_CONTROL_TYPE];


			switch (controlType) {

			// 設定方法が数値選択方式の場合
			case CONTROL_TYPE_SELECTBOX_NUMBER:
			case CONTROL_TYPE_SELECTBOX_PERCENT:
			case CONTROL_TYPE_SELECTBOX_SPECIAL:

				objSelect = document.getElementById(controlId);
				objSelect.value = this.confArray[confId];

				break;



			// 設定方法がチェック方式の場合
			case CONTROL_TYPE_CHECKBOX:
			case CONTROL_TYPE_CHECKBOX_SPECIAL:

				objInput = document.getElementById(controlId);

				if (this.confArray[confId]) {
					objInput.setAttribute("checked", "checked");
				}
				else {
					objInput.removeAttribute("checked");
				}

				break;



			// 設定方法が数値入力方式の場合
			case CONTROL_TYPE_TEXTBOX_NUMBER:
			case CONTROL_TYPE_TEXTBOX_SPECIAL:

				objInput = document.getElementById(controlId);
				objInput.value = this.confArray[confId];

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

		var objSelect = null;
		var objInput = null;



		// 設定定義をループして、設定欄の状態をもとに変数を同期
		for (idx = 0; idx < this.confDataObj.length; idx++) {

			confId = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_ID];

			controlId = this.GetControlIdString(this.instanceNo, confId);
			controlType = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_CONTROL_TYPE];



			switch (controlType) {

			// 設定方法が数値選択方式の場合
			case CONTROL_TYPE_SELECTBOX_NUMBER:
			case CONTROL_TYPE_SELECTBOX_PERCENT:
			case CONTROL_TYPE_SELECTBOX_SPECIAL:

				objSelect = document.getElementById(controlId);
				this.confArray[confId] = parseInt(objSelect.value);

				break;



			// 設定方法がチェック方式の場合
			case CONTROL_TYPE_CHECKBOX:
			case CONTROL_TYPE_CHECKBOX_SPECIAL:

				this.confArray[confId] = HtmlGetObjectCheckedById(controlId, false);

				break;



			// 設定方法が数値入力方式の場合
			case CONTROL_TYPE_TEXTBOX_NUMBER:
			case CONTROL_TYPE_TEXTBOX_SPECIAL:

				objInput = document.getElementById(controlId);
				confArray[confId] = parseInt(objInput.value);

				// 範囲外補正
				controlValueMin = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_MIN_VALUE];
				controlValueMax = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_MAX_VALUE];
				this.confArray[confId] = ValueRangeModify(this.confArray[confId], controlValueMin, controlValueMax);
				objInput.value = this.confArray[confId];

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
	CConfBase.OnClickSwitchHandler = function (instanceNo) {

		var idx = 0;

		for (idx = 0; idx < CConfBase.targetArray.length; idx++) {
			if (CConfBase.targetArray[idx].instanceNo == instanceNo) {
				CConfBase.targetArray[idx].objThis.OnClickSwitch(CConfBase.targetArray[idx]);
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
	 * 設定欄の設定値変更イベントハンドラ.
	 * @param {*} instanceNo 
	 * @param {*} bCalc  再計算フラグ（true : 再計算する、false : 再計算しない）
	 */
	CConfBase.OnChangeValueHandler = function (instanceNo, bCalc) {

		var idx = 0;

		for (idx = 0; idx < CConfBase.targetArray.length; idx++) {
			if (CConfBase.targetArray[idx].instanceNo == instanceNo) {
				CConfBase.targetArray[idx].objThis.OnChangeValue(bCalc);
				break;
			}
		}

		// 攻撃手段の更新
		CAttackMethodAreaComponentManager.RebuildControls();
	}

	/**
	 * 設定欄の設定値変更イベントハンドラ本体.
	 * @param bCalc 再計算フラグ（true : 再計算する、false : 再計算しない）
	 */
	this.OnChangeValue = function (bCalc) {

		// 設定の変更を変数に同期させる
		this.SyncronizeSettingsCtrlToVar();

		// ヘッダの表示を更新する
		this.RefreshSelectAreaHeader();

		// コントロールのCSSを更新する
		this.RefreshControlCSS();

		// 再計算フラグが立っている場合は、再計算を実行
		if (bCalc) {
			//calc();
			AutoCalc();
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

		var objSelect = null;
		var objTd = null;



		// 設定定義をループして、設定欄の状態を検査
		for (idx = 0; idx < this.confDataObj.length; idx++) {

			confId = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_ID];

			if (this.confArray[confId] != this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]) {
				bSet = true;
				break;
			}
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

			confId = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_ID];

			controlId = this.GetControlIdString(this.instanceNo, confId);
			controlType = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_CONTROL_TYPE];
			defaultValue = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE];


			switch (controlType) {

			// 設定方法が数値選択方式の場合
			case CONTROL_TYPE_SELECTBOX_NUMBER:
			case CONTROL_TYPE_SELECTBOX_PERCENT:
			case CONTROL_TYPE_SELECTBOX_SPECIAL:

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



	// TODO: 処理構造変えたい
	/**
	 * 新形式のセーブデータを読み込んだ際に呼ばれる関数.
	 */
	this.OnSaveDataLoaded = function () {
		this.RefreshSelectAreaHeader();
		this.RefreshControlCSS();
	}
}