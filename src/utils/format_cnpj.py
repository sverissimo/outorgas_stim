import re
cnpj_pattern = re.compile(r'^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$')


def format_cnpj(cnpj: str):
    is_correct = re.search(cnpj_pattern, cnpj)

    if is_correct:
        return cnpj

    if re.search(r'\.0$', cnpj):
        cnpj = cnpj.replace(".0", "")

    if len(cnpj) == 12:
        cnpj = "00" + cnpj
    elif len(cnpj) == 13:
        cnpj = "0" + cnpj

    cnpj = cnpj[:2] + "." + cnpj[2:]
    cnpj = cnpj[:6] + "." + cnpj[6:]
    cnpj = cnpj[:10] + "/" + cnpj[10:]
    cnpj = cnpj[:15] + "-" + cnpj[15:]

    return cnpj
