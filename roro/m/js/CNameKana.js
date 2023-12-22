




//----------------------------------------------------------------
// 仮名種別
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumKanaType",
	[
		"KANA_TYPE_NORMAL",
		"KANA_TYPE_DAKUON",
		"KANA_TYPE_HANDAKU",
		"KANA_TYPE_SMALL",
		"KANA_TYPE_SOKUON",
		"KANA_TYPE_UDAKU",
	],
	0,
	1
);
CGlobalConstManager.DefinePseudoEnum(
	"EnumKanaType",
	[
		"KANA_TYPE_COUNT",
	],
	EnumKanaType.Count,
	1
);





//----------------------------------------------------------------
// データインデックス定義
//----------------------------------------------------------------

CGlobalConstManager.DefineEnum(
	"EnumNameKanaDataIndex",
	[
		"NAME_KANA_DATA_INDEX_NAME",
		"NAME_KANA_DATA_INDEX_KANA",
		"NAME_KANA_DATA_INDEX_SORT",
	],
	0,
	1
);
CGlobalConstManager.DefinePseudoEnum(
	"EnumNameKanaDataIndex",
	[
		"NAME_KANA_DATA_INDEX_COUNT",
	],
	EnumNameKanaDataIndex.Count,
	1
);








/**
 * 名称仮名クラス.
 */
function CNameKana (nameC, kanaC) {

	/** 名称. */
	this.name = (nameC ? nameC : "");

	/** 読み仮名. */
	this.kana = (kanaC ? kanaC : "");

	/** 仮名コード. */
	this.kanaCode = CNameKana.GetKanaCode(this.kana);

	/** ソートコード. */
	this.sortCode = CNameKana.GetSortCode(this.kanaCode);



	/**
	 * datデータに変換する.
	 * @param bCreateSortCode ソートコード生成フラグ
	 * @return datデータ
	 */
	this.ToDat = function (bCreateSortCode) {

		var dat = new Array();

		// 各データを配列に変換
		dat.push(this.name);
		dat.push(this.kanaCode);
		if (bCreateSortCode) {
			dat.push(this.sortCode);
		}

		return dat;
	};
}



/**
 * 指定の仮名の仮名コードを取得する.
 * @param kana 仮名
 * @return 仮名コード
 */
CNameKana.GetKanaCode = function (kana) {

	var idx = 0;

	var charText = "";
	var charCode = 0;

	var kanaCode = "";

	var sokuonKanas = "ッ";
	var udakuKanas = "ヴ";
	var smallKanas = "ァィゥェォャュョヮ";
	var dakuonKanas = "ガギグゲゴザジズゼゾダヂヅデドバビブベボ";
	var handakuKanas = "パピプペポ";
	var chouonKanas = "ー";
	var spaceKanas = "　";



	// １文字ずつ変換する
	kanaCode = "";
	for (idx = 0; idx < kana.length; idx++) {

		// 文字、および、文字コードを取得
		charText = kana.charAt(idx);
		charCode = charText.charCodeAt(0);


		// 平仮名は片仮名に変換
		if ((0x3041 <= charCode) && (charCode <= 0x309F)) {
			charCode += 0x0060;
			charText = String.fromCharCode(charCode);
		}

		// 英小文字は英大文字に変換
		else if ((0xFF41 <= charCode) && (charCode <= 0xFF5F)) {
			charCode -= 0x0020;
			charText = String.fromCharCode(charCode);
		}


		// 促音仮名の場合
		if (sokuonKanas.indexOf(charText) >= 0) {
			// 文字コードを１つ後ろへずらして追加する（大文字にする）
			kanaCode += CNameKana.GetKanaCodeSub(charCode + 1, KANA_TYPE_SOKUON);
		}

		// ウ濁音仮名の場合
		else if (udakuKanas.indexOf(charText) >= 0) {
			// 文字コードを「ウ」にして追加する（清音にする）
			kanaCode += CNameKana.GetKanaCodeSub("ウ".charCodeAt(0), KANA_TYPE_UDAKU);
		}

		// 小文字仮名の場合
		else if (smallKanas.indexOf(charText) >= 0) {
			// 文字コードを１つ後ろへずらして追加する（大文字にする）
			kanaCode += CNameKana.GetKanaCodeSub(charCode + 1, KANA_TYPE_SMALL);
		}

		// 濁音仮名の場合
		else if (dakuonKanas.indexOf(charText) >= 0) {
			// 文字コードを１つ前へずらして追加する（清音にする）
			kanaCode += CNameKana.GetKanaCodeSub(charCode - 1, KANA_TYPE_DAKUON);
		}

		// 半濁音仮名の場合
		else if (handakuKanas.indexOf(charText) >= 0) {
			// 文字コードを２つ前へずらして追加する（清音にする）
			kanaCode += CNameKana.GetKanaCodeSub(charCode - 2, KANA_TYPE_HANDAKU);
		}

		// 伸ばし棒の場合は、直前の文字の母音を採用する
		else if (chouonKanas.indexOf(charText) >= 0) {
			if (idx > 0) {
				kanaCode += "A" + kanaCode.substring(kanaCode.length - 1)
			}
			else {
				kanaCode += "XX";
			}
		}

		// スペースの場合
		else if (spaceKanas.indexOf(charText) >= 0) {
			kanaCode += "WW";
		}

		// 上記以外の場合
		else {
			// そのまま追加する
			kanaCode += CNameKana.GetKanaCodeSub(charCode, KANA_TYPE_NORMAL);
		}
	}

	return kanaCode;
};

/**
 * 指定の文字の仮名コードを取得する.
 * @param baseCode 文字コード
 * @param kanaType 仮名タイプ
 * @return 仮名コード
 */
CNameKana.GetKanaCodeSub = function (baseCode, kanaType) {

	var letterIndex = 0;
	var bAnotherLetter = false;
	var rowIndex = 0;
	var columnIndex = 0;
	var rrtRowLetter = "";



	// ア～オ
	if ((0x30A1 <= baseCode) && (baseCode <= 0x30AA)) {
		letterIndex = Math.floor((baseCode - 0x30A1) / 2);
	}

	// カ～チ
	else if (baseCode <= 0x30C2) {
		letterIndex = 5 + Math.floor((baseCode - 0x30AB) / 2);
	}

	// ツ
	else if (baseCode <= 0x30C5) {
		letterIndex = 17;
	}

	// テ～ト
	else if (baseCode <= 0x30C9) {
		letterIndex = 18 + Math.floor((baseCode - 0x30C6) / 2);
	}

	// ナ～ノ
	else if (baseCode <= 0x30CE) {
		letterIndex = 20 + (baseCode - 0x30CA);
	}

	// ハ～ホ
	else if (baseCode <= 0x30DD) {
		letterIndex = 25 + Math.floor((baseCode - 0x30CF) / 3);
	}

	// マ～モ
	else if (baseCode <= 0x30E2) {
		letterIndex = 30 + (baseCode - 0x30DE);
	}

	// ヤ～ヨ
	else if (baseCode <= 0x30E8) {
		letterIndex = 35 + Math.floor((baseCode - 0x30E3) / 2);
	}

	// ラ～ロ
	else if (baseCode <= 0x30ED) {
		letterIndex = 40 + (baseCode - 0x30E9);
	}

	// ワ
	else if (baseCode <= 0x30EF) {
		letterIndex = 45;
	}

	// ヲ～ン
	else if (baseCode <= 0x30F3) {
		letterIndex = 46 + (baseCode - 0x30F0);
	}

	// ヴ
	else if (baseCode <= 0x30F4) {
		letterIndex = 52;
	}

	// 数字
	else if ((0xFF10 <= baseCode) && (baseCode <= 0xFF19)) {
		return ("0" + String.fromCharCode("0".charCodeAt(0) + (baseCode - 0xFF10)));
	}

	// 英大文字
	else if ((0xFF21 <= baseCode) && (baseCode <= 0xFF3A)) {
		return ("0" + String.fromCharCode("A".charCodeAt(0) + (baseCode - 0xFF21)));
	}

	// 上記以外（許容しない文字）
	else {
		return "XX";
	}



	// 行番号、列番号取得
	rowIndex = Math.floor(letterIndex / 5);
	columnIndex = (letterIndex % 5) + 1;



	switch (kanaType) {

	// 促音（「ッ」）
	case KANA_TYPE_SOKUON:
		return ("z" + columnIndex);

	// 半濁音（「パ～ポ」）
	case KANA_TYPE_HANDAKU:
		return ("y" + columnIndex);

	// ウ濁音（「ヴ」）
	case KANA_TYPE_UDAKU:
		return ("v" + columnIndex);

	// 促音以外の小文字と濁音
	case KANA_TYPE_SMALL:
	case KANA_TYPE_DAKUON:
		bAnotherLetter = true;
		break;

	// 上記以外
	default:
		bAnotherLetter = false;
		break;
	}



	// 行レター取得
	rrtRowLetter = String.fromCharCode("A".charCodeAt(0) + rowIndex);
	if (bAnotherLetter) {
		rrtRowLetter = rrtRowLetter.toLowerCase();
	}

	return (rrtRowLetter + columnIndex);

};

/**
 * 指定の仮名コードからソートコードを取得する.
 * @param kanaCode 仮名コード
 * @return ソートコード
 */
CNameKana.GetSortCode = function (kanaCode) {
	return kanaCode.replace("z", "d").replace("y", "f").replace("v", "a").toUpperCase();
};

