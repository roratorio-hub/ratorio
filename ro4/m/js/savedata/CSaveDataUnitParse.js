/**
 * セーブデータユニットクラス：パース開始用.
 * （他とは異なる特殊な構造、特殊な扱い）
 */
class CSaveDataUnitParse extends CSaveDataUnitBase {
	/**
	 * 許容されるタイプ値の最小値.
	 */
	get #typeValueMin () {
		// 新形式移行時に設定した、旧形式でのバージョン番号に当たる値
		// 文字あたりのデータ量を変更したので、変更後の値を基準に評価する
		return 800;
	}

	/**
	 * パースしたユニットの配列.
	 */
	#parsedUnitArray;

	/**
	 * セーブデータユニットの配列.
	 */
	get saveDataUnitArray () {
		return this.#parsedUnitArray;
	}

	/**
	 * コンストラクタ.
	 */
	constructor () {
		super();

		// メンバ変数の初期化
		this.#parsedUnitArray = [];
	}

	/**
	 * 全データをパースする.
	 * （継承先でオーバーライドして個別のデータパース処理を追加する）
	 * @param {string} dataText パース対象を含む文字表現データ文字列
	 * @param {int} bitOffset 読み取りオフセット（ビット数）
	 * @returns {int} パースした文字数
	 * @throws {Error} パース中に異常が検出された場合
	 */
	parse (dataText, bitOffset) {

		// 強制文字列化
		dataText = "" + dataText;

		while (bitOffset < (dataText.length * this.letterBits)) {

			// 基底クラスのパース処理を仮実施
			super.clear();
			super.parse(dataText, bitOffset);

			// パース結果から、ユニットのタイプ値を取得
			const unitType = this.getProp(CSaveDataConst.propNameType);

			// タイプ値が最小値よりも小さい場合は、旧形式のデータと判断して、移行処理に変更する
			if ((bitOffset == 0) && (unitType < this.#typeValueMin)) {
				const translated = this.translateFromOldFormat(dataText, false);
				return this.parse(translated, bitOffset);
			}

			// ユニットのタイプ値から、ユニットの処理クラスを取得
			const unitClass = CSaveDataUnitTypeManager.getUnitClass(unitType);

			// TODO: デバッグ用
			if (!unitClass) {
				break;
			}

			// ユニットの処理クラスで、パース処理を実施
			const unitInstance = new unitClass();
			bitOffset = unitInstance.parse(dataText, bitOffset);

			// ユニット処理クラスのインスタンスを保持
			unitInstance.doCompaction();
			this.#parsedUnitArray.push(unitInstance);
			
			// データユニットが中途半端なところで終わらないようパディングする
			bitOffset = Math.ceil(bitOffset / this.letterBits) * this.letterBits;
		}

		// オフセット位置はパースしたビット数に一致する
		return bitOffset;
	}

	/**
	 * parse 関数からコピーしたセーブ専用の暫定処理
	 * セーブとロードが両方ともparse関数を利用していて場合分けが複雑になりすぎるため
	 * @param {string} dataText パース対象を含む文字表現データ文字列
	 * @param {int} bitOffset 読み取りオフセット（ビット数）
	 * @returns {int} パースした文字数
	 */
	parseForCreateSave (dataText, bitOffset) {
		// 強制文字列化
		dataText = "" + dataText;
		while (bitOffset < (dataText.length * this.letterBits)) {
			// 基底クラスのパース処理を仮実施
			super.clear();
			super.parse(dataText, bitOffset);
			// パース結果から、ユニットのタイプ値を取得
			const unitType = this.getProp(CSaveDataConst.propNameType);
			// タイプ値が最小値よりも小さい場合は、旧形式のデータと判断して、移行処理に変更する
			if ((bitOffset == 0) && (unitType < this.#typeValueMin)) {
				const translated = this.translateFromOldFormat(dataText, true);
				return this.parseForCreateSave(translated, bitOffset);
			}
			// ユニットのタイプ値から、ユニットの処理クラスを取得
			const unitClass = CSaveDataUnitTypeManager.getUnitClass(unitType);
			// TODO: デバッグ用
			if (!unitClass) {
				break;
			}
			// ユニットの処理クラスで、パース処理を実施
			const unitInstance = new unitClass();
			bitOffset = unitInstance.parse(dataText, bitOffset);
			// ユニット処理クラスのインスタンスを保持
			unitInstance.doCompaction();
			this.#parsedUnitArray.push(unitInstance);
			// データユニットが中途半端なところで終わらないようパディングする
			bitOffset = Math.ceil(bitOffset / this.letterBits) * this.letterBits;
		}
		// オフセット位置はパースしたビット数に一致する
		return bitOffset;
	}
	
	/**
	 * 旧形式のセーブデータを、新形式のセーブデータに変換する.
	 * 前提として、旧形式の最新の構造には変換してあること.
	 * いまは暫定処置として新形式のセーブを作成する前段階の処理としても呼び出されている.
	 * @param {string} dataText パース対象を含む文字表現データ文字列
	 * @param {boolean} createSaveFlag セーブデータを作成するときに呼び出された場合 true
	 */
	translateFromOldFormat (dataText, createSaveFlag) {

		let saveDataUnit = null;
		let dataTextWork = "";
		let bitOffset = 0;

		// 旧形式の文字表現データを、数値の配列にデコード
		const saveDataArrayOld = ConvertDataTextMIG(dataText);


		//--------------------------------
		// バージョン情報
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_VERSION))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset);

		//--------------------------------
		// キャラクターステータス（旧：基本情報＋特性ステータス＋オプション（自動レベル調整））
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			((saveDataArrayOld[11] > 0) ? 1 : 0),
			((GetHigherJobSeriesID(saveDataArrayOld[1]) == JOB_SERIES_ID_SUPERNOVICE) && (saveDataArrayOld[84] > 0) ? 1 : 0),
			saveDataArrayOld[1], saveDataArrayOld[2], saveDataArrayOld[3],
			saveDataArrayOld[4], saveDataArrayOld[5], saveDataArrayOld[6],
			saveDataArrayOld[8], saveDataArrayOld[7], saveDataArrayOld[9],
			saveDataArrayOld[1821], saveDataArrayOld[1822], saveDataArrayOld[1823],
			saveDataArrayOld[1824], saveDataArrayOld[1825], saveDataArrayOld[1826]
		);

		if (!createSaveFlag) {	// 新規セーブを作成する場合はスキップする
			//--------------------------------
			// 装備アイテム（旧：装備アイテム）
			// （装備位置に従った仮のIDを設定）
			//--------------------------------
			for (let idxKind = 0; idxKind < 10; idxKind++) {

				// データ位置補正
				const idxBase = 15 + (6 * idxKind);
				const idxRndOpt = 1260 + (20 * idxKind);
				const idxCardCategory = 1781 + (4 * idxKind);

				// データ変換
				saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIPABLE))();
				[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
					(1 + idxKind),	// propNameEquipItemDefID
					0,	// propNameOptCode
					((1n << 20n) - 1n),	// propNameParseCtrlFlag
					saveDataArrayOld[idxBase + 1], saveDataArrayOld[idxBase],	// propNameItemID, propNameRefinedCount
					saveDataArrayOld[idxCardCategory + 0], saveDataArrayOld[idxBase + 2],	// propNameCardCategoryID1, propNameCardID1
					saveDataArrayOld[idxCardCategory + 1], saveDataArrayOld[idxBase + 3],
					saveDataArrayOld[idxCardCategory + 2], saveDataArrayOld[idxBase + 4],
					saveDataArrayOld[idxCardCategory + 3], saveDataArrayOld[idxBase + 5],
					...(saveDataArrayOld.slice(idxRndOpt, idxRndOpt + 10))
				);
			}
			// 矢、衣装も装備アイテム扱いにする
			// 矢
			const arrowIdModified = (GetLowerJobSeriesID(saveDataArrayOld[1]) == JOB_SERIES_ID_GUNSLINGER) ? (ITEM_ID_BULLET_NONE + saveDataArrayOld[12] - 26) : (ITEM_ID_ARROW_NONE + saveDataArrayOld[12]);
			saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIPABLE))();
			[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
				11,
				0,
				((1n << 20n) - 1n),
				arrowIdModified, 0,
				...(Array(8).fill(0)),
				...(Array(10).fill(0))
			);
			// 衣装
			const costumeIdModified = (saveDataArrayOld[1682] > 0) ? ITEM_ID_ISHO_BEGINNER_BO : ITEM_ID_ISHO_NONE;
			saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIPABLE))();
			[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
				12,	// propNameEquipItemDefID
				0, // propNameOptCode
				((1n << 20n) - 1n), // propNameParseCtrlFlag
				costumeIdModified, 0,
				...(Array(8).fill(0)),
				...(Array(10).fill(0))
			);
		}

		//--------------------------------
		// 装備位置（装備）：（旧：※該当なし新規）
		// （従来から存在するすべての装備個所に仮のIDを設定）
		//--------------------------------
		const isShield = (ItemObjNew[saveDataArrayOld[22]][ITEM_DATA_INDEX_KIND] == ITEM_KIND_SHIELD);
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			CSaveDataConst.eqpRgnKindItem,
			((1n << 12n) - 1n),
			1, (isShield ? 0 : 2), (isShield ? 2 : 0), 3, 4, 5, 6, 7, 8, 9, 10, 11
		);

		//--------------------------------
		// 装備位置（衣装）：（旧：下段衣装のビギナー帽）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			CSaveDataConst.eqpRgnKindCostume,
			((1n << 12n) - 1n),
			...(Array(5).fill(0)), 12, ...(Array(6).fill(0))
		);

		//--------------------------------
		// 装備位置（シャドウ）：（旧：※該当なし新規）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			CSaveDataConst.eqpRgnKindShadow,
			((1n << 12n) - 1n),
			...(Array(12).fill(0))
		);

		//--------------------------------
		// 習得スキル（旧：習得スキル）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 200n) - 1n),
			...(saveDataArrayOld.slice(1060, 1060 + 200))
		);

		//--------------------------------
		// キャラクターBUFF（旧：属性付与＋支援スキル８（その他の支援/設定））
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_BUFF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			saveDataArrayOld[14],
			((1n << 70n) - 1n),
			...(saveDataArrayOld.slice(730, 730 + 70))
		);

		//--------------------------------
		// 自己スキルBUFF（旧：パッシブ持続系）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_SELF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 100n) - 1n),
			...(saveDataArrayOld.slice(75, 75 + 100))
		);

		//--------------------------------
		// 一次職スキルBUFF（旧：一次職支援設定）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_1ST))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 100n) - 1n),
			...(saveDataArrayOld.slice(175, 175 + 100))
		);

		//--------------------------------
		// 二次職スキルBUFF（旧：二次職支援設定）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_2ND))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 50n) - 1n),
			...(saveDataArrayOld.slice(609, 609 + 50))
		);

		//--------------------------------
		// 三次職スキルBUFF（旧：三次職支援設定）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_3RD))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 100n) - 1n),
			...(saveDataArrayOld.slice(1480, 1480 + 100))
		);

		//--------------------------------
		// 四次職スキルBUFF（旧：四次職支援設定）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_4TH))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 30n) - 1n),
			...(saveDataArrayOld.slice(1831, 1831 + 30))
		);

		//--------------------------------
		// 演奏スキルBUFF（旧：支援スキル３（演奏/踊り系スキル））
		// （領域的には61個用意されていたが末尾は使用していなかったので切り捨て）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_MUSIC))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 60n) - 1n),
			...(saveDataArrayOld.slice(448, 448 + 60))
		);

		//--------------------------------
		// ギルドスキルBUFF（旧：支援スキル４（ギルドスキル/ゴスペル/他））
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_GUILD))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 60n) - 1n),
			...(saveDataArrayOld.slice(509, 509 + 60))
		);

		//--------------------------------
		// アイテムBUFF（旧：速度POT＋支援スキル７（アイテム（食品/他）））
		// （食品データは領域的には71個用意されていたが末尾は使用していなかったので切り捨て）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_ITEM_BUFF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			saveDataArrayOld[13],
			((1n << 70n) - 1n),
			...(saveDataArrayOld.slice(659, 659 + 70))
		);

		//--------------------------------
		// 時限効果設定（旧：時限効果設定）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_TIME_BUFF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 20n) - 1n),
			...(saveDataArrayOld.slice(1751, 1751 + 20))
		);

		//--------------------------------
		// オートスペル設定（旧：オートスペル設定）
		//--------------------------------
		// データ加工
		// TODO: マジックナンバー
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_AUTO_SPELLS))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 60n) - 1n),
			...(saveDataArrayOld.slice(1691, 1691 + 60))
		);

		//--------------------------------
		// キャラクターDEBUFF（旧：キャラクター状態異常）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_DEBUFF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 50n) - 1n),
			...(saveDataArrayOld.slice(800, 800 + 50))
		);

		//--------------------------------
		// 性能カスタマイズ系の符号付き整数変換
		//--------------------------------
		const saveDataMappingArrayCurrent = CSaveDataMappingManager.GetMappingArray(CURRENT_VERSION);
		const convertedArrayBasic = [];
		for (let idx = 0; idx < g_confDataCustomStatus.length; idx++) {
			// HP/SP領域不足バグ対応
			let converted = CSaveDataConverter.ConvertUnsignedToSigned(saveDataArrayOld[1580 + idx], saveDataMappingArrayCurrent[1580 + idx]);
//			if ((idx == 2) || (idx == 4)) {
//				converted = 0;
//			}
			convertedArrayBasic.push([((converted < 0) ? 1 : 0), Math.abs(converted)]);
		}
		const convertedArrayAtk = [];
		for (let idx = 0; idx < g_confDataCustomAtk.length; idx++) {
			const converted = CSaveDataConverter.ConvertUnsignedToSigned(saveDataArrayOld[1610 + idx], saveDataMappingArrayCurrent[1610 + idx]);
			convertedArrayAtk.push([((converted < 0) ? 1 : 0), Math.abs(converted)]);
		}
		const convertedArrayDef = [];
		for (let idx = 0; idx < g_confDataCustomDef.length; idx++) {
			const converted = CSaveDataConverter.ConvertUnsignedToSigned(saveDataArrayOld[1640 + idx], saveDataMappingArrayCurrent[1640 + idx]);
			convertedArrayDef.push([((converted < 0) ? 1 : 0), Math.abs(converted)]);
		}
		const convertedArraySkill = [];
		for (let idx = 0; idx < g_confDataCustomSkill.length; idx++) {
			const converted = CSaveDataConverter.ConvertUnsignedToSigned(saveDataArrayOld[1660 + idx], saveDataMappingArrayCurrent[1660 + idx]);
			convertedArraySkill.push([((converted < 0) ? 1 : 0), Math.abs(converted)]);
		}

		//--------------------------------
		// 性能カスタマイズ（基本）（旧：性能カスタマイズ系）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			((saveDataArrayOld[1580] > 0) ? 1 : 0),
			((1n << 87n) - 1n),
			...(convertedArrayBasic.slice(1, 1 + 22).flat()),
			convertedArrayAtk[1][1],
			convertedArrayAtk[2][1],
			convertedArrayAtk[3][1],
			...(convertedArrayAtk[4].flat()),
			convertedArrayAtk[11][1],
			...(convertedArrayAtk[24].flat()),
			0,
			...(convertedArrayAtk[13].flat()),
			...(convertedArrayDef[1].flat()),
			...(convertedArrayDef[2].flat()),
			...(convertedArraySkill[2].flat()),
			...(convertedArraySkill[3].flat()),
			...(new Array(24).fill(0)),
		);

		//--------------------------------
		// 性能カスタマイズ（特化：攻撃｜物理）（旧：性能カスタマイズ系）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			CSaveDataConst.specKindAttackPhysical,
			((saveDataArrayOld[1610] > 0) ? 1 : 0),
			((1n << 104n) - 1n),

			...(convertedArrayAtk[5].flat()),
			0, 0,
			0, 0,
			...(new Array(22).fill(0)), ...(convertedArrayAtk[6].flat()), 0, 0,
			...(new Array(20).fill(0)), ...(convertedArrayAtk[25].flat()),
			...(new Array(20).fill(0)), ...(convertedArrayAtk[7].flat()),
			...(new Array(6).fill(0)), ...(convertedArrayAtk[8].flat()),
			...(new Array(4).fill(0)), ...(convertedArrayAtk[22].flat()),
			...(new Array(4).fill(0)), ...(convertedArrayAtk[9].flat()),
			...(new Array(4).fill(0)), 0, 0,
			convertedArrayAtk[12][1],
			0
		);

		//--------------------------------
		// 性能カスタマイズ（特化：攻撃｜魔法）（旧：性能カスタマイズ系）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			CSaveDataConst.specKindAttackMagical,
			((saveDataArrayOld[1610] > 0) ? 1 : 0),
			((1n << 104n) - 1n),

			...(convertedArrayAtk[14].flat()),
			0, 0,
			0, 0,
			...(new Array(22).fill(0)), ...(convertedArrayAtk[15].flat()), 0, 0,
			...(new Array(20).fill(0)), ...(convertedArrayAtk[18].flat()),
			...(new Array(20).fill(0)), ...(convertedArrayAtk[16].flat()),
			...(new Array(6).fill(0)), ...(convertedArrayAtk[17].flat()),
			...(new Array(4).fill(0)), ...(convertedArrayAtk[23].flat()),
			...(new Array(4).fill(0)), 0, 0,
			...(new Array(4).fill(0)), 0, 0,
			convertedArrayAtk[19][1],
			0
		);

		//--------------------------------
		// 性能カスタマイズ（特化：攻撃｜すべて）（旧：性能カスタマイズ系）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			CSaveDataConst.specKindAttackAny,
			((saveDataArrayOld[1610] > 0) ? 1 : 0),
			((1n << 104n) - 1n),

			0, 0,
			...(convertedArrayAtk[10].flat()),
			...(convertedArrayAtk[21].flat()),
			...(new Array(26).fill(0)),
			...(new Array(22).fill(0)),
			...(new Array(22).fill(0)),
			...(new Array(8).fill(0)),
			...(new Array(6).fill(0)),
			...(new Array(6).fill(0)),
			...(new Array(4).fill(0)), ...(convertedArrayAtk[20].flat()),
			0,
			0
		);

		//--------------------------------
		// 性能カスタマイズ（特化：防御｜すべて）（旧：性能カスタマイズ系）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			CSaveDataConst.specKindDefencekAny,
			((saveDataArrayOld[1640] > 0) ? 1 : 0),
			((1n << 104n) - 1n),

			0, 0,
			0, 0,
			...(convertedArrayDef[9].flat()),
			...(new Array(22).fill(0)), ...(convertedArrayDef[3].flat()), 0, 0,
			...(new Array(20).fill(0)), ...(convertedArrayDef[5].flat()),
			...(new Array(20).fill(0)), ...(convertedArrayDef[4].flat()),
			...(new Array(6).fill(0)), ...(convertedArrayDef[6].flat()),
			...(new Array(4).fill(0)), ...(convertedArrayDef[10].flat()),
			0, 0, ...(convertedArrayDef[7].flat()), 0, 0,
			...(new Array(4).fill(0)), ...(convertedArrayDef[8].flat()),
			0,
			0
		);

		//--------------------------------
		// 性能カスタマイズ（スキル）（旧：性能カスタマイズ系）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SKILL))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			((saveDataArrayOld[1660] > 0) ? 1 : 0),
			((1n << 21n) - 1n),

			// TODO: すべてのスキルを表すダミーのスキルIDに変更のこと
			0,
			((convertedArraySkill[10][1] > 0) ? 1 : 0),
			convertedArraySkill[10][1],
			...(convertedArraySkill[1].flat()),
			...(convertedArraySkill[11].flat()), ...(convertedArraySkill[12].flat()),
			...(convertedArraySkill[5].flat()), ...(convertedArraySkill[4].flat()),
			...(convertedArraySkill[7].flat()), ...(convertedArraySkill[6].flat()),
			...(convertedArraySkill[9].flat()), 0, 0
		);

		//--------------------------------
		// モンスター基本情報（旧：モンスター選択）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			saveDataArrayOld[1771], saveDataArrayOld[1772], saveDataArrayOld[10],
		);

		//--------------------------------
		// 対プレイヤー設定（旧：対プレイヤー設定）
		//--------------------------------
		{
			// 対プレイヤー設定バイアス調整対象インデックス配列
			const BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500 = [
				MOB_CONF_PLAYER_ID_NINGEN_KEI_TAISEI,
				MOB_CONF_PLAYER_ID_CHUGATA_TAISEI,
				MOB_CONF_PLAYER_ID_ENKYORI_BUTSURI_TAISEI,
				MOB_CONF_PLAYER_ID_MU_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_MIZU_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_CHI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_HI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_KAZE_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_DOKU_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_SEI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_YAMI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_NEN_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_FUSHI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_IPPAN_MONSTER_TAISEI,
				MOB_CONF_PLAYER_ID_ZOKUSEI_MONSTER_TAISEI,
				MOB_CONF_PLAYER_ID_BUTSURI_TAISEI,
				MOB_CONF_PLAYER_ID_MAHOU_TAISEI,
				MOB_CONF_PLAYER_ID_DORAM_KEI_TAISEI,
				MOB_CONF_PLAYER_ID_STR,
				MOB_CONF_PLAYER_ID_AGI,
				MOB_CONF_PLAYER_ID_VIT,
				MOB_CONF_PLAYER_ID_INT,
				MOB_CONF_PLAYER_ID_DEX,
				MOB_CONF_PLAYER_ID_LUK,
				MOB_CONF_PLAYER_ID_KOGATA_TAISEI,
			];

			const signValueArray = [];
			for (idx = 0; idx < n_B_TAISEI.length; idx++) {

				let converted = saveDataArrayOld[850 + idx];
				if (BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500.indexOf(idx) >= 0) {
					converted = CSaveDataConverter.ConvertUnsignedToSigned(converted, saveDataMappingArrayCurrent[850 + idx]);
				}
				signValueArray.push([((converted < 0) ? 1 : 0), Math.abs(converted)]);
			}

			saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER))();
			[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
				0,
				((1n << 78n) - 1n),

				...(Array(78).fill(0)),
/*				signValueArray[0][1],
				signValueArray[1][1],
				signValueArray[2][1],
				signValueArray[3][1],
				signValueArray[4][1],
				signValueArray[5][1],
				signValueArray[6][1],
				signValueArray[7][1],
				...(signValueArray.slice(8, 8 + 18).flat()),
				signValueArray[26][1],
				signValueArray[27][1],
				signValueArray[28][1],
				signValueArray[29][1],
				...(signValueArray.slice(30, 30 + 6).flat()),
				signValueArray[36][1],
				signValueArray[37][1],
				signValueArray[38][1],
				...(signValueArray[39]),
				signValueArray[40][1],
				...(Array(1).fill(0)),
				signValueArray[41][1],
				...(Array(1).fill(0)),
				signValueArray[42][1],
				...(Array(8).fill(0)),*/
			);
		}

		//--------------------------------
		// 対プレイヤー設定（旧：モンスター手入力欄、モンスター手入力欄拡張）
		//--------------------------------
		{
			let stValues = [];
			for (let idxSt = 0; idxSt < 6; idxSt++) {
				if (saveDataArrayOld[975 + idxSt] > 2000) {
					stValues[idxSt] = (100000 * saveDataArrayOld[1460 + idxSt * 2 + 1]) + saveDataArrayOld[1460 + idxSt * 2];
				}
				else {
					stValues[idxSt] = saveDataArrayOld[975 + idxSt];
				}
			}
			let atkValues = [];
			for (let idxSt = 0; idxSt < 2; idxSt++) {
				if (saveDataArrayOld[981 + idxSt] > 99999) {
					atkValues[idxSt] = (100000 * saveDataArrayOld[1472 + idxSt * 2 + 1]) + saveDataArrayOld[1472 + idxSt * 2];
				}
				else {
					atkValues[idxSt] = saveDataArrayOld[981 + idxSt];
				}
			}
			let defValues = [];
			for (let idxSt = 0; idxSt < 2; idxSt++) {
				if (saveDataArrayOld[984 + idxSt] > 99999) {
					defValues[idxSt] = (100000 * saveDataArrayOld[1476 + idxSt * 2 + 1]) + saveDataArrayOld[1476 + idxSt * 2];
				}
				else {
					defValues[idxSt] = saveDataArrayOld[984 + idxSt];
				}
			}
			saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_CONF_INPUT))();
			[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
				0,
				((1n << 32n) - 1n),
				saveDataArrayOld[973],
				100000 * saveDataArrayOld[993] + saveDataArrayOld[974],
				...stValues,
				...atkValues,
				saveDataArrayOld[983],
				...defValues,
				0,		// BaseExp はバグにより移行不可
				0,		// JobExp はバグにより移行不可
				saveDataArrayOld[988],
				saveDataArrayOld[989],
				saveDataArrayOld[990],
				saveDataArrayOld[991],
				saveDataArrayOld[992],
				...(Array(12).fill(0))
			);
		}

		//--------------------------------
		// 敵BUFF（旧：モンスター状態強化設定）
		// （領域的には81個用意されていたが末尾は使用していなかったので切り捨て）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_BUFF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 80n) - 1n),
			...(saveDataArrayOld.slice(367, 367 + 80))
		);

		//--------------------------------
		// 敵DEBUFF（旧：モンスター状態異常設定）
		// （領域的には81個用意されていたが末尾は使用していなかったので切り捨て）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_DEBUFF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 80n) - 1n),
			...(saveDataArrayOld.slice(286, 286 + 80))
		);

		//--------------------------------
		// 攻撃手段情報（旧：攻撃手段）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_ATTACK_CONF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((0x01 << 12) - 1),
			saveDataArrayOld[276], saveDataArrayOld[277], saveDataArrayOld[278],
			saveDataArrayOld[279], saveDataArrayOld[280], saveDataArrayOld[281],
			saveDataArrayOld[282], saveDataArrayOld[283],
		);


		//--------------------------------
		// 性能カスタマイズ（特性ステータス）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPEC_BASIC))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 24n) - 1n),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1862]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1863]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1864]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1865]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1866]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1867]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1868]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1869]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1870]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1871]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1872]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1873]),
		);

		//--------------------------------
		// 装備：矢
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIP_ARROW))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 1n) - 1n),
			((saveDataArrayOld[12]) + 1),
		);


		//--------------------------------
		// 対プレイヤー設定2
		//--------------------------------
		{
			// 対プレイヤー設定バイアス調整対象インデックス配列
			const BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500 = [
				MOB_CONF_PLAYER_ID_NINGEN_KEI_TAISEI,
				MOB_CONF_PLAYER_ID_CHUGATA_TAISEI,
				MOB_CONF_PLAYER_ID_ENKYORI_BUTSURI_TAISEI,
				MOB_CONF_PLAYER_ID_MU_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_MIZU_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_CHI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_HI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_KAZE_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_DOKU_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_SEI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_YAMI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_NEN_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_FUSHI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_IPPAN_MONSTER_TAISEI,
				MOB_CONF_PLAYER_ID_ZOKUSEI_MONSTER_TAISEI,
				MOB_CONF_PLAYER_ID_BUTSURI_TAISEI,
				MOB_CONF_PLAYER_ID_MAHOU_TAISEI,
				MOB_CONF_PLAYER_ID_DORAM_KEI_TAISEI,
				MOB_CONF_PLAYER_ID_STR,
				MOB_CONF_PLAYER_ID_AGI,
				MOB_CONF_PLAYER_ID_VIT,
				MOB_CONF_PLAYER_ID_INT,
				MOB_CONF_PLAYER_ID_DEX,
				MOB_CONF_PLAYER_ID_LUK,
				MOB_CONF_PLAYER_ID_KOGATA_TAISEI,
			];

			const signValueArray = [];
			for (idx = 0; idx < n_B_TAISEI.length; idx++) {

				let converted = saveDataArrayOld[1881 + idx];
				if (idx == 0) {
					signValueArray.push([0, converted]);
				}
				else {
					if (BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500.indexOf(idx) >= 0) {
						converted = CSaveDataConverter.ConvertUnsignedToSigned(converted, saveDataMappingArrayCurrent[850 + idx]);
					}
					signValueArray.push([((converted < 0) ? 1 : 0), Math.abs(converted)]);
				}
			}

			saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER2))();
			[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
				0,
				((1n << 82n) - 1n),

				signValueArray[0][1],
				signValueArray[1][1],
				signValueArray[2][1],
				signValueArray[3][1],
				signValueArray[4][1],
				signValueArray[5][1],
				signValueArray[6][1],
				signValueArray[7][1],
				...(signValueArray.slice(8, 8 + 18).flat()),
				signValueArray[26][1],
				signValueArray[27][1],
				signValueArray[28][1],
				signValueArray[29][1],
				...(signValueArray.slice(30, 30 + 6).flat()),
				signValueArray[36][1],
				signValueArray[37][1],
				signValueArray[38][1],
				...(signValueArray[39]),
				signValueArray[40][1],
				...(Array(1).fill(0)),
				signValueArray[41][1],
				...(Array(1).fill(0)),
				signValueArray[42][1],
				...(Array(12).fill(0)),
			);
		}
		return dataTextWork;
	}
}