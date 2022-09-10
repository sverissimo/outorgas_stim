from typing import Literal, List
from data_access_layer.ExternalDataApi import ExternalDataApi
from data_access_layer.TjlpDao import TjlpDao
from domain.Tjlp import Tjlp

SOURCE = Literal['bndes', 'sef']


class TjlpService:

    api = ExternalDataApi()
    tjlp: List[Tjlp] = []

    def __init__(self, source: SOURCE) -> None:
        self.source = source
        self.entity_manager = TjlpDao(f'tjlp_{source}')

    async def get_tjlp(self):
        if self.source == 'bndes':
            tjlp_list = await self.api.get_tjlp_bndes()

        elif self.source == 'sef':
            tjlp_list = self.api.get_tjlp_sef()

        return tjlp_list

    async def get_updates(self):

        tjlp_list = await self.get_tjlp()
        last_tjlp_record = self.entity_manager.find_last_record()
        should_update = await self.should_update(tjlp_list, last_tjlp_record)

        if not should_update:
            print(f'DB already up to date. Last: \n{last_tjlp_record}')
            return None

        updates = []
        i = -1
        while tjlp_list[i]['mes'] > last_tjlp_record['mes']:
            update = tjlp_list[i]
            print('Update found: ', update)
            updates.insert(0, update)
            i -= 1

        return updates

    async def should_update(self, tjlp_list: List[Tjlp], last_tjlp_record: Tjlp):

        most_recent_tjlp = tjlp_list[- 1]

        if last_tjlp_record['_id'] == most_recent_tjlp['_id']:
            return False
        else:
            return True

    def insert_tjlp_to_db(self, tjlp_list: List[Tjlp]) -> str:
        result = self.entity_manager.insert_tjlp(tjlp_list)
        print('Inserted ids: ', result.inserted_ids)
        return result.acknowledged
