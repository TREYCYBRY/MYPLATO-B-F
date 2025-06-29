import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Plato } from "../model/plato.model";
import { categoriaExtra } from "../model/categoriaExtra.model";
import { unidadMedida } from "../model/unidadMedida.model";
import { extra } from "../model/extra.model";

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

    //GET Jugadores
    public getPlatos(): Observable<Plato[]> {
        return this.http.get<Plato[]>(this.ApiUrl + 'platos/');
    }

    //DELETE Jugador
    public deletePlatos(id:string): Observable<void>{
        return this.http.delete<void>(this.ApiUrl + 'platos/' + id + "/");
    }

    //PUT Jugador
    public putPlatos(Plato:Plato): Observable<Plato>{
        let body = JSON.stringify(Plato);
        return this.http.put<Plato>(this.ApiUrl + 'platos/' + Plato.id + "/",body,this.httpOptions);
    }

    //POST Jugador
    public postPlato(Plato:Plato): Observable<Plato>{
        let body = JSON.stringify(Plato);
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

}