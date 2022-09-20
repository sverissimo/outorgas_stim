from data_access_layer.EntityDao import EntityDao


class LinhaDao(EntityDao):
    def __init__(self) -> None:
        super().__init__('linhas')
        self.search_key = 'id'

    def find(self, filter: str or int):
        key = self.search_key
        filter = int(filter)
        query = {key: filter}

        response = self.entity_manager.find_one(query, {'_id': 0})
        return response
