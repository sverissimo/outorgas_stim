import re


def linha_parser(linha: str):

    # linha = "4685 - PAI PEDRO / NOVA PORTEIRINHA, 4686 - PAI PEDRO / PORTEIRINHA e 4689 - PORTEIRINHA / SERRANÓPOLIS DE MINAS"
    pattern = r"\d{4}"
    s = re.findall(pattern, linha)
    # print(s)
    return s


if __name__ == "__main__":
    linha_parser("L4231")
