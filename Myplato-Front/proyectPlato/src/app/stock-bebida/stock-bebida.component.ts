import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { almacen } from '../../model/almacen.model';
import { bebida } from '../../model/bebida.model';
import { stockBebida } from '../../model/stockBebida.model';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-bebida',
  standalone: false,
  templateUrl: './stock-bebida.component.html',
  styleUrl: './stock-bebida.component.css',
  providers: [ApiService]
})

export class StockBebidaComponent {
  constructor(private api:ApiService, private authService: AuthService,private router:Router) {}
  logout() {
    this.authService.logout();
  }

  stockBebidas:stockBebida[] = [];
  
  visible = false;
  nuevoRegistro = true;
  stockBebidaDialogo: stockBebida = new stockBebida();
  tituloDialogo:string = "Nuevo Stock de Bebida";

  bebidas: bebida [] = [];
  bebidaSeleccionado:bebida;

  almacenes:almacen [] = [];
  almacenSeleccionado:almacen;

  abrirDialogo(){
    this.visible = true;
    this.nuevoRegistro = true;
    this.stockBebidaDialogo = new stockBebida();
  }

  obtenerStockBebida(){
    this.api.getStockBebida().subscribe(res => {
      this.stockBebidas = res;
    });
  }  

  obtenerBebida(){
    this.api.getBebida().subscribe(res => {
  this.bebidas = res;});
  }

  obtenerAlmacen(){
    this.api.getAlmacenes().subscribe(res => {
      this.almacenes = res;
    });
  }

  ngOnInit(){
    this.obtenerStockBebida();
    this.obtenerBebida();
    this.obtenerAlmacen();
  }

  editarStockBebida(stckB:stockBebida){
    this.stockBebidaDialogo = {...stckB};
    this.nuevoRegistro = false;
    this.visible = true;
  }

  eliminarStockBebida(stckB:stockBebida){
    this.api.deleteStockBebida(stckB.id.toString()).subscribe(() => {
      this.obtenerStockBebida();
    });
  }

guardarStockBebida(){
    this.stockBebidaDialogo.bebida = this.bebidaSeleccionado.id;
    this.stockBebidaDialogo.almacen = this.almacenSeleccionado.id;

    if (this.nuevoRegistro){
      this.api.postStockBebida(this.stockBebidaDialogo).subscribe(res => {
        this.obtenerStockBebida();
      });
    } else {
      this.api.putStockBebida(this.stockBebidaDialogo).subscribe(res => {
        this.obtenerStockBebida();
      });
    }
    this.visible = false;
  }


}