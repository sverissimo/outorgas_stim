from domain.Contrato import Contrato
from database.migrations.Director import Director
from database.migrations.ContractsBuilder import ContractsBuilder
from database.migrations.run_migrations import run_contracts_migration


def test_run_contracts_migration():
    run_contracts_migration()


def test_rename_contracts_df_columns():

    contracts_builder = ContractsBuilder()
    contract_director = Director(contracts_builder)

    contracts = contract_director.get_contracts_list()

    valid_columns_names = list(filter(
        lambda x: x if '__' not in x else None, dir(Contrato())))

    assert(set(contracts[0].keys())).issubset(set(valid_columns_names))
    print('\n\n ---Testing if\n',
          contracts[0].keys(), '\ncontained in\n', valid_columns_names)


def test_add_empresas_to_contracts(empresas_from_cadti):

    contracts_builder = ContractsBuilder(empresas_from_cadti)
    contract_director = Director(contracts_builder)
    contracts = contract_director.get_contracts_with_empresa()

    first_contract_n = contracts[0]['numero_contrato']
    codigo_empresa = contracts[0]['codigo_empresa']

    print('\n\nFirst contract should match 1/2009: ', first_contract_n)
    assert(first_contract_n.find('1/2009') > -1)
    assert(codigo_empresa is not None)
    assert(codigo_empresa > 999)  # Códigos de empresas possuem 4 dígitos


def test_add_linhas_to_contracts(empresas_from_cadti):

    contracts_builder = ContractsBuilder(empresas_from_cadti)
    contract_director = Director(contracts_builder)
    contracts = contract_director.get_full_contracts()

    print('contracts: ', len(contracts))
    print('contracts: ', contracts[0])
