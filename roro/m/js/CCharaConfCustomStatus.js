function CCharaConfCustomStatus(confArray) {

	// 継承定義
	CCharaConfCustomStatus.prototype = new CConfBase();



	// 基底クラスのコンストラクタ呼び出し
	CConfBase.call(this, confArray);



	// 設定の限界値
	// この数を超える場合は、セーブデータの拡張が必要
	this.confCountLimit = CUSTOM_CONF_STATUS_LIMIT;



	// 設定欄の横方向項目数
	this.itemInRow = 1;



	// 設定欄のラベル
	this.confLabel = "性能カスタマイズ（ステータス関連）";





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
		CCharaConfCustomStatus.prototype.InitData.call(this);



		//----------------------------------------------------------------
		// データ定義　ここから
		//----------------------------------------------------------------
		CCharaConfCustomStatus.CONF_ID_DISABLE_SETTINGS = confId;
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



		CCharaConfCustomStatus.CONF_ID_MAXHP_UP = confId;
		confData = [
			confId,
			CConfBase.ConfText("MaxHP+%"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_MAXHP_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("MaxHP+ (max99999)"),
			CConfBase.ConfControlType(CONTROL_TYPE_TEXTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-99999),
			CConfBase.ConfMaxValue(99999)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_MAXSP_UP = confId;
		confData = [
			confId,
			CConfBase.ConfText("MaxSP+%"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_MAXSP_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("MaxSP+ (max99999)"),
			CConfBase.ConfControlType(CONTROL_TYPE_TEXTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-99999),
			CConfBase.ConfMaxValue(99999)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_HPR_UP = confId;
		confData = [
			confId,
			CConfBase.ConfText("HP自然回復力+%"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_SPR_UP = confId;
		confData = [
			confId,
			CConfBase.ConfText("SP自然回復力+%"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_STR_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("STR+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_AGI_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("AGI+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_VIT_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("VIT+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_INT_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("INT+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_DEX_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("DEX+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_LUK_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("LUK+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_HIT_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("HIT+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_FLEE_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("FLEE+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_CRI_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("CRI+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_LUCKY_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("完全回避+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_ASPD_UP = confId;
		confData = [
			confId,
			CConfBase.ConfText("ASPD+%"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_ASPD_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("ASPD+(固定値+)"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_CAST_DOWN = confId;
		confData = [
			confId,
			CConfBase.ConfText("変動詠唱時間短縮"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_CAST_DOWN_FIXED = confId;
		confData = [
			confId,
			CConfBase.ConfText("固定詠唱時間短縮"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_DELAY_DOWN = confId;
		confData = [
			confId,
			CConfBase.ConfText("ディレイ短縮"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_COST_DOWN = confId;
		confData = [
			confId,
			CConfBase.ConfText("消費ＳＰ減少"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;








		CCharaConfCustomStatus.CONF_ID_NOTICE_SIGNED = confId;
		confData = [
			confId,
			CConfBase.ConfText("（短縮・減少でマイナスにすると増加）"),
			CConfBase.ConfControlType(CONTROL_TYPE_TEXT_NODE),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(0)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomStatus.CONF_ID_BLANK = confId;
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
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_DISABLE_SETTINGS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_BLANK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_MAXHP_UP];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_MAXHP_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_MAXSP_UP];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_MAXSP_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_HPR_UP];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_SPR_UP];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_BLANK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_STR_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_AGI_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_VIT_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_INT_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_DEX_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_LUK_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_BLANK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_HIT_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_FLEE_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_CRI_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_LUCKY_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_BLANK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_ASPD_UP];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_ASPD_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_CAST_DOWN];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_CAST_DOWN_FIXED];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_DELAY_DOWN];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_COST_DOWN];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_NOTICE_SIGNED];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomStatus.CONF_ID_BLANK];
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

			// RTX API用の属性追加
			if (this.dataRtxAttributeIdPrefix !== null) {
				objSelect.setAttribute(`${this.dataRtxAttributeIdPrefix}-element-id`, controlId);
				objSelect.setAttribute(`${this.dataRtxAttributeIdPrefix}-displayname`, confData[CConfBase.CONF_DATA_INDEX_TEXT]);
			}
			break;



		// 武器ATK、武器MATK
		case CCharaConfCustomStatus.CONF_ID_WEAPON_ATK:
		case CCharaConfCustomStatus.CONF_ID_WEAPON_MATK:

			// 選択セレクトボックスを生成
			objSelect = document.createElement("select");
			objSelect.setAttribute("id", controlId);
			objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
			objTd.appendChild(objSelect);

			// セレクトオプションを生成
			objOption = HtmlCreateElementOption(0, "未変更", objSelect);
			for (index = 1; index <= 100; index++) {
				objOption = HtmlCreateElementOption(index, index * 5, objSelect);

			}

			// 初期値設定
			objSelect.setAttribute("value", confData[CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);

			// RTX API用の属性追加
			if (this.dataRtxAttributeIdPrefix !== null) {
				objSelect.setAttribute(`${this.dataRtxAttributeIdPrefix}-element-id`, controlId);
				objSelect.setAttribute(`${this.dataRtxAttributeIdPrefix}-displayname`, confData[CConfBase.CONF_DATA_INDEX_TEXT]);
			}
			break;



		// 武器Lv
		case CCharaConfCustomStatus.CONF_ID_WEAPON_LEVEL:

			// 選択セレクトボックスを生成
			objSelect = document.createElement("select");
			objSelect.setAttribute("id", controlId);
			objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
			objTd.appendChild(objSelect);

			// セレクトオプションを生成
			objOption = HtmlCreateElementOption(0, "未変更", objSelect);
			for (index = 1; index <= 4; index++) {
				objOption = HtmlCreateElementOption(index, index, objSelect);

			}

			// 初期値設定
			objSelect.setAttribute("value", confData[CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);

			// RTX API用の属性追加
			if (this.dataRtxAttributeIdPrefix !== null) {
				objSelect.setAttribute(`${this.dataRtxAttributeIdPrefix}-element-id`, controlId);
				objSelect.setAttribute(`${this.dataRtxAttributeIdPrefix}-displayname`, confData[CConfBase.CONF_DATA_INDEX_TEXT]);
			}
			break;
		}
	}



	/**
	 * 設定値を取得する.
	 * @param id 取得する設定のID
	 */
	this.GetConf = function (id) {
		if (this.confArray[CCharaConfCustomStatus.CONF_ID_DISABLE_SETTINGS] == 1) {
			return 0;
		}

		return this.confArray[id];
	}





	// 初期化実行
	this.InitData();



}
