from database.migrations.run_migrations import *


def test_linhas_migration(empresas_from_cadti):
    run_linhas_migration(empresas_from_cadti)


def test_contracts_migration(empresas_from_cadti):
    run_contracts_migration(empresas_from_cadti)


def test_payments_migration():  # Require other migrations first
    run_payments_migration()


def test_run_migrations(empresas_from_cadti):
    run_migrations(empresas_from_cadti)
