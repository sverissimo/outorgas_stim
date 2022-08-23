from data_access_layer.Mongo_dao import Mongo_dao
from data_access_layer.get_empresas_from_cadti import get_empresas_from_cadti


def test_get_empresas_from_cadti():
    empresas = get_empresas_from_cadti()
    print(empresas[:2])


def test_update_razao_social():
    entity_manager = Mongo_dao()
    empresas = get_empresas_from_cadti()
    entity_manager.update_razao_social(empresas)
