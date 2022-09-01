#from config.mongo_client import client, get_db, UpdateOne
#from create_contracts_collection import create_contracts_collection
#from extract_linhas_from_contracts import extract_linhas_from_contracts
from migrations.extract_linhas_from_contracts import extract_linhas_from_contracts

""" from get_all_contracts_from_spreadsheet import get_all_contracts_from_spreadsheet
from create_linhas_collection import create_linhas_collection
from ContractsBuilder import ContractsBuilder """
from data_access_layer.get_empresas_from_cadti import get_empresas_from_cadti
#from BasicContractDirector import BasicContractDirector
from migrations.BasicContractDirector import BasicContractDirector


def run_migrations():

    empresas = get_empresas_from_cadti()
    raw_contracts = BasicContractDirector().construct(empresas)
    print('raw_contracts: ', dir(raw_contracts[0]))
    return

    linhas = extract_linhas_from_contracts(raw_contracts)
    #linhas_result = create_linhas_collection(linhas)
    print('linhas_result: ', linhas)
    contracts_with_lines = raw_contracts

    # contracts_builder.add_empresa_data(empresas)

    create_contracts_collection(db, )
    pass
