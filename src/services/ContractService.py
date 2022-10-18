from typing import List, TypedDict

from data_access_layer.ContractDao import ContractDao
from data_access_layer.SicarDao import SicarDao
from domain.Contrato import Contrato
from domain.Pagamento import Pagamento


class ContractPaymentsUpdate(TypedDict):
    numero_contrato: str
    payments: List[Pagamento]


class ContractService:

    contract_dao = ContractDao()

    def list(self, get_payments: bool = False):
        return self.contract_dao.list(get_payments)

    def find(self, numero_contrato: str):
        return self.contract_dao.find(numero_contrato)

    def fix_razao_social(self, empresas: list):
        for e in empresas:
            filter = {'codigo_empresa': e['codigo_empresa']}
            update = {'$set': {'razao_social': e['razao_social']}}

            result = self.contract_dao.update(filter=filter, update=update)
            print('result: ', result.matched_count, result.modified_count)

    def get_payments(self, contracts: List[Contrato]) -> List[Contrato]:

        log_count = 0

        for contract in contracts:
            payments = SicarDao().get_payments(contract)
            contract['pagamentos'] = payments

            log_count += 1
            print(f'@@@@@ ContractService: {log_count} of {len(contracts)}.\n')

        return contracts

    def insert_payments(self, contract_updates: List[ContractPaymentsUpdate]):
        self.contract_dao.insert_payments(contract_updates)
