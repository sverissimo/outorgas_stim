from pandas import DataFrame
from utils.rename_columns import rename_columns


def filter_series(df, field_tuples_list: DataFrame) -> DataFrame:

    selected_fields = list(map(lambda t: t[0], field_tuples_list))
    base_data = df.loc[::, selected_fields]
    base_columns = list(base_data.columns)
    base_columns = list(
        filter(lambda f: f != None, map(lambda f: rename_columns(f), base_columns))
    )

    base_data.columns = base_columns

    return base_data
