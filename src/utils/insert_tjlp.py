import pandas as pd


def insert_tjlp(tjlp_data: dict, contract: dict):

    for pg in contract["pagamentos"]:

        """vencimento = pg["vencimento"]
        invalid_date_pattern = re.compile(r"(31/(02)?(04)?(06)?(09)?(11)?)")

        if re.search(invalid_date_pattern, vencimento):
            vencimento = vencimento.replace("31", "28")"""

        d = pd.to_datetime(pg["vencimento"], infer_datetime_format=True)

        pg["tjlp"] = tjlp_data[str(d.year)][d.month]


pass
