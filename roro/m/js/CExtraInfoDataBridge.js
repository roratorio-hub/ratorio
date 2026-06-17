/**
 * CExtraInfoAreaComponentManager が保持するデータと関数への中立ブリッジ.
 * head.js / saveimage.js / equip.js からの参照を window 経由から ESM import に切り替えるため分離.
 */
export const g_extraInfoDataBridge = {
    /** @type {Array|null} */
    charaData: null,
    /** @type {Array|null} */
    specData: null,
    /** @type {Array|null} */
    mobData: null,
    /** @type {((force: boolean) => void)|null} */
    clearStoredValueAll: null,
    /** @type {(() => void)|null} */
    rebuildDispAreaAll: null,
    /** @type {((key: string, value: number) => void)|null} */
    setDispDataValue: null,
    /** @type {(() => void)|null} */
    refreshFloatingDispAreaAll: null,
};

/**
 * dispDataMap 用キー: STRボーナス（ITEM_SP_* ではなく、STR/DEX値から導出される計算上の固定加算のため専用キーとする）.
 */
export const DISP_DATA_KEY_STRDEX_BONUS = "STRDEX_BONUS";
