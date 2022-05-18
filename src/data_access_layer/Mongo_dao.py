from os.path import exists
import subprocess
from config.mongo_client import client, get_db, UpdateOne
from config import env


class Mongo_dao():

    client = client
    BACKUP_FOLDER = env.MONGO_BACKUP_FOLDER
    RESTORE_FOLDER = env.MONGO_RESTORE_FOLDER

    def backup_db(self):
        command = ['mongodump', '--db', 'outorgas',
                   '--out='+self.BACKUP_FOLDER]
        output = subprocess.run(command, capture_output=True, text=True)
        print('output: ', output)
        return output.stderr

    def restore_db(self):

        command = ['mongorestore', '--db',
                   'outorgas', '--verbose', self.RESTORE_FOLDER]
        output = subprocess.run(command, capture_output=True, text=True)
        print('*****output restore_db: ', output)
        return output.stdout

    def drop_db(self, backup=True):
        backup_exists = exists(self.BACKUP_FOLDER)

        if not backup_exists:
            print('Creating backup first...')
            self.backup_db()
        client.drop_database('outorgas')
        print('Outorgas DB dropped.')

    def create_contracts(self, contracts: list):

        contratos = get_db().contratos
        first_contract_n = contracts[0]["numero_contrato"]
        search = list(contratos.find({"numero_contrato": first_contract_n}))
        if len(search) > 0:
            print(
                "Data already exists ind MongoDB, skipping insert command\n contract found:",
                search,
            )
            return
        else:
            contratos.insert_many(contracts)

    def get_contracts(self, query: dict or None = {}):

        entity_manager = get_db().contratos
        result = entity_manager.find(query, {'_id': 0})
        result = list(result)
        print('Mongo_dao.get_contracts() -> contracts retrieved, first one is numbered: ',
              result[0]['numero_contrato'])

        return result

    def insert_payments(self, payments: list):
        entity_manager = get_db().contratos

        updates = list(map(lambda pg: UpdateOne(
            {'numero_contrato': pg['numero_contrato']},
            {'$set': {
                'pagamentos': pg['pagamentos']}
             }
        ), payments))

        entity_manager.bulk_write(updates)
