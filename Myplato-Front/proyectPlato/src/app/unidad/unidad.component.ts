import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { unidadMedida } from '../../model/unidadMedida.model';

@Component({
  selector: 'app-unidad',
  standalone: false,
  templateUrl: './unidad.component.html',
  styleUrl: './unidad.component.css',
  providers: [ApiService]
})

export class UnidadComponent {
  constructor(private api:ApiService) {}

  unidades:unidadMedida[];
  tituloDialogo:string = "Nuevo Tipo";
  visible:boolean = false;

  unidadDialogo:unidadMedida = new unidadMedida();
  nuevaUnidad:boolean = true;

  obtenerUnidades(){
    this.api.getUnidades().subscribe(res => {
      this.unidades = res;
    });
  }

  ngOnInit(){
    this.obtenerUnidades();
  }

  editarUnidades(unidad: unidadMedida){
    this.visible = true;
    this.nuevaUnidad = false;
    this.unidadDialogo = unidad;
  }

  eliminarUnidades(unidad: unidadMedida){
    this.api.deleteUnidades(unidad.id.toString()).subscribe(() => {
      this.obtenerUnidades();
    });
  }

  abrirDialogo(){
    this.visible = true;
    this.nuevaUnidad = true;
    this.unidadDialogo = new unidadMedida();
  }

  guardarUnidades(){
    if (this.nuevaUnidad){
      this.api.postUnidades(this.unidadDialogo).subscribe(res => {
        this.obtenerUnidades();
      });
    } else {
      this.api.putUnidades(this.unidadDialogo).subscribe(res => {
        this.obtenerUnidades();
      });
    }
    this.visible = false;
  }
}
