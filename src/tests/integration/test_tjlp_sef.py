from data_access_layer.Mongo_dao import Mongo_dao
from data_access_layer.Tjlp_dao import Tjlp_dao
from services.get_tjlp import get_tjlp


def test_insert_tjlp_sef():
    entity_manager = Mongo_dao()
    tjlp_sef_list = get_tjlp(source='sef', update_only=False)
    assert tjlp_sef_list[0]['mes'].year == 2009
    assert tjlp_sef_list[0]['taxa'] == 0.005208

    set20 = next(
        (t for t in tjlp_sef_list if t['mes'].year == 2020 and t['mes'].month == 9), None)

    assert set20['mes'].year == 2020
    assert set20['taxa'] == 0.004092

    entity_manager.insert_tjlp_sef(tjlp_sef_list)


def test_get_tjlp_sef_from_db():
    _set20 = Tjlp_dao('tjlp_sef').find('9-2020')
    assert _set20['mes'].year == 2020
    assert _set20['mes'].month == 9
    assert _set20['taxa'] == 0.004092
