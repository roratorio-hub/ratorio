
/**
 * 定義済みデータ管理クラス.
 */
function CMigConstDataManager () {

	// 職業用データマネージャ
	this.jobDataManager = null;

	// 状態異常用データマネージャ
	this.stateDataManager = null;

	// バフ用データマネージャ
	this.buffDataManager = null;

	// モンスター用データマネージャ
	this.monsterDataManager = null;

	// 矢用データマネージャ
	this.arrowDataManager = null;

	// アイテム用データマネージャ
	this.itemDataManager = null;

	// カード用データマネージャ
	this.cardDataManager = null;

	// エンチャントリスト用データマネージャ
	this.enchListDataManager = null;

	// ランダムオプション用データマネージャ
	this.rndOptDataManager = null;

	// データマネージャ検索用配列
	this.managerSearchArray = null;




	/**
	 * イニシャライザ.
	 */
	this.Initialize = function () {

		this.jobDataManager = new CMigConstDataManagerSubJob();
		this.stateDataManager = new CMigConstDataManagerSubState();
		this.buffDataManager = new CMigConstDataManagerSubBuff();
		this.monsterDataManager = new CMigConstDataManagerSubMonster();
		this.arrowDataManager = new CMigConstDataManagerSubArrow();
		this.itemDataManager = new CMigConstDataManagerSubItem();
		this.cardDataManager = new CMigConstDataManagerSubCard();
		this.enchListDataManager = new CMigConstDataManagerSubEnchList();
		this.rndOptDataManager = new CMigConstDataManagerSubRndOpt();

		this.managerSearchArray = [];

		this.managerSearchArray[CONST_DATA_KIND_JOB] = this.jobDataManager;
		this.managerSearchArray[CONST_DATA_KIND_STATE] = this.stateDataManager;
		this.managerSearchArray[CONST_DATA_KIND_BUFF] = this.buffDataManager;
		this.managerSearchArray[CONST_DATA_KIND_MONSTER] = this.monsterDataManager;
		this.managerSearchArray[CONST_DATA_KIND_ARROW] = this.arrowDataManager;
		this.managerSearchArray[CONST_DATA_KIND_ITEM] = this.itemDataManager;
		this.managerSearchArray[CONST_DATA_KIND_CARD] = this.cardDataManager;
		this.managerSearchArray[CONST_DATA_KIND_ENCHANT_LIST] = this.enchListDataManager;
		this.managerSearchArray[CONST_DATA_KIND_RND_OPT] = this.rndOptDataManager;
	}





	/**
	 * マネージャのインスタンスを取得する.
	 * @param dataKind データ種別
	 * @return マネージャのインスタンス
	 */
	this.GetDataManger = function (dataKind) {
		return this.managerSearchArray[dataKind];
	};



	/**
	 * 定義済みデータオブジェクトを取得する（オブジェクト化あり）.
	 * @param dataKind データ種別
	 * @param dataId データID
	 * @return 定義済みデータオブジェクト（該当がない場合は null）
	 */
	this.GetDataObject = function (dataKind, dataId) {
		return this.managerSearchArray[dataKind].GetDataObject(dataId);
	};



	/**
	 * 定義済みデータIDを取得する（オブジェクト化なし）.
	 * @param dataKind データ種別
	 * @param dataName データ名称
	 * @return 定義済みデータID
	 */
	this.GetIdByName = function (dataKind, dataName) {
		return this.managerSearchArray[dataKind].GetIdByName(dataName);
	};

	/**
	 * 定義済みデータIDを取得する（スロット付記を考慮）（オブジェクト化なし）.
	 * @param dataKind データ種別
	 * @param dataName データ名称
	 * @return 定義済みデータID
	 */
	this.GetIdByNameSlotted = function (dataKind, dataName) {
		return this.managerSearchArray[dataKind].GetIdByNameSlotted(dataName);
	};

	/**
	 * 定義済みデータの参照IDを取得する（オブジェクト化なし）.
	 * @param dataKind データ種別
	 * @param dataId データID
	 * @return 定義済みデータの参照ID
	 */
	this.GetRefId = function (dataKind, dataId) {
		return this.managerSearchArray[dataKind].GetRefId(dataId);
	};

	/**
	 * 定義済みデータの公式IDを取得する（オブジェクト化なし）.
	 * @param dataKind データ種別
	 * @param dataId データID
	 * @return 定義済みデータの公式ID
	 */
	this.GetOfficialId = function (dataKind, dataId) {
		return this.managerSearchArray[dataKind].GetOfficialId(dataId);
	};

	/**
	 * 定義済みデータの名称を取得する（オブジェクト化なし）.
	 * @param dataKind データ種別
	 * @param dataId データID
	 * @return 定義済みデータの名称
	 */
	this.GetName = function (dataKind, dataId) {
		return this.managerSearchArray[dataKind].GetName(dataId);
	};

	/**
	 * 定義済みデータのフル名称を取得する（オブジェクト化なし）.
	 * @param dataKind データ種別
	 * @param dataId データID
	 * @return 定義済みデータのフル名称
	 */
	this.GetFullyName = function (dataKind, dataId) {
		return this.managerSearchArray[dataKind].GetFullyName(dataId);
	};

	/**
	 * 定義済みデータの読み仮名を取得する（オブジェクト化なし）.
	 * @param dataKind データ種別
	 * @param dataId データID
	 * @return 定義済みデータの読み仮名
	 */
	this.GetKana = function (dataKind, dataId) {
		return this.managerSearchArray[dataKind].GetKana(dataId);
	};





	this.Initialize();
}
