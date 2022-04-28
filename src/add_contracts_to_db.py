import re
import pandas as pd
from services.create_mongo_contracts import create_contracts
from utils.parse_contrato import parse_contrato
from utils.rename_columns import rename_columns


def add_contracts(sheet):

    all_data: pd.DataFrame = pd.read_excel(
        "../data/Contratos 2014-2016.xlsx", sheet_name=sheet, usecols=range(0, 11)
    )

    all_data.columns = all_data.columns.astype(str)

    all_contracts_in_a_sheet = []

    for idx, row in all_data.iterrows():

        data: pd.DataFrame = all_data.loc[[idx]]
        # print("data: ", data)

        rename_columns(data)
        parse_contrato(data)

        single_contract = data.to_dict(orient="records")[0]

        all_contracts_in_a_sheet.append(single_contract)

    create_contracts(all_contracts_in_a_sheet)
    print(f"Contracts in ${sheet} are done processing.")


if __name__ == "__main__":

    all_data = pd.read_excel("../data/Contratos 2014-2016.xlsx", None)
    all_sheets = all_data.keys()

    pattern = re.compile(r"\w{3}\d{2}")
    filtered_sheets = list(filter(pattern.match, all_sheets))

    add_contracts("Nov14")

    """ for f_sheet in filtered_sheets:
        app(f_sheet) """

    exit()
