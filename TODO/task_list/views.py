from djangorestframework_camel_case.render import CamelCaseJSONRenderer
from rest_framework.renderers import AdminRenderer
from rest_framework.viewsets import ModelViewSet
from .models import Project, TodoArticle
from .serializers import ProjectModelSerializer, TodoArticleHyperlinkedModelSerializer


class ProjectModelViewSet(ModelViewSet):
    # renderer_classes = [AdminRenderer]
    renderer_classes = [CamelCaseJSONRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class TodoArticleModelViewSet(ModelViewSet):
    renderer_classes = [AdminRenderer]
    queryset = TodoArticle.objects.all()
    serializer_class = TodoArticleHyperlinkedModelSerializer

