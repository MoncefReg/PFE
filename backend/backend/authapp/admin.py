from django.contrib import admin
from authapp.models import *

# Register your models here.
admin.site.register(EmailConfirmationCode)
admin.site.register(ChangeUserEmail)
admin.site.register(PasswordResetCode)