"""
既存スキルを組み立ててエンチャントリストを作るスクリプト
"""
import os
import yaml

script_dir = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.join(script_dir, 'enchant.yaml')

with open(config_path, 'r', encoding='utf8') as f:
    config = yaml.safe_load(f)

enchant_list = config['enchant_list']


"""
g_constDataManager.enchListDataManager.sourceArray[621] = [621,-1,0,0,[["スペシャルエンチャント（タロー）","C3y4C2h1I3A4J5D2h1J5D5B2h3A5"]],[],
    [[[174,[50,[4995]]],,[
    [[178,[27,[4]]],,[[[187,[59,8],[60,4]],,[[[186,[51,[1348,1245]]],,[]]]]]],
    [[178,[27,[3]]],,[[[187,[59,9],[60,4]],,[[[186,[51,[2792,2793,2794,2795,2796,2797,2798,2799,2800,2801,2802,2803,2804,2805,2806,2807,2808,]]],,[]]]]]],
    [[178,[27,[2]]],,[[[187,[59,10],[60,4]],,[[[186,[51,[2417]]],,[]]]]]]
    ]]],[]];
g_constDataManager.enchListDataManager.reverseResolveArrayItemId[4995] = [621];
"""

id = 622
sourceArray = ""
reverseResolveArrayItemId = ""
for enchant in enchant_list:
    id += 1
    reverseResolveArrayItemId = f"g_constDataManager.enchListDataManager.reverseResolveArrayItemId[{enchant['itemId']}] = [{id}];"
    sourceArray = f'g_constDataManager.enchListDataManager.sourceArray[{id}] = [{id},-1,0,0,[["{enchant["name"]}","{enchant["hash"]}"]],[],'
    sourceArray += f"[[[174,[50,[{enchant['itemId']}]]],,["
    for info in enchant["enchants"]:
        sourceArray += f"[[178,[27,[{info['slot']}]]],,[[[187,[59,{info['refine']}],[60,4]],,[[[186,[51,["
        for enchant_id in info['id_list']:
            sourceArray += f"{enchant_id['id']},"
        sourceArray += "]]],,[]]]]]],"
    sourceArray += "]]],[]];"
    print("\n--- mig.enchlist.dat.js に追記してください ---")
    print(sourceArray)
    print(reverseResolveArrayItemId)

