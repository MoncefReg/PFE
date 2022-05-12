from rest_framework import serializers
from baseapp.models import *


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogEvent
        exclude = ('deleted', 'created_on', 'updated_on')
