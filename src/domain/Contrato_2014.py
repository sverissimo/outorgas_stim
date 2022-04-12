from dataclasses import dataclass
from datetime import date
import pandas as pd

from domain.Contrato import Contrato


@dataclass
class Contrato_2014(Contrato):
    # path_to_file: str

    def get_df(self):
        self.df = pd.read_excel(self.path_to_file, converters={})
        print(self.df, self.codigo_empresa)
