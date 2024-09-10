/**
 * 装備可能品固定データクラス.
 * @param dataArrayC 設定するデータ配列（省略可）
 */
function CMigEquipableStaticData (dataArrayC) {

	// 属性マップ
	this.attrMap = null;



	/**
	 * 無名イニシャライザ.
	 * @param dataArray 設定するデータ配列（省略可）
	 */
	(function () {

		var idx = 0;

		// 初期化
		this.attrMap = new Map();

		// 初期データ設定
		if (dataArrayC) {
			for (idx = 0; idx < dataArrayC.length; idx++) {
				this.attrMap.set(dataArrayC[idx][0], dataArrayC[idx][1]);
			}
		}
	}).call(this);



	/**
	 * 属性を設定する.
	 * @param key キー
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 * @remark value が undefined の場合は設定しない
	 */
	this.SetAttribute = function (key, value) {

		if (value != undefined) {
			this.attrMap.set(key, value);
		}

		return this;
	};

	/**
	 * 属性値を追加する.
	 * @param key キー
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 * @remark value が undefined の場合は設定しない
	 */
	this.AddAttribute = function (key, value) {

		var valueArray = null;

		if (value != undefined) {

			valueArray = this.attrMap.get(key);

			// 新規の場合、配列を確保
			if (valueArray === undefined) {
				valueArray = [];
				this.attrMap.set(key, valueArray);
			}

			// 新規、もしくは配列が設定されている場合のみ、値を追加
			if (Array.isArray(valueArray)) {
				valueArray.push(value);
			}
		}

		return this;
	};

	/**
	 * 属性を取得する.
	 * @param key キー
	 * @return 属性
	 */
	this.GetAttribute = function (key) {
		return this.attrMap.get(key);
	};



	/**
	 * 配列データ化する.
	 * @return 配列データ
	 */
	this.ToArrayData = function () {

		var arrayData = null;

		// 配列確保
		arrayData = [];

		// 全ての属性を追記
		this.attrMap.forEach(
			function (valueF, keyF, mapF) {
				if (Array.isArray(valueF)) {
					arrayData.push([keyF, valueF.slice()]);
				}
				else {
					arrayData.push([keyF, valueF]);
				}
			}
		);

		return arrayData;
	};
}