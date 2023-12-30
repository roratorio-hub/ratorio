
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * 衣装データ作成クラス.
 */
function CCostumeDataMaker () {

}

//================================================================
// 衣装データ定義用ダミー関数
// （可読性を高める目的で使用する）
//================================================================
CCostumeDataMaker.CostumeKind = function (value) { return value; };
CCostumeDataMaker.CostumeEquipFlag = function (value) { return value; };
CCostumeDataMaker.CostumePower = function (value) { return value; };
CCostumeDataMaker.CostumeWeaponLevel = function (value) { return value; };
CCostumeDataMaker.CostumeSlot = function (valuehigh, valuelow) { return valuehigh * 10 + valuelow; };
CCostumeDataMaker.CostumeWeight = function (value) { return value; };
CCostumeDataMaker.CostumeEquipLevel = function (value) { return value; };
CCostumeDataMaker.CostumeName = function (value) { return value; };
CCostumeDataMaker.CostumeKana = function (value) { return value; };
CCostumeDataMaker.CostumeDetailText = function (value) { return value; };



/**
 * IDを定義する.
 * @param name 定数名
 * @param value 定数値
 * @return 定数値
 */
CCostumeDataMaker.RegisterId = function (name, value) {
	if (name != "COSTUME_ID_UNKNOWN") {
		CGlobalConstManager.DefineEnum("EnumCostumeId", [name], value, undefined);
	}
	return value;
};





//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** 衣装データ定義
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

/**
 * データ定義を上書き定義する.
 */
CCostumeDataMaker.OverrideData = function () {

	var costumeId = 0;
	var costumeData = null;

	// データ配列オブジェクトを上書き定義していく
	CostumeOBJ = new Array();



	CCostumeDataMaker.RegisterId("COSTUME_ID_HEAD_UNDER_NONE", costumeId);
	costumeData = [
		costumeId,
		CCostumeDataMaker.CostumeKind(COSTUME_KIND_HEAD_UNDER),
		CCostumeDataMaker.CostumeEquipFlag(ITEM_EQPFLG_NONE),
		CCostumeDataMaker.CostumePower(0),
		CCostumeDataMaker.CostumeWeaponLevel(0),
		CCostumeDataMaker.CostumeSlot(0, 0),
		CCostumeDataMaker.CostumeWeight(0),
		CCostumeDataMaker.CostumeEquipLevel(1),
		CCostumeDataMaker.CostumeName("(衣装なし)"),
		CCostumeDataMaker.CostumeKana("ア"),
		CCostumeDataMaker.CostumeDetailText(""),
		ITEM_SP_END
	];
	CostumeOBJ[costumeId] = costumeData;
	costumeId++;



	CCostumeDataMaker.RegisterId("COSTUME_ID_BEGINNER_BO", costumeId);
	costumeData = [
		costumeId,
		CCostumeDataMaker.CostumeKind(COSTUME_KIND_HEAD_UNDER),
		CCostumeDataMaker.CostumeEquipFlag(ITEM_EQPFLG_TYPE_BEGINNER),
		CCostumeDataMaker.CostumePower(0),
		CCostumeDataMaker.CostumeWeaponLevel(0),
		CCostumeDataMaker.CostumeSlot(0, 0),
		CCostumeDataMaker.CostumeWeight(0),
		CCostumeDataMaker.CostumeEquipLevel(1),
		CCostumeDataMaker.CostumeName("[衣装]ビギナー帽"),
		CCostumeDataMaker.CostumeKana("ヒキナアホウ"),
		CCostumeDataMaker.CostumeDetailText("[初心者用ポーション]使用時、HP回復量 + 50%<BR>[応急手当]使用時、冒険者アカデミーに移動することができる<BR>BaseLvが10上がる度に追加でヒール系スキルを受けた時のHP回復量 + 10%、一部の回復アイテムによるHP回復量 + 10%<BR>Hit -3 , 詠唱時間 + 1%<BR>MaxHP - 100 , MaxSP - 20<BR>ヒール系スキル使用時、HP回復量 - 10%<BR>BaseLv99以上の時、上記特殊効果が発動しない<BR>[[衣装]ビギナー帽]の効果は、攻城戦・新攻城戦・攻城戦TEの砦内では発揮されず、解除されます。"),
		ITEM_SP_HIT_PLUS, 30,
		ITEM_SP_MAXHP_PLUS, 1000,
		ITEM_SP_MAXSP_PLUS, 200,
		ITEM_SP_SKILL_CAST_TIME, -10,
		ITEM_SP_HEAL_UP_USING, 150,
		ITEM_SP_END
	];
	CostumeOBJ[costumeId] = costumeData;
	costumeId++;



};



// データ上書き
if (_DATA_CREATE_MODE) {
	CCostumeDataMaker.OverrideData();
}

