/**
 * 「装備箇所」情報クラス
 * シャドウ装備は管理対象外
 */
class CSaveDataUnitEquipRegions extends CSaveDataUnitBase {

    /**
     * タイプ値.
     */
    static get type () {
        return 804;
    }

    /**
     * バージョン番号.
     */
    static get version () {
        return 1;
    }

    /**
     * 処理順に並んだプロパティ名（自身のプロパティのみ）.
     */
    static get #propNamesSelf () {
        return [
            CSaveDataConst.propNameDataKind,
            CSaveDataConst.propNameParseCtrlFlag,
            CSaveDataConst.propNameEqpRgnArmsRight,
            CSaveDataConst.propNameEqpRgnArmsLeft,
            CSaveDataConst.propNameEqpRgnShield,
            CSaveDataConst.propNameEqpRgnHeadTop,
            CSaveDataConst.propNameEqpRgnHeadMid,
            CSaveDataConst.propNameEqpRgnHeadUnder,
            CSaveDataConst.propNameEqpRgnBody,
            CSaveDataConst.propNameEqpRgnShoulder,
            CSaveDataConst.propNameEqpRgnFoot,
            CSaveDataConst.propNameEqpRgnAccessory1,
            CSaveDataConst.propNameEqpRgnAccessory2,
            CSaveDataConst.propNameEqpRgnArrow,
        ];
    }

    /**
     * 処理順に並んだプロパティ名（継承プロパティ含む）.
     */
    static get propNames () {
        return super.propNames.concat(this.#propNamesSelf);
    }

    /**
     * コンストラクタ.
     */
    constructor () {
        super();
        // プロパティ定義情報の登録
        this.registerPropInfo(CSaveDataConst.propNameDataKind, 2);
        this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 12);
        this.registerPropInfo(CSaveDataConst.propNameEqpRgnArmsRight, 6);
        this.registerPropInfo(CSaveDataConst.propNameEqpRgnArmsLeft, 6);
        this.registerPropInfo(CSaveDataConst.propNameEqpRgnShield, 6);
        this.registerPropInfo(CSaveDataConst.propNameEqpRgnHeadTop, 6);
        this.registerPropInfo(CSaveDataConst.propNameEqpRgnHeadMid, 6);
        this.registerPropInfo(CSaveDataConst.propNameEqpRgnHeadUnder, 6);
        this.registerPropInfo(CSaveDataConst.propNameEqpRgnBody, 6);
        this.registerPropInfo(CSaveDataConst.propNameEqpRgnShoulder, 6);
        this.registerPropInfo(CSaveDataConst.propNameEqpRgnFoot, 6);
        this.registerPropInfo(CSaveDataConst.propNameEqpRgnAccessory1, 6);
        this.registerPropInfo(CSaveDataConst.propNameEqpRgnAccessory2, 6);
        this.registerPropInfo(CSaveDataConst.propNameEqpRgnArrow, 6);
    }

    /**
     * データのコンパクション（不要データの削除）を行う.
     * （継承先でオーバーライドして個別の処理を追加する）
     */
    doCompaction () {
        // 共用のフラグ処理を利用
        this.doCompaction_ModifyFlagGT0();
    }

    /**
     * ユニットのデータが空であるかを判定する.
     * （継承先でオーバーライドして個別の処理を追加する）
     * @returns {boolean} true:空である、false:空でない
     */
    isEmptyUnit () {
        // 共用の判定処理を利用
        return this.isEmptyUnit_CtrlFlag0();
    }
}