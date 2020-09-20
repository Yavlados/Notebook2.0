import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import {IEvent} from '../dto/event.dto'
import {IPerson} from '../dto/person.dto'

export enum eventManagerStates{
  editMode,
  addMode
}

@Component({
  selector: 'app-event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.scss']
})
export class EventManagerComponent implements OnInit {
  element
  public emState: eventManagerStates
  editableEvent: IEvent
  eventData = new FormGroup({
    additional: new FormControl( this.isEditMode() ? this.editableEvent.additional : ''),
    category: new FormControl(this.isEditMode() ? this.editableEvent.category : ''),
    detention_by: new FormControl(this.isEditMode() ? this.editableEvent.detention_by : ''),
    detention_reason: new FormControl(this.isEditMode() ? this.editableEvent.detention_reason : ''),
    keeping_place: new FormControl(this.isEditMode() ? this.editableEvent.keeping_place : ''),
  })

  constructor(private el: ElementRef) {
    this.element = el.nativeElement
   }

  ngOnInit(): void {
    // Initial state
    this.closeModal()
  }

  openAddEM(){
    this.emState = eventManagerStates.addMode
    this.element.style.display = 'block'
  }

  openEditEM(){
    this.emState = eventManagerStates.editMode
    this.element.style.display = 'block'
  }

  closeModal(){
    this.element.style.display = 'none'
  }

  isEditMode(){
    return this.emState === eventManagerStates.editMode
  }

  isAddMode(){
    return this.emState === eventManagerStates.addMode
  }

  onFormSubmit(){
    console.log(this.eventData)
  }

}
