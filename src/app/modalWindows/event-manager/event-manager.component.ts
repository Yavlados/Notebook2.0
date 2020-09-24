import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { IEvent, emptyEvent } from '../../dto/event.dto'
import { IPerson } from '../../dto/person.dto'
import { PersonManagerService } from 'src/app/services/person-manager.service';

export enum eventManagerStates {
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
  editableEvent: IEvent = emptyEvent

  constructor(private el: ElementRef,
    private pm: PersonManagerService) {
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

  onRemovePerson(personIndex: number){
    this.editableEvent.persons.splice(personIndex, 1)
  }

  AddPerson(){
    this.pm.openAddPM()
  }
}
