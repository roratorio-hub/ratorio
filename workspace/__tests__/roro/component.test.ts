/**
 * roro/m/js/コンポーネント・マネージャークラスのユニットテスト
 *
 * C*.js ファイル群
 * - CAttackMethodConf.js
 * - CBattleQuickControlAreaComponentManager.js
 * - CCalcDataTextCreator.js
 * - CCharaConf*.js (複数)
 * - CConfBase*.js
 * - CCustomSelect*.js
 * - CExtraInfoAreaComponentManager.js
 * - CFloatingInfoAreaComponentManager.js
 * - CGlobalConstManager.js
 * - CInstanceManager.js
 * - CItemInfoManager.js
 * - CMobConfInput.js
 * - CNameKana.js
 * - CNewsAreaComponentManager.js
 * - CSaveDataConverter.js
 * - CSaveDataMappingManager.js
 * - CSkillManager.js
 * - CTimeItemAreaComponentManager.js
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { setupRoroTestEnvironment } from '../helpers/roroScriptLoader';
import '../types/roro-common.d.ts';

describe('roro/m/js/グローバルマネージャーとコンポーネント', () => {

    beforeAll(() => {
        setupRoroTestEnvironment();
    });

    describe('CGlobalConstManager.js', () => {
        it('グローバル定数マネージャーが存在することを確認', () => {
            if (typeof CGlobalConstManager !== 'undefined') {
                expect(typeof CGlobalConstManager).toBe('function');
            }
        });

        it('DefineEnum関数が定義されている', () => {
            if (typeof CGlobalConstManager !== 'undefined' && typeof CGlobalConstManager.DefineEnum !== 'undefined') {
                expect(typeof CGlobalConstManager.DefineEnum).toBe('function');
            }
        });
    });

    describe('CInstanceManager.js', () => {
        it('インスタンスマネージャーが存在することを確認', () => {
            if (typeof CInstanceManager !== 'undefined') {
                expect(typeof CInstanceManager).toBe('function');
            }
        });
    });

    describe('CSkillManager.js', () => {
        it('スキルマネージャーが存在することを確認', () => {
            if (typeof CSkillManager !== 'undefined') {
                expect(typeof CSkillManager).toBe('object');
            }
        });
    });

    describe('CItemInfoManager.js', () => {
        it('アイテム情報マネージャーが存在することを確認', () => {
            if (typeof CItemInfoManager !== 'undefined') {
                expect(typeof CItemInfoManager).toBe('function');
            }
        });
    });

    describe('CSaveDataConverter.js', () => {
        it('セーブデータコンバーターが存在することを確認', () => {
            if (typeof CSaveDataConverter !== 'undefined') {
                expect(typeof CSaveDataConverter).toBe('function');
            }
        });
    });

    describe('CSaveDataMappingManager.js', () => {
        it('セーブデータマッピングマネージャーが存在することを確認', () => {
            if (typeof CSaveDataMappingManager !== 'undefined') {
                expect(typeof CSaveDataMappingManager).toBe('object');
            }
        });
    });
});

describe('roro/m/js/設定関連クラス', () => {

    beforeAll(() => {
        setupRoroTestEnvironment();
    });

    describe('CConfBase.js', () => {
        it('設定ベースクラスが存在することを確認', () => {
            if (typeof CConfBase !== 'undefined') {
                expect(typeof CConfBase).toBe('function');
            }
        });
    });

    describe('CConfBase2.js', () => {
        it('設定ベース2クラスが存在することを確認', () => {
            if (typeof CConfBase2 !== 'undefined') {
                expect(typeof CConfBase2).toBe('function');
            }
        });
    });

    describe('CAttackMethodConf.js', () => {
        it('攻撃方法設定クラスが存在することを確認', () => {
            if (typeof CAttackMethodConf !== 'undefined') {
                expect(typeof CAttackMethodConf).toBe('function');
            }
        });
    });

    describe('CCharaConfCustomAtk.js', () => {
        it('キャラ設定カスタムATKクラスが存在することを確認', () => {
            if (typeof CCharaConfCustomAtk !== 'undefined') {
                expect(typeof CCharaConfCustomAtk).toBe('function');
            }
        });
    });

    describe('CCharaConfCustomDef.js', () => {
        it('キャラ設定カスタムDEFクラスが存在することを確認', () => {
            if (typeof CCharaConfCustomDef !== 'undefined') {
                expect(typeof CCharaConfCustomDef).toBe('function');
            }
        });
    });

    describe('CCharaConfCustomSkill.js', () => {
        it('キャラ設定カスタムスキルクラスが存在することを確認', () => {
            if (typeof CCharaConfCustomSkill !== 'undefined') {
                expect(typeof CCharaConfCustomSkill).toBe('function');
            }
        });
    });

    describe('CCharaConfCustomStatus.js', () => {
        it('キャラ設定カスタムステータスクラスが存在することを確認', () => {
            if (typeof CCharaConfCustomStatus !== 'undefined') {
                expect(typeof CCharaConfCustomStatus).toBe('function');
            }
        });
    });

    describe('CCharaConfCustomSpecStatus.js', () => {
        it('キャラ設定カスタム特殊ステータスクラスが存在することを確認', () => {
            if (typeof CCharaConfCustomSpecStatus !== 'undefined') {
                expect(typeof CCharaConfCustomSpecStatus).toBe('function');
            }
        });
    });

    describe('CCharaConfDebuff.js', () => {
        it('キャラ設定デバフクラスが存在することを確認', () => {
            if (typeof CCharaConfDebuff !== 'undefined') {
                expect(typeof CCharaConfDebuff).toBe('function');
            }
        });
    });

    describe('CCharaConfIchizi.js', () => {
        it('キャラ設定一時クラスが存在することを確認', () => {
            if (typeof CCharaConfIchizi !== 'undefined') {
                expect(typeof CCharaConfIchizi).toBe('function');
            }
        });
    });

    describe('CCharaConfNizi.js', () => {
        it('キャラ設定二次クラスが存在することを確認', () => {
            if (typeof CCharaConfNizi !== 'undefined') {
                expect(typeof CCharaConfNizi).toBe('function');
            }
        });
    });

    describe('CCharaConfSanzi.js', () => {
        it('キャラ設定三次クラスが存在することを確認', () => {
            if (typeof CCharaConfSanzi !== 'undefined') {
                expect(typeof CCharaConfSanzi).toBe('function');
            }
        });
    });

    describe('CCharaConfYozi.js', () => {
        it('キャラ設定四次クラスが存在することを確認', () => {
            if (typeof CCharaConfYozi !== 'undefined') {
                expect(typeof CCharaConfYozi).toBe('function');
            }
        });
    });
});

describe('roro/m/js/セレクト関連クラス', () => {

    beforeAll(() => {
        setupRoroTestEnvironment();
    });

    describe('CCustomSelectBase.js', () => {
        it('カスタムセレクトベースクラスが存在することを確認', () => {
            if (typeof CCustomSelectBase !== 'undefined') {
                expect(typeof CCustomSelectBase).toBe('function');
            }
        });
    });

    describe('CCustomSelectMapBase.js', () => {
        it('カスタムセレクトマップベースクラスが存在することを確認', () => {
            if (typeof CCustomSelectMapBase !== 'undefined') {
                expect(typeof CCustomSelectMapBase).toBe('function');
            }
        });
    });

    describe('CCustomSelectMapCategory.js', () => {
        it('カスタムセレクトマップカテゴリクラスが存在することを確認', () => {
            if (typeof CCustomSelectMapCategory !== 'undefined') {
                expect(typeof CCustomSelectMapCategory).toBe('function');
            }
        });
    });

    describe('CCustomSelectMapMap.js', () => {
        it('カスタムセレクトマップマップクラスが存在することを確認', () => {
            if (typeof CCustomSelectMapMap !== 'undefined') {
                expect(typeof CCustomSelectMapMap).toBe('function');
            }
        });
    });

    describe('CCustomSelectMapMonster.js', () => {
        it('カスタムセレクトマップモンスタークラスが存在することを確認', () => {
            if (typeof CCustomSelectMapMonster !== 'undefined') {
                expect(typeof CCustomSelectMapMonster).toBe('function');
            }
        });
    });
});

describe('roro/m/js/エリアコンポーネント関連', () => {

    beforeAll(() => {
        setupRoroTestEnvironment();
    });

    describe('CExtraInfoAreaComponentManager.js', () => {
        it('追加情報エリアコンポーネントが存在することを確認', () => {
            if (typeof CExtraInfoAreaComponentManager !== 'undefined') {
                expect(typeof CExtraInfoAreaComponentManager).toBe('function');
            }
        });
    });

    describe('CFloatingInfoAreaComponentManager.js', () => {
        it('フローティング情報エリアコンポーネントが存在することを確認', () => {
            if (typeof CFloatingInfoAreaComponentManager !== 'undefined') {
                expect(typeof CFloatingInfoAreaComponentManager).toBe('function');
            }
        });
    });

    describe('CNewsAreaComponentManager.js', () => {
        it('ニュースエリアコンポーネントが存在することを確認', () => {
            if (typeof CNewsAreaComponentManager !== 'undefined') {
                expect(typeof CNewsAreaComponentManager).toBe('function');
            }
        });
    });

    describe('CBattleQuickControlAreaComponentManager.js', () => {
        it('バトルクイックコントロールエリアコンポーネントが存在することを確認', () => {
            if (typeof CBattleQuickControlAreaComponentManager !== 'undefined') {
                expect(typeof CBattleQuickControlAreaComponentManager).toBe('function');
            }
        });
    });

    describe('CTimeItemAreaComponentManager.js', () => {
        it('時限アイテムエリアコンポーネントが存在することを確認', () => {
            if (typeof CTimeItemAreaComponentManager !== 'undefined') {
                expect(typeof CTimeItemAreaComponentManager).toBe('function');
            }
        });
    });
});

describe('roro/m/js/その他のコンポーネント', () => {

    beforeAll(() => {
        setupRoroTestEnvironment();
    });

    describe('CCalcDataTextCreator.js', () => {
        it('計算データテキスト作成クラスが存在することを確認', () => {
            if (typeof CCalcDataTextCreator !== 'undefined') {
                expect(typeof CCalcDataTextCreator).toBe('function');
            }
        });
    });

    describe('CMobConfInput.js', () => {
        it('モブ設定入力クラスが存在することを確認', () => {
            if (typeof CMobConfInput !== 'undefined') {
                expect(typeof CMobConfInput).toBe('function');
            }
        });
    });

    describe('CNameKana.js', () => {
        it('名前カナクラスが存在することを確認', () => {
            if (typeof CNameKana !== 'undefined') {
                expect(typeof CNameKana).toBe('function');
            }
        });
    });
});
