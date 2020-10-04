import { Injectable } from '@angular/core'
import { ImportExportManagerComponent, ieManagerStates } from '../modalWindows/import-export-manager/import-export-manager.component'

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {

  component : ImportExportManagerComponent
  constructor() { }

  openExport() {
    this.component.iestate = ieManagerStates.exportMode
    this.component.element.style.display = 'block'
  }

  openImport() {
    this.component.iestate = ieManagerStates.importMode
    this.component.element.style.display = 'block'
  }
}
