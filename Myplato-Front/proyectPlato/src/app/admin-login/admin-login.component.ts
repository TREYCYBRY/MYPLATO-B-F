import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  username = '';
  password = '';
  error = '';
  items: MenuItem[] = [];
  showMenu: boolean = false;

  constructor(private auth: AuthService, private router: Router) {
    // Escuchar cambios de ruta para ocultar menú cuando no esté autenticado
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const isAdminLogin = this.router.url === '/admin-login';
        const token = localStorage.getItem('token');
        this.showMenu = !isAdminLogin && !!token;
      }
    });
  }

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);

        // Opcional: puedes validar si el usuario tiene rol admin aquí
        this.initAdminMenu(); // Inicializa el menú solo si login fue exitoso
        this.router.navigate(['/inicio']); // O al dashboard admin
      },
      error: () => {
        this.error = 'Usuario y/o contraseña incorrectos';
      },
    });
  }

  initAdminMenu() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/inicio']);
        },
      },
      {
        label: 'Listados',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Plato',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/plato']);
            },
          },
          {
            label: 'Categoria Extra',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/categoriaExtra']);
            },
          },
          {
            label: 'Unidad de Medida',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/unidad']);
            },
          },
          {
            label: 'Extra',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/extra']);
            },
          },
          {
            label: 'Categoria Plato',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/categoriaPlato']);
            },
          },
          {
            label: 'Categoria Cliente',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/categoriaCliente']);
            },
          },
          {
            label: 'Rol',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/rol']);
            },
          },
          {
            label: 'Bebida',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/bebida']);
            },
          },
          {
            label: 'Almacen',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/almacen']);
            },
          },
          {
            label: 'Stock Comida',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/stockComida']);
            },
          },
          {
            label: 'Stock Bebida',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/stockBebida']);
            },
          },
          {
            label: 'Extra - Plato',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/extraPlato']);
            },
          },
          {
            label: 'Empleados',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/empleado']);
            },
          },
        ],
      },
      {
        label: 'Logout',
        icon: 'pi pi-close',
        command: () => {
          localStorage.removeItem('token');
          this.router.navigate(['/admin-login']);
          this.items = []; 
          this.showMenu = false;
        },
      },
    ];
  }
  goToUserLogin() {
      this.router.navigate(['/login']);
}
}
