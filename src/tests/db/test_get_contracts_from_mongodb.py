from data_access_layer.Contract_dao import Contract_dao

contract_dao = Contract_dao()


def test_get_contracts_from_mongodb():
    contracts = contract_dao.get_contracts()

    print('Contracts retrieved, first one is numbered: ',
          contracts[0]['numero_contrato'], '\nNow running tests...')

    assert len(contracts) == 97
    assert contracts[0]['numero_contrato'] == '23/2014'
    assert contracts[25]['numero_contrato'] == '35/2014'
    assert contracts[96]['numero_contrato'] == "11/2016"
