import json

import requests
from django.test import TestCase
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase, \
    RequestsClient
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from task_list.views import ProjectDjangoFilterPaginationViewSet
from task_list.models import Project, TodoArticle
from authapp.models import User


class TestProjectViewSet(TestCase):

    def setUp(self) -> None:
        self.url = '/api/projects/'

    def test_apiRequestFactory_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectDjangoFilterPaginationViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_apiClient_get_detail(self):
        project = mixer.blend(Project)
        client = APIClient()
        response = client.get(f'{self.url}{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def tearDown(self) -> None:
        pass


class TestTodoArticleViewSet(APITestCase):

    def setUp(self):
        username = "MadEngine"
        email = "MadEngine@vk.ru"
        password = "1"
        self.user = User.objects.create_superuser(username, email, password)

        jwt_fetch_data = {
            'username': username,
            'password': password
        }

        url = reverse('token_obtain_pair')
        self.url_todo = '/api/todo/'
        response = self.client.post(url, jwt_fetch_data, format='json')
        token = response.data['access']
        self.user = mixer.blend(User)
        self.project = mixer.blend(Project)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        self.todo_article = mixer.blend(TodoArticle)
        self.todo_article_new_dict = {
            "id": "1",
            "user": f"{self.todo_article.user}",
            "text": "Some article_1",
            "created_at": f"{self.todo_article.created_at}",
            "updated_at": f"{self.todo_article.updated_at}",
            "is_active": True,
            "project": f'http://127.0.0.1:8000/api/projects/{self.project.id}/?format=json'
        }

    def test_post(self):
        response = self.client.get('/api/todo/',
                                   data={'format': 'json'}
                                   )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_todoArticle_mixer(self):
        response = self.client.put(f'{self.url_todo}{self.todo_article.id}/', self.todo_article_new_dict, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo_article.refresh_from_db()
        self.assertEqual(self.todo_article.text, self.todo_article_new_dict.get('text'))

    def tearDown(self) -> None:
        pass


class TestUserViewSet(APITestCase):

    def setUp(self):
        self.client = RequestsClient()
        username = "MadEngine"
        email = "MadEngine@vk.ru"
        password = "1"
        self.user = User.objects.create_superuser(username, email, password)

        jwt_fetch_data = {
            'username': username,
            'password': password
        }

        # url = reverse('token_obtain_pair')
        url = 'http://127.0.0.1:8000/api-token-auth/'
        self.url_users = '/api/authapp/'
        response = self.client.post(url, json={
            'username': username,
            'password': password
        })
        result = response.json()
        token = result['access']
        self.headers = {'Authorization': f'Bearer {token}'}

    def test_get_todo_list(self):
        response = self.client.get("http://127.0.0.1:8000/api/todo/", json={
            'username': 'MadEngine',
            'password': '1'
        }, headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
