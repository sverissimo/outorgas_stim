from decimal import Decimal
import json
import pandas as pd
from domain.Contrato import Contrato
from domain.Contrato_2014 import Contrato_2014
from services.get_contrato_df import get_contrato_df
from services.get_tjlp import get_tjlp
from utils.format_contract_object import format_object
from utils.get_debt import get_debt
from utils.insert_tjlp import insert_tjlp
from utils.parse_df import parse_df

import locale

from utils.rename_columns import rename_columns

locale.setlocale(locale.LC_ALL, "pt-BR")


def app():
    path_to_file = "../data/Contratos 2014-2016.xlsx"

    all_data = pd.read_excel("../data/Contratos 2014-2016.xlsx", sheet_name="Nov14")
    tjlp = get_tjlp()
    all_data = all_data.loc[[0]]

    rename_columns(all_data)

    first_contract = all_data.to_dict(orient="records")[0]

    format_object(first_contract)
    insert_tjlp(tjlp, first_contract)
    get_debt(contract=first_contract)

    # print(first_contract['pagamentos'])

    for pg in first_contract["pagamentos"]:
        #    if pg["status"].find("PAGO") == 0:
        print(pg)

    exit()

    """ mock_data = open("tst.json", "w", encoding="utf-8")
    json.dump(first_contract, mock_data, ensure_ascii=False)
    mock_data.close() """

    """ f = open("tst.py", "w")
    f.write(str(first_contract))
    f.close """

    # keys = Contrato().__dict__.keys()

    # dl = all_data.to_dict(orient="records")

    """ a = Contrato_2014(path_to_file=path_to_file)
    a.get_df() """
    """ contrato_df = get_contrato_df(all_data)
    parsed_contrato_df = parse_df(contrato_df)
    print(parsed_contrato_df) """

    """ first_contract = all_data.head(1)
    contrato_20_14 = all_data.iloc[[18]]
    """
    # print("first_contract: \n", contrato_20_14)

    exit()


if __name__ == "__main__":
    app()
