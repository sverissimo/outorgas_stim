from pprint import pprint
from add_contracts_to_db import add_contracts
from lib.insert_payments_to_db import insert_payments
from services.add_payments import add_payments
from services.get_contracts_from_db import get_contracts
from services.get_tjlp import get_tjlp


def main():
    # add_contracts("Nov14")
    # tjlp = get_tjlp()

    contracts = get_contracts(None)

    # contract = contracts[0]
    for contract in contracts:
        n_contrato = contract["numero_contrato"]

        payments = add_payments(contract=contract)
        insert_payments(numero_contrato=n_contrato, payments=payments)

        print("n_contrato: ", n_contrato)

    exit()
    # add_payments(contract=contracts[0])


if __name__ == "__main__":
    main()
