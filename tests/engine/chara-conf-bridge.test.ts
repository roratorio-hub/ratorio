import { describe, it, expect, beforeAll } from 'vitest';

// chara-conf-bridge.js の4アクセサが、それぞれ対応する支援欄（一次〜四次）の配列を読むこと。
// 欄の取り違え（例: Yozi が Sanzi を読む）を検出する。

let bridge: any;
let globalMod: any;

beforeAll(async () => {
    // global.js が module-level で Register* を実行する。import 順は TDZ 回避のため固定
    await import('@engine/data/mig.job.dat.js');
    await import('@engine/skill/learnedskill.js');
    await import('@engine/skill/skillstate.js');
    await import('@engine/chara/chara.js');
    globalMod = await import('@engine/runtime/global.js');
    bridge = await import('@engine/bridge/chara-conf-bridge.js');
});

describe('chara-conf-bridge.js', () => {
    it('GetCharaConfXxx は対応する支援欄の配列から confId の値を返す', () => {
        globalMod.set_g_confDataIchizi([11, 12]);
        globalMod.set_g_confDataNizi([21, 22]);
        globalMod.set_g_confDataSanzi([31, 32]);
        globalMod.set_g_confDataYozi([41, 42]);
        expect(bridge.GetCharaConfIchizi(1)).toBe(12);
        expect(bridge.GetCharaConfNizi(1)).toBe(22);
        expect(bridge.GetCharaConfSanzi(1)).toBe(32);
        expect(bridge.GetCharaConfYozi(1)).toBe(42);
    });

    it('設定値の変更は次の呼び出しに反映される（配列を差し替えても古い参照を握らない）', () => {
        globalMod.set_g_confDataYozi([5]);
        expect(bridge.GetCharaConfYozi(0)).toBe(5);
        globalMod.set_g_confDataYozi([0]);
        expect(bridge.GetCharaConfYozi(0)).toBe(0);
    });
});
