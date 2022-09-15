import requests
from requests.auth import HTTPBasicAuth

auth = HTTPBasicAuth(username='MadEngine1', password='1')


response = requests.get('http://127.0.0.1:8000/api/todo/',  auth=auth)
print(response.status_code)
print(response.json())