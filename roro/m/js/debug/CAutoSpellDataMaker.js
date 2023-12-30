
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * オートスペルデータ作成クラス.
 */
function CAutoSpellDataMaker () {

}

//================================================================
// オートスペルデータ定義用ダミー関数
// （可読性を高める目的で使用する）
//================================================================
CAutoSpellDataMaker.AutoSpellAttackable = function (value) { return value; };
CAutoSpellDataMaker.AutoSpellSkill = function (value) { return value; };
CAutoSpellDataMaker.AutoSpellLevel = function (value) { return value; };
CAutoSpellDataMaker.AutoSpellProb = function (value) { return value; };
CAutoSpellDataMaker.AutoSpellTrigger = function (value) { return value; };



/**
 * IDを定義する.
 * @param name 定数名
 * @param value 定数値
 * @return 定数値
 */
CAutoSpellDataMaker.RegisterId = function (name, value) {
	if (name != "AUTO_SPELL_ID_UNKNOWN") {
		CGlobalConstManager.DefineEnum("EnumAutoSpellId", [name], value, 0);
	}
	return value;
};





//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** オートスペルデータ定義
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

/**
 * データ定義を上書き定義する.
 */
CAutoSpellDataMaker.OverrideData = function () {

	var autoSpellId = 0;
	var autoSpellData = null;

	// データ配列オブジェクトを上書き定義していく
	AutoSpellSkill = new Array();



	CAutoSpellDataMaker.RegisterId("AS_ID_0", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_TUZYO_KOGEKI),
		CAutoSpellDataMaker.AutoSpellLevel(0),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_UNKNOWN),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_1", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_COLD_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(10),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_2", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(10),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_STONE_CURSE),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_4", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_THUNDER_STORM),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(10),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_TURN_UNDEAD),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_6", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LIGHTNING_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(10),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_7", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SOUL_STRIKE),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(10),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_8", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BALL),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(10),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_9", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_JUPITER_THUNDER),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_PROVOKE),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(3),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_11", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_GLORIA),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(1),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_12", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HEAL),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(5),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_HEAL_1", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HEAL),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_14", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BALL),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_15", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SOKUDO_ZOKA),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_16", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_WATER_BALL),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(3),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_17", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_DELUGE),
		CAutoSpellDataMaker.AutoSpellLevel(2),
		CAutoSpellDataMaker.AutoSpellProb(3),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_18", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_RECOVERY),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(3),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_19", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_ANGELUS),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_20", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_JOINT_BEAT),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_21", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_PIERCE),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_22", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_PULSE_STRIKE),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_23", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FUZIN),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_24", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FLAME_LAUNCHER),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_25", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FROST_WEAPON),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_26", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LIGHTNING_LOADER),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_27", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SEISMIC_WEAPON),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_28", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_JUPITER_THUNDER),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_29", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FROST_NOVA),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_30", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_TRACKING),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_31", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SPREAD_ATTACK),
		CAutoSpellDataMaker.AutoSpellLevel(6),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_32", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BALL),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(15),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_33", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_BOWLING_BASH),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(2),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_34", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_PRESSURE),
		CAutoSpellDataMaker.AutoSpellLevel(2),
		CAutoSpellDataMaker.AutoSpellProb(3),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_35", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_RENKIKO),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(3),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_36", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_BAKURETSU_HADO),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(1),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_37", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_UNMEINO_TALOTCARD),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(2),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_38", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_QUAGMIRE),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(5),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_39", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_ASSUMPTIO),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(2),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_40", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HEAL),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(3),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_41", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_VENOM_SPLASHER),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(2),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_42", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SONIC_BLOW),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(5),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_43", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_METEOR_ASSALT),
		CAutoSpellDataMaker.AutoSpellLevel(2),
		CAutoSpellDataMaker.AutoSpellProb(5),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_44", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HAKKEI),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(2),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_45", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_ASHURA_HAOKEN_SPKOTEI),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_46", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LEX_AETERNA),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(2),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_47", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_GLORIA),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_48", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_OKYU_TEATE),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_49", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SIGNUM_CRUCIS),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_50", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_TURN_UNDEAD),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_ANY_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_51", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FROST_NOVA),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_52", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_METEOR_STORM),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_53", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_GRAND_CROSS),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_54", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_STRIP_WEAPON),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_55", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SOKUDO_GENSHO),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_56", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SHUCHURYOKU_KOZYO),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_57", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_KYRIE_ELEISON),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_58", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_TELEPORT),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_59", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SONIC_BLOW),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_60", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SAMUI_JOKE),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_61", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_JUPITER_THUNDER),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_62", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SIGNUM_CRUCIS),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_63", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_IMPOSITIO_MANUS),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_64", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LEX_AETERNA),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_65", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_ENVENOM),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_66", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_GLORIA),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_67", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_AUTO_GUARD_OLD),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_68", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_INTIMIDATE),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_69", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_BLESSING),
		CAutoSpellDataMaker.AutoSpellLevel(2),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_70", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FROST_DIVER),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_STORM_GUST_1", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_STORM_GUST),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_72", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_METEOR_STORM),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_MAGNUM_BREAK_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_MAGNUM_BREAK),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_74", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HEAL),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_75", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_QUAGMIRE),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_76", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_METEOR_STORM),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_77", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_DISPELL),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(10),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_78", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_BASH),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_79", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BALL),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_80", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_STRIP_ARMER),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_81", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_PNEUMA),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_82", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SPELL_BREAKER),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_83", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_ASSUMPTIO),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_ANY_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_84", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LAND_PROTECTOR),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(5),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_MAGICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_85", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LEX_DIVINA),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(15),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_MAGICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_86", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LIGHTNING_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_87", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_WEAPON_PERFECTION),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_88", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SIGNUM_CRUCIS),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_89", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HEAL),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_90", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SOKUDO_ZOKA),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_91", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FROST_NOVA),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_ANY_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_92", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_93", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BALL),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_94", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_COLD_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(2),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_95", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_GRAND_CROSS),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_96", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_BOWLING_BASH),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_FROST_WEAPON_1", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FROST_WEAPON),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_98", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_IMPOSITIO_MANUS),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_99", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SOKUDO_ZOKA),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_100", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SCREAM),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_101", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SHUCHURYOKU_KOZYO),
		CAutoSpellDataMaker.AutoSpellLevel(2),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_SHORTRANGE_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_HEAL_1_BY_ANY_DAMAGE", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HEAL),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_103", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_104", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_COLD_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_105", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LIGHTNING_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_106", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LEX_DIVINA),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_107", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SCREAM),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_108", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HAKKEI),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_109", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_110", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_COLD_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_111", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LIGHTNING_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_112", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_DARK_STRIKE),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_ANY_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_113", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_THUNDER_STORM),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_114", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LIGHTNING_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_115", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_THUNDER_STORM),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_116", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SIGHT),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_117", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_118", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BALL),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_119", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HELL_INFERNO),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_120", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_DOUBLE_STRAFING),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_LONGRANGE_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_121", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_METEOR_ASSALT),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_122", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SOUL_BREAKER),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_123", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_ARRAW_VULKAN),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_124", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_DOUBLE_STRAFING),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_125", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SONIC_BLOW),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_126", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FROST_NOVA),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_ANY_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_127", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_JUPITER_THUNDER),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_ANY_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_128", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BALL),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_129", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SOUL_STRIKE),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(0.5),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_130", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_EARTH_SPIKE),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(0.5),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_131", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_COLD_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(0.5),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_132", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(0.5),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_133", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LIGHTNING_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(0.5),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_134", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_CHIMEITEKINA_KIZU),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(3),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_135", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_MAGNUM_BREAK),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_136", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FROST_NOVA),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_137", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_WATER_BALL),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_138", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HELL_JUDGEMENT),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_139", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_MAGICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_140", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_KOUENKA),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_141", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FUZIN),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_142", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HYOSENSO),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_143", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SOUL_STRIKE),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_144", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_EARTH_SPIKE),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_145", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LIGHTNING_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_146", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_COLD_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_147", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_148", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_TURN_UNDEAD),
		CAutoSpellDataMaker.AutoSpellLevel(6),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_149", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FROST_NOVA),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_150", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_PSYCHIC_WAVE),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_151", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_MAHORYOKU_ZOFUKU),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_MAGICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_152", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SCREAM),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_ANY_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_153", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FROST_DIVER),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_154", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_EARTH_QUAKE),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_155", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_EARTH_SPIKE),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_156", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_DOUBLE_CASTING),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_157", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_EARTH_QUAKE),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(0.1),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_158", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LORD_OF_VERMILLION),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_159", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_STORM_GUST),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_160", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_DOUBLE_STRAFING),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_LONGRANGE_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_161", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HOLY_LIGHT),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_162", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HOLY_LIGHT_TAMASHI),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_163", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_CART_REVOLUTION),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_BOWLING_BASH_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_BOWLING_BASH),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_165", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_GRAND_CROSS),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_166", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HAKKEI),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_167", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_ACID_TERROR),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_HELL_JUDGEMENT_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HELL_JUDGEMENT),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_THUNDER_STORM_10_OLD", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_THUNDER_STORM),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_SOUL_BREAKER_6", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SOUL_BREAKER),
		CAutoSpellDataMaker.AutoSpellLevel(6),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_SOUL_BREAKER_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SOUL_BREAKER),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_HOLY_CROSS_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HOLY_CROSS),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_SPIRAL_PIERCE_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SPIRAL_PIERCE),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_WATER_BALL_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_WATER_BALL),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_EARTH_SPIKE_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_EARTH_SPIKE),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_HEAVENS_DRIVE_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HEAVENS_DRIVE),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_LIGHTNING_BOLT_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LIGHTNING_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_THUNDER_STORM_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_THUNDER_STORM),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_COLD_BOLT_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_COLD_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_FROST_NOVA_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FROST_NOVA),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_FIRE_BALL_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BALL),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_FIRE_BOLT_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_DRAGON_TAIL_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_DRAGON_TAIL),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_DARK_CROSS_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_DARK_CROSS),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_COMBO_GIGANTSET_JOINT_BEAT_1", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_UNKNOWN),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_COMBO_GIGANTSET_SPIRAL_PIERCE_1", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_UNKNOWN),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_EARTH_QUAKE_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_EARTH_QUAKE),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_HELL_JUDGEMENT_6", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HELL_JUDGEMENT),
		CAutoSpellDataMaker.AutoSpellLevel(6),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_VERATURE_SPEAR_1", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_VERATURE_SPEAR),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_EARTH_GRAVE_1", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_EARTH_GRAVE),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_RECOGNIZED_SPELL_1", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_RECOGNIZED_SPELL),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_MAGICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_QUAGMIRE_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_QUAGMIRE),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_ANY_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_CRYMSON_ROCK_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_CRYMSON_ROCK),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_HELL_INFERNO_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HELL_INFERNO),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_JUDEX_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_JUDEX),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_METEOR_STORM_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_METEOR_STORM),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_METEOR_STORM_4", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_METEOR_STORM),
		CAutoSpellDataMaker.AutoSpellLevel(4),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_METEOR_STORM_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_METEOR_STORM),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_POWER_SWING_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_POWER_SWING),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_PSYCHIC_WAVE_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_PSYCHIC_WAVE),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_SOUL_EXPANSION_1", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SOUL_EXPANSION),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_TELECHINESIS_INSTENCE_1", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_TELECHINESIS_INSTENCE),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_MAGICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_HEAL_5_BY_ANY_DAMAGE", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HEAL),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_ANY_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_SHUTTER_STORM_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SHUTTER_STORM),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_EARTH_SPIKE_4", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_EARTH_SPIKE),
		CAutoSpellDataMaker.AutoSpellLevel(4),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_LIGHTNING_BOLT_4", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_LIGHTNING_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(4),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_COLD_BOLT_4", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_COLD_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(4),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_FIRE_BOLT_4", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_FIRE_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(4),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_DIAMOND_DUST_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_DIAMOND_DUST),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_STEAL_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_STEAL),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_CHAIN_LIGHTNING_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_CHAIN_LIGHTNING),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_NAPALM_VULKAN_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_NAPALM_VULKAN),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_STEAL_COIN_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_STEAL_COIN),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_THUNDER_STORM_6", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_THUNDER_STORM),
		CAutoSpellDataMaker.AutoSpellLevel(6),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_VERATURE_SPEAR_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_VERATURE_SPEAR),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_CRYMSON_ROCK_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_CRYMSON_ROCK),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_RAY_OF_GENESIS_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_RAY_OF_GENESIS),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_METEOR_STORM_2_BY_PHYSICAL_DAMAGE", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_METEOR_STORM),
		CAutoSpellDataMaker.AutoSpellLevel(2),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_SAFETY_WALL_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SAFETY_WALL),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_HELL_INFERNO_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_HELL_INFERNO),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_RAY_OF_GENESIS_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_RAY_OF_GENESIS),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_SOUL_EXPANSION_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_SOUL_EXPANSION),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_TELECHINESIS_INSTENCE_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_TELECHINESIS_INSTENCE),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_MAGICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_IGNITION_BREAK_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_IGNITION_BREAK),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_IENDURE_1_BY_PHYSICAL_DAMAGED", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_ENDURE),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_EARTH_QUAKE_1_BY_PHYSICAL_DAMAGED", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_EARTH_QUAKE),
		CAutoSpellDataMaker.AutoSpellLevel(1),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_DAMAGED),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_MARSH_OF_ABYSS_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_MARSH_OF_ABYSS),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_EARTH_QUAKE_6", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_EARTH_QUAKE),
		CAutoSpellDataMaker.AutoSpellLevel(6),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_AIMED_BOLT_10", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_AIMED_BOLT),
		CAutoSpellDataMaker.AutoSpellLevel(10),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_VAMPIRE_GIFT_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_VAMPIRE_GIFT),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_EARTH_STRAIN_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_EARTH_STRAIN),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_MAGMA_ILLUPTION_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_MAGMA_ILLUPTION),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_DARK_CRAW_3", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(0),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_DARK_CRAW),
		CAutoSpellDataMaker.AutoSpellLevel(3),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_PSYCHIC_WAVE_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_PSYCHIC_WAVE),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;



	CAutoSpellDataMaker.RegisterId("AS_ID_CHAIN_LIGHTNING_5", autoSpellId);
	autoSpellData = [
		autoSpellId,
		CAutoSpellDataMaker.AutoSpellAttackable(1),
		CAutoSpellDataMaker.AutoSpellSkill(SKILL_ID_CHAIN_LIGHTNING),
		CAutoSpellDataMaker.AutoSpellLevel(5),
		CAutoSpellDataMaker.AutoSpellProb(AUTO_SPELL_PROB_ESP),
		CAutoSpellDataMaker.AutoSpellTrigger(AUTO_SPELL_TRIGGER_PHYSICAL_ATTACK),
	];
	AutoSpellSkill[autoSpellId] = autoSpellData;
	autoSpellId++;

};



// データ上書き
if (_DATA_CREATE_MODE) {
	CAutoSpellDataMaker.OverrideData();
}

