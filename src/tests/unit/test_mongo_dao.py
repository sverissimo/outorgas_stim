from data_access_layer.Mongo_dao import Mongo_dao

mongo_client = Mongo_dao()


def test_get_contracts():
    contracts = mongo_client.get_contracts()
    print('contracts: ', contracts[0])
    assert len(contracts) > 0


def test_backup_db():
    result = mongo_client.backup_db()
    success_message = 'done dumping outorgas.contratos'

    print('message_index: ', result.find(success_message))
    assert result.find(success_message) != -1


def test_restore_db():
    mongo_client.restore_db()
    dbs = mongo_client.client.list_database_names()
    assert 'outorgas' in dbs


def test_drop_db():

    db_list_before = mongo_client.client.list_database_names()
    mongo_client.drop_db()
    db_list_after = mongo_client.client.list_database_names()

    print('### Testing mode: Outorgas DB dropped! ###')
    assert len(db_list_before) - len(db_list_after) == 1
