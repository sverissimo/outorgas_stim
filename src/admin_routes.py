""" # These routes are meant for creating /backing up data from th DB from original sources
import subprocess
from flask import jsonify, make_response
from __main__ import app
from data_access_layer.ContractDao import ContractDao
from services.insert_payments_service import insert_payments_service

contract_dao = ContractDao()


@app.route('/add_payments')
def insert_payments():
    contracts = contract_dao.list()
    all_payments = insert_payments_service(contracts, insert=True)

    return jsonify(all_payments)


@app.route('/backup_db/<drop>')
def backup_db(drop=False):
    if drop:
        subprocess.call

    subprocess.call(['mongodump', '--db', 'outorgas' '.'])
    print('Db backup created.')

    pass

 """
