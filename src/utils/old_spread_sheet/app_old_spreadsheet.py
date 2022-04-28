import json
import re
import pandas as pd
from services.get_tjlp import get_tjlp
from utils.add_parcelas import add_parcelas

# from utils.delayed_payments import fix_delayed_payments
from utils.get_debt import get_debt
from utils.insert_tjlp import insert_tjlp
from utils.parse_contrato import parse_contrato
from utils.rename_columns import rename_columns

# locale.setlocale(locale.LC_ALL, "pt-BR")


def app(sheet):

    all_data: pd.DataFrame = pd.read_excel(
        "../data/Contratos 2014-2016.xlsx", sheet_name=sheet
    )
    tjlp = get_tjlp()

    all_data.dropna(thresh=30, inplace=True)
    all_data.dropna(how="all", axis=1, inplace=True)
    all_data.fillna(0, inplace=True)
    all_data.columns = all_data.columns.astype(str)
    # rename_columns(all_data)
    """ parse_contrato(all_data) """

    all_contracts_in_a_sheet = []

    for idx, row in all_data.iterrows():

        data: pd.DataFrame = all_data.loc[[idx]]

        rename_columns(data)
        parse_contrato(data)

        single_contract = data.to_dict(orient="records")[0]

        add_parcelas(single_contract)

        insert_tjlp(tjlp, single_contract)

        # get_debt(contract=single_contract)

        # fix_delayed_payments(single_contract)
        all_contracts_in_a_sheet.append(single_contract)

    return all_contracts_in_a_sheet
    mock_data = open(f"contratos_{sheet}.json", "w", encoding="utf-8")
    json.dump(all_contracts_in_a_sheet, mock_data, ensure_ascii=False)
    mock_data.close()
    print(f"Contracts in ${sheet} are done processing.")


if __name__ == "__main__":

    all_data = pd.read_excel("../data/Contratos 2014-2016.xlsx", None)
    all_sheets = all_data.keys()

    pattern = re.compile(r"\w{3}\d{2}")
    filtered_sheets = list(filter(pattern.match, all_sheets))

    app("Nov14")

    """ for f_sheet in filtered_sheets:
        app(f_sheet) """

    exit()
