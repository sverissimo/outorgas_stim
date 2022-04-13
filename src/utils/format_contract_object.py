from datetime import date, datetime
import re


def format_object(contract: dict):

    pagamentos = []
    keys_to_delete = []
    pgto = {}

    for k, v in contract.items():

        if k.lower().find("vencimento") != -1:
            pgto["vencimento"] = str(v)
            keys_to_delete.append(k)

        if k.lower().find("valor ") != -1:
            pgto["valor"] = v
            a = re.search(r"\d{1,2}", k, flags=re.IGNORECASE)
            if a:
                pgto["parcela"] = a.group()
            keys_to_delete.append(k)

        if k.lower().find("status") != -1:
            pgto["status"] = v
            keys_to_delete.append(k)

        if len(pgto.keys()) > 3:
            pagamentos.append(pgto)
            pgto = {}

    for key in keys_to_delete:
        del contract[key]

    contract["pagamentos"] = pagamentos
