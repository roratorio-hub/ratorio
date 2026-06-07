import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import '/workspace/ratorio/roro/m/js/CConfBase.js';
import {
    MOB_CONF_BUF_ID_SOKUDO_ZOKA,
    MOB_CONF_BUF_ID_ASSUMPTIO,
    n_B_KYOUKA,
    BuildUpMobConfBufSelectArea,
    SyncronizeMobConfBufSettingsCtrlToVar,
    OnChangeMobConfBuf,
} from '@roro/mobconfbuf.js';

// bAsExpand=true でセレクト要素を含む完全な DOM を構築する
function buildDOM() {
    const root = document.createElement('div');
    document.body.appendChild(root);
    BuildUpMobConfBufSelectArea(root, true);
    return root;
}

describe('mobconfbuf.js', () => {
    beforeEach(buildDOM);
    afterEach(() => { document.body.innerHTML = ''; });

    describe('SyncronizeMobConfBufSettingsCtrlToVar', () => {
        it('セレクトボックス変更が n_B_KYOUKA に反映される', () => {
            const sel = document.getElementById(
                `OBJID_SELECT_MOB_CONF_BUF_${MOB_CONF_BUF_ID_SOKUDO_ZOKA}`
            ) as HTMLSelectElement;
            sel.value = '5';
            SyncronizeMobConfBufSettingsCtrlToVar();
            expect(n_B_KYOUKA[MOB_CONF_BUF_ID_SOKUDO_ZOKA]).toBe(5);
        });

        it('チェックボックス変更が n_B_KYOUKA に反映される', () => {
            const chk = document.getElementById(
                `OBJID_INPUT_MOB_CONF_BUF_${MOB_CONF_BUF_ID_ASSUMPTIO}`
            ) as HTMLInputElement;
            chk.checked = true;
            SyncronizeMobConfBufSettingsCtrlToVar();
            // checked プロパティはboolean（HtmlGetObjectCheckedById の戻り値）
            expect(n_B_KYOUKA[MOB_CONF_BUF_ID_ASSUMPTIO]).toBe(true);
        });
    });

    describe('OnChangeMobConfBuf', () => {
        it('bCalc=false でもセレクト値が n_B_KYOUKA に同期される', () => {
            const sel = document.getElementById(
                `OBJID_SELECT_MOB_CONF_BUF_${MOB_CONF_BUF_ID_SOKUDO_ZOKA}`
            ) as HTMLSelectElement;
            sel.value = '3';
            OnChangeMobConfBuf(false);
            expect(n_B_KYOUKA[MOB_CONF_BUF_ID_SOKUDO_ZOKA]).toBe(3);
        });
    });
});
