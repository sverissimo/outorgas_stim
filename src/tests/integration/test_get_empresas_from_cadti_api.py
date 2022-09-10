from data_access_layer.ExternalDataApi import ExternalDataApi


def test_get_empresas_from_cadti():

    empresas = ExternalDataApi().get_empresas_from_cadti()
    print(empresas[:2])
