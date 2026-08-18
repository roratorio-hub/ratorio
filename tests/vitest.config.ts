import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        environment: 'happy-dom',
        globals: true,
        include: ['roro/**/*.test.ts', 'ro4/**/*.test.ts'],
        exclude: [
            'node_modules',
            'integration',
        ],
        coverage: {
            provider: 'v8',
            exclude: ['node_modules', '**/*.config.ts'],
        },
        execArgv: ['--max-old-space-size=8192'],
        // 2026-08-12: skill/ の職業ツリー再分割（43→77ファイル、plan:
        // roro-m-js-skill-https-rotool-gungho-jp-s-glittery-cupcake）で CSkillManager.js が
        // 属する循環依存グループ（global.js 等17ファイル）の初回 import が渡すファイル数が増え、
        // 全テスト並列実行時（esbuild transform のワーカー間競合）に beforeAll の
        // `await import(...)` がデフォルト10秒のhookTimeoutを超えることがある
        // （ro4/CShadowEquipController.test.ts 等。単体実行や再実行では容易に間に合う＝
        // 循環自体がハングしているのではなく、cold transform の実時間コスト）。
        // 実測に基づき安全マージンとして倍にする。
        hookTimeout: 20000,
    },
    resolve: {
        alias: [
            // Chart.js の CDN(https:) ESM import は Node/vitest では解決できないためスタブへ差し替える。
            // 実ブラウザ（calcx.html）と integration(Playwright) は本物の CDN をそのまま使う。
            {
                find: /^https:\/\/cdn\.jsdelivr\.net\/npm\/chart\.js@[\d.]+\/auto\/\+esm$/,
                replacement: path.resolve(__dirname, './helpers/chart-stub.js'),
            },
            { find: '@roro', replacement: path.resolve(__dirname, '../roro/m/js') },
            { find: '@ro4', replacement: path.resolve(__dirname, '../ro4/m/js') },
            { find: '@helpers', replacement: path.resolve(__dirname, './helpers') },
            { find: '@types-roro', replacement: path.resolve(__dirname, './types') },
        ],
    },
});
