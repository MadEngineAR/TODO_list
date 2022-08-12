from django.core.management.base import BaseCommand
from task_list.models import Project, TodoArticle
from authapp.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        Project.objects.all().delete()
        TodoArticle.objects.all().delete()

        project_1 = Project.objects.create(name='MadEngine_project_1', resp_link='test.com')
        project_2 = Project.objects.create(name='Test_project_2')
        project_3 = Project.objects.create(name='Test_project_2', resp_link='test_2.com')
        superuser = User.objects.get(username='MadEngine1')
        user_1 = User.objects.get(username='Test_user_1')
        user_2 = User.objects.get(username='Test_user_2')
        user_3 = User.objects.get(username='Test_user_3')

        project_1.users.add(superuser, user_1)
        project_1.save()
        project_2.users.add(user_1, user_2)
        project_2.save()
        project_3.users.add(user_3)
        project_3.save()

        todo_article_1 = TodoArticle.objects.create(project=project_1, text='Some article_1', user=superuser,
                                                    is_active=True)
        todo_article_2 = TodoArticle.objects.create(project=project_2, text='Some article_2', user=user_3,
                                                    is_active=False)
        todo_article_3 = TodoArticle.objects.create(project=project_3, text='Some article_3', user=user_3,
                                                    is_active=True)


