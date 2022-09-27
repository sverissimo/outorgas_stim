from database.migrations.PaymentsMigration import PaymentsMigration


def test_debts_migration():
    payments_migration = PaymentsMigration()
    result = payments_migration.insert_debitos()
    print('result: ', result)


def test_payments_migration():
    payments_migration = PaymentsMigration()
    result = payments_migration.insert_payments()
    print('result: ', result)
