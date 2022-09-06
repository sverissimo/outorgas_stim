from data_access_layer.MongoDao import MongoDao
from data_access_layer.TjlpDao import TjlpDao
from data_access_layer.get_tjlp_bndes import get_tjlp_bndes
import pytest


@pytest.mark.asyncio
async def test_get_tjlp_bndes():
    print('***************starting*****************')
    tjlp_bndes = await get_tjlp_bndes(update=False)
    print('***************TESTING tjlp_bndes*******************')
    entity_manager = MongoDao()
    entity_manager.insert_tjlp_bndes(tjlp_bndes)
    assert True


async def test_update_tjlp_bndes():
    print('***************starting*****************')
    tjlp_bndes = await get_tjlp_bndes(update=True)
    print('***************TESTING tjlp_bndes*******************')
    print('tjlp_bndes_UPDATE: ', tjlp_bndes)
    if tjlp_bndes:
        entity_manager = MongoDao()
        entity_manager.insert_tjlp_bndes(tjlp_bndes)
    assert True
