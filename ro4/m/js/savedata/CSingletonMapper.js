/**
 * シングルトンのマッピング管理クラス.
 */
class CSingletonMapper extends SKeyMap {

	/**
	 * コンストラクタ.
	 */
	constructor () {
		super();
	}

	/**
	 * シングルトンを登録する.
	 * @param {string} key 登録するキー
	 * @param {Object} value 登録する値
	 * @returns {string} 引数で与えられたキー
	 * @throws {Error} 指定のキーが既に登録済みの場合
	 */
	set (key, value) {
		// 二重登録チェック
		if (this.get(key) !== undefined) {
			throw new Error("Duplicated key.");
		}
		// 登録処理
		super.set(key, value);
		return key;
	}
}