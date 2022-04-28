from lib.mongo_client import get_db


def insert_payments(numero_contrato: str, payments: list):
    entity_manager = get_db().contratos
    entity_manager.update_one(
        {"numero_contrato": numero_contrato}, {"$set": {"pagamentos": payments}}
    )
