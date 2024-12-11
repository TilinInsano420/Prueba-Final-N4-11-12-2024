from rest_framework import serializers
from app.models import User, modelo_mas, Consulta

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class MascotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = modelo_mas
        fields = '__all__'


class ConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = '__all__'
