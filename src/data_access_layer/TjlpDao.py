from data_access_layer.Entity import Entity


class TjlpDao(Entity):
    def __init__(self, collection: str or None = None) -> None:
        super().__init__(collection)
        self.search_key = '_id'
        self.collection = collection

    def find(self, filter: str):
        key = self.search_key
        query = {key: filter}

        response = self.entity_manager.find_one(query)
        return response

    def find_last_record(self):
        response = self.entity_manager.find({}).sort("mes", -1).limit(1)
        return list(response)

    def insert_tjlp_bndes(self, tjlp_bndes):
        if self.collection != 'tjlp_bndes':
            raise TypeError(
                'This instance does not support this method. \n Hint: try to pass "tjlp_bndes" to the class constructor')
        self.entity_manager.insert_many(tjlp_bndes)

    def insert_tjlp_sef(self, tjlp_sef):
        if self.collection != 'tjlp_sef':
            raise TypeError(
                'This instance does not support this method. \n Hint: try to pass "tjlp_sef" to the class constructor')
        self.entity_manager.insert_many(tjlp_sef)
