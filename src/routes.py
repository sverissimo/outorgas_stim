from flask import jsonify, make_response
from __main__ import app
from data_access_layer.Tjlp_dao import Tjlp_dao
from data_access_layer.Contract_dao import Contract_dao
import admin_routes


@app.route('/')
def home():
    resp_test = 'API de gestão de outorgas do transporte intermunicipal. Ver endpoints em docs...'
    resp = make_response(resp_test, 200)
    return resp


@app.route('/get_contracts')
def get_contracts():
    entity_manager = Contract_dao()
    contracts = entity_manager.list()
    return jsonify(contracts)


@app.route('/get_contract/<numero_contrato>')
def get_contract(numero_contrato):
    numero_contrato = numero_contrato.replace('-', '/')
    entity_manager = Contract_dao()
    contract = entity_manager.find(numero_contrato)
    return jsonify(contract)


@app.route('/tjlp/<source>')
def get_tjlp(source):
    entity_manager = Tjlp_dao(f'tjlp_{source}')
    response = entity_manager.list()
    return jsonify(response)
