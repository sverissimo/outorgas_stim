from datetime import datetime
from typing import Literal
from data_access_layer.get_tjlp_bndes import get_tjlp_bndes
from data_access_layer.get_tjlp_sef import get_tjlp_sef
from data_access_layer.MongoDao import MongoDao

SOURCE = Literal['bndes', 'sef']


class Tjlp_service:

    def __init__(self, source: SOURCE) -> None:
        self.source = source

    def get_tjlp(self):
        if self.source == 'bndes':
            return get_tjlp_bndes(update=False)
        elif self.source == 'sef':
            return self.get_tjlp_sef()

    async def update(self):
        if self.source == 'bndes':
            tjlp_bndes_update = await get_tjlp_bndes(update=True)
            if tjlp_bndes_update:
                entity_manager = MongoDao()
                entity_manager.insert_tjlp_bndes(tjlp_bndes_update)
            return tjlp_bndes_update

    def get_tjlp_sef(self):
        parsed_tjlp = []
        tjlp_sef = get_tjlp_sef()
        print('tjlp_sef: ', tjlp_sef)

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
        print('parsed_tjlp: ', parsed_tjlp)
        return parsed_tjlp
