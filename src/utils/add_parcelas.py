#from datetime import date, datetime
import re

import pandas as pd

from utils.validate_dates import fix_invalid_dates


def add_parcelas(contract: dict):

    pagamentos = []
    keys_to_delete = []
    pgto = {}

    for k, v in contract.items():

        if k.lower().find("vencimento") != -1:
            parcela_search = re.search(r"\d{1,2}", k, flags=re.IGNORECASE)
            numero_parcela = parcela_search.group()

            if numero_parcela:
                pgto["parcela"] = numero_parcela

            v = pd.to_datetime(fix_invalid_dates(str(v)))
            if v.year == 1970:
                data_assinatura = pd.to_datetime(contract["data_assinatura"])
                v = data_assinatura + pd.DateOffset(int(numero_parcela) - 1)

            pgto["vencimento"] = v.to_pydatetime().strftime("%Y-%m-%d")

            # A ultima parcela não foi preenchida como 'PAGO'
            """  last_payment = v > datetime(2020, 1, 30)
            if last_payment:
                pgto["status"] = "PAGO" """

            keys_to_delete.append(k)

        if k.lower().find("valor ") != -1:
            # pgto["valor"] = v
            keys_to_delete.append(k)

        if k.lower().find("status") != -1:
            # pgto["status"] = v
            keys_to_delete.append(k)

        if len(pgto.keys()) > 0:
            pagamentos.append(pgto)
            pgto = {}

    for key in keys_to_delete:
        del contract[key]

    contract["pagamentos"] = pagamentos
