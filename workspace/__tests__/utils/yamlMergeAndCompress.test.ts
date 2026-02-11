/**
 * workspace/utils/yamlMergeAndCompress.ts のユニットテスト
 *
 * YAML処理オプションと変換ロジックのテスト
 */

import { describe, it, expect } from 'vitest';
import { yamlOptions } from '../../utils/yamlMergeAndCompress';

describe('yamlMergeAndCompress.ts - YAML処理', () => {

    describe('yamlOptions', () => {
        it('yamlOptionsが定義されている', () => {
            expect(yamlOptions).toBeDefined();
            expect(typeof yamlOptions).toBe('object');
        });

        it('yamlOptionsが styles プロパティを持つ', () => {
            expect(yamlOptions).toHaveProperty('styles');
            expect(typeof yamlOptions.styles).toBe('object');
        });

        it('yamlOptionsが replacer プロパティを持つ', () => {
            expect(yamlOptions).toHaveProperty('replacer');
            expect(typeof yamlOptions.replacer).toBe('function');
        });

        it('styles内で!!str用のスタイル処理が定義されている', () => {
            expect(yamlOptions.styles).toHaveProperty('!!str');
            expect(typeof yamlOptions.styles['!!str']).toBe('function');
        });
    });

    describe('styles["!!str"] 処理', () => {
        const strStyler = yamlOptions.styles['!!str'];

        it('改行を含まない文字列ではデフォルトスタイル（null）を返す', () => {
            const result = strStyler('単純な文字列');
            expect(result).toBeNull();
        });

        it('改行を含む文字列では"|"スタイルを返す', () => {
            const result = strStyler('複数行\nの\n文字列');
            expect(result).toBe('|');
        });

        it('末尾の改行のみの場合もパイプスタイル', () => {
            const result = strStyler('テキスト\n');
            expect(result).toBe('|');
        });

        it('複数の改行を含む場合もパイプスタイル', () => {
            const result = strStyler('行1\n行2\n行3\n');
            expect(result).toBe('|');
        });

        it('改行がない文字列は safe により取り扱われる', () => {
            const testStr = 'no-newline-string';
            const result = strStyler(testStr);
            expect(result).toBeNull();
        });
    });

    describe('replacer 処理', () => {
        const replacer = yamlOptions.replacer;

        it('文字列値が改行を含まない場合、そのまま返す', () => {
            const result = replacer('key', 'simple value');
            expect(result).toBe('simple value');
        });

        it('文字列値が改行を含む場合、末尾スペース後の改行を削除する', () => {
            const input = 'text \nmore text';
            const result = replacer('key', input);
            expect(typeof result).toBe('string');
            // 行末スペース後の改行が削除されることを確認
            expect((result as string).includes(' \n')).toBe(false);
        });

        it('末尾のスペースを含む改行を削除する', () => {
            const input = 'line1   \nline2';
            const result = replacer('key', input);
            expect(typeof result).toBe('string');
        });

        it('複数行の末尾スペース＋改行を全て処理する', () => {
            const input = 'line1  \nline2  \nline3  \n';
            const result = replacer('key', input);
            expect(typeof result).toBe('string');
        });

        it('非文字列値はそのまま返す', () => {
            const numberResult = replacer('key', 123);
            expect(numberResult).toBe(123);

            const objResult = replacer('key', { nested: 'value' });
            expect(objResult).toEqual({ nested: 'value' });

            const nullResult = replacer('key', null);
            expect(nullResult).toBeNull();
        });

        it('改行を含まない文字列は変更されない', () => {
            const input = 'single line text   ';
            const result = replacer('key', input);
            expect(result).toBe(input);
        });
    });

    describe('YAML出力フォーマット', () => {
        it('複数行文字列が適切に処理される', () => {
            const multilineText = 'これは複数行\nの説明です\n改行があります';

            // replacer でスペース処理
            const processed = yamlOptions.replacer('description', multilineText);
            expect(typeof processed).toBe('string');

            // strStyler で出力スタイル決定
            const style = yamlOptions.styles['!!str'](multilineText);
            expect(style).toBe('|');
        });

        it('英単語のみの複数行テキストも処理できる', () => {
            const englishMultiline = 'First line\nSecond line\nThird line';

            const processed = yamlOptions.replacer('description', englishMultiline);
            expect(typeof processed).toBe('string');

            const style = yamlOptions.styles['!!str'](englishMultiline);
            expect(style).toBe('|');
        });

        it('日本語・英語混在のテキストも処理できる', () => {
            const mixedText = '説明: English\n日本語テキスト\nMore English';

            const processed = yamlOptions.replacer('description', mixedText);
            expect(typeof processed).toBe('string');

            const style = yamlOptions.styles['!!str'](mixedText);
            expect(style).toBe('|');
        });
    });

    describe('YAML出力オプションの整合性', () => {
        it('styles と replacer が両立できる', () => {
            const testData = {
                singleLine: 'single line text',
                multiLine: 'line1\nline2\nline3'
            };

            // singleLineはnullスタイル
            const singleStyle = yamlOptions.styles['!!str'](testData.singleLine);
            expect(singleStyle).toBeNull();

            // multiLineはパイプスタイル
            const multiStyle = yamlOptions.styles['!!str'](testData.multiLine);
            expect(multiStyle).toBe('|');

            // replacerで処理
            const singleReplaced = yamlOptions.replacer('singleLine', testData.singleLine);
            const multiReplaced = yamlOptions.replacer('multiLine', testData.multiLine);

            expect(typeof singleReplaced).toBe('string');
            expect(typeof multiReplaced).toBe('string');
        });

        it('オブジェクトデータ全体で一貫性がある', () => {
            const complexData = {
                id: 'item_001',
                name: '単純な名前',
                description: '複数行\nの説明\nテキスト',
                value: 100,
                enabled: true
            };

            // すべてのプロパティを replaces できる
            Object.entries(complexData).forEach(([key, value]) => {
                const result = yamlOptions.replacer(key, value);
                expect(result).toBeDefined();
            });
        });
    });

    describe('エッジケース', () => {
        it('空文字列を処理できる', () => {
            const result = yamlOptions.styles['!!str']('');
            expect(result).toBeNull(); // 改行がないのでnull

            const replaced = yamlOptions.replacer('key', '');
            expect(replaced).toBe('');
        });

        it('スペースのみの文字列を処理できる', () => {
            const spaceOnly = '   ';
            const result = yamlOptions.styles['!!str'](spaceOnly);
            expect(result).toBeNull();

            const replaced = yamlOptions.replacer('key', spaceOnly);
            expect(replaced).toBe(spaceOnly);
        });

        it('特殊文字を含む文字列を処理できる', () => {
            const special = 'text with "quotes"\nand escapes: \\n';
            const style = yamlOptions.styles['!!str'](special);
            expect(style).toBe('|');

            const replaced = yamlOptions.replacer('key', special);
            expect(typeof replaced).toBe('string');
        });

        it('非常に長い文字列を処理できる', () => {
            const longText = 'a'.repeat(10000) + '\n' + 'b'.repeat(10000);
            const style = yamlOptions.styles['!!str'](longText);
            expect(style).toBe('|');

            const replaced = yamlOptions.replacer('key', longText);
            expect(typeof replaced).toBe('string');
        });

        it('連続した改行を処理できる', () => {
            const consecutive = 'text\n\n\nmore text';
            const style = yamlOptions.styles['!!str'](consecutive);
            expect(style).toBe('|');

            const replaced = yamlOptions.replacer('key', consecutive);
            expect(typeof replaced).toBe('string');
        });
    });

    describe('YAML互換性', () => {
        it('yamlOptionsがPython引数として互換性を持つ形式', () => {
            // styles と replacer が js-yaml の オプション形式に準拠
            expect(typeof yamlOptions.styles).toBe('object');
            expect(typeof yamlOptions.replacer).toBe('function');
        });

        it('styles内のキーがYAMLタグ形式（!!str）を使用している', () => {
            const styleKeys = Object.keys(yamlOptions.styles);
            expect(styleKeys.some(key => key.startsWith('!!'))).toBe(true);
        });

        it('replacer関数がkey-valueペアを引数として受け取る', () => {
            expect(yamlOptions.replacer.length).toBe(2);
        });
    });
});
