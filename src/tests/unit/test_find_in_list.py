import json
import os


def test_find_in_list():
    path_to_file = os.path.join(os.getcwd(), 'bndes_tjlp_update.txt')
    with open(path_to_file, mode='r')as f:
        a = f.read()
        data = json.loads(a)
        match = [id for id in data if id['_id'] == '12-2022']
        print('match: ', match)
