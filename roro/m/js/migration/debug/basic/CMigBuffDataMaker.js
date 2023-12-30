
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();





//----------------------------------------------------------------
// バフデータ作成用データクラス
//----------------------------------------------------------------

/**
 * バフデータ作成クラス.
 */
function CMigBuffMakeData () {

	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		// データを設定
		this.id = 0;
		this.refId = -1;
		this.officialId = 0;
		this.nameKanaArray = [];
		this.slot = 0;
		this.staticData = new CMigEquipableStaticData();
		this.spDataArray = [];
		this.explainArray = [];
		this.noteArray = [];

	}).call(this);

}
CMigBuffMakeData.prototype = new CMigEquipableDataMakeInfo();






// データ作成モードなら、本番データを上書き
// ↓パーサ出力結果ファイルの内容は、ここ以降をすべて置換↓
if (_DATA_CREATE_MODE) {		// _DATA_CREATE_MODE



(function () {

	// データ追加対象データ配列取得
	var dataArray = g_constDataManager.buffDataManager.sourceArray;



	// TODO: 移行過渡期の処理
	// 以降は、新方式で追加したデータ。初回リリースまでは、調整可



	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_NONE", 0))
		.AddNameKana("なし", "ナシ")
		.AddExplain("バフなし")
		.ToArrayData()
	);



	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_CHOTOSU_MOSHIN", -1))
		.AddNameKana("猪突猛進", "チョトツモウシン")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_KONGO", -1))
		.AddNameKana("金剛", "コンゴウ")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_SHUCHURYOKU_KOZYO", -1))
		.AddNameKana("集中力向上", "シュウチュウリョクコウジョウ")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_UNLIMIT", -1))
		.AddNameKana("アンリミット", "アンリミット")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_ENDURE", -1))
		.AddNameKana("インデュア", "インデュア")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_MASQUERADE_IGNORANCE", -1))
		.AddNameKana("マスカレード:イグノアランス", "マスカレードイグノアランス")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_SHIPPU", -1))
		.AddNameKana("疾風", "シップウ")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_TELEKINESIS_INTENSE", -1))
		.AddNameKana("テレキネシスインテンス", "テレキネシスインテンス")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_RUNE_STONE_SKILL", -1))
		.AddNameKana("ルーンストーンスキル", "ルーンストーンスキル")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_BERKANA_STONE", -1))
		.AddNameKana("ベルカナストーン", "ベルカナストーン")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_KAAHI", -1))
		.AddNameKana("カアヒ", "カアヒ")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_REFRESH", -1))
		.AddNameKana("リフレッシュ", "リフレッシュ")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_ENERGY_COAT", -1))
		.AddNameKana("エナジーコート", "エナジーコート")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_INVISIBILITY", -1))
		.AddNameKana("インビジビリティ", "インビジビリティ")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_GYAKUSATSU", -1))
		.AddNameKana("虐殺", "ギャクサツ")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);

	// 手動登録
	dataArray.push(new CMigBuffMakeData()
		.SetId(g_constDataManager.buffDataManager.RegisterId("MIG_BUFF_ID_HAMETSU", -1))
		.AddNameKana("破滅", "ハメツ")
		.AddExplain("※計算機未対応")
		.ToArrayData()
	);






})();



}		// _DATA_CREATE_MODE