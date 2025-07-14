import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { mesa } from '../../model/mesa.model';
import { cliente } from '../../model/cliente.model';
import { Pedido } from '../../model/pedido.model';


@Component({
  selector: 'app-pedido',
  standalone: false,
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css',
  providers: [ApiService]
})
export class PedidoComponent {
  constructor(private api: ApiService) {}
  pedidos: Pedido[];
  visible: boolean = false;
  nuevoPedido: boolean = true;
  pedidoDialogo: Pedido = new Pedido();
  tituloDialogo: string = "Nuevo Pedido";

  clientes: cliente[];
  mesas: mesa[];
  clienteSeleccionado: cliente;
  mesaSeleccionada: mesa;
  
  ngOnInit() {
    this.obtenerPedidos();
    this.obtenerClientes();
    this.obtenerMesas();
  }

  abrirDialogo() {
    this.visible = true;
    this.nuevoPedido = true;
    this.pedidoDialogo = new Pedido();
  }

  obtenerPedidos() {
    this.api.getPedidos().subscribe(res => {
      this.pedidos = res;
    });
  }

  obtenerClientes() {
  this.api.getClientes().subscribe(res => {
  this.clientes = res;
  });
  }

  obtenerMesas() {
     this.api.getMesas().subscribe(res => {
       this.mesas = res;
     });
   }

  editarPedido(ped: Pedido) {
    this.pedidoDialogo = { ...ped };
    this.nuevoPedido = false;
    this.visible = true;
  }

  eliminarPedido(ped: Pedido) {
    this.api.deletePedido(ped.id.toString()).subscribe(() => {
      this.obtenerPedidos();
    });
  }

  guardarPedido() {
  
  this.pedidoDialogo.estado=this.pedidoDialogo.estado ? true : false; // Asegurar que estado sea booleano
     console.log('Guardando pedido:', this.pedidoDialogo); // 👈

    if (this.nuevoPedido) {
      this.api.postPedido(this.pedidoDialogo).subscribe(res => {
        this.obtenerPedidos();
      });
    } else {
      this.api.putPedido(this.pedidoDialogo).subscribe(res => {
        this.obtenerPedidos();
      });
    }

    this.visible=false;
}
}