from data_access_layer.ExternalDataApi import ExternalDataApi
from services.ContractService import ContractService


def test_fix_razao_social():
    contract_service = ContractService()
    empresas = ExternalDataApi().get_empresas_from_cadti()
    contract_service.fix_razao_social(empresas)
