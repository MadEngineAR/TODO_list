import requests

response = requests.post('http://127.0.0.1:8000/api-token-auth/', data={'username': 'MadEngine1', 'password': '1'})
print(response.status_code)
print(response.json())
token = response.json().get('token')
print(token)
response_todo = requests.get('http://127.0.0.1:8000/api/todo/', headers={'Authorization': f'JWT {token}'})
print(response_todo.status_code)
print(response_todo.json())
