import pandas as pd


def get_tjlp() -> dict:
    tjlp_uri = pd.read_html(
        "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/pagamentos-e-parcelamentos/taxa-de-juros-de-longo-prazo-tjlp",
    )
    tjlp = tjlp_uri[0]
    tjlp.columns = tjlp.iloc[0]
    tjlp = tjlp.iloc[1:].reset_index(drop=True)

    tjlp2 = tjlp_uri[1]
    tjlp2.columns = tjlp2.iloc[0]
    tjlp2 = tjlp2.iloc[1:].reset_index(drop=True)
    tjlp.drop(columns=["Mês/Ano"], inplace=True)

    tjlp_all = pd.concat([tjlp2, tjlp], join="outer", axis=1)

    tjlp_dict = tjlp_all.to_dict()
    tjlp_parsed = {}
    tjlp_year = {}

    for k in tjlp_dict:
        for k1 in tjlp_dict[k].keys():
            tjlp_year[k1 + 1] = tjlp_dict[k][k1]
        tjlp_parsed[k] = tjlp_year
        tjlp_year = {}

    return tjlp_parsed
