from data_access_layer.Entity import Entity


class TjlpDao(Entity):
    def __init__(self, collection: str or None = None) -> None:
        super().__init__(collection)
        self.search_key = '_id'
    pass

    def find(self, filter: str):
        key = self.search_key
        query = {key: filter}

        response = self.entity_manager.find_one(query)
        return response

    def find_last_record(self):
        response = self.entity_manager.find({}).sort("mes", -1).limit(1)
        return list(response)
