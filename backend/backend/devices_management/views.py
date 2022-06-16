from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework.views import APIView
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


class StatsView(APIView):
    def get(self, request):
        device = request.GET.get("device", None)
        if device:
            device = Node.objects.get(pk=device)
            logs = LogEvent.objects.filter(node=device)
        else:
            logs = LogEvent.objects.all()
        logs_by_employee = logs.values('employee').annotate(count=Count("pk")).order_by("-count").values('employee',
                                                                                                        'employee__first_name',
                                                                                                        'employee__last_name',
                                                                                                        'count')
        logs_by_employee = {"total": logs.count(), "employees_stats": logs_by_employee}

        total_staff = Employee.objects.all().count()

        total_devices = Node.objects.all().count()

        return Response(
            {"logs_by_employee": logs_by_employee,
             "staff": total_staff,
             "devices": total_devices})
