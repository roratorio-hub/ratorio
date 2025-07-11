"use strict"
class CCharaConfDebuff extends CConfBase {
	constructor(confArray) {
		// 親クラスのコンストラクタ呼び出し
		super(confArray);
		// 設定の限界値
		// この数を超える場合は、CSaveDataUnitCharaDebuff の拡張が必要
		this.confCountLimit = 50;
		// 設定欄の横方向項目数
		this.itemInRow = 3;
		// 設定欄のラベル
		this.confLabel = "プレイヤー状態異常設定";

		/**  */
		let confId = 0;
		let confData = [];
		let confDataOBJSorted = [];

		/**
		 * まずは与ダメに影響する状態異常を実装する方針です
		 */
		CCharaConfDebuff.CONF_ID_QUAGMIRE = confId;
		confData = [
			confId,
			CConfBase.ConfText("クァグマイア"),
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_DECAGI = confId;
		confData = [
			confId,
			CConfBase.ConfText("速度減少"),	// AGI 減少
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_POISON = confId;
		confData = [
			confId,
			CConfBase.ConfText("毒"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_CURSE = confId;
		confData = [
			confId,
			CConfBase.ConfText("呪い"),	// ATK 減少, LUK 0
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_SLOW_CAST = confId;
		confData = [
			confId,
			CConfBase.ConfText("スローキャスト"),	// 変動詠唱 増加
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_FREEZING = confId;
		confData = [
			confId,
			CConfBase.ConfText("氷結"),	// ASPD 減少, 固定詠唱 増加
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_POWDERING = confId;
		confData = [
			confId,
			CConfBase.ConfText("イヌハッカシャワー"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_NYANGGRASS = confId;
		confData = [
			confId,
			CConfBase.ConfText("ニャングラス"),
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_DONTFORGETME = confId;
		confData = [
			confId,
			CConfBase.ConfText("私を忘れないで…"),	// ASPD 減少
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(10)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_GLOOMYDAY = confId;
		confData = [
			confId,
			CConfBase.ConfText("メランコリー"),	// ASPD 減少, 固定詠唱 増加
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_SATURDAY_NIGHT_FEVER = confId;
		confData = [
			confId,
			CConfBase.ConfText("狂乱"),	// HIT 減少
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_MELODYOFSINK = confId;
		confData = [
			confId,
			CConfBase.ConfText("メロディーオブシンク"),	// INT 減少
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;
		
		CCharaConfDebuff.CONF_ID_BEYOND_OF_WARCRY = confId;
		confData = [
			confId,
			CConfBase.ConfText("ビヨンドオブウォークライ"),	// STR 減少
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;
		
		CCharaConfDebuff.CONF_ID_HARMONIZE = confId;
		confData = [
			confId,
			CConfBase.ConfText("ハーモナイズ"),	// 全基本ステータス 減少
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_DARKNESS = confId;
		confData = [
			confId,
			CConfBase.ConfText("暗黒"),	// HIT 減少
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_MANDRAGORA = confId;
		confData = [
			confId,
			CConfBase.ConfText("精神衝撃"),	// INT 減少, 固定詠唱 増加
			CConfBase.ConfControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(5)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_LETHARGY = confId;
		confData = [
			confId,
			CConfBase.ConfText("無気力"),	// CRI 0
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_UNLUCKY = confId;
		confData = [
			confId,
			CConfBase.ConfText("不幸"),	// HIT 0, スキル失敗率 25%
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;

		CCharaConfDebuff.CONF_ID_ALL_STATUS_DOWN = confId;
		confData = [
			confId,
			CConfBase.ConfText("オールステータスダウン"),	// 全基本ステータス -100
			CConfBase.ConfControlType(CONTROL_TYPE_CHECKBOX),
			CConfBase.ConfDefaultValue(0),
			CConfBase.ConfMinValue(0),
			CConfBase.ConfMaxValue(1)
		];
		this.confDataObj[confId] = confData;
		confId++;


		//----------------------------------------------------------------
		// 設定変数配列を初期化
		//----------------------------------------------------------------
		for (let idx = 0; idx < this.confCountLimit; idx++) {
			if (this.confDataObj[idx] !== undefined) {
				this.confArray[idx] = this.confDataObj[idx][CConfBase.CONF_DATA_INDEX_DEFAULT_VALUE];
			} else {
				this.confArray[idx] = 0;
			}
		}

		//----------------------------------------------------------------
		// 表示順序に従い、設定データ定義を再配列
		//----------------------------------------------------------------
		const displayOrder = [
			CCharaConfDebuff.CONF_ID_DONTFORGETME,
			CCharaConfDebuff.CONF_ID_GLOOMYDAY,
			CCharaConfDebuff.CONF_ID_SATURDAY_NIGHT_FEVER,
			CCharaConfDebuff.CONF_ID_MELODYOFSINK,
			CCharaConfDebuff.CONF_ID_BEYOND_OF_WARCRY,
			CCharaConfDebuff.CONF_ID_HARMONIZE,
			CCharaConfDebuff.CONF_ID_DECAGI,
			CCharaConfDebuff.CONF_ID_CURSE,
			CCharaConfDebuff.CONF_ID_DARKNESS,
			CCharaConfDebuff.CONF_ID_SLOW_CAST,
			CCharaConfDebuff.CONF_ID_FREEZING,
			CCharaConfDebuff.CONF_ID_MANDRAGORA,
			CCharaConfDebuff.CONF_ID_LETHARGY,
			CCharaConfDebuff.CONF_ID_UNLUCKY,
			CCharaConfDebuff.CONF_ID_ALL_STATUS_DOWN,
		];
		this.confDataObj = displayOrder.map(id => this.confDataObj[id]);
	}

}
