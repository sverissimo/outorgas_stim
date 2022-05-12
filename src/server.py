from os.path import exists
from flask import Flask, jsonify, make_response
from lib.create_mongo_contracts import create_contracts
from services.add_payments import add_payments
from services.get_contracts_from_db import get_contracts_from_db
from services.get_contracts_from_sheet import get_contracts_from_sheet
from services.get_tjlp_bndes import get_tjlp_bndes
from services.get_tjlp_sef import get_tjlp_sef
from main import main
from dotenv import load_dotenv, find_dotenv

# load_dotenv(find_dotenv())


app = Flask(__name__)


@app.route('/')
def home():
    return 'API de gestão de outorgas do transporte intermunicipal. Ver endpoints em docs.'


@app.route('/get_contracts')
@app.route('/get_contracts/<create>')
def get_contracts(create=False):
    if create and create != 'create':
        return f'Opção inválida ({create})', 404

    contracts = get_contracts_from_sheet(None)
    if create == 'create':
        # create_contracts(contracts)
        return f'{len(contracts)} Spreadsheets of contracts parsed and added to MongoDB.'

    return jsonify(contracts)


@app.route('/add_payments')
def insert_payments():
    contracts = get_contracts_from_db()
    sample = contracts[0:2]

    full_contracts = []

    for s in sample:
        contract_with_payments = add_payments((s))
        full_contracts.append(contract_with_payments)
    #print('contracts: ', contracts)
    # return 'contracts'
    return jsonify(full_contracts)
    # add_payments()


@app.route('/tjlp_sef')
async def tjlp_sef():
    response = get_tjlp_sef()
    return jsonify(response)


@app.route('/tjlp_bndes')
@app.route('/tjlp_bndes/<update>')
async def tjlp_bndes(update=False):

    if type(update) == str and update != 'update':
        return make_response(f'{update} route not found...', 404)

    get_only_update = True if update == 'update' else False

    response = await get_tjlp_bndes(get_only_update)
    return jsonify(response)


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True, load_dotenv=True)
