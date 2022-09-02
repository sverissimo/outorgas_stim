from dataclasses import dataclass, field
from datetime import date
from typing import List


@dataclass
class Empresa:
    codigo_empresa: int
    razao_social: str
    cnpj: str
    situacao: str
    email: str
    cidade: str
    cep: str
