/**
 * 被ダメージ計算設定の永続化管理クラス.
 * 戦闘結果エリアは再計算のたびに再構築され、被ダメージ計算設定の入力値が
 * 初期値に戻ってしまうため、設定値をローカルストレージへ保存し、再構築時に復元する。
 *
 * 設定の既定値・値域は画面部品の構築コード（head.js）側を唯一の情報源とする。
 * 保存値がない項目・不正な保存値の項目は画面部品の初期値のまま変更しない。
 */
export class CReceivedDamageConfManager {

	/**
	 * ストレージデータ名（被ダメージ計算設定）.
	 */
	static get STORAGE_NAME () {
		return "RRTRDC";
	}

	/**
	 * データ形式バージョン.
	 * （フィールドの追加では変更不要。形式自体を変える場合のみ上げる）
	 */
	static get VERSION () {
		return 1;
	}

	/**
	 * 永続化対象フィールドの定義.
	 * 被ダメージ計算設定に項目を追加する場合は、この配列に1行追加する。
	 * type: "number"＝数値入力（min/max属性の範囲へクランプして復元）
	 * 　　　"select"＝選択部品（現在の選択肢に存在する値のみ復元）
	 */
	static get fieldDefs () {
		return [
			{ key: "physicalRatio",   objId: "OBJID_ENEMY_SKILL_RATIO",         type: "number" },
			{ key: "physicalElement", objId: "OBJID_ENEMY_SKILL_ELEMENT",       type: "select" },
			{ key: "magicalRatio",    objId: "OBJID_ENEMY_MAGIC_SKILL_RATIO",   type: "number" },
			{ key: "magicalElement",  objId: "OBJID_ENEMY_MAGIC_SKILL_ELEMENT", type: "select" },
		];
	}

	/**
	 * ローカルストレージから設定を読み込む.
	 * @returns {Object} 設定オブジェクト（パース失敗・バージョン不一致の場合は空オブジェクト）
	 */
	static #loadConf () {

		try {
			const parsed = JSON.parse(localStorage.getItem(this.STORAGE_NAME));

			if (!parsed || (parsed.version !== this.VERSION)) {
				return {};
			}

			return parsed;
		}
		catch (e) {
			return {};
		}
	}

	/**
	 * 保存済みの設定値を画面部品へ復元する.
	 * （初回の被ダメージ計算より前に呼び出すこと）
	 */
	static RestoreToControls () {

		const conf = this.#loadConf();

		for (const fieldDef of this.fieldDefs) {

			const objControl = document.getElementById(fieldDef.objId);

			// 画面部品がない、または保存値がない項目は変更しない
			if (!objControl || !(fieldDef.key in conf)) {
				continue;
			}

			this.#restoreValue(objControl, fieldDef.type, conf[fieldDef.key]);
		}
	}

	/**
	 * 単一の画面部品へ保存値を復元する.
	 * @param {HTMLElement} objControl 画面部品
	 * @param {string} type フィールド種別（"number" or "select"）
	 * @param {*} value 保存値
	 */
	static #restoreValue (objControl, type, value) {

		switch (type) {

		case "number": {

			let valueWork = Number(value);
			if (!Number.isFinite(valueWork)) {
				return;
			}

			// min / max 属性が定義されていれば、その範囲へクランプする
			const valueMin = Number(objControl.getAttribute("min"));
			const valueMax = Number(objControl.getAttribute("max"));
			if (Number.isFinite(valueMin)) {
				valueWork = Math.max(valueMin, valueWork);
			}
			if (Number.isFinite(valueMax)) {
				valueWork = Math.min(valueMax, valueWork);
			}

			objControl.value = String(valueWork);
			break;
		}

		case "select": {

			// 現在の選択肢に存在しない値は復元しない（初期選択のまま）
			const valueText = String(value);
			for (const objOption of objControl.options) {
				if (objOption.value === valueText) {
					objControl.value = valueText;
					break;
				}
			}
			break;
		}
		}
	}

	/**
	 * 画面部品へ変更時の保存処理をバインドする.
	 * （再計算用のイベントリスナーとは独立に動作する）
	 */
	static BindPersistence () {

		for (const fieldDef of this.fieldDefs) {

			const objControl = document.getElementById(fieldDef.objId);
			if (!objControl) {
				continue;
			}

			objControl.addEventListener("change", () => {
				CReceivedDamageConfManager.SaveFromControls();
			});
		}
	}

	/**
	 * 画面部品の現在値をローカルストレージへ保存する.
	 * （画面に存在しない項目・空欄の項目は、保存済みの値を維持する）
	 */
	static SaveFromControls () {

		const conf = this.#loadConf();
		conf.version = this.VERSION;

		for (const fieldDef of this.fieldDefs) {

			const objControl = document.getElementById(fieldDef.objId);
			if (!objControl) {
				continue;
			}

			if (fieldDef.type === "number") {

				// 空欄や数値でない入力は保存しない（Number("") === 0 となるため空欄は明示的に除外）
				if (objControl.value.trim() === "") {
					continue;
				}
				const valueWork = Number(objControl.value);
				if (!Number.isFinite(valueWork)) {
					continue;
				}
				conf[fieldDef.key] = valueWork;
			}
			else {
				conf[fieldDef.key] = objControl.value;
			}
		}

		try {
			localStorage.setItem(this.STORAGE_NAME, JSON.stringify(conf));
		}
		catch (e) {
			// ローカルストレージが使用不可の場合は保存しない
		}
	}
}
