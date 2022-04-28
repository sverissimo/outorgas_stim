def format_cnpj(cnpj: str):
    cnpj = cnpj.replace(".0", "")
    if len(cnpj) < 14:
        cnpj = "0" + cnpj

    cnpj = cnpj[:2] + "." + cnpj[2:]
    cnpj = cnpj[:6] + "." + cnpj[6:]
    cnpj = cnpj[:10] + "/" + cnpj[10:]
    cnpj = cnpj[:15] + "-" + cnpj[15:]

    return cnpj
