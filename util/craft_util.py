import os
import re


script_dir = os.path.dirname(os.path.abspath(__file__))


def loadCardDict() -> dict:
    """key = カードorエンチャント名, value = cardID"""
    pattern = r'\[(\d+),(\d+),"([^,]+)",[^,]*,[^,]*,.*0\]'
    with open(f'{script_dir}/../roro/m/js/card.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return {name: int(id) for id, type, name in matches if int(type) != 100}


def loadEnchantList():
    pattern = r'\[(\d+),(\d+),"([^,]+)",[^,]*,[^,]*,.*0\]'
    with open(f'{script_dir}/../roro/m/js/card.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return [[int(id), name] for id, type, name in matches if int(type) == 99]


def getLatestMonsterId():
    pattern = r'\[(\d+),.+'
    with open(f'{script_dir}/../roro/m/js/monster.dat.js', 'r', encoding='utf-8') as file:
        js_code = file.read()
    matches = re.findall(pattern, js_code)
    return max([int(id) for id in matches])
