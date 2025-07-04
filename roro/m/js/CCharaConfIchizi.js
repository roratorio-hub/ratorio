function CCharaConfIchizi(confArray) {
	// 継承定義
	CCharaConfIchizi.prototype = new CConfBase();
	// 基底クラスのコンストラクタ呼び出し
	CConfBase.call(this, confArray);
	// 設定の限界値
	// この数を超える場合は、セーブデータの拡張が必要
	this.confCountLimit = 50;
	// 設定欄の横方向項目数
	this.itemInRow = 2;
	// 設定欄のラベル
	this.confLabel = "一次職支援設定";

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
		CCharaConfIchizi.prototype.InitData.call(this);



		//----------------------------------------------------------------
		// データ定義　ここから
		//----------------------------------------------------------------
		CCharaConfIchizi.CONF_ID_BLESSING = confId;
		confData = [
			confId,
			CConfBase.ConfText("ブレッシング"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfIchizi.CONF_ID_SOKUDO_ZOKA = confId;
		confData = [
			confId,
			CConfBase.ConfText("速度増加"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfIchizi.CONF_ID_ANGELUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("エンジェラス"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfIchizi.CONF_ID_MAGNUM_BREAK_ZYOTAI = confId;
		confData = [
			confId,
			CConfBase.ConfText("マグナムブレイク状態"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfIchizi.CONF_ID_SHIEN_PROVOKE = confId;
		confData = [
			confId,
			CConfBase.ConfText("支援プロボック"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfIchizi.CONF_ID_MARDERER_BONUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("マーダラーボーナス"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(2)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfIchizi.CONF_ID_SHUCHURYOKU_KOZYO = confId;
		confData = [
			confId,
			CConfBase.ConfText("集中力向上"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfIchizi.CONF_ID_LOUD_VOICE = confId;
		confData = [
			confId,
			CConfBase.ConfText("ラウドボイス"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfIchizi.CONF_ID_ENDURE = confId;
		confData = [
			confId,
			CConfBase.ConfText("インデュア"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;





		CCharaConfIchizi.CONF_ID_DUMMY = confId;
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
			alert("一次職支援設定　定義数超過");
			return;
		}



		//----------------------------------------------------------------
		// 支援設定変数配列を初期化
		//----------------------------------------------------------------
		for (let idx = 0; idx < this.confCountLimit; idx++) {
			if (idx < this.confDataObj.length) {
				if (this.confDataObj[idx] !== undefined) {
					this.confArray[idx] = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE];
				}
			} else {
				this.confArray[idx] = 0;
			}
		}



		//----------------------------------------------------------------
		// 表示順序に従い、一次職支援設定データ定義を再配列
		//----------------------------------------------------------------
		confDataOBJSorted = new Array();
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfIchizi.CONF_ID_BLESSING];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfIchizi.CONF_ID_SOKUDO_ZOKA];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfIchizi.CONF_ID_ANGELUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfIchizi.CONF_ID_DUMMY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfIchizi.CONF_ID_SHIEN_PROVOKE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfIchizi.CONF_ID_MAGNUM_BREAK_ZYOTAI];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfIchizi.CONF_ID_ENDURE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfIchizi.CONF_ID_DUMMY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfIchizi.CONF_ID_SHUCHURYOKU_KOZYO];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfIchizi.CONF_ID_DUMMY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfIchizi.CONF_ID_LOUD_VOICE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfIchizi.CONF_ID_DUMMY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfIchizi.CONF_ID_MARDERER_BONUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfIchizi.CONF_ID_DUMMY];
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


		// マーダラーボーナス
		case CCharaConfIchizi.CONF_ID_MARDERER_BONUS:

			// 選択セレクトボックスを生成
			objSelect = document.createElement("select");
			objSelect.setAttribute("id", controlId);
			objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
			objTd.appendChild(objSelect);

			// セレクトオプションを生成
			objOption = HtmlCreateElementOption(0, "なし", objSelect);
			objOption = HtmlCreateElementOption(1, "ALL+3", objSelect);
			objOption = HtmlCreateElementOption(2, "ALL+5", objSelect);

			// 初期値設定
			objSelect.setAttribute("value", confData[CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);

			break;
		}
	}

	// 初期化実行
	this.InitData();
}