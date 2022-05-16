from rest_framework import serializers
from baseapp.models import *


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        exclude = ('deleted', 'updated_on')


class LogSerializer(serializers.ModelSerializer):
    employee_data = EmployeeSerializer(read_only=True, source="employee")

    class Meta:
        model = LogEvent
        exclude = ('deleted', 'updated_on')
