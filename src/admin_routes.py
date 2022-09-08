# These routes are meant for creating /backing up data from th DB from original sources
import subprocess
from flask import jsonify, make_response
from __main__ import app
from data_access_layer.MongoDao import MongoDao
from services.insert_payments_service import insert_payments_service
from services.get_tjlp import get_tjlp
from services.Tjlp_service import Tjlp_service

entity_manager = MongoDao()


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
async def tjlp_bndes():

    tjlp_service = Tjlp_service('bndes')
    response = await tjlp_service.get_tjlp()
    return jsonify(response)


@app.route('/update_tjlp_bndes')
async def update_tjlp_bndes():
    tjlp_service = Tjlp_service('bndes')
    update = await tjlp_service.update()
    if update:
        return jsonify(update)
    else:
        return f'{update} need for update.'


@app.route('/backup_db/<drop>')
def backup_db(drop=False):
    if drop:
        subprocess.call

    subprocess.call(['mongodump', '--db', 'outorgas' '.'])
    print('Db backup created.')

    pass
