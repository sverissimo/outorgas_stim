import re
from datetime import datetime
import json
from utils.validate_dates import parse_data_assinatura


def test_parse_data_assinatura(get_mock_data_folder):
    datas_assinatura = []

    with open(get_mock_data_folder + 'contracts.json', 'r') as f:
        contracts = f.read()
        contracts = json.loads(contracts)
        datas_assinatura = list(map(lambda x: x['data_assinatura'], contracts))

    correct_format = re.compile(r'^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$')

    for date in datas_assinatura:
        if not re.search(correct_format, date):
            parsed_date = parse_data_assinatura(date)
            print(date, ' --> ', parsed_date)

            assert isinstance(parsed_date, datetime)
