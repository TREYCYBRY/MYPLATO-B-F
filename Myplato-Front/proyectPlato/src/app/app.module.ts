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


import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../service/token.interceptor';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';


import { Menubar } from 'primeng/menubar';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { PlatoComponent } from './plato/plato.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    PlatoComponent,
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
