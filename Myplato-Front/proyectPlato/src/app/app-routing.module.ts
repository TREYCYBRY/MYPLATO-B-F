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
import { AlmacenComponent } from './almacen/almacen.component';
import { StockComidaComponent } from './stock-comida/stock-comida.component';
import { StockBebidaComponent } from './stock-bebida/stock-bebida.component';
import { extraPlato } from '../model/extraPlato.model';
import { ExtraPlatoComponent } from './extra-plato/extra-plato.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { InicioUsuarioComponent } from './inicio-usuario/inicio-usuario.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { EmpleadoComponent } from './empleado/empleado.component';


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
  { path: 'almacen', component:AlmacenComponent },  
  { path: 'rol', component: RolComponent },
  { path: 'stockComida', component:StockComidaComponent },
  { path: 'stockBebida', component: StockBebidaComponent},
  { path: 'extraPlato', component: ExtraPlatoComponent},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'inicio-usuario',component:InicioUsuarioComponent},
  {path: 'registro-cliente', component: RegistroClienteComponent},
  {path: 'empleado', component: EmpleadoComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
