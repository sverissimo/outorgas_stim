from services.Tjlp_service import Tjlp_service
import pytest


@pytest.mark.asyncio
async def test_update_tjlp_bndes():
    tjlp_bndes_service = Tjlp_service(source='bndes')
    print('***************starting*****************')
    tjlp_bndes = await tjlp_bndes_service.update()
    print('***************TESTING tjlp_bndes*******************')
    print('tjlp_bndes_UPDATE: ', tjlp_bndes)
    """ if tjlp_bndes:
        entity_manager = MongoDao()
        entity_manager.insert_tjlp_bndes(tjlp_bndes)
    assert True """
