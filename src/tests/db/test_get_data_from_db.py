from data_access_layer.ContractDao import ContractDao
from data_access_layer.TjlpDao import TjlpDao
from data_access_layer.LinhaDao import LinhaDao

contract_dao = ContractDao()


def test_get_contracts_from_db():
    contracts = contract_dao.list()

    print('\n\nContracts retrieved, first one is numbered: ',
          contracts[0]['numero_contrato'], '\nNow running tests...')

    assert len(contracts) == 97
    assert contracts[0]['numero_contrato'] == '23/2014'
    assert contracts[25]['numero_contrato'] == '35/2014'
    assert contracts[96]['numero_contrato'] == "11/2016"


def test_get_tjlp_sef_from_db():
    entity_manager = TjlpDao('tjlp_sef')
    _set20 = entity_manager.find('9-2020')
    assert _set20['mes'].year == 2020
    assert _set20['mes'].month == 9
    assert _set20['taxa'] == 0.004092

    tjlp_sef_list = entity_manager.list()
    assert tjlp_sef_list[0]['mes'].year == 2009
    assert tjlp_sef_list[0]['taxa'] == 0.005208

    set20 = next(
        (t for t in tjlp_sef_list if t['mes'].year == 2020 and t['mes'].month == 9), None)

    assert set20['mes'].year == 2020
    assert set20['taxa'] == 0.004092


def test_find_one():
    contract_13 = contract_dao.find('13-2014')
    print('contract_13: ', contract_13)
    linha_1037 = LinhaDao().find('1037')
    print('linha_1037: ', linha_1037)
    tjlp_set15 = TjlpDao('tjlp_bndes').find('9-2015')
    print('tjlp_set15: ', tjlp_set15)
