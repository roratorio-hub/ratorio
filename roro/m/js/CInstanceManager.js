


/**
 * インスタンスマネージャクラス.
 */
function CInstanceManager () {

	// 登録済みの最大ＩＤ
	this.idMax = 0;

	// 登録済みのインスタンス情報リスト
	this.instanceInfoList = [];



	/**
	 * インスタンスを登録する.
	 * @param objInstance 登録するインスタンス
	 * @return インスタンスのＩＤ
	 */
	this.registerInstance = function (objInstance) {

		var idx = 0;

		var idNew = 0;

		// 登録済み検査
		for (idx = 0; idx < this.instanceInfoList.length; idx++) {
			if (this.instanceInfoList[idx][1] === objInstance) {
				return this.instanceInfoList[idx][0];
			}
		}

		// 新規ＩＤ取得
		idNew = ++this.idMax;

		// 新規登録
		this.instanceInfoList[idx] = [
			idNew,
			objInstance
		];

		return idNew;
	};

	/**
	 * インスタンスをＩＤで検索する.
	 * @param instanceId インスタンスのＩＤ
	 * @return インスタンス
	 */
	this.searchInstanceById = function (instanceId) {

		var idx = 0;

		// 検索
		for (idx = 0; idx < this.instanceInfoList.length; idx++) {
			if (this.instanceInfoList[idx][0] == instanceId) {
				return this.instanceInfoList[idx][1];
			}
		}

		return null;
	};

	/**
	 * インスタンスのリストを取得する.
	 * @return インスタンスの配列
	 */
	this.getInstanceList = function () {

		var idx = 0;
		var list = [];

		// 検索
		for (idx = 0; idx < this.instanceInfoList.length; idx++) {
			list.push(this.instanceInfoList[idx][1]);
		}

		return list;
	};
}
