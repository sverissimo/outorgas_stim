from data_access_layer.get_empresas_from_cadti import get_empresas_from_cadti
from database.migrations.ContractsBuilder import ContractsBuilder
from database.migrations.LinhasBuilder import LinhasBuilder
from database.migrations.Director import Director


def run_contracts_migration(empresas=None):
    if not empresas:
        empresas = get_empresas_from_cadti()

    contracts_builder = ContractsBuilder(empresas)
    contracts_director = Director(contracts_builder)
    contracts = contracts_director.get_full_contracts()
    print('Contracts generated successfully. First one is: ', contracts[0])
    return contracts
    """ for c in contracts:
        del c['razao_social']
        del c['data_assinatura']
        print('contracts: ', c)
    print('contracts: ', len(contracts)) """


def run_linhas_migration(empresas=None):
    if not empresas:
        empresas = get_empresas_from_cadti()

    linhas_builder = LinhasBuilder(empresas)
    linhas_director = Director(linhas_builder)
    linhas = linhas_director.get_all_linhas()
    print('Linhas generated successfully. First one is: ', linhas[0])
    return linhas
    """ for l in linhas:
        print(l)
    print('linhas: ', len(linhas)) """


def run_migrations(empresas_from_cadti=None):
    if not empresas_from_cadti:
        empresas_from_cadti = get_empresas_from_cadti()
    run_linhas_migration(empresas_from_cadti)
    run_contracts_migration(empresas_from_cadti)
