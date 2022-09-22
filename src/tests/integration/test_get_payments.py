from data_access_layer.SicarDao import SicarDao


def test_get_payments(get_db_contracts):

    contract = [
        c for c in get_db_contracts if c['numero_contrato'] == '19/2014'][0]

    sicar_dao = SicarDao()
    payments = sicar_dao.get_payments(contract)

    print('payments length should be 55, 5 with multiple invoices: ', len(payments))

    assert(payments[7]['numero_guia'] == '001798-2015-0805, 001072-2015-0805')
    assert(payments[7]['valor'] == 816.4300000000001)
