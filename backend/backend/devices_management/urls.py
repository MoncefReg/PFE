from django.urls import include, path
from rest_framework.routers import DefaultRouter

from devices_management import views

router = DefaultRouter()

router.register('nodes', views.NodesViewSet, basename="nodes-management")
router.register('clusters', views.ClustersViewSet, basename="clusters-management")

urlpatterns = [
    path(r'', include(router.urls)),
    path(r'stats/', views.StatsView.as_view())
]
