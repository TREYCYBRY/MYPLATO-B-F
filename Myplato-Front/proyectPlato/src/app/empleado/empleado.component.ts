import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Empleado } from '../../model/empleado.model';
import { HttpClientModule } from '@angular/common/http';
import { rol } from '../../model/rol.model';  
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado',
  standalone: false,
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css',
  providers: [ApiService]
})
export class EmpleadoComponent {
  constructor(private api: ApiService, private authService: AuthService,private router:Router) {}
  logout() {
    this.authService.logout();
  }

  empleados: Empleado[] = [];
  visible: boolean = false;
  nuevoEmpleado: boolean = true;
  empleadoDialogo: Empleado = new Empleado();
  tituloDialogo: string = "Nuevo Empleado";

  roles: rol[] = [];
  rolSeleccionado: rol;

  ngOnInit() {
    this.obtenerEmpleados();
    this.obtenerRoles();
  }

  abrirDialogo() {
    this.visible = true;
    this.nuevoEmpleado = true;
    this.empleadoDialogo = {
  id: 0,
  nombreEmp: '',
  apeEmp: '',
  dni: '',
  numeroTelefono: '',
  direccion: '',
  turno: '',
  idrol: 1,
  username: '',
  email: '',
  password: ''
};




    }

  obtenerEmpleados() {
    this.api.getEmpleados().subscribe(res => {
      this.empleados = res;
    });
  }

  obtenerRoles() {
    this.api.getRoles().subscribe(res => {
      this.roles = res;
    });
  }

  editarEmpleado(emp: Empleado) {
    this.empleadoDialogo = { ...emp };
    this.rolSeleccionado= this.roles.find(r => r.id === emp.idrol)!;
    this.nuevoEmpleado = false;
    this.visible = true;
  }

  eliminarEmpleado(emp: Empleado) {
    this.api.deleteEmpleado(emp.id.toString()).subscribe(() => {
      this.obtenerEmpleados();
    });
  }

  guardarEmpleado() {
    this.empleadoDialogo.idrol = this.rolSeleccionado.id;

    if (this.nuevoEmpleado) {
      this.api.postEmpleado(this.empleadoDialogo).subscribe(() => {
        this.obtenerEmpleados();
      });
    } else {
      this.api.putEmpleado(this.empleadoDialogo).subscribe(() => {
        this.obtenerEmpleados();
      });
    }

    this.visible = false;
  }
}