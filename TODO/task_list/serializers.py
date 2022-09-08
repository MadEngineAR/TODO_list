from rest_framework import serializers
from .models import Project, TodoArticle


class ProjectModelSerializer(serializers.ModelSerializer):
    # users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoArticleHyperlinkedModelSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = TodoArticle
        fields = ('id', 'project', 'text', 'created_at', 'updated_at', 'user', 'is_active')
