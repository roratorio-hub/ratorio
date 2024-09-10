
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * スキルデータ作成クラス.
 */
function CSkillDataMaker () {

}

//================================================================
// スキルデータ定義用ダミー関数
// （可読性を高める目的で使用する）
//================================================================
CSkillDataMaker.SkillMaxLevel = function (value) { return value; };
CSkillDataMaker.SkillName = function (value) { return value; };



/**
 * IDを定義する.
 * @param name 定数名
 * @param value 定数値
 * @return 定数値
 */
CSkillDataMaker.RegisterId = function (name, value) {
	if (name != "SKILL_ID_UNKNOWN") {
		CGlobalConstManager.DefineEnum("EnumSkillId", [name], value, undefined);
	}
	return value;
};





//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** スキルデータ定義
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

/**
 * データ定義を上書き定義する.
 */
CSkillDataMaker.OverrideData = function () {

	var skillId = 0;
	var skillData = null;

	// データ配列オブジェクトを上書き定義していく
	SkillObjNew = new Array();



	CSkillDataMaker.RegisterId("SKILL_ID_TUZYO_KOGEKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("通常攻撃"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_OKYU_TEATE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("応急手当"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHINDAFURI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("死んだふり"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KEN_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("剣修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RYOUTKEN_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("両手剣修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HP_KAIFUKURYOKU_KOZYO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("HP回復力向上"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BASH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("バッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAGNUM_BREAK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("マグナムブレイク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PROVOKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("プロボック"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ENDURE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("インデュア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_IDOZI_HP_KAIFUKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("移動時HP回復"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KYUSHO_KOGEKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("急所攻撃"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AUTO_BERSERK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("オートバーサーク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DOUBLE_ATTACK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ダブルアタック"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KAIHIRITSU_ZOKA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("回避率増加"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STEAL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("スティール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HIDING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ハイディング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ENVENOM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("インベナム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GEDOKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("解毒"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SUNAMAKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("砂まき"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BACKSTEP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("バックステップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ISHIHIROI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("石拾い"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ISHINAGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("石投げ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DIVINE_PROTECTION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ディバインプロテクション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DEMON_BANE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("デーモンベイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HEAL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ヒール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CURE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("キュアー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOKUDO_ZOKA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("速度増加"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOKUDO_GENSHO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("速度減少"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SIGNUM_CRUCIS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("シグナムクルシス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ANGELUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("エンジェラス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BLESSING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ブレッシング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PNEUMA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ニューマ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AQUA_BENEDICTA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("アクアベネディクタ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RUWACH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ルアフ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TELEPORT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(2),
		CSkillDataMaker.SkillName("テレポート"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WARP_PORTAL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("ワープポータル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HOLY_LIGHT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ホーリーライト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FUKURONO_ME", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ふくろうの目"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WASHINO_ME", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ワシの目"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DOUBLE_STRAFING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ダブルストレイフィング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ARROW_SHOWER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("アローシャワー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHUCHURYOKU_KOZYO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("集中力向上"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_YA_SAKUSEI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("矢作成"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHARGE_ARROW", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("チャージアロー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SP_KAIFUKURYOKU_KOZYO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("SP回復力向上"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NAPALM_BEAT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ナパームビート"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOUL_STRIKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ソウルストライク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SAFETY_WALL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("セイフティウォール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STONE_CURSE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ストーンカース"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SIGHT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("サイト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_BOLT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ファイアーボルト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_BALL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ファイアーボール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_WALL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ファイアーウォール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COLD_BOLT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("コールドボルト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FROST_DIVER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("フロストダイバー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LIGHTNING_BOLT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ライトニングボルト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_THUNDER_STORM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("サンダーストーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ENERGY_COAT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("エナジーコート"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHOZIGENKAIRYO_ZOKA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("所持限界量増加"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DISCOUNT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ディスカウント"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_OVER_CHARGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("オーバーチャージ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PUSH_CART", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("プッシュカート"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ITEM_KANTE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("アイテム鑑定"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ROTEN_KAISETSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("露店開設"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAMMONITE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("メマーナイト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CART_REVOLUTION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("カートレボリューション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHANGE_CART", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("チェンジカート"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LOUD_VOICE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ラウドボイス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_YARI_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("槍修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PIERCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ピアース"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SPEAR_STUB", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("スピアスタブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SPEAR_BOOMERANG", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("スピアブーメラン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BRANDISH_SPEAR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ブランディッシュスピア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TWOHAND_QUICKEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ツーハンドクイッケン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AUTO_COUNTER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("オートカウンター"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BOWLING_BASH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ボウリングバッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RIDING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ライディング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KIHE_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("騎兵修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MIGITE_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("右手修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HIDARITE_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("左手修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KATAR_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("カタール修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CLOAKING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("クローキング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SONIC_BLOW", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ソニックブロー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GRIM_TOOTH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("グリムトゥース"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ENCHANT_POISON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("エンチャントポイズン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_POISON_REACT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ポイズンリアクト(反撃)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_VENOM_DUST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ベナムダスト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_VENOM_SPLASHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ベナムスプラッシャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MACE_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("メイス修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_IMPOSITIO_MANUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("イムポシティオマヌス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SUFFRAGIUM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("サフラギウム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ASPERSIO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アスペルシオ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SEITAI_KOFUKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("聖体降福"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SANCTUARY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("サンクチュアリ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RECOVERY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("リカバリー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SLOW_POISON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("スローポイズン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RESURRECTION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("(×)リザレクション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KYRIE_ELEISON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("キリエエレイソン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAGNIFICAT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("マグニフィカート"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GLORIA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("グロリア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LEX_DIVINA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("レックスディビーナ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TURN_UNDEAD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)ターンアンデッド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LEX_AETERNA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("レックスエーテルナ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAGNUS_EXORCISMUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("マグヌスエクソシズム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SKID_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("スキッドトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LAND_MINE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(仮)ランドマイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ANKLESNARE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アンクルスネア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FLASHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("フラッシャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHOCKWAVE_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ショックウェーブトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SANDMAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("サンドマン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FREEZING_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("フリージングトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BLAST_MINE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(？)ブラストマイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CLAYMORE_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(？)クレイモアトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_REMOVE_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("リムーブトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TALKIE_BOX", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("トーキーボックス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BEAST_BANE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ビーストベイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FALCON_MASTERY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ファルコンマスタリー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BLITZ_BEAT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ブリッツビート"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STEEL_CROW", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("スチールクロウ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DETECTING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("ディテクティング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SPRING_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("スプリングトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_PILLAR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ファイアーピラー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MONSTER_ZYOHO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("モンスター情報"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SIGHT_RASHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("サイトラッシャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_METEOR_STORM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("メテオストーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_JUPITER_THUNDER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ユピテルサンダー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LORD_OF_VERMILLION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ロードオブヴァーミリオン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WATER_BALL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ウォーターボール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ICE_WALL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("アイスウォール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FROST_NOVA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("フロストノヴァ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STORM_GUST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ストームガスト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EARTH_SPIKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アーススパイク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HEAVENS_DRIVE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ヘヴンズドライブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_QUAGMIRE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("クァグマイア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TETSU_SEIZO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("鉄製造"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KOTETSU_SEIZO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("鋼鉄製造"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZOKUSEISEKI_SEIZO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("属性石製造"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ORIDEOCON_KENKYU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("オリデオコン研究"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TANKEN_SEISAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("短剣製作"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KEN_SEISAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("剣製作"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RYOTEKEN_SEISAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("両手剣製作"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ONO_SEISAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("斧製作"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MACE_SEISAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("メイス製作"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KNUCKLE_SEISAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("ナックル製作"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_YARI_SEISAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("槍製作"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HILT_BINDING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ヒルトバインディング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KOSEKI_HAKKEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("鉱石発見"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BUKI_KENKYU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("武器研究"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BUKI_SHURI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("武器修理"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SKIN_TEMPERING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("スキンテンパリング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HAMMER_FALL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ハンマーフォール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ADRENALINE_RUSH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アドレナリンラッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WEAPON_PERFECTION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ウェポンパーフェクション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_OVER_TRUST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("オーバートラスト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAXIMIZE_POWER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("マキシマイズパワー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FAITH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("フェイス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AUTO_GUARD_OLD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("オートガード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIELD_CHARGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("シールドチャージ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIELD_BOOMERANG", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("シールドブーメラン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_REFLECT_SHIELD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("リフレクトシールド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HOLY_CROSS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ホーリークロス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GRAND_CROSS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("グランドクロス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DEBOTION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ディボーション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PROVIDENCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("プロヴィデンス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DEFENDER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ディフェンダー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SPEAR_QUICKEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("スピアクイッケン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SNATCHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("スナッチャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STEAL_COIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("スティールコイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BACK_STAB", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("バックスタブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TUNNEL_DRIVE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("トンネルドライブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SURPRISE_ATTACK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("サプライズアタック"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STRIP_WEAPON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ストリップウェポン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STRIP_SHIELD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ストリップシールド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STRIP_ARMER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ストリップアーマー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STRIP_HELM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ストリップヘルム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_INTIMIDATE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("インティミデイト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GRAPHITY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("グラフィティ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FLAG_GRAPHITY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("フラッググラフィティ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CLEANER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("クリーナー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GANGSTAR_PARADISE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ギャングスターパラダイス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COMPULSION_DISCOUNT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("コンパルションディスカウント"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CLONE_SKILL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("クローンスキル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TEKKEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("鉄拳"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_IBUKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("息吹"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KIKO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("気功(気弾数)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KIDATSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("気奪"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SANDANSHO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("三段掌"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RENDASHO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("連打掌"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MORYUKEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("猛龍拳"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZANEI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("残影"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MIKIRI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("見切り"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIDAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("指弾(Hit数=気功)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HAKKEI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("発勁"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIRAHADORI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("白刃取り"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BAKURETSU_HADO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("爆裂波動"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KONGO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("金剛"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ASHURA_HAOKEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("阿修羅覇王拳(SP調整可)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GAKKINO_RENSHU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("楽器の練習"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MUSICAL_STRIKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ミュージカルストライク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FUKYOWAON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("不協和音"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SAMUI_JOKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("寒いジョーク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KUCHIBUE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("口笛"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_YUHINO_ASSASINCROSS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("夕陽のアサシンクロス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BRAGINO_UTA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ブラギの詩"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_IDUNNNO_RINGO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("イドゥンの林檎"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DANCENO_RENSHU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ダンスの練習"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_YAUCHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("矢撃ち"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZIBUNKATTENA_DANCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("自分勝手なダンス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SCREAM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("スクリーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HUMMING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ハミング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WATASHIWO_WASURENAIDE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("私を忘れないで…"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KOUNNO_KISS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("幸運のキス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SERVICE_FOR_YOU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("サービスフォーユー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ADLIB", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("アドリブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ENCORE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("アンコール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KOMORIUTA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("子守歌"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NJORDNO_UTAGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ニヨルドの宴"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EIENNO_KONTON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("永遠の混沌"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_IKUSADAIKONO_HIBIKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("戦太鼓の響き"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NIBELUGENNO_YUBIWA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ニーベルングの指輪"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LOKINO_SAKEBI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ロキの叫び"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHINENNO_NAKANI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("深淵の中に"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FUZIMINO_SIEGFRIED", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("不死身のジークフリード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ADVANCED_BOOK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("アドバンスドブック"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CAST_CANCEL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("キャストキャンセル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAGIC_ROD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("マジックロッド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SPELL_BREAKER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("スペルブレイカー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FREE_CAST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("フリーキャスト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AUTO_MAGICIAN_SPELL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(仮)オートマジシャンスペル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FLAME_LAUNCHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("フレイムランチャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FROST_WEAPON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("フロストウェポン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LIGHTNING_LOADER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ライトニングローダー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SEISMIC_WEAPON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("サイズミックウェポン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DRAGONOLOGY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ドラゴノロジー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_VOLCANO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ボルケーノ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DELUGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("デリュージ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_VIOLENT_GALE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("バイオレントゲイル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LAND_PROTECTOR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ランドプロテクター"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DISPELL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ディスペル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ABRACADABRA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("アブラカタブラ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ONO_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("斧修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LEARNING_POTION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ラーニングポーション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PHARMACY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ファーマシー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ACID_TERROR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アシッドテラー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_POTION_PITCHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ポーションピッチャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BIOPLANT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("バイオプラント"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SPHERE_MINE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("スフィアーマイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DEMONSTRATION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("デモンストレーション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHEMICAL_WEAPON_CHARGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ケミカルウェポンチャージ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHEMICAL_SHIELD_CHARGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ケミカルシールドチャージ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHEMICAL_ARMER_CHARGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ケミカルアーマーチャージ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHEMICAL_HELM_CHARGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ケミカルヘルムチャージ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BAKURETSU_HADO_SUPER_NOVICE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("爆裂波動(Sノビ)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AURA_BLADE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("オーラブレイド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PARIYING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("パリイング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CONCENTRATION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("コンセントレイション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TENTION_RELAX", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("テンションリラックス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BERSERK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("バーサーク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SPIRAL_PIERCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("スパイラルピアース"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HEAD_CRUSH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ヘッドクラッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_JOINT_BEAT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ジョイントビート"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KATAR_KENKYU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("カタール研究"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOUL_BREAKER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ソウルブレイカー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_METEOR_ASSALT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("メテオアサルト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CREATE_DEADLY_POISON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("クリエイトデッドリーポイズン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ENCHANT_DEADLY_POISON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(仮)エンチャントデッドリーポイズン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ASSUMPTIO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アスムプティオ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BASILICA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("バジリカ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MEDITATIO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("メディタティオ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TRUE_SIGHT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("トゥルーサイト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FALCON_ASSALT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ファルコンアサルト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHARP_SHOOTING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("シャープシューティング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WIND_WALK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ウインドウォーク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOUL_DRAIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ソウルドレイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAGIC_CRUSHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("マジッククラッシャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAHORYOKU_ZOFUKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("魔法力増幅"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NAPALM_VULKAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ナパームバルカン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MELTDOWN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("メルトダウン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_OKANE_SEIZO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("お金製造"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KATAMARI_SEIZO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("塊製造"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CART_BOOST_WS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("カートブースト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_UNMEINO_TALOTCARD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("運命のタロットカード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PRESSURE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("プレッシャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SACRIFICE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("サクリファイス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GOSPEL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ゴスペル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHASEWALK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("チェイスウォーク(STR+)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_REJECT_SWORD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("リジェクトソード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MOKOKOHAZAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("猛虎硬派山"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BUKKOKEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("伏虎拳"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RENCHUHOGEKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("連柱崩撃"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOUL_COLECT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ソウルコレクト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ARRAW_VULKAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("アローバルカン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RENKIKO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("練気功"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MARIONET_CONTROL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("マリオネットコントロール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LIFE_CONVERSION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ライフコンバージョン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOUL_CHANGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ソウルチェンジ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOUL_BURN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ソウルバーン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MIND_BREAKER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("マインドブレイカー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ALCHEMY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アルケミー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_POTION_SYNAPSE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ポーションシノプス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SANDAN_DELAY_ZOKA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("連打掌修得時の三段掌ディレイ増加"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TOMAHAWKNAGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("トマホーク投げ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PULSE_STRIKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("パルスストライク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BERSERK_PITCHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("バーサークピッチャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TEIOAPUCHAGI_IN_DASH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("ティオアプチャギ(ダッシュ中)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_VENOM_KNIFE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ベナムナイフ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FANTASMIC_ARROW", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ファンタズミックアロー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHARGE_ATTACK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("チャージアタック"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SUPER_NOVICE_NODEAD_BONUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("無死亡ボーナス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MARIAGE_STATUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("結婚ステータス-1付与"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SKILL_COUNT_CREATE_ARMS_MASTER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("製作スキルマスター数(達人の斧用)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DARK_STRIKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ダークストライク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_313", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName(""),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_314", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName(""),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_315", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName(""),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_316", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName(""),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NUKUMORI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("温もり"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NUKUMORI_KABE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("温もり(壁押付)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HEAVENS_DRIVE_FOR_CLONE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ヘヴンズドライブ(盗作用Ex)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WATER_BALL_FOR_CLONE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ウォーターボール(盗作用Ex)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ASHURA_HAOKEN_SPKOTEI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("阿修羅覇王拳(MaxSP-1固定)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MEMORIZE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("メモライズ(5回制限未計算)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_323", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(現在この欄は未使用)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIELD_CHAIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("シールドチェーン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GRAVITATION_FIELD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("グラビテーションフィールド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CART_TERMINATION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("カートターミネーション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_OVER_TRUST_MAX", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("オーバートラストマックス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ACID_DEMONSTRATION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(仮)アシッドデモンストレーション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIRIGI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("タイリギ(蹴威力UP)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FEORICHAGINO_KAMAE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("フェオリチャギの構え"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FEORICHAGI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("フェオリチャギ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NERYOCHAGINO_KAMAE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ネリョチャギの構え"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NERYOCHAGI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("ネリョチャギ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TORURYOCHAGINO_KAMAE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("トルリョチャギの構え"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TORURYOCHAGI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("トルリョチャギ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_APUCHAORURIGINO_KAMAE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("アプチャオルリギの構え"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_APUCHAORURIGI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("アプチャオルリギ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RAKHO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("落法(調整中)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TEIOAPUCHAGI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("ティオアプチャギ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ODAYAKANA_KYUSOKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("穏やかな休息"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TANOSHI_KYUSOKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("楽しい休息"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIGHT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ファイト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NOPITIGI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ノピティギ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAEGWON_MISSION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("テコンミッション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAEGWON_RANKER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("テコンランカー状態"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ATATAKAI_KAZE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("暖かい風"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KANZYO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("太陽と月と星の感情"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYONO_NUKUMORI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("太陽の温もり"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TSUKINO_NUKUMORI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("月の温もり"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HOSHINO_NUKUMORI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("星の温もり"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_NIKUSHIMI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("太陽と月と星の憎しみ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYONO_IKARI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("太陽の怒り"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TSUKINO_IKARI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("月の怒り"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HOSHINO_IKARI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("星の怒り"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYONO_ANRAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("太陽の安楽"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TSUKINO_ANRAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("月の安楽"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HOSHINO_ANRAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("星の安楽"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYONO_SHUKUFUKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("太陽の祝福"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TSUKUNO_SHUKUFUKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("月の祝福"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HOSHINO_SHUKUFUKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("星の祝福"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_AKUMA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("太陽と月と星の悪魔"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TOMO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("太陽と月と星の友"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_CHISHIKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("太陽と月と星の知識"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_YUGO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("太陽と月と星の融合"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KISEKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("太陽と月と星の奇跡"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_TENSHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("太陽と月と星の天使"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHUKUFUKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("～の祝福(経験値増加率)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KAISEL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("カイゼル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KAAHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("カアヒ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KAUPU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("カウプ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KAITO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("カイト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KAINA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("カイナ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ESTIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("エスティン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ESTON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("エストン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ESMA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("エスマ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ESU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("エスウ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ESKA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("エスカ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ESKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("エスク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SPURT_ZYOTAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("タイリギスパート状態(STR+状態)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZIBUNIGAINO_PTNINZU_FOR_FIGHT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(11),
		CSkillDataMaker.SkillName("自分以外のPT人数(ファイト用)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SONIC_ACCELERATION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ソニックアクセラレーション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SUNKEI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("寸勁"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CLOSE_CONFINE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("クローズコンファイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIELD_BOOMERANG_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("シールドブーメラン(SL魂版)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SUPER_NOVICENO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("スーパーノービスの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ONEHAND_QUICKEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ワンハンドクイッケン(SL魂)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HOLY_LIGHT_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ホーリーライト(SL魂版)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SONIC_BLOW_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ソニックブロー(SL魂版)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FULL_ADRENALINE_RUSH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("フルアドレナリンラッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HUNTERNO_TAMASHI_KOKA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ハンターの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BEAST_STRAIFING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ビーストストレイフィング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TENSE_ICHIZISHOKUNO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("転生一次職の魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TOKAKU_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("投擲修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHURIKEN_NAGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)手裏剣投げ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KUNAI_NAGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(△)苦無投げ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FUMASHURIKEN_NAGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(△)風魔手裏剣投げ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZENI_NAGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("銭投げ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TATAMI_GAESHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("畳返し"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KAGETOBI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("影跳び"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KASUMIGIRI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)霞斬り"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KAGEKIRI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(△)影斬り"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_UTSUSEMI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("空蝉"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KAGEBUNSHIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("影分身"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("念"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ISSEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("一閃"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NINPO_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("忍法修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KOUENKA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("紅炎華"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KAENZIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("火炎陣"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RYUENZIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("龍炎陣"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HYOSENSO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("氷閃槍"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SUITON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("水遁"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TSURARAOTOSHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(△)氷柱落し"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FUZIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("風刃"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RAIGEKISAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(△)雷撃砕"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SAKUFU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(△)朔風"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COUNT_OF_COIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("コインの枚数"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FLYING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("フライング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TRIPLE_ACTION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("トリプルアクション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BULLS_EYE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ブルズアイ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MADNESSS_CANCELER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("マッドネスキャンセラー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ADJUSTMENT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("アジャストメント"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_INCREASING_ACCURACY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("インクリージングアキュラシー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAGICAL_BARRET", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("マジカルバレット"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CRACKER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("クラッカー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SINGLE_ACTION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("シングルアクション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SNAKE_EYE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("スネークアイ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHAIN_ACTION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("チェーンアクション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RAPID_SHOWER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ラピッドシャワー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DEATHPERAD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("デスペラード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TRACKING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("トラッキング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DISARM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ディスアーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PIERCING_SHOT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ピアーシングショット"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GATLING_FEVER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ガトリングフィーバー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DUST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ダスト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FULL_BASTER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("フルバスター"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SPREAD_ATTACK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("スプレッドアタック"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GROUND_DRIFT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("グラウンドドリフト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ISSEN_MAX", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("一閃(MaxHP固定)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ENCHANT_BLADE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("エンチャントブレイド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SONIC_WAVE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ソニックウェーブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DEATH_BOUND", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)デスバウンド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HANDRED_SPEAR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ハンドレッドスピア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WIND_CUTTER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ウィンドカッター"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PHANTOM_SLAST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ファントムスラスト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_IGNITION_BREAK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(仮)イグニッションブレイク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DRAGON_TRAINING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ドラゴントレーニング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_DRAGON_BREATH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)ファイアードラゴンブレス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DRAGON_HOWLING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ドラゴンハウリング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RUNE_MASTERY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ルーンマスタリー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GIANT_GROWTH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ジャイアントグロース"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_VITARITY_ACTIVATION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("バイタリティアクティベーション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STORM_BLAST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ストームブラスト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STONE_HARD_SKIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ストーンハードスキン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIGHTING_SPIRIT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ファイティングスピリット"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AVANDANCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("アバンダンス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CRUSH_STRIKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("クラッシュストライク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_REFRESH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("リフレッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MILLENNIUM_SHIELD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ミレニアムシールド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_VENOM_IMPRESS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ベナムインプレス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CROSS_IMPACT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("クロスインパクト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DARK_ILLUSION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ダークイリュージョン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHINDOKU_KENKYU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("新毒研究"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHINDOKU_SEIZO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("新毒製造"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ANTIDOTE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("アンチドート"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_POISONING_WEAPON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ポイズニングウェポン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_VENOM_PRESSURE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ベナムプレッシャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_POISON_SMOKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ポイズンスモーク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WEAPON_BLOCKING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ウェポンブロッキング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COUNTER_SLASH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)カウンタースラッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WEAPON_CRUSH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ウェポンクラッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CLOAKING_EXCEED", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("クローキングエクシード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PHANTOM_MENUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ファントムメナス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HALLUCINATION_WALK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ハルシネーションウォーク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ROLLING_CUTTER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ローリングカッター"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CROSS_RIPPER_SLASHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("クロスリッパースラッシャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_JUDEX", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)ジュデックス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ANCILLA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("アンシラ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ADORAMUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("アドラムス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CLEMENTIA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("クレメンティア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CANTOCANDIDUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("カントキャンディダス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COLUCEO_HEAL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("コルセオヒール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EPICLESIS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("エピクレシス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PRAEFATIO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("プラエファティオ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ORATIO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("オラティオ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LAUDAAGNUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("ラウダアグヌス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LAUDARAMUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("ラウダラムス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EUCHARISTICA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(仮)エウカリスティカ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RENOVATIO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("レノヴァティオ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HIGHNESS_HEAL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ハイネスヒール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CLEARANCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("クリアランス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EXPIATIO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("エクスピアティオ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DUPLELIGHT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("デュプレライト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SILENTIUM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("シレンティウム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SECRAMENT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("サクラメント"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RANGER_MAIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("レンジャーメイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CAMOUFLAGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("カモフラージュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AIMED_BOLT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("エイムドボルト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ARROW_STORM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("アローストーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FEAR_BLEATH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("フィアーブリーズ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TRAP_KENKYU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("トラップ研究"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAGENTA_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("マゼンタトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COBALT_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("コバルトトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_VERDURE_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ヴェルデュールトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAZE_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("メイズトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CLUSTER_BOMB", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("クラスターボム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DETONATOR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("デトネイター"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRING_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ファイアリングトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ICEBOUND_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アイスバウンドトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ELECTRIC_SHOCKER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("エレクトリックショッカー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WUG_MASTERY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ウォーグマスタリー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WUG_BITE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ウォーグバイト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TOOTH_OF_WUG", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("トゥースオブウォーグ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WUG_STRIKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ウォーグストライク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EIBINNA_KYUKAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("鋭敏な嗅覚"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WUG_RIDER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("ウォーグライダー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WUG_DASH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ウォーグダッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WHITE_IN_PRISON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ホワイトインプリズン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOUL_EXPANSION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ソウルエクスパンション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FROST_MISTY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("フロストミスティ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_JACK_FROST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ジャックフロスト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MARSH_OF_ABYSS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("マーシュオブアビス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RECOGNIZED_SPELL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("リコグナイズドスペル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SIENNA_EXEXRATE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("シエナエクセクレイト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RADIUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("ラディウス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STASIS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ステイシス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DRAIN_LIFE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ドレインライフ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CRYMSON_ROCK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("クリムゾンロック"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HELL_INFERNO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ヘルインフェルノ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COMMET", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("コメット"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHAIN_LIGHTNING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("チェーンライトニング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EARTH_STRAIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アースストレイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TETRA_BOLTEX", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("テトラボルテックス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SUMMON_FIRE_BALL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("サモンファイアーボール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SUMMON_WATER_BALL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("サモンウォーターボール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SUMMON_LIGHTNING_BALL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("サモンボールライトニング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SUMMON_STONE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("サモンストーン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RELEASE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(2),
		CSkillDataMaker.SkillName("リリース"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_READING_SPELLBOOK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("リーディングスペルブック"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FREEZING_SPELL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("フリージングスペル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ONO_SHUREN_MECHANIC", skillId);
if (_APPLY_UPDATE_LV200) {
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("斧鍛錬"),
	];
}
else {
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("斧修練"),
	];
}
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AXE_TORNADE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(△)アックストルネード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AXE_BOOMERANG", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アックスブーメラン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_POWER_SWING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)パワースイング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HITO_DAICHINO_KENKYU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("火と大地の研究"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FAW_SILVER_SNIPER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("FAW シルバースナイパー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FAW_MAGIC_DECOY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("FAW マジックデコイ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FAW_KAIZYO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("FAW解除"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MADOGEAR_LICENSE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("魔導ギアライセンス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BOOST_KNUCKLE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ブーストナックル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PILE_BUNKER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("パイルバンカー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_VULCAN_ARM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("バルカンアーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FLAME_THROWER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("フレイムスローワー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COLD_THROWER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("コールドスローワー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ARMS_CANNON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(△)アームズキャノン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ACCELARATION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("アクセラレーション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HOVERING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ホバーリング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FRONTSIDE_SLIDE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("フロントサイドスライド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_REARSIDE_SLIDE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("リアサイドスライド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAINFRAME_KAIZO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("メインフレーム改造"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHAPE_SHIFT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("シェイプシフト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_INFRARED_SCAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("インフラレッドスキャン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ANALYZE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("アナライズ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SELF_DESTRUCTION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("セルフディストラクション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EMERGENCY_COOL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("エマージェンシークール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAGNETIC_FIELD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("マグネティックフィールド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NUTRAL_BARRIER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("ニュートラルバリアー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STEALTH_FIELD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("ステルスフィールド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_REPEAR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("リペア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CANNON_SPEAR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("キャノンスピア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BANISHING_POINT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("バニシングポイント"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TRUMPLE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("トランプル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIELD_PRESS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)シールドプレス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_REFLECT_DAMAGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("リフレクトダメージ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PINGPOINT_ATTACK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ピンポイントアタック"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FORCE_OF_BANGUARD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("フォースオブバンガード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RAGE_BURST_ATTACK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("レイジバーストアタック"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIELD_SPELL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("シールドスペル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EXCEED_BREAK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("イクシードブレイク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_OVER_BLAND", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("オーバーブランド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PRESTAGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("プレスティージ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BANDING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("バンディング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MOON_SLUSHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ムーンスラッシャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RAY_OF_GENESIS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)レイオブジェネシス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PIETY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("パイエティ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EARTH_DRIVE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アースドライブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HESPERUS_SLIT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(仮)ヘスペルスリット"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_INSPIRATION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("インスピレーション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BODY_PAINTING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ボディペインティング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MASKARADE_INOVATION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("マスカレード-エナベーション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MASKARADE_GLOOMY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("マスカレード-グルーミー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MASKARADE_IGNORANCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("マスカレード-イグノアランス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MASKARADE_RAGENESS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("マスカレード-レイジネス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MASKARADE_WEEKNESS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("マスカレード-ウィークネス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MASKARADE_UNLUCKY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("マスカレード-アンラッキー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_REPORDUCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("リプロデュース"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AUTO_SHADOW_SPELL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(仮)オートシャドウスペル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHADOW_FORM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("シャドウフォーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DEADLY_INEFFECT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("デッドリーインフェクト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_INVISIBILITY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(仮)インビジビリティ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MANHOLE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("マンホール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DEMENSION_DOOR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("ディメンションドア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BLOODY_LAST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("ブラッディラスト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FAINT_BOMB", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)フェイントボム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHAOS_PANIC", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("カオスパニック"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAELSTORM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("メイルストーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FATAL_MENUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("フェイタルメナス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STRIP_ACCESSARY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ストリップアクセサリー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TRIANGLE_SHOT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("トライアングルショット"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SORYUKYAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("双龍脚"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TENRACHIMO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("天羅地網"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZIRAISHIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("地雷震"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BAKKISANDAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("爆気散弾"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHURASHINDAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)修羅身弾"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DAITENHOSUI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)大纏崩捶"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GOHO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("號砲"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RASETSU_HAOGEKI_MAX", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("羅刹破凰撃(HPSP固定)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RASETSU_HAOGEKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("羅刹破凰撃(HPSP変動可)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SENPUTAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("旋風腿"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZYUBAKUZIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("呪縛陣"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SENDENPO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("閃電歩"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SENRYU_SHOTEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("潜龍昇天(HPSP+爆裂状態)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SISIKO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("獅子吼"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RAIKODAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("雷光弾"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TENKETSU_MOKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("点穴 -黙-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TENKETSU_KAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("点穴 -快-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TENKETSU_KYU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("点穴 -球-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TENKETSU_HAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("点穴 -反-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TENKETSU_KATSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("点穴 -活-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KYUKIKO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("吸気功"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HASAICHU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("破碎柱"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LESSON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("レッスン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_YASURAGINO_KOMORIUTA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("安らぎの子守唄"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZIGOKUNO_UTA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("地獄の歌"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FUKAKUTEYOSONO_GENGO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("不確定要素の言語"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MELANCHOLY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("メランコリー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SIRENNO_KOE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("セイレーンの声"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZYUNKANSURU_SIZENNO_OTO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("循環する自然の音"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SEISHINO_SAKAIDE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("生死の境で"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHINDOZANKYO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("振動残響"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DOMINION_IMPULSE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ドミニオンインパルス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_METALIC_SOUND", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)メタリックサウンド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SEVERE_RAINSTORM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)シビアレインストーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FUSHANIMUKATTE_TOTSUGEKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("風車に向かって突撃"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ECHONO_UTA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("エコーの歌"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HARMONIZE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ハーモナイズ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TSUKIAKARINO_SERENADE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("月明かりのセレナーデ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KOIBITOTACHINO_TAMENO_SYMPHONY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("恋人たちの為のシンフォニー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SWING_DANCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("スイングダンス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_LERAORNO_TSUYU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("レーラズの露"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BEYOND_OF_WARCRY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ビヨンドオブウォークライ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MANANO_UTA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("マナの歌"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MELODY_OF_THINK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("メロディーオブシンク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DANCE_WITH_WUG", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ダンスウィズウォーグ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FRIDAY_NIGHT_FEVER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("フライデーナイトフィーバー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOUND_OF_DESTRUCTION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("サウンドオブディストラクション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ENDLESS_HUMMING_VOICE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("エンドレスハミングボイス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GREAT_ECHO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)グレートエコー(未検証)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_WALK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ファイアーウォーク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ELECTRIC_WALK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("エレクトリックウォーク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SPELL_FIST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)スペルフィスト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_VACUUM_EXTREME", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("バキュームエクストリーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PSYCHIC_WAVE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("サイキックウェーブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CLOUD_KILL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("クラウドキル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_POISON_BUSTER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ポイズンバスター"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STRIKING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ストライキング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EARTH_GRAVE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アースグレイヴ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DIAMOND_DUST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ダイヤモンドダスト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WARMER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ウォーマー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_VERATURE_SPEAR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)ヴェラチュールスピアー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ARRULLO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アルージョ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SUMMON_AGNI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("サモンアグニ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SUMMON_AQUA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("サモンアクア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SUMMON_VENTOS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("サモンベントス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SUMMON_TERA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("サモンテラ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ELEMENTAL_CONTROL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("エレメンタルコントロール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ELEMENTAL_ACTION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("エレメンタルアクション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ELEMENTAL_ANALYSIS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(2),
		CSkillDataMaker.SkillName("エレメンタルアナライシス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ELEMENTAL_SYMPASY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("エレメンタルシンパシー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ELEMENTAL_CURE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("エレメンタルキュアー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_INSIGNIA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("ファイアーインシグニア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WATER_INSIGNIA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("ウォーターインシグニア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WIND_INSIGNIA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("ウィンドインシグニア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EARTH_INSIGNIA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("アースインシグニア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PILO_TECHNIC", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("パイロテクニック"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CIRCLE_OF_FIRE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("サークルオブファイアー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_ARROW", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ファイアーアロー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HEATER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ヒーター"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_CLOAK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ファイアークローク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_BOMB", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ファイアーボム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TOROPIC", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("トロピック"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_MANTLE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ファイアーマントル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_WAVE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ファイアーウェーブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AQUA_PLAY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("アクアプレイ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WATER_SCREEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ウォータースクリーン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ICE_NEEDLE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("アイスニードル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COOLER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("クーラー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WATER_DROP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ウォータードロップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WATER_SCREW", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ウォータースクリュー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHILLY_AIR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("チリエア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WATER_BARRIER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ウォーターバリア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIDAL_WEAPON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("タイダルウェポン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GAST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ガスト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WIND_STEP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ウィンドステップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WIND_SLASH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ウィンドスラッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BLAST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ブラスト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WIND_CURTAIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ウィンドカーテン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HURRICANE_RAGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ハリケーンレイジ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WILD_STORM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ワイルドストーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_XEPHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ゼファー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAYPHOON_MISSILE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("タイフーンミサイル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PETROLOGY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ペトロロジー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOLID_SKIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ソリッドスキン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STONE_HUMMER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ストーンハンマー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CURSED_SOIL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("カーズドソイル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STONE_SHIELD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ストーンシールド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ROCK_CRUSHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ロッククラッシャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_UP_HIEBAL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("アップヒーバル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_POWER_OF_GAIA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("パワーオブガイア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STONE_RAIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ストーンレイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KEN_SHUREN_GENETIC", skillId);
if (_APPLY_UPDATE_LV200) {
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("剣鍛錬"),
	];
}
else {
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("剣修練"),
	];
}
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CART_KAIZO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("カート改造"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CART_TORNADO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)カートトルネード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CART_CANNON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("カートキャノン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CART_BOOST_GENETIC", skillId);
if (_APPLY_UPDATE_LV200) {
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("改造カートブースト"),
	];
}
else {
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("カートブースト"),
	];
}
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHANGE_MATERIAL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("チェンジマテリアル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SLING_ITEM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("スリングアイテム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SPECIAL_PHARMACY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("スペシャルファーマシー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MIX_COOKING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(2),
		CSkillDataMaker.SkillName("ミックスクッキング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BAKUDAN_SEIZO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(2),
		CSkillDataMaker.SkillName("爆弾製造"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_THORN_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ソーントラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_THORN_WALL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ソーンウォール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CRAZY_WEED", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("クレイジーウィード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BLOOD_SUCKER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ブラッドサッカー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HELLS_PLANT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ヘルズプラント"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HOWLING_OF_MANDRAGORA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ハウリングオブマンドラゴラ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SPORE_EXPLOSION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("スポアエクスプロージョン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DEMONIC_FIRE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("デモニックファイアー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_EXPANSION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ファイアーエクスパンション(Lv5)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MADOGEAR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("魔導ギア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SELF_DESTRUCTION_MAX", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("セルフディストラクション(HPSP固定)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GRAHAM_LIGHT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("デュプレライト(物理)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MIRIAM_LIGHT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("デュプレライト(魔法)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAGIC_SETTING_FOR_AUTO_SPELL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("AS用設定魔法"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIELD_SPELL_ATK_PLUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("シールドスペル(ATK+)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIELD_SPELL_DEF_PLUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("シールドスペル(DEF+)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SKILL_LV_DEFENDER_FOR_PRESTAGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ディフェンダーの習得Lv(プレスティージ用)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAGIC_SETTING_FOR_AUTO_SHADOW_SPELL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ASS用設定魔法"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZENKI_CHUNYU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("全気注入"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SAGENO_TAMASHI_MAHONO_SHUTOKU_LEVEL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("セージの魂(魔法の習得Lv)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HALLUCINATION_WALKGONO_ASPD_GENSHO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ハルシネーション効果後のASPD減"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AUTO_WUG", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("自動狼"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CANCEL_EDP_POISON_ATTACK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(特殊)EDP毒部分を消す[通常はoff]"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SEVERE_RAINSTORM_EX", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)シビアレインストーム(特殊)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COUNT_OF_RG_FOR_BANDING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ロイヤルガードの人数(バンディング用)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DOUBLE_CASTING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ダブルキャスティング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIELD_SPELL_REFLECT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("シールドスペル(反射)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MANA_RECHARGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("マナリチャージ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIELD_SPELL_LV_1", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("シールドスペルLv1(物理)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIELD_SPELL_LV_2", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("シールドスペルLv2(魔法)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHIMEITEKINA_KIZU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("致命的な傷"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ATK_FOR_IRON_NAIL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アイアンネイル用ATK+"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HELL_JUDGEMENT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ヘルジャッジメント"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_YAMIKUMO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("闇雲"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MIGITE_TANREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("右手鍛錬"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HIDARITE_TANREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("左手鍛錬"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZYUMONZIGIRI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)十文字斬り"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_YOMIGAESHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("黄泉返し"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BAKURETSU_KUNAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(△)爆裂苦無"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HAPPO_KUNAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("八方苦無"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FUMASHURIKEN_RANKA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("風魔手裏剣 -乱華-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAKIBISHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("撒菱"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MUCHANAGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(仮)無茶投げ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MEIKYO_SHISUI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("明鏡止水"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GENZYUTSU_KAGEMUSHA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("幻術-影武者-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GENZYUTSU_KYOGAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("幻術-驚愕-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GENZYUTSU_ZYUSATSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("幻術-呪殺-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GENZYUTSU_GENWAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("幻術-幻惑-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_IZAYOI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("十六夜"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HIFU_ENTEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)火符：炎天"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HYOFU_FUBUKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)氷符：吹雪"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FUFU_SEIRAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)風符：青嵐"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DOFU_GOKAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)土符：剛塊"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZYUTSUSHIKI_KAIHO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("術式-解放-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZYUTSUSHIKI_TENKAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("術式-展開-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GENZYUTSU_KAGEFUMI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("幻術-影踏み-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GENZYUTSU_KYOMUNOKAGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("幻術-虚無の影-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GENZYUTSU_BUNSHIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)幻術-分身-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GENZYUTSU_ZANGETSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("幻術-残月-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GENZYUTSU_KOUGETSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("幻術-紅月-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GENZYUTSU_OBOROGENSO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("幻術-朧幻想-"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FU_ELEMENT_OF_FU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("符の属性"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FU_COUNT_OF_FU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("符の数"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HPSPCONF_FOR_GENZYUTSU_ZANGETSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("残月用HpSp設定(前Hp後Sp 偶=偶数 奇=奇数)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WATER_DRAGON_BREATH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)ウォータードラゴンブレス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_UNLIMIT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アンリミット"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_OFFERTORIUM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("オフェルトリウム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DARK_CRAW", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ダーククロー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TELECHINESIS_INSTENCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("テレキネシスインテンス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SENKO_RENGEKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("閃光連撃"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COMBO_SANDAN_MONK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(仮)コンボ計算(三段～)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COMBO_SANDAN_CHAMP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(仮)コンボ計算(三段～)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COMBO_SORYUKYAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(仮)コンボ計算(双龍～)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COMBO_RESERVED_803", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(仮)コンボ計算(～)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COMBO_RESERVED_804", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(仮)コンボ計算(～)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COMBO_RESERVED_805", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(仮)コンボ計算(～)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COMBO_RESERVED_806", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(仮)コンボ計算(～)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COMBO_RESERVED_807", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(仮)コンボ計算(～)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COMBO_RESERVED_808", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(仮)コンボ計算(～)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COMBO_RESERVED_809", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(仮)コンボ計算(～)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EARTH_QUAKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(仮)アースクエイク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAGMA_ILLUPTION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("マグマイラプション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SERE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(仮)精霊"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SERE_MODE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("精霊(モード)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SERE_SUPPORT_SKILL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(仮)精霊(補助スキル)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HOMLV_FOR_PYROCLASTIC", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("SホムのLv(パイロ用)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PYROCLASTIC", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("パイロクラスティック(Sホム)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_OVERED_BOOST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("オーバードブースト(Sホム)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GRANITIC_ARMOR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(仮)グラニティックアーマー(Sホム)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PAIN_KILLER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(仮)ペインキラー(Sホム)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DEFENCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ディフェンス(ホム)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ATK_PLUS_AFTER_SENKO_RENGEKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("閃光連撃終了直後状態(ATK+状態)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RICHS_COIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("リッチズコイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FALLIN_ANGEL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("フォーリンエンジェル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHUTTER_STORM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("シャッターストーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MASS_SPIRAL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("マススパイラル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ETERNAL_CHAIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("エターナルチェーン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HOWLING_MINE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ハウリングマイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_RAIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ファイアーレイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FRICKER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("フリッカー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_DANCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ファイアーダンス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BUNISHING_BASTER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("バニシングバスター"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_UNTIMATERIAL_BLAST", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アンチマテリアルブラスト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_QUICKDRAW_SHOT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("クイックドローショット"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DRAGON_TAIL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ドラゴンテイル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ROUND_TRIP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ラウンドトリップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HEAT_BARREL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ヒートバレル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HEAT_BARREL_COIN_COUNT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ヒートバレルのコイン枚数"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SLUG_SHOT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("スラッグショット"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HAMMER_OF_GOD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ハンマーオブゴッド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CRYMSON_MARKER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("クリムゾンマーカー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PLATINUM_ALTER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("プラチナムアルター"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PLATINUM_ALTER_COIN_COUNT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("プラチナムのコイン枚数"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BIND_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("バインドトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HOWLING_MINE_APPEND", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ハウリングマイン追撃"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AS_QUICKDRAW", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("クイックドローショットの全追撃"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KIHON_SKILL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(9),
		CSkillDataMaker.SkillName("基本スキル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_REDEMPTIO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("レディムプティオ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SIGHT_BLASTER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("サイトブラスター"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GREED", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("グリード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FAKE_ZENY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("フェイクゼニー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_AUTO_GUARD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("オートガード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHRINK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("シュリンク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KIKO_TENI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("気功転移"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CREATE_CONVERTER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("クリエイトコンバータ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FIRE_ELEMENTAL_CHANGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ファイアーエレメンタルチェンジ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WATER_ELEMENTAL_CHANGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ウォーターエレメンタルチェンジ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WIND_ELEMENTAL_CHANGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ウィンドエレメンタルチェンジ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EARTH_ELEMENTAL_CHANGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("アースエレメンタルチェンジ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SEIMEI_RINRI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("生命倫理"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ANSOKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("安息"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CALL_HOMUNCULUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("コールホムンクルス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RESURRECTION_HOMUNCULUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("リザレクションホムンクルス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GANBANTEIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ガンバンテイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BUKISEIREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("武器精錬"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PRESSURE_MISS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("プレッシャー（重複）"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FULL_STRIP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("フルストリップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PRESERVE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("プリザーブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WATASHIWO_SHIBARANAIDE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("私を縛らないで"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HELLMODENO_TUE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ヘルモードの杖"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TSUKIAKARINO_SHITADE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("月明かりの下で"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SEIMEIRYOKU_HENKAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("生命力変換"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SPIDER_WEB", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("スパイダーウェブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WALL_OF_FOG", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ウォールオブフォグ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SLIMPOTION_PITCHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("スリムポーションピッチャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FULL_CHEMICAL_CHARGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("フルケミカルチャージ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHOKUBUTSU_SAIBAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(2),
		CSkillDataMaker.SkillName("植物栽培"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KNIGHTNO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ナイトの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ASSASINNO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アサシンの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PRIESTNO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("プリーストの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HUNTERNO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ハンターの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_WIZARDNO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ウィザードの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BLACKSMITHNO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ブラックスミスの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CRUSADERNO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("クルセイダーの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ROGUENO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ローグの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MONKNO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("モンクの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BARDTO_DANCERNO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("バードとダンサーの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SAGENO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("セージの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ALCHEMISTNO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アルケミストの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KENSENO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("拳聖の魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOULLINKERNO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ソウルリンカーの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FLIP_THE_COIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("フリップザコイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KINGS_GRACE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("キングスグレイス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ESCAPE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("エスケープ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FRIGNO_UTA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("フリッグの歌"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ELEMENTAL_SHIELD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("エレメンタルシールド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ILLUSION_DOOPING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("イリュージョンドーピング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DARK_CROSS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ダーククロス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_INTIMIDATE_FOR_CLONE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("インティミデイト(盗作用Ex)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COMBO_GIGANTSET_JOINT_BEAT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(仮)コンボ計算(ｼﾞｮｲﾝﾄ→SpP→ｿﾆｯｸ)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COMBO_GIGANTSET_SPIRAL_PIERCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(仮)コンボ計算(SpP→ｿﾆｯｸ)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_FULLSLOT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("フルスロットル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DORAM_KIHON_SKILL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ドラム基本スキル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KAMITSUKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("かみつく"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KAKURERU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("かくれる"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HIKKAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("ひっかく"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_UZUKUMARU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("うずくまる"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NYAN_JAMP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("ニャンジャンプ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NYAN_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("にゃん魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOUL_ATTACK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ソウルアタック"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHINSENNA_EBI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("新鮮なエビ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EBI_ZANMAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("エビ三昧"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_OTORO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("大トロ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MAGURO_SHIELD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("マグロシールド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_UMINO_CHIKARA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("海の力"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SEAFOOD_KEI_SHUTOKU_LEVEL_GOKEI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(50),
		CSkillDataMaker.SkillName("シーフード系習得レベル合計"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GROOMING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("グルーミング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NODOWO_NARASU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("のどを鳴らす"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_EBI_PARTY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("エビパーティー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_UMINO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("海の魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MATATABI_LANCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("マタタビランス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MATATABINO_NEKKO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("マタタビの根っこ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_INUHAKKA_METEOR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("イヌハッカメテオ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_INUHAKKA_SHOWER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)イヌハッカシャワー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DAICHINO_CHIKARA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("大地の力"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PLANT_KEI_SHUTOKU_LEVEL_GOKEI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(50),
		CSkillDataMaker.SkillName("プラント系習得レベル合計"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CHATTERING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("チャタリング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MYAUMYAU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ミャウミャウ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_NYAN_GRASS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ニャングラス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DAICHINO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("大地の魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PIKKI_TSUKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ピッキ突き"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ARCLOUSE_DASH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アクラウスダッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAROUNO_KIZU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("タロウの傷"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CARROT_BEAT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("キャロットビート"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SEIMEINO_CHIKARA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("生命の力"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ANIMAL_KEI_SHUTOKU_LEVEL_GOKEI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(50),
		CSkillDataMaker.SkillName("アニマル系習得レベル合計"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KEIKAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("警戒"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MURENO_CHIKARA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("群れの力"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SAVAGENO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("サベージの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SEIMEINO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("生命の魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DAICHINO_TAMASHI_KOKA_MATATABINO_NEKKO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("大地の魂効果(ﾏﾀﾀﾋﾞの根っこ使用後のMATK＋)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DAICHINO_TAMASHI_KOKA_INUHAKKA_SHOWER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("大地の魂効果(ｲﾇﾊｯｶｼｬﾜｰ使用後の完全回避＋)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_DAICHINO_TAMASHI_KOKA_NYAN_GRASS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("大地の魂効果(ニャングラス使用後のMATK＋)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("生命の魂効果(残りHP)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_BREAK_THROUGH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ブレイクスルー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TRANSCENDENCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("トランセンデンス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TENSHISAMA_TASUKETE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("天使さま助けて"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_KIROKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("太陽と月と星の記録"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYOTO_TSUKITO_HOSHINO_ZYOKA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("太陽と月と星の浄化"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYONO_KAMAE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("太陽の構え"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KOEN_KYAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("紅焔脚"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYO_BAKUHATSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("太陽爆発"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAIYONO_HIKARI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("太陽の光"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TSUKINO_KAMAE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("月の構え"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SAKUGETSU_KYAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("朔月脚"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MANGETSU_KYAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("満月脚"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TSUKINO_HIKARI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("月の光"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HOSHINO_KAMAE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("星の構え"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SENKO_KYAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("閃光脚"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RYUSE_RAKKA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("流星落下"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_HOSHINO_HIKARI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("星の光"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_UCHUNO_KAMAE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("宇宙の構え"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZYURYOKU_CHOSE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("重力調節"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHINSE_BAKUHATSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("新星爆発"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SEITE_KORIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("星帝降臨"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOSENO_SHO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("創星の書"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ZIGENNO_SHO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("次元の書"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ESHA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("エスハ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ESPA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("エスパ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ESFU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("エスフ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KAUTO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("カウト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAMASHINO_CHIKUSEKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("魂の蓄積"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAMASHINO_SHUKAKU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("魂の収穫"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAMASHINO_ZYUNKAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(3),
		CSkillDataMaker.SkillName("魂の循環"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAMASHINO_RENKETSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(7),
		CSkillDataMaker.SkillName("魂の連結"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SOUL_ENERGY_KENKYU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ソウルエナジー研究"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIRYO_HYOI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("死霊憑依"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHIRYO_BAKUHATSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("死霊爆発"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAMASHINO_BUNRETSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)魂の分裂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAKANO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("鷹の魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_YOSENO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("妖精の魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_KAGENO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("影の魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_GOLEMNO_TAMASHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ゴーレムの魂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_TAMASHINO_HOKAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)魂の崩壊"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_COUNT_OF_SOUL_ENERGY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(20),
		CSkillDataMaker.SkillName("ソウルエナジーの個数"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_RYUSE_RAKKA_MODE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(2),
		CSkillDataMaker.SkillName("流星落下の計算方法"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PEONY_MAMY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ピオニーマミー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_PISHARI_HERB", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ぴしゃりハーブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SEKAIZYUNO_HOKORI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("世界樹のほこり"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SNOW_FLIP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("スノーフリップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_SHOZIGENKAIRYO_ZOKA_R", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("所持限界量増加Ｒ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_VAMPIRE_GIFT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)ヴァンパイアギフト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_MIWAKUNO_WINK", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("魅惑のウィンク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	// データ移行対応用ダミー定義
	CSkillDataMaker.RegisterId("SKILL_ID_SERIES_SEA_FOOD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("シーフード系スキル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SERIES_PLANT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("プラント系スキル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SERIES_ANIMAL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("アニマル系スキル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_STONE_SKIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ストーンスキン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_CRITICAL_WOUNDS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("クリティカルウーンズ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	CSkillDataMaker.RegisterId("SKILL_ID_ODINNO_CHIKARA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(2),
		CSkillDataMaker.SkillName("オーディンの力"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;



	// 計算プログラム改造用ダミー定義
	CSkillDataMaker.RegisterId("SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("通常攻撃"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TUZYO_KOGEKI_CALC_LEFT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("通常攻撃"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TUZYO_KOGEKI_CALC_KATAR_APPEND", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("x"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	//----------------------------------------------------------------
	// ドラゴンナイト
	//----------------------------------------------------------------

	CSkillDataMaker.RegisterId("SKILL_ID_SERVANT_WEAPON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(△)サーヴァントウェポン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SERVANT_WEAPON_SIGN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("サーヴァントウェポン：サイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SERVANT_WEAPON_PHANTOM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(△)サーヴァントウェポン：ファントム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SERVANT_WEAPON_DEMOLISION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)サーヴァントウェポン：デモリッション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CHARGING_PIERCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)チャージングピアース"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TWOHAND_DEFENDING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)ツーハンドディフェンディング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_HACK_AND_SLASHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)ハックアンドスラッシャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DRAGONIC_AURA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)ドラゴニックオーラ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_MADNESS_CRUSHER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(△)マッドネスクラッシャー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_VIGOR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)ヴィゴール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_STORM_SLASH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(△)ストームスラッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	//----------------------------------------------------------------
	// シャドウクロス
	//----------------------------------------------------------------

	CSkillDataMaker.RegisterId("SKILL_ID_DANCING_KNIFE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ダンシングナイフ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SAVAGE_IMPACT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("サベージインパクト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SHADOW_SENSE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("シャドウセンス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ETERNAL_SLASH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)エターナルスラッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ENCHANTING_SHADOW", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)エンチャンティングシャドウ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_POTENT_VENOM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)ポテントベナム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SHADOW_EXCEED", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)シャドウエクシード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_FATAL_SHADOW_CRAW", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)フェイタルシャドウクロー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SHADOW_STAB", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)シャドウスタブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_IMPACT_CRATER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("インパクトクレーター"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	//----------------------------------------------------------------
	// カーディナル
	//----------------------------------------------------------------

	CSkillDataMaker.RegisterId("SKILL_ID_REPARATIO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)レパラティオ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_MEDIA_REBOTUM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)メディアリボトゥム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DONKI_HON_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)鈍器＆本修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ARUGUTUS_VITA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)アルグトゥスヴィタ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ARUGUTUS_TERUM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)アルグトゥステルム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ARBITRIUM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)アルビトリウム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_PRESENSE_AKYACE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)プレセンスアキエース"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_FIDOS_ANIMUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)フィドスアニムス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_EFIRIGO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)エフィリゴ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CONPETENTIA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)コンペテンティア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_NUMATIC_PROCERA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)ニューマティックプロセラ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DIRECTIO_HEAL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ディレクティオヒール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_RERIGIO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)レリギオ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_BENEDICTUM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ベネディクトゥム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_PETITIO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)ペティティオ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_PETITIO_LEARNED", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)ペティティオ習得レベル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_PHREMEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)フレーメン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	//----------------------------------------------------------------
	// ウィンドホーク
	//----------------------------------------------------------------

	CSkillDataMaker.RegisterId("SKILL_ID_ADVANCED_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アドバンスドトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_WIND_SIGN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ウィンドサイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SHIZEN_SHINWA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)自然親和"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_HAWK_RUSH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ホークラッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_HAWK_MASTERY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ホークマスタリー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CALAMITY_GALE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(×)カラミティゲイル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_HAWK_BOOMERANG", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ホークブーメラン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_GALE_STORM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)ゲイルストーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DEEP_BLIND_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ディープブラインドトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SOLID_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ソリッドトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SWIFT_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("スイフトトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CRESSIVE_VOLT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)クレッシブボルト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_FLAME_TRAP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("フレイムトラップ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	//----------------------------------------------------------------
	// アークメイジ
	//----------------------------------------------------------------

	CSkillDataMaker.RegisterId("SKILL_ID_DEADLY_PROJECTION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)デッドリープロジェクション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DESTRACTIVE_HURRICANE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ディストラクティブハリケーン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CLIMAX_HURRICANE_STATE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("クライマックスハリケーン状態"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_RAIN_OF_CRYSTAL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)レインオブクリスタル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_MYSTERY_ILLUSION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ミステリーイリュージョン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_VIOLENT_QUAKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)バイオレントクエイク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SOUL_VULKUN_STRIKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ソウルバルカンストライク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_STRATUM_TREAMER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ストラタムトレマー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ALL_BLOOM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)オールブルーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CRYSTAL_IMPACT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)クリスタルインパクト"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TORNADE_STORM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)トルネードストーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_FLORAL_FLARE_ROAD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)フローラルフレアロード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CLIMAX", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(△)クライマックス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ASTRAL_STRIKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)アストラルストライク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ROCK_DOWN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ロックダウン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_STORM_CANNON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ストームキャノン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CRYMSON_ARROW", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)クリムゾンアロー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_FROZEN_SLASH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)フローズンスラッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_RYOTETUSE_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("両手杖修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	//----------------------------------------------------------------
	// マイスター
	//----------------------------------------------------------------

	CSkillDataMaker.RegisterId("SKILL_ID_AXE_STOMP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アックスストンプ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_RUSH_QUAKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)ラッシュクエイク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_RUSH_STATE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("ラッシュ状態"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SOCHI_SEIZO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)装置製造"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_KOGEKI_SOCHI_YUKOKA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)攻撃装置有効化"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_BOGYO_SOCHI_YUKOKA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)防御装置有効化"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TWO_AXE_DEFENDING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(△)ツーアックスディフェンディング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ABR_MASTERY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)ABRマスタリー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ABR_BATTLE_WARRIER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("(×)ABR バトルウォリアー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ABR_DUAL_CANNON", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("(×)ABR デュアルキャノン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ABR_MOTHER_NET", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("(×)ABR マザーネット"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ABR_INFINITY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("(×)ABR インフィニティ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	//----------------------------------------------------------------
	// インペリアルガード
	//----------------------------------------------------------------

	CSkillDataMaker.RegisterId("SKILL_ID_GUARD_STANCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ガードスタンス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_GUARDIAN_SHIELD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ガーディアンシールド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_REBOUND_SHIELD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)リバウンドシールド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TATE_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("盾修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_YARI_KATATE_KEN_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("槍＆片手剣修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ATTACK_STANCE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)アタックスタンス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ULTIMATE_SACRIFICE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)アルティメットサクリファイス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_HOLY_SHIELD", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ホーリーシールド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_GRAND_JUDGEMENT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)グランドジャッジメント"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_JUDGEMENT_CROSS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)ジャッジメントクロス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SHIELD_SHOOTING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)シールドシューティング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_OVER_SLASH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)オーバースラッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CROSS_RAIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)クロスレイン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	//----------------------------------------------------------------
	// アビスチェイサー
	//----------------------------------------------------------------

	CSkillDataMaker.RegisterId("SKILL_ID_TANKEN_YUMI_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("短剣＆弓修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_MAHOKEN_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("魔法剣修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_STRIP_SHADOW", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ストリップシャドウ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ABYSS_DAGGER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)アビスダガー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_UNLUCKY_RUSH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)アンラッキーラッシュ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CHAIN_REACTION_SHOT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)チェーンリアクションショット"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_FROM_THE_ABYSS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)フロムジアビス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ABYSS_SLAYER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)アビススレイヤー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_OMEGA_ABYSS_STRIKE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)オメガアビスストライク"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DEFT_STAB", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)デフトスタブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ABYSS_SQUARE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)アビススクエア"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ABYSS_SQUARE_LEARNED_LEVEL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アビススクエア習得Lv"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_FLANGE_SHOT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)フレンジショット"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	//----------------------------------------------------------------
	// インクイジター
	//----------------------------------------------------------------

	CSkillDataMaker.RegisterId("SKILL_ID_KYOZINNA_SHINNEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("強靭な信念"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_KENKONA_SHINNEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("堅固な信念"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SHINKONO_ISHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("信仰の意志"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SEYU_SENRE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)聖油洗礼"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CHUZITSUNA_SHINNEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("忠実な信念"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DAIICHIGEKI_RAKUIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)第一撃：烙印"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DAIISSHO_SHINNENNO_CHIKARA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("第一章：信念の力"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DAISANGEKI_DANZAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)第三撃：断罪"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DAISANGEKI_MEKKAGEKI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)第三撃：滅火撃"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DAISANGEKI_ZYOKA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)第三撃：浄化"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DAINIGEKI_METSUMANO_HI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)第二撃：滅魔の火"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DAINIGEKI_SHINNEN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)第二撃：信念"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DAINIGEKI_SHINPAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)第二撃：審判"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_BAKKA_SHINDAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)爆火神弾"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ENKA_METSUMA_SHINDAN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)炎火滅魔神弾"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DAINISHO_SHIPANSHA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("第二章：審判者"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SAISHUSHO_METSUMANO_HONO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("最終章：滅魔の炎"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	//----------------------------------------------------------------
	// トルバドゥール／トルヴェール
	//----------------------------------------------------------------

	CSkillDataMaker.RegisterId("SKILL_ID_STAGE_MANNER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ステージマナー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_KAISO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("回想"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_MYSTIC_SYMPHONY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ミスティックシンフォニー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SONATA_OF_KUVASIL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("ソナタオブクヴァシル"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ROSE_BLOSSOM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ロゼブロッサム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_RHYTHM_SHOOTING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)リズムシューティング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_METALIC_FURY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)メタリックフューリー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SOUND_BLEND", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)サウンドブレンド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_GEFFENIA_NOCTURNE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ゲフェニアノクターン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_LOKINO_KIMAGURE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ロキの気まぐれ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_KOINNO_RHAPSODY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)鉱員のラプソディ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_MUSICAL_INTERLUDE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ミュージカルインタールード"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_YUYAKENO_SERENADE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)夕焼けのセレナーデ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SHISHATACHIHENO_REQUIEM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)死者たちへのレクイエム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_PRONTERA_MARCH", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)プロンテラマーチ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	//----------------------------------------------------------------
	// エレメンタルマスター
	//----------------------------------------------------------------

	CSkillDataMaker.RegisterId("SKILL_ID_MAHO_HON_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("魔法本修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SPELL_ENCHANTING", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)スペルエンチャンティング"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ACTIVITY_BURN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("アクティビティバーン"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_INCREASING_ACTIVITY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("インクリーシングアクティビティ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_DIAMOND_STORM", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ダイヤモンドストーム"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_LIGHTNING_LAND", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ライトニングランド"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_VENOM_SWAMP", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("ベナムスワンプ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CONFLAGRATION", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("コンフラグレーション"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TERA_DRIVE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("テラドライブ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ELEMENTAL_SPIRIT_MASTERY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)エレメンタルスピリットマスタリー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SUMMON_ALDOR", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(×)サモンアルドール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SUMMON_DILBIO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(×)サモンディルビオ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SUMMON_PROCERA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(×)サモンプロセラ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SUMMON_TELEMOTUS", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(×)サモンテレモトゥス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SUMMON_SERPENSE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(×)サモンサーペンス"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ELEMENTAL_BASTER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("エレメンタルバスター"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ELEMENTAL_VEIL", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("エレメンタルヴェール"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	//----------------------------------------------------------------
	// バイオロ
	//----------------------------------------------------------------

	CSkillDataMaker.RegisterId("SKILL_ID_BIONIC_PHARMACY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)バイオニックファーマシー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_BIONICS_MASTERY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)バイオニックスマスタリー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_HALL_FULL_CHEMICAL_CHARGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)ホールフルケミカルチャージ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_FULL_SHADOW_CHARGE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(4),
		CSkillDataMaker.SkillName("(×)フルシャドウチャージ"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ACIDIFIED_ZONE_MIZU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)アシディファイドゾーン(水)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ACIDIFIED_ZONE_CHI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)アシディファイドゾーン(地)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ACIDIFIED_ZONE_HI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)アシディファイドゾーン(火)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ACIDIFIED_ZONE_KAZE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)アシディファイドゾーン(風)"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CREATE_WOODEN_WARRIER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)クリエイトウドゥンウォリアー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CREATE_WOODEN_FAIRY", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)クリエイトウドゥンフェアリー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CREATE_CREAPER", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)クリエイトクリーパー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_RESEARCH_REPORT", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(×)リサーチレポート"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_CREATE_HELL_TREE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)クリエイトヘルツリー"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	CSkillDataMaker.RegisterId("SKILL_ID_DRAGONIC_AURA_STATE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(1),
		CSkillDataMaker.SkillName("(△)ドラゴニックオーラ状態"),		// TODO: ドラゴンブレスのダメージ増加が未実測
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	//----------------------------------------------------------------
	// 天帝
	//----------------------------------------------------------------

	CSkillDataMaker.RegisterId("SKILL_ID_TENKI_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("天気修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_HYOHO_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("兵法修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TENCHI_ICHIYO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)天地一陽"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TAITEN_ICHIYO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)太天一陽"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TENYO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)天陽"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TENCHI_ICHIGETSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)天地一月"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TAITEN_ICHIGETSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)太天一月"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TENGETSU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)天月"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TENCHI_BANSE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)天地万星"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TENME_RAKUSE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)天命落星"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TENSE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)天星"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TENRA_BANSHO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)天羅万象"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TENKINO_MI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("(×)天気の身"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_UNKONO_ZYOTAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(6),
		CSkillDataMaker.SkillName("(×)運行の状態"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;





	//----------------------------------------------------------------
	// ソウルアセティック
	//----------------------------------------------------------------

	CSkillDataMaker.RegisterId("SKILL_ID_GOFU_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("護符修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_REIDOZYUTSU_SHUREN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("霊道術修練"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SHUGO_FU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)守護符"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_BUSHI_FU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("武士符"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_HOSHI_FU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("法師符"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_GOKON_ISSHIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("護魂一身"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_ZYOKODO", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)城隍堂"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_GOGYO_FU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("五行符"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_REIDO_FU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)霊道符"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SHIRYO_ZYOKA", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)死霊浄化"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SEIRYU_FU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)青龍符"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_BYAKKO_FU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)白虎符"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SUZAKU_FU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)朱雀符"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_GENBU_FU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)玄武符"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SHIHOZIN_FU", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)四方神符"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SHIHO_GOGYO_ZIN", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("(×)四方五行陣"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_TENCHI_SHINRE", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(10),
		CSkillDataMaker.SkillName("天地神霊"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

	CSkillDataMaker.RegisterId("SKILL_ID_SHIHO_FU_ZYOTAI", skillId);
	skillData = [
		skillId,
		CSkillDataMaker.SkillMaxLevel(5),
		CSkillDataMaker.SkillName("四方符状態"),
	];
	SkillObjNew[skillId] = skillData;
	skillId++;

















};





// データ上書き
if (_DATA_CREATE_MODE) {
	CSkillDataMaker.OverrideData();
}

