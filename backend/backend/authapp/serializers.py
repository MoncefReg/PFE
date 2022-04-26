from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer as BaseRegisterSerializer
from dj_rest_auth.serializers import TokenSerializer as BaseTokenSerializer
from dj_rest_auth.models import TokenModel
from baseapp.models import *
from authapp.models import EmailConfirmationCode


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'is_active', 'is_confirmed', 'role']
        read_only_fields = ['is_superuser', 'role', 'is_confirmed', 'is_active']


class RegisterSerializer(BaseRegisterSerializer):
    username = None
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True)

    def get_cleaned_data(self):
        super(RegisterSerializer, self).get_cleaned_data()
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', ''),
        }

    @transaction.atomic
    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        user.save()
        # prepare code email confirmation
        email_code_confirmation = EmailConfirmationCode()
        email_code_confirmation.user = user
        # generate code
        code = EmailConfirmationCode.generate_otp()
        email_code_confirmation.code = str(code)
        # save the code
        email_code_confirmation.save()
        # send code email to user
        email_code_confirmation.send_email(code)
        return user


class TokenSerializer(BaseTokenSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = TokenModel
        fields = ('key', 'user')
