import { describe, it, expect } from 'vitest';
import { readFileSync, globSync } from 'node:fs';
import { resolve } from 'node:path';

// CSkillManager.js 系のメソッドブロック内における未宣言変数代入を静的検出するテスト。
//
// 検出対象は下記 WATCHED_VARS に列挙した変数名に限定されている。
// 新たな未宣言変数バグが見つかった場合は WATCHED_VARS に追記すること。
const WATCHED_VARS = [
    'ratio', 'pow', 'atk', 'dmg', 'bonus',
    'val', 'ret', 'result', 'n', 'cnt', 'tmp', 'x', 'y', 'z',
];

const JS_DIR = resolve(__dirname, '../../engine');

// CSkillManager.js の分割（plan: remining-work-md-cskillmanager-js-cskill-magical-elephant）で
// スキル定義本体は roro/m/js/skill/ 配下へ移った（当初はSKILL_ID連番の43ファイル、
// 2026-08-12 に職業ツリー単位の77ファイル・13系統ディレクトリへ再分割
// 〔plan: roro-m-js-skill-https-rotool-gungho-jp-s-glittery-cupcake〕）。分割後の
// CSkillManager.js はアクセサのみのシェルになるため、対象を明示的に glob で拾い直す
// （分割で対象が消えたことに気付けなくなるのを防ぐため、下の TARGETS.length アサートも参照）。
const TARGETS = [
    resolve(JS_DIR, 'CSkillManager.js'),
    resolve(JS_DIR, 'CSkillData.js'),
    ...globSync(`${JS_DIR}/skill/**/*.js`).sort(),
];

interface Violation {
    file: string;
    line: number;
    text: string;
    varName: string;
}

function detectUndeclaredAssignments(target: string): Violation[] {
    const src = readFileSync(target, 'utf8');
    const lines = src.split('\n');
    const violations: Violation[] = [];

    // this.X = function(...){...} と this.X = (...) => {...} / this.X = a => {...} の両方を拾う
    // （旧実装はアロー形式216箇所を取りこぼしていた。CSkillData.js への prototype 化・defineSkill 化で
    // 216箇所とも初期化子内の素の function に包まれる形になったが、監査自体は引き続き両対応させる）。
    const methodRe = /this\.\w+\s*=\s*(?:function|\([^)]*\)\s*=>|\w+\s*=>)/;

    let i = 0;
    while (i < lines.length) {
        if (!methodRe.test(lines[i])) { i++; continue; }

        // 対応する閉じ括弧までブロックを収集
        let depth = 0;
        const blockLines: { text: string; lineNo: number }[] = [];
        let j = i;
        while (j < lines.length) {
            for (const ch of lines[j]) {
                if (ch === '{') depth++;
                if (ch === '}') depth--;
            }
            blockLines.push({ text: lines[j], lineNo: j + 1 });
            if (depth === 0 && j > i) break;
            j++;
        }

        const blockSrc = blockLines.map(l => l.text).join('\n');

        for (const v of WATCHED_VARS) {
            const declRe = new RegExp(`\\b(?:let|var|const)\\s+${v}\\b`);
            const useRe  = new RegExp(`^[\\t ]+${v}\\s*=[^=]`, 'm');
            if (!declRe.test(blockSrc) && useRe.test(blockSrc)) {
                for (const bl of blockLines) {
                    if (new RegExp(`^[\\t ]+${v}\\s*=[^=]`).test(bl.text)) {
                        violations.push({ file: target, line: bl.lineNo, text: bl.text.trim(), varName: v });
                    }
                }
            }
        }

        i = j + 1;
    }

    return violations;
}

describe('CSkillManager.js 系', () => {
    it('分割後も監査対象ファイルが残っている（77グループ + CSkillManager.js + CSkillData.js）', () => {
        expect(TARGETS.length).toBeGreaterThanOrEqual(79);
    });

    describe('スコープ監査: メソッドブロック内の未宣言変数代入', () => {
        it('監視対象変数がすべてブロック内で宣言されている', () => {
            const violations = TARGETS.flatMap((t) => detectUndeclaredAssignments(t));
            const report = violations
                .map(v => `  ${v.file}:${v.line}: ${v.text}  [未宣言: ${v.varName}]`)
                .join('\n');
            expect(violations, `未宣言変数の代入が検出されました:\n${report}`).toHaveLength(0);
        });
    });
});
