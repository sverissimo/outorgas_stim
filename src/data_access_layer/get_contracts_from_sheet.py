import re
import pandas as pd
from utils.parse_contrato import parse_contrato
from utils.rename_columns import rename_columns


def get_contracts_from_sheet(sheet: str or None):

    if not sheet:
        all_data = pd.read_excel("data/Contratos 2014-2016.xlsx", None)
        all_sheets = all_data.keys()

        pattern = re.compile(r"\w{3}\d{2}")
        filtered_sheets = list(filter(pattern.match, all_sheets))

        all_contracts = []

        for f_sheet in filtered_sheets:
            all_contracts = all_contracts + get_contracts_from_sheet(f_sheet)

        return all_contracts

    all_data: pd.DataFrame = pd.read_excel(
        "data/Contratos 2014-2016.xlsx", sheet_name=sheet, usecols=range(0, 11)
    )

    all_data.dropna(thresh=8, inplace=True)
    all_data.columns = all_data.columns.astype(str)

    all_contracts_in_a_sheet = []

    for idx, row in all_data.iterrows():

        data: pd.DataFrame = all_data.loc[[idx]]

        rename_columns(data)
        parse_contrato(data)

        single_contract = data.to_dict(orient="records")[0]

        all_contracts_in_a_sheet.append(single_contract)

    print(f"Contracts in ${sheet} are done processing.")
    return all_contracts_in_a_sheet


if __name__ == "__main__":

    all_data = pd.read_excel("../data/Contratos 2014-2016.xlsx", None)
    all_sheets = all_data.keys()

    pattern = re.compile(r"\w{3}\d{2}")
    filtered_sheets = list(filter(pattern.match, all_sheets))

    # get_contracts_from_sheet("Mai15")

    for f_sheet in filtered_sheets:
        get_contracts_from_sheet(f_sheet)

    exit()
