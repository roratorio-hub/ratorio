function CCharaConfCustomDef(confArray) {

	// 継承定義
	CCharaConfCustomDef.prototype = new CConfBase();



	// 基底クラスのコンストラクタ呼び出し
	CConfBase.call(this, confArray);



	// 設定の限界値
	// この数を超える場合は、セーブデータの拡張が必要
	this.confCountLimit = CUSTOM_CONF_DEF_LIMIT;



	// 設定欄の横方向項目数
	this.itemInRow = 1;



	// 設定欄のラベル
	this.confLabel = "性能カスタマイズ（防御関連）";





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
		CCharaConfCustomDef.prototype.InitData.call(this);



		//----------------------------------------------------------------
		// データ定義　ここから
		//----------------------------------------------------------------
		CCharaConfCustomDef.CONF_ID_DISABLE_SETTINGS = confId;
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



		CCharaConfCustomDef.CONF_ID_DEF_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("DEF+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-2000),
			CConfBase.ConfMaxValue(2000)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomDef.CONF_ID_MDEF_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("MDEF+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-2000),
			CConfBase.ConfMaxValue(2000)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomDef.CONF_ID_RESIST_RACE = confId;
		confData = [
			confId,
			CConfBase.ConfText("○○種族耐性"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomDef.CONF_ID_RESIST_MONSTER_ELM = confId;
		confData = [
			confId,
			CConfBase.ConfText("○○属性モンスター耐性"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomDef.CONF_ID_RESIST_ELM = confId;
		confData = [
			confId,
			CConfBase.ConfText("○○属性攻撃耐性"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomDef.CONF_ID_RESIST_SIZE = confId;
		confData = [
			confId,
			CConfBase.ConfText("○○サイズ耐性"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomDef.CONF_ID_RESIST_LONGRANGE = confId;
		confData = [
			confId,
			CConfBase.ConfText("遠距離攻撃耐性"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomDef.CONF_ID_RESIST_PLAYER = confId;
		confData = [
			confId,
			CConfBase.ConfText("○○形プレイヤー耐性"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomDef.CONF_ID_RESIST_GROUP = confId;
		confData = [
			confId,
			CConfBase.ConfText("地域＆特定グループ耐性(○○ダンジョンの敵やゴブリン系など)"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomDef.CONF_ID_RESIST_BOSS = confId;
		confData = [
			confId,
			CConfBase.ConfText("ボス／一般モンスター耐性"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-100),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;








		CCharaConfCustomDef.CONF_ID_BLANK = confId;
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
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomDef.CONF_ID_DISABLE_SETTINGS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomDef.CONF_ID_BLANK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomDef.CONF_ID_DEF_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomDef.CONF_ID_MDEF_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomDef.CONF_ID_BLANK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomDef.CONF_ID_RESIST_RACE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomDef.CONF_ID_RESIST_MONSTER_ELM];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomDef.CONF_ID_RESIST_ELM];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomDef.CONF_ID_RESIST_SIZE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomDef.CONF_ID_RESIST_BOSS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomDef.CONF_ID_RESIST_LONGRANGE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomDef.CONF_ID_RESIST_PLAYER];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomDef.CONF_ID_RESIST_GROUP];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomDef.CONF_ID_BLANK];
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
		case CCharaConfCustomDef.CONF_ID_DISABLE_SETTINGS:

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



		// 武器ATK、武器MATK
		case CCharaConfCustomDef.CONF_ID_WEAPON_ATK:
		case CCharaConfCustomDef.CONF_ID_WEAPON_MATK:

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

			break;



		// 武器Lv
		case CCharaConfCustomDef.CONF_ID_WEAPON_LEVEL:

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

			break;
		}
	}



	/**
	 * 設定値を取得する.
	 * @param id 取得する設定のID
	 */
	this.GetConf = function (id) {
		if (this.confArray[CCharaConfCustomDef.CONF_ID_DISABLE_SETTINGS] == 1) {
			return 0;
		}

		return this.confArray[id];
	}





	// 初期化実行
	this.InitData();



}