import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Plato } from '../../model/plato.model';
import { PlatoPedido } from '../../model/platoPedido.model';
import { Pedido } from '../../model/pedido.model';

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
  bandeja: Plato[] = [];
  total: number = 0;

  resumenVisible: boolean = false;
  pedidoResumen: Plato[] = [];

  ngOnInit() {
    this.api.getPlatos().subscribe(res => this.platos = res);
  }

  agregarPlato(plato: Plato) {
    this.bandeja.push(plato);
    this.calcularTotal();
  }

  eliminarPlato(index: number) {
    this.bandeja.splice(index, 1);
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.bandeja.reduce((acc, p) => acc + Number(p.precio), 0);
  }

  confirmarPedido() {
    const pedido: Pedido = {
      id: 0,
      cantidadTotalPlatos: this.bandeja.length,
      cantidadTotalBebidas: 0,
      montoTotal: this.total,
      fecha: new Date(), // esto es correcto para tipo Date
      idcliente: 1, // ← actualizar según usuario logueado
      idmesa: 1     // ← actualizar según contexto
    };

    this.api.postPedido(pedido).subscribe(ped => {
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
      alert("✅ Pedido realizado exitosamente");
      this.bandeja = [];
      this.total = 0;
    });
  }

  mostrarResumen() {
    this.pedidoResumen = [...this.bandeja]; // copia segura
    this.resumenVisible = true;
  }

  confirmarDesdeResumen() {
    this.confirmarPedido();
    this.resumenVisible = false;
  }
}
