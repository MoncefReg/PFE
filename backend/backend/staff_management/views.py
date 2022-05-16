import base64
import datetime

import os
from django.conf import settings
from django.core.files.base import ContentFile
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.permissions import AllowAny
from rest_framework import mixins
from deepface import DeepFace

from baseapp.models import Employee, LogEvent
from staff_management.serializers import LogSerializer, EmployeeSerializer


def get_id_from_image(path: str):
    print(path)
    return path.split("/")[-1].split(".")[0].split("_")[0]


class LogView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        images = request.data.get("images", [])
        for image in images:
            # try:
            image_bytes = image.split(" ")[-1]
            image_bytes = base64.b64decode(image_bytes)
            image_bytes = ContentFile(image_bytes, name=datetime.datetime.now().__str__() + ".jpg")
            # except:
            #     image_bytes = None
            results = DeepFace.find(
                image, db_path=os.path.join(settings.MEDIA_ROOT, "employes_images"), detector_backend="opencv",
                enforce_detection=False)
            if len(results) > 0:
                employee = None
                try:
                    pk = get_id_from_image(results.iloc[0, :].identity)
                    employee = Employee.objects.get(pk=pk).pk
                except Employee.DoesNotExist:
                    pass

                data = {"image": image_bytes, "employee": employee}
            else:
                data = {"image": image_bytes, "employee": None}
            log_serializer = LogSerializer(data=data)
            if log_serializer.is_valid(raise_exception=True):
                log_serializer.save()
            else:
                print("Errors happened")
        return Response(status=status.HTTP_204_NO_CONTENT)


class EmployeesViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ('first_name', 'last_name', 'mobile', 'email')
    ordering_fields = ('created_on',)


class LogEventViewSet(GenericViewSet,
                      mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin):
    queryset = LogEvent.objects.all()
    serializer_class = LogSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ('employee__first_name', 'employee__last_name')
    ordering_fields = ('created_on',)
