import os
from datetime import datetime, timedelta


def should_update_file(path_to_file: str, days: int):

    if not os.path.exists(path_to_file):
        return True

    file_timestamp = os.path.getmtime(path_to_file)
    m_time = datetime.fromtimestamp(file_timestamp)
    today = datetime.now()

    old_enough_to_update: bool = today - m_time > timedelta(days=days)
    print("old_enough_to_update: " + str(old_enough_to_update))
    return old_enough_to_update
