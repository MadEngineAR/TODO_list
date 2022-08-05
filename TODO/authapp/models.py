from django.contrib.auth.models import AbstractUser
from django.db import models
# Create your models here.
from django.db import models


class User(AbstractUser):
    username = models.CharField(max_length=64, unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.EmailField('email address', unique=True)

