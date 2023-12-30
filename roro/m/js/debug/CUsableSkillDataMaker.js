
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * 使用可能スキルデータ作成クラス.
 */
function CUsableSkillDataMaker () {

}

//================================================================
// 使用可能スキルデータ定義用ダミー関数
// （可読性を高める目的で使用する）
//================================================================
CUsableSkillDataMaker.UsableSkillAttackable = function (value) { return value; };
CUsableSkillDataMaker.UsableSkillSkill = function (value) { return value; };
CUsableSkillDataMaker.UsableSkillLevel = function (value) { return value; };



/**
 * IDを定義する.
 * @param name 定数名
 * @param value 定数値
 * @return 定数値
 */
CUsableSkillDataMaker.RegisterId = function (name, value) {
	if (name != "USABEL_SKILL_ID_UNKNOWN") {
		CGlobalConstManager.DefineEnum("EnumUsableSkillId", [name], value, undefined);
	}
	return value;
};





//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** 使用可能スキルデータ定義
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

/**
 * データ定義を上書き定義する.
 */
CUsableSkillDataMaker.OverrideData = function () {

	var usableSkillId = 0;
	var usableSkillData = null;

	// データ配列オブジェクトを上書き定義していく
	InsertSkill = new Array();



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_NONE", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_TUZYO_KOGEKI),
		CUsableSkillDataMaker.UsableSkillLevel(0),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_COLD_BOLT_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_COLD_BOLT),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FIRE_BOLT_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FIRE_BOLT),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_BASH_BY_CUTLASS", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_BASH),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_HEAL_BY_LIGHT_EPSILON", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_HEAL),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_HEAL_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_HEAL),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CURE_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CURE),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_HEAL_BY_BRYUNAK", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_HEAL),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_TOMAHAWK_NAGE_BY_TOMAHAWK", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_TOMAHAWKNAGE),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_JUPITER_THUNDER_BY_XXXXXXXXXX", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_JUPITER_THUNDER),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_RUWACH_BY_SATELLITE_HAIRBAND", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_RUWACH),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_PIERCE_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_PIERCE),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ANGELUS_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ANGELUS),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FROST_DIVER_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FROST_DIVER),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_METEOR_STORM_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_METEOR_STORM),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SPEAR_STUB_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SPEAR_STUB),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SIGHT_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SIGHT),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_TELEPORT_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_TELEPORT),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_LIGHTNING_BOLT", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_LIGHTNING_BOLT),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CLOAKING_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CLOAKING),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ENVENOM_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ENVENOM),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_MAGNUM_BREAK_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_MAGNUM_BREAK),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_HIDING_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_HIDING),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_UNKNOWN", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_TELEPORT),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_GEDOKU_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_GEDOKU),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_UNKNOWN", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CURE),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_UNKNOWN", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_DISCOUNT),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_STEAL_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_STEAL),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CLOAKING_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CLOAKING),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CAST_CANCEL_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CAST_CANCEL),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_UNKNOWN", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_STONE_CURSE),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_UNKNOWN", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ISHIHIROI),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ISHINAGE_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ISHINAGE),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FIRE_BOLT_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FIRE_BOLT),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FIRE_BALL_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FIRE_BALL),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FIRE_WALL_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FIRE_WALL),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_COLO_BOLT_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_COLD_BOLT),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_LIGHTNING_BOLT_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_LIGHTNING_BOLT),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_EARTH_SPIKE_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_EARTH_SPIKE),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SOUL_STRIKE_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SOUL_STRIKE),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_RESERECTION_BY_YGGDRASILLNO_HA", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_RESURRECTION),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_UNKNOWN", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FLASHER),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FROST_NOVA_2", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FROST_NOVA),
		CUsableSkillDataMaker.UsableSkillLevel(2),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_MAGNUM_BREAK_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_MAGNUM_BREAK),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_UNKNOWN", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SURPRISE_ATTACK),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SOKUDO_GENSHO_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SOKUDO_GENSHO),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_UNKNOWN", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_WATER_BALL),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_UNKNOWN", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_RAIGEKISAI),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_EARTH_SPIKE_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_EARTH_SPIKE),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_UNKNOWN", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SOUL_STRIKE),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_GRAND_CROSS_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_GRAND_CROSS),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_METEOR_ASSALT_BY_TOZOKUNO_SUSUME_DAIIKKAN", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_METEOR_ASSALT),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SURPRISE_ATTACK_BY_SHINSHUKUZIZAI_HAND", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SURPRISE_ATTACK),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_BACK_STUB_BY_SHINSHUKUZIZAI_HAND", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_BACK_STAB),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SOUL_BREAKER_BY_GODS_SWORD", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SOUL_BREAKER),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FROST_NOVA_BY_GODS_HELM", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FROST_NOVA),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_LOV_BY_GODS_GUNTLET", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_LORD_OF_VERMILLION),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_MAGNUM_BREAK_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_MAGNUM_BREAK),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_HEAL_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_HEAL),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_METEOR_STORM_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_METEOR_STORM),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_HIDING_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_HIDING),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_VOLCANO_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_VOLCANO),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SOKUDO_ZOKA_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SOKUDO_ZOKA),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FIRE_WALL_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FIRE_WALL),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_METEOR_STORM_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_METEOR_STORM),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_GREED_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_GREED),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_MAGNUS_EXORCISMUS_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_MAGNUS_EXORCISMUS),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_LEX_AETERNA_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_LEX_AETERNA),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FLAME_LAUNCHER_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FLAME_LAUNCHER),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ITEM_KANTE_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ITEM_KANTE),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_BLESSING_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_BLESSING),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CART_REVOLUTION_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CART_REVOLUTION),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SEISMIC_WEAPON_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SEISMIC_WEAPON),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_DEMONIC_FIRE_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_DEMONIC_FIRE),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_HELL_INFERNO_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_HELL_INFERNO),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_MAGMA_ILLUPTION_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_MAGMA_ILLUPTION),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_PSYCHIC_WAVE_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_PSYCHIC_WAVE),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_METALIC_SOUND_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_METALIC_SOUND),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_JUDEX_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_JUDEX),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_TEIOAPUCHAGI_7", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_TEIOAPUCHAGI),
		CUsableSkillDataMaker.UsableSkillLevel(7),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SOUL_BREAKER_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SOUL_BREAKER),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_PRESSURE_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_PRESSURE),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_GLORIA_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_GLORIA),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FROST_NOVA_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FROST_NOVA),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_LOV_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_LORD_OF_VERMILLION),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SHUCHURYOKU_KOZYO_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SHUCHURYOKU_KOZYO),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CONCENTRATION_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CONCENTRATION),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ADRENALINE_RUSH_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ADRENALINE_RUSH),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_LIGHTNING_LOADER_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_LIGHTNING_LOADER),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_WEAPON_PERFECTION_2", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_WEAPON_PERFECTION),
		CUsableSkillDataMaker.UsableSkillLevel(2),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ENDURE_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ENDURE),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_METEOR_STORM_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_METEOR_STORM),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_UTSUSEMI_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_UTSUSEMI),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_HAMMER_FALL_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_HAMMER_FALL),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_HEAVENS_DRIVE_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_HEAVENS_DRIVE),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CLEARANCE_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CLEARANCE),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_MAGNIFICAT_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_MAGNIFICAT),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_MAHORYOKU_ZOFUKU_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_MAHORYOKU_ZOFUKU),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_DEFENDER_2", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_DEFENDER),
		CUsableSkillDataMaker.UsableSkillLevel(2),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_DELUGE_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_DELUGE),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_DARK_CRAW_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_DARK_CRAW),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CLOAKING_EXCEED_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CLOAKING_EXCEED),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_BLESSING_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_BLESSING),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_DISPELL_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_DISPELL),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_VOLCANO_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_VOLCANO),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_BLESSING_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_BLESSING),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_VIOLENT_GALE_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_VIOLENT_GALE),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_KIDATSU_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_KIDATSU),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_AUTO_GUARD_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_AUTO_GUARD),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_BASH_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_BASH),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_KIKO_2", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_KIKO),
		CUsableSkillDataMaker.UsableSkillLevel(2),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CLOSE_CONFINE_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CLOSE_CONFINE),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_MONSTER_ZYOHO_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_MONSTER_ZYOHO),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FIRE_BALL_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FIRE_BALL),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FROST_DIVER_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FROST_DIVER),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_LIGHTNING_BOLT_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_LIGHTNING_BOLT),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_LOUD_VOICE_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_LOUD_VOICE),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_PEONY_MAMY_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_PEONY_MAMY),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_POTION_PITCHER_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_POTION_PITCHER),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_PISHARI_HERB_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_PISHARI_HERB),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SEKAIZYUNO_HOKORI_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SEKAIZYUNO_HOKORI),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SNOW_FLIP_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SNOW_FLIP),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SOUL_STRIKE_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SOUL_STRIKE),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SPELL_BREAKER_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SPELL_BREAKER),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_STONE_CURSE_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_STONE_CURSE),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_NAPALM_VULKAN_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_NAPALM_VULKAN),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FROST_WEAPON_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FROST_WEAPON),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ENCHANT_POISON_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ENCHANT_POISON),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_GANBANTEIN_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_GANBANTEIN),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_TRUE_SIGHT_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_TRUE_SIGHT),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_MELTDOWN_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_MELTDOWN),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ASSUMPTIO_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ASSUMPTIO),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ENERGY_COAT_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ENERGY_COAT),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_AURA_BLADE_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_AURA_BLADE),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SAFETY_WALL_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SAFETY_WALL),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_COMPULSION_DISCOUNT_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_COMPULSION_DISCOUNT),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_LORD_OF_VERMILLION_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_LORD_OF_VERMILLION),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_GRAND_CROSS_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_GRAND_CROSS),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_HIDING_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_HIDING),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_JUDEX_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_JUDEX),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CART_BOOST_GENETIC_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CART_BOOST_GENETIC),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ASSUMPTIO_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ASSUMPTIO),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_BOWLING_BASH_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_BOWLING_BASH),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_NOPITIGI_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_NOPITIGI),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_KIKO_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_KIKO),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_KIKO_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_KIKO),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_KONGO_4", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_KONGO),
		CUsableSkillDataMaker.UsableSkillLevel(4),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CART_BOOST_WS_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CART_BOOST_WS),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_STORM_GUST_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_STORM_GUST),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SHUCHURYOKU_KOZYO_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SHUCHURYOKU_KOZYO),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_GOSPEL_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_GOSPEL),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_TRUE_SIGHT_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_TRUE_SIGHT),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FROST_MISTY_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FROST_MISTY),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_MAGNUS_EXORCISMUS_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_MAGNUS_EXORCISMUS),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_THUNDER_STORM_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_THUNDER_STORM),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_RECOVERY_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_RECOVERY),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_PROVIDENCE_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_PROVIDENCE),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SEIMEIRYOKU_HENKAN_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SEIMEIRYOKU_HENKAN),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_MELTDOWN_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_MELTDOWN),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CHEMICAL_WEAPON_CHARGE_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CHEMICAL_WEAPON_CHARGE),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SOKUDO_ZOKA_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SOKUDO_ZOKA),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_JUDEX_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_JUDEX),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_HELL_INFERNO_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_HELL_INFERNO),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_EARTH_DRIVE_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_EARTH_DRIVE),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_REFLECT_SHIELD_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_REFLECT_SHIELD),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_QUAGMIRE_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_QUAGMIRE),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_FROST_WEAPON_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_FROST_WEAPON),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_PIETY_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_PIETY),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ORATIO_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ORATIO),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SILENTIUM_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SILENTIUM),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_PROVOKE_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_PROVOKE),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ASPERSIO_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ASPERSIO),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_JACK_FROST_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_JACK_FROST),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CHEMICAL_HELM_CHARGE_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CHEMICAL_HELM_CHARGE),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_OVER_CHARGE_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_OVER_CHARGE),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_MAXIMIZE_POWER_2", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_MAXIMIZE_POWER),
		CUsableSkillDataMaker.UsableSkillLevel(2),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_TENKETSU_KYU_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_TENKETSU_KYU),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_UNLIMIT_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_UNLIMIT),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_AXE_BOOMERANG_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_AXE_BOOMERANG),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SANCTUARY_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SANCTUARY),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_AUTO_GUARD_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_AUTO_GUARD),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_SPELL_BREAKER_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_SPELL_BREAKER),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_HEAVENS_DRIVE_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_HEAVENS_DRIVE),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_STONE_SKIN_2", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_STONE_SKIN),
		CUsableSkillDataMaker.UsableSkillLevel(2),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_STONE_SKIN_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_STONE_SKIN),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ODINNO_CHIKARA_2", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ODINNO_CHIKARA),
		CUsableSkillDataMaker.UsableSkillLevel(2),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_POWER_SWING_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_POWER_SWING),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ENCHANT_POISON_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ENCHANT_POISON),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ENVENOM_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ENVENOM),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CLOUD_KILL_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CLOUD_KILL),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_METEOR_ASSALT_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_METEOR_ASSALT),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_BLOOD_SUCKER_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_BLOOD_SUCKER),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_TRUMPLE_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_TRUMPLE),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_GOSPEL_10", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_GOSPEL),
		CUsableSkillDataMaker.UsableSkillLevel(10),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_OVER_TRUST_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_OVER_TRUST),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_DRAIN_LIFE_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_DRAIN_LIFE),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_CRYMSON_ROCK_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_CRYMSON_ROCK),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_KOGEKI_SOCHI_YUKOKA_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_KOGEKI_SOCHI_YUKOKA),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_GLORIA_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_GLORIA),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_VENOM_IMPRESS_3", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_VENOM_IMPRESS),
		CUsableSkillDataMaker.UsableSkillLevel(3),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_ENDURE_1", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_ENDURE),
		CUsableSkillDataMaker.UsableSkillLevel(1),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;



	CUsableSkillDataMaker.RegisterId("USABEL_SKILL_ID_GLORIA_5", usableSkillId);
	usableSkillData = [
		usableSkillId,
		CUsableSkillDataMaker.UsableSkillAttackable(USABLE_SKILL_ATTACKABLE_FLAG_NOT_ATTACKABLE),
		CUsableSkillDataMaker.UsableSkillSkill(SKILL_ID_GLORIA),
		CUsableSkillDataMaker.UsableSkillLevel(5),
	];
	InsertSkill[usableSkillId] = usableSkillData;
	usableSkillId++;






};



// データ上書き
if (_DATA_CREATE_MODE) {
	CUsableSkillDataMaker.OverrideData();
}

