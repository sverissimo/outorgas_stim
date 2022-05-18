from pymongo import MongoClient, UpdateOne
from config import env

client = MongoClient(env.MONGO_URI)


def get_db():
    outorgas_db = client.outorgas
    return outorgas_db
