from typing import List
from domain.Empresa import Empresa


def add_codigo_empresa(empresas: List[Empresa], list_to_update: list):
    for el in list_to_update:
        empresa = list(
            filter(lambda x: parse(x['razao_social'])
                   == parse(el['razao_social']), empresas)
        )
        el['codigo_empresa'] = empresa[0]['codigo_empresa'] if len(
            empresa) else None
        if not len(empresa):
            print('empresa: ', parse(el['razao_social']))

    return list_to_update


def parse(razao_social: str):

    result = razao_social \
        .upper() \
        .replace('  ', ' ') \
        .replace('TRANSUR-TRANSP.ROD.MANSUR', 'TRANSUR-TRANSPORTE RODOVIARIO MANSUR') \
        .replace('EMPRESA DE TRANSPORTE COUTINHO', 'PAULO EDILBERTO COUTINHO PARTICIPACOES LTDA.') \
        .replace(' - ', ' ') \
        .replace('-', ' ') \
        .replace('. ', '.') \
        .replace(' LTDA.', '') \
        .replace(' LTDA', '') \
        .replace(' LIMITADA', '') \
        .replace(' S.A.', '') \
        .replace(' SA.', '') \
        .replace(' S/A.', '') \
        .replace(' S/A', '') \
        .replace('Z SA', 'Z') \
        .replace(' EPP', '') \
        .replace('EPP', '') \
        .replace(',', '') \
        .replace('&', 'E') \
        .replace('É', 'E') \
        .replace('Ê', 'E') \
        .replace('Ç', 'C') \
        .replace('Õ', 'O') \
        .replace('Ã', 'A') \
        .replace('Á', 'A') \
        .replace('TRANSP.T', 'TRANSPORTE E T') \
        .replace('TRANSP. ', 'TRANSPORTE') \
        .replace('TRANSP.', 'TRANSPORTE') \
        .replace('TRANSPORTES', 'TRANSPORTE') \
        .replace('TRANSPORTE T', 'TRANSPORTE E T') \
        .replace('TRANSPORTE DE ', 'TRANSPORTE ') \
        .replace('EMPRESA DE ', 'EMPRESA ') \
        .replace('EMP.', 'EMPRESA ') \
        .replace('V MARLI EIRELI', 'VIACAO MARLI') \
        .replace('SANTA FE', 'SANTAFE') \
        .replace('NOSSA SENHORA APARECIDA', 'N.S.APARECIDA') \
        .replace('(MOBI TRANSPORTE URBANO LTDA)', '') \
        .replace('VIACAO NOVO HORIZONTE', 'TRANSPORTE COLETIVO NOVO HORIZONTE MG') \
        .replace('  ', ' ')

    l = result.split('(')
    result = l[0] if len(l) else result
    result = result.strip()
    return result
