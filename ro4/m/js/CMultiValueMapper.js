/**
 * マルチバリューのマッピング管理クラス.
 * （同一のkeyに複数の値が設定されうるマップクラス）
 * （複数の値が設定された場合、値は配列でラッピングされて保持、取得される）
 */
class CMultiValueMapper extends SKeyMap {

	/**
	 * コンストラクタ.
	 */
	constructor () {
		super();
	}



	/**
	 * 値を追加する.
	 * @param {string} key 追加するキー
	 * @param {Object} value 追加する値
	 * @returns {string} 引数で与えられたキー
	 * @throws {Error} 指定のキーが既に登録済みの場合
	 */
	add (key, value) {

		// すでに登録されている値を取得する
		const valueNow = this.get(key);

		// すでに登録されている値がある場合
		if (valueNow !== undefined) {

			// 配列化されている場合は、配列に追加する
			if (Array.isArray(valueNow)) {
				valueNow.push(value);
			}

			// 配列化されていない場合は、配列化して登録しなおす
			else {
				super.set(key, [valueNow, value]);
			}
		}

		// まだ登録されていない場合は、そのまま登録する
		else {
			super.set(key, value);
		}

		return key;
	}
}