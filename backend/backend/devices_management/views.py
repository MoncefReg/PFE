from rest_framework.filters import SearchFilter
from rest_framework.viewsets import ModelViewSet

from devices_management.serializers import *


class NodesViewSet(ModelViewSet):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer
    filter_backends = [SearchFilter]
    search_fields = ('ip_address', 'port')


class ClustersViewSet(ModelViewSet):
    queryset = Cluster.objects.all()
    serializer_class = ClusterSerializer
    filter_backends = [SearchFilter]
    search_fields = ('id', 'name')