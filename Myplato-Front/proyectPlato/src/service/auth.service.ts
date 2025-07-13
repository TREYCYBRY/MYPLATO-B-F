import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private loginUrl = 'http://127.0.0.1:8000/api/login/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
  return this.http.post<{ token: string }>(this.loginUrl, { username, password })
    .pipe(
      tap(res => {
        localStorage.setItem('token', res.token); // 👈 Guarda el token
      })
    );
}


  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}