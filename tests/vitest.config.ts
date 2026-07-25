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
            // head.js（全エンジン ~200K 行）を import グラフに含むためワーカーが OOM/ハングする。
            // subject が head.js 直接 import（または CAttackMethodAreaComponentManager / CSaveController
            // 経由の head.js 到達）を断てば再有効化できる。BuffGuildAndGospel / BuffJobSpecificSelf は
            // dewindow 済みで再有効化。残り3本は .claude/context/dewindow/roadmap.md「Phase 3g」参照。
            'ro4/hmjob.test.ts',
            'ro4/BuffOtherCategory.test.ts',
            'ro4/BuffItemAndFood.test.ts',
        ],
        coverage: {
            provider: 'v8',
            exclude: ['node_modules', '**/*.config.ts'],
        },
        execArgv: ['--max-old-space-size=8192'],
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
