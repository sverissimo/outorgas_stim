from data_access_layer.ExternalDataApi import ExternalDataApi
from utils.add_codigo_empresa import add_codigo_empresa


def test_get_empresas_from_cadti():

    empresas = ExternalDataApi().get_empresas_from_cadti()
    print(empresas[:2])


def test_add_codigo_empresa(empresas_from_cadti):

    add_codigo_empresa(empresas_from_cadti)
