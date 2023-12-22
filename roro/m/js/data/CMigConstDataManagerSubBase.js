
/*

	『データソース配列』と『データオブジェクト配列』の２種類を持つ。
	『データオブジェクト』は、データソースを元に作られる、CMigEquipableData クラスのオブジェクトである。
	この『データオブジェクト』は、初期処理として全てのデータに作られるのではなく、
	初回の『データオブジェクト』取得要求があった際に生成される。

*/

/**
 * データマネージャ基底クラス.
 */
function CMigConstDataManagerSubBase () {

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



	// TODO: データ移行過渡処理

	// IDの定数を管理するオブジェクトの名称
	this.idEnumObjectName = "";

	// データIDの定数定義管理オブジェクト
	this.idEnumObject = null;

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

	/**
	 * IDを定数登録する（最終的には、デバッグ状況化でしかコールされない想定）.
	 * @param defName 定数名
	 * @param desiredValue 希望する値
	 * @return 実際に登録された定数値
	 */
	this.RegisterId = function (defName, desiredValue) {

		var defValue = -1;
		var registeredValue = undefined;



		// ID管理用定数オブジェクトを取得
		this.idEnumObject = CGlobalConstManager.SearchMap(this.idEnumObjectName);

		// 存在しない場合は登録
		if (this.idEnumObject == null) {
			CGlobalConstManager.DefinePseudoEnum(this.idEnumObjectName, [this.idEnumObjectName + "_dummy"], -1, 0);
			this.idEnumObject = CGlobalConstManager.SearchMap(this.idEnumObjectName).value;
		}

		// 存在する場合は、本体を取り出す
		else {
			this.idEnumObject = this.idEnumObject.value;
		}



		// 希望する値が指定されている場合、定義予定値をその値に設定する
		if (desiredValue !== undefined) {
			if (desiredValue >= 0) {
				defValue = desiredValue;
			}
		}

		// この時点で、定義予定値が自動の場合、登録済みIDの個数を、定義予定値とする
		if (defValue < 0) {
			defValue = this.idEnumObject.Count;
		}



		// TODO: データ移行過渡処理
		// 既存の定義を検索して、値があれば同じ値を登録する

		var objNaemOld = this.idEnumObjectName.replace(/^EnumMig/, "Enum");
		var objOld = null;
		var defNameOld = defName.replace(/^MIG_/, "");
		var defValueOld = 0;

		// 旧データオブジェクトを取得
		objOld = CGlobalConstManager.SearchMap(objNaemOld);

		// 旧データがあれば検索
		if (objOld) {
			defValueOld = objOld.value.GetDefinedValue(defNameOld);

			if (defValueOld !== undefined) {
				defValue = defValueOld;
			}
		}



		// すでに同じ定数が登録されている場合、同じ値ならばそのまま返す
		registeredValue = this.idEnumObject.GetDefinedValue(defName);
		if (registeredValue !== undefined) {

			// 希望する値が指定されているにもかかわらず、それと異なる場合はアラート表示
			if (desiredValue !== undefined) {
				if (desiredValue >= 0) {
					if (registeredValue != desiredValue) {
						alert("希望するIDとすでに登録済みのIDが一致しません。\r\n" + this.idEnumObjectName + " :\r\n" + "\t希望したID : " + desiredValue + "\r\n" + "\t登録済みID : " + registeredValue);
					}
				}
			}

			return registeredValue;
		}

		// そうでなければ、登録して返す
		CGlobalConstManager.DefineEnum(this.idEnumObjectName, [defName], defValue, 0);

		return defValue;
	};

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