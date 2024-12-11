from django.shortcuts import render, redirect, get_object_or_404
from app.models import modelo_mas
from app.forms import FormMascota 
from django.core.exceptions import ValidationError
from app.models import User,Consulta
from app.forms import FormUser,FormConsulta


def index (request):
    return render (request,'app/index.html')

def listado (request):
    model = modelo_mas.objects.select_related('id_usuario').all()
    data = {'modelos': model}
    return render (request,'app/listado.html',data)


def agregar (request):
    form = FormMascota()
    if request.method == 'POST':
        form = FormMascota(request.POST)
        if form.is_valid():
            try:
                form.save()
                return redirect('/listado')
            except ValidationError as e:
                form.add_error(None,e)
    
    data = {'form':form,'titulo': 'Agregar Mascota','boton_texto': 'Agregar Mascota'}

    return render ( request, 'app/agregar.html',data)

def eliminar (request,id):
    modelp = modelo_mas.objects.get(id = id)
    modelp.delete()
    return redirect ('/listado')

def actualizar (request,id):
    modelp = modelo_mas.objects.get (id = id)
    form = FormMascota(instance=modelp)
    if request.method == 'POST':
        form = FormMascota(request.POST, instance=modelp)
        if form.is_valid():
            try:
                form.save()
                return redirect('/listado')
            except ValidationError as e:
                form.add_error(None,e)
    data = {'form': form, 'titulo': 'Editar Mascota','boton_texto': 'Guardar Cambios'}
    return render(request,'app/agregar.html',data)




def listaUsers(request):
    usuarios = User.objects.all()
    data = {'usuarios':usuarios}
    return render(request,'app/usuarios.html',data)


def agregarUser(request):
    form = FormUser()
    if request.method == 'POST':
        form = FormUser(request.POST)
        if form.is_valid():
            form.save()
        return redirect('/usuarios')
    data = {'form':form, 'titulo': 'Agregar usuario','boton_texto': 'Agregar usuario'}
    return render(request,'app/agregarUsuario.html',data)



def actualizarUser(request,id):
    user = User.objects.get(id=id)
    form = FormUser(instance=user)
    if request.method=='POST':
        form = FormUser(request.POST,instance=user)
        if form.is_valid():
            form.save()
        return redirect('/usuarios')
    data = {'form':form, 'titulo': 'Editar usuario','boton_texto': 'Guardar Cambios'}
    return render(request,'app/agregarUsuario.html',data)

def eliminarUser(request,id):
    user = User.objects.get(id=id)
    user.delete()
    return redirect('/usuarios')



# Consulta



def listaConsultas(request):
    consultas = Consulta.objects.all()
    data = {'consultas':consultas}
    return render(request,'app/consultas.html',data)


def agregarConsulta(request):
    form = FormConsulta()
    if request.method == 'POST':
        form = FormConsulta(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/consultas')
        else:
            print(form.errors)
    data = {'form': form, 'titulo': 'Agregar consulta', 'boton_texto': 'Agregar consulta'}
    return render(request, 'app/agregarConsulta.html', data)

def actualizarConsulta(request, id):
    consulta = get_object_or_404(Consulta, id=id)
    form = FormConsulta(instance=consulta)
    if request.method == 'POST':
        form = FormConsulta(request.POST, instance=consulta)
        if form.is_valid():
            form.save()
            return redirect('/consultas')
        else:
            print(form.errors)
    data = {'form': form, 'titulo': 'Editar Consulta', 'boton_texto': 'Guardar Cambios'}
    return render(request, 'app/agregarConsulta.html', data)


def eliminarConsulta(request, id):
    consulta = get_object_or_404(Consulta, id=id)
    consulta.delete()
    return redirect('/consultas')
