from data_access_layer.ExternalDataApi import ExternalDataApi
from data_access_layer.LinhaDao import LinhaDao
from data_access_layer.Entity import Entity
from database.migrations.ContractsBuilder import ContractsBuilder
from database.migrations.LinhasBuilder import LinhasBuilder
from database.migrations.Director import Director


def run_contracts_migration(empresas=None):
    if not empresas:
        empresas = ExternalDataApi().get_empresas_from_cadti()

    contracts_builder = ContractsBuilder(empresas)
    contracts_director = Director(contracts_builder)
    contracts = contracts_director.get_full_contracts()
    entity_manager = Entity('new_contracts')
    entity_manager.insert_many(contracts)


def run_linhas_migration(empresas=None):
    if not empresas:
        empresas = ExternalDataApi().get_empresas_from_cadti()

    linhas_builder = LinhasBuilder(empresas)
    linhas_director = Director(linhas_builder)
    linhas = linhas_director.get_all_linhas()
    entity_manager = LinhaDao()
    entity_manager.insert_many(linhas)


def run_migrations(empresas=None):
    if not empresas:
        empresas = ExternalDataApi().get_empresas_from_cadti()

    run_linhas_migration(empresas)
    run_contracts_migration(empresas)
