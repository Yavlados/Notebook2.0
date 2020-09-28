import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { IEvent, emptyEvent } from '../../dto/event.dto'
import { IPerson, emptyPerson } from '../../dto/person.dto'
import { PersonManagerService } from 'src/app/services/person-manager.service';
import { stateFlag } from 'src/app/dto/flag.dto';
import { PgQueryService } from 'src/app/services/pg-query.service';
import { Router } from '@angular/router';

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
    private pm: PersonManagerService,
    public pq : PgQueryService,
    private router : Router) {
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
    this.editableEvent.state = stateFlag.isAdded
    this.pq.setAddEvent(this.editableEvent)
    .subscribe( res => {
      window.location.reload()
    } )
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape')
      this.closeModal();
    else return
  }

  onRemovePerson(personIndex: number){
    this.editableEvent.persons.splice(personIndex, 1)
  }

  openAddPerson(){
    this.pm.openAddPM()
  }

  addPersonToEvent(person :IPerson){
    person.state = stateFlag.isAdded
    this.editableEvent.persons.push(person)
  }
 
  eventFieldIsEdited(){
   if(this.editableEvent.state === stateFlag.isReaded)
    this.editableEvent.state = stateFlag.isUpdated
  }
}
