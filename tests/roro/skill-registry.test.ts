/**
 * スキル定義レジストリの採番不変条件（旧 util/skill/verify_skill_ids.py の後継）。
 *
 * CSkillManager.js の分割（.claude/context/remaining-work.md「着手可能な小タスク」由来、
 * plan: remining-work-md-cskillmanager-js-cskill-magical-elephant）で skillId カウンターが
 * 廃止され、`engine/skill/NN-*.js` 各ファイルの `defineSkill(SKILL_ID_X, function(){...})`
 * が明示的に ID を持つようになった。カウンター採番とマーカーの整合を検証していた旧スクリプトは
 * 意味を失った（カウンターが無いので「マーカー0件・不整合0件」という偽の緑を返す）ため削除し、
 * 後継として「重複なし・欠番なし」を検証する。
 *
 * 2026-08-12: skill/ を SKILL_ID 連番分割（43ファイル）から職業ツリー単位（77ファイル・
 * 13系統ディレクトリ）へ再分割（tests/split-skill-by-job.mjs、plan:
 * roro-m-js-skill-https-rotool-gungho-jp-s-glittery-cupcake）。「各ファイルの定義ID集合が
 * 割当表（skill-job-assignment.json、公式サイトからの機械抽出+手動検証）と完全一致する」
 * 検証を追加した（旧不変条件より強い）。
 *
 * ファイル内の並び順（ID昇順）は要求しない: CSkillManager.Init() は `skillData.id` を
 * キーに `dataArray` へ格納するため実行順序に依存せず、強制すると将来のスキル追加・
 * 職業間の移動の自由度を不必要に下げるだけ（2026-08-12 人手分類修正時にユーザーが明示）。
 * 唯一の実害である「コピペ時に同じブロックを二重に貼ってしまう」事故だけを、
 * ファイル内マーカー重複チェックで検知する。
 *
 * 純粋なテキスト解析（vitest の SSR ローダーで CSkillManager.js 系を import すると
 * 循環 import でハングするため。tests/roro/CSkillManager.scope.test.ts と同じ理由）。
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, globSync } from 'node:fs';
import { resolve, relative } from 'node:path';

const JS_DIR = resolve(__dirname, '../../engine');
const SKILL_DIR = `${JS_DIR}/skill`;
// B-19（残件台帳。engine/トップレベルのドメイン別再配置）で CSkillManager.js/CSkillData.js/
// skill.dat.js 等11ファイルが engine/skill/ 直下へ合流したため、`**/*.js` のままだと
// それらも拾ってしまう（77本のはずが88本になる）。職業ツリーの77ファイルは必ず
// `skill/<系統>/<ファイル>.js` の2階層目にあるので、`*/*.js` で1階層深いものだけに絞る。
const files = globSync(`${SKILL_DIR}/*/*.js`).sort();

const consts = new Map<string, number>();
for (const m of readFileSync(`${JS_DIR}/skill/skill.dat.js`, 'utf8')
        .matchAll(/^export const (SKILL_ID_\w+)\s*=\s*(-?\d+);/gm)) {
    consts.set(m[1], Number(m[2]));
}

/** skillId(文字列) -> "系統/ファイル名"（拡張子なし）。公式職業ツリーからの機械抽出+手動検証。 */
const assignment: Record<string, string> = JSON.parse(
    readFileSync(resolve(__dirname, 'skill-job-assignment.json'), 'utf8'),
);

interface Defined { file: string; key: string; name: string }
const defined: Defined[] = [];
for (const f of files) {
    const key = relative(SKILL_DIR, f).replace(/\.js$/, '').split('\\').join('/'); // 例: "swordman/2b-crusader"
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(/^\t\tdefineSkill\((SKILL_ID_\w+), function\(\) \{$/gm)) {
        defined.push({ file: relative(SKILL_DIR, f), key, name: m[1] });
    }
}

describe('スキル定義レジストリの採番不変条件（旧 util/skill/verify_skill_ids.py）', () => {
    it('職業ツリーのファイルが77本ある（13系統ディレクトリ）', () => {
        expect(files.length).toBe(77);
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

    it('ファイル内に同じマーカーの重複が無い（コピペ時の配列破損検知）', () => {
        const byFile = new Map<string, string[]>();
        for (const d of defined) {
            const names = byFile.get(d.file) ?? [];
            names.push(d.name);
            byFile.set(d.file, names);
        }
        const dupes: string[] = [];
        for (const [file, names] of byFile) {
            const seen = new Set<string>();
            for (const n of names) {
                if (seen.has(n)) dupes.push(`${file}:${n}`);
                seen.add(n);
            }
        }
        expect(dupes).toEqual([]);
    });

    it('各ファイルの定義ID集合が職業割当表（skill-job-assignment.json）と完全一致する', () => {
        const mismatches: string[] = [];
        for (const d of defined) {
            const id = consts.get(d.name)!;
            const expectedKey = assignment[String(id)];
            if (expectedKey === undefined) {
                mismatches.push(`${d.name}(id=${id}): 割当表に存在しない`);
            } else if (expectedKey !== d.key) {
                mismatches.push(`${d.name}(id=${id}): 割当表は "${expectedKey}" だが実際は "${d.key}"`);
            }
        }
        expect(mismatches).toEqual([]);
    });

    it('割当表の全1396件がいずれかのファイルに存在する（割当表→実ファイルの逆方向網羅性）', () => {
        const definedIds = new Set(defined.map((d) => consts.get(d.name)!));
        const missing = Object.keys(assignment).filter((idStr) => !definedIds.has(Number(idStr)));
        expect(missing).toEqual([]);
    });
});
