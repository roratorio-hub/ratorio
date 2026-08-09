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

// キーボード操作でドロップダウンを開かずに ↑↓ で確定するための定数（#1496）。
const KEY_HOME = 36;
const KEY_END = 35;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_SPACE = 32;
const KEY_IME_PROCESS = 229; // IME 変換中の keydown（Chrome / Edge 等）

// キーボードによる確定処理の実行中フラグ。
// 確定は native 'change' を発火させ、それが LoadTomSelect() の再帰を招くため、
// document 'change' リスナー側でこのフラグを見て再初期化をまとめる（後述）。
let g_tomSelectKeyStepping = false;

// キーリピート中に LoadTomSelect() の実行をまとめるためのタイマー。
// 矢印キーで装備を送るたびに 34 個すべてを破棄・再構築すると連打に追従できないため、
// 押下が続いている間は 1 回にまとめ、押下が止まってから反映する。
let g_loadTomSelectTimer = 0;
const REINIT_COALESCE_MS = 120;

/**
 * DOM の option 値集合と TomSelect の options dict のキー集合を比較する。
 *
 * 空値 ("") は TomSelect が未選択時に作るダミーであり options dict には
 * 含まれないため、比較から除外する。
 * @param {HTMLSelectElement} el
 * @param {object} ts TomSelect インスタンス
 * @returns {boolean} オプション集合が一致していれば true
 */
function IsSameOptionSet(el, ts) {
    const tsOpts = ts.options;
    const curVals = new Set(Array.from(el.options).map(o => String(o.value)).filter(v => v !== ''));
    const tsVals = new Set(Object.keys(tsOpts));
    return curVals.size === tsVals.size &&
        [...curVals].every(v => tsVals.has(v) || tsVals.has(encodeURIComponent(v)));
}

/**
 * ユーザーが今まさに操作している（フォーカス中 or ドロップダウンが開いている）か判定する。
 * @param {object} ts TomSelect インスタンス
 * @returns {boolean}
 */
function IsBusyTomSelect(ts) {
    if (!ts) return false;
    if (ts.isOpen || ts.isFocused) return true;
    return !!(ts.wrapper && ts.wrapper.contains(document.activeElement));
}

/**
 * 操作が終わる（blur する）まで再初期化を先送りする。
 *
 * destroy() 済みでない間は el.tomselect が生きたままなので、
 * 先送り中に他経路（LoadTomSelect() の再実行等）で作り直されても
 * el.tomselect !== ts の比較で二重初期化を防げる。
 * @param {string} select_id LoadTomSelectSpecify に渡ったセレクタ文字列
 * @param {HTMLSelectElement} el
 * @param {object} ts TomSelect インスタンス
 */
function DeferReinitUntilBlur(select_id, el, ts) {
    if (ts.__roReinitPending) return;
    ts.__roReinitPending = true;
    ts.on('blur', () => {
        setTimeout(() => {
            if (!el.isConnected || el.tomselect !== ts) return;
            if (IsBusyTomSelect(ts)) return;
            LoadTomSelectSpecify(select_id);
        }, 0);
    });
}

/**
 * 単一の select 要素に対して TomSelect インスタンスを新規構築する。
 * @param {HTMLSelectElement} el
 */
function InitTomSelectInstance(el) {
    const ts = new TomSelect(el, {
        maxOptions: null,
        // Tab でフォーカスしただけではドロップダウンを開かない（ネイティブ select 準拠・#1496）。
        // 開く手段は Alt+↑↓ / Space / クリック（下記 onClick フックと keydown リスナーで担保）。
        openOnFocus: false,
        plugins: ['dropdown_input'],
    });
    // 検索欄が空の状態で DEL を押しても選択値を消去しない
    // （存在しない空文字が 'change' で流れてゲームロジックがクラッシュするため）
    ts.deleteSelection = () => false;

    // openOnFocus:false にすると素の onClick() は focus() するだけで開かなくなるため、
    // クリックで開く挙動をここで明示的に補う（従来どおりトグル動作）。
    ts.hook('instead', 'onClick', () => {
        if (ts.activeItems.length > 0) {
            ts.clearActiveItems();
            ts.focus();
            return;
        }
        if (ts.isFocused && ts.isOpen) {
            ts.blur();
            return;
        }
        OpenTomSelectDropdown(ts);
    });
}

/**
 * ドロップダウンを開き、現在値をハイライト・スクロール表示する。
 * @param {object} ts TomSelect インスタンス
 */
function OpenTomSelectDropdown(ts) {
    ts.focus();
    ts.refreshOptions(true);
}

/**
 * 指定された select を TomSelect で初期化（再初期化時は既存インスタンスを破棄）
 *
 * destroy() は revertSettings.innerHTML を復元して el.value をリセットするため、
 * 事前に value と innerHTML を保存し、destroy 後に復元してから再初期化する。
 *
 * ただし、ユーザーが今まさに操作している（フォーカス中 or ドロップダウンが開いている）
 * インスタンスを破棄すると wrapper ごと作り直されてフォーカスが失われ、矢印キーによる
 * 連続確定操作が 1 回で途切れてしまう（#1496）。オプション集合・選択値のいずれも
 * 変わっていない場合に限り、再初期化を blur まで先送りする。先送り中に DOM 順序が
 * 汚れても、blur 後の destroy() が revertSettings.innerHTML（正しい50音順）を
 * 復元するため崩れない。
 */
function LoadTomSelectSpecify(select_id) {
    document.querySelectorAll(select_id).forEach(el => {
        if (!(el instanceof HTMLSelectElement)) return;
        try {
            const isEnchant = Array.from(el.options).some(o => o.text.includes('エンチャントなし'));
            if (el.tomselect) {
                const ts = el.tomselect;
                const savedValue = el.value;
                // TomSelect の updateOriginalInput() は選択時に <option> を DOM 末尾へ移動する。
                // ただし destroy() は revertSettings.innerHTML（sync() 前の正しい50音順）を
                // 自動復元するため、オプションセットが変わっていない場合は destroy() だけで十分。
                //
                // オプションセットが変化した場合（ジョブ/武器種変更でゲームロジックが再構築）は
                // destroy() で古い revertSettings が復元されてしまうため、現在の DOM を退避する。
                const sameSet = IsSameOptionSet(el, ts);

                if (sameSet && String(el.value) === String(ts.getValue()) && IsBusyTomSelect(ts)) {
                    DeferReinitUntilBlur(select_id, el, ts);
                    return;
                }

                if (sameSet) {
                    // destroy() が revertSettings.innerHTML（正しい50音順）を復元する。
                    ts.destroy();
                } else {
                    // ゲームロジックが正しい50音順で再構築済みの DOM を退避・復元する。
                    const savedHTML = el.innerHTML;
                    ts.destroy();
                    el.innerHTML = savedHTML;
                }
                el.value = savedValue;
            }
            if (isEnchant) return;
            InitTomSelectInstance(el);
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
    clearTimeout(g_loadTomSelectTimer);
    g_loadTomSelectTimer = 0;
    SEARCHABLE_SELECT_LIST.forEach(LoadTomSelectSpecify);
}

/**
 * キーリピート中は 34 個の破棄・再構築が押下間隔に追従できないため、
 * 矢印キーによる確定が続いている間は LoadTomSelect() の実行をまとめる。
 */
function ScheduleLoadTomSelect() {
    clearTimeout(g_loadTomSelectTimer);
    g_loadTomSelectTimer = setTimeout(() => {
        g_loadTomSelectTimer = 0;
        LoadTomSelect();
    }, REINIT_COALESCE_MS);
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
        if (!isTrigger(e.target)) return;
        // 矢印キーによる確定中は、押下が続く間 34 個の再構築をまとめる。
        if (g_tomSelectKeyStepping) {
            ScheduleLoadTomSelect();
            return;
        }
        LoadTomSelect();
    });
    // 先送り中に他の操作（クリック）が始まったら、古い表示のまま触らせないよう即座に反映する。
    document.addEventListener('mousedown', () => {
        if (g_loadTomSelectTimer) LoadTomSelect();
    }, true);
})();

/**
 * イベント発生元から TomSelect インスタンスを引く
 * （Tom Select は元の select の直後に wrapper を挿入する）。
 * @param {EventTarget} target
 * @returns {object|null} TomSelect インスタンス
 */
function FindTomSelectFromEvent(target) {
    if (!(target instanceof Element)) return null;
    const wrapper = target.closest('.ts-wrapper');
    if (!wrapper) return null;
    const sel = wrapper.previousElementSibling;
    return (sel && sel.tomselect) || null;
}

/**
 * activeOption が未確定、または検索欄に残留した絞り込み文字列がある場合に、
 * ドロップダウンを開かずに一覧を組み立てて現在値をハイライトする。
 * @param {object} ts TomSelect インスタンス
 */
function EnsureActiveOption(ts) {
    const hasStaleFilter = !!(ts.control_input && ts.control_input.value !== '');
    if (hasStaleFilter) ts.control_input.value = '';
    if (!hasStaleFilter && ts.activeOption && ts.dropdown_content.contains(ts.activeOption)) return;
    ts.refreshOptions(false);
}

/**
 * ハイライトされている option を、ドロップダウンの開閉状態を変えずに確定する
 * （ネイティブ <select> の ↑↓ と同じ「Enter 不要」の操作感・#1496）。
 *
 * addItem() は closeAfterSelect が未設定だと単一選択モードで必ず close() する
 * （tom-select.js の `settings.closeAfterSelect != false && isFull()` 判定）。
 * close() は dropdown_input プラグインの before-close フックでフォーカスを
 * control へ戻すため、キーリピート中はフォーカスが跳ねて操作が途切れる。
 * このため確定処理の間だけ closeAfterSelect を固定し、開閉状態を変えない。
 * クリックや Enter による確定はこの関数を通らないため挙動は従来どおり。
 * @param {object} ts TomSelect インスタンス
 * @param {Element} option data-selectable を持つドロップダウン内の要素
 */
function CommitActiveOption(ts, option) {
    const value = option.dataset.value;
    if (typeof value === 'undefined') return;
    ts.setActiveOption(option);
    const savedCloseAfterSelect = ts.settings.closeAfterSelect;
    ts.settings.closeAfterSelect = false;
    g_tomSelectKeyStepping = true;
    try {
        ts.addItem(value);
    } finally {
        g_tomSelectKeyStepping = false;
        ts.settings.closeAfterSelect = savedCloseAfterSelect;
    }
}

// HOME / END でドロップダウンのハイライトを先頭 / 末尾へ移動する。
// 矢印キーは Tom Select 標準（開く / ハイライト移動）のまま。
// Tom Select は HOME(36)/END(35) を処理しないため、ここで補完する。
document.addEventListener('keydown', (e) => {
    if (e.keyCode !== KEY_HOME && e.keyCode !== KEY_END) return;
    const ts = FindTomSelectFromEvent(e.target);
    if (!ts || !ts.isOpen) return;
    const opts = ts.dropdown_content.querySelectorAll('[data-selectable]');
    if (opts.length === 0) return;
    e.preventDefault();   // ページスクロール抑止
    ts.setActiveOption(e.keyCode === KEY_HOME ? opts[0] : opts[opts.length - 1]);
}, true);

// ↑ / ↓ はドロップダウンが閉じている間、開かずに前後の項目へ移動して即座に確定する
// （ネイティブ <select> と同じ「Enter 不要」の操作感・#1496）。
// 開いている間はハイライト移動のみという Tom Select 標準の挙動をそのまま使う
// （確定は Enter・クリックのまま）。
//
// Alt+↑↓ / Space は「開くだけ」（ネイティブ <select> 準拠）。
// Tom Select 標準の onKeyDown は KEY_DOWN（Alt の有無を見ない）でのみ open() し、
// KEY_UP では開かない・Space は未対応（何もしないため既定でページスクロールする）。
// ネイティブと挙動を合わせるため、ここで 3 つとも明示的に処理する。
document.addEventListener('keydown', (e) => {
    if (e.keyCode !== KEY_UP && e.keyCode !== KEY_DOWN && e.keyCode !== KEY_SPACE) return;
    if (e.isComposing || e.keyCode === KEY_IME_PROCESS) return;   // IME 変換中は候補選択を優先
    if (e.ctrlKey || e.metaKey) return;

    const ts = FindTomSelectFromEvent(e.target);
    if (!ts || ts.isOpen) return;   // 開いている時は Tom Select 標準 / 検索欄入力に任せる

    if (e.altKey || e.keyCode === KEY_SPACE) {
        e.preventDefault();    // Space によるページスクロール抑止
        e.stopPropagation();
        OpenTomSelectDropdown(ts);
        return;
    }

    EnsureActiveOption(ts);
    const next = ts.getAdjacent(ts.activeOption, e.keyCode === KEY_DOWN ? 1 : -1);
    e.preventDefault();
    e.stopPropagation();   // Tom Select 標準の onKeyDown（open()）を止める
    if (!next) return;     // 端では何もしない（ネイティブ同様ラップしない）
    CommitActiveOption(ts, next);
}, true);
