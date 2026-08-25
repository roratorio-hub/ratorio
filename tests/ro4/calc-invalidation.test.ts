import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { CalcInput, notifyChanged, notifyChangedLegacy, requestRecalc, withBatch, onResults } from '@ro4/calc-invalidation.js';
// AutoCalc/calc は head-bridge 経由（head.js 直接 import は循環・OOMの原因になるため禁止）。
import { __registerHeadFunctions } from '@ro4/head-bridge.js';
// リファクタリング計画 Phase 9 D3: ポリシーflagの読み出し元は CSaveController.getSettingProp
// （engine-registry 経由）。propNameAttackAutoCalc の実値は問わないので、Map で代用する。
import { register as registryRegister } from '@ro4/engine-registry.js';
import { CSaveDataConst } from '@ro4/savedata/CSaveDataConst.js';

// ⚠️ 実際の CSaveController.getSettingProp は BigInt を返す
// （CSaveDataUnitBase.setProp が toSafeBigInt() を通すため）。D3リリース後に
// 「flag=3を選んでも再計算されない」という実バグが発生した原因はまさにこれで、
// readAutoCalcFlag() が Number へ変換せずそのまま switch 文へ渡していたため
// BigInt !== Number の strict equality で全 case が不一致になり、常に
// default（再計算しない）へ落ちていた。テスト側のモックが Number を返していたため
// 発見が遅れた。以降このヘルパーは常に BigInt を返し、実装の型変換漏れを検出する。
function setAutoCalcFlag(flag: number) {
    registryRegister('CSaveController', {
        getSettingProp: (propName: string) =>
            propName === CSaveDataConst.propNameAttackAutoCalc ? BigInt(flag) : undefined,
    });
}

describe('calc-invalidation.js', () => {
    let calc: ReturnType<typeof vi.fn>;
    beforeEach(() => {
        calc = vi.fn();
        __registerHeadFunctions({ calc });
    });
    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('notifyChanged: 旧 AutoCalc(callFrom) のswitch文と等価なポリシー判定', () => {
        // 仕様（calc-invalidation.js 冒頭コメント参照）:
        // flag=0: ATTACK_METHOD 以外の既知kindでのみ再計算
        // flag=1: 既知kind（ATTACK_METHOD含む）ならすべて再計算
        // flag=2: 常に再計算しない
        // flag=3: kindに関わらず常に再計算
        // kind未指定: flag=3のときのみ再計算

        it('flag=0: CHARA/BUFF/MOBの変更で再計算する', () => {
            setAutoCalcFlag(0);
            notifyChanged(CalcInput.CHARA);
            expect(calc).toHaveBeenCalledTimes(1);
        });

        it('flag=0: ATTACK_METHODの変更では再計算しない', () => {
            setAutoCalcFlag(0);
            notifyChanged(CalcInput.ATTACK_METHOD);
            expect(calc).not.toHaveBeenCalled();
        });

        it('flag=0: kind未指定では再計算しない', () => {
            setAutoCalcFlag(0);
            notifyChanged(undefined);
            expect(calc).not.toHaveBeenCalled();
        });

        it('flag=1: ATTACK_METHODの変更でも再計算する（flag=0を包含する）', () => {
            setAutoCalcFlag(1);
            notifyChanged(CalcInput.ATTACK_METHOD);
            expect(calc).toHaveBeenCalledTimes(1);
        });

        it('flag=1: CHARA/BUFF/MOBの変更でも再計算する', () => {
            setAutoCalcFlag(1);
            notifyChanged(CalcInput.BUFF);
            expect(calc).toHaveBeenCalledTimes(1);
        });

        it('flag=1: kind未指定では再計算しない', () => {
            setAutoCalcFlag(1);
            notifyChanged(undefined);
            expect(calc).not.toHaveBeenCalled();
        });

        it('flag=2: 既知kindでも再計算しない', () => {
            setAutoCalcFlag(2);
            notifyChanged(CalcInput.ATTACK_METHOD);
            notifyChanged(CalcInput.CHARA);
            expect(calc).not.toHaveBeenCalled();
        });

        it('flag=3: kind未指定でも再計算する', () => {
            setAutoCalcFlag(3);
            notifyChanged(undefined);
            expect(calc).toHaveBeenCalledTimes(1);
        });

        it('flag=3: 任意のkindで再計算する', () => {
            setAutoCalcFlag(3);
            notifyChanged(CalcInput.DISPLAY);
            expect(calc).toHaveBeenCalledTimes(1);
        });
    });

    describe('notifyChangedLegacy: 旧 AutoCalc(callFrom) 文字列の後方互換シム', () => {
        it('既知の文字列（攻撃手段グループ）を ATTACK_METHOD として扱う', () => {
            setAutoCalcFlag(1);
            notifyChangedLegacy('CAttackMethodAreaComponentManager.OnChangeAttackMethod');
            expect(calc).toHaveBeenCalledTimes(1);
            calc.mockClear();
            setAutoCalcFlag(0);
            notifyChangedLegacy('CAttackMethodAreaComponentManager.OnChangeAttackMethod');
            expect(calc).not.toHaveBeenCalled();
        });

        it('既知の文字列（設定/バフグループ）は flag=0/1 どちらでも再計算する', () => {
            setAutoCalcFlag(0);
            notifyChangedLegacy('Click_A4');
            expect(calc).toHaveBeenCalledTimes(1);
        });

        it('未知の文字列（OnClickSkillLearnedLoad 含む）は kind未指定と同じ扱いになる', () => {
            setAutoCalcFlag(1);
            notifyChangedLegacy('OnClickSkillLearnedLoad');
            expect(calc).not.toHaveBeenCalled();
            setAutoCalcFlag(3);
            notifyChangedLegacy('OnClickSkillLearnedLoad');
            expect(calc).toHaveBeenCalledTimes(1);
        });
    });

    describe('requestRecalc: ポリシーを無視して常に再計算する', () => {
        it('flag=2（本来は再計算しない設定）でも再計算する', () => {
            setAutoCalcFlag(2);
            requestRecalc();
            expect(calc).toHaveBeenCalledTimes(1);
        });
    });

    describe('withBatch: バッチ中の通知をまとめて高々1回だけ再計算する', () => {
        it('バッチ中に複数回 notifyChanged しても、バッチ終了後に1回だけ計算する', () => {
            setAutoCalcFlag(3);
            withBatch(() => {
                notifyChanged(CalcInput.CHARA);
                notifyChanged(CalcInput.BUFF);
                notifyChanged(CalcInput.MOB);
            });
            expect(calc).toHaveBeenCalledTimes(1);
        });

        it('バッチ中に通知が無ければ、バッチ終了後も計算しない', () => {
            setAutoCalcFlag(3);
            withBatch(() => {});
            expect(calc).not.toHaveBeenCalled();
        });

        it('ネストしたバッチは最も外側の終了まで計算を遅延する', () => {
            setAutoCalcFlag(3);
            withBatch(() => {
                notifyChanged(CalcInput.CHARA);
                withBatch(() => {
                    notifyChanged(CalcInput.BUFF);
                });
                expect(calc).not.toHaveBeenCalled();
            });
            expect(calc).toHaveBeenCalledTimes(1);
        });

        it('バッチ中の requestRecalc も1回にまとめる', () => {
            setAutoCalcFlag(2);
            withBatch(() => {
                requestRecalc();
                requestRecalc();
            });
            expect(calc).toHaveBeenCalledTimes(1);
        });
    });

    describe('readAutoCalcFlag: savedata propが未初期化のときはflag=0にフォールバックする（D3）', () => {
        it('CSaveController が未登録なら flag=0 として扱う（CHARA/BUFF/MOBで再計算、ATTACK_METHODでは再計算しない）', () => {
            registryRegister('CSaveController', undefined);
            notifyChanged(CalcInput.CHARA);
            expect(calc).toHaveBeenCalledTimes(1);
            calc.mockClear();
            notifyChanged(CalcInput.ATTACK_METHOD);
            expect(calc).not.toHaveBeenCalled();
        });

        it('getSettingProp が undefined を返すなら flag=0 として扱う', () => {
            registryRegister('CSaveController', { getSettingProp: () => undefined });
            notifyChanged(CalcInput.BUFF);
            expect(calc).toHaveBeenCalledTimes(1);
        });
    });

    describe('onResults: コールバック登録の解除関数を返す', () => {
        it('登録解除関数を呼んでも例外にならない', () => {
            const cb = vi.fn();
            const unsubscribe = onResults(cb);
            expect(() => unsubscribe()).not.toThrow();
        });
    });
});
