import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {provideAnimations} from '@angular/platform-browser/animations';
import {providePrimeNG} from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { FormsModule} from '@angular/forms';
import {CardModule} from 'primeng/card';
import {MessageModule}from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown'; // For p-dropdown
import {ButtonModule} from 'primeng/button'
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';     // For pRipple, if you're using it



import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../service/token.interceptor';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';


import { Menubar } from 'primeng/menubar';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { PlatoComponent } from './plato/plato.component';
import { CategoriaExtraComponent } from './categoria-extra/categoria-extra.component';
import { ExtraComponent } from './extra/extra.component';
import { UnidadComponent } from './unidad/unidad.component';
import { CategoriaPlatoComponent } from './categoria-plato/categoria-plato.component';
import { CategoriaClienteComponent } from './categoria-cliente/categoria-cliente.component';
import { RolComponent } from './rol/rol.component';
import { BebidaComponent } from './bebida/bebida.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { StockComidaComponent } from './stock-comida/stock-comida.component';
import { StockBebidaComponent } from './stock-bebida/stock-bebida.component';
import { ExtraPlatoComponent } from './extra-plato/extra-plato.component';
<<<<<<< HEAD
import { PedidoComponent } from './pedido/pedido.component';
import { PlatoPedidoComponent } from './plato-pedido/plato-pedido.component';
=======
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RegistroClienteComponent } from './registro-cliente/registro-cliente.component';
import { InicioUsuarioComponent } from './inicio-usuario/inicio-usuario.component';
import { EmpleadoComponent } from './empleado/empleado.component';
>>>>>>> 53230cc7e2e0dda12b82d61261757793aef606be
import { MesaComponent } from './mesa/mesa.component';
import { PedidoComponent } from './pedido/pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    PlatoComponent,
    CategoriaExtraComponent,
    ExtraComponent,
    UnidadComponent,
    CategoriaPlatoComponent,
    CategoriaClienteComponent,
    RolComponent,
    BebidaComponent,
    AlmacenComponent,
    StockComidaComponent,
    StockBebidaComponent,
    ExtraPlatoComponent,
<<<<<<< HEAD
    PedidoComponent,
    PlatoPedidoComponent,
=======
    AdminLoginComponent,
    RegistroClienteComponent,
    InicioUsuarioComponent,
    EmpleadoComponent,
>>>>>>> 53230cc7e2e0dda12b82d61261757793aef606be
    MesaComponent,
    PedidoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    ButtonModule,
    MessageModule,
    MenubarModule,
    Menubar,
    TableModule,
    InputTextModule,
    SelectModule,
    ConfirmDialogModule,
    DialogModule,
    FileUploadModule,
    CheckboxModule,
    DropdownModule,
    RippleModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},
    provideAnimations(),
    providePrimeNG({
      theme:{
        preset: Lara,
        options:{
          colorScheme: 'light',
          primaryColor: '#00bcd4',
      }
      }
      
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
