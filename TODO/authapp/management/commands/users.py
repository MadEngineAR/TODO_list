from django.core.management.base import BaseCommand
from authapp.models import User
from django.contrib.auth.hashers import make_password


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        User.objects.create_superuser(username='MadEngine1', first_name='Руслан', last_name='Мустаев',
                                              email='1@vk.ru',
                                              password='1')
        User.objects.create(username='Test_user_1', first_name='Чиполетто', last_name='Разработчик',
                                    email='test_user_1@vk.ru',
                                    password=make_password('12'))
        User.objects.create(username='Test_user_2', first_name='Чиполлино', last_name='Владелец проекта',
                                    email='test_user_2@vk.ru',
                                    password=make_password('13'))
        User.objects.create(username='Test_user_3', first_name='Плащ', last_name='Черный',
                                    email='test_user_3@vk.ru',
                                    password=make_password('14'))

