
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();



//----------------------------------------------------------------
// キーワードデータ作成基底クラス
// （各種キーワードデータ作成クラスの基底となるクラス）
//----------------------------------------------------------------

/**
 * キーワードデータ作成用データ基底クラス.
 */
function CMigKeywordMakeData () {

	// ID
	this.id = 0;

	// 名称カナ配列
	this.nameKanaArray = [];

	// 備考配列（ゲーム内に存在しないもの）
	this.noteArray = [];



	/**
	 * IDを設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetId = function (value) {
		this.id = value;
		return this;
	};

	/**
	 * 名称カナを追加する.
	 * @param name 名称
	 * @param kana 読み仮名
	 * @return 自身のインスタンス（this）
	 */
	this.AddNameKana = function (name, kana) {
		this.nameKanaArray.push(new CNameKana(name, kana));
		return this;
	};

	/**
	 * 備考（ゲーム内に存在しないもの）を追加する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.AddNote = function (value) {
		this.noteArray.push(value);
		return this;
	};



	/**
	 * IDを取得する.
	 * @return ID
	 */
	this.GetId = function () {
		return this.id;
	};



	/**
	 * 配列データ化する.
	 * @return 配列データ
	 */
	this.ToArrayData = function () {

		var idx = 0;

		var arrayData = null;
		var arrayDataNameKana = null;

		arrayData = [];

		arrayData.push(this.id);

		// 名称カナ配列
		arrayDataNameKana = [];
		for (idx = 0; idx < this.nameKanaArray.length; idx++) {
			arrayDataNameKana.push(this.nameKanaArray[idx].ToDat());
		}
		arrayData.push(arrayDataNameKana);

		// 備考配列
		arrayData.push(this.noteArray.slice());

		return arrayData;
	};
}



