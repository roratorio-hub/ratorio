/**
 * スキル計算式から呼ばれる「使用中／習得済みスキルLv 検索関数」の注入ブリッジ（依存ゼロ）。
 *
 * UsedSkillSearch の実体は engine/skillstate.js、LearnedSkillSearch の実体は
 * engine/learnedskill.js にあるが、どちらも global.js を起点とする循環 import に含まれる。
 * スキル定義側（engine/skill/*.js・CSkillData.js）から直接 import すると
 *   CSkillManager → skill/xx → learnedskill → CSkillManager
 * のような循環が生まれ、learnedskill.js のモジュール本体が実行する Register 呼び出しが
 * CSkillManager.js 側の let の TDZ に突っ込んで ReferenceError になる。
 * head-bridge.js / foot-bridge.js / hmjob-bridge.js と同じ「依存ゼロの委譲モジュール」で切り離す
 * （import が無いモジュールは「評価途中」になり得ないので構造的に循環しない）。
 *
 * 旧実装（CSkillManager.js のモジュールローカル let）と同じセマンティクス:
 * export let の live binding により、import 側は Register 後の実体を呼び出し時点で参照する。
 * 未登録環境（pages/ ページ・ユニットテスト）で呼ばれた場合は例外を投げる。
 */

/**
 * 職固有自己支援等、使用中スキルの設定Lvを取得する。実体は engine/skillstate.js。
 * @type {(skillId: number) => number}
 */
export let UsedSkillSearch = () => {
	throw new Error('UsedSkillSearch is not registered (skillstate.js 未ロード)');
};

/** @param {(skillId: number) => number} fn */
export function RegisterUsedSkillSearch(fn) {
	UsedSkillSearch = fn;
}

/**
 * 習得スキル欄の設定Lvを取得する。実体は engine/learnedskill.js。
 * @type {(skillId: number) => number}
 */
export let LearnedSkillSearch = () => {
	throw new Error('LearnedSkillSearch is not registered (learnedskill.js 未ロード)');
};

/** @param {(skillId: number) => number} fn */
export function RegisterLearnedSkillSearch(fn) {
	LearnedSkillSearch = fn;
}
