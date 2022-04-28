from http import client
from pymongo import MongoClient


def get_db():
    client = MongoClient("mongodb://127.0.0.1:27017/")
    outorgas_db = client.outorgas
    return outorgas_db
