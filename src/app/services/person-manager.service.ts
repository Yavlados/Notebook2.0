import { Injectable } from '@angular/core';
import {PersonManagerComponent, 
  personManagerStates} from '../modalWindows/person-manager/person-manager.component'
import { IPerson } from '../dto/person.dto';

 @Injectable({
  providedIn: 'root'
})
export class PersonManagerService {
  component: PersonManagerComponent

  constructor() { }

  openPM() {
  }

  openAddPM(){
    this.component.pmState = personManagerStates.addMode
    this.component.element.style.display = 'block'
  }

  openEditPM(person: IPerson){
    this.component.pmState = personManagerStates.editMode
    this.component.editablePerson = person
    this.component.element.style.display = 'block'
  }
}
