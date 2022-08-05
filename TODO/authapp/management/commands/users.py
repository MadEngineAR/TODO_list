from django.core.management.base import BaseCommand
from authapp.models import User
from django.contrib.auth.hashers import make_password


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        User.objects.create_superuser(username='MadEngine1', first_name='Руслан', last_name='Мустаев', email='1@vk.ru',
                                      password='1')
        User.objects.create(username='Test_user_1', first_name='Тест_1', last_name='Тест_1', email='test_user_1@vk.ru',
                            password=make_password('12'))
        User.objects.create(username='Test_user_2', first_name='Тест_2', last_name='Тест_2', email='test_user_2@vk.ru',
                            password=make_password('13'))
        User.objects.create(username='Test_user_3',  first_name='Тест_2', last_name='Тест_2', email='test_user_3@vk.ru',
                            password=make_password('14'))

