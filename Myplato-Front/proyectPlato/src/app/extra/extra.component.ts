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
    this.extraDialogo = {...ex};
    this.nuevoExtra = false;
    this.visible = true;
  }

  eliminarExtra(ex:extra){
    this.api.deleteExtra(ex.id.toString()).subscribe(() => {
      this.obtenerExtra();
    });
  }

  guardarExtra(){
    this.extraDialogo.idcategoria_extra = this.categoriaExtraSeleccionado.id;
    this.extraDialogo.unidad = this.unidadSeleccionada.id;
    if (this.nuevoExtra){
      this.api.postExtra(this.extraDialogo).subscribe(res => {
        this.obtenerExtra();
      });
    } else {
      this.api.putExtra(this.extraDialogo).subscribe(res => {
        this.obtenerExtra();
      });
    }
    this.visible = false;
  }

  onBasicUploadAuto(event:any){
    this.imagenSeleccionada = event.files[0];
  }
}
