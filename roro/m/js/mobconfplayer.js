

// 対プレイヤー設定の限界値
// この数を超える場合は、セーブデータの拡張が必要
MOB_CONF_PLAYER_LIMIT = 54;





// 初期化作業
n_B_TAISEI = new Array();

MobConfPlayerOBJ = new Array();

InitMobConfPlayerData();





//================================================================
// 対プレイヤーデータ定義用ダミー関数
// （可読性を高める目的で使用する）
//================================================================
function MobConfPlayerText(value) { return value; };
function MobConfPlayerControlType(value) { return value; };
function MobConfPlayerDefaultValue(value) { return value; };
function MobConfPlayerMinValue(value) { return value; };
function MobConfPlayerMaxValue(value) { return value; };





//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** 対プレイヤーデータ定義
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

/**
 * 対プレイヤーデータを初期化（セットアップ）する.
 */
function InitMobConfPlayerData() {

	var idx = 0;

	var MobConfPlayerId = 0;
	var MobConfPlayerData = new Array();
	var MobConfPlayerOBJSorted = new Array();

	var indexdefiner = 0;



	//----------------------------------------------------------------
	// データインデックス定義
	//----------------------------------------------------------------
	MOB_CONF_PLAYER_DATA_INDEX_ID = indexdefiner++;
	MOB_CONF_PLAYER_DATA_INDEX_TEXT = indexdefiner++;
	MOB_CONF_PLAYER_DATA_INDEX_CONTROL_TYPE = indexdefiner++;
	MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE = indexdefiner++;
	MOB_CONF_PLAYER_DATA_INDEX_MIN_VALUE = indexdefiner++;
	MOB_CONF_PLAYER_DATA_INDEX_MAX_VALUE = indexdefiner++;



	//----------------------------------------------------------------
	// データ定義　ここから
	//----------------------------------------------------------------
	MOB_CONF_PLAYER_ID_MAXHP = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("MaxHP"),
		MobConfPlayerControlType(CONTROL_TYPE_TEXTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(4000000)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_DEF_DIV = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("DEF(除算)"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(1500)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_DEF_MINUS = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("DEF(減算)"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(999)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_MDEF_DIV = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("MDEF(除算)"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(500)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_MDEF_MINUS = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("MDEF(減算)"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(999)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_FLEE = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("FLEE"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(999)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_LUCKY = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("完全回避"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(100)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_ZOKUSEI = MobConfPlayerId;	// 7
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("属性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(9)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_NINGEN_KEI_TAISEI = MobConfPlayerId;	// 8
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("人間形耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(100)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_CHUGATA_TAISEI = MobConfPlayerId;	// 9
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("中型耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(100)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_ENKYORI_BUTSURI_TAISEI = MobConfPlayerId;	// 10
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("遠距離物理耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(100)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_MU_ZOKUSEI_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("無属性耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-200),
		MobConfPlayerMaxValue(200)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_MIZU_ZOKUSEI_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("水属性耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-200),
		MobConfPlayerMaxValue(200)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_CHI_ZOKUSEI_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("地属性耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-200),
		MobConfPlayerMaxValue(200)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_HI_ZOKUSEI_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("火属性耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-200),
		MobConfPlayerMaxValue(200)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_KAZE_ZOKUSEI_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("風属性耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-200),
		MobConfPlayerMaxValue(200)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_DOKU_ZOKUSEI_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("毒属性耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-200),
		MobConfPlayerMaxValue(200)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_SEI_ZOKUSEI_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("聖属性耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-200),
		MobConfPlayerMaxValue(200)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_YAMI_ZOKUSEI_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("闇属性耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-200),
		MobConfPlayerMaxValue(200)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_NEN_ZOKUSEI_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("念属性耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-200),
		MobConfPlayerMaxValue(200)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_FUSHI_ZOKUSEI_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("不死属性耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-200),
		MobConfPlayerMaxValue(200)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_IPPAN_MONSTER_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("一般モンスター耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(100)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_ZOKUSEI_MONSTER_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("属性モンスター耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(100)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_BUTSURI_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("物理耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(100)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_MAHOU_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("(×)魔法耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(100)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_DORAM_KEI_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("ドラム形耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(100)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_ENERGY_COAT = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("(△)エナジーコート"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(5)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_HANSHA_1 = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("(×)反射1"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(100)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_HANSHA_2 = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("(×)反射2"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(100)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_BASE_LV = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("BaseLv"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(250)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_STR = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("(×)STR"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(500)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_AGI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("(×)AGI"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(500)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_VIT = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("VIT"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(500)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_INT = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("(×)INT"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(500)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_DEX = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("(×)DEX"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(500)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_LUK = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("(×)LUK"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(500)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_SHOZIZYURYO_GENZAI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("(△)所持重量(現在)"),
		MobConfPlayerControlType(CONTROL_TYPE_TEXTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(15000)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_SHOZIZYURYO_SAIDAI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("(×)所持重量(最大)"),
		MobConfPlayerControlType(CONTROL_TYPE_TEXTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(15000)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_SENTO_AREA_NONE = 0;
	MOB_CONF_PLAYER_ID_SENTO_AREA_GVG = 1;
	MOB_CONF_PLAYER_ID_SENTO_AREA_PVP = 2;
	MOB_CONF_PLAYER_ID_SENTO_AREA_URDR = 3;
	MOB_CONF_PLAYER_ID_SENTO_AREA_YE = 4;
	MOB_CONF_PLAYER_ID_SENTO_AREA_MH = 5;
	MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE = 6;
	MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE = 7;
	MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM = 8;
	MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO = 9;



	MOB_CONF_PLAYER_ID_SENTO_AREA = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("戦闘エリア"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(5)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_KOGATA_TAISEI = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("小型耐性"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(-100),
		MobConfPlayerMaxValue(100)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN = 0;
	MOB_CONF_PLAYER_ID_SHUZOKU_DORAM = 1;

	MOB_CONF_PLAYER_ID_SHUZOKU = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("種族"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(1)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_RES = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("RES"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(500)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	MOB_CONF_PLAYER_ID_MRES = MobConfPlayerId;
	MobConfPlayerData = [
		MobConfPlayerId,
		MobConfPlayerText("MRES"),
		MobConfPlayerControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfPlayerDefaultValue(0),
		MobConfPlayerMinValue(0),
		MobConfPlayerMaxValue(500)
	];
	MobConfPlayerOBJ[MobConfPlayerId] = MobConfPlayerData;
	MobConfPlayerId++;



	//----------------------------------------------------------------
	// データ定義数チェック
	//----------------------------------------------------------------
	if (MOB_CONF_PLAYER_LIMIT < MobConfPlayerOBJ.length) {
		alert("対プレイヤー設定　定義数超過");
	}



	//----------------------------------------------------------------
	// 対プレイヤー設定変数配列を初期化
	//----------------------------------------------------------------
	for (idx = 0; idx < MOB_CONF_PLAYER_LIMIT; idx++) {
		if (idx < MobConfPlayerOBJ.length) {
			n_B_TAISEI[idx] = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE];
		}
		else {
			n_B_TAISEI[idx] = 0;
		}
	}



	//----------------------------------------------------------------
	// 表示順序に従い、対プレイヤー設定データ定義を再配列
	//----------------------------------------------------------------
	MobConfPlayerOBJSorted = new Array();
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_SENTO_AREA];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_SHUZOKU];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_BASE_LV];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_MAXHP];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_STR];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_AGI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_VIT];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_INT];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_DEX];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_LUK];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_DEF_DIV];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_DEF_MINUS];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_MDEF_DIV];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_MDEF_MINUS];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_RES];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_MRES];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_FLEE];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_LUCKY];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_ZOKUSEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_NINGEN_KEI_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_DORAM_KEI_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_CHUGATA_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_KOGATA_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_ENKYORI_BUTSURI_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_MU_ZOKUSEI_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_MIZU_ZOKUSEI_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_CHI_ZOKUSEI_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_HI_ZOKUSEI_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_KAZE_ZOKUSEI_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_DOKU_ZOKUSEI_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_SEI_ZOKUSEI_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_YAMI_ZOKUSEI_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_NEN_ZOKUSEI_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_FUSHI_ZOKUSEI_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_IPPAN_MONSTER_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_ZOKUSEI_MONSTER_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_BUTSURI_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_MAHOU_TAISEI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_ENERGY_COAT];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_HANSHA_1];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_HANSHA_2];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_SHOZIZYURYO_GENZAI];
	MobConfPlayerOBJSorted[MobConfPlayerOBJSorted.length] = MobConfPlayerOBJ[MOB_CONF_PLAYER_ID_SHOZIZYURYO_SAIDAI];
	MobConfPlayerOBJ = MobConfPlayerOBJSorted;

}





/**
 * 対プレイヤー設定テーブルを構築する.
 * @param objRoot テーブルの親オブジェクト
 * @param bAsExpand 展開表示フラグ（true : 展開表示、false : ヘッダのみ）
 */
function BuildUpMobConfPlayerSelectArea(objRoot, bAsExpand) {

	var idx = 0;
	var confId = 0;
	var confText = "";
	var textArray = null;

	var controlType = 0;
	var controlValue = 0;
	var controlValueMin = 0;
	var controlValueMax = 0;

	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objText = null;
	var objInput = null;
	var objSelect = null;
	var objOption = null;
	var objLabel = null;



	// 引数のルートオブジェクト配下を一度全削除
	HtmlRemoveAllChild(objRoot);


	// 設定欄のテーブルを生成
	objTable = document.createElement("table");
	objTable.setAttribute("border", 1);
	objRoot.appendChild(objTable);

	objTbody = document.createElement("tbody");
	objTable.appendChild(objTbody);



	// 設定欄テーブルのヘッダ部分を生成
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTd.setAttribute("id", "OBJID_TD_MOB_CONF_PLAYER_HEADER");
	objTd.setAttribute("colspan", 2);
	objTd.setAttribute("bgcolor", COLOR_CODE_TABLE_HEADER_IS_NOT_SET);
	objTr.appendChild(objTd);

	objInput = document.createElement("input");
	objInput.setAttribute("id", "OBJID_INPUT_MOB_CONF_PLAYER_SWITCH");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("onClick", "OnClickMobConfPlayerSwitch()");
	if (bAsExpand) {
		objInput.setAttribute("checked", "checked");
	}
	objTd.appendChild(objInput);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_INPUT_MOB_CONF_PLAYER_SWITCH");
	HtmlCreateTextNode("対プレイヤー設定", objLabel);



	// 展開表示でなければ、ヘッダだけ更新して終了
	if (!bAsExpand) {
		// ヘッダ更新
		RefreshMobConfPlayerSelectAreaHeader();

		return;
	}



	// 対プレイヤー設定定義をループして、設定欄を構築する
	for (idx = 0; idx < MobConfPlayerOBJ.length; idx++) {

		// 対プレイヤー設定ＩＤを取得
		confId = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_ID];



		// 設定欄用のテーブル行を生成
		objTr = document.createElement("tr");
		objTbody.appendChild(objTr);



		// 表示名の欄を生成
		objTd = document.createElement("td");
		objTr.appendChild(objTd);

		confText = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_TEXT];
		objText = document.createTextNode(confText);
		objTd.appendChild(objText);



		// 設定値の欄を生成
		objTd = document.createElement("td");
		objTr.appendChild(objTd);

		controlType = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_CONTROL_TYPE];



		// 設定方法が数値選択方式の場合
		switch (controlType) {
		case CONTROL_TYPE_SELECTBOX_NUMBER:

			// 選択セレクトボックスを生成
			objSelect = document.createElement("select");
			objSelect.setAttribute("id", "OBJID_SELECT_MOB_CONF_PLAYER_" + confId);
			objSelect.setAttribute("onChange", "OnChangeMobConfPlayer(true)");
			objTd.appendChild(objSelect);

			// 範囲定義に従い、セレクトオプションを生成
			controlValueMin = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_MIN_VALUE];
			controlValueMax = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_MAX_VALUE];
			for (controlValue = controlValueMin; controlValue <= controlValueMax; controlValue++) {
				objOption = HtmlCreateElementOption(controlValue, controlValue, objSelect);
			}

			// 初期値設定
			objSelect.setAttribute("value", MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE]);

			break;



		// 設定方法がチェック方式の場合
		case CONTROL_TYPE_CHECKBOX:

			// チェックボックスを生成
			objInput = document.createElement("input");
			objInput.setAttribute("id", "OBJID_INPUT_MOB_CONF_PLAYER_" + confId);
			objInput.setAttribute("type", "checkbox");
			objInput.setAttribute("onChange", "OnChangeMobConfPlayer(true)");
			objTd.appendChild(objInput);

			// 初期値設定
			if (MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE] == 1) {
				objInput.setAttribute("checked", "checked");
			}

			break;



		// 設定方法が数値入力方式の場合
		case CONTROL_TYPE_TEXTBOX_NUMBER:

			// 予備(未使用)入力テキストボックスを生成
			objInput = document.createElement("input");
			objInput.setAttribute("type", "text");
			objInput.setAttribute("id", "OBJID_INPUT_MOB_CONF_PLAYER_" + confId);
			objInput.setAttribute("size", "6");
			objInput.setAttribute("onChange", "OnChangeMobConfPlayer(true)");
			objTd.appendChild(objInput);

			// 初期値設定
			objInput.setAttribute("value", MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE]);

			break;



		// 設定方法が特殊方式の場合
		case CONTROL_TYPE_SELECTBOX_SPECIAL:
		case CONTROL_TYPE_CHECKBOX_SPECIAL:
		case CONTROL_TYPE_TEXTBOX_SPECIAL:
		case CONTROL_TYPE_SPECIAL:

			// 個別に実装する
			switch (confId) {

			// 属性
			case MOB_CONF_PLAYER_ID_ZOKUSEI:

				// 属性選択セレクトボックスを生成
				objSelect = document.createElement("select");
				objSelect.setAttribute("id", "OBJID_SELECT_MOB_CONF_PLAYER_" + confId);
				objSelect.setAttribute("onChange", "OnChangeMobConfPlayer(true)");
				objTd.appendChild(objSelect);

				objOption = HtmlCreateElementOption(0, "無1", objSelect);
				objOption = HtmlCreateElementOption(1, "水1", objSelect);
				objOption = HtmlCreateElementOption(2, "地1", objSelect);
				objOption = HtmlCreateElementOption(3, "火1", objSelect);
				objOption = HtmlCreateElementOption(4, "風1", objSelect);
				objOption = HtmlCreateElementOption(5, "毒1", objSelect);
				objOption = HtmlCreateElementOption(6, "聖1", objSelect);
				objOption = HtmlCreateElementOption(7, "闇1", objSelect);
				objOption = HtmlCreateElementOption(8, "念1", objSelect);
				objOption = HtmlCreateElementOption(9, "不死1", objSelect);

				// 初期値設定
				objSelect.setAttribute("value", MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE]);

				break;

			// エナジーコート
			case MOB_CONF_PLAYER_ID_ENERGY_COAT:

				// 効果量選択セレクトボックスを生成
				objSelect = document.createElement("select");
				objSelect.setAttribute("id", "OBJID_SELECT_MOB_CONF_PLAYER_" + confId);
				objSelect.setAttribute("onChange", "OnChangeMobConfPlayer(true)");
				objTd.appendChild(objSelect);

				objOption = HtmlCreateElementOption(0, "なし", objSelect);
				objOption = HtmlCreateElementOption(1, "6%", objSelect);
				objOption = HtmlCreateElementOption(2, "12%", objSelect);
				objOption = HtmlCreateElementOption(3, "18%", objSelect);
				objOption = HtmlCreateElementOption(4, "24%", objSelect);
				objOption = HtmlCreateElementOption(5, "30%", objSelect);

				// 初期値設定
				objSelect.setAttribute("value", MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE]);

				break;

			// 戦闘エリア
			case MOB_CONF_PLAYER_ID_SENTO_AREA:

				// 戦闘エリア選択セレクトボックスを生成
				objSelect = document.createElement("select");
				objSelect.setAttribute("id", "OBJID_SELECT_MOB_CONF_PLAYER_" + confId);
				objSelect.setAttribute("onChange", "OnChangeMobConfPlayer(true)");
				objTd.appendChild(objSelect);

				objOption = HtmlCreateElementOption(MOB_CONF_PLAYER_ID_SENTO_AREA_NONE, "-", objSelect);
				objOption = HtmlCreateElementOption(MOB_CONF_PLAYER_ID_SENTO_AREA_YE, "(YE)攻城戦", objSelect);
				objOption = HtmlCreateElementOption(MOB_CONF_PLAYER_ID_SENTO_AREA_YE_GVG_TE, "(YE)模擬戦", objSelect);
				objOption = HtmlCreateElementOption(MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, "(YE)コロッセオ", objSelect);
				objOption = HtmlCreateElementOption(MOB_CONF_PLAYER_ID_SENTO_AREA_GVG, "攻城戦", objSelect);
				objOption = HtmlCreateElementOption(MOB_CONF_PLAYER_ID_SENTO_AREA_GVG_TE, "攻城戦TE", objSelect);
				objOption = HtmlCreateElementOption(MOB_CONF_PLAYER_ID_SENTO_AREA_PVP, "PvP", objSelect);
				objOption = HtmlCreateElementOption(MOB_CONF_PLAYER_ID_SENTO_AREA_MH, "MH", objSelect);
				objOption = HtmlCreateElementOption(MOB_CONF_PLAYER_ID_SENTO_AREA_YE_SHINKIRO, "(YE)蜃気楼の塔", objSelect);
				objOption = HtmlCreateElementOption(MOB_CONF_PLAYER_ID_SENTO_AREA_URDR, "(削除予定)ウルド", objSelect);

				// 初期値設定
				objSelect.setAttribute("value", MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE]);

				break;

			// 種族
			case MOB_CONF_PLAYER_ID_SHUZOKU:

				// 種族選択セレクトボックスを生成
				objSelect = document.createElement("select");
				objSelect.setAttribute("id", "OBJID_SELECT_MOB_CONF_PLAYER_" + confId);
				objSelect.setAttribute("onChange", "OnChangeMobConfPlayer(true)");
				objTd.appendChild(objSelect);

				objOption = HtmlCreateElementOption(MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN, "人間", objSelect);
				objOption = HtmlCreateElementOption(MOB_CONF_PLAYER_ID_SHUZOKU_DORAM, "ドラム", objSelect);

				// 初期値設定
				objSelect.setAttribute("value", MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE]);

				break;

			}
		}

	}



	// 変数の値をもとに、設定欄の各コントロールを同期
	SyncronizeMobConfPlayerSettingsVarToCtrl();

	// ヘッダ更新
	RefreshMobConfPlayerSelectAreaHeader();
}





/**
 * 対プレイヤー設定欄の状態を同期させる（変数の値をコントロール部品へ反映）.
 */
function SyncronizeMobConfPlayerSettingsVarToCtrl() {

	var idx = 0;
	var confId = 0;

	var controlType = 0;

	var objSelect = null;
	var objInput = null;



	// 対プレイヤー設定定義をループして、設定欄の状態を同期
	for (idx = 0; idx < MobConfPlayerOBJ.length; idx++) {

		confId = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_ID];
		controlType = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_CONTROL_TYPE];



		switch (controlType) {

		// 設定方法が数値選択方式の場合
		case CONTROL_TYPE_SELECTBOX_NUMBER:
		case CONTROL_TYPE_SELECTBOX_SPECIAL:

			objSelect = document.getElementById("OBJID_SELECT_MOB_CONF_PLAYER_" + confId);
			objSelect.value = n_B_TAISEI[confId];

			break;



		// 設定方法がチェック方式の場合
		case CONTROL_TYPE_CHECKBOX:
		case CONTROL_TYPE_CHECKBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_PLAYER_" + confId);

			if (n_B_TAISEI[confId]) {
				objInput.setAttribute("checked", "checked");
			}
			else {
				objInput.removeAttribute("checked");
			}

			break;



		// 設定方法が数値入力方式の場合
		case CONTROL_TYPE_TEXTBOX_NUMBER:
		case CONTROL_TYPE_TEXTBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_PLAYER_" + confId);
			objInput.value = n_B_TAISEI[confId];

			break;



		// 設定方法が特殊方式の場合
		case CONTROL_TYPE_SPECIAL:

			// 個別に実装する
			switch (confId) {

			}
		}
	}
}





/**
 * 対プレイヤー設定欄の状態を同期させる（コントロール部品の状態を変数へ反映）.
 */
function SyncronizeMobConfPlayerSettingsCtrlToVar() {

	var idx = 0;
	var confId = 0;

	var controlType = 0;
	var controlValue = 0;
	var controlValueMin = 0;
	var controlValueMax = 0;

	var objSelect = null;
	var objInput = null;



	// 対プレイヤー設定定義をループして、設定欄の状態をもとに変数を同期
	for (idx = 0; idx < MobConfPlayerOBJ.length; idx++) {

		confId = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_ID];
		controlType = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_CONTROL_TYPE];



		switch (controlType) {

		// 設定方法が数値選択方式の場合
		case CONTROL_TYPE_SELECTBOX_NUMBER:
		case CONTROL_TYPE_SELECTBOX_SPECIAL:

			objSelect = document.getElementById("OBJID_SELECT_MOB_CONF_PLAYER_" + confId);
			n_B_TAISEI[confId] = parseInt(objSelect.value);

			break;



		// 設定方法がチェック方式の場合
		case CONTROL_TYPE_CHECKBOX:
		case CONTROL_TYPE_CHECKBOX_SPECIAL:

			n_B_TAISEI[confId] = HtmlGetObjectCheckedById("OBJID_INPUT_MOB_CONF_PLAYER_" + confId, false);

			break;



		// 設定方法が数値入力方式の場合
		case CONTROL_TYPE_TEXTBOX_NUMBER:
		case CONTROL_TYPE_TEXTBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_PLAYER_" + confId);
			n_B_TAISEI[confId] = parseInt(objInput.value);

			// 範囲外補正
			controlValueMin = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_MIN_VALUE];
			controlValueMax = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_MAX_VALUE];
			n_B_TAISEI[confId] = ValueRangeModify(n_B_TAISEI[confId], controlValueMin, controlValueMax);
			objInput.value = n_B_TAISEI[confId];

			break;



		// 設定方法が特殊方式の場合
		case CONTROL_TYPE_SPECIAL:

			// 個別に実装する
			switch (confId) {

			}
		}
	}
}





/**
 * 対プレイヤー設定欄の展開スイッチクリックイベントハンドラ.
 */
function OnClickMobConfPlayerSwitch() {

	var bExpand = false;
	var objInput = null;

	// 展開スイッチの状態を取得
	bExpand = HtmlGetObjectCheckedById("OBJID_INPUT_MOB_CONF_PLAYER_SWITCH", false);

	// 構築関数呼び出し
	BuildUpMobConfPlayerSelectArea(document.getElementById("OBJID_TD_MOB_CONF_PLAYER"), bExpand);

	// コントロールのCSSを更新する
	if (bExpand) {
		RefreshMobConfPlayerControlCSS();
	}
}





/**
 * 対プレイヤー設定欄の設定値変更イベントハンドラ.
 * @param bCalc 再計算フラグ（true : 再計算する、false : 再計算しない）
 */
function OnChangeMobConfPlayer(bCalc) {

	// 設定の変更を変数に同期させる
	SyncronizeMobConfPlayerSettingsCtrlToVar();

	// ヘッダの表示を更新する
	RefreshMobConfPlayerSelectAreaHeader();

	// コントロールのCSSを更新する
	RefreshMobConfPlayerControlCSS();

	// 再計算フラグが立っている場合は、再計算を実行
	if (bCalc) {
		AutoCalc("OnChangeMobConfPlayer");
	}
}





/**
 * 対プレイヤー設定テーブルのヘッダをリフレッシュする.
 */
function RefreshMobConfPlayerSelectAreaHeader() {

	var bSet = false;
	var bChecked = false;

	var idx = 0;
	var confId = 0;

	var objSelect = null;
	var objTd = null;



	// 対プレイヤー設定定義をループして、設定欄の状態を検査
	for (idx = 0; idx < MobConfPlayerOBJ.length; idx++) {

		confId = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_ID];

		if (n_B_TAISEI[confId] != MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE]) {
			bSet = true;
			break;
		}
	}



	// 設定状況に応じて、ヘッダ部分の表示を更新
	objTd = document.getElementById("OBJID_TD_MOB_CONF_PLAYER_HEADER");
	if (bSet) {
		objTd.setAttribute("bgcolor", COLOR_CODE_TABLE_HEADER_IS_SET);
	}
	else {
		objTd.setAttribute("bgcolor", COLOR_CODE_TABLE_HEADER_IS_NOT_SET);
	}
}





/**
 * 対プレイヤー設定欄の選択状態により、コントロールのCSSを変更する.
 */
function RefreshMobConfPlayerControlCSS() {

	var idx = 0;
	var confId = 0;

	var controlType = 0;

	var objSelect = null;
	var objInput = null;



	// 対プレイヤー設定定義をループして、設定欄の状態をもとに変数を同期
	for (idx = 0; idx < MobConfPlayerOBJ.length; idx++) {

		confId = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_ID];
		controlType = MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_CONTROL_TYPE];



		switch (controlType) {

		// 設定方法が数値選択方式の場合
		case CONTROL_TYPE_SELECTBOX_NUMBER:
		case CONTROL_TYPE_SELECTBOX_SPECIAL:

			objSelect = document.getElementById("OBJID_SELECT_MOB_CONF_PLAYER_" + confId);
			if (!objSelect) {
				continue;
			}

			if (objSelect.value != MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE]) {
				objSelect.setAttribute("class", "CSSCLS_SELECTED_MOB_CONF_PLAYER");
			}
			else {
				objSelect.setAttribute("class", "");
			}

			break;



		// 設定方法がチェック方式の場合
		case CONTROL_TYPE_CHECKBOX:
		case CONTROL_TYPE_CHECKBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_PLAYER_" + confId);
			if (!objInput) {
				continue;
			}

			if ((objInput.checked) && (MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE] != 1)) {
				objInput.setAttribute("class", "CSSCLS_CHECKED_MOB_CONF_PLAYER");
			}
			if ((!objInput.checked) && (MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE] != 0)) {
				objInput.setAttribute("class", "CSSCLS_CHECKED_MOB_CONF_PLAYER");
			}
			else {
				objInput.setAttribute("class", "");
			}

			break;



		// 設定方法が数値入力方式の場合
		case CONTROL_TYPE_TEXTBOX_NUMBER:
		case CONTROL_TYPE_TEXTBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_PLAYER_" + confId);
			if (!objInput) {
				continue;
			}

			if (objInput.value != MobConfPlayerOBJ[idx][MOB_CONF_PLAYER_DATA_INDEX_DEFAULT_VALUE]) {
				objInput.setAttribute("class", "CSSCLS_INPUTTED_MOB_CONF_PLAYER");
			}
			else {
				objInput.setAttribute("class", "");
			}

			break;



		// 設定方法が特殊方式の場合
		case CONTROL_TYPE_SPECIAL:

			// 個別に実装する
			switch (confId) {

			}
		}
	}
}
