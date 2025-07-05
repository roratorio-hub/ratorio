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

		// マーダラーボーナス廃止に伴う欠番
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
			if (this.confDataObj[idx] !== undefined) {
				this.confArray[idx] = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE];
			} else {
				this.confArray[idx] = 0;
			}
		}

		//----------------------------------------------------------------
		// 表示順序に従い、一次職支援設定データ定義を再配列
		//----------------------------------------------------------------
		const displayOrder = [
			CCharaConfIchizi.CONF_ID_BLESSING,
			CCharaConfIchizi.CONF_ID_SOKUDO_ZOKA,
			CCharaConfIchizi.CONF_ID_ANGELUS,
			CCharaConfIchizi.CONF_ID_DUMMY,
			CCharaConfIchizi.CONF_ID_SHIEN_PROVOKE,
			CCharaConfIchizi.CONF_ID_MAGNUM_BREAK_ZYOTAI,
			CCharaConfIchizi.CONF_ID_ENDURE,
			CCharaConfIchizi.CONF_ID_DUMMY,
			CCharaConfIchizi.CONF_ID_SHUCHURYOKU_KOZYO,
			CCharaConfIchizi.CONF_ID_DUMMY,
			CCharaConfIchizi.CONF_ID_LOUD_VOICE,
			CCharaConfIchizi.CONF_ID_DUMMY,
			CCharaConfIchizi.CONF_ID_DUMMY,
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
		}
	}

	// 初期化実行
	this.InitData();
}