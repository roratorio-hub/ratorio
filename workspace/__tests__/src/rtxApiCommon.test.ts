/**
 * workspace/src/rtxApiCommon.ts のユニットテスト
 *
 * RTX API共通機能のテスト
 */

import { describe, it, expect } from 'vitest';
import { API_VERSION, CONTROL_CONF_LIST } from '../../src/rtxApiCommon';

describe('rtxApiCommon.ts - RTX API共通機能', () => {

    describe('定数定義', () => {
        it('API_VERSIONが定義されている', () => {
            expect(API_VERSION).toBeDefined();
            expect(typeof API_VERSION).toBe('number');
            expect(API_VERSION).toBeGreaterThan(0);
        });

        it('API_VERSIONが2である', () => {
            expect(API_VERSION).toBe(2);
        });
    });

    describe('CONTROL_CONF_LIST', () => {
        it('CONTROL_CONF_LISTが配列である', () => {
            expect(Array.isArray(CONTROL_CONF_LIST)).toBe(true);
        });

        it('CONTROL_CONF_LISTのすべての要素が必須プロパティを持つ', () => {
            CONTROL_CONF_LIST.forEach((conf) => {
                expect(conf).toHaveProperty('conf_name');
                expect(conf).toHaveProperty('control_switch_element_id');
                expect(conf).toHaveProperty('type');
            });
        });

        it('CONTROL_CONF_LISTのいくつかの既知の設定が含まれている', () => {
            const confNames = CONTROL_CONF_LIST.map((conf) => conf.conf_name);
            expect(confNames).toContain('skill-passive');
            expect(confNames).toContain('skill-1st');
            expect(confNames).toContain('skill-2nd');
            expect(confNames).toContain('skill-3rd');
            expect(confNames).toContain('skill-4th');
            expect(confNames).toContain('debuff');
        });

        it('CONTROL_CONF_LISTのtypeは"support"または"customize"である', () => {
            CONTROL_CONF_LIST.forEach((conf) => {
                expect(['support', 'customize']).toContain(conf.type);
            });
        });

        it('skillで始まる設定のほとんどがsupport型である', () => {
            const skillConfigs = CONTROL_CONF_LIST.filter((conf) =>
                conf.conf_name.startsWith('skill')
            );
            expect(skillConfigs.length).toBeGreaterThan(0);
            // skill系の設定が複数存在することを確認
            skillConfigs.forEach((conf) => {
                expect(['support', 'customize']).toContain(conf.type);
            });
        });

        it('CONTROL_CONF_LISTのすべての要素にユニークなconf_nameが含まれている', () => {
            const confNames = CONTROL_CONF_LIST.map((conf) => conf.conf_name);
            const uniqueConfNames = new Set(confNames);
            expect(uniqueConfNames.size).toBe(confNames.length);
        });

        it('CONTROL_CONF_LISTのすべての要素にユニークなcontrol_switch_element_idが含まれている', () => {
            const elementIds = CONTROL_CONF_LIST.map((conf) =>
                conf.control_switch_element_id
            );
            const uniqueElementIds = new Set(elementIds);
            expect(uniqueElementIds.size).toBe(elementIds.length);
        });

        it('CONTROL_CONF_LISTが複数の要素を含む', () => {
            expect(CONTROL_CONF_LIST.length).toBeGreaterThan(10);
        });

        it('CONTROL_CONF_LISTの"status-basic"と"status-special"設定が含まれている', () => {
            const confNames = CONTROL_CONF_LIST.map((conf) => conf.conf_name);
            expect(confNames).toContain('status-basic');
            expect(confNames).toContain('status-special');
        });

        it('CONTROL_CONF_LISTの各要素がcontrol_switch_element_id IDパターンに従っている', () => {
            CONTROL_CONF_LIST.forEach((conf) => {
                if (conf.type === 'support') {
                    // supportタイプはOBJID_CHECK_A1_SKILL_SWまたはOBJID_CONTROL_CONF_N_SWITCHパターン
                    expect(
                        conf.control_switch_element_id === 'OBJID_CHECK_A1_SKILL_SW' ||
                        /^OBJID_CONTROL_CONF_\d+_SWITCH$/.test(
                            conf.control_switch_element_id
                        )
                    ).toBe(true);
                } else if (conf.type === 'customize') {
                    // customizeタイプもOBJID_CONTROL_CONF_N_SWITCHパターン
                    expect(
                        /^OBJID_CONTROL_CONF_\d+_SWITCH$/.test(
                            conf.control_switch_element_id
                        )
                    ).toBe(true);
                }
            });
        });
    });

    describe('型チェック', () => {
        it('CONTROL_CONF_LIST要素のconf_nameはstring', () => {
            CONTROL_CONF_LIST.forEach((conf) => {
                expect(typeof conf.conf_name).toBe('string');
                expect(conf.conf_name.length).toBeGreaterThan(0);
            });
        });

        it('CONTROL_CONF_LIST要素のcontrol_switch_element_idはstring', () => {
            CONTROL_CONF_LIST.forEach((conf) => {
                expect(typeof conf.control_switch_element_id).toBe('string');
                expect(conf.control_switch_element_id.length).toBeGreaterThan(0);
            });
        });

        it('CONTROL_CONF_LIST要素のtypeはstring', () => {
            CONTROL_CONF_LIST.forEach((conf) => {
                expect(typeof conf.type).toBe('string');
                expect(['support', 'customize']).toContain(conf.type);
            });
        });
    });
});
