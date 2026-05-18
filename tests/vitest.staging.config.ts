import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        include: ['integration/staging-vs-prod.test.ts'],
        // リモートサーバーへのアクセスを含むため、通常の統合テストより長めに設定する
        testTimeout: 120000,
        hookTimeout:  60000,
    },
});
