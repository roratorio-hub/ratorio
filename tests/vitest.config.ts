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
            // head.js 経由で計算エンジン全体(~200K行)をロードするためワーカーがOOMで死ぬ
            // Vite bundler 導入後にモジュールグラフが軽量化されたら再有効化する
            'ro4/hmjob.test.ts',
            'ro4/BuffJobSpecificSelf.test.ts',
            'ro4/BuffGuildAndGospel.test.ts',
            'ro4/BuffOtherCategory.test.ts',
            'ro4/BuffItemAndFood.test.ts',
            'ro4/BuffMusicAndDance.test.ts',
        ],
        coverage: {
            provider: 'v8',
            exclude: ['node_modules', '**/*.config.ts'],
        },
        execArgv: ['--max-old-space-size=8192'],
    },
    resolve: {
        alias: {
            '@roro': path.resolve(__dirname, '../roro/m/js'),
            '@ro4': path.resolve(__dirname, '../ro4/m/js'),
            '@helpers': path.resolve(__dirname, './helpers'),
            '@types-roro': path.resolve(__dirname, './types'),
        },
    },
});
