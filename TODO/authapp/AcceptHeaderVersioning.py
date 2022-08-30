import requests

response = requests.get('http://127.0.0.1:8000/api/authapp/')
#
print(response.json())
response = requests.get('http://127.0.0.1:8000/api/authapp/', headers={'Accept':
'application/json; version=2.0'})
print(response.json())