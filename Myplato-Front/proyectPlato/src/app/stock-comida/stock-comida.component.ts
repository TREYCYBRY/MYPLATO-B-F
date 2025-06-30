import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { almacen } from '../../model/almacen.model';
import { extra } from '../../model/extra.model';
import { stockComida } from '../../model/stockComida.model';

@Component({
  selector: 'app-stock-comida',
  standalone: false,
  templateUrl: './stock-comida.component.html',
  styleUrl: './stock-comida.component.css',
  providers: [ApiService]
})

export class StockComidaComponent {
  constructor(private api:ApiService) {}

  stockComidas:stockComida[];
  visible:boolean = false;
  nuevoStockComida:boolean = true;
  stockComidaDialogo:stockComida = new stockComida();
  tituloDialogo:string = "Nuevo Stock de Comida";

  extras: extra [];
  extraSeleccionado:extra;

  almacenes:almacen [];
  almacenSeleccionado:almacen;

  abrirDialogo(){
    this.visible = true;
    this.nuevoStockComida = true;
    this.stockComidaDialogo = new stockComida();
  }

  obtenerStockComida(){
    this.api.getStockComida().subscribe(res => {
      this.stockComidas = res;
    });
  }  

  obtenerExtra(){
    this.api.getExtra().subscribe(res => {
  this.extras = res;});
  }

  obtenerAlmacen(){
    this.api.getAlmacenes().subscribe(res => {
      this.almacenes = res;
    });
  }

  ngOnInit(){
    this.obtenerStockComida();
    this.obtenerExtra();
    this.obtenerAlmacen();
  }

  editarStockComida(stckC:stockComida){
    this.stockComidaDialogo = {...stckC};
    this.nuevoStockComida = false;
    this.visible = true;
  }

  eliminarStockComida(stckC:stockComida){
    this.api.deleteStockComida(stckC.id.toString()).subscribe(() => {
      this.obtenerStockComida();
    });
  }

guardarStockComida(){
    this.stockComidaDialogo.extra = this.extraSeleccionado.id.toString();
    this.stockComidaDialogo.almacen = this.almacenSeleccionado.id.toString();

    if (this.nuevoStockComida){
      this.api.postStockComida(this.stockComidaDialogo).subscribe(res => {
        this.obtenerStockComida();
      });
    } else {
      this.api.putStockComida(this.stockComidaDialogo).subscribe(res => {
        this.obtenerStockComida();
      });
    }
    this.visible = false;
  }


}
