/**
 * 性能カスタマイズ（CHARA_CONF_BASIC / CHARA_CONF_SPECIALIZE×4 / CHARA_CONF_SKILL /
 * CHARA_CONF_SPEC_BASIC）の mig配列位置 ⇔ g_confDataCustomXxx 添字 の対応表.
 *
 * 従来はセーブ側（`savedata-collect.js` の各 `build*Unit()`）とロード側
 * （`CSaveDataManager.js` の `applyDataToControls()` 末尾、`// TODO: 構造変更後、撤去予定`の
 * spliceブロック）に、同じ対応関係が逆方向で別々に手書きされていた（残件台帳 B-33）。
 * conf item を1つ追加するたびに両方を正しく直す必要があり、片方だけ直すと往復で静かに
 * 壊れる構造だった。本ファイルへ一本化し、両側から `migArrayFromConf()`/`applyMigArrayToConf()`
 * 経由で参照する。
 *
 * マッピングの値は、統合前の実装（savedata-collect.js の直書き代入と
 * CSaveDataManager.js の splice ブロック）を機械抽出・突き合わせて転記した
 * （両者は矛盾なく一致することを確認済み）。confCustomAtk[26]（CONF_ID_BLANK。未使用の
 * 空き枠）のようにどちらの側からも参照されない confIndex は、意図的にどのマップにも
 * 含めない（対応するUI入力元が無いため常に前回値のまま＝既存挙動の温存）。
 */

/** @typedef {{ migIndex: number, confIndex: number }} MigConfEntry */

/** CHARA_CONF_BASIC: 4種のグローバルへ分散する寄せ集め（46スロット中、実際に使うのは32スロット）。 */
export const CHARA_CONF_BASIC_MIG_MAP = {
    confCustomStatus: Array.from({ length: 22 }, (_, i) => ({ migIndex: i, confIndex: 1 + i })),
    confCustomAtk: [
        { migIndex: 22, confIndex: 1 },
        { migIndex: 23, confIndex: 2 },
        { migIndex: 24, confIndex: 3 },
        { migIndex: 25, confIndex: 4 },
        { migIndex: 26, confIndex: 11 },
        { migIndex: 27, confIndex: 24 },
        { migIndex: 29, confIndex: 13 },
    ],
    confCustomDef: [
        { migIndex: 30, confIndex: 1 },
        { migIndex: 31, confIndex: 2 },
    ],
    confCustomSkill: [
        { migIndex: 32, confIndex: 2 },
        { migIndex: 33, confIndex: 3 },
    ],
};

/** CHARA_CONF_SPECIALIZE（特化：攻撃｜物理）。54スロット中9スロットを使用。 */
export const CHARA_CONF_SPECIALIZE_PHYSICAL_MIG_MAP = {
    confCustomAtk: [
        { migIndex: 0, confIndex: 5 },
        { migIndex: 14, confIndex: 6 },
        { migIndex: 26, confIndex: 25 },
        { migIndex: 37, confIndex: 7 },
        { migIndex: 41, confIndex: 8 },
        { migIndex: 44, confIndex: 22 },
        { migIndex: 47, confIndex: 9 },
        { migIndex: 51, confIndex: 12 },
        { migIndex: 53, confIndex: 27 },
    ],
};

/** CHARA_CONF_SPECIALIZE（特化：攻撃｜魔法）。54スロット中7スロットを使用。 */
export const CHARA_CONF_SPECIALIZE_MAGICAL_MIG_MAP = {
    confCustomAtk: [
        { migIndex: 0, confIndex: 14 },
        { migIndex: 14, confIndex: 15 },
        { migIndex: 26, confIndex: 18 },
        { migIndex: 37, confIndex: 16 },
        { migIndex: 41, confIndex: 17 },
        { migIndex: 44, confIndex: 23 },
        { migIndex: 51, confIndex: 19 },
    ],
};

/** CHARA_CONF_SPECIALIZE（特化：攻撃｜すべて）。54スロット中3スロットを使用。 */
export const CHARA_CONF_SPECIALIZE_ATTACK_ANY_MIG_MAP = {
    confCustomAtk: [
        { migIndex: 1, confIndex: 10 },
        { migIndex: 2, confIndex: 21 },
        { migIndex: 50, confIndex: 20 },
    ],
};

/** CHARA_CONF_SPECIALIZE（特化：防御｜すべて）。54スロット中8スロットを使用。 */
export const CHARA_CONF_SPECIALIZE_DEFENCE_ANY_MIG_MAP = {
    confCustomDef: [
        { migIndex: 2, confIndex: 9 },
        { migIndex: 14, confIndex: 3 },
        { migIndex: 26, confIndex: 5 },
        { migIndex: 37, confIndex: 4 },
        { migIndex: 41, confIndex: 6 },
        { migIndex: 44, confIndex: 10 },
        { migIndex: 46, confIndex: 7 }, // 全射程ではなく遠距離なので注意（CSaveDataManager.js の元コード同様）
        { migIndex: 50, confIndex: 8 },
    ],
};

/**
 * CHARA_CONF_SKILL。12スロット中、migIndex 0（常に0）と migIndex 1（派生値。
 * `specDamageUpConditionType` は migIndex 2 の非0判定から導出される）はマップに含まれない
 * ——単純な添字対応ではないため、呼び出し側（savedata-collect.js）で個別に処理する。
 */
export const CHARA_CONF_SKILL_MIG_MAP = {
    confCustomSkill: [
        { migIndex: 2, confIndex: 10 },
        { migIndex: 3, confIndex: 1 },
        { migIndex: 4, confIndex: 11 },
        { migIndex: 5, confIndex: 12 },
        { migIndex: 6, confIndex: 5 },
        { migIndex: 7, confIndex: 4 },
        { migIndex: 8, confIndex: 7 },
        { migIndex: 9, confIndex: 6 },
        { migIndex: 10, confIndex: 9 },
        { migIndex: 11, confIndex: 8 },
    ],
};

/** CHARA_CONF_SPEC_BASIC。12スロット全てを使用（confCustomSpecStatus[1..12]への直接転記）。 */
export const CHARA_CONF_SPEC_BASIC_MIG_MAP = {
    confCustomSpecStatus: Array.from({ length: 12 }, (_, i) => ({ migIndex: i, confIndex: 1 + i })),
};

/**
 * マッピングテーブルに従い、conf配列群からmig配列を組み立てる（セーブ側用）.
 * @param {number} length mig配列の長さ
 * @param {Object<string, MigConfEntry[]>} map 対象ユニットのマッピングテーブル
 * @param {Object<string, number[]>} confGlobals map内のキー名 → 実際のconf配列（g_confDataCustomAtk等）
 * @returns {number[]} 長さ length のmig配列（対応の無いスロットは0）
 */
export function migArrayFromConf(length, map, confGlobals) {
    const mig = new Array(length).fill(0);
    for (const globalName of Object.keys(map)) {
        const src = confGlobals[globalName];
        for (const { migIndex, confIndex } of map[globalName]) {
            mig[migIndex] = src[confIndex] ?? 0;
        }
    }
    return mig;
}

/**
 * マッピングテーブルに従い、mig配列の値をconf配列群へ書き戻す（ロード側用）.
 * マップに無い confIndex は触らない（既存挙動の温存。例: confCustomAtk[26]は前回値のまま）。
 * @param {Object<string, MigConfEntry[]>} map 対象ユニットのマッピングテーブル
 * @param {number[]} migArray デコード済みのmig配列
 * @param {Object<string, number[]>} confGlobals map内のキー名 → 書き戻し先のconf配列
 */
export function applyMigArrayToConf(map, migArray, confGlobals) {
    for (const globalName of Object.keys(map)) {
        const dst = confGlobals[globalName];
        for (const { migIndex, confIndex } of map[globalName]) {
            dst[confIndex] = migArray[migIndex];
        }
    }
}
