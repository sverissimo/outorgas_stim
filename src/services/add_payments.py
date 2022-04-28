from pprint import pprint
from timeit import repeat
from typing import List
import pandas as pd
from services.get_tjlp import get_tjlp

from utils.rename_columns import rename_columns


def add_payments(contract: dict):
    tjlp = get_tjlp()
    contract["pagamentos"] = []

    guias = pd.read_excel("../data/all_guias.xlsx")
    guias.dropna(how="all", axis=0, inplace=True)
    guias = guias[guias["Status"] == "Quitada"]
    rename_columns(guias)
    linha = contract["linhas_id"][0]

    contrato23_payments = guias.loc[guias.Linha.str.contains(linha)]
    contrato23_payments.reset_index(inplace=True)

    data_referencia = contract["data_assinatura"]
    pagamentos = []

    for idx, row in contrato23_payments.iterrows():
        row["vencimento_parcela"] = pd.to_datetime(
            row["vencimento_parcela"], dayfirst=True
        ).date()

        row["data_pagamento"] = pd.to_datetime(
            row["data_pagamento"],
            dayfirst=True,
        ).date()

        month = data_referencia.month
        year = data_referencia.year

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
            len(repeated) - 1 - repeated[::-1].index(True) if True in repeated else None
        )

        # Se mais de um pg for feito no mesmo mês, acumula o valor ao invés de append o pg
        if same_month_index:
            valor = valor + pagamentos[same_month_index]["valor"]
            pagamentos[same_month_index]["valor"] = valor

        else:
            pagamentos.append(
                {
                    "n_parcela": idx + 1,
                    "numero_guia": row["numero_guia"],
                    "vencimento_parcela": row["vencimento_parcela"],
                    "valor": valor,
                    "data_pagamento": row["data_pagamento"],
                    "status": row["status"],
                    "tjlp": tjlp[year][month],
                }
            )
        # Verifica se a data de referência foi a data do pagamento
        date_exists = len(
            list(
                filter(
                    lambda x: x["data_pagamento"].year == year
                    and x["data_pagamento"].month == month,
                    pagamentos,
                )
            )
        )
        # Se não houve pagamento na data de referência, insere lançamento como inadimplente.
        if not date_exists:
            overdue_payment = {
                "n_parcela": idx + 1,
                "vencimento_parcela": data_referencia,
                "valor": 0,
                "data_pagamento": pd.NaT,
                "status": "Inadimplente",
                "tjlp": tjlp[year][month],
            }
            # Conserta a ordem cronológica dos pagamentos:
            # Duplica o último pg
            last_pg = pagamentos[len(pagamentos) - 1]
            pagamentos.append(last_pg)
            # Acrescenta o overdue no penúltimo index
            pagamentos[-2] = overdue_payment
            # Corrige n_parcela do último pg
            last_pg["n_parcela"] = idx + 2

        data_referencia = data_referencia + pd.DateOffset(months=1)
        # print("date_exists: ", date_exists)

        # if row["data_pagamento"].year != year and row["data_pagamento"].month != month:

    for pg in pagamentos:
        pprint(pg)

    """ if True:
        pagamentos.append(
            {
                "n_parcela": idx + 1,
                "numero_guia": row["numero_guia"],
                "vencimento_parcela": row["vencimento_parcela"],
                "valor": valor,
                "data_pagamento": row["data_pagamento"],
                "status": row["status"],
                "tjlp": tjlp[year][month],
            }
        ) """

    # pprint(contract)

    # print(contrato23_payments)

    return
    # for parcela in contract['pagamentos']:
