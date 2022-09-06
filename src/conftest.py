import os
from pytest import fixture
from data_access_layer.MongoDao import MongoDao
from data_access_layer.ContractDao import ContractDao


@fixture
def get_mock_data_folder():
    path_do_mock_data = os.getcwd() + '\\src\\tests\\mock_data\\'
    return path_do_mock_data


@fixture
def get_db_contracts():

    entity_manager = ContractDao()
    contracts = entity_manager.list()
    return contracts
