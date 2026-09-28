/**
 * 職支援設定値配列（`g_confDataNizi` 等）の注入ブリッジ（依存ゼロ）。
 *
 * 実体は engine/runtime/global.js の `g_confDataNizi`。global.js は
 * `CSkillManager.js` を起点とする循環 import に含まれるため、スキル定義側
 * （engine/skill/*.js）から直接 import すると TDZ を踏む
 * （skill-search-bridge.js と同じ理由。詳細は同ファイルのコメント参照）。
 */

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
