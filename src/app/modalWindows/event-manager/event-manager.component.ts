import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { IEvent, IEventHeaders } from '../../dto/event.dto'
import { IPerson } from '../../dto/person.dto'

export enum eventManagerStates {
  editMode,
  addMode
}

export const emptyEvent = {
  additional: '',
  category: '',
  detention_by: '',
  detention_date: '',
  detention_reason: '',
  detention_time: '',
  id: null,
  keeping_place: '',
  persons: [] as IPerson[]
}

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.scss']
})
export class EventManagerComponent implements OnInit {
  element
  public emState: eventManagerStates
  editableEvent: IEvent = emptyEvent

  constructor(private el: ElementRef) {
    this.element = el.nativeElement
  }
  ngOnInit(): void {
    // Initial state
    this.closeModal()
  }

  closeModal() {
    this.element.style.display = 'none'
  }

  isEditMode() {
    return this.emState === eventManagerStates.editMode
  }

  isAddMode() {
    return this.emState === eventManagerStates.addMode
  }

  onFormSubmit() {
    console.log(this.editableEvent)
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape')
      this.closeModal();
    else return
  }
}
