



// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();





//================================================================================================================================
//================================================================================================================================
//
//
// キャラクターデータマネージャ
//
//
//================================================================================================================================
//================================================================================================================================

/**
 * キャラクターデータマネージャ.
 * @param refConstDataManagerC 参照する定義済みデータマネージャ
 */
function CMigCharaDataManager (refConstDataManagerC) {

	// 参照する定義済みデータマネージャ
	this.refConstDataManager = null;

	// キャラクターデータのマップ
	this.charaDataMap = new Map();



	/**
	 * イニシャライザ.
	 * @param refConstDataManager 参照する定義済みデータマネージャ
	 */
	this.Initialize = function (refConstDataManager) {

		this.refConstDataManager = refConstDataManager;
		this.charaDataMap = new Map();
	};



	/**
	 * キャラクターデータを生成する（登録はされない）.
	 * @return キャラクターデータ
	 */
	this.CreateCharaData = function () {
		return new CMigCharaData(this.refConstDataManager);
	};

	/**
	 * キャラクターデータを登録する.
	 * @param dataId データＩＤ
	 * @param charaData キャラクターデータ
	 * @return キャラクターデータのＩＤ
	 */
	this.RegisterCharaData = function (dataId, charaData) {
		return this.charaDataMap.set(dataId, charaData);
	};

	/**
	 * キャラクターデータを取得する.
	 * @param dataId データＩＤ
	 * @return キャラクターデータ
	 */
	this.GetCharaData = function (dataId) {
		return this.charaDataMap.get(dataId);
	};





	// イニシャライザ実行
	this.Initialize(refConstDataManagerC);
}





