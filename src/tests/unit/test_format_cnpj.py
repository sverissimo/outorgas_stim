import re
from data_access_layer.get_contracts_from_sheet import get_contracts_from_sheet
from utils.format_cnpj import format_cnpj, cnpj_pattern
from src.data_access_layer.Mongo_dao import Mongo_dao
entity_manager = Mongo_dao()


def test_format_cnpj(get_mock_data_folder):

    #contracts = get_contracts_from_sheet()
    check_cnpj_list = []
    with open(get_mock_data_folder + 'cnpj_mock.txt') as f:
        for line in f:
            line = line.strip()
            cnpj = format_cnpj(line)
            is_correct = re.search(cnpj_pattern, cnpj)
            valid_cnpj = is_correct is not None

            check_cnpj_list.append(valid_cnpj)

    all_correct = all(valid == True for valid in check_cnpj_list)
    assert all_correct

    assert len(check_cnpj_list) == 97
