from utils.year_to_month_rate import year_to_month_rate
from datetime import date, timedelta
import re


def tjlp_bndes_to_dict(tjlp_list):
    parsed_tjlp = []
    for idx, _ in enumerate(tjlp_list):
        if idx % 2 == 0 and idx <= len(tjlp_list):
            taxa = year_to_month_rate(tjlp_list[idx+1])
            parsed_tjlp.append(
                {'mes': tjlp_list[idx], 'taxa': taxa})
    return parsed_tjlp


def tjlp_bndes_format_dates(parsed_tjlp):
    month_rate_tjlp = []
    months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun',
              'jul', 'ago', 'set', 'out', 'nov', 'dez']

    for el in parsed_tjlp:
        trimestre = el['mes'].strip()
        search = re.search(r'^\D{3}/\d{4}', trimestre)
        if search:
            str_month = search.group()[0:3]
            year = search.group()[4:]
            month_index = months.index(str_month)+1

            if int(year) > 2008:
                tjlp_date = date(int(year), int(month_index), 1)
                tjlp_2nd_month = tjlp_date.replace(day=28) + timedelta(5)
                tjlp_3rd_month = tjlp_2nd_month.replace(day=28) + timedelta(5)

                trimestre = [
                    {'mes': tjlp_3rd_month, 'taxa': el['taxa']},
                    {'mes': tjlp_2nd_month, 'taxa': el['taxa']},
                    {'mes': tjlp_date, 'taxa': el['taxa']}
                ]

                for month_rate in trimestre:
                    month_rate_tjlp.append(month_rate)

    month_rate_tjlp.reverse()
    return month_rate_tjlp


def parse_tjlp(raw_data):
    data = str(raw_data)
    if not data:
        f = open(
            r'C:\Users\m1107819\Coding\outorgas\bndes_tjlp_scraping_data.txt', mode='r')
        data = f.read()

    clean_tjlp = data \
        .replace('<!---->', '') \
        .replace('a.a.', '') \
        .replace('[', '') \
        .replace(']', '') \
        .replace('\n', '') \
        .replace('\'', '')

    search = re.sub(r'(\d{1},\d{2}%)',
                    lambda x: x.group(0).replace(',', '.'),
                    clean_tjlp)

    tjlp_list = search.split(',')
    parsed_tjlp = tjlp_bndes_to_dict(tjlp_list)

    formatted_tjlp = tjlp_bndes_format_dates(parsed_tjlp)
    return formatted_tjlp


if __name__ == '__main':
    parse_tjlp()
