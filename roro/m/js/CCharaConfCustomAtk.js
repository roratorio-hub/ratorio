function CCharaConfCustomAtk(confArray) {

	// 継承定義
	CCharaConfCustomAtk.prototype = new CConfBase();



	// 基底クラスのコンストラクタ呼び出し
	CConfBase.call(this, confArray);



	// 設定の限界値
	// この数を超える場合は、セーブデータの拡張が必要
	this.confCountLimit = 30;



	// 設定欄の横方向項目数
	this.itemInRow = 1;



	// 設定欄のラベル
	this.confLabel = "性能カスタマイズ（攻撃関連）";





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
		CCharaConfCustomAtk.prototype.InitData.call(this);



		//----------------------------------------------------------------
		// データ定義　ここから
		//----------------------------------------------------------------
		CCharaConfCustomAtk.CONF_ID_DISABLE_SETTINGS = confId;
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



		CCharaConfCustomAtk.CONF_ID_WEAPON_ATK = confId;
		confData = [
			confId,
			CConfBase.ConfText("武器ATK変更"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_WEAPON_MATK = confId;
		confData = [
			confId,
			CConfBase.ConfText("武器MATK変更"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_WEAPON_LEVEL = confId;
		confData = [
			confId,
			CConfBase.ConfText("武器Lv変更"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(4)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_ATK_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("ATK+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-500),
			CConfBase.ConfMaxValue(500)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP = confId;
		confData = [
			confId,
			CConfBase.ConfText("物理攻撃時に与えるダメージ上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_RACE = confId;
		confData = [
			confId,
			CConfBase.ConfText("物理攻撃時に○種族に与えるダメージ上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM = confId;
		confData = [
			confId,
			CConfBase.ConfText("物理攻撃時に○属性に与えるダメージ上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_SIZE = confId;
		confData = [
			confId,
			CConfBase.ConfText("物理攻撃時に○サイズに与えるダメージ上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_LONGRANGE_DAMAGE_UP = confId;
		confData = [
			confId,
			CConfBase.ConfText("（近接／遠距離）物理攻撃時に与えるダメージ上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_CRITICAL_DAMAGE_UP = confId;
		confData = [
			confId,
			CConfBase.ConfText("クリティカル攻撃で与えるダメージ上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_PERFECT_ATTACK = confId;
		confData = [
			confId,
			CConfBase.ConfText("必中攻撃+%"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_IGNORE_DEF_RACE_ALL = confId;
		confData = [
			confId,
			CConfBase.ConfText("全ての種族のDEF無視%"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_MATK_PLUS = confId;
		confData = [
			confId,
			CConfBase.ConfText("MATK+"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-500),
			CConfBase.ConfMaxValue(500)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP = confId;
		confData = [
			confId,
			CConfBase.ConfText("魔法攻撃時に与えるダメージ上昇(旧Matk+X%)"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_RACE = confId;
		confData = [
			confId,
			CConfBase.ConfText("魔法攻撃時に○種族に与えるダメージ上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM = confId;
		confData = [
			confId,
			CConfBase.ConfText("魔法攻撃時に○属性に与えるダメージ上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_SIZE = confId;
		confData = [
			confId,
			CConfBase.ConfText("魔法攻撃時に○サイズに与えるダメージ上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_ELM = confId;
		confData = [
			confId,
			CConfBase.ConfText("自分の魔法が○属性ならダメージ上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_IGNORE_MDEF_RACE_ALL = confId;
		confData = [
			confId,
			CConfBase.ConfText("全ての種族のMDEF無視%"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(100)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_DAMAGE_UP_PLAYER = confId;
		confData = [
			confId,
			CConfBase.ConfText("○形プレイヤーに与えるダメージ上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_GROUP_DAMAGE_UP = confId;
		confData = [
			confId,
			CConfBase.ConfText("地域特化&特定グループ特化(○○ダンジョンの敵やゴブリン系など)"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_BOSS_AND_NOT_BOSS = confId;
		confData = [
			confId,
			CConfBase.ConfText("物理攻撃時に（ボス／一般）に与えるダメージ上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_BOSS_AND_NOT_BOSS = confId;
		confData = [
			confId,
			CConfBase.ConfText("魔法攻撃時に（ボス／一般）に与えるダメージ上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_WEAPON_ATK_UP = confId;
		confData = [
			confId,
			CConfBase.ConfText("武器攻撃力+%"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;



		CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_ELM = confId;
		confData = [
			confId,
			CConfBase.ConfText("○属性物理攻撃力上昇"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_PERCENT),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(-300),
			CConfBase.ConfMaxValue(300)
		];
		this.confDataObj[confId] = confData;
		confId++;








		CCharaConfCustomAtk.CONF_ID_BLANK = confId;
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
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_DISABLE_SETTINGS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_BLANK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_WEAPON_ATK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_WEAPON_MATK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_WEAPON_LEVEL];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_BLANK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_ATK_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_WEAPON_ATK_UP];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_RACE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_MONSTER_ELM];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_SIZE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_BOSS_AND_NOT_BOSS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_LONGRANGE_DAMAGE_UP];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_CRITICAL_DAMAGE_UP];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_PHYSICAL_DAMAGE_UP_ELM];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_PERFECT_ATTACK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_IGNORE_DEF_RACE_ALL];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_BLANK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_MATK_PLUS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_RACE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_MONSTER_ELM];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_SIZE];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_BOSS_AND_NOT_BOSS];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_MAGICAL_DAMAGE_UP_ELM];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_IGNORE_MDEF_RACE_ALL];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_BLANK];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_DAMAGE_UP_PLAYER];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_GROUP_DAMAGE_UP];
		confDataOBJSorted[confDataOBJSorted.length] = this.confDataObj[CCharaConfCustomAtk.CONF_ID_BLANK];
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
		case CCharaConfCustomAtk.CONF_ID_DISABLE_SETTINGS:

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
		case CCharaConfCustomAtk.CONF_ID_WEAPON_ATK:
		case CCharaConfCustomAtk.CONF_ID_WEAPON_MATK:

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
		case CCharaConfCustomAtk.CONF_ID_WEAPON_LEVEL:

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
		if (this.confArray[CCharaConfCustomAtk.CONF_ID_DISABLE_SETTINGS] == 1) {
			return 0;
		}

		return this.confArray[id];
	}





	// 初期化実行
	this.InitData();



}