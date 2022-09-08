from data_access_layer.MongoDao import MongoDao
from data_access_layer.ExternalDataApi import ExternalDataApi


def test_update_razao_social():
    entity_manager = MongoDao()
    empresas = ExternalDataApi().get_empresas_from_cadti()
    entity_manager.update_razao_social(empresas)
