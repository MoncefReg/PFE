from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
import os
import glob
from baseapp.models import *


@receiver(post_save, sender=Employee)
def reset_recognise(sender, instance, created, **kwargs):
    images_path = os.path.join(
        settings.MEDIA_ROOT, "employes_images", "representation*")
    files_re = images_path
    print(files_re)
    files = glob.glob(files_re)
    for file in files:
        os.remove(file)
