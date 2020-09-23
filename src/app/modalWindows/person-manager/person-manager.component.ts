import { Component, OnInit, ElementRef } from '@angular/core';
import { IPerson } from '../../dto/person.dto'

export enum personManagerStates {
  editMode,
  addMode
}

export const emptyPerson :IPerson = {
  alias: '',
  lastname: '',
  midname: '',
  name: '',
  id: null,
  telephones: []
}

@Component({
  selector: 'app-person-manager',
  templateUrl: './person-manager.component.html',
  styleUrls: ['./person-manager.component.scss']
})
export class PersonManagerComponent implements OnInit {
  element
  public pmState: personManagerStates
  editablePerson: IPerson = emptyPerson

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
    return this.pmState === personManagerStates.editMode
  }

  isAddMode() {
    return this.pmState === personManagerStates.addMode
  }
}
