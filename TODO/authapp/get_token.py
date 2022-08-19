import requests



response = requests.post('http://127.0.0.1:8000/api-token-auth/', data={'username':
'Test_user_3', 'password': '14'})
print(response.status_code)
print(response.json())