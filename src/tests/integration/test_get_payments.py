from data_access_layer.SicarDao import SicarDao


def test_get_payments(get_db_contracts):
    contracts = [
        c for c in get_db_contracts if c['numero_contrato'] == '19/2014']
    result = []

    sicar_dao = SicarDao()
    for contract in contracts:
        print('contract: ', contract)
        payments = sicar_dao.get_payments(contract)
        result.append({'c': contract['numero_contrato'], 'p': payments})

    print('result: ', len(contracts))
    print('payments length should be 55, 5 with multiple invoices: ', len(payments))

    assert(payments[7]['numero_guia'] == '001798-2015-0805, 001072-2015-0805')
    assert(payments[7]['valor'] == 816.4300000000001)


def test_get_wrong_payments(get_db_contracts):
    contracts = [
        c for c in get_db_contracts if c['numero_contrato'] == '17/2015' or c['numero_contrato'] == '30/2015' or c['numero_contrato'] == '05/2016']

    result = []

    sicar_dao = SicarDao()
    for contract in contracts:
        payments = sicar_dao.get_payments(contract)
        #print('payments: ', payments[0])
        result.append({'c': contract['numero_contrato'], 'p': payments})

    print('result: ', result[0])
    print('result: ', len(contracts))
