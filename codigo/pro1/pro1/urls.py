from django.contrib import admin
from django.urls import path, include
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path ('',views.index),
    path ('listado/',views.listado),
    path ('agregar/',views.agregar),
    path ('actualizar/<int:id>',views.actualizar),
    path ('eliminar/<int:id>',views.eliminar),
    path('usuarios/',views.listaUsers),
    path('agregarUsuario/',views.agregarUser),
    path('actualizarUsuario/<int:id>/',views.actualizarUser),
    path('eliminarUsuario/<int:id>/',views.eliminarUser),
    path('consultas/',views.listaConsultas),
    path('agregarConsulta/',views.agregarConsulta),
    path('actualizarConsulta/<int:id>/',views.actualizarConsulta),
    path('eliminarConsulta/<int:id>/',views.eliminarConsulta),
    #path del api
    path('api/', include('api.urls'))
]
