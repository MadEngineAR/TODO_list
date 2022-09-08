import graphene
from graphene_django import DjangoObjectType
from task_list.models import Project, TodoArticle
from authapp.models import User


class TodoType(DjangoObjectType):

    class Meta:
        model = TodoArticle
        fields = '__all__'


class UserType(DjangoObjectType):

    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):

    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todo_articles = graphene.List(TodoType)
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    projects_by_user_username = graphene.List(ProjectType, username=graphene.String(required=False))
    todo_by_is_active = graphene.List(TodoType, is_active=graphene.Boolean(required=False))

    def resolve_all_todo_articles(root, info):
        return TodoArticle.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_projects_by_user_username(self, info, username=None):
        projects = Project.objects.all()
        if username:
            projects = projects.filter(users__username=username)
        return projects

    def resolve_todo_by_is_active(self, info, is_active=None):
        todo_articles = TodoArticle.objects.all()
        if is_active:
            todo_articles = TodoArticle.objects.filter(is_active=is_active)
        return todo_articles


schema = graphene.Schema(query=Query)
