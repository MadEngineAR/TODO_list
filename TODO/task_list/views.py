#from djangorestframework_camel_case.render import CamelCaseJSONRenderer
from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.renderers import AdminRenderer
from rest_framework.response import Response
from .filters import ProjectFilter, TodoArticleFilter
from .models import Project, TodoArticle
from rest_framework.pagination import LimitOffsetPagination
from .serializers import ProjectModelSerializer, TodoArticleHyperlinkedModelSerializer


# class ProjectModelViewSet(ModelViewSet):
#     # renderer_classes = [AdminRenderer]
#     # renderer_classes = [CamelCaseJSONRenderer]
#     queryset = Project.objects.all()
#     serializer_class = ProjectModelSerializer
#     filterset_class = ProjectFilter



class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ArticleLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20

class ProjectDjangoFilterPaginationViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


class TodoArticleFilterPaginationViewSet(viewsets.ModelViewSet):
    # renderer_classes = [AdminRenderer]
    queryset = TodoArticle.objects.all()
    serializer_class = TodoArticleHyperlinkedModelSerializer
    filterset_class = TodoArticleFilter
    pagination_class = ArticleLimitOffsetPagination

    def destroy(self, request,  pk=None, *args, **kwargs):

        article = get_object_or_404(TodoArticle, pk=pk)
        article.is_active = False
        serializer = TodoArticleHyperlinkedModelSerializer(article, context={'request': request})
        article.save()
        return Response(serializer.data)
