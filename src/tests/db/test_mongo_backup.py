from database.MongoDao import MongoDao

mongo_client = MongoDao()


def test_backup_db():
    result = mongo_client.backup_db()
    print('result: ', result)
    success_message = 'done dumping outorgas.contratos'

    print('message_index: ', result.find(success_message))
    assert result.find(success_message) != -1


def test_drop_db():

    mongo_client.drop_db(backup=False)

    dbs = mongo_client.client.list_database_names()

    print('### Testing mode: Outorgas DB dropped! ###')
    assert 'outorgas'not in dbs


def test_restore_db():
    mongo_client.restore_db()
    dbs = mongo_client.client.list_database_names()
    assert 'outorgas' in dbs
