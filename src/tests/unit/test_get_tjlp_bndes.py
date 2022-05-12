from services.get_tjlp_bndes import get_tjlp_bndes
import pytest


@pytest.mark.asyncio
async def test_get_tjlp_bndes():
    print('***************starting*****************')
    el = await get_tjlp_bndes(True)
    print('***************TESTING el*******************: ', el)
    assert True
