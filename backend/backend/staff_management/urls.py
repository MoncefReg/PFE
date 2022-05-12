from django.urls import path
from staff_management import views

urlpatterns = [
    path(r'logs/', views.LogView.as_view(), name="mark_log_from_camera")
]
