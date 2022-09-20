import json
from os import path
import pytest
# from data_access_layer.ExternalDataApi import ExternalDataApi


@pytest.fixture(scope='session')
def empresas_from_cadti():
    path_to_file = path.abspath(path.join(path.dirname(
        __file__), '../mock_data/empresas_cadti.json'))

    with open(path_to_file, encoding="utf8") as file:
        f = file.read().replace('\\n', '')  \
            .replace('\\r', '')

        empresas = json.loads(f)
        return empresas

    # return ExternalDataApi().get_empresas_from_cadti()
