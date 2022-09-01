from ast import Num
import re
import pandas as pd
from data_access_layer.get_empresas_from_cadti import get_empresas_from_cadti
from database.migrations.rename_columns import fields
from domain.Contrato import Contrato


def create_contracts_collection():
    contracts = get_all_contracts_from_sheet()
    contracts = add_linha(contracts)


def get_all_contracts_from_sheet():
    contracts_df = pd.read_excel('data/Contratos DGTI.xlsx')

    # *********** Filter and rename columns
    contracts_df.rename(columns=dict(fields), inplace=True)
    contrato_props = list(
        filter(lambda x: x if '__' not in x else None, dir(Contrato())))
    contracts_df.drop(
        columns=[col for col in contracts_df.keys() if col not in contrato_props], inplace=True)

    contracts = contracts_df.to_dict(orient='records')
    return contracts
    cadti_empresas = get_empresas_from_cadti()

    #add_empresa_data(contracts, cadti_empresas)
    # print(contracts[0])

    """ print('contracts_raw_data: ', [
          el for el in contracts_df.keys() if el in contrato_props])
    """


def add_linha():
    pass


def create_contracts_collection(self, db, contracts: list):
    contratos = db().contratos
    first_contract_n = contracts[0]["numero_contrato"]
    search = list(contratos.find({"numero_contrato": first_contract_n}))
    if len(search) > 0:
        print(
            "Data already exists ind MongoDB, skipping insert command\n contract found:",
            search,
        )
        return
    else:
        contratos.insert_many(contracts)
