import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { extrasPlatoPedido } from '../../model/extrasPlatoPedido.model';
import { extra } from '../../model/extra.model';
import { PlatoPedido } from '../../model/platoPedido.model';
import { EventEmitter, Output,Input } from '@angular/core';

@Component({
  selector: 'app-extras-plato-pedido',
  standalone: false,
  templateUrl: './extras-plato-pedido.component.html',
  styleUrl: './extras-plato-pedido.component.css',
  providers: [ApiService]
})
export class ExtrasPlatoPedidoComponent {
  constructor(private api: ApiService) {}
@Input() idPlatoPedido!: number;
@Output() extrasActualizados = new EventEmitter<void>();
  extrasPlatoPedido: extrasPlatoPedido[] = [];
  visible = false;
  nuevoRegistro = true;
  extrasPlatoPedidoDialogo: extrasPlatoPedido = new extrasPlatoPedido();
  tituloDialogo: string = 'Nuevo Extra para PlatoPedido';

  extras: extra[] = [];
  extraSeleccionado: extra;

  platosPedido: PlatoPedido[] = [];
  platoPedidoSeleccionado: PlatoPedido;

  ngOnInit() {
    this.obtenerExtrasPlatoPedido();
    this.obtenerExtras();
    this.obtenerPlatosPedido();
  }

  abrirDialogo() {
    this.visible = true;
    this.nuevoRegistro = true;
    this.extrasPlatoPedidoDialogo = new extrasPlatoPedido();
  }

  obtenerExtrasPlatoPedido() {
    this.api.getExtrasPlatoPedido().subscribe(res => {
      this.extrasPlatoPedido = res;
    });
  }

  obtenerExtras() {
    this.api.getExtra().subscribe(res => {
      this.extras = res;
    });
  }

  obtenerPlatosPedido() {
    this.api.getPlatoPedido().subscribe(res => {
      this.platosPedido = res;
    });
  }

  editarExtrasPlatoPedido(epp: extrasPlatoPedido) {
    this.extrasPlatoPedidoDialogo = { ...epp };
    this.nuevoRegistro = false;
    this.visible = true;
    this.extraSeleccionado = this.extras.find(e => e.id === this.extrasPlatoPedidoDialogo.idextra)!;
    this.platoPedidoSeleccionado = this.platosPedido.find(p => p.id === this.extrasPlatoPedidoDialogo.idplato_pedido)!;
  }

  eliminarExtrasPlatoPedido(epp: extrasPlatoPedido) {
    this.api.deleteExtrasPlatoPedido(epp.id.toString()).subscribe(() => {
      this.obtenerExtrasPlatoPedido();
    });
  }

  guardarExtrasPlatoPedido() {
    this.extrasPlatoPedidoDialogo.idextra = this.extraSeleccionado.id;
    this.extrasPlatoPedidoDialogo.idplato_pedido = this.platoPedidoSeleccionado.id;

    if (this.nuevoRegistro) {
      this.api.postExtrasPlatoPedido(this.extrasPlatoPedidoDialogo).subscribe(() => {
        this.obtenerExtrasPlatoPedido();
        this.extrasActualizados.emit();
         
        
      });
    } else {
      this.api.putExtrasPlatoPedido(this.extrasPlatoPedidoDialogo).subscribe(() => {
        this.obtenerExtrasPlatoPedido();
        this.extrasActualizados.emit();
      });
    }
    this.visible = false;
  }
  calcularPrecioPersonalizacion() {
  const cantidad = this.extrasPlatoPedidoDialogo.cantidad || 0;
  const precioExtra = this.extraSeleccionado?.precioporPorcion|| 0;
  this.extrasPlatoPedidoDialogo.precioPersonalizacion = cantidad * precioExtra;
}

}