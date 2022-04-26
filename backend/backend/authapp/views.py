from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.translation import gettext_lazy as _

from authapp.models import ChangeUserEmail
from authapp.serializers import *


# Create your views here.
class ChangeEmail(APIView):

    def post(self, request):
        """
        Update Email
        """
        user = request.user
        email = request.data['email']
        otp_change = ChangeUserEmail.generate_otp()

        user.email = email
        user.is_confirmed = False
        user.save()

        try:
            change_req = ChangeUserEmail.objects.get(user=user)
            change_req.email = email
            change_req.code = otp_change
        except ChangeUserEmail.DoesNotExist:
            change_req = ChangeUserEmail(user=user, email=email, code=otp_change)

        change_req.save()
        change_req.send_email(otp_change)
        return Response(UserSerializer(instance=user).data, status=status.HTTP_200_OK)


class VerifyEmail(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):

        """
        Email confirmation
        """
        code = request.data.get("key", None)

        if code and len(code) == 6:
            with transaction.atomic():
                try:
                    email_code_instance = EmailConfirmationCode.objects.get(code=code)
                    if email_code_instance and request.user == email_code_instance.user:
                        user = request.user
                        user.is_confirmed = True

                        user.save()
                        email_code_instance.delete()
                        return Response(TokenSerializer(instance=TokenModel.objects.get(user=user)).data,
                                        status=status.HTTP_200_OK)
                except EmailConfirmationCode.DoesNotExist:
                    pass
                except TokenModel.DoesNotExist:
                    NotFound(_("user_not_found"))
        return Response({'invalid_code': _('Invalid code')}, status=status.HTTP_400_BAD_REQUEST)


class VerifyOtpView(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):

        """
        Email confirmation OTP
        """
        code = request.data.get("key", None)

        if code and len(code) == 6:
            try:
                email_code_instance = ChangeUserEmail.objects.get(code=code)
                if email_code_instance and request.user == email_code_instance.user:
                    user = request.user
                    user.is_confirmed = True
                    user.save()
                    email_code_instance.delete()
                    return Response(UserSerializer(instance=user).data, status=status.HTTP_200_OK)
            except ChangeUserEmail.DoesNotExist:
                pass
        return Response({'invalid_code': _('Invalid code')}, status=status.HTTP_400_BAD_REQUEST)
