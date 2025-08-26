"""
拡張四次職のJOBボーナスを mig.job.dat.js が要求する配列形式に変換するスクリプト
公式サイトから拾い集めた値をTAB区切りのCSVにしたファイルを食べさせること
"""
import os
import re

script_dir = os.path.dirname(os.path.abspath(__file__))

result_list_all_files = []

for filename in os.listdir(f"{script_dir}/config"):
    if filename.endswith('.txt'):
        file_path = os.path.join(f"{script_dir}/config", filename)
        with open(file_path, 'r', encoding='utf-8') as file:
            lines = file.readlines()

        result = ""
        for line in lines:
            pattern = r'^(\d+)\t(\d+)\t(\d+)\t(\d+)\t(\d+)\t(\d+)\t(\d+)\t(\d+)\t(\d+)\t(\d+)\t(\d+)\t(\d+)\t(\d+)'
            matche = re.findall(pattern, line)[0]
            # 食べさせたデータの index 0 は JobLv
            joblv = int(matche[0]) 
            for i in range(1, len(matche)):
                # このスクリプトでは index 1 = str だけど mig.job.dat.js では str = 0 なので i - 1 
                if matche[i] == '1':
                    result += f"[{joblv},{i-1}],"
                if matche[i] == '2':
                    result += f"[{joblv},{i-1}],[{joblv},{i-1}],"
                if matche[i] == '3':
                    result += f"[{joblv},{i-1}],[{joblv},{i-1}],[{joblv},{i-1}],"
                
        print(filename)
        print(result)