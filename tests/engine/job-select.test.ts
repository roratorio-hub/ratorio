import { vi, describe, it, expect } from 'vitest';

const mockJobSelect = vi.hoisted(() => ({
    constDataManager: null as any,
}));

vi.mock('@engine/runtime/global.js', async (importActual) => {
    const actual = await importActual<any>();
    return { ...actual, get g_constDataManager() { return mockJobSelect.constDataManager ?? actual.g_constDataManager; } };
});

import { BuildJobSelectOptions } from '@engine/ui/job-select.js';

// job.yaml 廃止後、選択肢は計算エンジンの職業データから構築される。
// option の value は mig ID の数値文字列でなければならない
// （JS エンジン側が parseInt して GetBaseLevelMin 等の数値引数に渡すため）。
function setJobData(entries: (string | null)[]) {
    mockJobSelect.constDataManager = {
        jobDataManager: {
            sourceArray: entries.map((name) => (name === null ? null : {})),
            GetName: (migId: number) => entries[migId],
        },
    };
}

describe('job-select.js', () => {
    describe('BuildJobSelectOptions', () => {
        it('mig ID を value、職業名を表示テキストにした選択肢を構築する', () => {
            const selectJob = document.createElement('select');
            setJobData(['ノービス', 'ソードマン', 'マジシャン']);

            BuildJobSelectOptions(selectJob);

            expect(Array.from(selectJob.options).map((o) => [o.value, o.text])).toEqual([
                ['0', 'ノービス'],
                ['1', 'ソードマン'],
                ['2', 'マジシャン'],
            ]);
        });

        it('value は parseInt で元の mig ID に戻せる', () => {
            const selectJob = document.createElement('select');
            setJobData(['ノービス', 'ソードマン', 'マジシャン']);

            BuildJobSelectOptions(selectJob);
            selectJob.value = '2';

            expect(parseInt(selectJob.value, 10)).toBe(2);
        });

        it('欠番（sourceArray が空）の mig ID は選択肢に含めない', () => {
            const selectJob = document.createElement('select');
            setJobData(['ノービス', null, 'マジシャン']);

            BuildJobSelectOptions(selectJob);

            expect(Array.from(selectJob.options).map((o) => o.value)).toEqual(['0', '2']);
        });

        it('名称が空の職業は選択肢に含めない', () => {
            const selectJob = document.createElement('select');
            setJobData(['ノービス', '', 'マジシャン']);

            BuildJobSelectOptions(selectJob);

            expect(Array.from(selectJob.options).map((o) => o.value)).toEqual(['0', '2']);
        });

        it('エンジンデータが未登録なら選択肢を追加しない', () => {
            const selectJob = document.createElement('select');
            mockJobSelect.constDataManager = { jobDataManager: null };

            BuildJobSelectOptions(selectJob);

            expect(selectJob.options.length).toBe(0);
        });
    });
});
