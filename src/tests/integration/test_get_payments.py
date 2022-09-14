def test_get_payments(get_db_contracts):

    contracts = get_db_contracts

    assert len(contracts) == 753

    print('There should be 753 contracts stored in the database. ✓')

    c1_pg = contracts[0]['pagamentos']
    contract_1_2010_pg = contracts[10]['pagamentos']

    print(f'payments for first contract: ', len(c1_pg))
    print(f'payments for 11th contract: ', len(contract_1_2010_pg))
    assert c1_pg[0]['valor'] == 2512.71
    assert c1_pg[-1:][0]['valor'] == 5083.58

    assert contract_1_2010_pg[11]['valor'] == 12563.13
    print('12th pg (30/12/2013) for 10th contract should be R$ 12563.67 ✓')
