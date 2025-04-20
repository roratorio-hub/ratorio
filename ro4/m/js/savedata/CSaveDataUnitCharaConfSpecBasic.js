class CSaveDataUnitCharaConfSpecBasic extends CSaveDataUnitBase {

    /**
     * タイプ値.
     */
    static get type () {
        return 828;
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
            CSaveDataConst.propNameSubInvalidateSettings,
            CSaveDataConst.propNameParseCtrlFlag,

            CSaveDataConst.propNameStPowPlusSign,
            CSaveDataConst.propNameStPowPlus,
            CSaveDataConst.propNameStStaPlusSign,
            CSaveDataConst.propNameStStaPlus,
            CSaveDataConst.propNameStWisPlusSign,
            CSaveDataConst.propNameStWisPlus,
            CSaveDataConst.propNameStSplPlusSign,
            CSaveDataConst.propNameStSplPlus,
            CSaveDataConst.propNameStConPlusSign,
            CSaveDataConst.propNameStConPlus,
            CSaveDataConst.propNameStCrtPlusSign,
            CSaveDataConst.propNameStCrtPlus,
            CSaveDataConst.propNameStPAtkPlusSign,
            CSaveDataConst.propNameStPAtkPlus,
            CSaveDataConst.propNameStSMatkPlusSign,
            CSaveDataConst.propNameStSMatkPlus,
            CSaveDataConst.propNameStHPlusPlusSign,
            CSaveDataConst.propNameStHPlusPlus,
            CSaveDataConst.propNameStCRatePlusSign,
            CSaveDataConst.propNameStCRatePlus,
            CSaveDataConst.propNameStResPlusSign,
            CSaveDataConst.propNameStResPlus,
            CSaveDataConst.propNameStMresPlusSign,
            CSaveDataConst.propNameStMresPlus,
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
        this.registerPropInfo(CSaveDataConst.propNameSubInvalidateSettings, 1);
        this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 24);

        this.registerPropInfo(CSaveDataConst.propNameStPowPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStPowPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStStaPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStStaPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStWisPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStWisPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStSplPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStSplPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStConPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStConPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStCrtPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStCrtPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStPAtkPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStPAtkPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStSMatkPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStSMatkPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStHPlusPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStHPlusPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStCRatePlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStCRatePlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStResPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStMresPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStMresPlus, CSaveDataConst.propBitsMaxAbs500);
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