/**
 * CAttackMethodAreaComponentManager への軽量ブリッジ（依存ゼロ）.
 *
 * 実体は CAttackMethodAreaComponentManager.js（calcx.html でのみロード）が
 * モジュール評価時に登録する。roro 側ファイルが CAttackMethodAreaComponentManager
 * を直接 import すると head.js への static import パスが生じ、循環・vitest ハング・
 * roro/other ページへの副作用を引き起こすため、必ず本ブリッジ経由で呼び出すこと
 * （経緯: .claude/context/dewindow/reference.md）。
 *
 * 未登録環境（roro/other ページ・ユニットテスト）では optional chaining により
 * 各呼び出しは no-op になる。
 */
export const g_attackMethodBridge = {
	/** @type {?function(): void} 攻撃手段エリアの再構築 */
	rebuildControls: null,
	/** @type {?function(): *} 攻撃手段設定の取得（セーブ用） */
	getAttackMethodConf: null,
	/** @type {?function(*): void} 攻撃手段設定の復元（ロード用） */
	setAttackMethodConf: null,
};
