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
  idcliente: number | null = null;// Cambia esto si lo traes del login
  idpedido: number | null = null;
  platos: PlatoPedido[] = [];
  bebidas: bebidaPedido[] = [];

  constructor(private api: ApiService) {}

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
  // Si no existe precioUnitario, lo inicializamos con precioFinalPlato / cantidad o con precioFinalPlato si cantidad es 0
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
          console.warn('⚠ No se recibió nuevo pedido activo.');
        }
      });
    }
  }
}