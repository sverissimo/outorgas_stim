from database.migrations.run_migrations import run_migrations
from database.migrations.run_migrations import run_linhas_migration
from database.migrations.run_migrations import run_contracts_migration


def test_linhas_migration(empresas_from_cadti):
    run_linhas_migration(empresas_from_cadti)


def test_contracts_migration(empresas_from_cadti):
    run_contracts_migration(empresas_from_cadti)


def test_run_migrations(empresas_from_cadti):
    run_migrations(empresas_from_cadti)
