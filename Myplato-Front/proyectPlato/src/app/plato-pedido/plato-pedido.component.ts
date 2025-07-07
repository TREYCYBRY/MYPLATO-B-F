import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { PlatoPedido } from '../../model/platoPedido.model';
import { Pedido } from '../../model/pedido.model';
import { Plato } from '../../model/plato.model';

@Component({
  selector: 'app-plato-pedido',
  standalone: false,
  templateUrl: './plato-pedido.component.html',
  styleUrl: './plato-pedido.component.css',
  providers: [ApiService]
})
export class PlatoPedidoComponent implements OnInit {

  /* ----------------- TABLA ----------------- */
  platoPedidos: PlatoPedido[] = [];

  /* ----------------- DIALOGO ---------------- */
  visible = false;
  nuevoPlatoPedido = true;
  tituloDialogo = 'Nuevo Plato‑Pedido';
  platoPedidoDialogo: PlatoPedido = new PlatoPedido();

  /* ---------- ARRAYS PARA LOS DROPDOWNS ----- */
  pedidos: Pedido[] = [];
  platos: Plato[] = [];

  /* ---------- OPCIONES SELECCIONADAS -------- */
  pedidoSeleccionado!: Pedido;   // ! = se inicializará en ngOnInit
  platoSeleccionado!: Plato;

  constructor(private api: ApiService) {}

  /* ============ INICIALIZAR ============ */
  ngOnInit(): void {
    this.obtenerPlatoPedidos();
    this.obtenerPedidos();
    this.obtenerPlatos();
  }

  /* -------- CRUD ------------- */
  abrirDialogo(): void {
    this.visible = true;
    this.nuevoPlatoPedido = true;
    this.platoPedidoDialogo = new PlatoPedido();
  }

  editarPlatoPedido(pp: PlatoPedido): void {
    this.platoPedidoDialogo = { ...pp };
    // pre‑selecciona opciones en los dropdowns
    this.pedidoSeleccionado = this.pedidos.find(p => p.id === pp.idpedido)!;
    this.platoSeleccionado  = this.platos.find(p => p.id === pp.idplato)!;
    this.nuevoPlatoPedido = false;
    this.visible = true;
  }

  eliminarPlatoPedido(pp: PlatoPedido): void {
    this.api.deletePlatoPedido(pp.id!.toString()).subscribe(() => this.obtenerPlatoPedidos());
  }

  guardarPlatoPedido(): void {
    /* asigna los IDs elegidos en los dropdowns */
    this.platoPedidoDialogo.idpedido = this.pedidoSeleccionado.id!;
    this.platoPedidoDialogo.idplato  = this.platoSeleccionado.id!;

    const op = this.nuevoPlatoPedido
      ? this.api.postPlatoPedido(this.platoPedidoDialogo)
      : this.api.putPlatoPedido(this.platoPedidoDialogo);

    op.subscribe(() => this.obtenerPlatoPedidos());
    this.visible = false;
  }

  /* --------- CARGAR DATOS ------------- */
  private obtenerPlatoPedidos(): void {
    this.api.getPlatoPedido().subscribe(res => this.platoPedidos = res);
  }

  private obtenerPedidos(): void {
    this.api.getPedidos().subscribe(res => this.pedidos = res);   // asegura que ApiService tenga este método
  }

  private obtenerPlatos(): void {
    this.api.getPlatos().subscribe(res => this.platos = res);
  }
}
