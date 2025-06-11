from django.shortcuts import render
from.import models,serializers
from rest_framework import viewsets, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

class CategoriaExtraViewSet(viewsets.ModelViewSet):
    queryset = models.CategoriaExtra.objects.all()
    serializer_class = serializers.CategoriaExtraSerializer


class ExtraViewSet(viewsets.ModelViewSet):
    queryset = models.Extra.objects.all()
    serializer_class = serializers.ExtraSerializer


class CategoriaPlatoViewSet(viewsets.ModelViewSet):
    queryset = models.CategoriaPlato.objects.all()
    serializer_class = serializers.CategoriaPlatoSerializer


class PlatoViewSet(viewsets.ModelViewSet):
    queryset = models.Plato.objects.all()
    serializer_class = serializers.PlatoSerializer


class CategoriaClienteViewSet(viewsets.ModelViewSet):
    queryset = models.CategoriaCliente.objects.all()
    serializer_class = serializers.CategoriaClienteSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = models.Usuario.objects.all()
    serializer_class = serializers.UsuarioSerializer


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = models.Cliente.objects.all()
    serializer_class = serializers.ClienteSerializer
  

class RolViewSet(viewsets.ModelViewSet):
    queryset = models.Rol.objects.all()
    serializer_class = serializers.RolSerializer


class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = models.Empleado.objects.all()
    serializer_class = serializers.EmpleadoSerializer


class MesaViewSet(viewsets.ModelViewSet):
    queryset = models.Mesa.objects.all()
    serializer_class = serializers.MesaSerializer


class PedidoViewSet(viewsets.ModelViewSet):
    queryset = models.Pedido.objects.all()
    serializer_class = serializers.PedidoSerializer


class PlatoPedidoViewSet(viewsets.ModelViewSet):
    queryset = models.PlatoPedido.objects.all()
    serializer_class = serializers.PlatoPedidoSerializer


class ExtrasPlatoPedidoViewSet(viewsets.ModelViewSet):
    queryset = models.ExtrasPlatoPedido.objects.all()
    serializer_class = serializers.ExtrasPlatoPedidoSerializer
  

class PagoViewSet(viewsets.ModelViewSet):
    queryset = models.Pago.objects.all()
    serializer_class = serializers.PagoSerializer


class BebidaViewSet(viewsets.ModelViewSet):
    queryset = models.Bebida.objects.all()
    serializer_class = serializers.BebidaSerializer


class BebidaPedidoViewSet(viewsets.ModelViewSet):
    queryset = models.BebidaPedido.objects.all()
    serializer_class = serializers.BebidaPedidoSerializer
    
class ExtraPlatoViewSet(viewsets.ModelViewSet):
    queryset = models.ExtraPlato.objects.all()
    serializer_class = serializers.ExtraPlatoSerializer

class LoginToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })
