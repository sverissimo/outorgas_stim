import os
from pytest import fixture
from services.ContractService import ContractService


@fixture
def get_mock_data_folder():
    path_do_mock_data = os.getcwd() + '\\src\\tests\\mock_data\\'
    return path_do_mock_data


@fixture
def get_db_contracts():
    contracts = ContractService().list()
    return contracts
