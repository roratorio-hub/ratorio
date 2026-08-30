/**
 * スキル効果判定から呼ばれる「装備・カード・時限効果の所持数検索関数」の注入ブリッジ（依存ゼロ）。
 *
 * 実体は engine/chara/chara.js にあるが、engine/skill/skillstate.js から直接 import すると
 *   chara → skillstate → chara
 * の循環が生まれる。battlecalc-bridge.js / stallcalc-bridge.js / skill-search-bridge.js と同じ
 * 「依存ゼロの委譲モジュール」で切り離す（import が無いモジュールは「評価途中」になり得ないので
 * 構造的に循環しない）。
 *
 * export let の live binding により、import 側は Register 後の実体を呼び出し時点で参照する。
 * 未登録環境で呼ばれた場合は例外を投げる。
 */

/**
 * 指定カードが装備中の防具に何枚挿さっているかを検索する。実体は engine/chara/chara.js。
 * @type {(cardId: number, rgnId?: number) => number}
 */
export let CardNumSearch = () => {
	throw new Error('CardNumSearch is not registered (chara.js 未ロード)');
};

/** @param {(cardId: number, rgnId?: number) => number} fn */
export function RegisterCardNumSearch(fn) {
	CardNumSearch = fn;
}

/**
 * 指定アイテムが装備中かどうかを検索する。実体は engine/chara/chara.js。
 * @type {(itemId: number, rgnId?: number) => number}
 */
export let EquipNumSearch = () => {
	throw new Error('EquipNumSearch is not registered (chara.js 未ロード)');
};

/** @param {(itemId: number, rgnId?: number) => number} fn */
export function RegisterEquipNumSearch(fn) {
	EquipNumSearch = fn;
}

/**
 * 指定時限効果が使用中かどうかを検索する。実体は engine/chara/chara.js。
 * @type {(timeItemId: number) => number}
 */
export let TimeItemNumSearch = () => {
	throw new Error('TimeItemNumSearch is not registered (chara.js 未ロード)');
};

/** @param {(timeItemId: number) => number} fn */
export function RegisterTimeItemNumSearch(fn) {
	TimeItemNumSearch = fn;
}
