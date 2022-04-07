fields = [
    ("Nº contrato", "numero"),
    ("Edital", "edital"),
    ("Cód. Empresa", "codigo_empresa"),
    ("Nome Empresa", "razao_social"),
    ("CNPJ", "cnpj"),
    # ('Nº Linha', ''),
    # ('Nº Grupo', ''),
    ("Linha(s)", "linhas_id"),
    ("Valor do contrato", "valor_outorga"),
    ("N° parcelas", "n_parcelas"),
    ("Data da assinatura", "data_assinatura"),
]


def rename_fields(field: str):

    for field_tuple in fields:
        if field in field_tuple:
            field = field_tuple[1]
            return field
