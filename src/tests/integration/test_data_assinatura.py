from datetime import datetime


def test_data_assinatura(get_db_contracts):

    contracts = get_db_contracts
    data_assinatura = list(map(lambda x: x['data_assinatura'], contracts))
    for date in data_assinatura:
        assert isinstance(date, datetime)
