from data_access_layer.Entity import Entity


class ContractDao(Entity):
    def __init__(self) -> None:
        super().__init__('contratos')
        self.search_key = 'numero_contrato'

    def list(self, get_payments: bool = False):

        fields_to_exclude = ['_id', 'pagamentos']
        if get_payments:
            fields_to_exclude = ['_id']

        response = self.entity_manager.aggregate(
            [
                {'$set':
                 {
                     'parcelas_pagas': {'$size': '$pagamentos'}
                 }
                 },
                {'$unset': fields_to_exclude}
            ]

        )
        return list(response)
