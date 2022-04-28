from lib.mongo_client import get_db


def create_contracts(contracts: list):

    contratos = get_db().contratos
    first_contract_n = contracts[0]["numero_contrato"]
    search = list(contratos.find({"numero_contrato": first_contract_n}))
    if len(search) > 0:
        print(
            "Data already exists ind MongoDB, skipping insert command\n contract found:",
            search,
        )
        return

    contratos.insert_many(contracts)
