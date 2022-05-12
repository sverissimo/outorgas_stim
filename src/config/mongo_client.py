from http import client
from pymongo import MongoClient
from config import env

client = MongoClient(env.MONGO_URI)


def get_db():
    outorgas_db = client.outorgas
    return outorgas_db
