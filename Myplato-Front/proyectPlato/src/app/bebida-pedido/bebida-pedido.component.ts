import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { bebidaPedido } from '../../model/bebidaPedido.model';
import { bebida } from '../../model/bebida.model';
import { Pedido } from '../../model/pedido.model';
@Component({
  selector: 'app-bebida-pedido',
  standalone: false,
  templateUrl: './bebida-pedido.component.html',
  styleUrl: './bebida-pedido.component.css',
  providers: [ApiService]
})
export class BebidaPedidoComponent {
  constructor(private api: ApiService) {}

  bebidaPedidos: bebidaPedido[] = [];
  visible = false;
  nuevoRegistro = true;
  bebidaPedidoDialogo: bebidaPedido = new bebidaPedido();
  tituloDialogo: string = "Nueva Bebida Pedido";

  bebidas: bebida[] = [];
  bebidaSeleccionada: bebida;


  pedidos: Pedido[] = [];
  pedidoSeleccionado: Pedido;

  ngOnInit() {
   
    this.obtenerBebidaPedidos();
    this.obtenerBebidas();
    this.obtenerPedidos();
  }

  abrirDialogo() {
    this.visible = true;
    this.nuevoRegistro = true;
    this.bebidaPedidoDialogo = new bebidaPedido();
  }

  obtenerBebidaPedidos() {
    this.api.getbebidaPedidos().subscribe(res => {
      this.bebidaPedidos = res;
    });
  }

  obtenerBebidas() {
    this.api.getBebida().subscribe(res => {
      this.bebidas = res;
    });
  }

  obtenerPedidos() {
    this.api.getPedidos().subscribe(res => {
      this.pedidos = res;
    });
  }

  editarBebidaPedidos(beb: bebidaPedido) {
    this.bebidaPedidoDialogo = { ...beb };
    this.nuevoRegistro = false;
    this.visible = true;
    this.pedidoSeleccionado = this.pedidos.find(t => t.id === this.bebidaPedidoDialogo.id_pedido)!;
    this.bebidaSeleccionada = this.bebidas.find(t => t.id === this.bebidaPedidoDialogo.id_bebida)!;
  }

  eliminarBebidaPedidos(beb: bebidaPedido) {
    this.api.deletebebidaPedidos(beb.id.toString()).subscribe(() => {
      this.obtenerBebidaPedidos();
    });
  }

  guardarBebidaPedidos() {
    this.bebidaPedidoDialogo.id_pedido = this.pedidoSeleccionado.id;
    this.bebidaPedidoDialogo.id_bebida = this.bebidaSeleccionada.id;

    if (this.nuevoRegistro) {
      this.api.postbebidaPedidos(this.bebidaPedidoDialogo).subscribe(() => {
        this.obtenerBebidaPedidos();
      });
    } else {
      this.api.putbebidaPedidos(this.bebidaPedidoDialogo).subscribe(() => {
        this.obtenerBebidaPedidos();
      });
    }
    this.visible = false;
  }
  calcularPrecioFinal() {
  if (this.bebidaSeleccionada && this.bebidaPedidoDialogo.cantidad != null) {
    const precioUnitario = this.bebidaSeleccionada.precio || 0;
    const cantidad = this.bebidaPedidoDialogo.cantidad;
    this.bebidaPedidoDialogo.precioFinal = precioUnitario * cantidad;
  }
}

}
