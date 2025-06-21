from rest_framework import viewsets
from . import models,serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.decorators import action
from rest_framework import permissions
from rest_framework.response import Response

class CategoriaExtraViewSet(viewsets.ModelViewSet):
    queryset = models.CategoriaExtra.objects.all()
    serializer_class = serializers.CategoriaExtraSerializer

class UnidadMedidaViewSet(viewsets.ModelViewSet):
    queryset = models.UnidadMedida.objects.all()
    serializer_class = serializers.UnidadMedidaSerializer

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


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        """api_key = request.headers.get('x-api-key')
        if api_key != settings.API_KEY:
            return Response({"error": "API Key Inválida"}, status=403)"""

        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            return Response({"error": "Credenciales Inválidas"}, status=400)
        

class AlmacenViewSet(viewsets.ModelViewSet):
    queryset = models.Almacen.objects.all()
    serializer_class = serializers.AlmacenSerializer
    permission_classes = [permissions.AllowAny]

class StockComidaViewSet(viewsets.ModelViewSet):
    queryset = models.StockComida.objects.all()  # <-- ESTA LÍNEA ES NECESARIA
    serializer_class = serializers.StockComidaSerializer

    @action(detail=False, methods=['get'], url_path='consulta')
    def consultar_stockC(self, request):
        extra_id = request.query_params.get('extra_id')
        almacen_id = request.query_params.get('almacen_id')

        stockC = models.Stock.objects.get(extra_id=extra_id, almacen_id=almacen_id)
        serializer = serializers.StockSerializer(stockC)

        return Response(serializer.data)
    
    
class StockBebidaViewSet(viewsets.ModelViewSet):
    queryset = models.StockBebida.objects.all()  # <-- ESTA LÍNEA ES NECESARIA
    serializer_class = serializers.StockBebidaSerializer

    @action(detail=False, methods=['get'], url_path='consulta')
    def consultar_stockB(self, request):
        bebida_id = request.query_params.get('bebida_id')
        almacen_id = request.query_params.get('almacen_id')

        stockB = models.Stock.objects.get(bebida_id=bebida_id, almacen_id=almacen_id)
        serializer = serializers.StockSerializer(stockB)

        return Response(serializer.data)
