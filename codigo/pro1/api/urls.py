from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.user_list, name='user_list'),
    path('users/<int:pk>/', views.user_detail, name='user_detail'),
    path('mascotas/', views.mascota_list, name='mascota_list'),
    path('mascotas/<int:pk>/', views.mascota_detail, name='mascota_detail'),
    path('consultas/', views.consulta_list, name='consulta_list'),
    path('consultas/<int:pk>/', views.consulta_detail, name='consulta_detail'),
]
