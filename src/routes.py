import sys
from config import env
sys.path.append(env.APP_FOLDER)  # nopep8

from flask import jsonify, make_response
from __main__ import app
from data_access_layer.TjlpDao import TjlpDao
from data_access_layer.EntityDao import EntityDao
from database.migrations.run_migrations import run_tjlp_migrations
from services.ContractService import ContractService

contract_service = ContractService()


@app.route('/')
def home():
    resp_test = 'API de gestão de outorgas do transporte intermunicipal. Ver endpoints em docs...'
    resp = make_response(resp_test, 200)
    return resp


@app.route('/get_contracts')
def get_contracts():
    contracts = contract_service.list()
    return jsonify(contracts)


@app.route('/get_contracts_and_payments')
def get_contracts_and_payments():
    contracts = contract_service.list(get_payments=True)
    return jsonify(contracts)


@app.route('/missing_payments')
def get_missing_payments():
    missing_payments = EntityDao('missing_payments').list()
    return jsonify(missing_payments)


@app.route('/get_contract/<numero_contrato>')
def get_contract(numero_contrato):
    numero_contrato = numero_contrato.replace('-', '/')
    contract = contract_service.find(numero_contrato)
    return jsonify(contract)


@app.route('/tjlp/<source>')
def get_tjlp(source):
    entity_manager = TjlpDao(f'tjlp_{source}')
    response = entity_manager.list()
    return jsonify(response)


@app.route('/update-tjlp-rates')
async def update_tjlp():
    try:
        await run_tjlp_migrations()
        print('Updated tjlp alright.')
        return 'Updated tjlp alright.'
    except Exception as e:
        print(e)
        return f'Error: {e}'
