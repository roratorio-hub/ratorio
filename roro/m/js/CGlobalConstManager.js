/**
 * 定数データ管理ユニットクラス.
 */
function CConstVarManagementUnit () {

	// 定数名
	this.name = "";

	// 定数値
	this.value = 0;



	/**
	 * 複製を生成する.
	 * @return 複製されたインスタンス
	 */
	this.Clone = function () {

		var mngUnit = null;

		mngUnit = new CConstVarManagementUnit();
		mngUnit.name = this.name;
		mngUnit.value = this.value;

		return mngUnit;
	};
}



/**
 * 列挙型マネージャクラス.
 */
function CGlobalEnumManager () {

	// 列挙名
	this.enumName = "";

	// 列挙初期値
	this.firstValue = 0;

	// 列挙増加値
	this.stepValue = 1;

	// 列挙データ
	this.enumArray = new Array();

	// 列挙データ（疑似定数）
	this.pseudoArray = new Array();



	// 列挙定数の数を取得する getter 定義
	Object.defineProperty(this, "Count", { get : function () { return this.enumArray.length; } });

	// 列挙定数の数を取得する getter 定義
	Object.defineProperty(this, "CountPseudo", { get : function () { return this.pseudoArray.length; } });



	/**
	 * 初期化する.
	 * @param enumName 列挙名
	 * @param firstValue 先頭要素の値（省略可）
	 * @param stepValue 要素ごとの増加値（省略可）
	 */
	this.Initialize = function (enumName, firstValue, stepValue) {

		// 列挙名
		this.enumName = enumName;

		// 初期値を補正
		if (firstValue != undefined) {
			this.firstValue = firstValue;
		}

		// 増加値を補正
		if (stepValue != undefined) {
			this.stepValue = stepValue;
		}

		// 列挙データ初期化
		this.enumArray = new Array();
		this.pseudoArray = new Array();
	};



	/**
	 * 列挙定数を定義する.
	 * @param name 定数名
	 * @param value 定数値（省略時は、設定から算出する）
	 */
	this.Define = function (name, value) {

		var idx = 0;

		var mngUnit = null;

		// 登録済みの定数名の場合は、その値を返す
		for (idx = 0; idx < this.enumArray.length; idx++) {

			// 管理ユニット取得
			mngUnit = this.enumArray[idx];

			// 名称が一致した場合に、発見したと判断する
			if (mngUnit.name == name) {
				return mngUnit.value;
			}
		}

		// 登録がない場合は、列挙値を算出
		if (value == undefined) {
			value = this.firstValue + this.stepValue * this.enumArray.length;
		}

		// 定数を定義
		Function(name + " = " + value + ";")();

		// 列挙配列に登録する
		mngUnit = new CConstVarManagementUnit();
		mngUnit.name = name;
		mngUnit.value = value;
		this.enumArray.push(mngUnit);

		return value;
	};

	/**
	 * 疑似定数を定義する.
	 * @param name 定数名
	 * @param value 定数値（省略不可）
	 */
	this.DefinePseudo = function (name, value) {

		var idx = 0;

		var mngUnit = null;

		// 登録済みの定数名の場合は、その値を返す
		for (idx = 0; idx < this.pseudoArray.length; idx++) {

			// 管理ユニット取得
			mngUnit = this.pseudoArray[idx];

			// 名称が一致した場合に、発見したと判断する
			if (mngUnit.name == name) {
				return mngUnit.value;
			}
		}

		// 定数を定義
		Function(name + " = " + value + ";")();

		// 列挙配列に登録する
		mngUnit = new CConstVarManagementUnit();
		mngUnit.name = name;
		mngUnit.value = value;
		this.pseudoArray.push(mngUnit);

		return value;
	};



	/**
	 * 列挙定数の定数名を取得する.
	 * @param value 値
	 * @return 定数名（該当なしの場合は空文字列）
	 */
	this.GetDefinedName = function (value) {

		var idx = 0;

		var mngUnit = null;

		// 登録済みの定数名の場合は、その値を返す
		for (idx = 0; idx < this.enumArray.length; idx++) {

			// 管理ユニット取得
			mngUnit = this.enumArray[idx];

			// 値が一致した場合に、発見したと判断する
			if (mngUnit.value == value) {
				return mngUnit.name;
			}
		}

		return "";
	};

	/**
	 * 疑似定数の定数名を取得する.
	 * @param value 値
	 * @return 定数名（該当なしの場合は空文字列）
	 */
	this.GetDefinedPseudoName = function (value) {

		var idx = 0;

		var mngUnit = null;

		// 登録済みの定数名の場合は、その値を返す
		for (idx = 0; idx < this.pseudoArray.length; idx++) {

			// 管理ユニット取得
			mngUnit = this.pseudoArray[idx];

			// 値が一致した場合に、発見したと判断する
			if (mngUnit.value == value) {
				return mngUnit.name;
			}
		}

		return "";
	};



	/**
	 * 列挙定数の定数値を取得する.
	 * @param name 定数名
	 * @return 定数値（該当なしの場合は、undefined）
	 */
	this.GetDefinedValue = function (name) {

		var idx = 0;

		var mngUnit = null;

		// 登録済みの定数名の場合は、その値を返す
		for (idx = 0; idx < this.enumArray.length; idx++) {

			// 管理ユニット取得
			mngUnit = this.enumArray[idx];

			// 名称が一致した場合に、発見したと判断する
			if (mngUnit.name == name) {
				return mngUnit.value;
			}
		}

		return undefined;
	};

	/**
	 * 列挙定数の定数値を取得する.
	 * @param name 定数名
	 * @return 定数値（該当なしの場合は、undefined）
	 */
	this.GetDefinedPseudoValue = function (name) {

		var idx = 0;

		var mngUnit = null;

		// 登録済みの定数名の場合は、その値を返す
		for (idx = 0; idx < this.pseudoArray.length; idx++) {

			// 管理ユニット取得
			mngUnit = this.pseudoArray[idx];

			// 名称が一致した場合に、発見したと判断する
			if (mngUnit.name == name) {
				return mngUnit.value;
			}
		}

		return undefined;
	};



	/**
	 * 列挙定数をループ処理する.
	 * @param funcProc 処理関数（引数は、(idx, name, value)）
	 * @param skipNameArray 処理を飛ばす定義名の配列（省略可）
	 */
	this.For = function (funcProc, skipNameArray) {

		var idx = 0;

		var mngUnit = null;

		// 列挙配列を for ループ
		for (idx = 0; idx < this.enumArray.length; idx++) {

			// 列挙データ取得
			mngUnit = this.enumArray[idx];

			// 処理のスキップ判定
			if (skipNameArray != undefined) {
				if (skipNameArray.indexOf(mngUnit.name) >= 0) {
					continue;
				}
			}

			// 処理関数呼び出し
			funcProc(idx, mngUnit.name, mngUnit.value);
		}
	};

	/**
	 * 疑似定数をループ処理する.
	 * @param funcProc 処理関数（引数は、(idx, name, value)）
	 * @param skipNameArray 処理を飛ばす定義名の配列（省略可）
	 */
	this.PseudoFor = function (funcProc, skipNameArray) {

		var idx = 0;

		var mngUnit = null;

		// 列挙配列を for ループ
		for (idx = 0; idx < this.pseudoArray.length; idx++) {

			// 列挙データ取得
			mngUnit = this.pseudoArray[idx];

			// 処理のスキップ判定
			if (skipNameArray != undefined) {
				if (skipNameArray.indexOf(mngUnit.name) >= 0) {
					continue;
				}
			}

			// 処理関数呼び出し
			funcProc(idx, mngUnit.name, mngUnit.value);
		}
	};
}



/**
 * 定数マネージャクラス.
 */
function CGlobalConstManager () {

}

/**
 * 管理マップ.
 */
CGlobalConstManager.managementMap = new Array();

/**
 * 定義済み定数名マップ.
 */
CGlobalConstManager.nameMap = new Map();



/**
 * 列挙定数を定義する.
 * @param enumName 列挙名
 * @param nameArray 定数名の配列
 * @param firstValue 先頭要素の値（省略可）
 * @param stepValue 要素ごとの増加値（省略可）
 */
CGlobalConstManager.DefineEnum = function (enumName, nameArray, firstValue, stepValue) {
	return CGlobalConstManager.DefineEnumSubCommon(0, enumName, nameArray, firstValue, stepValue);
};

/**
 * 疑似定数を定義する.
 * @param enumName 列挙名
 * @param nameArray 定数名の配列
 * @param firstValue 先頭要素の値（省略可）
 * @param stepValue 要素ごとの増加値（省略可）
 */
CGlobalConstManager.DefinePseudoEnum = function (enumName, nameArray, firstValue, stepValue) {
	return CGlobalConstManager.DefineEnumSubCommon(1, enumName, nameArray, firstValue, stepValue);
};

/**
 * 定数を定義する（サブ処理本体）.
 * @param mode （0:列挙定数定義, 1:疑似定数定義）
 * @param enumName 列挙名
 * @param nameArray 定数名の配列
 * @param firstValue 先頭要素の値（省略可）
 * @param stepValue 要素ごとの増加値（省略可）
 */
CGlobalConstManager.DefineEnumSubCommon = function (mode, enumName, nameArray, firstValue, stepValue) {

	var idx = 0;

	var name = "";
	var value = 0;

	var mngUnit = null;
	var enumDataManager = null;

	var funcDefine = null;

	// 列挙型マネージャを用意
	mngUnit = CGlobalConstManager.SearchMap(enumName);

	// 既に存在する場合は、そのインスタンスを使用
	if (mngUnit) {
		enumDataManager = mngUnit.value;
	}

	// 新規の列挙型の場合は、新たにインスタンスを用意
	else {

		enumDataManager = new CGlobalEnumManager();

		// 列挙定数の場合は、引数の初期値等を適用する
		if (mode == 0) {
			enumDataManager.Initialize(enumName, firstValue, stepValue);
		}
		// 疑似定数の場合は、初期値を自動設定にする
		else {
			enumDataManager.Initialize(enumName);
		}

		// 列挙型マネージャを定義
		Function(enumName + " = arguments[0];")(enumDataManager);

		// 列挙型データを管理マップへ登録
		CGlobalConstManager.RegisterMap(enumName, enumDataManager);
	}

	if (mode == 0) {
		funcDefine = enumDataManager.Define;
	}
	else {
		funcDefine = enumDataManager.DefinePseudo;
	}

	// 定義
	for (idx = 0; idx < nameArray.length; idx++) {

		// 名称と値を算出
		name = nameArray[idx];

		// 既に登録されていないかを確認する
		if (CGlobalConstManager.nameMap.get(name) !== undefined) {
			throw new Error("定数名二重登録：" + name);
		}

		// 列挙型マネージャで定数定義

		// 初期値が指定されている場合は、ここで定数値を計算して渡す
		if (firstValue != undefined) {
			// 増加値が未指定の場合は、0 とみなす
			// BigIntが渡される可能性があるので条件判定
			if (typeof firstValue === "bigint") {
				value = firstValue + ((stepValue != undefined) ? stepValue : 0n) * BigInt(idx);
			}
			else {
				value = firstValue + ((stepValue != undefined) ? stepValue : 0) * idx;
			}
			funcDefine.apply(enumDataManager, [name, value]);
		}

		// 初期値が未指定の場合は、列挙型マネージャの処理に任せて、結果を受け取る
		else {
			value = funcDefine.apply(enumDataManager, [name]);
		}

		// 定義済み名マップに登録
		CGlobalConstManager.nameMap.set(name, enumDataManager);
	}

	return value;
};



/**
 * 定数定義を管理マップに登録する.
 * @param name 定数名
 * @param name 定数値
 */
CGlobalConstManager.RegisterMap = function (name, value) {

	var mngUnit = null;

	// 二重登録検査
	if (CGlobalConstManager.SearchMap(name)) {
		throw new Error("列挙型二重登録：" + name);
	}

	// 管理ユニットを用意
	mngUnit = new CConstVarManagementUnit();
	mngUnit.name = name;
	mngUnit.value = value;

	// 追加
	CGlobalConstManager.managementMap.push(mngUnit);
};



/**
 * 定数定義を管理マップから検索する.
 * @param name 定数名
 * @return 定数データ管理ユニット（一致無しの場合は null）
 */
CGlobalConstManager.SearchMap = function (name) {

	var idx = 0;

	var mngUnit = null;

	// マップを全検索
	for (idx = 0; idx < CGlobalConstManager.managementMap.length; idx++) {

		// 管理ユニット取得
		mngUnit = CGlobalConstManager.managementMap[idx];

		// 名称が一致した場合に、発見したと判断する
		if (mngUnit.name == name) {
			return mngUnit.Clone();
		}
	}

	// ここに来るならば、一致なし
	return null;
};


