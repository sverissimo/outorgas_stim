import json
import logging

import humps
from flask import Flask, Response, session
from waitress import serve

import auth_guard
from config import env
from data_access_layer.ExternalDataApi import ExternalDataApi

app = Flask(__name__)

import routes  # nopep8 --- All routes go here

SESSION_TYPE = 'filesystem'
app.secret_key = env.SESSION_KEY


""" @app.before_first_request
def get_session_token():
    auth_token = auth_guard.auth_guard(
        user=env.USER_CADTI, secret=env.PASS_CADTI)

    session.token = auth_token
    print('token: ', session.token)
    print('session: ', session.token)
 """


@app.before_request
def auth():
    auth_token = auth_guard.auth_guard(
        user=env.USER_CADTI, secret=env.PASS_CADTI)

    session.token = auth_token
    if not session.token:
        return 'Not authenticated.'


@app.after_request
def apply_caching(response: Response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers["X-Frame-Options"] = "DENY"
    res = response.get_json()
    # print(request)
    if type(res) == dict or type(res) == list:
        res = humps.camelize(res)
        response.data = json.dumps(res)

    return response


if __name__ == '__main__':

    if env.FLASK_ENV == 'development':
        app.run(host='localhost', port=5000, debug=True,
                load_dotenv=True)
    else:
        logger = logging.getLogger('waitress')
        logger.setLevel(logging.DEBUG)
        serve(app, host='localhost', port=5000)
