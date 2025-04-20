class CSaveDataUnitSettings extends CSaveDataUnitBase {

    /**
     * タイプ値.
     */
    static get type () {
        return 827;
    }

    /**
     * バージョン番号.
     */
    static get version () {
        return 2;
    }

    // オーバーライドされた parse 関数
    parse (dataText, bitOffset) {
        // バージョニングできていない古いデータ形式の互換性確保
        if (dataText.length < 7) {
            // 現行バージョンのデータ構造では末尾に新たな AttackAutoCalc が追加されているので、延長しないと長さが足りなくなる
            let nextOffset = super.parse(dataText + "0", bitOffset);
            // 現行バージョンで ConfirmDialogSwitch の位置にあるデータは、古いバージョンで AttackAutoCalc として使われていたので移植する
            const attach_auto_calc_old = this.parsedMap.get(CSaveDataConst.propNameConfirmDialogSwitch);
            this.parsedMap.set(CSaveDataConst.propNameAttackAutoCalc, attach_auto_calc_old);
            return nextOffset;
        }
        // 以降、通常の互換性確保
        let nextOffset = super.parse(dataText, bitOffset);
        if (this.getProp(CSaveDataConst.propNameVersion) == 1n) {
        }
        // バージョン更新
        this.setProp(CSaveDataConst.propNameVersion, this.constructor.version);
        return nextOffset;
    }

    /**
     * 処理順に並んだプロパティ名（自身のプロパティのみ）.
     */
    static get #propNamesSelf () {
        return [
            CSaveDataConst.propNameConfirmDialogSwitch, 
            CSaveDataConst.propNameResultDigit3,
            CSaveDataConst.propNameAttackInterval,
            CSaveDataConst.propNameCastSimInterval,
            CSaveDataConst.propNameAttackAutoCalc,
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
        this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 5);
        this.registerPropInfo(CSaveDataConst.propNameConfirmDialogSwitch, 1);
        this.registerPropInfo(CSaveDataConst.propNameResultDigit3, 1);
        this.registerPropInfo(CSaveDataConst.propNameAttackInterval, 6);
        this.registerPropInfo(CSaveDataConst.propNameCastSimInterval, 8);
        this.registerPropInfo(CSaveDataConst.propNameAttackAutoCalc, 8);
    }

    /**
     * データのデフォルト値を設定する.
     * （継承先でオーバーライドして個別の処理を追加する）
     */
    SetUpAsDefault() {
        super.SetUpAsDefault();
        this.setProp(CSaveDataConst.propNameConfirmDialogSwitch, 0);
        this.setProp(CSaveDataConst.propNameResultDigit3, 0);
        this.setProp(CSaveDataConst.propNameAttackInterval, 14);
        this.setProp(CSaveDataConst.propNameCastSimInterval, 10);
        this.setProp(CSaveDataConst.propNameAttackAutoCalc, 0);
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
        return false;
    }
}