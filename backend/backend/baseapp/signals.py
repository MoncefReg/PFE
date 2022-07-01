import datetime

from channels.layers import get_channel_layer
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
import glob
from asgiref.sync import async_to_sync

from baseapp.models import *

from baseapp.serializers import NotificationSerializer


@receiver(post_save, sender=Employee)
def reset_recognise(sender, instance, created, **kwargs):
    images_path = os.path.join(
        settings.MEDIA_ROOT, "employes_images", "representation*")
    files_re = images_path
    files = glob.glob(files_re)
    for file in files:
        os.remove(file)


@receiver(post_save, sender=LogEvent)
def notify_unauthorized_access(sender, instance, created, **kwargs):
    layer = get_channel_layer()
    if instance.employee is None:
        data = {"id": str(instance.pk)}
        now = datetime.datetime.now().isoformat()
        notification = NotificationSerializer(data={
            "data": data,
        })
        if notification.is_valid(raise_exception=False):
            notification.save()
            async_to_sync(layer.group_send)('notification', {
                "message": {
                    "id": str(notification.data.get("id", None)),
                    "log": str(instance.pk),
                    "date": now
                },
                "type": "notify"
            })
