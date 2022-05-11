from lib.mongo_client import get_db


def get_contracts(query: dict or None):

    entity_manager = get_db().contratos
    result = entity_manager.find(query)
    return list(result)
