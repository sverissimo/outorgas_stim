from config.mongo_client import get_db


class Entity():

    search_key: str or None = None

    def __init__(self, collection: str or None = None) -> None:
        if collection:
            self.entity_manager = get_db()[collection]

    def list(self):
        response = self.entity_manager.find()
        return list(response)

    def find(self, filter: str):
        key = self.search_key

        query = {key: filter}
        response = self.entity_manager.find_one(query, {'_id': 0})
        print('query: ', query)

        return response

    def insert_one(self, entity: dict):
        result = self.entity_manager.insert_one(entity)
        return result

    def insert_many(self, entity: list):
        result = self.entity_manager.insert_many(entity)
        return result
