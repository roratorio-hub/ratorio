/**
 * 計算機の挙動に関する設定を保持するクラス
 * 本クラスは単体で用いられるのでparse時のデータ長不足に特に注意を払う必要があります
 * 他のCSaveDataUnitクラスは複数のクラスと連結された文字列をparseするのでデータ長不足になる可能性が低いです
 */
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
        return 5;
    }

    // オーバーライドされた parse 関数
    parse (dataText, bitOffset) {
        let nextOffset = 0;
        // 互換性確保のための延長データ
        let extend = "";
        // CSaveDataUnitSettings は他のクラスと異なりデータ長でバージョン判定する必要がある
        const STATE_VERSION_1 = dataText.length < 7;
        const STATE_VERSION_2 = dataText.length < 8;
        const STATE_VERSION_3 = dataText.length < 19;
        const STATE_VERSION_4 = dataText.length < 22;
        const STATE_VERSION_5 = dataText.length < 23;
        // データ延長
        if (STATE_VERSION_1) {
            extend += "0";
        }
        if (STATE_VERSION_2) {
            extend += "iA0000000w";
        }
        if (STATE_VERSION_3) {
            extend += "0000";
        }
        if (STATE_VERSION_4) {
            extend += "0";
        }
        // 延長後データを読み込む
        nextOffset = super.parse(dataText + extend, bitOffset);
        // データを置換する
        if (STATE_VERSION_1) {
            // version 1.0 で AttackAutoCalc として使われていたデータは現在 ConfirmDialogSwitch の位置にあるので移植する
            const attach_auto_calc_old = this.parsedMap.get(CSaveDataConst.propNameConfirmDialogSwitch);
            this.parsedMap.set(CSaveDataConst.propNameAttackAutoCalc, attach_auto_calc_old);
        }
        // 最新バージョンへ更新
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
            // version 3 で追加
            CSaveDataConst.propNameFloatingInfoAreaSwitch,
            CSaveDataConst.propNameFloatingInfoAreaCount,
            CSaveDataConst.propNameFloatingInfoAreaFontSize,
            CSaveDataConst.propNameFloatingInfo1CategoryName,
            CSaveDataConst.propNameFloatingInfo1InfoName,
            CSaveDataConst.propNameFloatingInfo2CategoryName,
            CSaveDataConst.propNameFloatingInfo2InfoName,
            CSaveDataConst.propNameFloatingInfo3CategoryName,
            CSaveDataConst.propNameFloatingInfo3InfoName,
            CSaveDataConst.propNameFloatingInfo4CategoryName,
            CSaveDataConst.propNameFloatingInfo4InfoName,
            CSaveDataConst.propNameFloatingInfo5CategoryName,
            CSaveDataConst.propNameFloatingInfo5InfoName,
            CSaveDataConst.propNameFloatingInfo6CategoryName,
            CSaveDataConst.propNameFloatingInfo6InfoName,
            CSaveDataConst.propNameFloatingInfo7CategoryName,
            CSaveDataConst.propNameFloatingInfo7InfoName,
            CSaveDataConst.propNameItemInfoSwitch,
            CSaveDataConst.propNameItemInfoAutoSwitch,
            CSaveDataConst.propNameItemInfoTimeEffectSwitch,
            CSaveDataConst.propNamePointCap,
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
        this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 25);    // version 3 で 5 → 21 へ増加  version 4 で 21 → 25 へ増加 version 5 で 25 → 26 へ増加
        this.registerPropInfo(CSaveDataConst.propNameConfirmDialogSwitch, 1);
        this.registerPropInfo(CSaveDataConst.propNameResultDigit3, 1);
        this.registerPropInfo(CSaveDataConst.propNameAttackInterval, 6);
        this.registerPropInfo(CSaveDataConst.propNameCastSimInterval, 8);
        this.registerPropInfo(CSaveDataConst.propNameAttackAutoCalc, 8);
        // version 3 で 16 件追加
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfoAreaSwitch, 1);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfoAreaCount, 3);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfoAreaFontSize, 8);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfo1CategoryName, 3);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfo1InfoName, 6);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfo2CategoryName, 3);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfo2InfoName, 6);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfo3CategoryName, 3);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfo3InfoName, 6);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfo4CategoryName, 3);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfo4InfoName, 6);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfo5CategoryName, 3);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfo5InfoName, 6);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfo6CategoryName, 3);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfo6InfoName, 6);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfo7CategoryName, 3);
        this.registerPropInfo(CSaveDataConst.propNameFloatingInfo7InfoName, 6);
        this.registerPropInfo(CSaveDataConst.propNameItemInfoSwitch, 1);
        this.registerPropInfo(CSaveDataConst.propNameItemInfoAutoSwitch, 1);
        this.registerPropInfo(CSaveDataConst.propNameItemInfoTimeEffectSwitch, 1);
        this.registerPropInfo(CSaveDataConst.propNamePointCap, 1);
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
        // version 3 で追加
        this.setProp(CSaveDataConst.propNameFloatingInfoAreaSwitch, 0);
        this.setProp(CSaveDataConst.propNameFloatingInfoAreaCount, 1);
        this.setProp(CSaveDataConst.propNameFloatingInfoAreaFontSize, 100);
        this.setProp(CSaveDataConst.propNameFloatingInfo1CategoryName, 0);
        this.setProp(CSaveDataConst.propNameFloatingInfo1InfoName, 0);
        this.setProp(CSaveDataConst.propNameFloatingInfo2CategoryName, 0);
        this.setProp(CSaveDataConst.propNameFloatingInfo2InfoName, 0);
        this.setProp(CSaveDataConst.propNameFloatingInfo3CategoryName, 0);
        this.setProp(CSaveDataConst.propNameFloatingInfo3InfoName, 0);
        this.setProp(CSaveDataConst.propNameFloatingInfo4CategoryName, 0);
        this.setProp(CSaveDataConst.propNameFloatingInfo4InfoName, 0);
        this.setProp(CSaveDataConst.propNameFloatingInfo5CategoryName, 0);
        this.setProp(CSaveDataConst.propNameFloatingInfo5InfoName, 0);
        this.setProp(CSaveDataConst.propNameFloatingInfo6CategoryName, 0);
        this.setProp(CSaveDataConst.propNameFloatingInfo6InfoName, 0);
        this.setProp(CSaveDataConst.propNameFloatingInfo7CategoryName, 0);
        this.setProp(CSaveDataConst.propNameFloatingInfo7InfoName, 0);
        this.setProp(CSaveDataConst.propNameItemInfoSwitch, 0);
        this.setProp(CSaveDataConst.propNameItemInfoAutoSwitch, 0);
        this.setProp(CSaveDataConst.propNameItemInfoTimeEffectSwitch, 0);
        this.setProp(CSaveDataConst.propNamePointCap, 0);}

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
