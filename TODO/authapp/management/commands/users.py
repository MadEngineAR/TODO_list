from django.core.management.base import BaseCommand
from authapp.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):

        User.objects.all().delete()

        User.objects.create_superuser(username='MadEngine1', email='1@vk.ru', password='1')
        User.objects.create(username='Test_user_1', last_name='Чиполлино', first_name='Чиполлето',
                                     email='test_user_1@vk.ru', password='12')
        User.objects.create(username='Test_user_2', last_name='Чип', first_name='Дейл',
                                     email='test_user_2@vk.ru', password='13')
        User.objects.create(username='Test_user_3', last_name='Черный плащ', first_name='Дейл',
                                     email='test_user_3@vk.ru', password='14')

