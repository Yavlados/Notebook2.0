import { Component, OnInit, ViewChild, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import {EventManagerComponent} from '../modalWindows/event-manager/event-manager.component'
import { EventTableService } from '../services/event-table.service';
@Component({
  selector: 'app-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.scss']
})
export class OptionsBarComponent implements OnInit {

  @Output() ondAddEvent: EventEmitter<any> = new EventEmitter<any>()

  constructor(public et :EventTableService) { }

  ngOnInit(): void {
  }

  onAddEventClicked() {
    this.ondAddEvent.emit()
  }

  isEventSelected(){
    return !!this.et.selectedEvent
  }

  onRemoveEventClicked(){
    this.et.onRemoveClicked()
    .subscribe( res=> {
      window.location.reload()
    })
  }
}
