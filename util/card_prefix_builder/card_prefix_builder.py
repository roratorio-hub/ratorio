import os
import jinja2


def store_card_name(cards, terms):
    if terms[0] in cards:
        if terms[1] == "堕落した生命のカード":
            # 特殊
            # 画面表示は  「堕落した生命」
            cards["堕落した生命"] = cards[terms[0]]
        if terms[1] == "バフォメットジュニアカード":
            # 特殊
            # 画面表示は  「バフォメット.Jr」
            cards["バフォメット.Jr"] = cards[terms[0]]
        elif terms[1][-4] == "の":
            # アルカナ正位置  画面表示はカード名
            cards[terms[1]] = cards[terms[0]]
        elif terms[1].endswith("(逆位置)"):
            # アルカナ逆位置  画面表示はカード名
            cards[terms[1]] = cards[terms[0]]
        else:
            # 通常　画面表示は"カード"を取り除いたもの
            cards[terms[1][:-3]] = cards[terms[0]]
        del cards[terms[0]]


def load_card_names(cards: dict):
    name_file = os.path.join(
        os.path.dirname(__file__), "data/idnum2itemdisplaynametable.txt"
    )
    with open(name_file, encoding="utf-8") as f:
        lines = f.readlines()
    for line in lines:
        if line.startswith("//"):
            continue
        terms = line.split("#")
        if len(terms) <= 2:
            continue
        if not terms[1].endswith("カード") and not terms[1].endswith("(逆位置)"):
            if terms[0] in cards:
                del cards[terms[0]]
            continue
        store_card_name(cards, terms)
        # if terms[0] in cards:
        #     if terms[1][-4] == "の" or terms[1].endswith("(逆位置)"):
        #         cards[terms[1]] = cards[terms[0]]
        #     else:
        #         cards[terms[1][:-3]] = cards[terms[0]]
        #     del cards[terms[0]]
    return cards


def load_card_prefix() -> dict:
    cards = {}
    prefix_file = os.path.join(
        os.path.dirname(__file__), "data/cardprefixnametable.txt"
    )
    with open(prefix_file, encoding="utf-8") as f:
        lines = f.readlines()

    for line in lines:
        if line.startswith("//"):
            continue
        terms = line.split("#")
        if len(terms) <= 2:
            continue
        cards[terms[0]] = terms[1]
    return cards


def main():
    cards = load_card_prefix()
    cards = load_card_names(cards)
    prefix = os.path.join(os.path.dirname(__file__), "../../roro/m/js/card.prefix.dat.js")

    fileSystemLoader = jinja2.FileSystemLoader(
        searchpath=os.path.join(os.path.dirname(__file__), "templates")
    )
    env = jinja2.Environment(loader=fileSystemLoader)
    template = env.get_template("card.prefix.dat.j2")

    with open(prefix, "w", encoding="utf-8") as f:
        f.write(template.render({"card_prefix":cards}))


if __name__ == "__main__":
    main()
