from data_access_layer.Entity import Entity


class Contract_dao(Entity):
    def __init__(self) -> None:
        super().__init__('contratos')
        self.search_key = 'numero_contrato'

    def list(self):
        response = self.entity_manager.aggregate(
            [
                {'$set':
                 {
                     'parcelas_pagas': {'$size': '$pagamentos'}
                 }
                 },
                {'$unset': ['_id', 'pagamentos']}
            ]

        )
        return list(response)
