import pandas as pd
from domain.Contrato import Contrato
from domain.Linha import Linha


class ContractsBuilder():

    contracts: list[Contrato]
    contracts_df: pd.DataFrame

    def excel_to_dataframe(self, path_to_xlsx_file):
        contracts_df = pd.read_excel(path_to_xlsx_file)
        self.contracts_df = contracts_df
        return self

    def rename_and_filter_columns(self):

        contrato = Contrato()

        fields_to_rename: tuple = contrato.fields
        self.contracts_df.rename(columns=dict(fields_to_rename), inplace=True)

        contrato_props = list(
            filter(lambda x: x if '__' not in x else None, dir(contrato))
        )
        self.contracts_df.drop(
            columns=[col for col in self.contracts_df.keys() if col not in contrato_props], inplace=True)

        return self

    def df_to_list(self):
        self.contracts = self.contracts_df.to_dict(orient='records')
        return self

    def add_empresa_data(self, cadti_empresas):

        contracts = self.contracts
        for c in contracts:
            c['razao_social'] = c['razao_social'].replace('.', '')
            c['cnpj'] = c['cnpj'].replace('/001-', '/0001-')

            empresa = [el for el in cadti_empresas if el['razao_social']
                       == c['razao_social'] or el['cnpj'] == c['cnpj']]

            if len(empresa):
                c['razao_social'] = empresa[0]['razao_social']
                c['codigo_empresa'] = empresa[0]['codigo_empresa']
            # inside.add(c['cnpj'])

        self.contracts = contracts
        return self

    def add_linhas(self, linhas: list[Linha]):
        contracts = self.contracts

        for c in contracts:
            selected_lines = list(
                filter(
                    lambda linha: linha if linha['numero_contrato'] == c['numero_contrato'] else None, linhas
                )
            )
            c['linhas_id'] = list(map(lambda l: l['id'], selected_lines))
        return self

    def build(self):
        result = self.contracts_df
        if hasattr(self, 'contracts'):
            result = self.contracts

        return result
