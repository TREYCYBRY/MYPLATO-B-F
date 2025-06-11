from django.contrib import admin
from .models import (
    CategoriaExtra,
    Extra,
    CategoriaPlato,
    Plato,
    CategoriaCliente,
    Usuario,
    Cliente,
    Rol,
    Empleado,
    Mesa,
    Pedido,
    Pago,
    PlatoPedido,
    ExtrasPlatoPedido,
    BebidaPedido,
    Bebida,
    ExtraPlato

)

# Register your models here.
admin.site.register(CategoriaExtra)
admin.site.register(Extra)
admin.site.register(Pedido)
admin.site.register(Rol)
admin.site.register(Empleado)
admin.site.register(Cliente)
admin.site.register(CategoriaCliente)
admin.site.register(CategoriaPlato)
admin.site.register(Usuario)
admin.site.register(Mesa)
admin.site.register(Plato)
admin.site.register(Pago)
admin.site.register(PlatoPedido)
admin.site.register(ExtrasPlatoPedido)
admin.site.register(Bebida)
admin.site.register(BebidaPedido)
admin.site.register(ExtraPlato)