from datetime import date, datetime
from time import strptime
import pandas as pd
from lib.insert_payments_to_db import insert_payments
from services.add_payments import add_payments
#from services.get_contracts_from_db import get_contracts
from services.get_tjlp_bndes import get_tjlp_bndes
from utils.validate_dates import fix_data_assinatura


def main():
    payments = []
    contracts = get_contracts(None)
    datas = list(map(lambda x: x["data_assinatura"], contracts))

    """     if type(data) == str:
            data = fix_data_assinatura(data)
            # parsed_data = pd.to_datetime(data, format="%b-%y")
            [year, month, day, *other] = strptime(data, "%b-%y")

            data = datetime(year, month, day)
            # print("data: ", data)
            # print(type(parsed_data), parsed_data) """

    for contract in contracts:
        n_contrato = contract["numero_contrato"]

        payments.append(add_payments(contract=contract))
        #insert_payments(numero_contrato=n_contrato, payments=payments)

        print("n_contrato: ", n_contrato)

    return payments

    exit()
    # add_payments(contract=contracts[0])


if __name__ == "__main__":
    # asyncio.run(main())
    main()
