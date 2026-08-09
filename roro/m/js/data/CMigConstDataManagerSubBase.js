/*

	『データソース配列』と『データオブジェクト配列』の２種類を持つ。
	『データオブジェクト』は、データソースを元に作られる、CMigEquipableData クラスのオブジェクトである。
	この『データオブジェクト』は、初期処理として全てのデータに作られるのではなく、
	初回の『データオブジェクト』取得要求があった際に生成される。

*/

/**
 * データマネージャ基底クラス.
 */
export function CMigConstDataManagerSubBase () {

	// データオブジェクトのクラス
	this.dataObjectClass = null;

	// IDのデータ位置
	this.dataIndexId = -1;

	// 参照IDのデータ位置
	this.dataIndexRefId = -1;

	// 公式IDのデータ位置
	this.dataIndexOfficialId = -1;

	// 名称カナ配列のデータ位置
	this.dataIndexNameKanaArray = -1;

	// データソース配列
	this.sourceArray = null;

	// データオブジェクト配列
	this.objectArray = null;


	// 移行データがが登録されているIDの配列
	this.registeredIdArray = null;


	/**
	 * データオブジェクトを取得する（オブジェクト化あり）.
	 * @param dataId データID
	 * @return データオブジェクト
	 */
	this.GetDataObject = function (dataId) {

		// まだオブジェクト化されていないデータなら、オブジェクト化する
		if (this.objectArray[dataId] === undefined) {

			// TODO: 移行時処理　本来は発生しないはず
			if (this.sourceArray[dataId] === undefined) {
				return null;
			}

			this.objectArray[dataId] = new this.dataObjectClass(this.sourceArray[dataId]);
		}

		return this.objectArray[dataId];
	};


	/**
	 * データIDを取得する（オブジェクト化なし）.
	 * @param dataName データ名称
	 * @return 公式ID
	 */
	this.GetIdByName = function (dataName) {

		var idx = 0;

		for (idx = 0; idx < this.sourceArray.length; idx++) {
			if (this.GetName(idx) == dataName) {
				return this.sourceArray[idx][this.dataIndexId];
			}
		}

		return -1;
	};

	/**
	 * データIDを取得する（スロット付記を考慮）（オブジェクト化なし）.
	 * @param dataName データ名称
	 * @return 公式ID
	 */
	this.GetIdByNameSlotted = function (dataName) {

		// オーバーライドされていない場合は、考慮しないのと同じ処理
		return this.GetIdByName(dataName);
	};

	/**
	 * 参照IDを取得する（オブジェクト化なし）.
	 * @param dataId データID
	 * @return 参照ID
	 */
	this.GetRefId = function (dataId) {
		return this.sourceArray[dataId][this.dataIndexRefId];
	};

	/**
	 * 公式IDを取得する（オブジェクト化なし）.
	 * @param dataId データID
	 * @return 公式ID
	 */
	this.GetOfficialId = function (dataId) {
		return this.sourceArray[dataId][this.dataIndexOfficialId];
	};

	/**
	 * 名称を取得する（オブジェクト化なし）.
	 * @param dataId データID
	 * @return 名称
	 */
	this.GetName = function (dataId) {
		return this.sourceArray[dataId][this.dataIndexNameKanaArray][0][0];
	};

	/**
	 * フル名称を取得する（オブジェクト化なし）.
	 * @param dataId データID
	 * @return 名称
	 * @remark 主にアイテム名にスロット識別子を付与するため（オーバーライド）
	 */
	this.GetFullyName = function (dataId) {
		return this.GetName(dataId);
	};

	/**
	 * 読み仮名を取得する（オブジェクト化なし）.
	 * @param dataId データID
	 * @return 名称
	 */
	this.GetKana = function (dataId) {
		return this.sourceArray[dataId][this.dataIndexNameKanaArray][0][1];
	};


	/**
	 * 存在するデータIDを列挙する（オブジェクト化なし）.
	 * @return ID配列（データがない場合は空配列）
	 */
	this.EnumId = function () {

		var idx = 0;
		var enumed = [];

		for (idx = 0; idx < this.sourceArray.length; idx++) {
			enumed.push(this.sourceArray[idx][this.dataIndexId]);
		}

		return enumed;
	};


	// TODO: データ移行過渡処理

		// TODO: データ移行過渡処理

	/**
	 * 移行データがが登録されているIDの配列を取得する（オブジェクト化なし）.
	 * @return 移行データがが登録されているIDの配列
	 */
	this.GetRegisteredIdArray = function () {

		var idx = 0;

		if (this.registeredIdArray == null) {
			this.registeredIdArray = new Array();

			for (idx = 0; idx < this.sourceArray.length; idx++) {
				if (this.sourceArray[idx] !== undefined) {
					this.registeredIdArray.push(this.sourceArray[idx][this.dataIndexId]);
				}
			}
		}

		return this.registeredIdArray.slice();
	};
}
