import { BrowserModule } from '@angular/platform-browser';
import {RoutingModule} from './modules/routing/routing.module'

import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import {PgService} from './services/pg.service';
import {PgQueryService} from './services/pg-query.service'

import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { JsonKeysPipe } from './pipes/json-keys.pipe';
import { JsonValuesPipe } from './pipes/json-values.pipe'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    JsonKeysPipe,
    JsonValuesPipe,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [PgService, PgQueryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
