import { BrowserModule } from '@angular/platform-browser'
import { RoutingModule } from './modules/routing/routing.module'

import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'

import { CookieService } from 'ngx-cookie-service'

import { LoginComponent } from './login/login.component'
import { MainPageComponent } from './main-page/main-page.component'
import { JsonKeysPipe } from './pipes/json-keys.pipe'
import { JsonValuesPipe } from './pipes/json-values.pipe'
import { PersonBrowserCardComponent } from './person-browser-card/person-browser-card.component'
import { SearchEventComponent } from './main-page/search-event/search-event.component'
import { SearchPipePipe } from './main-page/pipes/search-pipe.pipe'
import { OptionsBarComponent } from './options-bar/options-bar.component'
import { EventManagerComponent } from './modalWindows/event-manager/event-manager.component'
import { PersonManagerComponent } from './modalWindows/person-manager/person-manager.component'
import { ImportExportManagerComponent } from './modalWindows/import-export-manager/import-export-manager.component'
import { AlertComponent } from './alert/alert.component';
import { SearchManagerComponent } from './modalWindows/search-manager/search-manager.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    JsonKeysPipe,
    JsonValuesPipe,
    PersonBrowserCardComponent,
    SearchEventComponent,
    SearchPipePipe,
    OptionsBarComponent,
    EventManagerComponent,
    PersonManagerComponent,
    ImportExportManagerComponent,
    AlertComponent,
    SearchManagerComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
