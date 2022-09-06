from data_access_layer.MongoDao import MongoDao
from data_access_layer.get_empresas_from_cadti import get_empresas_from_cadti


def test_get_empresas_from_cadti():
    empresas = get_empresas_from_cadti()
    print(empresas[:2])


def test_update_razao_social():
    entity_manager = MongoDao()
    empresas = get_empresas_from_cadti()
    entity_manager.update_razao_social(empresas)
