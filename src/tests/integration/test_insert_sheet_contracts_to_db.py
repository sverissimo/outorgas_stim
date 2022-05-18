from config.mongo_client import client
from data_access_layer.Mongo_dao import Mongo_dao
from data_access_layer.get_contracts_from_sheet import get_contracts_from_sheet


def test_insert_sheet_contracts_to_db():

    db_exits = 'outorgas' in client.list_database_names()
    if db_exits:
        pass

    contracts_to_insert = get_contracts_from_sheet()
    print('Contracts extracted from Spreadsheets.')

    entity_manager = Mongo_dao()
    entity_manager.create_contracts(contracts_to_insert)
    print('Contracts inserted into mongoDB.')

    contracts = entity_manager.get_contracts()
    print('Contracts retrieved, first one is numbered: ',
          contracts[0]['numero_contrato'], '\nNow running tests...')

    assert len(contracts) == 97
    assert contracts[0]['numero_contrato'] == '23/2014'
    assert contracts[25]['numero_contrato'] == '35/2014'
    assert contracts[96]['numero_contrato'] == "11/2016"
