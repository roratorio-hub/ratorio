class CSaveDataUnitMob extends CSaveDataUnitBase {

    /**
     * タイプ値.
     */
    static get type () {
        return 821;
    }

    /**
     * バージョン番号.
     */
    static get version () {
        return 2;
    }

    // オーバーライドされた parse 関数
    parse (dataText, bitOffset) {
        let nextOffset = super.parse(dataText, bitOffset);
        if (this.getProp("version") == 1n) {
            this.propInfoMap.delete(CSaveDataConst.propNameMonsterID);
            const prop = new CSaveDataPropInfo(CSaveDataConst.propNameMonsterID, 11);
            this.propInfoMap.set(CSaveDataConst.propNameMonsterID, prop);
            this.parsedMap.clear();
            nextOffset = super.parse(dataText, bitOffset);
        }
        return nextOffset;
    }


    /**
     * 処理順に並んだプロパティ名（自身のプロパティのみ）.
     */
    static get #propNamesSelf () {
        return [
            CSaveDataConst.propNameOptCode,
            CSaveDataConst.propNameMonsterMapCategoryID,
            CSaveDataConst.propNameMonsterMapID,
            CSaveDataConst.propNameMonsterID,
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
        this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
        this.registerPropInfo(CSaveDataConst.propNameMonsterMapCategoryID, 8);
        this.registerPropInfo(CSaveDataConst.propNameMonsterMapID, 10);
        //this.registerPropInfo(CSaveDataConst.propNameMonsterID, 11);	version 1
        this.registerPropInfo(CSaveDataConst.propNameMonsterID, 16);
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