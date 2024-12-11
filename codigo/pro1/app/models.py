from django.db import models
from django.utils import timezone

class User(models.Model):
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    numero = models.CharField(max_length=10)
    correo = models.CharField(max_length=30)
    direccion = models.CharField(max_length=50)
    rut = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.id} - {self.nombre}"


class modelo_mas(models.Model):
    nombre = models.CharField(max_length=20)
    tipo = models.CharField(max_length=20)
    raza = models.CharField(max_length=20)
    edad = models.IntegerField()
    fecha_nacimiento = models.DateField()
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id} - {self.nombre}"
    

class Consulta(models.Model):
    id_mascota = models.ForeignKey(modelo_mas, on_delete=models.CASCADE)
    fecha = models.DateField()
    sucursal = models.CharField(max_length=30)
    veterinario = models.CharField(max_length=30)
    diagnostico = models.CharField(max_length=100)
