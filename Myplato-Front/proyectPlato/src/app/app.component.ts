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
}
