import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { extra } from '../../model/extra.model';
import { categoriaExtra } from '../../model/categoriaExtra.model';
import { unidadMedida } from '../../model/unidadMedida.model';

@Component({
  selector: 'app-extra',
  standalone: false,
  templateUrl: './extra.component.html',
  styleUrl: './extra.component.css',
  providers: [ApiService]
})
export class ExtraComponent {
  constructor(private api:ApiService) {}

  extras:extra[];
  visible:boolean = false;
  nuevoExtra:boolean = true;
  extraDialogo:extra = new extra();
  tituloDialogo:string = "Nuevo Extra";
  imagenSeleccionada: File | null = null;

  categoria_Extra: categoriaExtra [];
  categoriaExtraSeleccionado:categoriaExtra;

  unidades:unidadMedida[];
  unidadSeleccionada:unidadMedida;

  abrirDialogo(){
    this.visible = true;
    this.nuevoExtra = true;
    this.extraDialogo = new extra();
  }

  obtenerExtra(){
    this.api.getExtra().subscribe(res => {
      this.extras = res;
    });
  }

  obtenerCategoriaExtra(){
    this.api.getCategoriasExtras().subscribe(res => {
       this.categoria_Extra = res;});
  }

  obtenerUnidades(){
    this.api.getUnidades().subscribe(res => {
      this.unidades = res;
    });
  }

  ngOnInit(){
    this.obtenerExtra();
    this.obtenerCategoriaExtra();
    this.obtenerUnidades();
  }

  editarExtra(ex:extra){
    this.visible = true;
    this.nuevoExtra = false;
    this.extraDialogo = ex;
    this.categoriaExtraSeleccionado = this.categoria_Extra.find(t => t.id === this.extraDialogo.idcategoria_extra)!;
    this.unidadSeleccionada=this.unidades.find(t => t.id === this.extraDialogo.unidad)!;
    

  }

  eliminarExtra(ex:extra){
    this.api.deleteExtra(ex.id.toString()).subscribe(() => {
      this.obtenerExtra();
    });
  }

  guardarExtra(){
    const formDataExtra = new FormData();
    this.extraDialogo.idcategoria_extra = this.categoriaExtraSeleccionado.id;
    this.extraDialogo.unidad = this.unidadSeleccionada.id;

    formDataExtra.append('nombre',this.extraDialogo.nombre);
    formDataExtra.append('precioporPorcion',this.extraDialogo.precioporPorcion.toString());
    formDataExtra.append('descripcion',this.extraDialogo.descripcion);
    formDataExtra.append('idcategoria_extra',this.categoriaExtraSeleccionado.id.toString());
    formDataExtra.append('unidad',this.unidadSeleccionada.id.toString())

    if(this.imagenSeleccionada){
        formDataExtra.append('imagen',this.imagenSeleccionada)
    }  

    if (this.nuevoExtra){
      this.api.postExtraImagen(formDataExtra).subscribe(res => {
        this.obtenerExtra();
      });
    } else {
        this.api.putExtraImagen(formDataExtra,this.extraDialogo.id.toString()).subscribe(res => {
        this.obtenerExtra();
      });
    }
    this.visible = false;
  }

  onBasicUploadAuto(event:any){
    this.imagenSeleccionada = event.files[0];
  }
}
