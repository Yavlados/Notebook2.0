import { Component, OnInit, ViewChild, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import {EventManagerComponent} from '../modalWindows/event-manager/event-manager.component'
import { EventTableService } from '../services/event-table.service';
import { ImportExportService } from '../services/import-export.service';



@Component({
  selector: 'app-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.scss']
})
export class OptionsBarComponent implements OnInit {

  @Output() ondAddEvent: EventEmitter<any> = new EventEmitter<any>()
  @Output() onImport : EventEmitter<any> = new EventEmitter<any>()
  @Output() onExport : EventEmitter<any> = new EventEmitter<any>()

  constructor(public et :EventTableService,
    public ie: ImportExportService) {

    }

  ngOnInit(): void {
  }

  onAddEventClicked() {
    this.ondAddEvent.emit()
  }

  isEventSelected(){
    return !!this.et.selectedEvent
  }

  onRemoveEventClicked(){
    const sub = this.et.onRemoveClicked()
    .subscribe( res=> {
      window.location.reload()
      sub.unsubscribe()
    })
  }

  onImportClicked(){
    this.onImport.emit()
  }

  onExportClicked(){
    this.onExport.emit()
  }
}
