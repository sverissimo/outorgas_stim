from data_access_layer.EntityDao import EntityDao
from services.insert_payments_service import insert_payments_service


def test_insert_all_payments():
    contracts_dao = EntityDao('contratos')
    contracts = contracts_dao.list()
    print('contracts: ', len(contracts))
    #print('contracts: ', contracts[-5:])
    insert_payments_service(contracts)
