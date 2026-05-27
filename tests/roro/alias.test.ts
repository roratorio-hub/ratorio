import { describe, it, expect } from 'vitest';
import '@roro/CGlobalConstManager.js';
import { g_AliasDataArray } from '@roro/alias.dat.js';
import { TranslateAlias } from '@roro/alias.h.js';

describe('alias.dat.js', () => {
    describe('エクスポート確認', () => {
        it('g_AliasDataArray が配列', () => {
            expect(Array.isArray(g_AliasDataArray)).toBe(true);
        });
        it('g_AliasDataArray が 23 件', () => {
            expect(g_AliasDataArray).toHaveLength(23);
        });
        it('g_AliasDataArray[0] が ["GD", "ゲフェン地下ダンジョン"]', () => {
            expect(g_AliasDataArray[0]).toEqual(['GD', 'ゲフェン地下ダンジョン']);
        });
    });

    describe('window互換確認', () => {
        it('window.g_AliasDataArray が設定されている', () => {
            expect((window as any).g_AliasDataArray).toBe(g_AliasDataArray);
        });
    });
});

describe('alias.h.js', () => {
    describe('DefineEnum 副作用確認', () => {
        it('ALIAS_DATA_INDEX_ALIAS が 0 に定義される', () => {
            expect((globalThis as any).ALIAS_DATA_INDEX_ALIAS).toBe(0);
        });
        it('ALIAS_DATA_INDEX_ORIGIN が 1 に定義される', () => {
            expect((globalThis as any).ALIAS_DATA_INDEX_ORIGIN).toBe(1);
        });
        it('ALIAS_DATA_INDEX_COUNT が 2 に定義される', () => {
            expect((globalThis as any).ALIAS_DATA_INDEX_COUNT).toBe(2);
        });
    });

    describe('エクスポート確認', () => {
        it('TranslateAlias が関数', () => {
            expect(typeof TranslateAlias).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.TranslateAlias が設定されている', () => {
            expect((window as any).TranslateAlias).toBe(TranslateAlias);
        });
    });

    describe('TranslateAlias ロジック確認', () => {
        it('"GD" → "ゲフェン地下ダンジョン"', () => {
            expect(TranslateAlias('GD')).toBe('ゲフェン地下ダンジョン');
        });
        it('"ワムテ" → "ワームテール"', () => {
            expect(TranslateAlias('ワムテ')).toBe('ワームテール');
        });
        it('未登録のエイリアスは空文字を返す', () => {
            expect(TranslateAlias('存在しないエイリアス')).toBe('');
        });
        it('空文字は空文字を返す', () => {
            expect(TranslateAlias('')).toBe('');
        });
    });
});
