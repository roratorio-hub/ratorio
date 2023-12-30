



// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();






//================================================================================================================================
//================================================================================================================================
//
//
// 装備情報クラスのサブクラス群
//
//
//================================================================================================================================
//================================================================================================================================

/**
 * 装備情報クラス（基底）.
 * @param dataKindC データ種別
 */
function CMigEquipInfoBase (dataKindC) {

	// TODO: データ移行過渡処理
	// 現在はデータ種別を渡して計算時に判定して処理しているが、
	// データ移行でカードデータなどをアイテムに統合する可能性がある
	// その場合は、処理の変更が必要



	// データ種別
	this.dataKind = dataKindC;

	// データID
	this.dataId = 0;

	// 有効なSPデータ情報の配列
	this.effectiveSpDataInfoArray = null;



	/**
	 * イニシャライザ.
	 * @param dataKind データ種別
	 */
	this.Initialize = function (dataKind) {
		this.dataKind = dataKind;
		this.dataId = 0;
		this.effectiveSpDataInfoArray = [];
	};



	/**
	 * データIDを設定する.
	 * @param dataId データID
	 */
	this.SetDataId = function (dataId) {
		this.dataId = dataId;
	};

	/**
	 * データIDを取得する.
	 * @return データID
	 */
	this.GetDataId = function () {
		return this.dataId;
	};
}



/**
 * 装備情報クラス（アイテム）.
 */
function CMigEquipInfoItem () {

	//----------------
	// 継承定義は、クラス本体の次に記述
	//----------------



	//----------------
	// 追加プロパティ
	//----------------



	//----------------
	// 追加関数
	//----------------



	//----------------
	// イニシャライザ実行
	//----------------
	this.Initialize(this.dataKind);
}
CMigEquipInfoItem.prototype = new CMigEquipInfoBase(CONST_DATA_KIND_ITEM);



/**
 * 装備情報クラス（カード）.
 */
function CMigEquipInfoCard () {

	//----------------
	// 継承定義は、クラス本体の次に記述
	//----------------



	//----------------
	// 追加プロパティ
	//----------------



	//----------------
	// 追加関数
	//----------------



	//----------------
	// イニシャライザ実行
	//----------------
	this.Initialize(this.dataKind);
}
CMigEquipInfoCard.prototype = new CMigEquipInfoBase(CONST_DATA_KIND_CARD);



/**
 * 装備情報クラス（ランダムオプション）.
 */
function CMigEquipInfoRndOpt () {

	//----------------
	// 継承定義は、クラス本体の次に記述
	//----------------



	//----------------
	// 追加プロパティ
	//----------------

	// 値
	this.value = 0;



	//----------------
	// 追加関数
	//----------------

	/**
	 * イニシャライザ.
	 * @param dataKind データ種別
	 */
	this.Initialize = function (dataKind) {

		// 基底クラスをコール
		CMigEquipInfoRndOpt.prototype.Initialize.apply(this, [dataKind]);

		this.value = 0;
	};

	/**
	 * データ値を設定する.
	 * @param dataValue データ値
	 */
	this.SetDataValue = function (dataValue) {
		this.dataValue = dataValue;
	};

	/**
	 * データ値を取得する.
	 * @return データ値
	 */
	this.GetDataValue = function () {
		return this.dataValue;
	};





	//----------------
	// イニシャライザ実行
	//----------------
	this.Initialize(this.dataKind);
}
CMigEquipInfoRndOpt.prototype = new CMigEquipInfoBase(CONST_DATA_KIND_RND_OPT);










//================================================================================================================================
//================================================================================================================================
//
//
// 装備情報クラス本体
//
//
//================================================================================================================================
//================================================================================================================================

/**
 * 装備情報クラス.
 */
function CMigEquipInfo () {

	// 精錬値
	this.refined = 0;

	// アイテムID
	this.itemInfo = null;

	// カード情報配列
	this.cardInfoArray = null;

	// ランダムオプション情報配列
	this.rndOptInfoArray = null;

	// 有効なSPデータ情報の配列
	this.effectiveSpDataInfoArray = null;



	/**
	 * イニシャライザ.
	 */
	this.Initialize = function () {

		var idx = 0;

		this.refined = 0;

		this.itemInfo = new CMigEquipInfoItem();

		this.cardInfoArray = [];
		for (idx = 0; idx < CMigEquipInfo.cardCountInEquip; idx++) {
			this.cardInfoArray.push(new CMigEquipInfoCard());
		}

		this.rndOptInfoArray = [];
		for (idx = 0; idx < CMigEquipInfo.rndOptCountInEquip; idx++) {
			this.rndOptInfoArray.push(new CMigEquipInfoRndOpt());
		}

		this.effectiveSpDataInfoArray = [];
	};



	/**
	 * 装備を変更する.
	 * @param dataKind 設定先のデータ種別
	 * @param slotId 設定先のスロットID（不要なケースでは無視される）
	 * @param dataId 設定するデータID
	 * @param dataValue 設定する値（不要なケースでは無視される）
	 */
	this.ChangeEquip = function (dataKind, slotId, dataId, dataValue) {

		switch (dataKind) {

		case CONST_DATA_KIND_ITEM:
			this.itemInfo.SetDataId(dataId);
			break;

		case CONST_DATA_KIND_CARD:
			this.cardInfoArray[slotId].SetDataId(dataId);
			break;

		case CONST_DATA_KIND_ARROW:
			// 現状、アイテムと同じ扱い
			this.itemInfo.SetDataId(dataId);
			break;

		case CONST_DATA_KIND_RND_OPT:
			this.rndOptInfoArray[slotId].SetDataId(dataId);
			this.rndOptInfoArray[slotId].SetDataValue(dataValue);
			break;

		}
	};

	/**
	 * 装備されたIDを取得する.
	 * @param dataKind 取得するデータ種別
	 * @param slotId 取得するスロットID（不要なケースでは無視される）
	 */
	this.GetEquippedId = function (dataKind, slotId) {

		switch (dataKind) {

		case CONST_DATA_KIND_ITEM:
			return this.itemInfo.GetDataId();

		case CONST_DATA_KIND_CARD:
			return this.cardInfoArray[slotId].GetDataId();

		case CONST_DATA_KIND_ARROW:
			// 現状、アイテムと同じ扱い
			return this.itemInfo.GetDataId();

		case CONST_DATA_KIND_RND_OPT:
			return this.rndOptInfoArray[slotId].GetDataId();

		}

		return undefined;
	};

	/**
	 * 装着された値を取得する.
	 * @param dataKind 取得するデータ種別
	 * @param slotId 取得するスロットID（不要なケースでは無視される）
	 */
	this.GetEquippedValue = function (dataKind, slotId) {

		switch (dataKind) {

		case CONST_DATA_KIND_RND_OPT:
			return this.rndOptInfoArray[slotId].GetDataValue();

		}

		return undefined;
	};

	// TODO: 引数調整
	/**
	 * 属性を取得する.
	 * @param bArms 武器属性かのフラグ（true:武器、false:防具）
	 * @return 属性ID（指定なしの場合は、undefined）
	 * @remarks 引数の bArms は要調整
	 */
	this.GetElement = function (bArms) {

		var idx = 0;

		var cardId = 0;
		var cardData = 0;
		var rndOptId = 0;
		var rndOptData = 0;
		var itemId = 0;
		var itemData = 0;
		var kindData = undefined;

		var elementIdCard = undefined;
		var elementIdEnchant = undefined;
		var elementIdRndOpt = undefined;
		var elementIdItem = undefined;

		// TODO: カード種別未定義
		var cardKindArrayCard = [
		];

		var cardKindArrayEnchant = [
		];

		// TODO: 旧データ用、ITEM_SP_ARMS_ELEMENT 未対応
		var spidOld = (bArms ? ITEM_SP_ELEMENTAL : ITEM_SP_BODY_ELEMENT);

		var cardKindArrayCardOld = [
			CARD_KIND_ARMS,
			CARD_KIND_HEAD,
			CARD_KIND_SHIELD,
			CARD_KIND_BODY,
			CARD_KIND_SHOULDER,
			CARD_KIND_FOOT,
			CARD_KIND_ACCESSARY,
		];

		var cardKindArrayEnchantOld = [
			CARD_KIND_ENCHANT,
		];



		//----------------------------------------------------------------
		// カードとエンチャントを検査
		//----------------------------------------------------------------
		elementIdCard = undefined;
		elementIdEnchant = undefined;

		for (idx = 0; idx < CMigEquipInfo.cardCountInEquip; idx++) {

			// カードデータを取得
			cardId = this.GetEquippedId(CONST_DATA_KIND_CARD, idx);
			cardData = g_constDataManager.GetDataObject(CONST_DATA_KIND_CARD, cardId);

			// TODO: 移行時処理　本来は分岐しないはず
			if (cardData) {

				// 種別情報取得
				kindData = cardData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_EQUIP, undefined);
				if (kindData === undefined) {
					continue;
				}

				// カードの場合
				if (cardKindArrayCard.indexOf(kindData) >= 0) {
					// TODO: 未対応
				}

				// エンチャントの場合
				else if (cardKindArrayEnchant.indexOf(kindData) >= 0) {
					// TODO: 未対応
				}
			}
			else {

				// カードデータ取得
				cardData = CardObjNew[cardId];

				// カードの場合
				if (cardKindArrayCardOld.indexOf(cardData[CARD_DATA_INDEX_KIND]) >= 0) {

					// SPを検査し、属性指定があれば、取得して処理打ち切り
					for (var idxOld = CARD_DATA_INDEX_SPBEGIN; idxOld < cardData.length; idxOld += 2) {
						if (cardData[idxOld] == spidOld) {
							elementIdCard = cardData[idxOld + 1];
							break;
						}
					}
				}

				// エンチャントの場合
				else if (cardKindArrayEnchantOld.indexOf(cardData[CARD_DATA_INDEX_KIND]) >= 0) {

					// SPを検査し、属性指定があれば、取得して処理打ち切り
					for (var idxOld = CARD_DATA_INDEX_SPBEGIN; idxOld < cardData.length; idxOld += 2) {
						if (cardData[idxOld] == spidOld) {
							elementIdEnchant = cardData[idxOld + 1];
							break;
						}
					}
				}
			}
		}

		// カードによる属性があれば、それを採用
		if (elementIdCard !== undefined) {
			return elementIdCard;
		}

		// エンチャントによる属性があれば、それを採用
		if (elementIdEnchant !== undefined) {
			return elementIdEnchant;
		}



		//----------------------------------------------------------------
		// ランダムオプションを検査
		//----------------------------------------------------------------
		elementIdRndOpt = undefined;

		for (idx = 0; idx < CMigEquipInfo.rndOptCountInEquip; idx++) {

			// ランダムオプションを取得
			rndOptId = this.GetEquippedId(CONST_DATA_KIND_RND_OPT, idx);
			rndOptData = g_constDataManager.GetDataObject(CONST_DATA_KIND_RND_OPT, rndOptId);

			// TODO: 移行時処理　本来は分岐しないはず
			if (rndOptData) {

				// TODO: 未対応
			}
			else {

				// カードデータ取得
				rndOptData = g_rndOptArray[rndOptId];

				// SPIDを検査し、属性指定があれば、取得
				if (rndOptData[RND_OPT_DATA_INDEX_SPID] == spidOld) {
					elementIdRndOpt = this.GetEquippedValue(CONST_DATA_KIND_RND_OPT, idx);
				}
			}
		}

		// ランダムオプションによる属性があれば、それを採用
		if (elementIdRndOpt !== undefined) {
			return elementIdRndOpt;
		}



		//----------------------------------------------------------------
		// アイテム固定情報を検査
		//----------------------------------------------------------------
		elementIdItem = undefined;

		// アイテムを取得
		itemId = this.GetEquippedId(CONST_DATA_KIND_ITEM);
		itemData = g_constDataManager.GetDataObject(CONST_DATA_KIND_ITEM, itemId);

		// TODO: 移行時処理　本来は分岐しないはず
		if (itemData) {
			elementIdItem = itemData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, undefined);
		}
		else {

			// アイテムデータ取得
			itemData = ItemObjNew[itemId];

			// SPを検査し、属性指定があれば、取得して処理打ち切り
			for (var idxOld = ITEM_DATA_INDEX_SPBEGIN; idxOld < itemData.length; idxOld += 2) {
				if (itemData[idxOld] == spidOld) {
					elementIdItem = itemData[idxOld + 1];
					break;
				}
			}
		}

		// アイテム固定の属性があれば、それを採用
		if (elementIdItem !== undefined) {
			return elementIdItem;
		}



		// 何もなければ、指定なし
		return undefined;
	};


	/**
	 * 精錬値を設定する.
	 * @param refined 精錬値
	 */
	this.SetRefined = function (refined) {
		this.refined = refined;
	};

	/**
	 * 精錬値を取得する.
	 * @return 精錬値
	 */
	this.GetRefined = function () {
		return this.refined;
	};



	// イニシャライザ実行
	this.Initialize();
}

/**
 * 装備情報クラス内のアイテムの個数.
 */
CMigEquipInfo.itemCountInEquip = 1;

/**
 * 装備情報クラス内のカードの個数.
 */
CMigEquipInfo.cardCountInEquip = 4;

/**
 * 装備情報クラス内のランダムオプションの個数.
 */
CMigEquipInfo.rndOptCountInEquip = 5;



