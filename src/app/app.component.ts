import { Component, ViewChild, AfterViewInit } from '@angular/core'
import { PgService } from './services/pg-services/pg.service'

import { EventManagerService } from './services/window-managers/event-manager.service'
import { EventManagerComponent } from './modalWindows/event-manager/event-manager.component'

import { PersonManagerService } from './services/window-managers/person-manager.service'
import { PersonManagerComponent } from './modalWindows/person-manager/person-manager.component'

import { IPerson } from './dto/person.dto'

import { ImportExportService } from './services/window-managers/import-export.service'
import { ImportExportManagerComponent } from './modalWindows/import-export-manager/import-export-manager.component'

import { AlertComponent } from './alert/alert.component'
import { AlertManagerService } from './services/window-managers/alert-manager.service'

import { SearchManagerService } from './services/window-managers/search-manager.service'
import { SearchEventComponent } from './main-page/search-event/search-event.component'
import { SearchManagerComponent } from './modalWindows/search-manager/search-manager.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'Записная книжка 2.0'
  @ViewChild('eventManager') eventManager: EventManagerComponent
  @ViewChild('personManager') personManager: PersonManagerComponent
  @ViewChild('importExportManager') ieManager: ImportExportManagerComponent
  @ViewChild('alert') alert: AlertComponent
  @ViewChild('searchManager') search: SearchManagerComponent

  constructor(
    public pg: PgService,
    public em: EventManagerService,
    public pm: PersonManagerService,
    public ie: ImportExportService,
    public as: AlertManagerService,
    public sm: SearchManagerService
  ) { }

  ngAfterViewInit(): void {
    this.em.component = this.eventManager
    this.pm.component = this.personManager
    this.ie.component = this.ieManager
    this.as.component = this.alert
    this.sm.component = this.search
  }

  checkRouterState() {
    if (document.location.pathname !== '/login') return true
    else return false
  }

  addPersontoEvent(person: IPerson) {
    this.eventManager.addPersonToEvent(person)
  }

  openAddEvent() {
    this.em.openAddEM()
  }

  openImport() {
    this.ie.openImport()
  }

  openExport() {
    this.ie.openExport()
  }

  openSearch() {
    this.sm.openSearch()
  }
}
