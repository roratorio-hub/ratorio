import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// CSkillManager.js のメソッドブロック内における未宣言変数代入を静的検出するテスト。
//
// 検出対象は下記 WATCHED_VARS に列挙した変数名に限定されている。
// 新たな未宣言変数バグが見つかった場合は WATCHED_VARS に追記すること。
const WATCHED_VARS = [
    'ratio', 'pow', 'atk', 'dmg', 'bonus',
    'val', 'ret', 'result', 'n', 'cnt', 'tmp', 'x', 'y', 'z',
];

const TARGET = resolve(__dirname, '../../roro/m/js/CSkillManager.js');

interface Violation {
    line: number;
    text: string;
    varName: string;
}

function detectUndeclaredAssignments(): Violation[] {
    const src = readFileSync(TARGET, 'utf8');
    const lines = src.split('\n');
    const violations: Violation[] = [];

    const methodRe = /this\.\w+\s*=\s*function/;

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
                        violations.push({ line: bl.lineNo, text: bl.text.trim(), varName: v });
                    }
                }
            }
        }

        i = j + 1;
    }

    return violations;
}

describe('CSkillManager.js', () => {
    describe('スコープ監査: メソッドブロック内の未宣言変数代入', () => {
        it('監視対象変数がすべてブロック内で宣言されている', () => {
            const violations = detectUndeclaredAssignments();
            const report = violations
                .map(v => `  line ${v.line}: ${v.text}  [未宣言: ${v.varName}]`)
                .join('\n');
            expect(violations, `未宣言変数の代入が検出されました:\n${report}`).toHaveLength(0);
        });
    });
});
