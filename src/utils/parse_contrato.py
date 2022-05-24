from pandas import DataFrame
from utils.format_cnpj import format_cnpj
from utils.linha_parser import linha_parser
from utils.validate_dates import fix_data_assinatura


def parse_contrato(contrato_df: DataFrame) -> DataFrame:

    contrato_df["linhas_id"] = contrato_df["linhas_id"].apply(
        lambda row: linha_parser(row)
    )

    contrato_df["codigo_empresa"] = contrato_df["codigo_empresa"].apply(
        lambda row: int(row)
    )

    contrato_df["n_parcelas"] = contrato_df["n_parcelas"].apply(
        lambda row: int(row))

    contrato_df["cnpj"] = contrato_df["cnpj"].apply(
        lambda row: format_cnpj(str(row)))

    contrato_df["data_assinatura"] = contrato_df["data_assinatura"].apply(
        lambda row: fix_data_assinatura(row)
    )

    # return contrato_df
