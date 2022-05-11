import pandas as pd


def get_tjlp_bndes():

    tjlp_bndes: pd.DataFrame = pd.read_excel("../../data/TJLP_mar_2022.xlsx")
    tjlp_bndes.columns = tjlp_bndes.iloc[0]
    tjlp_bndes = tjlp_bndes.iloc[1:].reset_index(drop=True)
    tjlp_bndes = tjlp_bndes.iloc[:, [0, 1, 4]]

    print(tjlp_bndes.iloc[70:90, :])

    pass


if __name__ == "__main__":
    get_tjlp_bndes()
