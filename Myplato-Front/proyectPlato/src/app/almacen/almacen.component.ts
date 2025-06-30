import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { almacen } from '../../model/almacen.model';

@Component({
  selector: 'app-almacen',
  standalone: false,
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.css',
  providers: [ApiService]
})

export class AlmacenComponent {
  constructor(private api:ApiService) {}

  almacenes : almacen[];
  tituloDialogo:string = "Nuevo Tipo";
  visible:boolean = false;

  almacenDialogo:almacen = new almacen();
  nuevoAlmacen:boolean = true;

  obtenerAlmacenes(){
    this.api.getAlmacenes().subscribe(res => {
      this.almacenes = res;
    });
  }

  ngOnInit(){
    this.obtenerAlmacenes();
  }

  editarAlmacenes(almc: almacen){
    this.visible = true;
    this.nuevoAlmacen = false;
    this.almacenDialogo = almc;
  }

  eliminarAlmacenes(almc: almacen){
    this.api.deleteAlmacenes(almc.id.toString()).subscribe(() => {
      this.obtenerAlmacenes();
    });
  }

  abrirDialogo(){
    this.visible = true;
    this.nuevoAlmacen = true;
    this.almacenDialogo = new almacen();
  }

  guardarAlmacenes(){
    if (this.nuevoAlmacen){
      this.api.postAlmacenes(this.almacenDialogo).subscribe(res => {
        this.obtenerAlmacenes();
      });
    } else {
      this.api.putAlmacenes(this.almacenDialogo).subscribe(res => {
        this.obtenerAlmacenes();
      });
    }
    this.visible = false;
  }

}
