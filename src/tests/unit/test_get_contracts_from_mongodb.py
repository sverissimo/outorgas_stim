from data_access_layer.Mongo_dao import Mongo_dao

mongo_client = Mongo_dao()


def test_get_contracts_from_mongodb():
    contracts = mongo_client.get_contracts()
    print('contracts: ', contracts[0])
    assert len(contracts) == 97
    assert contracts[0]['numero_contrato'] == '23/2014'
    assert contracts[25]['numero_contrato'] == '35/2014'
