import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MonsterToughness } from '@roro/monster.toughness.dat.js';

describe('monster.toughness.dat.js', () => {
    describe('エクスポート確認', () => {
        it('MonsterToughness がエクスポートされている', () => {
            expect(typeof MonsterToughness).toBe('function');
        });
    });

    describe('window互換確認', () => {
        it('window.MonsterToughness が設定されている', () => {
            expect((window as any).MonsterToughness).toBe(MonsterToughness);
        });
    });

    describe('静的フィールド確認', () => {
        it('DAMPING_NONE が 0', () => expect(MonsterToughness.DAMPING_NONE).toBe(0));
        it('DAMPING_5 が 1', () => expect(MonsterToughness.DAMPING_5).toBe(1));
        it('DAMPING_10 が 2', () => expect(MonsterToughness.DAMPING_10).toBe(2));
        it('DAMPING_100 が 4', () => expect(MonsterToughness.DAMPING_100).toBe(4));
        it('DAMPING_TIME_DECAY が 8', () => expect(MonsterToughness.DAMPING_TIME_DECAY).toBe(8));
        it('DAMPING_AMPLIFY が 16', () => expect(MonsterToughness.DAMPING_AMPLIFY).toBe(16));
        it('DAMPING_1000 が 32', () => expect(MonsterToughness.DAMPING_1000).toBe(32));

        it('ToughnessList が Map である', () => {
            expect(MonsterToughness.ToughnessList instanceof Map).toBe(true);
        });

        it('notificationMessages が Map である', () => {
            expect((MonsterToughness as any).notificationMessages instanceof Map).toBe(true);
        });
    });

    describe('静的メソッド確認', () => {
        it('getToughnessCode が存在する', () => {
            expect(typeof MonsterToughness.getToughnessCode).toBe('function');
        });
        it('getMobName が存在する', () => {
            expect(typeof MonsterToughness.getMobName).toBe('function');
        });
        it('getNotification が存在する', () => {
            expect(typeof MonsterToughness.getNotification).toBe('function');
        });
    });

    describe('getToughnessCode の動作', () => {
        it('ToughnessList にある名前のコードを返す', () => {
            const name = MonsterToughness.ToughnessList.keys().next().value;
            const expected = MonsterToughness.ToughnessList.get(name);
            expect(MonsterToughness.getToughnessCode(name)).toBe(expected);
        });

        it('存在しない名前には DAMPING_NONE を返す', () => {
            expect(MonsterToughness.getToughnessCode('存在しないモンスター')).toBe(MonsterToughness.DAMPING_NONE);
        });
    });

    describe('getMobName の動作', () => {
        beforeEach(() => {
            (globalThis as any).MonsterObjNew = [];
            (globalThis as any).MonsterObjNew[1] = [1, 'テストモンスター'];
        });
        afterEach(() => {
            delete (globalThis as any).MonsterObjNew;
        });

        it('定義済みIDのモンスター名を返す', () => {
            expect(MonsterToughness.getMobName(1)).toBe('テストモンスター');
        });

        it('未定義IDは空文字列を返す', () => {
            expect(MonsterToughness.getMobName(9999)).toBe('');
        });
    });

    describe('getNotification の動作', () => {
        it('存在しないコードは空文字列を返す', () => {
            expect(MonsterToughness.getNotification(999)).toBe('');
        });
    });
});
