from lib.mongo_client import get_db


def get_contracts():
    manager = get_db().contratos
    first = manager.find_one({"numero_contrato": "27/2014"})
    return first
    """ first = manager.find()
    return list(first) """
