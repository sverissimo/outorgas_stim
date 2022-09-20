from dataclasses import dataclass
from datetime import date


@dataclass
class MissingPayment(object):

    numero_guia: str = None
    codigo_empresa: int = None
    razao_social: str = None
    valor: str = None
    data_pagamento: date = None
    linha_id: str = None

    """  def __getitem__(self, item):
        return getattr(self, item)

    def __setitem__(self, key, value):
        self.__dict__[key] = value """
