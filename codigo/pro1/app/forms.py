from django import forms
from django.core.exceptions import ValidationError
from django.utils import timezone
from .models import User, modelo_mas, Consulta

class FormUser(forms.ModelForm):
    class Meta:
        model = User
        fields = ['nombre', 'apellido', 'numero', 'correo', 'direccion', 'rut']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control', 'minlength': 2, 'maxlength': 30}),
            'apellido': forms.TextInput(attrs={'class': 'form-control', 'minlength': 2, 'maxlength': 30}),
            'numero': forms.TextInput(attrs={'class': 'form-control', 'pattern': r'^\d{9,10}$', 'title': 'El número debe tener entre 9 y 10 dígitos.'}),
            'correo': forms.EmailInput(attrs={'class': 'form-control', 'maxlength': 50}),
            'direccion': forms.TextInput(attrs={'class': 'form-control', 'minlength': 5, 'maxlength': 30}),
            'rut': forms.TextInput(attrs={'class': 'form-control', 'pattern': r'^\d{1,8}-[0-9kK]{1}$', 'title': 'El RUT debe estar en el formato correcto (ej. 12345678-9).'}),
        }

    def clean_nombre(self):
        nombre = self.cleaned_data.get('nombre')
        if nombre and (len(nombre) < 2 or len(nombre) > 30):
            raise ValidationError("El nombre debe tener entre 2 y 30 caracteres.")
        return nombre

    def clean_apellido(self):
        apellido = self.cleaned_data.get('apellido')
        if apellido and (len(apellido) < 2 or len(apellido) > 30):
            raise ValidationError("El apellido debe tener entre 2 y 30 caracteres.")
        return apellido

    def clean_correo(self):
        correo = self.cleaned_data.get('correo')
        if correo:
            if len(correo) > 50:
                raise ValidationError("El correo no debe exceder los 50 caracteres.")
            if "@" not in correo:
                raise ValidationError("El correo debe contener el carácter '@'.")
        return correo

    def clean_direccion(self):
        direccion = self.cleaned_data.get('direccion')
        if direccion and (len(direccion) < 5 or len(direccion) > 30):
            raise ValidationError("La dirección debe tener entre 5 y 30 caracteres.")
        return direccion

    def clean_numero(self):
        numero = self.cleaned_data.get('numero')
        if not numero.isdigit() or not (9 <= len(numero) <= 10):
            raise ValidationError("El número debe contener entre 9 y 10 dígitos y solo números.")
        return numero

    def clean_rut(self):
        rut = self.cleaned_data.get('rut')
        if not rut or len(rut.split('-')) != 2:
            raise ValidationError("El RUT debe estar en el formato correcto (ej. 12345678-9).")
        return rut


class FormMascota(forms.ModelForm):
    class Meta:
        model = modelo_mas
        fields = ['id_usuario', 'nombre', 'tipo', 'raza', 'edad', 'fecha_nacimiento']
        widgets = {
            'id_usuario': forms.Select(attrs={'class': 'form-control'}),
            'nombre': forms.TextInput(attrs={'class': 'form-control', 'maxlength': 20}),
            'tipo': forms.TextInput(attrs={'class': 'form-control', 'maxlength': 20}),
            'raza': forms.TextInput(attrs={'class': 'form-control', 'maxlength': 20}),
            'edad': forms.NumberInput(attrs={'class': 'form-control', 'title': 'La edad no puede ser mayor que 99 ni negativa.'}),
            'fecha_nacimiento': forms.DateInput(attrs={'class': 'form-control', 'type': 'date', 'title': 'La fecha de nacimiento no puede ser futura.'}),
        }

    def clean_nombre(self):
        nombre = self.cleaned_data.get('nombre')
        if nombre and (len(nombre) < 2 or len(nombre) > 20):
            raise ValidationError("El nombre debe tener entre 2 y 20 caracteres.")
        return nombre

    def clean_tipo(self):
        tipo = self.cleaned_data.get('tipo')
        if tipo and len(tipo) > 20:
            raise ValidationError("El tipo debe tener un máximo de 20 caracteres.")
        return tipo

    def clean_raza(self):
        raza = self.cleaned_data.get('raza')
        if raza and len(raza) > 20:
            raise ValidationError("La raza debe tener un máximo de 20 caracteres.")
        return raza

    def clean_edad(self):
        edad = self.cleaned_data.get('edad')
        if edad is not None:
            if edad > 99:
                raise ValidationError("La edad no puede ser mayor que 99.")
            if edad < 0:
                raise ValidationError("La edad no puede ser negativa.")
        return edad

    def clean_fecha_nacimiento(self):
        fecha_nacimiento = self.cleaned_data.get('fecha_nacimiento')
        if fecha_nacimiento and fecha_nacimiento > timezone.now().date():
            raise ValidationError("La fecha de nacimiento no puede ser futura.")
        return fecha_nacimiento


class FormConsulta(forms.ModelForm):
    class Meta:
        model = Consulta
        fields = ['id_mascota', 'fecha', 'sucursal', 'veterinario', 'diagnostico']
        widgets = {
            'id_mascota': forms.Select(attrs={'class': 'form-control'}),
            'fecha': forms.DateInput(attrs={'class': 'form-control', 'type': 'date', 'title': 'La fecha de la consulta no puede ser futura.'}),
            'sucursal': forms.TextInput(attrs={'class': 'form-control', 'maxlength': 30}),
            'veterinario': forms.TextInput(attrs={'class': 'form-control', 'maxlength': 30}),
            'diagnostico': forms.TextInput(attrs={'class': 'form-control', 'maxlength': 100}),
        }

    def clean_fecha(self):
        fecha = self.cleaned_data.get('fecha')
        if fecha and fecha > timezone.now().date():
            raise ValidationError("La fecha de la consulta no puede ser futura.")
        return fecha

    def clean_sucursal(self):
        sucursal = self.cleaned_data.get('sucursal')
        if sucursal and len(sucursal) > 30:
            raise ValidationError("La sucursal debe tener un máximo de 30 caracteres.")
        return sucursal

    def clean_veterinario(self):
        veterinario = self.cleaned_data.get('veterinario')
        if veterinario and len(veterinario) > 30:
            raise ValidationError("El veterinario debe tener un máximo de 30 caracteres.")
        return veterinario

    def clean_diagnostico(self):
        diagnostico = self.cleaned_data.get('diagnostico')
        if diagnostico and len(diagnostico) > 100:
            raise ValidationError("El diagnóstico debe tener un máximo de 100 caracteres.")
        return diagnostico
