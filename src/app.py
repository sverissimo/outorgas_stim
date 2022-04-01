import pandas as pd

tjlp_all_data = pd.read_excel("../data/TJLP_mar_2022.xlsx", skiprows=1)
historico_all_data = pd.read_excel(
    "../data/SICAR_18_03_2022.xlsx", sheet_name="Info Historico"
)
""" unificado_all_data = pd.read_excel(
    "../data/SICAR_18_03_2022.xlsx", sheet_name="Unificado"
) """

historico = historico_all_data.loc[:, ["GUIA CORRIGIDA", "HISTÓRICO"]]
historico["HISTÓRICO"] = historico["HISTÓRICO"].str.lower()

single = historico.loc[
    (historico["HISTÓRICO"].str.contains("linha |linha:") == True)
    & (historico["HISTÓRICO"].str.contains("linhas") == False)
]
single_4301 = historico.loc[historico.HISTÓRICO.str.contains(" 4301|l4301") == True]
# print("single: ", len(single), single[0:5])
single_4301.to_excel("../tst/single.xlsx")

multiple_lines = historico.loc[
    (historico["HISTÓRICO"].str.contains("linhas") == True)
    & (historico["HISTÓRICO"].str.contains("linha:|linha ") == False)
]
print("multiple_lines: ", len(multiple_lines))

sem_linha = historico.loc[historico["HISTÓRICO"].str.contains("linha") == False]
print("sem_linha: ", len(sem_linha))


incomplete_info = historico.loc[
    (historico["HISTÓRICO"].str.len() > 256) & (historico["HISTÓRICO"].str.len() < 300)
]

print("incomplete_info: ", len(incomplete_info))
incomplete_info.to_excel("../tst/incomplete_info_256_to_300.xlsx")

# historico2.to_excel("./sem_linha.xlsx")
# a = f"14ª parcela (parcelamento até out/14) contratos 467 ao 504: r$40991,92 ;  r$953,56 ;  r$2419,5 ;  r$10750,31 ;  r$7677,55 ;  r$36366,16 ;  r$35215,64 ;  r$28954,21 ;  r$6187,13 ;  r$27044,03 ;  r$14607,09 ;  r$8123,96 ;  r$10373,88 ;  r$9474,97 ;  r$2448,06 ;  r$36229,21 ;  r$18939,62 ;  r$29003,98 ;  r$31426,86 ;  r$"
# print(len(a))
# print(len(historico))

# historico["GUIA CORRIGIDA"] = historico["GUIA CORRIGIDA"].str.replace("000", "")
# json_data = data_2022.to_json(orient="records")
