import { BrowserModule } from '@angular/platform-browser';
import {RoutingModule} from './modules/routing/routing.module'

import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import {PgService} from './services/pg.service';
import { LoginComponent } from './login/login.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [PgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
