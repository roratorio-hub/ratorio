function CCharaConfNizi(confArray) {
	// 継承定義
	CCharaConfNizi.prototype = new CConfBase();
	// 基底クラスのコンストラクタ呼び出し
	CConfBase.call(this, confArray);
	// 設定の限界値
	// この数を超える場合は、セーブデータの拡張が必要
	this.confCountLimit = 50;
	// 設定欄の横方向項目数
	this.itemInRow = 2;
	// 設定欄のラベル
	this.confLabel = "二次職支援設定";

	/**
	 * 設定データを初期化（セットアップ）する.
	 * （継承先でオーバーライドすること）
	 */
	this.InitData = function () {
		let confId = 0;
		let confData = new Array();
		let confDataOBJSorted = new Array();

		// 基底クラスのセットアップ処理を実行
		CCharaConfNizi.prototype.InitData.call(this);

		//----------------------------------------------------------------
		// データ定義　ここから
		//----------------------------------------------------------------
		CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_VOLCANO = 0;
		CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_DELUGE = 1;
		CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI_VIOLENT_GALE = 2;

		CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI = confId;
		confData = [
			confId,
			CConfBase.ConfText("属性場　種類"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(2)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_ZOKUSEIBA_LEVEL = confId;
		confData = [
			confId,
			CConfBase.ConfText("属性場　レベル"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_SHIEN_MIND_BREAKER = confId;
		confData = [
			confId,
			CConfBase.ConfText("支援マインドブレイカー"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_SEITAI_KOFUKU = confId;
		confData = [
			confId,
			CConfBase.ConfText("聖体降福"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_KAITO = confId;
		confData = [
			confId,
			CConfBase.ConfText("カイト(敵ATK 5倍)"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(7)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_IMPOSITIO_MANUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("イムポシティオマヌス"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_SUFFRAGIUM = confId;
		confData = [
			confId,
			CConfBase.ConfText("サフラギウム"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(3)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_GLORIA = confId;
		confData = [
			confId,
			CConfBase.ConfText("グロリア"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_ASSUMPTIO = confId;
		confData = [
			confId,
			CConfBase.ConfText("アスムプティオ"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_ADRENALINE_RUSH = confId;
		confData = [
			confId,
			CConfBase.ConfText("アドレナリンラッシュ"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(3)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_WEAPON_PERFECTION = confId;
		confData = [
			confId,
			CConfBase.ConfText("ウェポンパーフェクション"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_OVER_TRUST = confId;
		confData = [
			confId,
			CConfBase.ConfText("オーバートラスト"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_WIND_WALK = confId;
		confData = [
			confId,
			CConfBase.ConfText("ウィンドウォーク"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_KIKO = confId;
		confData = [
			confId,
			CConfBase.ConfText("気功"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_PROVIDENCE = confId;
		confData = [
			confId,
			CConfBase.ConfText("プロヴィデンス"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_CONCENTRATION = confId;
		confData = [
			confId,
			CConfBase.ConfText("コンセントレイション"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_TRUE_SIGHT = confId;
		confData = [
			confId,
			CConfBase.ConfText("トゥルーサイト"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_MAHORYOKU_ZOFUKU = confId;
		confData = [
			confId,
			CConfBase.ConfText("魔法力増幅"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_DEFENDER = confId;
		confData = [
			confId,
			CConfBase.ConfText("ディフェンダー"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_AUTO_GUARD = confId;
		confData = [
			confId,
			CConfBase.ConfText("オートガード"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_CLOSE_CONFINE = confId;
		confData = [
			confId,
			CConfBase.ConfText("クローズコンファイン"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_AURA_BLADE = confId;
		confData = [
			confId,
			CConfBase.ConfText("オーラブレイド"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_KONGO = confId;
		confData = [
			confId,
			CConfBase.ConfText("金剛"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_MAXIMIZE_POWER = confId;
		confData = [
			confId,
			CConfBase.ConfText("マキシマイズパワー"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfNizi.CONF_ID_DUMMY = confId;
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
			alert("二次職支援設定　定義数超過");
			return;
		}

		//----------------------------------------------------------------
		// 支援設定変数配列を初期化
		//----------------------------------------------------------------
		for (let idx = 0; idx < this.confCountLimit; idx++) {
			if (idx < this.confDataObj.length && this.confDataObj[idx] !== undefined) {
				this.confArray[idx] = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE];
			} else {
				this.confArray[idx] = 0;
			}
		}

		//----------------------------------------------------------------
		// 表示順序に従い、二次職支援設定データ定義を再配列
		//----------------------------------------------------------------
		confDataOBJSorted = new Array();
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_IMPOSITIO_MANUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_SUFFRAGIUM];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_GLORIA];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_SEITAI_KOFUKU];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_ASSUMPTIO];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_DUMMY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_ADRENALINE_RUSH];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_OVER_TRUST];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_WEAPON_PERFECTION];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_MAXIMIZE_POWER];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_KIKO];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_KONGO];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_DEFENDER];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_AUTO_GUARD];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_PROVIDENCE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_DUMMY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_CLOSE_CONFINE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_DUMMY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_AURA_BLADE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_CONCENTRATION];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_WIND_WALK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_TRUE_SIGHT];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_MAHORYOKU_ZOFUKU];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_DUMMY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_ZOKUSEIBA_LEVEL];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_SHIEN_MIND_BREAKER];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_DUMMY];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_KAITO];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfNizi.CONF_ID_DUMMY];
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

		// 属性場　種類
		case CCharaConfNizi.CONF_ID_ZOKUSEIBA_SHURUI:

			// 選択セレクトボックスを生成
			objSelect = document.createElement("select");
			objSelect.setAttribute("id", controlId);
			objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
			objTd.appendChild(objSelect);

			// セレクトオプションを生成
			objOption = HtmlCreateElementOption(0, "火", objSelect);
			objOption = HtmlCreateElementOption(1, "水", objSelect);
			objOption = HtmlCreateElementOption(2, "風", objSelect);

			// 初期値設定
			objSelect.setAttribute("value", confData[CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);

			break;

		// アドレナリンラッシュ
		case CCharaConfNizi.CONF_ID_ADRENALINE_RUSH:

			// 選択セレクトボックスを生成
			objSelect = document.createElement("select");
			objSelect.setAttribute("id", controlId);
			objSelect.setAttribute("onChange", "CConfBase.OnChangeValueHandler(" + this.instanceNo + ", true)");
			objTd.appendChild(objSelect);

			// セレクトオプションを生成
			objOption = HtmlCreateElementOption(0, "OFF", objSelect);
			objOption = HtmlCreateElementOption(1, "通常AR", objSelect);
			objOption = HtmlCreateElementOption(2, "フルAR", objSelect);
			objOption = HtmlCreateElementOption(3, "ｽｸﾛｰﾙ", objSelect);

			// 初期値設定
			objSelect.setAttribute("value", confData[CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE]);

			break;

		// 金剛
		case CCharaConfNizi.CONF_ID_KONGO:

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

	// 初期化実行
	this.InitData();
}