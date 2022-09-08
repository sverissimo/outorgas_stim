from data_access_layer.SicarDao import SicarDao
from data_access_layer.LinhaDao import LinhaDao


def test_get_missing_payments():

    linhas = LinhaDao().list()
    SicarDao().get_missing_payments(linhas)
