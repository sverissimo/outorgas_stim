from typing import List
from data_access_layer.EntityDao import EntityDao
from domain.Tjlp import Tjlp


class TjlpDao(EntityDao):
    def __init__(self, collection: str or None = None) -> None:
        super().__init__(collection)
        self.search_key = '_id'
        self.collection = collection

    def find_last_record(self):
        response = self.entity_manager.find({}).sort("mes", -1).limit(1)
        return list(response)[0]

    def insert_tjlp(self, tjlp_list: List[Tjlp]):
        result = self.entity_manager.insert_many(tjlp_list)
        return result
