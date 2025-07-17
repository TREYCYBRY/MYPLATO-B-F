import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { rol } from '../../model/rol.model';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rol',
  standalone: false,
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css',
  providers: [ApiService]
})

export class RolComponent {
  constructor(private api:ApiService, private authService: AuthService,private router:Router) {}
  logout() {
    this.authService.logout();
  }

  roles:rol[];
  tituloDialogo:string = "Nuevo Tipo";
  visible:boolean = false;

  rolDialogo:rol = new rol();
  nuevaRol:boolean = true;

  obtenerRoles(){
    this.api.getRoles().subscribe(res => {
      this.roles = res;
    });
  }

  ngOnInit(){
    this.obtenerRoles();
  }

  editarRoles(rl: rol){
    this.visible = true;
    this.nuevaRol = false;
    this.rolDialogo = rl;
  }

  eliminarRoles(rl: rol){
    this.api.deleteRoles(rl.id.toString()).subscribe(() => {
      this.obtenerRoles();
    });
  }

  abrirDialogo(){
    this.visible = true;
    this.nuevaRol = true;
    this.rolDialogo = new rol();
  }

  guardarRoles(){
    if (this.nuevaRol){
      this.api.postRoles(this.rolDialogo).subscribe(res => {
        this.obtenerRoles();
      });
    } else {
      this.api.putRoles(this.rolDialogo).subscribe(res => {
        this.obtenerRoles();
      });
    }
    this.visible = false;
  }

}
