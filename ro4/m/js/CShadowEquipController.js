
/**
 * シャドウ装備コントローラクラス.
 */
class CShadowEquipController {

	/**
	 * 装備箇所名：武器（右手）.
	 */
	static get EQPRGN_NAME_ARMS_RIGHT () {
		return "eqprgn-arms-right";
	}

	/**
	 * 装備箇所名：武器（左手）.
	 */
	static get EQPRGN_NAME_ARMS_LEFT () {
		return "eqprgn-arms-left";
	}

	/**
	 * 装備箇所名：頭（上段）.
	 */
	static get EQPRGN_NAME_HEAD_TOP () {
		return "eqprgn-head-top";
	}

	/**
	 * 装備箇所名：頭（中段）.
	 */
	static get EQPRGN_NAME_HEAD_MID () {
		return "eqprgn-head-mid";
	}

	/**
	 * 装備箇所名：頭（下段）.
	 */
	static get EQPRGN_NAME_HEAD_UNDER () {
		return "eqprgn-head-under";
	}

	/**
	 * 装備箇所名：盾
	 */
	static get EQPRGN_NAME_SHIELD () {
		return "eqprgn-shield";
	}

	/**
	 * 装備箇所名：体
	 */
	static get EQPRGN_NAME_BODY () {
		return "eqprgn-body";
	}

	/**
	 * 装備箇所名：肩
	 */
	static get EQPRGN_NAME_SHOULDER () {
		return "eqprgn-shoulder";
	}

	/**
	 * 装備箇所名：足
	 */
	static get EQPRGN_NAME_FOOT () {
		return "eqprgn-foot";
	}

	/**
	 * 装備箇所名：アクセ１
	 */
	static get EQPRGN_NAME_ACCESSORY_1 () {
		return "eqprgn-accessory-1";
	}

	/**
	 * 装備箇所名：アクセ２
	 */
	static get EQPRGN_NAME_ACCESSORY_2 () {
		return "eqprgn-accessory-2";
	}

	/**
	 * 有効な装備箇所名の配列を取得する.
	 * @param {boolean} bDualArms 二刀流フラグ
	 */
	static getEqprgnNames (bDualShadowArms) {

		// シャドウ装備二刀流の場合
		if (bDualArms) {
			// TODO: 現状、そのような仕様はないので、未対応
			return [
				this.EQPRGN_NAME_ARMS_RIGHT,
				this.EQPRGN_NAME_ARMS_LEFT,
				this.EQPRGN_NAME_BODY,
				this.EQPRGN_NAME_FOOT,
				this.EQPRGN_NAME_ACCESSORY_1,
				this.EQPRGN_NAME_ACCESSORY_2,
			];
		}

		// TODO: 現状、オルタネイトシールドの装備位置が「左手」なので、SHIELD ではなく LEFT
		return [
			this.EQPRGN_NAME_ARMS_RIGHT,
			this.EQPRGN_NAME_ARMS_LEFT,
			this.EQPRGN_NAME_BODY,
			this.EQPRGN_NAME_FOOT,
			this.EQPRGN_NAME_ACCESSORY_1,
			this.EQPRGN_NAME_ACCESSORY_2,
		];
	}

	/**
	 * コンストラクタ.
	 */
	constructor () {
	}

	initializeHTML () {

		// ルート要素の取得
		const objRoot = document.getElementById("OBJID_SHADOW_EQUIPS_MIG");

		// 装備ブロックのリスト
		const equipBlockList = objRoot.querySelectorAll(":scope .equip-block");

		// 装備ブロックごとの初期化処理
		for (let idx = 0; idx < equipBlockList.length; idx++) {
			// 選択状態変更イベントリスナの追加
			equipBlockList[idx].addEventListener("change", (evt) => this.onChangeShadow(evt));
			// 精錬値選択オブジェクトの初期化
			const objItemRefined = equipBlockList[idx].querySelector(":scope .item-refined");
			HtmlRemoveAllChild(objItemRefined);
			for (let refined = 0; refined <= 10; refined++) {
				HtmlCreateElementOption(refined, "+" + refined, objItemRefined)
			}
		}
	}

	/**
	 * シャドウ装備設定ブロックを取得する.
	 * @param {string} eqprgnName 装備箇所名
	 * @returns {HtmlElement} ブロック全体のHTMLオブジェクト
	 */
	#getEquipBlockHTML (eqprgnName) {

		// ルート要素の取得
		const objRoot = document.getElementById("OBJID_SHADOW_EQUIPS_MIG");

		// 装備領域名をサニタイジング
		eqprgnName = ("" + eqprgnName).replaceAll(/[^-_a-zA-Z0-9]/g, "");

		// ブロック全体を取得
		return objRoot.querySelector(":scope .equip-block." + eqprgnName);
	}

	/**
	 * すべての箇所のシャドウ装備選択欄を再構築する.
	 */
	rebuildAll () {

		// 装備箇所配列
		const kindIdArray = [
			ITEM_KIND_SHADOW_ARMS_RIGHT,
			ITEM_KIND_SHADOW_ARMS_LEFT,
			ITEM_KIND_SHADOW_BODY,
			ITEM_KIND_SHADOW_FOOT,
			ITEM_KIND_SHADOW_ACCESSARY_ON1,
			ITEM_KIND_SHADOW_ACCESSARY_ON2,
		];

		// 装備可能なアイテム配列を用意する
		const itemIdArrayByKind = [];
		for (let idx = 0; idx < kindIdArray.length; idx++) {

			const kindId = kindIdArray[idx];
			const filtered = g_ItemIdArrayByKind[kindId].filter(
				(itemId) => IsMatchJobRestrict(itemId, n_A_JOB)
			);

			// 未選択を追加
			filtered.unshift(0);

			itemIdArrayByKind[kindId] = filtered;
		}

		// 各部位を呼び出し
		let equipableCount = 0;

		equipableCount += this.#rebuildBlock(this.constructor.EQPRGN_NAME_ARMS_RIGHT, itemIdArrayByKind[ITEM_KIND_SHADOW_ARMS_RIGHT]);
		equipableCount += this.#rebuildBlock(this.constructor.EQPRGN_NAME_ARMS_LEFT, itemIdArrayByKind[ITEM_KIND_SHADOW_ARMS_LEFT]);
		equipableCount += this.#rebuildBlock(this.constructor.EQPRGN_NAME_BODY, itemIdArrayByKind[ITEM_KIND_SHADOW_BODY]);
		equipableCount += this.#rebuildBlock(this.constructor.EQPRGN_NAME_FOOT, itemIdArrayByKind[ITEM_KIND_SHADOW_FOOT]);
		equipableCount += this.#rebuildBlock(this.constructor.EQPRGN_NAME_ACCESSORY_1, itemIdArrayByKind[ITEM_KIND_SHADOW_ACCESSARY_ON1]);
		equipableCount += this.#rebuildBlock(this.constructor.EQPRGN_NAME_ACCESSORY_2, itemIdArrayByKind[ITEM_KIND_SHADOW_ACCESSARY_ON2]);

		// シャドウ装備が一切装備できない場合は、全体を非表示にする
		const objRoot = document.getElementById("OBJID_SHADOW_EQUIPS_MIG");
		objRoot.style.display = (equipableCount > kindIdArray.length) ? "block" : "none";
	}

	/**
	 * 指定箇所のシャドウ装備選択欄を再構築する.
	 * @param {string} eqprgnName 装備箇所名
	 * @param {Array} itemIdArray 装備可能アイテムIDの配列
	 * @param {boolean} bDisplay 表示フラグ
	 * @returns {int} 装備可能アイテムの数
	 */
	#rebuildBlock (eqprgnName, itemIdArray) {

		// ブロック全体を取得
		const objEquipBlock = this.#getEquipBlockHTML(eqprgnName);

		// シャドウ装備アイテムの再構築
		const itemCount = this.#rebuildShadowSelectSubItem(objEquipBlock, itemIdArray);

		// 装備可能アイテムがない場合は、強制非表示にして終了
		const objEquipCtrl = objEquipBlock.querySelector(":scope .equip-ctrl");
		const objCardCtrl = objEquipBlock.querySelector(":scope .card-ctrl");
		if (itemCount == 0) {
			objEquipCtrl.checked = null;
			objCardCtrl.checked = null;
			return 0;
		}
		// そうでなければ、表示状態にする
		objEquipCtrl.checked = "checked";
		objCardCtrl.checked = "checked";

		// シャドウ装備の選択変更処理を呼び出し
		this.#changeShadowItem(objEquipBlock, itemIdArray[0]);

		return itemCount;
	}

	/**
	 * 指定箇所のシャドウ装備選択欄を再構築する（サブ：アイテム選択欄再構築）.
	 * @param {HTMLElement} objEquipBlock 装備ブロックオブジェクト
	 * @param {Array} itemIdArray 装備可能アイテムIDの配列
	 * @returns 選択欄の選択肢の数
	 */
	#rebuildShadowSelectSubItem (objEquipBlock, itemIdArray) {

		// アイテム設定ブロックを取得
		const objItemConf = objEquipBlock.querySelector(":scope .item-conf");

		// 精錬値のリセット
		const objItemRefined = objItemConf.querySelector(":scope .item-refined");
		this.#changeRefined(objItemRefined, 0);

		// 選択可能アイテムデータの生成
		const itemInfoArray = [];
		for (let idx = 0; idx < itemIdArray.length; idx++) {
			const itemId = itemIdArray[idx];
			const itemName = (itemId == 0) ? "（なし）" : ItemObjNew[itemId][ITEM_DATA_INDEX_NAME];
			const itemKana = (itemId == 0) ? "ア" : ItemObjNew[itemId][ITEM_DATA_INDEX_KANA];
			itemInfoArray.push([itemId, itemName, itemKana]);
		}
		// 読み仮名でソート
		itemInfoArray.sort(
			function(a, b) {
				if (a[2] < b[2]) return -1;
				if (a[2] > b[2]) return 1;
				return 0;
			}
		);

		// アイテム選択欄の再構築
		const objItemSelect = objItemConf.querySelector(":scope .item-select");
		HtmlRemoveAllChild(objItemSelect);
		for (let idx = 0; idx < itemInfoArray.length; idx++) {
			HtmlCreateElementOption(itemInfoArray[idx][0], itemInfoArray[idx][1], objItemSelect);
		}

		return itemInfoArray.length;
	}

	/**
	 * シャドウ装備の変更イベントハンドラ.
	 * @param {Event} evt イベントオブジェクト
	 */
	onChangeShadow (evt) {

		const objTarget = evt.target;
		const selectedValue = objTarget.value;

		// 装備変更イベントの場合
		if (objTarget.classList.contains("item-select")) {
			const objEquipBlock = objTarget.closest(".equip-block");
			this.#changeShadowItem(objEquipBlock, selectedValue);
		}
		// 精錬値変更イベントの場合
		else if (objTarget.classList.contains("item-refined")) {
			this.#changeRefined(objTarget, selectedValue);
		}
		// ランダムオプションの種類変更イベントの場合
		else if (objTarget.classList.contains("rndopt-kind-select")) {
			this.#changeRndOptKind(objTarget, selectedValue);
		}
		// ランダムオプションの種類変更イベントの場合
		else if (objTarget.classList.contains("rndopt-value-select")) {
			this.#changeRndOptValue(objTarget, selectedValue);
		}
		// エンチャントの変更イベントの場合
		else if (objTarget.classList.contains("card-select")) {
			const id = this.#changeEnchantValue(objTarget, selectedValue);
			OnChangeCard(id);
		}

		// 再計算
		StAllCalc();
		AutoCalc();
	}

	/**
	 * シャドウ装備を変更する.
	 * @param {HTMLElement} objEquipBlock 装備ブロックオブジェクト
	 * @param {int} newValue 変更後のアイテムID
	 * @returns 変更前の値、または、undefined
	 */
	#changeShadowItem (objEquipBlock, newValue) {

		//--------------------------------
		// アイテムの設定
		//--------------------------------
		// シャドウ装備選択用画面部品に設定
		const objItemSelect = objEquipBlock.querySelector(":scope .item-conf .item-select");

		// 値変更
		const oldValue = HtmlSelectObjectValueAsInteger(objItemSelect, newValue);
		if (oldValue === undefined) {
			return oldValue;
		}

		//--------------------------------
		// カード選択欄の再構築
		//--------------------------------
		/* HTMLエレメント */
		const element_list = objEquipBlock.querySelectorAll(":scope .card-select");
		// 初期化
		element_list.forEach(element => {
			HtmlRemoveAllChild(element);
			element.style.display = "none";
		});
		/* 選択中のシャドウ装備にセット可能なエンチャントID一覧 */
		const enchant_id_list = g_constDataManager.GetDataManger(CONST_DATA_KIND_ENCHANT_LIST).GetEnchListIdArrayByItemId(newValue);
		// 結果用配列用意
		let enchInfoArrayAllSlotsResult = [[],[],[],[]];
		let enchInfoArrayAllSlots = null;
		if (enchant_id_list.length > 0) {
			// エンチャント情報の収集
			for (let i = 0; i < enchant_id_list.length; i++) {
				enchInfoArrayAllSlots = RebuildCardSelectSubCollectEnchListData(enchant_id_list[i], enchInfoArrayAllSlotsResult);
				// 最終結果に追記
				for (let idxSlot = 0; idxSlot < enchInfoArrayAllSlots.length; idxSlot++) {
					enchInfoArrayAllSlotsResult[idxSlot] = enchInfoArrayAllSlotsResult[idxSlot].concat(enchInfoArrayAllSlots[idxSlot]);
				}
			}
			// エンチャント選択欄の構築
			for (let i = 1; i < element_list.length; i++) {
				const objSelect = element_list[i];
				HtmlCreateElementOption(CARD_ID_NONE, "エンチャントなし", objSelect);
				let enchListIdLast = -1;
				let objSelectGroup = null;
				enchInfoArrayAllSlotsResult[i].forEach(enchInfo => {
					// セレクトボックスのオプショングループを生成
					if (enchListIdLast != enchInfo[0]) {
						objSelectGroup = HtmlCreateElement("optgroup", objSelect);
						objSelectGroup.setAttribute("label", g_constDataManager.GetName(CONST_DATA_KIND_ENCHANT_LIST, enchInfo[0]));
						objSelectGroup.setAttribute("data-ench-list-id", enchInfo[0]);
						enchListIdLast = enchInfo[0];
					}
					// エンチャントデータ（カードデータ）を特定
					let cardId = enchInfo[1];
					let cardName = CardObjNew[cardId][CARD_DATA_INDEX_NAME];
					// 精錬条件を追記
					if (enchInfo[2].refinedBorderBase) {
						if (enchInfo[2].refinedBorderFlag) {
							if (!((enchInfo[2].refinedBorderBase == 0) && (enchInfo[2].refinedBorderFlag == MIG_BORDER_FLAG_ID_OVER))) {
								cardName += " (+" + enchInfo[2].refinedBorderBase + MigGetBorderFlagText(enchInfo[2].refinedBorderFlag, true) + ")";
							}
						}
					}
					// 選択肢を追加
					HtmlCreateElementOption(cardId, cardName, objSelectGroup);
				})
			}
		}
		// エンチャントを表示
		element_list.forEach(element => {
			if(element.length > 1) {
				element.style.display = "block";
			}
		});

		//--------------------------------
		// ランダムオプション欄の再構築
		//--------------------------------
		// ランダムオプションタイプIDを取得する
		const rndOptTypeId = GetRndOptTypeId(ItemObjNew[newValue][ITEM_DATA_INDEX_WPNLV]);
		const rndOptTypeList = objEquipBlock.querySelectorAll(":scope .rndopt-conf .rndopt-kind-select");
		const rndOptValueList = objEquipBlock.querySelectorAll(":scope .rndopt-conf .rndopt-value-select");
		// 全オプションスロットをループ
		for (let idx = 0; (idx < rndOptTypeList.length) && (idx < rndOptValueList.length); idx++) {

			const objRndOptType = rndOptTypeList[idx];
			const objRndOptValue = rndOptValueList[idx];

			// 有効なランダムオプションタイプIDが設定されている場合は、該当スロットのオプションリストIDを取得する
			const rndOptListId = (rndOptTypeId > 0) ? g_rndOptTypeArray[rndOptTypeId][RND_OPT_TYPE_DATA_INDEX_LIST_ID_ARRAY][idx] : 0;

			// 表示設定
			objRndOptType.style.display = (rndOptListId == 0) ? "none" : null;
			objRndOptValue.style.display = (rndOptListId == 0) ? "none" : null;

			// ランダムオプション種別　選択欄
			SetUpRndOptKind(objRndOptType, rndOptListId);

			// 再構築したデフォルト値を、選択している値として取得
			const rndOptId = (rndOptListId == 0) ? 0 : objRndOptType.value;

			// ランダムオプション値　選択欄
			SetUpRndOptValue(objRndOptValue, rndOptId);
		}
		// 変更前に選択されていた値を返す
		return oldValue;
	}

	/**
	 * 精錬値の変更イベントハンドラ.
	 * @param {HTMLElement} objTarget 変更したHTMLオブジェクト
	 * @param {int} newValue 変更後の値
	 * @returns 変更前の値、または、undefined
	 */
	#changeRefined (objTarget, newValue) {

		// 値変更
		const oldValue = HtmlSelectObjectValueAsInteger(objTarget, newValue);
		if (oldValue === undefined) {
			return oldValue;
		}

		return oldValue;
	}

	/**
	 * ランダムオプション種類の変更イベントハンドラ.
	 * @param {HTMLElement} objTarget 変更したHTMLオブジェクト
	 * @param {int} newValue 変更後の値
	 * @returns 変更前の値、または、undefined
	 */
	#changeRndOptKind (objTarget, newValue) {

		// 値変更
		const oldValue = HtmlSelectObjectValueAsInteger(objTarget, newValue);
		if (oldValue === undefined) {
			return oldValue;
		}

		// 値選択オブジェクトの取得
		const objValueSelect = objTarget.nextElementSibling;

		// 値選択セレクトボックスを再構築
		SetUpRndOptValue(objValueSelect, newValue);

		return oldValue;
	}

	/**
	 * ランダムオプション値の変更イベントハンドラ.
	 * @param {HTMLElement} objTarget 変更したHTMLオブジェクト
	 * @param {int} newValue 変更後の値
	 * @returns 変更前の値、または、undefined
	 */
	#changeRndOptValue (objTarget, newValue) {
		// 値変更
		const oldValue = HtmlSelectObjectValueAsInteger(objTarget, newValue);
		if (oldValue === undefined) {
			return oldValue;
		}
		return oldValue;
	}

	/**
	 * エンチャントの変更イベントハンドラ.
	 * @param {HTMLElement} objTarget 変更したHTMLオブジェクト
	 * @param {int} newValue 変更後の値
	 * @returns 変更前の値、または、undefined
	 */
	#changeEnchantValue (objTarget, newValue) {
		// 値変更
		const oldValue = HtmlSelectObjectValueAsInteger(objTarget, newValue);
		if (oldValue === undefined) {
			return oldValue;
		}
		return oldValue;
	}

	/**
	 * シャドウ装備のデータロード処理.
	 * @param {string} eqprgnName 装備箇所名
	 * @param {int} itemId 装備ID
	 * @param {int} refined 精錬値
	 * @param {Array} rndOptInfoArray ランダムオプション情報（[[RndOptID, 値], [], ...]）
	 */
	onLoadShadow (eqprgnName, itemId, refined, rndOptInfoArray) {

		// ブロック全体を取得
		const objEquipBlock = this.#getEquipBlockHTML(eqprgnName);

		// 装備変更
		this.#changeShadowItem(objEquipBlock, itemId);

		// 精錬値変更
		const objRefined = objEquipBlock.querySelector(":scope .item-conf .item-refined");
		this.#changeRefined(objRefined, refined);

		// ランダムオプション
		const objKindArray = objEquipBlock.querySelectorAll(":scope .rndopt-conf .rndopt-kind-select");
		const objValueArray = objEquipBlock.querySelectorAll(":scope .rndopt-conf .rndopt-value-select");

		for (let idx = 0; (idx < objKindArray.length) && (idx < objValueArray.length) && (idx < rndOptInfoArray.length); idx++) {
			this.#changeRndOptKind(objKindArray[idx], rndOptInfoArray[idx][0]);
			this.#changeRndOptValue(objValueArray[idx], rndOptInfoArray[idx][1]);
		}

		// 再計算
		StAllCalc();
	}

	/**
	 * 指定の装備個所の装備IDを取得する.
	 * @param {string} eqprgnName 装備箇所名
	 * @returns {int} 装備ID
	 */
	getEquippedID (eqprgnName) {

		// ブロック全体を取得
		const objEquipBlock = this.#getEquipBlockHTML(eqprgnName);

		// アイテム設定ブロックを取得
		const objItemConf = objEquipBlock.querySelector(":scope .item-conf");

		// アイテム選択オブジェクトを取得
		const objItemSelect = objItemConf.querySelector(":scope .item-select");

		return parseInt(objItemSelect.value, 10);
	}

	/**
	 * 指定の装備個所の精錬値を取得する.
	 * @param {string} eqprgnName 装備箇所名
	 * @returns {int} 精錬値
	 */
	getRefined (eqprgnName) {

		// ブロック全体を取得
		const objEquipBlock = this.#getEquipBlockHTML(eqprgnName);

		// アイテム設定ブロックを取得
		const objItemConf = objEquipBlock.querySelector(":scope .item-conf");

		// 精錬値選択オブジェクトを取得
		const objItemRefined = objItemConf.querySelector(":scope .item-refined");

		return parseInt(objItemRefined.value, 10);
	}

	/**
	 * 指定の装備個所のランダムオプション設定を取得する.
	 * @param {string} eqprgnName 装備箇所名
	 * @returns {Array} [[種別ID, 値], [], ...]
	 */
	getRndOptInfoArray (eqprgnName) {

		// ブロック全体を取得
		const objEquipBlock = this.#getEquipBlockHTML(eqprgnName);

		// アイテム設定ブロックを取得
		const objRndOptConf = objEquipBlock.querySelector(":scope .rndopt-conf");

		// 選択オブジェクトのリストを取得
		const objKindLst = objRndOptConf.querySelectorAll(":scope .rndopt-kind-select");
		const objValueLst = objRndOptConf.querySelectorAll(":scope .rndopt-value-select");

		// 結果を生成する
		const result = [];
		for (let idx = 0; (idx < objKindLst.length) && (idx < objValueLst.length); idx++) {

			let kind = parseInt(objKindLst[idx].value, 10);
			if (isNaN(kind)) {
				kind = 0;
			}

			let value = parseInt(objValueLst[idx].value, 10);
			if (isNaN(value)) {
				value = 0;
			}

			result.push([kind, value]);
		}

		return result;
	}

}

g_shadowEquipController = new CShadowEquipController();
g_shadowEquipController.initializeHTML();