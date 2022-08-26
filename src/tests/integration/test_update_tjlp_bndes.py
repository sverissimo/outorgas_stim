from services.Tjlp_service import Tjlp_service
from data_access_layer.Mongo_dao import Mongo_dao
from data_access_layer.Tjlp_dao import Tjlp_dao
from data_access_layer.get_tjlp_bndes import get_tjlp_bndes
import pytest


@pytest.mark.asyncio
async def test_update_tjlp_bndes():
    bndes_tjlp_service = Tjlp_service(source='bndes')
    print('***************starting*****************')
    tjlp_bndes = await bndes_tjlp_service.update()
    print('***************TESTING tjlp_bndes*******************')
    print('tjlp_bndes_UPDATE: ', tjlp_bndes)
    """ if tjlp_bndes:
        entity_manager = Mongo_dao()
        entity_manager.insert_tjlp_bndes(tjlp_bndes)
    assert True """
