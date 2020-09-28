import { Injectable } from '@angular/core';
import { EventManagerComponent, eventManagerStates } from '../modalWindows/event-manager/event-manager.component';
import { IEvent, emptyEvent } from '../dto/event.dto';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {
  component:EventManagerComponent
  constructor() { }

  openAddEM() {
    this.component.editableEvent = emptyEvent
    this.component.emState = eventManagerStates.addMode
     this.component.element.style.display = 'block'
  }

  openEditEM(event: IEvent) {
    this.component.editableEvent = event
    this.component.emState = eventManagerStates.editMode
    this.component.element.style.display = 'block'
  }
}
