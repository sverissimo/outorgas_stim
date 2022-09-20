from dataclasses import dataclass
from datetime import date


@dataclass
class Pagamento:
    numero_guia: str = None
    valor: str = None
    data_pagamento: date = None
