class CSaveDataUnitChara extends CSaveDataUnitBase {

    /**
     * タイプ値.
     */
    static get type () {
        return 802;
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
            CSaveDataConst.propNameSubAutoAdjustBaseLv,
            CSaveDataConst.propNameSubIgnoreEquipRestrict,

            CSaveDataConst.propNameJobID,
            CSaveDataConst.propNameBaseLv,
            CSaveDataConst.propNameJobLv,

            CSaveDataConst.propNameStStr,
            CSaveDataConst.propNameStAgi,
            CSaveDataConst.propNameStVit,
            CSaveDataConst.propNameStInt,
            CSaveDataConst.propNameStDex,
            CSaveDataConst.propNameStLuk,

            CSaveDataConst.propNameStPow,
            CSaveDataConst.propNameStSta,
            CSaveDataConst.propNameStWis,
            CSaveDataConst.propNameStSpl,
            CSaveDataConst.propNameStCon,
            CSaveDataConst.propNameStCrt,
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
        this.registerPropInfo(CSaveDataConst.propNameSubAutoAdjustBaseLv, 1);
        this.registerPropInfo(CSaveDataConst.propNameSubIgnoreEquipRestrict, 1);

        this.registerPropInfo(CSaveDataConst.propNameJobID, 7);
        this.registerPropInfo(CSaveDataConst.propNameBaseLv, 9);
        this.registerPropInfo(CSaveDataConst.propNameJobLv, 7);

        this.registerPropInfo(CSaveDataConst.propNameStStr, 8);
        this.registerPropInfo(CSaveDataConst.propNameStAgi, 8);
        this.registerPropInfo(CSaveDataConst.propNameStVit, 8);
        this.registerPropInfo(CSaveDataConst.propNameStInt, 8);
        this.registerPropInfo(CSaveDataConst.propNameStDex, 8);
        this.registerPropInfo(CSaveDataConst.propNameStLuk, 8);

        this.registerPropInfo(CSaveDataConst.propNameStPow, 7);
        this.registerPropInfo(CSaveDataConst.propNameStSta, 7);
        this.registerPropInfo(CSaveDataConst.propNameStWis, 7);
        this.registerPropInfo(CSaveDataConst.propNameStSpl, 7);
        this.registerPropInfo(CSaveDataConst.propNameStCon, 7);
        this.registerPropInfo(CSaveDataConst.propNameStCrt, 7);
    }



    /**
     * ユニットのデータが空であるかを判定する.
     * （継承先でオーバーライドして個別の処理を追加する）
     * @returns {boolean} true:空である、false:空でない
     */
    isEmptyUnit () {
        return false;
    }
}