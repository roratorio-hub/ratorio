
// パラメータID定義
CGlobalConstManager.DefineEnum(
	"EnumMobConfId",
	[
		"MOB_CONF_INPUT_DATA_INDEX_PROTECT",
		"MOB_CONF_INPUT_DATA_INDEX_NAME",
		"MOB_CONF_INPUT_DATA_INDEX_LV",
		"MOB_CONF_INPUT_DATA_INDEX_HP",
		"MOB_CONF_INPUT_DATA_INDEX_STR",
		"MOB_CONF_INPUT_DATA_INDEX_INT",
		"MOB_CONF_INPUT_DATA_INDEX_VIT",
		"MOB_CONF_INPUT_DATA_INDEX_DEX",
		"MOB_CONF_INPUT_DATA_INDEX_AGI",
		"MOB_CONF_INPUT_DATA_INDEX_LUK",		// 10
		"MOB_CONF_INPUT_DATA_INDEX_ATK",
		"MOB_CONF_INPUT_DATA_INDEX_MATK",
		"MOB_CONF_INPUT_DATA_INDEX_RANGE",
		"MOB_CONF_INPUT_DATA_INDEX_DEF",
		"MOB_CONF_INPUT_DATA_INDEX_MDEF",
		"MOB_CONF_INPUT_DATA_INDEX_BASE_EXP",
		"MOB_CONF_INPUT_DATA_INDEX_JOB_EXP",
		"MOB_CONF_INPUT_DATA_INDEX_SIZE",
		"MOB_CONF_INPUT_DATA_INDEX_ELEMENT",
		"MOB_CONF_INPUT_DATA_INDEX_RACE",		// 20
		"MOB_CONF_INPUT_DATA_INDEX_BOSS_TYPE",
		"MOB_CONF_INPUT_DATA_INDEX_GRASS_TYPE",
		"MOB_CONF_INPUT_DATA_INDEX_RES",
		"MOB_CONF_INPUT_DATA_INDEX_MRES",
	],
	0,
	1
);

function CMobConfInputData() {

	/** データ配列. */
	this.dataArray = new Array();

	/**
	 * 初期化処理.
	 */
	this.Init = function () {

		// 初期設定

		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_PROTECT] = 0;

		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_NAME] = "";

		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_LV] = 1;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_HP] = 1;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_STR] = 1;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_INT] = 1;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_VIT] = 1;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_DEX] = 1;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_AGI] = 1;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_LUK] = 1;

		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_ATK] = 1;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_MATK] = 1;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_RANGE] = 1;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_DEF] = 1;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_MDEF] = 1;

		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_BASE_EXP] = 1;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_JOB_EXP] = 1;

		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_SIZE] = SIZE_ID_SMALL;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_ELEMENT] = MONSTER_ELM_VANITY_1;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_RACE] = RACE_ID_SOLID;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_BOSS_TYPE] = MONSTER_BOSSTYPE_NONE;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_GRASS_TYPE] = MONSTER_GRASSTYPE_NONE;

		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_RES] = 0;
		this.dataArray[MOB_CONF_INPUT_DATA_INDEX_MRES] = 0;
	};

	// 初期化処理実行
	this.Init();

	/**
	 * データを設定する.
	 */
	this.SetData = function (index, value) {
		this.dataArray[index] = value;
	};

	/**
	 * データを取得する.
	 */
	this.GetData = function (index) {
		return this.dataArray[index];
	};

	/**
	 * 初期値かどうかを判定する.
	 */
	this.IsDefaultValues = function () {

		var idx = 0;

		var dataDefault = null;

		dataDefault = new CMobConfInputData();

		// データ長検査
		if (this.dataArray.length != dataDefault.dataArray.length) {
			return false;
		}

		// データ内容検査
		for (idx = 0; idx < this.dataArray.length; idx++) {

			// 入力保護は対象外
			if (idx == MOB_CONF_INPUT_DATA_INDEX_PROTECT) {
				continue;
			}

			if (this.dataArray[idx] != dataDefault.dataArray[idx]) {
				return false;
			}
		}

		return true;
	};

}



// コードバージョン
CGlobalConstManager.DefineEnum(
	"EnumMobConfInputVersion",
	[
		"MOB_CONF_INPUT_VERSION",
	],
	29,
	0
);

// モンスター手入力設定数
CGlobalConstManager.DefineEnum(
	"EnumMobConfInputCount",
	[
		"MOB_CONF_INPUT_COUNT",
	],
	20,
	0
);

// データ管理インスタンス
g_dataManagerMobConfInput = null;

// 初期化
(function () {

	var idx = 0;

	// データ管理インスタンス生成
	g_dataManagerMobConfInput = new CConfBaseManagementParam();

	// デフォルトデータ作成
	g_dataManagerMobConfInput.confDataArray = new Array();

	for (idx = 0; idx < MOB_CONF_INPUT_COUNT; idx++) {
		g_dataManagerMobConfInput.confDataArray.push(new CMobConfInputData());
	}

	// アクティブなデータ番号を初期化
	g_dataManagerMobConfInput.activeIndex = 0;

})();


/**
 * モンスター手入力データを取得する（アクティブな設定限定）.
 * @param confIndex 設定インデックス
 */
function GetMobConfInput(confIndex) {

	var confData = null;

	confData = g_dataManagerMobConfInput.GetActiveConfData();

	return confData.GetData(confIndex);
}

/**
 * モンスター手入力データを設定する（アクティブな設定限定）.
 * @param confIndex 設定インデックス
 */
function SetMobConfInput(confIndex, value) {

	var confData = null;

	confData = g_dataManagerMobConfInput.GetActiveConfData();

	confData.SetData(confIndex, value);
}

/**
 * モンスター手入力データのアクティブな設定インデックスを設定する.
 */
function SetActiveIndexMobConfInput(activeIndex) {

	if (activeIndex < 0) {
		return;
	}

	if (activeIndex >= g_dataManagerMobConfInput.GetDataCount()) {
		return;
	}

	g_dataManagerMobConfInput.activeIndex = activeIndex;
}



function CMobConfInputAreaComponentManager(confMngParam) {
	// 継承定義
	CMobConfInputAreaComponentManager.prototype = new CConfBase2();
	// 基底クラスのコンストラクタ呼び出し
	CConfBase2.call(this, confMngParam);
	// 設定の限界値
	// この数を超える場合は、セーブデータの拡張が必要
	this.confCountLimit = 29;
	// 設定欄の横方向項目数
	this.itemInRow = 1;
	// 設定欄のラベル
	this.confLabel = "モンスター手入力設定";

	//********************************************************************************************************************************
	//********************************************************************************************************************************
	//****
	//**** 一次職支援データ定義
	//****
	//********************************************************************************************************************************
	//********************************************************************************************************************************

	/** コード変換パラメータ配列. */
	this.convertParamArray = [];

	/**
	 * 設定データを初期化（セットアップ）する.
	 * （継承先でオーバーライドすること）
	 */
	this.InitData = function () {

		var idx = 0;

		var confId = 0;
		var enumName = "";
		var confData = new Array();

		var confDataOBJSorted = new Array();

		var listText = "";
		var maxValue10G = 9999999999;

		// 列挙定数選択肢配列
		var selectDataArray = null;
		var funcGetEnumText = null;

		// 列挙定数選択肢配列加工用関数
		var funcCreateEnumSelect = function (idx, name, value) {

			var text = funcGetEnumText(value);

			if (text == "エラー") {
				return;
			}

			selectDataArray.push(new CConfBaseSelectData().SetText(text).SetValue(value));
		};

		// データ登録先
		var regArray = this.confDataObj;

		// データ登録関数
		var funcRegister = function (regparam) {

			// CConfBaseRegisterParam 型の引数で渡す

			// データＩＤ定数登録
			CGlobalConstManager.DefineEnum("EnumMobConfInputConfId", [regparam.enumName], regparam.data.id, 0);

			// データ追加
			regArray[regparam.data.id] = regparam.data;
		};

		// 基底クラスのセットアップ処理を実行
		CMobConfInputAreaComponentManager.prototype.InitData.call(this);

		//----------------------------------------------------------------
		// データ定義　ここから
		//----------------------------------------------------------------

		enumName = "MOB_CONF_INPUT_CONTROL_ID_LIST";
		selectDataArray = new Array();
		for (idx = 0; idx < this.confMngParam.GetDataCount(); idx++) {
			listText = "No." + idx + " : ";
			if (idx == 0) {
				listText += "（自動読込）";
			}
			else {
				listText += "（未登録）";
			}
			selectDataArray.push(new CConfBaseSelectData().SetText(listText).SetValue(idx));
		}
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetText("データ選択")
			.SetControlType(CONTROL_TYPE_SELECT)
			.SetSelectDataArray(selectDataArray)
			.SetDefaultValue(0)
			.SetFuncOnChange(this.OnChangeList)
			.SetNotice("No.0 は、編集不可。（読込専用）")
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_PROTECT";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_PROTECT)
			.SetText("入力保護")
			.SetControlType(CONTROL_TYPE_CHECKBOX)
			.SetDefaultValue(0)
			.SetFuncInputModify(this.InputModifyProtect)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_NAME";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_NAME)
			.SetText("名称")
			.SetControlType(CONTROL_TYPE_TEXT)
			.SetDefaultValue("")
			.SetNotice("16文字まで。一部記号は不可。")
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_LV";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_LV)
			.SetText("レベル")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(1)
			.SetMaxValue(999)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_HP";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_HP)
			.SetText("HP")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_STR";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_STR)
			.SetText("STR")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_INT";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_INT)
			.SetText("INT")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_VIT";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_VIT)
			.SetText("VIT")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_DEX";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_DEX)
			.SetText("DEX")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_AGI";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_AGI)
			.SetText("AGI")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_LUK";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_LUK)
			.SetText("LUK")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_ATK";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_ATK)
			.SetText("ATK")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_MATK";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_MATK)
			.SetText("MATK")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_RANGE";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_RANGE)
			.SetText("射程(Ar)")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(1)
			.SetMaxValue(30)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_DEF";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_DEF)
			.SetText("DEF")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_MDEF";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_MDEF)
			.SetText("MDEF")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_BASE_EXP";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_BASE_EXP)
			.SetText("BaseExp")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_JOB_EXP";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_JOB_EXP)
			.SetText("JobExp")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_SIZE";
		selectDataArray = new Array();
		funcGetEnumText = GetSizeText;
		CGlobalConstManager.SearchMap("EnumSizeId").value.For(funcCreateEnumSelect);
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_SIZE)
			.SetText("サイズ")
			.SetControlType(CONTROL_TYPE_SELECT)
			.SetSelectDataArray(selectDataArray)
			.SetDefaultValue(SIZE_ID_SMALL)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_ELEMENT";
		selectDataArray = new Array();
		funcGetEnumText = GetMonsterElementText;
		CGlobalConstManager.SearchMap("EnumMonsterElement").value.For(funcCreateEnumSelect);
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_ELEMENT)
			.SetText("属性")
			.SetControlType(CONTROL_TYPE_SELECT)
			.SetSelectDataArray(selectDataArray)
			.SetDefaultValue(MONSTER_ELM_VANITY_1)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_RACE";
		selectDataArray = new Array();
		funcGetEnumText = GetRaceText;
		CGlobalConstManager.SearchMap("EnumRaceId").value.For(funcCreateEnumSelect);
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_RACE)
			.SetText("種族")
			.SetControlType(CONTROL_TYPE_SELECT)
			.SetSelectDataArray(selectDataArray)
			.SetDefaultValue(RACE_ID_SOLID)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_BOSS";
		selectDataArray = new Array();
		funcGetEnumText = GetBossTypeText;
		CGlobalConstManager.SearchMap("EnumMonsterBossType").value.For(funcCreateEnumSelect);
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_BOSS_TYPE)
			.SetText("BOSS属性")
			.SetControlType(CONTROL_TYPE_SELECT)
			.SetSelectDataArray(selectDataArray)
			.SetDefaultValue(MONSTER_BOSSTYPE_NONE)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_GRASS";
		selectDataArray = new Array();
		funcGetEnumText = GetGrassTypeText;
		CGlobalConstManager.SearchMap("EnumMonsterGrassType").value.For(funcCreateEnumSelect);
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_GRASS_TYPE)
			.SetText("草属性")
			.SetControlType(CONTROL_TYPE_SELECT)
			.SetSelectDataArray(selectDataArray)
			.SetDefaultValue(MONSTER_GRASSTYPE_NONE)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_RES";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_RES)
			.SetText("RES(暫定対応)")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(0)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_MRES";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetMappedIndex(MOB_CONF_INPUT_DATA_INDEX_MRES)
			.SetText("MRES(暫定対応)")
			.SetControlType(CONTROL_TYPE_NUMBER)
			.SetMinValue(0)
			.SetMaxValue(maxValue10G)
			.SetDefaultValue(0)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		enumName = "MOB_CONF_INPUT_CONTROL_ID_DUMMY";
		confData = new CConfBaseConfData()
			.SetId(confId)
			.SetText("-")
			.SetControlType(CONTROL_TYPE_DUMMY)
		;
		funcRegister(new CConfBaseRegisterParam().SetEnumName(enumName).SetData(confData));
		confId++;

		//----------------------------------------------------------------
		// データ定義数チェック
		//----------------------------------------------------------------
		if (this.confCountLimit < this.confDataObj.length) {
			alert("モンスター手入力設定　定義数超過");
			return;
		}

		//----------------------------------------------------------------
		// 表示順序に従い、モンスター手入力設定データ定義を再配列
		//----------------------------------------------------------------
		confDataOBJSorted = new Array();
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_LIST]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_PROTECT]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_NAME]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_LV]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_HP]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_STR]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_INT]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_VIT]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_DEX]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_AGI]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_LUK]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_ATK]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_MATK]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_RANGE]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_DEF]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_MDEF]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_RES]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_MRES]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_BASE_EXP]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_JOB_EXP]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_SIZE]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_ELEMENT]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_RACE]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_BOSS]);
		confDataOBJSorted.push(this.confDataObj[MOB_CONF_INPUT_CONTROL_ID_GRASS]);
		this.confDataObj = confDataOBJSorted;



		//----------------------------------------------------------------
		// コード変換対象配列
		//----------------------------------------------------------------
		this.convertTargetIdArray = [
			[MOB_CONF_INPUT_CONTROL_ID_PROTECT, 1],
			[MOB_CONF_INPUT_CONTROL_ID_LV, 2],
			[MOB_CONF_INPUT_CONTROL_ID_HP, 6],
			[MOB_CONF_INPUT_CONTROL_ID_STR, 6],
			[MOB_CONF_INPUT_CONTROL_ID_INT, 6],
			[MOB_CONF_INPUT_CONTROL_ID_VIT, 6],
			[MOB_CONF_INPUT_CONTROL_ID_DEX, 6],
			[MOB_CONF_INPUT_CONTROL_ID_AGI, 6],
			[MOB_CONF_INPUT_CONTROL_ID_LUK, 6],
			[MOB_CONF_INPUT_CONTROL_ID_ATK, 6],
			[MOB_CONF_INPUT_CONTROL_ID_MATK, 6],
			[MOB_CONF_INPUT_CONTROL_ID_RANGE, 1],
			[MOB_CONF_INPUT_CONTROL_ID_DEF, 6],
			[MOB_CONF_INPUT_CONTROL_ID_MDEF, 6],
			/** 新規データを追加するにはセーブデータの後方互換性確保が必要
			[MOB_CONF_INPUT_CONTROL_ID_RES, 6],
			[MOB_CONF_INPUT_CONTROL_ID_MRES, 6],
			*/
			[MOB_CONF_INPUT_CONTROL_ID_BASE_EXP, 6],
			[MOB_CONF_INPUT_CONTROL_ID_JOB_EXP, 6],
			[MOB_CONF_INPUT_CONTROL_ID_SIZE, 1],
			[MOB_CONF_INPUT_CONTROL_ID_ELEMENT, 2],
			[MOB_CONF_INPUT_CONTROL_ID_RACE, 1],
			[MOB_CONF_INPUT_CONTROL_ID_BOSS, 1],
			[MOB_CONF_INPUT_CONTROL_ID_GRASS, 1],
		];

	};


	/**
	 * 設定欄テーブルを構築する（サブ　ヘッダ部分構築用）.
	 * （継承先でオーバーライドすること）
	 */
	this.BuildUpSelectAreaSubHeader = function (objTbody) {

		var objTr = null;
		var objTd = null;
		var objA = null;

		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("colspan", "2");

		HtmlCreateTextNode("攻撃対象を「■モンスター（手入力）」にしたときの、", objTd);
		HtmlCreateElement("br", objTd);
		HtmlCreateTextNode("対象のステータスを設定します。", objTd);
		HtmlCreateElement("br", objTd);
		HtmlCreateTextNode("セーブ機能には対応していないので、", objTd);
		HtmlCreateElement("br", objTd);
		HtmlCreateTextNode("下の方にあるコード出力／入力をご利用ください。", objTd);
		HtmlCreateElement("br", objTd);
		objA = HtmlCreateElement("a", objTd);
		objA.setAttribute("href", "../howtouse/howtouse_calc.html#PROC_6_2");
		objA.setAttribute("target", "_blank");
		HtmlCreateTextNode("使い方の説明はこちら", objA);
	};



	/**
	 * 設定欄テーブルを構築する（サブ　フッタ部分構築用）.
	 * （継承先でオーバーライドすること）
	 */
	this.BuildUpSelectAreaSubFooter = function (objTbody) {

		var objTr = null;
		var objTd = null;
		var objSpan = null;

		this.BuildUpSelectAreaSubFooterSubCodeControl(
			objTbody, "コード出力（選択）",
			"CMobConfInputAreaComponentManager.OnClickCodeOutSelected(" + this.instanceNo + ", \"OBJID_INPUT_MOB_CONF_CODE_OUT_SELECTED\", \"OBJID_SPAN_MOB_CONF_CODE_CONTROL_INFO\")",
			"OBJID_INPUT_MOB_CONF_CODE_OUT_SELECTED");

		this.BuildUpSelectAreaSubFooterSubCodeControl(
			objTbody, "コード出力（全部）",
			"CMobConfInputAreaComponentManager.OnClickCodeOutAll(" + this.instanceNo + ", \"OBJID_INPUT_MOB_CONF_CODE_OUT_ALL\", \"OBJID_SPAN_MOB_CONF_CODE_CONTROL_INFO\")",
			"OBJID_INPUT_MOB_CONF_CODE_OUT_ALL");

		this.BuildUpSelectAreaSubFooterSubCodeControl(
			objTbody, "コード入力",
			"CMobConfInputAreaComponentManager.OnClickCodeIn(" + this.instanceNo + ", \"OBJID_INPUT_MOB_CONF_CODE_IN\", \"OBJID_SPAN_MOB_CONF_CODE_CONTROL_INFO\")",
			"OBJID_INPUT_MOB_CONF_CODE_IN");

		// 情報欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("colspan", "2");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("id", "OBJID_SPAN_MOB_CONF_CODE_CONTROL_INFO");
		objSpan.setAttribute("style", "color : red;");

	};

	/**
	 * 設定欄テーブルを構築する（サブ　フッタ部分構築用）.
	 */
	this.BuildUpSelectAreaSubFooterSubCodeControl = function (objTbody, labelText, labelFuncName, inputId) {

		var objTr = null;
		var objTd = null;
		var objInput = null;
		var objTableSub = null;
		var objTbodySub = null;
		var objTrSub = null;
		var objTdSub = null;

		// コード出力（選択）
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objInput = HtmlCreateElement("input", objTd);
		objInput.setAttribute("type", "button");
		objInput.setAttribute("value", labelText);
		objInput.setAttribute("onclick", labelFuncName);

		objTd = HtmlCreateElement("td", objTr);
		objInput = HtmlCreateElement("input", objTd);
		objInput.setAttribute("id", inputId);
		objInput.setAttribute("type", "text");
		objInput.setAttribute("size", "32");

		HtmlCreateElement("br", objTd);

		objTableSub = HtmlCreateElement("table", objTd);
		objTableSub.setAttribute("style", "border : none; width : 100%;");
		objTbodySub = HtmlCreateElement("tbody", objTableSub);
		objTrSub = HtmlCreateElement("tr", objTbodySub);

		objTdSub = HtmlCreateElement("td", objTrSub);
		objTdSub.setAttribute("style", "text-align : center;");

		objInput = HtmlCreateElement("input", objTdSub);
		objInput.setAttribute("type", "button");
		objInput.setAttribute("value", "クリア");
		objInput.setAttribute("onclick", "CMobConfInputAreaComponentManager.ClearValueCommon(" + this.instanceNo + ", \"" + inputId + "\")");

		objTdSub = HtmlCreateElement("td", objTrSub);
		objTdSub.setAttribute("style", "text-align : center;");

		objInput = HtmlCreateElement("input", objTdSub);
		objInput.setAttribute("type", "button");
		objInput.setAttribute("value", "コピー");
		objInput.setAttribute("onclick", "CMobConfInputAreaComponentManager.CopyValueCommon(" + this.instanceNo + ", \"" + inputId + "\")");
	};



	/**
	 * 単一データをエンコードする.
	 * @param confData 設定データ
	 * @return エンコードされた文字列
	 */
	this.EncodeData = function (confData) {
		var idx = 0;
		var converted = "";
		var convertedAll = "";
		var lengthText = "";
		var confId = 0;
		var confIndex = 0;
		var mappedIndex = 0;
		// 名称変換
		converted = encodeURI(confData.GetData(MOB_CONF_INPUT_DATA_INDEX_NAME));
		lengthText = "000" + converted.length;
		lengthText = lengthText.substring(lengthText.length - 3)
		convertedAll += lengthText + converted;
		// それ以外変換
		for (idx = 0; idx < this.convertTargetIdArray.length; idx++) {
			// 設定ＩＤを取得
			confId = this.convertTargetIdArray[idx][0];
			// 設定インデックスを取得
			confIndex = this.GetSortedConfIndex(confId);
			// マッピングされたインデックスを取得
			mappedIndex = this.confDataObj[confIndex].mappedIndex;
			// マッピングされた値を取得
			value = confData.GetData(mappedIndex);
			// 変換
			converted = CSaveDataConverter.ConvertNtoS(value, this.convertTargetIdArray[idx][1]);
			// 連結
			convertedAll += converted;
		}
		return convertedAll;
	};



	/**
	 * 単一データのデコードする.
	 * @param codeInputted 入力コード
	 * @return 単一データ（CMobConfInputData クラスのインスタンス）
	 */
	this.DecodeData = function (codeInputted) {

		var inputData = null;

		var length = 0;
		var pos = 0;
		var code = "";
		var text = "";
		var value = 0;

		var confIndex = 0;
		var mappedIndex = 0;

		// 未入力の場合は処理打ち切り
		if (codeInputted.length == 0) {
			return;
		}

		// データインスタンス用意
		inputData = new CMobConfInputData();

		// 名称を切り出し
		length = parseInt(codeInputted.substring(0, 3));
		code = codeInputted.substring(3, 3 + length);
		text = decodeURI(code);
		inputData.SetData(MOB_CONF_INPUT_DATA_INDEX_NAME, text);

		// それ以外を適用
		pos = 3 + length;
		for (idx = 0; idx < this.convertTargetIdArray.length; idx++) {

			// 該当データのコードを取得
			code = codeInputted.substring(pos, pos + this.convertTargetIdArray[idx][1]);

			// 値に変換
			value = CSaveDataConverter.ConvertStoN(code);

			// 設定欄のインデックスを取得
			confIndex = this.GetSortedConfIndex(this.convertTargetIdArray[idx][0]);

			// 設定欄にマッピング登録されているデータインデックスを取得
			mappedIndex = this.confDataObj[confIndex].mappedIndex;

			// マッピングされているインデックスにデータ設定
			inputData.SetData(mappedIndex, value);

			// 読み取り位置を移動
			pos += this.convertTargetIdArray[idx][1];
		}

		return inputData;
	};



	/**
	 * コード処理情報出力.
	 * @param objClass クラスのインスタンスオブジェクト
	 */
	this.OutputCodeProcInfo = function (text, textColor) {

		var objInfo = null;
		var objSpan = null;

		objInfo = document.getElementById("OBJID_SPAN_MOB_CONF_CODE_CONTROL_INFO");
		HtmlRemoveAllChild(objInfo);

		objSpan = HtmlCreateElement("span", objInfo);
		objSpan.setAttribute("style", "font-color : " + textColor + ";");

		// 情報を設定
		HtmlCreateTextNode(text, objSpan);
	};

	/**
	 * コード出力（選択）イベントハンドラ.
	 * @param objClass クラスのインスタンスオブジェクト
	 */
	CMobConfInputAreaComponentManager.OnClickCodeOutSelected = function (instanceNo, controlId, infoId) {

		var objClass = null;

		var confData = null;
		var ecodedText = "";

		var infoText = "";
		var objInfo = null;

		// クラスインスタンスを取得
		objClass = CConfBase2.targetArray[instanceNo].objThis;

		// アクティブな設定データを取得
		confData = objClass.confMngParam.GetActiveConfData();

		// データを変換
		ecodedText = objClass.EncodeData(confData);

		// ヘッダ、フッタを追加
		ecodedText = "TenyuryokuCode" + ";" + CSaveDataConverter.ConvertNtoS(MOB_CONF_INPUT_VERSION, 2) + ";" + ecodedText + ";" + "END";

		// テキストボックスに設定
		HtmlSetObjectValueById(controlId, ecodedText);

		// 情報を設定
		objInfo = document.getElementById(infoId);
		HtmlRemoveAllChild(objInfo);
		HtmlCreateTextNode(infoText, objInfo);

		// 値変更を適用（その過程で補正関数も呼ばれる）
		objClass.ApplyValueChanged(true);
	};

	/**
	 * コード出力（全部）イベントハンドラ.
	 * @param objClass クラスのインスタンスオブジェクト
	 */
	CMobConfInputAreaComponentManager.OnClickCodeOutAll = function (instanceNo, controlId, infoId) {

		var idx = 0;

		var objClass = null;

		var confData = null;
		var ecodedText = "";

		var infoText = "";
		var objInfo = null;

		// クラスインスタンスを取得
		objClass = CConfBase2.targetArray[instanceNo].objThis;

		// 全データ変換
		for (idx = 0; idx < objClass.confMngParam.GetDataCount(); idx++) {

			// 該当の設定データを取得
			confData = objClass.confMngParam.GetConfData(idx);

			// 変換、連結
			if (ecodedText.length > 0) {
				ecodedText += ";";
			}
			ecodedText += objClass.EncodeData(confData);
		}

		// ヘッダ、フッタを追加
		ecodedText = "TenyuryokuCodeALL" + ";" + CSaveDataConverter.ConvertNtoS(MOB_CONF_INPUT_VERSION, 2) + ";" + ecodedText + ";" + "END";

		// テキストボックスに設定
		HtmlSetObjectValueById(controlId, ecodedText);

		// 情報を設定
		objInfo = document.getElementById(infoId);
		HtmlRemoveAllChild(objInfo);
		HtmlCreateTextNode(infoText, objInfo);

		// 値変更を適用（その過程で補正関数も呼ばれる）
		objClass.ApplyValueChanged(true);
	};

	/**
	 * コード入力イベントハンドラ.
	 * @param objClass クラスのインスタンスオブジェクト
	 */
	CMobConfInputAreaComponentManager.OnClickCodeIn = function (instanceNo, controlId, infoId) {

		var idx = 0;

		var objClass = null;

		var codeInputted = "";
		var codeSplitted = null;
		var decodedData = null;
		var dataNo = 0;

		var activateDataNo = 0;

		var objCtrl = null;

		// クラスインスタンスを取得
		objClass = CConfBase2.targetArray[instanceNo].objThis;

		// 入力コードを取得
		codeInputted = HtmlGetObjectValueById(controlId, "");

		// 入力コードを検査、分割
		codeSplitted = CMobConfInputAreaComponentManager.VerificateCode(objClass, codeInputted);
		if (!codeSplitted) {
			return;
		}

		// 単一データの場合
		if (codeSplitted.length == 1) {

			// No.0 には入力不可
			if (objClass.confMngParam.activeIndex == 0) {

				objClass.OutputCodeProcInfo("No.0 に、単一データのコードを入力することはできません。", "red");

				return;
			}

			// 入力コードをデコード
			decodedData = objClass.DecodeData(codeSplitted[0]);

			// アクティブな設定に上書き
			objClass.confMngParam.SetActiveConfData(decodedData);
		}

		// 全体データの場合
		else {

			// アクティブにするデータ番号の初期値
			activateDataNo = 0;

			// 全データ上書き
			for (idx = 1; idx < objClass.confMngParam.GetDataCount(); idx++) {

				// 入力データの数を超えた場合は処理打ち切り
				if (idx >= codeSplitted.length) {
					break;
				}

				// 入力コードをデコード
				decodedData = objClass.DecodeData(codeSplitted[idx]);

				// 指定の設定に上書き
				objClass.confMngParam.SetConfData(idx, decodedData);

				// アクティブにするデータ番号の補正
				if (activateDataNo == 0) {
					if (!decodedData.IsDefaultValues()) {
						activateDataNo = idx;
					}
				}
			}

			if (codeSplitted.length < objClass.confMngParam.GetDataCount()) {
				objClass.OutputCodeProcInfo("入力されたコードの設定数が少なかったため、入力された分だけ上書きしました。", "orange");
			}
			else if (codeSplitted.length > objClass.confMngParam.GetDataCount()) {
				objClass.OutputCodeProcInfo("入力されたコードの設定数が多かったため、設定可能な分だけ上書きしました。", "red");
			}

			// 選択データを変更
			controlId = objClass.GetControlIdString(objClass.instanceNo, MOB_CONF_INPUT_CONTROL_ID_LIST);
			HtmlSetObjectValueById(controlId, activateDataNo);

			// アクティブな番号を変更
			objClass.confMngParam.activeIndex = activateDataNo;
		}

		// 変数の値を元にコントロールをリフレッシュ
		objClass.RefreshControlsByVars();
	};

	/**
	 * コード入力イベントハンドラ.
	 * @param objClass クラスのインスタンスオブジェクト
	 */
	CMobConfInputAreaComponentManager.VerificateCode = function (objClass, codeInputted) {

		var codeSplitted = null;
		var indexOffset = 0;
		var judgeCodeForAll = 0;
		var version = 0;
		var verificatedArray = null;

		// 入力コードを分割
		codeSplitted = codeInputted.split(";");

		// データ検査
		if (codeSplitted.length == 0) {
			objClass.OutputCodeProcInfo("コードが入力されていません。", "red");
			return null;
		}

		indexOffset = 0;

		// 先頭データ識別子検査
		if (codeSplitted[indexOffset] == "TenyuryokuCode") {
			judgeCodeForAll = -1;
			indexOffset++;
		}
		else if (codeSplitted[indexOffset] == "TenyuryokuCodeALL") {
			judgeCodeForAll = 1;
			indexOffset++;
		}
		else {
			objClass.OutputCodeProcInfo("不適切なコードです。（先頭識別子ＮＧ）", "red");
			return null;
		}

		if (codeSplitted.length < indexOffset + 1) {
			objClass.OutputCodeProcInfo("不適切なコードです。（分割数ＮＧ）", "red");
			return null;
		}

		// バージョン検査
		version = CSaveDataConverter.ConvertStoN(codeSplitted[indexOffset]);

		if (version < 29) {
			objClass.OutputCodeProcInfo("使用できないバージョン（" + version + "）です。", "red");
			return null;
		}

		if (MOB_CONF_INPUT_VERSION < version) {
			objClass.OutputCodeProcInfo("使用できないバージョン（" + version + "）です。", "red");
			return null;
		}

		indexOffset++;

		if (codeSplitted.length < indexOffset + 2) {
			objClass.OutputCodeProcInfo("不適切なコードです。（分割数ＮＧ）", "red");
			return null;
		}

		// 終端検査
		if (codeSplitted[codeSplitted.length - 1] != "END") {
			objClass.OutputCodeProcInfo("不適切なコードです。（終端識別子ＮＧ）", "red");
			return null;
		}

		// 配列のデータ部分のみを切り抜き
		verificatedArray = codeSplitted.slice(indexOffset, -1);

		// 先頭データ識別子との不整合を検査
		if (judgeCodeForAll < 0) {
			if (verificatedArray.length != 1) {
				objClass.OutputCodeProcInfo("不適切なコードです。（先頭識別子とデータ内容不一致）", "red");
				return null;
			}
		}
		else if (judgeCodeForAll > 0) {
			if (verificatedArray.length == 1) {
				objClass.OutputCodeProcInfo("不適切なコードです。（先頭識別子とデータ内容不一致）", "red");
				return null;
			}
		}

		return verificatedArray;
	};



	/**
	 * 変数の値を元にコントロールをリフレッシュする.
	 */
	this.RefreshControlsByVars = function () {

		var controlId = null;

		// 展開状態でなければ、ヘッダのリフレッシュのみ
		// TODO: もうちょっとスマートに処理したい

		controlId = this.GetControlIdString(this.instanceNo, MOB_CONF_INPUT_CONTROL_ID_LIST);

		if (!document.getElementById(controlId)) {

			this.RefreshSelectAreaHeader();

			return;
		}

		// 変数の値をコントロール部品へ反映
		this.SyncronizeSettingsVarToCtrl();

		// 値変更を適用（その過程で補正関数も呼ばれる）
		this.ApplyValueChanged(true);
	};



	/**
	 * OnChange リスナ関数（データ選択用）.
	 * @param objClass クラスのインスタンスオブジェクト
	 * @param objInput 入力オブジェクト
	 */
	this.OnChangeList = function (objClass, objInput) {

		var controlId = "";

		var dataNo = 0;

		var objCtrl = null;



		// 選択番号を取得
		controlId = objClass.GetControlIdString(objClass.instanceNo, MOB_CONF_INPUT_CONTROL_ID_LIST);
		dataNo = HtmlGetObjectValueByIdAsInteger(controlId, 0);

		// アクティブな配列番号に設定
		objClass.confMngParam.activeIndex = dataNo;

		// 変数の値をコントロール部品へ反映
		objClass.SyncronizeSettingsVarToCtrl();

		// 値変更を適用（その過程で補正関数も呼ばれる）
		objClass.ApplyValueChanged(true);
	};



	/**
	 * 入力補正関数（入力保護用）.
	 * @param objClass クラスのインスタンスオブジェクト
	 * @param objInput 入力オブジェクト
	 */
	this.InputModifyProtect = function (objClass, objInput) {

		var bProtect = false;

		if (objInput.checked) {
			bProtect = true;
		}

		// 名称
		objClass.ProtectControl(MOB_CONF_INPUT_CONTROL_ID_NAME, bProtect);

		// 名称以外
		for (idx = 0; idx < objClass.convertTargetIdArray.length; idx++) {

			// 入力保護は除外
			if (objClass.convertTargetIdArray[idx][0] == MOB_CONF_INPUT_CONTROL_ID_PROTECT) {
				continue;
			}

			objClass.ProtectControl(objClass.convertTargetIdArray[idx][0], bProtect);
		}
	};

	/**
	 * コントロール部品の保護を設定する.
	 * @param objInput 入力オブジェクト
	 */
	this.ProtectControl = function (objId, bProtect) {

		var controlId = "";

		var objCtrl = null;

		controlId = this.GetControlIdString(this.instanceNo, objId);

		objCtrl = document.getElementById(controlId);
		this.ProtectControlSub(objCtrl, bProtect);
	};

	/**
	 * コントロール部品の保護を設定する（サブ関数）.
	 * @param objInput 入力オブジェクト
	 */
	this.ProtectControlSub = function (objCtrl, bProtect) {

		if (!objCtrl) {
			return;
		}

		if (bProtect) {
			objCtrl.setAttribute("disabled", true);
		}
		else {
			objCtrl.removeAttribute("disabled");
		}
	};



	/**
	 * 共通クリア関数.
	 * @param objId オブジェクトＩＤ
	 */
	CMobConfInputAreaComponentManager.ClearValueCommon = function (instanceNo, controlId) {
		HtmlSetObjectValueById(controlId, "");
	};

	/**
	 * 共通コピー関数.
	 * @param objId オブジェクトＩＤ
	 */
	CMobConfInputAreaComponentManager.CopyValueCommon = function (instanceNo, controlId) {
		HtmlCopyToClipboardById(controlId);
	};



	/**
	 * 設定欄の状態を同期させる（変数の値をコントロール部品へ反映）.
	 * @remark オーバーライド
	 */
	this.SyncronizeSettingsVarToCtrl = function () {

		var controlId = "";
		var objCtrl = null;

		// 基底クラスの処理を実行
		CMobConfInputAreaComponentManager.prototype.SyncronizeSettingsVarToCtrl.call(this);

		// データ選択は個別処理
		controlId = this.GetControlIdString(this.instanceNo, MOB_CONF_INPUT_CONTROL_ID_LIST);
		HtmlSetObjectValueById(controlId, this.confMngParam.activeIndex);

		// No.0 は編集不可
		controlId = this.GetControlIdString(this.instanceNo, MOB_CONF_INPUT_CONTROL_ID_PROTECT);
		objCtrl = document.getElementById(controlId);

		if (this.confMngParam.activeIndex == 0) {
			objCtrl.checked = "checked";
			objCtrl.setAttribute("disabled", true);
		}
		else {
			objCtrl.removeAttribute("disabled");
		}

		this.InputModifyProtect(this, objCtrl);

		// データ選択セレクトボックスをリフレッシュする
		this.RefreshSelectOptions();

	};



	/**
	 * 設定欄の状態を同期させる（コントロール部品の状態を変数へ反映）.
	 * @remark オーバーライド
	 */
	this.SyncronizeSettingsCtrlToVar = function () {

		// 基底クラスの処理を実行
		CMobConfInputAreaComponentManager.prototype.SyncronizeSettingsCtrlToVar.call(this);

		// データ選択セレクトボックスをリフレッシュする
		this.RefreshSelectOptions();
	};



	/**
	 * データ選択セレクトボックスをリフレッシュする.
	 */
	this.RefreshSelectOptions = function () {

		var idx = 0;

		var confData = 0;

		var controlId = "";
		var objSelect = null;
		var selectedValue = 0;

		var dataNo = 0;
		var dataLabel = "";

		// データ選択セレクトボックスを取得
		controlId = this.GetControlIdString(this.instanceNo, MOB_CONF_INPUT_CONTROL_ID_LIST);
		objSelect = document.getElementById(controlId);
		selectedValue = objSelect.value;

		// 自動設定以外の表示名を更新
		for (idx = 1; idx < objSelect.options.length; idx++) {

			// 選択肢からデータ番号を取得
			dataNo = parseInt(objSelect.options[idx].value);

			// 対応する設定データを取得
			confData = this.confMngParam.GetConfData(dataNo);

			// 名称を生成する
			dataLabel = "No." + dataNo + " : ";
			if (confData.IsDefaultValues()) {
				dataLabel += "（未登録）";
			}
			else {
				dataLabel += confData.GetData(MOB_CONF_INPUT_DATA_INDEX_NAME);
			}

			// 名称を設定
			objSelect.options[idx] = HtmlCreateElementOption(dataNo, dataLabel, null);
		}

		objSelect.value = selectedValue;
	};


	// 初期化実行
	this.InitData();



}






/**
 * 入力補正関数（コード入出力用共通）.
 * @param objClass クラスのインスタンスオブジェクト
 * @param objInput 入力オブジェクト
 */
CMobConfInputAreaComponentManager.InputModifyCodeInOutCommon = function (objClass, objInput) {
	// 処理不要
};
