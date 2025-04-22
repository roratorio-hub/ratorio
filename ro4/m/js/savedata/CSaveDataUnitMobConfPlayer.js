/**
 * 「対プレイヤー設定」情報クラス
 * 旧セーブデータから変換する時だけ使われている
 */
class CSaveDataUnitMobConfPlayer extends CSaveDataUnitBase {

    /**
     * タイプ値.
     */
    static get type () {
        return 822;
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
            CSaveDataConst.propNameOptCode,
            CSaveDataConst.propNameParseCtrlFlag,
            CSaveDataConst.propNameStMaxHP,
            CSaveDataConst.propNameStDefDiv,
            CSaveDataConst.propNameStDefMinus,
            CSaveDataConst.propNameStMdefDiv,
            CSaveDataConst.propNameStMdefMinus,
            CSaveDataConst.propNameStFlee,
            CSaveDataConst.propNameStLucky,
            CSaveDataConst.propNameStBodyElement,
            CSaveDataConst.propNameStResistRaceHumanSign,
            CSaveDataConst.propNameStResistRaceHuman,
            CSaveDataConst.propNameStResistSizeMediumSign,
            CSaveDataConst.propNameStResistSizeMedium,
            CSaveDataConst.propNameStResistRangeLongSign,
            CSaveDataConst.propNameStResistRangeLong,
            CSaveDataConst.propNameStResistElementVanitySign,
            CSaveDataConst.propNameStResistElementVanity,
            CSaveDataConst.propNameStResistElementWaterSign,
            CSaveDataConst.propNameStResistElementWater,
            CSaveDataConst.propNameStResistElementEarthSign,
            CSaveDataConst.propNameStResistElementEarth,
            CSaveDataConst.propNameStResistElementFireSign,
            CSaveDataConst.propNameStResistElementFire,
            CSaveDataConst.propNameStResistElementWindSign,
            CSaveDataConst.propNameStResistElementWind,
            CSaveDataConst.propNameStResistElementPoisonSign,
            CSaveDataConst.propNameStResistElementPoison,
            CSaveDataConst.propNameStResistElementHolySign,
            CSaveDataConst.propNameStResistElementHoly,
            CSaveDataConst.propNameStResistElementDarkSign,
            CSaveDataConst.propNameStResistElementDark,
            CSaveDataConst.propNameStResistElementPsycoSign,
            CSaveDataConst.propNameStResistElementPsyco,
            CSaveDataConst.propNameStResistElementUndeadSign,
            CSaveDataConst.propNameStResistElementUndead,
            CSaveDataConst.propNameStResistBossNormalSign,
            CSaveDataConst.propNameStResistBossNormal,
            CSaveDataConst.propNameStResistMonsterElementAnySign,
            CSaveDataConst.propNameStResistMonsterElementAny,
            CSaveDataConst.propNameStResistPhysicalSign,
            CSaveDataConst.propNameStResistPhysical,
            CSaveDataConst.propNameStResistMagicalSign,
            CSaveDataConst.propNameStResistMagical,
            CSaveDataConst.propNameStResistRaceDoramSign,
            CSaveDataConst.propNameStResistRaceDoram,
            CSaveDataConst.propNameBuffEnergyCoat,
            CSaveDataConst.propNameBuffHansha1,
            CSaveDataConst.propNameBuffHansha2,
            CSaveDataConst.propNameStBaseLv,
            CSaveDataConst.propNameStStrSign,
            CSaveDataConst.propNameStStr,
            CSaveDataConst.propNameStAgiSign,
            CSaveDataConst.propNameStAgi,
            CSaveDataConst.propNameStVitSign,
            CSaveDataConst.propNameStVit,
            CSaveDataConst.propNameStIntSign,
            CSaveDataConst.propNameStInt,
            CSaveDataConst.propNameStDexSign,
            CSaveDataConst.propNameStDex,
            CSaveDataConst.propNameStLukSign,
            CSaveDataConst.propNameStLuk,
            CSaveDataConst.propNameStWeightNow,
            CSaveDataConst.propNameStWeightMax,
            CSaveDataConst.propNameConfBattleArea,
            CSaveDataConst.propNameStResistSizeSmallSign,
            CSaveDataConst.propNameStResistSizeSmall,
            CSaveDataConst.propNameStRace,
            CSaveDataConst.propNameStResPlusSign,
            CSaveDataConst.propNameStResPlus,
            CSaveDataConst.propNameStMresPlusSign,
            CSaveDataConst.propNameStMresPlus,
            CSaveDataConst.propNameStPowSign,
            CSaveDataConst.propNameStPow,
            CSaveDataConst.propNameStStaSign,
            CSaveDataConst.propNameStSta,
            CSaveDataConst.propNameStWisSign,
            CSaveDataConst.propNameStWis,
            CSaveDataConst.propNameStSplSign,
            CSaveDataConst.propNameStSpl,
/*				CSaveDataConst.propNameStConSign,
            CSaveDataConst.propNameStCon,
            CSaveDataConst.propNameStCrtSign,
            CSaveDataConst.propNameStCrt,*/
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
        // （旧形式の領域的には52個用意されていたが末尾は使用していなかったので切り捨て）
        this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 78);
        this.registerPropInfo(CSaveDataConst.propNameStMaxHP, CSaveDataConst.propBitsMaxAbs4M);
        this.registerPropInfo(CSaveDataConst.propNameStDefDiv, CSaveDataConst.propBitsMaxAbs10k);
        this.registerPropInfo(CSaveDataConst.propNameStDefMinus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStMdefDiv, CSaveDataConst.propBitsMaxAbs10k);
        this.registerPropInfo(CSaveDataConst.propNameStMdefMinus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStFlee, CSaveDataConst.propBitsMaxAbs4k);
        this.registerPropInfo(CSaveDataConst.propNameStLucky, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameStBodyElement, 6);
        this.registerPropInfo(CSaveDataConst.propNameStResistRaceHumanSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistRaceHuman, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistSizeMediumSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistSizeMedium, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistRangeLongSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistRangeLong, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementVanitySign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementVanity, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementWaterSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementWater, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementEarthSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementEarth, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementFireSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementFire, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementWindSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementWind, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementPoisonSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementPoison, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementHolySign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementHoly, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementDarkSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementDark, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementPsycoSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementPsyco, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementUndeadSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistElementUndead, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistBossNormalSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistBossNormal, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistMonsterElementAnySign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistMonsterElementAny, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistPhysicalSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistPhysical, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistMagicalSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistMagical, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStResistRaceDoramSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistRaceDoram, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameBuffEnergyCoat, 4);
        this.registerPropInfo(CSaveDataConst.propNameBuffHansha1, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameBuffHansha2, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameStBaseLv, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameStStrSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStStr, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStAgiSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStAgi, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStVitSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStVit, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStIntSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStInt, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStDexSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStDex, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStLukSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStLuk, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStWeightNow, 14);
        this.registerPropInfo(CSaveDataConst.propNameStWeightMax, 14);
        this.registerPropInfo(CSaveDataConst.propNameConfBattleArea, 4);
        this.registerPropInfo(CSaveDataConst.propNameStResistSizeSmallSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResistSizeSmall, CSaveDataConst.propBitsMaxAbs200);
        this.registerPropInfo(CSaveDataConst.propNameStRace, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStResPlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStMresPlusSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStMresPlus, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStPowSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStPow, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStStaSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStSta, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStWisSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStWis, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStSplSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStSpl, CSaveDataConst.propBitsMaxAbs1k);
/*			this.registerPropInfo(CSaveDataConst.propNameStConSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStCon, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameStCrtSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameStCrt, CSaveDataConst.propBitsMaxAbs1k);*/
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