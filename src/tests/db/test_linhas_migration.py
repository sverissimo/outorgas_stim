from database.migrations.ContractsBuilder import ContractsBuilder
from data_access_layer.get_empresas_from_cadti import get_empresas_from_cadti
from database.migrations.run_migrations import run_linhas_migration


def test_extract_linhas():
    pass


"""     empresas = get_empresas_from_cadti()
    contracts = ContractsBuilder() \
        .excel_to_dataframe('data/Contratos DGTI.xlsx') \
        .rename_and_filter_columns() \
        .df_to_list()    \
        .add_empresa_data(empresas) \
        .build()
    extract_linhas_from_contracts(contracts)
 """


def test_linhas_migration():
    run_linhas_migration()
