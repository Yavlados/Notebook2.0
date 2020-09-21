import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { PgService } from './services/pg.service';

import { EventManagerService } from './services/event-manager.service';
import { EventManagerComponent } from './modalWindows/event-manager/event-manager.component';

import { PersonManagerService } from './services/person-manager.service'
import { PersonManagerComponent } from './modalWindows/person-manager/person-manager.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'Записная книжка 2.0';
  @ViewChild('eventManager') eventManager:EventManagerComponent
  @ViewChild('personManager') personManager: PersonManagerComponent

  constructor (public pg: PgService, 
    public em: EventManagerService,
    public pm: PersonManagerService) {
  }
  ngAfterViewInit(): void {
    this.em.component = this.eventManager
    this.pm.component = this.personManager
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
