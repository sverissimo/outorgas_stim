import pandas as pd


def get_tjlp_sef() -> dict:
    tjlp_uri = pd.read_html(
        "https://www.gov.br/receitafederal/pt-br/assuntos/orientacao-tributaria/pagamentos-e-parcelamentos/taxa-de-juros-de-longo-prazo-tjlp",
    )
    # O tjlp_uri retorna 2 tabelas com períodos diferentes, é preciso formatar e concatenar
    tjlp = tjlp_uri[0]
    tjlp.columns = tjlp.iloc[0]
    tjlp = tjlp.iloc[1:].reset_index(drop=True)

    tjlp2 = tjlp_uri[1]
    tjlp2.columns = tjlp2.iloc[0]
    tjlp2 = tjlp2.iloc[1:].reset_index(drop=True)
    tjlp.drop(columns=["Mês/Ano"], inplace=True)

    tjlp_all = pd.concat([tjlp2, tjlp], join="outer", axis=1)

    # Formata e converte str para float
    tjlp_all.fillna("0", inplace=True)
    tjlp_all = tjlp_all.applymap(
        lambda x: x.replace("%", "").replace(",", "."))
    tjlp_all.drop(columns=["Mês/Ano"], inplace=True)
    tjlp_all = tjlp_all.apply(lambda x: x.astype(float))

    # Converte df em dict
    tjlp_dict = tjlp_all.to_dict()
    tjlp_parsed = {}
    tjlp_year = {}

    # Formata dict
    for k in tjlp_dict:
        year = int(k)
        for k1 in tjlp_dict[k].keys():
            tjlp_year[k1 + 1] = tjlp_dict[k][k1]
        tjlp_parsed[year] = tjlp_year
        tjlp_year = {}

    return tjlp_parsed
