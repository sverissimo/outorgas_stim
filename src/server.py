from waitress import serve
import logging
from flask import Flask

app = Flask(__name__)

import routes  # nopep8 --- All routes go here


@app.after_request
def apply_caching(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers["X-Frame-Options"] = "DENY"
    return response


if __name__ == '__main__':
    # PRODUCTION
    logger = logging.getLogger('waitress')
    logger.setLevel(logging.INFO)
    serve(app, host='localhost', port=5000)

    # app.run(host='localhost', port=5000, debug=True, load_dotenv=True) # DEVELOPMENT
