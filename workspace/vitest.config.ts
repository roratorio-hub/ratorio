import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        globals: true,
        environment: 'happy-dom',
        include: ['__tests__/**/*.test.ts', '__tests__/**/*.spec.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                '__tests__/',
                '*.config.ts',
                'dist/',
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@tests': path.resolve(__dirname, './__tests__'),
            '@ro4': path.resolve(__dirname, '../ro4/m/js'),
            '@roro': path.resolve(__dirname, '../roro/m/js'),
        },
    },
});
