import os
import jinja2


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
        if terms[0] in cards:
            if terms[1][-4] == "の" or terms[1].endswith("(逆位置)"):
                cards[terms[1]] = cards[terms[0]]
            else:
                cards[terms[1][:-3]] = cards[terms[0]]
            del cards[terms[0]]
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
