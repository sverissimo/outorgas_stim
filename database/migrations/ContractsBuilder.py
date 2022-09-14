import pandas as pd
from typing import List
from domain.Contrato import Contrato
from database.migrations.Builder import Builder


class ContractsBuilder(Builder):

    contracts: List[Contrato] or None = None

    def __init__(self, empresas=None):
        super().__init__(empresas)

    def set_linhas(self):
        contracts = self.contracts
        linhas = self.get_linhas()

        for c in contracts:
            selected_lines = list(
                filter(
                    lambda linha: linha if linha['numero_contrato'] == c['numero_contrato'] else None, linhas
                )
            )
            c['linhas_id'] = list(map(lambda l: l['id'], selected_lines))

        self.contracts = contracts
        return self

    def build(self) -> List[Contrato] or pd.DataFrame:
        result = self.contracts_df
        if hasattr(self, 'contracts'):
            result = self.contracts

        return result
