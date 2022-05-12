import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from safedelete.models import SafeDeleteModel, HARD_DELETE, SOFT_DELETE_CASCADE
import os


class User(AbstractUser, SafeDeleteModel):
    _safedelete_policy = HARD_DELETE

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(null=True, max_length=150, blank=True)
    email = models.EmailField(unique=True, blank=True)
    is_confirmed = models.BooleanField(default=False)
    first_name = models.CharField(max_length=99, blank=True, null=True)
    last_name = models.CharField(max_length=99, blank=True, null=True)
    # user Roles
    ROLES = [
        ('user', 'user'),
        ('admin', 'admin'),
    ]
    role = models.CharField(max_length=20, choices=ROLES, default='user')
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name_plural = "Users"

    def __str__(self):
        return f'{str(self.id)} -  {str(self.email)}'


class Admin(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    uid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    mobile = models.CharField(max_length=99)
    birthday = models.DateField(max_length=99)
    image = models.ImageField(upload_to='AdminsImages', blank=True, null=True)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="admin_instance")
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.pk} - {self.user.first_name} {self.user.last_name}'

    class Meta:
        verbose_name_plural = 'Admins'


def Rename(instance, filename):
    ext = filename.split('.')[-1]
    filename = '{}.{}'.format(instance.pk, ext)
    path = os.path.join("employes_images", filename)
    return path


class Employee(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    first_name = models.CharField(max_length=99, blank=True, null=True)
    last_name = models.CharField(max_length=99, blank=True, null=True)
    image = models.ImageField(upload_to=Rename, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.pk} - {self.first_name} {self.last_name}'

    class Meta:
        verbose_name_plural = 'Employees'


class LogEvent(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField(auto_now_add=True)
    employee = models.ForeignKey(Employee, null=True, blank=True, on_delete=models.SET_NULL)
    image = models.ImageField(upload_to="log_events", null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.pk} - {self.date}'

    class Meta:
        verbose_name_plural = 'Log Events'


class Cluster(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(null=True, blank=True, max_length=30)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.pk}'

    class Meta:
        verbose_name_plural = 'Log Events'


class Node(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cluster = models.ForeignKey(Cluster, related_name="nodes", null=True, blank=True, on_delete=models.SET_NULL)
    ip_address = models.GenericIPAddressField()
    port = models.CharField(max_length=5, blank=True, null=True)
    user = models.CharField(max_length=99, blank=True, null=True)
    password = models.CharField(max_length=99, blank=True, null=True)
    active = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.pk}'

    class Meta:
        verbose_name_plural = 'Log Events'
