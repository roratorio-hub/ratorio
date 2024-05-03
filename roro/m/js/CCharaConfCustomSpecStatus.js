function CCharaConfCustomSpecStatus(confArray) {

	// 継承定義
	CCharaConfCustomSpecStatus.prototype = new CConfBase();



	// 基底クラスのコンストラクタ呼び出し
	CConfBase.call(this, confArray);



	// 設定の限界値
	// この数を超える場合は、セーブデータの拡張が必要
	this.confCountLimit = 20;



	// 設定欄の横方向項目数
	this.itemInRow = 1;



	// 設定欄のラベル
	this.confLabel = "性能カスタマイズ（特性ステータス関連）";





	//********************************************************************************************************************************
	//********************************************************************************************************************************
	//****
	//**** 性能カスタマイズデータ定義
	//****
	//********************************************************************************************************************************
	//********************************************************************************************************************************

	/**
	 * 設定データを初期化（セットアップ）する.
	 * （継承先でオーバーライドすること）
	 */
	this.InitData = function () {

		var idx = 0;

		var confId = 0;
		var confData = new Array();
		var confDataOBJSorted = new Array();



		// 基底クラスのセットアップ処理を実行
		CCharaConfCustomSpecStatus.prototype.InitData.call(this);



		//----------------------------------------------------------------
		// データ定義　ここから
		//----------------------------------------------------------------
		CCharaConfCustomSpecStatus.CONF_ID_DISABLE_SETTINGS = confId;
		confData = [
			confId,
			CConfBase.ConfText("以下の入力欄を全て無効にする"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSpecStatus.CONF_ID_POW_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("POW+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSpecStatus.CONF_ID_STA_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("STA+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSpecStatus.CONF_ID_WIS_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("WIS+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSpecStatus.CONF_ID_SPL_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("SPL+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSpecStatus.CONF_ID_CON_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("CON+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSpecStatus.CONF_ID_CRT_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("CRT+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSpecStatus.CONF_ID_P_ATK_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("P.Atk+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSpecStatus.CONF_ID_S_MATK_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("S.Matk+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSpecStatus.CONF_ID_H_PLUS_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("H.Plus+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSpecStatus.CONF_ID_C_RATE_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("C.Rate+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSpecStatus.CONF_ID_RES_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("Res+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSpecStatus.CONF_ID_MRES_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("Mres+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;













		CCharaConfCustomSpecStatus.CONF_ID_BLANK = confId;
		confData = [
			confId,
			CConfBase.ConfText(""),
			CConfBase.ConfControlType(CONTROL_TYPE_BLANK),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(0)
		];
		this.confDataObj[confId] = confData;
		confId++;



		//----------------------------------------------------------------
		// データ定義数チェック
		//----------------------------------------------------------------
		if (this.confCountLimit < this.confDataObj.length) {
			alert("性能カスタマイズ　定義数超過");
			return;
		}



		//----------------------------------------------------------------
		// 性能カスタマイズ変数配列を初期化
		//----------------------------------------------------------------
		for (idx = 0; idx < this.confCountLimit; idx++) {
			if (idx < this.confDataObj.length) {
				this.confArray[idx] = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE];
			}
			else {
				this.confArray[idx] = 0;
			}
		}



		//----------------------------------------------------------------
		// 表示順序に従い、性能カスタマイズデータ定義を再配列
		//----------------------------------------------------------------
		confDataOBJSorted = new Array();
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_DISABLE_SETTINGS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_BLANK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_POW_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_STA_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_WIS_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_SPL_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_CON_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_CRT_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_BLANK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_P_ATK_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_S_MATK_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_H_PLUS_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_C_RATE_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_RES_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_MRES_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSpecStatus.CONF_ID_BLANK];
		this.confDataObj = confDataOBJSorted;

	}





	/**
	 * 設定欄テーブルを構築する（サブ　特殊欄構築用）.
	 * （継承先でオーバーライドすること）
	 */
	this.BuildUpSelectAreaSubForSpecial = function (objTd, confData) {

		var index = 0;

		var confId = confData[CConfBase.CONF_DATA_INDEX_ID];
		var controlId = this.GetControlIdString(this.instanceNo, confId);
		var controlType = confData[CConfBase.CONF_DATA_INDEX_CONTROL_TYPE];

		// 個別に実装する
		switch (confId) {

		// 「以下の入力欄を全て無効にする」
		case CCharaConfCustomStatus.CONF_ID_DISABLE_SETTINGS:

			// 選択セレクトボックスを生成
			objSelect = document.createElement("select");
			objSelect.setAttribute("id", controlId);
			objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
			objTd.appendChild(objSelect);

			// セレクトオプションを生成
			objOption = HtmlCreateElementOption(0, "OFF", objSelect);
			objOption = HtmlCreateElementOption(1, "ON", objSelect);

			// 初期値設定
			objSelect.setAttribute("value", confData[CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);

			break;



		}
	}



	/**
	 * 設定値を取得する.
	 * @param id 取得する設定のID
	 */
	this.GetConf = function (id) {
		if (this.confArray[CCharaConfCustomSpecStatus.CONF_ID_DISABLE_SETTINGS] == 1) {
			return 0;
		}

		return this.confArray[id];
	}





	// 初期化実行
	this.InitData();



}
