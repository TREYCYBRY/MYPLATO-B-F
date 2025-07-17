import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio-usuario',
  standalone: false,
  templateUrl: './inicio-usuario.component.html',
  styleUrl: './inicio-usuario.component.css'
})
export class InicioUsuarioComponent {
  constructor(private authservice:AuthService,private router:Router){}
    logout() {
    this.authservice.logout();
  }
}
