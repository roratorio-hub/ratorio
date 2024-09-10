/**
 * 装備可能品SPタグクラス.
 * @param dataArrayC 設定するデータ配列（省略可）
 */
function CMigEquipableSpTag (dataArrayC) {

	// SPID
	this.spid = 0;

	// 属性マップ
	this.attrMap = null;



	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		var idx = 0;

		// 初期化
		this.spid = 0;
		this.attrMap = new Map();

		// 初期データ設定
		if (dataArrayC) {

			// SPIDを読み取る
			this.spid = dataArrayC[0];

			// 属性マップを読み取る
			for (idx = 1; idx < dataArrayC.length; idx++) {
				this.attrMap.set(dataArrayC[idx][0], dataArrayC[idx][1]);
			}
		}

	}).call(this);



	/**
	 * SPIDを設定する.
	 * @param spid SPID
	 * @return 自身のインスタンス（this）
	 */
	this.SetSpId = function (spid) {
		this.spid = spid;
		return this;
	};

	/**
	 * SPIDを取得する.
	 * @return SPID
	 */
	this.GetSpId = function () {
		return this.spid;
	};



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
	 * 属性値を除去する.
	 * @param key キー
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 * @remark value が undefined の場合は設定しない
	 */
	this.RemoveAttribute = function (key, value) {

		var indexOfValue = 0;
		var valueArray = null;

		if (value != undefined) {

			valueArray = this.attrMap.get(key);

			// キーが存在しない場合
			if (valueArray === undefined) {
				// 処理なし
			}

			// 取得した属性値が配列の場合
			else if (Array.isArray(valueArray)) {

				// 指定の値の位置を取得
				indexOfValue = valueArray.indexOf(value);

				// 指定の値が含まれる場合
				if (indexOfValue >= 0) {

					// 該当要素を削除
					valueArray.splice(indexOfValue, 1);

					// 要素がなくなった場合は、キーごと削除
					if (valueArray.length == 0) {
						this.attrMap.delete(key);
					}
				}
			}

			// 取得した属性値がスカラ値の場合
			else {
				// キーごと削除
				this.attrMap.delete(key);
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
	 * 属性と値を列挙する.
	 * @return [キー, 値] の配列
	 */
	this.EnumAttributes = function () {

		var dataArray = null;

		dataArray = [];

		this.attrMap.forEach(
			function (valueF, keyF, mapF) {
				if (Array.isArray(valueF)) {
					dataArray.push([keyF, valueF.slice()]);
				}
				else {
					dataArray.push([keyF, valueF]);
				}
			}
		);

		return dataArray;
	};



	/**
	 * 一致判定する.
	 * @param spTag 判定するSPタグ
	 * @param ignoreAttrArray 判定を行わない（一致とみなす）属性IDの配列
	 * @param bExact 完全一致で判定するかのフラグ
	 * @return true:一致、false:不一致
	 */
	this.IsEqual = function (spTag, ignoreAttrArray, bExact) {

		var idx = 0;

		var bEqual = false;
		var effectiveCountThis = 0;
		var effectiveCountParam = 0;

		// 属性配列が未指定の場合は、空配列を設定しておく
		if (!ignoreAttrArray) {
			ignoreAttrArray = [];
		}

		// SPIDの一致検査
		if (spTag.spid != this.spid) {
			return false;
		}

		// 一致判定対象となる属性数を計算
		effectiveCountThis = this.attrMap.size;
		effectiveCountParam = spTag.attrMap.size;

		for (idx = 0; idx < ignoreAttrArray.length; idx++) {

			if (this.attrMap.get(ignoreAttrArray[idx]) !== undefined) {
				effectiveCountThis--;
			}

			if (spTag.attrMap.get(ignoreAttrArray[idx]) !== undefined) {
				effectiveCountParam--;
			}
		}

		// 属性数の一致検査
		if (effectiveCountThis != effectiveCountParam) {
			return false;
		}

		// 属性値の一致検査
		bEqual = true;

		// 引数で渡された、判定するSPタグのすべての属性について、順に判定する
		spTag.attrMap.forEach(
			function (valueF, keyF, mapF) {

				// 判定除外対象に指定されていない場合のみ、判定する
				if (ignoreAttrArray.indexOf(keyF) < 0) {

					// 完全一致判定の場合
					if (bExact) {
						bEqual &= this.IsExactAttributeValue(keyF, valueF);
					}

					// それ以外の場合
					else {
						bEqual &= this.IsIncludedAttributeValue(keyF, valueF);
					}
				}
			},
			this
		);

		if (!bEqual) {
			return false;
		}



		// ここまでくれば一致
		return true;
	};

	/**
	 * 属性値の完全一致判定をする.
	 * @param spTag 判定するSPタグ
	 * @return true:包含、false:包含されない
	 */
	this.IsExactAttributeValue = function (attrId, attrValue) {

		var idx = 0;

		var thisAttrValue = null;

		// 自身の、指定属性の値を取得
		thisAttrValue = this.attrMap.get(attrId);

		// 自身に存在しない属性の場合は、不一致
		if (thisAttrValue === undefined) {
			return false;
		}

		// 自身の指定属性の値が配列で、判定する値も配列の場合
		if (Array.isArray(thisAttrValue) && Array.isArray(attrValue)) {

			// 長さ不一致は、return false
			if (thisAttrValue.length != attrValue.length) {
				return false;
			}

			// 全ての値について、一致しているかを判定する
			for (idx = 0; idx < attrValue.length; idx++) {

				// TODO: 配列内の順序違いを許容するか、要検討
				// ひとつでも一致しないものが見つかったら、その時点で return false
				if (thisAttrValue[idx] != attrValue[idx]) {
					return false;
				}
			}
		}

		// 自身の指定属性の値が単一値で、判定する値も単一値の場合
		else if ((!Array.isArray(thisAttrValue)) && (!Array.isArray(attrValue))) {

			// 一致しない場合は、return false
			if (thisAttrValue != attrValue) {
				return false;
			}
		}

		// 単一値と配列は、return false
		else {
			return false;
		}



		// ここに来るならば、問題なし
		return true;
	};

	/**
	 * 属性値の包含判定をする.
	 * @param spTag 判定するSPタグ
	 * @return true:包含、false:包含されない
	 */
	this.IsIncludedAttributeValue = function (attrId, attrValue) {

		var idx = 0;

		var thisAttrValue = null;

		// 自身の、指定属性の値を取得
		thisAttrValue = this.attrMap.get(attrId);

		// 自身に存在しない属性の場合は、含まれない
		if (thisAttrValue === undefined) {
			return false;
		}

		// 自身の指定属性の値が、配列の場合
		if (Array.isArray(thisAttrValue)) {

			// 判定する値が、配列の場合
			if (Array.isArray(attrValue)) {

				// 全ての判定する値について、自身の配列に含まれているかを判定する
				for (idx = 0; idx < attrValue.length; idx++) {

					// ひとつでも含まれていないものが見つかったら、その時点で return false
					if (thisAttrValue.indexOf(attrValue[idx]) < 0) {
						return false;
					}
				}
			}

			// 判定する値が、単一値の場合
			else {

				// 自身の配列に含まれていない場合は、return false
				if (thisAttrValue.indexOf(attrValue) < 0) {
					return false;
				}
			}
		}

		// 自身の指定属性の値が、単一値の場合
		else {

			// 判定する値が、配列の場合
			if (Array.isArray(attrValue)) {

				// 判定する値が重複しいない限り、自身と一致しえないので、無条件で return false
				return false;
			}

			// 判定する値が、単一値の場合
			else {

				// 自身の値と一致しない場合は、return false
				if (thisAttrValue != attrValue) {
					return false;
				}
			}
		}



		// ここに来るならば、問題なし
		return true;
	};



	/**
	 * 複製する.
	 * @return 複製されたインスタンス
	 */
	this.Clone = function () {

		var spTag = null;

		// インスタンス用意
		spTag = new CMigEquipableSpTag();

		// ID複製
		spTag.SetSpId(this.spid);

		// 属性複製
		this.attrMap.forEach(
			function (valueF, keyF, mapF) {
				if (Array.isArray(valueF)) {
					spTag.SetAttribute(keyF, valueF.slice());
				}
				else {
					spTag.SetAttribute(keyF, valueF);
				}
			}
		);

		return spTag;
	};




	/**
	 * 配列データ化する.
	 * @return 配列データ
	 */
	this.ToArrayData = function () {

		var idx = 0;

		var arrayData = null;

		// 配列確保
		arrayData = [];

		// 固定情報を追記
		arrayData.push(this.spid);

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