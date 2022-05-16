from data_access_layer.get_contracts_from_sheet import get_contracts_from_sheet
from src.data_access_layer.Mongo_dao import Mongo_dao
from data_access_layer.get_sicar_payments import get_payments

entity_manager = Mongo_dao()


def test_insert_payments():

    contracts = entity_manager.get_contracts()
    sample = contracts[0:2]
    full_contracts = []
    for contract in sample:

        #payments = entity_manager.insert_payments((contract))
        payments = get_payments(contract)

        contract['pagamentos'] = payments
        full_contracts.append(contract)

    c1_pg = full_contracts[0]['pagamentos']
    print('c1_pg: ', c1_pg)
    print(f'payments for contract: ', len(c1_pg))
    assert c1_pg[0]['valor'] == 266.93
    assert c1_pg[len(c1_pg) - 1]['valor'] == 367.19
