from data_access_layer.ExternalDataApi import ExternalDataApi
from data_access_layer.LinhaDao import LinhaDao
from data_access_layer.EntityDao import EntityDao
from data_access_layer.TjlpDao import TjlpDao
from database.migrations.ContractsBuilder import ContractsBuilder
from database.migrations.LinhasBuilder import LinhasBuilder
from database.migrations.Director import Director
from services.TjlpService import TjlpService


def run_contracts_migration(empresas=None):
    if not empresas:
        empresas = ExternalDataApi().get_empresas_from_cadti()

    contracts_builder = ContractsBuilder(empresas)
    contracts_director = Director(contracts_builder)
    contracts = contracts_director.get_full_contracts()
    entity_manager = EntityDao('new_contracts')
    entity_manager.insert_many(contracts)


def run_linhas_migration(empresas=None):
    if not empresas:
        empresas = ExternalDataApi().get_empresas_from_cadti()

    linhas_builder = LinhasBuilder(empresas)
    linhas_director = Director(linhas_builder)
    linhas = linhas_director.get_all_linhas()
    entity_manager = LinhaDao()
    entity_manager.insert_many(linhas)


async def run_tjlp_migrations():

    tjlp_sources = ['bndes', 'sef']
    result = None
    for source in tjlp_sources:
        try:
            tjlp_service = TjlpService(source=source)
            updates = await tjlp_service.get_updates()

            if updates:
                print(f'### Updates found for tjlp{source}\n\nUpdating DB now')
                result = tjlp_service.insert_tjlp_to_db(updates)
                print(f'Acknowledged status for tjlp_{source}: ', result)
            else:
                print(f'### tjlp_{source} already up to date. Skipping update')

        except Exception as err:
            print(
                f'Something went wrong with tjlp_{source} update: \n\n {err}')


def run_migrations(empresas=None):
    if not empresas:
        empresas = ExternalDataApi().get_empresas_from_cadti()

    run_linhas_migration(empresas)
    run_contracts_migration(empresas)
