import re
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _


def clean_first_name(value):
    if re.search('[a-zA-Z0-9]', value):
        raise ValidationError(
            _(f"Пожалуйста введите ваше имя на кириллице. Не используйте цифры."),
            params={'value': value}
        )


def clean_username(value):
    if not re.match('[a-zA-Z]', value):
        raise ValidationError(
            _(f"Пожалуйста введите имя пользователя латинскими буквами"),
            params={'value': value}
        )