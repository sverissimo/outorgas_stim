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


def auto_rename(column):
    pass


def should_drop(column):
    pattern = r"TJLP|Saldo Devedor|EM ABERTO|RECEITA|Unnamed|Nº Linha|Nº Grupo|qde|Parcelas|PROCURADOR"
    if re.search(pattern, column):
        return True


def rename_columns(df: pd.DataFrame):

    old_columns = df.columns.to_list()

    for c in old_columns:
        for field_tuple in fields:
            if c in field_tuple:
                df.rename(columns={c: field_tuple[1]}, inplace=True)
        if should_drop(c):
            df.drop(columns=[c], inplace=True)
        if re.search(
            r"vencimento (\d{1,2}| ?Parcela)+",
            c,
            re.IGNORECASE,
        ):
            df[c] = pd.to_datetime(df[c])
        if re.search(r"Data da assinatura", c):
            df["data_assinatura"] = df["data_assinatura"].astype(str)


pass
