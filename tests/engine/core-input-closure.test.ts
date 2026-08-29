/**
 * B-09 Phase 0 のガードテスト。
 *
 * `analyze-core-input-closure.mjs`（tests/ 直下。Coreエントリの `import()` を要さない
 * 純粋な静的解析なので `execFileSync` で呼ぶ。engine全域のASTを毎回舐めるため約10秒かかる
 * ——skill-registry.test.ts 等と同じ「生成物の不変条件をスクリプトで検証する」パターンだが、
 * こちらはロジックが大きく別ファイル化されているため import ではなく子プロセス実行にした）が
 * 検出する「(A) 確定 隠れ入力」（`calcFromModel()` チェーンが読むのに
 * `HydrateFromModel` が書かず、Core内でも書かれない変数）のリストを、ベースラインで
 * スナップショットする。
 *
 * Phase 2（2026-08-30完了）で22件中20件をモデル化し解消。残る2件
 * （`n_AS_DMG`/`n_AS_DMG_OverHP`）は分析ツール自体の誤検出と判明済み
 * （Core内で完結する正規のスクラッチ変数。`analyze-core-input-closure.mjs`冒頭の
 * 「既知の限界」参照）——モデル化不要のためベースラインとして残置する。
 *
 * 新規の変数がこのリストに増えたら fail する（新しい隠れ入力の発見、または
 * 分析ツールの別の誤検出のどちらか。要調査）。減るのは常に歓迎（さらなる
 * 誤検出の解消や、将来の再修正で判明した場合）。
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

// engine全域のASTを舐めるため実測約10秒/回かかる。beforeAllで1回だけ実行して両テストで使い回す。
const ANALYZER_TIMEOUT = 30000;

const SCRIPT = resolve(__dirname, '../analyze-core-input-closure.mjs');
const CWD = resolve(__dirname, '..');

// Phase 2完了時点のベースライン（analyze-core-input-closure.mjs --json の hiddenInput）。
// 2件とも分析ツールの誤検出と確認済み（上記コメント参照）。
const BASELINE_HIDDEN_INPUT = [
    'n_AS_DMG',
    'n_AS_DMG_OverHP',
].sort();

function runAnalyzer(): {
    hiddenInput: string[];
    scratchCandidate: string[];
    covered: string[];
} {
    const stdout = execFileSync('node', [SCRIPT, '--json'], { cwd: CWD, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
    return JSON.parse(stdout);
}

describe('B-09 Phase 0: Core入力閉包（隠れ入力の増加検知）', () => {
    let result: ReturnType<typeof runAnalyzer>;
    beforeAll(() => { result = runAnalyzer(); }, ANALYZER_TIMEOUT);

    it('(A)確定隠れ入力は、Phase 0完了時点のベースラインを超えて増えない', () => {
        const current = [...result.hiddenInput].sort();
        const newlyAppeared = current.filter((v) => !BASELINE_HIDDEN_INPUT.includes(v));

        // 新規発見はエラー（Core側の変更で新しい暗黙依存が生まれた可能性がある）。
        // 減少（Phase 2でモデル化済みになった）は許容するので exact match ではなく
        // 「ベースラインの superset にならない」ことだけを見る。
        expect(newlyAppeared, `新しい隠れ入力が検出された: ${newlyAppeared.join(', ')}\n` +
            'HydrateFromModel/calc-model.js への追加漏れ、またはこのテストのBASELINE更新が必要。').toEqual([]);
    }, ANALYZER_TIMEOUT);

    it('ベースラインのうちモデル化済みになった項目があれば、そのぶんだけ減っている（情報表示のみ・失敗しない）', () => {
        const stillHidden = new Set(result.hiddenInput);
        const resolved = BASELINE_HIDDEN_INPUT.filter((v) => !stillHidden.has(v));
        if (resolved.length) {
            // eslint-disable-next-line no-console
            console.log(`Phase 2でモデル化済みと判定された項目(BASELINE_HIDDEN_INPUT更新を検討): ${resolved.join(', ')}`);
        }
        // covered に移っているはず（またはCore側の変更で untracked になった可能性もあるため厳密比較はしない）
        expect(Array.isArray(result.covered)).toBe(true);
    }, ANALYZER_TIMEOUT);
});
