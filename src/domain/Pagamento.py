from dataclasses import dataclass, field
from typing import List


@dataclass
class Pagamento:
    fields_to_rename: List[tuple] = field(default_factory=lambda: [
        ("CONTRATO", "numero_contrato"),
        ("CONCESSIONÁRIO", "razao_social"),
        ("CNPJ", "cnpj"),
        ("EDITAL", "edital"),
        ("VALOR DA OUTORGA (R$)", "valor_outorga"),
        ("INÍCIO DA VIGÊNCIA", "data_assinatura"),
        ("PONTOS EXTREMOS", "linhas_id")
    ])

    numero_contrato: str = None
    edital: str = None
    codigo_empresa: int = None
    razao_social: str = None
    cnpj: str = None
    linhas_id: List[int] = None
    valor_outorga: str = None
    #data_assinatura: date = None
    n_parcelas: int = None
    pagamentos: List[dict] = None
