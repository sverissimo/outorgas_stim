def year_to_month_rate(year_rate: str or float):
    if type(year_rate) == str:
        year_rate = year_rate.replace('%', '').replace(',', '.')
        year_rate = float(year_rate)/100

    month_rate = (1 + year_rate) ** (1/12) - 1
    month_rate = round(month_rate, 6)
    print('month_rate: ', month_rate)
    return month_rate
