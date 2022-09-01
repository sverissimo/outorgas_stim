import pandas as pd

"""
Consolida em uma única planilha as planilhas oriundas do SICAR (vêm divididas por padrão)
"""


def merge_sicar_spreadsheets():
    guias_part1 = pd.read_excel(
        "../../data/guias_2011-2015_20_04_22.xls",
        sheet_name="Guias de Arrecadação",
        index_col=False,
    )
    guias_part2 = pd.read_excel(
        "../../data/guias_2015-2022_20_04_22.xls",
        sheet_name="Guias de Arrecadação",
        index_col=False,
    )

    guias = pd.concat([guias_part1, guias_part2])

    guias.dropna(how="all", axis=1, inplace=True)
    columns_to_drop = [
        "Tipo Receita",
        "Mês/Ano TGO/CGO",
        "Delegatário",
        "Unidade Executora",
    ]
    guias.drop(columns=columns_to_drop, inplace=True)

    guias["Linha"].fillna("0", inplace=True)
    guias["Linha"].astype(str)

    guias.to_excel("../../data/all_guias.xlsx", index=False)


if __name__ == "__main__":
    merge_sicar_spreadsheets()
