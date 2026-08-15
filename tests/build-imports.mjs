/**
 * 自由変数リストを、出典ファイルの import 文から引いてグループ化した import 文に変換する。
 *
 * 巨大ファイル分割（foot.js/head.js、.claude/context/remaining-work.md「残作業 1」）で
 * 新ファイルを組み立てる際、find-free-vars.mjs が出した自由変数リストと元ファイル
 * （分割元。まだ import 文が残っている状態のもの）を渡すと、各識別子がどの
 * import 文から来ているかを引いて新ファイル用の import 文を出力する。
 *
 * 使い方:
 *   node find-free-vars.mjs body.js > freevars.txt
 *   node build-imports.mjs ../roro/m/js/foot.js freevars.txt
 *
 * 見つからない識別子（元ファイルの import 文に無い = モジュールレベル変数や関数など）は
 * stderr に "NOT FOUND" として出す。個別に出典を確認して手で import 文を足すこと。
 */
import { readFileSync } from 'node:fs';
import { Linter } from 'eslint';

const [, , targetFile, freeVarsFile] = process.argv;
if (!targetFile || !freeVarsFile) {
    console.error('使い方: node build-imports.mjs <分割元.js> <自由変数リスト.txt>');
    process.exit(2);
}
const code = readFileSync(targetFile, 'utf8');
const freeVars = readFileSync(freeVarsFile, 'utf8').split('\n').map(s => s.trim()).filter(Boolean);

const specMap = new Map();
const linter = new Linter();
linter.verify(code, {
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
    plugins: {
        collect: {
            rules: {
                collect: {
                    create() {
                        return {
                            ImportDeclaration(node) {
                                const source = node.source.value;
                                for (const spec of node.specifiers) {
                                    if (spec.type === 'ImportSpecifier') {
                                        specMap.set(spec.local.name, { source, imported: spec.imported.name });
                                    } else if (spec.type === 'ImportDefaultSpecifier') {
                                        specMap.set(spec.local.name, { source, imported: 'default' });
                                    } else if (spec.type === 'ImportNamespaceSpecifier') {
                                        specMap.set(spec.local.name, { source, imported: '*' });
                                    }
                                }
                            },
                        };
                    },
                },
            },
        },
    },
    rules: { 'collect/collect': 'error' },
});

const bySource = new Map();
const notFound = [];
for (const v of freeVars) {
    const info = specMap.get(v);
    if (!info) { notFound.push(v); continue; }
    if (!bySource.has(info.source)) bySource.set(info.source, []);
    bySource.get(info.source).push(info.imported === v ? v : `${info.imported} as ${v}`);
}

const sources = [...bySource.keys()].sort();
for (const src of sources) {
    const names = bySource.get(src).sort();
    if (names.join(', ').length + src.length < 100) {
        console.log(`import { ${names.join(', ')} } from '${src}';`);
    } else {
        console.log(`import {`);
        let line = '    ';
        for (const n of names) {
            if ((line + n + ', ').length > 118) { console.log(line.replace(/, $/, ',')); line = '    '; }
            line += n + ', ';
        }
        if (line.trim()) console.log(line.replace(/, $/, ''));
        console.log(`} from '${src}';`);
    }
}
if (notFound.length) {
    console.error('NOT FOUND:', notFound.join(', '));
}
