from typing import List

import pandas as pd

from domain.Contrato import Contrato
from utils.rename_columns import rename_columns


def fix_contracts_data(contracts: List[Contrato]):

    new_contract_data = pd.read_excel(
        'data/mala_acumulada_parsed.xls', usecols='A,B,G,I,K')
    rename_columns(new_contract_data)

    updates = []

    for _, contract in new_contract_data.iterrows():
        idx = [idx for idx, c in enumerate(contracts) if c['numero_contrato']
               == contract['numero_contrato']]
        if len(idx):
            contract_update = {
                'numero_contrato': contract['numero_contrato'],
                'carencia': contract['carencia'],
                'convalidacao': contract['convalidacao'],
                'valor_devido': contract['valor_devido']
            }
            updates.append(contract_update)
        else:
            print('############ NOT FOUND ########### : ',
                  contract['numero_contrato'])

    print('Found updates:', len(updates))
    return updates
