import re


def linha_parser(linha: str):

    # parsed_linha = re.sub(r"l\.|L", "", linha)
    pattern = re.compile(r"(l\.|L)?\d{4}")
    # pattern = re.compile(r"\d{4}")

    print(pattern.search(linha))


if __name__ == "__main__":
    linha_parser("L4231")
    linha_parser("l.4231")
    linha_parser("asd0123asd")
