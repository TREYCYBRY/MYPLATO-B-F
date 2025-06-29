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
                      label: 'Mesa',
                      icon: 'pi pi-fw pi-plus',
                      command: () => {
                     this.router.navigate(['/extra']);}
                    }



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
