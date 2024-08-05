class enchSearch {
    //エンチャント検索
    constructor(){
            this.enchidItemidList = [];
            this.select_id_list = [
                    '#OBJID_ARMS_RIGHT',
                    '#OBJID_ARMS_LEFT',
                    '#OBJID_SHIELD',
                    '#OBJID_HEAD_TOP',
                    '#OBJID_HEAD_MID',
                    '#OBJID_HEAD_UNDER',
                    '#OBJID_BODY',
                    '#OBJID_SHOULDER',
                    '#OBJID_SHOES',
                    '#OBJID_ACCESSARY_1',
                    '#OBJID_ACCESSARY_2',
            ];
            this.itemIds = g_constDataManager.enchListDataManager.reverseResolveArrayItemId;//ratorioから取得
            this.CardObjNew = CardObjNew;//ratorioから取得

            //エンチャントとアイテムidを紐づけした配列を生成(ratorioの処理を利用)
            this.itemIds.forEach((enchSetId, itemId)=>{
                    if(!enchSetId) return;
                    var enchListId = 0;
                    var enchListDataManager = g_constDataManager.GetDataManger(CONST_DATA_KIND_ENCHANT_LIST);
                    var enchListIdArray = enchListDataManager.GetEnchListIdArrayByItemId(itemId);

                    var enchInfoArrayAllSlots = null;
                    var enchInfoArrayAllSlotsResult = null;

                    // 結果用配列用意
                    enchInfoArrayAllSlotsResult = [];
                    for (let idxSlot = 0; idxSlot < 4; idxSlot++) {
                            enchInfoArrayAllSlotsResult[idxSlot] = [];
                    }

                    // 対象の全エンチャントリストをループ処理
                    for (let idxEnchList = 0; idxEnchList < enchListIdArray.length; idxEnchList++) {

                            // エンチャントリストIDを取得
                            enchListId = enchListIdArray[idxEnchList];

                            // サブ関数をコールしてデータ配列を収集
                            enchInfoArrayAllSlots = RebuildCardSelectSubCollectEnchListData(enchListId, enchInfoArrayAllSlotsResult);

                            // 最終結果に追記
                            for (let idxSlot = 0; idxSlot < enchInfoArrayAllSlots.length; idxSlot++) {
                                    enchInfoArrayAllSlotsResult[idxSlot] = enchInfoArrayAllSlotsResult[idxSlot].concat(enchInfoArrayAllSlots[idxSlot]);
                            }
                    }

                    for(let enchs of enchInfoArrayAllSlotsResult){
                        if(!enchs) continue;
                        for(let ench of enchs){
                            if(!this.enchidItemidList[ench[1]]) this.enchidItemidList[ench[1]] = [];
                            this.enchidItemidList[ench[1]].push(itemId);
                        }
                    }
            });
            
            //イベント追加とメニュー挿入
            this.addEvents();
    }

    resetEnchSearch(mode){
            //リセット処理
            for(let select_id of this.select_id_list){
                    const select = document.querySelector(select_id);
                    if(!select) continue;
                    select.parentNode.setAttribute('style', 'position:relative; padding-top:0px;');
            }

            const dataInsert = document.querySelectorAll('select[data-insert_select="1"]');
            for(let d of dataInsert) d.remove();
            
            if(mode === 'ench_id_reset'){
                    const enchSearchSelect = document.querySelector('#ench_search');
                    enchSearchSelect.value = '';
                    enchSearchSelect.dispatchEvent(new Event('change'));
            }
    }

    runEnchSearch(){
            //検索処理
            //reset
            this.resetEnchSearch();
            
            const ench_select = document.querySelector('select[name="ench_search"]');
            const id = parseInt(ench_select.options[ench_select.selectedIndex].value,10);
            const name = ench_select.options[ench_select.selectedIndex].text;
            if(!id) return;

            //選択したエンチャントの装備リスト
            const res = Array.from(new Set(this.enchidItemidList[id]));

            let all_hit_length = 0;
            for(let select_id of this.select_id_list){
                    const select = document.querySelector(select_id);
                    if(!select) continue;
                    if(select.style.visibility === 'hidden') continue;

                    const options = select.querySelectorAll('option');
                    let hit_length = 0;
                    let index = 0;

                    const resSelect = document.createElement('select');
                    resSelect.setAttribute('data-insert_select', '1');
                    resSelect.setAttribute('name', `res_${select.id}`);
                    resSelect.setAttribute('style', 'border: 0; border-bottom: dotted 1px #666; background-color: transparent; position:absolute; top:5px; left:0px; cursor:pointer;');

                    const resOption = document.createElement('option');
                    resOption.value = '';
                    resSelect.appendChild(resOption);

                    for(let option of options){
                            //選択したエンチャントの装備をoptionから検索
                            if(res.includes(parseInt(option.value,10))){
                                    hit_length++;
                                    all_hit_length++;
                                    
                                    //ヒットしたoptionを複製
                                    let option_prime = option.cloneNode(true);
                                    resSelect.appendChild(option_prime);
                            }
                    }
                    if(hit_length > 0){
                            //検索結果のselectメニューを挿入
                            resOption.textContent = `【${name}】${hit_length}件 (選択する)`;
                            resSelect.addEventListener('change', ()=>{
                                    if(resSelect.value && select.value !== resSelect.value){
                                            select.value = resSelect.value;
                                            select.dispatchEvent(new Event('change'));
                                            select.dispatchEvent(new Event('select2:select'));
                                    }
                            });
                            select.parentNode.setAttribute('style', 'position:relative; padding-top:30px;');
                            select.parentNode.insertBefore(resSelect, select.nextElementSibling);

                            let select_width = resSelect.clientWidth + 10;
                            select.parentNode.style.minWidth = `${select_width}px`;
                    }
            }
            if(all_hit_length === 0) alert('該当する装備はありません。');
    }

    createSelect(){
            //検索メニュー生成
            const ench_list = [];
            ench_list.push(['エンチャントを選択', '']);

            
/*
            //除外設定(項目が多すぎてUXが微妙だと感じたためあまり使われないと思う項目を雑に除外設定。要調整)
            const hidden_list = [
                    508,509,510,511,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,
                    601,602,603,604,605,606,607,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,626,627,628,629,630,631,632,633,634,635,636,637,638,639,640,641,642,643,644,645,646,647,648,649,650,651,652,653,654,655,656,657,
                    693,694,695,696,697,698,699,700,701,702,703,704,705,706,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745,746,747,748,749,750,751,752,753,754,755,756,757,758,759,760,761,762,763,764,765,766,767,768,769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841,842,843,844,845,846,847,848,849,850,851,852,853,854,855,856,857,858,859,860,861,862,863,864,865,866,867,868,869,870,871,872,873,874,875,876,877,
                    889,890,891,892,893,894,895,896,897,898,899,900,901,902,903,904,905,906,907,908,909,910,911,912,913,914,915,916,917,918,919,920,921,922,923,924,925,926,927,928,929,930,931,932,933,934,935,936,937,938,939,940,941,942,943,944,945,946,947,948,949,950,951,952,953,954,955,956,957,958,959,960,961,962,963,964,965,966,967,968,969,970,971,972,973,974,975,976,977,978,979,980,981,982,983,984,985,986,987,988,989,990,991,992,993,994,995,996,997,998,999,1000,1001,1002,1003,1004,1005,
                    1051,1052,1053,1054,1055,1056,1057,1058,1059,1060,1061,
                    1073,1074,1075,1076,1077,1078,1079,1080,1081,1082,1083,1084,1085,1086,1087,1088,1089,1090,1091,1092,1093,1094,1095,1096,1097,1098,1099,1100,1101,1102,1103,1104,1105,1106,1107,1108,1109,1110,1111,1112,1113,1114,1115,1116,1117,1118,1119,1120,1121,1122,1123,1124,1125,1126,1127,1128,1129,1130,1131,1132,1133,1134,1135,1136,1137,1138,1139,1140,1141,1142,1143,1144,1145,1146,1147,1148,1149,1150,1151,1152,1153,1154,1155,1156,1157,1158,1159,1160,1161,1162,1163,1164,1165,1166,1167,1168,1169,1170,1171,1172,1173,1174,1175,1176,
                    1269,1270,1271,1272,1273,1274,1275,1276,1277,
                    1336,1337,1338,1339,1340,1341,1342,1343,1344,1345,
                    1451,1452,1453,1454,1455,1456,1457,1458,1459,1460,1461,1462,1463,1464,1465,1466,1467,1468,1469,1470,1471,1472,1473,1474,1475,1476,1477,1478,
                    1613,1614,1615,1616,
                    1695,1696,1697,1698,1699,1700,1701,1702,1703,1704,1705,1706,1707,1708,1709,1710,1711,1712,1713,1714,1715,1716,1717,1718,1719,1720,1721,1722,1723,1724,1725,1726,1727,1728,1729,1730,1731,1732,1733,1734,1735,1736,1737,1738,1739,1740,1741,1742,1743,1744,1745,1746,1747,1748,1749,1750,1751,1752,1753,1754,1755,1756,1757,1758,1759,1760,1761,1762,1763,1764,1765,1766,1767,1768,1769,1770,1771,1772,1773,1774,1775,1776,1777,1778,1779,
                    2570,2571,2572,2573,2574,2575,2576,2577,2578,2579,2580,2581,2582,2583,2584,2585,2586,2587,2588,2589,2590,2591,2592,2593,
                    1394,1395,1396,1397,1398,1399,1400,1401,1402,1403,
            ];

            for(let card of this.CardObjNew){
                    if(hidden_list.includes(card[0])) continue;
                if(card[1] === 99) ench_list.push([card[2], card[0]]);
            }
*/
            // エンチャント全て並べるパターン
            for(let card of this.CardObjNew){
                if(card[1] === 99) ench_list.push([card[2], card[0]]);
            }


            
            //需要が多そうな項目を上部に並び替え(この処理は無くてもいいかも？)
            const order = [
                    '',
                    1813,//殺意の怨念
                    1975,//英雄の凱歌
                    2005,//起源の王
                    2028,//豊穣の女神
                    2043,//厄災の魔将
                    2311,//異境の統轄者
                    2437,//知識の探求者
                    2668,//最果ての支配者
                    888,//暴走した魔力
                    1297,//覇王
                    1300,//熊の力
                    1301,//光速
                    1302,//鋼鎧
                    1303,//大鷲の眼光
                    1304,//幸運な日
                    1348,//豪傑
                    1245,//真理の解放
                    1450,//死の欲動
                    1381,//アルカナ
                    1678,//シンソウの王
                    2123,//王家の栄光
                    2417,//天地崩壊
                    1409,//凍結耐性
                    1594,//石化耐性
                    1425,//Def50%無視
                    1428,//Mdef50%無視
                    1593,//ノックバック無効
                    1247,//スキルディレイ-15%
                    1625,//必中攻撃+25%
                    1848,//MaxHP+15%
                    2145,//固定詠唱時間-70%
            ].reverse();
            ench_list.sort((a, b)=>{
                    return order.indexOf(b[1]) - order.indexOf(a[1]);
            });

            let div = document.createElement('div');
            let span = document.createElement('span');
            span.textContent = 'エンチャント検索：';
            div.appendChild(span);
            
            let select = document.createElement('select');
            select.setAttribute('id', 'ench_search');
            select.setAttribute('name', 'ench_search');

            for(let i=0,l=ench_list.length; i<l; i++){
                    const ench = ench_list[i];
                    let option = document.createElement('option');
                    option.textContent = ench[0];
                    option.setAttribute('value', ench[1]);
                    select.appendChild(option);
            }

            div.appendChild(select);
            return div;
    }
    
    armsTypeRightChange(){
            document.querySelector('#OBJID_ARMS_TYPE_RIGHT').addEventListener('change', ()=>{
                    this.resetEnchSearch('ench_id_reset');
                    this.armsTypeLeftChange();
            });
    }

    armsTypeLeftChange(){
            document.querySelector('#OBJID_ARMS_TYPE_LEFT')?.addEventListener('change', ()=>{
                    this.resetEnchSearch('ench_id_reset');
                    this.swapArmsChange();
            });
    }

    swapArmsChange(){
            document.querySelector('#OBJID_SPAN_SWAP_ARMS input')?.addEventListener('click', ()=>{
                    this.resetEnchSearch('ench_id_reset');
            });
    }

    selectJobChange(){
            $('#OBJID_SELECT_JOB').on('select2:select', ()=>{
                    this.resetEnchSearch('ench_id_reset');
                    this.armsTypeLeftChange();
            });
    }

    loadSaveDataMigChange(){
            document.querySelector('#OBJID_BUTTON_LOAD_SAVE_DATA_MIG').addEventListener('click', ()=>{
                    this.resetEnchSearch('ench_id_reset');
                    this.armsTypeLeftChange();
            });
    }

    urlInMigChange(){
        document.querySelector('#OBJID_BUTTON_URL_IN_MIG').addEventListener('click', ()=>{
                this.resetEnchSearch('ench_id_reset');
                this.armsTypeLeftChange();
        });
}

    quickControlExtractCheckboxChange(){
            document.querySelector('#ID_QUICK_CONTROL input[type="button"]')?.addEventListener('click', ()=>{
                    this.resetEnchSearch('ench_id_reset');
            });
    }

    addEvents(){
            //職業変更、武器変更周り、ロードした際にエンチャント検索結果をリセット(他にもリセットするべき対象があるかも？)
            this.armsTypeRightChange();
            this.selectJobChange();
            this.loadSaveDataMigChange();
            this.urlInMigChange();
            this.quickControlExtractCheckboxChange();

            //クイック設定欄の対応(毎回DOMを再構築しているので監視して対応)
            const element = document.querySelector('#ID_QUICK_CONTROL');
            const mo = new MutationObserver(()=>this.quickControlExtractCheckboxChange());
            const config = {
                    childList: true,
                    attributes: true,
                    characterData: true,
            };
            mo.observe(element, config);

            //左右武器入れ替えの下に検索メニューを挿入
            const targetElement = document.querySelector('#OBJID_SPAN_SWAP_ARMS');
            targetElement.parentNode.insertBefore(this.createSelect(), targetElement.nextElementSibling);
            $('#ench_search').select2().on('select2:select', ()=>this.runEnchSearch() );
    }
}
/*
(()=>{
    new enchSearch();
})();
*/