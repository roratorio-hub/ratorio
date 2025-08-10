function CCharaConfYozi(confArray) {
	// 継承定義
	CCharaConfYozi.prototype = new CConfBase();
	// 基底クラスのコンストラクタ呼び出し
	CConfBase.call(this, confArray);
	// 設定の限界値
	// この数を超える場合は、セーブデータの拡張が必要
	this.confCountLimit = 30;
	// 設定欄の横方向項目数
	this.itemInRow = 2;
	// 設定欄のラベル
	this.confLabel = "四次職支援設定";

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
		CCharaConfYozi.prototype.InitData.call(this);



		//----------------------------------------------------------------
		// データ定義　ここから
		//----------------------------------------------------------------
		CCharaConfYozi.CONF_ID_ARUGUTUS_VITA = confId;
		confData = [
			confId,
			CConfBase.ConfText("アルグトゥスヴィタ"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_ARUGUTUS_TERUM = confId;
		confData = [
			confId,
			CConfBase.ConfText("アルグトゥステルム"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_PRESENSE_AKYACE = confId;
		confData = [
			confId,
			CConfBase.ConfText("プレセンスアキエース"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_CONPETENTIA = confId;
		confData = [
			confId,
			CConfBase.ConfText("コンペテンティア"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_RERIGIO = confId;
		confData = [
			confId,
			CConfBase.ConfText("(△)レリギオ"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_BENEDICTUM = confId;
		confData = [
			confId,
			CConfBase.ConfText("(△)ベネディクトゥム"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_CLIMAX_IMPACT = confId;
		confData = [
			confId,
			CConfBase.ConfText("クライマックスインパクト"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_KOGEKI_SOCHI_YUKOKA = confId;
		confData = [
			confId,
			CConfBase.ConfText("攻撃装置有効化"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_BOGYO_SOCHI_YUKOKA = confId;
		confData = [
			confId,
			CConfBase.ConfText("防御装置有効化"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_SPELL_ENCHANTING = confId;
		confData = [
			confId,
			CConfBase.ConfText("スペルエンチャンティング"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_MUSICAL_INTERLUDE = confId;
		confData = [
			confId,
			CConfBase.ConfText("ミュージカルインタールード"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_YUYAKENO_SERENADE = confId;
		confData = [
			confId,
			CConfBase.ConfText("夕焼けのセレナーデ"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_PRONTERA_MARCH = confId;
		confData = [
			confId,
			CConfBase.ConfText("プロンテラマーチ"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_BUSHI_FU = confId;
		confData = [
			confId,
			CConfBase.ConfText("武士符"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_HOSHI_FU = confId;
		confData = [
			confId,
			CConfBase.ConfText("法師符"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_GOGYO_FU = confId;
		confData = [
			confId,
			CConfBase.ConfText("五行符"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_TENCHI_SHINRE = confId;
		confData = [
			confId,
			CConfBase.ConfText("天地神霊"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_NYAN_BRESSING = confId;
		confData = [
			confId,
			CConfBase.ConfText("にゃんブレッシング"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_MARIN_FESTIVAL = confId;
		confData = [
			confId,
			CConfBase.ConfText("マリンフェスティバル"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_SAND_FESTIVAL = confId;
		confData = [
			confId,
			CConfBase.ConfText("サンドフェスティバル"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_MUSICAL_PARTNER = confId;
		confData = [
			confId,
			CConfBase.ConfText("演奏用ﾊﾟｰﾄﾅｰ(ｿﾅﾀｵﾌﾞｸｳﾞｧｼﾙ)"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfYozi.CONF_ID_DUMMY = confId;
		confData = [
			confId,
			CConfBase.ConfText("-"),
			CConfBase.ConfControlType(CONTROL_TYPE_DUMMY),
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
			alert("四次職支援設定　定義数超過");
			return;
		}



		//----------------------------------------------------------------
		// 支援設定変数配列を初期化
		//----------------------------------------------------------------
		for (let idx = 0; idx < this.confCountLimit; idx++) {
			if (this.confDataObj[idx] !== undefined) {
				this.confArray[idx] = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE];
			} else {
				this.confArray[idx] = 0;
			}
		}



		//----------------------------------------------------------------
		// 表示順序に従い、四次職支援設定データ定義を再配列
		//----------------------------------------------------------------
		const displayOrder = [
			CCharaConfYozi.CONF_ID_ARUGUTUS_VITA,
			CCharaConfYozi.CONF_ID_ARUGUTUS_TERUM,
			CCharaConfYozi.CONF_ID_PRESENSE_AKYACE,
			CCharaConfYozi.CONF_ID_CONPETENTIA,
			CCharaConfYozi.CONF_ID_RERIGIO,
			CCharaConfYozi.CONF_ID_BENEDICTUM,
			CCharaConfYozi.CONF_ID_CLIMAX_IMPACT,
			CCharaConfYozi.CONF_ID_SPELL_ENCHANTING,
			CCharaConfYozi.CONF_ID_KOGEKI_SOCHI_YUKOKA,
			CCharaConfYozi.CONF_ID_BOGYO_SOCHI_YUKOKA,
			CCharaConfYozi.CONF_ID_MUSICAL_INTERLUDE,
			CCharaConfYozi.CONF_ID_YUYAKENO_SERENADE,
			CCharaConfYozi.CONF_ID_PRONTERA_MARCH,
			CCharaConfYozi.CONF_ID_MUSICAL_PARTNER,
			CCharaConfYozi.CONF_ID_BUSHI_FU,
			CCharaConfYozi.CONF_ID_HOSHI_FU,
			CCharaConfYozi.CONF_ID_GOGYO_FU,
			CCharaConfYozi.CONF_ID_TENCHI_SHINRE,
			CCharaConfYozi.CONF_ID_NYAN_BRESSING,
			CCharaConfYozi.CONF_ID_MARIN_FESTIVAL,
			CCharaConfYozi.CONF_ID_SAND_FESTIVAL,
		];
		this.confDataObj = displayOrder.map(id => this.confDataObj[id]);

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
			// 演奏用パートナー
			case CCharaConfYozi.CONF_ID_MUSICAL_PARTNER:
				// 選択セレクトボックスを生成
				const objSelect = document.createElement("select");
				objSelect.setAttribute("id", controlId);
				objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
				objTd.appendChild(objSelect);
				// セレクトオプションを生成
				HtmlCreateElementOption(0, "無し", objSelect);
				HtmlCreateElementOption(1, "有り", objSelect);
				// 初期値設定
				objSelect.setAttribute("value", confData[CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);
				break;
		}
	}

	// 初期化実行
	this.InitData();
}