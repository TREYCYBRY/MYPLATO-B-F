import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Pago } from '../../model/pago.model';
import { Pedido } from '../../model/pedido.model';


@Component({
  selector: 'app-pago',
  standalone: false,
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css',
  providers: [ApiService]
})
export class PagoComponent {
  constructor(private api: ApiService) {}

  pagos: Pago[] = [];
  visible = false;
  nuevoPago = true;
  //pagoDialogo: Pago = new Pago();

  pagoDialogo: Pago = {
  id: 0,
  montoPagado: 0,
  montoRestante: 0,
  montoTotal: 0,
  fecha: '',
  metodo: '',
  idpedido: 1,
  estado: ''
  };


  tituloDialogo = 'Nuevo Pago';
  pedidos: Pedido[] = [];
  pedidoSeleccionado: Pedido;
  metodos = [
    { label: 'Billetera Virtual', value: 'Billetera Virtual' },
    { label: 'Tarjeta', value: 'Tarjeta' },
    { label: 'Efectivo', value: 'Efectivo' }
  ];



  ngOnInit() {
    this.obtenerPagos();
    this.obtenerPedidos();
  }

  abrirDialogo() {
    this.visible = true;
    this.nuevoPago = true;
    this.pagoDialogo = new Pago();
  }

  obtenerPagos() {
    this.api.getPagos().subscribe(res => this.pagos = res);
  }

  obtenerPedidos() {
    this.api.getPedidos().subscribe(res => this.pedidos = res);
  }

  editarPago(pago: Pago) {
    this.pagoDialogo = { ...pago };
    this.pedidoSeleccionado = this.pedidos.find(p => p.id === pago.idpedido)!;
    this.nuevoPago = false;
    this.visible = true;
  }

  eliminarPago(pago: Pago) {
    this.api.deletePago(pago.id.toString()).subscribe(() => this.obtenerPagos());
  }

  guardarPago() {
    this.pagoDialogo.idpedido = this.pedidoSeleccionado.id;

    if (this.nuevoPago) {
      this.api.postPago(this.pagoDialogo).subscribe(() => this.obtenerPagos());
    } else {
      this.api.putPago(this.pagoDialogo).subscribe(() => this.obtenerPagos());
    }

    this.visible = false;
  }

}