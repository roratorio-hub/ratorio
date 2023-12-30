
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * 時限アイテムデータ作成クラス.
 */
function CTimeItemDataMaker () {

}

//================================================================
// 時限アイテムデータ定義用ダミー関数
// （可読性を高める目的で使用する）
//================================================================
CTimeItemDataMaker.TimeItemName = function (value) { return value; };
CTimeItemDataMaker.TimeItemExplain = function (value) { return value; };
CTimeItemDataMaker.TimeItemSrcDataArray = function (value) { return value; };

/**
 * IDを定義する.
 * @param name 定数名
 * @param value 定数値
 * @return 定数値
 */
CTimeItemDataMaker.RegisterId = function (name, value) {
	if (name != "TIME_ITEM_ID_UNKNOWN") {
		CGlobalConstManager.DefineEnum("EnumTimeItemId", [name], value, undefined);
	}
	return value;
};





//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** 時限アイテムデータ定義
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

/**
 * データ定義を上書き定義する.
 */
CTimeItemDataMaker.OverrideData = function () {

	var timeItemId = 0;
	var timeItemData = null;

	// データ配列オブジェクトを上書き定義していく
	TimeItemObjNew = new Array();



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_NONE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("装備/カードの時限性補助効果+NPC支援+期間限定"),
		CTimeItemDataMaker.TimeItemExplain("なし"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_NONE, 0],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_AICILA_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("アイシラカード"),
		CTimeItemDataMaker.TimeItemExplain("詠唱-50%、FLEE+30"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_472],
		]),
		ITEM_SP_FLEE_PLUS, 30,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ICE_TITAN_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("アイスタイタンカード"),
		CTimeItemDataMaker.TimeItemExplain("DEF+10"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_484],
		]),
		ITEM_SP_DEF_PLUS, 10,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ATOLOS_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("アトロスカード"),
		CTimeItemDataMaker.TimeItemExplain("ASPD+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ATLOS],
		]),
		ITEM_SP_ASPD_UP, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ANNOLIAN_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("アノリアンカード"),
		CTimeItemDataMaker.TimeItemExplain("集中力向上Lv1（★ステ欄下部注意参照★）"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_224],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ALCHEMIST_CARD_SET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("アルケミスト優遇カードセット"),
		CTimeItemDataMaker.TimeItemExplain("アドレナリンラッシュ(全ての武器)"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_461],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ANSATSUSHANO_DUMASCUS_TOKKO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("暗殺者のダマスカス(特攻)"),
		CTimeItemDataMaker.TimeItemExplain("発勁効果(錐計算)"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_898],
		]),
		ITEM_SP_KIRI_EFFECT, 1,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_IXIONNO_HANE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("イクシオンの羽"),
		CTimeItemDataMaker.TimeItemExplain("ASPD+7%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_EXSIONNO_HANE],
		]),
		ITEM_SP_ASPD_UP, 7,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_VAMBERK_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ヴァンベルクカード"),
		CTimeItemDataMaker.TimeItemExplain("CRI+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_471],
		]),
		ITEM_SP_CRI_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_WOLF_HEZIN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ウルフヘジン"),
		CTimeItemDataMaker.TimeItemExplain("物理被ダメージ20%減少、MDEF-20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_708],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ANGELIC_RING", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("エンジェリックリング"),
		CTimeItemDataMaker.TimeItemExplain("ヒール、サンク、Pピッチャーの回復量+20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1000],
		]),
		ITEM_SP_HEAL_UP_USING, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GLORIOUS_GRENADEGUN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("グロリアスグレネードガン"),
		CTimeItemDataMaker.TimeItemExplain("ASPD+20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1103],
		]),
		ITEM_SP_ASPD_UP, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GLORIOUS_JAMADAHAR", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("グロリアスジャマハダル(+9)"),
		CTimeItemDataMaker.TimeItemExplain("ASPD+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1091],
		]),
		ITEM_SP_ASPD_UP, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GLORIOUS_TABLET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("グロリアスタブレット"),
		CTimeItemDataMaker.TimeItemExplain("ATK+200"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1094],
		]),
		ITEM_SP_ATK_PLUS, 200,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GLORIOUS_FUMASHURIKEN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("グロリアス風魔手裏剣"),
		CTimeItemDataMaker.TimeItemExplain("風魔手裏剣投げと一閃のダメージ+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1098],
		]),
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_FUMASHURIKEN_NAGE, 100,
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_ISSEN, 100,
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_ISSEN_MAX, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GLORIOUS_BLOODY_ROAR", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("グロリアスブラッディロア(+9)"),
		CTimeItemDataMaker.TimeItemExplain("ASPD+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1090],
		]),
		ITEM_SP_ASPD_UP, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_KOENNO_TWINEDGE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("紅炎のツインエッジ"),
		CTimeItemDataMaker.TimeItemExplain("一般モンスターの防御力無視"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_933],
		]),
		ITEM_SP_PENETRATE_DEF, 1,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_KOKKOCHAN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("こっこちゃん"),
		CTimeItemDataMaker.TimeItemExplain("ラウドボイス"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1012],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SABAKUNO_YUGURE_KAZE_SET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("砂漠の夕暮れ+砂漠の風セット"),
		CTimeItemDataMaker.TimeItemExplain("ASPD+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_818],
		]),
		ITEM_SP_ASPD_UP, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHADOW_GUARD_WALKER_SET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("シャドウガード+ウォーカーセット"),
		CTimeItemDataMaker.TimeItemExplain("FLEE+20"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_995],
		]),
		ITEM_SP_FLEE_PLUS, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SENTO_FUMASHURIKEN_TOKKO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("戦闘風魔手裏剣(特攻)"),
		CTimeItemDataMaker.TimeItemExplain("風魔手裏剣投げと一閃のダメージ+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_931],
		]),
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_FUMASHURIKEN_NAGE, 100,
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_ISSEN, 100,
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_ISSEN_MAX, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SOENNO_TWINEDGE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("蒼炎のツインエッジ"),
		CTimeItemDataMaker.TimeItemExplain("一般モンスターの防御力無視"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_932],
		]),
		ITEM_SP_PENETRATE_DEF, 1,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SOLDIER_GATLINGGUN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ソルジャーガトリングガン"),
		CTimeItemDataMaker.TimeItemExplain("ATK+80"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_927],
		]),
		ITEM_SP_ATK_PLUS, 80,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SOLDIER_GRENADEGUN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ソルジャーグレネードガン"),
		CTimeItemDataMaker.TimeItemExplain("ATK+300"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_929],
		]),
		ITEM_SP_ATK_PLUS, 300,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SOLDIER_HANDGUN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ソルジャーハンドガン"),
		CTimeItemDataMaker.TimeItemExplain("ASPD+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_925],
		]),
		ITEM_SP_ASPD_UP, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_TEGRYON", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("テグリョン(JobLV70)"),
		CTimeItemDataMaker.TimeItemExplain("ATK+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_TEGRYONG],
		]),
		ITEM_SP_ATK_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_TOSHINO_BATTLE_FIST_YUMO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("闘士のバトルフィスト(勇猛)"),
		CTimeItemDataMaker.TimeItemExplain("阿修羅覇凰拳の詠唱-100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_916],
		]),
		ITEM_SP_SKILL_CAST_TIME_OFFSET + SKILL_ID_ASHURA_HAOKEN, 100,
		ITEM_SP_SKILL_CAST_TIME_OFFSET + SKILL_ID_ASHURA_HAOKEN_SPKOTEI, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_NAGANO_UROKO_YOROI", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ナーガの鱗鎧"),
		CTimeItemDataMaker.TimeItemExplain("ATK+20"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_989],
		]),
		ITEM_SP_ATK_PLUS, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_NOBLE_HAT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ノーブルハット"),
		CTimeItemDataMaker.TimeItemExplain("アドレナリンラッシュ(全ての武器)"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1129],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_VIOLET_FEAR", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("バイオレットフィアー"),
		CTimeItemDataMaker.TimeItemExplain("一般モンスターの防御力無視"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_935],
		]),
		ITEM_SP_PENETRATE_DEF, 1,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_BLOODY_EAT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ブラッディイート"),
		CTimeItemDataMaker.TimeItemExplain("CRI+100、ATK+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_819],
		]),
		ITEM_SP_CRI_PLUS, 100,
		ITEM_SP_ATK_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_BLUE_RIBBON", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ブルーリボン"),
		CTimeItemDataMaker.TimeItemExplain("集中力向上Lv2（★ステ欄下部注意参照★）"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_885],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_HODREMRIN_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ホドレムリンカード"),
		CTimeItemDataMaker.TimeItemExplain("完全回避+30"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_467],
		]),
		ITEM_SP_LUCKY_PLUS, 30,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_MISRIL_MAGIC_MANT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ミスリルマジックマント"),
		CTimeItemDataMaker.TimeItemExplain("魔法被ダメージ20%減少、DEF-20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_709],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_RING_OF_FLAME_LORD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("リングオブフレームロード"),
		CTimeItemDataMaker.TimeItemExplain("爆裂波動Lv1"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_728],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SEIREN_VENSER_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("セイレン=ウィンザー(MVP)カード"),
		CTimeItemDataMaker.TimeItemExplain("バーサーク"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_SEIREN_VIENSER_MVP],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SOLDIER_SHOTGUN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ソルジャーショットガン"),
		CTimeItemDataMaker.TimeItemExplain("ATK+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_928],
		]),
		ITEM_SP_ATK_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_VAINA", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ヴァイナ"),
		CTimeItemDataMaker.TimeItemExplain("物理与ダメージ+10%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1157],
		]),
		ITEM_SP_PHYSICAL_DAMAGE_UP, 10,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_RUBEL", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ルーベル"),
		CTimeItemDataMaker.TimeItemExplain("バッシュ/ボウリングバッシュのダメージ+20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1158],
		]),
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_BASH, 20,
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_BOWLING_BASH, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_CHRONOS", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("クロノス"),
		CTimeItemDataMaker.TimeItemExplain("MATK+12%/SP消費量+20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_CHRONOS],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP, 12,
		ITEM_SP_COST_DOWN, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_NEMESIS", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ネメシス"),
		CTimeItemDataMaker.TimeItemExplain("ATK+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_820],
		]),
		ITEM_SP_ATK_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_DUNAIL_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ドゥネイールカード"),
		CTimeItemDataMaker.TimeItemExplain("完全回避+10"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_544],
		]),
		ITEM_SP_LUCKY_PLUS, 10,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_RATATOSK_CAD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ラタトスクカード"),
		CTimeItemDataMaker.TimeItemExplain("固定詠唱-50%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_545],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_FIRA_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("フィラカード"),
		CTimeItemDataMaker.TimeItemExplain("CRI+20"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_547],
		]),
		ITEM_SP_CRI_PLUS, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_IGNIS_CAP", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("イグニスキャップ"),
		CTimeItemDataMaker.TimeItemExplain("一般モンスターの防御力無視"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1461],
		]),
		ITEM_SP_PENETRATE_DEF, 1,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_RUDO_MASK", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ルードマスク"),
		CTimeItemDataMaker.TimeItemExplain("ラウドボイス"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1468],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHINPANNO_MACE_PHYSICAL", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("審判のメイス"),
		CTimeItemDataMaker.TimeItemExplain("悪魔への物理+20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1569],
		]),
		ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHINPANNO_MACE_MAGICAL", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("審判のメイス"),
		CTimeItemDataMaker.TimeItemExplain("悪魔への魔法+20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1569],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHINPANNO_MACE_2_PHYSICAL", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("審判のメイスII"),
		CTimeItemDataMaker.TimeItemExplain("悪魔への物理+40%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1571],
		]),
		ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON, 40,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHINPANNO_MACE_2_MAGICAL", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("審判のメイスII"),
		CTimeItemDataMaker.TimeItemExplain("悪魔への魔法+40%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1571],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON, 40,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_PEOTH_SET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ペオースセット"),
		CTimeItemDataMaker.TimeItemExplain("コンセントレイションのAspd+2"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1586],
		]),
		ITEM_SP_ASPD_PLUS, 2,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHIRAHANO_MANT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("白羽のマント"),
		CTimeItemDataMaker.TimeItemExplain("FLEE+20"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1602],
		]),
		ITEM_SP_FLEE_PLUS, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_NAGANO_UROKOTATE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ナーガの鱗盾"),
		CTimeItemDataMaker.TimeItemExplain("盾精錬値×3%を物理反射"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_993],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHIBAINUBO_SET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("柴犬帽(黒)+忠節の首輪"),
		CTimeItemDataMaker.TimeItemExplain("(仮)Atk+(30+30x頭精錬値)"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1683],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_VNDER_CANMER_SHUCHURYOKU_KOZYO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ヴンダーカンマー"),
		CTimeItemDataMaker.TimeItemExplain("集中力向上Lv5（★ステ欄下部注意参照★）"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1404],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_VNDER_CANMER_BAKURETSU_HADO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ヴンダーカンマー"),
		CTimeItemDataMaker.TimeItemExplain("爆裂波動Lv3"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1404],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_RALF_FONG_TWIEGE_666", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ラルフ・フォン・ツィーゲ666世"),
		CTimeItemDataMaker.TimeItemExplain("アドレナリンラッシュ(全ての武器)"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1746],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_VALKYRIE_CIRCLET_SET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ヴァルキリーサークレットSET"),
		CTimeItemDataMaker.TimeItemExplain("ランドグリス変化(Hit-10)"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1786],
		]),
		ITEM_SP_HIT_PLUS, -10,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHISHIONO_KABUTO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("獅子王の兜"),
		CTimeItemDataMaker.TimeItemExplain("ラウドボイス"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1814],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_PIAMET_CHANGE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ピアメット変化"),
		CTimeItemDataMaker.TimeItemExplain("ピアメットのリボン精錬値3毎にMatk+5"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1886],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV2", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("オウルデュークのシルクハット"),
		CTimeItemDataMaker.TimeItemExplain("魔法力増幅Lv2"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1889],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_OKAMIMOYONO_TEKKO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("狼紋様の手甲"),
		CTimeItemDataMaker.TimeItemExplain("ATK+100,FLEE-50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_1988],
		]),
		ITEM_SP_ATK_PLUS, 100,
		ITEM_SP_FLEE_PLUS, -50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV4", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("オウルデュークのシルクハットSet"),
		CTimeItemDataMaker.TimeItemExplain("魔法力増幅Lv4"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_2021],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV6", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("オウルデュークのシルクハットSet"),
		CTimeItemDataMaker.TimeItemExplain("魔法力増幅Lv6"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_2022],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_KITSUNE_SUZU_RIBBON", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("狐耳鈴リボン"),
		CTimeItemDataMaker.TimeItemExplain("月夜花変化(Cri+100,遠距離物理+5%)"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_2085],
		]),
		ITEM_SP_CRI_PLUS, 100,
		ITEM_SP_LONGRANGE_DAMAGE_UP, 5,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_NEKOMIMI_BERET_SET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ネコミミベレーset"),
		CTimeItemDataMaker.TimeItemExplain("ワイルドローズに変身(All Status+8)"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_2103],
		]),
		ITEM_SP_ALLSTATUS_PLUS_FOR_SET, 8,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_DATENSHINO_TATE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("堕天使の盾"),
		CTimeItemDataMaker.TimeItemExplain("ディレイ-10%～"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_2118],
		]),
		ITEM_SP_SKILL_DELAY_DOWN, 10,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_BERET_BOSS_BOSHI", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ベレーBOSS帽子(キングポリン変化)"),
		CTimeItemDataMaker.TimeItemExplain("小中大へ物理+20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_NONE, 0],
		]),
		ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL, 20,
		ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM, 20,
		ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_DULGER_HYUKKENOFUKU", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ドゥルガー+ヒュッケ服"),
		CTimeItemDataMaker.TimeItemExplain("一般モンスターの防御力無視"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_2171],
		]),
		ITEM_SP_PENETRATE_DEF, 1,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_AKUMA_BARAINO_SHO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("悪魔祓いの書"),
		CTimeItemDataMaker.TimeItemExplain("魔法防御力無視"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_2178],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_RANDEL_ROLENCE_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ランデル=ロレンスカード"),
		CTimeItemDataMaker.TimeItemExplain("オートガードLv3"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_719],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ATAMANORI_FEERIL_FUYUSURU_KENZYANO_ISHI_SET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("頭フィーリル+浮遊する賢者"),
		CTimeItemDataMaker.TimeItemExplain("ASPD+2,全武器DA_Lv10"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_FUYUSURU_KENZYONO_ISHI_ATAMANOSE_FIRIL],
		]),
		ITEM_SP_ASPD_PLUS, 2,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_EIYUNO_KONSEKI_SUPPORT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("■(期間限定)英雄支援"),
		CTimeItemDataMaker.TimeItemExplain("英雄の痕跡+20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_NONE, 0],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GEFFEN_MAHOTAIKAI_SUPPORT_ATK", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("▲(NPC)ゲフェン魔法大会支援"),
		CTimeItemDataMaker.TimeItemExplain("人間形ATK+10%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_NONE, 0],
		]),
		ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN, 10,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GEFFEN_MAHOTAIKAI_SUPPORT_MATK", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("▲(NPC)ゲフェン魔法大会支援"),
		CTimeItemDataMaker.TimeItemExplain("人間形Matk+10%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_NONE, 0],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN, 10,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GEFFEN_MAHOTAIKAI_SUPPORT_RESIST", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("▲(NPC)ゲフェン魔法大会支援"),
		CTimeItemDataMaker.TimeItemExplain("人間形耐性+10%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_NONE, 0],
		]),
		ITEM_SP_RESIST_RACE_HUMAN, 10,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_BANIRMIRTBO_FUYUSURU_KENZYANO_ISHI", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("バニル帽＋浮遊する賢者の石"),
		CTimeItemDataMaker.TimeItemExplain("ダブルキャスティングLv1"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_FUYUSURU_KENZYONO_ISHI_BANIRMIRT_BO],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SURVIVAL_CIRCLET_SET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("サバイバルサークレットSET"),
		CTimeItemDataMaker.TimeItemExplain("変動詠唱時間-50%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_2339],
		]),
		ITEM_SP_SKILL_CAST_TIME, -50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_YUSHANO_HIDDEN_CLOTH", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("勇者のヒドゥンクロース"),
		CTimeItemDataMaker.TimeItemExplain("Cri+20,Flee+20,Atk+10%,Matk+10%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_YUSHANO_HIDDEN_CLOTH],
		]),
		ITEM_SP_CRI_PLUS, 20,
		ITEM_SP_FLEE_PLUS, 20,
		ITEM_SP_PHYSICAL_DAMAGE_UP, 10,
		ITEM_SP_MAGICAL_DAMAGE_UP, 10,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ECLAGE_ORBE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("▲(NPC)エクラージュ オーブ支援"),
		CTimeItemDataMaker.TimeItemExplain("ステータス+6(料理扱い),AtkとMatk+24"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_NONE, 0],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_12TH_ANIVERSERY_SUPPORT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("■(期間限定)12thアニバ星座支援"),
		CTimeItemDataMaker.TimeItemExplain("与ダメ+30%/被ダメ-40%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_NONE, 0],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_RUEEZENO_AKAIKUTSU_PERMET_TURTLE_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ルイーゼの赤い靴+パーメットC"),
		CTimeItemDataMaker.TimeItemExplain("Def+200,Mdef+20"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_2408],
		]),
		ITEM_SP_DEF_PLUS, 200,
		ITEM_SP_MDEF_PLUS, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_AWL_VAICAUNTNO_SILKHAT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("オウルヴァイカウントのシルクハット"),
		CTimeItemDataMaker.TimeItemExplain("攻撃速度上昇"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_2413],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHADOW_STUFF", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("シャドウスタッフ"),
		CTimeItemDataMaker.TimeItemExplain("ヘルインフェルノの詠唱時間-30%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_SHADOW_STUFF],
		]),
		ITEM_SP_SKILL_CAST_TIME_OFFSET + SKILL_ID_HELL_INFERNO, 30,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_IORNE_STUFF", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("アイオーンスタッフ"),
		CTimeItemDataMaker.TimeItemExplain("リリース後1秒魔法威力UP。ﾘﾘｰｽ後のため魔法力増幅無効"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_AEON_STUFF],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SARANO_ROBE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("サラのローブ"),
		CTimeItemDataMaker.TimeItemExplain("鎧精錬値1上がる度にMatk+8"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_SARANO_ROBE],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_FURUBITA_BALLERINANO_KAMIKAZARI", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("古びたバレリーナの髪飾り"),
		CTimeItemDataMaker.TimeItemExplain("シビアレインストームのダメージ+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_FURUBITA_BALLERINA],
		]),
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_SEVERE_RAINSTORM, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_FURUBITA_BLAZING_SOUL", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("古びたブレイジングソウル"),
		CTimeItemDataMaker.TimeItemExplain("詠唱時間-100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_FURUBITA_BLAZINGSOUL],
		]),
		ITEM_SP_SKILL_CAST_TIME, -100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_FURUBITA_MINSTRELSONGNO_BOSHI", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("古びたミンストレルソングの帽子"),
		CTimeItemDataMaker.TimeItemExplain("シビアレインストームのダメージ+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_FURUBITA_BALLERINA],
		]),
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_SEVERE_RAINSTORM, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_FURUBITA_SHADOW_CROWN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("古びたシャドウクラウン"),
		CTimeItemDataMaker.TimeItemExplain("DEX+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_FURUBITA_SHADOWCROWN],
		]),
		ITEM_SP_DEX_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_LEASER_OF_EAGLE_DELAY_CUT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("レーザーオブイーグル"),
		CTimeItemDataMaker.TimeItemExplain("セシル=ディモン変化(スキルディレイ-100%)"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_LASEROF_EAGLE],
		]),
		ITEM_SP_SKILL_DELAY_DOWN, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_LEASER_OF_EAGLE_TRUE_SIGHT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("レーザーオブイーグル"),
		CTimeItemDataMaker.TimeItemExplain("セシル=ディモン変化後のトゥルーサイトLv2"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_LASEROF_EAGLE],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_S_ATK", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("S-Atk"),
		CTimeItemDataMaker.TimeItemExplain("ATK+150"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_S_ATK],
		]),
		ITEM_SP_ATK_PLUS, 150,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_S_MATK", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("S-Matk"),
		CTimeItemDataMaker.TimeItemExplain("MATK+150"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_S_MATK],
		]),
		ITEM_SP_MATK_PLUS_TYPE_NOTSTUFF, 150,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_S_AVOID", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("S-Avoid"),
		CTimeItemDataMaker.TimeItemExplain("完全回避+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_S_AVOID],
		]),
		ITEM_SP_LUCKY_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_S_MAXHP", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("S-MaxHP"),
		CTimeItemDataMaker.TimeItemExplain("MaxHP+7500,HP+7500"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_S_MAXHP],
		]),
		ITEM_SP_MAXHP_PLUS, 7500,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_S_QUICK", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("S-Quick"),
		CTimeItemDataMaker.TimeItemExplain("詠唱時間-100%,スキルディレイ-100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_S_QUICK],
		]),
		ITEM_SP_SKILL_CAST_TIME, -100,
		ITEM_SP_SKILL_DELAY_DOWN, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_S_CRI", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("S-Cri"),
		CTimeItemDataMaker.TimeItemExplain("Cri+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_S_CRI],
		]),
		ITEM_SP_CRI_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHADOW_RING", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("シャドウリング"),
		CTimeItemDataMaker.TimeItemExplain("トライアングルショット強化"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_SHADOW_RING],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_POWERED_SET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("パワードセット"),
		CTimeItemDataMaker.TimeItemExplain("被弾時スキルディレイ-30%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_POWERED_SET],
		]),
		ITEM_SP_SKILL_DELAY_DOWN, 30,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHIPPU", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("疾風"),
		CTimeItemDataMaker.TimeItemExplain("攻撃速度+70%、詠唱時間-70%、ｽｷﾙﾃﾞｨﾚｲ-70%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SHIPPU],
		]),
		ITEM_SP_ASPD_UP, 70,
		ITEM_SP_SKILL_CAST_TIME, -70,
		ITEM_SP_SKILL_DELAY_DOWN, 70,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_TENCHI", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("天地"),
		CTimeItemDataMaker.TimeItemExplain("詠唱時間-70%、ｽｷﾙﾃﾞｨﾚｲ-70%、敵のDef・Mdef100%無視"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_TENCHI],
		]),
		ITEM_SP_SKILL_CAST_TIME, -70,
		ITEM_SP_SKILL_DELAY_DOWN, 70,
		ITEM_SP_IGNORE_DEF_ALL, 100,
		ITEM_SP_IGNORE_MDEF_ALL, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_LOLANO_TEKKYU_SET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ローラの鎖鉄球セット"),
		CTimeItemDataMaker.TimeItemExplain("敵のDef100%無視"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_LOLANO_KUSARITEKKYU_CHINURARETA_TEKKYU],
		]),
		ITEM_SP_IGNORE_DEF_ALL, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_RUDONO_ROLLPAPER", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ルドのロールペーパー"),
		CTimeItemDataMaker.TimeItemExplain("聖属性魔法攻撃で与えるダメージ+10%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_RUDONO_ROLLPAPER],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY, 10,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_RUDO_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ルドカード"),
		CTimeItemDataMaker.TimeItemExplain("Agi+44"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_RUDO],
		]),
		ITEM_SP_AGI_PLUS, 44,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_AVENGER_CLAYMORE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("アヴェンジャークレイモア"),
		CTimeItemDataMaker.TimeItemExplain("スキルディレイ-100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_AVENGER_CLAYMORE],
		]),
		ITEM_SP_SKILL_DELAY_DOWN, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_AVENGER_BLOODYROAR", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("アヴェンジャーブラッディロア"),
		CTimeItemDataMaker.TimeItemExplain("Atk+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_AVENGER_BLOODYROAR],
		]),
		ITEM_SP_ATK_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_AVENGER_GRENADEGUN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("アヴェンジャーグレネードガン"),
		CTimeItemDataMaker.TimeItemExplain("攻撃速度+20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_AVENGER_GRENADEGUN],
		]),
		ITEM_SP_ASPD_UP, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_RISUMIMI_HOODBO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("リス耳フード帽"),
		CTimeItemDataMaker.TimeItemExplain("クリティカル攻撃で与えるダメージ+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_RISUMIMI_HOODBO],
		]),
		ITEM_SP_CRITICAL_DAMAGE_UP, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SUITEN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("水天"),
		CTimeItemDataMaker.TimeItemExplain("詠唱時間-70%、スキルディレイ-70%、消費SP-70%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SUITEN],
		]),
		ITEM_SP_SKILL_CAST_TIME, -70,
		ITEM_SP_SKILL_DELAY_DOWN, 70,
		ITEM_SP_COST_DOWN, 70,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ROKINO_ASSASIN_MASK", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ロキのアサシンマスク"),
		CTimeItemDataMaker.TimeItemExplain("Agi + 10、Atk + 10"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_ROKINO_ASSASIN_MASK],
		]),
		ITEM_SP_AGI_PLUS, 10,
		ITEM_SP_ATK_PLUS, 10,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN_BERSERK", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("盗賊のすすめ第一巻"),
		CTimeItemDataMaker.TimeItemExplain("バーサークLv1"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN_OVER_TRUST_MAX", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("盗賊のすすめ第一巻"),
		CTimeItemDataMaker.TimeItemExplain("オーバートラストマックスLv5"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN_MAHORYOKU_ZOFUKU", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("盗賊のすすめ第一巻"),
		CTimeItemDataMaker.TimeItemExplain("魔法力増幅Lv5"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_TOKIMAZYUTSUSHINO_ROBE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("時魔術師のローブ"),
		CTimeItemDataMaker.TimeItemExplain("Int+3×精錬値"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_TOKIMAZYUTSUSHINO_ROBE],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_HIMAWARI_SHONEN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ひまわり少年"),
		CTimeItemDataMaker.TimeItemExplain("メテオストームで与えるダメージ+60%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_HIMAWARI_SHONEN],
		]),
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_METEOR_STORM, 60,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_JULIET_DE_RACHEL", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ジュリエットディレイチェル"),
		CTimeItemDataMaker.TimeItemExplain("Atk+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_JULIET_DE_RACHEL],
		]),
		ITEM_SP_ATK_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GOFUSEKI_PEORTH_SET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("業風石ペオースセット"),
		CTimeItemDataMaker.TimeItemExplain("スキルディレイ-70%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_GOFUSEKI_PEORTH_SET],
		]),
		ITEM_SP_SKILL_DELAY_DOWN, 70,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_RUNE_KNIGHT_SEIREN_CARD_RUNE_KNIGHT_SEIREN_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ルーンナイトセイレンセット"),
		CTimeItemDataMaker.TimeItemExplain("Vit+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_RUNE_KNIGHT_SEIREN_RUNE_KNIGHT_SEIREN_MVP],
		]),
		ITEM_SP_VIT_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_WARLOCK_CATHERINE_CARD_WARLOCK_CATHERINE_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ウォーロックカトリーヌセット"),
		CTimeItemDataMaker.TimeItemExplain("Int+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_WARLOCK_CATHERINE_WARLOCK_CATHERINE_MVP],
		]),
		ITEM_SP_INT_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_RANGER_CECIL_CARD_RANGER_CECIL_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("レンジャーセシルセット"),
		CTimeItemDataMaker.TimeItemExplain("Dex+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_RANGER_CECIL_RANGER_CECIL_MVP],
		]),
		ITEM_SP_DEX_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ARCH_BISHOP_MARGARETTE_CARD_ARCH_BISHOP_MARGARETTE_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("アークビショップマーガレッタセット"),
		CTimeItemDataMaker.TimeItemExplain("ヒール回復量+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_ARCH_BISHOP_MARGARETTE_ARCH_BISHOP_MARGARETTE_MVP],
		]),
		ITEM_SP_HEAL_UP_USING, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GUILLOTINE_CROSS_ELEMES_CARD_GUILLOTINE_CROSS_ELEMES_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ギロチンクロスエレメスセット"),
		CTimeItemDataMaker.TimeItemExplain("Agi+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_GUILLOTINE_CROSS_ELEMES_GUILLOTINE_CROSS_ELEMES_MVP],
		]),
		ITEM_SP_AGI_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_MECHANIC_HAWARD_CARD_MECHANIC_HAWARD_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("メカニックハワードセット"),
		CTimeItemDataMaker.TimeItemExplain("Luk+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_MECHANIC_HAWARD_MECHANIC_HAWARD_MVP],
		]),
		ITEM_SP_LUK_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ROYAL_GUARD_RANDEL_CARD_ROYAL_GUARD_RANDEL_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ロイヤルガードランデルセット"),
		CTimeItemDataMaker.TimeItemExplain("Vit+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_ROYAL_GUARD_RANDEL_ROYAL_GUARD_RANDEL_MVP],
		]),
		ITEM_SP_VIT_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SORCERER_CERIA_CARD_SORCERER_CERIA_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ソーサラーセリアセット"),
		CTimeItemDataMaker.TimeItemExplain("Int+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_SORCERER_CERIA_SORCERER_CERIA_MVP],
		]),
		ITEM_SP_INT_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_MINSTREL_ARFOSIO_CARD_MINSTREL_ARFOSIO_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ミンストレルアルフォシオセット"),
		CTimeItemDataMaker.TimeItemExplain("Dex+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_MINSTREL_ARFOSIO_MINSTREL_ARFOSIO_MVP],
		]),
		ITEM_SP_DEX_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_WANDERER_TRENTINI_CARD_WANDERER_TRENTINI_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ワンダラートレンティーニセット"),
		CTimeItemDataMaker.TimeItemExplain("Dex+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_WANDERER_TRENTINI_WANDERER_TRENTINI_MVP],
		]),
		ITEM_SP_DEX_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHURA_CHENG_CARD_SHURA_CHENG_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("修羅チェンセット"),
		CTimeItemDataMaker.TimeItemExplain("Str+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_SHURA_CHENG_SHURA_CHENG_MVP],
		]),
		ITEM_SP_STR_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHADOW_CHASER_GARTY_CARD_SHADOW_CHASER_GARTY_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("シャドウチェイサーガーティセット"),
		CTimeItemDataMaker.TimeItemExplain("Agi+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_SHADOW_CHASER_GARTY_SHADOW_CHASER_GARTY_MVP],
		]),
		ITEM_SP_AGI_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GENETIC_EMUR_CARD_GENETIC_EMUR_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ジェネティックエミュールセット"),
		CTimeItemDataMaker.TimeItemExplain("Luk+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_GENETIC_EMUR_GENETIC_EMUR_MVP],
		]),
		ITEM_SP_LUK_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_AVENGER_JAMADAHAR", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("アヴェンジャージャマダハル"),
		CTimeItemDataMaker.TimeItemExplain("クリダメ+20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_AVENGER_JAMADHAR],
		]),
		ITEM_SP_CRITICAL_DAMAGE_UP, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_HYAKKA", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("百火"),
		CTimeItemDataMaker.TimeItemExplain("詠唱時間-70%、ｽｷﾙﾃﾞｨﾚｲ-70%、物理魔法ダメ+70%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_HYAKKA],
		]),
		ITEM_SP_SKILL_CAST_TIME, -70,
		ITEM_SP_SKILL_DELAY_DOWN, 70,
		ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL, 70,
		ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_ALL, 70,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHINRINO_KAIHO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("真理の解放"),
		CTimeItemDataMaker.TimeItemExplain("完全回避+100、対ボス魔法ダメ+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SHINRINO_KAIHO],
		]),
		ITEM_SP_LUCKY_PLUS, 100,
		ITEM_SP_MAGICAL_DAMAGE_UP_BOSS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHAKUNETSUNO_KEN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("灼熱の剣"),
		CTimeItemDataMaker.TimeItemExplain("一般ﾓﾝｽﾀｰのDef100%無視"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_SHAKUNETSUNO_KEN],
		]),
		ITEM_SP_IGNORE_DEF_NOTBOSS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_NARAKUNO_KEN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("奈落の剣"),
		CTimeItemDataMaker.TimeItemExplain("一般ﾓﾝｽﾀｰのDef100%無視"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_NARAKUNO_KEN],
		]),
		ITEM_SP_IGNORE_DEF_NOTBOSS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ZYOKANO_KEN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("浄化の剣"),
		CTimeItemDataMaker.TimeItemExplain("一般ﾓﾝｽﾀｰのDef100%無視"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_ZYOKANO_KEN],
		]),
		ITEM_SP_IGNORE_DEF_NOTBOSS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHUGEKISHANO_ROBE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("襲撃者のローブ"),
		CTimeItemDataMaker.TimeItemExplain("魔法ﾀﾞﾒｰｼﾞ精錬値%UP"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_SHUGEKISHANO_ROBE],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_CUTIE_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("CUTIEカード"),
		CTimeItemDataMaker.TimeItemExplain("ASPD+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_CUTIE],
		]),
		ITEM_SP_ASPD_UP, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GODS_SWORD_ONRYOBUSHI_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ｺﾞｯｽﾞｿｰﾄﾞ&怨霊武士c"),
		CTimeItemDataMaker.TimeItemExplain("完全回避+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_GODS_SWORD_ONRYOBUSHI_CARD],
		]),
		ITEM_SP_LUCKY_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_CANCER", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("キャンサー"),
		CTimeItemDataMaker.TimeItemExplain("DEF100%無視"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_CANCER],
		]),
		ITEM_SP_IGNORE_DEF_ALL, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SURVIVAL_SHOES_SURVIVAL_ROD_DEX_S1", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ｻﾊﾞｲﾊﾞﾙ(ｼｭｰｽﾞ&DEXﾛｯﾄﾞ)ｾｯﾄ"),
		CTimeItemDataMaker.TimeItemExplain("ﾁｪｰﾝﾗｲﾄﾆﾝｸﾞ +100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_DEX_S1],
		]),
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_CHAIN_LIGHTNING, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SURVIVAL_SHOES_SURVIVAL_ROD_INT_S1", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ｻﾊﾞｲﾊﾞﾙ(ｼｭｰｽﾞ&INTﾛｯﾄﾞ)ｾｯﾄ"),
		CTimeItemDataMaker.TimeItemExplain("ﾁｪｰﾝﾗｲﾄﾆﾝｸﾞ +100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_INT_S1],
		]),
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_CHAIN_LIGHTNING, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_HAO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("覇王"),
		CTimeItemDataMaker.TimeItemExplain("STR +200"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_HAO],
		]),
		ITEM_SP_STR_PLUS, 200,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ZYOO_FACEWORM", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("女王フェイスワームカード"),
		CTimeItemDataMaker.TimeItemExplain("AGI +100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ZYOO_FACEWORM],
		]),
		ITEM_SP_AGI_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_JITTER_BUG", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ジターバグカード"),
		CTimeItemDataMaker.TimeItemExplain("職業限定のトゥルーサイトLv1"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_JITTER_BUG],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GOWAN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("剛腕"),
		CTimeItemDataMaker.TimeItemExplain("ATK +100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_GOWAN],
		]),
		ITEM_SP_ATK_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_DAKITSUKI_SYAMUNEKO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("抱きつきシャムネコ"),
		CTimeItemDataMaker.TimeItemExplain("すべてのステータス +30"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_DAKITSUKI_SYAMNEKO],
		]),
		ITEM_SP_ALLSTATUS_PLUS, 30,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_FURUBITA_SHUGONOKANMURI", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("古びた守護の冠"),
		CTimeItemDataMaker.TimeItemExplain("近接物理ダメージ 100%反射"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_FURUBITA_SHUGONOKANNMURI],
		]),
		ITEM_SP_REFLECT_PHYSICAL_DAMAGE, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ULTIMATE_MODE_CHANGER_PEORTH_ARTIFACT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ペオース　アルティメットセット"),
		CTimeItemDataMaker.TimeItemExplain("スキルディレイ -70%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_ULTIMATE_MODE_CHANGER_PEORTH_ARTIFACT],
		]),
		ITEM_SP_SKILL_DELAY_DOWN, 70,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_CELINENO_BROACH_AKURYONO_ITONO_TEBUKURO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("セリーヌのブローチ　悪霊の糸の手袋セット"),
		CTimeItemDataMaker.TimeItemExplain("リコグナイズドスペルLv1"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_CELINENO_BROACH_AKURYONO_ITONO_TEBUKURO],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_FUSHINO_GUNDAN_NINSHIKIHYO_HIMAWARI_SHONEN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("不死の軍団認識票　ひまわり少年セット"),
		CTimeItemDataMaker.TimeItemExplain("火属性魔法攻撃+50%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_HIMAWARI_SHONEN],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GOKETSU", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("豪傑"),
		CTimeItemDataMaker.TimeItemExplain("完全回避+100、対ボス物理ダメ+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_GOKETSU],
		]),
		ITEM_SP_LUCKY_PLUS, 100,
		ITEM_SP_PHYSICAL_DAMAGE_UP_BOSS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ILLUSION_RENGEKINO_TSUME", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("イリュージョン連撃の爪"),
		CTimeItemDataMaker.TimeItemExplain("Atk + 120"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_ILLUSION_RENGEKINO_TSUME],
		]),
		ITEM_SP_ATK_PLUS, 120,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_TOKUSHUKANNKYO_KATSUDOYO_BOOTS_DARKLORD_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("特殊環境活動用ブーツ　ダークロードカードセット"),
		CTimeItemDataMaker.TimeItemExplain("火属性魔法攻撃ＵＰ"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_TOKUSHUKANNKYO_KATSUDOYO_BOOTS_DARKLORD_CARD],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_BONECIRCRET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("古びた派遣隊の指輪　ボーンサークレット指輪セット"),
		CTimeItemDataMaker.TimeItemExplain("STR +200"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_BONECIRCRET],
		]),
		ITEM_SP_STR_PLUS, 200,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_FUSHOHENO_GANTAI_SEIREN_VIENSER_MVP_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("負傷兵の眼帯　セイレンMVPカードセット"),
		CTimeItemDataMaker.TimeItemExplain("ATK +1000"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_FUSHOHENO_GANTAI_SEIREN_VIENSER_MVP],
		]),
		ITEM_SP_ATK_PLUS, 1000,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("絶望の神モロクカード"),
		CTimeItemDataMaker.TimeItemExplain("[インスピレーション]Lv1"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ZETSUBONO_KAMI_MOROCC],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ENCHANT_HONOIKAZUCHINOOKAMI_AR", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("火雷大神"),
		CTimeItemDataMaker.TimeItemExplain("[アドレナリンラッシュ]Lv2"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_HONOIKAZUCHINOOKAMI],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ENCHANT_HONOIKAZUCHINOOKAMI_DEX100", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("火雷大神"),
		CTimeItemDataMaker.TimeItemExplain("Dex+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_HONOIKAZUCHINOOKAMI],
		]),
		ITEM_SP_DEX_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GREATER_DRACLE_HORN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("グレータードラクルホーン"),
		CTimeItemDataMaker.TimeItemExplain("ラウドボイス"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_GREATER_DRACLE_HORN],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_OKAMINOKAMINO_HAGOROMO_KTULLANUX", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("淤加美神の羽衣-ｸﾄﾙﾗﾅｯｸｽcSET"),
		CTimeItemDataMaker.TimeItemExplain("水属性耐性+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_OKAMINOKAMINO_HAKOROMO_KTULLANUX],
		]),
		ITEM_SP_RESIST_ELM_WATER, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHINO_YOKUDO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("死の欲動"),
		CTimeItemDataMaker.TimeItemExplain("Flee+150、スキルディレイ-100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SHINO_YOKUDO],
		]),
		ITEM_SP_FLEE_PLUS, 150,
		ITEM_SP_SKILL_DELAY_DOWN, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_DEMONISH_SWORD_ONRYOBUSHI_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ﾃﾞﾓﾆｯｼｭｿｰﾄﾞ&怨霊武士c"),
		CTimeItemDataMaker.TimeItemExplain("完全回避+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_DEMONISH_SWORD_ONRYOBUSHI_CARD],
		]),
		ITEM_SP_LUCKY_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_BOOSTER_LANCE_OS", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ブースターランス-OS"),
		CTimeItemDataMaker.TimeItemExplain("必中+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_BOOSTER_LANCE_OS],
		]),
		ITEM_SP_PERFECT_ATTACK_UP, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_X_FATAL_FLASH", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("X-FatalFlash"),
		CTimeItemDataMaker.TimeItemExplain("AGI+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_X_FATAL_FLASH],
		]),
		ITEM_SP_AGI_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_X_FIRING_SHOT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("X-FiringShot"),
		CTimeItemDataMaker.TimeItemExplain("DEX+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_X_FIRING_SHOT],
		]),
		ITEM_SP_DEX_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_X_LUCKY_STRIKE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("X-LuckyStrike"),
		CTimeItemDataMaker.TimeItemExplain("LUK+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_X_LUCKY_STRIKE],
		]),
		ITEM_SP_LUK_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_X_OVER_POWER", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("X-OverPower"),
		CTimeItemDataMaker.TimeItemExplain("STR+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_X_OVER_POWER],
		]),
		ITEM_SP_STR_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_X_SPELL_BUSTER", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("X-SpellBuster"),
		CTimeItemDataMaker.TimeItemExplain("INT+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_X_SPELL_BUSTER],
		]),
		ITEM_SP_INT_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_X_UNLIMIT_VITAL", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("X-UnlimitVital"),
		CTimeItemDataMaker.TimeItemExplain("VIT+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_X_UNLIMIT_VITAL],
		]),
		ITEM_SP_VIT_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_AWL_BARRONNO_MANT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("オウルバロンのマント"),
		CTimeItemDataMaker.TimeItemExplain("攻撃速度上昇"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_AWL_BARRONNO_MANT],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_MAGICAL_CLOTH", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("マジカルクロース"),
		CTimeItemDataMaker.TimeItemExplain("特定魔法ダメージUP"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_MAGICAL_CLOTH],
		]),
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_FIRE_BOLT, 100,
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_COLD_BOLT, 100,
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_LIGHTNING_BOLT, 100,
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_EARTH_SPIKE, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_EXTREME", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("Extreme"),
		CTimeItemDataMaker.TimeItemExplain("DEX+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_EXTREME],
		]),
		ITEM_SP_DEX_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SOLOMONNO_PENDANT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ソロモンのペンダント"),
		CTimeItemDataMaker.TimeItemExplain("火・水・風・聖・無属性魔法ダメージ+30%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_SOLOMONNO_PENDANT],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE, 30,
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER, 30,
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND, 30,
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY, 30,
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY, 30,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_T_POWER_BOOST", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("T-PowerBoost"),
		CTimeItemDataMaker.TimeItemExplain("Atk+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_T_POWER_BOOST],
		]),
		ITEM_SP_ATK_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_T_MAGIC_BOOST", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("T-MagicBoost"),
		CTimeItemDataMaker.TimeItemExplain("Matk+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_T_MAGIC_BOOST],
		]),
		ITEM_SP_MATK_PLUS_TYPE_NOTSTUFF, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_T_ASSAULT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("T-Assault"),
		CTimeItemDataMaker.TimeItemExplain("クリティカルダメージ + 40%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_T_ASSAULT],
		]),
		ITEM_SP_CRITICAL_DAMAGE_UP, 40,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_PIKAPIKA_NYANNYAN_CROWN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ぴかぴかニャンニャンクラウン"),
		CTimeItemDataMaker.TimeItemExplain("消費SP - 100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_PIKAPIKA_NYANNYAN_CROWN],
		]),
		ITEM_SP_COST_DOWN, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_CHAPUCHAPU_NYANPU_HAT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ちゃぷちゃぷニャンプーハット"),
		CTimeItemDataMaker.TimeItemExplain("完全回避 + 100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_CHAPUCHAPU_NYANPU_HAT],
		]),
		ITEM_SP_LUCKY_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_KUMANO_CHIKARA", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("熊の力"),
		CTimeItemDataMaker.TimeItemExplain("Str + 200、1秒毎にHP - 500"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_KUMANO_CHIKARA],
		]),
		ITEM_SP_STR_PLUS, 200,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_KOSOKU", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("光速"),
		CTimeItemDataMaker.TimeItemExplain("攻撃速度 + 100%、完全回避 + 100、1秒毎にHP - 400 , SP - 40"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_KOSOKU],
		]),
		ITEM_SP_ASPD_UP, 100,
		ITEM_SP_LUCKY_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_KOGAI", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("鋼鎧"),
		CTimeItemDataMaker.TimeItemExplain("物理攻撃で与えるダメージ - 50%、Matk - 50%、Def + 1000"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_KOGAI],
		]),
		ITEM_SP_PHYSICAL_DAMAGE_UP, -50,
		ITEM_SP_MAGICAL_DAMAGE_UP, -50,
		ITEM_SP_DEF_PLUS, 1000,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_BOSOSHITA_MARYOKU", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("暴走した魔力"),
		CTimeItemDataMaker.TimeItemExplain("Int + 200、1秒毎にSP - 200"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_BOSOSHITA_MARYOKU],
		]),
		ITEM_SP_INT_PLUS, 200,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_OWASHINO_GANKO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("大鷲の眼光"),
		CTimeItemDataMaker.TimeItemExplain("Dex + 200、1秒毎にSP - 50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_OWASHINO_GANKO],
		]),
		ITEM_SP_DEX_PLUS, 200,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_KOUUNNA_HI", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("幸運な日"),
		CTimeItemDataMaker.TimeItemExplain("Luk + 200、一定確率で[宝箱]をドロップ"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_KOUUNNA_HI],
		]),
		ITEM_SP_LUK_PLUS, 200,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_KAKUSEI_OKAMINOKAMINO_HAGOROMO_KTULLANUX", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("覚醒淤加美神の羽衣-ｸﾄﾙﾗﾅｯｸｽcSET"),
		CTimeItemDataMaker.TimeItemExplain("水属性耐性+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_KAKUSEI_OKAMINOKAMINO_HAKOROMO_KTULLANUX],
		]),
		ITEM_SP_RESIST_ELM_WATER, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_OKAMINOKAMINO_HAGOROMO_FUINSARETA_KTULLANUX", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("淤加美神の羽衣-封印ｸﾄﾙﾗﾅｯｸｽcSET"),
		CTimeItemDataMaker.TimeItemExplain("水属性耐性+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_OKAMINOKAMINO_HAKOROMO_FUINSARETA_KTULLANUX],
		]),
		ITEM_SP_RESIST_ELM_WATER, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_KAKUSEI_OKAMINOKAMINO_HAGOROMO_FUINSARETA_KTULLANUX", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("覚醒淤加美神の羽衣-封印ｸﾄﾙﾗﾅｯｸｽcSET"),
		CTimeItemDataMaker.TimeItemExplain("水属性耐性+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_KAKUSEI_OKAMINOKAMINO_HAKOROMO_FUINSARETA_KTULLANUX],
		]),
		ITEM_SP_RESIST_ELM_WATER, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_METAL_DEATH_ADDER", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("メタルデスアダー"),
		CTimeItemDataMaker.TimeItemExplain("完全回避+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_METAL_DEATH_ADDER],
		]),
		ITEM_SP_LUCKY_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SENZAI_KAIHO_GUILLOTINE_CROSS", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("潜在解放(ギロチンクロス)"),
		CTimeItemDataMaker.TimeItemExplain("完全回避+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SENZAI_KAIHO_GUILLOTINE_CROSS],
		]),
		ITEM_SP_LUCKY_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_POLLUX_BOOK", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ポルックスブック"),
		CTimeItemDataMaker.TimeItemExplain("Atk+150"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_POLLUX_BOOK],
		]),
		ITEM_SP_ATK_PLUS, 150,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_FUINSARETA_DARKLORD_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("覚醒特殊環境活動用ブーツ　封印されたダークロードカードセット"),
		CTimeItemDataMaker.TimeItemExplain("火属性魔法攻撃ＵＰ"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_FUINSARETA_DARKLORD_CARD],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_FUINSARETA_DARKLORD_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("特殊環境活動用ブーツ　封印されたダークロードカードセット"),
		CTimeItemDataMaker.TimeItemExplain("火属性魔法攻撃ＵＰ"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_FUINSARETA_DARKLORD_CARD],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GULARUSION_UNLIMIT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("グラルション"),
		CTimeItemDataMaker.TimeItemExplain("アンリミット状態"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_GULARUSION],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GULARUSION_AGI_PLUS", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("グラルション"),
		CTimeItemDataMaker.TimeItemExplain("Agi + 100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_GULARUSION],
		]),
		ITEM_SP_AGI_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_INVIDIA_BANDLE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("インウィディアバンドル"),
		CTimeItemDataMaker.TimeItemExplain("完全回避+100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_INVIDIA_BANDLE],
		]),
		ITEM_SP_LUCKY_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_S_FATAL_FLASH", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("S-FatalFlash"),
		CTimeItemDataMaker.TimeItemExplain("AGI+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_S_FATAL_FLASH],
		]),
		ITEM_SP_AGI_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_S_FIRING_SHOT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("S-FiringShot"),
		CTimeItemDataMaker.TimeItemExplain("DEX+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_S_FIRING_SHOT],
		]),
		ITEM_SP_DEX_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_S_LUCKY_STRIKE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("S-LuckyStrike"),
		CTimeItemDataMaker.TimeItemExplain("LUK+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_S_LUCKY_STRIKE],
		]),
		ITEM_SP_LUK_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_S_OVER_POWER", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("S-OverPower"),
		CTimeItemDataMaker.TimeItemExplain("STR+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_S_OVER_POWER],
		]),
		ITEM_SP_STR_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_S_SPELL_BUSTER", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("S-SpellBuster"),
		CTimeItemDataMaker.TimeItemExplain("INT+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_S_SPELL_BUSTER],
		]),
		ITEM_SP_INT_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_S_UNLIMIT_VITAL", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("S-UnlimitVital"),
		CTimeItemDataMaker.TimeItemExplain("VIT+50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_S_UNLIMIT_VITAL],
		]),
		ITEM_SP_VIT_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_CRYSTAL_BLADE_NECKLACE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("クリスタルブレイドネックレス"),
		CTimeItemDataMaker.TimeItemExplain("物理攻撃時、全属性モンスターダメージ+15%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_CRYSTAL_BLADE_NECKLACE],
		]),
		ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL, 15,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_IMPERIAL_ANIMAL_ROBE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("インペリアルアニマルローブ"),
		CTimeItemDataMaker.TimeItemExplain("物理攻撃時、全属性モンスターダメージ+20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_IMPERIAL_ANIMAL_ROBE],
		]),
		ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL, 20,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GRACE_ANIMAL_ROBE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("グレースアニマルローブ"),
		CTimeItemDataMaker.TimeItemExplain("物理攻撃時、全属性モンスターダメージ+50%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_GRACE_ANIMAL_ROBE],
		]),
		ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ROYAL_WHIP", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ロイヤルウィップ"),
		CTimeItemDataMaker.TimeItemExplain("完全回避 + 100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_ROYAL_WHIP],
		]),
		ITEM_SP_LUCKY_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ROYAL_CELLO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ロイヤルチェロ"),
		CTimeItemDataMaker.TimeItemExplain("完全回避 + 100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_ROYAL_CELLO],
		]),
		ITEM_SP_LUCKY_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_TATSUINUNO_UDEWA_GOKETSU", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("辰戌の腕輪"),
		CTimeItemDataMaker.TimeItemExplain("完全回避 + 100"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_TATSUINUNO_UDEWA_GOKETSU],
		]),
		ITEM_SP_LUCKY_PLUS, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SANGAKU_HELMET", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("山岳ヘルメット"),
		CTimeItemDataMaker.TimeItemExplain("純粋VIT+1毎に[パワースイング]ダメ+1%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_SANGAKU_HELMET],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_GRACE_MENUS_SUIT", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("グレースメナススーツ"),
		CTimeItemDataMaker.TimeItemExplain("必中+50%、物理全属性モンスター+15%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_GRACE_MENUS_SUIT],
		]),
		ITEM_SP_PERFECT_ATTACK_UP, 50,
		ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL, 15,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_PARACELSUS_GLOVE_HAO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("パラケルススグローブ＆覇王セット"),
		CTimeItemDataMaker.TimeItemExplain("必中+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_PARACELSUS_GLOVE_HAO],
		]),
		ITEM_SP_PERFECT_ATTACK_UP, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_MELON_ARMS", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("メロン武器"),
		CTimeItemDataMaker.TimeItemExplain("消費SP-100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_DAGGER],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_BLADE],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_CRAYMORE],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_SPEAR],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_RANCE],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_AXE],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_TWOHAND_AXE],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_MACE],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_WAND],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_STUFF],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_WING],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_KATAR],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_BOOK],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_CRAW],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_VIOLIN],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_WHIP],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_FUMA_SHURIKEN],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_HANDGUN],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_RIFLE],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_GATLINGGUN],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_SHOTGUN],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_GRENADEGUN],
			[CONST_DATA_KIND_ITEM, ITEM_ID_MELON_FOXTAIL],
		]),
		ITEM_SP_COST_DOWN, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHUKUSEINO_KUTSU", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("粛清の靴"),
		CTimeItemDataMaker.TimeItemExplain("ジュデックスのダメージ + BaseLv%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_SHUKUSEINO_KUTSU],
		]),
		ITEM_SP_BASE_LV_BY_1_OFFSET + ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_JUDEX, 1,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_FUINSARETA_ATOLOS_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("封印されたアトロスカード"),
		CTimeItemDataMaker.TimeItemExplain("ASPD+30%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_FUINSARETA_ATLOS],
		]),
		ITEM_SP_ASPD_UP, 30,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ENCHANT_HOZYONO_MEGAMI_ATLOS", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("豊穣の女神＆アトロスカード"),
		CTimeItemDataMaker.TimeItemExplain("ASPD+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_ATLOS],
		]),
		ITEM_SP_ASPD_UP, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_ATOLOS_CARD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("豊穣の女神＆封印されたアトロスカード"),
		CTimeItemDataMaker.TimeItemExplain("ASPD+30%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_ATLOS],
		]),
		ITEM_SP_ASPD_UP, 30,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_TRAVELER_RING_GOKETSU", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("トラベラーリング＆豪傑セット"),
		CTimeItemDataMaker.TimeItemExplain("アンリミット状態"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_SET_ID_TRAVELER_RING_GOKETSU],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_DARK_TRIAD", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ダークトライアド"),
		CTimeItemDataMaker.TimeItemExplain("アンリミット状態"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_DARK_TRIAD],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ILLUSION_IBARANO_TSUE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("イリュージョン茨の杖"),
		CTimeItemDataMaker.TimeItemExplain("闇属性魔法攻撃ダメージ + 50%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_ILLUSION_IBARANO_TSUE],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ILLUSION_STUFF_OF_TEAR", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("イリュージョンスタッフオブティアー"),
		CTimeItemDataMaker.TimeItemExplain("聖属性魔法攻撃ダメージ + 50%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_ILLUSION_STUFF_OF_TEAR],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ILLUSION_ANCIENT_DUGGER_TELECHINESIS_INSTENCE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("イリュージョンエンシェントダガー"),
		CTimeItemDataMaker.TimeItemExplain("テレキネシスインテンスLv3状態"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_ILLUSION_ANCIENT_DUGGER],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ILLUSION_ANCIENT_DUGGER_MAGICAL_UP", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("イリュージョンエンシェントダガー"),
		CTimeItemDataMaker.TimeItemExplain("念属性魔法攻撃ダメージ + 50%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_ILLUSION_ANCIENT_DUGGER],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PSYCO, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SENZAI_KAKUSE_CRAZY_WEED", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("潜在覚醒(クレイジーウィード)"),
		CTimeItemDataMaker.TimeItemExplain("[クレイジーウィード]の消費SP-59"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SENZAI_KAKUSE_CRAZY_WEED],
		]),
		ITEM_SP_SKILL_COST_MINUS_OFFSET + SKILL_ID_CRAZY_WEED, 59,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;

	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SENZAI_KAKUSE_ARROW_STORM", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("潜在覚醒(アローストーム)"),
		CTimeItemDataMaker.TimeItemExplain("[アローストーム]の消費SP-47"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SENZAI_KAKUSE_ARROW_STORM],
		]),
		ITEM_SP_SKILL_COST_MINUS_OFFSET + SKILL_ID_ARROW_STORM, 47,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;

	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SENZAI_KAKUSE_JUDEX", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("潜在覚醒(ジュデックス)"),
		CTimeItemDataMaker.TimeItemExplain("[ジュデックス]の消費SP-46"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SENZAI_KAKUSE_JUDEX],
		]),
		ITEM_SP_SKILL_COST_MINUS_OFFSET + SKILL_ID_JUDEX, 46,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;

	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SENZAI_KAKUSE_MANGETSU_KYAKU", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("潜在覚醒(満月脚)"),
		CTimeItemDataMaker.TimeItemExplain("[満月脚]の消費SP-79"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SENZAI_KAKUSE_MANGETSU_KYAKU],
		]),
		ITEM_SP_SKILL_COST_MINUS_OFFSET + SKILL_ID_MANGETSU_KYAKU, 79,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;

	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SENZAI_KAKUSE_OTORO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("潜在覚醒(大トロ)"),
		CTimeItemDataMaker.TimeItemExplain("[大トロ]の消費SP-59"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SENZAI_KAKUSE_OTORO],
		]),
		ITEM_SP_SKILL_COST_MINUS_OFFSET + SKILL_ID_OTORO, 59,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;

	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SENZAI_KAKUSE_SAVAGENO_TAMASHI", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("潜在覚醒(サベージの魂)"),
		CTimeItemDataMaker.TimeItemExplain("[サベージの魂]の消費SP-59"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SENZAI_KAKUSE_SAVAGENO_TAMASHI],
		]),
		ITEM_SP_SKILL_COST_MINUS_OFFSET + SKILL_ID_SAVAGENO_TAMASHI, 59,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;

	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SENZAI_KAKUSE_SISIKO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("潜在覚醒(獅子吼)"),
		CTimeItemDataMaker.TimeItemExplain("[獅子吼]の消費SP-119"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SENZAI_KAKUSE_SISIKO],
		]),
		ITEM_SP_SKILL_COST_MINUS_OFFSET + SKILL_ID_SISIKO, 119,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;

	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SENZAI_KAKUSE_ARMS_CANNON", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("潜在覚醒(アームズキャノン)"),
		CTimeItemDataMaker.TimeItemExplain("[アームズキャノン]の消費SP-59"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SENZAI_KAKUSE_ARMS_CANNON],
		]),
		ITEM_SP_SKILL_COST_MINUS_OFFSET + SKILL_ID_ARMS_CANNON, 59,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;

	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SENZAI_KAKUSE_JACK_FROST", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("潜在覚醒(ジャックフロスト)"),
		CTimeItemDataMaker.TimeItemExplain("[ジャックフロスト]の消費SP-119"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SENZAI_KAKUSE_JACK_FROST],
		]),
		ITEM_SP_SKILL_COST_MINUS_OFFSET + SKILL_ID_JACK_FROST, 119,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;

	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SENZAI_KAKUSE_IGNITION_BREAK", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("潜在覚醒(イグニッションブレイク)"),
		CTimeItemDataMaker.TimeItemExplain("[イグニッションブレイク]の消費SP-54"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SENZAI_KAKUSE_IGNITION_BREAK],
		]),
		ITEM_SP_SKILL_COST_MINUS_OFFSET + SKILL_ID_IGNITION_BREAK, 54,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_KOKUYOKUNO_SHITO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("黒翼の使徒"),
		CTimeItemDataMaker.TimeItemExplain("攻撃速度+100%、固定詠唱-100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_KOKUYOKUNO_SHITO],
		]),
		ITEM_SP_ASPD_UP, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_IKYONO_TOKATSUSHA_TURTLE_GENERAL", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("異境の統轄者＋タートルジェネラルc"),
		CTimeItemDataMaker.TimeItemExplain("火属性物理攻撃力 + 20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_TURTLE_GENERAL],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_IKYONO_TOKATSUSHA_FUINSARETA_TURTLE_GENERAL", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("異境の統轄者＋封印タートルジェネラルc"),
		CTimeItemDataMaker.TimeItemExplain("火属性物理攻撃力 + 10%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_TURTLE_GENERAL],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_LUDE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ルードカード(ノビ系限定)"),
		CTimeItemDataMaker.TimeItemExplain("インデュアLv1"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_LUDE],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SENZAI_KAKUSE_BUNISHING_BASTER", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("潜在覚醒(バニシングバスター)"),
		CTimeItemDataMaker.TimeItemExplain("[バニシングバスター]の消費SP-74"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_SENZAI_KAKUSE_BUNISHING_BASTER],
		]),
		ITEM_SP_SKILL_COST_MINUS_OFFSET + SKILL_ID_BUNISHING_BASTER, 74,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_DETECT_STUFF", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ディテクトスタッフ"),
		CTimeItemDataMaker.TimeItemExplain("地属性魔法攻撃ダメージ + 50%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_DETECT_STUFF],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_INORU_MONO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("祈る者"),
		CTimeItemDataMaker.TimeItemExplain("火属性物理攻撃力 + 10%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_INORU_MONO],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_KYOKANSURU_MONO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("共感する者"),
		CTimeItemDataMaker.TimeItemExplain("水属性物理攻撃力 + 10%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_KYOKANSURU_MONO],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_KOFUKUWO_ATAERU_MONO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("幸福を与える者"),
		CTimeItemDataMaker.TimeItemExplain("地属性物理攻撃力 + 10%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_KOFUKUWO_ATAERU_MONO],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_HOHOEMU_MONO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("微笑む者"),
		CTimeItemDataMaker.TimeItemExplain("風属性物理攻撃力 + 10%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_HOHOEMU_MONO],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SINFUL_RUBY_NECKLACE", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("シンフルルビーネックレス"),
		CTimeItemDataMaker.TimeItemExplain("必中攻撃 + 100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_SINFUL_RUBY_NECKLACE],
		]),
		ITEM_SP_PERFECT_ATTACK_UP, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ZINRIKI", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("天地崩壊（神力）"),
		CTimeItemDataMaker.TimeItemExplain("ステータスUP"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_TENCHI_HOKAI],
		]),
		ITEM_SP_BASE_LV_BY_10_OFFSET + ITEM_SP_ALLSTATUS_PLUS_FOR_SET, 1,
		ITEM_SP_BASE_LV_BY_10_OFFSET + ITEM_SP_MAXHP_UP, 1,
		ITEM_SP_BASE_LV_BY_10_OFFSET + ITEM_SP_FLEE_PLUS, 10,
		ITEM_SP_BASE_LV_BY_10_OFFSET + ITEM_SP_ATK_PLUS, 10,
		ITEM_SP_BASE_LV_BY_10_OFFSET + ITEM_SP_MATK_PLUS_TYPE_NOTSTUFF, 10,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_PLAGARION", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("プラガリオン"),
		CTimeItemDataMaker.TimeItemExplain("風属性物理攻撃力 + 20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_PLAGARION],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_MYSTERY_WING", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ミステリーウィング"),
		CTimeItemDataMaker.TimeItemExplain("完全回避 + 95"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_MYSTERY_WING],
		]),
		ITEM_SP_LUCKY_PLUS, 95,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_VOLCARING", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ボルケリンカード"),
		CTimeItemDataMaker.TimeItemExplain("地属性物理攻撃力 + 20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_VOLCARING],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SHIGERING", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("シゲリンカード"),
		CTimeItemDataMaker.TimeItemExplain("Flee + 50"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_SHIGERING],
		]),
		ITEM_SP_FLEE_PLUS, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_DEMI_FREYA", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("デミフレイヤカード"),
		CTimeItemDataMaker.TimeItemExplain("[インスピレーション]Lv1"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_DEMI_FREYA],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_LAVA_TODO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ラーヴァトードカード"),
		CTimeItemDataMaker.TimeItemExplain("毒属性物理攻撃力 + 10%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_LAVA_TODO],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_FUZINO_MAKEN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("不治の魔剣"),
		CTimeItemDataMaker.TimeItemExplain("無属性魔法ダメ + 50%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_FUZINO_MAKEN],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_UNMEINO_YARI", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("運命の槍"),
		CTimeItemDataMaker.TimeItemExplain("聖属性魔法ダメ + 50%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_UNMEINO_YARI],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_SERENO_VIOLIN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("精霊のバイオリン"),
		CTimeItemDataMaker.TimeItemExplain("無属性魔法ダメ + 50%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_SERENO_VIOLIN],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ZYABARAKEN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("蛇腹剣"),
		CTimeItemDataMaker.TimeItemExplain("無属性魔法ダメ + 50%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_ITEM, ITEM_ID_ZYABARAKEN],
		]),
		ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY, 50,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_HENI_CHIMERA_FULGOR", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("変異キメラフルゴル"),
		CTimeItemDataMaker.TimeItemExplain("聖属性物理攻撃力 + 10%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_HENI_CHIMERA_FULGOR],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_YUENNARU_TENZYONO_MIYAKO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("悠遠なる天上の都（神力）"),
		CTimeItemDataMaker.TimeItemExplain("ステータスUP"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_YUENNARU_TENZYONO_MIYAKO],
		]),
		ITEM_SP_BASE_LV_BY_10_OFFSET + ITEM_SP_ALLSTATUS_PLUS_FOR_SET, 1,
		ITEM_SP_BASE_LV_BY_10_OFFSET + ITEM_SP_MAXHP_UP, 1,
		ITEM_SP_BASE_LV_BY_10_OFFSET + ITEM_SP_FLEE_PLUS, 10,
		ITEM_SP_BASE_LV_BY_10_OFFSET + ITEM_SP_ATK_PLUS, 10,
		ITEM_SP_BASE_LV_BY_10_OFFSET + ITEM_SP_MATK_PLUS_TYPE_NOTSTUFF, 10,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_URUNO_KAGO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("ウルの加護"),
		CTimeItemDataMaker.TimeItemExplain("アンリミット状態"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_URUNO_KAGO],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_MUNEN_MUSO", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("無念無想"),
		CTimeItemDataMaker.TimeItemExplain("Cri+100、クリダメ+100%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_ENCHANT_MUNEN_MUSO],
		]),
		ITEM_SP_CRI_PLUS, 100,
		ITEM_SP_CRITICAL_DAMAGE_UP, 100,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_DOKUTSU_FUTOKA", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("洞窟不凍花"),
		CTimeItemDataMaker.TimeItemExplain("水属性物理攻撃力 + 20%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_DOKUTSU_FUTOKA],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_KAKYU_RGAN", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("下級ルガン"),
		CTimeItemDataMaker.TimeItemExplain("闇属性物理攻撃力 + 10%"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_ID_KAKYU_RGAN],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_WIND_HAWK_3", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("潜在解放(ウィンドホークIII)＋豪傑"),
		CTimeItemDataMaker.TimeItemExplain("アンリミット状態"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_WIND_HAWK_3],
		]),
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;



	CTimeItemDataMaker.RegisterId("TIME_ITEM_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_INQUISITOR_2", timeItemId);
	timeItemData = [
		timeItemId,
		CTimeItemDataMaker.TimeItemName("潜在解放(インクイジターII)＋豪傑"),
		CTimeItemDataMaker.TimeItemExplain("消費SP軽減(炎火滅魔神弾,爆火神弾)"),
		CTimeItemDataMaker.TimeItemSrcDataArray([
			[CONST_DATA_KIND_CARD, CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_INQUISITOR_2],
		]),
		ITEM_SP_SKILL_COST_MINUS_OFFSET + SKILL_ID_ENKA_METSUMA_SHINDAN, 299,
		ITEM_SP_SKILL_COST_MINUS_OFFSET + SKILL_ID_BAKKA_SHINDAN, 169,
		ITEM_SP_END
	];
	ITEM_SP_TIME_OBJ[timeItemId] = timeItemData;
	timeItemId++;




};


/**
 * 整列データ定義を上書き定義する.
 */
CTimeItemDataMaker.OverrideSortData = function () {

	// 整列データ配列オブジェクトを上書き定義していく
	ITEM_SP_TIME_OBJ_SORT = new Array();

	ITEM_SP_TIME_OBJ_SORT = [
		TIME_ITEM_ID_NONE,
		TIME_ITEM_ID_12TH_ANIVERSERY_SUPPORT,
		TIME_ITEM_ID_ECLAGE_ORBE,
		TIME_ITEM_ID_GEFFEN_MAHOTAIKAI_SUPPORT_ATK,
		TIME_ITEM_ID_GEFFEN_MAHOTAIKAI_SUPPORT_MATK,
		TIME_ITEM_ID_GEFFEN_MAHOTAIKAI_SUPPORT_RESIST,
		TIME_ITEM_ID_ARCH_BISHOP_MARGARETTE_CARD_ARCH_BISHOP_MARGARETTE_MVP_CARD,
		TIME_ITEM_ID_IORNE_STUFF,
		TIME_ITEM_ID_AICILA_CARD,
		TIME_ITEM_ID_ICE_TITAN_CARD,
		TIME_ITEM_ID_AVENGER_CLAYMORE,
		TIME_ITEM_ID_AVENGER_GRENADEGUN,
		TIME_ITEM_ID_AVENGER_JAMADAHAR,
		TIME_ITEM_ID_AVENGER_BLOODYROAR,
		TIME_ITEM_ID_AKUMA_BARAINO_SHO,
		TIME_ITEM_ID_ATOLOS_CARD,
		TIME_ITEM_ID_ATAMANORI_FEERIL_FUYUSURU_KENZYANO_ISHI_SET,
		TIME_ITEM_ID_ANNOLIAN_CARD,
		TIME_ITEM_ID_ALCHEMIST_CARD_SET,
		TIME_ITEM_ID_ANSATSUSHANO_DUMASCUS_TOKKO,
		TIME_ITEM_ID_IKYONO_TOKATSUSHA_TURTLE_GENERAL,
		TIME_ITEM_ID_IKYONO_TOKATSUSHA_FUINSARETA_TURTLE_GENERAL,
		TIME_ITEM_ID_IXIONNO_HANE,
		TIME_ITEM_ID_IGNIS_CAP,
		TIME_ITEM_ID_INORU_MONO,
		TIME_ITEM_ID_ILLUSION_IBARANO_TSUE,
		TIME_ITEM_ID_ILLUSION_ANCIENT_DUGGER_TELECHINESIS_INSTENCE,
		TIME_ITEM_ID_ILLUSION_ANCIENT_DUGGER_MAGICAL_UP,
		TIME_ITEM_ID_ILLUSION_STUFF_OF_TEAR,
		TIME_ITEM_ID_ILLUSION_RENGEKINO_TSUME,
		TIME_ITEM_ID_INVIDIA_BANDLE,
		TIME_ITEM_ID_IMPERIAL_ANIMAL_ROBE,
		TIME_ITEM_ID_VAINA,
		TIME_ITEM_ID_VALKYRIE_CIRCLET_SET,
		TIME_ITEM_ID_VAMBERK_CARD,
		TIME_ITEM_ID_WARLOCK_CATHERINE_CARD_WARLOCK_CATHERINE_MVP_CARD,
		TIME_ITEM_ID_URUNO_KAGO,
		TIME_ITEM_ID_WOLF_HEZIN,
		TIME_ITEM_ID_VNDER_CANMER_SHUCHURYOKU_KOZYO,
		TIME_ITEM_ID_VNDER_CANMER_BAKURETSU_HADO,
		TIME_ITEM_ID_UNMEINO_YARI,
		TIME_ITEM_ID_ANGELIC_RING,
		TIME_ITEM_ID_AWL_VAICAUNTNO_SILKHAT,
		TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV2,
		TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV4,
		TIME_ITEM_ID_OWLDUKENO_SILKHAT_AMPLV6,
		TIME_ITEM_ID_AWL_BARRONNO_MANT,
		TIME_ITEM_ID_OKAMIMOYONO_TEKKO,
		TIME_ITEM_ID_OWASHINO_GANKO,
		TIME_ITEM_ID_OKAMINOKAMINO_HAGOROMO_KTULLANUX,
		TIME_ITEM_ID_OKAMINOKAMINO_HAGOROMO_FUINSARETA_KTULLANUX,
		TIME_ITEM_ID_KAKYU_RGAN,
		TIME_ITEM_ID_KAKUSEI_OKAMINOKAMINO_HAGOROMO_KTULLANUX,
		TIME_ITEM_ID_KAKUSEI_OKAMINOKAMINO_HAGOROMO_FUINSARETA_KTULLANUX,
		TIME_ITEM_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_FUINSARETA_DARKLORD_CARD,
		TIME_ITEM_ID_KITSUNE_SUZU_RIBBON,
		TIME_ITEM_ID_CANCER,
		TIME_ITEM_ID_KYOKANSURU_MONO,
		TIME_ITEM_ID_GUILLOTINE_CROSS_ELEMES_CARD_GUILLOTINE_CROSS_ELEMES_MVP_CARD,
		TIME_ITEM_ID_KUMANO_CHIKARA,
		TIME_ITEM_ID_GULARUSION_UNLIMIT,
		TIME_ITEM_ID_GULARUSION_AGI_PLUS,
		TIME_ITEM_ID_CRYSTAL_BLADE_NECKLACE,
		TIME_ITEM_ID_GRACE_ANIMAL_ROBE,
		TIME_ITEM_ID_GRACE_MENUS_SUIT,
		TIME_ITEM_ID_GREATER_DRACLE_HORN,
		TIME_ITEM_ID_CHRONOS,
		TIME_ITEM_ID_GLORIOUS_GRENADEGUN,
		TIME_ITEM_ID_GLORIOUS_JAMADAHAR,
		TIME_ITEM_ID_GLORIOUS_TABLET,
		TIME_ITEM_ID_GLORIOUS_FUMASHURIKEN,
		TIME_ITEM_ID_GLORIOUS_BLOODY_ROAR,
		TIME_ITEM_ID_KOUUNNA_HI,
		TIME_ITEM_ID_KOENNO_TWINEDGE,
		TIME_ITEM_ID_KOGAI,
		TIME_ITEM_ID_GOKETSU,
		TIME_ITEM_ID_KOSOKU,
		TIME_ITEM_ID_GOFUSEKI_PEORTH_SET,
		TIME_ITEM_ID_KOFUKUWO_ATAERU_MONO,
		TIME_ITEM_ID_GOWAN,
		TIME_ITEM_ID_KOKUYOKUNO_SHITO,
		TIME_ITEM_ID_KOKKOCHAN,
		TIME_ITEM_ID_GODS_SWORD_ONRYOBUSHI_CARD,
		TIME_ITEM_ID_SURVIVAL_CIRCLET_SET,
		TIME_ITEM_ID_SURVIVAL_SHOES_SURVIVAL_ROD_INT_S1,
		TIME_ITEM_ID_SURVIVAL_SHOES_SURVIVAL_ROD_DEX_S1,
		TIME_ITEM_ID_SABAKUNO_YUGURE_KAZE_SET,
		TIME_ITEM_ID_SARANO_ROBE,
		TIME_ITEM_ID_SANGAKU_HELMET,
		TIME_ITEM_ID_GENETIC_EMUR_CARD_GENETIC_EMUR_MVP_CARD,
		TIME_ITEM_ID_SHIGERING,
		TIME_ITEM_ID_SHISHIONO_KABUTO,
		TIME_ITEM_ID_JITTER_BUG,
		TIME_ITEM_ID_SHIPPU,
		TIME_ITEM_ID_SHINO_YOKUDO,
		TIME_ITEM_ID_SHIBAINUBO_SET,
		TIME_ITEM_ID_SHADOW_GUARD_WALKER_SET,
		TIME_ITEM_ID_SHADOW_STUFF,
		TIME_ITEM_ID_SHADOW_CHASER_GARTY_CARD_SHADOW_CHASER_GARTY_MVP_CARD,
		TIME_ITEM_ID_SHADOW_RING,
		TIME_ITEM_ID_ZYABARAKEN,
		TIME_ITEM_ID_SHUKUSEINO_KUTSU,
		TIME_ITEM_ID_SHURA_CHENG_CARD_SHURA_CHENG_MVP_CARD,
		TIME_ITEM_ID_JULIET_DE_RACHEL,
		TIME_ITEM_ID_ZYOO_FACEWORM,
		TIME_ITEM_ID_SHIRAHANO_MANT,
		TIME_ITEM_ID_SHINPANNO_MACE_PHYSICAL,
		TIME_ITEM_ID_SHINPANNO_MACE_MAGICAL,
		TIME_ITEM_ID_SHINPANNO_MACE_2_PHYSICAL,
		TIME_ITEM_ID_SHINPANNO_MACE_2_MAGICAL,
		TIME_ITEM_ID_SINFUL_RUBY_NECKLACE,
		TIME_ITEM_ID_ZINRIKI,
		TIME_ITEM_ID_SHINRINO_KAIHO,
		TIME_ITEM_ID_SUITEN,
		TIME_ITEM_ID_SERENO_VIOLIN,
		TIME_ITEM_ID_SEIREN_VENSER_MVP_CARD,
		TIME_ITEM_ID_ZETSUBONO_KAMI_MOROCC_CARD,
		TIME_ITEM_ID_CELINENO_BROACH_AKURYONO_ITONO_TEBUKURO,
		TIME_ITEM_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_INQUISITOR_2,
		TIME_ITEM_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_WIND_HAWK_3,
		TIME_ITEM_ID_SENZAI_KAIHO_GUILLOTINE_CROSS,
		TIME_ITEM_ID_SENZAI_KAKUSE_ARMS_CANNON,
		TIME_ITEM_ID_SENZAI_KAKUSE_ARROW_STORM,
		TIME_ITEM_ID_SENZAI_KAKUSE_IGNITION_BREAK,
		TIME_ITEM_ID_SENZAI_KAKUSE_OTORO,
		TIME_ITEM_ID_SENZAI_KAKUSE_CRAZY_WEED,
		TIME_ITEM_ID_SENZAI_KAKUSE_SAVAGENO_TAMASHI,
		TIME_ITEM_ID_SENZAI_KAKUSE_SISIKO,
		TIME_ITEM_ID_SENZAI_KAKUSE_JACK_FROST,
		TIME_ITEM_ID_SENZAI_KAKUSE_JUDEX,
		TIME_ITEM_ID_SENZAI_KAKUSE_BUNISHING_BASTER,
		TIME_ITEM_ID_SENZAI_KAKUSE_MANGETSU_KYAKU,
		TIME_ITEM_ID_SENTO_FUMASHURIKEN_TOKKO,
		TIME_ITEM_ID_SOENNO_TWINEDGE,
		TIME_ITEM_ID_SORCERER_CERIA_CARD_SORCERER_CERIA_MVP_CARD,
		TIME_ITEM_ID_SOLDIER_GATLINGGUN,
		TIME_ITEM_ID_SOLDIER_GRENADEGUN,
		TIME_ITEM_ID_SOLDIER_SHOTGUN,
		TIME_ITEM_ID_SOLDIER_HANDGUN,
		TIME_ITEM_ID_SOLOMONNO_PENDANT,
		TIME_ITEM_ID_DARK_TRIAD,
		TIME_ITEM_ID_DAKITSUKI_SYAMUNEKO,
		TIME_ITEM_ID_TATSUINUNO_UDEWA_GOKETSU,
		TIME_ITEM_ID_DATENSHINO_TATE,
		TIME_ITEM_ID_CHAPUCHAPU_NYANPU_HAT,
		TIME_ITEM_ID_DETECT_STUFF,
		TIME_ITEM_ID_TEGRYON,
		TIME_ITEM_ID_DEMI_FREYA,
		TIME_ITEM_ID_DEMONISH_SWORD_ONRYOBUSHI_CARD,
		TIME_ITEM_ID_TENCHI,
		TIME_ITEM_ID_DOKUTSU_FUTOKA,
		TIME_ITEM_ID_TOSHINO_BATTLE_FIST_YUMO,
		TIME_ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN_BERSERK,
		TIME_ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN_OVER_TRUST_MAX,
		TIME_ITEM_ID_TOZOKUNO_SUSUME_DAIIKKAN_MAHORYOKU_ZOFUKU,
		TIME_ITEM_ID_DUNAIL_CARD,
		TIME_ITEM_ID_DULGER_HYUKKENOFUKU,
		TIME_ITEM_ID_TOKIMAZYUTSUSHINO_ROBE,
		TIME_ITEM_ID_TOKUSHUKANNKYO_KATSUDOYO_BOOTS_DARKLORD_CARD,
		TIME_ITEM_ID_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_FUINSARETA_DARKLORD_CARD,
		TIME_ITEM_ID_TRAVELER_RING_GOKETSU,
		TIME_ITEM_ID_NAGANO_UROKOTATE,
		TIME_ITEM_ID_NAGANO_UROKO_YOROI,
		TIME_ITEM_ID_NEKOMIMI_BERET_SET,
		TIME_ITEM_ID_NEMESIS,
		TIME_ITEM_ID_NOBLE_HAT,
		TIME_ITEM_ID_VIOLET_FEAR,
		TIME_ITEM_ID_HAO,
		TIME_ITEM_ID_BANIRMIRTBO_FUYUSURU_KENZYANO_ISHI,
		TIME_ITEM_ID_PARACELSUS_GLOVE_HAO,
		TIME_ITEM_ID_POWERED_SET,
		TIME_ITEM_ID_PIAMET_CHANGE,
		TIME_ITEM_ID_PIKAPIKA_NYANNYAN_CROWN,
		TIME_ITEM_ID_HIMAWARI_SHONEN,
		TIME_ITEM_ID_HYAKKA,
		TIME_ITEM_ID_FIRA_CARD,
		TIME_ITEM_ID_FUINSARETA_ATOLOS_CARD,
		TIME_ITEM_ID_BOOSTER_LANCE_OS,
		TIME_ITEM_ID_FUSHINO_GUNDAN_NINSHIKIHYO_HIMAWARI_SHONEN,
		TIME_ITEM_ID_FUZINO_MAKEN,
		TIME_ITEM_ID_FUSHOHENO_GANTAI_SEIREN_VIENSER_MVP_CARD,
		TIME_ITEM_ID_PLAGARION,
		TIME_ITEM_ID_BLOODY_EAT,
		TIME_ITEM_ID_BLUE_RIBBON,
		TIME_ITEM_ID_FURUBITA_SHADOW_CROWN,
		TIME_ITEM_ID_FURUBITA_SHUGONOKANMURI,
		TIME_ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_BONECIRCRET,
		TIME_ITEM_ID_FURUBITA_BALLERINANO_KAMIKAZARI,
		TIME_ITEM_ID_FURUBITA_BLAZING_SOUL,
		TIME_ITEM_ID_FURUBITA_MINSTRELSONGNO_BOSHI,
		TIME_ITEM_ID_PEOTH_SET,
		TIME_ITEM_ID_ULTIMATE_MODE_CHANGER_PEORTH_ARTIFACT,
		TIME_ITEM_ID_BERET_BOSS_BOSHI,
		TIME_ITEM_ID_HENI_CHIMERA_FULGOR,
		TIME_ITEM_ID_ENCHANT_HOZYONO_MEGAMI_ATLOS,
		TIME_ITEM_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_ATOLOS_CARD,
		TIME_ITEM_ID_BOSOSHITA_MARYOKU,
		TIME_ITEM_ID_HODREMRIN_CARD,
		TIME_ITEM_ID_ENCHANT_HONOIKAZUCHINOOKAMI_AR,
		TIME_ITEM_ID_ENCHANT_HONOIKAZUCHINOOKAMI_DEX100,
		TIME_ITEM_ID_HOHOEMU_MONO,
		TIME_ITEM_ID_VOLCARING,
		TIME_ITEM_ID_POLLUX_BOOK,
		TIME_ITEM_ID_MAGICAL_CLOTH,
		TIME_ITEM_ID_MYSTERY_WING,
		TIME_ITEM_ID_MISRIL_MAGIC_MANT,
		TIME_ITEM_ID_MINSTREL_ARFOSIO_CARD_MINSTREL_ARFOSIO_MVP_CARD,
		TIME_ITEM_ID_MUNEN_MUSO,
		TIME_ITEM_ID_MECHANIC_HAWARD_CARD_MECHANIC_HAWARD_MVP_CARD,
		TIME_ITEM_ID_METAL_DEATH_ADDER,
		TIME_ITEM_ID_MELON_ARMS,
		TIME_ITEM_ID_YUENNARU_TENZYONO_MIYAKO,
		TIME_ITEM_ID_YUSHANO_HIDDEN_CLOTH,
		TIME_ITEM_ID_LAVA_TODO,
		TIME_ITEM_ID_RATATOSK_CAD,
		TIME_ITEM_ID_RALF_FONG_TWIEGE_666,
		TIME_ITEM_ID_RANDEL_ROLENCE_CARD,
		TIME_ITEM_ID_RISUMIMI_HOODBO,
		TIME_ITEM_ID_RING_OF_FLAME_LORD,
		TIME_ITEM_ID_RUEEZENO_AKAIKUTSU_PERMET_TURTLE_CARD,
		TIME_ITEM_ID_LUDE,
		TIME_ITEM_ID_RUDO_MASK,
		TIME_ITEM_ID_RUBEL,
		TIME_ITEM_ID_RUNE_KNIGHT_SEIREN_CARD_RUNE_KNIGHT_SEIREN_MVP_CARD,
		TIME_ITEM_ID_RUDO_CARD,
		TIME_ITEM_ID_RUDONO_ROLLPAPER,
		TIME_ITEM_ID_LEASER_OF_EAGLE_DELAY_CUT,
		TIME_ITEM_ID_LEASER_OF_EAGLE_TRUE_SIGHT,
		TIME_ITEM_ID_RANGER_CECIL_CARD_RANGER_CECIL_MVP_CARD,
		TIME_ITEM_ID_ROYAL_WHIP,
		TIME_ITEM_ID_ROYAL_GUARD_RANDEL_CARD_ROYAL_GUARD_RANDEL_MVP_CARD,
		TIME_ITEM_ID_ROYAL_CELLO,
		TIME_ITEM_ID_LOLANO_TEKKYU_SET,
		TIME_ITEM_ID_ROKINO_ASSASIN_MASK,
		TIME_ITEM_ID_WANDERER_TRENTINI_CARD_WANDERER_TRENTINI_MVP_CARD,
		TIME_ITEM_ID_EXTREME,
		TIME_ITEM_ID_S_ATK,
		TIME_ITEM_ID_S_MATK,
		TIME_ITEM_ID_S_MAXHP,
		TIME_ITEM_ID_S_CRI,
		TIME_ITEM_ID_S_AVOID,
		TIME_ITEM_ID_S_QUICK,
		TIME_ITEM_ID_S_FATAL_FLASH,
		TIME_ITEM_ID_S_FIRING_SHOT,
		TIME_ITEM_ID_S_LUCKY_STRIKE,
		TIME_ITEM_ID_S_OVER_POWER,
		TIME_ITEM_ID_S_SPELL_BUSTER,
		TIME_ITEM_ID_S_UNLIMIT_VITAL,
		TIME_ITEM_ID_T_ASSAULT,
		TIME_ITEM_ID_T_MAGIC_BOOST,
		TIME_ITEM_ID_T_POWER_BOOST,
		TIME_ITEM_ID_X_FATAL_FLASH,
		TIME_ITEM_ID_X_FIRING_SHOT,
		TIME_ITEM_ID_X_LUCKY_STRIKE,
		TIME_ITEM_ID_X_OVER_POWER,
		TIME_ITEM_ID_X_SPELL_BUSTER,
		TIME_ITEM_ID_X_UNLIMIT_VITAL,
		TIME_ITEM_ID_EIYUNO_KONSEKI_SUPPORT,
	];

};



// データ上書き
if (_DATA_CREATE_MODE) {
	CTimeItemDataMaker.OverrideData();
	CTimeItemDataMaker.OverrideSortData();
}

