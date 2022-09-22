from dataclasses import asdict
from typing import List
import pandas as pd
from config import env
from utils.rename_columns import rename_columns
from domain.Pagamento import Pagamento
from domain.MissingPayment import MissingPayment
from domain.Linha import Linha


class SicarDao:

    path_to_file: str = f'{env.APP_FOLDER}\\data\\all_guias.xlsx'

    def __init__(self, path_to_file: str or None = None) -> None:
        if path_to_file:
            self.path_to_file = path_to_file

    def parse_and_read_xlsx(self, usecols: str or None = None) -> pd.DataFrame:

        guias = pd.read_excel(self.path_to_file, usecols=usecols)
        guias.dropna(how="all", axis=0, inplace=True)
        guias = guias[guias["Status"] == "Quitada"]
        guias.drop(columns='Status', inplace=True)
        rename_columns(guias)
        return guias

    def get_missing_payments(self, linhas: List[Linha]):

        guias = self.parse_and_read_xlsx(usecols='A:C,G,L,M')

        linhas_list = list(map(lambda x: str(x['id']), linhas))

        found = []
        missing_payments = []
        for idx, row in guias.iterrows():

            linha = str(row['linhas_id']).strip()

            if any(l in linha for l in linhas_list):
                # found.append(linha)
                pass
            else:
                pg_dict = row.to_dict()
                pg_dict['linhas_id']: str = pg_dict['linhas_id'].strip()
                pg = asdict(MissingPayment(**pg_dict))
                missing_payments.append(pg)

        return missing_payments

        """ 
        linhas = list(map(lambda x: x['linhas_id'], missing_payments))
        print('*******************Found: \n\n', found)
        print('*******************Missing: \n\n', linhas)
        print('*******************Found: \n\n', len(found))
        print('*******************Missing: \n\n', len(missing_payments)) """

    def get_payments(self, contract: dict) -> List[Pagamento]:

        guias = self.parse_and_read_xlsx()
        linha = str(contract["linhas_id"][0])

        contrato_payments = guias.loc[guias.linhas_id.str.contains(linha)]
        contrato_payments.reset_index(inplace=True)

        pagamentos = []
        n_contrato = contract['numero_contrato']

        for idx, row in contrato_payments.iterrows():

            row["data_pagamento"] = pd.to_datetime(
                row["data_pagamento"],
                dayfirst=True,
            ).date()

            # Lista de tuples com ano e mês de cada lançamento na lista pagamentos
            datas_pg: List[tuple] = list(
                map(
                    lambda y: (y.year, y.month),
                    list(map(lambda x: x["data_pagamento"], pagamentos)),
                )
            )

            valor = row["valor"]
            numero_guia = row["numero_guia"]

            # Verifica se houve mais de 1 pg em um determinado mês
            repeated_pgs: List[bool] = [
                el[0] == row["data_pagamento"].year and el[1] == row["data_pagamento"].month
                for el in datas_pg
                if type(el) == tuple
            ]
            same_month_index: int = (
                len(repeated_pgs) - 1 -
                repeated_pgs[::-
                             1].index(True) if True in repeated_pgs else None
            )

            # Se mais de um pg for feito no mesmo mês, acumula o valor ao invés de append o pg
            if same_month_index:
                valor = valor + pagamentos[same_month_index]["valor"]
                numero_guia = numero_guia+', ' + \
                    pagamentos[same_month_index]["numero_guia"]

                pagamentos[same_month_index]["valor"] = valor
                pagamentos[same_month_index]["numero_guia"] = numero_guia

            else:
                pagamentos.append(
                    {
                        "numero_guia": numero_guia,
                        "valor": valor,
                        "data_pagamento": row["data_pagamento"],
                    }
                )

        print(
            f'##### get_sicar_payments.py: Done processing {len(pagamentos)} payments to contract nº {n_contrato}')
        # Depois de usar as datas de pagamento como struct_date, formata p string YYYY-mm-dd

        for pg in pagamentos:
            pg["data_pagamento"] = pg["data_pagamento"].strftime("%Y-%m-%d")

        return pagamentos

    def merge_sicar_spreadsheets(self):
        guias_part1 = pd.read_excel(
            "../../data/guias_2011-2015_20_04_22.xls",
            sheet_name="Guias de Arrecadação",
            index_col=False,
        )
        guias_part2 = pd.read_excel(
            "../../data/guias_2015-2022_20_04_22.xls",
            sheet_name="Guias de Arrecadação",
            index_col=False,
        )

        guias = pd.concat([guias_part1, guias_part2])

        guias.dropna(how="all", axis=1, inplace=True)
        columns_to_drop = [
            "Tipo Receita",
            "Mês/Ano TGO/CGO",
            "Delegatário",
            "Unidade Executora",
        ]
        guias.drop(columns=columns_to_drop, inplace=True)

        guias["Linha"].fillna("0", inplace=True)
        guias["Linha"].astype(str)

        guias.to_excel("../../data/all_guias.xlsx", index=False)
