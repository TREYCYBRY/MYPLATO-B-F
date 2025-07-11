import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { PlatoPedido } from '../../model/platoPedido.model';
import { Pedido } from '../../model/pedido.model';
import { Plato } from '../../model/plato.model';
import { extrasPlatoPedido } from '../../model/extrasPlatoPedido.model';

@Component({
  selector: 'app-plato-pedido',
  standalone: false,
  templateUrl: './plato-pedido.component.html',
  styleUrl: './plato-pedido.component.css',
  providers: [ApiService]
})
export class PlatoPedidoComponent implements OnInit {

  platoPedidos: PlatoPedido[] = [];

  visible = false;
  nuevoPlatoPedido = true;
  tituloDialogo = 'Nuevo PlatoPedido';
  platoPedidoDialogo: PlatoPedido = new PlatoPedido();

  pedidos: Pedido[] = [];
  platos: Plato[] = [];

  pedidoSeleccionado!: Pedido; 
  platoSeleccionado!: Plato;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.obtenerPlatoPedidos();
    this.obtenerPedidos();
    this.obtenerPlatos();
  }

  abrirDialogo(): void {
    this.visible = true;
    this.nuevoPlatoPedido = true;
    this.platoPedidoDialogo = new PlatoPedido();
  }

  editarPlatoPedido(pp: PlatoPedido): void {
    this.platoPedidoDialogo = { ...pp };
    this.pedidoSeleccionado = this.pedidos.find(p => p.id === pp.idpedido)!;
    this.platoSeleccionado  = this.platos.find(p => p.id === pp.idplato)!;
    this.nuevoPlatoPedido = false;
    this.visible = true;
    this.calcularPrecioFinal(pp.id!); // ✅ recalcular extras reales
  }

  eliminarPlatoPedido(pp: PlatoPedido): void {
    this.api.deletePlatoPedido(pp.id!.toString()).subscribe(() => this.obtenerPlatoPedidos());
  }

  guardarPlatoPedido(): void {
    if (!this.pedidoSeleccionado || !this.platoSeleccionado) return;

    this.platoPedidoDialogo.idpedido = this.pedidoSeleccionado.id!;
    this.platoPedidoDialogo.idplato = this.platoSeleccionado.id!;
    this.platoPedidoDialogo.precioBasePlato = this.platoSeleccionado.precio!;
    this.platoPedidoDialogo.precioFinalPlato = this.platoPedidoDialogo.precioBasePlato;

    const op = this.nuevoPlatoPedido
      ? this.api.postPlatoPedido(this.platoPedidoDialogo)
      : this.api.putPlatoPedido(this.platoPedidoDialogo);

    op.subscribe({
      next: (respuestaCreada) => {
        this.visible = false;

        // ✅ Si es nuevo, capturamos el ID del creado
        if (this.nuevoPlatoPedido && respuestaCreada?.id) {
          this.platoPedidoDialogo.id = respuestaCreada.id;
          this.calcularPrecioFinal(respuestaCreada.id);
        } else {
          this.calcularPrecioFinal(this.platoPedidoDialogo.id!);
        }

        this.obtenerPlatoPedidos();
      },
      error: err => {
        console.error("Error al guardar:", err.error);
        alert("Error al guardar PlatoPedido. Revisa los campos obligatorios.");
      }
    });
  }

  obtenerPlatoPedidos() {
  this.api.getPlatoPedido().subscribe(res => {
    this.platoPedidos = res;

    // Llama a calcularPrecioFinal para cada plato pedido
    for (const plato of this.platoPedidos) {
      this.calcularPrecioFinal(plato.id);
    }
  });
}


  private obtenerPedidos(): void {
    this.api.getPedidos().subscribe(res => this.pedidos = res);
    
  }

  private obtenerPlatos(): void {
    this.api.getPlatos().subscribe(res => this.platos = res);
  }

  onChangePlato() {
    if (this.platoSeleccionado) {
      this.platoPedidoDialogo.precioBasePlato = this.platoSeleccionado.precio;

      // Solo calcular extras si ya existe el PlatoPedido
      if (this.platoPedidoDialogo.id) {
        this.calcularPrecioFinal(this.platoPedidoDialogo.id);
      } else {
        this.platoPedidoDialogo.precioFinalPlato = this.platoSeleccionado.precio;
      }
    }
  }

  public calcularPrecioFinal(idPlatoPedido: number): void {
  this.api.getExtrasPorPlatoPedido().subscribe((extras: extrasPlatoPedido[]) => {
    const extrasFiltrados = extras.filter(ex => ex.idplato_pedido === idPlatoPedido);
    const totalExtras = extrasFiltrados.reduce((sum, e) => {
      const precio = parseFloat(String(e.precioPersonalizacion));
      return sum + (isNaN(precio) ? 0 : precio);
    }, 0);

    // Encuentra el platoPedido en la lista (NO en el diálogo)
    const plato = this.platoPedidos.find(p => p.id === idPlatoPedido);
    if (!plato) return;

    const precioBase = Number(plato.precioBasePlato) || 0;
    const precioFinal = Number((precioBase + totalExtras).toFixed(2));
    plato.precioFinalPlato = precioFinal;

    console.log(`🧮 ID: ${idPlatoPedido}, Base: ${precioBase}, Extras: ${totalExtras}, Final: ${precioFinal}`);

    // Actualiza en backend
    this.api.putPlatoPedido(plato).subscribe({
      next: () => {
        console.log("✅ Precio final actualizado en BD");
      },
      error: err => {
        console.error("❌ Error al actualizar:", err);
      }
    });
  });
}

}
