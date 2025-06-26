import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { categoriaExtra } from '../../model/categoriaExtra.model';

@Component({
  selector: 'app-categoria-extra',
  standalone: false,
  templateUrl: './categoria-extra.component.html',
  styleUrl: './categoria-extra.component.css',
  providers: [ApiService]
})
export class CategoriaExtraComponent {
  constructor(private api:ApiService){}

  categoria_Extra: categoriaExtra [];
  tituloDialogo:string = "Nuevo Tipo";
  visible:boolean = false;

  CategoriaExtraDialogo: categoriaExtra = new categoriaExtra();
  nuevaCategoriaExtra:boolean = true;

  obtenerCategoriaExtra(){
    this.api.getCategoriasExtras().subscribe(res => {
  this.categoria_Extra = res;});
  }

  ngOnInit(){
    this.obtenerCategoriaExtra();
  }

  editarCategoriaExtra(cate: categoriaExtra){
    this.visible = true;
    this.nuevaCategoriaExtra = false;
    this.CategoriaExtraDialogo = cate;
  }

  eliminarCategoriaExtra(cate: categoriaExtra){
    this.api.deleteCategoriaExtra(cate.id.toString()).subscribe(() => {
      this.obtenerCategoriaExtra();
    });
  }

  abrirDialogo(){
    this.visible = true;
    this.nuevaCategoriaExtra = true;
    this.CategoriaExtraDialogo = new categoriaExtra();
  }

 guardarCategoriaExtra(){
    if (this.nuevaCategoriaExtra){
      this.api.postCategoriaExtra(this.CategoriaExtraDialogo).subscribe(res => {
        this.obtenerCategoriaExtra();
      });
    } else {
      this.api.putCategoriaExtra(this.CategoriaExtraDialogo).subscribe(res => {
        this.obtenerCategoriaExtra();
      });
    }
    this.visible = false;
  }

}
