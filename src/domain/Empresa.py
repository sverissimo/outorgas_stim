from dataclasses import dataclass, field
from datetime import date
from typing import TypedDict


class Empresa(TypedDict):
    codigo_empresa: int
    razao_social: str
    cnpj: str
    situacao: str
    email: str
    cidade: str
    cep: str
    frota: int
