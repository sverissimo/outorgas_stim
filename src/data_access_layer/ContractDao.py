from typing import List
from data_access_layer.EntityDao import EntityDao
from config.mongo_client import UpdateOne


class ContractDao(EntityDao):
    def __init__(self) -> None:
        super().__init__('contratos')
        self.search_key = 'numero_contrato'

    def find(self, filter: str or int):
        key = self.search_key
        filter = filter.replace('-', '/')
        query = {key: filter}

        response = self.entity_manager.find_one(query, {'_id': 0})
        return response

    def list(self, get_payments: bool = False):

        fields_to_exclude = ['_id', 'pagamentos'] if get_payments else ['_id']

        response = self.entity_manager.aggregate(
            [
                {'$set':
                 {
                     'parcelas_pagas': {'$size': '$pagamentos'}
                 }},
                {'$unset': fields_to_exclude}
            ]
        )
        return list(response)

    def insert_many(self, data: list):
        result = None
        search_key = self.search_key

        if not search_key:
            return self.entity_manager.insert_many(data)

        existing_ids = list(map(lambda x: x[search_key], self.list()))
        data_to_insert = filter(
            lambda el: el[search_key] not in existing_ids, data)

        result = self.entity_manager.insert_many(data_to_insert)
        print('ContractDAO insert acknowledgement:', result.acknowledged)

        return result

    def insert_payments(self, contracts_with_payments: list):

        updates = list(
            map(lambda pg: UpdateOne(
                {'numero_contrato': pg['numero_contrato']},
                {'$set': {
                    'pagamentos': pg['pagamentos']}
                 }
            ), contracts_with_payments)
        )

        self.entity_manager.bulk_write(updates)
