from typing import Literal
from datetime import datetime

from data_access_layer.get_tjlp_bndes import get_tjlp_bndes
from data_access_layer.get_tjlp_sef import get_tjlp_sef

SOURCE = Literal['bndes', 'sef']


def get_tjlp(source: SOURCE, update_only: bool):

    if source == 'bndes':
        return get_tjlp_bndes(update_only)
    else:
        parsed_tjlp = []
        tjlp_sef = get_tjlp_sef()
        for year, rates in tjlp_sef.items():
            for month, rate in rates.items():
                id = f'{str(month)}-{str(year)}'
                mes = datetime(year, month, 1)
                month_rate = round(rate/100, 6)

                tjlp_rate = {
                    '_id': id,
                    'mes': mes,
                    'taxa': month_rate
                }
                if year > 2008 and rate > 0:
                    parsed_tjlp.append(tjlp_rate)
        return parsed_tjlp
