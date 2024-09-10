
/**
 * 装備可能品SPデータ適合検査マッチングコアクラス.
 * @param spidC 設定するspid（省略可）
 * @param attrIdC 設定する属性ID（省略可）
 * @param attrValueArrayC 設定する属性値配列（省略可）
 */
function CMigEquipableSpDataAttributeMatchingCore (spidC, attrIdC, attrValueArrayC) {

	// SPID
	this.spid = spidC ? spidC : 0;

	// 属性SPID
	this.attrId = attrIdC ? attrIdC : 0;

	// 属性値配列
	this.attrValueArray = attrValueArrayC ? attrValueArrayC.slice() : [];
}

/**
 * 装備可能品SPデータ適合検査条件クラス.
 * @param spidC 設定するspid（省略可）
 * @param attrIdC 設定する属性ID（省略可）
 * @param attrValueArrayC 設定する属性値配列（省略可）
 */
function CMigEquipableSpDataAttributeMatcher (matchingCoreArrayC) {

	// マッチングコアの配列
	this.matchingCoreArray = matchingCoreArrayC ? matchingCoreArrayC : [];
}





/**
 * 装備可能品SPデータクラス.
 * @param dataArrayC 設定するデータ配列（省略可）
 */
function CMigEquipableSpData (dataArrayC) {

	// SPタグ
	this.spTag = null;

	// 値
	this.value = null;

	// 子要素配列
	this.children = null;



	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		var idx = 0;

		// 初期化
		this.spTag = new CMigEquipableSpTag();
		this.value = null;
		this.valueUnit = MIG_VALUE_UNIT_ID_NONE;
		this.children = [];

		// 初期データ設定
		if (dataArrayC) {

			// SPタグを読み取る
			this.spTag = new CMigEquipableSpTag(dataArrayC[0]);

			// 値を読み取る
			this.value = dataArrayC[1];

			// 最後尾の配列を元に、子要素を処理
			for (idx = 0; idx < dataArrayC[2].length; idx++) {
				this.children.push(new CMigEquipableSpData(dataArrayC[2][idx]));
			}
		}

	}).call(this);



	/**
	 * SPIDを設定する.
	 * @param spid SPID
	 * @return 自身のインスタンス（this）
	 */
	this.SetSpId = function (spid) {
		this.spTag.SetSpId(spid);
		return this;
	};

	/**
	 * SPIDを取得する.
	 * @return SPID
	 */
	this.GetSpId = function () {
		return this.spTag.GetSpId();
	};



	/**
	 * 属性を設定する.
	 * @param key キー
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 * @remark value が undefined の場合は設定しない
	 */
	this.SetAttribute = function (key, value) {

		this.spTag.SetAttribute(key, value);

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

		this.spTag.AddAttribute(key, value);

		return this;
	};

	/**
	 * 属性を取得する.
	 * @param key キー
	 * @return 属性
	 */
	this.GetAttribute = function (key) {
		return this.spTag.GetAttribute(key);
	};



	/**
	 * SPタグを設定する.
	 * @param spTag SPタグ
	 * @return 自身のインスタンス（this）
	 */
	this.SetSpTag = function (spTag) {
		this.spTag = spTag;
		return this;
	};

	/**
	 * SPタグを取得する（複製）.
	 * @param key キー
	 * @return 属性
	 */
	this.GetSpTag = function () {
		return this.spTag.Clone();
	};



	/**
	 * 値を設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetValue = function (value) {
		this.value = value;
		return this;
	};

	/**
	 * 値を取得する.
	 * @return 値
	 */
	this.GetValue = function () {
		return this.value;
	};



	/**
	 * 子要素を追加する.
	 * @param value 子要素
	 * @return 自身のインスタンス（this）
	 * @remark value が undefined の場合は設定しない
	 */
	this.AddChild = function (value) {

		if (value != undefined) {
			this.children.push(value);
		}

		return this;
	};

	/**
	 * 子要素配列を取得する.
	 * @return 子要素配列
	 */
	this.GetChildren = function () {
		return this.children;
	};



	/**
	 * 複製する.
	 * @param bCloneChild 子要素の複製を行うかのフラグ（省略時は、行う）
	 * @return 複製されたインスタンス
	 */
	this.Clone = function (bCloneChild) {

		var idx = 0;

		var spData = null;

		if (bCloneChild === undefined) {
			bCloneChild = true;
		}

		// インスタンス用意
		spData = new CMigEquipableSpData();

		// SPタグ複製
		spData.SetSpTag(this.spTag.Clone());

		// 値複製
		spData.SetValue(this.value);

		// 子要素配列
		if (bCloneChild) {
			for (idx = 0; idx < this.children.length; idx++) {
				spData.AddChild(this.children[idx].Clone(bCloneChild));
			}
		}

		return spData;
	};



	/**
	 * 配列データ化する.
	 * @return 配列データ
	 */
	this.ToArrayData = function () {

		var idx = 0;

		var arrayData = null;
		var childDataArray = null;

		// 配列確保
		arrayData = [];

		// SPタグ情報を追記
		arrayData.push(this.spTag.ToArrayData());

		// 値を追記
		arrayData.push(this.value);

		// 全ての子要素を追記
		childDataArray = [];
		for (idx = 0; idx < this.children.length; idx++) {
			childDataArray.push(this.children[idx].ToArrayData());
		}
		arrayData.push(childDataArray);

		return arrayData;
	};



	/**
	 * 指定の属性と値の組み合わせを持つデータがあるかを検査する.
	 * @param attrMatcher 装備可能品SPデータ適合検査条件
	 * @param bCheckChild 子要素も検査するかのフラグ
	 * @return 配列データ
	 */
	this.HasAttribute = function (attrMatcher, bCheckChild) {

		var idx = 0;
		var idxCore = 0;
		var idxVal = 0;

		var attrMatchingCore = null;
		var targetSpId = 0;
		var targetAttrId = 0;
		var targetValueArray = null;
		var attrValueArray = null;

		var bMatched = false;



		bMatched = false;

		// 引数のマッチャの、マッチングコア配列をすべてループ
		for (idxCore = 0; idxCore < attrMatcher.matchingCoreArray.length; idxCore++) {

			attrMatchingCore = attrMatcher.matchingCoreArray[idxCore];

			// 検査対象に指定されたデータを取得
			targetSpId = attrMatchingCore.spid;
			targetAttrId = attrMatchingCore.attrId;
			targetValueArray = attrMatchingCore.attrValueArray;

			//--------------------------------
			// 自身が適合するかの検査
			//--------------------------------

			// SPIDの適合判定
			if (this.GetSpId() == targetSpId) {

				// 属性値を取得
				attrValueArray = this.GetAttribute(targetAttrId);

				// 属性値の適合判定
				if (attrValueArray !== undefined) {

					// 単一値の場合も、処理の都合で配列にしておく
					if (!Array.isArray(attrValueArray)) {
						attrValueArray = [attrValueArray];
					}

					// 検査対象に指定された値がすべて含まれるかを検査
					for (idxVal = 0; idxVal < targetValueArray.length; idxVal++) {

						// 含まれていないものが見つかった場合は、処理打ち切り
						if (attrValueArray.indexOf(targetValueArray[idxVal]) < 0) {
							break;
						}
					}

					// 検査対象に指定されたすべての値が含まれていた場合、
					// すなわち、break で処理を打ち切られていない場合は、次のマッチャへループ
					if (idxVal >= targetValueArray.length) {
						continue;
					}
				}
			}

			//--------------------------------
			// 子要素の属性に含まれるかの検査
			//--------------------------------
			if (bCheckChild) {
				for (idx = 0; idx < this.children.length; idx++) {

					// いずれかの子要素の含まれていた場合は、処理打ち切り
					if (this.children[idx].HasAttribute(new CMigEquipableSpDataAttributeMatcher([attrMatchingCore]), bCheckChild)) {
						break;
					}
				}

				// いずれかの子要素において、検査対象に指定されたすべての値が含まれていた場合、
				// すなわち、break で処理を打ち切られている場合は、次の検査対象へループ
				if (idx < this.children.length) {
					continue;
				}
			}

			//--------------------------------
			// ここまで来た場合は、マッチャに適合しないデータが存在する
			//--------------------------------
			return false;
		}


		//--------------------------------
		// ここまで来た場合は、すべての検査対象に適合するデータが存在する
		//--------------------------------
		return true;
	};



	/**
	 * 指定の属性と値の組み合わせを持つデータを検索し、そこに至るまでのSPデータツリーを生成する（通常の処理では使用しない、テスト用）.
	 * @param attrMatcher 装備可能品SPデータ適合検査条件
	 * @return SPデータツリーの配列（ひとつの該当ケースに対して、一つの要素（パス）を構築して返す）
	 */
	this.GetSpDataPathArrayToAttribute = function (attrMatcher) {

		var idx = 0;

		var thisCloned = null;
		var spDataArray = null;
		var spDataArrayWork = null;

		// 自身の属性に含まれる場合、再帰処理を打ち切り、自身の複製を返す
		if (this.HasAttribute(attrMatcher, false)) {
			return [this.Clone(false)];
		}

		// すべての子要素をループ
		spDataArray = [];
		for (idx = 0; idx < this.children.length; idx++) {

			// 再帰処理で検査
			spDataArrayWork = this.children[idx].GetSpDataPathArrayToAttribute(attrMatcher);

			// 全体結果に結合
			spDataArray = spDataArray.concat(spDataArrayWork);
		}

		// すべての子要素の結果に対して、自身の複製を親に設定し、置き換える
		for (idx = 0; idx < spDataArray.length; idx++) {

			thisCloned = this.Clone(false);
			thisCloned.AddChild(spDataArray[idx]);

			spDataArray[idx] = thisCloned;
		}

		// 結果を返す
		return spDataArray;
	};

}
