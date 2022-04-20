from datetime import date
import json
import re
import sys
from time import strptime

from pandas import date_range


def get_payment_date(pg) -> date:

    pattern = r"(PG(TO)? )(\d{2})\W(\d{1,2})"

    s = pg["status"]
    payment_date = re.search(pattern, s, re.IGNORECASE)
    if payment_date:
        day = int(payment_date.group(3))
        month = int(payment_date.group(4))
        fixed_date = date(2000, month, day)

        return fixed_date
    """ status = open(f"{sys.path[0]}" + "\\..\\unpaid_status.txt", "r")
    for s in status: """


def fix_delayed_payments(contract: dict):

    for pg in contract["pagamentos"]:

        if (
            str(pg["status"]).find("PAGO") == -1
            and str(pg["status"]).find("EM ABERTO") == -1
        ):
            year = date.fromisoformat(pg["vencimento"])

            payment_date = get_payment_date(pg)
            payment_date = payment_date.replace(year=2015)
            print("payment_date: ", payment_date)

    return


if __name__ == "__main__":
    fix_delayed_payments()
