import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlatoComponent } from './plato/plato.component';
import { AuthGuard } from '../service/auth.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'platos',component:PlatoComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
