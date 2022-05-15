from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.viewsets import ModelViewSet

from devices_management.serializers import *


class NodesViewSet(ModelViewSet):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ('ip_address', 'port')
    ordering_fields = ('created_on',)
    filter_fields = ('cluster',)


class ClustersViewSet(ModelViewSet):
    queryset = Cluster.objects.all()
    serializer_class = ClusterSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ('id', 'name')
    ordering_fields = ('created_on',)
