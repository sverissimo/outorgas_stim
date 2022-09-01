import re
from domain.Linha import Linha


def extract_linhas_from_contracts(contracts: list):
    id_pattern = r'\d{4}'
    separator = r'e|,'
    all_linhas = []

    for c in contracts:
        linhas: str = c['linhas_id']
        multiple_lines = re.search(separator+id_pattern, linhas)

        if multiple_lines:
            linhas_list = re.split(separator+' \n', linhas)
            for l in linhas_list:
                line = get_linha_data(l, c)
                all_linhas.append(line)
        else:
            line = get_linha_data(linhas, c)
            all_linhas.append(line)

    return all_linhas
    """ for l in all_linhas:
        print(l)
    print('all_linhas: ', len(all_linhas)) """


def get_linha_data(linha: str, c: dict):
    id_pattern = r'\d{4}'
    id = re.search(id_pattern, linha)
    descricao_da_linha = re.sub(f'{id_pattern} - ', '', linha)
    descricao_da_linha = descricao_da_linha.lstrip()
    if id:
        id = int(id.group())
        try:
            return {'id': id,
                    'codigo_empresa': c['codigo_empresa'],
                    'numero_contrato': c['numero_contrato'],
                    'linha': descricao_da_linha,
                    }
        except KeyError:
            print(
                '######## WARNING ########## Código da empresa não cadastrado no SGTI / CadTI!!!', c)
    else:
        print(f'######## WARNING ########## Linha id not found for {linha}')
