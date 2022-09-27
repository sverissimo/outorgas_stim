from datetime import date, datetime
from data_access_layer.EntityDao import EntityDao
from importlib.resources import path
from os import path
from config import env
import json
import sys  # nopep8
sys.path.append(env.APP_FOLDER)


class PaymentsMigration:

    def json_to_dict(self, file_name):
        app_folder = path.dirname(env.APP_FOLDER)
        file_path = path.join(app_folder, 'data', file_name)

        with open(file_path, 'r') as f:
            debitos = json.load(f)
            return debitos

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

        debitos_dao = EntityDao('debitos')
        result = debitos_dao.insert_many(debitos)
        return result

    def insert_payments(self):
        payments = self.json_to_dict('allPayments.json')
        payments_dao = EntityDao('pagamentos_empresas')
        result = payments_dao.insert_many(payments)
        return result
