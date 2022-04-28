from add_contracts_to_db import add_contracts
from services.add_payments import add_payments
from services.get_contracts_from_db import get_contracts
from services.get_tjlp import get_tjlp


def main():
    # add_contracts("Nov14")
    # tjlp = get_tjlp()

    contract = get_contracts()
    add_payments(contract=contract)

    exit()
    # add_payments(contract=contracts[0])


if __name__ == "__main__":
    main()
