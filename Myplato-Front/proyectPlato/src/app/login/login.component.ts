import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent {
    constructor(private auth:AuthService,private router:Router){}
      username='';
      password='';
      error='';
      login(){
        this.auth.login(this.username,this.password).subscribe({
          next:(res:any)=>{
            localStorage.setItem('token',res.token);
            this.router.navigate(['/areas']);
          },
          error:()=>{
            this.error='Usuario y/o contraseña incorrectos';
          }
        })
      }
      
    
}
