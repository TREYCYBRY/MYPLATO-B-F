import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Plato } from '../../model/plato.model';
import { PlatoPedido } from '../../model/platoPedido.model';
import { Pedido } from '../../model/pedido.model';
import { bebidaPedido } from '../../model/bebidaPedido.model';
import { bebida } from '../../model/bebida.model';

@Component({
  selector: 'app-bandeja',
  standalone: false,
  templateUrl: './bandeja.component.html',
  styleUrl: './bandeja.component.css',
  providers: [ApiService]
})
export class BandejaComponent {
  constructor(private api: ApiService) {}

  platos: Plato[] = [];
  bebidas: bebida[] = [];

  bandeja: Plato[] = [];
  bandejaBebidas: bebida[] = [];

  total: number = 0;

  resumenVisible: boolean = false;
  pedidoResumen: (Plato | bebida)[] = [];

  ngOnInit() {
    this.api.getPlatos().subscribe(res => this.platos = res);
    this.api.getBebida().subscribe(res => this.bebidas = res);
  }

  agregarPlato(plato: Plato) {
    this.bandeja.push(plato);
    this.calcularTotal();
  }

  eliminarPlato(index: number) {
    this.bandeja.splice(index, 1);
    this.calcularTotal();
  }

  agregarBebida(bebida: bebida) {
    this.bandejaBebidas.push(bebida);
    this.calcularTotal();
  }

  eliminarBebida(index: number) {
    this.bandejaBebidas.splice(index, 1);
    this.calcularTotal();
  }

  calcularTotal() {
    const totalPlatos = this.bandeja.reduce((acc, p) => acc + Number(p.precio), 0);
    const totalBebidas = this.bandejaBebidas.reduce((acc, b) => acc + Number(b.precio), 0);
    this.total = totalPlatos + totalBebidas;
  }

  confirmarPedido() {
    const pedido: Pedido = {
      id: 0,
      cantidadTotalPlatos: this.bandeja.length,
      cantidadTotalBebidas: this.bandejaBebidas.length,
      montoTotal: this.total,
      fecha: new Date(), // esto es correcto para tipo Date
      idcliente: 1, // ← actualizar según usuario logueado
      idmesa: 1     // ← actualizar según contexto
    };

    this.api.postPedido(pedido).subscribe(ped => {
      // Enviar platos
      this.bandeja.forEach(plato => {
        const detalle: PlatoPedido = {
          id: 0,
          idpedido: ped.id,
          idplato: plato.id,
          precioBasePlato: plato.precio,
          precioFinalPlato: plato.precio,
          tipoPedido: 'Normal'
        };
        this.api.postPlatoPedido(detalle).subscribe();
      });

      // Enviar bebidas
      this.bandejaBebidas.forEach(bebida => {
        const detalleBebida: bebidaPedido = {
          id: 0,
          id_bebida: bebida.id,
          id_pedido: ped.id,
          cantidad: 1,
          precioFinal: bebida.precio
        };
        this.api.postbebidaPedidos(detalleBebida).subscribe();
      });

      alert("✅ Pedido realizado exitosamente");
      this.bandeja = [];
      this.bandejaBebidas = [];
      this.total = 0;
    });
  }

  mostrarResumen() {
    this.pedidoResumen = [...this.bandeja, ...this.bandejaBebidas]; // copia segura
    this.resumenVisible = true;
  }

  confirmarDesdeResumen() {
    this.confirmarPedido();
    this.resumenVisible = false;
  }
}
