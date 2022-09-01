from data_access_layer.LinhaDao import LinhaDao
from migrations.ContractsBuilder import ContractsBuilder
from migrations.extract_linhas_from_contracts import extract_linhas_from_contracts


def create_linhas_collection(contracts):
    linhas = extract_linhas_from_contracts(contracts)
    entity_manager = LinhaDao()
    entity_manager.insert_many(linhas)
