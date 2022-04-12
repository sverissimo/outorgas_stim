from pandas import DataFrame
from utils.filter_series import filter_series
from utils.parse_contrato import parse_contrato
from utils.parse_df import parse_df
from utils.rename_columns import fields as field_tuples_list


def get_contrato_df(df: DataFrame) -> DataFrame:
    filtered_df = filter_series(df, field_tuples_list)
    af = parse_df(filtered_df)
    parsed_contrato_df = parse_contrato(af)

    return parsed_contrato_df
