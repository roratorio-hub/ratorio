/**
 * 再計算の起動ポリシー（リファクタリング計画 Phase 9）。
 *
 * 旧 `AutoCalc(callFrom)`（head.js）は「誰が呼んだか」を表すマジック文字列15種＋
 * 引数なし呼び出し（16箇所）で再計算の要否を判定していた。本モジュールは
 * 「何が変わったか」（`CalcInput`）へ置き換える。
 *
 * D1: `AutoCalc(callFrom)` を本モジュールへ委譲するシムに縮小した（完了）。
 * D2: 呼び出し側31箇所を `AutoCalc("文字列")` → `notifyChanged(CalcInput.X)` に置き換えた（完了）。
 * D3: 再計算ポリシーの読み出し元をDOM（`OBJID_INPUT_ATTACK_METHOD_AUTO_CALC`）から
 *     savedata prop（`CSaveController.getSettingProp(propNameAttackAutoCalc)`）へ移す（完了）。
 * D4: `onResults()` を実際に配線した。`calc()`（head.js）が `battleCalcResultAll` を
 *     返すようになったため、`notifyChanged`/`requestRecalc`/`withBatch` 経由の再計算の
 *     たびに登録済みコールバックへ配信する（完了。残件台帳 B-10）。
 * D5（本コミット）: D1で導入した `LEGACY_CALL_FROM_MAP`/`notifyChangedLegacy`（旧文字列→kind
 *     変換シム）を撤去した。D2で内部呼び出し側の移行は完了しており、リポジトリ全体を
 *     検索しても `AutoCalc(callFrom)` を文字列付きで呼ぶ箇所は無かった（唯一の実呼び出し元
 *     `workspace/src/rtxApiImport.ts` も常に引数なしで呼ぶ）。ヘッダーコメント自身が
 *     「D2完了後に撤去する」と予告していた通りの後始末。`AutoCalc()` は `notifyChanged(undefined)`
 *     を直接呼ぶだけになった。
 *
 * ⚠️ D3着手前に調査した「真実の源が2つある」問題について: 実際には既にDOM要素側が
 *     savedata prop の**鏡**として設計されていた（`CAttackMethodAreaComponentManager.js`
 *     の `RebuildSettingArea()` が savedata prop → DOM、`OnChangeAutoCalc()` が
 *     DOM → savedata prop の一方向ずつを担い、常に同期させる作り）。デシンクは発生しない設計。
 *     唯一の実際のリスクは、savedata prop が未初期化（`CSaveController` 内部の
 *     `#settingDataUnit` が null）の場合に `getSettingProp` が `undefined` を返すこと
 *     （`OBJID_SAVE_BLOCK_MIG` 要素を持たないページでは `LoadSettingFromLocalStorageMIG()`
 *     自体が呼ばれないため発生しうる。`engine/foot.js:1788-1790` 参照）。
 *     `readAutoCalcFlag()` 側で `?? 0` により、DOM版の `HtmlGetObjectValueByIdAsInteger`
 *     の第2引数（デフォルト値0）と同じフォールバックを再現する。
 *
 * ⚠️ ポリシーの意味（`head.js` の旧実装を精査して確定した仕様。書き換え時に変えない）:
 *   - flag=0: CHARA/BUFF/MOB/DISPLAY のいずれかの変更でのみ再計算（攻撃手段の変更では再計算しない）
 *   - flag=1: 上記に加えて ATTACK_METHOD の変更でも再計算する（flag=1 のポリシーは flag=0 を包含する。
 *     旧実装の `case 1` に `break` が無く `case 0` のブロックへフォールスルーしていたのはこの意図）
 *   - flag=2: 常に再計算しない
 *   - flag=3: 何が変わったか（kind）に関わらず常に再計算する
 *   - kind が未指定（旧実装で「未知の callFrom」や引数なし呼び出しに相当）: flag=3 のときのみ再計算する。
 *     旧実装のJSDocは引数なし呼び出しを「基本ステータス、特性ステータス、装備」の変更として
 *     文書化しているが、実装は他の11文字列と同様の判定に**含めていなかった**（=この分類の
 *     再計算はflag=3の場合のみで、flag=0/1では発火しない）。ドキュメントと実装が食い違っているが、
 *     「期待差分ゼロ」の原則により実装の動作をそのまま踏襲する（ドキュメント側の意図を汲んで
 *     CHARA 扱いにすると、flag=0/1のユーザーで新たに再計算が走るようになり、挙動が変わってしまう）。
 */
import { calc } from "./head-bridge.js";
import { get as registryGet } from "./engine-registry.js";
import { CSaveDataConst } from "./savedata/CSaveDataConst.js";

/**
 * 再計算のトリガー種別。`AutoCalc(callFrom)` の文字列に代わり「何が変わったか」を表す。
 */
export const CalcInput = Object.freeze({
    /** 攻撃手段（スキル・オプション）の変更 */
    ATTACK_METHOD: 'attackMethod',
    /** キャラクターの性能設定（性能カスタマイズ・修得スキル表示）の変更 */
    CHARA: 'chara',
    /** バフパネル・オートスペル・アイテム時限効果の変更 */
    BUFF: 'buff',
    /** モンスター設定（状態異常/状態強化/対人）の変更 */
    MOB: 'mob',
    /** 表示のみに関わる変更。現状マップされる呼び出し元はない（将来の拡張用） */
    DISPLAY: 'display',
});

/**
 * 現在の自動計算ポリシーのflag値を読む。`CAttackMethodAreaComponentManager.js` の
 * `RebuildSettingArea()`/`OnChangeAutoCalc()` がDOM要素と双方向に同期させているため、
 * savedata prop を読めばDOM要素と常に同じ値が得られる（詳細はファイル冒頭コメント参照）。
 * `getSettingProp` が `undefined` を返す場合（savedata prop 未初期化）は
 * 旧DOM実装のデフォルト値 0 にフォールバックする。
 */
function readAutoCalcFlag() {
    // getSettingProp は savedata のプロパティ格納規約（CSaveDataUnitBase.setProp が
    // toSafeBigInt() を通す）により BigInt を返す。shouldRecalc() の switch 文は
    // Number リテラルの case と比較するため（BigInt === Number は常に false で
    // strict equality が成立しない）、ここで明示的に Number へ変換する。
    const value = registryGet('CSaveController')?.getSettingProp(CSaveDataConst.propNameAttackAutoCalc);
    return value === undefined ? 0 : Number(value);
}

/**
 * 現在の自動計算ポリシー（`readAutoCalcFlag()`）と `kind` から、再計算すべきかを判定する。
 * 旧 `AutoCalc` の switch 文と等価（ヘッダーコメントの仕様表を参照）。
 * @param {number} autoCalcFlag
 * @param {string|undefined} kind
 * @returns {boolean}
 */
function shouldRecalc(autoCalcFlag, kind) {
    switch (autoCalcFlag) {
        case 1:
            return kind !== undefined;
        case 0:
            return kind !== undefined && kind !== CalcInput.ATTACK_METHOD;
        case 3:
            return true;
        case 2:
        default:
            return false;
    }
}

let batchDepth = 0;
let batchHadNotify = false;

const resultListeners = new Set();

/**
 * `calc()` を呼び、戻り値（`battleCalcResultAll`）を `onResults` の登録先へ配信する。
 * `notifyChanged`/`requestRecalc`/`withBatch` の実際の再計算はすべてここを通す。
 */
function callCalcAndNotifyResults() {
    const result = calc();
    for (const cb of resultListeners) cb(result);
}

/**
 * 何が変わったかを通知する。`AutoCalc(callFrom)` の後継。
 * `withBatch()` の実行中に呼ばれた場合は即時計算せず、バッチの終了までまとめる。
 * @param {string|undefined} kind `CalcInput` のいずれか。旧実装で未知だった呼び出し元と
 *   互換の挙動が必要な場合のみ省略する（flag=3 のときのみ再計算される）。
 */
export function notifyChanged(kind) {
    if (batchDepth > 0) {
        batchHadNotify = true;
        return;
    }
    if (shouldRecalc(readAutoCalcFlag(), kind)) {
        callCalcAndNotifyResults();
    }
}

/**
 * ポリシーを無視して無条件に再計算する。UI以外の呼び出し元（プログラム的な再計算要求）向け。
 * `withBatch()` の実行中に呼ばれた場合は即時計算せず、バッチの終了までまとめる
 * （`notifyChanged` と同様。バッチ中に無条件再計算が要求されたことを記録するだけで良い）。
 */
export function requestRecalc() {
    if (batchDepth > 0) {
        batchHadNotify = true;
        return;
    }
    callCalcAndNotifyResults();
}

/**
 * `fn` の実行中に発生した `notifyChanged`/`requestRecalc` 呼び出しをまとめ、
 * `fn` 完了後に高々1回だけ再計算する（1回でも通知があれば、ポリシーに関わらず再計算する。
 * 大量のDOMイベントを1回にまとめる用途のため、ポリシーで黙って消えると復元漏れになりうる）。
 * ネスト呼び出しに対応（最も外側の `withBatch` が終わるまで実際の再計算を遅延する）。
 * @param {() => void} fn
 */
export function withBatch(fn) {
    batchDepth++;
    try {
        fn();
    } finally {
        batchDepth--;
        if (batchDepth === 0 && batchHadNotify) {
            batchHadNotify = false;
            callCalcAndNotifyResults();
        }
    }
}

/**
 * 再計算結果の通知を受け取るコールバックを登録する（描画層の接続点）。
 * `calc()` が返す `battleCalcResultAll`（`calc-headless.js` の `calcFromModel()` と同じ形）を、
 * `notifyChanged`/`requestRecalc`/`withBatch` 経由で実際に再計算が起きるたびに配信する
 * （ポリシーにより再計算がスキップされた場合は発火しない。`withBatch` はまとめて高々1回）。
 * @param {(result: object) => void} cb `battleCalcResultAll` を受け取るコールバック
 * @returns {() => void} 登録解除関数
 */
export function onResults(cb) {
    resultListeners.add(cb);
    return () => resultListeners.delete(cb);
}
