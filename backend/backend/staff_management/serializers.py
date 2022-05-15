from rest_framework import serializers
from baseapp.models import *


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogEvent
        exclude = ('deleted', 'updated_on')


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        exclude = ('deleted', 'updated_on')
