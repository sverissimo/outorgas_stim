import json
import logging

import humps
from flask import Flask, Response
from waitress import serve

from config import env

app = Flask(__name__)

import routes  # nopep8 --- All routes go here


@app.after_request
def apply_caching(response: Response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers["X-Frame-Options"] = "DENY"
    res = response.get_json()
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
