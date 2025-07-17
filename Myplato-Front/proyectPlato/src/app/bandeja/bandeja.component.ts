import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { PlatoPedido } from '../../model/platoPedido.model';
import { bebidaPedido } from '../../model/bebidaPedido.model';
import { extrasPlatoPedido } from '../../model/extrasPlatoPedido.model';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.component.html',
  standalone: false,
  styleUrls: ['./bandeja.component.css'],
  providers: [ApiService]
})
export class BandejaComponent implements OnInit {
  idcliente: number | null = null;
  idpedido: number | null = null;
  platos: PlatoPedido[] = [];
  bebidas: bebidaPedido[] = [];
  extrasPorPlato: { [idplatoPedido: number]: extrasPlatoPedido[] } = {};
  platoExtrasVisible: number | null = null;

  constructor(private api: ApiService, private authService: AuthService,private router:Router) {}
  logout() {
    this.authService.logout();
  }
  
  ngOnInit(): void {
    const clienteJson = localStorage.getItem('cliente');

    if (clienteJson && clienteJson !== "undefined") {
      try {
        const cliente = JSON.parse(clienteJson);
        this.idcliente = cliente.id;

        this.api.obtenerPedidoActivo(this.idcliente!).subscribe(pedido => {
          if (pedido?.estado === false) {
            this.cargarPedido(pedido.id);
          } else {
            this.idpedido = null;
            this.platos = [];
            this.bebidas = [];
          }
        }, error => {
          console.error('Error obteniendo pedido activo:', error);
        });
      } catch (e) {
        console.error('❌ Error al parsear JSON de cliente:', e);
      }
    } else {
      console.warn('⚠️ No hay cliente logueado o JSON mal guardado.');
    }
  }

  cargarPedido(id: number) {
    this.idpedido = id;

    this.api.getPlatoPedidosPorPedido(id).subscribe(platos => {
      this.platos = platos || [];

      this.platos.forEach(p => {
        this.api.getPlatoPorId(p.idplato).subscribe(plato => {
          p.plato = plato;
        });

        this.api.getExtrasPorPlatoPedido(p.id!).subscribe(extras => {
          if (extras.length > 0) {
            this.extrasPorPlato[p.id!] = extras;
          }
        });
      });
    });

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
    if (!p.precioUnitario) {
      p.precioUnitario = p.precioFinalPlato / (p.cantidad || 1);
    }

    p.cantidad = (p.cantidad || 1) + 1;
    p.precioFinalPlato = p.precioUnitario * p.cantidad;

    this.api.putPlatoPedido(p).subscribe({
      next: () => console.log('Plato actualizado correctamente'),
      error: err => console.error('Error actualizando plato', err)
    });
  }

  disminuirPlato(p: any) {
    if (p.cantidad > 1) {
      if (!p.precioUnitario) {
        p.precioUnitario = p.precioFinalPlato / p.cantidad;
      }

      p.cantidad--;
      p.precioFinalPlato = p.precioUnitario * p.cantidad;

      this.api.putPlatoPedido(p).subscribe({
        next: () => console.log('Plato actualizado correctamente'),
        error: err => console.error('Error actualizando plato', err)
      });
    }
  }

  aumentarBebida(b: any) {
    b.cantidad = (b.cantidad || 1) + 1;
    b.precioFinal = b.bebida.precio * b.cantidad;

    this.api.putbebidaPedidos(b).subscribe({
      next: () => console.log('Bebida actualizada correctamente'),
      error: err => console.error('Error actualizando bebida', err)
    });
  }

  disminuirBebida(b: any) {
    if (b.cantidad > 1) {
      b.cantidad--;
      b.precioFinal = b.bebida.precio * b.cantidad;

      this.api.putbebidaPedidos(b).subscribe({
        next: () => console.log('Bebida actualizada correctamente'),
        error: err => console.error('Error actualizando bebida', err)
      });
    }
  }

  eliminarPlato(p: any) {
    this.api.deletePlatoPedido(p.id).subscribe({
      next: () => {
        this.platos = this.platos.filter(plato => plato.id !== p.id);
        delete this.extrasPorPlato[p.id];
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

        this.idpedido = null;
        this.platos = [];
        this.bebidas = [];

        const nuevoId = res?.nuevoPedidoId;

        if (nuevoId != null) {
          this.cargarPedido(nuevoId);
        } else {
          console.warn('⚠ No se recibió nuevo pedido activo.');
        }
      });
    }
  }

  mostrarExtras(p: PlatoPedido) {
    this.platoExtrasVisible = p.id!;
  }

  cerrarModal() {
    this.platoExtrasVisible = null;
  }
}