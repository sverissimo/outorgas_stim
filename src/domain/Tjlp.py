from utils.year_to_month_rate import year_to_month_rate


class Tjlp():

    mes = None
    taxa = None

    def year_to_month_rate(self, year_rate):

        year_rate = str(year_rate)
        year_rate = year_rate.replace('%', '').replace(',', '.')
        year_rate = float(year_rate)/100

        month_rate = year_to_month_rate(year_rate)

        return month_rate
