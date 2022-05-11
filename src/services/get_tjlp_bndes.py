#from utils.format_tjlp_dict import format_tjlp_dict
from playwright.async_api import async_playwright
import asyncio
""" import requests
from bs4 import BeautifulSoup """
import pandas as pd


async def get_tjlp_bndes():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        """  page.goto(
            "https://www.bndes.gov.br/wps/portal/site/home/financiamento/guia/custos-financeiros/taxa-juros-longo-prazo-tjlp", timeout=0) """

        print('launched browser.')
        await page.goto(
            'https://www.bndes.gov.br/wps/portal/site/home/financiamento/guia/custos-financeiros/taxa-juros-longo-prazo-tjlp', timeout=0)
        print('url fetched, now selecting...')
        contents = await page.query_selector_all('bndes-tabela-tjlp .cotacao span')
        print('done loading')
        data = []
        for el in contents:
            text = await el.inner_html()
            data.append(text)
        # print(data)

        await browser.close()

        with open('bndes_tjlp_scraping_data.txt', mode='w') as f:
            f.write(str(data))

    pass


if __name__ == "__main__":

    asyncio.run(get_tjlp_bndes())
