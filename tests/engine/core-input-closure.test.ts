/**
 * B-09 Phase 0 のガードテスト。
 *
 * `analyze-core-input-closure.mjs`（tests/ 直下。Coreエントリの `import()` を要さない
 * 純粋な静的解析なので `execFileSync` で呼ぶ。engine全域のASTを毎回舐めるため約10秒かかる
 * ——skill-registry.test.ts 等と同じ「生成物の不変条件をスクリプトで検証する」パターンだが、
 * こちらはロジックが大きく別ファイル化されているため import ではなく子プロセス実行にした）が
 * 検出する「(A) 確定 隠れ入力」（`calcFromModel()` チェーンが読むのに
 * `HydrateFromModel` が書かず、Core内でも書かれない変数）のリストを、
 * 2026-08-29 Phase 0 完了時点のベースラインでスナップショットする。
 *
 * Phase 2 が1グループずつモデルへ追加するたびに、対応する変数がこのリストから
 * 消えていくのが期待される進み方（減るのはOK、増えたら fail）。
 * 増えた場合は新しく発見された隠れ入力を意味し、Phase 2 のモデル化対象に
 * 追加する判断が必要になる（このテストはその検知だけを行い、判断はしない）。
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

// engine全域のASTを舐めるため実測約10秒/回かかる。beforeAllで1回だけ実行して両テストで使い回す。
const ANALYZER_TIMEOUT = 30000;

const SCRIPT = resolve(__dirname, '../analyze-core-input-closure.mjs');
const CWD = resolve(__dirname, '..');

// 2026-08-29 Phase 0 完了時点のベースライン（analyze-core-input-closure.mjs --json の
// hiddenInput）。Phase 2 でグループを1つ潰すごとに、ここから対応する項目を削除すること
// （台帳・設計docの更新と同じタイミングで）。
const BASELINE_HIDDEN_INPUT = [
    'g_bonusStatus',
    'g_confDataDebuff',
    'g_confDataIchizi',
    'g_confDataNizi',
    'g_confDataSanzi',
    'g_confDataYozi',
    'g_objCharaConfCustomAtk',
    'g_objCharaConfCustomDef',
    'g_objCharaConfCustomSkill',
    'g_objCharaConfCustomSpecStatus',
    'g_objCharaConfCustomStatus',
    'g_pureStatus',
    'g_timeItemConf',
    'g_timeItemConfEffective',
    'n_AS_DMG',
    'n_AS_DMG_OverHP',
    'n_A_JOB',
    'n_A_LearnedSkill',
    'n_B_IJYOU',
    'n_B_KYOUKA',
    'n_B_TAISEI',
    'n_Nitou',
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
