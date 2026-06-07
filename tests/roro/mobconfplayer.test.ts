import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import '/workspace/ratorio/roro/m/js/CConfBase.js';
import {
    MOB_CONF_PLAYER_ID_DEF_DIV,
    MOB_CONF_PLAYER_DATA_INDEX_ID,
    MOB_CONF_PLAYER_DATA_INDEX_CONTROL_TYPE,
    n_B_TAISEI,
    MobConfPlayerOBJ,
    SyncronizeMobConfPlayerSettingsCtrlToVar,
    OnChangeMobConfPlayer,
} from '@roro/mobconfplayer.js';

// BuildUpMobConfPlayerSelectArea(root, true) は max=1500 等の大量 option を生成して OOM になるため使用不可。
// MobConfPlayerOBJ を使い、全エントリの最小限 DOM 要素を手動で生成する。
function buildMinimalDOM() {
    const w = window as any;
    for (const entry of MobConfPlayerOBJ as any[]) {
        const confId = entry[MOB_CONF_PLAYER_DATA_INDEX_ID];
        const ct = entry[MOB_CONF_PLAYER_DATA_INDEX_CONTROL_TYPE];
        if (ct === w.CONTROL_TYPE_SELECTBOX_NUMBER || ct === w.CONTROL_TYPE_SELECTBOX_SPECIAL) {
            const sel = document.createElement('select');
            sel.id = `OBJID_SELECT_MOB_CONF_PLAYER_${confId}`;
            const opt = document.createElement('option');
            opt.value = '0';
            sel.appendChild(opt);
            document.body.appendChild(sel);
        } else if (ct === w.CONTROL_TYPE_TEXTBOX_NUMBER || ct === w.CONTROL_TYPE_TEXTBOX_SPECIAL) {
            const inp = document.createElement('input');
            inp.type = 'text';
            inp.id = `OBJID_INPUT_MOB_CONF_PLAYER_${confId}`;
            inp.value = '0';
            document.body.appendChild(inp);
        }
        // CONTROL_TYPE_CHECKBOX 系: HtmlGetObjectCheckedById は要素が null でも
        // valueWhenNull を返して throw しないため要素作成不要
    }
    const header = document.createElement('td');
    header.id = 'OBJID_TD_MOB_CONF_PLAYER_HEADER';
    document.body.appendChild(header);
}

describe('mobconfplayer.js', () => {
    beforeEach(buildMinimalDOM);
    afterEach(() => { document.body.innerHTML = ''; });

    describe('SyncronizeMobConfPlayerSettingsCtrlToVar', () => {
        it('セレクトボックス変更が n_B_TAISEI に反映される', () => {
            const sel = document.getElementById(
                `OBJID_SELECT_MOB_CONF_PLAYER_${MOB_CONF_PLAYER_ID_DEF_DIV}`
            ) as HTMLSelectElement;
            // テスト対象の値をオプションに追加して選択
            const opt = document.createElement('option');
            opt.value = '100';
            sel.appendChild(opt);
            sel.value = '100';

            SyncronizeMobConfPlayerSettingsCtrlToVar();
            expect(n_B_TAISEI[MOB_CONF_PLAYER_ID_DEF_DIV]).toBe(100);
        });
    });

    describe('OnChangeMobConfPlayer', () => {
        it('bCalc=false でもセレクト値が n_B_TAISEI に同期される', () => {
            const sel = document.getElementById(
                `OBJID_SELECT_MOB_CONF_PLAYER_${MOB_CONF_PLAYER_ID_DEF_DIV}`
            ) as HTMLSelectElement;
            const opt = document.createElement('option');
            opt.value = '500';
            sel.appendChild(opt);
            sel.value = '500';

            OnChangeMobConfPlayer(false);
            expect(n_B_TAISEI[MOB_CONF_PLAYER_ID_DEF_DIV]).toBe(500);
        });
    });
});
