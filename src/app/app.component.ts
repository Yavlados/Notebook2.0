import { Component, ViewChild, AfterViewInit } from '@angular/core'
import { PgService } from './services/pg.service'

import { EventManagerService } from './services/event-manager.service'
import { EventManagerComponent } from './modalWindows/event-manager/event-manager.component'

import { PersonManagerService } from './services/person-manager.service'
import { PersonManagerComponent } from './modalWindows/person-manager/person-manager.component'
import { IPerson } from './dto/person.dto'
import { ImportExportService } from './services/import-export.service'
import { ImportExportManagerComponent } from './modalWindows/import-export-manager/import-export-manager.component'

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

  constructor(
    public pg: PgService,
    public em: EventManagerService,
    public pm: PersonManagerService,
    public ie: ImportExportService
  ) {}
  ngAfterViewInit(): void {
    this.em.component = this.eventManager
    this.pm.component = this.personManager
    this.ie.component = this.ieManager
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
}
