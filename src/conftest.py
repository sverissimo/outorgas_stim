import os
from pytest import fixture
from data_access_layer.Mongo_dao import Mongo_dao
from data_access_layer.Contract_dao import Contract_dao


@fixture
def get_mock_data_folder():
    path_do_mock_data = os.getcwd() + '\\src\\tests\\mock_data\\'
    return path_do_mock_data


@fixture
def get_db_contracts():

    entity_manager = Contract_dao()
    contracts = entity_manager.list()
    return contracts
