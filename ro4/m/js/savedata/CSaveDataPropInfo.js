/**
 * セーブデータプロパティ情報クラス.
 */
class CSaveDataPropInfo {

	/**
	 * プロパティの名称.
	 */
	#propName;

	/**
	 * プロパティのビット長.
	 */
	#propBits;

	/**
	 * コンストラクタ.
	 * @param {string} propName プロパティの名称
	 * @param {int} propBits プロパティのビット長
	 */
	constructor (propName, propBits) {
		// メンバ変数の初期化
		this.#propName = propName;
		this.#propBits = propBits;
	}

	/**
	 * プロパティの名称.
	 */
	get name () {
		return this.#propName;
	}

	/**
	 * プロパティの文字表現長.
	 */
	get bits () {
		return this.#propBits;
	}
}