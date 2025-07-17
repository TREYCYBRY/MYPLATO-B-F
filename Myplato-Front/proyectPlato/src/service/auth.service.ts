import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = 'http://127.0.0.1:8000/api/login/';

  constructor(private http: HttpClient, private router:Router) {}

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
  const token = localStorage.getItem('token');
  console.log('isAuthenticated token:', token);
  return !!token;
}


logout() {
  console.log('Logout called');
  localStorage.removeItem('token');
  localStorage.removeItem('cliente');

  console.log('Token after remove:', localStorage.getItem('token'));  // debe ser null
  console.log('Cliente after remove:', localStorage.getItem('cliente')); // debe ser null

  this.router.navigate(['/login']);
}


}