class CSaveDataUnitCharaConfSpecialize extends CSaveDataUnitBase {

    /**
     * タイプ値.
     */
    static get type () {
        return 819;
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
            CSaveDataConst.instanceKind,
            CSaveDataConst.propNameSubInvalidateSettings,
            CSaveDataConst.propNameParseCtrlFlag,

            CSaveDataConst.propNameSpecDamageSign,
            CSaveDataConst.propNameSpecDamage,
            CSaveDataConst.propNameSpecCriticalDamageSign,
            CSaveDataConst.propNameSpecCriticalDamage,
            CSaveDataConst.propNameSpecMapSign,
            CSaveDataConst.propNameSpecMap,

            CSaveDataConst.propNameSpecRaceSolidSign,
            CSaveDataConst.propNameSpecRaceSolid,
            CSaveDataConst.propNameSpecRaceUndeadSign,
            CSaveDataConst.propNameSpecRaceUndead,
            CSaveDataConst.propNameSpecRaceAnimalSign,
            CSaveDataConst.propNameSpecRaceAnimal,
            CSaveDataConst.propNameSpecRacePlantSign,
            CSaveDataConst.propNameSpecRacePlant,
            CSaveDataConst.propNameSpecRaceInsectSign,
            CSaveDataConst.propNameSpecRaceInsect,
            CSaveDataConst.propNameSpecRaceFishSign,
            CSaveDataConst.propNameSpecRaceFish,
            CSaveDataConst.propNameSpecRaceDemonSign,
            CSaveDataConst.propNameSpecRaceDemon,
            CSaveDataConst.propNameSpecRaceHumanSign,
            CSaveDataConst.propNameSpecRaceHuman,
            CSaveDataConst.propNameSpecRaceAngelSign,
            CSaveDataConst.propNameSpecRaceAngel,
            CSaveDataConst.propNameSpecRaceDragonSign,
            CSaveDataConst.propNameSpecRaceDragon,
            CSaveDataConst.propNameSpecRaceDoramSign,
            CSaveDataConst.propNameSpecRaceDoram,
            CSaveDataConst.propNameSpecRaceAllSign,
            CSaveDataConst.propNameSpecRaceAll,
            CSaveDataConst.propNameSpecRaceHumanNotPlayerSign,
            CSaveDataConst.propNameSpecRaceHumanNotPlayer,

            CSaveDataConst.propNameSpecAttackElementVanitySign,
            CSaveDataConst.propNameSpecAttackElementVanity,
            CSaveDataConst.propNameSpecAttackElementWaterSign,
            CSaveDataConst.propNameSpecAttackElementWater,
            CSaveDataConst.propNameSpecAttackElementEarthSign,
            CSaveDataConst.propNameSpecAttackElementEarth,
            CSaveDataConst.propNameSpecAttackElementFireSign,
            CSaveDataConst.propNameSpecAttackElementFire,
            CSaveDataConst.propNameSpecAttackElementWindSign,
            CSaveDataConst.propNameSpecAttackElementWind,
            CSaveDataConst.propNameSpecAttackElementPoisonSign,
            CSaveDataConst.propNameSpecAttackElementPoison,
            CSaveDataConst.propNameSpecAttackElementHolySign,
            CSaveDataConst.propNameSpecAttackElementHoly,
            CSaveDataConst.propNameSpecAttackElementDarkSign,
            CSaveDataConst.propNameSpecAttackElementDark,
            CSaveDataConst.propNameSpecAttackElementPsycoSign,
            CSaveDataConst.propNameSpecAttackElementPsyco,
            CSaveDataConst.propNameSpecAttackElementUndeadSign,
            CSaveDataConst.propNameSpecAttackElementUndead,
            CSaveDataConst.propNameSpecAttackElementAllSign,
            CSaveDataConst.propNameSpecAttackElementAll,

            CSaveDataConst.propNameSpecMobElementVanitySign,
            CSaveDataConst.propNameSpecMobElementVanity,
            CSaveDataConst.propNameSpecMobElementWaterSign,
            CSaveDataConst.propNameSpecMobElementWater,
            CSaveDataConst.propNameSpecMobElementEarthSign,
            CSaveDataConst.propNameSpecMobElementEarth,
            CSaveDataConst.propNameSpecMobElementFireSign,
            CSaveDataConst.propNameSpecMobElementFire,
            CSaveDataConst.propNameSpecMobElementWindSign,
            CSaveDataConst.propNameSpecMobElementWind,
            CSaveDataConst.propNameSpecMobElementPoisonSign,
            CSaveDataConst.propNameSpecMobElementPoison,
            CSaveDataConst.propNameSpecMobElementHolySign,
            CSaveDataConst.propNameSpecMobElementHoly,
            CSaveDataConst.propNameSpecMobElementDarkSign,
            CSaveDataConst.propNameSpecMobElementDark,
            CSaveDataConst.propNameSpecMobElementPsycoSign,
            CSaveDataConst.propNameSpecMobElementPsyco,
            CSaveDataConst.propNameSpecMobElementUndeadSign,
            CSaveDataConst.propNameSpecMobElementUndead,
            CSaveDataConst.propNameSpecMobElementAllSign,
            CSaveDataConst.propNameSpecMobElementAll,

            CSaveDataConst.propNameSpecSizeSmallSign,
            CSaveDataConst.propNameSpecSizeSmall,
            CSaveDataConst.propNameSpecSizeMediumSign,
            CSaveDataConst.propNameSpecSizeMedium,
            CSaveDataConst.propNameSpecSizeLargeSign,
            CSaveDataConst.propNameSpecSizeLarge,
            CSaveDataConst.propNameSpecSizeAllSign,
            CSaveDataConst.propNameSpecSizeAll,

            CSaveDataConst.propNameSpecBossTypeBossSign,
            CSaveDataConst.propNameSpecBossTypeBoss,
            CSaveDataConst.propNameSpecBossTypeNormalSign,
            CSaveDataConst.propNameSpecBossTypeNormal,
            CSaveDataConst.propNameSpecBossTypeAllSign,
            CSaveDataConst.propNameSpecBossTypeAll,

            CSaveDataConst.propNameSpecRangeShortSign,
            CSaveDataConst.propNameSpecRangeShort,
            CSaveDataConst.propNameSpecRangeLongSign,
            CSaveDataConst.propNameSpecRangeLong,
            CSaveDataConst.propNameSpecRangeAllSign,
            CSaveDataConst.propNameSpecRangeAll,

            CSaveDataConst.propNameSpecPlayerHumanSign,
            CSaveDataConst.propNameSpecPlayerHuman,
            CSaveDataConst.propNameSpecPlayerDoramSign,
            CSaveDataConst.propNameSpecPlayerDoram,
            CSaveDataConst.propNameSpecPlayerAllSign,
            CSaveDataConst.propNameSpecPlayerAll,

            CSaveDataConst.propNameIgnoreDefenceRaceAll,
            CSaveDataConst.propNameKiriEffect,
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
        this.registerPropInfo(CSaveDataConst.instanceKind, 6);
        this.registerPropInfo(CSaveDataConst.propNameSubInvalidateSettings, 1);
        this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 104);

        this.registerPropInfo(CSaveDataConst.propNameSpecDamageSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecDamage, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecCriticalDamageSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecCriticalDamage, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameSpecMapSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecMap, CSaveDataConst.propBitsMaxAbs500);

        this.registerPropInfo(CSaveDataConst.propNameSpecRaceSolidSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceSolid, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceUndeadSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceUndead, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceAnimalSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceAnimal, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecRacePlantSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRacePlant, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceInsectSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceInsect, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceFishSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceFish, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceDemonSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceDemon, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceHumanSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceHuman, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceAngelSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceAngel, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceDragonSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceDragon, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceDoramSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceDoram, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceAllSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceAll, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceHumanNotPlayerSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRaceHumanNotPlayer, CSaveDataConst.propBitsMaxAbs500);

        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementVanitySign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementVanity, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementWaterSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementWater, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementEarthSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementEarth, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementFireSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementFire, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementWindSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementWind, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementPoisonSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementPoison, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementHolySign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementHoly, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementDarkSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementDark, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementPsycoSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementPsyco, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementUndeadSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementUndead, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementAllSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementAll, CSaveDataConst.propBitsMaxAbs500);

        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementVanitySign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementVanity, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementWaterSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementWater, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementEarthSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementEarth, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementFireSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementFire, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementWindSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementWind, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementPoisonSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementPoison, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementHolySign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementHoly, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementDarkSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementDark, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementPsycoSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementPsyco, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementUndeadSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementUndead, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementAllSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecMobElementAll, CSaveDataConst.propBitsMaxAbs500);

        this.registerPropInfo(CSaveDataConst.propNameSpecSizeSmallSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecSizeSmall, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecSizeMediumSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecSizeMedium, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecSizeLargeSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecSizeLarge, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecSizeAllSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecSizeAll, CSaveDataConst.propBitsMaxAbs500);

        this.registerPropInfo(CSaveDataConst.propNameSpecBossTypeBossSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecBossTypeBoss, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecBossTypeNormalSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecBossTypeNormal, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecBossTypeAllSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecBossTypeAll, CSaveDataConst.propBitsMaxAbs500);

        this.registerPropInfo(CSaveDataConst.propNameSpecRangeShortSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRangeShort, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecRangeLongSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRangeLong, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecRangeAllSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecRangeAll, CSaveDataConst.propBitsMaxAbs500);

        this.registerPropInfo(CSaveDataConst.propNameSpecPlayerHumanSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecPlayerHuman, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecPlayerDoramSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecPlayerDoram, CSaveDataConst.propBitsMaxAbs500);
        this.registerPropInfo(CSaveDataConst.propNameSpecPlayerAllSign, 1);
        this.registerPropInfo(CSaveDataConst.propNameSpecPlayerAll, CSaveDataConst.propBitsMaxAbs500);

        this.registerPropInfo(CSaveDataConst.propNameIgnoreDefenceRaceAll, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameKiriEffect, 1);
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