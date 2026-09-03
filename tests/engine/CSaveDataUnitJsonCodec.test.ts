import { describe, it, expect } from 'vitest';
import { serializeSaveDataUnitsToJSON } from '@engine/savedata/CSaveDataUnitJsonCodec.js';

/** テスト用の最小ユニット（CSaveDataUnitBase 互換の parsedMap/propInfoMap だけを持つ） */
function makeUnit(parsedEntries: [string, unknown][], propInfoEntries: [string, { name: string; bits: number }][]) {
    return {
        parsedMap: new Map(parsedEntries),
        propInfoMap: new Map(propInfoEntries),
    };
}

describe('CSaveDataUnitJsonCodec.js', () => {
    it('parsedMap/propInfoMap を Map から Object へ変換した JSON を返す', () => {
        const unit = makeUnit(
            [['type', 802], ['version', 1]],
            [['type', { name: 'type', bits: 12 }], ['version', { name: 'version', bits: 6 }]],
        );
        const json = JSON.parse(serializeSaveDataUnitsToJSON([unit]));
        expect(json).toEqual([{
            parsedMap: { type: 802, version: 1 },
            propInfoMap: { type: { name: 'type', bits: 12 }, version: { name: 'version', bits: 6 } },
        }]);
    });

    it('BigInt 値を文字列化する', () => {
        const unit = makeUnit([['jobID', 42n]], [['jobID', { name: 'jobID', bits: 7 }]]);
        const json = JSON.parse(serializeSaveDataUnitsToJSON([unit]));
        expect(json[0].parsedMap.jobID).toBe('42');
    });

    it('複数ユニットを配列順に並べる', () => {
        const unitA = makeUnit([['type', 1]], []);
        const unitB = makeUnit([['type', 2]], []);
        const json = JSON.parse(serializeSaveDataUnitsToJSON([unitA, unitB]));
        expect(json.map((u: any) => u.parsedMap.type)).toEqual([1, 2]);
    });

    it('空配列を渡すと空配列の JSON を返す', () => {
        expect(serializeSaveDataUnitsToJSON([])).toBe('[]');
    });
});
