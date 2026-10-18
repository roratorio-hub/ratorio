/**
 * 職支援設定値配列（`g_confDataIchizi` / `g_confDataNizi` / `g_confDataSanzi` / `g_confDataYozi`）の
 * 注入ブリッジ（依存ゼロ）。
 *
 * 実体は engine/runtime/global.js の各配列。global.js は
 * `CSkillManager.js` を起点とする循環 import に含まれるため、スキル定義側
 * （engine/skill/*.js）から直接 import すると TDZ を踏む
 * （skill-search-bridge.js と同じ理由。詳細は同ファイルのコメント参照）。
 *
 * confId は `CCharaConfIchizi.CONF_ID_XXX` 等の静的プロパティ。各クラスの InitData() で
 * 採番されるため、インスタンス化前は undefined になる（本番では stallcalc-shell.js の Init で済んでいる）。
 */

/**
 * 一次職支援設定欄の設定値を取得する。実体は engine/runtime/global.js の `g_confDataIchizi`。
 * @type {(confId: number) => number}
 */
export let GetCharaConfIchizi = () => {
	throw new Error('GetCharaConfIchizi is not registered (global.js 未ロード)');
};

/** @param {(confId: number) => number} fn */
export function RegisterGetCharaConfIchizi(fn) {
	GetCharaConfIchizi = fn;
}

/**
 * 二次職支援設定欄の設定値を取得する。実体は engine/runtime/global.js の `g_confDataNizi`。
 * @type {(confId: number) => number}
 */
export let GetCharaConfNizi = () => {
	throw new Error('GetCharaConfNizi is not registered (global.js 未ロード)');
};

/** @param {(confId: number) => number} fn */
export function RegisterGetCharaConfNizi(fn) {
	GetCharaConfNizi = fn;
}

/**
 * 三次職支援設定欄の設定値を取得する。実体は engine/runtime/global.js の `g_confDataSanzi`。
 * @type {(confId: number) => number}
 */
export let GetCharaConfSanzi = () => {
	throw new Error('GetCharaConfSanzi is not registered (global.js 未ロード)');
};

/** @param {(confId: number) => number} fn */
export function RegisterGetCharaConfSanzi(fn) {
	GetCharaConfSanzi = fn;
}

/**
 * 四次職支援設定欄の設定値を取得する。実体は engine/runtime/global.js の `g_confDataYozi`。
 * @type {(confId: number) => number}
 */
export let GetCharaConfYozi = () => {
	throw new Error('GetCharaConfYozi is not registered (global.js 未ロード)');
};

/** @param {(confId: number) => number} fn */
export function RegisterGetCharaConfYozi(fn) {
	GetCharaConfYozi = fn;
}
