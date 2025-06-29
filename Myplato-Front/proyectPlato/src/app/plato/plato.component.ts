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

  platos: Plato[];
  visible: boolean = false;
  nuevoPlato: boolean = true;
  platoDialogo: Plato = new Plato();
  tituloDialogo: string = "Nuevo Plato";

  categoria_Plato: categoriaPlato [];
  categoriaPlatoSeleccionado: categoriaPlato;

  abrirDialogo(){
    this.visible = true;
    this.nuevoPlato = true;
    this.platoDialogo = new Plato();
  }

  obtenerPlato(){
    this.api.getPlatos().subscribe(res => {
      this.platos = res;
    });
  }

  obtenerCategoriaPlato(){
    this.api.getCategoriasPlatos().subscribe(res => {
  this.categoria_Plato = res;});
  }

  ngOnInit() {
    this.obtenerPlato();
    this.obtenerCategoriaPlato();
  }

  editarPlato(pla:Plato){
      this.platoDialogo = {...pla};
      this.nuevoPlato = false;
      this.visible = true;
    }

   eliminarPlato(pla:Plato){
      this.api.deletePlatos(pla.id.toString()).subscribe(() => {
        this.obtenerPlato();
      });
    }

    guardarPlato(){
    this.platoDialogo.idcategoria_plato = this.categoriaPlatoSeleccionado.id;
    if (this.nuevoPlato){
      this.api.postPlato(this.platoDialogo).subscribe(res => {
        this.obtenerPlato();
      });
    } else {
      this.api.putPlatos(this.platoDialogo).subscribe(res => {
        this.obtenerPlato();
      });
    }
    this.visible = false;
  }

    


}
