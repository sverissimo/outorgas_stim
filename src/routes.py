import sys

from config import env

sys.path.append(env.APP_FOLDER)  # nopep8

from __main__ import app
from flask import jsonify, make_response, request, session

from data_access_layer.EntityDao import EntityDao
from data_access_layer.TjlpDao import TjlpDao
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


@app.route('/pagamentos')
@app.route('/pagamentos/<codigo_empresa>')
def get_pagamentos_empresas(codigo_empresa=''):
    if codigo_empresa != '':
        pagamentos_dao = EntityDao('pagamentos')
        pagamentos_dao.search_key = 'codigo_empresa'
        pagamentos_empresas = pagamentos_dao.find(int(codigo_empresa))
        return jsonify(pagamentos_empresas)
    else:
        pagamentos_empresas = EntityDao('pagamentos').list()
        return jsonify(pagamentos_empresas)


@app.route('/debitos')
@app.route('/debitos/<codigo_empresa>')
def get_debitos_empresas(codigo_empresa=''):
    if codigo_empresa != '':
        debitos_empresas = EntityDao('debitos')
        debitos_empresas.search_key = 'codigo_empresa'
        res = debitos_empresas.find(int(codigo_empresa))
        return jsonify(res)
    else:
        debitos_empresas = EntityDao('debitos').list()
        return jsonify(debitos_empresas)


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
