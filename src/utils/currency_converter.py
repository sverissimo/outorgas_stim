import locale


def to_real(value):
    formatted_value = locale.currency(value, symbol=True, grouping=True)
    return formatted_value


def to_decimal(value):
    value = float(value.strip("R$").replace(".", "").replace(",", "."))
    return value
