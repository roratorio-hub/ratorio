/**
 * エンチャントリストデータマネージャクラス.
 */
function CMigConstDataManagerSubEnchList () {

	// エンチャント効果の並び順定義配列
	this.sortedEnchantCardIdArray = [];

	// アイテムIDによる逆引き配列（二次元配列）
	this.reverseResolveArrayItemId = [];

	// カードIDによる逆引き配列（二次元配列）
	this.reverseResolveArrayCardId = [];

	// TODO: 一応、データ配列は用意するようにしたが、現状、処理では直接判定している（hmcard.js）
	// アップグレード系の特殊処理が必要なエンチャントリストIDの配列
	this.upgradeTypeIdArray = [];



	//----------------
	// 継承定義は、クラス本体の次に記述
	//----------------



	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		// TODO: アイテムデータのまま

		// データを設定
		this.dataObjectClass = CMigEquipableData;
		this.dataIndexId = MIG_EQUIPABLE_DATA_INDEX_ID;
		this.dataIndexRefId = MIG_EQUIPABLE_DATA_INDEX_REF_ID;
		this.dataIndexOfficialId = MIG_EQUIPABLE_DATA_INDEX_OFFICIAL_ID;
		this.dataIndexNameKanaArray = MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY;
		this.sourceArray = [];
		this.objectArray = [];

		// TODO: データ移行過渡処理
		this.idEnumObjectName = "EnumMigEnchListId";

	}).call(this);




	/**
	 * アイテムIDに対応するエンチャントリストのID配列を取得する.
	 * @param itemId アイテムID
	 * @return エンチャントリストのID配列
	 */
	this.GetEnchListIdArrayByItemId = function (itemId) {

		if (Array.isArray(this.reverseResolveArrayItemId[itemId])) {
			return this.reverseResolveArrayItemId[itemId].slice();
		}

		return [];
	};

}
CMigConstDataManagerSubEnchList.prototype = new CMigConstDataManagerSubBase();