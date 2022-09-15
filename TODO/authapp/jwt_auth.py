import requests

# авторизация по jwt

# Получаем токен
from TODO.TODO import settings

response = requests.post('http://127.0.0.1:8000/api-token-auth/', json={'username': 'MadEngine1', 'password': '1'})
print(response)
result = response.json()
print(result)
# это наш токен
access = result['access']
print('Первый токен', access, end=f'\n{150 * "*"}\n')
# это для рефреша
refresh = result['refresh']
print('refresh', refresh, end=f'\n{150 * "*"}\n')
# timeout()
# Авторизуемся с ним
headers = {'Authorization': f'Bearer {access}'}
response = requests.get('http://127.0.0.1:8000/api/projects/', headers=headers)
# print(response.json())
assert response.status_code == 200



print(settings.BASE_DIR)
print(settings.TEMPLATE_DIRS)