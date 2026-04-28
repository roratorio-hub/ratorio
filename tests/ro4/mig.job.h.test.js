import { describe, it, expect, beforeAll } from 'vitest';
import '../../roro/m/js/CGlobalConstManager.js';

describe('mig.job.h (ソース検証)', () => {
    let src = '';

    beforeAll(async () => {
        const url = new URL('../../ro4/m/js/data/mig.job.h.js', import.meta.url);
        const res = await fetch(url);
        src = await res.text();
    });

    it('window.JOB_ID_ANY が設定される', () => {
        expect(src).toContain('window.JOB_ID_ANY =');
    });

    it('window.JOB_SERIES_ID_NOVICE が設定される', () => {
        expect(src).toContain('window.JOB_SERIES_ID_NOVICE');
    });

    it('window.JOB_SERIES_ID_SUMMONER が設定される', () => {
        expect(src).toContain('window.JOB_SERIES_ID_SUMMONER');
    });

    it('window.g_unconfirmedHPSPArray が設定される', () => {
        expect(src).toContain('window.g_unconfirmedHPSPArray =');
    });

    it('window compat ブロックで GetJobName が設定される', () => {
        expect(src).toContain('window.GetJobName');
    });

    it('window compat ブロックで GetLowerJobSeriesID が設定される', () => {
        expect(src).toContain('window.GetLowerJobSeriesID');
    });

    it('window compat ブロックで UpgradeJobTo4th が設定される', () => {
        expect(src).toContain('window.UpgradeJobTo4th');
    });
});
