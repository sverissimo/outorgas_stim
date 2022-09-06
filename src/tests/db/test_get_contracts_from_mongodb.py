from data_access_layer.ContractDao import ContractDao

contract_dao = ContractDao()


def test_get_contracts_from_mongodb():
    contracts = contract_dao.list()

    print('\n\nContracts retrieved, first one is numbered: ',
          contracts[0]['numero_contrato'], '\nNow running tests...')

    assert len(contracts) == 97
    assert contracts[0]['numero_contrato'] == '23/2014'
    assert contracts[25]['numero_contrato'] == '35/2014'
    assert contracts[96]['numero_contrato'] == "11/2016"
