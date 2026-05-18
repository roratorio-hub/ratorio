import { describe, it, expect } from 'vitest';
import {
    MONSTER_GROUP_ID_MANUKU,
    MONSTER_GROUP_ID_UKNW_RUIN,
    MonsterGroupObj,
} from '@roro/monstergroup.dat.js';

describe('monstergroup.dat.js', () => {
    describe('エクスポート確認（定数）', () => {
        it('MONSTER_GROUP_ID_MANUKU が 0', () => {
            expect(MONSTER_GROUP_ID_MANUKU).toBe(0);
        });
        it('MONSTER_GROUP_ID_UKNW_RUIN が 65', () => {
            expect(MONSTER_GROUP_ID_UKNW_RUIN).toBe(65);
        });
    });

    describe('エクスポート確認（データ）', () => {
        it('MonsterGroupObj が配列', () => {
            expect(Array.isArray(MonsterGroupObj)).toBe(true);
        });
        it('MonsterGroupObj が 66 件', () => {
            expect(MonsterGroupObj).toHaveLength(66);
        });
    });

    describe('window互換確認', () => {
        it('window.MONSTER_GROUP_ID_MANUKU が設定されている', () => {
            expect((window as any).MONSTER_GROUP_ID_MANUKU).toBe(MONSTER_GROUP_ID_MANUKU);
        });
        it('window.MONSTER_GROUP_ID_UKNW_RUIN が設定されている', () => {
            expect((window as any).MONSTER_GROUP_ID_UKNW_RUIN).toBe(MONSTER_GROUP_ID_UKNW_RUIN);
        });
        it('window.MonsterGroupObj が設定されている', () => {
            expect((window as any).MonsterGroupObj).toBe(MonsterGroupObj);
        });
    });
});
