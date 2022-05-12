import base64
import datetime

import os
from django.conf import settings
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from deepface import DeepFace

from baseapp.models import Employee
from staff_management.serializers import LogSerializer


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
