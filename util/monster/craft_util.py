import os
import re

script_dir = os.path.dirname(os.path.abspath(__file__))

def getLatestMonsterId():
    pattern = r'\[(\d+),.+'
    with open(f'{script_dir}/../../roro/m/js/monster.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return max([int(id) for id in matches])

