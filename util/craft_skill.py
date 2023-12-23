"""
新規スキルを登録するスクリプト
既存スキルを組み立てるのは別スクリプトを使う
"""
import os
import yaml

script_dir = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.join(script_dir, 'skill.yaml')

with open(config_path, 'r', encoding='utf8') as f:
    config = yaml.safe_load(f)

skill_list = config['skill_list']

id = 2791
enchant_list = "[186,[51,["
for skill in skill_list:
    id += 1
    entry = f'CardObjNew[{id}] = [{id},99,"{skill["name"]}","",'
    for capabilities in skill["capabilities"]:
        if capabilities['type'] == "BaseLvが上がる度にダメージUp":
            entry += f"{capabilities['each_lv']}000000{capabilities['refine']}005{capabilities['skill_id']},{capabilities['atk_percent_up']},"
    entry += '0];'
    print(entry) 
    enchant_list += f"{id},"
enchant_list += "]]]"
print(enchant_list)



