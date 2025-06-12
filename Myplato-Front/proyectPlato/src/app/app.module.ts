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
import { LoginComponent } from './login/login.component';
import { PlatoComponent } from './plato/plato.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlatoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    ButtonModule,
    MessageModule
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
