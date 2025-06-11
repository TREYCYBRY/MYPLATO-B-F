
from rest_framework import serializers
from.import models


class CategoriaExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.CategoriaExtra
        fields='__all__'

class ExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Extra
        fields='__all__'

class  CategoriaPlatoSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.CategoriaPlato
        fields='__all__'

class  PlatoSerializer(serializers.ModelSerializer):
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

class  EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Empleado
        fields='__all__'

class  MesaSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Mesa
        fields='__all__'

class  PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Pedido
        fields='__all__'

class  PlatoPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.PlatoPedido
        fields='__all__'

class  ExtrasPlatoPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.ExtrasPlatoPedido
        fields='__all__'

class  PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Pago
        fields='__all__'

class  BebidaSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Bebida
        fields='__all__'
class  BebidaPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.BebidaPedido
        fields='__all__'

class ExtraPlatoSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.ExtraPlato
        fields='__all__'
