/**
 * node --check は ESM の重複トップレベル宣言（例: 同名 export function を2回）を
 * 検出しない（構文チェックのみで束縛チェックをしないため）ことが判明した。
 * ESLint の Linter（sourceType: module）は束縛チェックまで行うため、こちらで検証する。
 *
 * 使い方: node validate-parse.mjs <file1> [<file2> ...]
 */
import { readFileSync } from 'node:fs';
import { Linter } from 'eslint';

const files = process.argv.slice(2);
const linter = new Linter();
let hasError = false;

for (const file of files) {
    const code = readFileSync(file, 'utf8');
    const msgs = linter.verify(code, { languageOptions: { ecmaVersion: 2022, sourceType: 'module' }, rules: {} });
    const fatal = msgs.filter(m => m.fatal);
    if (fatal.length) {
        hasError = true;
        console.error(`✗ ${file}`);
        for (const m of fatal) console.error(`  line ${m.line}: ${m.message}`);
    } else {
        console.log(`✓ ${file}`);
    }
}
process.exit(hasError ? 1 : 0);
