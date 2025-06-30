import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { cliente } from '../../model/cliente.model';
import { categoriaCliente } from '../../model/categoriaCliente.model';

@Component({
  selector: 'app-cliente',
  standalone: false,
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
  providers: [ApiService]
})
export class ClienteComponent {
  constructor(private api:ApiService) {}

  clientes:cliente[];
  visible:boolean = false;
  nuevoCliente:boolean = true;
  clienteDialogo:cliente = new cliente();
  tituloDialogo:string = "Nuevo Cliente";

  categoria_Cliente: categoriaCliente[];
  categoriaClienteSeleccionado: categoriaCliente;

  abrirDialogo(){
    this.visible = true;
    this.nuevoCliente = true;
    this.clienteDialogo = new cliente();
  }

  obtenerCliente(){
      this.api.getCliente().subscribe(res => {
        this.clientes = res;
      });
    }
  
  obtenerCategoriaCliente(){
    this.api.getCategoriasClientes().subscribe(res => {
  this.categoria_Cliente = res;});
  }
  
  ngOnInit(){
    this.obtenerCliente();
    this.obtenerCategoriaCliente();
  }
  
  editarCliente(cli:cliente){
    this.clienteDialogo = {...cli};
    this.nuevoCliente = false;
    this.visible = true;
  }
  
  eliminarCliente(cli:cliente){
    this.api.deleteCliente(cli.id.toString()).subscribe(() => {
      this.obtenerCliente();
    });
  }
  
  guardarCliente(){
    this.clienteDialogo.idcategoria_cliente = this.categoriaClienteSeleccionado.id;
    if (this.nuevoCliente){
      this.api.postCliente(this.clienteDialogo).subscribe(res => {
        this.obtenerCliente();
      });
    } else {
      this.api.putCliente(this.clienteDialogo).subscribe(res => {
        this.obtenerCliente();
      });
    }
    this.visible = false;
  }

}
