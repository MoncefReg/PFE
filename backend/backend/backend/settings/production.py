from .shared import *

DEBUG = False

ALLOWED_HOSTS = []

SECURE_SSL_REDIRECT = True

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True

SECURE_BROWSER_XSS_FILTER = True

DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.postgres',
        'NAME': os.environ.get('DATABASE', 'surv'),
        'USER': os.environ.get('DATABASE_USER', 'postgres'),
        'PASSWORD': os.environ.get('DATABASE_PASSWORD', 'postgres'),
        'HOST': os.environ.get('DATABASE_HOST', 'postgres'),
        'PORT': 5432,
    }
}

DEFAULT_EMAIL_FROM = ""
EMAIL_HOST = ""
EMAIL_HOST_USER = ""
EMAIL_HOST_PASSWORD = ""
EMAIL_PORT = ""
