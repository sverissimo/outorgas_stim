from datetime import datetime


def insert_tjlp(tjlp_data: dict, contract: dict):

    for pg in contract["pagamentos"]:
        d = datetime.fromisoformat(pg["vencimento"])
        pg["tjlp"] = tjlp_data[str(d.year)][d.month]


pass
