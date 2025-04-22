/**
 * セーブデータユニットクラス：基底.
 */
class CSaveDataUnitBase {

	/**
	 * 処理順に並んだプロパティ名（継承プロパティ含む）.
	 */
	static get propNames () {
		return [
			CSaveDataConst.propNameType,
			CSaveDataConst.propNameVersion,
		];
	}

	/**
	 * 文字表現1文字あたりのビット数.
	 */
	get letterBits () {
		return CSaveDataConverter.letterBitsMIG;
	}

	/**
	 * プロパティ情報のマップ.
	 */
	propInfoMap;

	/**
	 * パースしたデータのマップ.
	 * （パースした整数値はBigIntで保持されているので、適宜Numberへ変換のこと）
	 */
	parsedMap;

	/**
	 * コンストラクタ.
	 */
	constructor () {

		// メンバ変数の初期化
		this.propInfoMap = new CSingletonMapper();
		this.clear();

		// プロパティ定義情報の登録
		this.registerPropInfo(CSaveDataConst.propNameType, this.letterBits * 2);
		this.registerPropInfo(CSaveDataConst.propNameVersion, this.letterBits);
	}

	/**
	 * プロパティ情報を登録する.
	 * @param {string} propName プロパティの名称
	 * @param {int} propBits プロパティのビット長
	 */
	registerPropInfo (propName, propBits) {
		const propInfo = new CSaveDataPropInfo(propName, propBits);
		this.propInfoMap.set(propInfo.name, propInfo);
	}

	/**
	 * パース済みの情報を消去する.
	 */
	clear () {
		this.parsedMap = new CMultiValueMapper();
	}

	/**
	 * 全データをパースする.
	 * （継承先でオーバーライドして個別のデータパース処理を追加する）
	 * @param {string} dataText パース対象を含む文字表現データ文字列
	 * @param {int} bitOffset 読み取りオフセット（ビット数）
	 * @returns {int} パースしたビット数
	 * @throws {Error} パース中に異常が検出された場合
	 */
	parse (dataText, bitOffset) {
		// すべてのプロパティを処理する
		const propNames = this.constructor.propNames;
		let readFlag = (1n << toSafeBigInt(propNames.length)) - 1n;
		for (let idx = 0; idx < propNames.length; readFlag >>= 1n, idx++) {
			// 処理プロパティ名を取得
			const propName = propNames[idx];
			// 読み込みフラグチェック
			if (!(readFlag & 1n)) {
				// フラグが立っていない場合は、ゼロ値を登録して、次へ
				// （ゼロ値を登録しておかないと、コンパクションの繰り返しでデータオフセットが保存できない）
				this.parsedMap.add(propName, 0);
				continue;
			}
			// プロパティ値の読み込み
			bitOffset += this.parseProp(propName, dataText, bitOffset);
			// 処理プロパティ名がパース制御フラグの場合、読み込みフラグを調整する
			if (propName == CSaveDataConst.propNameParseCtrlFlag) {
				readFlag = this.getProp(propName) << 1n;
			}
		}
		// データユニットが中途半端なところで終わらないようパディングする
		bitOffset = Math.ceil(bitOffset / this.letterBits) * this.letterBits;
		return bitOffset;
	}

	/**
	 * 単一のプロパティをパースする.
	 * @param {string} propName プロパティの名称
	 * @param {string} dataText パース対象データ文字列
	 * @param {int} bitOffset パース開始位置オフセット（ビット数単位）
	 * @returns {int} パースしたビット数
	 * @throws {Error} パース中に異常が検出された場合
	 */
	parseProp (propName, dataText, bitOffset) {
		// 強制文字列化
		dataText = "" + dataText;
		// 指定のプロパティ情報を取得する
		const propInfo = this.propInfoMap.get(propName);
		if (!propInfo) {
			throw new Error("Unknown property (not registered).");
		}
		// プロパティの文字表現長を取得
		const propBits = propInfo.bits;
		// データチェック
		if ((dataText.length * this.letterBits) < (bitOffset + propBits)) {
			throw new Error("Too short data text length to read property.");
		}
		// 前側の残り領域、前側切り出し領域、コア領域、後ろ側のはみ出し領域の大きさを計算
		const prevBits = (this.letterBits - (bitOffset % this.letterBits)) % this.letterBits;
		const spliceBits = Math.min(prevBits, propBits);
		const coreBits = Math.floor((propBits - spliceBits) / this.letterBits) * this.letterBits;
		const extraBits = propBits - coreBits - spliceBits;
		// 前側部分
		let prevValue = 0n;
		if (spliceBits != 0) {
			// 前側の文字を取得し数値へ変換
			const prevChar = dataText.charAt(Math.floor(bitOffset / this.letterBits));
			const prevNum = CSaveDataConverter.ConvertStoNMIG(prevChar);
			// 残り部分のみ取得
			prevValue = (prevNum >> toSafeBigInt(bitOffset % this.letterBits)) & ((1n << toSafeBigInt(spliceBits)) - 1n);
		}
		// コア部分
		let coreValue = 0n;
		if (coreBits != 0) {
			// 該当部分の文字列を取得し数値へ変換
			const posStart = Math.ceil(bitOffset / this.letterBits);
			const posEnd = posStart + (coreBits / this.letterBits);
			const coreText = dataText.slice(posStart, posEnd);
			coreValue = CSaveDataConverter.ConvertStoNMIG(coreText);
		}
		// 後ろ側の文字へはみ出しがある場合
		let extraValue = 0n;
		if (extraBits != 0) {
			// 後ろ側の文字を取得し数値へ変換
			const extraChar = dataText.charAt(Math.floor((bitOffset + propBits) / this.letterBits));
			const extraNum = CSaveDataConverter.ConvertStoNMIG(extraChar);
			// はみ出し部分のみ取得
			extraValue = extraNum & ((1n << toSafeBigInt(extraBits)) - 1n);
		}
		// 最終的な値を合成
		const propValue = extraValue + (coreValue << toSafeBigInt(extraBits)) + (prevValue << toSafeBigInt(extraBits + coreBits));
		// マップへ保存
		this.parsedMap.add(propName, propValue);
		// パースしたビット数を返す
		return propBits;
	}

	/**
	 * パース済みのプロパティを取得する.
	 * （戻り値はBigIntになっているはずなので、適宜Numberへ変換のこと）
	 * @param {string} propName プロパティの名称
	 * @returns {int|undefined} 成功時:パースした数値、失敗時:undefined
	 */
	getProp (propName) {
		return this.parsedMap.get(propName);
	}

	/**
	 * パース済みのプロパティを設定する.
	 * （継承先のクラスで、値の補正などに用いる）
	 * @param {string} propName プロパティの名称
	 * @param {int} value プロパティの値
	 */
	setProp (propName, value) {
		this.parsedMap.set(propName, toSafeBigInt(value));
	}

	/**
	 * URLクエリ文字列として出力する.
	 * @param {string} dataTextWork ここまでのデータを示すクエリデータ文字列
	 * @param {int} bitOffset パース開始位置オフセット（ビット数単位）
	 * @returns {[string, int]} 処理後の [dataTextWork, bitOffset] の組（配列）
	 * @throws {Error} 変換中に異常が検出された場合
	 */
	encodeToURL (dataTextWork, bitOffset) {
		// この関数はセーブ時のみ呼ばれる
		// ロード時には呼ばれない
		// データユニットのコンパクションを実行
		this.doCompaction();
		// 空のデータユニットの場合は処理なし
		if (this.isEmptyUnit()) {
			return [dataTextWork, bitOffset];
		}
		// 処理するプロパティの配列を取得
		const propNames = this.constructor.propNames;
		// すべてのプロパティを処理する
		let ctrlFlag = (1n << toSafeBigInt(propNames.length)) - 1n;
		const propNameCountMap = new Map();		// propName ごとの読み取り回数マップ
		for (let idx = 0; idx < propNames.length; ctrlFlag >>= 1n, idx++) {
			// 情報取得
			const propName = propNames[idx];
			const propInfoMain = this.propInfoMap.get(propName);
			const propBits = propInfoMain.bits;
			let propValue = undefined;
			// プロパティ名の読み取り回数を取得する
			let propNameReadCount = propNameCountMap.get(propName);
			if (propNameReadCount === undefined) {
				propNameReadCount = 0;
			}
			// 制御フラグが立っていない場合は処理しない
			if (!(ctrlFlag & 1n)) {
				// プロパティ名読み取り回数を更新
				propNameCountMap.set(propName, propNameReadCount + 1);
				continue;
			}
			// 取得したプロパティが制御フラグの場合、制御情報を変更する
			if (propName == CSaveDataConst.propNameParseCtrlFlag) {
				// BigInt のまま処理を進める
				propValue = this.getProp(propName);
				ctrlFlag = propValue << 1n;
			}
			// それ以外の場合は値を取得する
			else {
				propValue = this.getProp(propName);
				// 値が配列の場合は、マルチデータ型（同一プロパティ名に複数の値）なので該当要素を取り出す
				if (Array.isArray(propValue)) {
					propValue = propValue[propNameReadCount];
				}
			}
			// エラーチェック
			if (propValue === undefined) {
				throw new Error("Invalid value.");
			}
			// プロパティ名読み取り回数を更新
			propNameCountMap.set(propName, propNameReadCount + 1);
			// クエリ文字列に追記する
			dataTextWork = this.appendToDataText(dataTextWork, bitOffset, propValue, propBits);
			// ビットオフセットを更新
			bitOffset += propBits;
		}
		// データユニットが中途半端なところで終わらないようパディングする
		bitOffset = Math.ceil(bitOffset / this.letterBits) * this.letterBits;
		return [dataTextWork, bitOffset];
	}

	/**
	 * URLクエリ文字列として出力する.
	 * @param {string} dataTextWork ここまでのデータを示すクエリデータ文字列
	 * @param {int} bitOffset パース開始位置オフセット（ビット数単位）
	 * @param {BigInt} propValue プロパティの値
	 * @param {int} propBits プロパティのビット数
	 * @returns {string} 処理後の dataTextWork
	 */
	appendToDataText (dataTextWork, bitOffset, propValue, propBits) {
		// BitIntにキャストしておく
		propValue = toSafeBigInt(propValue);
		// 前側の残り領域、前側切り出し領域、コア領域、後ろ側のはみ出し領域の大きさを計算
		const prevBits = (this.letterBits - (bitOffset % this.letterBits)) % this.letterBits;
		const spliceBits = Math.min(prevBits, propBits);
		const coreBits = Math.floor((propBits - spliceBits) / this.letterBits) * this.letterBits;
		const extraBits = propBits - coreBits - spliceBits;
		// 前側の文字の残りがある場合
		if (spliceBits != 0) {
			// 前側の文字を取得し数値へ変換
			const prevChar = dataTextWork.slice(-1);
			const prevNum = floorBigInt32(CSaveDataConverter.ConvertStoNMIG(prevChar));
			// 入れ込む値を計算
			const shiftBits = propBits - spliceBits;
			const shiftedNum = floorBigInt32(propValue >> toSafeBigInt(shiftBits));
			// 前側の値を合成し文字表現へ変換
			const mixedNum = prevNum + (shiftedNum << (this.letterBits - prevBits));
			const mixedChar = CSaveDataConverter.ConvertNtoSMIG(mixedNum, 1);
			// 前側の文字を置換
			dataTextWork = dataTextWork.slice(0, -1) + mixedChar;
		}
		// コア部分
		if (coreBits != 0) {
			// 該当部分の数値を文字列へ変換
			const coreValue = (propValue >> toSafeBigInt(extraBits)) & ((1n << toSafeBigInt(coreBits)) - 1n);
			const coreCharCount = coreBits / this.letterBits;
			const coreText = CSaveDataConverter.ConvertNtoSMIG(coreValue, coreCharCount);
			// クエリ文字列へ追記
			dataTextWork += coreText;
		}
		// 後ろ側の文字へはみ出しがある場合
		if (extraBits != 0) {
			// 該当部分の数値を文字列へ変換
			const extraValue = propValue & ((1n << toSafeBigInt(extraBits)) - 1n);
			const extraText = CSaveDataConverter.ConvertNtoSMIG(extraValue, 1);
			// クエリ文字列へ追記
			dataTextWork += extraText;
		}
		return dataTextWork;
	}

	/**
	 * 旧形式のセーブデータを、新形式のセーブデータに変換する.
	 * （継承先でオーバーライドして使用する）
	 * @param {string} dataTextWork ここまでのデータを示すクエリデータ文字列
	 * @param {int} bitOffset パース開始位置オフセット（ビット数単位）
	 * @returns {[string, int]} 処理後の [dataTextWork, bitOffset] の組（配列）
	 * @param {...any} args 可変長の旧形式のデータ引数（残余引数）
	 */
	convertFromOldFormat (dataTextWork, bitOffset, ...args) {
		// 受け取った残余引数の前に、タイプ値とバージョン番号を追加する
		const argsMerged = [this.constructor.type, this.constructor.version].concat(args);
		// 処理するプロパティの配列を取得
		const propNames = this.constructor.propNames;
		// エラーチェック
		// （データ形式の移行では全指定される想定）
		if (propNames.length != argsMerged.length) {
			throw new Error("Count of arguments is not equal to count of properties.");
		}
		// すべてのプロパティを処理する
		for (let idx = 0; idx < propNames.length; idx++) {
			// 情報取得
			const propName = propNames[idx];
			const propInfo = this.propInfoMap.get(propName);
			const propBits = propInfo.bits;
			const propValue = argsMerged[idx];
			// クエリ文字列に追記する
			dataTextWork = this.appendToDataText(dataTextWork, bitOffset, propValue, propBits);
			// ビットオフセットを更新
			bitOffset += propBits;
		}
		// データユニットが中途半端なところで終わらないようパディングする
		bitOffset = Math.ceil(bitOffset / this.letterBits) * this.letterBits;
		return [dataTextWork, bitOffset];
	}

	/**
	 * データのデフォルト値を設定する.
	 * （継承先でオーバーライドして個別の処理を追加する）
	 */
	SetUpAsDefault() {
		this.setProp(CSaveDataConst.propNameType, this.constructor.type);
		this.setProp(CSaveDataConst.propNameVersion, this.constructor.version);
	}

	/**
	 * データのコンパクション（不要データの削除）を行う.
	 * （継承先でオーバーライドして個別の処理を追加する）
	 */
	doCompaction () {
	}

	/**
	 * 共用データコンパクション処理.
	 * （0 より大のデータのみ制御フラグを有効にする）
	 */
	doCompaction_ModifyFlagGT0 () {
		// 対象プロパティ名の配列
		const propNames = this.constructor.propNames;
		// 処理済みプロパティ名の配列
		const propNamesDone = [];
		// 空定義をチェックし、制御フラグを調整する
		let idxCtrlFlag = undefined;
		let idxCompaction = 0;
		let ctrlFlag = 0n;
		// TODO: 構造変えたい
		const asDataArray = [[], [], []];
		for (let idx = 0; idx < propNames.length; idx++) {
			const propName = propNames[idx];
			// 制御フラグの位置までは読み飛ばす
			if (idxCtrlFlag === undefined) {
				if (propName == CSaveDataConst.propNameParseCtrlFlag) {
					idxCtrlFlag = idx;
				}
				continue;
			}
			// プロパティ値を取得
			let propValue = this.getProp(propName);
			// オートスペル系固有処理
			switch (propName) {
				case CSaveDataConst.propNameAutoSpellID: {
					asDataArray[0] = propValue.slice();
					propNamesDone.push(propName);
					continue;
				}
				case CSaveDataConst.propNameAutoSpellLv: {
					asDataArray[1] = propValue.slice();
					propNamesDone.push(propName);
					continue;
				}
				case CSaveDataConst.propNameAutoSpellProb: {
					asDataArray[2] = propValue.slice();
					propNamesDone.push(propName);
					continue;
				}
			}
			// プロパティが設定されている場合のみ、コンパクションを行う
			if ((propValue !== undefined) && (propNamesDone.indexOf(propName) == -1)) {
				// 複数の値が設定されているケースも考慮し、単一の値でも配列化して処理する
				if (!Array.isArray(propValue)) {
					propValue = [propValue];
				}
				// 配列を順に走査
				for (let idxVal = 0; idxVal < propValue.length; idxVal++) {
					// 値が 0 より大きければ有効とみなす
					if (propValue[idxVal] > 0n) {
						ctrlFlag |= (1n << toSafeBigInt(idxCompaction));
					}
					idxCompaction++;
				}
				// 処理済みプロパティ名に追加
				propNamesDone.push(propName);
			}
			// プロパティが設定されていない場合は、インデックスだけ増やす
			else {
				idxCompaction++;
			}
		}
		// TODO: 構造変えたい
		// オートスペル固有処理
		if (asDataArray[0].length > 0) {
			ctrlFlag = 0n;
			for (let idx = 0; idx < asDataArray[0].length; idx++) {
				ctrlFlag |= (asDataArray[0][idx] > 0n) ? (1n << toSafeBigInt(3 * idx)) : 0n;
				ctrlFlag |= (asDataArray[1][idx] > 0n) ? (2n << toSafeBigInt(3 * idx)) : 0n;
				ctrlFlag |= (asDataArray[2][idx] > 0n) ? (4n << toSafeBigInt(3 * idx)) : 0n;
			}
		}
		this.setProp(CSaveDataConst.propNameParseCtrlFlag, ctrlFlag);
	}

	/**
	 * ユニットのデータが空であるかを判定する.
	 * （継承先でオーバーライドして個別の処理を追加する）
	 * @returns {boolean} true:空である、false:空でない
	 */
	isEmptyUnit () {
		return true;
	}

	/**
	 * 共用空ユニット判定処理.
	 * （制御フラグが 0 の場合のみ、空であると判定する）
	 * @returns {boolean} true:空である、false:空でない
	 */
	isEmptyUnit_CtrlFlag0 () {
		const propValue = this.getProp(CSaveDataConst.propNameParseCtrlFlag);
		if (propValue === undefined) {
			return true;
		}
		if (propValue != 0n) {
			return false;
		}
		return true;
	}
}