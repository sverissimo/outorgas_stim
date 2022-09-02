import requests
from config import env
from domain.Empresa import Empresa


def get_empresas_from_cadti() -> list[Empresa]:
    AUTH_CADTI = env.AUTH_CADTI
    CADTI_HOST = env.CADTI_HOST
    HEADERS = {"authorization": AUTH_CADTI}
    proxies = {
        "http": None,
        "https": None,
    }
    empresas = requests.get(
        f'{CADTI_HOST}/api/empresas', headers=HEADERS, proxies=proxies)
    return empresas.json()
