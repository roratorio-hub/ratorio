
import re
import json
from pykakasi import kakasi

# Initialize kakasi for Katakana conversion
kks = kakasi()
kks.setMode("H", "K")  # Hiragana to Katakana
kks.setMode("J", "K")  # Kanji to Katakana
kks.setMode("K", "K")  # Katakana to Katakana (no change)
conv = kks.getConverter()

def to_katakana(text):
    return conv.do(text)

def main():
    # Read input.txt
    with open("work/input.txt", "r", encoding="utf-8") as f:
        input_data = f.read()

    # Read template.txt
    with open("work/template.txt", "r", encoding="utf-8") as f:
        template = f.read()

    # Split input data into records and process each one
    # Remove trailing comma from each line before parsing
    records = []
    for line in input_data.strip().split("\n"):
        cleaned_line = line.strip()
        if cleaned_line.endswith(","):
            cleaned_line = cleaned_line[:-1]  # Remove the trailing comma
        if cleaned_line:
            records.append(json.loads(cleaned_line))

    output_parts = []

    for record in records:
        # Skip Skill NO as it\'s not used in the template
        # skill_no = record[0]
        skill_lv = record[1]
        skill_name = record[2]
        skill_id = record[3]

        # Convert skill name to Katakana
        skill_name_kana = to_katakana(skill_name.replace("：", ""))

        # Fill the template
        filled_template = template.replace("/** スキル名 */", f"/** {skill_name} */")
        filled_template = filled_template.replace("SKILL_ID_スキルID", f"SKILL_ID_{skill_id}")
        filled_template = filled_template.replace("this.name = \"スキル名\"", f"this.name = \"{skill_name}\"")
        filled_template = filled_template.replace("this.kana = \"スキル名のカタカナ\"", f"this.kana = \"{skill_name_kana}\"")
        filled_template = filled_template.replace("this.maxLv = スキルLv", f"this.maxLv = {skill_lv}")

        output_parts.append(filled_template)

    # Combine all generated skill data
    final_output = "\n".join(output_parts)
    with open("work/output.txt", "w", encoding="utf-8") as f:
        f.write(final_output)
    print("Skill data successfully generated and written to work/output.txt")

if __name__ == "__main__":
    main()
