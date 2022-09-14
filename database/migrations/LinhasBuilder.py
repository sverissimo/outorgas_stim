import pandas as pd
from typing import List
from domain.Contrato import Contrato
from domain.Linha import Linha
from database.migrations.Builder import Builder


class LinhasBuilder(Builder):

    path_to_xlsx_file: str = 'data/Contratos DGTI.xlsx'
    empresas: list or None
    linhas: List[Linha] or None
    contracts: List[Contrato]
    contracts_df: pd.DataFrame

    def __init__(self, empresas=None):
        super().__init__(empresas)

    def build(self):
        self.get_linhas()
        return self.linhas
