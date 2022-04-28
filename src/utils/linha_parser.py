import re


def linha_parser(linha: str):

    # linha = "4685 - PAI PEDRO / NOVA PORTEIRINHA, 4686 - PAI PEDRO / PORTEIRINHA e 4689 - PORTEIRINHA / SERRANÓPOLIS DE MINAS"
    pattern = r"\d{4}"
    search_linhas = re.findall(pattern, linha)

    # No SICAR há códigos de empresa inseridos no lugar de linha. Os códigos são sempre > 9000 e as linhas menores.
    linhas = list(
        map(lambda linha: int(linha) if int(linha) < 8999 else 0, search_linhas)
    )
    # print("linhas: ", linhas)
    return linhas


if __name__ == "__main__":
    # linha_parser("L4231 asd  3350 asd 25 ae 4457")
    linha_parser(" 4565e4602e4603")
