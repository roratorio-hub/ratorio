/**
 * スキル定義レジストリの採番不変条件（旧 util/skill/verify_skill_ids.py の後継）。
 *
 * CSkillManager.js の分割（.claude/context/remaining-work.md「着手可能な小タスク」由来、
 * plan: remining-work-md-cskillmanager-js-cskill-magical-elephant）で skillId カウンターが
 * 廃止され、`roro/m/js/skill/NN-*.js` 各ファイルの `defineSkill(SKILL_ID_X, function(){...})`
 * が明示的に ID を持つようになった。カウンター採番とマーカーの整合を検証していた旧スクリプトは
 * 意味を失った（カウンターが無いので「マーカー0件・不整合0件」という偽の緑を返す）ため削除し、
 * 後継として「重複なし・欠番なし・ID昇順」を検証する。
 *
 * 純粋なテキスト解析（vitest の SSR ローダーで CSkillManager.js 系を import すると
 * 循環 import でハングするため。tests/roro/CSkillManager.scope.test.ts と同じ理由）。
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, globSync } from 'node:fs';
import { resolve, basename } from 'node:path';

const JS_DIR = resolve(__dirname, '../../roro/m/js');
const files = globSync(`${JS_DIR}/skill/*.js`).sort();

const consts = new Map<string, number>();
for (const m of readFileSync(`${JS_DIR}/skill.dat.js`, 'utf8')
        .matchAll(/^export const (SKILL_ID_\w+)\s*=\s*(-?\d+);/gm)) {
    consts.set(m[1], Number(m[2]));
}

interface Defined { file: string; name: string }
const defined: Defined[] = [];
for (const f of files) {
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(/^\t\tdefineSkill\((SKILL_ID_\w+), function\(\) \{$/gm)) {
        defined.push({ file: basename(f), name: m[1] });
    }
}

describe('スキル定義レジストリの採番不変条件（旧 util/skill/verify_skill_ids.py）', () => {
    it('グループファイルが43本ある', () => {
        expect(files.length).toBe(43);
    });

    it('定義数が skill.dat.js の SKILL_ID_* 定数の個数と一致する', () => {
        expect(defined.length).toBe(consts.size);
    });

    it('定義数が 1396', () => {
        expect(defined.length).toBe(1396);
    });

    it('全マーカーに対応する export const が skill.dat.js に存在する', () => {
        const notFound = defined.filter((d) => !consts.has(d.name)).map((d) => `${d.file}:${d.name}`);
        expect(notFound).toEqual([]);
    });

    it('ID の重複が無く 0..1395 を過不足なく埋める', () => {
        const ids = defined.map((d) => consts.get(d.name)!);
        expect(new Set(ids).size).toBe(ids.length); // 重複なし
        expect([...ids].sort((a, b) => a - b)).toEqual(
            Array.from({ length: 1396 }, (_, i) => i),
        ); // 欠番なし
    });

    it('ファイル順・ファイル内順ともに ID 昇順（＝並び替え禁止）', () => {
        const ids = defined.map((d) => consts.get(d.name)!);
        expect(ids).toEqual([...ids].sort((a, b) => a - b));
    });
});
