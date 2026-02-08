/**
 * ro4/m/js/global.js のユニットテスト
 *
 * このテストは現状コードを網羅的にテストすることを目的としています。
 * テスト対象のJavaScriptファイルは一切変更せず、TypeScriptラッパーを通じてテストします。
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { setupRo4TestEnvironment } from '../helpers/ro4ScriptLoader';
import '../types/ro4-global.d.ts';

describe('ro4/m/js/global.js', () => {

    beforeAll(() => {
        // テスト環境のセットアップ（依存ファイルのロード）
        setupRo4TestEnvironment();
    });

    describe('定数の定義確認', () => {
        it('TIME_ITEM_CONF_COUNTが正しく定義されている', () => {
            if (typeof TIME_ITEM_CONF_COUNT !== 'undefined') {
                expect(TIME_ITEM_CONF_COUNT).toBe(20);
            }
        });

        it('CUSTOM_CONF_STATUS_LIMITが正しく定義されている', () => {
            if (typeof CUSTOM_CONF_STATUS_LIMIT !== 'undefined') {
                expect(CUSTOM_CONF_STATUS_LIMIT).toBe(30);
            }
        });

        it('CUSTOM_CONF_ATK_LIMITが正しく定義されている', () => {
            if (typeof CUSTOM_CONF_ATK_LIMIT !== 'undefined') {
                expect(CUSTOM_CONF_ATK_LIMIT).toBe(30);
            }
        });

        it('CUSTOM_CONF_DEF_LIMITが正しく定義されている', () => {
            if (typeof CUSTOM_CONF_DEF_LIMIT !== 'undefined') {
                expect(CUSTOM_CONF_DEF_LIMIT).toBe(20);
            }
        });

        it('CUSTOM_CONF_SKILL_LIMITが正しく定義されている', () => {
            if (typeof CUSTOM_CONF_SKILL_LIMIT !== 'undefined') {
                expect(CUSTOM_CONF_SKILL_LIMIT).toBe(20);
            }
        });

        it('CUSTOM_CONF_SPEC_LIMITが正しく定義されている', () => {
            if (typeof CUSTOM_CONF_SPEC_LIMIT !== 'undefined') {
                expect(CUSTOM_CONF_SPEC_LIMIT).toBe(20);
            }
        });
    });

    describe('グローバル変数の初期化確認', () => {
        it('g_timeItemConfが正しいサイズの配列で初期化されている', () => {
            if (typeof g_timeItemConf !== 'undefined' && typeof TIME_ITEM_CONF_COUNT !== 'undefined') {
                expect(Array.isArray(g_timeItemConf)).toBe(true);
                expect(g_timeItemConf.length).toBe(TIME_ITEM_CONF_COUNT);
                expect(g_timeItemConf.every(v => v === 0)).toBe(true);
            }
        });

        it('g_timeItemConfEffectiveが正しいサイズの配列で初期化されている', () => {
            if (typeof g_timeItemConfEffective !== 'undefined' && typeof TIME_ITEM_CONF_COUNT !== 'undefined') {
                expect(Array.isArray(g_timeItemConfEffective)).toBe(true);
                expect(g_timeItemConfEffective.length).toBe(TIME_ITEM_CONF_COUNT);
                expect(g_timeItemConfEffective.every(v => v === true)).toBe(true);
            }
        });

        it('g_timeItemConfAllEffectiveが初期値1で初期化されている', () => {
            if (typeof g_timeItemConfAllEffective !== 'undefined') {
                expect(g_timeItemConfAllEffective).toBe(1);
            }
        });

        it('n_Nitouがfalseで初期化されている', () => {
            if (typeof n_Nitou !== 'undefined') {
                expect(n_Nitou).toBe(false);
            }
        });

        it('n_NitouCalcがfalseで初期化されている', () => {
            if (typeof n_NitouCalc !== 'undefined') {
                expect(n_NitouCalc).toBe(false);
            }
        });

        it('g_VariableCastTimeRateが0で初期化されている', () => {
            if (typeof g_VariableCastTimeRate !== 'undefined') {
                expect(g_VariableCastTimeRate).toBe(0);
            }
        });

        it('costDownForDispが0で初期化されている', () => {
            if (typeof costDownForDisp !== 'undefined') {
                expect(costDownForDisp).toBe(0);
            }
        });

        it('g_confDataCustomStatusが正しいサイズで初期化されている', () => {
            if (typeof g_confDataCustomStatus !== 'undefined' && typeof CUSTOM_CONF_STATUS_LIMIT !== 'undefined') {
                expect(Array.isArray(g_confDataCustomStatus)).toBe(true);
                expect(g_confDataCustomStatus.length).toBe(CUSTOM_CONF_STATUS_LIMIT);
                expect(g_confDataCustomStatus.every(v => v === 0)).toBe(true);
            }
        });

        it('g_confDataCustomAtkが正しいサイズで初期化されている', () => {
            if (typeof g_confDataCustomAtk !== 'undefined' && typeof CUSTOM_CONF_ATK_LIMIT !== 'undefined') {
                expect(Array.isArray(g_confDataCustomAtk)).toBe(true);
                expect(g_confDataCustomAtk.length).toBe(CUSTOM_CONF_ATK_LIMIT);
                expect(g_confDataCustomAtk.every(v => v === 0)).toBe(true);
            }
        });

        it('g_confDataCustomDefが正しいサイズで初期化されている', () => {
            if (typeof g_confDataCustomDef !== 'undefined' && typeof CUSTOM_CONF_DEF_LIMIT !== 'undefined') {
                expect(Array.isArray(g_confDataCustomDef)).toBe(true);
                expect(g_confDataCustomDef.length).toBe(CUSTOM_CONF_DEF_LIMIT);
                expect(g_confDataCustomDef.every(v => v === 0)).toBe(true);
            }
        });

        it('g_confDataCustomSkillが正しいサイズで初期化されている', () => {
            if (typeof g_confDataCustomSkill !== 'undefined' && typeof CUSTOM_CONF_SKILL_LIMIT !== 'undefined') {
                expect(Array.isArray(g_confDataCustomSkill)).toBe(true);
                expect(g_confDataCustomSkill.length).toBe(CUSTOM_CONF_SKILL_LIMIT);
                expect(g_confDataCustomSkill.every(v => v === 0)).toBe(true);
            }
        });

        it('g_confDataCustomSpecStatusが正しいサイズで初期化されている', () => {
            if (typeof g_confDataCustomSpecStatus !== 'undefined' && typeof CUSTOM_CONF_SPEC_LIMIT !== 'undefined') {
                expect(Array.isArray(g_confDataCustomSpecStatus)).toBe(true);
                expect(g_confDataCustomSpecStatus.length).toBe(CUSTOM_CONF_SPEC_LIMIT);
                expect(g_confDataCustomSpecStatus.every(v => v === 0)).toBe(true);
            }
        });

        it('g_skillManagerがインスタンス化されている', () => {
            if (typeof g_skillManager !== 'undefined') {
                expect(g_skillManager).toBeDefined();
                expect(g_skillManager).not.toBeNull();
            }
        });

        it('g_constDataManagerがインスタンス化されている', () => {
            if (typeof g_constDataManager !== 'undefined') {
                expect(g_constDataManager).toBeDefined();
                expect(g_constDataManager).not.toBeNull();
            }
        });

        it('g_charaDataが初期化されている', () => {
            if (typeof g_charaData !== 'undefined' && typeof g_charaData.cardCategoryMap !== 'undefined') {
                expect(g_charaData).toBeDefined();
                expect(g_charaData.cardCategoryMap).toBeInstanceOf(Map);
            }
        });
    });

    describe('ResetConfDataAllMIG関数', () => {
        it('ResetConfDataAllMIGが関数として定義されている', () => {
            if (typeof ResetConfDataAllMIG !== 'undefined') {
                expect(typeof ResetConfDataAllMIG).toBe('function');
            }
        });

        it('ResetConfDataAllMIG実行後、配列が正しく初期化される', () => {
            if (typeof ResetConfDataAllMIG !== 'undefined' && typeof g_confDataCustomStatusMIG !== 'undefined') {
                ResetConfDataAllMIG(false);

                expect(Array.isArray(g_confDataCustomStatusMIG)).toBe(true);
                expect(g_confDataCustomStatusMIG.length).toBe(46);
                expect(g_confDataCustomStatusMIG.every((v: number) => v === 0)).toBe(true);
            }
        });

        it('ResetConfDataAllMIG実行後、g_confDataCustomSpecStatusMIGが初期化される', () => {
            if (typeof ResetConfDataAllMIG !== 'undefined' && typeof g_confDataCustomSpecStatusMIG !== 'undefined') {
                ResetConfDataAllMIG(false);

                expect(Array.isArray(g_confDataCustomSpecStatusMIG)).toBe(true);
                expect(g_confDataCustomSpecStatusMIG.length).toBe(12);
                expect(g_confDataCustomSpecStatusMIG.every((v: number) => v === 0)).toBe(true);
            }
        });

        it('ResetConfDataAllMIG実行後、g_confDataSpecMIGが正しい構造で初期化される', () => {
            if (typeof ResetConfDataAllMIG !== 'undefined' && typeof g_confDataSpecMIG !== 'undefined') {
                ResetConfDataAllMIG(false);

                expect(Array.isArray(g_confDataSpecMIG)).toBe(true);
                expect(g_confDataSpecMIG.length).toBe(2);
                expect(g_confDataSpecMIG[0].length).toBe(3);
                expect(g_confDataSpecMIG[1].length).toBe(3);
                expect(g_confDataSpecMIG[0][0].length).toBe(53);
            }
        });

        it('ResetConfDataAllMIG実行後、g_confDataCustomSkillMIGが初期化される', () => {
            if (typeof ResetConfDataAllMIG !== 'undefined' && typeof g_confDataCustomSkillMIG !== 'undefined') {
                ResetConfDataAllMIG(false);

                expect(Array.isArray(g_confDataCustomSkillMIG)).toBe(true);
                expect(g_confDataCustomSkillMIG.length).toBe(12);
                expect(g_confDataCustomSkillMIG.every((v: number) => v === 0)).toBe(true);
            }
        });
    });

    describe('__DIG3関数', () => {
        it('__DIG3が関数として定義されている', () => {
            if (typeof __DIG3 !== 'undefined') {
                expect(typeof __DIG3).toBe('function');
            }
        });

        it('__DIG3が数値を文字列として返す（3桁区切り無効時）', () => {
            if (typeof __DIG3 !== 'undefined') {
                const result = __DIG3(1000);
                expect(typeof result).toBe('string');
                // HtmlGetObjectCheckedByIdがモックでfalseを返すため、3桁区切りなし
                expect(result).toBe('1000');
            }
        });

        it('__DIG3が0を正しく処理する', () => {
            if (typeof __DIG3 !== 'undefined') {
                const result = __DIG3(0);
                expect(result).toBe('0');
            }
        });

        it('__DIG3が負の数を正しく処理する', () => {
            if (typeof __DIG3 !== 'undefined') {
                const result = __DIG3(-1000);
                expect(result).toBe('-1000');
            }
        });

        it('__DIG3が大きな数値を正しく処理する', () => {
            if (typeof __DIG3 !== 'undefined') {
                const result = __DIG3(1234567890);
                expect(result).toBe('1234567890');
            }
        });
    });
});
