from typing import List
import pandas as pd

from utils.rename_columns import rename_columns


def get_payments(contract: dict):

    #guias = pd.read_excel("../../data/all_guias.xlsx")
    guias = pd.read_excel(
        "C:\\Users\\m1107819\\Coding\\outorgas\\data\\all_guias.xlsx")
    guias.dropna(how="all", axis=0, inplace=True)
    guias = guias[guias["Status"] == "Quitada"]
    rename_columns(guias)
    linha = str(contract["linhas_id"][0])

    contrato_payments = guias.loc[guias.Linha.str.contains(linha)]
    contrato_payments.reset_index(inplace=True)

    pagamentos = []

    for idx, row in contrato_payments.iterrows():

        row["data_pagamento"] = pd.to_datetime(
            row["data_pagamento"],
            dayfirst=True,
        ).date()

        # Lista de tuples com ano e mês de cada lançamento na lista pagamentos
        datas_pg: List(tuple) = list(
            map(
                lambda y: (y.year, y.month),
                list(map(lambda x: x["data_pagamento"], pagamentos)),
            )
        )

        valor = row["valor"]

        # Verifica se houve mais de 1 pg em um deerminado mês
        repeated: bool = [
            el[0] == row["data_pagamento"].year and el[1] == row["data_pagamento"].month
            for el in datas_pg
            if type(el) == tuple
        ]
        same_month_index: int = (
            len(repeated) - 1 -
            repeated[::-1].index(True) if True in repeated else None
        )

        # Se mais de um pg for feito no mesmo mês, acumula o valor ao invés de append o pg
        if same_month_index:
            valor = valor + pagamentos[same_month_index]["valor"]
            pagamentos[same_month_index]["valor"] = valor

        else:
            pagamentos.append(
                {
                    "numero_guia": row["numero_guia"],
                    "valor": valor,
                    "data_pagamento": row["data_pagamento"],
                }
            )

    for pg in pagamentos:
        pg["data_pagamento"] = pg["data_pagamento"].strftime("%Y-%m-%d")

    return pagamentos
