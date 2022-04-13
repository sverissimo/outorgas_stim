import re
import pandas as pd


fields = [
    ("Nº contrato", "numero"),
    ("Edital", "edital"),
    ("Cód. Empresa", "codigo_empresa"),
    ("Nome Empresa", "razao_social"),
    ("CNPJ", "cnpj"),
    ("Linha(s)", "linhas_id"),
    ("Valor do contrato", "valor_outorga"),
    ("N° parcelas", "n_parcelas"),
    ("Data da assinatura", "data_assinatura"),
]


def should_drop(column):
    pattern = r"TJLP|Saldo Devedor|EM ABERTO|RECEITA|Unnamed|Nº Linha|Nº Grupo|qde|Parcelas|PROCURADOR"
    if re.search(pattern, str(column)):
        return True


def rename_columns(df: pd.DataFrame):

    df.rename(columns=dict(fields), inplace=True)
    df["data_assinatura"] = df["data_assinatura"].astype(str)
    columns = df.columns.to_list()
    invalid_date_pattern = re.compile(r"(31/(02)?(04)?(06)?(09)?(11)?)")

    for c in columns:
        if should_drop(c):
            df.drop(columns=[c], inplace=True)

        if re.search(
            r"vencimento (\d{1,2}| ?Parcela)+",
            c,
            re.IGNORECASE,
        ):
            a = re.search(invalid_date_pattern, str(df[c]))
            if not a:
                df[c] = pd.to_datetime(df[c], infer_datetime_format=True)
    pass
