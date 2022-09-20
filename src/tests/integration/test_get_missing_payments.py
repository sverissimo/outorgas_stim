from data_access_layer.SicarDao import SicarDao
from data_access_layer.LinhaDao import LinhaDao


def test_get_missing_payments():

    linhas = LinhaDao().list()
    missing_payments = SicarDao().get_missing_payments(linhas)

    print('missing_payments: ', missing_payments[:10])
