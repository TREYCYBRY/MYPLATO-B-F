import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Plato } from "../model/plato.model";

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


}