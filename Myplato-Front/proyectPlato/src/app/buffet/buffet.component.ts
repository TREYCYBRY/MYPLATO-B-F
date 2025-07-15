import { Component, OnInit } from '@angular/core';
import { Plato } from '../../model/plato.model';
import { categoriaExtra } from '../../model/categoriaExtra.model';
import { extra } from '../../model/extra.model';
import { ApiService } from '../../service/api.service';
import { PlatoPedido } from '../../model/platoPedido.model';
import { extrasPlatoPedido } from '../../model/extrasPlatoPedido.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-buffet',
  standalone: false,
  templateUrl: './buffet.component.html',
  styleUrl: './buffet.component.css'
})
export class BuffetComponent implements OnInit {

  constructor(private api: ApiService, private authService: AuthService) {}

  platosBase: Plato[] = [];
  categorias: categoriaExtra[] = [];
  extras: extra[] = [];
  extrasFiltrados: extra[] = [];
  extrasSeleccionados: { extra: extra, cantidad: number }[] = [];

  platoSeleccionado: Plato | null = null;
  categoriaActiva: number | null = null;
  totalPlato: number = 0;
  idcliente: number | null = null;

  platoSeleccionadoIndex: number = 0;

  ngOnInit(): void {

    const cliente = this.authService.getCliente();
    if (!cliente) {
      console.warn('No cliente logueado');
      // Aquí podrías redirigir a login o mostrar mensaje al usuario
      return;
    }
    this.idcliente = cliente.id;

    this.api.getPlatos().subscribe(res => {
      this.platosBase = res.filter(p => p.personalizable);
    });

    this.api.getCategoriasExtras().subscribe(res => {
      this.categorias = res;
    });

    this.api.getExtra().subscribe(res => {
      this.extras = res;
      this.extrasFiltrados = res;
    });
  }

  get platos(): Plato[] {
    return this.platosBase;
  }

  anteriorPlato() {
    if (this.platos.length > 0) {
      this.platoSeleccionadoIndex = (this.platoSeleccionadoIndex - 1 + this.platos.length) % this.platos.length;
    }
  }

  siguientePlato() {
    if (this.platos.length > 0) {
      this.platoSeleccionadoIndex = (this.platoSeleccionadoIndex + 1) % this.platos.length;
    }
  }

  elegirPlato(plato: Plato) {
    this.platoSeleccionado = plato;
    this.calcularTotal();
  }

  seleccionarCategoria(cat: categoriaExtra) {
    this.categoriaActiva = cat.id;
    this.extrasFiltrados = this.extras.filter(e => e.idcategoria_extra === cat.id);
  }

  aumentarCantidad(extra: extra) {
    const encontrado = this.extrasSeleccionados.find(e => e.extra.id === extra.id);
    if (encontrado) {
      encontrado.cantidad++;
    } else {
      this.extrasSeleccionados.push({ extra, cantidad: 1 });
    }
    this.calcularTotal();
  }

  reducirCantidad(extra: extra) {
    const index = this.extrasSeleccionados.findIndex(e => e.extra.id === extra.id);
    if (index >= 0) {
      if (this.extrasSeleccionados[index].cantidad > 1) {
        this.extrasSeleccionados[index].cantidad--;
      } else {
        this.extrasSeleccionados.splice(index, 1);
      }
    }
    this.calcularTotal();
  }

  obtenerCantidad(extra: extra): number {
    const encontrado = this.extrasSeleccionados.find(e => e.extra.id === extra.id);
    return encontrado ? encontrado.cantidad : 0;
  }

  calcularTotal(): number {
    let total = 0;
    if (this.platoSeleccionado) {
      total += Number(this.platoSeleccionado.precio);
    }
    this.extrasSeleccionados.forEach(e => {
      total += Number(e.extra.precioporPorcion) * e.cantidad;
    });
    this.totalPlato = total;
    return total;
  }

  finalizarPlatoPersonalizado() {
    this.api.obtenerPedidoActivo(this.idcliente!).subscribe(pedido => {
      const platopedido: PlatoPedido = {
        idplato: this.platoSeleccionado ? this.platoSeleccionado.id : 4,
        idpedido: pedido.id,
        precioBasePlato: this.platoSeleccionado ? this.platoSeleccionado.precio : 0,
        precioFinalPlato: this.totalPlato,
        tipoPedido: 'Personalizado',
        cantidad: 1
      };

      this.api.postPlatoPedido(platopedido).subscribe(pp => {
        this.extrasSeleccionados.forEach(e => {
          const extraPlato: extrasPlatoPedido = {
            id: 0,
            idextra: e.extra.id,
            idplato_pedido: pp.id!,
            cantidad: e.cantidad,
            precioPersonalizacion: Number(e.extra.precioporPorcion) * e.cantidad
          };
          this.api.postExtrasPlatoPedido(extraPlato).subscribe();
        });

        alert("Plato personalizado añadido a la bandeja");
        this.reiniciarBuffet();
      });
    });
  }

  reiniciarBuffet() {
    this.platoSeleccionado = null;
    this.extrasSeleccionados = [];
    this.totalPlato = 0;
  }
}