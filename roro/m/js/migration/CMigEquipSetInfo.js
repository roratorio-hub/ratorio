
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();






/**
 * 装備可能品セット情報クラス.
 */
function CMigEquipSetInfo () {

	// セット成立フラグ
	this.bSet = false;

	// SPIDデータマップ
	this.spidDataMap = new Map();



	/**
	 * セット成立フラグを設定する.
	 */
	this.SetFlagSetDetected = function (bSet) {
		this.bSet = bSet;
	};

	/**
	 * セットが成立しているかを判定する.
	 * @return true:セット成立、false:成立していない
	 */
	this.IsSetDetected = function () {
		return this.bSet;
	};



	/**
	 * 指定のSPIDにデータを追加する.
	 */
	this.AddInfo = function (spid, data) {

		var info = this.spidDataMap.get(spid);

		if (!info) {
			info = new Array();
		}

		info.push(DeepCopyArray(data));

		this.spidDataMap.set(spid, info);
	};



	/**
	 * 複製する.
	 * @return 複製されたインスタンス
	 */
	this.Clone = function () {

		var idx = 0;

		var infoCloned = null;

		// インスタンス用意
		infoCloned = new CMigEquipSetInfo();

		// 変数をコピー
		infoCloned.bSet = this.bSet;

		// マップをディープコピー
		this.spidDataMap.forEach(
			function (valueF, keyF, mapF) {
				infoCloned.spidDataMap.set(keyF, DeepCopyArray(valueF));
			}
		);

		return infoCloned;
	};



	/**
	 * 一致判定を行う.
	 * @return true:一致、false:不一致
	 */
	this.IsEqual = function (setInfo) {

		var idx = 0;

		var bEqual = false;

		// 再帰検査関数
		var funcIsEqualArray = function (arrayAF, arrayBF) {

			var idxAF = 0;
			var idxBF = 0;

			var bArrayAF = Array.isArray(arrayAF);
			var bArrayBF = Array.isArray(arrayBF);

			var bEqualF = false;

			// 要素のデータ型検査
			if (bArrayAF != bArrayBF) {
				return false;
			}

			// 配列でない場合、直接比較
			if (!bArrayAF) {
				return (arrayAF == arrayBF);
			}

			// ここに来るなら、まだ配列

			// 長さの比較
			if (arrayAF.length != arrayBF.length) {
				return false;
			}

			// 要素の比較
			for (idxAF = 0; idxAF < arrayAF.length; idxAF++) {

				// 各A側のデータが、B側に存在するかを検査
				for (idxBF = 0; idxBF < arrayBF.length; idxBF++) {
					if (funcIsEqualArray(arrayAF[idxAF], arrayBF[idxBF])) {
						break;
					}
				}

				// 最後まで検索しても、A側のデータが、B側にない場合
				if (idxBF >= arrayBF.length) {
					return false;
				}
			}

			// ここまで来れば、すべてのA側のデータが、B側に存在する

			return true;
		}


		// 要素数の比較
		if (this.spidDataMap.size != setInfo.spidDataMap.size) {
			return false;
		}

		// マップの比較
		bEqual = true;
		this.spidDataMap.forEach(
			function (valueF, keyF, mapF) {

				// 不一致が確定している場合は、処理しない
				if (!bEqual) {
					return;
				}

				// 再帰検査
				bEqual = funcIsEqualArray(valueF, setInfo.spidDataMap.get(keyF));
			}
		);

		return bEqual;
	};


}





