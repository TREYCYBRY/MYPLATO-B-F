import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = 'http://127.0.0.1:8000/api/login/';

  constructor(private http: HttpClient) {}

login(username: string, password: string) {
  return this.http.post<{ token: string; cliente?: any }>(this.loginUrl, { username, password })
    .pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        if(res.cliente){
          localStorage.setItem('cliente', JSON.stringify(res.cliente));
        }
      })
    );
}


getCliente(): any {
  const cliente = localStorage.getItem('cliente');
  return cliente ? JSON.parse(cliente) : null;
}
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}