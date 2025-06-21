from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('unidadDeMedida', views.UnidadMedidaViewSet)
router.register('categoriaExtra', views.CategoriaExtraViewSet)
router.register('extra', views.ExtraViewSet)
router.register('categoriaPlato', views.CategoriaPlatoViewSet)
router.register('platos', views.PlatoViewSet)
router.register('categoriaCliente', views.CategoriaClienteViewSet)
router.register('usuarios', views.UsuarioViewSet)
router.register('clientes', views.ClienteViewSet)
router.register('roles', views.RolViewSet)
router.register('empleados', views.EmpleadoViewSet)
router.register('mesas', views.MesaViewSet)
router.register('pedidos', views.PedidoViewSet)
router.register('platoPedido', views.PlatoPedidoViewSet)
router.register('extrasPlatoPedido', views.ExtrasPlatoPedidoViewSet)
router.register('pagos', views.PagoViewSet)
router.register('bebidas', views.BebidaViewSet)
router.register('bebidaPedido', views.BebidaPedidoViewSet)
router.register('extraPlato', views.ExtraPlatoViewSet)
router.register('almacen', views.AlmacenViewSet)
router.register('stockComida', views.StockComidaViewSet)
router.register('stockBebida', views.StockBebidaViewSet)


urlpatterns = [
    path('',include(router.urls)),
    path('login/',views.LoginView.as_view(),name='login')
] 
