import pandas as pd
from typing import List
import re
from domain.Contrato import Contrato
from domain.Linha import Linha


class Builder():

    path_to_xlsx_file: str = 'data/Contratos DGTI.xlsx'
    empresas: list or None
    contracts: List[Contrato]
    contracts_df: pd.DataFrame

    def __init__(self, empresas=None):
        self.empresas = empresas

    def excel_to_dataframe(self):
        contracts_df = pd.read_excel(self.path_to_xlsx_file)
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

    def set_empresas(self):

        contracts = self.contracts
        for c in contracts:
            c['razao_social'] = c['razao_social'].replace('.', '')
            c['cnpj'] = c['cnpj'].replace('/001-', '/0001-')

            empresa = [el for el in self.empresas if el['razao_social']
                       == c['razao_social'] or el['cnpj'] == c['cnpj']]

            if len(empresa):
                c['razao_social'] = empresa[0]['razao_social']
                c['codigo_empresa'] = empresa[0]['codigo_empresa']
            # inside.add(c['cnpj'])

        self.contracts = contracts
        return self

    def get_linhas(self) -> List[Linha]:
        id_pattern = r'\d{4}'
        separator = r'e|,'
        all_linhas = []

        for c in self.contracts:
            linhas: str = c['linhas_id']
            multiple_lines = re.search(separator+id_pattern, linhas)

            if multiple_lines:
                linhas_list = re.split(separator+' \n', linhas)
                for l in linhas_list:
                    line = self.parse_linha_data(l, c)
                    all_linhas.append(line)
            else:
                line = self.parse_linha_data(linhas, c)
                all_linhas.append(line)

        self.linhas = all_linhas
        return all_linhas

    def parse_linha_data(self, linha: str, c: dict):
        id_pattern = r'\d{4}'
        id = re.search(id_pattern, linha)
        descricao_da_linha = re.sub(f'{id_pattern} - ', '', linha)
        descricao_da_linha = descricao_da_linha.lstrip()
        if id:
            id = int(id.group())
            try:
                return {'id': id,
                        'codigo_empresa': c['codigo_empresa'],
                        'numero_contrato': c['numero_contrato'],
                        'linha': descricao_da_linha,
                        }
            except KeyError:
                print(
                    '######## WARNING ########## Código da empresa não cadastrado no SGTI / CadTI!!!', c)
        else:
            print(
                f'######## WARNING ########## Linha id not found for {linha}')

    def set_linhas(self):
        return self

    def build(self):
        pass
