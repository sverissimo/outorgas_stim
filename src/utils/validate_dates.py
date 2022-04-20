import re


def fix_invalid_dates(date: str):

    invalid_date_pattern = re.compile(r"(31/(02)?(04)?(06)?(09)?(11)?)")

    if re.search(invalid_date_pattern, date):
        date = date.replace("31", "28")

    return date
