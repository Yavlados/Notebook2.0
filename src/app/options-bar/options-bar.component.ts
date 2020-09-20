import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {EventManagerComponent} from '../event-manager/event-manager.component'
@Component({
  selector: 'app-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.scss']
})
export class OptionsBarComponent implements OnInit {
  @ViewChild('eventManager') eventManager:EventManagerComponent

  constructor() { }

  ngOnInit(): void {
  }

  onAddEventClicked() {
    this.eventManager.openAddEM()
  }
}
