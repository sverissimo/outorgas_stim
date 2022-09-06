import subprocess
from config.mongo_client import client, get_db, UpdateOne
from config import env
from utils.should_update_file import should_update_file


class MongoDao():

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
        days = 5
        backup_exists = should_update_file(self.BACKUP_FOLDER, days)

        if not backup_exists or backup:
            print('Creating backup first...')
            self.backup_db()
        else:
            print(f'MongoDB backup at least {days} days ago, skipping backup.')

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

    def insert_payments(self, payments: list):
        entity_manager = get_db().contratos

        updates = list(map(lambda pg: UpdateOne(
            {'numero_contrato': pg['numero_contrato']},
            {'$set': {
                'pagamentos': pg['pagamentos']}
             }
        ), payments))
        entity_manager.bulk_write(updates)

    def update_razao_social(self, empresas: list):
        entity_manager = get_db().contratos
        for e in empresas:
            filter = {'codigo_empresa': e['codigo_empresa']}
            update = {'$set': {'razao_social': e['razao_social']}}
            result = entity_manager.update_many(filter=filter, update=update)
            print('result: ', result.matched_count, result.modified_count)

    def insert_tjlp_bndes(self, tjlp_bndes):
        entity_manager = get_db()
        entity_manager.tjlp_bndes.insert_many(tjlp_bndes)

    def insert_tjlp_sef(self, tjlp_sef):
        entity_manager = get_db()
        entity_manager.tjlp_sef.insert_many(tjlp_sef)
