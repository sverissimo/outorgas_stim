from database.migrations.run_migrations import run_tjlp_migrations


async def test_insert_updates_tjlp():
    await run_tjlp_migrations()
