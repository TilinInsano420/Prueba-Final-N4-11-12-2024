from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from app.models import User, modelo_mas, Consulta
from .serializers import UserSerializer, MascotaSerializer, ConsultaSerializer

# CRUD para Usuarios
@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        usuarios = User.objects.all()
        serializer = UserSerializer(usuarios, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    try:
        usuario = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(usuario)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = UserSerializer(usuario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        usuario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# CRUD para Mascotas
@api_view(['GET', 'POST'])
def mascota_list(request):
    if request.method == 'GET':
        mascotas = modelo_mas.objects.all()
        serializer = MascotaSerializer(mascotas, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = MascotaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def mascota_detail(request, pk):
    try:
        mascota = modelo_mas.objects.get(pk=pk)
    except modelo_mas.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MascotaSerializer(mascota)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = MascotaSerializer(mascota, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        mascota.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# CRUD para Consultas
@api_view(['GET', 'POST'])
def consulta_list(request):
    if request.method == 'GET':
        consultas = Consulta.objects.all()
        serializer = ConsultaSerializer(consultas, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ConsultaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def consulta_detail(request, pk):
    try:
        consulta = Consulta.objects.get(pk=pk)
    except Consulta.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ConsultaSerializer(consulta)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ConsultaSerializer(consulta, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        consulta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
