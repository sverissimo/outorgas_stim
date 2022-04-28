from services.get_contracts_from_db import get_contracts

contracts_to_test = [
    ("24/2014", 56, 589.40),
    ("13/2015", 2, 3290.86),
    ("34/2015", 4, 2288.78),
    ("43/2015", 5, 5520.88),
    ("71/2015", -1, 8305.23),
]


def get_payment(n_contrato: str, idx: int):

    contracts = get_contracts({"numero_contrato": n_contrato})
    assert type(contracts) == list
    assert len(contracts) > 0

    return contracts[0]["pagamentos"][idx]["valor"]


def test_db_data():

    # [n_contrato, parcela, value] = contracts_to_test[0]

    for [n_contrato, parcela, value] in contracts_to_test:
        assert get_payment(n_contrato, parcela) == value
        print(
            "\n",
            f"Parcela nº {parcela} do contrato {n_contrato} should be {value}: ",
            "\b",
            get_payment(n_contrato, parcela),
        )


""" 
def get_pg_by_month(month, payments):
    month_payment = list(
        filter(lambda x: x["data_pagamento"].find(month) != -1, payments)
    )[0]
    return month_payment
 
may_payment = get_pg_by_month("2015-05", payments)
print("may_payment: ", may_payment)
assert may_payment["valor"] == 543.77
 """
