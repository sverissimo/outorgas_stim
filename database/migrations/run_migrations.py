from data_access_layer.ContractDao import ContractDao
from data_access_layer.EntityDao import EntityDao
from data_access_layer.ExternalDataApi import ExternalDataApi
from data_access_layer.LinhaDao import LinhaDao
from data_access_layer.SicarDao import SicarDao
from database.migrations.ContractsBuilder import ContractsBuilder
from database.migrations.Director import Director
from database.migrations.LinhasBuilder import LinhasBuilder
from services.ContractService import ContractService
from services.TjlpService import TjlpService
from utils.add_codigo_empresa import add_codigo_empresa


def run_contracts_migration(empresas=None):
    if not empresas:
        empresas = ExternalDataApi().get_empresas_from_cadti()

    contracts_builder = ContractsBuilder(empresas)
    contracts_director = Director(contracts_builder)
    contracts = contracts_director.get_full_contracts()
    entity_manager = ContractDao()
    entity_manager.insert_many(contracts)
    return contracts


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


def run_payments_migration():
    contracts = EntityDao('contratos').list()
    contract_service = ContractService()

    contracts_with_payments = contract_service.get_payments(contracts)
    contract_service.insert_payments(contracts_with_payments)


def run_missing_payments_migration(empresas=None):
    if not empresas:
        empresas = ExternalDataApi().get_empresas_from_cadti()

    linhas = LinhaDao().list()
    missing_payments = SicarDao().get_missing_payments(linhas)
    missing_payments = add_codigo_empresa(empresas, missing_payments)

    missing_payments_dao = EntityDao('missing_payments')
    missing_payments_dao.insert_many(missing_payments)
    return missing_payments


def run_migrations(empresas=None, contratos=None):
    if not empresas:
        empresas = ExternalDataApi().get_empresas_from_cadti()

    run_linhas_migration(empresas)
    run_contracts_migration(empresas)

    """ if not contratos:
        contratos = ContractService().list()
    run_payments_migration(contratos) """
