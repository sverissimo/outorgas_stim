from database.migrations.ContractsBuilder import ContractsBuilder
from database.migrations.extract_linhas_from_contracts import extract_linhas_from_contracts
from domain.Contrato import Contrato
from data_access_layer.get_empresas_from_cadti import get_empresas_from_cadti
from database.migrations.BasicContractDirector import BasicContractDirector


def test_rename_contracts_df_columns():

    contracts_df = ContractsBuilder() \
        .excel_to_dataframe('data/Contratos DGTI.xlsx') \
        .rename_and_filter_columns() \
        .build()

    valid_columns_names = list(filter(
        lambda x: x if '__' not in x else None, dir(Contrato())))

    print(contracts_df.keys(), ' contained in', valid_columns_names)
    assert(set(contracts_df.keys())).issubset(set(valid_columns_names))


def test_add_empresas_to_contracts():

    empresas = get_empresas_from_cadti()
    contracts = BasicContractDirector.construct(empresas)

    print('contracts: ', dir(contracts[0]))


def test_add_linhas_to_contracts():

    empresas = get_empresas_from_cadti()
    contracts_builder = ContractsBuilder() \
        .excel_to_dataframe('data/Contratos DGTI.xlsx') \
        .rename_and_filter_columns() \
        .df_to_list()    \
        .add_empresa_data(empresas) \

    linhas = extract_linhas_from_contracts(contracts_builder.contracts)

    contracts_builder.add_linhas(linhas)
    result = contracts_builder.build()

    print('contracts: ', len(result))
