import { Component, OnInit, ElementRef } from '@angular/core';
import { IPerson, emptyPerson} from '../../dto/person.dto'
import { ITelephone, emptyTelephone } from 'src/app/dto/telephone.dto';
import { PgQueryService } from 'src/app/services/pg-query.service';
import { IContact } from 'src/app/dto/contact.dto';

export enum personManagerStates {
  editMode,
  addMode
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
  clickedTelephone: ITelephone = emptyTelephone
  isTelephoneClicked: boolean = false

  constructor(private el: ElementRef, public pq: PgQueryService) {
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

  onTelephoneTableClicked( telephone: ITelephone) {
    this.clickedTelephone = telephone
    this.isTelephoneClicked = true

    this.pq.getTelephoneContacts(this.clickedTelephone.id)
    .subscribe((res: IContact[]) => {
      this.clickedTelephone.contacts = res
    })
  }

}
