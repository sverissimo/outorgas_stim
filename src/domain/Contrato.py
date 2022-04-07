from dataclasses import dataclass, field
from datetime import date
from typing import List, Optional


@dataclass
class Contrato:
    numero: str = None
    edital: str = None
    delegatario: str = None
    codigo_empresa: int = None
    valor_contrato: str = None
    linhas_id: Optional[List[int]] = None
    data_assinatura: date = None
    data_inicio: str = None
    n_parcelas: int = None
    carencia: int = None


c = Contrato()
c.data_assinatura = date(2022, 4, 6)
print(c.data_assinatura)
