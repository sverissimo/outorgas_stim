from os import getenv
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

APP_FOLDER = getenv("APP_FOLDER")
MONGO_URI = getenv("MONGO_URI")
MONGO_BACKUP_FOLDER = getenv('MONGO_BACKUP_FOLDER')
MONGO_RESTORE_FOLDER = getenv('MONGO_RESTORE_FOLDER')

AUTH_CADTI = getenv("AUTH_CADTI")
CADTI_HOST = getenv('CADTI_HOST')

""" 
ENV = getenv("ENV")
AUTH_SYNC = getenv("AUTH_SYNC")
HOST = getenv("HOST")
USER = getenv("USER")
PASS = getenv("PASS") 
"""
