from services.insert_payments_service import insert_payments_service


def test_get_payments(get_db_contracts):

    contracts = get_db_contracts

    assert len(contracts) == 97

    print('There should be 97 contracts stored in the database. ✓')

    c1_pg = contracts[0]['pagamentos']
    last_contract_pg = contracts[len(contracts) - 1]['pagamentos']

    print(f'payments for first contract: ', len(c1_pg))
    print(f'payments for last contract: ', len(last_contract_pg))
    assert c1_pg[0]['valor'] == 266.93
    assert c1_pg[len(c1_pg) - 1]['valor'] == 367.19

    print('first pg for last contract should be R$4.383,31. ✓')
    assert last_contract_pg[0]['valor'] == 4383.31

    print('21th pg (29/02/2020) for last contract should be R$5480.67. ✓')
    assert last_contract_pg[22]['valor'] == 5480.67
