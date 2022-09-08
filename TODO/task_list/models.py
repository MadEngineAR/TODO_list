from django.db import models
from authapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=128)
    resp_link = models.URLField(max_length=200, blank=True, null=True)
    users = models.ManyToManyField(User)


class TodoArticle(models.Model):

    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField()
