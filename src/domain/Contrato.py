from dataclasses import dataclass
from datetime import date
from typing import List


@dataclass
class Contrato:

    numero: str = None
    edital: str = None
    codigo_empresa: int = None
    razao_social: str = None
    linhas_id: List[int] = None
    valor_outorga: str = None
    n_parcelas: int = None
    data_assinatura: date = None
    pagamentos: List[dict] = None

    def get_saldo_devedor():
        pass
