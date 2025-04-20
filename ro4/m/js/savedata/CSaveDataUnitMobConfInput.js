class CSaveDataUnitMobConfInput extends CSaveDataUnitBase {

    /**
     * タイプ値.
     */
    static get type () {
        return 823;
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

            CSaveDataConst.propNameMobLv,
            CSaveDataConst.propNameMobHP,
            CSaveDataConst.propNameStStr,
            CSaveDataConst.propNameStInt,
            CSaveDataConst.propNameStVit,
            CSaveDataConst.propNameStDex,
            CSaveDataConst.propNameStAgi,
            CSaveDataConst.propNameStLuk,
            CSaveDataConst.propNameStAtk,
            CSaveDataConst.propNameStMatk,
            CSaveDataConst.propNameStRange,
            CSaveDataConst.propNameStDefDiv,
            CSaveDataConst.propNameStMdefDiv,
            CSaveDataConst.propNameBaseExp,
            CSaveDataConst.propNameJobExp,
            CSaveDataConst.propNameMobSize,
            CSaveDataConst.propNameMobElement,
            CSaveDataConst.propNameMobRace,
            CSaveDataConst.propNameMobBossType,
            CSaveDataConst.propNameMobGrassType,

            CSaveDataConst.propNameStPow,
            CSaveDataConst.propNameStSta,
            CSaveDataConst.propNameStWis,
            CSaveDataConst.propNameStSpl,
            CSaveDataConst.propNameStCon,
            CSaveDataConst.propNameStCrt,
            CSaveDataConst.propNameStPAtk,
            CSaveDataConst.propNameStSMatk,
            CSaveDataConst.propNameStHPlus,
            CSaveDataConst.propNameStCRate,
            CSaveDataConst.propNameStRes,
            CSaveDataConst.propNameStMres,
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
        this.registerPropInfo(CSaveDataConst.propNameOptCode, 1);
        // （旧形式の領域的には52個用意されていたが末尾は使用していなかったので切り捨て）
        this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 32);

        this.registerPropInfo(CSaveDataConst.propNameMobLv, CSaveDataConst.propBitsMaxAbs1k);
        this.registerPropInfo(CSaveDataConst.propNameMobHP, CSaveDataConst.propBitsMaxAbs10G);
        this.registerPropInfo(CSaveDataConst.propNameStStr, CSaveDataConst.propBitsMaxAbs10G);
        this.registerPropInfo(CSaveDataConst.propNameStAgi, CSaveDataConst.propBitsMaxAbs10G);
        this.registerPropInfo(CSaveDataConst.propNameStVit, CSaveDataConst.propBitsMaxAbs10G);
        this.registerPropInfo(CSaveDataConst.propNameStInt, CSaveDataConst.propBitsMaxAbs10G);
        this.registerPropInfo(CSaveDataConst.propNameStDex, CSaveDataConst.propBitsMaxAbs10G);
        this.registerPropInfo(CSaveDataConst.propNameStLuk, CSaveDataConst.propBitsMaxAbs10G);
        this.registerPropInfo(CSaveDataConst.propNameStAtk, CSaveDataConst.propBitsMaxAbs10G);
        this.registerPropInfo(CSaveDataConst.propNameStMatk, CSaveDataConst.propBitsMaxAbs10G);
        this.registerPropInfo(CSaveDataConst.propNameStRange, 6);
        this.registerPropInfo(CSaveDataConst.propNameStDefDiv, CSaveDataConst.propBitsMaxAbs10G);
        this.registerPropInfo(CSaveDataConst.propNameStMdefDiv, CSaveDataConst.propBitsMaxAbs10G);
        this.registerPropInfo(CSaveDataConst.propNameBaseExp, CSaveDataConst.propBitsMaxAbs10G);
        this.registerPropInfo(CSaveDataConst.propNameJobExp, CSaveDataConst.propBitsMaxAbs10G);
        this.registerPropInfo(CSaveDataConst.propNameMobSize, 6);
        this.registerPropInfo(CSaveDataConst.propNameMobElement, CSaveDataConst.propBitsMaxAbs100);
        this.registerPropInfo(CSaveDataConst.propNameMobRace, 6);
        this.registerPropInfo(CSaveDataConst.propNameMobBossType, 6);
        this.registerPropInfo(CSaveDataConst.propNameMobGrassType, 6);

        this.registerPropInfo(CSaveDataConst.propNameStPow, 14);
        this.registerPropInfo(CSaveDataConst.propNameStSta, 14);
        this.registerPropInfo(CSaveDataConst.propNameStWis, 14);
        this.registerPropInfo(CSaveDataConst.propNameStSpl, 14);
        this.registerPropInfo(CSaveDataConst.propNameStCon, 14);
        this.registerPropInfo(CSaveDataConst.propNameStCrt, 14);
        this.registerPropInfo(CSaveDataConst.propNameStPAtk, 14);
        this.registerPropInfo(CSaveDataConst.propNameStSMatk, 14);
        this.registerPropInfo(CSaveDataConst.propNameStHPlus, 14);
        this.registerPropInfo(CSaveDataConst.propNameStCRate, 14);
        this.registerPropInfo(CSaveDataConst.propNameStRes, 14);
        this.registerPropInfo(CSaveDataConst.propNameStMres, 14);
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

        const defaultValues = [0n, 1n];
        const propNames = this.constructor.#propNamesSelf.slice();

        // すべてのプロパティがデフォルト値であるかを検査する
        for (let idx = 0; idx < propNames.length; idx++) {

            const propName = propNames[idx];

            /// そもそもパースされたデータがない場合は、デフォルトとみなす
            if (this.getProp(propName) === undefined) {
                continue;
            }

            // デフォルト値であるかの検査
            switch (propName) {
                case CSaveDataConst.propNameOptCode:
                    continue;
                case CSaveDataConst.propNameParseCtrlFlag:
                    continue;
                case CSaveDataConst.propNameMobLv:
                case CSaveDataConst.propNameMobHP:
                case CSaveDataConst.propNameStStr:
                case CSaveDataConst.propNameStAgi:
                case CSaveDataConst.propNameStVit:
                case CSaveDataConst.propNameStInt:
                case CSaveDataConst.propNameStDex:
                case CSaveDataConst.propNameStLuk:
                case CSaveDataConst.propNameStAtk:
                case CSaveDataConst.propNameStMatk:
                case CSaveDataConst.propNameStRange:
                case CSaveDataConst.propNameStDefDiv:
                case CSaveDataConst.propNameStMdefDiv:
                case CSaveDataConst.propNameBaseExp:
                case CSaveDataConst.propNameJobExp:
                    if (defaultValues.indexOf(this.getProp(propName)) == -1) {
                        break;
                    }
                    continue;
                case CSaveDataConst.propNameMobSize:
                case CSaveDataConst.propNameMobRace:
                case CSaveDataConst.propNameMobBossType:
                case CSaveDataConst.propNameMobGrassType:
                case CSaveDataConst.propNameStPow:
                case CSaveDataConst.propNameStSta:
                case CSaveDataConst.propNameStWis:
                case CSaveDataConst.propNameStSpl:
                case CSaveDataConst.propNameStCon:
                case CSaveDataConst.propNameStCrt:
                case CSaveDataConst.propNameStPAtk:
                case CSaveDataConst.propNameStSMatk:
                case CSaveDataConst.propNameStHPlus:
                case CSaveDataConst.propNameStCRate:
                case CSaveDataConst.propNameStRes:
                case CSaveDataConst.propNameStMres:
                    if (this.getProp(propName) != 0n) {
                        break;
                    }
                    continue;
                case CSaveDataConst.propNameMobElement:
                    if (this.getProp(propName) != 1n) {
                        break;
                    }
                    continue;
                default:
                    continue;
            }

            // ここに来るならばデフォルトでない値がある
            return false;
        }

        // ここに来るならば、すべての設定がデフォルトのまま
        return true;
    }
}