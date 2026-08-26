/**
 * integration テスト共有ヘルパー: 静的ファイルサーバー・全 OBJID_* スナップショット・差分整形。
 *
 * 出自: integration/calcx.test.ts のスイート3（セーブデータ復元比較・本番 vs ローカル）で
 * 実装されたロジックを、巨大ファイル分割（foot.js/head.js）の before/after 差分ハーネス
 * （integration/split-regression.test.ts）でも再利用するために切り出したもの。
 * ロジック自体は変更していない（コピー＋ import 差し替えのみ）。
 *
 * 参照: .claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」
 */
import { createServer, type Server } from 'node:http';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import type { Page } from 'playwright';

// ─── 静的ファイルサーバー ────────────────────────────────────────────────────

const CONTENT_TYPES: Record<string, string> = {
    '.html': 'text/html; charset=utf-8',
    '.js':   'text/javascript; charset=utf-8',
    '.mjs':  'text/javascript; charset=utf-8',
    '.css':  'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.yaml': 'text/yaml; charset=utf-8',
    '.yml':  'text/yaml; charset=utf-8',
    '.png':  'image/png',
    '.gif':  'image/gif',
    '.jpg':  'image/jpeg',
    '.svg':  'image/svg+xml',
    '.woff2':'font/woff2',
    '.woff': 'font/woff',
    '.ttf':  'font/ttf',
};

/** root 配下を配信する静的ファイルサーバーを作る（listen はしない）。 */
export function createStaticServer(root: string): Server {
    return createServer((req, res) => {
        const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
        const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
        const filePath = join(root, safe);
        if (!filePath.startsWith(root) || !existsSync(filePath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`Not found: ${urlPath}`);
            return;
        }
        const ext = extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': CONTENT_TYPES[ext] ?? 'application/octet-stream' });
        createReadStream(filePath).pipe(res);
    });
}

/** root 配下を配信する静的ファイルサーバーを起動し、baseUrl を返す。 */
export async function startStaticServer(root: string): Promise<{ server: Server; baseUrl: string }> {
    const server = createStaticServer(root);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const addr = server.address();
    const port = typeof addr === 'object' && addr !== null ? addr.port : 0;
    return { server, baseUrl: `http://127.0.0.1:${port}` };
}

/** listen 済みサーバーを閉じる（beforeAll/afterAll でのエラー握りつぶし用）。 */
export function closeServer(server: Server | undefined): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!server) { resolve(); return; }
        server.close((err) => (err ? reject(err) : resolve()));
    });
}

// ─── セーブデータフィクスチャ読み込み ───────────────────────────────────────────

export type FixtureEntry = { label: string; url: string; query: string };

/** フィクスチャファイル（1行1URL、#はコメント）から本番URLのリストを読み込む。 */
export function loadSaveDataEntries(filePath: string, prefix: string): FixtureEntry[] {
    if (!existsSync(filePath)) return [];
    return readFileSync(filePath, 'utf-8')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith('#'))
        .map((url, i) => {
            const qi = url.indexOf('?');
            return { label: `${prefix}[${i}]`, url, query: qi >= 0 ? url.slice(qi + 1) : '' };
        })
        .filter(({ query }) => query.length > 0);
}

// ─── 全 OBJID_* スナップショット ────────────────────────────────────────────────

/**
 * 全セクション・全設定欄を展開する。
 *
 * Pass 1–2: folding-switch-MIG（calcx.html にハードコードされた CSS折りたたみ開閉スイッチ）
 *   - 2パス実行でネストしたセクション（OBJID_SWITCH_CONFIRM_DIALOG 等）も確実に開く
 *   - 装備スロット・スキルスイッチ等の計算値に直結するチェックボックスは含まない
 * Pass 3: OBJID_CONTROL_CONF_*_SWITCH / OBJID_CONTROL_CONF2_*_SWITCH
 *   - CConfBase / CConfBase2 が BuildUpSelectArea() で動的生成するスイッチ
 *   - onclick="CConfBase.OnClickSwitchHandler(...)" をグローバルスコープで評価するため
 *     window.CConfBase が未登録の場合は ReferenceError が発生する
 *   - このパスを実行することで設定欄の子要素（OBJID_CONTROL_CONF_*_ID_*）が DOM に生成される
 * Pass 4: A1/A4/A7/A8 の SKILLSW スイッチ（BuffJobSpecificSelf.js / BuffGuildAndGospel.js /
 *   BuffItemAndFood.js / BuffOtherCategory.js）
 *   - folding-switch-MIG を持たないため Pass 1-2 では開かない独自の折りたたみ
 *   - StAllCalc（roro/m/js/foot.js）が `n_A_PassSkill4/7/8` へ読み込む calcForm 入力
 *     （`A4_Skill0`〜`A4_Skill35` 等）はこのスイッチを開くまで DOM に存在しない。
 *     Phase 0 のテスト網拡張（.claude/context/remaining-work.md 系リファクタリング計画）の対象
 */
export async function expandAllSections(page: Page): Promise<void> {
    page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));

    // Pass 1 & 2: CSS 折りたたみセクション（folding-switch-MIG）
    for (let pass = 0; pass < 2; pass++) {
        await page.evaluate(() => {
            document.querySelectorAll<HTMLInputElement>(
                'input[type="checkbox"].folding-switch-MIG:not(:checked)'
            ).forEach((cb) => cb.click());
        });
        await page.waitForTimeout(300);
    }

    // Pass 3: CConfBase / CConfBase2 設定欄スイッチ
    await page.evaluate(() => {
        document.querySelectorAll<HTMLInputElement>(
            '[id^="OBJID_CONTROL_CONF_"][id$="_SWITCH"]:not(:checked), ' +
            '[id^="OBJID_CONTROL_CONF2_"][id$="_SWITCH"]:not(:checked)'
        ).forEach((cb) => cb.click());
    });
    await page.waitForTimeout(500); // BuildUpSelectArea の DOM 再構築を待つ

    // Pass 4: A1/A4/A7/A8 SKILLSW（id 表記が "SKILL_SW" と "SKILLSW" で揺れているので両対応）
    await page.evaluate(() => {
        document.querySelectorAll<HTMLInputElement>(
            '#OBJID_CHECK_A1_SKILL_SW:not(:checked), ' +
            '#OBJID_CHECK_A4_SKILLSW:not(:checked), ' +
            '#OBJID_CHECK_A7_SKILLSW:not(:checked), ' +
            '#OBJID_CHECK_A8_SKILLSW:not(:checked)'
        ).forEach((cb) => cb.click());
    });
    await page.waitForTimeout(300);
}

// 本番と意図的に乖離している要素（ローカル側で機能削除済み・仕様差分）。
// calcx.test.ts のスイート3で運用してきた除外リストをそのまま引き継ぐ。
const INTENTIONAL_DIVERGENCE_IDS = new Set([
    'OBJID_CHECK_A3_SKILLSW',
    'OBJID_SELECT_JOB',
    'OBJID_DIV_BATTLE_RESULT_TINY',
]);

// calcForm の name 属性ベースで同じ理由により除外するもの。
// OBJID_SELECT_JOB は name="A_JOB" の同一要素なので、除外理由（本番/ローカルの
// 意図的乖離）がそのまま calcForm:A_JOB にも波及する。二重に diff ノイズを出さないための対応。
const INTENTIONAL_DIVERGENCE_FORM_NAMES = new Set([
    'A_JOB',
]);

/**
 * 全 OBJID_* 要素 + document.calcForm の全 name 付きコントロールの値を
 * DOM から直接評価して返す（副作用なし）。
 *
 * 後者は StAllCalc（roro/m/js/foot.js）が `eval(calcForm.X.value)` / `eval(calcForm.X.checked)`
 * で読む入力の可視化が目的（.claude/context/remaining-work.md 系のリファクタリング計画 Phase 0）。
 * StAllCalc が読む calcForm.X は 126 種類あるが、OBJID_ id を持つのは約30種類のみで、
 * 残りは `<template>` 化前のビューコードが実行時生成する name 属性のみの要素だった
 * （BuffOtherCategory.js / BuffGuildAndGospel.js 等）。OBJID 走査だけでは
 * これらの入力の回帰を検出できないため、name 単位でも独立に記録する。
 * `calcForm:` プレフィックスを付けるので、同一要素が id も持つ場合は OBJID_* 側のキーと
 * 両方に出現する（意図的な重複）。
 */
export function evalObjidSnapshot(page: Page): Promise<Record<string, string>> {
    return page.evaluate((args: { excludeIds: string[]; excludeFormNames: string[] }): Record<string, string> => {
        const { excludeIds, excludeFormNames } = args;
        const snapshot: Record<string, string> = {};
        const exclude = new Set(excludeIds);
        document.querySelectorAll<HTMLElement>('[id^="OBJID_"]').forEach((el) => {
            const id = el.id;
            if (exclude.has(id)) return;
            if (el instanceof HTMLInputElement) {
                if (el.type === 'checkbox' || el.type === 'radio') {
                    snapshot[id] = el.checked ? 'true' : 'false';
                } else {
                    snapshot[id] = el.value;
                }
            } else if (el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
                snapshot[id] = el.value;
            } else {
                // コンテナ要素（子に OBJID_* を持つ）は除外。葉要素のみ記録する。
                const hasObjidChild = el.querySelector('[id^="OBJID_"]') !== null;
                if (!hasObjidChild) {
                    snapshot[id] = el.textContent?.trim() ?? '';
                }
            }
            // bgcolor 属性（スキルヘッダ等の色表現）は常に記録
            const bg = el.getAttribute('bgcolor');
            if (bg !== null) snapshot[`${id}:bgcolor`] = bg;
        });

        // document.calcForm 配下の name 付きコントロールを全て記録する。
        // 同名要素（真のラジオグループ等）が複数ある場合は #index を付けて取りこぼさない。
        const excludeNames = new Set(excludeFormNames);
        const calcForm = document.forms.namedItem('calcForm');
        if (calcForm) {
            const nameCounts = new Map<string, number>();
            Array.from(calcForm.elements).forEach((el) => {
                const control = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
                const name = control.name;
                if (!name || excludeNames.has(name)) return;
                const seen = nameCounts.get(name) ?? 0;
                nameCounts.set(name, seen + 1);
                const key = seen === 0 ? `calcForm:${name}` : `calcForm:${name}#${seen}`;
                if (control instanceof HTMLInputElement) {
                    snapshot[key] = (control.type === 'checkbox' || control.type === 'radio')
                        ? (control.checked ? 'true' : 'false')
                        : control.value;
                } else if (control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement) {
                    snapshot[key] = control.value;
                }
            });
        }

        return snapshot;
    }, { excludeIds: [...INTENTIONAL_DIVERGENCE_IDS], excludeFormNames: [...INTENTIONAL_DIVERGENCE_FORM_NAMES] });
}

/**
 * セーブデータ復元完了まで待ち、全セクションを展開してから全 OBJID_* 要素を取得する。
 */
export async function captureFullObjidSnapshot(page: Page): Promise<Record<string, string>> {
    await page.waitForFunction(
        () => {
            const job = document.getElementById('OBJID_SELECT_JOB') as HTMLSelectElement | null;
            return job !== null && job.value !== '' && job.value !== '0';
        },
        { timeout: 5000 }
    ).catch(() => { /* 職業未設定のセーブデータはそのまま続行 */ });
    await expandAllSections(page);
    await page.waitForTimeout(200);
    return evalObjidSnapshot(page);
}

// snapshotAllGlobals() が走査する計算用グローバル state モジュール。
// static server のルートは ratorio/ なので、<base href> に依存しない絶対パスで指定する
// （page.evaluate 内から動的 import() する際、この文字列がそのまま解決先URLになり、
// 既存のモジュールキャッシュと一致することで「今まさに計算に使われているライブバインディング」
// を読む。新しいモジュールインスタンスが作られるわけではない）。
const STATE_MODULE_PATHS = [
    '/engine/roro-state.js',
    '/engine/ro4-state.js',
    '/engine/global.js',
    '/engine/head-calc-state.js',
    '/engine/learnedskill.js',
    '/engine/mobconfdebuf.js',
    '/engine/mobconfplayer.js',
    '/engine/mobconfbuf.js',
    '/engine/hmjob.js',
    // Phase 8（リファクタリング計画）で追加: n_A_PassSkill/3/4/7/8（バフ配列5本）の
    // owner。Phase 6でOBJID化した約110入力の書き込み先だが、それまでこの一覧に
    // 含まれておらずモデル導入の検証（二重hydration差分）の死角になっていた。
    '/engine/skillstate.js',
] as const;

/**
 * 計算用グローバル state（`export let` の可変バインディング + `export const` の配列/オブジェクト）
 * を全て読み取り、`"モジュールパス#エクスポート名"` → JSON文字列 のフラットな map として返す。
 *
 * 用途: StAllCalc の DOM 走査プロローグを model 経由の hydration に置き換える際
 * （リファクタリング計画 Phase 7）、2つの hydration 経路が同じグローバル状態を
 * 作ることを検証する差分オラクル。OBJID スナップショットは `[id^="OBJID_"]` の要素しか
 * 見ないため、StAllCalc が読む calcForm 入力の観測率は約27%（Phase 0 の evalObjidSnapshot
 * 拡張後はほぼ100%）にとどまるが、こちらは**計算の入力ではなく出力側**（311個のモジュール
 * グローバル）を直接見るので、model からのフィールド脱落を確実に検出できる。
 *
 * 関数（`set_*` セッター等）は対象外。シリアライズできない値（循環参照を含むクラスインスタンス等、
 * 例: `global.js` の `g_skillManager`）は落とさず `'[unserializable]'` として記録する
 * （こういうフィールドは通常2回の hydration 間で値が変わらないため、diff には出現しない）。
 *
 * hydration の冪等性（`foot.js:1438-1441` で `n_tok` 等を都度ゼロクリアしてから積算する）が
 * 前提。連続呼び出しで値が累積することはない。
 */
export function snapshotAllGlobals(page: Page): Promise<Record<string, string>> {
    return page.evaluate(async (paths: readonly string[]): Promise<Record<string, string>> => {
        // page.evaluate に渡す関数は Vitest の SSR トランスフォームを一度通ってから
        // 文字列化されてブラウザへ送られる。構文上の `import(...)` はそのトランスフォームで
        // `__vite_ssr_dynamic_import__(...)`（vitest 側にしか存在しない関数）に書き換えられてしまい、
        // ブラウザ内で ReferenceError になる。`new Function` で実行時にコードを組み立てれば
        // 静的解析の対象から外れ、ブラウザの本物の動的 import として評価される。
        const dynamicImport = new Function('specifier', 'return import(specifier);') as
            (specifier: string) => Promise<Record<string, unknown>>;

        const snapshot: Record<string, string> = {};
        for (const path of paths) {
            const ns = await dynamicImport(path);
            for (const [name, value] of Object.entries(ns)) {
                if (typeof value === 'function') continue; // set_*() 等のセッター/アクセサは対象外
                const key = `${path}#${name}`;
                try {
                    snapshot[key] = JSON.stringify(value) ?? 'undefined';
                } catch {
                    snapshot[key] = '[unserializable]'; // 循環参照を持つクラスインスタンス等
                }
            }
        }
        return snapshot;
    }, STATE_MODULE_PATHS);
}

/**
 * 期待値スナップショットをベースに、実際値との差分を整形して返す。
 * 期待値にしか存在しないキーのみ比較する（実際値側だけの新規要素は報告しない）。
 * 差分が多い場合は先頭 20 件のみ表示する。
 *
 * `Record<string, string>` であれば OBJID スナップショットに限らず
 * `snapshotAllGlobals()` の出力の比較にもそのまま使える（ラベルを差し替えるだけでよい）。
 */
export function buildObjidDiffMessage(
    label: string,
    expected: Record<string, string>,
    actual: Record<string, string>,
    expectedLabel = '本番',
    actualLabel = 'ローカル',
): string {
    const diffs: string[] = [];
    for (const key of Object.keys(expected).sort()) {
        const ev = expected[key];
        const av = actual[key] ?? '(なし)';
        if (ev !== av) {
            diffs.push(`  ${key}:\n    ${expectedLabel}:     ${ev}\n    ${actualLabel}: ${av}`);
        }
    }
    const header = `リグレッション検出 (${label}) — ${diffs.length} 項目（${expectedLabel}にある要素が${actualLabel}と一致しない）:`;
    const body   = diffs.slice(0, 20).join('\n');
    const tail   = diffs.length > 20 ? `\n  ...他 ${diffs.length - 20} 件（全差分はスタックトレースを参照）` : '';
    return [header, body, tail].filter(Boolean).join('\n');
}
