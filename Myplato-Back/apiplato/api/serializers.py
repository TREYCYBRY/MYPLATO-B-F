
from rest_framework import serializers
from.import models
from .models import Empleado,Usuario
from django.contrib.auth import get_user_model

Usuario = get_user_model()

class CategoriaExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.CategoriaExtra
        fields='__all__'

class UnidadMedidaSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.UnidadMedida
        fields='__all__'

class ExtraSerializer(serializers.ModelSerializer):
    nombre_unidad=serializers.ReadOnlyField(source='unidad.sigla')
    nombre_categoria = serializers.ReadOnlyField(source='idcategoria_extra.nombre')
    class Meta:
        model= models.Extra
        fields='__all__'

class  CategoriaPlatoSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.CategoriaPlato
        fields='__all__'

class  PlatoSerializer(serializers.ModelSerializer):
    nombre_categoria = serializers.ReadOnlyField(source='idcategoria_plato.nombre')
    class Meta:
        model= models.Plato
        fields='__all__'

class  CategoriaClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.CategoriaCliente
        fields='__all__'

class  UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Usuario
        fields='__all__'

class  ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Cliente
        fields='__all__'

class  RolSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Rol
        fields='__all__'


class EmpleadoSerializer(serializers.ModelSerializer):
    usernombre= serializers.ReadOnlyField(source='user.username')
    gmail= serializers.ReadOnlyField(source='user.email')
    contra= serializers.ReadOnlyField(source='user.password')
    username = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Empleado
        fields = [
            'id', 'nombreEmp', 'apeEmp', 'dni', 'numeroTelefono',
            'direccion', 'turno', 'idrol',
            'username', 'email', 'password',
            'usernombre','gmail','contra'
        ]

    def create(self, validated_data):
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        user = Usuario.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        empleado = Empleado.objects.create(user=user, **validated_data)
        return empleado
class  MesaSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Mesa
        fields='__all__'

class  PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Pedido
        fields='__all__'
        read_only_fields = ['idcliente']

class  PlatoPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.PlatoPedido
        fields='__all__'

class  ExtrasPlatoPedidoSerializer(serializers.ModelSerializer):
    nombre_extra = serializers.ReadOnlyField(source='idextra.nombre')
    nombre_plato_pedido = serializers.ReadOnlyField(source='idplato_pedido.idplato.nombre')
    class Meta:
        model= models.ExtrasPlatoPedido
        fields='__all__'

class  PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Pago
        fields='__all__'

class  BebidaSerializer(serializers.ModelSerializer):
    nombre_unidad = serializers.ReadOnlyField(source='unidad.sigla')
    class Meta:
        model= models.Bebida
        fields='__all__'

class  BebidaPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.BebidaPedido
        fields='__all__'

class ExtraPlatoSerializer(serializers.ModelSerializer):
    plato_nombre = serializers.ReadOnlyField(source='id_plato.nombre')
    extra_nombre = serializers.ReadOnlyField(source='id_extra.nombre')
    class Meta:
        model= models.ExtraPlato
        fields = '__all__'

class AlmacenSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Almacen
        fields='__all__'

class StockComidaSerializer(serializers.ModelSerializer):
    extra = serializers.PrimaryKeyRelatedField(queryset=models.Extra.objects.all())
    almacen = serializers.PrimaryKeyRelatedField(queryset=models.Almacen.objects.all())
    extra_nombre = serializers.ReadOnlyField(source='extra.nombre')
    almacen_nombre = serializers.ReadOnlyField(source='almacen.nombre')

    class Meta:
        model = models.StockComida
        fields = '__all__'

class StockBebidaSerializer(serializers.ModelSerializer):
    bebida = serializers.PrimaryKeyRelatedField(queryset=models.Bebida.objects.all())
    almacen = serializers.PrimaryKeyRelatedField(queryset=models.Almacen.objects.all())
    bebida_nombre = serializers.ReadOnlyField(source='bebida.nombre')
    almacen_nombre = serializers.ReadOnlyField(source='almacen.nombre')

    class Meta:
        model = models.StockBebida
        fields = '__all__'
