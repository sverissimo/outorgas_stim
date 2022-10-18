from data_access_layer.SicarDao import SicarDao


def test_sicar_merge_spreadsheets():
    sicar_dao = SicarDao()
    file_names = ['GUIAS DE ARRECADAÇÃO RECEITA 360.xls',
                  'GUIAS ARRECADAÇÃO RECEITA 190.xls', 'relatorio_Guia_Arrecadacao_05out22.xls', ]
    sicar_dao.merge_sicar_spreadsheets(file_names)
    return
