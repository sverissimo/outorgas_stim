from flask import jsonify, make_response
from __main__ import app
from data_access_layer.TjlpDao import TjlpDao
from data_access_layer.ContractDao import ContractDao
from data_access_layer.ExternalDataApi import ExternalDataApi
from services.TjlpService import TjlpService
import admin_routes


@app.route('/')
def home():
    resp_test = 'API de gestão de outorgas do transporte intermunicipal. Ver endpoints em docs...'
    resp = make_response(resp_test, 200)
    return resp


@app.route('/get_contracts')
def get_contracts():
    entity_manager = ContractDao()
    contracts = entity_manager.list()
    return jsonify(contracts)


@app.route('/get_contracts_and_payments')
def get_contracts_and_payments():
    entity_manager = ContractDao()
    contracts = entity_manager.list(get_payments=True)
    return jsonify(contracts)


@app.route('/get_contract/<numero_contrato>')
def get_contract(numero_contrato):
    numero_contrato = numero_contrato.replace('-', '/')
    entity_manager = ContractDao()
    contract = entity_manager.find(numero_contrato)
    return jsonify(contract)


@app.route('/tjlp/<source>')
def get_tjlp(source):
    entity_manager = TjlpDao(f'tjlp_{source}')
    response = entity_manager.list()
    return jsonify(response)


@app.route('/tjlp/update-<source>')
def update_tjlp(source):
    updates = None
    tjlp_service = TjlpService(source)

    updates = tjlp_service.get_tjlp()
    if updates:
        result = tjlp_service.insert_tjlp_to_db(updates)
        return jsonify(result)
