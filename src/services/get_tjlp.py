from typing import Literal


from data_access_layer.get_tjlp_bndes import get_tjlp_bndes
from data_access_layer.get_tjlp_sef import get_tjlp_sef

SOURCE = Literal['bndes', 'sef']


def get_tjlp(source: SOURCE, update_only: bool):

    if source == 'bndes':
        return get_tjlp_bndes(update_only)
    else:
        return get_tjlp_sef()
