import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Plato } from '../../model/plato.model';
import { bebida } from '../../model/bebida.model';
import { Pedido } from '../../model/pedido.model';
import { PlatoPedido } from '../../model/platoPedido.model';
import { bebidaPedido } from '../../model/bebidaPedido.model';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ApiService]
})
export class MenuComponent implements OnInit {
  platos: Plato[] = [];
  bebidas: bebida[] = [];
  pedidoActual: Pedido | null = null;
  idcliente: number = 1;

  bandejaPlato: PlatoPedido[] = [];
  bandejaBebida: bebidaPedido[] = [];

  filtroActivo: string = 'Todo';
  

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getPlatos().subscribe(res => {
      this.platos = res;
    });

    this.api.getBebida().subscribe(res => {
      this.bebidas = res;
    });
  }

  // Filtrados dinámicos
  get platosFiltrados(): Plato[] {
  if (this.filtroActivo === 'Todo') return this.platos;
  if (this.filtroActivo === 'Platillos') return this.platos.filter(p => p.idcategoria_plato !== 3);
  if (this.filtroActivo === 'Sopas') return this.platos.filter(p => p.idcategoria_plato === 3);
  return [];
}


  get bebidasFiltradas(): bebida[] {
    if (this.filtroActivo === 'Todo' || this.filtroActivo === 'Bebidas') return this.bebidas;
    return [];
  }

  cambiarFiltro(filtro: string) {
    this.filtroActivo = filtro;
  }

  anadirAlCarrito(plato: Plato) {
    if (!this.pedidoActual) {
      this.api.obtenerPedidoActivo(this.idcliente).subscribe(res => {
        this.pedidoActual = res;
        this.agregarPlato(plato);
      });
    } else {
      this.agregarPlato(plato);
    }
  }

  agregarPlato(plato: Plato) {
    const platopedido: PlatoPedido = {
      idplato: plato.id,
      idpedido: this.pedidoActual!.id,
      precioBasePlato: plato.precio,
      precioFinalPlato: plato.precio,
      tipoPedido: 'Para servir'
    };

    this.api.postPlatoPedido(platopedido).subscribe(() => {
      this.bandejaPlato.push(platopedido);
      this.pedidoActual!.montoTotal += Number(platopedido.precioFinalPlato);
    });
  }

  anadirBebida(bebida: bebida) {
    if (!this.pedidoActual) {
      this.api.obtenerPedidoActivo(this.idcliente).subscribe(res => {
        this.pedidoActual = res;
        this.agregarBebida(bebida);
      });
    } else {
      this.agregarBebida(bebida);
    }
  }

agregarBebida(bebida: bebida) {
  const bebidaExistente = this.bandejaBebida.find(b => b.id_bebida === bebida.id);

  const bebidaPedidoData: bebidaPedido = {
    id: 0,
    id_bebida: bebida.id,
    id_pedido: this.pedidoActual!.id,
    cantidad: 1,
    precioFinal: bebida.precio
  };

  this.api.postbebidaPedidos(bebidaPedidoData).subscribe((resp: bebidaPedido) => {
    if (bebidaExistente) {
      bebidaExistente.cantidad += 1;
      bebidaExistente.precioFinal += bebida.precio;
    } else {
      this.bandejaBebida.push(resp);
    }
    this.pedidoActual!.montoTotal += bebida.precio;
  });
}




  confirmarPedido() {
    if (this.pedidoActual) {
      this.api.confirmarPedido(this.pedidoActual.id).subscribe(() => {
        alert('Pedido confirmado');
        this.bandejaPlato = [];
        this.bandejaBebida = [];
        this.pedidoActual = null;
      });
    }
  }

  getTotal() {
    const totalPlatos = this.bandejaPlato.reduce((total, p) => total + Number(p.precioFinalPlato), 0);
    const totalBebidas = this.bandejaBebida.reduce((total, b) => total + Number(b.precioFinal), 0);
    return totalPlatos + totalBebidas;
  }
}
