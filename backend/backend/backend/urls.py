from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="SURV",
        default_version='v1',
        description="SURV Project API docs",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@surv.dz"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),  # TODO CHANGE THIS !!
)

urlpatterns = [
    path(r'api/v1/auth/', include("authapp.urls")),
    path(r'api/v1/staff/', include("staff_management.urls")),
    path(r'api/v1/devices/', include("devices_management.urls")),
    path(r'api/v1/admin/', admin.site.urls),
    path(r'api/v1/swagger/', schema_view.with_ui('swagger',
                                                 cache_timeout=0), name='schema-swagger-ui'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
