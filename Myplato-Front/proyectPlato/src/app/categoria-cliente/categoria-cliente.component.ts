import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { categoriaCliente } from '../../model/categoriaCliente.model';

@Component({
  selector: 'app-categoria-cliente',
  standalone: false,
  templateUrl: './categoria-cliente.component.html',
  styleUrl: './categoria-cliente.component.css',
  providers: [ApiService]
})
export class CategoriaClienteComponent {
  constructor(private api:ApiService){}

  categoria_Cliente: categoriaCliente [];
  tituloDialogo:string = "Nuevo Tipo";
  visible: boolean = false;

  CategoriaClienteDialogo: categoriaCliente = new categoriaCliente();
  nuevaCategoriaCliente: boolean = true;

  obtenerCategoriaCliente(){
    this.api.getCategoriasClientes().subscribe(res => {
  this.categoria_Cliente = res;});
  }

  ngOnInit(){
    this.obtenerCategoriaCliente();
  }

  editarCategoriaCliente(cate: categoriaCliente){
    this.visible = true;
    this.nuevaCategoriaCliente = false;
    this.CategoriaClienteDialogo = cate;
  }

  eliminarCategoriaCliente(cate: categoriaCliente){
    this.api.deleteCategoriaCliente(cate.id.toString()).subscribe(() => {
      this.obtenerCategoriaCliente();
    });
  }

  abrirDialogo(){
    this.visible = true;
    this.nuevaCategoriaCliente = true;
    this.CategoriaClienteDialogo = new categoriaCliente();
  }

  guardarCategoriaCliente(){
    if (this.nuevaCategoriaCliente){
      this.api.postCategoriaCliente(this.CategoriaClienteDialogo).subscribe(res => {
        this.obtenerCategoriaCliente();
      });
    } else {
      this.api.putCategoriaCliente(this.CategoriaClienteDialogo).subscribe(res => {
        this.obtenerCategoriaCliente();
      });
    }
    this.visible = false;
  }

}