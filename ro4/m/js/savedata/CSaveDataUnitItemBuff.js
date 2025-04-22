/**
 * 「アイテム(食品/他)」情報クラス
 */
class CSaveDataUnitItemBuff extends CSaveDataUnitBase {

    /**
     * タイプ値.
     */
    static get type () {
        return 814;
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
            CSaveDataConst.propNameSubSpeedPot,
            CSaveDataConst.propNameParseCtrlFlag,
            // データは、初期バージョンでは、70個
            // （領域的には71個用意されていたが末尾は使用していなかったので切り捨て）
            ...(Array(70).fill(CSaveDataConst.propNameBuffLv)),
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
        this.registerPropInfo(CSaveDataConst.propNameSubSpeedPot, 2);
        this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 70);
        this.registerPropInfo(CSaveDataConst.propNameBuffLv, 6);
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
                case CSaveDataConst.propNameSubSpeedPot:
                    if (this.getProp(propName) != 0) {
                        break;
                    }
                    continue;
                default:
                    continue;
            }
            // ここに来るならばデフォルトでない値がある
            return false;
        }
        // 共用の判定処理を利用
        return this.isEmptyUnit_CtrlFlag0();
    }
}