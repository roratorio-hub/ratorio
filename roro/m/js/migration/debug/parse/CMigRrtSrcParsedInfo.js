// デバッグファイル読み込みチェック
DebugFileIncludeCheck();














// パラメータID定義
CGlobalConstManager.DefineEnum(
	"EnumParsedInfoStatus",
	[
		"PARSED_INFO_STATUS_NONE",

		"PARSED_INFO_STATUS_SUCCEEDED",
		"PARSED_INFO_STATUS_FAILED",
	],
	0,
	1
);
















/**
 * 解析情報クラス.
 */
function CMigRrtSrcParsedInfo () {

	// 解析ステータス
	this.status = PARSED_INFO_STATUS_NONE;

	// 解析ステータス詳細テキスト
	this.statusDetailText = "";

	// データ種別
	this.dataKind = 0;

	// 解析データマップ
	this.parsedDataMap = new Map();

	// 解析元データテキスト
	this.dataTextSrc = "";

	// 解析後jsテキスト配列（本体）
	this.parsedDataArray = [];

	// 解析後jsテキスト配列（説明文）
	this.parsedExplainArray = [];



	/**
	 * 解析データを設定する.
	 * @param key 解析データの名称キー
	 * @param value 設定する値
	 */
	this.SetParsedData = function (key, value) {
		this.parsedDataMap.set(key, value);
	};

	/**
	 * 解析データを取得する.
	 * @param key 解析データの名称キー
	 * @return 対応する値
	 */
	this.GetParsedData = function (key) {
		return this.parsedDataMap.get(key);
	};



	/**
	 * 同一データかを判定する.
	 * @param target 判定対象の解析データ
	 * @param bIgnoreOfficialId 公式IDの違いを無視するかのフラグ
	 * @param bIgnoreSlot スロットの違いを無視するかのフラグ
	 * @return true:一致、false:不一致
	 */
	this.IsSameData = function (target, bIgnoreOfficialId, bIgnoreSlot) {

		var bSame = false;

		var funcGetCompareSize = function (dataMapF) {
			var sizeF = dataMapF.size;

			sizeF -= (dataMapF.has(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_VERSION) ? 1 : 0);
			sizeF -= (dataMapF.has(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATE) ? 1 : 0);
			sizeF -= (dataMapF.has(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID) ? 1 : 0);
			sizeF -= (dataMapF.has(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID_STR) ? 1 : 0);

			return sizeF;
		};

		if (funcGetCompareSize(this.parsedDataMap) != funcGetCompareSize(target.parsedDataMap)) {
			return false;
		}

		bSame = true;
		this.parsedDataMap.forEach(
			function (valueF, keyF, mapF) {

				var targetValueF = null;

				// 既に判定が偽の場合は、処理打ち切り
				if (!bSame) {
					return;
				}

				// 公式IDの違いを無視する場合
				if (bIgnoreOfficialId) {
					if (keyF == CMigRrtSrcParsedInfo.PARSED_DATA_KEY_OFFICIAL_ID) {
						return;
					}
				}

				// スロットの違いを無視する場合
				if (bIgnoreSlot) {
					if (keyF == CMigRrtSrcParsedInfo.PARSED_DATA_KEY_SLOT) {
						return;
					}
				}

				// 対象解析データの登録データを取得する
				targetValueF = target.GetParsedData(keyF);

				if (targetValueF === undefined) {
					bSame = false;
				}
				else {
					bSame &= (valueF == targetValueF);
				}
			}
		);

		return bSame;
	};



	/**
	 * パースした情報配列をもとに、RRTSRC ファイルの内容を生成する.
	 */
	this.GetRrtSrcText = function () {

		var dtNow = null;
		var dateText = "";

		var textArray = null;
		var textResult = "";

		var keyArray = [
			CMigRrtSrcParsedInfo.PARSED_DATA_KEY_VERSION,
			CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATE,
			CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KIND,
			CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID,
			CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID,
			CMigRrtSrcParsedInfo.PARSED_DATA_KEY_OFFICIAL_ID,
			CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR,
			CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID_STR,
			CMigRrtSrcParsedInfo.PARSED_DATA_KEY_NAME,
			CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KANA,
			CMigRrtSrcParsedInfo.PARSED_DATA_KEY_SLOT,
		];



		// 現在時刻を算出
		dtNow = new Date();

		dateText = dtNow.getFullYear();
		dateText += "/" + ("0" + (dtNow.getMonth() + 1)).slice(-2);
		dateText += "/" + ("0" + dtNow.getDate()).slice(-2);

		// バージョンデータ、日付情報追記
		this.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_VERSION, "1.0");
		this.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATE, dateText);




		// 結果用配列用意
		textArray = new Array();



		// 解析データコメント部の生成
		keyArray.forEach(
			function (valueF, indexF, arrayF) {
				var dataF = this.GetParsedData(valueF);

				if (dataF !== undefined) {

					if (valueF == CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KIND) {
						dataF = EnumConstDataKind.GetDefinedName(dataF);
					}

					textArray.push("//" + valueF + "\t:" + dataF);
				}
			},
			this
		);



		// 結果の生成
		textResult = "";

		if (textArray.length > 0) {
			textResult += "//" + "-".repeat(32) + "\r\n";
			textResult += textArray.join("\r\n") + "\r\n";
			textResult += "//" + "-".repeat(32) + "\r\n";
		}

		textResult += this.dataTextSrc;

		// すべて、CRLF に変換
		textResult = textResult.replace(/(?<!\r)\n/g, "\r\n");
		textResult = textResult.replace(/\r(?!\n)/g, "\r\n");



		return textResult;
	};
}

CMigRrtSrcParsedInfo.PARSED_DATA_KEY_VERSION = "ver";
CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATE = "date";
CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KIND = "kind";
CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID = "datid";
CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID = "refid";
CMigRrtSrcParsedInfo.PARSED_DATA_KEY_OFFICIAL_ID = "ofcid";
CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR = "idstr";
CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID_STR = "rfstr";
CMigRrtSrcParsedInfo.PARSED_DATA_KEY_NAME = "name";
CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KANA = "kana";
CMigRrtSrcParsedInfo.PARSED_DATA_KEY_SLOT = "slot";

CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KANA_ALIAS = "alias";		// エンチャントリストの RRTSRC ファイルの名称に使用する。データとしては出力しない


