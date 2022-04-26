from django.urls import path, include
from .views import *

urlpatterns = [
    path(r'', include('dj_rest_auth.urls')),
    path(r'registration/', include('dj_rest_auth.registration.urls')),
    path(r'registration/confirm-email/', view=VerifyEmail.as_view(), name="email-confirmation"),
    path(r'email/verify-otp/', view=VerifyOtpView.as_view(), name="verify_otp"),
    path(r'email/change/', view=ChangeEmail.as_view(), name="change-email"),
]
