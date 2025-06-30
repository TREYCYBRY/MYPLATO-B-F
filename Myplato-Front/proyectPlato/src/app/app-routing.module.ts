import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent} from './inicio/inicio.component';
import { PlatoComponent } from './plato/plato.component';
import { AuthGuard } from '../service/auth.guard';
import { CategoriaExtraComponent } from './categoria-extra/categoria-extra.component';
import { UnidadComponent } from './unidad/unidad.component';
import { ExtraComponent } from './extra/extra.component';
import { CategoriaPlatoComponent } from './categoria-plato/categoria-plato.component';
import { CategoriaClienteComponent } from './categoria-cliente/categoria-cliente.component';
import { RolComponent } from './rol/rol.component';
import { BebidaComponent } from './bebida/bebida.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'plato', component: PlatoComponent },
  { path: 'categoriaExtra', component: CategoriaExtraComponent },
  { path: 'extra', component: ExtraComponent },  
  { path: 'unidad', component: UnidadComponent},  
  { path: 'categoriaPlato', component: CategoriaPlatoComponent},
  { path: 'categoriaCliente', component: CategoriaClienteComponent },

  { path: 'bebida', component:BebidaComponent },  
  { path: 'rol', component: RolComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
