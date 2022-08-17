from django_filters import rest_framework as filters
from task_list.models import Project
from task_list.models import TodoArticle


class ProjectFilter(filters.FilterSet):

    name = filters.CharFilter(lookup_expr='contains')

    class Meta:

        model = Project
        fields = ['name']


class TodoArticleFilter(filters.FilterSet):

    created_at = filters.DateFromToRangeFilter()

    class Meta:
        model = TodoArticle
        fields = ['user', 'project', 'is_active', 'created_at']



