import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { categoriaPlato } from '../../model/categoriaPlato.model';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-plato',
  standalone: false,
  templateUrl: './categoria-plato.component.html',
  styleUrl: './categoria-plato.component.css',
  providers: [ApiService]
})
export class CategoriaPlatoComponent {
  constructor(private api:ApiService, private authService: AuthService,private router:Router){}
  logout() {
    this.authService.logout();
  }

  categoria_Plato: categoriaPlato [];
  tituloDialogo:string = "Nuevo Tipo";
  visible:boolean = false;

  CategoriaPlatoDialogo: categoriaPlato = new categoriaPlato();
  nuevaCategoriaPlato:boolean = true;

  obtenerCategoriaPlato(){
    this.api.getCategoriasPlatos().subscribe(res => {
  this.categoria_Plato = res;});
  }

  ngOnInit(){
    this.obtenerCategoriaPlato();
  }

  editarCategoriaPlato(cate: categoriaPlato){
    this.visible = true;
    this.nuevaCategoriaPlato = false;
    this.CategoriaPlatoDialogo = cate;
  }

  eliminarCategoriaPlato(cate: categoriaPlato){
    this.api.deleteCategoriaPlato(cate.id.toString()).subscribe(() => {
      this.obtenerCategoriaPlato();
    });
  }

  abrirDialogo(){
    this.visible = true;
    this.nuevaCategoriaPlato = true;
    this.CategoriaPlatoDialogo = new categoriaPlato();
  }

 guardarCategoriaPlato(){
    if (this.nuevaCategoriaPlato){
      this.api.postCategoriaPlato(this.CategoriaPlatoDialogo).subscribe(res => {
        this.obtenerCategoriaPlato();
      });
    } else {
      this.api.putCategoriaPlato(this.CategoriaPlatoDialogo).subscribe(res => {
        this.obtenerCategoriaPlato();
      });
    }
    this.visible = false;
  }
}