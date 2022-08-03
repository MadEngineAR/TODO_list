from django.core.management.base import BaseCommand
from authapp.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        User.objects.create_superuser(username='MadEngine1', email='1@vk.ru', password='1')
        User.objects.create(username='Test_user_1', email='test_user_1@vk.ru', password='12')
        User.objects.create(username='Test_user_2', email='test_user_2@vk.ru', password='13')
        User.objects.create(username='Test_user_3', email='test_user_3@vk.ru', password='14')
