from typing import List
from data_access_layer.SicarDao import SicarDao
from data_access_layer.ContractDao import ContractDao
from domain.Contrato import Contrato


def insert_payments_service(contracts: List[Contrato], insert: bool = True) -> list:

    entity_manager = ContractDao()
    updates = []
    log_count = 0

    for contract in contracts:
        payments = SicarDao.get_payments(contract)

        updates.append({
            'numero_contrato': contract['numero_contrato'],
            'pagamentos': payments
        })
        log_count += 1
        print(
            f'@@@@@ insert_payments_service: {log_count} done of {len(contracts)}.\n')

    if insert == True:
        entity_manager.insert_payments(updates)
    return updates
