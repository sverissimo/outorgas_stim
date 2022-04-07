import pandas as pd
from services.get_contrato_df import get_contrato_df
from utils.parse_df import parse_df

import locale

locale.setlocale(locale.LC_ALL, "pt-BR")


def app():
    all_data = pd.read_excel("../data/Contratos 2014-2016.xlsx", sheet_name="Nov14")
    """ contrato_df = get_contrato_df(all_data)
    parsed_contrato_df = parse_df(contrato_df)
    print(parsed_contrato_df) """

    first_contract = all_data.head(1)
    contrato_20_14 = all_data.iloc[[18]]
    for k in contrato_20_14:
        print(contrato_20_14[k])
    print("first_contract: ", type(contrato_20_14))

    exit()


if __name__ == "__main__":
    app()
