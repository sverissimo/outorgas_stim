def format_tjlp_dict(tjlp_dict: dict):
    tjlp_parsed = {}
    tjlp_year = {}
    for k in tjlp_dict:
        year = int(k)
        for k1 in tjlp_dict[k].keys():
            tjlp_year[k1 + 1] = tjlp_dict[k][k1]
        tjlp_parsed[year] = tjlp_year
        tjlp_year = {}
    return tjlp_parsed
