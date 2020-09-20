import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PgService } from './services/pg.service';
import { EventManagerComponent } from './modalWindows/event-manager/event-manager.component';
import { EventManagerService } from './services/event-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'Записная книжка 2.0';
  @ViewChild('eventManager') eventManager:EventManagerComponent

  constructor (public pg: PgService, public em: EventManagerService) {
  }
  ngAfterViewInit(): void {
    this.em.component = this.eventManager
  }

  checkRouterState(){
    if(document.location.pathname !== '/login')
      return true
    else
      return false
  }

  openAddEvent(){
    this.em.openAddEM()
  }
}
