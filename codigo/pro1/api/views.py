from rest_framework.viewsets import ModelViewSet
from app.models import User, modelo_mas, Consulta
from .serializers import UserSerializer, MascotaSerializer, ConsultaSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class MascotaViewSet(ModelViewSet):
    queryset = modelo_mas.objects.all()
    serializer_class = MascotaSerializer

class ConsultaViewSet(ModelViewSet):
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer
