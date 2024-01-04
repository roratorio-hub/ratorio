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
            joblv = int(matche[0])
            for i in range(1, len(matche)):
                if matche[i] == '1':
                    result += f"[{joblv},{i}],"
        print(filename)
        print(result)