from os.path import exists
from flask import Flask, jsonify
from services.get_tjlp_bndes import get_tjlp_bndes
from utils.parse_tjlp_bndes import parse_tjlp
from dotenv import load_dotenv, find_dotenv

# load_dotenv(find_dotenv())


app = Flask(__name__)


@app.route('/')
def home():
    return 'whatever, man'


@app.route('/bndes_tjlp')
async def bndes_tjlp():

    if not exists('bndes_tjlp_scraping_data.txt'):
        await get_tjlp_bndes()

    bndes_tjlp = parse_tjlp()
    return jsonify(bndes_tjlp)
    """ print('datas: ', datas)
    return jsonify(datas) """


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True, load_dotenv=True)
