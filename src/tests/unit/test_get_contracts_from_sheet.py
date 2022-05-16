from data_access_layer.get_contracts_from_sheet import get_contracts_from_sheet


def test_get_contracts_from_one_sheet():
    contracts = get_contracts_from_sheet(sheet='Nov14')
    assert len(contracts) == 26
    assert contracts[0]['numero_contrato'] == '23/2014'
    assert contracts[25]['numero_contrato'] == '35/2014'


def test_get_contracts_from_all_sheets():
    contracts = get_contracts_from_sheet(None)
    assert len(contracts) == 97
    assert contracts[0]['numero_contrato'] == '23/2014'
    assert contracts[96]['numero_contrato'] == '11/2016'
