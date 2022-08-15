from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from .models import User
from .serializers import UserModelSerializer
from rest_framework import mixins, viewsets


class UserModelViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin,mixins.RetrieveModelMixin,
                       viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

