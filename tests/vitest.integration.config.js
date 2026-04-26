import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        include: ['integration/**/*.test.js'],
        // ブラウザ起動 + ページロード + CDN リソース読み込みを考慮した長めのタイムアウト
        testTimeout: 90000,
        hookTimeout: 30000,
    },
});
