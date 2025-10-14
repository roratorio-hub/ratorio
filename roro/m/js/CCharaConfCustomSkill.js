function CCharaConfCustomSkill(confArray) {

	// 継承定義
	CCharaConfCustomSkill.prototype = new CConfBase();



	// 基底クラスのコンストラクタ呼び出し
	CConfBase.call(this, confArray);



	// 設定の限界値
	// この数を超える場合は、セーブデータの拡張が必要
	this.confCountLimit = CUSTOM_CONF_SKILL_LIMIT;



	// 設定欄の横方向項目数
	this.itemInRow = 1;



	// 設定欄のラベル
	this.confLabel = "性能カスタマイズ（スキル関連）";





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
		CCharaConfCustomSkill.prototype.InitData.call(this);



		//----------------------------------------------------------------
		// データ定義　ここから
		//----------------------------------------------------------------
		CCharaConfCustomSkill.CONF_ID_DISABLE_SETTINGS = confId;
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



		CCharaConfCustomSkill.CONF_ID_SKILL_DAMAGE_UP = confId;
		confData = [
			confId,
			CConfBase.ConfText("○○スキルで攻撃時ダメージ上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-1000),
			CConfBase.ConfMaxValue(1000)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSkill.CONF_ID_HEAL_UP_USING = confId;
		confData = [
			confId,
			CConfBase.ConfText("ヒール系を使用したときの回復力+%"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSkill.CONF_ID_HEAL_UP_USED = confId;
		confData = [
			confId,
			CConfBase.ConfText("ヒール系を使用されたときの回復力+%"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSkill.CONF_ID_SKILL_CAST_DOWN = confId;
		confData = [
			confId,
			CConfBase.ConfText("○○スキルの変動詠唱時間短縮（％）"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSkill.CONF_ID_SKILL_CAST_MINUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("○○スキルの変動詠唱時間短縮（秒）"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSkill.CONF_ID_SKILL_CAST_DOWN_FIXED = confId;
		confData = [
			confId,
			CConfBase.ConfText("○○スキルの固定詠唱時間短縮（％）"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSkill.CONF_ID_SKILL_CAST_MINUS_FIXED = confId;
		confData = [
			confId,
			CConfBase.ConfText("○○スキルの固定詠唱時間短縮（秒）"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSkill.CONF_ID_SKILL_COOL_DOWN = confId;
		confData = [
			confId,
			CConfBase.ConfText("○○スキルのクールタイム短縮（％）"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSkill.CONF_ID_SKILL_COOL_MINUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("○○スキルのクールタイム短縮（秒）"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-600),
			CConfBase.ConfMaxValue(600)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSkill.CONF_ID_SKILL_DAMAGE_UP_BASE_LEVEL_BY = confId;
		confData = [
			confId,
			CConfBase.ConfText("ベースレベル条件（ダメージ上昇用）"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSkill.CONF_ID_SKILL_COST_MINUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("○○スキルの消費ＳＰ減少（－）"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-200),
			CConfBase.ConfMaxValue(200)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomSkill.CONF_ID_SKILL_COST_DOWN = confId;
		confData = [
			confId,
			CConfBase.ConfText("○○スキルの消費ＳＰ減少（％）"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;








		CCharaConfCustomSkill.CONF_ID_NOTICE_SIGNED = confId;
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



		CCharaConfCustomSkill.CONF_ID_BLANK = confId;
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
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_DISABLE_SETTINGS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_BLANK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_SKILL_DAMAGE_UP_BASE_LEVEL_BY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_SKILL_DAMAGE_UP];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_HEAL_UP_USING];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_HEAL_UP_USED];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_BLANK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_SKILL_COST_MINUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_SKILL_COST_DOWN];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_SKILL_CAST_DOWN];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_SKILL_CAST_MINUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_SKILL_CAST_DOWN_FIXED];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_SKILL_CAST_MINUS_FIXED];
//		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_SKILL_COOL_DOWN];		// ※未対応
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_SKILL_COOL_MINUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_NOTICE_SIGNED];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomSkill.CONF_ID_BLANK];
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
		case CCharaConfCustomSkill.CONF_ID_DISABLE_SETTINGS:

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



		// 各種短縮（秒）
		case CCharaConfCustomSkill.CONF_ID_SKILL_CAST_MINUS:
		case CCharaConfCustomSkill.CONF_ID_SKILL_CAST_MINUS_FIXED:
		case CCharaConfCustomSkill.CONF_ID_SKILL_DELAY_MINUS:
		case CCharaConfCustomSkill.CONF_ID_SKILL_COOL_MINUS:

			// 選択セレクトボックスを生成
			objSelect = document.createElement("select");
			objSelect.setAttribute("id", controlId);
			objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
			objTd.appendChild(objSelect);

			// セレクトオプションを生成
			for (index = confData[CConfBase.CONF_DATA_INDEX_MIN_VALUE]; index <= confData[CConfBase.CONF_DATA_INDEX_MAX_VALUE]; index++) {
				objOption = HtmlCreateElementOption(index, (index / 10) + "秒", objSelect);

			}

			// 初期値設定
			objSelect.setAttribute("value", confData[CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);

			// RTX API用の属性追加
			if (this.dataRtxAttributeIdPrefix !== null) {
				objSelect.setAttribute(`${this.dataRtxAttributeIdPrefix}-element-id`, controlId);
				objSelect.setAttribute(`${this.dataRtxAttributeIdPrefix}-displayname`, confData[CConfBase.CONF_DATA_INDEX_TEXT]);
			}
			break;



		// ベースレベル条件
		case CCharaConfCustomSkill.CONF_ID_SKILL_DAMAGE_UP_BASE_LEVEL_BY:

			// 選択セレクトボックスを生成
			objSelect = document.createElement("select");
			objSelect.setAttribute("id", controlId);
			objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
			objTd.appendChild(objSelect);

			// セレクトオプションを生成
			objOption = HtmlCreateElementOption(0, "レベル依存なし", objSelect);
			for (index = 1; index <= confData[CConfBase.CONF_DATA_INDEX_MAX_VALUE]; index++) {
				objOption = HtmlCreateElementOption(index, index + " 上がる度に", objSelect);

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
		if (this.confArray[CCharaConfCustomSkill.CONF_ID_DISABLE_SETTINGS] == 1) {
			return 0;
		}

		return this.confArray[id];
	}





	// 初期化実行
	this.InitData();



}