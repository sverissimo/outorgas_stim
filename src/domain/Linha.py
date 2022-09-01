from dataclasses import dataclass


@dataclass
class Linha():
    id: int
    linha: str
    numero_contrato: int
    codigo_empresa: int
