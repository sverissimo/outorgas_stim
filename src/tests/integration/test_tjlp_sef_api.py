import pytest
from services.TjlpService import TjlpService

tjlp_sef_service = TjlpService(source='sef')


@pytest.mark.asyncio
async def test_get_tjlp_sef():

    tjlp_sef = await tjlp_sef_service.get_tjlp()

    if tjlp_sef:
        print('tjlp_sef_GET: \n\n', tjlp_sef)
        print('tjlp_sef TOTAL RECORDS: ', len(tjlp_sef))
    else:
        print(f'{tjlp_sef}: DB already up to date.')


@pytest.mark.asyncio
async def test_get_updates_sef():

    updates = await tjlp_sef_service.get_updates()

    if updates:
        print('tjlp_sef_GET: \n\n', updates)
        print('updates TOTAL RECORDS: ', len(updates))
    else:
        print(f'{updates}: DB already up to date.')
