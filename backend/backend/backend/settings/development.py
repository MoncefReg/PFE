from .shared import *

DEBUG = True

ALLOWED_HOSTS = ['*']

CORS_ORIGIN_ALLOW_ALL = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

DEFAULT_EMAIL_FROM = "support@moncef.rgm"
EMAIL_HOST = 'smtp.mailtrap.io'
EMAIL_HOST_USER = '48490a13e822da'
EMAIL_HOST_PASSWORD = 'c6c02134af36a6'
EMAIL_PORT = '2525'
