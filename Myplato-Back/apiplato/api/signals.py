from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import PlatoPedido, BebidaPedido, ExtrasPlatoPedido

# Función auxiliar para actualizar el precioFinalPlato de un PlatoPedido
def actualizar_precio_platopedido(plato_pedido):
    total_extras = sum(extra.precioPersonalizacion for extra in plato_pedido.extrasplatopedido_set.all())
    plato_pedido.precioFinalPlato = plato_pedido.precioBasePlato + total_extras
    plato_pedido.save(update_fields=['precioFinalPlato'])

# Cuando se guarda o elimina un PlatoPedido, se actualiza el total del pedido
@receiver([post_save, post_delete], sender=PlatoPedido)
def actualizar_total_pedido_por_plato(sender, instance, **kwargs):
    if instance.idpedido:
        instance.idpedido.actualizar_totales()

# Cuando se guarda o elimina una BebidaPedido, se actualiza el total del pedido
@receiver([post_save, post_delete], sender=BebidaPedido)
def actualizar_total_pedido_por_bebida(sender, instance, **kwargs):
    if instance.id_pedido:
        instance.id_pedido.actualizar_totales()

# Cuando se guarda un extra, se recalcula el precio final del plato
@receiver(post_save, sender=ExtrasPlatoPedido)
def recalcular_precio_final_extra_guardado(sender, instance, **kwargs):
    actualizar_precio_platopedido(instance.idplato_pedido)

# Cuando se elimina un extra, también se recalcula el precio
@receiver(post_delete, sender=ExtrasPlatoPedido)
def recalcular_precio_final_extra_eliminado(sender, instance, **kwargs):
    actualizar_precio_platopedido(instance.idplato_pedido)

# Cuando se crea un PlatoPedido, se calcula su precioFinalPlato
@receiver(post_save, sender=PlatoPedido)
def calcular_precio_final(sender, instance, created, **kwargs):
    if created:
        actualizar_precio_platopedido(instance)
