def parse_df(df):
    df.dropna(how="all", inplace=True)
    df.reset_index(drop=True, inplace=True)
    return df
