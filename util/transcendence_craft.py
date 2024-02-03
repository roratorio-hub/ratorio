"""
既存のアイテムをコピーして超越アイテムを作成するスクリプト
"""
import yaml
import sys
from craft_util import *

def testFunc(item_name = "アレス"):

    r = getItemRecord(item_name)
    print(f"--- item.dat.js ---\n{r}")

    id = getItemId(item_name)

    r = getItemSetRecordArray(id)
    print(f"--- itemset.dat.js ---\n{r}")

    r = getItemSetMap(id)
    print(r)

    r = getEnchantRecordArray(id)
    print(f"--- mig.enchlist.dat.js ---\n{r}")

    r = getTimeItemRecordArray(id)
    print(f"--- timeitem.dat.js ---\n{r}")

# 習得スキル設定対象の効果は chara.js などに個別で書かれるので抽出は難しい
# フラグだけは Item SP = 199 で識別出来るのでアラートを上げる？

# 既存のエンチャントの対象アイテムIDは手動で追加する想定

if __name__ == "__main__":

    with open(f'{script_dir}/transcendence.yaml', 'r', encoding='utf-8') as f:
        config = yaml.safe_load(f)

    item_dat = []
    itemset_dat = []
    mig_enchlist_dat = []

    item_id = getLatestItemId()
    itemset_id = getLatestIdFromItemSet()
    enchant_id = getLatestEnchantId()
    for item_info in config['item_list']:
        origin_item_id = getItemId(item_info['name'])
        item_id += 1
        
        # --- item.dat.js ---
        # 超越で追加された Item SP を既存のレコードに付加して出力する
        itemobjnew = getItemRecord(item_info['name'])[0]
        itemobjnew = f"ItemObjNew[{item_id}] = [{item_id}{itemobjnew[itemobjnew.find(','):-2]}"
        for capability in item_info['capabilities']:
            itemobjnew += buildCapabilityRecord(capability)
        itemobjnew += "0];"
        item_dat.append(itemobjnew)

        # --- itemset.dat.js ---
        # 2024/01/31時点では超越により変化するセット効果はないのでそのまま出力する
        itemidtosetidmap = f"ItemIdToSetIdMap[{item_id}] = ["
        for itemset in getItemSetRecordArray(origin_item_id):
            itemset_id += 1
            itemset = itemset.replace(f',{origin_item_id},',f',{item_id},')
            itemset = itemset.replace(f',{origin_item_id}]',f',{item_id}]')
            itemset = f"w_SE[{itemset_id}] = {itemset};"
            itemidtosetidmap += f"{itemset_id},"
            itemset_dat.append(itemset)
        itemidtosetidmap = f"{itemidtosetidmap[:-1]}];"
        itemset_dat.append(itemidtosetidmap)

        # --- mig.enchlist.dat.js ---
        reverseresolvearrayitemid = f"g_constDataManager.enchListDataManager.reverseResolveArrayItemId[{item_id}] = ["
        # 超越で追加されたアイテムを既存のエンチャントに紐づけて出力する
        for origin_enchant_id in getEnchantIdArray(origin_item_id):
            reverseresolvearrayitemid += f"{origin_enchant_id},"
        # 超越で追加されたエンチャントを新たに出力する
        if 'enchant' in item_info:
            for enchant in item_info['enchant']:
                enchant_id += 1
                record = buildEnchantRecord(item_id, enchant_id, enchant)
                reverseresolvearrayitemid += f"{enchant_id},"
                mig_enchlist_dat.append(record)
        reverseresolvearrayitemid = f"{reverseresolvearrayitemid[:-1]}];"
        mig_enchlist_dat.append(reverseresolvearrayitemid)


    OUTPUT_FILE = [
        ('item.dat.js', item_dat),
        ('itemset.dat.js', itemset_dat),
        ('mig.enchlist.dat.js', mig_enchlist_dat),
    ]
    for file_name, data_array in OUTPUT_FILE:
        print(f"--- {file_name} ---")
        for record in data_array:
            if 'None' in record:
                print('エラー: 空のデータが挿入されています')
                print(record)
                sys.exit(0)
        with open(f"{script_dir}/output_{file_name}", "w", encoding="utf-8") as f:
            f.write("\n".join(data_array))