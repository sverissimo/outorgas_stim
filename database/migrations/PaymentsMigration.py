from datetime import datetime
from data_access_layer.EntityDao import EntityDao
from importlib.resources import path
from os import path
from config import env
import json
import humps


class PaymentsMigration:

    def json_to_dict(self, file_name):
        app_folder = path.dirname(env.APP_FOLDER)
        file_path = path.join(app_folder, 'data', file_name)

        with open(file_path, 'r') as f:
            data = json.load(f)
            return data

    def parse_dates(self, debitos):
        for debito in debitos:
            try:
                debito['data'] = datetime.strptime(
                    debito['data'], '%a, %d %b %Y %H:%M:%S %Z'
                )
            except ValueError:
                print(
                    f'\n\n####### Warning couldn\'t parse date from {debito}\nSkipping...')
        return debitos

    def insert_debitos(self):
        debitos = self.json_to_dict('debitos.json')
        debitos = self.parse_dates(debitos)
        debitos = humps.decamelize(debitos)

        debitos_dao = EntityDao('debitos')
        result = debitos_dao.insert_many(debitos)
        return result

    def insert_payments(self):
        payments = self.json_to_dict('allPayments.json')
        payments = humps.decamelize(payments)

        payments_dao = EntityDao('pagamentos')
        result = payments_dao.insert_many(payments)
        return result
