import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Plato } from '../../model/plato.model';
import { categoriaPlato } from '../../model/categoriaPlato.model';


@Component({
  selector: 'app-plato',
  standalone: false,
  templateUrl: './plato.component.html',
  styleUrl: './plato.component.css',
  providers: [ApiService]
})
export class PlatoComponent {
  constructor(private api: ApiService) {}

  platos: Plato[] = [];
  visible: boolean = false;
  nuevoPlato: boolean = true;
  platoDialogo: Plato = new Plato();
  tituloDialogo: string = "Nuevo Plato";
  imagenSeleccionada: File | null = null;

  categoria_Plato: categoriaPlato[] = [];
  categoriaPlatoSeleccionado: categoriaPlato;

  abrirDialogo() {
    this.visible = true;
    this.nuevoPlato = true;
    this.platoDialogo = new Plato();
    this.imagenSeleccionada = null;
  }

  obtenerPlato() {
    this.api.getPlatos().subscribe(res => {
      this.platos = res;
    });
  }

  obtenerCategoriaPlato() {
    this.api.getCategoriasPlatos().subscribe(res => {
      this.categoria_Plato = res;
    });
  }

  ngOnInit() {
    this.obtenerPlato();
    this.obtenerCategoriaPlato();
  }

  editarPlato(pla: Plato) {
    this.visible = true;
    this.nuevoPlato = false;
    this.platoDialogo = { ...pla };
    this.categoriaPlatoSeleccionado = this.categoria_Plato.find(
      t => t.id === this.platoDialogo.idcategoria_plato
    )!;
    this.imagenSeleccionada = null;
  }

  eliminarPlato(pla: Plato) {
    this.api.deletePlatos(pla.id.toString()).subscribe(() => {
      this.obtenerPlato();
    });
  }

  guardarPlato() {
    const formDataPlato = new FormData();
    this.platoDialogo.idcategoria_plato = this.categoriaPlatoSeleccionado.id;

    // Agregar campos al FormData
    formDataPlato.append('nombre', this.platoDialogo.nombre);
    formDataPlato.append('descripcion', this.platoDialogo.descripcion);
    formDataPlato.append('precio', this.platoDialogo.precio.toString());
    formDataPlato.append('idcategoria_plato', this.platoDialogo.idcategoria_plato.toString());
    formDataPlato.append('personalizable', this.platoDialogo.personalizable ? 'true' : 'false');


    if (this.imagenSeleccionada) {
      formDataPlato.append('imagen', this.imagenSeleccionada);
    }

    if (this.nuevoPlato) {
      this.api.postPlatoImagen(formDataPlato).subscribe(res => {
        this.obtenerPlato();
      });
    } else {
      this.api.putPlatoImagen(formDataPlato, this.platoDialogo.id.toString()).subscribe(res => {
        this.obtenerPlato();
      });
    }

    this.visible = false;
  }

  onBasicUploadAuto(event: any) {
    this.imagenSeleccionada = event.files[0];
  }
}