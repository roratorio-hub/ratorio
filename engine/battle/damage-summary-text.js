/**
 * 与ダメージ欄の表示テキスト生成（依存ゼロ・DOM を触らない純粋関数）.
 *
 * 入力配列の各要素は `CBattleCalcResult._GetDamageSummaryKM()` が返す
 * `[分割後ダメージ, 分割ヒット数, 多段ヒット数]`。分割ヒット数が 1 を超えるスキル
 * （天星の3分割など）では第0要素が分割数で割られた値になっているため、総量を出すには
 * 分割ヒット数と多段ヒット数の**両方**を掛け戻す必要がある。
 *
 * 配列が複数要素になるのは追撃・オートスペルがある場合で、先頭が主撃。
 */

/**
 * サイクル数（設置スキルのダメージ発生回数）を 1 以上の有限な数へ丸める.
 * 非設置スキルでは持続時間・発生間隔が 0 のため NaN / Infinity / 0 が渡りうる.
 * @param {number} counts サイクル数
 * @returns {number} 1 以上の有限な数
 */
export function NormalizeCycleCount(counts) {
    if (!Number.isFinite(counts) || counts < 1) {
        return 1;
    }
    return counts;
}

/**
 * ヒット数を 0 より大きい数へ正規化する.
 * スキル定義はヒット数が不定であることを -1 で表し、クリティカル率が 0 のときは 0 が入る。
 * いずれも 1 ヒット扱いにする。1 未満の小数（0.5 など）はそのまま通す。
 * @param {number} hitCount ヒット数
 * @returns {number} 0 より大きい数
 */
export function NormalizeHitCount(hitCount) {
    return (hitCount > 0) ? hitCount : 1;
}

/**
 * 1要素分の実ダメージ（分割・多段を掛け戻した値）を求める.
 * @param {Array} entry `[分割後ダメージ, 分割ヒット数, 多段ヒット数]`
 * @param {number} cycleCount 正規化済みサイクル数
 * @returns {number} 実ダメージ
 */
function totalOfEntry(entry, cycleCount) {
    let dmg = entry[0] * cycleCount;
    dmg *= (entry[1] > 1) ? entry[1] : 1;
    dmg *= NormalizeHitCount(entry[2]);
    return dmg;
}

/**
 * 配列全体の実ダメージ合計を1つのテキストにする（合計表示セル用）.
 * @param {Array} dmgArray 概算ダメージ配列
 * @param {Function} funcDig 数値整形関数
 * @param {*} funcDigParam 数値整形関数の第2引数
 * @param {number} [counts] サイクル数（省略時は 1）
 * @returns {*} 整形済みテキスト
 */
export function GetSumDmgText(dmgArray, funcDig, funcDigParam, counts) {
    const cycleCount = NormalizeCycleCount(counts);
    const sum = dmgArray.reduce(
        (acc, cur) => acc + totalOfEntry(cur, cycleCount),
        0
    );
    return funcDig(sum, funcDigParam);
}

/**
 * 内訳テキスト（`"4,383 × 3 hits × 2 Hits"` 形式）を返す（詳細表示セル用）.
 * 小文字 hits が分割ヒット数、大文字 Hits が多段ヒット数.
 * @param {Array} dmgArray 概算ダメージ配列
 * @param {Function} funcDig 数値整形関数
 * @param {*} funcDigParam 数値整形関数の第2引数
 * @returns {string} 内訳テキスト（追撃があれば " + " 連結）
 */
export function GetJoinDmgText(dmgArray, funcDig, funcDigParam) {
    return dmgArray.reduce(
        (acc, cur) => {

            let text = "";

            if (acc.length > 0) {
                text = " + ";
            }

            text += funcDig(cur[0], funcDigParam);

            if (cur[1] > 1) {
                text += " × " + cur[1] + " hits";
            }

            if (cur[2] !== 1) {
                text += " × " + cur[2] + " Hits";
            }

            return (acc + text);
        },
        ""
    );
}

/**
 * サイクル数まで掛けた実ダメージのテキストを返す（1サイクルダメージ欄の詳細表示セル用）.
 * @param {Array} dmgArray 概算ダメージ配列
 * @param {Function} funcDig 数値整形関数
 * @param {*} funcDigParam 数値整形関数の第2引数
 * @param {number} [counts] サイクル数（省略時は 1）
 * @returns {string} 実ダメージのテキスト（追撃があれば " + " 連結）
 */
export function GetJoinDmgText2(dmgArray, funcDig, funcDigParam, counts) {
    const cycleCount = NormalizeCycleCount(counts);
    return dmgArray.reduce(
        (acc, cur) => {

            let text = String(funcDig(totalOfEntry(cur, cycleCount), funcDigParam));

            if (acc.length > 0) {
                text = " + " + text;
            }

            return (acc + text);
        },
        ""
    );
}
