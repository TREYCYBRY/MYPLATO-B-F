from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager
from django.conf import settings

class CategoriaExtra(models.Model):
    nombre = models.CharField(max_length=50)
    cantidadLimite = models.IntegerField()

    def __str__ (self):
        return self.nombre

class Extra(models.Model):
    nombre = models.CharField(max_length=50)
    precioporPorcion = models.DecimalField(max_digits=6, decimal_places=2)
    descripcion = models.CharField(max_length=50)
    cantidad_Disponible= models.IntegerField()
    idcategoria_extra = models.ForeignKey(CategoriaExtra, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class CategoriaPlato(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=50)
    def __str__(self):
        return self.nombre

class Plato(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=50)
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    personalizable = models.BooleanField(default=False)
    idcategoria_plato = models.ForeignKey(CategoriaPlato, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class CategoriaCliente(models.Model):
    fidelidad = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=50)
    beneficio = models.CharField(max_length=50)

    def __str__(self):
        return self.fidelidad

class Cliente(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    dni = models.CharField(max_length=8)
    idcategoria_cliente = models.ForeignKey(CategoriaCliente, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class Rol(models.Model):
    cargo = models.CharField(max_length=50)

    def __str__(self):
        return self.cargo

class Empleado(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nombreEmp = models.CharField(max_length=50)
    apeEmp = models.CharField(max_length=50)
    dni=models.CharField(max_length=8)
    numeroTelefono = models.CharField(max_length=15)
    direccion = models.CharField(max_length=50)
    turno= models.CharField(max_length=50)
    idrol = models.ForeignKey(Rol, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.nombreEmp} {self.apeEmp}'

class Mesa(models.Model):
    numeroMesa = models.CharField(max_length=10)
    descripcion = models.CharField(max_length=30)
    idmozo=models.ForeignKey(Empleado,on_delete=models.CASCADE)

    def __str__(self):
        return self.numeroMesa

class Pedido(models.Model):
    cantidadTotalPlatos = models.IntegerField()
    cantidadTotalBebidas= models.IntegerField()
    montoTotal = models.DecimalField(max_digits=8, decimal_places=2)
    fecha = models.DateField()
    idcliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    idmesa = models.ForeignKey(Mesa, on_delete=models.CASCADE)

    def __str__(self):
        return f'Pedido {self.id} - Cliente {self.idcliente.nombre}'

class PlatoPedido(models.Model):
    idpedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    idplato = models.ForeignKey(Plato, on_delete=models.CASCADE)
    precioBasePlato = models.DecimalField(max_digits=6, decimal_places=2)
    precioFinalPlato = models.DecimalField(max_digits=6, decimal_places=2)
    tipoPedido = models.CharField(max_length=50)

    def __str__(self):
        return f'Pedido {self.idpedido.id} - Plato {self.idplato.nombre}'


class ExtrasPlatoPedido(models.Model):
    idextra = models.ForeignKey(Extra, on_delete=models.CASCADE)
    idplato_pedido = models.ForeignKey(PlatoPedido, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precioPersonalizacion = models.DecimalField(max_digits=6, decimal_places=2)
    def __str__(self):
        return (
        f'Extra {self.idextra.nombre} - '
        f'Pedido {self.idplato_pedido.idpedido.id} - '
        f'{self.idplato_pedido.idplato.nombre} ID {self.idplato_pedido.id}'
        )


class Pago(models.Model):
    montoPagado = models.DecimalField(max_digits=8, decimal_places=2)
    montoRestante = models.DecimalField(max_digits=8, decimal_places=2)
    montoTotal=models.DecimalField(max_digits=8, decimal_places=2)
    fecha = models.DateField()
    metodo = models.CharField(max_length=50)
    idpedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    estado = models.CharField(max_length=50)
    def __str__(self):
        return f'Pago {self.id} - {self.montoRestante}'
    
class Bebida(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.nombre
    
class BebidaPedido(models.Model):
    id_bebida = models.ForeignKey(Bebida, on_delete=models.CASCADE)
    id_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precioFinal = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.cantidad}x {self.bebida.nombre} - Pedido {self.pedido.id}"

class UsuarioManager(BaseUserManager):
    def create_user(self,username,email,password=None,**extra_fields):
        #Creamos un usario en base a nombre de usuario, contraseña y correo
        if not email:
            raise ValueError('Correo es obligatorio')
        email = self.normalize_email(email)
        user = self.model(username=username,email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,username,email,password=None,**extra_fields):
        #Creamos un superusario en base a nombre de usuario, contraseña y correo
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El campo staff debe ser True')
        
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El campo superusuario debe ser True')
        
        return self.create_user(username,email,password,**extra_fields)
    
class Usuario(AbstractUser):

    objects=UsuarioManager()
    
    def __str__(self):
        return self.username

class ExtraPlato(models.Model):
    id_plato = models.ForeignKey(Plato, on_delete=models.CASCADE)
    id_extra = models.ForeignKey(Extra, on_delete=models.CASCADE)
    cantidadPorciones = models.IntegerField()

    def __str__(self):
        return f'{self.plato.nombre} - {self.extra.nombre} ({self.cantidadPorciones} porciones)'