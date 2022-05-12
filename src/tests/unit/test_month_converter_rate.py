from utils.year_to_month_rate import year_to_month_rate
from domain.Tjlp import Tjlp


def test_year_to_month_rate():

    year_rate = 0.06
    month_rate = year_to_month_rate(year_rate)
    month_rate = round(month_rate, 6)
    print(f'a 6% year rate should be: {month_rate*100}% monthly')
    assert month_rate == 0.004868

    # Testando método da classe Tjlp
    tjlp = Tjlp()
    yr2 = '6,00%'
    mr2 = year_to_month_rate(yr2)
    mr2 = round(mr2, 6)
    print(f'a 6% year rate should be: {mr2*100}% monthly')
    assert mr2 == 0.004868
