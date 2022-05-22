from django.urls import re_path

from baseapp import consumer

urlpatterns = [
    re_path(r'ws/notifications/$', consumer.Consumer.as_asgi())
]
