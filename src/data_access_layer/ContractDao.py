from data_access_layer.Entity import Entity
from config.mongo_client import UpdateOne


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

    def insert_payments(self, payments: list):

        updates = list(map(lambda pg: UpdateOne(
            {'numero_contrato': pg['numero_contrato']},
            {'$set': {
                'pagamentos': pg['pagamentos']}
             }
        ), payments))

        self.entity_manager.bulk_write(updates)
