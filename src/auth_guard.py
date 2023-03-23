from config import env
from data_access_layer.ExternalDataApi import ExternalDataApi


def auth_guard(user, secret):
    try:
        res = ExternalDataApi().get_auth_from_cadti(user, secret)
        isAuthenticated = 200 >= res.status_code <= 217
        if not isAuthenticated:
            return isAuthenticated

        auth_token = res.text if res.text == env.AUTH_TOKEN else False
        return auth_token
    except:
        print('error getting auth')
        return False
