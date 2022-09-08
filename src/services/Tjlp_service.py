from typing import Literal
from data_access_layer.ExternalDataApi import ExternalDataApi
from data_access_layer.TjlpDao import TjlpDao

SOURCE = Literal['bndes', 'sef']


class Tjlp_service:

    api = ExternalDataApi()

    def __init__(self, source: SOURCE) -> None:
        self.source = source
        self.entity_manager = TjlpDao(source)

    async def get_tjlp(self):

        if self.source == 'bndes':
            tjlp_bndes = await self.api.get_tjlp_bndes(update_only=False)
            if tjlp_bndes:
                self.entity_manager.insert_tjlp_bndes(tjlp_bndes)
            return tjlp_bndes

        elif self.source == 'sef':
            tjlp_sef = self.api.get_tjlp_sef(update_only=False)
            """ if tjlp_sef:
                self.entity_manager.insert_tjlp_sef(update_only=False) """
            return tjlp_sef

    def get_tjlp_sef(self):
        if self.source == 'sef':
            tjlp_sef = self.api.get_tjlp_sef(update_only=False)
            """ if tjlp_sef:
                self.entity_manager.insert_tjlp_sef(update_only=False) """
            return tjlp_sef

    async def update(self):
        if self.source == 'bndes':
            tjlp_bndes_update = await self.api.get_tjlp_bndes(update_only=True)
            if tjlp_bndes_update:
                self.entity_manager.insert_tjlp_bndes(tjlp_bndes_update)
            return tjlp_bndes_update

    """  def get_tjlp_sef(self):

        tjlp_sef = self.api.get_tjlp_sef()
        print('tjlp_sef: ', tjlp_sef[-4:-1])

        return tjlp_sef
 """
