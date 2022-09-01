import pandas as pd
from domain.Contrato import Contrato


def get_all_contracts_from_spreadsheet():
    contracts_df = pd.read_excel('data/Contratos DGTI.xlsx')

    # *********** Filter and rename columns
    contracts_df.rename(columns=dict(fields), inplace=True)
    contrato_props = list(
        filter(lambda x: x if '__' not in x else None, dir(Contrato())))
    contracts_df.drop(
        columns=[col for col in contracts_df.keys() if col not in contrato_props], inplace=True)

    contracts = contracts_df.to_dict(orient='records')
    return contracts
