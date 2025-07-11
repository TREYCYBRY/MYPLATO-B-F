import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Plato } from "../model/plato.model";
import { categoriaExtra } from "../model/categoriaExtra.model";
import { unidadMedida } from "../model/unidadMedida.model";
import { extra } from "../model/extra.model";
import { categoriaPlato } from "../model/categoriaPlato.model";
import { categoriaCliente } from "../model/categoriaCliente.model";
import { rol } from "../model/rol.model";
import { bebida } from "../model/bebida.model";
import { almacen } from "../model/almacen.model";
import { stockComida } from "../model/stockComida.model";
import { stockBebida } from "../model/stockBebida.model";
import { extraPlato } from "../model/extraPlato.model";
import { Empleado } from "../model/empleado.model";
import { mesa } from "../model/mesa.model";
import { Pedido } from "../model/pedido.model";
import { cliente } from "../model/cliente.model";
<<<<<<< HEAD
import { Pago } from "../model/pago.model";

=======
import { PlatoPedido } from "../model/platoPedido.model";
import { Pago } from "../model/pago.model";
import { bebidaPedido } from "../model/bebidaPedido.model";
import { extrasPlatoPedido } from "../model/extrasPlatoPedido.model";
>>>>>>> b22e1703798e90582bf5e0ecc58fd1828875a462
@Injectable({
  providedIn: "root"
})

export class ApiService {
    private ApiUrl = "http://127.0.0.1:8000/api/"; // URL to web api
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {
    }

    //GET Plato
    public getPlatos(): Observable<Plato[]> {
        return this.http.get<Plato[]>(this.ApiUrl + 'platos/');
    }

    //DELETE Plato
    public deletePlatos(id:string): Observable<void>{
        return this.http.delete<void>(this.ApiUrl + 'platos/' + id + "/");
    }

    //PUT Plato
    public putPlatos(pla:Plato): Observable<Plato>{
        let body = JSON.stringify(pla);
        return this.http.put<Plato>(this.ApiUrl + 'platos/' + pla.id + "/",body,this.httpOptions);
    }

    //POST Plato
    public postPlato(pla:Plato): Observable<Plato>{
        let body = JSON.stringify(pla);
        return this.http.post<Plato>(this.ApiUrl + 'platos/',body,this.httpOptions);
    }
    
   // ------------------------------------------------------------------------------------------------
    
   
   //GET Categorias Extras
    public getCategoriasExtras(): Observable<categoriaExtra[]> {
        return this.http.get<categoriaExtra[]>(this.ApiUrl + 'categoriaExtra/');
    }

    //DELETE Categorias Extras CRUD:Delete
    public deleteCategoriaExtra(id:string): Observable<void>{
        return this.http.delete<void>(this.ApiUrl + 'categoriaExtra/' + id + "/");
    }

    //PUT Categorias Extras CRUD:Update
    public putCategoriaExtra(cat:categoriaExtra): Observable<categoriaExtra>{
        let body = JSON.stringify(cat);
        return this.http.put<categoriaExtra>(this.ApiUrl + 'categoriaExtra/' + cat.id + "/",body,this.httpOptions);
    }

    //POST Categorias Extras CRUD:Create
    public postCategoriaExtra(cat:categoriaExtra): Observable<categoriaExtra>{
        let body = JSON.stringify(cat);
        return this.http.post<categoriaExtra>(this.ApiUrl + 'categoriaExtra/',body,this.httpOptions);
    }    
    
    // ------------------------------------------------------------------------------------------------
    
    //Unidades
    //GET Unidades CRUD:Select READ
    public getUnidades(): Observable<unidadMedida[]> {
        return this.http.get<unidadMedida[]>(this.ApiUrl + 'unidadDeMedida/');
    }

    //DELETE Unidades CRUD:Delete
    public deleteUnidades(id:string): Observable<void>{
        return this.http.delete<void>(this.ApiUrl + 'unidadDeMedida/' + id + "/");
    }

    //PUT Unidades CRUD:Update
    public putUnidades(uni: unidadMedida): Observable<unidadMedida>{
        let body = JSON.stringify(uni);
        return this.http.put<unidadMedida>(this.ApiUrl + 'unidadDeMedida/' + uni.id + "/",body,this.httpOptions);
    }

    //POST Unidades CRUD:Create
    public postUnidades(uni:unidadMedida): Observable<unidadMedida>{
        let body = JSON.stringify(uni);
        return this.http.post<unidadMedida>(this.ApiUrl + 'unidadDeMedida/',body,this.httpOptions);
    }

    //EXTRAS--------------------------------------------------------------------------------------------
    //GET Extras CRUD:Select READ
    //EXTRAS--------------------------------------------------------------------------------------------
    //GET Extras CRUD:Select READ
    public getExtra(): Observable<extra[]> {
        return this.http.get<extra[]>(this.ApiUrl + 'extra/');
    }

    //DELETE Producto CRUD:Delete
    public deleteExtra(id:string): Observable<void>{
        return this.http.delete<void>(this.ApiUrl + 'extra/' + id + "/");
    }

    //PUT Producto CRUD:Update
    public putExtra(ex:extra): Observable<extra>{
        let body = JSON.stringify(ex);
        return this.http.put<extra>(this.ApiUrl + 'extra/' + ex.id + "/",body,this.httpOptions);
    }

    //POST Producto CRUD:Create
    public postExtra(ex:extra): Observable<extra>{
        let body = JSON.stringify(ex);
        return this.http.post<extra>(this.ApiUrl + 'extra/',body,this.httpOptions);
    }

    public putExtraImagen(ex:FormData,id:string): Observable<extra>{
        return this.http.put<extra>(this.ApiUrl + 'extra/' + id + "/",ex);
    }

    //POST Producto CRUD:Create
    public postExtraImagen(ex:FormData): Observable<extra>{
        return this.http.post<extra>(this.ApiUrl + 'extra/',ex);
    }


    // ------------------------------------------------------------------------------------------------
    
    //Categoria Platos
    public getCategoriasPlatos(): Observable<categoriaPlato[]> {
        return this.http.get<categoriaPlato[]>(this.ApiUrl + 'categoriaPlato/');
    }

    //DELETE Categoria Platos CRUD:Delete
    public deleteCategoriaPlato(id:string): Observable<void>{
        return this.http.delete<void>(this.ApiUrl + 'categoriaPlato/' + id + "/");
    }

    //PUT Categorias Platos CRUD:Update
    public putCategoriaPlato(cat:categoriaPlato): Observable<categoriaPlato>{
        let body = JSON.stringify(cat);
        return this.http.put<categoriaPlato>(this.ApiUrl + 'categoriaPlato/' + cat.id + "/",body,this.httpOptions);
    }

    //POST Categorias Platos CRUD:Create 
    public postCategoriaPlato(cat:categoriaPlato): Observable<categoriaPlato>{
        let body = JSON.stringify(cat);
        return this.http.post<categoriaPlato>(this.ApiUrl + 'categoriaPlato/',body,this.httpOptions);
    }

    
    // ------------------------------------------------------------------------------------------------
    //Categoria Clientes
    public getCategoriasClientes(): Observable<categoriaCliente[]> {
        return this.http.get<categoriaCliente[]>(this.ApiUrl + 'categoriaCliente/');
    }

    //DELETE Categoria Platos CRUD:Delete
    public deleteCategoriaCliente(id:string): Observable<void>{
        return this.http.delete<void>(this.ApiUrl + 'categoriaCliente/' + id + "/");
    }

    //PUT Categorias Platos CRUD:Update
    public putCategoriaCliente(cat:categoriaCliente): Observable<categoriaCliente>{
        let body = JSON.stringify(cat);
        return this.http.put<categoriaCliente>(this.ApiUrl + 'categoriaCliente/' + cat.id + "/",body,this.httpOptions);
    }

    //POST Categorias Platos CRUD:Create 
    public postCategoriaCliente(cat:categoriaCliente): Observable<categoriaCliente>{
        let body = JSON.stringify(cat);
        return this.http.post<categoriaCliente>(this.ApiUrl + 'categoriaCliente/',body,this.httpOptions);
    }

    // ------------------------------------------------------------------------------------------------
    
    //Roles
    //GET Roles CRUD:Select READ
    public getRoles(): Observable<rol[]> {
        return this.http.get<rol[]>(this.ApiUrl + 'roles/');
    }

    //DELETE Roles CRUD:Delete
    public deleteRoles(id:string): Observable<void>{
        return this.http.delete<void>(this.ApiUrl + 'roles/' + id + "/");
    }

    //PUT Roles CRUD:Update
    public putRoles(rls: rol): Observable<rol>{
        let body = JSON.stringify(rls);
        return this.http.put<rol>(this.ApiUrl + 'roles/' + rls.id + "/",body,this.httpOptions);
    }

    //POST Roles CRUD:Create
    public postRoles(rls:rol): Observable<rol>{
        let body = JSON.stringify(rls);
        return this.http.post<rol>(this.ApiUrl + 'roles/',body,this.httpOptions);
    }


    // ------------------------------------------------------------------------------------------------
    
    //GET Bebida CRUD:Select READ
    public getBebida(): Observable<bebida[]> {
        return this.http.get<bebida[]>(this.ApiUrl + 'bebidas/');
    }

    //DELETE Producto CRUD:Delete
    public deleteBebida(id:string): Observable<void>{
        return this.http.delete<void>(this.ApiUrl + 'bebidas/' + id + "/");
    }

    //PUT Producto CRUD:Update
    public putBebida(bb:bebida): Observable<bebida>{
        let body = JSON.stringify(bb);
        return this.http.put<bebida>(this.ApiUrl + 'bebidas/' + bb.id + "/",body,this.httpOptions);
    }

    //POST Producto CRUD:Create
    public postBebida(bb:bebida): Observable<bebida>{
        let body = JSON.stringify(bb);
        return this.http.post<bebida>(this.ApiUrl + 'bebidas/',body,this.httpOptions);
    }  
    
    // ------------------------------------------------------------------------------------------------

    //ALMACEN
    //GET
    public getAlmacenes(): Observable<almacen[]> {
        return this.http.get<almacen[]>(this.ApiUrl + 'almacen/');
    }

    //DELETE
    public deleteAlmacenes(id:string): Observable<void>{
        return this.http.delete<void>(this.ApiUrl + 'almacen/' + id + "/");
    }

    //PUT
    public putAlmacenes(almc: almacen): Observable<almacen>{
        let body = JSON.stringify(almc);
        return this.http.put<almacen>(this.ApiUrl + 'almacen/' + almc.id + "/",body,this.httpOptions);
    }

    //POST
    public postAlmacenes(almc:almacen): Observable<almacen>{
        let body = JSON.stringify(almc);
        return this.http.post<almacen>(this.ApiUrl + 'almacen/',body,this.httpOptions);
    }


    // ------------------------------------------------------------------------------------------------

    //STOCK COMIDA
    //GET 
    public getStockComida(): Observable<stockComida[]> {
        return this.http.get<stockComida[]>(this.ApiUrl + 'stockComida/');
    }

    //DELETE
    public deleteStockComida(id:string): Observable<void>{
        return this.http.delete<void>(this.ApiUrl + 'stockComida/' + id + "/");
    }

    //PUT
    public putStockComida(stckC: stockComida): Observable<stockComida>{
        let body = JSON.stringify(stckC);
        return this.http.put<stockComida>(this.ApiUrl + 'stockComida/' + stckC.id + "/",body,this.httpOptions);
    }

    //POST
    public postStockComida(stckC:stockComida): Observable<stockComida>{
        let body = JSON.stringify(stckC);
        return this.http.post<stockComida>(this.ApiUrl + 'stockComida/',body,this.httpOptions);
    }  


    
    // ------------------------------------------------------------------------------------------------

    //STOCK BEBIDA
    //GET 
    public getStockBebida(): Observable<stockBebida[]> {
        return this.http.get<stockBebida[]>(this.ApiUrl + 'stockBebida/');
    }

    //DELETE
    public deleteStockBebida(id:string): Observable<void>{
        return this.http.delete<void>(this.ApiUrl + 'stockBebida/' + id + "/");
    }

    //PUT
    public putStockBebida(stckB: stockBebida): Observable<stockBebida>{
        let body = JSON.stringify(stckB);
        return this.http.put<stockBebida>(this.ApiUrl + 'stockBebida/' + stckB.id + "/",body,this.httpOptions);
    }

    //POST
    public postStockBebida(stckB:stockBebida): Observable<stockBebida>{
        let body = JSON.stringify(stckB);
        return this.http.post<stockBebida>(this.ApiUrl + 'stockBebida/',body,this.httpOptions);
    }  


    //EXTRA-PLATO --------------------------------------------------------------------------------------------
    public getExtraPlato(): Observable<extraPlato[]> {
        return this.http.get<extraPlato[]>(this.ApiUrl + 'extraPlato/');
    }

    //DELETE
    public deleteExtraPlato(id: string): Observable<void> {
        return this.http.delete<void>(this.ApiUrl + 'extraPlato/' + id + '/');
    }

    //PUT
    public putExtraPlato(ep: extraPlato): Observable<extraPlato> {
        let body = JSON.stringify(ep);
        return this.http.put<extraPlato>(this.ApiUrl + 'extraPlato/' + ep.id + '/', body, this.httpOptions);
    }
    //POST
    public postExtraPlato(ep: extraPlato): Observable<extraPlato> {
        let body = JSON.stringify(ep);
        return this.http.post<extraPlato>(this.ApiUrl + 'extraPlato/', body, this.httpOptions);
}
    
    public getEmpleados(): Observable<Empleado[]> {
  return this.http.get<Empleado[]>(this.ApiUrl + 'empleados/');
}

public postEmpleado(emp: Empleado): Observable<Empleado> {
  return this.http.post<Empleado>(this.ApiUrl + 'empleados/', JSON.stringify(emp), this.httpOptions);
}

public putEmpleado(emp: Empleado): Observable<Empleado> {
  return this.http.put<Empleado>(this.ApiUrl + 'empleados/' + emp.id + "/", JSON.stringify(emp), this.httpOptions);
}

public deleteEmpleado(id: string): Observable<void> {
  return this.http.delete<void>(this.ApiUrl + 'empleados/' + id + "/");
}

//Mesa
    public getMesas(): Observable<mesa[]> {
        return this.http.get<mesa[]>(this.ApiUrl + 'mesas/');
    }

    public deleteMesa(id: string): Observable<void> {
        return this.http.delete<void>(this.ApiUrl + 'mesas/' + id + '/');
    }

    public putMesa(ms: mesa): Observable<mesa> {
        let body = JSON.stringify(ms);
        return this.http.put<mesa>(this.ApiUrl + 'mesas/' + ms.id + '/', body, this.httpOptions);
    }

    public postMesa(ms: mesa): Observable<mesa> {
        let body = JSON.stringify(ms);
        return this.http.post<mesa>(this.ApiUrl + 'mesas/', body, this.httpOptions);
    }


  
    public putPlatoImagen(pl:FormData,id:string): Observable<Plato>{
        return this.http.put<Plato>(this.ApiUrl + 'platos/' + id + "/",pl);
    }

    //POST Producto CRUD:Create
    public postPlatoImagen(pl:FormData): Observable<Plato>{
        return this.http.post<Plato>(this.ApiUrl + 'platos/',pl);
    }

    public putBebidaImagen(be:FormData,id:string): Observable<bebida>{
        return this.http.put<bebida>(this.ApiUrl + 'bebidas/' + id + "/",be);
    }

    //POST Producto CRUD:Create
    public postBebidaImagen(be:FormData): Observable<bebida>{
        return this.http.post<bebida>(this.ApiUrl + 'bebidas/',be);
    }

    //PEDIDO   ------------------------------------------------------------------------------------------------------ 
    // GET - obtener todos los pedidos
    public getPedidos(): Observable<Pedido[]> {
        return this.http.get<Pedido[]>(this.ApiUrl + 'pedidos/');
    }

    // DELETE - eliminar un pedido
    public deletePedido(id: string): Observable<void> {
        return this.http.delete<void>(this.ApiUrl + 'pedidos/' + id + '/');
    }

    // PUT - actualizar un pedido
    public putPedido(ped: Pedido): Observable<Pedido> {
        let body = JSON.stringify(ped);
        return this.http.put<Pedido>(this.ApiUrl + 'pedidos/' + ped.id + '/', body, this.httpOptions);
    }

    // POST - crear nuevo pedido
    public postPedido(ped: Pedido): Observable<Pedido> {
        let body = JSON.stringify(ped);
        return this.http.post<Pedido>(this.ApiUrl + 'pedidos/', body, this.httpOptions);
    }
// GET Clientes
    public getClientes(): Observable<cliente[]> {
        return this.http.get<cliente[]>(this.ApiUrl + 'clientes/');
    }

    // DELETE Cliente
    public deleteCliente(id: string): Observable<void> {
        return this.http.delete<void>(this.ApiUrl + 'clientes/' + id + "/");
    }

    // PUT Cliente
    public putCliente(cli: cliente): Observable<cliente> {
        let body = JSON.stringify(cli);
        return this.http.put<cliente>(this.ApiUrl + 'clientes/' + cli.id + "/", body, this.httpOptions);
    }

    // POST Cliente
    public postCliente(cli: cliente): Observable<cliente> {
        let body = JSON.stringify(cli);
        return this.http.post<cliente>(this.ApiUrl + 'clientes/', body, this.httpOptions);
<<<<<<< HEAD
    }

    // PAGOS
=======
}
//PLATO-PEDIDO --------------------------------------------------------------------------------------------
    public getPlatoPedido(): Observable<PlatoPedido[]> {
        return this.http.get<PlatoPedido[]>(this.ApiUrl + 'platoPedido/');
    }

    //DELETE
    public deletePlatoPedido(id: string): Observable<void> {
        return this.http.delete<void>(this.ApiUrl + 'platoPedido/' + id + '/');
    }

    //PUT
    public putPlatoPedido(pp: PlatoPedido): Observable<PlatoPedido> {
        let body = JSON.stringify(pp);
        return this.http.put<PlatoPedido>(this.ApiUrl + 'platoPedido/' + pp.id + '/', body, this.httpOptions);
    }
    //POST
    public postPlatoPedido(pp: PlatoPedido): Observable<PlatoPedido> {
        let body = JSON.stringify(pp);
        return this.http.post<PlatoPedido>(this.ApiUrl + 'platoPedido/', body, this.httpOptions);
}
// PAGOS
>>>>>>> b22e1703798e90582bf5e0ecc58fd1828875a462
    public getPagos(): Observable<Pago[]> {
        return this.http.get<Pago[]>(this.ApiUrl + 'pagos/');
    }

    public postPago(pago: Pago): Observable<Pago> {
        return this.http.post<Pago>(this.ApiUrl + 'pagos/', pago, this.httpOptions);
    }

    public putPago(pago: Pago): Observable<Pago> {
        return this.http.put<Pago>(this.ApiUrl + 'pagos/' + pago.id + '/', pago, this.httpOptions);
    }

    public deletePago(id: string): Observable<void> {
<<<<<<< HEAD
        return this.http.delete<void>(this.ApiUrl + 'pagos/' + id + '/');
=======
        return this.http.delete<void>(this.ApiUrl + 'pagos/' + id+'/');
}
 //BEBIDAPEDIDOS ------------------------------------------------------------------------------------------------------ 
    // GET - obtener todos los pedidos
    public getbebidaPedidos(): Observable<bebidaPedido[]> {
        return this.http.get<bebidaPedido[]>(this.ApiUrl + 'bebidaPedido/');
    }

    // DELETE - eliminar un pedido
    public deletebebidaPedidos(id: string): Observable<void> {
        return this.http.delete<void>(this.ApiUrl + 'bebidaPedido/' + id + '/');
    }

    // PUT - actualizar un pedido
    public putbebidaPedidos(beb: bebidaPedido): Observable<bebidaPedido> {
        let body = JSON.stringify(beb);
        return this.http.put<bebidaPedido>(this.ApiUrl + 'bebidaPedido/' + beb.id + '/', body, this.httpOptions);
    }

    // POST - crear nuevo pedido
    public postbebidaPedidos(beb: bebidaPedido): Observable<bebidaPedido> {
        let body = JSON.stringify(beb);
        return this.http.post<bebidaPedido>(this.ApiUrl + 'bebidaPedido/', body, this.httpOptions);
}
    // EXTRAS-PLATO-PEDIDO --------------------------------------------------------------------------------------------

    public getExtrasPlatoPedido(): Observable<extrasPlatoPedido[]> {
        return this.http.get<extrasPlatoPedido[]>(this.ApiUrl + 'extrasPlatoPedido/');
    }

    // DELETE
    public deleteExtrasPlatoPedido(id: string): Observable<void> {
        return this.http.delete<void>(this.ApiUrl + 'extrasPlatoPedido/' + id + '/');
    }

    // PUT
    public putExtrasPlatoPedido(epp: extrasPlatoPedido): Observable<extrasPlatoPedido> {
        const body = JSON.stringify(epp);
        return this.http.put<extrasPlatoPedido>(
            this.ApiUrl + 'extrasPlatoPedido/' + epp.id + '/',
            body,
            this.httpOptions
        );
    }

    // POST
    public postExtrasPlatoPedido(epp: extrasPlatoPedido): Observable<extrasPlatoPedido> {
        const body = JSON.stringify(epp);
        return this.http.post<extrasPlatoPedido>(
            this.ApiUrl + 'extrasPlatoPedido/',
            body,
            this.httpOptions
        );
>>>>>>> b22e1703798e90582bf5e0ecc58fd1828875a462
    }

}

    


