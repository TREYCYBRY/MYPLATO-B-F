from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager
from django.conf import settings
from django.db.models import Sum
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


class CategoriaExtra(models.Model):
    nombre = models.CharField(max_length=50)
    cantidadLimite = models.IntegerField()

    def __str__ (self):
        return self.nombre

class UnidadMedida(models.Model):
    unidad = models.CharField(max_length=20)
    sigla = models.CharField(max_length=5)

    def __str__(self):
        return f"{self.unidad} ({self.sigla})"

class Extra(models.Model):
    nombre = models.CharField(max_length=50)
    precioporPorcion = models.DecimalField(max_digits=6, decimal_places=2)
    descripcion = models.CharField(max_length=50)
    idcategoria_extra = models.ForeignKey(CategoriaExtra, on_delete=models.CASCADE)
    unidad = models.ForeignKey(UnidadMedida, on_delete=models.CASCADE,null=True,blank=True)
    imagen= models.ImageField(upload_to='extras/', null=True, blank=True)

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
    imagen= models.ImageField(upload_to='platos/', null=True, blank=True)

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
    cantidadTotalPlatos = models.IntegerField(default=0)
    cantidadTotalBebidas = models.IntegerField(default=0)
    montoTotal = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    fecha = models.DateField(auto_now_add=True)
    idcliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    idmesa = models.ForeignKey(Mesa, on_delete=models.CASCADE,default=1)
    estado = models.BooleanField(default=False)  # True si el pedido está listo para servir, False si está en preparación   

    def __str__(self):
        return f'Pedido {self.id} - Cliente {self.idcliente.nombre}'
    def actualizar_totales(self):
        from .models import PlatoPedido, BebidaPedido

        platos = PlatoPedido.objects.filter(idpedido=self)
        bebidas = BebidaPedido.objects.filter(id_pedido=self)

        self.cantidadTotalPlatos = platos.count()
        self.cantidadTotalBebidas = sum(b.cantidad for b in bebidas)
        
        total_platos = sum(p.precioFinalPlato for p in platos)
        total_bebidas = sum(b.precioFinal for b in bebidas)

        self.montoTotal = total_platos + total_bebidas
        self.save()
class PlatoPedido(models.Model):
    idpedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    idplato = models.ForeignKey(Plato, on_delete=models.CASCADE)
    precioBasePlato = models.DecimalField(max_digits=6, decimal_places=2)
    precioFinalPlato = models.DecimalField(max_digits=6, decimal_places=3)
    tipoPedido = models.CharField(max_length=50,default='Para servir')

    def __str__(self):
        return f'Pedido {self.idpedido.id} - Plato {self.idplato.nombre}'

    def save(self, *args, **kwargs):
        if self.idplato:
            self.precioBasePlato = self.idplato.precio
        super().save(*args, **kwargs)


class ExtrasPlatoPedido(models.Model):
    idextra = models.ForeignKey(Extra, on_delete=models.CASCADE)
    idplato_pedido = models.ForeignKey(
        PlatoPedido, 
        on_delete=models.CASCADE, 
        related_name='extrasplatopedido_set'  # ✅ Esto es lo que te faltaba
    )
    cantidad = models.IntegerField()
    precioPersonalizacion = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.idextra} x{self.cantidad}"


class Pago(models.Model):
    montoPagado = models.DecimalField(max_digits=8, decimal_places=2)
    montoRestante = models.DecimalField(max_digits=8, decimal_places=2)
    montoTotal=models.DecimalField(max_digits=8, decimal_places=2)
    fecha = models.DateField(auto_now_add=True)

    METODO_CHOICES = [
        ('Billetera Virtual', 'Billetera Virtual'),
        ('Tarjeta', 'Tarjeta'),
        ('Efectivo', 'Efectivo')
    ]

    metodo = models.CharField(max_length=50, choices=METODO_CHOICES, default='Efectivo')
    idpedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    estado = models.CharField(max_length=50)
    def _str_(self):
        return f'Pago {self.id} - {self.montoRestante}'
    
class Bebida(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    unidad = models.ForeignKey(UnidadMedida, on_delete=models.CASCADE,null=True,blank=True)
    imagen= models.ImageField(upload_to='bebidas/', null=True, blank=True)

    def __str__(self):
        return self.nombre
    
class BebidaPedido(models.Model):
    id_bebida = models.ForeignKey(Bebida, on_delete=models.CASCADE)
    id_pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precioFinal = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.cantidad}x {self.bebida.nombre} - Pedido {self.pedido.id}"


class ExtraPlato(models.Model):
    id_plato = models.ForeignKey(Plato, on_delete=models.CASCADE)
    id_extra = models.ForeignKey(Extra, on_delete=models.CASCADE)
    cantidadPorciones = models.IntegerField()

    def __str__(self):
        return f'{self.plato.nombre} - {self.extra.nombre} ({self.cantidadPorciones} porciones)'
    
class Almacen(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class StockComida(models.Model):
    extra = models.ForeignKey(Extra, on_delete=models.CASCADE)
    almacen = models.ForeignKey(Almacen, on_delete=models.CASCADE)
    cantidad = models.PositiveBigIntegerField(default=0)

    class Meta:
        unique_together = ['extra', 'almacen']


class StockBebida(models.Model):
    bebida = models.ForeignKey(Bebida, on_delete=models.CASCADE)
    almacen = models.ForeignKey(Almacen, on_delete=models.CASCADE)
    cantidad = models.PositiveBigIntegerField(default=0)

    class Meta:
        unique_together = ['bebida', 'almacen']

