import requests
from requests.auth import HTTPBasicAuth

auth = HTTPBasicAuth(username='MadEngine1', password='1')

response = requests.post('http://127.0.0.1:8000/api/projects/',  auth=auth)
print(response.status_code)
print(response.json())