from decimal import Decimal


def get_debt(contract: dict):
    debt = contract["valor_outorga"]
    i = 0
    for pg in contract["pagamentos"]:
        pg["tjlp"] = pg["tjlp"].replace("%", "").replace(",", ".")
        if pg["status"] == "PAGO":
            if i > 0:
                pg["saldo_devedor"] = (debt * (1 + float(pg["tjlp"]) / 100)) - pg[
                    "valor"
                ]
            else:
                pg["saldo_devedor"] = debt - pg["valor"]
            debt = debt - pg["valor"]
        else:
            pg["saldo_devedor"] = contract["pagamentos"][i - 1]["saldo_devedor"] * (
                1 + float(pg["tjlp"]) / 100
            )
        i = i + 1
