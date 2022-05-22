from rest_framework import serializers

from baseapp.models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    seen = serializers.SerializerMethodField()

    def get_seen(self, instance):
        return True if instance.seen_date else False

    class Meta:
        model = Notification
        exclude = ('deleted', 'updated_on')
