class CSaveDataUnitVersion extends CSaveDataUnitBase {

    /**
     * タイプ値.
     */
    static get type () {
        return 801;
    }

    /**
     * バージョン番号.
     */
    static get version () {
        return 1;
    }



    /**
     * コンストラクタ.
     */
    constructor () {
        super();
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