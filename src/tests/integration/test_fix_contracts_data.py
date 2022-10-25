from services.ContractService import ContractService


def test_fix_contracts_data():

    update_result = ContractService().fix_contract_values()
    print('update_result: ', update_result)
