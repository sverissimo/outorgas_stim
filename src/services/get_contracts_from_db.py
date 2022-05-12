from lib.mongo_client import get_db


def get_contracts_from_db(query: dict or None = None):

    entity_manager = get_db().contratos
    result = entity_manager.find(query, {'_id': 0})
    result = list(result)

    return result
