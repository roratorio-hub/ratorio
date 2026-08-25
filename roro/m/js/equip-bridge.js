/**
 * equip.js への中立ブリッジ（CTimeItemDataBridge.js と同型）.
 * hmrndopt.js / learnedskill.js / slotpager.js から equip.js を直接 import すると
 * equip → {hmrndopt, learnedskill, slotpager} との循環 import が生じる。
 * 実体は equip.js が初期化時（モジュール評価時）に登録する.
 */
export const equipBridge = {
	/** @type {(() => void)|null} */
	onChangeRandomEnchant: null,
	/** @type {(() => void)|null} */
	updateLearnedSkillNotice: null,
	/** @type {((value: string|number) => void)|null} */
	onChangeCard: null,
	/** @type {((value: string|number) => void)|null} */
	onChangeCostume: null,
};
