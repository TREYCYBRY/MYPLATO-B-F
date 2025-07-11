import { Component,ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'proyectPlato';
  items: MenuItem[] | undefined;
  showMenu: boolean = false;

  constructor(private router: Router) {
    this.items = [
      {   label: 'Inicio',
                icon: 'pi pi-home',
                command: () => {
                    this.router.navigate(['/inicio']);}},
      {
        label: 'Login',
        icon: 'pi pi-user',
        command: () => {
          this.router.navigate(['/login']);
        }
      },
      {   label: 'Listados',
                icon: 'pi pi-search',
                items: [
                    {
                      label: 'Plato',
                      icon: 'pi pi-fw pi-plus',
                      command: () => {
                     this.router.navigate(['/plato']);}
                    },
                    {
                      label: 'Categoria Extra',
                      icon: 'pi pi-fw pi-plus',
                      command: () => {
                     this.router.navigate(['/categoriaExtra']);}
                    },
                    {
                      label: 'Unidad de Medida',
                      icon: 'pi pi-fw pi-plus',
                      command: () => {
                     this.router.navigate(['/unidad']);}
                    },
                    {
                      label: 'Extra',
                      icon: 'pi pi-fw pi-plus',
                      command: () => {
                     this.router.navigate(['/extra']);}
                    },
                    {
                      label: 'Categoria Plato',
                      icon: 'pi pi-fw pi-plus',
                      command: () => {
                     this.router.navigate(['/categoriaPlato']);}
                    },
                    {
                      label: 'Categoria Cliente',
                      icon: 'pi pi-fw pi-plus',
                      command: () => {
                     this.router.navigate(['/categoriaCliente']);}
                    },

                    {
                      label: 'Rol',
                      icon: 'pi pi-fw pi-plus',
                      command: () => {
                     this.router.navigate(['/rol']);}
                    },
                    {
                      label: 'Bebida',
                      icon: 'pi pi-fw pi-plus',
                      command: () => {
                     this.router.navigate(['/bebida']);}
                    },
                    {
                      label: 'Almacen',
                      icon: 'pi pi-fw pi-plus',
                      command: () => {
                     this.router.navigate(['/almacen']);}
                    },
                    {
                      label: 'Stock Comida',
                      icon: 'pi pi-fw pi-plus',
                      command: () => {
                     this.router.navigate(['/stockComida']);}
                    },
                    {
                      label: 'Stock Bebida',
                      icon: 'pi pi-fw pi-plus',
                      command: () => {
                     this.router.navigate(['/stockBebida']);}
                    },
                    {
                      label: 'Extra - Plato',
                      icon: 'pi pi-fw pi-plus',
                      command: () => {
                     this.router.navigate(['/extraPlato']);}
                    },
                    {
            label: 'Empleados',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/empleado']);
            },
          },
          {
            label: 'Mesas',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/mesa']);
            },
          },
          {
            label: 'Pedidos',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/pedido']);
            },
          },
          {
            label: 'Platos Pedidos',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/platoPedido']);
            },
          },
          {
            label: 'extras Platos Pedidos',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/extrasPedidoPlato']);
            },
          },


                    ]
      },
      
      {
                label: 'Logout',
                icon: 'pi pi-close',
                command: () => {
                    this.router.navigate(['/login']);
                    localStorage.removeItem('token')
                    
                    }
            }
    ];

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const isLoginPage = this.router.url === '/login';
        const token = localStorage.getItem('token');
        this.showMenu = !isLoginPage && !!token;
      }
    });

  }
}
