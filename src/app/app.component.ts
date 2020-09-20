import { Component, ViewChild } from '@angular/core';
import { PgService } from './services/pg.service';
import { EventManagerComponent } from './modalWindows/event-manager/event-manager.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Записная книжка 2.0';
  @ViewChild('eventManager') eventManager:EventManagerComponent
  
  constructor (public pg: PgService) {

  }

  checkRouterState(){
    if(document.location.pathname !== '/login')
      return true
    else
      return false
  }

  openAddEvent(){
    this.eventManager.openAddEM()
  }
}
