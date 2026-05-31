import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        include: ['integration/**/*.test.ts', 'integration/**/*.test.js'],
        exclude: [
            // ステージング環境へのデプロイ運用がないため除外
            'integration/staging-vs-prod.test.ts',
        ],
        testTimeout: 60000,
        hookTimeout: 30000,
    },
});
