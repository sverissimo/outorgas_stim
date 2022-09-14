import subprocess
from config.mongo_client import client, get_db
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
