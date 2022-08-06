import re
from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from django.utils.translation import ugettext_lazy as _
from .models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

    def clean_first_name(value):
        if re.search('[a-zA-Z0-9]', value):
            raise serializers.ValidationError(
                _(f"Пожалуйста введите ваше имя на кириллице. Не используйте цифры."),
                params={'value': value}
            )

    def clean_username(value):
        if not re.match('[a-zA-Z]', value):
            raise serializers.ValidationError(
                _(f"Пожалуйста введите имя пользователя латинскими буквами"),
                params={'value': value}
            )
