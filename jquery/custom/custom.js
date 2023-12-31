const CARD_SELECT_ID = [
    '#OBJID_ARMS_RIGHT_CARD_1',
    '#OBJID_ARMS_RIGHT_CARD_2',
    '#OBJID_ARMS_RIGHT_CARD_3',
    '#OBJID_ARMS_RIGHT_CARD_4',
    '#OBJID_ARMS_LEFT_CARD_1',
    '#OBJID_ARMS_LEFT_CARD_2',
    '#OBJID_ARMS_LEFT_CARD_3',
    '#OBJID_ARMS_LEFT_CARD_4',
    '#OBJID_HEAD_TOP_CARD_1',
    '#OBJID_HEAD_MID_CARD_1',
    '#OBJID_SHIELD_CARD_1',
    '#OBJID_BODY_CARD_1',
    '#OBJID_SHOULDER_CARD_1',
    '#OBJID_SHOES_CARD_1',
    '#OBJID_ACCESSARY_1_CARD_1',
    '#OBJID_ACCESSARY_2_CARD_1',
    ];
const PRESERVED_HEAD_OPTIONS = [
    '(カードなし)',
    '物理全種族+20%',
    '物理全敵属性+20%',
    '物理全サイズ15%,Atk+5',
    '星のかけら',
    'クリダメ+10%,クリ+7',
    '魔法全種族+10%',
    '魔法全サイズ8%,Matk+5',
    '魔法全敵属性+10%',
    '水属性石',
    '火属性石',
    '土属性石',
    '風属性石', 
    ];
const PRESERVED_FOOT_OPTIONS = [
    '魔神の腕力1',
    '魔神の腕力2',
    '魔神の腕力3',
    '魔神の迅速1',
    '魔神の迅速2',
    '魔神の迅速3',
    '魔神の体力1',
    '魔神の体力2',
    '魔神の体力3',
    '魔神の知力1',
    '魔神の知力2',
    '魔神の知力3',
    '魔神の集中1',
    '魔神の集中2',
    '魔神の集中3',
    '魔神の幸運1',
    '魔神の幸運2',
    '魔神の幸運3',
    '覇者の思念',
    '[ECO] タイニー・アルマ',
    '悪魔のカード',
    '力のカード',
    '正義のカード',
    '星のカード',
    '節制のカード',
    '戦車のカード',
    '死神のカード',
    '隠者のカード',
    '皇帝のカード',
    '月のカード',
    '恋人のカード',
    '法王のカード',
    '愚者のカード',
    '運命の輪のカード',
    '吊るされた男のカード',
    '世界のカード',
    '塔のカード',
    '女教皇のカード',
    '悪魔のカード(逆位置)',
    '力のカード(逆位置)',
    '正義のカード(逆位置)',
    '星のカード(逆位置)',
    '節制のカード(逆位置)',
    '戦車のカード(逆位置)',
    '死神のカード(逆位置)',
    '隠者のカード(逆位置)',
    '皇帝のカード(逆位置)',
    '月のカード(逆位置)',
    '恋人のカード(逆位置)',
    '法王のカード(逆位置)',
    '愚者のカード(逆位置)',
    '運命の輪のカード(逆位置)',
    '吊るされた男のカード(逆位置)',
    '世界のカード(逆位置)',
    '塔のカード(逆位置)',
    '女教皇のカード(逆位置)',
    ];
function SortCardSelectOption() {
    CARD_SELECT_ID.forEach((select_id) => {
        var select = $(select_id);
        var options = select.find('option');
        // 並びを固定したい先頭要素を保護
        var preservedHeadMap = {};
        PRESERVED_HEAD_OPTIONS.forEach(function(option, index) {
            preservedHeadMap[option] = index;
        });
        var preserved_head = options.filter(function() {
            return preservedHeadMap[this.text] !== undefined;
        });
        // 並びを固定したい末尾要素を保護
        var preservedFootMap = {};
        var originalOrderFoot = [];
        PRESERVED_FOOT_OPTIONS.forEach(function(option, index) {
            preservedFootMap[option] = index;
        });
        var preserved_foot = options.filter(function() {
            return preservedFootMap[this.text] !== undefined;
        });
        // 先頭・末尾の要素を削除
        var rest = options.filter(function() {
            return preservedHeadMap[this.text] === undefined && preservedFootMap[this.text] === undefined;
        });
        // その他の要素を50音順にソート
        rest.sort(function(a, b) {
            return a.text.localeCompare(b.text, 'ja');
        });
        // 先頭要素 + ソートされた要素 + 末尾要素
        select.empty().append(preserved_head).append(rest).append(preserved_foot);
    });
};