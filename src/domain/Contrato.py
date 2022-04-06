from datetime import date


class Contrato:
    numero: str
    edital: str
    delegatario: str
    codigo_empresa: int
    valor_contrato: str
    linhas_id: list
    data_assinatura: date
    data_inicio: date
    n_parcelas: int
    carencia: int

    def __init__(self) -> None:
        pass
