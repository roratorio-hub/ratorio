/**
 * CTimeItemAreaComponentManager への中立ブリッジ（3f-7、CExtraInfoDataBridge と同型）.
 * CItemInfoManager.js は roro/other ページ（cardlist/itemlist/petlist 等）からも到達可能なため、
 * calcx 専用マネージャを直接 import するとモジュールレベルの RebuildControls() 自己実行が
 * roro/other ページへ波及する（reference.md「roro/other ページへの副作用トラップ」）。
 * 実体は CTimeItemAreaComponentManager.js（calcx.html でのみロード）が初期化時に登録する.
 */
export const g_timeItemDataBridge = {
	/** @type {((idxConf: number, dataId: number) => void)|null} */
	onChangeConf: null,
	/** @type {((idxConf: number, bForceOpen: boolean) => void)|null} */
	focusArea: null,
};
