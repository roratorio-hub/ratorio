/**
 * セーブデータの変換を行うクラス.
 */
function CSaveDataConverter() {

}

/**
 * 文字マッピング配列.
 */
CSaveDataConverter.LetterMappingArray = [
	"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
	"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];

/**
 * 文字マッピング配列.
 * （新形式用64種）
 */
CSaveDataConverter.LetterMappingArrayMIG = [
	"0","1","2","3","4","5","6","7","8","9",
	"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
	"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
	"-","_",
];
/**
 * 新形式での1文字あたりのビット数
 */
CSaveDataConverter.letterBitsMIG = 6;


/**
 * 数値を文字列に変換する.
 * @param value 変換する数値
 * @param convlen 変換後の文字数
 * @return 変換された文字列
 */
CSaveDataConverter.ConvertNtoS = function (value, convlen) {

	var idx = 0;

	var digitUnit = 0;

	var valueWork = 0n;
	var valueDigit = 0;

	var converted = "";

	var lengthDiff = 0;

	digitUnit = BigInt(CSaveDataConverter.LetterMappingArray.length);

	valueWork = BigInt(value);

	while (valueWork > 0n) {

		valueDigit = valueWork % digitUnit;

		converted = CSaveDataConverter.LetterMappingArray[valueDigit] + converted;

		valueWork = (valueWork - valueDigit) / digitUnit
	}

	lengthDiff = convlen - converted.length;

	for (idx = 0; idx < lengthDiff; idx++) {
		converted = CSaveDataConverter.LetterMappingArray[0] + converted;
	}

	return converted;
};

/**
 * 数値を文字列に変換する（移行用bigint対応版）.
 * @param value 変換する数値
 * @param convlen 変換後の文字数
 * @return 変換された文字列
 */
CSaveDataConverter.ConvertNtoSMIG = function (value, convlen) {

	const digitUnit = BigInt(CSaveDataConverter.LetterMappingArrayMIG.length);

	let valueWork = BigInt(value);
	let converted = "";

	while (valueWork > 0n) {

		const valueDigit = valueWork % digitUnit;

		converted = CSaveDataConverter.LetterMappingArrayMIG[floorBigInt32(valueDigit)] + converted;

		valueWork = (valueWork - valueDigit) / digitUnit
	}

	const lengthDiff = convlen - converted.length;
	if (lengthDiff > 0) {
		converted = CSaveDataConverter.LetterMappingArrayMIG[0].repeat(lengthDiff) + converted;
	}

	return converted;
};

/**
 * 文字列を数値に変換する.
 * @param str 変換する文字列
 * @return 変換された数値
 */
CSaveDataConverter.ConvertStoN = function (str) {

	var pos = 0;

	var digitUnit = 0;

	var strWork = "";
	var valueDigit = 0;

	var converted = 0;

	digitUnit = CSaveDataConverter.LetterMappingArray.length;

	strWork = "" + str;

	for (pos = 0; pos < strWork.length; pos++) {

		valueDigit = CSaveDataConverter.LetterMappingArray.indexOf(strWork.charAt(pos));

		if (valueDigit == -1) {
			continue;
		}

		converted += valueDigit * Math.pow(digitUnit, strWork.length - 1 - pos);
	}

	return converted;
};

/**
 * 文字列を数値に変換する（移行用bigint対応版）.
 * @param str 変換する文字列
 * @return 変換された数値
 */
CSaveDataConverter.ConvertStoNMIG = function (str) {

	const strWork = "" + str;
	const digitUnit = BigInt(CSaveDataConverter.LetterMappingArrayMIG.length);

	let converted = 0n;

	for (let pos = 0; pos < strWork.length; pos++) {

		let valueDigit = CSaveDataConverter.LetterMappingArrayMIG.indexOf(strWork.charAt(pos));
		if (valueDigit == -1) {
			continue;
		}

		converted += (digitUnit ** BigInt(strWork.length - 1 - pos)) * BigInt(valueDigit);
	}

	return converted;
};



/**
 * マイナスが許容される数値を文字列に変換する.
 * @param value 変換する数値（負数可）
 * @param convlen 変換後の文字数
 * @return 変換された文字列
 */
CSaveDataConverter.ConvertSignedNtoS = function (value, convlen) {

	var valueCmp = 0;

	// 負数を指定のビット数の２の補数表現に変換する
	valueCmp = CSaveDataConverter.ConvertSignedToUnsigned(value, convlen);

	// 数値に変換して返す
	return CSaveDataConverter.ConvertNtoS(valueCmp, convlen);
};

/**
 * マイナスが許容される文字列を数値に変換する.
 * @param str 変換する文字列
 * @return 変換された数値（負数もありうる）
 */
CSaveDataConverter.ConvertSignedStoN = function (str) {

	var convlen = 0;
	var value = 0;

	// 文字数を取得
	convlen = str.length;

	// まずは普通に数値に変換する（符号なし）
	value = CSaveDataConverter.ConvertStoN(str);

	// ２の補数表現を戻して返す
	return CSaveDataConverter.ConvertUnsginedToSigned(value, convlen);
};

/**
 * 符号なし数値に変換する.
 * @param signedValue 符号つき数値
 * @param convlen 変換後の文字数
 * @return 変換された文字列
 */
CSaveDataConverter.ConvertSignedToUnsigned = function (signedValue, convlen) {

	var rangeBits = 0;
	var modBase = 0;
	var valueMod = 0;
	var valueCmp = 0;

	// 変換後の文字数によって、許容される数値の範囲（ビット数）を決定
	rangeBits = 5 * convlen - ((convlen == 1) ? 1 : 0);

	// 剰余計算の元となる値を決定
	modBase = 1 << rangeBits;

	// 値を許容される範囲に切り捨てる
	valueMod = ((signedValue + modBase) % (modBase << 1)) - modBase;

	// 負数を指定のビット数の２の補数表現に変換する
	valueCmp = ((valueMod >= 0) ? valueMod : ((modBase << 1) + valueMod));

	// 数値を返す
	return valueCmp;
};

/**
 * 符号つき数値に変換する.
 * @param unsignedValue 符号なし数値
 * @param convlen 変換後の文字数
 * @return 変換された文字列
 */
CSaveDataConverter.ConvertUnsignedToSigned = function (unsignedValue, convlen) {

	var rangeBits = 0;
	var modBase = 0;
	var valueMod = 0;
	var valueCmp = 0;

	// 変換後の文字数によって、許容される数値の範囲（ビット数）を決定
	rangeBits = 5 * convlen - ((convlen == 1) ? 1 : 0);

	// 剰余計算の元となる値を決定
	modBase = 1 << rangeBits;

	// 値を許容される範囲に切り捨てる
	valueMod = unsignedValue % (modBase << 1);

	// ２の補数表現を戻す
	valueCmp = ((valueMod < modBase) ? valueMod : (0 - ((modBase << 1) - valueMod)));

	// 数値を返す
	return valueCmp;
};



/**
 * 文字表現データ文字列を圧縮する（移行用bigint対応版）.
 * @param dataText 文字表現データ文字列
 * @return 圧縮された文字表現データ文字列
 */
CSaveDataConverter.CompressDataTextMIG = function (dataText) {

	// 置換箇所検出用正規表現
	const maxCount = (CSaveDataConverter.LetterMappingArrayMIG.length ** 2) - 1;
	const regCharZero = new RegExp("^(.*?)(" + CSaveDataConverter.LetterMappingArrayMIG[0] + "{3," + maxCount + "})(.*?)$");

	// 強制文字列化
	dataText = "" + dataText;

	// 連続した0値を圧縮する
	let ret = null;
	while ((ret = regCharZero.exec(dataText)) != null) {

		const zeroLength = ret[2].length;
		let replacer = "";

		if (zeroLength < CSaveDataConverter.LetterMappingArrayMIG.length) {
			replacer = "." + CSaveDataConverter.ConvertNtoSMIG(zeroLength, 1);
		}
		else {
			replacer = "~" + CSaveDataConverter.ConvertNtoSMIG(zeroLength, 2);
		}

		dataText = ((ret[1] == null) ? "" : ret[1]) + replacer + ((ret[3] == null) ? "" : ret[3]);
	}

	return dataText;
};

/**
 * 文字表現データ文字列を展開する（移行用bigint対応版）.
 * @param dataText 文字表現データ文字列
 * @return 展開された文字表現データ文字列
 */
CSaveDataConverter.ExtractDataTextMIG = function (dataText) {

	// 置換箇所検出用正規表現
	const regCharD1 = /^(.*?)\.(.)(.*?)$/;
	const regCharD2 = /^(.*?)\~(.{2})(.*?)$/;

	// 展開用ラッパ
	const funcExtract = (regF) => {
		let retF = null;

		while ((retF = regF.exec(dataText)) != null) {
			const zeroLength = floorBigInt32(CSaveDataConverter.ConvertStoNMIG(retF[2]));
	
			dataText = ((retF[1] == null) ? "" : retF[1])
				+ CSaveDataConverter.LetterMappingArrayMIG[0].repeat(zeroLength)
				+ ((retF[3] == null) ? "" : retF[3]);
		}
	};

	// 強制文字列化
	dataText = "" + dataText;

	// 連続した0値に展開する
	funcExtract(regCharD1);
	funcExtract(regCharD2);

	return dataText;
};
