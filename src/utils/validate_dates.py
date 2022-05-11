from datetime import datetime
from time import strptime
import pandas as pd
import re


def fix_invalid_dates(date: str):

    invalid_date_pattern = re.compile(r"(31/(02)?(04)?(06)?(09)?(11)?)")

    if re.search(invalid_date_pattern, date):
        date = date.replace("31", "28")

    return date


def fix_data_assinatura(date):
    if type(date) != str:
        return date

    day_month_format = r"\d{2}-\d{1,2}$"

    # Lista de conversão de valores inválidos para válidos, advindos da planilha "Contratos 14-16"
    fixes = [
        ("fev", "Feb"),
        ("abril", "Apr"),
        ("mai", "May"),
        ("2015", "15"),
        ("07/05/15", "may-15"),
        ("/", "-"),
    ]
    # Aplica conversão para resultar no formato Mon-YY
    for old, new in fixes:
        date = date.lower().replace(old, new)
        date = re.sub(day_month_format, "jul-15", date)
        date = date.capitalize()

    # Converte str em struct_time
    [year, month, day, *other] = strptime(date, "%b-%y")

    # Converte struct_time para python date obj(YYYY-MM-DD)
    parsed_date = datetime(year, month, day)

    return parsed_date
