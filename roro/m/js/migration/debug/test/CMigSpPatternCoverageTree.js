
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// パーサファイル読み込みチェック
ParserFileIncludeCheck();





/**
 * SPデータの組み合わせパターンについて、カバレッジツリーを構築するクラス.
 */
function CMigSpPatternCoverageTree (arrayDataC) {

	// このノードのSPタグ
	this.spTag = null;

	// 親要素
	this.parent = null;

	// 子要素（マップの定義は、Map <CMigEquipableSpTag, CMigSpPatternCoverageTree>)
	this.childMap = null;

	// 葉要素用値配列
	this.valueArray = null;



	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		var idx = 0;

		var srcArray = null;
		var spTag = null;
		var childTree = null;



		// 初期化
		this.childMap = new Map();
		this.valueArray = [];

		// 引数が指定されている場合は、パースする
		if (arrayDataC) {

			// 子要素
			srcArray = arrayDataC[0];
			if (Array.isArray(srcArray)) {

				for (idx = 0; idx < srcArray.length; idx++) {

					// SPタグを生成
					spTag = new CMigEquipableSpTag(srcArray[idx][0]);

					// 子要素を生成
					childTree = new CMigSpPatternCoverageTree(srcArray[idx][1]);

					// 子要素のSPタグを設定
					childTree.spTag = spTag;

					// 子要素マップに登録
					this.childMap.set(spTag, childTree);
				}
			}

			// データ配列
			srcArray = arrayDataC[1];
			if (Array.isArray(srcArray)) {
				this.valueArray = srcArray.slice();
			}
		}

	}).call(this);



	/**
	 * 有効なデータが設定されているかを判定する.
	 * @return true:有効、false:有効でない
	 */
	this.IsValid = function () {

		if (this.childMap.size > 0) {
			return true;
		}

		if (this.valueArray.length > 0) {
			return true;
		}

		return false;
	};



	/**
	 * SPタグを設定する.
	 * @param spTag SPタグ
	 */
	this.SetSpTag = function (spTag) {
		this.spTag = spTag;
	};

	/**
	 * SPタグを取得する.
	 * @return SPタグ
	 */
	this.GetSpTag = function () {
		return this.spTag;
	};



	/**
	 * 親要素を設定する.
	 * @param parent 親要素
	 */
	this.SetParent = function (parent) {
		this.parent = parent;
	};

	/**
	 * 葉要素であるかを判定する.
	 * @return true:葉要素、false:葉要素ではない
	 */
	this.IsLeafElement = function () {
		return (this.childMap.size == 0);
	};

	/**
	 * ルート要素を取得する.
	 * @return ルート要素
	 */
	this.GetRoot = function () {
		if (this.parent) {
			return this.parent.GetRoot();
		}

		return this;
	};



	/**
	 * カバレッジツリーを追加する.
	 * @param spTag SPタグ
	 * @param coverageTree カバレッジツリー
	 * @return 実際に追加されたカバレッジツリー
	 */
	this.AddCoverageTree = function (spTag, coverageTree) {

		var coverageTreeWork = null;

		// 既存の要素を検索
		coverageTreeWork = this.GetCoverageTree(spTag)

		// すでに登録がある場合は、引数のカバレッジツリーを結合
		if (coverageTreeWork !== undefined) {
			coverageTree = coverageTreeWork.JoinCoverageTree(coverageTree);
		}

		// 登録して、それを返す
		this.childMap.set(spTag, coverageTree);
		coverageTree.SetParent(this);

		return coverageTree;
	};

	/**
	 * カバレッジツリーを取得する.
	 * @param spTag SPタグ
	 * @return カバレッジツリー
	 */
	this.GetCoverageTree = function (spTag) {

		var coverageTree = null;

		coverageTree = undefined;

		// マップを検索
		this.childMap.forEach(
			function (valueF, keyF, mapF) {
				if (keyF.IsEqual(spTag, null, true)) {
					coverageTree = valueF;
				}
			}
		);

		return coverageTree;
	};

	/**
	 * カバレッジツリーをループ処理する.
	 * @param funcProc 処理関数（引数は、value, key, map）
	 */
	this.ForEachCoverageTree = function (funcProc) {

		var coverageTree = null;

		// マップを検索
		this.childMap.forEach(
			function (valueF, keyF, mapF) {
				funcProc(valueF, keyF, mapF);
			}
		);
	};

	/**
	 * カバレッジツリーを結合する.
	 * @param coverageTree カバレッジツリー
	 * @return 結合されたカバレッジツリー
	 */
	this.JoinCoverageTree = function (coverageTree) {

		var clonedCoverageTree = null;

		// 呼び出しのコーディングミス以外ありえないはず
		if (!this.spTag.IsEqual(coverageTree.spTag, null, true)) {
			return null;
		}

		// 結果用のマップを用意
		clonedCoverageTree = new CMigSpPatternCoverageTree();
		clonedCoverageTree.spTag = this.spTag.Clone();

		// 自身にあるキー（spTag）で、引数にもあるキーのデータを、自身に結合
		this.childMap.forEach(
			function (valueF, keyF, mapF) {

				var sameKeyChildF = null;
				var treeToAddF = null;

				// 引数側の、同一キーの要素を取得
				sameKeyChildF = coverageTree.GetCoverageTree(keyF);

				// 同一キーの要素がある場合、結合して、結果に登録
				if (sameKeyChildF !== undefined) {

					treeToAddF = valueF.JoinCoverageTree(sameKeyChildF);
					treeToAddF.SetParent(clonedCoverageTree);

					clonedCoverageTree.AddCoverageTree(keyF.Clone(), treeToAddF);
				}
			},
			this
		);

		// 引数にあるキー（spTag）で、自身にないキーのデータを、自身に複製
		coverageTree.childMap.forEach(
			function (valueF, keyF, mapF) {

				var treeToAddF = null;

				// 同一キーの要素がない場合、複製して登録
				if (this.GetCoverageTree(keyF) === undefined) {

					treeToAddF = valueF.Clone();
					treeToAddF.SetParent(clonedCoverageTree);

					clonedCoverageTree.AddCoverageTree(keyF.Clone(), treeToAddF);
				}
			},
			this
		);

		// データ配列はそのまま結合する
		clonedCoverageTree.dataArray = this.valueArray.concat(coverageTree.valueArray);

		return clonedCoverageTree;
	};



	/**
	 * 値を追加する.
	 * @param value 値
	 */
	this.AddValue = function (value) {
		this.valueArray.push(value);
	};

	/**
	 * 値の配列を取得する.
	 * @return 値の配列
	 */
	this.GetValueArray = function () {
		return this.valueArray.slice();
	};



	/**
	 * カバレッジツリーを複製する.
	 * @return 複製されたカバレッジツリー
	 */
	this.Clone = function () {

		var idx = 0;

		var clonedTree = null;

		clonedTree = new CMigSpPatternCoverageTree();

		clonedTree.spTag = this.spTag.Clone();
		clonedTree.parent = parent;

		this.childMap.forEach(
			function (valueF, keyF, mapF) {

				var treeToAdd = null;

				treeToAdd = valueF.Clone();
				treeToAdd.SetParent(clonedTree);

				clonedTree.AddCoverageTree(keyF.Clone(), treeToAdd);
			}
		);

		clonedTree.dataArray = this.valueArray.slice();

		return clonedTree;
	};



	/**
	 * 配列データ化する.
	 * @return 配列データ
	 */
	this.ToArrayData = function () {

		var idx = 0;

		var arrayData = null;
		var arrayDataSub = null;



		// 配列確保
		arrayData = [];

		// 固定情報を追記
		// ここでは spTag は出力しない

		// 子要素
		arrayDataSub = [];
		this.childMap.forEach(
			function (valueF, keyF, mapF) {
				arrayDataSub.push([
					keyF.ToArrayData(),
					valueF.ToArrayData(),
				]);
			}
		);
		arrayData.push(arrayDataSub);

		// データ配列
		arrayData.push(this.valueArray.slice());



		return arrayData;
	};

}








