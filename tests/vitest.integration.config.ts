import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: true,
        include: ['integration/**/*.test.ts', 'integration/**/*.test.js'],
        exclude: ['integration/**/staging-vs-prod.test.ts'],
        testTimeout: 60000,
        hookTimeout: 30000,
    },
});
