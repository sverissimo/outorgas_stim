import json
from os.path import exists
import subprocess
from flask import Flask, jsonify, make_response
from data_access_layer.Mongo_dao import Mongo_dao
from data_access_layer.get_sicar_payments import get_payments
from data_access_layer.get_contracts_from_sheet import get_contracts_from_sheet
from services.get_tjlp import get_tjlp


app = Flask(__name__)
entity_manager = Mongo_dao()


@app.route('/')
def home():
    return 'API de gestão de outorgas do transporte intermunicipal. Ver endpoints em docs.'


@app.route('/get_contracts')
@app.route('/get_contracts/<create>')
def get_contracts(create=False):
    if create and create != 'create':
        return f'Opção inválida ({create})', 404

    if create == 'create':
        contracts = get_contracts_from_sheet(None)
        return jsonify(contracts)
        entity_manager.create_contracts(contracts)
        return f'{len(contracts)} Spreadsheets of contracts parsed and added to MongoDB.'

    contracts = entity_manager.get_contracts()

    return jsonify(contracts)


@app.route('/add_payments')
def insert_payments():
    contracts = entity_manager.get_contracts()
    sample = contracts[0:2]

    full_contracts = []

    for contract in sample:

        #payments = entity_manager.insert_payments((contract))
        payments = get_payments(contract)

        contract['pagamentos'] = payments
        full_contracts.append(contract)

    #print('contracts: ', contracts)
    return jsonify(full_contracts)


@app.route('/tjlp_sef')
async def tjlp_sef():
    response = get_tjlp(source='sef', update_only=False)
    return jsonify(response)


@app.route('/tjlp_bndes')
@app.route('/tjlp_bndes/<update>')
async def tjlp_bndes(update=False):

    if type(update) == str and update != 'update':
        return make_response(f'{update} route not found...', 404)

    get_only_update = True if update == 'update' else False

    response = await get_tjlp(source='bndes', update_only=get_only_update)
    return jsonify(response)


@app.route('/backup_db/<drop>')
def backup_db(drop=False):
    if drop:
        subprocess.call

    subprocess.call(['mongodump', '--db', 'outorgas' '.'])
    print('Db backup created.')

    pass


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True, load_dotenv=True)
