/**
 * 「性能カスタマイズ（ステータス関連）」
 * 「性能カスタマイズ（攻撃関連）」
 * 「性能カスタマイズ（防御関連）」
 * 「性能カスタマイズ（スキル関連）」
 * 「性能カスタマイズ（特性ステータス関連）」
 * 情報クラス
 * TODO: CSaveDataUnitCharaConfSpecBasic と役割重複している可能性あり確認が必要
 */
class CSaveDataUnitCharaConfBasic extends CSaveDataUnitBase {

    /**
     * タイプ値.
     */
    static get type () {
        return 818;
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
            CSaveDataConst.propNameStMaxHPUpSign,
            CSaveDataConst.propNameStMaxHPUp,
            CSaveDataConst.propNameStMaxHPPlusSign,
            CSaveDataConst.propNameStMaxHPPlus,
            CSaveDataConst.propNameStMaxSPUpSign,
            CSaveDataConst.propNameStMaxSPUp,
            CSaveDataConst.propNameStMaxSPPlusSign,
            CSaveDataConst.propNameStMaxSPPlus,
            CSaveDataConst.propNameStHPRUpSign,
            CSaveDataConst.propNameStHPRUp,
            CSaveDataConst.propNameStSPRUpSign,
            CSaveDataConst.propNameStSPRUp,
            CSaveDataConst.propNameStStrPlusSign,
            CSaveDataConst.propNameStStrPlus,
            CSaveDataConst.propNameStAgiPlusSign,
            CSaveDataConst.propNameStAgiPlus,
            CSaveDataConst.propNameStVitPlusSign,
            CSaveDataConst.propNameStVitPlus,
            CSaveDataConst.propNameStIntPlusSign,
            CSaveDataConst.propNameStIntPlus,
            CSaveDataConst.propNameStDexPlusSign,
            CSaveDataConst.propNameStDexPlus,
            CSaveDataConst.propNameStLukPlusSign,
            CSaveDataConst.propNameStLukPlus,
            CSaveDataConst.propNameStHitPlusSign,
            CSaveDataConst.propNameStHitPlus,
            CSaveDataConst.propNameStFleePlusSign,
            CSaveDataConst.propNameStFleePlus,
            CSaveDataConst.propNameStCriPlusSign,
            CSaveDataConst.propNameStCriPlus,
            CSaveDataConst.propNameStLuckyPlusSign,
            CSaveDataConst.propNameStLuckyPlus,
            CSaveDataConst.propNameStAspdUpSign,
            CSaveDataConst.propNameStAspdUp,
            CSaveDataConst.propNameStAspdPlusSign,
            CSaveDataConst.propNameStAspdPlus,
            CSaveDataConst.propNameStCastDownSign,
            CSaveDataConst.propNameStCastDown,
            CSaveDataConst.propNameStFixedDownSign,
            CSaveDataConst.propNameStFixedDown,
            CSaveDataConst.propNameStDelayDownSign,
            CSaveDataConst.propNameStDelayDown,
            CSaveDataConst.propNameStCostDownSign,
            CSaveDataConst.propNameStCostDown,
            CSaveDataConst.propNameChangeArmsAtk,
            CSaveDataConst.propNameChangeArmsMatk,
            CSaveDataConst.propNameChangeArmsLv,
            CSaveDataConst.propNameStAtkPlusSign,
            CSaveDataConst.propNameStAtkPlus,
            CSaveDataConst.propNameStPerfectAttackUp,
            CSaveDataConst.propNameStWeaponAtkUpSign,
            CSaveDataConst.propNameStWeaponAtkUp,
            CSaveDataConst.propNameStRange,
            CSaveDataConst.propNameStMatkPlusSign,
            CSaveDataConst.propNameStMatkPlus,
            CSaveDataConst.propNameStDefDivPlusSign,
            CSaveDataConst.propNameStDefDivPlus,
            CSaveDataConst.propNameStMdefDivPlusSign,
            CSaveDataConst.propNameStMdefDivPlus,
            CSaveDataConst.propNameStHealUpUsingSign,
            CSaveDataConst.propNameStHealUpUsing,
            CSaveDataConst.propNameStHealUpUsedSign,
            CSaveDataConst.propNameStHealUpUsed,
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
        this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 87);
        this.registerPropInfo(CSaveDataConst.propNameStMaxHPUpSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStMaxHPUp, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStMaxHPPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStMaxHPPlus, CSaveDataConst.propBitsMaxAbs100k);
        this.registerPropInfo(CSaveDataConst.propNameStMaxSPUpSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStMaxSPUp, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStMaxSPPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStMaxSPPlus, CSaveDataConst.propBitsMaxAbs100k);
        this.registerPropInfo(CSaveDataConst.propNameStHPRUpSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStHPRUp, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStSPRUpSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStSPRUp, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStStrPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStStrPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStAgiPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStAgiPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStVitPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStVitPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStIntPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStIntPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStDexPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStDexPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStLukPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStLukPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStHitPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStHitPlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStFleePlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStFleePlus, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStCriPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStCriPlus, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStLuckyPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStLuckyPlus, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStAspdUpSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStAspdUp, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameStAspdPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStAspdPlus, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameStCastDownSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStCastDown, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameStFixedDownSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStFixedDown, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameStDelayDownSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStDelayDown, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameStCostDownSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStCostDown, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameChangeArmsAtk, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameChangeArmsMatk, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameChangeArmsLv, 3);
        this.registerPropInfo(CSaveDataConst.propNameStAtkPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStAtkPlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStPerfectAttackUp, 7);
        this.registerPropInfo(CSaveDataConst.propNameStWeaponAtkUpSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStWeaponAtkUp, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStRange, 5);
        this.registerPropInfo(CSaveDataConst.propNameStMatkPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStMatkPlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStDefDivPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStDefDivPlus, CSaveDataConst.propBitsMaxAbs10k);
        this.registerPropInfo(CSaveDataConst.propNameStMdefDivPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStMdefDivPlus, CSaveDataConst.propBitsMaxAbs10k);
        this.registerPropInfo(CSaveDataConst.propNameStHealUpUsingSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStHealUpUsing, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStHealUpUsedSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStHealUpUsed, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStPowPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStPowPlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStStaPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStStaPlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStWisPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStWisPlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStSplPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStSplPlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStConPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStConPlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStCrtPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStCrtPlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStPAtkPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStPAtkPlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStSMatkPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStSMatkPlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStHPlusPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStHPlusPlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStCRatePlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStCRatePlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStResPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResPlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStMresPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStMresPlus, CSaveDataConst.propBitsMaxAbs1k);
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