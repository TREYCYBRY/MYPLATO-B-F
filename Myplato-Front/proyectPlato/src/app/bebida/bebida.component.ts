import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { unidadMedida } from '../../model/unidadMedida.model';
import { bebida } from '../../model/bebida.model';

@Component({
  selector: 'app-bebida',
  standalone: false,
  templateUrl: './bebida.component.html',
  styleUrl: './bebida.component.css',
  providers: [ApiService]
})
export class BebidaComponent {
    constructor(private api:ApiService) {}
  
    bebidas:bebida[];
    visible:boolean = false;
    nuevoBebida:boolean = true;
    bebidaDialogo:bebida = new bebida();
    tituloDialogo:string = "Nuevo Bebida";
  
    unidades:unidadMedida[];
    unidadSeleccionada:unidadMedida;
  
    abrirDialogo(){
      this.visible = true;
      this.nuevoBebida = true;
      this.bebidaDialogo = new bebida();
    }
  
    obtenerBebida(){
      this.api.getBebida().subscribe(res => {
        this.bebidas = res;
      });
    }
  
    obtenerUnidades(){
      this.api.getUnidades().subscribe(res => {
        this.unidades = res;
      });
    }
  
    ngOnInit(){
      this.obtenerBebida();
      this.obtenerUnidades();
    }
  
    editarBebida(bb:bebida){
      this.bebidaDialogo = {...bb};
      this.nuevoBebida = false;
      this.visible = true;
    }
  
    eliminarBebida(bb:bebida){
      this.api.deleteBebida(bb.id.toString()).subscribe(() => {
        this.obtenerBebida();
      });
    }
  
    guardarBebida(){
      this.bebidaDialogo.unidad = this.unidadSeleccionada.id;
      if (this.nuevoBebida){
        this.api.postBebida(this.bebidaDialogo).subscribe(res => {
          this.obtenerBebida();
        });
      } else {
        this.api.putBebida(this.bebidaDialogo).subscribe(res => {
          this.obtenerBebida();
        });
      }
      this.visible = false;
    }
}
