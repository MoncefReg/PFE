from django.urls import path, include
from rest_framework.routers import DefaultRouter

from staff_management import views

router = DefaultRouter()
router.register('employees', views.EmployeesViewSet, basename='employees_management')
router.register('logs', views.LogEventViewSet, basename='log_events')

urlpatterns = [
    path(r'', include(router.urls)),
    path(r'mark-log/', views.LogView.as_view(), name="mark_log_from_camera")
]
