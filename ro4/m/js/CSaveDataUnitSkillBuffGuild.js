class CSaveDataUnitSkillBuffGuild extends CSaveDataUnitBase {

    /**
     * タイプ値.
     */
    static get type () {
        return 813;
    }

    /**
     * バージョン番号.
     */
    static get version () {
        return 1;
    }



    // TODO: 単純なBUFFレベルではなく、もっと複雑なデータ構造をしているが未対応

    /**
     * 処理順に並んだプロパティ名（自身のプロパティのみ）.
     */
    static get #propNamesSelf () {
        return [
            CSaveDataConst.propNameOptCode,
            CSaveDataConst.propNameParseCtrlFlag,

            // データは、初期バージョンでは、60個
            ...(Array(60).fill(CSaveDataConst.propNameBuffLv)),
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
        this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 60);
        this.registerPropInfo(CSaveDataConst.propNameBuffLv, 10);
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