from django.contrib import admin
from .models import User, modelo_mas, Consulta
from .forms import FormUser, FormMascota, FormConsulta

class ModeloMasAdmin(admin.ModelAdmin):
    form = FormMascota
    list_display = ['nombre', 'raza', 'tipo', 'edad', 'fecha_nacimiento']
    search_fields = ['nombre', 'raza', 'tipo']
    list_filter = ['tipo', 'raza']

    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser 

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

class UserAdmin(admin.ModelAdmin):
    form = FormUser
    list_display = ['nombre', 'apellido', 'numero', 'correo', 'direccion', 'rut']
    search_fields = ['nombre', 'apellido', 'rut']
    list_filter = ['direccion']

    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

class ConsultaAdmin(admin.ModelAdmin):
    form = FormConsulta
    list_display = ['id_mascota', 'fecha', 'sucursal', 'veterinario', 'diagnostico']
    search_fields = ['sucursal', 'veterinario', 'diagnostico']
    list_filter = ['sucursal', 'fecha']

    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

admin.site.register(modelo_mas, ModeloMasAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Consulta, ConsultaAdmin)
