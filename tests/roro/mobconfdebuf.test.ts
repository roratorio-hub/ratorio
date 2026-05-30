import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import '/workspace/ratorio/roro/m/js/CConfBase.js';
import {
    MOB_CONF_DEBUF_ID_PROVOKE,
    MOB_CONF_DEBUF_ID_STUN,
    n_B_IJYOU,
    BuildUpMobConfDebufSelectArea,
    SyncronizeMobConfDebufSettingsCtrlToVar,
    OnChangeMobConfDebuf,
} from '@roro/mobconfdebuf.js';

function buildDOM() {
    const root = document.createElement('div');
    document.body.appendChild(root);
    BuildUpMobConfDebufSelectArea(root, true);
    return root;
}

describe('mobconfdebuf.js', () => {
    beforeEach(buildDOM);
    afterEach(() => { document.body.innerHTML = ''; });

    describe('SyncronizeMobConfDebufSettingsCtrlToVar', () => {
        it('セレクトボックス変更が n_B_IJYOU に反映される', () => {
            const sel = document.getElementById(
                `OBJID_SELECT_MOB_CONF_DEBUF_${MOB_CONF_DEBUF_ID_PROVOKE}`
            ) as HTMLSelectElement;
            sel.value = '3';
            SyncronizeMobConfDebufSettingsCtrlToVar();
            expect(n_B_IJYOU[MOB_CONF_DEBUF_ID_PROVOKE]).toBe(3);
        });

        it('チェックボックス変更が n_B_IJYOU に反映される', () => {
            const chk = document.getElementById(
                `OBJID_INPUT_MOB_CONF_DEBUF_${MOB_CONF_DEBUF_ID_STUN}`
            ) as HTMLInputElement;
            chk.checked = true;
            SyncronizeMobConfDebufSettingsCtrlToVar();
            expect(n_B_IJYOU[MOB_CONF_DEBUF_ID_STUN]).toBe(true);
        });
    });

    describe('OnChangeMobConfDebuf', () => {
        it('bCalc=false でもセレクト値が n_B_IJYOU に同期される', () => {
            const sel = document.getElementById(
                `OBJID_SELECT_MOB_CONF_DEBUF_${MOB_CONF_DEBUF_ID_PROVOKE}`
            ) as HTMLSelectElement;
            sel.value = '2';
            OnChangeMobConfDebuf(false);
            expect(n_B_IJYOU[MOB_CONF_DEBUF_ID_PROVOKE]).toBe(2);
        });
    });
});
