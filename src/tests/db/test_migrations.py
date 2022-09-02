from database.migrations.run_migrations import run_migrations


def test_run_migrations(empresas_from_cadti):
    run_migrations(empresas_from_cadti)
