import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { unidadMedida } from '../../model/unidadMedida.model';
import { bebida } from '../../model/bebida.model';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bebida',
  standalone: false,
  templateUrl: './bebida.component.html',
  styleUrl: './bebida.component.css',
  providers: [ApiService]
})
export class BebidaComponent {
  constructor(private api: ApiService, private authService: AuthService,private router:Router) {}
  logout() {
    this.authService.logout();
  }
  
  bebidas: bebida[] = [];
  visible: boolean = false;
  nuevoBebida: boolean = true;
  bebidaDialogo: bebida = new bebida();
  tituloDialogo: string = "Nuevo Bebida";
  imagenSeleccionada: File | null = null;

  unidades: unidadMedida[] = [];
  unidadSeleccionada: unidadMedida;

  abrirDialogo() {
    this.visible = true;
    this.nuevoBebida = true;
    this.bebidaDialogo = new bebida();
    this.imagenSeleccionada = null;
  }

  obtenerBebida() {
    this.api.getBebida().subscribe(res => {
      this.bebidas = res;
    });
  }

  obtenerUnidades() {
    this.api.getUnidades().subscribe(res => {
      this.unidades = res;
    });
  }

  ngOnInit() {
    this.obtenerBebida();
    this.obtenerUnidades();
  }

  editarBebida(bb: bebida) {
    this.bebidaDialogo = { ...bb };
    this.nuevoBebida = false;
    this.visible = true;
    this.unidadSeleccionada = this.unidades.find(u => u.id === this.bebidaDialogo.unidad)!;
    this.imagenSeleccionada = null;
  }

  eliminarBebida(bb: bebida) {
    this.api.deleteBebida(bb.id.toString()).subscribe(() => {
      this.obtenerBebida();
    });
  }

  guardarBebida() {
    const formDataBebida = new FormData();
    this.bebidaDialogo.unidad = this.unidadSeleccionada.id;

    // Agregar campos al FormData
    formDataBebida.append('nombre', this.bebidaDialogo.nombre);
    formDataBebida.append('precio', this.bebidaDialogo.precio.toString());
    formDataBebida.append('descripcion', this.bebidaDialogo.descripcion);
    formDataBebida.append('unidad', this.bebidaDialogo.unidad.toString());

    if (this.imagenSeleccionada) {
      formDataBebida.append('imagen', this.imagenSeleccionada);
    }

    if (this.nuevoBebida) {
      this.api.postBebidaImagen(formDataBebida).subscribe(res => {
        this.obtenerBebida();
      });
    } else {
      this.api.putBebidaImagen(formDataBebida, this.bebidaDialogo.id.toString()).subscribe(res => {
        this.obtenerBebida();
      });
    }

    this.visible = false;
  }

  onBasicUploadAuto(event: any) {
    this.imagenSeleccionada = event.files[0];
  }
}
