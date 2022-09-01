import re
import pandas as pd


fields = [
    ("CONTRATO", "numero_contrato"),
    ("CONCESSIONÁRIO", "razao_social"),
    ("CNPJ", "cnpj"),
    ("EDITAL", "edital"),
    ("VALOR DA OUTORGA (R$)", "valor_outorga"),
    ("INÍCIO DA VIGÊNCIA", "data_assinatura"),
    ("PONTOS EXTREMOS", "linhas_id")
]
""" ("Nº contrato", "numero_contrato"),
("VALOR DO CONTRATO", "valor_contrato"),
("Nº Contrato", "numero_contrato"),
("Edital", "edital"),
("Cód. Empresa", "codigo_empresa"),
("Nome Empresa", "razao_social"),
("Contribuinte", "razao_social"),
("Status", "status"),
("Linha(s)", "linhas_id"),
("Valor do contrato", "valor_outorga"),
("Valor da outorga", "valor_outorga"),
("Valor Pago", "valor"),
("N° parcelas", "n_parcelas"),
("Número da Guia", "numero_guia"),
("Data da assinatura", "data_assinatura"),
("Data Vencimento", "vencimento_parcela"),
("Data Pagamento", "data_pagamento"), """


def should_drop(column):
    pattern = r"TJLP|Saldo Devedor|EM ABERTO|RECEITA|Unnamed|Nº Linha|Nº Grupo|qde|Parcelas|PROCURADOR"
    if re.search(pattern, str(column)):
        return True


def rename_columns(df: pd.DataFrame):

    df.rename(columns=dict(fields), inplace=True)

    columns = df.columns.to_list()
    for c in columns:
        if should_drop(c):
            df.drop(columns=[c], inplace=True)

    pass
