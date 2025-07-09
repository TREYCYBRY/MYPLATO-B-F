import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-cliente',
  standalone: false,
  templateUrl: './registro-cliente.component.html',
  styleUrl: './registro-cliente.component.css'
})
export class RegistroClienteComponent {
  cliente: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  registrarCliente() {
    this.http.post('http://127.0.0.1:8000/api/registro-cliente/', this.cliente).subscribe({
      next: () => {
        alert('¡Registro exitoso!');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Error al registrar');
      }
    });
  }
}
