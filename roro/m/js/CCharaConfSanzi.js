function CCharaConfSanzi(confArray) {

	// 継承定義
	CCharaConfSanzi.prototype = new CConfBase();



	// 基底クラスのコンストラクタ呼び出し
	CConfBase.call(this, confArray);



	// 設定の限界値
	// この数を超える場合は、セーブデータの拡張が必要
	this.confCountLimit = 100;



	// 設定欄の横方向項目数
	this.itemInRow = 2;



	// 設定欄のラベル
	this.confLabel = "三次職支援設定";





	//********************************************************************************************************************************
	//********************************************************************************************************************************
	//****
	//**** 三次職支援データ定義
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
		CCharaConfSanzi.prototype.InitData.call(this);



		//----------------------------------------------------------------
		// データ定義　ここから
		//----------------------------------------------------------------
		CCharaConfSanzi.CONF_ID_GIANT_GLOTH = confId;
		confData = [
			confId,
			CConfBase.ConfText("ジャイアントグロース(スリサズストーン)"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_FIGHTING_SPIRIT = confId;
		confData = [
			confId,
			CConfBase.ConfText("ファイティングスピリット(PT人数)"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(12)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_PIETY = confId;
		confData = [
			confId,
			CConfBase.ConfText("パイエティ"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_STRIKING = confId;
		confData = [
			confId,
			CConfBase.ConfText("ストライキングLv"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_STRIKINGYO_FUYOSKILL_LEVEL_GOKEI = confId;
		confData = [
			confId,
			CConfBase.ConfText("ストライキング用付与スキルレベル合計"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(20)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_EXPIATIO = confId;
		confData = [
			confId,
			CConfBase.ConfText("エクスピアティオ"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_ODINNO_CHIKARA = confId;
		confData = [
			confId,
			CConfBase.ConfText("オーディンの力"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(2)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_EPICLESIS = confId;
		confData = [
			confId,
			CConfBase.ConfText("エピクレシス(MHP+)"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_SECRAMENT = confId;
		confData = [
			confId,
			CConfBase.ConfText("サクラメント(固定詠唱-)"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_LAUDAAGNUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("ラウダアグヌス(MaxHP+)"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(4)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_LAUDARAMUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("ラウダラムス(Criダメージ+)"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(4)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_ZYUTSUSHIKI_TENKAI = confId;
		confData = [
			confId,
			CConfBase.ConfText("術式-展開-(未実装)"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(4)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_BUNSHIN = confId;
		confData = [
			confId,
			CConfBase.ConfText("分身Lv"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_PAIN_KILLER = confId;
		confData = [
			confId,
			CConfBase.ConfText("ペインキラー(Sホム)"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_PAIN_KILLER_BASE_LEVEL = confId;
		confData = [
			confId,
			CConfBase.ConfText("ペインキラー用SホムのBaseLv"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(18)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_EBI_ZANMAI = confId;
		confData = [
			confId,
			CConfBase.ConfText("エビ三昧"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_GROOMING = confId;
		confData = [
			confId,
			CConfBase.ConfText("グルーミング/のどを鳴らす"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_EBI_PARTY = confId;
		confData = [
			confId,
			CConfBase.ConfText("エビパーティー"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_EBI_PARTY_TAMASHI_LEVEL = confId;
		confData = [
			confId,
			CConfBase.ConfText("エビパーティー用海の魂Lv"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_CHATTERING = confId;
		confData = [
			confId,
			CConfBase.ConfText("チャタリング/ミャウミャウ"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_ARCLOUSE_DASH = confId;
		confData = [
			confId,
			CConfBase.ConfText("アクラウスダッシュ"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_KEIKAI = confId;
		confData = [
			confId,
			CConfBase.ConfText("警戒"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_UNLIMIT = confId;
		confData = [
			confId,
			CConfBase.ConfText("アンリミット"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_TAKANO_TAMASHI = confId;
		confData = [
			confId,
			CConfBase.ConfText("鷹の魂"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_YOSENO_TAMASHI = confId;
		confData = [
			confId,
			CConfBase.ConfText("妖精の魂"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_KAGENO_TAMASHI = confId;
		confData = [
			confId,
			CConfBase.ConfText("影の魂"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_GOLEMNO_TAMASHI = confId;
		confData = [
			confId,
			CConfBase.ConfText("ゴーレムの魂"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfSanzi.CONF_ID_FRIGGNO_UTA = confId;
		confData = [
			confId,
			CConfBase.ConfText("フリッグの歌"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;





		CCharaConfSanzi.CONF_ID_DUMMY = confId;
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
			alert("三次職支援設定　定義数超過");
			return;
		}



		//----------------------------------------------------------------
		// 三次職支援設定変数配列を初期化
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
		// 表示順序に従い、三次職支援設定データ定義を再配列
		//----------------------------------------------------------------
		confDataOBJSorted = new Array();
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_GIANT_GLOTH];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_FIGHTING_SPIRIT];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_PIETY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_DUMMY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_STRIKING];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_STRIKINGYO_FUYOSKILL_LEVEL_GOKEI];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_EXPIATIO];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_ODINNO_CHIKARA];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_EPICLESIS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_SECRAMENT];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_LAUDAAGNUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_LAUDARAMUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_UNLIMIT];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_FRIGGNO_UTA];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_BUNSHIN];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_DUMMY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_TAKANO_TAMASHI];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_YOSENO_TAMASHI];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_KAGENO_TAMASHI];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_GOLEMNO_TAMASHI];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_PAIN_KILLER];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_PAIN_KILLER_BASE_LEVEL];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_EBI_ZANMAI];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_GROOMING];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_EBI_PARTY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_EBI_PARTY_TAMASHI_LEVEL];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_CHATTERING];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_ARCLOUSE_DASH];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_KEIKAI];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfSanzi.CONF_ID_DUMMY];
		this.confDataObj = confDataOBJSorted;

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

		// ファイティングスピリット
		case CCharaConfSanzi.CONF_ID_FIGHTING_SPIRIT:

			// 選択セレクトボックスを生成
			objSelect = document.createElement("select");
			objSelect.setAttribute("id", controlId);
			objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
			objTd.appendChild(objSelect);

			// セレクトオプションを生成
			objOption = HtmlCreateElementOption(0, "off", objSelect);
			for (var loopIdx = 2; loopIdx <= 12; loopIdx++) {
				objOption = HtmlCreateElementOption(loopIdx, loopIdx + "人PT", objSelect);
			}

			// 初期値設定
			objSelect.setAttribute("value", confData[CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);

			break;

		// 術式-展開-
		case CCharaConfSanzi.CONF_ID_ZYUTSUSHIKI_TENKAI:

			// 選択セレクトボックスを生成
			objSelect = document.createElement("select");
			objSelect.setAttribute("id", controlId);
			objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
			objTd.appendChild(objSelect);

			// セレクトオプションを生成
			objOption = HtmlCreateElementOption(0, "off", objSelect);
			objOption = HtmlCreateElementOption(1, "水", objSelect);
			objOption = HtmlCreateElementOption(2, "土", objSelect);
			objOption = HtmlCreateElementOption(3, "火", objSelect);
			objOption = HtmlCreateElementOption(4, "風", objSelect);

			// 初期値設定
			objSelect.setAttribute("value", confData[CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);

			break;

		// ペインキラー用SホムのBaseLv
		case CCharaConfSanzi.CONF_ID_PAIN_KILLER_BASE_LEVEL:

			// 選択セレクトボックスを生成
			objSelect = document.createElement("select");
			objSelect.setAttribute("id", controlId);
			objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
			objTd.appendChild(objSelect);

			// セレクトオプションを生成
			for (var loopIdx = 0; loopIdx <= 18; loopIdx++) {
				objOption = HtmlCreateElementOption(loopIdx, loopIdx + 132, objSelect);
			}

			// 初期値設定
			objSelect.setAttribute("value", confData[CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);

			break;

		}
	}





	// 初期化実行
	this.InitData();



}