import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from safedelete.models import SafeDeleteModel, HARD_DELETE, SOFT_DELETE_CASCADE


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
        return f'{str(self.uid)} -  {str(self.email)}'


class Admin(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    uid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    mobile = models.CharField(max_length=99)
    birthday = models.DateField(max_length=99)
    image = models.ImageField(upload_to='AdminsImages', blank=True, null=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="admin_instance")
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.pk} - {self.user.first_name} {self.user.last_name}'

    class Meta:
        verbose_name_plural = 'Admins'
