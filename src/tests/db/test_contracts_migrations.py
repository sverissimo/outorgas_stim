from database.migrations.run_migrations import *


def test_linhas_migration(empresas_from_cadti):
    run_linhas_migration(empresas_from_cadti)


def test_contracts_migration(empresas_from_cadti):
    run_contracts_migration(empresas_from_cadti)


def test_tjlp_migration():
    run_tjlp_migrations()


def test_add_payments_to_contracts_migration():  # Require linhas/contracts migrations first
    run_payments_migration()


def test_missing_payments_migration(empresas_from_cadti):
    missing_payments = run_missing_payments_migration(empresas_from_cadti)
    print('missing_payments head: ', missing_payments[:2])
    print('missing_payments count: ', len(missing_payments))

    """
    ### TESTING LOGS ###
    n = list(filter(lambda x: x['codigo_empresa'] == None, missing_payments))
    missing_lines = list(map(lambda x: {
                         'codigo_empresa': x['codigo_empresa'],
                         'linha': x['linha_id']
                         }, missing_payments))
    right, wrong = [], []

    for l in sorted(missing_payments, key=lambda x: x['linha_id']):
        p = re.compile(r'\d{4,5}')
        line = p.findall(l['linha_id'])
        if len(line) and int(line[0]) == l['codigo_empresa']:
            right.append(l)
        elif l['linha_id'] != '0':
            wrong.append(l)

    for w in wrong:
        print('missing_lines: ', w)
    print('wrong: ', len(wrong))
    print('right: ', len(right)) """


def test_run_migrations(empresas_from_cadti):
    run_migrations(empresas_from_cadti)
