from lib.mongo_client import get_db


def get_contracts(query: dict or None):

    entity_manager = get_db().contratos
    first = entity_manager.find(query)
    return list(first)
