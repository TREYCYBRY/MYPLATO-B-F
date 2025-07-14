import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { PlatoPedido } from '../../model/platoPedido.model';
import { bebidaPedido } from '../../model/bebidaPedido.model';

@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.component.html',
  standalone: false,
  styleUrls: ['./bandeja.component.css'],
  providers: [ApiService]
})
export class BandejaComponent implements OnInit {
  idcliente: number = 1; // Cambia esto si lo traes del login
  idpedido: number | null = null;
  platos: PlatoPedido[] = [];
  bebidas: bebidaPedido[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.obtenerPedidoActivo(this.idcliente).subscribe(pedido => {
      if (pedido?.id) {
        this.cargarPedido(pedido.id);
      }
    });
  }

  cargarPedido(id: number) {
    this.idpedido = id;

    // Obtener platos
    this.api.getPlatoPedidosPorPedido(id).subscribe(platos => {
      this.platos = platos || [];
      this.platos.forEach(p => {
        this.api.getPlatoPorId(p.idplato).subscribe(plato => {
          p.plato = plato;
        });
      });
    });

    // Obtener bebidas
    this.api.getBebidaPedidosPorPedido(id).subscribe(bebidas => {
      this.bebidas = bebidas || [];
      this.bebidas.forEach(b => {
        this.api.getBebidaPorId(b.id_bebida).subscribe(bebida => {
          b.bebida = bebida;
        });
      });
    });
  }

  getTotal() {
    const totalPlatos = this.platos.reduce((t, p) => t + Number(p.precioFinalPlato), 0);
    const totalBebidas = this.bebidas.reduce((t, b) => t + Number(b.precioFinal), 0);
    return totalPlatos + totalBebidas;
  }

  aumentarPlato(p: any) {
    p.cantidad = (p.cantidad || 1) + 1;
    p.precioFinalPlato = p.precioBasePlato * p.cantidad;
  }

  disminuirPlato(p: any) {
    if (p.cantidad > 1) {
      p.cantidad--;
      p.precioFinalPlato = p.precioBasePlato * p.cantidad;
    }
  }

  aumentarBebida(b: any) {
    b.cantidad = (b.cantidad || 1) + 1;
    b.precioFinal = b.bebida.precio * b.cantidad;
  }

  disminuirBebida(b: any) {
    if (b.cantidad > 1) {
      b.cantidad--;
      b.precioFinal = b.bebida.precio * b.cantidad;
    }
  }

  eliminarPlato(p: any) {
    this.api.deletePlatoPedido(p.id).subscribe({
      next: () => {
        this.platos = this.platos.filter(plato => plato.id !== p.id);
      },
      error: err => {
        console.error('Error eliminando plato', err);
      }
    });
  }

  eliminarBebida(b: any) {
    this.api.deletebebidaPedidos(b.id).subscribe({
      next: () => {
        this.bebidas = this.bebidas.filter(bebida => bebida.id !== b.id);
      },
      error: err => {
        console.error('Error eliminando bebida', err);
      }
    });
  }

  confirmarPedido() {
    if (this.idpedido !== null) {
      this.api.confirmarPedido(this.idpedido).subscribe(res => {
        alert('✅ Pedido confirmado');

        // Limpiar visualmente bandeja
        this.platos = [];
        this.bebidas = [];

        const nuevoId = res?.nuevoPedidoId;

        if (nuevoId != null) {
          this.cargarPedido(nuevoId);
        } else {
          alert('⚠️ Error: No se recibió un nuevo ID de pedido.');
        }
      });
    }
  }
}




