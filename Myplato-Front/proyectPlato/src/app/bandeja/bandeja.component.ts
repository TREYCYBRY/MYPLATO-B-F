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
  constructor(private api: ApiService){}

  platos: Plato[] = [];
  bandeja: Plato[] = [];
  total = 0;

  ngOnInit() {
    this.api.getPlatos().subscribe(res => this.platos = res);
  }

  agregarPlato(plato: Plato) {
    this.bandeja.push(plato);
    this.total += plato.precio;
  }

  eliminarPlato(index: number) {
    this.total -= this.bandeja[index].precio;
    this.bandeja.splice(index, 1);
  }

  confirmarPedido() {
    const pedido: Pedido = {
      id: 0,
      cantidadTotalPlatos: this.bandeja.length,
      cantidadTotalBebidas: 0,
      montoTotal: this.total,
      fecha: new Date(),
      idcliente: 1, // <- cambiar según sesión
      idmesa: 1 // <- asignar según contexto
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
      alert("Pedido realizado exitosamente");
      this.bandeja = [];
      this.total = 0;
    });
    }

    // NUEVO: controlar diálogo de resumen
    resumenVisible: boolean = false;
    pedidoResumen: Plato[] = [];
    totalResumen: number = 0;

    // Mostrar resumen
    mostrarResumen() {
      this.pedidoResumen = [...this.bandeja]; // copia segura
      this.totalResumen = this.bandeja.reduce((acc, p) => acc + p.precio, 0);
      this.resumenVisible = true;
    }

    // Confirmar desde resumen
    confirmarDesdeResumen() {
      this.confirmarPedido(); // ya existente
      this.resumenVisible = false;
    }


}
