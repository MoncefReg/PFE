import hashlib
import os
from django.db import models
from baseapp.models import User
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.contrib.sites.models import Site
from django.conf import settings


class EmailConfirmationCode(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_on = models.DateTimeField(auto_now_add=True)

    def send_email(self, code):
        subject = 'Email Confirmation'
        from_email = getattr(settings, 'DEFAULT_FROM_EMAIL')
        to_email = [self.user.email]
        name = 'SRV'
        domain = Site.objects.get_current().domain
        body_html = render_to_string('email_verification.html',
                                     {'code': str(code), 'domain': domain, 'user': self.user})
        send_mail(subject, name, from_email, to_email, html_message=body_html)

    @classmethod
    def generate_otp(cls, length=6):
        m = hashlib.sha256()
        m.update(getattr(settings, 'SECRET_KEY', None).encode('utf-8'))
        m.update(os.urandom(16))
        otp = str(int(m.hexdigest(), 16))[-length:]
        return otp


class PasswordResetCode(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_on = models.DateTimeField(auto_now_add=True)

    @classmethod
    def generate_otp(cls, length=6):
        m = hashlib.sha256()
        m.update(getattr(settings, 'SECRET_KEY', None).encode('utf-8'))
        m.update(os.urandom(16))
        otp = str(int(m.hexdigest(), 16))[-length:]
        return otp


class ChangeUserEmail(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    email = models.EmailField()
    code = models.CharField(max_length=6)
    created_on = models.DateTimeField(auto_now_add=True)

    def send_email(self, code):
        subject = 'Change Email Confirmation'
        from_email = getattr(settings, 'DEFAULT_FROM_EMAIL')
        to_email = [self.email]
        name = 'SRV'
        domain = Site.objects.get_current().domain
        body_html = render_to_string('email_verification.html',
                                     {'code': code, 'domain': domain, 'user': self.user})
        send_mail(subject, name, from_email, to_email, html_message=body_html, fail_silently=False)

    @classmethod
    def generate_otp(cls, length=6):
        m = hashlib.sha256()
        m.update(getattr(settings, 'SECRET_KEY', None).encode('utf-8'))
        m.update(os.urandom(16))
        otp = str(int(m.hexdigest(), 16))[-length:]
        return otp
