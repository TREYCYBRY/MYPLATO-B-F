import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { extraPlato } from '../../model/extraPlato.model';
import { Plato } from '../../model/plato.model';
import { extra } from '../../model/extra.model';

@Component({
  selector: 'app-extra-plato',
  standalone: false,
  templateUrl: './extra-plato.component.html',
  styleUrl: './extra-plato.component.css',
  providers: [ApiService]
})
export class ExtraPlatoComponent {
  constructor(private api: ApiService) {}

  extraPlatos: extraPlato[] = [];
  visible = false;
  nuevoRegistro = true;
  extraPlatoDialogo: extraPlato = new extraPlato();
  tituloDialogo: string = "Nuevo Extra para Plato";

  platos: Plato[] = [];
  platoSeleccionado: Plato;

  extras: extra[] = [];
  extraSeleccionado: extra;

  ngOnInit() {
    this.obtenerExtraPlato();
    this.obtenerPlatos();
    this.obtenerExtras();
  }

  abrirDialogo() {
    this.visible = true;
    this.nuevoRegistro = true;
    this.extraPlatoDialogo = new extraPlato();
  }

  obtenerExtraPlato() {
    this.api.getExtraPlato().subscribe(res => {
      this.extraPlatos = res;
    });
  }

  obtenerPlatos() {
    this.api.getPlatos().subscribe(res => {
      this.platos = res;
    });
  }

  obtenerExtras() {
    this.api.getExtra().subscribe(res => {
      this.extras = res;
    });
  }

  editarExtraPlato(ep: extraPlato) {
    this.extraPlatoDialogo = { ...ep };
    this.nuevoRegistro = false;
    this.visible = true;
    this.platoSeleccionado = this.platos.find(t => t.id === this.extraPlatoDialogo.id_plato)!;
    this.extraSeleccionado = this.extras.find(t => t.id === this.extraPlatoDialogo.id_extra)!;
  }

  eliminarExtraPlato(ep: extraPlato) {
    this.api.deleteExtraPlato(ep.id.toString()).subscribe(() => {
      this.obtenerExtraPlato();
    });
  }

  guardarExtraPlato() {
    this.extraPlatoDialogo.id_plato = this.platoSeleccionado.id;
    this.extraPlatoDialogo.id_extra = this.extraSeleccionado.id;

    if (this.nuevoRegistro) {
      this.api.postExtraPlato(this.extraPlatoDialogo).subscribe(() => {
        this.obtenerExtraPlato();
      });
    } else {
      this.api.putExtraPlato(this.extraPlatoDialogo).subscribe(() => {
        this.obtenerExtraPlato();
      });
    }
    this.visible = false;
  }
}
