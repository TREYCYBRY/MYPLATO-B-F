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
import { MesaComponent } from './mesa/mesa.component';
import { PedidoComponent } from './pedido/pedido.component';
import { PlatoPedidoComponent } from './plato-pedido/plato-pedido.component';
import { PagoComponent } from './pago/pago.component';
import { BebidaPedidoComponent } from './bebida-pedido/bebida-pedido.component';
import { ExtrasPlatoPedidoComponent } from './extras-plato-pedido/extras-plato-pedido.component';
import { MenuComponent } from './menu/menu.component';
import { BandejaComponent } from './bandeja/bandeja.component';
import { BuffetComponent } from './buffet/buffet.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'plato', component: PlatoComponent, canActivate: [AuthGuard]},
  { path: 'categoriaExtra', component: CategoriaExtraComponent, canActivate: [AuthGuard]},
  { path: 'extra', component: ExtraComponent , canActivate: [AuthGuard]},  
  { path: 'unidad', component: UnidadComponent, canActivate: [AuthGuard]},  
  { path: 'categoriaPlato', component: CategoriaPlatoComponent, canActivate: [AuthGuard]},
  { path: 'categoriaCliente', component: CategoriaClienteComponent , canActivate: [AuthGuard]},

  { path: 'bebida', component:BebidaComponent , canActivate: [AuthGuard]},
  { path: 'almacen', component:AlmacenComponent , canActivate: [AuthGuard]},  
  { path: 'rol', component: RolComponent , canActivate: [AuthGuard]},
  { path: 'stockComida', component:StockComidaComponent , canActivate: [AuthGuard]},
  { path: 'stockBebida', component: StockBebidaComponent, canActivate: [AuthGuard]},
  { path: 'extraPlato', component: ExtraPlatoComponent, canActivate: [AuthGuard]},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'inicio-usuario',component:InicioUsuarioComponent, canActivate: [AuthGuard]},
  {path: 'registro-cliente', component: RegistroClienteComponent},
  {path: 'empleado', component: EmpleadoComponent, canActivate: [AuthGuard]},
  {path: 'mesa', component: MesaComponent, canActivate: [AuthGuard]},
  {path: 'pedido', component: PedidoComponent , canActivate: [AuthGuard]},
   {path:'menu',component:MenuComponent, canActivate: [AuthGuard]},
  {path:'bebidaPedido', component: BebidaPedidoComponent, canActivate: [AuthGuard]}, // Asegúrate de que este componente exista y sea correcto
  {path:'pago',component: PagoComponent, canActivate: [AuthGuard]}, // Asegúrate de que este componente exista y sea correcto
  {path:'platoPedido', component: PlatoPedidoComponent, canActivate: [AuthGuard]}, // Asegúrate de que este componente exista y sea correcto
  {path:'extrasPlatoPedido',component:ExtrasPlatoPedidoComponent, canActivate: [AuthGuard]}, // Asegúrate de que este componente exista y sea correcto
  {path:'bandeja', component:BandejaComponent, canActivate: [AuthGuard]},
  {path:'buffet', component:BuffetComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: '**', redirectTo: '/login' },
 // Redirige cualquier ruta desconocida al login
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
