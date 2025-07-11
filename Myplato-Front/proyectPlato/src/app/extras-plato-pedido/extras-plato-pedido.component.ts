import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { extrasPlatoPedido } from '../../model/extrasPlatoPedido.model';
import { extra } from '../../model/extra.model';
import { PlatoPedido } from '../../model/platoPedido.model';

@Component({
  selector: 'app-extras-plato-pedido',
  standalone: false,
  templateUrl: './extras-plato-pedido.component.html',
  styleUrl: './extras-plato-pedido.component.css',
  providers: [ApiService]
})
export class ExtrasPlatoPedidoComponent {
  constructor(private api: ApiService) {}

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
      });
    } else {
      this.api.putExtrasPlatoPedido(this.extrasPlatoPedidoDialogo).subscribe(() => {
        this.obtenerExtrasPlatoPedido();
      });
    }
    this.visible = false;
  }
}
