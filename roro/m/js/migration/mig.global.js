





// 移行後は common などに移動するもの

//----------------------------------------------------------------
// 装備箇所ＩＤ定義
//----------------------------------------------------------------

CGlobalConstManager.DefineEnum(
	"EnumMigCharaManagerId",
	[
		"MIG_CHARA_MANAGER_ID_MAIN",
	],
	0,
	1
);






// TODO: これらのグローバル変数のインスタンスを置き換えると、クラスのprototype宣言部分で古いデータが参照され続ける可能性がある



// キャラクターデータマネージャ
g_charaDataManager = new CMigCharaDataManager(g_constDataManager);

(function () {

	var idx = 0;
	var charaData = null;

	for (idx = 0; idx < EnumMigCharaManagerId.Count; idx++) {
		charaData = g_charaDataManager.CreateCharaData();
		g_charaDataManager.RegisterCharaData(MIG_CHARA_MANAGER_ID_MAIN, charaData);
	}

})();

