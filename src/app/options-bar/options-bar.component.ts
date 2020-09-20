import { Component, OnInit, ViewChild, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import {EventManagerComponent} from '../modalWindows/event-manager/event-manager.component'
@Component({
  selector: 'app-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.scss']
})
export class OptionsBarComponent implements OnInit {

  @Output() ondAddEvent: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  onAddEventClicked() {
    this.ondAddEvent.emit()
  }
}
