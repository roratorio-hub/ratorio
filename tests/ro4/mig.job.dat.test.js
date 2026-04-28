import { describe, it, expect, beforeAll } from 'vitest';

describe('mig.job.dat (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../ro4/m/js/data/mig.job.dat.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.MIG_JOB_ID_NOVICE が設定される', () => {
        expect(src).toContain('window.MIG_JOB_ID_NOVICE =');
    });

    it('window.MIG_JOB_ID_SWORDMAN が設定される', () => {
        expect(src).toContain('window.MIG_JOB_ID_SWORDMAN =');
    });
});
