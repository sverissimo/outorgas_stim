from datetime import datetime
from typing import Coroutine, List

import pandas as pd
import requests
from playwright.async_api import async_playwright

from config import env
from domain.Empresa import Empresa
from domain.Tjlp import Tjlp
from utils.parse_tjlp_bndes import parse_tjlp


class ExternalDataApi:

    def get_empresas_from_cadti(self) -> List[Empresa]:
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

    async def get_tjlp_bndes(self) -> Coroutine[any, any, List[Tjlp]]:
        async with async_playwright() as p:
            browser = await p.webkit.launch()
            page = await browser.new_page()

            print('Getting tjlp from BNDES website...')
            await page.goto(
                'https://www.bndes.gov.br/wps/portal/site/home/financiamento/guia/custos-financeiros/taxa-juros-longo-prazo-tjlp', timeout=0
            )

            print('Data from \'bndes.gov.br\' fetched, now selecting...')
            contents = await page.query_selector_all('bndes-tabela-tjlp .cotacao span')
            print('done selecting html elements.')

            data = []
            for el in contents:
                text = await el.inner_html()
                data.append(text)

            tjlp_update = parse_tjlp(data)
            """ last_entry = TjlpDao('tjlp_bndes').find_last_record()
            last_tjlp_record = last_entry[0]

            print('Last tjlp_update available: ', tjlp_update)
            print('tjlp_update: ', len(tjlp_update))
            if last_tjlp_record['_id'] == tjlp_update[len(tjlp_update) - 1]['_id']:
                print('Db already updated, skipping...')
                await browser.close()
                return None """

            print('data parsed, now sending response')
            await browser.close()
            return tjlp_update

    def get_tjlp_sef(self) -> List[Tjlp]:
        print('Getting tjlp from SEF website...')
        tjlp_uri = pd.read_html(
            "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/pagamentos-e-parcelamentos/taxa-de-juros-de-longo-prazo-tjlp",
        )
        print('Data from \'sef.gov.br\' fetched, now selecting...')
        # O tjlp_uri retorna 2 tabelas com períodos diferentes, é preciso formatar e concatenar
        tjlp = tjlp_uri[0]
        tjlp.columns = tjlp.iloc[0]
        tjlp = tjlp.iloc[1:].reset_index(drop=True)

        tjlp2 = tjlp_uri[1]
        tjlp2.columns = tjlp2.iloc[0]
        tjlp2 = tjlp2.iloc[1:].reset_index(drop=True)
        tjlp.drop(columns=["Mês/Ano"], inplace=True)

        tjlp_all = pd.concat([tjlp2, tjlp], join="outer", axis=1)

        # Formata e converte str para float
        tjlp_all.fillna("0", inplace=True)
        tjlp_all = tjlp_all.applymap(
            lambda x: x.replace("%", "").replace(",", "."))
        tjlp_all.drop(columns=["Mês/Ano"], inplace=True)
        tjlp_all = tjlp_all.apply(lambda x: x.astype(float))

        # Converte df em dict
        tjlp_dict = tjlp_all.to_dict()

        tjlp_parsed = {}
        tjlp_year = {}

        # Formata dict
        for k in tjlp_dict:
            year = int(k)
            for k1 in tjlp_dict[k].keys():
                tjlp_year[k1 + 1] = tjlp_dict[k][k1]
            tjlp_parsed[year] = tjlp_year
            tjlp_year = {}

        tjlp_sef = []

        for year, rates in tjlp_parsed.items():
            for month, rate in rates.items():
                id = f'{str(month)}-{str(year)}'
                mes = datetime(year, month, 1)
                month_rate = round(rate / 100, 6)

                tjlp_rate = {
                    '_id': id,
                    'mes': mes,
                    'taxa': month_rate
                }
                if year > 2008 and rate > 0:
                    tjlp_sef.append(tjlp_rate)

        return tjlp_sef

    def get_auth_from_cadti(self, user, secret) -> str:
        CADTI_HOST = env.CADTI_HOST
        proxies = {
            "http": None,
            "https": None,
        }

        user = {'email': user, 'password': secret}
        rToken = requests.post(
            f'{CADTI_HOST}/auth/login',
            proxies=proxies,
            data=user
        )
        return rToken
