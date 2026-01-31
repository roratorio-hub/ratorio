/**
 * 計算機メインコントローラクラス.
 */
class CSaveController {

	/**
	 * ストレージタイプ（ローカルストレージ）.
	 */
	static get STORAGE_TYPE_LOCALSTORAGE () {
		return "localStorage";
	}

	/**
	 * ストレージデータ名（計算機設定）.
	 */
	static get STORAGE_NAME_SETTINGS () {
		return "RRTST";
	}

	/**
	 * ストレージデータ名（キャラクターデータ）.
	 */
	static get STORAGE_NAME_CHARA_DATA () {
		return "RRTCD";
	}

	/**
	 * ストレージデータデリミタ（データユニット）.
	 */
	static get STORAGE_DATA_DELIMITER_UNIT () {
		return ";";
	}

	/**
	 * ストレージデータデリミタ（データプロパティ）.
	 */
	static get STORAGE_DATA_DELIMITER_PROP () {
		return ",";
	}

	/**
	 * キャラクターデータの数.
	 */
	static get CHARA_DATA_COUNT () {
		return 500;
	}

	/**
	 * キャラクターデータの名前の文字列長.
	 */
	static get CHARA_DATA_NAME_LENGTH () {
		return 40;
	}

	/**
	 * キャラクターデータのデフォルト名.
	 */
	static get CHARA_DATA_NAME_DEFAULT () {
		return "No Data";
	}



	/**
	 * JSONを全面的に利用するフラグ.(URLが長大になるため現状では利用しない設定だが将来性のために必要)
	 */
	static bJSON = false;


	/**
	 * 計算機設定データユニット.
	 */
	static #settingDataUnit = null;

	/**
	 * キャラクターデータの配列.
	 */
	static #charaDataArray = (() => {
		const unitArray = [];
		for (let idx = 0; idx < CSaveController.CHARA_DATA_COUNT; idx++) {
			unitArray.push(["", ""]);
		}
		return unitArray;
	})();

	/**
	 * 現在の状況を扱っているセーブデータマネージャ.
	 */
	static #saveDataManagerCur = null;



	/**
	 * データテキストをサニタイジングする.
	 * @param {string} dataText データテキスト
	 * @returns サニタイズされたデータテキスト
	 */
	static sanitizeDataText (dataText) {
		const regDataText = /[^-_\.\~a-zA-Z0-9]/g;
		return dataText.replaceAll(regDataText, "");
	}



	/**
	 * セーブの名前をエンコードする.
	 * @param {string} saveName 入力された名前文字列
	 * @returns エンコードされた文字列
	 */
	static encodeSaveName (saveName) {

		// 名前が未設定の場合は、職業とレベルを設定する
		if (saveName.length == 0) {
			saveName = (GetJobName(n_A_JOB) + "(Lv" + n_A_BaseLV + ")");
		}

		// 長すぎる名前を切り捨て
		saveName = saveName.slice(0, CSaveController.CHARA_DATA_NAME_LENGTH);

		// 表現できない文字の置換（コーディング時の仕様では起きないはずだが、拡張性を考慮してチェック）
		for (let idx = 0; idx < saveName.length; idx++) {
			const codePoint = saveName.codePointAt(idx);
			if (codePoint >= (2 ** 24)) {
				saveName[idx] = "?";
			}
		}

		// エンコード
		let nameEncoded = "";
		for (let idx = 0; idx < saveName.length; idx++) {
			const codePoint = saveName.codePointAt(idx);
			const converted = CSaveDataConverter.ConvertNtoSMIG(codePoint, 4);
			nameEncoded += converted;
		}

		return nameEncoded;
	}

	/**
	 * セーブの名前をデコードする.
	 * @param {string} saveName エンコードされた名前文字列
	 * @returns デコードされた文字列
	 */
	static decodeSaveName (saveName) {

		const codePointArray = [];
		for (let idx = 0; idx < saveName.length; idx += 4) {

			// 該当文字部分をスライス
			const sliced = saveName.slice(idx, idx + 4);
			if (sliced.length != 4) {
				return "復元エラー";
			}

			// コードポイントにデコードして収集
			const codePoint = floorBigInt32(CSaveDataConverter.ConvertStoNMIG(sliced));
			codePointArray.push(codePoint);
		}

		// 復元して返す
		try {
			return String.fromCodePoint(...codePointArray);
		}
		catch (err) {
			return "復元エラー";
		}
	}

	/**
	 * キャラクター名を取得する.
	 * @param {int} index 取得するインデックス（０オリジン）
	 * @returns {string} キャラクター名
	 */
	static getDisplayName (index) {

		// ストレージデータ配列の範囲外の場合は、処理不可
		if ((index < 0) || (index >= this.#charaDataArray.length)) {
			return "";
		}

		const charaData = this.#charaDataArray[index];

		let charaName = "";
		if (charaData.length != 2) {
			charaName = CSaveController.CHARA_DATA_NAME_DEFAULT;
		}
		else if (charaData[0].length == 0) {
			charaName = CSaveController.CHARA_DATA_NAME_DEFAULT;
		}
		else {
			charaName = this.decodeSaveName(charaData[0]);
		}

		return ("No." + (index + 1) + ":" + charaName);
	}



	/**
	 * 計算機の設定を取得する.
	 * @param {string} propName プロパティ名
	 * @returns 指定のプロパティ:データがある場合、undefined:データがない場合
	 */
	static getSettingProp (propName) {
		return this.#settingDataUnit ? this.#settingDataUnit.getProp(propName) : undefined;
	}

	/**
	 * 計算機の設定を設定する.
	 * @param {string} propName プロパティ名
	 * @param {int} propValue プロパティ値
	 */
	static setSettingProp (propName, propValue) {

		if (!this.#settingDataUnit) {
			return;
		}

		this.#settingDataUnit.setProp(propName, propValue);

		// ローカルストレージへ保存
		this.SaveSettingToLocalStorageMIG();
	}

	/**
	 * 現在のデータを指定のインデックスにセーブする.
	 * @param {int} index セーブするインデックス（０オリジン）
	 * @param {string} charaName キャラクター名（空文字列可）
	 * @returns {string} セレクトボックス表示用キャラクター名
	 */
	static saveCharaData (index, charaName) {

		// ストレージデータ配列の範囲外の場合は、処理不可
		if ((index < 0) || (index >= this.#charaDataArray.length)) {
			return "";
		}

		// 名前と計算機データをエンコード
		const nameEncoded = this.encodeSaveName(charaName);
		const calcsEncoded = this.encodeToURL();

		// データ上書き
		this.#charaDataArray[index] = [nameEncoded, calcsEncoded];

		// ローカルストレージへ保存
		const ret = CSaveController.SaveToLocalStorageMIG();
		if (!ret) {
			return "";
		}

		return this.getDisplayName(index);
	}

	/**
	 * Cookie からセーブデータ文字列を取得する
	 * saveload.js@OnClickClipboardSaveData() から呼び出されるデバッグ関数
	 * @param {*} index 
	 * @returns {string[2]} [セーブデータ名, セーブデータ文字列]
	 */
	static getSaveData (index) {
		// ストレージデータ配列の範囲外の場合は、処理不可
		if ((index < 0) || (index >= this.#charaDataArray.length)) {
			return "";
		}
		// 名前と計算機データを取得
		const charaData = this.#charaDataArray[index];
		const nameDecoded = this.decodeSaveName(charaData[0]);
		const dataURL = charaData[1];
		return [nameDecoded, dataURL];
	}


	/**
	 * 指定のインデックスからロードする.
	 * @param {int} index ロードするインデックス（０オリジン）
	 * @returns {string} キャラクター名
	 */
	static loadCharaData (index) {

		// ストレージデータ配列の範囲外の場合は、処理不可
		if ((index < 0) || (index >= this.#charaDataArray.length)) {
			return "";
		}

		// 名前と計算機データを取得
		const charaData = this.#charaDataArray[index];
		const nameDecoded = this.decodeSaveName(charaData[0]);
		const dataURL = charaData[1];

		// データがない場合は処理しない
		if (dataURL.length == 0) {
			return "";
		}

		// 計算機データの読み込み
		CSaveController.loadFromURL(dataURL);

		return nameDecoded;
	}

	/**
	 * 指定のインデックスを削除する.
	 * @param {int} index 削除するインデックス（０オリジン）
	 * @returns {string} セレクトボックス表示用キャラクター名
	 */
	static deleteCharaData (index) {

		// ストレージデータ配列の範囲外の場合は、処理不可
		if ((index < 0) || (index >= this.#charaDataArray.length)) {
			return "";
		}

		// データを初期化
		this.#charaDataArray[index] = ["", ""];

		// ローカルストレージへ保存
		const ret = CSaveController.SaveToLocalStorageMIG();
		if (!ret) {
			return "";
		}

		return this.getDisplayName(index);
	}

	/**
	 * URLへデータを出力する.
	 * @returns {string} データURL文字列（クエリ部分のみ）
	 */
	static encodeToURL (Chart = false) {
		try {
			calc();

			let baseJsonData = "";
			let encoded = "";
			if (!this.#saveDataManagerCur) {
				this.#saveDataManagerCur = new CSaveDataManager();
			}

			if (CSaveController.bJSON) {
				// basedata をシリアライズ
				baseJsonData = this.#saveDataManagerCur.encodeToJSON();
			}
			else{
				encoded = this.#saveDataManagerCur.encodeToURL();
				encoded = CSaveDataConverter.CompressDataTextMIG(encoded);
			}

			// chartdata をシリアライズ
			let chartJsonData = null;
			let chartData = null;
			if (g_Chart !== undefined && g_Chart !== null && Chart !== false) {
				if (CSaveController.bJSON) {
					chartJsonData = this.#serializeChartData(g_Chart);
					if (chartJsonData.length > 4000) {
						if (!confirm("【重要】長すぎてアドレスバーから読み込めない恐れがあります。\n\nURL入力ボタンからなら読み込めます。このままクリップデータを保存しますか？")) {
							chartJsonData = null;
						}
					}
				}
				else {
					chartData = this.#serializeChartData(g_Chart);
					if (chartData.length > 4000) {
						if (!confirm("【重要】長すぎてアドレスバーから読み込めない恐れがあります。\n\nURL入力ボタンからなら読み込めます。このままクリップデータを保存しますか？")) {
							chartData = null;
						}
					}
				}
			}

			if (CSaveController.bJSON) {
				console.debug('[encodeToURL]', 'Base Data Size:', baseJsonData.length);
				console.debug('[encodeToURL]', 'Chart Data Size:', chartJsonData ? chartJsonData.length : 0);
			}
			else {
				console.debug('[encodeToURL]', 'Base Data Size:', encoded.length);
				console.debug('[encodeToURL]', 'Chart Data Size:', chartData ? chartData.length : 0);
			}

			let dataObj = {};
			// 1度だけ JSON 化
			if (CSaveController.bJSON) {
				dataObj = {
					base: baseJsonData,
					chart: chartJsonData
				};
			}
			else {
				dataObj = {
					base: encoded,
					chart: chartData
				};
			}
			const jsonString = JSON.stringify(dataObj);

			console.debug('[encodeToURL]', 'jsonString for AI:', jsonString);

			const inputBytes = this.stringToByteArray(jsonString);

			const compressed = window.zstdCompressSync(inputBytes);
			console.debug('[encodeToURL]', 'Compressed Data Size:', compressed.length);
			const base64String = uint8ArrayToBase64(compressed);
			return `dx${base64String}`;

		} catch (ex) {
			console.error('[encodeToURL]', ex);
			return "";
		}
	}

	static stringToByteArray(str) {
		// TextEncoder を使用して UTF-8 エンコーディング（制御文字対応）
		if (typeof TextEncoder !== 'undefined') {
			return new TextEncoder().encode(str);
		}

		// フォールバック: 従来の方法
		var array = new (window.Uint8Array !== void 0 ? Uint8Array : Array)(str.length);
		var i;
		var il;

		for (i = 0, il = str.length; i < il; ++i) {
			array[i] = str.charCodeAt(i) & 0xff;
		}

		return array;
	}


	/**
	 * チャートデータをシリアライズする（循環参照対策済み）.
	 * @param {Object} chartData チャートデータオブジェクト
	 * @returns {string|null} JSON 文字列、またはシリアライズ失敗時は null
	 */
	static #serializeChartData (chartData) {
		try {
			// WeakSet を使用して訪問済みオブジェクトを追跡
			const visited = new WeakSet();

			// オブジェクトをシリアライズ可能な形式に変換
			const sanitizeValue = (value, depth = 0) => {
				// 深さ制限（無限ループ防止）
				if (depth > 20) {
					return undefined;
				}

				// null は通す
				if (value === null) {
					return null;
				}

				// 基本型
				const valueType = typeof value;
				if (valueType === 'string' || valueType === 'number' || valueType === 'boolean') {
					return value;
				}

				// BigInt → 文字列
				if (valueType === 'bigint') {
					return value.toString();
				}

				// 関数、シンボル、undefined はスキップ
				if (valueType === 'function' || valueType === 'symbol' || valueType === 'undefined') {
					return undefined;
				}

				// オブジェクト型
				if (valueType === 'object') {
					// 循環参照チェック
					if (visited.has(value)) {
						return undefined;
					}
					visited.add(value);

					// DOM ノード、Window オブジェクトはスキップ
					if (
						value instanceof Node ||
						value instanceof HTMLElement ||
						value instanceof Window ||
						value instanceof HTMLCollection ||
						value instanceof NodeList
					) {
						return undefined;
					}

					// Date → ISO 文字列
					if (value instanceof Date) {
						return value.toISOString();
					}

					// Set → Array
					if (value instanceof Set) {
						try {
							return Array.from(value).map(v => sanitizeValue(v, depth + 1));
						} catch (e) {
							return undefined;
						}
					}

					// Map → Object（値も再帰的に処理）
					if (value instanceof Map) {
						const obj = {};
						try {
							value.forEach((v, k) => {
								const sanitizedValue = sanitizeValue(v, depth + 1);
								if (sanitizedValue !== undefined) {
									obj[String(k)] = sanitizedValue;
								}
							});
						} catch (e) {
							// Map の処理に失敗した場合
							return undefined;
						}
						return obj;
					}

					// 通常のオブジェクト → キーと値を再帰的に処理
					if (value.constructor === Object || value.constructor === undefined) {
						const obj = {};
						try {
							for (const key in value) {
								if (Object.prototype.hasOwnProperty.call(value, key)) {
									const sanitizedValue = sanitizeValue(value[key], depth + 1);
									if (sanitizedValue !== undefined) {
										obj[key] = sanitizedValue;
									}
								}
							}
						} catch (e) {
							// オブジェクトのプロパティアクセスに失敗
							return undefined;
						}
						return obj;
					}

					// その他のオブジェクト型（クラスインスタンス等）
					try {
						const obj = {};
						for (const key in value) {
							try {
								const sanitizedValue = sanitizeValue(value[key], depth + 1);
								if (sanitizedValue !== undefined) {
									obj[key] = sanitizedValue;
								}
							} catch (e) {
								// キーのアクセスに失敗したら次へ
								continue;
							}
						}
						return obj;
					} catch (e) {
						return undefined;
					}
				}

				return value;
			};

			// データをサニタイズしてから JSON.stringify
			if (CSaveController.bJSON) {
				const sanitized = sanitizeValue(chartData);
				const jsonData = JSON.stringify(sanitized);
				return jsonData;
			}
			else {
				// ほしいのはChartのdataだけなので、そこだけJSONにする
				return JSON.stringify(g_Chart.data);
			}
		} catch (error) {
			console.warn("チャートデータのシリアライズに失敗しました:", error);
			// フォールバック: 空のオブジェクトを返す
			return JSON.stringify({});
		}
	}


	/**
	 * 復元されたチャートデータを canvas に再描画する.
	 */
	static #restoreChartDisplay () {

		if (!g_Chart || typeof g_Chart !== 'object') {
			console.log("[Chart] g_Chart is not a valid object, type:", typeof g_Chart);
			return;
		}

		// history_graph canvas を取得
		let canvas = document.getElementById("history_graph");
		let cont = document.getElementById("history_container");
		let button = document.getElementById("history_button");
		if (canvas) {

			// Canvas 上のすべての Chart インスタンスを破棄
			// Chart.instances は配列またはオブジェクト形式の可能性があるため、
			// より柔軟に対応
			if (window.Chart) {
				if (window.Chart.instances) {
					// WeakMap また は Map, Array の場合に対応
					if (Array.isArray(window.Chart.instances)) {
						// 配列の場合
						for (let i = window.Chart.instances.length - 1; i >= 0; i--) {
							if (window.Chart.instances[i] && window.Chart.instances[i].canvas === canvas) {
								window.Chart.instances[i].destroy();
								window.Chart.instances.splice(i, 1);
							}
						}
					} else if (typeof window.Chart.instances.entries === 'function') {
						// Map の場合
						const toDelete = [];
						window.Chart.instances.forEach((instance) => {
							if (instance && instance.canvas === canvas) {
								toDelete.push(instance);
							}
						});
						toDelete.forEach(instance => {
							instance.destroy();
							window.Chart.instances.delete(instance);
						});
					}
				}
				
				// 既存の g_Chart インスタンスも破棄
				if (g_Chart && typeof g_Chart.destroy === 'function') {
					g_Chart.destroy();
				}
			}
			canvas.remove();
			cont.remove();
			button.remove()
		}

		// 復元データから必要な情報を抽出
		let chartType = 'line';
		let chartDataObj = null;
		let chartOptions = {};

		// Chart.js の構造に対応
		if (g_Chart.config && g_Chart.config._config) {
			// Chart.js インスタンスの構造
			const _config = g_Chart.config._config;
			chartType = _config.type || 'line';
			chartDataObj = this.#normalizeChartData(_config.data);
			chartOptions = _config.options || {};
		} else if (g_Chart.type && g_Chart.data) {
			// シンプルな config オブジェクト
			chartType = g_Chart.type;
			chartDataObj = this.#normalizeChartData(g_Chart.data);
			chartOptions = g_Chart.options || {};
		} else if (g_Chart.data) {
			// データのみの場合
			chartDataObj = this.#normalizeChartData(g_Chart.data);
		}

		if (!chartDataObj) {
			console.warn("[Chart] no data found in g_Chart, g_Chart keys:", Object.keys(g_Chart));
			return;
		}

		// サニタイズ: Chart.js に渡す前に関数・DOM・Chartインスタンス等を取り除く
		const sanitizeForChart = (obj, depth = 0) => {
			if (depth > 10 || obj == null) return obj;
			if (typeof obj === 'function') return undefined;
			if (typeof obj !== 'object') return obj;
			if (obj instanceof Node || obj instanceof Window) return undefined;
			if (obj === g_Chart) return undefined;
			if (Array.isArray(obj)) {
				return obj.map(v => sanitizeForChart(v, depth + 1)).filter(v => v !== undefined);
			}
			const out = {};
			for (const k in obj) {
				if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
				const v = obj[k];
				// skip functions
				if (typeof v === 'function') {
					continue;
				}
				// remove Chart instances and DOM
				if (v && (v instanceof Node || v === g_Chart || v.canvas)) {
					continue;
				}
				// convert BigInt to string
				if (typeof v === 'bigint') {
					out[k] = v.toString();
					continue;
				}
				// numeric-ish strings or numbers: keep as number where appropriate
				if (k === 'data' && Array.isArray(v)) {
					out[k] = v.map(item => {
						if (typeof item === 'bigint') return Number(item);
						if (typeof item === 'string' && /^\d+$/.test(item)) return Number(item);
						return item;
					});
					continue;
				}
				// color-related values: stringify
				if (/(color|background|border|fill|font)/i.test(k)) {
					try { out[k] = String(v); } catch (e) { continue; }
					continue;
				}
				const sanitized = sanitizeForChart(v, depth + 1);
				if (sanitized !== undefined) out[k] = sanitized;
			}
			return out;
		};

		chartDataObj = sanitizeForChart(chartDataObj);
		chartOptions = sanitizeForChart(chartOptions);
		// チャートを再作成
		const buildForm = () => {
		    $("#OBJID_ATTACK_SETTING_BLOCK_MIG").after(`
				<div id="history_button" style="margin-left:1em;width:4em">
				<input type="button" id="history_clip" value="Clip" style="width:100%"><br>
				<label style="font-size:x-small;white-space: nowrap;"><input type="checkbox" id="clip_with_memo">memo</label>
				<input type="button" id="history_list" value="List" style="margin-top:0.5em;width:100%;font-size:x-small;">
				<input type="button" id="history_reset" value="Reset" style="margin-top:1.5em;width:100%">
				</div>
				<div id="history_container" style="margin-left:1em;padding:0px 5px;height:7em;width:40em">
				  <canvas id="history_graph"></canvas>
				</div>
				<style>
				.jquery-modal.blocker {
				  z-index: 100 !important;
				}
				#clip_modal {
				  min-width: 800px;
				}
				#clip_modal_table {
				  width: 100%;
				  border-collapse: collapse;
				}
				#clip_modal_table tr{
				  border-bottom: 1px solid lightgray;
				}
				.col {
				  width: 7rem;
				  text-align: right;
				  padding-right: 1rem;
				}
				.col.no {
				  width: 3rem;
				}
				.col.memo {
				  width: unset;
				  text-align: left;
				  padding: unset;
				}
				.col.action {
				  width: 4.5rem;
				  padding-right: unset;
				}
				.clip_memo {
				  width: 100%;
				}
				div.clip_memo {
				  cursor: pointer;
				  min-height: 1.5rem;
				}
				</style>
				<div id="clip_modal" class="modal">
				  <table id="clip_modal_table">
				    <thead><tr>
				        <th class="col no">No.</th><th class="col">DPS</th>
				        <th class="col">確殺</th>
				        <th class="col memo">メモ</th>
				        <th class="col action"></th>
				    </tr></thead>
				    <tbody></tbody>
				  </table>
				</div>
				    `);

			let target = 0;
			const data = {
			  labels: [],
			  datasets: [{
			    label: "DPS",
			    data: [],
			    borderColor: "#005AFF",
			    yAxisID: "y",
			  }, {
			    label: "確殺",
			    data: [],
			    borderColor: "#FF4B00",
			    yAxisID: "y1",
			  }, {
			    label: "通常",
			    data: [],
			    borderColor: "#4DC4FF",
			    yAxisID: "y",
			  }, {
			    label: "1ｻｲｸﾙﾀﾞﾒ",
			    data: [],
			    borderColor: "#03AF7A",
			    yAxisID: "y",
			    hidden: true,
			  }]
			}
		    const footer = (items) => {
		    	return items[0].dataset.metadata[items[0].parsed.x].memo;
		    };
		    const ctx = document.getElementById("history_graph");
		    let chart = new Chart(ctx, {
		    	type: 'line',
		    	data: data,
		    	options: {
		    	  responsive: true,
		    	  maintainAspectRatio: false,
		    	  interaction: {
		    	    mode: 'index',
		    	    intersect: false,
		    	  },
		    	  plugins: {
		    	    legend: {
		    	      position: "right"
		    	    },
		    	    tooltip: {
		    	      callbacks: {
		    	        footer: footer,
		    	      }
		    	    },
		    	  },
		    	  stacked: false,
		    	  scales: {
		    	    y: {
		    	      type: "linear",
		    	      display: true,
		    	      position: "left",
		    	      grid: {
		    	        drawOnChartArea: false,
		    	      },
		    	    },
		    	    y1: {
		    	      type: "linear",
		    	      display: true,
		    	      position: "right",
		    	      grid: {
		    	        drawOnChartArea: false,
		    	      },
		    	    }
		    	  },
		    	  onClick: (e) => {
					showLoadingIndicator();
		    	    const canvasPosition = Chart.helpers.getRelativePosition(e, chart);
		    	    const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
		    	    if (chart.data.datasets[0].data.length > dataX) {
		    	    	let url = chart.data.datasets[0].metadata[Math.abs(dataX)]["url"];
		    	    	CSaveController.loadFromURL(url);
		    	    	CItemInfoManager.OnClickExtractSwitch();
		    	    }
					calc();
					LoadSelect2();
					hideLoadingIndicator();
		    	  }
		    	}
		    });

		    $("#history_clip").click(e => {
		    	// 直前の敵と同じか？
		    	if (target != $(".OBJID_MONSTER_MAP_MONSTER").val()) {
		    		chart.data.labels = [];
		    		chart.data.datasets[0].data = [];
		    		chart.data.datasets[0].metadata = [];
		    		chart.data.datasets[1].data = [];
		    		chart.data.datasets[2].data = [];
		    		chart.data.datasets[3].data = [];
		    		target = $(".OBJID_MONSTER_MAP_MONSTER").val();
		    	}
				showLoadingIndicator();
				const mgr = CSaveController.getSaveDataManagerCur();
				mgr.ReCalcManager();
				calc();
		    	const metadata = { "memo": "", "url": CSaveController.encodeToURL() };
		    	if ($("#clip_with_memo").prop('checked')) {
		    		memo = prompt("clipメモ");
		    		if (memo) metadata["memo"] = memo;
		    	}
		    	chart.data.labels.push(chart.data.labels.length + 1);
		    	const dps = parseFloat($("#BTLRSLT_PART_ATKCNT").parent().prev().prev().prev().prev().text().replaceAll(",", ""))
		    	chart.data.datasets[0].data.push(isNaN(dps) ? 0 : dps);
		    	chart.data.datasets[0].metadata.push(metadata);
		    	const cnt = parseInt($("#BTLRSLT_PART_EXP").parent().prev().prev().text().replaceAll(",", ""));
		    	chart.data.datasets[1].data.push(isNaN(cnt) ? 0 : cnt);
		    	const btlrslt_damage_totals = $("#BATTLE_RESULT_DAMAGE").children(".BTLRSLT_DAMAGE_TOTAL");
		    	const btlrslt_damage_details = $("#BATTLE_RESULT_DAMAGE").children(".BTLRSLT_DAMAGE_DETAIL");
		    	const dmg_index = btlrslt_damage_totals.length/3;
		    	const dmg = parseFloat($(btlrslt_damage_totals.get(dmg_index)).text().replaceAll(",", ""));
		    	const cycle_index = dmg_index + btlrslt_damage_totals.length/3/2;
		    	chart.data.datasets[2].data.push(isNaN(dmg) ? 0 : dmg);
		    	const cycle = parseFloat($(btlrslt_damage_details.get(cycle_index)).text().replaceAll(",", ""));
		    	chart.data.datasets[3].data.push(isNaN(cycle) ? 0 : cycle);
		    	chart.update();
				hideLoadingIndicator();
		    	g_Chart = chart;
		    });
		    $("#history_reset").click(e => {
		    	chart.data.labels = [];
		    	chart.data.datasets[0].data = [];
		    	chart.data.datasets[0].metadata = [];
		    	chart.data.datasets[1].data = [];
		    	chart.data.datasets[2].data = [];
		    	chart.data.datasets[3].data = [];
		    	target = 0;
		    	chart.update();
		    	g_Chart = null;
		    });
		    $("#history_list").click(e => {
		    	$("#history_graph").insertBefore("#clip_modal_table");
		    	reload_history_table();
		    	$("#clip_modal").modal();
		    });
		    const flip_clip = (i, j) => {
		    	[data.datasets[0].data[i], data.datasets[0].data[j]] =
		    	  [data.datasets[0].data[j], data.datasets[0].data[i]];
		    	[data.datasets[0].metadata[i], data.datasets[0].metadata[j]] =
		    	  [data.datasets[0].metadata[j], data.datasets[0].metadata[i]];
		    	[data.datasets[1].data[i], data.datasets[1].data[j]] =
		    	  [data.datasets[1].data[j], data.datasets[1].data[i]];
		    	[data.datasets[2].data[i], data.datasets[2].data[j]] =
		    	  [data.datasets[2].data[j], data.datasets[2].data[i]];
		    	[data.datasets[3].data[i], data.datasets[3].data[j]] =
		    	  [data.datasets[3].data[j], data.datasets[3].data[i]];
		    }
		    const reload_history_table = () => {
		      $("#clip_modal_table tbody *").remove();
		      let body = ""
		      for (i = 0; i < data.labels.length; i++) {
		        body += `<tr>
		                  <td class="col no">${data.labels[i].toLocaleString()}</td>
		                  <td class="col">${data.datasets[0].data[i].toLocaleString()}</td>
		                  <td class="col">${data.datasets[1].data[i].toLocaleString()}</td>
		                  <td class="col memo"><div class="clip_memo">${data.datasets[0].metadata[i].memo}</div><input type="text" class="clip_memo" style="display:none;" value="${data.datasets[0].metadata[i].memo}"></td>
		                  <td class="col action"><button class="up_clip" ${i==0?"disabled":""}>↑</button><button class="down_clip"${i==data.labels.length-1?"disabled":""}>↓</button><button class="remove_clip">×</button></td>
		                </tr>`;
		      }
		      $("#clip_modal_table tbody").append(body);
		    }
		    $(document).on("click", "div.clip_memo", (e) => {
		      $(e.target).toggle();
		      $(e.target).next("input").toggle().focus();
		    });
		    $(document).on("change", "input.clip_memo", (e) => {
		      const index = e.target.closest("tr").rowIndex - 1;
		      data.datasets[0].metadata[index]["memo"] = e.target.value;
		      chart.update();
		      reload_history_table();
		      g_Chart = chart;
		    });
		    $(document).on("blur", "input.clip_memo", (e) => {
		      $(e.target).toggle();
		      $(e.target).prev("div").toggle();
		    });
		    $(document).on("click", ".up_clip", (e) => {
		      const row = e.target.closest("tr");
		      if (row.previousElementSibling) {
		        const index = row.rowIndex - 1;
		        flip_clip(index, index - 1);
		        chart.update();
		        reload_history_table();
		        g_Chart = chart;
		      }
		    });
		    $(document).on("click", ".down_clip", (e) => {
		      const row = e.target.closest("tr");
		      if (row.nextElementSibling) {
		        const index = row.rowIndex - 1;
		        flip_clip(index, index + 1);
		        chart.update();
		        reload_history_table();
		        g_Chart = chart;
		      }
		    });
		    $(document).on("click", ".remove_clip", (e) => {
		      const row = e.target.closest("tr");
		      const index = row.rowIndex - 1;
		      data.labels.pop();
		      data.datasets[0].data.splice(index, 1);
		      data.datasets[0].metadata.splice(index, 1);
		      data.datasets[1].data.splice(index, 1);
		      data.datasets[2].data.splice(index, 1);
		      data.datasets[3].data.splice(index, 1);
		      chart.update();
		      reload_history_table();
		      g_Chart = chart;
		    });
		    $("#clip_modal").on("modal:before-close", () => {
		      $("#history_graph").appendTo("#history_container");
		    });

			chart.data = chartDataObj;
	    	chart.update();
			g_Chart = chart;

		};
		buildForm();


	}


	/**
	 * シリアライズされたチャートデータを正規化する.
	 * オブジェクト形式の配列を Array 形式に変換.
	 * @param {Object} data シリアライズされたデータ
	 * @returns {Object} 正規化されたデータ
	 */
	static #normalizeChartData (data) {
		if (!data || typeof data !== 'object') {
			return data;
		}

		const normalized = { ...data };

		// labels をオブジェクトから配列に変換
		if (normalized.labels && typeof normalized.labels === 'object' && !Array.isArray(normalized.labels)) {
			normalized.labels = Object.values(normalized.labels);
		}

		// datasets をオブジェクトから配列に変換
		if (normalized.datasets && typeof normalized.datasets === 'object' && !Array.isArray(normalized.datasets)) {
			normalized.datasets = Object.values(normalized.datasets);

			// 各 dataset の中の配列形式のプロパティも正規化
			normalized.datasets = normalized.datasets.map(dataset => {
				const normalizedDataset = { ...dataset };

				// data が object の場合は Array に変換
				if (normalizedDataset.data && typeof normalizedDataset.data === 'object' && !Array.isArray(normalizedDataset.data)) {
					normalizedDataset.data = Object.values(normalizedDataset.data);
				}

				// metadata が object の場合は Array に変換
				if (normalizedDataset.metadata && typeof normalizedDataset.metadata === 'object' && !Array.isArray(normalizedDataset.metadata)) {
					normalizedDataset.metadata = Object.values(normalizedDataset.metadata);
				}

				return normalizedDataset;
			});
		}

		return normalized;
	}


	/**
	 * URLからデータを読み込む.
	 * @param {string} urlText データURL文字列（クエリ部分のみ）
	 */
	static loadFromURL (urlText) {

		if(urlText.startsWith('dx')){
			// base64 デコード
			const compressedData = base64ToUint8Array(urlText.slice(2));

			// Zstd 展開
			const decompressedData = window.zstdDecompressSync(compressedData);

			const parsedDecompressedData = JSON.parse(new TextDecoder().decode(decompressedData));

			console.debug('[loadFromURL]', 'jsonString for AI:', parsedDecompressedData);

			const baseData = parsedDecompressedData["base"];
			const chartData = parsedDecompressedData["chart"];

			if (CSaveController.bJSON) {
				let parsedData;
				try {
					parsedData = JSON.parse(baseData);
				} catch (e) {
					console.warn('[loadFromURL] failed to JSON.parse basedata', e);
					parsedData = [];
				}

				const restoredUnitArray = [];
				const pdlen = Array.isArray(parsedData) ? parsedData.length : 0;
				let pidx = 0;
				const BATCH = 200;

				const end = Math.min(pidx + BATCH, pdlen);
				while (pidx < pdlen) {
					for (; pidx < end; pidx++) {
						const unit = parsedData[pidx];
						const restoredParsedMap = new CMultiValueMapper();
						try {
							Object.entries(unit.parsedMap).forEach(([key, value]) => {
								const restoredValue = (typeof value === 'string' && /^\d+$/.test(value)) ? BigInt(value) : value;
								restoredParsedMap.add(key, restoredValue);
							});
						} catch (e) {
							try {
								for (const k in unit.parsedMap) {
									const v = unit.parsedMap[k];
									const restoredValue = (typeof v === 'string' && /^\d+$/.test(v)) ? BigInt(v) : v;
									restoredParsedMap.add(k, restoredValue);
								}
							} catch (ee) {}
						}

						const restoredPropInfoMap = new CSingletonMapper();
						try {
							Object.entries(unit.propInfoMap).forEach(([key, value]) => {
								const propInfo = new CSaveDataPropInfo(value.name, value.bits);
								restoredPropInfoMap.set(key, propInfo);
							});
						} catch (e) {
							try {
								for (const k in unit.propInfoMap) {
									const v = unit.propInfoMap[k];
									const propInfo = new CSaveDataPropInfo(v.name, v.bits);
									restoredPropInfoMap.set(k, propInfo);
								}
							} catch (ee) {}
						}

						restoredUnitArray.push({ parsedMap: restoredParsedMap, propInfoMap: restoredPropInfoMap });
					}
				}
				const mgr = new CSaveDataManager();
				mgr.restoreFromParsedData(restoredUnitArray);
				CSaveController.setSaveDataManagerCur(mgr);

				if (Array.isArray(n_B_KYOUKA)) n_B_KYOUKA.fill(0);
				if (Array.isArray(n_B_IJYOU)) n_B_IJYOU.fill(0);

			}
			else {

				// サニタイジング
				let dataText = this.sanitizeDataText(baseData);

				// ゼロ値圧縮の展開
				dataText = CSaveDataConverter.ExtractDataTextMIG(dataText);

				// モンスター状態異常等のクリア
				// 職業変更など引き継ぎたいケースもあるので、ロード処理のここでクリアする
				if (Array.isArray(n_B_KYOUKA)) {
					n_B_KYOUKA.fill(0);
				}
				if (Array.isArray(n_B_IJYOU)) {
					n_B_IJYOU.fill(0);
				}

				// セーブデータ読み込み
				const saveDataManagerNew = new CSaveDataManager();
				saveDataManagerNew.parseDataText(dataText);
				// 旧形式から移行した場合には、全体のコンパクションが必要なので
				saveDataManagerNew.doCompaction();

				// データ復元
				saveDataManagerNew.applyDataToControls();

				// メンバ変数を置き換え
				this.#saveDataManagerCur = saveDataManagerNew;

			}

			// 再計算
			calc();

			// 検索可能ドロップダウンリストのロード
			LoadSelect2();



			// chartdata があれば復元
			if (chartData && chartData.length > 1) {
				if (CSaveController.bJSON) {
					g_Chart = JSON.parse(chartData, (key, value) => {
						if (typeof value === 'string' && /^\d+$/.test(value)) {
							// leave numeric-looking strings as-is (no BigInt conversion here)
						}
						return value;
					});
				}
				else {
					// Chartのデータはchart.dataのみに絞っているのでこれだけでよい
					let param = JSON.parse(chartData);
					g_Chart = {};
					g_Chart.data = param;
				}
				// チャートの復元
				this.#restoreChartDisplay();
			}

		} else {

			// サニタイジング
			let dataText = this.sanitizeDataText(urlText);

			// ゼロ値圧縮の展開
			dataText = CSaveDataConverter.ExtractDataTextMIG(dataText);

			// モンスター状態異常等のクリア
			// 職業変更など引き継ぎたいケースもあるので、ロード処理のここでクリアする
			if (Array.isArray(n_B_KYOUKA)) {
				n_B_KYOUKA.fill(0);
			}
			if (Array.isArray(n_B_IJYOU)) {
				n_B_IJYOU.fill(0);
			}

			// セーブデータ読み込み
			const saveDataManagerNew = new CSaveDataManager();
			saveDataManagerNew.parseDataText(dataText);
			// 旧形式から移行した場合には、全体のコンパクションが必要なので
			saveDataManagerNew.doCompaction();

			// データ復元
			saveDataManagerNew.applyDataToControls();

			// メンバ変数を置き換え
			this.#saveDataManagerCur = saveDataManagerNew;

			// 再計算
			calc();

			// 検索可能ドロップダウンリストのロード
			LoadSelect2();
		}
	}



	/**
	 * ブラウザのローカルストレージが使用可能かを判定する.
	 * （MDN参照：https://developer.mozilla.org/ja/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#localstorage_%E3%81%AE%E6%A9%9F%E8%83%BD%E6%A4%9C%E5%87%BA）
	 * @param {string} type ストレージタイプ（"localStorage" or "sessionStorage"）
	 * @returns true:使用可能、false:使用不可
	 */
	static isAvailableBrowserStorage (type) {

		try {

			const storage = window[type];

			const x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);

			return true;
		}
		catch (e) {
			return false;
		}
	}

	/**
	 * ローカルストレージから計算機設定を読み込む.
	 */
	static LoadSettingFromLocalStorageMIG () {

		const rrtstAll = localStorage.getItem(CSaveController.STORAGE_NAME_SETTINGS);

		// ローカルストレージが空の場合は初期化する
		if (!rrtstAll) {
			this.#settingDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SETTINGS))();
			this.#settingDataUnit.SetUpAsDefault();
			return;
		}

		// サニタイジング
		const rrtst = this.sanitizeDataText(rrtstAll);

		// パース
		const parser = new CSaveDataUnitParse();
		parser.parse(rrtst, 0);

		this.#settingDataUnit = parser.saveDataUnitArray[0];
	}

	/**
	 * ローカルストレージへ計算機設定を保存する.
	 * @returns true:成功、false:失敗
	 */
	static SaveSettingToLocalStorageMIG () {

		// 計算機設定データを保存
		if (!this.#settingDataUnit) {
			return false;
		}

		const [dataText, indexOffset] = this.#settingDataUnit.encodeToURL("", 0);
		try {
			localStorage.setItem(CSaveController.STORAGE_NAME_SETTINGS, dataText);
		}
		catch (err) {
			return false;
		}

		return true;
	}

	/**
	 * ローカルストレージからデータを読み込む.
	 * @returns （なし）
	 */
	static LoadFromLocalStorageMIG () {

		// ローカルストレージが使用不可の場合、処理しない
		if (!this.isAvailableBrowserStorage(CSaveController.STORAGE_TYPE_LOCALSTORAGE)) {
			return;
		}

		// キャラクターデータ読み込み
		const rrtcdAll = localStorage.getItem(CSaveController.STORAGE_NAME_CHARA_DATA);
		const rrtcdArray = (rrtcdAll ? rrtcdAll.split(CSaveController.STORAGE_DATA_DELIMITER_UNIT) : []);

		// データを補正し、余白をトリム
		for (let idx = 0; idx < this.#charaDataArray.length; idx++) {

			// ストレージから読み取ったデータがない場合、処理しない
			if (idx >= rrtcdArray.length) {
				break;
			}
			if (rrtcdArray[idx] == null) {
				continue;
			}

			// データがある場合、名前データとセーブデータを分離する
			const splitted = rrtcdArray[idx].split(CSaveController.STORAGE_DATA_DELIMITER_PROP);

			// データがおかしい場合は、次へ
			if (splitted.length != 2) {
				continue;
			}

			// データ保持
			let nameData = splitted[0];
			let saveData = splitted[1];

			// サニタイジング
			nameData = this.sanitizeDataText(nameData);
			saveData = this.sanitizeDataText(saveData);

			// 配列データとして追加して、次へ
			this.#charaDataArray[idx] = [nameData, saveData];
		}
	}

	/**
	 * ローカルストレージへデータを保存する.
	 * @returns true:成功、false:失敗
	 */
	static SaveToLocalStorageMIG () {

		// ローカルストレージが使用不可の場合、処理しない
		if (!this.isAvailableBrowserStorage(CSaveController.STORAGE_TYPE_LOCALSTORAGE)) {
			return false;
		}

		// キャラクターデータを保存
		const rrtsdTextArray = [];
		for (let idx = 0; idx < this.#charaDataArray.length; idx++) {

			const propArray = [];

			// 名前、セーブデータを追加
			propArray.push(this.#charaDataArray[idx][0]);
			propArray.push(this.#charaDataArray[idx][1]);

			// 全プロパティを結合
			const propText = propArray.join(CSaveController.STORAGE_DATA_DELIMITER_PROP);

			// 全体テキスト配列に追加
			rrtsdTextArray.push(propText);
		}

		// 全体を結合
		const rrtsdText = rrtsdTextArray.join(CSaveController.STORAGE_DATA_DELIMITER_UNIT);

		// ストレージに設定
		try {
			localStorage.setItem(CSaveController.STORAGE_NAME_CHARA_DATA, rrtsdText);
		}
		catch (err) {
			return false;
		}

		return true;
	}


	static getSaveDataManagerCur() {
		return this.#saveDataManagerCur;
	}

	static setSaveDataManagerCur(manager) {
		this.#saveDataManagerCur = manager;
	}

	/**
	 * ローカルストレージに保存されている全セーブデータをテキストファイルにエクスポートする
	 * @returns 
	 */
	static exportAllCharaData() {
		// ローカルストレージが使用不可の場合、処理しない
		if (!this.isAvailableBrowserStorage(CSaveController.STORAGE_TYPE_LOCALSTORAGE)) {
			return;
		}		
		const dataText = localStorage.getItem(CSaveController.STORAGE_NAME_CHARA_DATA);	// 全セーブデータが結合された文字列
		if(dataText){
			const saveData = new Blob([`#ratoriohub-savedata#\n${dataText}`], {type:"text/plain"});
			let a = document.createElement("a");
			a.href = URL.createObjectURL(saveData);
			a.download = "ratoriohub.txt";
			a.click();
		}
	}

	/**
	 * テキストファイルに保存された全セーブデータをローカルストレージにインポートする
	 * @returns 
	 */
	static importAllCharaData() {
		// ローカルストレージが使用不可の場合、処理しない
		if (!this.isAvailableBrowserStorage(CSaveController.STORAGE_TYPE_LOCALSTORAGE)) {
			return;
		}
		let input = document.createElement("input");
		input.type = "file";
		input.onchange = function(e){
			const file = e.target.files[0]
			let reader = new FileReader();
			reader.onload = function(ev){
				const saveData = ev.target.result.split("\n");
				if (saveData[0] === "#ratoriohub-savedata#") {
					if (confirm("【重要】ブラウザに保存されているROラトリオHUBの全てのセーブデータが、選択したファイルの内容で上書きされます。\n\nこの操作は元に戻すことができません。本当に読み込みますか？")) {
						localStorage.setItem(CSaveController.STORAGE_NAME_CHARA_DATA, saveData[1]);
						location.reload();
					}
				} else {
					alert("指定されたセーブデータファイルが不正です。読み込めません。");
				}
			};
			reader.readAsText(file);
		};
		input.click();
	}

}
