class CSaveDataUnitCharaConfSkill extends CSaveDataUnitBase {

    /**
     * タイプ値.
     */
    static get type () {
        return 820;
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

            CSaveDataConst.propNameSkillID,
            CSaveDataConst.propNameSpecDamageUpConditionType,
            CSaveDataConst.propNameSpecDamageUpConditionValue,
            CSaveDataConst.propNameSpecDamageUpSign,
            CSaveDataConst.propNameSpecDamageUp,
            CSaveDataConst.propNameSpecCostSPMinusSign,
            CSaveDataConst.propNameSpecCostSPMinus,
            CSaveDataConst.propNameSpecCostSPDownSign,
            CSaveDataConst.propNameSpecCostSPDown,
            CSaveDataConst.propNameSpecCastTimeMinusSign,
            CSaveDataConst.propNameSpecCastTimeMinus,
            CSaveDataConst.propNameSpecCastTimeDownSign,
            CSaveDataConst.propNameSpecCastTimeDown,
            CSaveDataConst.propNameSpecFixedTimeMinusSign,
            CSaveDataConst.propNameSpecFixedTimeMinus,
            CSaveDataConst.propNameSpecFixedTimeDownSign,
            CSaveDataConst.propNameSpecFixedTimeDown,
            CSaveDataConst.propNameSpecCoolTimeMinusSign,
            CSaveDataConst.propNameSpecCoolTimeMinus,
            CSaveDataConst.propNameSpecCoolTimeDownSign,
            CSaveDataConst.propNameSpecCoolTimeDown,
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
        this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 21);

        this.registerPropInfo(CSaveDataConst.propNameSkillID, 11);
        this.registerPropInfo(CSaveDataConst.propNameSpecDamageUpConditionType, 4);
        this.registerPropInfo(CSaveDataConst.propNameSpecDamageUpConditionValue, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecDamageUpSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecDamageUp, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameSpecCostSPMinusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecCostSPMinus, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameSpecCostSPDownSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecCostSPDown, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameSpecCastTimeMinusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecCastTimeMinus, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameSpecCastTimeDownSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecCastTimeDown, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameSpecFixedTimeMinusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecFixedTimeMinus, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameSpecFixedTimeDownSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecFixedTimeDown, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameSpecCoolTimeMinusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecCoolTimeMinus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameSpecCoolTimeDownSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecCoolTimeDown, CSaveDataConst.propBitsMaxAbs100);
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