import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { mesa } from '../../model/mesa.model';
import { Empleado } from '../../model/empleado.model';

@Component({
  selector: 'app-mesa',
  standalone: false,
  templateUrl: './mesa.component.html',
  styleUrl: './mesa.component.css',
  providers: [ApiService]
})
export class MesaComponent {
  constructor(private api: ApiService) {}

  mesas: mesa[] = [];
  visible = false;
  nuevaMesa = true;
  mesaDialogo: mesa = new mesa();
  tituloDialogo: string = "Nueva Mesa";

  mozos: Empleado[] = [];
  mozoSeleccionado: Empleado; 

  ngOnInit() {
    this.obtenerMesas();
    this.obtenerMozos();
  }

  abrirDialogo() {
    this.visible = true;
    this.nuevaMesa = true;
    this.mesaDialogo = new mesa();
  }

  obtenerMesas() {
    this.api.getMesas().subscribe(res => {
      this.mesas = res;
    });
  }

  obtenerMozos() {
    this.api.getEmpleados().subscribe(res => {
      this.mozos = res;
    });
  }

  editarMesa(ms: mesa) {
    this.mesaDialogo = { ...ms };
    this.nuevaMesa = false;
    this.visible = true;
  }

  eliminarMesa(ms: mesa) {
    this.api.deleteMesa(ms.id.toString()).subscribe(() => {
      this.obtenerMesas();
    });
  }

  guardarMesa() {
    this.mesaDialogo.idmozo = this.mozoSeleccionado.id;

    if (this.nuevaMesa) {
      this.api.postMesa(this.mesaDialogo).subscribe(() => {
        this.obtenerMesas();
      });
    } else {
      this.api.putMesa(this.mesaDialogo).subscribe(() => {
        this.obtenerMesas();
      });
    }
    this.visible = false;
  }

}
