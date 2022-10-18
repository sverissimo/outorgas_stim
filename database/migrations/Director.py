from typing import List

from database.migrations.Builder import Builder
from domain.Contrato import Contrato
from domain.Linha import Linha


class Director():

    builder: Builder

    def __init__(self, builder) -> None:
        self.builder = builder

    def get_contracts_list(self):
        return self.builder \
            .excel_to_dataframe() \
            .rename_and_filter_columns() \
            .df_to_list() \
            .build()

    def get_contracts_with_empresa(self):
        return self.builder \
            .excel_to_dataframe() \
            .rename_and_filter_columns() \
            .df_to_list()    \
            .set_empresas() \
            .build()

    def get_full_contracts(self) -> List[Contrato]:
        return self.builder \
            .excel_to_dataframe() \
            .rename_and_filter_columns() \
            .df_to_list()    \
            .set_empresas() \
            .set_linhas() \
            .build()

    def get_all_linhas(self) -> List[Linha]:
        return self.builder\
            .excel_to_dataframe() \
            .rename_and_filter_columns() \
            .df_to_list()    \
            .set_empresas() \
            .build()
