<<<<<<< HEAD
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
=======
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
      // Asegurarse que solo cargue el pedido con estado == false
      if (pedido?.estado === false) {
        this.cargarPedido(pedido.id);
      } else {
        this.idpedido = null;
        this.platos = [];
        this.bebidas = [];
      }
    });
  }

  cargarPedido(id: number) {
    this.idpedido = id;

    // Obtener platos
    this.api.getPlatoPedidosPorPedido(id).subscribe(platos => {
  console.log('PlatoPedidos recibidos:', platos); // 👈
  this.platos = platos || [];

  this.platos.forEach(p => {
    console.log('ID del plato:', p.idplato); // 👈
    this.api.getPlatoPorId(p.idplato).subscribe(plato => {
      console.log('Plato obtenido por ID:', plato); // 👈
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
        this.idpedido = null;
        this.platos = [];
        this.bebidas = [];

        const nuevoId = res?.nuevoPedidoId;

        if (nuevoId != null) {
          this.cargarPedido(nuevoId);
        } else {
          // Si no se crea un nuevo pedido, se queda sin cargar
          console.warn('⚠️ No se recibió nuevo pedido activo.');
        }
      });
    }
  }
}
>>>>>>> c83b5b8e9f39b937bf9885e64c4717c87931dcf2
