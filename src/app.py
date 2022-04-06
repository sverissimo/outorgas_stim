import re
import pandas as pd
from linha_parser import linha_parser


def app():
    historico_all_data = pd.read_excel(
        "../data/SICAR_18_03_2022.xlsx", sheet_name="Info Historico"
    )

    historico = historico_all_data.loc[:, ["GUIA CORRIGIDA", "HISTÓRICO"]]
    historico["HISTÓRICO"] = historico["HISTÓRICO"].str.lower()
    single = historico.loc[
        (historico["HISTÓRICO"].str.contains("linha |linha:") == True)
        & (historico["HISTÓRICO"].str.contains("linhas") == False)
    ].reset_index(drop=True)

    pattern = re.compile(r"\d{4}")
    patter_match = single["HISTÓRICO"].str.findall("4301")
    print("patter_match: ", patter_match)


if __name__ == "__main__":
    app()
