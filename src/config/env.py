from os import getenv

from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

APP_FOLDER = getenv("APP_FOLDER")
MONGO_URI = getenv("MONGO_URI")
MONGO_BACKUP_FOLDER = getenv('MONGO_BACKUP_FOLDER')
MONGO_RESTORE_FOLDER = getenv('MONGO_RESTORE_FOLDER')

USER_CADTI = getenv('USER_CADTI')
PASS_CADTI = getenv('PASS_CADTI')
AUTH_TOKEN = getenv('AUTH_TOKEN')
AUTH_CADTI = getenv("AUTH_CADTI")
CADTI_HOST = getenv('CADTI_HOST')
FLASK_ENV = getenv("FLASK_ENV")
SESSION_KEY = getenv("SESSION_KEY")

"""
ENV = getenv("ENV")
AUTH_SYNC = getenv("AUTH_SYNC")
HOST = getenv("HOST")
USER = getenv("USER")
PASS = getenv("PASS")
"""
