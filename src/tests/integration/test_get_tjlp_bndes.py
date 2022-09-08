from services.Tjlp_service import Tjlp_service
import pytest


@pytest.mark.asyncio
async def test_get_tjlp_bndes():
    tjlp_bndes_service = Tjlp_service(source='bndes')
    print('***************starting*****************')
    tjlp_bndes = await tjlp_bndes_service.get_tjlp()
    print('***************TESTING tjlp_bndes*******************')
    if tjlp_bndes:
        print('tjlp_bndes_GET: \n(Showing the last 10 results...)\n',
              tjlp_bndes[-4:-1])
    else:
        print(f'{tjlp_bndes}: DB already up to date.')
