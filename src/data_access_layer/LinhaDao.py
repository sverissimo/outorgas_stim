from data_access_layer.Entity import Entity


class LinhaDao(Entity):
    def __init__(self) -> None:
        super().__init__('linhas')
        self.search_key = 'id'
