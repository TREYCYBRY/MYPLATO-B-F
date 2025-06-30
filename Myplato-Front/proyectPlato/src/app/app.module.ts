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
import {ButtonModule} from 'primeng/button'
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';


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
    CheckboxModule
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
