const SEARCHABLE_SELECT_LIST = [
    '#OBJID_SELECT_JOB',
    '#OBJID_ARMS_RIGHT',
    '#OBJID_ARMS_RIGHT_CARD_1',
    '#OBJID_ARMS_RIGHT_CARD_2',
    '#OBJID_ARMS_RIGHT_CARD_3',
    '#OBJID_ARMS_RIGHT_CARD_4',
    '#OBJID_ARMS_LEFT',
    '#OBJID_ARMS_LEFT_CARD_1',
    '#OBJID_ARMS_LEFT_CARD_2',
    '#OBJID_ARMS_LEFT_CARD_3',
    '#OBJID_ARMS_LEFT_CARD_4',
    '#OBJID_HEAD_TOP',
    '#OBJID_HEAD_TOP_CARD_1',
    '#OBJID_HEAD_MID',
    '#OBJID_HEAD_MID_CARD_1',
    '#OBJID_HEAD_UNDER',
    '#OBJID_SHIELD',
    '#OBJID_SHIELD_CARD_1',
    '#OBJID_BODY',
    '#OBJID_BODY_CARD_1',
    '#OBJID_SHOULDER',
    '#OBJID_SHOULDER_CARD_1',
    '#OBJID_SHOES',
    '#OBJID_SHOES_CARD_1',
    '#OBJID_ACCESSORY_1',
    '#OBJID_ACCESSORY_1_CARD_1',
    '#OBJID_ACCESSORY_1_CARD_4',
    '#OBJID_ACCESSORY_2',
    '#OBJID_ACCESSORY_2_CARD_1',
    '#OBJID_ACCESSORY_2_CARD_4',
    '.OBJID_MONSTER_MAP_CATEGORY',
    '.OBJID_MONSTER_MAP_MAP',
    '.OBJID_MONSTER_MAP_MONSTER',
];

// dropdown_input プラグインを TomSelect に登録
TomSelect.define('dropdown_input', window.dropdown_input);

// コンパクト表示 CSS は tom-select.custom.css に切り出し、各 HTML から <link> で読み込む。

/**
 * 指定された select を TomSelect で初期化（再初期化時は既存インスタンスを破棄）
 *
 * destroy() は revertSettings.innerHTML を復元して el.value をリセットするため、
 * 事前に value と innerHTML を保存し、destroy 後に復元してから再初期化する。
 */
function LoadTomSelectSpecify(select_id) {
    document.querySelectorAll(select_id).forEach(el => {
        if (!(el instanceof HTMLSelectElement)) return;
        try {
            const isEnchant = Array.from(el.options).some(o => o.text.includes('エンチャントなし'));
            if (el.tomselect) {
                const savedValue = el.value;
                // Tom Select の updateOriginalInput() は選択時に <option> を DOM 末尾へ
                // appendChild() するため、innerHTML をそのまま保存すると再初期化後に
                // 選択済み option が末尾に移動してしまう。
                // 保存前に $order（初期化時に付与された元の順序）でソートして元に戻す。
                // ts.options に存在しない option（ゲームロジックが再生成したもの）は
                // Infinity 扱いで末尾にまとまり、ゲーム側の生成順が維持される。
                const tsOpts = el.tomselect.options;
                Array.from(el.options)
                    .sort((a, b) => {
                        const oa = tsOpts[a.value] ?? tsOpts[encodeURIComponent(a.value)];
                        const ob = tsOpts[b.value] ?? tsOpts[encodeURIComponent(b.value)];
                        return (oa?.$order ?? Infinity) - (ob?.$order ?? Infinity);
                    })
                    .forEach(opt => el.appendChild(opt));
                const savedHTML = el.innerHTML;
                el.tomselect.destroy();
                el.innerHTML = savedHTML;
                el.value = savedValue;
            }
            if (isEnchant) return;
            const ts = new TomSelect(el, {
                maxOptions: null,
                plugins: ['dropdown_input'],
            });
            // 検索欄が空の状態で DEL を押しても選択値を消去しない
            // （存在しない空文字が 'change' で流れてゲームロジックがクラッシュするため）
            ts.deleteSelection = () => false;
        } catch (e) {
            console.warn('[TomSelect] init failed for', select_id, e);
        }
    });
}

/**
 * SEARCHABLE_SELECT_LIST の全要素を TomSelect で初期化
 * 画面初期化時などに呼ばれる
 */
function LoadTomSelect() {
    SEARCHABLE_SELECT_LIST.forEach(LoadTomSelectSpecify);
}

// 職業・装備変更時にカード選択欄が再生成されるため、
// 変更後に LoadTomSelect() を自動実行して新しい DOM を TomSelect 化する。
// （旧実装の INIT_TRIGGER_LIST + change ワークアラウンドに相当する役割）
(function() {
    const INIT_TRIGGER_IDS = new Set([
        'OBJID_SELECT_JOB',
        // 武器タイプ変更は対応する武器 select の option を作り直すため、
        // ラップしている TomSelect も再生成して表示を同期する
        'OBJID_ARMS_TYPE_RIGHT',
        'OBJID_ARMS_TYPE_LEFT',
        'OBJID_ARMS_RIGHT',
        'OBJID_ARMS_LEFT',
        'OBJID_HEAD_TOP',
        'OBJID_HEAD_MID',
        'OBJID_HEAD_UNDER',
        'OBJID_SHIELD',
        'OBJID_BODY',
        'OBJID_SHOULDER',
        'OBJID_SHOES',
        'OBJID_ACCESSORY_1',
        'OBJID_ACCESSORY_2',
    ]);
    // モンスターマップは id ではなく class で識別される（CCustomSelectBase 由来）。
    // カテゴリ→マップ→モンスターのカスケードで関連 select が作り直されるため、
    // これらの変更後も LoadTomSelect() で再初期化して表示を同期する。
    const INIT_TRIGGER_CLASSES = [
        'OBJID_MONSTER_MAP_CATEGORY',
        'OBJID_MONSTER_MAP_MAP',
        'OBJID_MONSTER_MAP_MONSTER',
    ];
    const isTrigger = (el) => {
        if (!(el instanceof HTMLSelectElement)) return false;
        if (INIT_TRIGGER_IDS.has(el.id)) return true;
        return INIT_TRIGGER_CLASSES.some(cls => el.classList.contains(cls));
    };
    // document レベルで 'change' をキャッチ（バブルフェーズ）。
    // OnChangeJob やカスケード等は select 上のリスナーで先に完了しているため、
    // ここで LoadTomSelect() を呼ぶ時点では再生成済みの DOM が存在する。
    document.addEventListener('change', (e) => {
        if (isTrigger(e.target)) {
            LoadTomSelect();
        }
    });
})();

// HOME / END でドロップダウンのハイライトを先頭 / 末尾へ移動する。
// 矢印キーは Tom Select 標準（開く / ハイライト移動）のまま。
// Tom Select は HOME(36)/END(35) を処理しないため、ここで補完する。
const KEY_END = 35;
const KEY_HOME = 36;
document.addEventListener('keydown', (e) => {
    if (e.keyCode !== KEY_HOME && e.keyCode !== KEY_END) return;
    if (!(e.target instanceof Element)) return;
    const wrapper = e.target.closest('.ts-wrapper');
    if (!wrapper) return;
    // Tom Select は元の <select> の直後に wrapper を挿入する
    const sel = wrapper.previousElementSibling;
    const ts = sel && sel.tomselect;
    if (!ts || !ts.isOpen) return;
    const opts = ts.dropdown_content.querySelectorAll('[data-selectable]');
    if (opts.length === 0) return;
    e.preventDefault();   // ページスクロール抑止
    ts.setActiveOption(e.keyCode === KEY_HOME ? opts[0] : opts[opts.length - 1]);
}, true);
