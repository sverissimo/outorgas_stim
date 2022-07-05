from data_access_layer.Entity import Entity


class Tjlp_dao(Entity):
    def __init__(self, collection: str or None = None) -> None:
        super().__init__(collection)
        self.search_key = '_id'
    pass

    def find(self, filter: str):
        key = self.search_key

        query = {key: filter}
        response = self.entity_manager.find_one(query)
        print('query: ', query)

        return response
