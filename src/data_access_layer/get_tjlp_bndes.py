
from playwright.async_api import async_playwright
import asyncio
from utils.parse_tjlp_bndes import parse_tjlp
from data_access_layer.TjlpDao import TjlpDao


async def get_tjlp_bndes(update: bool or None):
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

        #log_file_name = 'bndes_tjlp_scraping_data.txt'
        if update:
            contents = contents[0:2]
            #log_file_name = "bndes_tjlp_update.txt"

        data = []
        for el in contents:
            text = await el.inner_html()
            data.append(text)

        tjlp_update = parse_tjlp(data)
        last_entry = TjlpDao('tjlp_bndes').find_last_record()
        last_tjlp_record = last_entry[0]

        print('Last tjlp_update available: ', tjlp_update)

        if last_tjlp_record['_id'] == tjlp_update[len(tjlp_update) - 1]['_id']:
            print('Db already updated, skipping...')
            await browser.close()
            return None

        print('data parsed, now sending response')

        await browser.close()

        return tjlp_update

        """ with open(log_file_name, mode='w') as f:
            f.write(str(tjlp_update)) """

if __name__ == "__main__":

    asyncio.run(get_tjlp_bndes())
