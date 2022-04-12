from pandas import DataFrame
from utils.currency_converter import to_real
from utils.format_cnpj import format_cnpj
from utils.linha_parser import linha_parser


def parse_contrato(contrato_df: DataFrame) -> DataFrame:

    contrato_df["linhas_id"] = contrato_df["linhas_id"].apply(
        lambda row: linha_parser(row)
    )

    contrato_df["valor_outorga"] = contrato_df["valor_outorga"].apply(
        lambda row: to_real(row)
    )

    contrato_df["codigo_empresa"] = contrato_df["codigo_empresa"].apply(
        lambda row: int(row)
    )

    contrato_df["n_parcelas"] = contrato_df["n_parcelas"].apply(lambda row: int(row))

    contrato_df["cnpj"] = contrato_df["cnpj"].apply(lambda row: format_cnpj(str(row)))
    contrato_df["data_assinatura"] = contrato_df["data_assinatura"].apply(
        lambda row: print(row)
    )

    return contrato_df
