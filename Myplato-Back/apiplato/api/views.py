from rest_framework import viewsets
from . import models,serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.decorators import action,api_view,permission_classes
from rest_framework import permissions
from rest_framework.response import Response
from .models import Cliente, Usuario,Empleado
from rest_framework.decorators import api_view
from .serializers import EmpleadoSerializer
from rest_framework import status
from . import models, serializers as app_serializers
from .models import Cliente, Pedido
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Pedido, Cliente,Mesa,PlatoPedido,BebidaPedido,Bebida
from .serializers import PedidoSerializer,PlatoPedidoSerializer,BebidaPedidoSerializer
from django.utils import timezone

@api_view(['POST'])
def obtener_o_crear_pedido_activo(request):
    idcliente = request.data.get('idcliente')

    try:
        cliente = Cliente.objects.get(id=idcliente)
    except Cliente.DoesNotExist:
        return Response({'error': 'Cliente no encontrado'}, status=404)

    try:
        mesa = Mesa.objects.get(id=1)
    except Mesa.DoesNotExist:
        return Response({'error': 'Mesa con ID=1 no encontrada'}, status=404)

    # ✅ Buscar cualquier pedido activo
    pedido = Pedido.objects.filter(idcliente=cliente, estado=False).order_by('-id').first()

    # Si existe, se devuelve sin importar si tiene platos o bebidas
    if pedido:
        serializer = PedidoSerializer(pedido)
        return Response(serializer.data)

    # Si no hay, se crea uno nuevo
    pedido = Pedido.objects.create(
        idcliente=cliente,
        estado=False,
        cantidadTotalPlatos=0,
        cantidadTotalBebidas=0,
        montoTotal=0,
        idmesa=mesa,
        fecha=timezone.now().date()
    )

    serializer = PedidoSerializer(pedido)
    return Response(serializer.data)


@api_view(['POST'])
def confirmar_pedido(request, idpedido):
    try:
        pedido = Pedido.objects.get(id=idpedido)

        # Confirmar el pedido actual
        pedido.estado = True
        pedido.save()

        # ⚠️ Opcional: limpiar detalles si no deseas mantenerlos
        # pedido.platopedido_set.all().delete()
        # pedido.bebidapedido_set.all().delete()

        # Crear nuevo pedido vacío
        cliente = pedido.idcliente
        mesa = pedido.idmesa

        nuevo_pedido = Pedido.objects.create(
            idcliente=cliente,
            estado=False,
            cantidadTotalPlatos=0,
            cantidadTotalBebidas=0,
            montoTotal=0,
            idmesa=mesa,
            fecha=timezone.now().date()
        )

        # Serializar y devolver el nuevo pedido completo
        serializer = PedidoSerializer(nuevo_pedido)

        return Response({
    'mensaje': 'Pedido confirmado correctamente',
    'nuevoPedido': serializer.data,
    'nuevoPedidoId': nuevo_pedido.id  # 👈 Añade esto
})


    except Pedido.DoesNotExist:
        return Response({'error': 'Pedido no encontrado'}, status=404)
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
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            print(" Errores:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class MesaViewSet(viewsets.ModelViewSet):
    queryset = models.Mesa.objects.all()
    serializer_class = serializers.MesaSerializer


class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = app_serializers.PedidoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        try:
            cliente = Cliente.objects.get(user=self.request.user)
            serializer.save(idcliente=cliente)
        except Cliente.DoesNotExist:
            raise serializers.ValidationError("El usuario autenticado no está vinculado a un cliente.")

    @action(detail=True, methods=['put'], url_path='confirmar')
    def confirmar(self, request, pk=None):
        try:
            pedido = Pedido.objects.get(pk=pk)
            pedido.estado = True
            pedido.save()
            return Response({'mensaje': 'Pedido confirmado'}, status=status.HTTP_200_OK)
        except Pedido.DoesNotExist:
            return Response({'error': 'Pedido no encontrado'}, status=status.HTTP_404_NOT_FOUND)
class PlatoPedidoViewSet(viewsets.ModelViewSet):
    serializer_class = PlatoPedidoSerializer

    def get_queryset(self):
        idpedido = self.request.query_params.get('idpedido')
        if idpedido:
            return PlatoPedido.objects.filter(idpedido=idpedido)
        return PlatoPedido.objects.all()  # 🔁 cambia esto

    def create(self, request, *args, **kwargs):
        idpedido = request.data.get('idpedido')
        idplato = request.data.get('idplato')

        if not idpedido or not idplato:
            return Response({'error': 'Faltan campos obligatorios'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Buscar si ya existe uno con el mismo plato y pedido
            plato_existente = PlatoPedido.objects.get(idpedido=idpedido, idplato=idplato)
            plato_existente.cantidad += request.data.get('cantidad', 1)
            plato_existente.save()

            serializer = self.get_serializer(plato_existente)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except PlatoPedido.DoesNotExist:
            # Si no existe, se crea normalmente
            return super().create(request, *args, **kwargs)
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
    serializer_class = BebidaPedidoSerializer

    def get_queryset(self):
        id_pedido = self.request.query_params.get('id_pedido')
        solo_activos = self.request.query_params.get('solo_activos')  # 👈 nuevo parámetro opcional

        if id_pedido:
            queryset = BebidaPedido.objects.filter(id_pedido=id_pedido)
            if solo_activos == "true":
                queryset = queryset.filter(id_pedido__estado=False)  # 👈 solo si se pide explícitamente
            return queryset

        # 🔁 Para mantenimiento, devolver todo
        return BebidaPedido.objects.all()

    def create(self, request, *args, **kwargs):
        id_pedido = request.data.get('id_pedido')
        id_bebida = request.data.get('id_bebida')

        bebida_existente = BebidaPedido.objects.filter(
            id_pedido=id_pedido,
            id_bebida=id_bebida
        ).first()

        if bebida_existente:
            bebida = Bebida.objects.get(id=id_bebida)
            bebida_existente.cantidad += 1
            bebida_existente.precioFinal = bebida.precio * bebida_existente.cantidad
            bebida_existente.save()
            return Response(BebidaPedidoSerializer(bebida_existente).data, status=status.HTTP_200_OK)

        return super().create(request, *args, **kwargs)


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
    def consultar_stockComida(self, request):
        extra_id = request.query_params.get('extra_id')
        almacen_id = request.query_params.get('almacen_id')

        stockComida = models.StockComida.objects.get(extra_id=extra_id, almacen_id=almacen_id)
        serializer = serializers.StockComidaSerializer(stockComida)

        return Response(serializer.data)
    
    
class StockBebidaViewSet(viewsets.ModelViewSet):
    queryset = models.StockBebida.objects.all()  # <-- ESTA LÍNEA ES NECESARIA
    serializer_class = serializers.StockBebidaSerializer

    @action(detail=False, methods=['get'], url_path='consulta')
    def consultar_stockBedida(self, request):
        bebida_id = request.query_params.get('bebida_id')
        almacen_id = request.query_params.get('almacen_id')

        stockBedida = models.StockBebida.objects.get(bebida_id=bebida_id, almacen_id=almacen_id)
        serializer = serializers.StockBebidaSerializer(stockBedida)

        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def registro_cliente(request):
    data = request.data
    try:
        user = Usuario.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password']
        )
        Cliente.objects.create(
            user=user,
            nombre=data['nombre'],
            apellidos=data['apellidos'],
            dni=data['dni'],
            idcategoria_cliente_id=1
        )
        return Response({'mensaje': 'Cliente registrado exitosamente'})
    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['POST'])
def login_cliente(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        if Cliente.objects.filter(user=user).exists():
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Este usuario no es cliente'}, status=403)
    return Response({'error': 'Credenciales incorrectas'}, status=400)