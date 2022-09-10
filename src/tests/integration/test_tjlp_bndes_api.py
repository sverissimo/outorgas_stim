from services.TjlpService import TjlpService
import pytest

tjlp_bndes_service = TjlpService(source='bndes')


@pytest.mark.asyncio
async def test_get_tjlp_bndes():

    tjlp_bndes = await tjlp_bndes_service.get_tjlp()

    if tjlp_bndes:
        print('tjlp_bndes_GET: \n(Showing the last 10 results...)\n',
              tjlp_bndes)
        print('tjlp_bndes TOTAL RECORDS: ', len(tjlp_bndes))
    else:
        print(f'{tjlp_bndes}: DB already up to date.')


@pytest.mark.asyncio
async def test_get_updates_bndes():

    update = await tjlp_bndes_service.get_updates()

    if update:
        print('tjlp_bndes_GET: \n(Showing the last 10 results...)\n',
              update)
        print('update TOTAL RECORDS: ', len(update))
    else:
        print(f'{update}: DB already up to date.')
