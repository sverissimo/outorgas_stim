# These routes are meant for creating /backing up data from th DB from original sources
import subprocess
from flask import jsonify, make_response
from __main__ import app
from data_access_layer.Mongo_dao import Mongo_dao
from services.insert_payments_service import insert_payments_service
from data_access_layer.get_contracts_from_sheet import get_contracts_from_sheet
from services.get_tjlp import get_tjlp

entity_manager = Mongo_dao()


@app.route('/create_contracts')
def create_contracts(create):

    if create == 'create':
        contracts = get_contracts_from_sheet(None)
        entity_manager.create_contracts(contracts)
        return f'{len(contracts)} Spreadsheets of contracts parsed and added to MongoDB.'

    contracts = entity_manager.get_contracts()
    return jsonify(contracts)


@app.route('/add_payments')
def insert_payments():
    contracts = entity_manager.get_contracts()
    all_payments = insert_payments_service(contracts, insert=True)

    return jsonify(all_payments)
    #sample = contracts[0:2]
    #all_payments = insert_payments_service(sample, insert=True)


@app.route('/create_tjlp_sef')
async def tjlp_sef():
    response = get_tjlp(source='sef', update_only=False)
    return jsonify(response)


@app.route('/create_tjlp_bndes')
@app.route('/create_tjlp_bndes/<update>')
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
